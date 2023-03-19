---
title: FCNP
permalink: /FCNP/
tags: [File Formats, Models]
---

The .fcnp format is used to define connection points for models in Metal
Gear Solid V: Ground Zeroes and Metal Gear Solid V: The Phantom Pain.
This format's documentation is still subject-to-change as it is still
being researched.

## Header

  - 0x0 - 0x3 (uint32): Unknown, probably padding/null signature or
    version number.
  - 0x4 - 0x7 (uint32): End-of-File.
  - 0x8 - 0xB (uint32): Unknown, possibly the length of the header, as
    it is seemingly always "20 00 00 00" (0x20).
  - 0xC - 0xF (uint32): Unknown.
  - 0x10 - 0x13 (uint32): Unknown, always 0xC bytes before the first
    string at the bottom of the file.
  - 0x14 - 0x17 (uint32): Unknown, seemingly always "00 00 00 00".
  - 0x18 - 0x1B (uint32): Unknown, seemingly always "00 00 00 00".
  - 0x1C - 0x1F (uint32): Unknown, seemingly always "00 00 00 00".

## Section 0: Connection Point Definition Section

  - 0x0 - 0x3 (uint32): Unknown, similar to 0xC - 0xF in the header in
    composition.
  - 0x4 - 0x7 (uint32): Unknown, possibly an offset that leads to the
    string list, except for the fact that these count down at seemingly
    irregular intervals for each entry (for example: Entry 1 - 800,
    Entry 2 - 700, Entry 650, and so on). It could be the "_CNP"
    connection point bone name.
  - 0x8 - 0xB (uint32): Unknown, seemingly always "00 00 00 00".
  - 0xC - 0xF (uint32): Unknown, seemingly always "30 00 00 00".
  - 0x10 - 0x13 (uint32): Unknown, seemingly always "30 00 00 00".
  - 0x14 - 0x17 (uint32): Unknown, seemingly always "00 00 00 00".
  - 0x18 - 0x1B (uint32): Unknown, seemingly always "00 00 00 00".
  - 0x1C - 0x1F (uint32): Unknown, seemingly always "A0 FF FF FF",
    *except* for the first entry in every section.
  - 0x20 - 0x23 (uint32): Unknown, seemingly always "60 00 00 00".
  - 0x24 - 0x27 (uint32): Unknown, possibly an offset that leads to the
    string list (could be the connection point name)
  - 0x28 - 0x2B (uint32): Unknown, seemingly always "00 00 00 00".
  - 0x2C - 0x2F (uint32): Unknown, seemingly always "00 00 00 00".
  - 0x30 - 0x33 (binary32): Unknown, possibly the connection point's "x"
    position offset from the connection point bone.
  - 0x34 - 0x37 (binary32): Unknown, possibly the connection point's "y"
    position offset from the connection point bone.
  - 0x38 - 0x3B (binary32): Unknown, possibly the connection point's "z"
    position offset from the connection point bone.
  - 0x3C - 0x3F (binary32): Unknown, possibly the connection point's "w"
    position offset from the connection point bone.
  - 0x40 - 0x43 (binary32): Unknown, possibly the connection point's
    quaternion's "x" component.
  - 0x44 - 0x47 (binary32): Unknown, possibly the connection point's
    quaternion's "y" component.
  - 0x48 - 0x4B (binary32): Unknown, possibly the connection point's
    quaternion's "z" component.
  - 0x4C - 0x4F (binary32): Unknown, possibly the connection point's
    quaternion's "w" component.
  - 0x50 - 0x53 (binary32): Unknown, possibly the connection point's
    scale along the "x" axis.
  - 0x54 - 0x57 (binary32): Unknown, possibly the connection point's
    scale along the "y" axis.
  - 0x58 - 0x5B (binary32): Unknown, possibly the connection point's
    scale along the "z" axis.
  - 0x5C - 0x5F (binary32): Unknown, possibly the connection point's
    scale along the "w" axis.

## Section 1: Unknown

This section has not yet been explored.

## Section 2: Strings

This section is simply a list of strings, with every string, including
the last one, being followed by a period (one null byte).
