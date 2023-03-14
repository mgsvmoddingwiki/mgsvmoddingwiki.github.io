---
title: Foxkit: TppPrimRiverModel, TppWaterBounding, TppTextureLoader and FxLocatorData
permalink: /Foxkit-_TppPrimRiverModel,_TppWaterBounding,_TppTextureLoader_and_FxLocatorData/
---

Guide for FoxKit 1.0.

This Guide will continue the Mod Folder created in [Foxkit: StaticModel
and
GeoxCollisionFreeShape](/Foxkit:_StaticModel_and_GeoxCollisionFreeShape "wikilink").
Please, see **Setting the Mod Folder** and **Creating a Fox2 file.** Now
we'll meet four Entities building water ingame and adding a vfx.

### **TppPrimRiverModel** and TppPrimRiverModelParam

This Entity creates the visual and moviment of water ingame. A second
Entity called TppPrimRiverModelParam deal with more options. The Entity
also need to load a texture which TppTextureLoader should come in hand.

Also we need to attach this water visual to a staticmodel that game
calls for Puddle. I choose the puddle afgh_pddl001_vrtn032. This one
does not need a geom file, it is optional. If the puddle have a geom it
will avoid camera go underwater. As it learn from the previously guide
on how to load a staticmodel, this one is the same. Check the rotation
and copy paste to Entity Window. Change the pivot to Center/Local
because some models like the one I choose have a far pivot to handle...
Place where you think it may be good and done.

[615x615px](/File:Puddle01.jpg "wikilink")

#### After that let's see the Entity Window **TppPrimRiverModel. Create it in DataList Window/Entity/TppPrimRiverModel**

[<File:Prim01.jpg>](/File:Prim01.jpg "wikilink")

**primRiverGroupName** is whatever you might call it. I named as
WeirdWater.

**visibility** is the bool of false or true. Check true.

**depthBlendLength** seems to work with float values between 0 to 1.0
and it seems to handle how much visibility between the surface and the
bottom of the puddle. I choose 0.2

**raise**. Its not clear what does it do to me. I saw values like -800,
-1000.

Lastly, link the StaticModel Puddle we created. It only show up if the
DataSet is inside the package definition we choose. **afgh_common**.

#### Now, **TppPrimRiverModelParam**

[<File:Prim02.jpg>](/File:Prim02.jpg "wikilink")

**primRiverGroupName** is the same name we choose before. WeirdWater.

**visibility** is the bool of false or true. Check true.

**baseTextureName** (afgh_pddl001_ct_bsm)**, normalTextureName**
(afgh_pddl001_te_nrm) **and cubeMapName** (cmp2) are the textures
names that we will see with TppTextureLoader later.

**lightCaptureLocator** Need more info about that. It can be empty.

**First Wave** (scrollDirection0, scrollSpeed0 and scrollScale0),
**Second Wave** (scrollDirection1, scrollSpeed1 and scrollScale1). You
can see that I choose to one wave to be calm while the second wave will
be bigger, fast and move to another direction. Unfortnally It lack more
info about which value precisely means.

**transparency** is obviously. Float value between 0 to 1.0.

**transparencyDepthBlend** sounds a lot like the **depthBlendLength**

**reflectionRate** Float value between 0 to 1.0. Didn't catch what
reflection means here. Need more info.

**distortionPower** Float value between 0 to 1000. If value is too high
it disturb the water a lot if player walk through. If jump to the
ground/water it splash a lot of water.

**surfaceShadowRate** Float value between 0 to 1.0. Shad only.

**oilIntensity** It need more info. I put 0 to not have any oil aspect.

**useHnmTexture** and **debugReset** are booleans that need more info.
Can be uncheck.

### **TppWaterBounding**

It add a effect of player getting wet, splash water and trigger a sound
of wet. It's quite simple to add. **Create it in DataList
Window/Entity/TppWaterBouding.**

[554x554px](/File:Prim03.jpg "wikilink")

Once you load the **TppWaterBounding entity** to the Dataset and create
a TransformEntity, set a cube inside of the gameobject in Hierachy
Window. Move, rotate and scale not the cube but the
TppWaterBounding0000. Make sure the WaterBouding fill the puddle. Copy
and paste the rotation and scale to the Entity Window.

**enableRotate** can be uncheck. Need more info about it.

**debugDraw** need more info.

**type** choose what is the best for you.

### **TppTextureLoader**

This one will link the texture that need to be show for water in
**TppPrimRiverModelParam.**

**baseTextureName,** afgh_pddl001_ct_bsm

**normalTextureName,** afgh_pddl001_te_nrm

**cubeMapName,** cmp2

Because of that we have now to create a pftxs folder and add the ftex
textures. The way is the same as we did with afgh_common_fpk and
afgh_common_fpkd in **Setting the Mod Folder.**

go to
**LoadingStairsInGame/Assets/tpp/pack/location/afgh/pack_common/...**

Create a **afgh_common_pftxs** folder.

[530x530px](/File:Texturefolder01.jpg "wikilink")

Open the afgh_common_pftxs and create
**/Assets/tpp/environ/object/afghanistan/puddle/afgh_pddl001/sourceimages/**

Get all the **ftex** and **ftex_1** textures in Texture_dat from the
same path folder we made, copy and paste to the folder we create. It
should look like the image below.

[601x601px](/File:Texturefolder07.jpg "wikilink")

One more folder path should be made for the cubemap.

Open the afgh_common_pftxs and create
**/Assets/tpp/common_source/cubemap/environ/afghanistan/cm_afgh_cb_vllg003/sourceimages/test03/**

[598x598px](/File:Texturefolder04.jpg "wikilink")

The choice of those texture are my fav. Feel free to choose the best
texture for puddle and Cmap.

Copy this folder with the files to Unity.

**/Assets/tpp/environ/object/afghanistan/puddle/afgh_pddl001/sourceimages/
/Assets/tpp/common_source/cubemap/environ/afghanistan/cm_afgh_cb_vllg003/sourceimages/test03/**

Lets see the Entity Window for **TppTextureLoader. Create it in DataList
Window/Entity/TppTextureLoader**

[<File:Texturefolder06.jpg>](/File:Texturefolder06.jpg "wikilink")

The name of Textures and forceLargeTextures are the same we saw in
**TppPrimRiverModelParam.** Only that wt_bsm and srm went out of
TppPrimRiverModelParam. We need more info about those twos and if can
work without them or not.

Choose only ftex. And not ftex_1.

[<File:Texturefolder08.jpg>](/File:Texturefolder08.jpg "wikilink")

Now, let's pack the **afgh_common_pftxs** with the tool
**[AutoPftxsTool.v0.2](https://github.com/BobDoleOwndU/AutoPftxsTool/releases)**
and place in the Mod Folder for when we test ingame. Makebite does not
pack pftxs folders like it does with fpk and fpkd.

[635x635px](/File:Texturefolder05.jpg "wikilink")

### **FxLocatorData**

FxLocatorData just pick one vfx and load inGame. But what vfx to load?
We currently not have any tool that does a preview of each vfx. This
Entity come help us to load the vfx and look in gameplay how does it
look like. Another way to see a hint of what vfx is is open the file
with the
[vfxTool](https://github.com/youarebritish/VfxTool/releases/tag/1.2) and
search the texture to grasp a visual of what might be the effect. After
some test I found one vfx of water for this guide.

**SPLASH/ fx_tpp_splwtr10_m1.vfx**, its a waterfall.

We need to add a new folder path to our Mod Folder.

Go to **afgh_common_fpkd**

Create the path **/Assets/tpp/effect/vfx_data/splash/**

Find the Effect **fx_tpp_splwtr10_m1.vfx** and copy to this new
folder. [<File:Fxlocator01.jpg>](/File:Fxlocator01.jpg "wikilink") Copy
the **vfx_data/splash/fx_tpp_splwtr10_m1.vfx** to Unity under the
/Assets/tpp/effect/

[405x405px](/File:Splash011.jpg "wikilink")

Create Let's see the Entity Window now. **Create it in DataList
Window/Entity/FxLocatorData**

[647x647px](/File:Fxlocator02.jpg "wikilink")

Move the effect where it fit. Some effects really matter if rotate or
note. The Axis Blue seems to indicate the direction = 0. Scale does not
matter unless you edit it witht he vfxTool.

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
check it if using more than five FxLocatorData. Sometimes six or even
ten wont load...

And the last, drag and drop the vfx file.

### **Almost Done...**

Save and export the new fox2file to fpkd. Remember to update the fpk
folder with the new staticmodel puddle. Now.. there is a few things we
need to edit manually the fox2file. Same process we did in the
previously guide.

#### **First Fix**

The Package Definition does not look right here. So its better to erase
and keep empty.

[648x648px](/File:Ending01.jpg "wikilink")

**Second Fix**

And the StaticModel **FLAG** should be **4** and not **7**. If keep 7 it
wont load the transparency of water and texture.

[540x540px](/File:Ending02.jpg "wikilink")

Pack again the fox2 file fixed. Do the .mgsv file in Makebite building
the **LoadingStairsInGame folder.** Open with Snakebite and see it in
game.

[1328x1328px](/File:Ingame01.jpg "wikilink")