---
title: 'How To Find & Change Audio Files'
permalink: /How_To_Find_&_Change_Audio_Files/
tags: [Guides, Sound]
---

> This guide uses an alternative method to the prior, related custom sound [guide](/How_to_add_custom_sounds), along with some different tools.

## Step 1

1. Download [File Monolith](https://www.nexusmods.com/metalgearsolidvtpp/mods/739?tab=description\).

2. Extract the files from the zipped/.rar file you downloaded. Put them into a separate folder of your choice. Mine is labeled `File Monolith`.

3. Run the "Archive Unpacker" Application that is located in the files you just moved.

4. Find where your "chunk" files are located. In my directory, it is `A:\Steam\steamapps\common\MGS_TPP\master`.

5. Use the ellipses to find and click on a "chunk" file. Ex. `chunk0.dat`.

6. Determine an output folder. I labeled mine "MGSVTPP Folders," as I use multiple files.

Feel free to make backups of any file you intend to modify, but the programs that we use make backups for you, or don't modify the original file to begin with.

---

## Step 2

1. Assuming you extracted `chunk0.dat`, as previously instructed, the files you need are located here: `\Assets\tpp\sound\asset`.

2. Download the [sbp_tool](https://github.com/secaproject/SBP_tool).

3. Extract the files from the zipped/.rar file you downloaded. Put them into a separate folder of your choice. Mine is labeled `sbp tool`.

4. If you intend to modify any of Venom Snake's combat lines (ie. holdups, interrogatons, buddy lines & commands, etc), you need `vox_sna.sbp` located in the `chunk0` Folder we extracted earlier. As previously stated, it would be located in `\Assets\tpp\sound\asset`.

5. Copy the `vox_sna.sbp` file. Then, paste the copy into the same folder that the "sbp_tool" is located in.

6. Run the "sbp_tool_V0.8" application. Write the full name of the file you intend to open. In our case, it's `vox_sna.sbp`. Type that name in exactly as presented, without the quotations that I added. Then, click "Enter" on your keyboard.

---

## Step 3

1. You should now have an openable folder labeled as `vox_sna`. The lines you'll need to replace are located in two separate folders. The bulk of the lines are in `vox_sna\stp` whereas the smaller amount are located in `vox_sna\bnk\DIDX`.

2. I heavily recommend making two separate folders elsewhere. Name one `stp Folder` and the other `bnk Folder`. Then, copy all `.wem` files from `vox_sna\stp` and paste them into your `stp Folder`. Lastly, copy all .wem files from `vox_sna\bnk\DIDX` and passte them into your `bnk Folder`.

---

## Step 4

1. Download the [vgmstream](https://github.com/vgmstream/vgmstream/releases/tag/r1879) tool.

2. Extract the files from the zipped/.rar file you downloaded. Put them into a separate folder of your choice. Mine is labeled `VGMStream Audio Converter`.

3. The way to run the "vgmstream-cli" application is different than the other apps we've used so far. You must drag any .wem file you have ONTO the .exe itself. Far as I'm aware, you can't just run the app on its own.

4. As an example, I took my copied .wem files and selected them all at once. I dragged all of them onto "vgmstream-cli", and they were converted to `.wav` **inside the folder that you drag them from**.

5. This line is for those still confused. If you understood the previous line, move on.
    - Copy all .wem files you intend to convert. Paste them into the `VGMStream Audio Converter` folder that we made. Then, **drag** any `.wem` file you want to convert **directly onto** the "vgmstream-cli" app. They'll convert to **listenable** files known as `.wav` files.

6. I recommend taking your newly generated `.wav` files and putting them into a subfolder. For any from your `stp Folder`, I recommend creating a folder in there named `.wav files` and putting any `.wav` file in there. It keeps things organized, but it's up to preference.

---

## Step 5

1. Write down the names of **each** file somewhere and LABEL what the line states. Example: `0cdc0624.wem`, when converted to `.wav`, has Snake saying, "Cease cover fire." Write both the file name and what is said somewhere. You don't *have to*, but it's a headache to remember 100+ lines.

2. Record or find any audio you like. If you wanna replace `0cdc0634` with "Is there a way to take off my pants?" from MGS3, go wild. After you have whatever lines you have, change their name to what you want to replace. Ex. Change the name of the file "Is there a way to take off my pants?" to `0cdc0634`.

---

## Step 6

1. Download [Wwise 2013.2.9](https://www.nexusmods.com/witcher3/mods/3234).
> If you're wondering why, it's because only the older versions of Wwise work for MGSV. And the Wwise website doesn't have them anymore, as of me writing this guide.

2. Open it (you *may* need the base version of Wwise from the website, but I haven't tested it as I already have it).

3. Create a new project. When you do, hold `Shift` and `K` at the same time until a menu pops up.

4. Go to "Source Settings". Click on "Default Conversion Settings". Then, go to "Factory Conversion Settings," then "Vorbis", then "Vorbis Auto Detect Medium." Then click "OK".
> **Note:** I am uncertain if other conversions work, but I'm operating under what I know works. Feel free to test.

5. Click on "Project" in the upper left corner of the app, then click "Import Audio Files". Add in all files you renamed, etc.

6. Go back to "Project", but this time click on "Convert All Audio Files." All the files you just made back into .wem via that should be located in your `Documents\WwiseProjects\YOURPROJECT\.cache\Windows\SFX`.

7. Take all those `.wem` files and edit out the extra numbers it added. Take them and place them back into either the "stp" or "bnk" folders that we extracted with the sbp_tool, wherever the **original** lines were. You'll know you did it right if you get an "Overwrite Files?" type of popup. Obviously overwrite.

8. Reopen the sbp_tool, and then type in the file name. It should just be `vox_sna`. It'll repack said file back into its original full form. It should be labeled as `vox_snaNEW.sbp`. Copy that `.sbp` file.

---

## Step 7

1. Take that `.sbp` file and follow the necessary steps to make a mod through MakeBite. If that's vague, then it *should* be the following case: Make a folder with your mod's name on it. Ex. `Venom Snake Audio Mod`. Then, inside that folder, create the following folders in order: `\Assets\tpp\sound\asset`. Place the copy of the .sbp file into the last "asset" folder. Rename the `.sbp` file into `vox_sna.sbp`, just as the original was.

2. Use MakeBite to package the file, et cetera.

3. If any of that is confusing, then I'm sorry. Just the way I did it, and I had to learn 3/4 of that on my own over the course of dozens of very irritating hours.

> **Author's Note:** Yes, you do need to replace at least well over 100 lines, depending on your patience level. The good news is that most of them are not used in-game. At all, from what I can tell. You only *have to* replace the lines that you know, or suspect, are used.
>
> There are many repeat lines such as "Go." I do not have a good answer as to which lines are for certain used over others, even though I've spent dozens of hours on this. If you have the time and patience, you can discover for yourself, but I'm tired of this damn thing.