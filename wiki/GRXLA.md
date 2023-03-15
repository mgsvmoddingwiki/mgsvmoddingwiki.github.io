---
title: GRXLA
permalink: /GRXLA/
tags: [File Formats, Rendering]
---

**GrxLA**, or **Grx** **L**ight **A**rray, is a file format used by
Metal Gear Solid V: Ground Zeroes, The Phantom Pain and Metal Gear
Survive to store light entity data, such as Light Probes, Point Lights,
Spotlights and in similar .grxoc files, Occluder Arrays. .grxla files
can either only have Light Probe entries or Point Light and Spotlight
entries, and .grxoc files can only have an Occluder Array entry. The PC
version's format is Little-Endian, meaning bytes are written in reverse
order of significance.

## Format

### Header

  - 0x0-0x3 - Signature. "FGxL" in .grxla files and "FGxO" in .grxoc.
  - 0x4-0x7 - Always empty.
  - 0x8-0xB - Header size? Always 10.
  - 0xC-0xF - Always 1.

### Entries

Entries are listed arbitrarily with no set count. They always start with
a "CM00" DataSet Path entry and end with an empty null eight byte long
entry.

  - 0x0-0x3 - Entry type.
  - 0x4-0x7 - Entry size.

The following is part of the entry depending on the Entry Type:

#### DataSet Entry: "CM00"

The DataSet entry appears as the first entry of every .grxla and .grxoc
file. It defines the path to the .fox2 DataSet file that has the
LightArray, TppLightProbeArray or OccluderArray class entity that loads
the .grxla or .grxoc file with a path to it. The ulong values are
different between files and all of them are unknown, and they are most
likely arbitrary names of the array.

  - 0x0-0x7 - An unknown uint64 hash, different for all files. Most
    likely not important.
  - 0x8-0xB - Always 8. Local offset to string?
  - 0xC-0xF - Always 0.
  - 0x10 - Null-terminated string path to the .fox2 that uses the file.

If the string's length including the null terminator byte aren't
divisible by 4, then the remainder to the next byte count divisible by 4
will be padded out to with zeroes.

#### Array Terminator Entry: ""

This is the entry at the end of every .grxla and .grxoc file. Seeing how
light arrays don't define an array entry count, this entry is most
likely for signifying that the array has ended. It only contains the
entry type (4 zero bytes) and the entry size (8 bytes, including the
entry type and entry size).

#### Directional Light : "DL00"

This entry is never seen in binary files in the wild, but is mentioned
in the .exe.

#### Point Light: "PL01," "PL02" and "PL03"

These entries define point lights. There are three versions - PL01 is
never seen in binary files in the wild and only mentioned in the .exe,
PL02 is only used in Ground Zeroes but can still work in The Phantom
Pain and PL03 is used in The Phantom Pain and beyond.

  - 0x0-0x7 - StrCode64 hash of the light name. The string is listed
    later in PC files.
  - 0x8-0xB - Local offset to the string of the light name. PS3 TPP
    files don't use strings, so these offsets are empty.
  - 0xC-0xF - Unknown flags.
  - 0x10-0x13 - Light flags. 0x1 is Enable, 0x2 is Cast Shadow, 0x8 is
    Has Specular, and there are many more.
  - 0x14-0x17 - Unknown flags.
  - 0x18-0x1B - Local offset to Light Area. Lights that don't use a
    Light Area have this value as 0.
  - 0x1C-0x1F - Translation X float.
  - 0x20-0x23 - Translation Y float.
  - 0x24-0x27 - Translation Z float.
  - 0x28-0x29 - Reach point X half float.
  - 0x2A-0x2B - Reach point Y half float.
  - 0x2C-0x2D - Reach point Z half float.
  - 0x2E-0x2F - Color Red half float.
  - 0x30-0x31 - Color Green half float.
  - 0x32-0x33 - Color Blue half float.
  - 0x34-0x35 - Color Brightness half float.
  - 0x36-0x37 - Temperature half float.
  - 0x38-0x3B - Color deflection float.
  - 0x3C-0x3F - Lumen float.
  - 0x40-0x41 - Light size half float.
  - 0x42-0x43 - Dimmer half float.
  - 0x44-0x45 - Shadow bias half float.
  - 0x46-0x47 - LOD far size half float.
  - 0x48-0x49 - LOD near size half float.
  - 0x4A-0x4B - LOD shadow draw rate half float.
  - 0x4C-0x4F - LOD radius level uint.
  - 0x50-0x53 - LOD fade type uint.
  - 0x54-0x57 - Local offset to irradiation point. Entries that don't
    have an irradiation point have the value as 0.

If the String Offset isn't 0:

  - 0x0 - Null-terminated string name of the light.

If the string's length including the null terminator byte aren't
divisible by 4, then the remainder to the next byte count divisible by 4
will be padded out to with zeroes.

If the Offset to Light Area isn't 0:

  - 0x0-0x3 - Light area scale X float.
  - 0x4-0x7 - Light area scale Y float.
  - 0x8-0xB - Light area scale Z float.
  - 0xC-0xF - Light area rotation quaternion X float.
  - 0x10-0x13 - Light area rotation quaternion Y float.
  - 0x14-0x17 - Light area rotation quaternion Z float.
  - 0x18-0x1B - Light area rotation quaternion W float.
  - 0x1C-0x1F - Light area translation X float.
  - 0x20-0x23 - Light area translation Y float.
  - 0x24-0x27 - Light area translation Z float.

If the Offset to Irradiation Point isn't 0:

  - 0x0-0x3 - Irradiation point scale X float.
  - 0x4-0x7 - Irradiation point scale Y float.
  - 0x8-0xB - Irradiation point scale Z float.
  - 0xC-0xF - Irradiation point rotation quaternion X float.
  - 0x10-0x13 - Irradiation point rotation quaternion Y float.
  - 0x14-0x17 - Irradiation point rotation quaternion Z float.
  - 0x18-0x1B - Irradiation point rotation quaternion W float.
  - 0x1C-0x1F - Irradiation point translation X float.
  - 0x20-0x23 - Irradiation point translation Y float.
  - 0x24-0x27 - Irradiation point translation Z float.

#### Spotlight: "SL01," "SL02" and "SL03"

These entries define spotlights. There are three versions - SL01 is
never seen in binary files in the wild and only mentioned in the .exe,
SL02 is only used in Ground Zeroes but can still work in The Phantom
Pain and SL03 is used in The Phantom Pain and beyond.

  - 0x0-0x7 - StrCode64 hash of the light name. The string is listed
    later in PC files.
  - 0x8-0xB - Local offset to the string of the light name. PS3 TPP
    files don't use strings, so these offsets are empty.
  - 0xC-0xF - Unknown flags.
  - 0x10-0x13 - Light flags. 0x1 is Enable, 0x2 is Cast Shadow, 0x8 is
    Has Specular, and there are many more.
  - 0x14-0x17 - Unknown flags.
  - 0x18-0x1B - Local offset to Light Area. Lights that don't use a
    Light Area have this value as 0.
  - 0x1C-0x1F - Translation X float.
  - 0x20-0x23 - Translation Y float.
  - 0x24-0x27 - Translation Z float.
  - 0x28-0x2B - Reach point X float.
  - 0x2C-0x2F - Reach point Y float.
  - 0x30-0x33 - Reach point Z float.
  - 0x34-0x37 - Rotation quaternion X float.
  - 0x38-0x3B - Rotation quaternion Y float.
  - 0x3C-0x3F - Rotation quaternion Z float.
  - 0x40-0x43 - Rotation quaternion W float.
  - 0x44-0x45 - Outer range half float.
  - 0x46-0x47 - Inner range half float.
  - 0x48-0x49 - Umbra angle half float.
  - 0x4A-0x4B - Penumbra angle half float.
  - 0x4C-0x4D - Attenuation exponent half float.
  - 0x4E-0x4F - Dimmer half float.
  - 0x50-0x51 - Color Red half float.
  - 0x52-0x53 - Color Green half float.
  - 0x54-0x55 - Color Blue half float.
  - 0x56-0x57 - Color Brightness half float.
  - 0x58-0x59 - Temperature half float.
  - 0x5A-0x5B - Color deflection half float.
  - 0x5C-0x5F - Lumen float.
  - 0x60-0x61 - Light size half float.
  - 0x62-0x63 - Shadow umbra angle half float.
  - 0x64-0x65 - Shadow penumbra angle half float.
  - 0x66-0x67 - Shadow attenuation exponent half float.
  - 0x68-0x69 - Shadow bias half float.
  - 0x6A-0x6B - View bias half float.
  - 0x6C-0x6D - Power scale half float.
  - 0x6E-0x6F - LOD far size half float.
  - 0x70-0x71 - LOD near size half float.
  - 0x72-0x73 - LOD shadow draw rate half float.
  - 0x74-0x77 - LOD radius level flags.
  - 0x78-0x7B - LOD fade type flags.
  - 0x7C-0x7F - Local offset to irradiation point. Entries that don't
    have an irradiation point have the value as 0.

If the String Offset isn't 0:

  - 0x0 - Null-terminated string name of the light.

If the string's length including the null terminator byte aren't
divisible by 4, then the remainder to the next byte count divisible by 4
will be padded out to with zeroes.

If the Offset to Light Area isn't 0:

  - 0x0-0x3 - Light area scale X float.
  - 0x4-0x7 - Light area scale Y float.
  - 0x8-0xB - Light area scale Z float.
  - 0xC-0xF - Light area rotation quaternion X float.
  - 0x10-0x13 - Light area rotation quaternion Y float.
  - 0x14-0x17 - Light area rotation quaternion Z float.
  - 0x18-0x1B - Light area rotation quaternion W float.
  - 0x1C-0x1F - Light area translation X float.
  - 0x20-0x23 - Light area translation Y float.
  - 0x24-0x27 - Light area translation Z float.

If the Offset to Irradiation Point isn't 0:

  - 0x0-0x3 - Irradiation point scale X float.
  - 0x4-0x7 - Irradiation point scale Y float.
  - 0x8-0xB - Irradiation point scale Z float.
  - 0xC-0xF - Irradiation point rotation quaternion X float.
  - 0x10-0x13 - Irradiation point rotation quaternion Y float.
  - 0x14-0x17 - Irradiation point rotation quaternion Z float.
  - 0x18-0x1B - Irradiation point rotation quaternion W float.
  - 0x1C-0x1F - Irradiation point translation X float.
  - 0x20-0x23 - Irradiation point translation Y float.
  - 0x24-0x27 - Irradiation point translation Z float.

#### "LP00"

This entry is never seen in binary files in the wild, but is mentioned
in the .exe.

#### Light Probe: "EP00"

These entries define light probes.

  - 0x0-0x7 - StrCode64 hash of the probe name. The string is listed
    later in PC files.
  - 0x8-0xB - Local offset to the string of the light name. PS3 TPP
    files don't use strings, so these offsets are empty.
  - 0xC-0xF - Unknown flags.
  - 0x10-0x13 - Light flags. 0x1 is Enable, 0x2 is Cast Shadow, 0x8 is
    Has Specular, and there are many more.
  - 0x14-0x17 - Unknown flags.
  - 0x18-0x19 - Inner scale X positive half float.
  - 0x1A-0x1B - Inner scale Y positive half float.
  - 0x1C-0x1D - Inner scale Z positive half float.
  - 0x1E-0x1F - Inner scale X negative half float.
  - 0x20-0x21 - Inner scale Y negative half float.
  - 0x22-0x23 - Inner scale Z negative half float.
  - 0x24-0x27 - Bounding box Scale X float.
  - 0x28-0x2B - Bounding box Scale Y float.
  - 0x2C-0x2F - Bounding box Scale Z float.
  - 0x30-0x33 - Bounding box Rotation quaternion X float.
  - 0x34-0x37 - Bounding box Rotation quaternion Y float.
  - 0x38-0x3B - Bounding box Rotation quaternion Z float.
  - 0x3C-0x3F - Bounding box Rotation quaternion W float.
  - 0x40-0x43 - Bounding box Translation X float.
  - 0x44-0x47 - Bounding box Translation Y float.
  - 0x48-0x4B - Bounding box Translation Z float.
  - 0x4C-0x4F - Unknown float. Translation W?
  - 0x50-0x51 - Priority short.
  - 0x52-0x53 - Shape type ushort. 0 - default square, 1 - triangular
    prism, 2 - semi-cylindrical, 3 - half-square.
  - 0x54-0x55 - Related light index from the list property in the
    .fox2's TppLightProbeArray.
  - 0x56-0x57 - Spherical harmonics data index from the list property in
    the .fox2's TppLightProbeArray.
  - 0x58-0x5B - Unknown float. Open occlusion mode?
  - 0x5C-0x5F - Unknown float. Always 0.

If the String Offset isn't 0:

  - 0x0 - Null-terminated string name of the light.

If the string's length including the null terminator byte aren't
divisible by 4, then the remainder to the next byte count divisible by 4
will be padded out to with zeroes.

#### Occluder array entry: "OC00"

  - 0x0-0x3 - Unknown integer.
  - 0x4-0x7 - Local offset to faces array.
  - 0x8-0xB - Faces count.
  - 0xC-0xF - Local offset to vertices array. Always 8.
  - 0x10-0x13 - Vertices count.

For every vertex:

  - 0x0-0x3 - Translation X.
  - 0x4-0x7 - Translation Y.
  - 0x8-0xB - Translation Z.
  - 0xC-0xF - Translation W, always 1.0.

For every face:

  - 0x0-0x1 - Unknown index.
  - 0x2-0x3 - Unknown index.
  - 0x4-0x5 - First vertex index.
  - 0x6-0x7 - Vertex count.