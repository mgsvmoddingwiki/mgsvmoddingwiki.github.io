---
title: FCLO
permalink: /FCLO/
---

The .fclo format is a binary format used to set up cloth physics for the
Fox Engine's physics engine to simulate.

## Usage

Cloth physics. Specific usage unknown.

## Format

### Header

  - 0x0 - 0x3 (char\[4\]): 'OLCF' Backwards format signature.
  - 0x4 - 0x7 (unint32): Section 0 count.<sup>\[1\]\[2\]</sup>
  - 0x8 - 0xB (uint32): Section 1 count.<sup>\[1\]\[2\]</sup>
  - 0xC - 0xF (uint32): Section 3 count.
  - 0x10 - 0x13 (uint32): Section 4 count.
  - 0x14 - 0x17 (uint32): Section 5 count.

<sup>\[1\]</sup>The the format for sections 0 and 1 are identical. These
two could be one section with two sizes that are added together.
However, tests in-game revealed that shifting all value from the section
1 count to the section 0 count (for example, if there were 20 entries in
section 0 and 8 in section 1 pre-shift, there would be 28 in section 0
and 0 in section 1 post-shift) and the other way around did affect
(break) the function of the .fclo in-game. This would, however, explain
why the indices in sections 3 and 4 can and often are higher than the
counts of sectiosn 0 and 1 but not higher than the counts of sections 0
and 1 combined. The values are too large too often and without a pattern
to suggest that they're simply indices into section 2. This is the last
part of the format that needs to be reversed - the meaning of the
indices of sections 3 and 4.

<sup>\[2\]</sup>The amount of entries in section 2 is the sum of the
section 0 and 1 entries. This may not be true; it could also be two
sections with the same format, just like sections 0 and 1. This would
make the indices problem even stranger, however.

### Sections 0 and 1

  - 0x0 - 0x11 (Vector3): Appears to be some form of transform, though
    it could be three unrelated floats, as there is no fourth float for
    padding for SIMD reading as most transforms in most formats
    have.<sup>\[1\]</sup>
  - 0x12 - 0x15 (StrCode32Hash): A cloth sim bone name. For example,
    "SKL_700_CLTH_SIM".

These sections appear to define cloth sim bones. The bones themselves
are defined in the FMDL, however. Confusingly, and contrary to the
findings of the test conducted in-game described above, there seems to
be no logical split between the two sections based off of the bone names
and their position in the cloth sim bone hierarchies defined in
cloth-sim-using models.

<sup>\[1\]</sup>It is impossible that this vector represents a rotation
as it is missing a w component and also impossible that it represents a
scale as some values have been observed to be negative.

### Section 2

  - 0x0 - 0x3 (uint32): Collision bone hash index 0.
  - 0x4 - 0x7 (uint32): Collision bone hash index 1.
  - 0x8 - 0xB (uint32): Collision bone hash index 2.
  - 0xC - 0xF (uint32): Collision bone hash index 3.
  - 0x10 - 0x25 (Quaternion): A rotation with an unknown purpose. It
    could also be four individual floats.

Entries in this section appear to be connected in a 1:1 relationship
with a cloth sim bone, though how this is accomplished is unknown, aside
from the fact that it is likely done via either section 3 or 4. This
section seems to describe how the sim bone it is linked with interacts
with up to four other bones. It appears that if a bone is listed here it
the sim bone will collide with it rather than clip through it.
Basically, this section sets up collision for its corresponding sim
bone. The use of the Quaternion is unknown.

### Section 3

  - 0x0 - 0x3 (uint32): Unknown index 0.
  - 0x4 - 0x7 (uint32): Unknown index 1.

What these indices index and how is uncertain. Values in both index 0
and 1 have been observed exceeding the range of the counts of sections 0
and 1, though never the total of the two combined (which is also the
entry count of section 2). This would suggest that sections 0 and 1 are
actually one section, but the effects observed in-game of shifting the
entry counts to one side or the other contradict this, as does the mere
presence of two count variables in the header.

### Section 4

  - 0x0 - 0x3 (uint32): Unknown index 0.
  - 0x0 - 0x3 (uint32): Unknown index 1.
  - 0x0 - 0x3 (uint32): Unknown index 2.
  - 0x0 - 0x3 (uint32): Unknown index 3.

The purpose of these indices is also unknown.

### Section 5

  - 0x0 - 0x4 (StrCode32 hash): Bone hash.

This section is a list of hashed bone names that section 2 uses to
define collision. For example, a cloth sim file for a coat might list
and use "SKL_000_WAIST" here as collision, and not clipping, should
occur between that bone and the simulated cloth.