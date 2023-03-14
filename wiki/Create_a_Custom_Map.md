---
title: Create a Custom Map
permalink: /Create_a_Custom_Map/
---

The guide will present a custom map template by **CapLag** and scan the
file to understand how to work with a new simple map. With no Small
Blocks. Download
[Sample_Empty_Map_No_Small_Blocks_b11](https://drive.google.com/file/d/1MWWUN4U0chH84fnAprCx1lbIL5BDbQPf/view?usp=sharing).

The user could probably just run the Sample map and it should work fast
to test how it is...



### **Create the ModFolder**

Change the Main Name to fit your taste.
[left|490.979x490.979px](/File:Map01.jpg "wikilink")

Inside the ModFolder should have the Assets and GameDir. The smpl is the
four letter that will be the unique name for the custom location.
"**afgh**", "**mafr**", "**cypr**", "**mtbs**" are examples. In this
guide we will change smpl to "**mapa**". It can be whatever the modder
think would be better and unique.

Change the name of smpl_fpk and smpl_fpkd in mapa to **mapa_fpk** and
**mapa_fpkd.** This does not matter much as long in the location script
it calls for the right name. Its a matter of organization only as you
can have as many fpk/fpks folder with any name.

[578.974x578.974px](/File:Map02.jpg "wikilink")

mapa.fpk will have the fmdl/geom, twpf, frt, motions, nav2, lba and
whatever...

mapa.fpkd will have the data, the fox2 files, scripts, sounds and
effects.

### **mapa_fpkd**

Inside the Map should have three folders. **level**, **level_asset**
and **ui**.

In **level_asset**. Should have the block data of Player, Buddy and
Vehicle. No Need to change things here.

In **ui**. Same above, just a default controller.

In **level**. Change the 4 letter smpl to the "mapa" as well the three
files. The fox2 files does not matter much which name have here unless
it need to reference them in some entities like GeoTrap.

[516.981x516.981px](/File:Map03.jpg "wikilink")

#### **mapa_common_asset_floor.fox2**

The **mapa_common_asset_floor.fox2** is the file where store the data
in which a staticmodel called mtbs_flor011.fmdl is placed, rotated and
scaled. To have a look in the file download
[FoxTool](/FoxTool "wikilink") and unpack the fox2. And see the guide
from [Foxkit: StaticModel and
GeoxCollisionFreeShape](/Foxkit:_StaticModel_and_GeoxCollisionFreeShape "wikilink")
to understand how to add more assets to the custom map. Modder can place
as many fox2 files with new assets here.

#### **mapa_common_data.fox2**

The **mapa_common_data.fox2** load the Entity TppLocationData. Modder
should change the name of it to mapa_location where smpl_location is.

While **locationId** works with 0, it might be interesting to choose a
unique one. Please see [Things Codes](/Things_Codes "wikilink") to have
a look of each number location is already taken.

For the map have weather the user should write down a path between
<value></value> to twpf file where it should be in
**fpk/Assets/tpp/level/location/mapa/** folder. It can be empty for now.

**scriptPath** to be write.

[619.976x619.976px](/File:Map04.jpg "wikilink")

#### **mapa_mission_block.fox2**

Just add the TppSimpleMissionBlockControllerData for probably load the
mission area.

### **mapa_fpk**

The Template only load the StaticModel mtbs_flor011.fmdl and the geom.

[446.993x446.993px](/File:Map05.jpg "wikilink")

But after the fpk/Assets/tpp the modder could store a lot of types of
files here. For add the assets like rocks, trees, ground, houses it goes
to **environ folder.** If need to add a sky_dome it needs **effect
folder**. If need to add mtar files, it goes to **motion folder**. If
need to add weapon it goes to **weapon Folder**. And of course the
**level folder** where files for weather, navigation, lba, geoms, obr,
light, paths goes.

### **GameDir**

GameDir will have the inital location script and the initial mission
script to prepare the packs and position. Inside the SMPL.lua have also
CapLag's comments about each folder and file which makes this guide a
few unecessary, lol.

#### **Location**

Change the name of SMPL.lua to the one we think. Open the file using any
editor that accepts lua.

Change the locationName, add the locationId choose. And change the path
of the fpk to the right one otherwise it wont load the map. Note that
inside the packs it can have more fpks after a comma. Example:

packs= { "/Assets/tpp/pack/location/mapa/mapa.fpk",
"/Assets/tpp/pack/location/mapa/secondFPK.fpk", },

[588.951x588.951px](/File:Map06.jpg "wikilink")

#### **Missions**

The sample map have a 12000_sample. The code need to be unique as it
may get conflicted with another one with the same name. 12000 is of
course none of the Vanilla have and its unlikely to any mod show that
soon because we dont have much mod maps available... For that, lets
choose 12004 as the code for the mission in this guide.

Open the file and change the missionCode, add the right location.

The pack here loads a minimal mission fpk that Infinity heaven already
load. If the user wants to write a unique mission fpk, the path should
point to the modFolder/Assets/tpp/pack/mission2 and not in location.

And the startPos should write the coords for where the Player will
Spawn.

[660.979x660.979px](/File:Map07.jpg "wikilink")

### **Build and test it**

If the modder wants to expanding the map. Please see check [Foxkit:
Installing, Import Files and
Terrain](/Foxkit:_Installing,_Import_Files_and_Terrain "wikilink") and
the follow guides. Understand how fox2 file works and get used with all
the entities game have, the folder structure of game and what file does
what. To write missions see how Sideops are made then see the sequence
luas. See lang files to add a suited name for the area as well some
images of location. This is just the beginning.