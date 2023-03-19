---
title: VFXLB
permalink: /VFXLB/
tags: [File Formats, Effects]
---

![The .vfxlb filetype contains a Header, a Section 0 and a Section 1](/assets/WithoutSection1.png){:.thumb .legacy-small width="212px"} The .vfxlb filetype
is the format used for specifying which visual effects are used, where
they are used, and commands assigned to the effect. These files are
written in Little-Endian format, meaning bytes are written in reverse
order of significance.

## Header

![The .vfxlb header denotes the entry counts for both sections, as well as their offsets.](/assets/Colorcoded.png){:.thumb .legacy-small width="161px"}
The header is formatted as such:

  - 0x0 - 0x4: Signature, "VFXLB"
  - 0x5: Version number? (Always 01)
  - 0x6 - 0x7: Section 0 entry count
  - 0x8 - 0x9: Section 1 entry count
  - 0xA - (0xA + 0x4 \* num total entries): Entry offsets

From 0xA, the header lists each entry offset as a uint32 for both
Section 0 and Section 1, beginning with '00 00 00 00'. (Note: To go to
the entry's data, you must add the header offset to the offset listed
here.)

## Section 0

Each entry in Section 0 is a visual effect locator, which contains
information regarding the visual effect's filepath and world space
position. The entries vary in length, depending on the locator's world
space information. The smallest possible entry is 0x1C Bytes, and the
largest known entry is 0x60 Bytes (larger entries may exist).

The entries are formatted as such:

  - 0x0 - 0x5: vfx's filepath, hashed. (ex:
    /Assets/tpp/effect/vfx_data/fire/fx_tpp_firdrmsmk01_s1 3A ED 25
    6C 7F 36)
  - 0x6 - 0x7: .vfx filetype extension ( 08 66 / 09 66 / 0A 66 / 0B 66 )
    With [QuickHash](https://github.com/BobDoleOwndU/QuickHash/releases)
    , the user can determine the first byte with the same process
    described in the [Custom Texture Name
    Tutorial](http://bobdoleowndu.github.io/mgsv/documentation/customtexturenames.html).
    No singular digit = 08, 1 = 09, 2 = 0A, 3 = 0B.
  - 0x8: Unknown enumerator. The first nibble seemingly corresponds to
    extra, unknown bytes at the end of the entry.
      - '0' indicates that the entry will contain no additional bytes.
      - '1' indicates that the entry will have a set of 4 additional
        bytes after the world space information. These extra bytes could
        be a hash?
      - '2' indicates that the entry will have a set of 4 additional
        bytes. (Note: These bytes seem more unique than the '1' bytes,
        across different entries).
      - '3' indicates 8 additional bytes, seemingly a combination of the
        '1' and '2' sets.
  - 0x9: Enumerator which denotes the information type, and perhaps
    more. The first nibble of the byte (typically 2, sometimes 0) is not
    understood, but the second nibble corresponds with the following
    sets of information:
      - '0' indicates that the entry will contain (in 10 floats):  x, y,
        z Scale | x, y, z, w Quaternion | x, y, z World Position.
      - '1' indicates (in 7 floats): x, y, z, w Quaternion | x, y, z
        World Position.
      - '2' indicates (in 6 floats): x, y, z Scale | x, y, z World
        Position
      - '3' indicates (in 3 floats): x, y, z World Position
      - '4' (rare) indicates (in 14 floats): Two '0' sets: x, y, z Scale
        | x, y, z, w Quaternion | x, y, z World Position | x, y, z Scale
        | x, y, z, w Quaternion | x, y, z World Position.
      - *'5' - 'F' have not been found, and may not exist. However,
        given the pattern, '5' could indicate two '1' sets and so on.*
  - 0xA - 0xF: padding.
  - 0x10 - (0x10 + size of info set denoted by 0x9): World space
    arrangement (ranges from 0xC to 0x50 in length, perhaps longer).
  - Depending on 0x8, there can be additional bytes after the world
    space arrangement info (their purpose is unknown).

## Section 1

The purpose of Section 1 is suggested to contain visual effect commands,
such as activation distance and the rate/time of the effect. Like
Section 0, Section 1 contains entries. Unlike Section 0, Section 1 does
not exist in a number of vfxlb files. Additionally, no .vfxlb files are
known to have Section 1 entries without any Section 0 Entries.

Section 1 entries are a "communal" method of applying the same commands
to multiple Section 0 entries. So, instead of multiple Section 0 entries
containing a copy of the same parameters, a Section 1 entry assigns its
set of parameters to a subset of section 0 entries. The size of a
Section 1 entry depends on the number of section 0 entry assignees, the
number of commands and the size of the individual command parameters.

A section 1 entry can be concisely divided into 3 subsections: the Shell
Entry, the Locator Assignments, and the Command/Parameter Links.
![A proposed breakdown of a Section 1 shell entry. The entry assigns parameters to the two visual effects (entry 00 00 and entry 00 01).](/assets/SECTION1.png){:.thumb .legacy-small width="258px"}

### The Shell Entry:

0x0 - 0x1B is a "shell" entry, whose purpose is to host a set of
communal parameters to specified Section 0 entries. Commands (and their
parameters) are attached to the shell entry (via 0x8 - 0x9), and
assigned to Section 0 entries (beginning at 0x1C).

The theory of the shell entry is corroborated by the size of the entry
(0x1C is the same size as the smallest Section 0 entry) and by the
_effect.fox2 files which reference the .vfxlb file. These fox2 files
contain orphaned TransformEntities which share the same
transform_translation values as the .vfxlb. Of these orphaned entities,
one contains x=0 y=0 z=0, which implies that there exists a .vfxlb entry
with null world space coordinates. Additionally, the 0x9 byte of the
shell entry is always '03', which is indicative of the x, y, z World
Position 3 float format.

The shell entries use a similar formatting as Section 0 entries, but
nulled as such:

  - 0x0 - 0x5: Null Filepath. (Always 00 00 00 00 00 00)
  - 0x6 - 0x7: Null .vfx filetype extension
  - 0x8 - 0x9: Similar to Section 0. Denotes the information format.
      - C0 03 is the most common format, which is detailed below.
      - D0 03 is less common. There are 4 extra bytes appended to the
        entry at 0x1C (similar, if not the same, as the additional bytes
        in section 0's 0x8 description).
      - 90 03 is somewhat rare. After the shell entry, 4 bytes (perhaps
        a hash of a command or parameters) is proceeded by the number of
        section 0 entries being assigned, and then the indices of those
        entries.
      - 10 03 is rare. It is simply a shell entry with 4 bytes at the
        end (perhaps a hash of a command or parameters).
      - *More variations of Section 1 entries may exist.*
  - 0xA - 0xF: padding.
  - 0x10 - 0x13: Null world space position, x coordinate
  - 0x14 - 0x17: Null world space position, y coordinate
  - 0x18 - 0x1B: Null world space position, z coordinate

### Locator Assignments:

Up to this point, Section 1 entries are entirely null aside from 0x8 -
0x9. The meat of the entry begins at 0x1C, where it assigns itself to
section 0 entries.

  - 0x1C - 0x1D: Number of locators being assigned to the entry. In
    theory, this number will be no greater than the header's 0x6 - 0x7
    bytes.
  - 0x1E - (0xE + 0x2 \* Count of entries from 0x1C - 0x1D): The indexes
    of Section 0 locators being assigned to the entry. For example, '00
    00 02 00 03 00' will assign the 0th, 2nd and 3rd entries of Section
    0 to this Section 1 entry.

### Command/Parameter Links:

The final subsection is for visual effect commands. These commands are
hashed, making it tedious to learn what they are used for. For example,
'CA 2F E4 4C' determines how close the player needs to be to a locator
in order for the effect to play.

Commands are linked with their parameters via 4-byte-long definitions.
These command-to-parameter definitions contain the parameter type,
parameter offset, and an unknown byte. These definitions are formatted
as such:

  - 0x0: Unknown. Appears to order (00, 01,...09) a set of ten commands
    that share a common parameter.

<!-- end list -->

  - 0x1: Parameter type. Indicates the following:
      - 00: Unknown, size of 4 bytes. Definitions with an ordering (by
        0x0) appear to always have this type.
      - 01: Float, size of 4 bytes.
      - 03: uint8, size of 1 byte.
      - 06: Unknown, size of 4 bytes. Very likely a hash.
  - 0x2 - 0x3: Parameter offset, from the beginning of the entry.

These definitions associate each command with a parameter. Parameters
can be floats, uint8s and likely hashes and other types. Again, for
example, 'CA 2F E4 4C' could use the parameter '00 00 48 42', which
would cause the visual effect to play when the player is within 50m of
the locator.

As a whole, the subsection is formatted as a set of commands, then a set
of links, and then a set of parameters. Beginning after the Locator
Assignments (0xE + 0x2 \* Count of entries from 0x1C - 0x1D), the
Command/Parameter Links subsection is formatted as such:

  - 0x0 - 0x2: Total number of commands in the entry.
  - 0x2 - 0x4: Padding, or some unknown.
  - 0x5 - (0x5 + 0x4 \* Command Count): List of Command hashes, each 4
    Bytes in size.
  - (0x6 + 0x4 \* Command Count) - (0x6 + 0x8 \* Command Count):
    Command-to-parameter Definitions, each 4 Bytes in size. These
    definitions correspond with the order of their commands. Thus, the
    first definition links the first command in the list, the second
    definition links the second command in the list, and so on.
  - (0x6 + 0x8 \* Command Count) - End of Entry: List of parameters,
    varying in size.

### Known Commands:

It is unknown how many commands exist for .vfxlb files. Since Section 1
commands are hashed, it is also difficult to learn what they do. When
tweaked, the parameters of the commands will often not affect the visual
effect (Probably due to bad tests, but strange nonetheless). Of the
parameters that do affect the visual effect:

'CA 2F E4 4C' : Determines how close (in meters) the player needs to be
to the locator in order for the visual effect to play. Parameter type:
Float.
