---
title: Foxkit: StaticModel and GeoxCollisionFreeShape
permalink: /Foxkit-_StaticModel_and_GeoxCollisionFreeShape/
tags: [FoxKit, Guides, Files, Models, Geo]
---

Guide for FoxKit 1.0.

This guide will show how to add a simple model in Unity and test it
ingame working with the Entity StaticModel. It will show another Entity
that might be useful for some that add a small collision shape with
eight points.


{| class="article-table" |+The other FoxKit Tutorials \![Foxkit:
Installing, Import Files and
Terrain](/Foxkit:_Installing,_Import_Files_and_Terrain "wikilink") |-
|[**Foxkit: TppPrimRiverModel, TppWaterBounding, TppTextureLoader and
FxLocatorData**](/Foxkit:_TppPrimRiverModel,_TppWaterBounding,_TppTextureLoader_and_FxLocatorData "wikilink")
|- |**[Foxkit:
TppSharedGimmickData](/Foxkit:_TppSharedGimmickData "wikilink")** |}
\==**Setting the Mod Folder**== Before anything else, let's create a
folder structure for the Mod we will call as "LoadingStairsInGame". Do
it outside of Unity Foxkit for now.

**LoadingStairsInGame/Assets/tpp/pack/location/afgh/pack_common/...**
Inside the pack_common should have two packages.

**FoxPackage afgh_common_fpk** -\> Where the assets, models, routes,
geoms...

**FoxPackage Data afgh_common_fpkd** -\> The data, fox2 files, lua,
scripts, effects...

[563x563px](/File:FolderEstrutura01.jpg "wikilink")

Inside the fpk folder we will add the StaticModel in:

**afgh_common_fpk/Assets/tpp/environ/object/afghanistan/house/afgh_hous032/scenes/**
copy and paste the fmdl and geom if have it.

[561x561px](/File:FolderEstrutura02.jpg "wikilink")

Inside the fpkd folder we will add the fox2 file, but for now all we
need is set the folder path because we will generate the fox2 file in
Unity.

**afgh_common_fpkd/Assets/tpp/level/location/afgh/block_common/**
Copy this folder structure in Unity. It should be like the image below.
No need to copy the fpk if the user already load the assets in the guide
[Foxkit: Installing, Import Files and
Terrain](/Foxkit:_Installing,_Import_Files_and_Terrain "wikilink").

[<File:FolderEstrutura03.jpg>](/File:FolderEstrutura03.jpg "wikilink")

Done. We have the mod ready to makebite and the folder in Unity.

## **Creating a Fox2 file**

In Assets folder Unity create a Package Definition at menu **Unity
Assets/Create/FoxKit/Package Definition**. Name it as afgh_common. The
type of this package will be fpkd as stantard.

Open the Data List Window in Menu **Unity FoxKit/Data List Window**.
Place that new window whatever you want. At this window, hit
**Create/DataSet.**

[<File:Package01.jpg>](/File:Package01.jpg "wikilink")

Choose the Package Definition, Type DataSet and the name can be whatever
you think about. I go silly and name it MyFirstFox2File. Before hitting
the button **create,** it's highly recommend select the folder where you
think it should create the .asset otherwise it will create in /Assets.
We want to generate the dataset in
/**Assets/tpp/level/location/afgh/block_common/** and not **/Assets.**
This is not a bug, but a matter of organize. After that, you shall see
the Data List with one Entity called TexturePackLoadConditioner0000.

[565x565px](/File:Unity001.jpg "wikilink")

Good. Now we are ready to throw a lot of entities in there, but let's
stick with the StaticModel.

## **Entity StaticModel**

There are two ways to add this entity. A Horrible way and a Best Way.

#### **Horrible Way**

At Data List Window hit create/Entity. A new window with tons of
entities will be listed. Dont get distracted, search for StaticModel and
choose it.

[502x502px](/File:StaticModel01.jpg "wikilink")

Now the DataSet have a staticmodel. It can be renamed to anything else,
but once renamed it should close and open again the dataset to update in
Hierarchy Window. Look the Entity Window now and fill the modelfile and
geomfile with the model we choose at the begin of this guide. You can
drag and drop it too. The model still not show in Scene View because as
we saw, we are doing the Horrible Way. Close and Open again the DataSet.
And move the staticmodel to the place you want in Game.

[534x534px](/File:StaticModel02.jpg "wikilink")

#### **Best Way**

Just go to the model you want and Drag Drop to scene view. It will add
it to the DataList with the name of the staticmodel. Its the fast way to
add staticmodel, but there is a annoying thing to keep in mind.

First, as long you drop the fmdl to scene view it will load far away
from the camera because it doesn't recognize the terrain as some support
point. But don't move the fmdl with the afgh_hous032_star001 as blue
in Hierarchy Window. First, empty the local transform position to X:0,
Y:0, Z: 0 and then select the afgh_hous032_star001_0000 to actual
move the staticModel.

[594x594px](/File:StaticModel03.jpg "wikilink")

Let's repeat this process... It should be easy and fast to go around.

[<File:StaticModel04.jpg>](/File:StaticModel04.jpg "wikilink")

Move the StaticModel to where we want and avoid adding any value
inafgh_hous032_star001 prefab. The reason why not edit in there is
because it will not be save the rotation if you close the dataset and
because the values are not the same ingame. I recommend try to edit it
and do mistakes by yourself to learn.

[572x572px](/File:StaticModel05.jpg "wikilink")

Lastly, don't forget to add the geom file in Entity Window. A
Interesting fact to keep in mind is.. If you drag and drop the
staticmodel in dataSet. If close and open again it will not shown the
prefab anymore and then this issue will not be annoying anymore. It's
good to do it if there is just a few models to spawn. But if it's
thousand...

#### **Rotation**

Let's rot this piece of StaticModel\! It's easy, but once you rotation
the value at the Inspector Window does not add automatic to the Entity
Window. This is a small bug the current foxkit have. Just copy and
paste. Don't forget to do it otherwise ingame...

[579x579px](/File:StaticModel06.jpg "wikilink")

## **Exporting DataSet**

Go to Data List Window, select the Dataset and hit right button mouse to
show the options. Remember to set active if not otherwise it wont
export.

[<File:Exportdataset01.jpg>](/File:Exportdataset01.jpg "wikilink")

Go to the Mod Folder we did at the begin. Precisely the fpkd folder.

**LoadingStairsInGame/Assets/tpp/pack/location/afgh/pack_common/afgh_common_fpkd/Assets/tpp/level/location/afgh/block_common/**

And save the file in it.

[584x584px](/File:Exportdataset02.jpg "wikilink")

Done. Now test it. Do the .mgsv file in Makebite building the
**LoadingStairsInGame folder.** Open with Snakebite and see it in game.
One thing to remember. Save a scene in Unity. When exit the software,
don't forget to close the DataSet in Data List Window. It may cause
issues after you open again Foxkit with any DataSet still hangout in
DataListWindow.

[border|587x587px](/File:AssetInGame.jpg "wikilink")

### **Entity GeoxCollisionFreeShape**

This Entity add a small collision with eight points. Good if the
geometry of the model is just a square or something simple. Let's take
the StaticModel Staris we did and to a collision after the end of the
Stairs. Check the sketch of the idea.

[602x602px](/File:SketchGeox.jpg "wikilink")
Open Unity and the DataSet we work before. Open the Entity List and
search for **GeoxCollisionFreeShape.** In the Entity Window we see this:

[591x591px](/File:GeoxCollision01.jpg "wikilink")

1 - One is of course the transform positions, scale, rotations. Hit
Create TransformEntity and it will drop the Entity in Hierachy Window
next to the Stairs.

2 - CollisionCategory **All** means all. I don't know what means
**Chara** and **Recoil**. **All** works fine.

3 - CollisionMaterial is greyed here. Currently not a option to edit in
Foxkit 1.0. That we'll edit later manually using Fox2 tool to generate a
xml. MTR_NONE_A is a good choice. The user can find more types in
<https://github.com/unknown321/mgsv_lua_dump/blob/0e236d1180b35d70203e10605cfa7cfe631e2a74/tpp/master/data1/Assets/tpp/level_asset/weapon/ParameterTables/RecoilMaterial/RecoilMaterialTable.lua>

4 - Tags. CHARA, PLAYER and ENEMY.

5 - This eight points will be parented with the TransformEntity of
**GeoxCollisionFreeShape.**

#### **TransformEntity**

After you create the TransformEntity, set pivot/local. Rotation to be
according with the staticModel Stairs. Copy the rotation in Inspector
Window to the Entity Window as we talk about that foxkit don't to this
automatic. Move the **GeoxCollisionFreeShape** to where you think you'll
start the shape we planned.

[600x600px](/File:GeoxCollision02.jpg "wikilink")

Create a Cube and drop inside the GeoxCollisionFreeShape0000. Erase the
coords to 0,0,0 and scale it to 0.3,0.3, 0.3. This cube will be our
First Point.

[606x606px](/File:GeoxCollision03.jpg "wikilink")

Create then more Seven Cubes and start to move then according to the
Idea we sketch. It must be in that order. 1, 2, 3 and 4. Then 5, 6, 7
and 8.

[<File:GeoxCollision04.jpg>](/File:GeoxCollision04.jpg "wikilink")

Add the tags.

[<File:GeoxCollision05.jpg>](/File:GeoxCollision05.jpg "wikilink")

Now.. Every Point we did with cubes we will copy the Positions to the
Entity Window.

[597x597px](/File:GeoxCollision06.jpg "wikilink")

Done. Export the Dataset as we learn in previously with StaticModel. But
now we need to edit manually the Fox2 File.

Let's navigate to the Fox2 we build and with the FoxTool, extract it to
XML. Open it with notepad++ or any editor that work.

[589x589px](/File:Foxtooll01.jpg "wikilink")

Search for CollisionMaterial and add MTR_NONE_A or any type you may
find interesting in that list. Save and double click the xml to pack
again in Fox2 file otherwise it wont load in game.

[<File:Foxtooll02.jpg>](/File:Foxtooll02.jpg "wikilink")

Done. Now test it. Do the .mgsv file in Makebite building the
**LoadingStairsInGame folder.** Open with Snakebite and see it in game.

[717x717px](/File:ColissionSucess.jpg "wikilink")