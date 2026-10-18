---
title: V Framework
permalink: /V_Framework/
tags: [Lua, Tools, Infinite Heaven, V Framework]
---

{% include infobox dev="Yazed0071" site="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486" download="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486?tab=files" sourcecode="https://github.com/Yazed0071/V_Framework" %}

V Framework is an [Infinite Heaven](/Infinite_Heaven) module that gives
Lua access to UI, sound, soldiers, bosses and vehicles.

## Documentation

  - **[Lua API](/V_Framework/Lua_API)** - functions, DoMessages,
    SendCommands and constants.
  - **[UI](/V_Framework/UI)** - edit the HUD and menus, and add your
    own UI windows.
  - **[Custom Weapons](/V_Framework/Custom_Weapons)** - build a weapon
    from parts.
  - **[Custom Outfits](/V_Framework/Custom_Outfits)** - build an outfit
    from a body model and package.
  - **[Buddy Outfits](/V_Framework/Buddy_Outfits)** - new costumes, tack,
    gear and rifles for Quiet, D-Horse and D-Dog.

## Requirements

  - MGSV: TPP 1.0.15.4.
  - [Infinite Heaven](/Infinite_Heaven).
  - [IHHook](/IHHook) r25+ (optional, recommended), with
    `enable_dll_loader=true` in `ihhook_config.lua`: V Framework then
    loads at game start. Without it, Infinite Heaven loads it later in
    startup.

## Installation

Put V Framework in `MGS_TPP\plugins\`. Full steps on the
[Nexus page](https://www.nexusmods.com/metalgearsolidvtpp/mods/2486).

## Built-in changes

Always on, no setup:

  - **Female hair** - no longer clips through helmets.
  - **Ocelot and Quiet** - playable in single player.
  - **Ocelot Dual Tornado** - enabled.
  - **[VIP soldiers](/V_Framework/Lua_API#vip-soldiers)** - VIPs (e.g.
    Red Brass, War Economy) get GZ-style deep voices; comrades react to
    them differently.
  - **[Call signs](/V_Framework/Lua_API#radio-call-sign)** - soldiers
    with the RADIO revenge ability use "Patrol".
  - **[Dying enemies](/V_Framework/Lua_API#head-mark-colours)** - marker
    turns `"cmn-col-marker-enemy-dying"`.
  - **Custom sound banks** - no longer go silent when sound memory runs
    out.
  - **[Call em](/V_Framework/Lua_API#call-menu-items)** - from GZ: while
    you hold an enemy, the call menu's knock row makes him call a nearby
    comrade over.
  - **[Lie to them](/V_Framework/Lua_API#radio-the-cp)** - grab or hold
    up an enemy his CP is waiting on: one you cut off mid-report, one
    asked for a SITREP, or one you caught checking the power, a camera,
    a noise or something he half-saw. The sonar row makes him say all is
    clear.
  - **Volume sliders** - Options >
    Sound Settings gets Master, Music, Voice, Sound Effects, Ambience,
    Interface and Cassette Tape volume (1-100; 50 is the original
    volume, 100 is twice as loud). Ignored in FOB missions.

## Infinite Heaven menu

The **V_FrameWork** menu, in the Safe Space and In Mission menus:

| Option | Default | Effect |
|---|---|---|
| Enables Quiet to hold with CQC | Off | Quiet can CQC-hold and choke. |
| Enables Quiet to Interrogate | Off | Quiet can interrogate. |
| Play close iDroid animation while in the ACC. | On | Snake puts the iDroid away when it closes while seated. |

Each mission load applies these, over any earlier Lua call to the same feature.