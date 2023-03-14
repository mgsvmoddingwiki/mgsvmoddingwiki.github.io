---
title: MTAR2 (temp)
permalink: /MTAR2_(temp)/
---

The .mtar or **M**o**t**ion **Ar**chive, is the archive format used to
store Metal Gear Solid V: Ground Zeroes and Metal Gear Solid V: The
Phantom Pain's animation files (.gani). The .mtar format is
Little-Endian, meaning bytes are written in reverse order of
significance.

## Mtar Type 1

The Mtar Type 1 format is the simpler of the two formats. Animation
files contained in Mtar Type 1 files are made of a single chunk, and
contain a header.

### Mtar Type 1 Header

  - 0x0 - 0x3 (int): Signature. Always 0xBFFA89C for Ground Zeroes and
    always 0xC012B72 for The Phantom Pain.
  - 0x4 - 0x7 (int): Number of contained files.
  - 0x8 - 0xB (int): Bone Group 1.
  - 0xC - 0xF (int): Bone Group 2.
  - 0x10 - 0x1F: Padding.

### File List

A list of all files contained in the archive begins at 0x20. Each entry
in the list is 0x10 bytes and follows the following pattern:

  - 0x0 - 0x7 (long): Hashed filename.
  - 0x8 - 0xB (int): Offset.
  - 0xC - 0xF (int): File length.

[Category:File Formats](/Category:File_Formats "wikilink")
[Category:Animation](/Category:Animation "wikilink")