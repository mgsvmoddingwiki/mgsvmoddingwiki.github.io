---
title: V Framework
permalink: /V_Framework/
tags: [Lua, Tools, Infinite Heaven]
---

{% include infobox dev="Yazed0071" site="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486" download="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486?tab=files" sourcecode="https://github.com/Yazed0071/V_Framework" %}

V Framework is a modding framework that "breaks the wall" between Lua and
the game's executable. It loads as an [Infinite
Heaven](/Infinite_Heaven) module and exposes native Fox Engine
features - UI, sound, soldiers, bosses and vehicles - to Lua scripts that
the game never opened up to modding.

It ships with a handful of automatic fixes and a library of ready-made
Lua APIs you can call from your own missions and mods, without touching a
single memory address.

## Requirements

  - Metal Gear Solid V: The Phantom Pain (1.0.15.4 or 1.0.15.3, EN or JP)
  - [Infinite Heaven](/Infinite_Heaven) (V Framework registers
    as an IH module)

See the [Nexus page](https://www.nexusmods.com/metalgearsolidvtpp/mods/2486)
for full installation instructions.

## Automatic fixes

These work the moment V Framework is installed:

  - **Female Hair Fix** - in vanilla, female soldiers keep a separate
    persistent hair layer that clips through helmets and headgear.
    V Framework corrects this so female hair behaves properly under
    headgear, the same way male soldiers do.
  - **Ocelot Dual Tornado**
  - **VIP soldiers** - VIPs in missions such as Red Brass or War Economy have their
    voices pitched down (GZ-style), and nearby comrades react to them differently
    than to regular soldiers.
  - **Custom callsigns** - soldiers who have the RADIO revenge ability use the
    "Patrol" call sign.


## Lua API

V Framework's features are exposed as Lua functions, brand-new DoMessages, GameObject
SendCommands, and exported constants. All of it is documented, with examples, in the
**[V Framework Lua API](/V_Framework_Lua_API)** reference.

```lua
-- Flag Mission 10070, true as an Emergency mission with a custom popup and a HUD banner
V_TppUiCommand.SetEmergencyMissionPopupLangId("hud_emergency_mission", "another_langId") -- hud_emergency_mission is a langId in .lng2 files
V_TppUiCommand.SetMissionEmergency(10070, true)
V_TppUiCommand.ShowMissionIcon("another_langId", "another_langId", 6.0)
```
