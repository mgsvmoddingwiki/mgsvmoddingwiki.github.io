---
title: 'Retexturing the Bionic Arm'
permalink: /Retexturing_the_Bionic_Arm/
tags: [Rendering]
---

![](/assets/Retexturing_the_Bionic_Arm/Intro_graphic.jpg)

This section contains a series of guides on how to retexture Snake's Bionic Arm. Each guide covers a different way of achieving the same thing, as a way of showcasing the various approaches that can be used and how they differ, along with listing their pros and cons.

Click on a guide link below or in the side bar (hamburger menu if on mobile) to get started.

{% include index-autolist type="section" %}

---

## Useful things to know about retexturing

### How PFTXS archives are used to optimize texture loading

When loading a model the game engine will first try to find its textures within related [PFTXS](/PFTXS) texture archive file(s), then search outside such PFTXS to look for 'loose' (standalone) texture files.

In the vanilla game files the only texture files stored within PFTXS files are the `.ftex` (metadata) and `.1.ftexs` (the smallest size image, such as the smallest [mipmap](https://en.wikipedia.org/wiki/Mipmap)). While larger image size [FTEXS](/FTEXS) files such as `.2.ftexs` and `.3.ftexs` will be left outside the PFTXS as loose textures.

> For a typical large texture in the game there will be one `.ftex` and three `.ftexs` files (containing the mipmaps for different levels of detail: far away vs up-close).

This is so that when a model initially loads only the very smallest version of its texture gets loaded (since the PFTXS gets loaded first), to optimize speed of texture rendering and avoid flickering.

Not only can there be a PFTXS for a related model but there can also be multiple situational PFTXS depending on the game scene/area.

> In the past it was commonly recommended in guides to place all the FTEXS files inside the PFTXS if you want to mod a texture, however the current recommendation is to only include the `.ftex` + `.1.ftexs`, like the vanilla game does, leaving the higher resolution FTEXS files loose.
{:.important}

### On loose textures

Frequently used models like Snake's bionic arm or the supply box have all their texture files loose, in addition to also having copies of the `.ftex` and `.1.ftexs` files inside related PFTXS archives.

This allows the game to prioritize those textures at all times. However for many other objects in the game their `.ftex` and `.1.ftexs` aren't loose but exclusively packed inside PFTXS archives, leaving just the `.2.ftex`/etc loose (the higher resolution mipmaps).

For the two FMDL model editing guides in this section they both change the original texture path referenced inside the model file to instead be a custom texture path, making the game only check for the custom path and avoiding any conflicts with copies of the original texture files that may appear in various PFTXS archives.

> This custom texture path approach also mitigates mod conflicts since only the direct files modded have to be included in the final packaged mod, avoiding repacking any other untouched vanilla texture files (that normally occurs when vanilla game PFTXS archives are modded).

A downside of modding exclusively loose textures though (that is, without also modding associated PFTXS) is culmulatively, with enough mods installed that do this, delays in rendering textures can become more apparent. Alternatively if the largest mipmap FTEXS are stored inside PFTXS then it can also cause unexpected behavior (PFTXS for example has a 90MB filesize limit which can crash the game when exceeded).

So tradeoffs have to be made. One could mod every single vanilla PFTXS archive that may reference those texture files in order to include the modded `.ftex` and `.1.ftex` to optimize loading (leaving the other unmodded vanilla texture files still intact within the PFTXS), however if another installed mod has changed any texture files within the same PFTXS files it creates a mod conflict.

While for using a custom texture path to avoiding modding PFTXS files it reduces conflicts but technically can increase texture load times (though for simple mods for common items the impact is practically irrelevant tbh).

**Example of egregious texture loading delays:**

{% include video url="/assets/Retexturing_the_Bionic_Arm/Loading delay due to lack of packed textures in PFTXS.webm" caption="Example (sped-up) of texture delays after large model loads in; here using multiple models in the area that are only using loose textures and not packing a minimal set inside PFTXS. Credit: Retali8" %}

### On non-replacer mods

That brings us to [Zeta](/Zeta), an [Infinite Heaven](/Infinite_Heaven) addon which decided to tackle these downsides by allowing non-replacement mods. That is, allowing for mods that don't overwrite vanilla game files but instead allow creation of *new* items in the game.

What this means is that for example a new weapon can be created, with its own custom FPK (*Fox Package*) for the model and associated PFTXS texture archive that are independent of any vanilla FPK or PFTXS files. The best of both worlds: custom paths with optimized texture loading and no conflicts.

Until Zeta was released all modding for MGSV was effectively overwriting the original game assets with modified ones, using [SnakeBite](/SnakeBite_Mod_Manager) Mod Manager to handle which mod is active (or in the distant past manually updating the game's data files).

Alternatively though Zeta also allows on-the-fly switching of models that do target vanilla game files, avoiding conflicts if multiple authors have modded the same thing. Though such mods similarly have to be made specifically for Zeta for this to work.

The downside is some increased complexity and scripting experience when creating Zeta mods. Historically there has also been a lack of guides demonstrating how to create Zeta mods, so more traditional modding approaches continue to be the most commonly used.