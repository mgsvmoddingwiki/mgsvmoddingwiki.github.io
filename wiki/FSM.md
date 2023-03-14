---
title: FSM
permalink: /FSM/
---

The .fsm format, or **F**ox **S**ystem **M**ovie, is the format used for
Metal Gear Solid V: Ground Zeroes and Metal Gear Solid V: The Phantom
Pain's in-game rendered cutscenes. The .fsm files are made up of two
different kinds of data chunks. DEMO chunks, which are likely animation
data, and SND chunks, which are Wwise audio files that have been split
into multiple pieces.

## FSM Header

The .fsm format's header is always the same; but there are cases where a
.fsm file may not have a header at all.

  - 0x0 - 0x3 (string): Signature. Always "SYS ".
  - 0x4 - 0x7 (int): Unknown. Always 0x10.
  - 0x8 - 0xF: Padding.

## First SND Header

The first SND header differs from all of the other chunk headers, which
all follow the same format. The first SND header follows this pattern:

  - 0x0 - 0x3 (string): Signature. Always "SND ".
  - 0x4 - 0x7 (int): Chunk length.
  - 0x8 - 0xF (double): Time for chunk to start playing.
  - 0x10 - 0x13 (int): Complete Wwise file's length.
  - 0x14 - 0x1F: Unknown.

## Chunk Header

All other chunks follow the exact same pattern.

  - 0x0 - 0x3 (string): Signature. Always either "SND " or "DEMO".
  - 0x4 - 0x7 )int): Chunk length.
  - 0x8 - 0xF (double): Time for chunk to start playing.

## Additional Notes

  - The first SND chunk is always 0x200020 bytes. All following SND
    chunks are 0x200010 bytes.