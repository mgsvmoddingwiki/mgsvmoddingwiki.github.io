---
title: OBR
permalink: /OBR/
tags: [Level, File Formats]
---

[Documentation credited by
youarebritish](https://forum.xentax.com/viewtopic.php?f=10&t=12407&p=136170#p136170):

<references group="https://forum.xentax.com/viewtopic.php?f=10&t=12407&p=136170#p136170" />

Object Brush (obr) files are used in Cyprus and Mother Base to place
grass, bushes, and other misc semi-procedural debris. There's a
corresponding _objBrush.fox2 which sets up data such as what fmdl to
place. I believe v2 and v3 are components of a location, rotation, or
scale but am not sure just yet. I also believe v5a is some kind of
index, but I'm not sure into what yet.

.obr files are essentially arrays of transforms and rotations where
objects(such as grass) are placed within the map.

## Theories

Working theory is that the file types tre, htre, obr, obrb, lpsh, and
atsh were designed by the same engineer. Reasoning behind this theory is
due to the high-level structure that these formats use, are not found in
other filetypes. fstb and twpf are the same way, however hold different
structure.

When placing terrain decorations, the shadows are not included in the
file.(?) It's not known for sure what's in the files besides coordinate
arrays.

See also: [OBRB](/OBR)