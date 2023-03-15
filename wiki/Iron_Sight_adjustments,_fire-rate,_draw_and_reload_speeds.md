---
title: Iron Sight adjustments, fire-rate, draw and reload speeds
permalink: /Iron_Sight_adjustments,_fire-rate,_draw_and_reload_speeds/
tags: [Lua, Weapons, Chimera]
---

Iron sight adjustments can be made to guns, this is needed specially for
custom model guns.

These values are in EquipParameters.lua which can be found on:

TPP

> \\0\\00_dat\\Assets\\tpp\\level_asset\\weapon\\ParameterTables\\parts
> - *With Snakebite*

> \\data1_dat\\Assets\\tpp\\level_asset\\weapon\\ParameterTables\\parts
> - *Without Snakebite*

MGO

> chunk0_dat\\Assets\\mgo\\level_asset\\weapon\\ParameterTables\\parts

After we locate the file we have to search for
*<u>receiverParamSetsBase=</u>*

Each section {} belongs to a weapon, the order follows the same in-game
order.

Here is what we know so far what each value does:
[centre|thumb|662x662px](/File:Values-1.png "wikilink")

The names are self explanatory.

Here we will focus on iron sight alignment,

as you can see there are 2 iron sights, here is an image showing this:
[thumb|621x621px|centre](/File:Iron-Sights.png "wikilink")

The sights used to look like this before getting fixed:

[thumb|682x682px|centreYou](/File:Adamaska.png "wikilink") gotta find an
alignment between the two sights

First Iron sight; 1 being the center, the higher the value, the farther
the view will be, example value 111
[centre|thumb|680x680px](/File:Right_-_Down.jpg "wikilink") The less the
value the closer it will be (zoomed in) example -111
[centre|thumb|678x678px](/File:-111.jpg "wikilink") You can see it
completely skips the second sight.

If 1 is the ''center ''you will usually will want to work with decimals
when aligning.

Second iron Sight; The second sight usually deals with depth, just like
the first one 1 being the "center" although this time the higher the
closer, example of 111
[centre|thumb|680x680px](/File:Zoom1.jpg "wikilink") Example of -111
[thumb|678x678px](/File:-111_middle.jpg "wikilink") Just as a reference
this is how it looks with the vanilla values:
[centre|thumb|500x500px](/File:Vanilla_\(i_like_vanilla_Ice-cream\).jpg "wikilink")

The rest of the values are self evident, Fire-rate takes care of the
fire-rate of the weapon the higher the faster, draw speed is how fast
the player pulls the weapon and aims, this sometimes gets affected by
other factors like snake's arm or certain abilities either on tpp or
mgo, for that it is better to play with decimals the closer to 1 the
faster, the farther the slower, reload speed works the same way.
Aim-assist distance is calculated in meters.