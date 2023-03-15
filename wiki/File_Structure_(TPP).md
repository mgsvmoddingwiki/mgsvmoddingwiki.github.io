---
title: File Structure (TPP)
permalink: /File_Structure_(TPP)/
tags: [Files, Reference]
---

Metal Gear Solid V: The Phantom Pain's file structure is made up of a
series of a series of files with the .dat extension. All of the .dat
files are QAR archives with their extensions changed with the exception
of e2f8e499bc8f3606.dat, e2f9a1fda590d087.dat, e2faa449a7e0781d.dat,
e2fb02c35da41a21.dat, and e2fbebbd66f86086.dat, which are .wmv files
with their extensions changed.

See [File Formats](/File_Formats_Used_in_MGSV_\(List\) "wikilink") for
more information about the files in the dats, [Things
Codes](/Things_Codes "wikilink") for information on some of the naming
of files, [Sound Codes](/Sound_Codes "wikilink"), or [animation
notes](https://chocmake.github.io/guides/mgsv-adding-player-motions/#resources).

## Master Folder

The master folder contains all of the assets used in The Phantom Pain.

| Label | Dat File   | Texture File | Notes                                                                                                                                     |
| ----- | ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| cypr  | chunk0.dat | texture0.dat | Cyprus chunk. Also contains files related to the player and items used by the player.                                                     |
| base  | chunk1.dat | texture1.dat | Base chunk. Contains files related to buddies, some form variation related files (mostly unrelated to the player), and some weapon files. |
| afgh  | chunk2.dat | texture2.dat | Afghanistan chunk. Contains files related to Afghanistan.                                                                                 |
| mtbs  | chunk3.dat | texture3.dat | Motherbase chunk. Contains files related to Motherbase.                                                                                   |
| mafr  | chunk4.dat | texture4.dat | Middle Africa chunk. Contains files related to Africa.                                                                                    |
| data  | data1.dat  | N/A          | Data chunk. Contains unpatched scripts.                                                                                                   |

In addition to the base .dat files, the master folder also contains
directories for updates and DLC respectively.

| Folder | Notes                              |
| ------ | ---------------------------------- |
| 0      | Contains the game's updated files. |
| 1      | Contains the game's DLC files.     |

Each of the 1 folder's DLC folders also contain a 0 folder. Which just
like the 0 folder in the master folder, contains a 00.dat and 01.dat
file. In each of these folders, the 01.dat file contains textures, while
the 00.dat file contains all other assets.

When SnakeBite is installed it moves the files in master/0/00.dat,01.dat
to master/a_chunk7.dat, a_texture.dat and the patched 00.dat lua files
into 01.dat. From then it installs mods into 00.dat
