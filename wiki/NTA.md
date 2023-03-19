---
title: NTA
permalink: /NTA/
tags: [File Formats, Missions, Nav]
---

A **.nta** file specifies the locations of traversal actions in the
world.

## Format

### Header

  - 0x0 - 0x3 (char\[4\]): 'FNTA.' Format signature.
  - 0x4 - 0x5 (uint16): Magic number. Always 1.
  - 0x6 - 0x7 (uint16): Magic number. Always 1.
  - 0x8 - 0xB (uint32): Size of header in bytes. Always 12.

### Metadata section

  - 0xC - 0x13 (uint64): StrCode64 hash. Usually empty string "" hash.
  - 0x14 - 0x15 (uint32): Number of entries.
  - 0x16 - 0x19 (uint32): Magic number. Always 24.
  - 0x1C - 0x1F (uint32): Hash table offset. Must add header size to get
    the actual offset.
  - 0x20 - 0x24 (uint32): Size of the file, excluding the header.

### Entry section

The number of entries is equal to the "number of entries" value in the
metadata section.

#### Entry struct

  - 0x0 - 0xB (float3): Entry position.
  - 0xC - 0xF (uint32): StrCode32 hash of enter action (e.g., StepOn
    1277978017).
  - 0x10 - 0x1B (float3): Exit position.
  - 0x1C - 0x1F (uint32): StrCode32 hash of exit action (e.g., StepDown
    1139911476).
  - 0x20 - 0x27 (uint64): StrCode64 hash. Connection action? Most times
    empty string "" hash, but has exceptions like gntn_common.nta.
  - 0x28 - 0x29 (int16): Flags? The most used one, ranging from -1 to
    1000s
  - 0x2A - 0x2B (int16): Flags?
  - 0x2C - 0x2D (int16): Flags?
  - 0x2E - 0x2F (int16): Flags?

### Hash table

There is one StrCode64 hash for each entry here. Perhaps a name for each
entry?
