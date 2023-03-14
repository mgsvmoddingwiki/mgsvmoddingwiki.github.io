---
title: Sahelanthropus Mission Files and Usage
permalink: /Sahelanthropus_Mission_Files_and_Usage/
---

# Sahelanthropus Boss Battle Mission Files

In order to make Sahelanthropus Boss Battle work, you need to create a
specific mission for him, he also needs some special files, those are:

  - sxxxxx_block01 . fox2
  - sxxxxx_enemy.lua
  - sxxxxx_npc_sp.fox2
  - sxxxxx_route.fox2
  - sxxxxx_sequence.lua
  - sxxxxx_sequence.fox2

Each one of them have an unique function, you need all of them to make
Sahelanthropus work.

You can grab them at the Sahelanthropus [GitHub
repo](https://github.com/TheHuntingParty/TPP-sahelanthropus).

## sxxxxx_block01.fox2

_block01.fox his the most important file, his function is define Hiding
Points for the player, Sniping Points for Sahelanthropus Rex Mode
(TppSnipePoint2Data), he also controls the ScriptBlockData,
TppSimpleMissionData, NavxNavBlock (Nav2 file for Sahelanthropus),
TppPlayer2AdditionalMtarData, NavxNavFilterVolume, BoxShape,
GeoModuleCondition and TppTrapCheckIsPlayerCallbackDataElement.

## sxxxxx_enemy.lua

This files is responsible for the Sahelanthropus Parts Health Points,
Base Route, Route Table, Debug functions and defining what type of
Sahelanthropus the mission uses (normal or extreme).

Also contains the function to set up the support Helicopter, defines his
spawn point, and also disables him (Support Heli is very important for
the battle sequence) .

## sxxxxx_npc_sp.fox2

This file contains the GameObjectLocator and
TppSahelan2LocatorParameter.

It controls the spawn point for Sahelanthropus.

## sxxxxx_route.fox2

This files contains an TppSearchMissilePointData, (i still not know what
he does, but seems important to have)

## sxxxxx_sequence.lua

This File is very very important, it defines the mission objectives,
radio calls, BGMs (background sound/music), sequences, demo
sequences(Cutscenes) and UI (for example, the Sahelanthropus health
bar).

It also starts the Sahelanthropus Boss Battle, controls his stages and
ends the mission, safe to say, its the core of the mission.

## sxxxxx_sequence.fox2

Controls checkpoints used in the mission