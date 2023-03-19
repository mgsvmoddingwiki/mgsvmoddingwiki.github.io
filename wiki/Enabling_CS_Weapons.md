---
title: Enabling CS Weapons
permalink: /Enabling_CS_Weapons/
tags: [Weapons, Lua, Guides]
---

In this article I'll explain how to enable CS guns, which are guns the
game has and uses but are not available to the player. One of these
guns, for example, is the XOF Hospital SMG.

Enabling these guns is rather simple. One must simply find the correct
line of code in EquipDevelopFlowSetting.lua and change "p69=2" to
"p69=0"

Now, finding the right line of code that pertains to the correct weapon
is the tricky part. Each line of code in EquipDevelopFlowSetting.lua is
a developable item in the iDroid and finding the right one is needed in
order to enable the weapon. Fortunately I have labeled many of the lines
with their weapon ID's in [this deminified version of
EquipDevelopFlowSetting.lua](https://github.com/Your401kPlan/Misc-Lua/blob/main/EquipDevelopFlowSetting%20Labeled.lua).

So now you have most of the CS guns in the game labeled , it's a matter
of finding the right the corresponding weapon ID.
![All](/assets/XOF%20Hospital%20SMG%20Info.png){:.thumb} weapon ID's in
the game can be found at <https://unknown321.github.io/mgsmonsterguns/#>

Lets take the XOF hospital SMG for example. Here is it's info:

From here we can see that the weapon ID is "WP_East_sm_030" so we can
simply use ctrl+f to search this on the labeled lua file from github. In
this case it's on line p50=310, so we simply scroll to the right to
p69=2 and change it to p69=0. Save the file as
EquipDevelopFlowSetting.lua and use fileproliferator and makebite to
save it as a .mgsv.
