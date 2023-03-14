---
title: Revenge System
permalink: /Revenge_System/
---

A rough rundown of the Revenge system, otherwise known as the Enemy
preparedness system. Currently just pasted from a number of forum posts.

## Initial writeup

There's a bunch of missions where it's not enabled at all, or rather
forced to a certain config for that mission And a few where just stealth
vs combat revenge configs aren't.

The max revenge level increases as you complete certain story missions.
Hard missions are max revenge/ignore blocked.

On top of this levels are limited per type, the rest are anywhere from 1
to 7, with an average of 3.

Each level has a current value, and the level raises per 100 points.

Revenge values except stealth and combat type are reduced on successful
mission completion. Not free roam missions. If you use chicken hat all
values are reduced on every mission exit, even fail.

The maximum reduction is 50, ie half a level, or 100, a whole level for
chicken hat.

The rest have to be specifically blocked by sending off dispatch teams.
Successful dispatches will block that type for 3 missions, whether
successful or aborted.

The total revenge level also ties into the staff morale somehow. My
rough read on it is the higher the revenge levels against you the better
staff morale (ie i cant make sense of it being the reverse), as to how
much of an impact it has there's too much to it for me to decipher for
now.

The reason stealth and combat values are handled differently is they run
a 'tendency' system for the revenge config.

There's a bunch of 'triggers'/actions to cause a direct revenge value
increase for a type, headshots, eliminated by stealth, or combat
(basically alert level), 'annihilated' for the same. killed by heli or
vehicle, waking up comrades, being smoked, seeing smoke. They increase
the value for a type by 5-15

All this drives the 'revenge config' for the soldiers when a cp is
spawned, it adds a bit of randomization and a chance of types by
percentage (which increases by revenge level for the type) for stuff
like armor, helmet. And what seems to be straight up numbers for
different types of weapons. how much reinforcements are available and
how heavy they are.

There's maybe a bug in the fulton config, there's fulton0 = fulton low,
fulton1 = nothing, fulton2 = fulton high, fulton3 = fulton special. I
assume it's supposed to be fulton 0 nothing, 1 low, because the function
that reads the config doesn't seems to only get one config/couldn't pull
the value of other if blank.

Incidentally I also don't actually know what soldiers with those types
actually do in the game. I've seen them shoot down stuff but that's
about it.

## Comments 2

The values you directly drive for combat and stealth via
eliminations/kills only select the 'tendency' in a table, these are
reset each mission.

The tendency table drives a shift between the secondary combat/stealth
values (ie 'stealth' tendency (at max) gives stealth +50, combat -50)

The values shift between stealth and combat, you can increase by up to
half a level per mission, but at high levels the opposite type will be
decreased by the same amount. if you don't eliminate or kill anyone (or
kill and eliminate equally) they you'll pull the 'DRAW' tendency Which
at low level will add to the value and high level reduce to both types
(still depending on the levels of the types.)

This means if you ghost levels will rise/lower, to an equilibrium of
level 4 for both, I'm not sure how the tie break is decided. But at a
max shift of 25 a mission, 100 points to a level and up to 3 levels this
will take a while.

Anyway, after all that talk the actual configs resulting from stealth
are things like cameras, decoys, mines and the ability to knife counter
to holdups, combat is 'soft armor' which I'm guessing is body armor,
shotguns, shields, reinforcements.

## Comments 3

Each 'mission' sets up the enemies with the loadouts guided by the
revenge config. So loadouts wont be seen to change till next mission
(including Dispatch mission results).

'Free mode' is it's own mission, I don't think side missions are (though
there may be some special ones that break into a 'full mission'?).
Starting main mission from free mode is loading new mission, and I
assume going back free mode from mission. I really need to check this
stuff directly again to get the exact setup.

Free missions don't modify the combat/stealth tenancy/levels

## Comments 4

The whole tendency system is balanced to try and reach an equilibrium
for the overarching stealth vs combat categories (not to be confused
with the individual stealth or combat revenge level) provided the player
doesn't provide any 'input' to those categories. So unless you have a
very specific goal this too should be left default.

Changes to REVENGE_POINT_TABLE will change the rate at which you shift
through the revenge levels.

The revengeDefine categories aren't cumulative, they're whole
configuration selected by <CATEGORY>_<CATEGORYLEVEL>

Also the revenge config selection does not combine stealth and combat
categories in one mission, it's one or the other, either overridden by
the mission setting, or selected by your overarching combat vs stealth
revenge level.

If you are doing total ghost, ie not interacting with enemies at all,
then you're not actually increasing the system anyway and it will
actually slowly decrease (the rate of that is actually something that
might want to be analyzed). [Category:Lua](/Category:Lua "wikilink")
[Category:Missions](/Category:Missions "wikilink")
[Category:Guides](/Category:Guides "wikilink")