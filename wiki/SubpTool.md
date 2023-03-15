---
title: SubpTool
permalink: /SubpTool/
tags: [Tools, File Tools, Lang]
---

## Dictionary

SubpTool utilizes a dictionary of filenames called
subp*_dictionary.txt.* As it decompiles the subp, it compares the
hashes generated from this dictionary to any hashed keys it finds. If it
finds a match, it will output the string by it's real name with the XML
attribute 'SubtitleId'. If it cannot find a match, it will output the
string by its hash with the XML attribute 'Id'.

The most current dictionary can be found here:
<https://github.com/TinManTex/mgsv-lookup-strings>