---
title: File Structure (Metal Gear Solid V: The Phantom Pain)
permalink: /File_Structure_(Metal_Gear_Solid_V-_The_Phantom_Pain)/
---

Metal Gear Solid V: The Phantom Pain's file structure is made up of a
series of a series of files with the .dat extension. All of the .dat
files are QAR archives with their extensions changed with the exception
of e2f8e499bc8f3606.dat, e2f9a1fda590d087.dat, e2faa449a7e0781d.dat,
e2fb02c35da41a21.dat, and e2fbebbd66f86086.dat, which are .wmv files
with their extensions changed.

## Master Folder

The master folder contains all of the assets used in The Phantom Pain.

| Label | Dat File   | Texture File | Notes                                                                                               |
| ----- | ---------- | ------------ | --------------------------------------------------------------------------------------------------- |
| cypr  | chunk0.dat | texture0.dat | Cyprus chunk. Also contains files related to the player and items used by the player.               |
| base  | chunk1.dat | texture1.dat | Base chunk. Contains files related to buddies, form variation related files, and some weapon files. |
| afgh  | chunk2.dat | texture2.dat | Afghanistan chunk. Contains files related to Afghanistan.                                           |
| mtbs  | chunk3.dat | texture3.dat | Motherbase chunk. Contains files related to Motherbase.                                             |
| mafr  | chunk4.dat | texture4.dat | Middle Africa chunk. Contains files related to Africa.                                              |
| data  | data1.dat  | N/A          | Data chunk. Contains unpatched scripts.                                                             |

In addition to the base .dat files, the master folder also contains
directories for updates and DLC respectively.

| Folder | Notes                              |
| ------ | ---------------------------------- |
| 0      | Contains the game's updated files. |
| 1      | Contains the game's DLC files.     |

Each of the 1 folder's DLC folders, also contain a 0 folder which, just
like the 0 folder in the master folder, contain a 00.dat and 01.dat
file. In each of these folders, the 01.dat file contains textures, while
the 00.dat file contains all other assets.