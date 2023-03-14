---
title: Foxkit: Installing, Import Files and Terrain
permalink: /Foxkit-_Installing,_Import_Files_and_Terrain/
---


{| class="article-table" |+The other FoxKit Tutorials \![Foxkit:
StaticModel and
GeoxCollisionFreeShape](/Foxkit:_StaticModel_and_GeoxCollisionFreeShape "wikilink")
|- |[**Foxkit: TppPrimRiverModel, TppWaterBounding, TppTextureLoader and
FxLocatorData**](/Foxkit:_TppPrimRiverModel,_TppWaterBounding,_TppTextureLoader_and_FxLocatorData "wikilink")
|- |**[Foxkit:
TppSharedGimmickData](/Foxkit:_TppSharedGimmickData "wikilink")** |}

## **Installing FoxKit**

Download at <https://github.com/youarebritish/FoxKit>

Click Code (green button) \> Download zip

Unzip Foxkit-master somewhere. The Foxkit folder within this is a Unity
Project.

Open Unity 2018.3.6f1 (64-bit). Probably there is a better version, but
this one works fine with current FoxKit.

File \> Open Project. Point it to FoxKit-master\\FoxKit

Loading will take a long time.

[555x555px](/File:Foxkit_Window.jpg "wikilink")

## **Extracting Game Files and Texture Folder**

Please see [File Monolith](/File_Monolith "wikilink"). Using Archive
Unpacker in all the four-five chunks to one main folder should be ok.

[466x466px](/File:Foxkit03.jpg "wikilink")

In general Foxkit works by replicating the mgsv Assets files in the
Foxkit Assets folder, though due to the time to import different files
you should limit what you copy in to what you're working on.

Just an example:[none|thumb](/File:AssetsFolder.jpg "wikilink")
Texture chunks do not need to be imported into the Foxkit folder, and
are set up differently. Extract and convert all the texture in dds with
the tools in File monolith and place wherever outside Unity. After that
go to menu **Unity/FMDL studio/ Set Texture Folder.**

**It's highly important do it now, before import assets of the game in
Unity as we'll see later.**


\==**Loading TerrainFile**== This guide will treat a small area of
location AFGH loading just a few tiles.

#### **Finding the .tre2 file (TerrainFile)**

Go to **chunk_all/Assets/tpp/pack/location/afgh/pack_common.** Inside
the pack_common there are the Fox Packages. Extract
**afgh_common.fpk**. Continue to open the folder.
**afgh_common_fpk/Assets/tpp/level/location/block_common/.** Here
there is afgh_common_terrain.tre2.

[554x554px](/File:Tre2.jpg "wikilink")

Now, create all those paths that you find the tre2 inside Unity and copy
paste the file. Below it can see the afgh_common_terrain.tre2 in the
right folder.

[493x493px](/File:Inunity.jpg "wikilink")

## **Loading TerrainTileFile**

Afghanistan location has 128x128 tiles. But here we will load just a
small area. The user can load all the tiles and wait a lot to load in
Unity or find a few one and work isolate with each one. The follow tiles
will be choose:

afgh_130_146 and afgh_130_148

Go to
**chunk_all/Assets/tpp/pack/environ/stagelow/afgh/small_lod0/130/**

Extract the two Fox Packages, **afgh_slod0_130_146.fpk and
afgh_slod0_130_148.fpk** See below:

[<File:Fox04.jpg>](/File:Fox04.jpg "wikilink")

Copy and paste this folder path to Unity.
**Assets/tpp/pack/environ/stagelow/afgh/small_lod0/130/** and copy
paste the fpks inside of 130.

[543x543px](/File:Iunity.jpg "wikilink")

Inside this Fox Package should have two htres per folder in level. But
also it has a lod0 model of the assets that it's interesting to keep and
drag to scene View to grasp a hint on visual.


\==**Loading the TRE2 file**== Now that we have the tre2 inside the
pack_common and two htre files in pack_small it's time to show terrain
in Unity.

To back to the file afgh_common_terrain.tre2 in Unity and select it. A
window called inspector will show. Click at "**stitch terrain file**".
Save the prefab to /Assets and wait until it shows something in Scene
View.

[558x558px](/File:Unity52.jpg "wikilink")

At first it seems like nothing worked after prefab showing up in
Hierachy window. Select the prefab again and scroll down the Inspector
Window until you see the T**essellation Edge Lengh**. Slide to value
1.
[546x546px](/File:Un6.jpg "wikilink")

**Check the Beautiful terrain below.**

[552x552px](/File:Terrainloaed.jpg "wikilink")

## **Loading Small Assets from the two Tiles**

Each tile is built with tons of Assets and Files in pack_small folders.
You can see the Terrain above is complete empty. To fullfill it with
cliffs, rocks, trees and other types of file like geoms, nav2, bushs,
paths it will need to copy and paste new files and datas. At this point
it's interesting to copy a lot of FMDL and GEOM files in environ folder
the game has. Loading this into Unity takes some time and can be
annoying...

Even Afgh that has its own environment assets take some model from
another location so... It's wise to reserve some time to load all the
models the game has.

[591x591px](/File:Paths02.jpg "wikilink")

Copy and paste the folder to Unity and relax...

[437x437px](/File:Relax.jpg "wikilink")

FoxKit can show a preview of fmdl before anything else... Texture is
missing, but it can be done later.

[493x493px](/File:Fmdl_view.jpg "wikilink")

Now to find the Fox2 files\!\!\!

Go to **chunk_all/Assets/tpp/level/location/afgh/block_small/130.**
Notice that this small pack is not the same where **htre** files were
founded.

If the terrain says 130_146 and 130_148. This is not the case for the
fox2 files to load the models on Terrain. This is something that it
needs several attempts to find where the models will load in terrain.
See image Below that I loaded to Unity a few ones and only 132_149,
132_150 and 131_149, 131_150 had some rocks to fit the Terrain. Later
you can copy all those Datas to Unity as long you get familliar with the
files...

[486x486px](/File:NoneedFornow.jpg "wikilink")

When you load a Fox2 file in Unity, FoxKit will warn about missing files
in Console Window. It help to know which file should be located and
paste to project.

## **Converting FOX2 file as Asset file in FoxKit**

Go to one of Fox2 we load. I will use 130_146_asset.fox2 file as
example. Select it and at Inspector Window hit Create Editable Copy.
Save the new file with the same name of the original file or a new one
in the same place.

[470x470px](/File:Hitbutton.jpg "wikilink")

The Icon is the same for fox2 file and the new .asset file. Now it's
missing a package definition. Let's create one and stick the new file to
it.

[461x461px](/File:Missingpackage.jpg "wikilink")

Go to menu **Unity Assets/Create/FoxKit/Package Definition**. It will
create a package that can be fpk or pfkd or other types. Standard its
fpkd which is the right one. Usually Unity will generate the PackAge in
FoxKit/Assets folder or in the folder the user is at the moment. Check
if its the case. For now I place the Definition in the same folder where
the afgh_130_146_asset_copy.asset is. I rename to something
whatever...

Select the "Whatever", go to Inspector Window. Hit plus in Entries and
Drag the afgh_130_146_asset_copy.asset to the empty field below
Entries. See image below. Now the editable fox2 should load the files in
the DataSetView.

Even if the fox2 is not converted to .asset in Unity. It can be open in
DataList Window later, but not editable.

[546x546px](/File:Aff.jpg "wikilink")

## **Small Fix to Loading StaticModelArrays**

User whose nickname is Automat pointed a small fix to correctly load
StaticModelArrays. It's recommended to fix that before trying to load
any fox2 file the game have that load tons of Entity StaticModelArray. I
don't know if this makes sense or not for a user that just began to work
with FoxKit. It's a good routine to read, find and understand every
Entity a Fox2 file have to knowledge the amount of possibilites and
nopes as Modding mgsv. Anyway... Open the Image Below. Navigate to the
StaticModelArray.cs and open in Notepad++ or any editor. Remove the red
line and add what Green Line says. Save, Close and back to Unity to auto
load fix.

[592x592px](/File:FixStaticModelArray.jpg "wikilink")

#### **Drop Assets in Terrain**

Alright\! Go to Menu **Unity FoxKit/Data List Window**. Place that new
window whatever you want. Go back to any assets we loaded, let's say
**afgh_130_146_asset_copy.asset** . Check if Package definition
still holds the Entries. Back to one of
afgh_130_146_asset_copy.asset for example, double click to see the
Dataset list entities as well the models and gameobjects in the Scene
View. Check it\!\!
[alt=|left|482x482px](/File:Finally.jpg "wikilink")
[464x464px|alt=|left](/File:Ending.jpg "wikilink")


\=== And that's it\!\! === A small guide to install, import Assets and
Load Terrain as well see a little bit of the fox2 files. Check Discord
Server Modders Heaven to talk about it and ask for help related to
Mods/FoxKit. [Category:Foxkit](/Category:Foxkit "wikilink")
__INDEX__