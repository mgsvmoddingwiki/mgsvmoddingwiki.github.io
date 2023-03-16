---
title: Textures
permalink: /Textures/
tags: [Rendering]
---

## The basics: PBR

FOX Engine uses a [Physically Based Rendering](https://en.wikipedia.org/wiki/Physically_based_rendering) shading model. Simply put, PBR is a
modern rendering method that is more accurate and more predictable than
previous shading models, leading to better looking materials and
lighting

FOX Engine has its own implementation of PBR and therefore requires a
specific workflow when making or editing textures. It is important to
understand and properly apply this workflow - your textures won't look
like they should if you don't. This guide's purpose is to help you
understand how textures are handled by FOX Engine, and how to
edit/create ones yourself. While it is aimed at beginners, this guide
will not cover the rudimentary basics of materials and textures
creation.

## Texture type & purpose:

#### Color maps, also called Albedo or Diffuse. They are labeled with the _bsm suffix.

Here's an example, the *_bsm* map of the D114
handgun:[thumb|300px|none](/File:Hg00_main0_def_c00_bsm.jpg "wikilink")

They're very similar to diffuse maps from previous shading models, with
one exception: you should have the least amount of pre-baked
lighting/shadowing informations possible, like pre-baked Ambient
Occlusion, as this is handled through a bespoke map.
