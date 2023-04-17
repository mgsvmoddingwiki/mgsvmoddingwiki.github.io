---
title: ! 'Sahelanthropus Nav2'
tags: [Guides, Missions]
permalink: /Sahelanthropus_nav2/
---

# Sahelanthropus Nav2 

.nav2 files are the NPC “navmesh” map navigation files, it makes NPCs able to "see" the terrain and paths for them to use, Sahelanthropus is no diference there. Without this files, Sahelanthropus wont work. Currently there is no way to create new nav2 files but we can edit the existing ones.  

In order to load the Sahelanthropus .nav2 files without creating conflicts or breaking anything you need to load it on the same nav.fox2 files that loads the original .nav2 files. loading the Sahelanthropus .nav2 files on the mission folder will result in conflicts and Sahelanthropus wont work.

## Requirements

- [010 Editor](https://www.sweetscape.com/010editor/)
- [Nav2 010 Template](https://github.com/oldbanana12/Nav2)
- MGSV: TPP Map files unpacked
- [Foxtool](https://github.com/Atvaark/FoxTool)
- [GzsTool](https://github.com/Atvaark/GzsTool)
- [Makebite/Snakebite](https://www.nexusmods.com/metalgearsolidvtpp/mods/106)


## Preparing the folders to makebite

> In this example i will be editing an nav2 from the Africa map, but the process is the same for all chunks/maps
> The chunks are splited in 2 folders, one that ends on fpk and one that ends on fpkd, usually fpk holds the files and fpkd has the scrits to load them.
{:.important}

The files that we need are located in `Assets\tpp\pack\location\map_name\pack_small`

For Africa it its `Assets\tpp\pack\location\mafr\pack_small`, now i will edit the chunk 127_130 that is located on the folder `Assets\tpp\pack\location\mafr\pack_small\127`.

![fpk/fpkd](/assets/Sahelanthropus_nav2/pack_127_130.png){:.thumb}

Unpack the fpk and the fpkd with GzsTool and you will get 2 normal folders

![unpacked fpk/fpkd](/assets/Sahelanthropus_nav2/pack_127_130_unpacked.png){:.thumb}

### Fpk Folder

Now cut those 2 folders and paste them in your work folder(if you use one)
open the fpk folder and delete all folders inside `Assets\tpp` except for the `level` folder, that one stays.

![only the level folder/subfolders stays](/assets/Sahelanthropus_nav2/inside_fpk_tpp.png){:.thumb}

Now, inside the level folder `\level\location\mafr\block_small\127\127_130` delete everything exept the .nav2 files, sometimes there is only 1, sometimes there is 2, one .nav2 and one .1.nav2, dont delete those.

![only the NAV2 files stays](/assets/Sahelanthropus_nav2/inside_level_folder.png){:.thumb}

>On the `\level\location\mafr\block_small\127\127_130` the numbers are the chunk names, if you edit for example the chunk 123_123 it will be `\level\location\mafr\block_small\123\123_123`
{:.important}

Now you must rename the nav2 file with `_sahelan` after the map 4 letters for example `mafr_127_130_nav` gets renamed to `mafr_sahelan_127_130_nav`. 



>Why are we renaming it? Its simple, if we dont rename it, snakebite will **replace the Sahelanthropus .nav2 by the original one and soldiers wont work on that area**, if we rename it snakebite will **add** this file to the folder, so both files will be able to be loaded in-game at the same time, avoiding conflicts and errors.
{:.important}

### Fpkd Folder

Now we need to edit the script that loads the original nav2 to make it load both .nav2 files, the script is located inside the fpkd folder.

Open the folder and head over to the last sub-folder, inside the last sub-folder you will have some .fox2 files, you can delete all of them **except** the nav file.

![only the nav file stays](/assets/Sahelanthropus_nav2/inside_fpkd.png){:.thumb}

## Editing the nav files

In order to make Sahelanthropus work, we need to edit the "Main flags" and "Sub Flags" on the .nav2 file and edit the nav.fox2 to make it load the file in-game.
For that we need the Foxtool, 010 editor, and the Nav2 010 Template.

### Nav fox2

In order to edit the fox2 file, open it with the foxtool, you should get an .xml file on the same foler with the same name: 

![Result](/assets/Sahelanthropus_nav2/foxtool_unpack.png){:.thumb}

After this delete the FOX2 file and open the xml one.
Inside the xml file, we need to create an new entity to load the new .nav2 file.

#### 1st: create an new entity

To create an new entity, first copy the existing "NavBlock" value on the Datalist, paste it bellow and edit both "key" and "addr" values, on the "key" add `_sahelan` on the end, for example, `NavxNavBlock_1882` gets renamed to `NavxNavBlock_1882_sahelan` on the "addr" you can use `0x03306FA0` / `0x03307080`  seems to work fine.

![Datalist Before](/assets/Sahelanthropus_nav2/fox2_before_detalist.png){:.thumb}
![Datalist After](/assets/Sahelanthropus_nav2/fox2_after_datalist.png){:.thumb}


Now do the same but on the entity itself.

On the entity property you need to edit some data:

- The `Name`, you must edit it to the same one above, for example `NavxNavBlock_1882` gets renamed to `NavxNavBlock_1882_sahelan`
- The entity address must be the same on the entity and the datalist 
- The `worldName` WAS TO BE `sahelan`, wont work if you dont place it like that
- The `filePath`, `filePtr` and `remainingFilePtr` must be updated to the sahelan nav2 files names
- The `useBlockParameter`, `verticalThreshold`, `simplificationThreshold`, `doesHoleSimplification`, `holeSimplificationConvexThreshold`, `holeSimplificationObbExpandThreshold`, `holeSimplificationObbToAabbThreshold`, `holeSimplificationSmoothingThreshold`, `isHoleSimplificationDoesNotClosePassage` and `holeSimplificationReduceCount` also need the correct values for Sahelanthropus

They are: 
```xml
<property name="useBlockParameter" type="bool" container="StaticArray" arraySize="1">
          <value>false</value>
        </property>
        <property name="verticalThreshold" type="float" container="StaticArray" arraySize="1">
          <value>0</value>
        </property>
        <property name="simplificationThreshold" type="float" container="StaticArray" arraySize="1">
          <value>0</value>
        </property>
        <property name="doesHoleSimplification" type="bool" container="StaticArray" arraySize="1">
          <value>false</value>
        </property>
        <property name="holeSimplificationConvexThreshold" type="float" container="StaticArray" arraySize="1">
          <value>0.2</value>
        </property>
        <property name="holeSimplificationObbExpandThreshold" type="float" container="StaticArray" arraySize="1">
          <value>10</value>
        </property>
        <property name="holeSimplificationObbToAabbThreshold" type="float" container="StaticArray" arraySize="1">
          <value>10</value>
        </property>
        <property name="holeSimplificationSmoothingThreshold" type="float" container="StaticArray" arraySize="1">
          <value>1</value>
        </property>
        <property name="isHoleSimplificationDoesNotClosePassage" type="bool" container="StaticArray" arraySize="1">
          <value>false</value>
        </property>
        <property name="holeSimplificationReduceCount" type="uint32" container="StaticArray" arraySize="1">
          <value>1</value>
        </property>
``` 

Example:
{% include youtube id="wT0-azhuV1s" %}




After you made all required changes, use the foxtool to create the FOX2 file, now the only thing left to do is edit the "flags" on the .nav2 file

### .nav2 file
Flags are used to decide what NPC is allowed to use that area, for example the flag 1249 allows Human NPCs to use that area, Sahelanthropus uses the flag 1, so you need to edit all main flags and subflags to 1

In order to edit the nav2 file you need to open it on the 010 Editor, after you open the file, run the nav2 template, after doing that the 010 editor will open an menu with the sections of the file.

>The Main flags are located inside `Struct Entry entry`, (on the first 5 entries only(0,1,2,3,4)) --> `struct NavWorld world` --> `struct NavworldsSubsection5 subsection5`, all entries on it.
>
>The Sub Flags are located on the 1st `struct Section2Entry section2entry` ( always on the 1st(0)) --> `subsection1entries`, all entries on it.
> 
>Some .nav2 files have more flags and subflags then the others, its normal, mainly in more complex areas like CPs.
>
>.1.nav2 files do not have subflags, and they only have 4 `Struct Entry entry`, the flags are always on the first one (0).
{:.important}

Example:
{% include youtube id="RuBtZ6NF1Io" %}



## Load the files in-game

To load the files in-game you need to create an mod with makebite and install it with snakebite.
The correct way to load them is to create an folder with subfolders on the mod folder, it should be like this:

`Assets\tpp\pack\location\mafr\pack_small`
Inside pack_small you need the chuck number folders, in this example its `127\127_130`, it should look like this now: 

`Assets\tpp\pack\location\mafr\pack_small\127\127_130`

inside the 127_130 folder, place there the fpk_fpkd folders with the moded files, makebite will deal with the rest:


Note: mafr is the name of the map

![example of dominion demo files](/assets/Sahelanthropus_nav2/dominion_demo_example.png){:.thumb}

And that is all of it, now load the sahelan and have fun!