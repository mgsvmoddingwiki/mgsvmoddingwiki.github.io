---
title: V Framework
permalink: /V_Framework/
tags: [Lua, Tools, Infinite Heaven, V Framework]
---

{% include infobox dev="Yazed0071" site="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486" download="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486?tab=files" sourcecode="https://github.com/Yazed0071/V_Framework" %}

V Framework is an [Infinite Heaven](/Infinite_Heaven) module that gives
Lua access to UI, sound, soldiers, bosses and vehicles.

## Documentation

| Page | Use it to |
|---|---|
| [Lua API](/V_Framework/Lua_API) | Look up functions, DoMessages, SendCommands and constants. |
| [UI](/V_Framework/UI) | Edit the HUD and menus, or add your own UI windows. |
| [Custom Weapons](/V_Framework/Custom_Weapons) | Build a weapon from parts. |
| [Custom Outfits](/V_Framework/Custom_Outfits) | Build an outfit from a body model and package. |
| [Buddy Outfits](/V_Framework/Buddy_Outfits) | Add Quiet costumes and weapons, D-Horse tack, D-Dog gear and D-Walker sidearms. |
| [Route Events](/V_Framework/Route_Events) | Use restored Ground Zeroes soldier events and new route behaviour with RouteSetTool. No Lua required. |

## Requirements

  - MGSV: TPP, the latest version on Steam (EN or JP). On any other
    version V Framework logs an error and loads no features.
  - [Infinite Heaven](/Infinite_Heaven).
  - [IHHook](/IHHook) r25+ (optional, recommended), with
    `enable_dll_loader=true` in `ihhook_config.lua`: V Framework then
    loads at game start. Without it, Infinite Heaven loads it later in
    startup.

## Installation

Put V Framework in `MGS_TPP\plugins\`. Full steps on the [Nexus
page](https://www.nexusmods.com/metalgearsolidvtpp/mods/2486).

To turn off a built-in part, put its name on its own line in
`MGS_TPP\mod\V_FrameWork\disabled_modules.txt`; lines starting with `#`
are ignored. The pages name the parts that can be turned off.

## Built-in changes

  - **Player** - Ocelot, Quiet and [Liquid](/V_Framework/Lua_API#liquid)
    playable; Ocelot Dual Tornado enabled; a [laser
    switch](/V_Framework/Custom_Weapons#laser-switch); hold Reload to
    pat D-Horse.
  - **Soldiers** - [VIP soldiers](/V_Framework/Lua_API#vip-soldiers),
    ["Patrol" call signs](/V_Framework/Lua_API#radio-call-sign), [dying
    markers](/V_Framework/Lua_API#head-mark-colours), [Call
    em](/V_Framework/Lua_API#call-menu-items), [Lie to
    them](/V_Framework/Lua_API#radio-the-cp) and [hold-up
    self-release](/V_Framework/Lua_API#hold-up-self-release).
  - **Searches** - survey teams, backup requests and downed-UAV checks.
  - **Restored lines** - unused voice lines and binocular comments.
  - **Pequod** - moves to another LZ when his is blocked.
  - **Sound** - volume sliders in Options > Sound Settings.
  - **Controllers** - DualSense, DualShock 4, Steam Input and
    XInput-wrapper pads, with matching icons and remapping.
  - **Vehicles** - [custom
    vehicles](/V_Framework/Lua_API#custom-vehicles) with their own
    Sortie Prep, supply drop and Mother Base rows.
  - **iDroid** - Mother Base > Database > V FRAMEWORK lists these.

## Infinite Heaven menu

The **V_FrameWork** menu is in the Safe Space and In Mission menus.
Every option is on by default except Quiet CQC hold and Quiet
interrogation; each has in-game help.

| Sub-menu | Options |
|---|---|
| Player | Quiet CQC hold, Quiet interrogation, ACC iDroid put-away, Restored iDroid lines, Call Em, Lie to Them, Pain and death lines, Buddy lines, Quiet's lines, Pin-up poster reactions, Ocelot binocular comments, Liquid drives vehicles |
| Soldiers | [Hold-up self-release](/V_Framework/Lua_API#hold-up-self-release), Survey teams, Backup requests, Downed UAV checks, Soldier radio answers, Soldier conversations, Long-barrel crouch radio, Dying soldier marker, VIP deep voice |
| Support heli | Danger High LZs, Danger Moderate LZs, Pequod extra lines, Pequod LZ move, Miller's chopper reports |
| Mother Base | Staff salute news, Staff talk |

Each mission load applies these, over any earlier Lua call to the same
feature. In a mission added through Infinite Heaven, every option that
has a [feature switch](/V_Framework/Lua_API#feature-switches) stays on,
whatever is picked.

Infinite Heaven's **Appearance** menu lists custom outfits under Suit
(developed ones only, unless Infinite Heaven skips develop checks),
their variants under Camo and custom heads under Headgear.
