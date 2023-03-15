---
title: Create a Custom Map
permalink: /Create_a_Custom_Map/
tags: [Guides, FoxKit]
---

The guide will present a custom map template by **CapLag** and describe
the file to help understand how to work with a new simple map with no
small blocks.

Download:
[Sample_Empty_Map_No_Small_Blocks_b11](https://drive.google.com/file/d/1MWWUN4U0chH84fnAprCx1lbIL5BDbQPf/view?usp=sharing)
Requires [Infinite Heaven](/Infinite_Heaven "wikilink"). You could
probably just run the sample map and it should load fast.

## **Creating the Mod Folder**

Unpack the .mgsv with your preferred archive unzipper tool. Change the
name of the folder to fit your taste.

[<File:Map01.jpg>](/File:Map01.jpg "wikilink")

Inside the Mod Folder, you should have the folders Assets and GameDir.
`smpl` is the four letter name that will be the unique locationName for
your custom location. `afgh`, `mafr`, `cypr`, `mtbs` are some of what's
used by the game, for example, in its vanilla
[Locations](/Locations "wikilink"). In this guide we will use `mapa`,
and change all instances of `smpl` in the example to that. It can be
whatever you think would be better and unique.

Change the name of `smpl.fpk` and `smpl.fpkd` in `mapa` to `mapa.fpk`
and `mapa.fpkd`, and then unpack them with a recent enough version of
[GzsTool](/GzsTool "wikilink"). The renaming doesn't matter much as long
as the location script calls for the right path. It's a matter of
organization only as you can have as many `.fpk`/`.fpkd` folders with
any names. MakeBite from [SnakeBite](/SnakeBite_Mod_Manager "wikilink")
will pack all `_fpk` and `_fpkd` folders to `.fpk` and `.fpkd` pack
files.

[<File:Map02.jpg>](/File:Map02.jpg "wikilink")

`mapa.fpk` will have assets such as .[fmdl](/FMDL "wikilink"),
.[geom](/GEOM "wikilink"), .[twpf](/TWPF "wikilink"),
.[frt](/FRT "wikilink"), [motions](/MTAR "wikilink"),
.[nav2](/nav2 "wikilink"), .[lba](/LBA "wikilink") and whatever...

`mapa.fpkd` will have various accompanying object placement parameter
data, such as .[fox2](/FOX2 "wikilink"), [scripts](/Lua "wikilink") and
.[vfx](/VFX "wikilink").

### **Main Location .fpkd Pack Contents**

Inside the _fpkd folder there should be three folders: `level`,
`level_asset` and `ui`.

In `level_asset`, there should be the block data loading .fox2 dataset
files for memory allocation of the player block, buddy block and vehicle
block. No need to change things here, though maps have been known to
work even without the player block entity.

In `ui`, the `result_option_subtitles_boot.fox2` will load the subtitles
for the result screen. It's not needed for the map to function, but all
maps place this here.

In `level`, change the 4 letter `smpl` name to your `mapa` equivalent,
as well the these three files. The `.fox2` files here don't matter much,
and neither do their names, unless they need to be referenced by
`EntityLink` references in some `.fox2` entities.

[516.981x516.981px](/File:Map03.jpg "wikilink")

#### **_common_asset_floor.fox2**

The `_common_asset_floor.fox2` is the dataset which stores the data in
which a `.fmdl`/`.geom` pair from the `.fpkd`'s associated `.fpk` called
`mtbs_flor011` is placed as a `StaticModel`, rotated and scaled. To edit
`.fox2` files in XML, download [FoxTool](/FoxTool "wikilink") and unpack
the `.fox2`. Check out the guide [FoxKit: StaticModel and
GeoxCollisionFreeShape](/FoxKit-_StaticModel_and_GeoxCollisionFreeShape "wikilink")
by **Ventos** to understand more about how to add more assets to the
custom map. You can place as many `.fox2` files with as many placed
assets in them as the game could possibly take it. You can completely
remove this file along with the `.fpk`'s `mtbs_flor011` `.fmdl`/`.geom`
pair, as the map doesn't require a floor for the player to stand on -
there's already an invisible floor at Y -80, so while testing the map,
you can simply specify the later described mission `.lua` script's
`startPos`'s Y value to -79.2 to safely spawn on the always present
invisible floor.

#### **_common_data.fox2**

The `_common_data.fox2` defines the entity `TppLocationData`. It doesn't
matter much in terms of the map actually loading in, so you can leave it
out for now, if you don't deem the sky tinting, global fog and color
correction parameters important for your map just yet.

You should change the name of it to `mapa_location` (or with your
equivalent of `mapa`) where `smpl_location` is.

While `locationId` works with 0, like it does with MGO maps it might be
interesting to choose a unique one, and you will need to pick one later
in the location `.lua` script later on. Please see [Things
Codes](/Things_Codes "wikilink") to have a look of each number location
is already taken by the vanilla game. There aren't many custom locations
at the moment, so there's no need for a custom location number id
reservation system. To follow the vanilla game's location ids count,
anything beyond 120 is fine.

`scriptPath` has yet to be seen in vanilla uses with anything but an
empty value, so it can be left as is.

For the map to have weather and sky tinting based on time of day, you
should write down a path between <value></value> to the weather
parameters file, .twpf, where it should be in
`mapa_fpk/Assets/tpp/level/location/mapa/` folder, like:
<value>`/Assets/tpp/level/location/mapa/mapa_weatherParams.twpf`</value>
It can be empty for now. There's no tools yet to generate `.twpf` files
yet, so it's best to reuse vanilla ones from TPP and onwards.

[<File:Map04.jpg>](/File:Map04.jpg "wikilink")

#### **_mission_block.fox2**

This dataset loads the important `TppSimpleMissionBlockControllerData`
entity. It has to be in, but doesn't require any changes. You can rename
the .fox2's name, though.

### **Main Location .fpk Pack Contents**

The template map only loads the `StaticModel` `mtbs_flor011.fmdl` and
`.geom`. If you removed the floor dataset as previously suggested, you
can remove these ones as well.

[446.993x446.993px](/File:Map05.jpg "wikilink")

`_fpk/Assets/tpp` could store a lot of types of asset files.
Environmental assets like rocks, trees, ground and houses can be found
in the `environ` folder**.** If a `location_common_sky.fox2` dataset
needs a sky model, it'll look for a `sky_dome` in the `effect` folder.
If a dataset needs to add `.mtar` files, it'll look in the `motion`
folder. If it needs to find a weapon model, it'll look in the `weapon`,
so on and so forth. And, of course, the `level` folder which stores
files like `.twpf`, `.nav2`, `.lba`, `.geoms`, .`obr`, `.grxla`,
`.gpfp`, etc. It's best to look up examples of the uses of those
entities in vanilla maps, and when tools are made to create them, there
should be guides here on how to create them and made your map use them\!

## **GameDir Folder**

`The GameDir` folder will have the external Infinite Heaven add-on
location `.lua` script and the mission add-on `.lua` script to prepare
the pack paths and other parameters for Infinite Heaven to pipeline and
inject into the game's location and mission definition tables.

### **Location**

Inside the `GameDir/mod/location/SMPL.lua` script you will also find
CapLag's initial comments on these files and parameters. Change the name
of `SMPL.lua` to your location's name. Open the file using any editor
that accepts `.lua`, like Notepad++ or Visual Studio.

Change the `locationName` and the `locationId` according to our previous
changes to the TppLocationData, and change the path to the `.fpk` to the
right one, also according to our previous changes. Make sure your paths
always start with `/Assets/` and use `/` instead of `\`. Note that
inside the packs, you can specify multiple `.fpk` paths as a list, for
example:

`packs= { "/Assets/tpp/pack/location/mapa/mapa.fpk",
"/Assets/tpp/pack/location/mapa/secondFPK.fpk", },`

[<File:Map06.jpg>](/File:Map06.jpg "wikilink")

### **Mission**

The sample map file has a `12000_sample.lua` script: the code in the
name needs to be unique as it might conflict with another one with the
same name. `12000` is of course none of the vanilla have, and it's
unlikely for any mod show that soon, because we don't have much mod maps
available. You can choose any mission id from the 12k range for testing,
but for release you should contact us at Modders' Heaven to reserve a
mission id, so anything in the 13k range above `13010` is fine.
Currently there's not many mission mods, so no serious mission reserving
system is in place yet.

Open the mission add-on `.lua` script and change the `missionCode`, add
the right location.

The pack here loads a minimal sample mission `.fpk` that's already
included with Infinite Heaven. If you want to make a unique mission
`.fpk` with NPCs and objectives and such, the path should point to
another `.fpk` in `/Assets/tpp/pack/mission2/` and not in `location`.

And the `startPos` should write the coordinates for where the player
will spawn on mission start. if you previously removed the floor dataset
as suggested, change the Y, the second value, to -79.2.

For further mission and location add-on script parameters, check out
Infinite Heaven's `InfMission.lua` script usually found in `/MGS_TPP or
GameDir/mod/modules/InfMission.lua`.

[<File:Map07.jpg>](/File:Map07.jpg "wikilink")

## **Building and Testing It**

If you wish to expand the map, check out the guide [FoxKit: Installing,
Import Files and
Terrain](/FoxKit-_Installing_Import_Files_and_Terrain "wikilink") by
**Ventos**. You should understand how `.fox2` file works and get used to
all the entities game has, the folder structure of game and what file
does what. To write missions, see how side ops are made with [Side Op
Companion](https://github.com/JosephZoeller/SOC), how other users'
locations missions and side ops are made, or how all of the above work
in the vanilla game. See .lng2 files to add a suited name for the area
as well some images of location. This is just the beginning.