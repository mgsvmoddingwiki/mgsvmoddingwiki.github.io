export function parseQuery(list, query, keyMap = {}) {
    const prefixPattern = /(?:^|\s)(!?([a-z0-9_-]+):(?:"((?:[^"\\]|\\.)*)"|([^\s"]+)))(?=\s|$)/gi,
          quotedPattern = /"((?:[^"\\]|\\.)*)"/g;

    function unescapeQuoted(s) {
        return s.replace(/\\"/g, '"').replace(/\\\\/g, '\\')
    }

    function getQuotedRanges(q) {
        return [...q.matchAll(quotedPattern)].map((m) => [m.index, m.index + m[0].length])
    }

    function checkOverlaps(start, end, ranges) {
        return ranges.some(([s, e]) => start < e && end > s)
    }

    // Checks that the range is fully inside wrapped quotes, such as `"title:fox"`, to avoid incorrect parsing with double quoted prefix values like `title:"fox"`
    function checkFullyInsideQuoted(start, end, ranges) {
        return ranges.some(([s, e]) => start >= s && (end - 1) < e)
    }

    function checkInsideRanges(index, ranges) {
        return ranges.some(([s, e]) => index >= s && index < e)
    }

    function setOccupiedString(q, occupied) {
        const chars = Array.from(q);
        occupied.forEach(([s, e]) => {
            for (let i = s; i < e && i < chars.length; i++) chars[i] = ' ';
        });
        return chars.join('').replace(/\s+/g, ' ').trim()
    }

    function addOccupied(occupied, start, end) {
        occupied.push([start, end]);
    }

    function parsePrefixed(q, occupied, ranges) {
        const out = [];
        let m;
        while ((m = prefixPattern.exec(q)) !== null) {
            const raw = m[1], key = m[2], quotedVal = m[3], unquotedVal = m[4] || '',
                  rawStart = m.index + (m[0].length - raw.length),
                  rawEnd = rawStart + raw.length;

            if (checkFullyInsideQuoted(rawStart, rawEnd, ranges)) continue;
            if (!keyMap[key]) continue; // leave unmatched prefix for leftover

            const negated = raw.startsWith('!'),
                  value = quotedVal ? unescapeQuoted(quotedVal) : unquotedVal.trim(),
                  opMatch = raw.match(/!?(?:[a-z0-9_-]+:)/i),
                  operator = opMatch ? (negated ? '!' + opMatch[0].replace(/^!/, '') : opMatch[0]) : null,
                  operatorOffset = operator ? raw.toLowerCase().indexOf(operator.toLowerCase()) : -1,
                  operatorLength = operator ? operator.length : 0;
                  // Make sure the value is searched after the operator to avoid unexpected matches with queries like `title:t`

            let valueOffsetInRaw;
            const indices = {
                operator: operatorOffset >= 0
                    ? [rawStart + operatorOffset, rawStart + operatorOffset + operator.length]
                    : null,
                value: valueOffsetInRaw >= 0
                    ? [rawStart + valueOffsetInRaw, rawStart + valueOffsetInRaw + value.length]
                    : null
            };

            if (quotedVal) {
                const quotedFull = `"${m[3]}"`;
                valueOffsetInRaw = raw.indexOf(quotedFull, operatorLength);
                // Include quotes in the `value` indices
                indices.value = valueOffsetInRaw >= 0
                    ? [rawStart + valueOffsetInRaw, rawStart + valueOffsetInRaw + quotedFull.length]
                    : null;
            } else {
                valueOffsetInRaw = raw.toLowerCase().indexOf(value.toLowerCase(), operatorLength);
                indices.value = valueOffsetInRaw >= 0
                    ? [rawStart + valueOffsetInRaw, rawStart + valueOffsetInRaw + value.length]
                    : null;
            }

            out.push({ raw, operator, key: key.toLowerCase().trim(), value, quoted: !!quotedVal, negated, indices });
            addOccupied(occupied, rawStart, rawEnd);
        }
        return out
    }

    function parseLeftoverOperators(q, pattern, occupied, ranges, opExtractor) {
        const out = [];
        let m;
        while ((m = pattern.exec(q)) !== null) {
            const full = m[0],
                  rawTrim = full.trimStart ? full.trimStart() : full.trim(),
                  leadingGap = full.length - rawTrim.length,
                  rawStart = m.index + leadingGap,
                  rawEnd = rawStart + rawTrim.length,
                  raw = q.slice(rawStart, rawEnd),
                  opInfo = opExtractor(m, rawStart, rawEnd, q);

            if (!opInfo) continue;

            const { operatorIndex, operator, value, quoted, negated } = opInfo;

            if (checkInsideRanges(operatorIndex, ranges)) continue;
            if (checkOverlaps(rawStart, rawEnd, occupied)) continue;

            let valueStartInRaw = -1;
            if (quoted) {
                const quotedText = opInfo.quotedText ?? (`"${m[2] || m[1] || ''}"`), // fallback for double quoted negated leftovers
                      index = raw.indexOf(quotedText);
                valueStartInRaw = index >= 0 ? rawStart + index : -1;
            } else if (value && value.length > 0) {
                // Find the value nearest the operator. Uses lastIndexOf so trailing operators match the value before the operator (eg: `fox$`)
                const index = raw.toLowerCase().lastIndexOf(String(value).toLowerCase());
                valueStartInRaw = index >= 0 ? rawStart + index : -1;
            }

            const indices = {
                operator: (typeof operatorIndex === 'number' && operatorIndex >= 0) ? [operatorIndex, operatorIndex + 1] : null,
                value: valueStartInRaw >= 0
                    ? [valueStartInRaw, valueStartInRaw + (quoted ? (opInfo.quotedText ? opInfo.quotedText.length : (value.length + 2)) : value.length)]
                    : null
            };

            const token = {
                raw,
                operator,
                key: null,
                value: quoted ? (opInfo.unescapedValue ?? unescapeQuoted(opInfo.quotedRaw ?? (m[2] || m[1] || ''))) : (value || ''),
                quoted: Boolean(quoted),
                negated: Boolean(negated),
                indices
            };

           out.push(token);
           addOccupied(occupied, rawStart, rawEnd);
       }
       return out
    }

    function parsePipes(q, occupied, ranges) {
        const out = [];
        for (const [i, ch] of Array.from(q).entries()) {
            if (ch !== '|') continue;
            if (checkInsideRanges(i, ranges)) continue; // skip if inside double quotes
            if (checkOverlaps(i, i + 1, occupied)) continue; // check if part of an existing token range

            const token = {
                raw: '|',
                operator: '|',
                key: null,
                value: undefined,
                quoted: false,
                negated: false,
                indices: { operator: [i, i + 1] }
            };
            out.push(token);
            addOccupied(occupied, i, i + 1);
        }
        return out
    }

    function parseLeftoverTokens(q, occupied) {
        const out = [],
              leftoverPattern = /(?:"((?:[^"\\]|\\.)*)"|([^\s"]+))/g;
        let m;

        while ((m = leftoverPattern.exec(q)) !== null) {
            const full = m[0],
                  rawStart = m.index,
                  rawEnd = rawStart + full.length,
                  raw = q.slice(rawStart, rawEnd);

            if (checkOverlaps(rawStart, rawEnd, occupied)) continue;

            const quotedText = m[1], unquoted = m[2] || '',
                  value = quotedText ? unescapeQuoted(quotedText) : unquoted,
                  quoted = !!quotedText,
                  valueStartInRaw = rawStart + (quoted ? 1 : 0);

            out.push({
                raw: raw,
                operator: undefined,
                key: null,
                value,
                quoted,
                negated: false,
                indices: quoted
                    ? { operator: null, value: [rawStart, rawEnd] }
                    : (value.length > 0
                        ? { operator: null, value: [rawStart + raw.indexOf(value), rawStart + raw.indexOf(value) + value.length] }
                        : { operator: null, value: null })
            });
        }
        return out
    }

    const quotedRanges = getQuotedRanges(query),
          occupied = [],
          keyPrefixes = parsePrefixed(query, occupied, quotedRanges),
          leftover = setOccupiedString(query, occupied);

    // Leading fuse operators (`!` or `^`)
    const leadingPattern = /(?:^|\s)([!^])(?:"((?:[^"\\]|\\.)*)"|([^\s"]+))(?=\s|$)/g;
    const leading = parseLeftoverOperators(query, leadingPattern, occupied, quotedRanges, (m, rawStart) => {
        const op = m[1],
              quotedText = m[2],
              unquoted = m[3],
              operatorIndex = rawStart + (m[0].trimStart ? m[0].trimStart().indexOf(op) : m[0].trim().indexOf(op));
        return {
            operatorIndex,
            operator: op,
            value: quotedText ? unescapeQuoted(quotedText) : (unquoted || ''),
            quoted: !!quotedText,
            negated: op === '!'
        }
    });

    // Trailing fuse operator (`$`)
    const trailingPattern = /(?:^|\s)(?:"((?:[^"\\]|\\.)*)"|([^\s"]+))(\$)(?=\s|$)/g;
    const trailing = parseLeftoverOperators(query, trailingPattern, occupied, quotedRanges, (m, rawStart, rawEnd) => {
        const quotedText = m[1], unquoted = m[2], op = m[3],
              operatorIndex = rawEnd - 1;
        return {
            operatorIndex,
            operator: op,
            value: quotedText ? unescapeQuoted(quotedText) : (unquoted || ''),
            quoted: !!quotedText,
            negated: false
        }
    });

    const pipes = parsePipes(query, occupied, quotedRanges),
          standalone = [...leading, ...trailing, ...pipes, ...parseLeftoverTokens(query, occupied)];

    return { keyPrefixes, standalone, leftover }
}