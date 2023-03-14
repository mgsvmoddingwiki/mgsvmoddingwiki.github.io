---
title: UILB
permalink: /UILB/
---

Uilb files are used in MGS:V for UI element layouts such as the
interactive menus in the mission prep and weapon customization menus.
Current information about the way it functions is very little, same goes
for the rest of the UI file types. The uilb files are usually contained
within a **LayoutAsset** folder inside fpks. One example of this is the
**heli_ui.fpk** file (found in Assets/tpp/pack/mission2/heli), which
contains a lot of the UI files related to item selections and mission
prep among other things. Currently the only way to modify these files is
through a hex editor like HxD.

## The structure

The structure is mostly unknown, although it appears that the first 2/3
of the a uilb file is related to how the UI is rendered, and the last
1/3 is how it is presented (see screenshot below). Something interesting
is that all of the uilb files contain 2 special bytes in a lot of areas:
**80 3F** (or **€?** in a decoded text form). These appear to be very
important, because replacing at least 1 of these in a file with anything
else will cause the UI associated with that file to appear invisible
in-game (most likely because it breaks it). What they do is unknown.
[left|thumb|360x360px](/File:Uilb_notes.png "wikilink")

## Notes

  - The bytes **FF** and **00** act exactly the same (they don't do
    anything). The reason they're both used in a file simultaneously is
    unknown.