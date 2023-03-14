---
title: TRAP
permalink: /TRAP/
---

**TRAP**, or GeoTrapFile, is a format used in Metal Gear Solid V: The
Phantom Pain and Metal Gear Survive to mark areas in the level that can
trigger certain commands when entered, like changing the player's camera
mode, first person view when crawling in tight areas, areas where the
character instantly dies, and more. The format is Little-Endian, meaning
bytes are written in reverse order of significance.

Header 0x00-0x03 - Unknown/file type name? 0x04-0x07 - Version 0x08-0x09
- File size 0x0A-0x0B - Padding 0x0C-0x0F - PathCode32 Hash: path to the
attached .fox2 dataset 0x10-0x27 - Padding 0x28-0x2C - Unknown, always
10 00 00 00 30 0x2D-0x2F - Padding 0x30-0x31 - File size + 0x10 bytes
0x32-0x43 - Padding 0x44-0x45 - Amount of entries 0x46-0x4F - Padding

Offsets section 0x00-0x03 - Offset from start of the offset section to
the entry If all the entries in the offsets section don't fill in the
0x0F line at the end, the rest is filled with padding.

Entry header 0x00-0x01 - Entry type (13 00 for box shape, 1B 00 for
(possbily inverted?) vector shape) 0x02 - Unknown, always 80 0x03 -
Amount of shape entries (not vector points) 0x04-0x0F - padding 0x10 -
Trigger type enum 1 0x11 - Trigger type enum 3 0x12 - Trigger type enum
3 0x13 - Trigger type enum 4 (usually 02) 0x14-0x17 - Padding 0x18-0x1B
- StrCode32 hash of entry's name 0x1C-0x1F - Padding

Shape subentry - Vector Shape type 0x00-0x03 - Float for coordinate,
unknown 0x05-0x07 - Float for coordinate, unknown 0x08 - Amount of
vector points 0x09-0x0A - Padding 0x0B - Unknown, always 20 0x0C-0x0F -
Padding 0x10-0x1F - Padding

Vector point subsubentry 0x00-0x03 - Float - X coordinate of vector
point 0x04-0x07 - Float - Y coordiante of vector point 0x08-0x0A - Float
- Z coordinate of vector point 0x0B-0x0F - Padding

Shape subentry - Box Shape type 0x00-0x03 - Float - X coordinate of box
center 0x04-0x07 - Float - Y coordiante of box center 0x08-0x0A - Float
- Z coordinate of box center 0x0B-0x0F - Padding 0x10-0x1F - Padding
0x20-0x23 - Float - Rotation matrix, row 1 column 1 0x24-0x27 - Float -
Rotation matrix, row 1 column 2 0x28-0x2A - Float - Rotation matrix, row
1 column 3 0x2B-0x2F - Padding 0x30-0x33 - Float - Rotation matrix, row
2 column 1 0x34-0x37 - Float - Rotation matrix, row 2 column 2 0x38-0x3A
- Float - Rotation matrix, row 2 column 3 0x3B-0x3F - Padding 0x40-0x43
- Float - Rotation matrix, row 3 column 1 0x44-0x47 - Float - Rotation
matrix, row 3 column 2 0x48-0x4A - Float - Rotation matrix, row 3 column
3 0x4B-0x4F - Padding 0x50-0x53 - Float - X scale 0x54-0x57 - Float - Y
scale 0x58-0x5A - Float - Z scale 0x5B-0x5F - Float - W scale (1) The
scales need to be divided by 2 to match where they're actually triggered
in-game. 0x10 of null padding ends the list of box shape type subentries
(not for vector shape types)

Trigger type enums Vector type: 00 10 00 02 - Inner zone 00 20 00 02 -
Outer zone 00 40 00 02 - Hot zone Box type: 00 00 00 02 - Intrude (first
person view when crawling) under bed in afgh_citadel 00 00 20 02 -
Doors 00 00 80 02 - Unknown 01 00 00 02 - Intrude 01 00 00 42 - Unknown
02 00 00 02 - SoldierInGuardTower (Guard on top of tower - can't check
out a suspicous man himself and will instead call in someone else to
check) 08 00 00 02 - FallDeath (Kills the entering character) 08 04 00
02 - FallDeath (Camera won't follow the player when he dies, so for
falling from cliffs) 10 00 00 02 - Intrude 14 00 80 02 - Camera mode:
Player's boots are barely visible, 20 00 00 02 - Camera mode: Player's
feet aren't visible when facing the camera 20 00 80 02 - Unknown 24 00
80 02 - Camera mode: Indoors? 30 00 00 02 - Camera mode: Never seen in
vanilla. When facing camera, back foot is standing on frame. 40 00 00 02
- Camera mode: Lower and closer, (Cages in mafr, similar to cages and
huts and watchtowers in gntn) 40 00 20 02 - Camera mode: MGO cuba
underground entrance, and also watchtower south of helipad, similar to
above 40 00 80 02 - Unknown 42 00 00 02 - Unknown
(mafr_banana_gimmick) 80 00 00 02 - Camera mode: Extremely close, up
to the chest (mostly used in mgo) up to Snake's chest, almost aiming
mode-like, very similar to most of Shining Lights