---
title: VFXLB
permalink: /VFXLB/
---

The .vfxlb filetype is the format believed to be used for specifying
which visual effects are used, where they are used, as well as other
parameters related to the effect. These files are written in
Little-Endian format, meaning bytes are written in reverse order of
significance.

## Header

The header is suggested to be formatted as such:

  - 0x0 - 0x4: Signature, "VFXLB"
  - 0x5: Version number? (Always 01)
  - 0x6 - 0x7: Section 0 entry count
  - 0x8 - 0x9: Section 1 entry count
  - 0xA - (0xA + 0x4 \* num total entries): Entry offsets

From 0xA, the header lists each entry offset as a uint32 for both
Section 0 and Section 1, beginning with '00 00 00 00'. (Note: To go to
the entry's data, you must add the header offset to the offset listed
here.)

## Section 0

Entries in Section 0 appear to contain information regarding the visual
effect's filepath and world space position. The entries vary in length.
The smallest known entry is 0x1C Bytes, and the largest known entry is
0x60 Bytes (larger entries likely exist). It is currently unclear why
the amount of information fluctuates from entry to entry, and what the
additional data is used for.

The entries are suggested to be formatted as such:

  - 0x0 - 0x5: vfx's filepath, hashed. (ex:
    /Assets/tpp/effect/vfx_data/fire/fx_tpp_firdrmsmk01_s1 3A ED 25
    6C 7F 36)
  - 0x6: unknown.
  - 0x7: unknown. (always 0x66 for Section 0 entries)
  - 0x8 - 0x9: unknown, perhaps the entry's format type.
  - 0xA - 0xF: padding.
  - 0x10 - End Of Entry: varying size of unknown information.

If the entry is 0x1C Bytes in size:

  - 0x10 - 0x13: World space position, x coordinate.
  - 0x14 - 0x17: World space position, y coordinate.
  - 0x18 - 0x1B: World space position, z coordinate.

It is likely that all entries contain at least an x, y, and z coordinate
for their world space position. It is also possible that some entries
contain world space rotations and scaling. Other unknown information may
also exist.

Bytes 0x6 - 0x9 are believed to be related to the size of en entry, or
at least the amount of detail stored within an entry, since there ought
to be a method of reading the information at 0x10.

## Section 1

The purpose of Section 1 is unknown, although it is suggested to contain
visual effect parameters, such as effect strength and the rate/time of
the effect. Like Section 0, Section 1 contains entries. Unlike Section
0, Section 1 is optional, and does not exist in a number of vfxlb files.

Given the format of Section 1, the entries could be a "communal" method
of applying the same parameters to multiple Section 0 entries. So,
instead of each Section 0 entry containing a copy of the same parameter,
they are assigned the same parameter in Section 1.

A proposed theory of Section 1's formatting: 0x0 - 0x1B is a "shell"
entry, whose purpose is to provide a set of communal parameters to
specified Section 0 entries. These parameters are attached to the shell
entry (via 0x8 - 0x9), and assigned to Section 0 entries (beginning at
0x1C).

The shell entries are theorized to use a similar formatting as Section 0
entries, but nulled as such:

  - 0x0 - 0x5: Null Filepath. (Always 00 00 00 00 00 00)
  - 0x6: unknown. (Always 00)
  - 0x7: unknown. (Always 00)
  - 0x8 - 0x9: unknown, perhaps the entry's format type. (Always C0 03)
  - 0xA - 0xF: padding.
  - 0x10 - 0x13: Null world space position, x coordinate.
  - 0x14 - 0x17: Null world space position, y coordinate.
  - 0x18 - 0x1B: Null world space position, z coordinate.

Up to this point, Section 1 entries are entirely null aside from 0x8 -
0x9. The meat of the entry begins at 0x1C:

  - 0x1C - 0x1D: Count of Section 0 entries which are referenced within
    this Section 1 entry.
  - 0x1E - (0xE + 0x2 \* Count of entries from 0x1C - 0x1D): Indexes of
    Section 0 entries which uitilize this entry's parameters.
  - (0xF + 0x2 \* Count of entries from 0x1C - 0x1D) - (0x13 + 0x2 \*
    Count of entries from 0x1C - 0x1D): unknown, perhaps a format type
    of the proceeding bytes.
  - (0x14 + 0x2 \* Count of entries from 0x1C - 0x1D) - End of Entry:
    varying size of unknown information. In preliminary tests, these
    parameters appeared to affect the strength and time lapse of an
    effect. Without the Section 1 entry, dust clouds appeared sparse and
    weak. With the addition of the Section 1 entry, the clouds seemed
    thicker and more prolonged.