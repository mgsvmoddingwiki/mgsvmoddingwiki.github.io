---
title: Chimera Package Table
permalink: /Chimera_Package_Table/
tags: [Lua, Chimera, Weapons]
---

This can be found at:
\[`Tpp/Scripts/Equip/ChimeraPartsPackageTable.lua]`

Known by it's .lua name as **ChimeraPartsPackageTable.lua**, this
Chimera file contains info on Chimera weapon models, the ID of every
True Chimera part, and info on all camos and colors for weapon
customization.

To make things a bit easier, use my version of the file, which tags out
all packages:

[ChimeraPartsPackageTable.lua](https://www.mediafire.com/file/gdpgi8qhrlaaf08/ChimeraPartsPackageTable.lua/file)

## **What happens if I mess up at any point during the following sections?**

The game will CTD.

Or, a model might not display correctly. But in most cases? Yeah CTD.

## **Sections of the Chimera Package Table**

The table is divided under 11 sections, and they are as follow:

#### **<big>[Chimera Packages `[packageInfos]`](/Chimera_Package_Table#Chimera_Packages "wikilink")</big>**

This contains a list from **1** to **335** of all packages Chimera uses.

Packages are essentially addresses that points to what models will be
tied to their numbered entry.

### **Frames / Receivers `[receiver]`**

A list of all Frames used by True Chimeras.

### **Barrels / Handguards `[barrel]`**

A list of all Barrels used by True Chimeras.

### **Magazines `[magazine]`**

A list of all Magazines used by True Chimeras.

### **Stocks / Buttstocks `[stock]`**

A list of all Stocks used by True Chimeras.

### **Muzzles \[muzzle\]**

A list of all Muzzles used by True Chimeras.

### **Muzzle Accessories `[muzzleOption]`**

A list of all Muzzle accessories used by True Chimeras.

### **Optics Attachments `[sight]`**

A list of all Optics Attachments used by True Chimeras.

### **Side Attachments `[option]`**

A list of all Side Attachments used by True Chimeras.

### **Underbarrel Attachments `[underBarrel]`**

A list of all Underbarrel Attachments used by True Chimeras.

### **Weapon Camo `[color]`**

This contains a list from of all camouflages and colors weapons can use
under the customization menu.

## **Chimera Packages**

As noted previously, this list from **1** to **335** lists every model
used by True Chimera parts.

There are two package types, A and B.

### **Package Type A**

A is usually the most common you'll encounter.

For explaining what compromises the packages, I'll use package 206 -
D114 EX-Frame, an A Type Package:

[frameless|500x500px](/File:Package_Example_A.png "wikilink")

As you have noticed, it's separated into 4 sections, with 2 lines for
each.

The first line of a section shows the address within a .fpkd, while the
second line shows the address of the .fpk file.

1.  Model Section - This is the address of the model used by the
    package;
2.  Camouflage Section - This is the address of the Camouflage support
    for said model;
3.  Color Section - This is the address of the Solid Color support for
    said model;
4.  Texture Section - This is the address of the Default Texture for
    said model.

Pretty much majority of the parts follow the package structure of
version A.

**Note:** Some parts lacks sections 2, 3 and / or 4. Usually they are
parts that have no camo support setup. Rocket launchers would fit into
this category for example.

This does not mean they can't have camos. If one was to change and add
camo support for them, you could by mimicking another package.

### **Package Type B**

And how does a version B of a package looks like?

For this example I'll be using package 71 - .45 MAG x7 (D114):

[frameless|500x500px](/File:Package_Example_B.png "wikilink")

As you have noticed, it only has a singular section.

Same rules as before, first line of a section shows the address within a
.fpkd, while the second line shows the address of the .fpk file.

But this time, it addresses to a .fmdl inside the .fpkd file. These
usually are set for things such as ammo.

### **Adding a New Package**

In order to add a new package, head down the bottom of the list, where
package 335 resides.

[frameless|500x500px](/File:Adding_New_Package_1.png "wikilink")

See the very end of it? Compare it to other packages. There's something
missing from it, right?

That's right, it's missing a comma. Add one, so the line at the end
should look like this:

[frameless|500x500px](/File:Adding_New_Package_2.png "wikilink")

Again, you need to add **a comma**, if you have trouble finding it, copy
it here: <big>`,`</big>

After that hit your **Enter key**. You're now under a new line.

In order to create a new package, simply mimic a previous package. So
simply copy and paste any package you desire.

You can set the address under it to anything the game has, albeit with
limitations. But it's best use is setting up a custom package.

Keep in mind, **you need to create a complete package**, so all files
used by a normal package must be there on your custom entry.

For this example, I just copied package 335 I used before, and placed it
there. And afterwards changed the note to say it's package 336.

[frameless|500x500px](/File:Adding_New_Package_3.png "wikilink")

The note isn't for the game, **it's for you.** This makes it easier to
look for a package by simply using the `[CTRL + F]` command.

If you did everything correctly, you'll be able to setup your own custom
chimera package models without replacing existing files\!