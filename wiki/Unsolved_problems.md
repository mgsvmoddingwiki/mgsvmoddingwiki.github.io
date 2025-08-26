---
title: Unsolved problems
permalink: /Unsolved_problems/
tags: [Reference]
---

While a lot of progress has been made in modding MGSV since its release,
there are still some major unsolved problems and mysteries. This page
should serve as an index of major outstanding problems, what's known
about them, and why they're important.

Will try to serve this page as a check list, and update the information
as necessary.

## Missions

### iDroid mission limit

While custom missions are possible, there is a limit to how many
missions can be displayed in the iDroid. it is currently unknown if this
limit exists in the exe or in a UI file.

## Levels

![](/assets/MGO3%20Amberstation%20.png){:.thumb width="310.986px"} As
theorized, custom levels are possible and have been implemented thanks
to CapLagRobin's research and experimentation, it is now possible to
load [GNTN(Camp
Omega)](https://www.nexusmods.com/metalgearsolidvtpp/mods/978) empty
maps, and maps from MGO3.

Work is needed to improve the accessibility of custom level editing and
loading.

### Navmeshes

While custom routes would allow you to place soldiers in a custom level,
navmeshes are required to facilitate AI navigation of the map. <s>This
file format (.nav2, .nta) is completely unexplored.</s>

This file format has been reversed and more information can be found on
the .nav2 wiki page. Thanks to OldBanana and Ventos for their hard work
and implementation\!

Still, there is much work that needs to be done to make it more
accessible.

## Models

### Levels of Detail

It is unknown exactly how the level of detail faces are triggered in
models, making it difficult to implement and nearly impossible to test
LOD faces for custom models.

## Animations

### Game Animations

The .gani format has almost no public documentation, meaning custom
animations cannot be created. The other chunks of data contained by
.mtar files are also undocumented (.trk, .exchnk, .enchnk), making
editing them infeasible as well.

### Motion Graph

The motion graph format, which controls animation states, is completely
undocumented. This limits animation editing to swapping files.
