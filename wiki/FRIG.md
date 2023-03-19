---
title: FRIG
permalink: /FRIG/
tags: [File Formats, Animation, Models]
---

The .frig or Fox Rig format is believed to be used to set up IK groups
for .fmdl files.

## Header

  - 0x0 - 0x3 (uint32): Signature.

<!-- end list -->

  - 0x4 - 0x7 (uint32): Header length.

<!-- end list -->

  - 0x8 - 0xB (uint32): Unknown.

<!-- end list -->

  - 0xC - 0xF (uint32): Num Entries?
  - 0x10 - 0x13 (uint32): Unknown.
  - 0x14 - 0x17 (uint32): File length.
  - 0x18 - 0x1B (uint32): Offset for bone hash section.
  - 0x1C - 0x1F (uint32): Offset for unknown section.

## Unknown Section Info

  - 0x0 - 0x3 (uint32): Unknown.
  - 0x4 - 0x7 (uint32): Num entries.
  - 0x8 - (0x8 + 0x4 \* num entries - 1) (uint32\[\]): Entry offsets.

## Unknown Section Data

  - 0x0 - 0x3 (uint32): Unknown
  - 0x4 - 0x11 (string): Name.
  - 0x12 - 0x57 (binary32\[\]): Unknown.

## Bone Hash Section Info

  - 0x0 - 0x3 (uint32): Num entries.

## Bone Hash Section Data

  - 0x0 - 0x3 (uint32): Unknown.
  - 0x4 - 0x7 (uint32): Truncated bone hash.
