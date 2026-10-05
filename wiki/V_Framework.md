---
title: V Framework
permalink: /V_Framework/
tags: [Lua, Tools, Infinite Heaven, V Framework]
---

{% include infobox dev="Yazed0071" site="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486" download="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486?tab=files" sourcecode="https://github.com/Yazed0071/V_Framework" %}

V Framework is an [Infinite Heaven](/Infinite_Heaven) module that gives
Lua access to UI, sound, soldiers, bosses and vehicles.

## Documentation

  - **[Lua API](/V_Framework_Lua_API)** - functions, DoMessages,
    SendCommands and constants.
  - **[Custom Weapons](/V_Framework_Custom_Weapons)** - build a weapon
    from parts.
  - **[Custom Outfits](/V_Framework_Custom_Outfits)** - build an outfit
    from a body model and package.

## Requirements

  - MGSV: TPP 1.0.15.3 or 1.0.15.4, EN or JP.
  - [Infinite Heaven](/Infinite_Heaven).
  - [IHHook](/IHHook) r25+, with `enable_dll_loader=true` in
    `ihhook_config.lua`.

## Installation

Put V Framework in `MGS_TPP\plugins\`. Full steps on the
[Nexus page](https://www.nexusmods.com/metalgearsolidvtpp/mods/2486).

## Built-in changes

Always on, no setup:

  - **Female hair** - no longer clips through helmets.
  - **Ocelot and Quiet** - playable in single player.
  - **Ocelot Dual Tornado** - enabled.
  - **[VIP soldiers](/V_Framework_Lua_API#vip-soldiers)** - VIPs (e.g.
    Red Brass, War Economy) get GZ-style deep voices; comrades react to
    them differently.
  - **[Call signs](/V_Framework_Lua_API#radio-call-sign)** - soldiers
    with the RADIO revenge ability use "Patrol".
  - **[Dying enemies](/V_Framework_Lua_API#head-mark-colours)** - marker
    turns `"cmn-col-marker-enemy-dying"`.
  - **Custom sound banks** - no longer go silent when sound memory runs
    out.
  - **[Call em](/V_Framework_Lua_API#call-menu-items)** - from GZ: while
    you hold an enemy, the call menu's knock row makes him call a nearby
    comrade over.
  - **[Lie to them](/V_Framework_Lua_API#radio-the-cp)** - grab or hold
    up an enemy while he radios in. When his CP calls him back, the
    sonar row makes him say all is clear and the CP stands down.
