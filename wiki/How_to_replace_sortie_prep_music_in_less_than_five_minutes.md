---
title: How to replace sortie prep music in less than five minutes
permalink: /How_to_replace_sortie_prep_music_in_less_than_five_minutes/
tags: [Guides, Sound]
---

[thumb|480x480px](/File:How_to_replace_sortie_prep_music_in_MGSV_in_less_than_five_minutes. "wikilink")

**This video assumes you have unpacked your game with File Monolith and
have SecaProjects SBP Tool, Wem Converter and Wwise installed.**

You will also need a basic understanding of MakeBite and how to use
SnakeBite Mod Manager.

[File Monolith](https://www.nexusmods.com/metalgearsolidvtpp/mods/739)

[SBP
Tool](https://mega.nz/file/SVxHWQ6D#Y9UcP0t61XG5q_I3ObTZxMTsGnupNBMUZ0-llfz3aFs)

**[Sound
Converter](https://mega.nz/file/uZxjWaga#H9blO_Zdw_s75ghccGKOKFIMlKtDpR5Bma7bQq2pVq8)**

[Wwise 2015](https://mega.nz/file/HcxVBYjC#KBYOI1EQ54iFYgwF-oWi0tTuPAPlDgf-Y743CzQdTRI)



#### Part 1: Locating the .sbp and extracting it

To start off, you will need to find **common_bank_01.sbp.** located in
**Assets/tpp/sound/asset**.

Once you have found it copy it into your working folder, then drag it
onto the SBP Tool. This will create a folder called common_bank_01 and
extract it into .wems we can work with. Now open the new
common_bank_01 folder and go into the stp folder. There you will find
**3cb314cd.wem**, This is the sortie prep music file.

#### Part 2: Converting and finding a replacement

Now you have **3cb314cd.wem** you should copy it into the sound
converter folder alongside **divinity_converter.exe**. Double click the
exe and it will convert the .wem into a .ogg inside the NUMBERED folder.
Just to be safe, listen to it to make sure you got the right file. Now
comes the fun part, find a piece of music you think would sound good and
make sure its in the **.wav** format. Now open **Wwise 2015** and create
a new project, go to **File** up the top left and down the menu to
**Project Settings.** Click on the **Source Settings** tab then
**Default Conversion Settings**, Change it to **Vorbis Quality High**.
Now click ok on both panels to save your new settings.

#### Part 3: Wav to Wem

At this point you should have your new music in wav format ready to be
imported into Wwise. Click **File** up the top left and go down to
**Import Audio files**, after clicking this a new window will pop up and
you must drag your .wav into it. Now click the import button. Once done
head back up to the top left and click on **File** once more then down
to **Convert All Audio Files**. Make sure **Windows** is ticked then
click ok and your wav has been successfully converted\! Finally, Head to
**(User)/Documents/WwiseProjects/(projectname)/Windows/SFX.** Your .wem
will be there.

#### Part 4: Replacing and Repacking

Copy your new .wem back to your working folder and into
**common_bank_01/stp**, now delete **3cb314cd.wem** rename your new
.wem to **3cb314cd**. Once this is done go back to the folder with **SBP
Tool**, The **Common_bank_01 Folder** and **Common_bank_01.sbp**.
Rename **Common_bank_01.sbp** to something like
**Common_bank_01_Backup** for safety, Then drag the
**Common_bank_01 Folder** onto **SBP Tool**. This will create a new
**Common_bank_01.sbp**.

#### Part 5: Making your mod

Create a new folder structure like: **Assets/tpp/sound/asset** and place
your new **Common_bank_01.sbp** inside. Open **MakeBite** and build
your mod, make sure you fill out the name and description so you don't
forget what the mod does. Once created, install your mod with
**Snakebite** and you are done\!