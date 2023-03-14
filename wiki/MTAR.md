---
title: MTAR
permalink: /MTAR/
---

The .mtar or **M**o**t**ion **Ar**chive, is the archive format used to
store Metal Gear Solid V: Ground Zeroes and Metal Gear Solid V: The
Phantom Pain's animation files (.gani). There are two different formats
used for .mtar files, referred to as Mtar Type 1 and Mtar Type 2. Ground
Zeroes only makes use of Mtar Type 1 files, while The Phantom Pain uses
both Mtar Type 1 and Mtar Type 2 files. The .mtar format is
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

## Mtar Type 2

The Mtar Type 2 format is much more complicated than the Type 1 format.
A single animation may have multiple chunks of data scattered through
out the archive, and animation files will not have a header.

### Mtar Type 2 Header

  - 0x0 - 0x3 (int): Signature. Always 0xC012B72.
  - 0x4 - 0x7 (int): Number of contained files.
  - 0x8 - 0xB (int): Bone Group 1.
  - 0xC - 0xF: Padding.
  - 0x10 - 0x13 (int): Bone Group 2.
  - 0x14 - 0x17 (int): Offset for main animation tracks' description.
  - 0x18 - 0x1F: Padding.

### File List

Just like Mtar Type 1 files, Mtar Type 2 files also have a list of all
contained files starting at 0x20. However, the format for the list is
slightly different. Each entry in the file list in Mtar Type 2 files is
0x20 bytes and follows this pattern:

  - 0x0 - 0x7 (long): Hashed filename.
  - 0x8 - 0xB (int): Offset.
  - 0xC - 0xD (short): File length divided by 0xA.
  - 0xE - 0xF (short): File length divided by 0xA may appear here as
    well. If it does, this indicates that the animation has an extra
    chunk.
  - 0x10 - 0x13 (int): Extra chunk's length divided by 0xA.
  - 0x14 - 0x17: Padding.
  - 0x18 - 0x1B (int): Offset for a chunk of animation related to the
    listed file, stored near the end of the .mtar. These chunks can be
    identified by their signature, 0xBFE2CF6.
  - 0x1C - 0x1F (int): Padding.

### Main Animation Track's Description

Overall, not much is publicly known about the main animation track's
description. Its header follows this format:

  - 0x0 - 0x3 (int): Unknown. Likely a signature. Always 0x4FBDAAEF.
  - 0x4 - 0x7 (int): Unknown. Always 0x2B8 in known files.
  - 0x8 - 0xB (int): Length. Always 0x2D0 in known files.
  - 0xC - 0xF (int): Padding.

### Unknown Chunk

There is a chunk with an unknown purpose that immediately follows the
main animation track's description. The chunk follows this pattern:

  - 0x0 - 0x3 (int): Unknown. Likely signature. Known values are
    0x91E4534B and 0x3B9A7784.
  - 0x4 - 0x7 (int): Unknown.
  - 0x8 - 0xF: Padding.
  - 0x10 - 0x13 (int): Number of entries in chunk.

Entries immediately follow after the number of entries. Each entry is
0x8 bytes.

## Additional Notes

  - To find a contained animation file's hashed name, you must subtract
    0xFC50000000000000 from the hashed filename value. I.e. if the
    listed value is 0xFC53AFFADA200C63, subtract 0xFC50000000000000 to
    get 0x3AFFADA200C63. The file's name would be 3AFFADA200C63.gani.

[Category:File Formats](/Category:File_Formats "wikilink")
[Category:Animation](/Category:Animation "wikilink")