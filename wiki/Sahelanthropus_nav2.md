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
{:.important}

The files that we need are located in `Assets\tpp\pack\location\map_name\pack_small`

For Africa it its `Assets\tpp\pack\location\mafr\pack_small`, now i will edit the chunk 127_130 that is located on the folder `Assets\tpp\pack\location\mafr\pack_small\127`.

![fpk/fpkd](/assets/Sahelanthropus_nav2/pack_127_130.png){:.thumb}

Unpack the fpk and the fpkd with GzsTool and you will get 2 normal folders

![unpacked fpk/fpkd](/assets/Sahelanthropus_nav2/pack_127_130_unpacked.png){:.thumb}

Now cut those 2 folders and paste them in your work folder(if you use one)
open the fpk folder and delete all folders inside `Assets\tpp` except for the `level` folder, that one stays.

![only the level folder/subfolders stays](/assets/Sahelanthropus_nav2/inside_fpk_tpp.png){:.thumb}

Now, inside the level folder `\level\location\mafr\block_small\127\127_130` delete everything exept the .nav2 files, sometimes there is only 1, sometimes there is 2, one .nav2 and one .1.nav2, dont delete those.

![only the NAV2 files stays](/assets/Sahelanthropus_nav2/inside_level_folder.png){:.thumb}

>On the `\level\location\mafr\block_small\127\127_130` the numbers are the chunk names, if you edit for example the chunk 123_123 it will be `\level\location\mafr\block_small\123\123_123`
{:.important}


