---
title: SnakeBite Mod Manager
permalink: /SnakeBite_Mod_Manager/
---

SnakeBite is an unofficial, open-source mod manager for Metal Gear Solid
V: The Phantom Pain. It was originally created and supported by
topher-au until version 0.8.3, and has since been maintained by
TinManTex.

SnakeBite works by installing mods to The Phantom Pain's data patch
archive (0\\00.dat). When initially set up, it moves all of the original
data inside of 0\\00.dat to 0\\01.dat except for *foxpatch.dat*. This
gives SnakeBite a nearly empty archive to work with. It installs mods to
0\\00.dat as files inside of this archive have loading priority over
every other file used by the game.

## Usage

Using SnakeBite after installation is very simple. The *Start Game*
button will launch The Phantom Pain. The *Mods* button opens the mod
installation and uninstallation interface. The *Settings* button opens
the settings interface.

### Mod Installation and Uninstallation Interface

The mod installation and uninstallation interface is the interface that
allows users to view installed mods, install new mods, and uninstall
installed mods.

Clicking on an installed mod will show information about it. This
information includes the name of the mod, the author of the mod, a link
to the mod's website, and a description of the mod provided by the
author.

Clicking the *Install .MGSV* button, opens up a file dialogue where the
user can navigate to and install a mod's .mgsv (SnakeBite archive) file.

Clicking the *Install .ZIP* button, opens an interface where SnakeBite
will attempt to turn a mod's .zip file into a SnakeBite mod. It is
recommended to avoid this feature when possible as it may not work
correctly.

Clicking the *Uninstall* button uninstalls the currently highlighted
mod.

## MakeBite

MakeBite is SnakeBite's mod creation companion app. While SnakeBite is
used to install mods, MakeBite is used to create them. MakeBite works by
getting a list of all of the files in a folder specified by the user.
The user can provide information about the mod they want create using
the built-in form. When MakeBite builds a mod, it creates an .xml
detailing the author's description combined with a list of the files
that were in the specified folder. SnakeBite includes this .xml along
with all of the files that were in the folder in a .zip file, with its
extension renamed to .mgsv.

When SnakeBite installs a mod created with MakeBite, it references the
.xml to get the information that will be displayed to the user about the
mod, as well as the list of files it will be installing.

### Usage

[thumb|330x330px|Video tutorial for creating a SnakeBite
mod.](/File:SnakeBite_In-Depth-_Creating_SnakeBite_Files_for_Your_Mods "wikilink")
MakeBite is fairly simple to use. First, a user should create a folder
and add all of the files they have modified into this folder. .fpk and
.fpkd files can be unpacked, and deleted (along with their .xml file),
leaving only the _fpk and _fpkd folder behind. Any unmodified files in
the _fpk and _fpkd folders can also be deleted, as SnakeBite
automatically finds and adds any files missing from the archive. (Note:
Only .fpk and .fpkd files can be unpacked and deleted. Other archive
files, such as .pftxs files, must be packed into an archive.)

Once the folder is prepared, the user can start MakeBite. In MakeBite,
the user can specify a name for their mod, the version of the mod, the
version of The Phantom Pain the mod is intended for (this will be
1.0.7.1 if the user is on the latest patch), their mod's website, and a
description of their mod. After that, the user can click the button with
the ellipsis to select the folder that contains all of their files. Once
the folder is selected, a list of all of the files in the folder will
appear under *Mod Files*. In most cases, if a file does not have a
hashed name, the line should begin with */Assets/*. Once all of this is
done, the user simply needs to click the *Do it (build archive)* button
and select an output folder to build their .mgsv file.