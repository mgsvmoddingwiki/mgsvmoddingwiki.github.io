---
title: How to save your .DDS image
permalink: /How_to_save_your_.DDS_image/
---

So, let's assume you're adding some custom textures to the game and you
want to save your new .dds image in order to implement it. Using your
.dds editor of choice you will be met with a few options, such as
mipmaps, DXT type, etc. So I'm gonna explain what these options mean
because you want to choose different ones depending on the type of image
you're making.

There is one universal rule here which is to \*always\* generate
mipmaps. They are important for the game to load textures correctly. As
for the DXT type, there are two main types you're gonna use: DXT1 and
DXT5. The one you'll use depends, again, on what type of texture you're
saving.

BSM/regular textures are DXT1

NRM/Normal maps are DXT5

SRM is DXT1

LYM is DXT1

DTX is DXT1

Why? DXT1 does not save alpha/transparency maps, and utilizing them when
you're not trying to can cause texture issues/errors. Only Normal Maps
regularly utilize alpha maps and are the only texture that should be
saved using DXT5 - the type that saves the normal map.