---
title: ! 'FoxKit: TppPrimRiverModel, TppWaterBounding, TppTextureLoader and FxLocatorData'
permalink: /FoxKit-_TppPrimRiverModel_TppWaterBounding_TppTextureLoader_and_FxLocatorData/
tags: [FoxKit, Entities, Guides, Rendering]
---

Guide for FoxKit 1.0.

This guide will continue the Mod Folder created in [FoxKit: StaticModel and GeoxCollisionFreeShape](/FoxKit-_StaticModel_and_GeoxCollisionFreeShape "wikilink").
Please, see [Setting the Mod Folder](/FoxKit-_StaticModel_and_GeoxCollisionFreeShape/#setting-the-mod-folder)
and [Creating a Fox2 file](/FoxKit-_StaticModel_and_GeoxCollisionFreeShape/#creating-a-fox2-file).
Now we'll meet four entities building water in-game and adding a vfx.

# **TppPrimRiverModel** and TppPrimRiverModelParam
This Entity creates the visual and movement of water in-game. A second Entity called
TppPrimRiverModelParam deals with more options. The Entity also needs to
load a texture which TppTextureLoader should come in hand.

Also we need to attach this water visual to a static-model that game
calls for Puddle. I choose the puddle afgh_pddl001_vrtn032. This one
does not need a geom file, it is optional. If the puddle has a geom, it
will avoid camera go underwater. As we learned from the previously guide
on how to load a static-model, this one is the same. Check the rotation
and copy paste to Entity Window. Change the pivot to Center/Local
because some models, like the one I chose, have a far pivot to handle...
Place where you think it may be good and done.

![](/assets/Puddle01.jpg){:width="615px"}

#### After that let's see the Entity Window **TppPrimRiverModel. Create it in DataList Window/Entity/TppPrimRiverModel**

![](/assets/Prim01.jpg)

**primRiverGroupName** is whatever you might call it. I named it as
WeirdWater.

**visibility** is the bool of false or true. Check true.

**depthBlendLength** seems to work with float values between 0 to 1.0
and it seems to handle how much visibility between the surface and the
bottom of the puddle. I choose 0.2

**raise**. It's not clear what it does to me. I saw values like -800,
-1000.

Lastly, link the StaticModel Puddle we created. It only shows up if the
DataSet is inside the package definition we chose. **afgh_common**.

#### Now, **TppPrimRiverModelParam**

![](/assets/Prim02.jpg)

**primRiverGroupName** is the same name we chose before. WeirdWater.

**visibility** is the bool of false or true. Check true.

**baseTextureName** (afgh_pddl001_ct_bsm)**, normalTextureName**
(afgh_pddl001_te_nrm) **and cubeMapName** (cmp2) are the textures
names that we will see with TppTextureLoader later.

**lightCaptureLocator** Need more info about that. It can be empty.

**First Wave** (scrollDirection0, scrollSpeed0 and scrollScale0),
**Second Wave** (scrollDirection1, scrollSpeed1 and scrollScale1). You
can see that I chose one wave to be calm while the second wave will be
bigger, fast and move to another direction. Unfortunately it lacks more
info about which values precisely means.

**transparency** is obviously. Float value between 0 to 1.0.

**transparencyDepthBlend** sounds a lot like the **depthBlendLength**

**reflectionRate** Float value between 0 to 1.0. Didn't catch what
reflection means here. Need more info.

**distortionPower** Float value between 0 to 1000. If value is too high
it disturb the water a lot if player walk through. If jumps into the
ground/water it splashes a lot of water.

**surfaceShadowRate** Float value between 0 to 1.0. Shad only.

**oilIntensity** It needs more info. I put 0 to not have any oil aspect.

**useHnmTexture** and **debugReset** are booleans that need more info.
Can be unchecked.

## **TppWaterBounding**

It adds a effect of player getting wet, splash water and trigger a sound
of wet. It's quite simple to add. **Create it in DataList
Window/Entity/TppWaterBouding.**

![](/assets/Prim03.jpg){:width="554px"}

Once you load the **TppWaterBounding entity** to the Dataset and create
a TransformEntity, set a cube inside of the gameobject in Hierachy
Window. Move, rotate and scale, not the cube but the
TppWaterBounding0000. Make sure the WaterBouding fills the puddle. Copy
and paste the rotation and scale to the Entity Window.

**enableRotate** can be unchecked. Need more info about it.

**debugDraw** need more info.

**type** choose what is the best for you.

## **TppTextureLoader**

This one will link the texture that needs to be showed for water in
**TppPrimRiverModelParam.**

**baseTextureName,** afgh_pddl001_ct_bsm

**normalTextureName,** afgh_pddl001_te_nrm

**cubeMapName,** cmp2

Because of that we now have to create a pftxs folder and add the ftex
textures. The way is the same as we did with afgh_common_fpk and
afgh_common_fpkd in **Setting the Mod Folder.**

go to
**LoadingStairsInGame/Assets/tpp/pack/location/afgh/pack_common/...**

Create a **afgh_common_pftxs** folder.

![](/assets/Texturefolder01.jpg){:width="530px"}

Open the afgh_common_pftxs and create
**/Assets/tpp/environ/object/afghanistan/puddle/afgh_pddl001/sourceimages/**

Get all the **ftex** and **ftex_1** textures in Texture_dat from the
same path folder we made, copy and paste to the folder we created. It
should look like the image down below.

![](/assets/Texturefolder07.jpg){:width="601px"}

One more folder path should be made for the cubemap.

Open the afgh_common_pftxs and create
**/Assets/tpp/common_source/cubemap/environ/afghanistan/cm_afgh_cb_vllg003/sourceimages/test03/**

![](/assets/Texturefolder04.jpg){:width="598px"}

The choice of those texture are my fav. Feel free to choose the best
texture for puddle and Cmap.

Copy this folder with the files to Unity.

**/Assets/tpp/environ/object/afghanistan/puddle/afgh_pddl001/sourceimages/
/Assets/tpp/common_source/cubemap/environ/afghanistan/cm_afgh_cb_vllg003/sourceimages/test03/**

Let's see the Entity Window for **TppTextureLoader. Create it in
DataList Window/Entity/TppTextureLoader**

![](/assets/Texturefolder06.jpg)

The name of Textures and forceLargeTextures are the same we saw in
**TppPrimRiverModelParam.** Only that wt_bsm and srm went out of
TppPrimRiverModelParam. We need more info about those two and if can
work without them or not.

Choose only ftex. And not ftex_1.

![](/assets/Texturefolder08.jpg)

Now, let's pack the **afgh_common_pftxs** with the tool
**[AutoPftxsTool.v0.2](https://github.com/BobDoleOwndU/AutoPftxsTool/releases)**
and place it into the Mod Folder for when we test in-game. MakeBite does
not pack pftxs folders like it does with fpk and fpkd.

![](/assets/Texturefolder05.jpg){:width="635px"}

## **FxLocatorData**

**FxLocatorData,** just pick one vfx and load inGame. But what vfx to
load? We currently don't have any tool that does a preview of each vfx.
This Entity comes to help us load the vfx and look in gameplay how it
looks like. Another way to see a hint of what vfx is is open the file
with the
[vfxTool](https://github.com/youarebritish/VfxTool/releases/tag/1.2) and
search the texture to grasp a visual of what might be the effect. After
some tests I found one vfx of water for this guide.

**SPLASH/ fx_tpp_splwtr10_m1.vfx**, its a waterfall.

We need to add a new folder path to our Mod Folder.

Go to **afgh_common_fpkd**

Create the path **/Assets/tpp/effect/vfx_data/splash/**

Find the Effect **fx_tpp_splwtr10_m1.vfx** and copy to this new
folder. ![](/assets/Fxlocator01.jpg) 
Copy the **vfx_data/splash/fx_tpp_splwtr10_m1.vfx** to Unity under the
/Assets/tpp/effect/

![](/assets/Splash011.jpg){:width="405px"}

Create Let's see the Entity Window now. **Create it in DataList
Window/Entity/FxLocatorData**

![](/assets/Fxlocator02.jpg){:width="647px"}

Move the effect where it fits. Some effects really matter if rotated or
noted. The Axis Blue seems to indicate the direction = 0. Scale does not
matter unless you edit it with the vfxTool.

**variationName** Need more info about. Can be empty.

**effectInstanceName** Any string input here can be use in Lua script to
turn off/on the effect with
TppDataUtility.CreateEffectFromId("Waterfall") or
TppDataUtility.DestroyEffectFromId( "Waterfall" )

**enableUserRandomSeed** Need more info about. Can be empty.

**shapeKeep** Check it so that if the vfx does not have a loop it will
keep alive.

**createOnInitialize** It will of course spawn as soon player show up.

**blockMemoryAllocation** Need more info, but does sound interesting to
check it if it's using more than five FxLocatorData. Sometimes six or
even ten wont load...

And the last, drag and drop the vfx file.

## **Almost Done...**

Save and export the new fox2 file to fpkd. Remember to update the fpk
folder with the new staticmodel puddle. Now.. there is a few things we
need to edit manually for the fox2file. The same process we did in the
previously guide.

#### **First Fix**

The Package Definition does not look right here. So its better to erase
and keep empty.

![](/assets/Ending01.jpg){:width="648px"}

#### **Second Fix**

And the StaticModel **FLAG** should be **4** and not **7**. If kept as 7
it won't load the transparency of water and texture.

![](/assets/Ending02.jpg){:width="540px"}

Pack the fixed fox2 file again. Make the .mgsv file in MakeBite,
building the **LoadingStairsInGame folder.** Open with SnakeBite and see
it in-game.

![](/assets/Ingame01.jpg)


## Doing it without FoxKit

Alternatively, you can do it without using FoxKit.

Immidiately spawning chaff effect from lua:

1. Create a custom fpkd with a custom Fox2 effects file and the `/Assets/tpp/effect/vfx_data/weapon/fx_tpp_wepchf01_s3.vfx` file from chaff strikes (`0/00_dat/Assets/tpp/pack/collectible/common/col_common_tpp.fpkd`)
2. This fox2 file has a `FxLocatorData` entity that points to said vfx file and has an `effectInstanceName`
3. With that, calling `TppDataUtility.CreateEffectFromId` with the `effectInstanceName` should load in said effects
