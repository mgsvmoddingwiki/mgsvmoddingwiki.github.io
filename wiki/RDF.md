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

`0x00 - Version. (0x03)`
`0x01 - Unknown`
`0x03 - Label count`
`0x04 - Unknown`
`0x05 - Voluntary sets count`
`0x06-0x07 - Padding`
`0x08-0x09 - Unknown (Related to soundbanks?)`

#### Voice clips list ids

`0x00-0x03 - Voice clip list id entry (Found in SBP_Tool-extracted soundbanks' HIRC.dat before 0x6402, above lists of voice clip name values; however entries here require more than that)`

### Radio label entry

`0x00-0x03 - Label name StrCode32 hash (ex: s0020_rtrg1010)`
`0x04-0x05 - Unknown`
`0x06 - Unknown, but the latter half of the byte is always the voice clip count`
`0x07 - Unknown`
`0x08-0x09 - Padding`

#### Voice clip subentry

`0x00-0x03 - Voice clip id found in HIRC.dat files in .sbp soundbanks extracted with SBP_Tool`
`0x04-0x06 - Unknown flags`

### Voluntary calls set entry

`0x00-0x03 - Voluntary set name StrCode32 hash (ex: Set_s0020_oprg1010 )`
`0x04 - Calls count`

#### Voluntary call set subentry

`0x00-0x03 - Name of call in the set, StrCode32 hash (ex: s0020_oprg1010)`

## Format - Version 2 (GZ)

TBA