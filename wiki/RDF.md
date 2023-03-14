---
title: RDF
permalink: /RDF/
---

**RDF**, or **Radio Data File**, is a format used by Metal Gear Solid V:
Ground Zeroes, The Phantom Pain and Metal Gear Survive to define in-game
radio dialogue labels which can be played with the .lua function
TppRadio.Play("label") and voluntary (advice) radio sets assigned with
TppRadio.SetOptionalRadio("set"). The PC version's format is
Little-Endian, meaning bytes are written in reverse order of
significance.

This page is incomplete and does not have enough information to make a
completely custom Version 3 .rdf. If you're willing to research the
meaning of the unknown values, please help and contribute to this page.

## Format - Version 3 (TPP)

### Header

`0x00 - uint8 - Version. (0x03)`
`0x01 - uint8 - Dialogue Event count`
`0x02-0x03 - uint16 - Label count`
`0x04-0x05 - uint16 - Optional sets count`
`0x06-0x07 - uint16 - Variation sets count`
`0x08 - uint8 - Voice Type count`

#### Dialogue Event entry

`0x00-0x03 - int32/FNV132 Hash - Dialogue Event entry (Found in SBP_Tool-extracted soundbanks' HIRC.dat before 0x6402, at the top of DialogueEvent objects' value lists)`

#### Voice Type entry

`0x00-0x03 - int32/FNV132 Hash - Voice Type entry (Found in SBP_Tool-extracted soundbanks' HIRC.dat, values on top of the lists in DialogueEvent objects, but after the Dialogue Event hashes, can be multiple voice types per list)`

### Label entry

`0x00-0x03 - int32/StrCode32 Hash - Label name (ex: s0020_rtrg1010)`
`0x04 - bitfield byte - 0x0F is unknown, 0xF0 is a call noise type bitfield. In vanilla, 0x0 (real time), 0x2 (espionage), 0x4 (optional), 0x8 (map) and 0xA (mission image) flag sets are used.`
`0x05 - bitfield byte - Flags, unknown`
`0x06 - bitfield byte - 0x3F bits (0b00111111) are the label count, 0xC0 bits (0b11000000) are unknown.`
`0x07 - bitfield byte - Flags, unknown`
`0x08 - Unknown byte, seen used in RadioData_comn1000.rdf`
`0x09 - Unknown byte, seen used in RadioData_comn1000.rdf`

#### Voice clip subentry

`0x00-0x03 - int32/FNV132 Hash if voiceId, unknown hash type if Variation Set - Voice id found in HIRC.dat files in .sbp soundbanks extracted with SBP_Tool in DialogueEvent objects. Could sometimes be a Variation Set Entry name.`
`0x04 - uint8 - Flags, unknown`
`0x05 - uint8 - Voice Type entry index`
`0x06 - bitfield byte - 0x0F contains a 0x01 bool for whether the voice clip is referencing a Variation Set or not, 0xF0 is unknown.`

### Voluntary calls set entry

`0x00-0x03 - int32/StrCode32 Hash - Voluntary set name StrCode32 hash (ex: Set_s0020_oprg1010 )`
`0x04 - Calls count`

#### Voluntary call set subentry

`0x00-0x03 - int32/StrCode32 Hash - Name of call in the set, StrCode32 hash (ex: s0020_oprg1010)`

### Variation Set entry

`0x00-0x03 - int32/unknown hash - Variation set name. Can be referenced earlier on.`
`0x04 - int8 - voice clip subentry count.`

The following is the same as "Voice clip subentry," repeated by the
voice clip subentry count.

## Format - Version 1 (GZ)

### Header

`0x00 - Version (1)`
`0x01 - Empty`
`0x02-0x03 - Labels count`
`0x04-0x07 - Global offset to Sets Section`

### Labels Section

An entry per Labels Count in the header.

`0x00-0x03 - Label name StrCode32 hash (as the label used by .lua)`
`0x04-0x07 - Global offset to Label Params entry`

#### Label Params Entry

An entry per Labels Count in the header.

`0x00 - Some flag, unknown`
`0x01 - Some flag, unknown`
`0x02-0x03 - Some short, unknown`
`0x04-0x05 - Padding`
`0x06-0x07 - Some short, unknown`
`0x08 - Some flag, unknown`
`0x09 - Some flag, unknown`
`0x0a - Some flag, unknown`
`0x0b - Voice clips count`
`0x0c - Some flag, unknown`
`0x0d - Some flag, unknown`
`0x0e-0x0f - Empty`

##### Voice Clip Subentry

A subentry per Voice Clips Count in the Label Params entry.

`0x00-0x03 - Voice clip list id from the HIRC.dat list in the .sbp.`
`0x04-0x07 - Voice clip list id from the HIRC.dat list in the .sbp.`
`0x08-0x0b - Voice clip id from the HIRC.dat list in the .sbp.`
`0x0c - Some flag, unknown. Usually 0x64.`
`0x0d - Some flag, unknown.`
`0x0e-0x0f - Empty.`

### Sets Section

Doesn't seem to be any precedent for this in the header, so presume 0x00
after the previous section means none of the following will be in the
file.

`0x00 - Entries count.`
`0x01-0x03 - Empty.`

#### Set Entry

An entry per Entries Count in Sets Section.

`0x00-0x03 - Possibly set name/StrCode32 hash?`
`0x04-0x07 - Local offset (from Sets Section start) to Set Label Offsets entry.`

#### Set Label Offsets entry

An entry per Entries Count in Sets Section.

`0x00-0x01 - Subentries count.`
`0x02-0x03 - Empty.`

##### Set Label Offsets Subentry

An entry per Subentries Count in Set Label Offsets entry.

`0x00-0x03 - Global offset to Label Params entry.`

[Category:File Formats](/Category:File_Formats "wikilink")
[Category:Metal Gear Solid V: The Phantom
Pain](/Category:Metal_Gear_Solid_V:_The_Phantom_Pain "wikilink")
[Category:SFX](/Category:SFX "wikilink")