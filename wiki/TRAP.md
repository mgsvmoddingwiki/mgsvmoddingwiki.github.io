---
title: TRAP
permalink: /TRAP/
tags: [File Formats, Level, Geo]
---

**TRAP**, or GeoTrapFile, is a format used in Metal Gear Solid V: The
Phantom Pain and Metal Gear Survive to mark areas in the level that can
trigger certain commands when entered, like changing the player's camera
mode, first person view when crawling in tight areas, areas where the
character instantly dies, and more. The format is Little-Endian, meaning
bytes are written in reverse order of significance.

## Header

`0x00-0x03 - Unknown/file type name?`
`0x04-0x07 - Version`
`0x08-0x0B - File size`
`0x0C-0x0F - PathCode32 Hash: path to the attached .fox2 dataset`

`0x10-0x27 - Padding`
`0x28-0x2C - Unknown, always 0x1000000030`
`0x2D-0x2F - Padding`

`0x30-0x33 - File size + 0x10 bytes`
`0x34-0x3F - Padding`

`0x40-0x43 - Padding`
`0x44-0x47 - Amount of entries`
`0x48-0x4F - Padding`

### Offsets section

`0x00-0x03 - Offset from start of the offset section to the entry`

If all the entries in the offsets section don't fill in the 0x0F line at
the end, the rest is filled with padding.

### Entry header

`0x00-0x01 - Entry type (0x1300 for box shape, 0x1B00 for vector shape)`
`0x02 - Unknown, always 0x80`
`0x03 - Amount of shape entries (not vector points)`
`0x04-0x0F - Padding`

`0x10-0x17 - Bitfield tags`
`0x18-0x1B - StrCode32 hash of entry's name (entries are sorted by this hash, ascending)`
`0x1C-0x1F - Padding`

### Shape subentry - Vector Shape type

`0x00-0x03 - Float, y minimum`
`0x04-0x07 - Float, y maximum`
`0x08-0x0A - Amount of vector points`
`0x0B-0x0F - Unknown, always 0x20`

`0x10-0x1F - Padding`

#### Vector point subsubentry

`0x00-0x03 - Float - X coordinate of vector point`
`0x04-0x07 - Float - Y coordiante of vector point`
`0x08-0x0A - Float - Z coordinate of vector point`
`0x0B-0x0F - Padding`

### Shape subentry - Box Shape type

`0x00-0x03 - Float - X coordinate of box center`
`0x04-0x07 - Float - Y coordiante of box center`
`0x08-0x0A - Float - Z coordinate of box center`
`0x0B-0x0F - Float - W`

`0x10-0x1F - Padding`

`0x20-0x23 - Float - Rotation matrix, row 1 column 1`
`0x24-0x27 - Float - Rotation matrix, row 1 column 2`
`0x28-0x2A - Float - Rotation matrix, row 1 column 3`
`0x2B-0x2F - Float - Rotation matrix, row 1 column 4`

`0x30-0x33 - Float - Rotation matrix, row 2 column 1`
`0x34-0x37 - Float - Rotation matrix, row 2 column 2`
`0x38-0x3A - Float - Rotation matrix, row 2 column 3`
`0x3B-0x3F - Float - Rotation matrix, row 2 column 4`

`0x40-0x43 - Float - Rotation matrix, row 3 column 1`
`0x44-0x47 - Float - Rotation matrix, row 3 column 2`
`0x48-0x4A - Float - Rotation matrix, row 3 column 3`
`0x4B-0x4F - Float - Rotation matrix, row 3 column 4`

`0x50-0x53 - Float - X scale`
`0x54-0x57 - Float - Y scale`
`0x58-0x5A - Float - Z scale`
`0x5B-0x5F - Float - W scale`

The scales need to be divided by 2 from visualized scales to match where
they're actually triggered in-game. 0x10 of null padding ends the list
of box shape type subentries (not for vector shape types)

## GeoTriggerTrap (.fox2 DataSet alternative)

![](/assets/GeoTriggerTrap%20class%20entity%20example.png){:.thumb .legacy-small width="220px"}
Aside from binary .TRAP files, the game can also use entities of a
**GeoTriggerTrap** class. They work very similarly to GeoTrap entities,
as it uses BoxShape class entities parented to it to mark the areas it
affects, but without the need of a GeoModuleCondition class entity.
Unlike the binary .TRAP files, the scale of the BoxShapes parented to a
GeoTriggerTrap should not be divided by two. This DataSet class of
entites is mostly used in the Mother Base and the Mother Base Quarantine
Facility maps. The groupTag property's value indicates the function the
GeoTriggerTrap serves. It is unknown what the stateFlag or uniqueId
properties do, as the former is always 1 and the latter is always empty
in every use of the GeoTriggerTrap entity class.

## Trigger tag values and groupTags

This is a list of tag values used by binary .TRAP files and their
corresponding groupTags of the same function used by .fox2 DataSets'
GeoTriggerTrap class entities as they are listed in mgstpp.exe, along
with a description of their function, if available. If the groupTag is
listed here as an endianned hash, then its string is unknown. Tag values
are listed in binary .TRAP files with 0x\#2 added at the end. They also
seem to be able to combine multiple values into one (ex. 24 00 00 40 is
a combination of NearCamera2, InRoom and NoFulton, and would execute all
of those functions at once).

|                        |                  |                                                                                                                                                                          |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Binary .TRAP Tag Value | DataSet groupTag | Description                                                                                                                                                              |
| 01 00 00 00            | Intrude          | Forced First Person View when crawling in tight spaces.                                                                                                                  |
| 08 00 00 00            | FallDeath        | Kills the character that enters it with ATK_FallDeath.                                                                                                                  |
| 02 00 00 00            | Tower            | Indicates a Guard Tower area - if a soldier is inside it and notices a suspicious person, instead of checking it out himself, he will ask someone else to do it for him. |
| 04 00 00 00            | InRoom           | TBA                                                                                                                                                                      |
| 00 01 00 00            | F7 36 8D 8C      | TBA                                                                                                                                                                      |
| 00 02 00 00            | NoRainEffect     | Used in afgh_sovietBase_effect.fox2                                                                                                                                    |
| 00 04 00 00            | C3 DC 58 9A      | TBA                                                                                                                                                                      |
| 00 08 00 00            | GimmickNoFulton  | TBA                                                                                                                                                                      |
| 10 00 00 00            | NearCamera1      | Changes the camera mode to be closer to the player character.                                                                                                            |
| 20 00 00 00            | NearCamera2      | Changes the camera mode to be closer to the player character.                                                                                                            |
| 40 00 00 00            | NearCamera3      | Changes the camera mode to be closer to the player character.                                                                                                            |
| 80 00 00 00            | NearCamera4      | Changes the camera mode to be closer to the player character. Mostly unused in MGSV, except for Shining Lights, Even in Death, but used much more in MGO3.               |
| 00 10 00 00            | innerZone        | Leaving this area will warn the player that they're leaving the mission area.                                                                                            |
| 00 20 00 00            | outerZone        | Leaving this area will abort the mission, as you have fully left the mission area.                                                                                       |
| 00 40 00 00            | hotZone          | Leaving this area after achieving all important tasks in a mission will complete the mission.                                                                            |
| 00 80 00 00            | 83 BF DC 98      | TBA                                                                                                                                                                      |
| 00 00 01 00            | 68 A0 31 E4      | TBA                                                                                                                                                                      |
| 00 00 02 00            | BC 3F ED 7E      | TBA                                                                                                                                                                      |
| 00 00 04 00            | 93 CB C5 21      | TBA                                                                                                                                                                      |
| 00 00 08 00            | 83 6A B7 57      | TBA                                                                                                                                                                      |
| 00 00 10 00            | F8 4D 2C 07      | TBA                                                                                                                                                                      |
| 00 00 20 00            | E5 BB 6E 39      | TBA                                                                                                                                                                      |
| 00 00 40 00            | FF 4F C3 7D      | TBA                                                                                                                                                                      |
| 00 00 80 00            | AE FC 4A 25      | TBA                                                                                                                                                                      |
| 00 00 00 10            | 7A 0B D2 65      | TBA                                                                                                                                                                      |
| 00 00 00 20            | E3 B7 9C BA      | TBA                                                                                                                                                                      |
| 00 00 00 40            | NoFulton         | TBA                                                                                                                                                                      |
