---
title: FV2
permalink: /FV2/
tags: [File Formats, Models]
---

The FV2, or Form Variation (also sometimes called fova), is a format
used to make in-game changes to models in Metal Gear Solid V: Ground
Zeroes and Metal Gear Solid V: The Phantom Pain. Some of the
functionality available to fv2 files is the ability to change a model's
textures, show and hide a model's meshes, and attach two or more models
together. The complete functionality available to fv2 files is unknown.
The format is Little-Endian, meaning bytes are written in reverse order
of significance.

You can use [FvTwool](/FvTwool) to edit files using gui.

## Format

### Header

```
0x0 - 0x7 (string): "FOV2win.".
0x8 - 0x9 (uint16): Variable data section offset.
0xA - 0xB (uint16): External file section offset.
0xC - 0XD (uint16): Number of variable data section entries.
0xE - 0xF (uint16): Number of external file section entries.
0x10 - 0x13 (uint32): Length of static data section and variable data section combined.
0x14 - 0x17: Padding.
0x18 - 0x19 (uint16): Number of textures used.
0x1A - 0x1F: Padding.
0x20 (uint8): Number of mesh groups to hide.
0x21 (uint8): Number of mesh groups to show.
0x22 (uint8): Number of material instance references.
0x23 (uint8): Unknown.
0x24 (uint8): Number of models to attach by bones.
0x25 (uint8): Number of models to attach by connection point.
0x26 - 0x27 (uint16): Unknown. Possibly padding.
```

### Static Data Section

The static data section of .fv2 files begins at 0x28. The data listed in
this section can vary greatly. Most of the data contained in the section
is made up of StrCode32 hashes (StrCode64 hashes that have had their
first four bytes truncated). The hashes are references to data from the
model they are changing. Entries in the static data section are
guaranteed to execute as opposed to the variable data section, where
execution is conditional. The static data section also has priority over
the variable data section, meaning that if an entry appears in both
sections, the entry in the variable data section will be ignored.

Different types of entries have priority for appearing in the list. The
priority of entries takes the following order.

1.  Hide mesh group entries.
2.  Show mesh group entries.
3.  Texture swap entries.
4.  Attach model by bones entries.
5.  Attach model by connection point entries.

#### Hiding/Showing Mesh Groups

![Example of how showing/hiding meshes works in form variation files.](/assets/Hide-show-mesh-group-entries.png){:.thumb .legacy-small width="220px"}
Hiding and showing mesh groups requires a single parameter: the hash of
the mesh group to show or hide.

`0x0 - 0x3 (uint32): Hash (StrCode32) of mesh group to hide or show.`

The fv2 will hide the number of mesh groups listed at 0x20 starting at
the first entry. It will show the number of mesh groups list at 0x21
starting at the entry after the last mesh group to be hidden.

#### Swapping Textures

![Example of how swapping textures works in form variation files.](/assets/Swap-texture-entries.png){:.thumb .legacy-small width="220px"} Swapping
textures requires four parameters: the hash of the material instance the
texture is applied to, the hash of the texture type for the texture
which is being swapped, the index of the texture in the external file
list, and a uint16 with a value of 0xFFFF (purpose is unknown).

```
0x0 - 0x3 (uint32): Material instance hash (StrCode32).
0x4 - 0x7 (uint32): Texture type hash (StrCode32).
0x8 - 0x9 (uint16): External file index.
0xA - 0xB (uint16): Unknown. Always 0xFFFF.
```

If the fv2 is swapping the textures of multiple material instances, the
values will not appear in the order above. The fv2 will list all of the
material instance hashes, then all of the texture type hashes, then all
of the external file indices, then all of the unknown 0xFFFF entries.

#### Attaching Models by Bones

![Example of how attaching models by bones works in form variation files.](/assets/Attach-model-by-bones-entries.png){:.thumb .legacy-small width="220px"}
Fv2s can attach two or more models together by matching bones that exist
in both models. This will allow the attached model to deform to the
target model's bone movements.

Attaching models by bones requires six parameters: the index of the
model in the external file section, and five optional indices into the
external file section for additional files used by the attached model.
If the optional parameters aren't used, a value of 0xFFFF (-1) is given
to the parameter.

```
0x0 - 0x1 (uint16): External file index.
0x2 - 0x3 (int16): External file index for frdv file. 0xFFFF if file is not used.
0x4 - 0x5 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x6 - 0x7 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x8 - 0x9 (int16): External file index for sim file. 0xFFFF if file is not used.
0xA - 0xB (int16): External file index for unknown file. 0xFFFF if file is not used.
```

#### Attaching Models by Connection Point

![Example of how attaching models by connection point works in form variation files.](/assets/Attach-model-by-connection-point-entries.png){:.thumb .legacy-small width="220px"}
Fv2s can also attach two or more models together by using a target
model's connection points. Attaching models this way will prevent them
from deforming when the target model's bones move. This also allows
models without bones to be attached to a target model.

Attaching models by connection point requires eight parameters: the hash
of the connection point it is being attached to, the hash for "" (an
empty string), the index of the model in the external file section, and
five optional indices into the external file section for additional
files used by the attached model.

```
0x0 - 0x3 (uint32): Connection point hash (StrCode32).
0x4 - 0x7 (uint32): "" (empty string) hash (StrCode32).
0x8 - 0x9 (uint16): External file index.
0xA - 0xB (int16): External file index for frdv file. 0xFFFF if file is not used.
0xC - 0xD (int16): External file index for unknown file. 0xFFFF if file is not used.
0xE - 0xF (int16): External file index for unknown file. 0xFFFF if file is not used.
0x10 - 0x11 (int16): External file index for sim file. 0xFFFF if file is not used.
0x12 - 0x13 (int16): External file index for unknown file. 0xFFFF if file is not used.
```

### Variable Data Section

The variable data section works very similarly to the static data
section with the difference that all data in the variable data section
is conditional. This allows an fv2 to do things such as show and hide
meshes based on random number generation, apply a skin colour texture
based on the currently selected character, and apply an eye colour
texture based on the currently selected character. Unlike the static
data section, types of entries can appear in any order as specified by
the fv2.

### Entry Definition

```
0x0 (uint8): Type Enum.
0x1 (uint8): Unknown. Note: Changing this doesn't seem to have any effect.
0x2 (uint8): Number of sub-entries.
0x3 (uint8): Number of mesh groups per sub-entry.
0x4 (uint8): Number of material instances per sub-entry.
0x5 (uint8): Unknown.
0x6 (uint8): Number of model attachments by bones per sub-entry.
0x7 (uint8): Number of model attachments by connection point per sub-entry.
0x8 - 0xB (uint32): Unknown. Possibly padding.
0xC - 0xF (uint32): Offset.
```

### Type Enums

The following is a list of known type enums and what they appear to be
used for. It should be noted that other than the known special usage
cases, it does not appear to matter if the correct enum is used.

```
0x1: Body meshes.
0x2: Hand meshes.
0x3: Leg meshes.
0x4: Pants meshes.
0x6: Multiple observed uses. Waist and belt meshes on pfs, top color on svs.
0x7: Multiple observed uses. Bottom color on svs.
0x8: Rubber gloves on the XOF soldier model. Holsters and other hip equipment.
0x9: Stun grenade on the XOF soldier model.
0xA: Multiple observed uses.
0xB: Medal on pfs. Goggles on ddr.
0xC: Short sleeve shirt textures on pfs, PF_A.
0xD: Short sleeve shirt textures on pfs, PF_B.
0xE: Pants textures on pfs.
0xF: Body equipment textures on pfs.
0x10: Long sleeve PF_C shirt textures on pfs.
0x11: Boots textures on pfs.
0x12: Leather jacket textures on pfs.
0x64*: Skin colour texture.
0x6E*: Eye colour texture.
0xC8*: Hats and berets on pfs and svs.
0xC9*: Headset on the XOF soldier model. Helmets on pfs, svs and chd.
0xCA*: Night vision goggle meshes on pfs and svs.
0xCB*: Gas masks on pfs and svs.
0xCD: Throat parasites on ddr.
0xD2*: Chest equipment on pfs and svs.
0xD3*: Soft armor on pfs and svs.
```

<sub>\* indicates that the enum is a special usage case.</sub>

#### Special Usage Cases

Special usage cases get their data from the currently selected character
rather than at random.

**Skin Colour:** Entries contain five sub-entries starting at the
lightest skin tone and ending with the darkest skin tone. They sometimes
also include the parasite zombie skin texture at the very end.

**Eye Colour:** Entries Contain five sub-entries for males and four
sub-entries for females. The entries for both males and females follow
the same order and use the same textures with the exception that females
don't use the last texture used by males. The order is:

1.  cm_iris0_c00_bsm (blue),
2.  cm_iris2_c00_bsm (amber),
3.  cm_iris7_c00_bsm (white).
4.  cm_iris3_c00_bsm (grey),
5.  cm_iris5_c00_bsm (green),

**Hats and Berets:** Meshes that should not conflict with other
headwear.

**Helmets:** Meshes that should not conflict with other headwear. Also
related to the HELMET power setting.

**Night Vision Goggles:** Meshes that should not conflict with other
headwear. Related to the NVG power setting.

**Gas Masks:** Meshes that should not conflict with other headwear.
Related to the GAS_MASK power setting.

**Chest Equipment:** Meshes that should not conflict with Soft Armor.

**Soft Armor:** Meshes that should not conflict with Chest Equipment.
Related to the SOFT_ARMOR power setting.

#### Showing/Hiding Mesh Groups

If an entry contains at least two sub-entries and each sub-entry
contains at least one mesh group, one of the sub-entries will be shown
randomly while the others are hidden.

`0x0 - 0x3 (uint32): Mesh group hash (StrCode32).`

Entries with more than one mesh group per sub-entry will contain extra,
optional mesh group hashes. The following is an example of an entry with
two mesh groups per sub-entry.

```
0x0 - 0x3 (uint32): Mesh group hash (StrCode32).
0x4 - 0x7 (uint32): Optional mesh group hash (StrCode32). (0x0 if not used.)
```

#### Swapping Textures

If an entry contains at least two sub-entries and each sub-entry
contains at least one material instance, one of the sub-entries will
have its texture applied to the specified material instance randomly
while the others are ignored.

```
0x0 - 0x3 (uint32): Material instance name hash (StrCode32).
0x4 - 0x7 (uint32): Texture type hash (StrCode32).
0x8 - 0x9 (uint16): External file section index.
0xA - 0xB (uint16): Unknown. Always 0xFFFF.
```

Entries with more than one material instance per entry will contain
extra, optional parameters. The following is an example of an entry with
two material instances per sub-entry.

```
0x0 - 0x3 (uint32): Material instance name hash (StrCode32).
0x4 - 0x7 (uint32): Optional material instance name hash (StrCode32). (0x0 if not present.)
0x8 - 0xB (uint32): Texture type hash (StrCode32).
0xC - 0xF (uint32): Optional texture type hash (StrCode32). (0x0 if not present.)
0x10 - 0x11 (uint16): External file section index.
0x12 - 0x13 (uint16): Optional external file section index. (0xFFFF if not present.)
0x14 - 0x15 (uint16): Unknown. (0xFFFF.)
0x16 - 0x17 (uint16): Unknown. (0xFFFF.)
```

#### Attaching Models by Bones

If an entry contains at least two sub-entries and each sub-entry
contains at least one model attachment by bones, one of the sub-entries
will have its model attached randomly while the others are ignored.

```
0x0 - 0x1 (uint16): External file index.
0x2 - 0x3 (int16): External file index for frdv file. 0xFFFF if file is not used.
0x4 - 0x5 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x6 - 0x7 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x8 - 0x9 (int16): External file index for sim file. 0xFFFF if file is not used.
0xA - 0xB (int16): External file index for unknown file. 0xFFFF if file is not used.
```

While there are no known variable data section entries that contain even
a single model attachment by bones per sub-entry, it is likely that the
following pattern can be used for an entry with two model attachments by
bones per sub-entry.

```
0x0 - 0x1 (uint16): External file index.
0x2 - 0x3 (int16): External file index for frdv file. 0xFFFF if file is not used.
0x4 - 0x5 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x6 - 0x7 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x8 - 0x9 (int16): External file index for sim file. 0xFFFF if file is not used.
0xA - 0xB (int16): External file index for unknown file. 0xFFFF if file is not used.
0xC - 0xD (uint16): Optional external file index. 0xFFFF if file is not used.
0xE - 0xF (int16): External file index for frdv file. 0xFFFF if file is not used.
0x10 - 0x11 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x12 - 0x13 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x14 - 0x15 (int16): External file index for sim file. 0xFFFF if file is not used.
0x16 - 0x17 (int16): External file index for unknown file. 0xFFFF if file is not used.
```

#### Attaching Models by Connection Point

If an entry contains at least two sub-entries and each sub-entry
contains at least one model attachment by connection point, one of the
sub-entries will have its model attached randomly while the others are
ignored.

```
0x0 - 0x3 (uint32): Connection point hash (StrCode32).
0x4 - 0x7 (uint32): "" (empty string) hash (StrCode32).
0x8 - 0x9 (uint16): External file index.
0xA - 0xB (int16): External file index for frdv file. 0xFFFF if file is not used.
0xC - 0xD (int16): External file index for unknown file. 0xFFFF if file is not used.
0xE - 0xF (int16): External file index for unknown file. 0xFFFF if file is not used.
0x10 - 0x11 (int16): External file index for sim file. 0xFFFF if file is not used.
0x12 - 0x13 (int16): External file index for unknown file. 0xFFFF if file is not used.
```

While there are no known variable data section entries that contain more
than one model attachment per sub-entry, it is likely that the following
pattern can be used for an entry with two model attachments by
connection point per sub-entry.

```
0x0 - 0x3 (uint32): Connection point hash (StrCode32).
0x4 - 0x7 (uint32): "" (empty string) hash (StrCode32).
0x8 - 0x9 (uint16): External file index.
0xA - 0xB (int16): External file index for frdv file. 0xFFFF if file is not used.
0xC - 0xD (int16): External file index for unknown file. 0xFFFF if file is not used.
0xE - 0xF (int16): External file index for unknown file. 0xFFFF if file is not used.
0x10 - 0x11 (int16): External file index for sim file. 0xFFFF if file is not used.
0x12 - 0x13 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x14 - 0x17 (uint32): Connection point hash (StrCode32).
0x18 - 0x1B (uint32): "" (empty string) hash (StrCode32).
0x1C - 0x1D (uint16): Optional external file index. 0xFFFF if file is not used.
0x1E - 0x1F (int16): External file index for frdv file. 0xFFFF if file is not used.
0x20 - 0x21 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x22 - 0x23 (int16): External file index for unknown file. 0xFFFF if file is not used.
0x24 - 0x25 (int16): External file index for sim file. 0xFFFF if file is not used.
0x26 - 0x27 (int16): External file index for unknown file. 0xFFFF if file is not used
```

### External File Section

This section contains a list of hashes (PathCode64) for external files
used by the fv2. This list can include fmdl files, frdv files, ftex
files, and sim files. This allows the fv2 to attach models together,
change the texture that's applied to the model, and apply physics
simulations to the model.

`0x0 - 0x7 (uint64): File hash (PathCode64).`

## Ground Zeroes .FOVA

.FOVA, or Form Variation, is a format used to make in-game changes to
models in Metal Gear Solid V: Ground Zeroes. The known functionality
available to it is the ability to change a model's textures and show and
hide a model's meshes via mesh groups. It is a predecessor to .FV2, and
shares similar functionalities with it. The complete functionality of
.FOVA is also unknown. The format is Little-Endian, meaning bytes are
written in reverse order of significance.

### Header

```
0x00-0x06 - String "FOVAwin" (PS3 is "FOVAps3")
0x07 - Version
0x08-0x0b - Offset to Entry Definitions (so always 0x14)
0x0c-Ox0d - Entry count
0x10-0x13 - Unknown, always 0x07
```

### Entry Definition

Entries may contain only texture swaps, only mesh showing or hiding, or
even both.

```
0x00 - Type enum.
0x01 - Visibility enum.
0x02 - Amount of meshes to hide or show.
0x03 - Amount of texture swaps.
```

Entries are sorted by ascension of the type enum.

### Sub-Entry Definitions

Mesh group, an sub-entry per mesh count.

`0x00-0x03 - StrCode32 hash of the mesh group.`

Texture swaps, a sub-entry per texture swap count.

```
0x00-0x03 - Material instance name StrCode32 hash.
0x04-0x07 - Texture type StrCode32 hash.
0x08 - The .ftex texture path begins. Unknown.
```

Mesh groups are always listed before texture swaps in the sub-entries,
if the entry requires sub-entries for both types of sub-entries. If the
amount of meshes to hide or show is 0x00, no mesh group hashes will be
listed in the sub-entry. If there are more than one, they will be listed
one after the other. The same applies to texture swaps, and with every
swap, the material instance, texture type and, of course, the .ftex
texture path hashes are listed again as well.

If Visibility enum in the entry is 0x00, the .FOVA will hide the mesh
groups in its sub-entries, 0x01 - show and apply the texture swaps in
the sub-entries, 0x02 - it will apply only the sub-entries in this entry
and not the other entries in the same Type enum, and 0x03 - it will
apply its sub-entries at complete random, regardless of entries with the
same Type enum.

### Hashed Texture Path

```
0x00 - Length of the texture path, including this byte and the last null.
0x01 - 0x04 - string - "/as/"
0x05 - Always 0x07, unknown
0x06 - 0x0E - Unknown (Hash?)
0x0F - 0x10 - Always 0x510B
0x11 - 0x19 - Unknown (Hash?)
0x1A - 0x1C - Always 0x0B0B0B
0x1D - length varies - Unknown (Hash?)
Last 6 bytes: string - ".ftex" and one null
```

It is unknown how exactly .FOVA stores texture paths, but it does start
with a byte representing the length of the hash and a four-byte string
"/as/", and ends with the string ".ftex" and a null byte.

The third unknown hash changes length depending on the length of the
texture path it's supposed to represent. The reason is unknown. All
three hashes completely change even if one symbol in the unhashed
texture path changes. The length of the third part of the hash varies
depending on the length of the path and file name, being as long as the
file name, plus four bytes.

In Big Endian PS3 files, texture paths here are not hashed and are
presented as the real texture paths:

```
0x00 - Length of the texture path, including this byte and the last null.
Texture path.
One null byte.
```
