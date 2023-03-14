---
title: FV2
permalink: /FV2/
---

The .fv2, or **F**orm **V**ariation (also sometimes called fova), is a
format used to make in-game changes to models in Metal Gear Solid V:
Ground Zeroes and Metal Gear Solid V: The Phantom Pain. Some of the
functionality available to .fv2 files is the ability to change a model's
textures, show and hide a model's meshes, and attach two or more models
together. The complete functionality available to .fv2 files is unknown.

## Header

  - 0x0 - 0x7 (string): "FOV2win.".
  - 0x8 - 0x9 (short): Section 2 offset.
  - 0xA - 0xB (short): Section 4 offset.
  - 0xC - 0XD (short): Section 2 entries.
  - 0xE - 0xF (short): Section 4 entries.
  - 0x10 - 0x11 (short): Section 3 offset.
  - 0x12 - 0x13 (short): Section 3 entries. Always 0x0.
  - 0x14 - 0x17: Padding.
  - 0x18 - 0x1F (long): Unknown.
  - 0x20 (byte): Number of mesh groups to hide.
  - 0x21 (byte): Number of mesh groups to show.
  - 0x22 - 0x23 (short): Unknown.
  - 0x24 (byte): Unknown. Three known states. 0x0: Used in face
    decoration fova, body and camos. 0x1: Face and hair fovas. 0x2:
    Eight known files. This byte may possibly be the number of .fmdl
    files referenced by the fova.
  - 0x25 (byte): Unknown. Always either 0x0 or 0x1.
  - 0x27 - 0x27 (short): Unknown. Possibly padding.

## Data Section

The data section of .fv2 files begins at 0x28. The data listed in this
data section can vary greatly.

If 0x20 is not 0x0, the first data listed will be references to the mesh
groups it is hiding. Each reference is 0x4 bytes, being the last 0x4
bytes of the name of the mesh group it is referencing. If 0x21 is not
0x0, its entries will immediately follow 0x20's entries, following the
same pattern.

This section may also contain a list of commands, and their parameters.

## Section 4

Section 4 contains a list of files used by the .fv2. This list can
include .fmdl files, .ftex files, and .sim files. This allows the .fv2
to attach models together, change the texture that's applied to the
model, and apply physics to the model.