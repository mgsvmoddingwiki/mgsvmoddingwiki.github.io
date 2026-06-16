---
title: V_Framework
permalink: /V_FrameWork/
tags: [Lua, Tools, Infinite Heaven]
---

{% include infobox dev="Yazed0071" site="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486" download="https://www.nexusmods.com/metalgearsolidvtpp/mods/2486?tab=files" sourcecode="https://github.com/Yazed0071/V_FrameWork" %}

V Framework is a modding framework that "breaks the wall" between Lua and
the game's executable. It loads as an [Infinite
Heaven](/Infinite_Heaven "wikilink") module and exposes native Fox Engine
features — UI, sound, soldiers, bosses and vehicles — to Lua scripts that
the game never opened up to modding.

It ships with a handful of automatic fixes and a library of ready-made
Lua APIs you can call from your own missions and mods, without touching a
single memory address.

## Requirements

  - Metal Gear Solid V: The Phantom Pain (1.0.15.4 or 1.0.15.3, EN or JP)
  - [Infinite Heaven](/Infinite_Heaven "wikilink") (V Framework registers
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
  - **Enemies, Soldiers & VIPs** VIPs in missions — VIPs in mission such as Red Brass or War Economy will have their voice pitch down (Similar to GZ) and comrades react to them differently than to a regular soldiers. 
  Custom callsigns — Makes soldiers who have the RADIO revenge power use the call sign "Patrol".
  

## Lua API

V_Framework's features are exposed as lua functions, brand new DoMessages and GameObject, Lua Exported Constants, SendCommand - with examples - is documented
in the **[V_Framework Lua API](/V_FrameWork_Lua_API)** reference.

```lua
-- Flag Mission 10070, true as an Emergency mission with a custom popup and a HUD banner
V_TppUi.SetEmergencyMissionPopupLangId("hud_emergency_mission", "another_langId") -- hud_emergency_mission is a langId in .lng2 files
V_TppUi.SetMissionEmergency(10070, true)
V_TppUi.ShowMissionIcon("another_langId", "another_langId", 6.0)
```
