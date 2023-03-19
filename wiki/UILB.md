---
title: UILB
permalink: /UILB/
tags: [File Formats, UI]
---

UILB (UI Library?) files are used in MGS:V for UI element layouts such
as the interactive menus in the mission prep and weapon customization
menus, but only in the visual style of things, meaning that this file
type is not associated with what the menus actually do, only how they
look. Current information about the way it functions is very little.
Files of this type are usually contained within a **LayoutAsset** folder
inside fpks. One example of this is the **heli_ui.fpk** file (found in
Assets/tpp/pack/mission2/heli), which contains a lot of the UI files
related to item selections and mission prep among other things.
Currently the only way to modify these files is through a hex editor
like HxD. The format is Little-Endian, meaning bytes are written in
reverse order of significance.

## The structure

The structure is mostly unknown. Something interesting is that all of
the UILB files contain 2 special bytes in a lot of areas: **0x803F**.
These appear to be very important, because replacing at least 1 of these
in a file with anything else will cause the UI associated with that file
to appear invisible in-game (most likely because it breaks it), but what
they actually do is unknown. But through experimenting it appears that
shifting those 2 bytes left or right can either break the UI associated
with the file, or disable some effects. In the case of the
**UI_missionprep2_main_list.uilb**, shifting the the second **80 3F**
byte in line 7 will disable the effect of the selected menu line moving.
Every UILB file is of a different length, depending on the complexity of
it. However, patterns can still be found, such as the ones listed below:

| Address     | Info                                               |
| ----------- | -------------------------------------------------- |
| 0x00 - 0x09 | File type signature                                |
| 0x0B - 0x0F | Unknown, but appears to be the same for every file |
| 0x13 - 0x17 | Same as above                                      |
| 0x1B - 0x23 | Same as above                                      |
| 0x2D - 0x45 | Same as above                                      |
| 0x4A - 0x8B | Same as above                                      |

![An image showing the structure of a small UILB file. Please note that the last part of the file doesn't always have the hashes in the exact same places as its shown here! The positions can differ.](/assets/Uilb%20notes-0.png){:.center .thumb width="550px"} Furthermore, nearly every
UILB file contains 6 hashes near the end of it, three StrCode32 and
three PathFileNameCode32. The StrCode32 ones contain names of .UIF, .UIA
and even other .UILB file names that are included in the same fpk. The
other three PathFileNameCode32 hashes contain the specific directory
paths of those files (and with the actual name of the file in them).
However, those paths only mention .UIA files, so it's very much a
possibility that UILB files only load .UIAs and not anything else, but
this has to be confirmed.

Also, it should be noted that sometimes the file name of a file in an
StrCode32 hash may not correspond to the same name in its
PathFileNameCode32
hash.![](/assets/Corrupted%20uilb.png){:center .thumb width="320px"}

## Notes

  - The bytes **0xFF** and **0x00** act exactly the same (they don't do
    anything). The reason they're both used in a file simultaneously is
    unknown.
  - The second screenshot shows a UILB file that's broken (the
    highlighted part is the one that was edited), which causes the
    options in the menu to be stitched together. However, changing any
    part of the data of a UILB file with something incorrect (we don't
    know the difference between correct-incorrect right now) also yields
    the same result (or it becomes completely invisible).
