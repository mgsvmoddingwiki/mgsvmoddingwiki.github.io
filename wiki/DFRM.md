---
title: DFRM
permalink: /DFRM/
tags: [File Formats, Animation]
---

The .dfrm, short for **d**e**f**o**rm**, is the format believed to be
used for morph targets in Metal Gear Solid V: The Phantom Pain. Much
like the .fmdl, it is a Little-Endian format, meaning bytes are written
in reverse order of significance.

i.e. 00 00 A2 2B, would be read as: 2B A2 00 00

## Structure

The .dfrm file is split into sections. The known/suspected sections are:

  - 0x0 - 0x40: Header.
  - 0x40 - 0xC: Section 1.
  - 0xC - 0x6160: Section 2.
  - 0x6160 - 0x6BE0: Section 3.
  - 0x6BE0 - 0x9D00: Section 4.
  - 0x9D00 - 0x17660: Section 5.
  - 0x17660 - End Of File: Section 6.

## Header

  - 0x0 - 0x3 (string): Signature. "DFRM".
  - 0x4 - 0x7 (float): 1.0.
  - 0x8 - 0xB (uint): Length of the header.
  - 0xC - 0xF (uint): Number of entries in section 1.
  - 0x10 - 0x13 (uint): Number of entries in section 2.
  - 0x14 - 0x17 (uint): Number of entries in section 3.
  - 0x18 - 0x1B (uint): Number of entries in section 4.
  - 0x1C - 0x1F (uint): Number of entries in section 5.
  - 0x20 - 0x23 (uint):Number of entries in section 6.

PLACEHOLDER

## Resources

  - [010 Editor
    Template](https://gist.github.com/Joey35233/6fd79695e34db56b37e656b3460bdfd7)
