---
title: TppSharedGimmickData
permalink: /FoxKit-_TppSharedGimmickData/
tags: [FoxKit, Entities, Guides]
---

Guide for FoxKit 1.0. This guide assumes that the user already knows how
to work with FoxKit and understand Datasets/ fox2 files and the mod
folder structure. Please see [FoxKit: Installing, Import Files and
Terrain](/FoxKit:_Installing,_Import_Files_and_Terrain "wikilink") and
[FoxKit: StaticModel and
GeoxCollisionFreeShape](/FoxKit:_StaticModel_and_GeoxCollisionFreeShape "wikilink")


{| class="article-table" |+The other FoxKit Tutorials \!**[FoxKit:
Installing, Import Files and
Terrain](/FoxKit:_Installing,_Import_Files_and_Terrain "wikilink")** |-
|[**FoxKit: StaticModel and
GeoxCollisionFreeShape**](/FoxKit:_StaticModel_and_GeoxCollisionFreeShape "wikilink")
|- |**[FoxKit: TppPrimRiverModel, TppWaterBounding, TppTextureLoader and
FxLocatorData](/FoxKit:_TppPrimRiverModel,_TppWaterBounding,_TppTextureLoader_and_FxLocatorData "wikilink")**
|}

## **Beginning**

Entity that works with lba files. (Locator Binary Array). Location data
used to place gimmicks that is a little bit different then the
**TppPermanentGimmickData.**

This entity transforms a model as something that becomes alive,
animated, breakable, falling by gravity. A static model of a chair, if
not loaded by lba files, will be just a static model that won't fall if
player touches it. Or a box that without lba it won't break if a grenade
blows up near. Cloth will not swing around without lba.

The game has a limit of how many lba should be spawned in free roam
mission. Luckily, if the user does a new custom mission or location the
limit can raise to up more than hundreds of lba working without crashing
the game. This guide will only spawn two Gimmicks in the free roam
mission as a good start to understand how to load lba files. Each
location pack_common gimmick have **TppGimmickImmediateStateData** and
other types of entities that set a kind of limit of gimmicks the
location will have.

The guide will load two Gimmicks. A Chair and a Flag/Banner. The first
thing to do is build a mockup assets in Unity with a simple Dataset that
will not be inside MOD. The purpose of creating this fox2 file is to get
the Positions and Rotations of the model to copy/paste into lba files.
We do it because FoxKit can not load lba files just yet.

Create a Dataset named "MockupGimmicks" and build a small assets scene.
I did this:

[742x742px](/File:Mockup01.jpg "wikilink")

We'll see this Fox2 later.

## **TppSharedGimmickData list**

Very important list to query the values that we will need later.

**<big>numDynamicGimmick</big>** <small>It does need more info about
this one. Not sure what it means other than value 0 does not do nothing.
The highest number founded was 22 from cable gimmick. The majority of
gimmicks only need 1 or 2.</small>

**<big>flags</big>** <small>Every gimmick will have a first flag and a
second flag. Notice that flag2 will have value 0 for the mostly
gimmicks. Some have more than one number in flag1 that it will depend of
which model is been loaded. Barbwire has three types of staticmodel and
therefore has three flags1 that cause a specific behavior. But, this
still needs more information. It's a lot of time to look at each one and
it will be a pleasure to anyone who tries to test each and note what
happens in-game.</small>

<table>
<caption>Query list of gimmicks, numDyn and flags</caption>
<thead>
<tr class="header">
<th><p>name</p></th>
<th><p><small>numDynamicGimmick</small></p></th>
<th><p>flags1</p></th>
<th><p>flags2</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><small>alarm_lamp</small></p></td>
<td><p><small>3</small></p></td>
<td><p><small>603980296</small></p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>ashtray</small></p></td>
<td><p><small>1</small></p></td>
<td><p><small>267</small></p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>barricade</small></p></td>
<td><p><small>3/ 5</small></p></td>
<td><p><small>16642</small></p>
<p><small>258</small></p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>barbwire</small></p></td>
<td><p><small>2</small></p></td>
<td><p><small>16781568</small></p>
<p><small>256</small></p>
<p><small>16777472</small></p></td>
<td><p>0 8192</p></td>
</tr>
<tr class="odd">
<td><p><small>barrel</small></p></td>
<td><p><small>1</small></p></td>
<td><p>262400</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>basket</small></p></td>
<td><p><small>2</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>bed</small></p></td>
<td><p><small>1</small></p></td>
<td><p>262400</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>book</small></p></td>
<td><p><small>5</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>bottle</small></p></td>
<td><p><small>1/ 4</small></p></td>
<td><p>282</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>bucket</small></p></td>
<td><p><small>1/ 2/ 3</small></p></td>
<td><p>267</p>
<p>536871185</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>cable</small></p></td>
<td><p><small>6/ 16/ 22</small></p></td>
<td><p>274</p>
<p>3145993</p>
<p>67109138</p></td>
<td><p>0 64</p></td>
</tr>
<tr class="even">
<td><p><small>can</small></p></td>
<td><p><small>1</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>carton</small></p></td>
<td><p><small>2</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>chair</small></p></td>
<td><p><small>1/ 2/ 3</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>chandelier</small></p></td>
<td><p><small>1</small></p></td>
<td><p>285</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>cloth</small></p></td>
<td><p><small>2/ 3</small></p></td>
<td><p>259</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>cloth inhouse</small></p></td>
<td><p><small>1</small></p></td>
<td><p>536870915</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>communicator</small></p></td>
<td><p><small>1</small></p></td>
<td><p>3145993</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>cup</small></p></td>
<td><p><small>1/ 2</small></p></td>
<td><p>282</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>desk</small></p></td>
<td><p><small>2</small></p></td>
<td><p>2147483904</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>dish</small></p></td>
<td><p><small>1/ 2/ 3/ 4</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>drum white/blue</small></p></td>
<td><p><small>2</small></p></td>
<td><p>270</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>drum red</small></p></td>
<td><p><small>2</small></p></td>
<td><p>260</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>normal drum</small></p></td>
<td><p><small>2/ 4</small></p></td>
<td><p>1049119</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>flag/banner</small></p></td>
<td><p><small>2/ 7</small></p></td>
<td><p>603980035</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>fence</small></p></td>
<td><p><small>3/ 4</small></p></td>
<td><p>259</p>
<p>16781568</p>
<p>16777478</p>
<p>16777486</p>
<p>16777497</p>
<p>281</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>gas_cylinder</small></p></td>
<td><p><small>2</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>gunny_sack</small></p></td>
<td><p><small>1</small></p></td>
<td><p>273</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>house window</small></p></td>
<td><p><small>1/ 2/ 3</small></p></td>
<td><p>261</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>hut</small></p></td>
<td><p><small>1</small></p></td>
<td><p>262</p>
<p>2147483910</p>
<p>298</p></td>
<td><p>0 524288</p></td>
</tr>
<tr class="odd">
<td><p><small>ladder</small></p></td>
<td><p><small>1</small></p></td>
<td><p>297</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>lamp</small></p></td>
<td><p><small>3</small></p></td>
<td><p>1573397</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>light</small></p></td>
<td><p><small>1</small></p></td>
<td><p>3146249</p>
<p>3146250</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>med_equip</small></p></td>
<td><p><small>1</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>net</small></p></td>
<td><p><small>1</small></p></td>
<td><p>259</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>pot</small></p></td>
<td><p><small>1</small></p></td>
<td><p>267</p>
<p>278</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>radio</small></p></td>
<td><p><small>1</small></p></td>
<td><p>24</p>
<p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>roadcone</small></p></td>
<td><p><small>2</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>sandbag</small></p></td>
<td><p><small>1</small></p></td>
<td><p>34</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>signboard</small></p></td>
<td><p><small>1</small></p></td>
<td><p>16777486</p>
<p>303</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>stairs</small></p></td>
<td><p><small>1</small></p></td>
<td><p>2147483904</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>sunshade</small></p></td>
<td><p><small>2</small></p></td>
<td><p>3</p>
<p>603979779</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>tank</small></p></td>
<td><p><small>2/ 3</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>television</small></p></td>
<td><p><small>1</small></p></td>
<td><p>261</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>tent</small></p></td>
<td><p><small>2/ 3</small></p></td>
<td><p>3</p>
<p>259</p></td>
<td><p>0 2</p></td>
</tr>
<tr class="even">
<td><p><small>timber</small></p></td>
<td><p><small>1</small></p></td>
<td><p>262</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>tin_wall</small></p></td>
<td><p><small>1</small></p></td>
<td><p>16777486</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>tire</small></p></td>
<td><p><small>6</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>tree</small></p></td>
<td><p><small>2</small></p></td>
<td><p>270</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>tool</small></p></td>
<td><p><small>4</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>tub</small></p></td>
<td><p><small>1</small></p></td>
<td><p>267</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>utility_pole</small></p></td>
<td><p><small>1/ 2</small></p></td>
<td><p>284</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>wall</small></p></td>
<td><p><small>2</small></p></td>
<td><p>2</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>window</small></p></td>
<td><p><small>2</small></p></td>
<td><p>261</p>
<p>603979779</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>wood_box</small></p></td>
<td><p><small>1/ 6</small></p></td>
<td><p>256</p></td>
<td><p>0</p></td>
</tr>
<tr class="even">
<td><p><small>wood_box gntn</small></p></td>
<td><p><small>5</small></p></td>
<td><p>262400</p></td>
<td><p>0</p></td>
</tr>
<tr class="odd">
<td><p><small>wood_box/mafr_desk001</small></p></td>
<td><p><small>1/ 2/ 3</small></p></td>
<td><p>2147483904</p></td>
<td><p>0 65536</p></td>
</tr>
</tbody>
</table>

## **LbaTool**

Download here.
<https://github.com/youarebritish/LbaTool/releases/tag/1.0>

Find the lba for **afgh_char002** and **afgh_flag001** and paste in
**afgh_common_fpk/Assets/tpp/level/location/afgh/block_common/lba**
or in a place you know better for it in your project. The path folder I
choose here is because we are working to spawn in free roam AFGH
location pack_common. If we're in a side-op it probably would be in
Sideop_fpk/Assets/tpp/level/mission2/quest/ih/lba.

Open the **afgh_char002** and **afgh_flag001** outside of Unity with
the LbaTool. Remember the mockupGimmick we did later and open the file
too.

Erase the content afgh_char002.lba we have at the start, including the
dataset path.

**locator name of chair:** afgh_char002_gim_n0000|srt_afgh_char002

**locator name of flag:** afgh_flag001_gim_n0000|srt_afgh_flag001

If you want to add more than one locator, just increase the
...**gim_n0000|** to **gim_n0001|**, **gim_n0002|** and so on.

Copy position and rotation from the mockupGimmick to the lba file and
save. Example afgh_char002:

[578x578px](/File:Gimmick01.jpg "wikilink")

Do the same for **afgh_flag001.**

Notice that **dataset="path"** will be our fox2file where we'll add the
Entity **TppSharedGimmickData.** So, once we finish exporting the main
fox2 file, we will add the dataset path in lba file again and repack
with the tool.

### **Entity TppSharedGimmickData**

Create a new DataSet and drop two Entities **TppSharedGimmickData.** One
for the Chair and another for Flag/Banner we planned.

**afgh_char002**

[552x552px](/File:Mockup02.jpg "wikilink")

**<big>modelFile</big>** Just add the model of afgh_char002.fmdl here

**<big>geomFile</big>** Just add the geom of afgh_char002.geom here

**<big>breakedModelFile and breakedGeomFile</big>** Some models like
box, wood desk, wall have a second fmdl and geom for pieces that will of
course end the break animation and result in a visual broke of the first
model. It's funny that you can add anything here and make the break
quite interesting visually.

**<big>partsFile</big>** Model needs a part file to load ph, target and
effects. Remember to add the files and path in Unity and Mod Folder.

**<big>numDynamicGimmick</big>** As we talk about at the beginning of
this guide. Need more information about.

**<big>locaterFile</big>** lba files will be in every fpk folder.
Precisely in /Assets/tpp/level folder. In our case we are using
afgh_common_fpk. So the location for it will be is
**/Assets/tpp/level/location/afgh/block_common/lba.** Make sure to add
it later in Unity and Mod Folder.

**<big>flags1</big>** Please see the QueryList. It's not clear what this
flags actually means. Needs more information.

**<big>flags2</big>** Please see the QueryList. It's not clear what this
flags actually means. Needs more information.

Do the same for the afgh_flag001.

Export the Fox2 file to the fpkd of our Mod Folder. You can now delete
the mockupGimmick. It's important that this fox2 file we did just to
take the positions and rotations for lba files not load in the Mod.

Look that I'm using the same mod from the previously guides. Every mod
can have tons of fox2 file that deals with something in specific.

[542x542px](/File:Gimmick02.jpg "wikilink")

We need to edit manually the MyThirdFox2File in xml to add the flag
number and of course check if the paths are correctly done. Remember now
to check the QueryList and choose the best flag.

[512x512px](/File:Gimmick03.jpg "wikilink")

Save and pack the fox2 file.

### **Last steps...**

#### **Lba files**

Back to the lba files and now let's add the dataset path. Save, pack
with the LbaTool and copy/paste for our Mod Folder in
**fpk/Assets/tpp/level/location/afgh/block_common/lba** or the path you
choose in **TppSharedGimmickData.**

[557x557px](/File:Gimmick04.jpg "wikilink")

[566x566px](/File:Gimmick05.jpg "wikilink")

#### **Models, motions and parts files**

We need to add to our mod folder the fmdls, geoms, parts and motion of
our chair and flag. Motion is only about the flag. Sometimes a lba will
need a effect too. To know which effect and motion to add to our
project, look inside the parts file of the model and everything will be
there.

**Fmdl and Geoms**

[428x428px](/File:Gimmick06.jpg "wikilink")

**Motion**

[410x410px](/File:Gimmick07.jpg "wikilink")

**Parts** Notice that parts goes to fpkd folder, not fpk.

[431x431px](/File:Gimmick08.jpg "wikilink")

Done. Now test it. Make the .mgsv file in Makebite building the
**LoadingStairsInGame folder.** Open with SnakeBite and see it in game.

Unfortunately due to the limits of Free Roam. Only one TppSharedGimmick
was spawned. The flag works at least.

[527x527px](/File:VideoGimmick01.webm "wikilink")