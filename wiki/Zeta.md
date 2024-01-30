---
title: Zeta
permalink: /Zeta/
tags: [Infinite Heaven, Tools]
---

{% include infobox dev="ZipfsLaw" site="https://github.com/ZipfsLaw/Zeta" download="https://www.nexusmods.com/metalgearsolidvtpp/mods/1309" %}

**Zeta** is an [Infinite Heaven](/Infinite_Heaven "wikilink") add-on that is both an in-game mod manager and modding framework. It was created to simplify modding, to improve mod organization, and to resolve file conflicts between mods. 
It can manage weapons, vehicles, custom player models, buddies and more. [It's required to use Zeta modules.](https://www.nexusmods.com/metalgearsolidvtpp/search/?search_description=Zeta)

## Features

  - Mod Manager: Configure all of your mods in-game! You can toggle them, change their settings as well as their load order.
  - Modding Framework: Using several new LUA functions, you can easily make the modifications you want without overwriting game files.
  - Non-Replacer Mods: Mods no longer conflict with one another! They can have their own unique assets without replacing vanilla content.
  - Mod Support: Playable characters, vehicles, buddies, soldiers, missions, weapons, items, camos, LUA scripts, and more!
  - Backwards Compatibility: Non-IH mods can be loaded by Zeta and used alongside other mods.
  - Included Mods: Advanced Graphics Menu, Loadout Management, Unlocked Weapon Customization, Zeta Editor

## Installation

{% include youtube id="dxLxWyGkKQw" %}

{% include spoiler-start title="Setup (Text-Version)" %}

## Requirements

  - [SnakeBite Mod Manager](/SnakeBite_Mod_Manager "wikilink")
  - [Infinite Heaven](/Infinite_Heaven "wikilink")
  - [IHHook](/IHHook "wikilink")

## Installation

  - Extract ***"ZetaIHAddon.zip"***
  - Open [SnakeBite Mod Manager](https://www.nexusmods.com/metalgearsolidvtpp/mods/106)
  - Go to ***"Mods"***
  - Click ***"Install .MGSV file(s)"***
  - Select ***"ZetaIHAddon.MGSV"***
  - Click ***"Continue Installation"***

## Usage

  - [Download and install MGSV mods that require Zeta.](https://www.nexusmods.com/metalgearsolidvtpp/search/?search_description=Zeta)
  - Hold down the Dive button (Space Bar) or press F3 to access the IH overlay menu.
  - Scroll down to ***"Zeta Menu"***
  - To select an option, press right, or numpad 6.
  - General Settings has options that change how Zeta works overall.
  - Mod Management has options for all mods installed.
    
{% include spoiler-end %}

## Troubleshooting

Make sure that you have the latest versions of [Infinite Heaven](/Infinite_Heaven "wikilink"), [IHHook](/IHHook "wikilink"), and Zeta installed. If you don't, use [SnakeBite Mod Manager](/SnakeBite_Mod_Manager "wikilink") to install these required mods.

| Issue                                                 | Solution                                                                                                                                                                                                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mods don't work in FOB | Mods are disabled in FOB by default. To enable them, you have to go to **Zeta Menu->General Settings** then enable **Zeta in FOB**. While it's highly unlikely you'll be banned for using mods in FOB, enable this option at your own risk! I can only recommend enabling this if you want cosmetic mods to work. If the mod(s) you're using is for FOB, then you must enable this option for them to work. | 
| Certain legacy MGSV mods break the game | These are mods known to break MGSV (1.0.15.3), Infinite Heaven, and/or Zeta:<br/>• [Deploy without Primary Weapons](https://www.nexusmods.com/metalgearsolidvtpp/mods/510):﻿ Should be uninstalled as Infinite Heaven already has a similar option. When installed, it overwrites some of Infinite Heaven's LUA scripts and must be reinstalled for it to work again.<br/>• [Infinite Ammo and Suppressors v1.12](https://www.nexusmods.com/metalgearsolidvtpp/mods/291): Incompatible with the latest version of MGSV. Should be uninstalled as it breaks the game when selecting sniper rifles. Will be porting soon or recreating with more options. | 
| Zeta or Legacy mods aren't working/Experiencing crashes | Check if the mods are enabled in the Mod Management menu. Some are disabled by default according to their mod infos. <br/>• Some legacy MGSV mods aren't compatible with the latest version of MGSV ( Version 1.0.15.3 ), and thus will crash the game in certain instances. If you happen to experience crashes, try uninstalling non-Zeta mods first. If you experience any more problems, you might have to install non-Zeta mods before Zeta. This might get fixed in a future update.  <br/>• There's a possibility that you installed a mod that overwrites Infinite Heaven. Try reinstalling Infinite Heaven.﻿ <br/>• If you've used the Zeta Editor, make sure to remove any generated LUA scripts from "Steam\steamapps\common\MGS_TPP\mod\zeta". <br/>• Check if you're using the latest version. If you aren't, install the latest version as the Zeta script you're using might require it. <br/>• When updating Zeta, make sure that you have uninstalled it before updating. Overwriting it without first uninstalling it will cause issues. |
| A "Mod Conflict Detected" prompt appears when trying to install a non-Zeta mod | This shouldn't ever happen as Zeta does not overwrite any vanilla files, nor any known files from other mods. Any non-Zeta mods that prompt this must be installed **before** Zeta (IH Add-on).<br/> ![](https://zipfslaw.github.io/ZetaDocs/img/conflict.png) ![](https://zipfslaw.github.io/ZetaDocs/img/conflictfix.png){:.inline} |
