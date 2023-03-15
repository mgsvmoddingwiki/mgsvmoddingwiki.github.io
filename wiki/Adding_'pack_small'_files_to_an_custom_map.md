---
title: Adding "pack small" files to an custom map
permalink: /Adding_'pack_small'_files_to_an_custom_map/
tags: [FoxKit]
---

## Requirements

  - [Foxtool](https://github.com/Atvaark/FoxTool/releases/tag/v0.2.6)
  - Hexadecimal editor
    ([HxD](https://mh-nexus.de/en/downloads.php?product=HxD20) works
    fine)
  - [pack_small](https://github.com/TheHuntingParty/TPP-Pack-small)
    files
  - Winrar
  - [Bulk Rename Utility](https://www.bulkrenameutility.co.uk/)

## Making the game load the pack_small files

First thing you want to do is download the required files from the
GitHub Repo
[left|175x175px](/File:GitHub_repo_download_example.png "wikilink")

After downloading open the .zip with WinRAR, if you use the default
files explorer it will take ages to open
[left|frameless|364x364px](/File:Pack_small_winrar_Example.png "wikilink")

When you open that file, you will see 3 folders and 2 GitHub files, the
GitHub files are useless, extract ONLY expl_fpk and expl_fpkd on your
map folder, in this case its Assets\\tpp\\pack\\location\\expl. (expl
stands for your 4 map letters)

keep the WinRAR window open, the "pack_small" is for later
[left|frameless|614x614px](/File:Winrar_file_example_pack_small.png "wikilink")

Should look like something like this:
[left|frameless|532x532px](/File:Another_image_god_this_sucks_aaaaaa.png "wikilink")

Now rename both folders, remove the "expl" and replace by your map 4
letters, in this example it will be "aaaa", select the 2 folders and use

You can use Bulk Rename Utility to do that,

Windows 11: select the 2 folders and right click -\> show more options
--\> Bulk rename here
[right|frameless|336x336px](/File:Bulk_file_1.png "wikilink") Windows
10: select the 2 folders and right click --\> Bulk rename here

Now, the program should open with those 2 folders selected,
[center|frameless|867x867px](/File:Bulk_sofware_ui_0.png "wikilink")

Next you want to check the option "Subfolder" on Filters(12), after
that, all files and folders inside those 2 folder are going to appear on
the tree window (where the green circle is on the image above), now you
have to select either all files (shift click 1st and last entry) or
select only those that contain "expl" on the name, they are 6 to be
precise, after you selected them, got to the area 3, called "Replace" On
the "Replace" textbox, write expl and on the "with" textbox write your 4
map letters, in this example they are "aaaa"
[right|frameless|524x524px](/File:Bulk_sofware_ui_1.png "wikilink") Was
you can see, the names are going to be different, the expl is now the 4
letters that you placed on the "with" textbox, all you have to do now is
confirm that all "expl" are renamed, if yes, press "rename"

[center|frameless|852x852px](/File:Bulk_sofware_ui_2.png "wikilink")

You should get the confirmation that all files were renamed and an "OK"
will appear on front of the files renamed at the tree window.
[right|frameless|721x721px](/File:Another_one_image_aaaa.png "wikilink")
The folder should now look something like this

[right|frameless|687x687px](/File:Fox2_info_3.png "wikilink") Inside the
fpkd folder there is a file called (4mapletters)_stage.fox2, open that
file with Foxtool and edit the xml, on lines 60 and 63 you need to
change "expl" to your map 4 letters
[right|frameless|691x691px](/File:Fox2_info_2.png "wikilink") Same was
to be done on Line 148, replace expl_common_packages.fstb with
(4mapletters)_common_packages.fstb and the expl folder too

After editing the xml, delete the original fox2 and drop the xml on
Foxtool to generate the new one.

Now the last step is editing the fstb file, for this you are going to
need an Hexadecimal editor, HxD can do it fine. Open your hexadecimal
editor and drag the fstb to there, after that you should be looking at
something like this:

[left|frameless|412x412px](/File:HXD_fsbt_open.png "wikilink") Now Open
an empty text file on notepad, while editing hexadecimal files you need
to be cautious, one space or character on wrong place and all thing wont
work. Select all the text after "expl" except the last "." and copy it
to the empty notepad text

[right|frameless|674x674px](/File:HXD_fsbt_copy.png "wikilink") It
should be done like this example here, the "." must remain unchanged.
Now on the notepad file, change the "expl" folder to your map 4 letters
and the "expl_common.fpk" to your map pack common folder name. in my
example the folder will be called aaaa and the pack folder
aaaa_common.fpk

carefully copy the changed text on notepad and paste it on the right
place, 1st delete the text you copied
[left|frameless|668x668px](/File:HXD_fsbt_remove.png "wikilink")

and then paste the text on notepad, right behind the ".", it should look
like this [left|frameless|677x677px](/File:HXD_fsbt_add.png "wikilink")

after making sure the file is ok, save it and close the hxd app, you can
delete the backup file created by the HxD after that.

## 2 - Adding the pack small files

Now comes the most time consuming part, adding the actual pack small
files, open the .zip with winrar again and extract the "pack_small"
folder to the same folder were pack common and the previously copied
fpk/fpkd are. be warned, there is 8,192 Files and 53,312 Folders, its
going to take a while, mainly on HDDs. After that operation finishes you
should have your map folder looking like this:
[center|frameless|585x585px](/File:Pack_small_winrar_done.png "wikilink")

That is good, but its not over yet snake\! You still need to rename all
the folders and .fox2 from "expl" to your map 4 letters, to do that you
have to use bulk rename utility.

Open the pack_small folder and select all 64 folder inside (you can
select the 1st and then shift click the last folder to select all of the
64 folders at once), then press Bulk rename here option was done before,
while on the app, select the Filter "Subfolder" and wait, the app will
take some time to map and read all of the stuff inside. The total of
objects should be 61504.
[right|frameless](/File:Bulk_sofware_objects.png "wikilink")
[right|frameless|194x194px](/File:Bulk_sofware_objects_selected.png "wikilink")
Select all folders by right clicking on the 1st entry, use the scroll
bar to go to the end and shift + right click on the last and they should
all get selected, it will take a while for the app to select them all

After you selected them all, go to the replace area and on the "replace"
textbox with "UNSA" and the "with" textbox with your map 4 letters, in
this example it is "aaaa". The app will freeze while preparing to change
the names. After that check if the new names are fine, if they are press
"rename"
[center|frameless|771x771px](/File:Bulk_sofware_objects_rename.png "wikilink")

Renaming will take some time to be done. After its completed your map
pack_small files should be working fine.