---
title: Chimera Weapon System
permalink: /Chimera_Weapon_System/
tags: [Chimera, Weapons, Lua]
---

What is the **Chimera Weapon System**, or rather, what is **Chimera**?

**Chimera** is the internal name for pretty much everything weapon
related in MGSV, mainly associated with firearms.

The name of it is thanks to how through weapon customization, you're
able to mix and match different weapon parts around, essentially
creating a
[chimera](https://en.wikipedia.org/wiki/Chimera_\(mythology\)) weapon.
And while the system has it's limitations set by the game, you can
pretty much tinker with each of it's .lua based files to open up more
possibilities, customization options, altering stats and the like.

## **Chimera Categories**

There are two kinds of chimera weapons:

### **True Chimeras**

These are weapons that in the base game, the player is allowed to both
use and customize at will.

They're composed of separate models that are put together by the game,
and *only* the player is allowed to use them.

### **CS Weapons**

These weapons, unlike the previous type, can be used by either the
player or NPC soldiers. Be it those soldiers being Mother Base Staff,
XOF, Soviets, or the various PFs in Africa. The name of the category
comes from certain weapons that have the word "CS" added at the end.

While they still need to use the standard chimera system in the files,
they're composed of one single model. The vast majority of them the
player is only able to find and use them in the field, by stealing it
from NPCs. Some of them however can be used by being equipped in sortie
prep, and have customization options locked up. Weapons such as the
Adam-ska Special and the Tornado-6 Revolver are under this category.

### **How to Identify the Two Types**

For this example, I'll be using two versions of the Rasp shotgun.

This is the RASP TB-SG SB, which is a True Chimera:

[frameless|515x515px](/File:RASP_-_True_Chimera.png "wikilink")

And this is the RASP SB-SG GOLD, which is a CS Weapon:

[frameless|515x515px](/File:RASP_-_CS_Weapon.png "wikilink")

Notice any differences? Look closely:

[frameless|320x320px](/File:True_Chimera_-_Identification.png "wikilink")[frameless|320x320px](/File:CS_Weapon_-_Identification.png "wikilink")

True Chimeras always have the Switch Display function added to it's
description in the customization menu, which allows you to swap pages
and view what parts the weapon is using.

CS Weapons completely lack this picture. Futhermore, **CS Weapons cannot
be customized**, even if you were to unlock the menu to do so, the game
will CTD as soon as you open the menu for the weapon.

## **Getting Started**

There will be three things you'll be needing for the .lua adventure of
understanding, and then tinkering with Chimera.

This assumes you have basic knowledge on modding the game, such as
having SnakeBite installed, and know how to unpack files.

### **Notepad++**

Notepad++ will be the main tool you'll be using for editing, looking,
and checking everything related to all .lua files.

If you haven't downloaded it, here's a link to [it's official
website](https://notepad-plus-plus.org/). After installing it, .lua
files will be associated with it.

#### **<big>Altering the appearance of Notepad++</big>**

One word of advice is setting a custom theme to use the editor with, as
the default editor can be difficult to go through.

For example, the default look of Notepad++ is this:

[frameless|725x725px](/File:Default_Notepad++_Theme.png "wikilink")
While personally, my custom theme makes it look like:

[frameless|725x725px](/File:Muffins_Notepad++.png "wikilink")

Font is altered, there are different highlights, numbers are made larger
to stand out, color is easier on the eyes.

In order to change it, go over to the Item Bar on top and proceed to
Settings:

[frameless|250x250px](/File:Style_Configurator.png "wikilink")

And pick Style Configurator. You'll open a window that allows you to
swap themes for Notepad++. Pick a theme you like, and go at it\!

If nothing satisfies you, it allows you to change colors to your
personal liking.

**Please note, for all following .lua files, I'll be using my own
personal theme for Notepad++.**

### **MGSV Deminified Lua**

While you can use the .lua files the game provides, **for the love of
god don't**. It's difficult to read and edit through them, and chances
of making things worse are higher.

This is where Deminified Lua comes in, majority of the .lua files of the
game were made easier to read, and you can get them
[here](https://github.com/TinManTex/mgsv-deminified-lua).

Simply when you have unpacked the desired .lua to edit, just copy and
paste the deminified version by replacing all of it.

### **MGS Monster Guns**

The Holy Grail of Chimera Modding, without it, I wouldn't be able to
setup this guide.

You can access it [here](https://github.com/unknown321/mgsmonsterguns).
While I'll go over pretty much all of the info displayed in that small
guide, it's good to check it, especially because you'll need something
from it, that you'll have to go back often to.

#### **<big>Weapons Table</big>**

The link of the Weapons Table is available in Monster Guns, but here's a
[link to it](http://unknown321.github.io/mgsmonsterguns/).

Basically, it lists the vast majority (but not all) of weapons and parts
featured in the game, showing their IDs for .lua and their names in the
in-game UI.

You'll often have to go to it in order to look up a specific part,
weapon, or even the development tree.

### **Backup your Save Data**

This is often not necessary, but it's a good precaution to do so.
Messing with Chimera can be finicky.

It can lead to TPP getting a **crash to desktop**, also known as
**CTD**.

Or it can lead to an **infinite loading** situation, also known as
**hanging**, as in "the game hangs in place."

So look up online on how to do so, and you'll be ready to go\!

## **The .lua Files**

The following are the .lua files that contain and / or are related to
Chimera.

### [**Chimera Package Table**](/Chimera_Package_Table "wikilink")