---
title: Infinite Heaven
permalink: /Infinite_Heaven/
tags: [Lua, Guides, Tools, Infinite Heaven]
---

{% include infobox dev="TinManTex" site="https://www.nexusmods.com/metalgearsolidvtpp/mods/45" download="https://www.nexusmods.com/metalgearsolidvtpp/mods/45?tab=files" %}

Infinite Heaven is a mod for Metal Gear Solid V: The Phantom Pain intended to extend gameplay through customizable settings and features.

It has several hundred toggleable options ranging from Subsistence mode for all missions, replay side-ops, Mother base invasions with multiple attack helicopters, Skull attacks in Free roam, Free-cam, skip heli rides, customization of enemy and mother base gear, foot, heavy vehicle and heli patrols in free roam, and much more.

The purpose of this article is to provide installation steps, notes about the mod, in addition to troubleshooting steps for errors encountered while installing or using the mod.

{% include index-autolist tag="Infinite Heaven" %}{:.small}

## Installation

**Video version:**

{% include youtube id="pHjgbENgnvA" caption="daften_23's tutorial on Snakebite and Infinite Heaven Installation" %}

> **Note:** the video above was made prior to [IHHook](https://www.nexusmods.com/metalgearsolidvtpp/mods/1226) being split off into a separate download. When installing Infinite Heaven via Snakebite made sure to also install IHHook or the GUI won't load.
{:.important}

**Text version:**

The text guide also covers optionally manually backing up the game data archive files, along with some troubleshooting tips.

{% include spoiler-start %}

### Preparation/insurance

1. End/Abort any mission back to ACC before upgrading Infinite Heaven, upgrading a save that's mid-mission is likely to cause issues.

2. Back up your save files for safety:
<br/><br/>
```
 <Steam path>\userdata\<user id>\287700
```
and
<br/>
```
 <Steam path>\userdata\<user id>\311340
```
> The placeholder name `<Steam path>` means wherever the Steam program directory is. By default the path is `C:\Program Files\Steam`.

3. MGSV uses two save directories:
<br/><br/>
`311340` is Ground Zeros Steam id, but used by MGSV for save data even if GZ is not installed.
<br/><br/>
`287700` is TPP steam id, most of the files here seem to be just backup, except for `TPP_GRAPHICS_CONFIG`

4. Copy both directories to a safe place.

5. You may want to back up periodically as you play in case you come across save breaking issues with the mod.

### Backing up the games's data archives (vanilla copies)

Snakebite should do this, but it's good to have your own backups.

- Back up TPPs original `00.dat` and `01.dat` in
<br/><br/>
```
 <Steam path>\steamapps\common\MGS_TPP\master\0\
```
> This does not apply if you've already modded it. See below.

### Backing up the games's data archives (modded copies)

Either find and restore your original game `00.dat`/`01.dat` backup or revalidate the game through steam:

- Right click on the game in steam library, choose properties from bottom of menu, local files tab, verify integrity of game cache button.<br/>
    - Or paste this to File Explorer or your browser [<steam://validate/287700>](<steam://validate/287700>)

> **Note:** If it gets stuck at 0% for more than a few minutes Steam is being
stupid, validate one of the Valve games first, Half Life 2, Portal, etc, then try
validating MGSV again.
> 
> It should say 1 or two files need to be redownloaded, so go to steam
downloads and make sure that is happening.

### Downloading Infinite Heaven and IHHook

1. Download the latest version of Infinite Heaven from the [Nexus Mods page](https://www.nexusmods.com/metalgearsolidvtpp/mods/45?tab=files).
2. Also download [IHHook](https://www.nexusmods.com/metalgearsolidvtpp/mods/1226?tab=files), which is required for Infinite Heaven's GUI.

> Older versions of Infinite Heaven bundled IHHook with it but they've been split to separate downloads for some time now.

### Installing SnakeBite

1. Get the latest SnakeBite Mod Manager from the [Nexus Mods page](http://nexusmods.com/metalgearsolidvtpp/mods/106/) and run through its setup.

2. Click on the Mods menu item on Snakebites main screen.

3. Uninstall any earlier version of Infinite Heaven from the Installed Mods tab.

4. Extract the Infinite Heaven zip files somewhere.

5. Click *Install .MGSV* on the Installed Mods tab in Snakebite

6. Browse to the `Infinite Heaven.msgv` from the Infinite Heaven zip file.

> This step should only take a minute or so if no other mods installed (longer with other mods installed, basically proportional to the size of `00.dat`). See `log.txt` in the Snakebite directory which is updated with the install progress.

{:start="7"}
7. Finally install [IHHook](/IHHook) by repeating step 5 then browsing to IHHook's `.mgsv` file.

> **Troubleshooting:** if IH takes an excessively long time to install refer to the sticky comment on the Snakebite [Posts tab](https://www.nexusmods.com/metalgearsolidvtpp/mods/106?tab=posts) for possible fixes.
{:.important}

{% include spoiler-end %}

---

> **Troubleshooting:** if experiencing issues refer to the `Troubleshooting.txt` found in the `docs` directory of the Infinite Heaven zip you downloaded, or the [Troubleshooting section](#troubleshooting) further below on this page.
{:.important}

> **Online/multiplayer:** all settings are reset to off on doing a FOB mission. It's recommended to play offline while the mod is installed. Snakebite mod manager allows easy toggling of mods.

---

## Features and Options

All options in Infinite Heaven begin set with the game defaults and can be adjusted in the Infinite Heaven menus.

For the full and up-to-date documentation of features, options and notes check out the included `Features and Options.txt` within the `docs` directory of the Infinite Heaven zip.

Also check out TinManTex's [Youtube playlist](https://www.youtube.com/playlist?list=PLSKlVTXYh6F_fmq0u9UmN2XTnfdfcHKJF) where they demonstrate many of the features and options of Infinite Heaven.

> **Note:** if Infinite Heaven was not installed correctly the in-game menu will not appear while in the ACC.

---

## Using alongside other mods

Infinite Heaven modifies a lot of the core game lua scripts, combining with mods that have their own versions of those files will break things in either obvious or subtle ways.

Mods that shouldn't have a conflict with Infinite Heaven are: Model swaps, data table mods like development unlocks or times.

Ask the mod author for a Snakebite install package.

You can also convert many mods to Snakebite yourself either by trying the *Install .ZIP* option in the Installed Mods tab of Snakebite, or by using Makebite (comes with Snakebite) to create a Snakebite package (`.mgsv`). See the video below for a tutorial.

{% include youtube id="tYPi_kj3F8g" %}

> **Tip:** if you want to manually check to see if a mod conflicts unzip the Infinite Heaven `.mgsv` file with a zip tool of your choice and check to see if any of the files match files in the other mod.

---

## Uninstallation

1. Exit any missions, return to the ACC.\
\
\
> The mod saves some varables to the save file, but on initial testing (feedback is welcome on this) there is no issue with loading a save from this mod after the mod has been removed (provided you have exited to ACC).

2. Use uninstall in SnakeBite.

3. Delete the `MGS_TPP\mod` directory.

---

## Troubleshooting

This section covers a range of steps to identify issues, provided by the developer, TinManTex.

- Check the `FAQ Known Issues.txt` file in the `docs` directory of the Infinite Heaven zip first.

- If you have issues with Snakebite try the suggestions in the stickied post on the Snakebite [Nexusmods Posts tab](https://www.nexusmods.com/metalgearsolidvtpp/mods/106?tab=posts).

For other issues can you please provide the following files to help me test:

{% include spoiler-start title="Instructions for providing files" %}

- Your save game that's at the point it's having issues. The save files are located in:
<br/>
<br/>
```
 <Steam path>\userdata\<user id>\311340\remote
```
> The default install path of Steam is: `C:\Program Files\Steam`. Usually the `TPP_GAME_DATA` file alone is sufficient.

- Some files from the `MGS_TPP` game directory (usually in `Steam\SteamApps\common`):

    - `Snakebite.xml` from the `MGS_TPP` directory.

    - The entire `MGS_TPP\mod` directory (as this contains the `ih_save` as well as debug logs).

> **Tip:** if you need a place to upload [mega.co.nz](https://mega.co.nz) works well, as does Dropbox. You can message me the link if you wish.

{% include spoiler-end %}

---

**Error message: `Infinite Heaven: Could not load modules from MGS_TPP\mod\`**

If you get this message shortly after startup make sure your game directory is actually named `MGS_TPP`. Then the following can be tried:

- Running `mgsvtpp.exe` as Administrator.
- Copying the `mod` directory to `C:\mod`, after running the game again open `ih_log.txt` from the mod directory and messaging me the log.

After you have done so there's a couple of things you can try:

- **Abort to ACC from title**:
    - At the title screen hold down the Escape key for a couple of seconds, the Fox logo will flash up breifly, upon selecting continue the game will load into ACC instead of the mission the save was on.

- **Clear IH settings completely**:
    - Exit the game and delete `MGS_TPP\mod\saves\ih_save.lua`

- **Resetting from scratch**:
    1. Pressing the *Restore original game files* button in Snakebite's settings page.
    2. Verifying game cache through the properties for the game in Steam.
    3. Delete the entire `MGS_TPP\mod` directory (you may want to copy off the `ih_save.lua` in `MGS_TPP\mod\saves` first). At this point MGSV will be considered unmodded, but verify by loading the game.

- **Re-run Snakebite and go through it's steps**.
    - Again test to see if the game loads.

- **Install Infinite Heaven only.**
    - Test again to see if the issue still occurs.

> **Note:** if the game save is in-mission and not in ACC you may need to Abort to ACC from title (see above).

---

### Troubleshooting table

| Problem                                                | Technical details                                                            | Solution                                                                                                                                                                                                                                                            |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cannot install mod with Snakebite                      | ![](/assets/IFXUHRX.jpg)                                                     | This may be a problem with the Snakebite installation/User not backing up files. The easiest solution is to back up your saves, uninstall Snakebite, Uninstall MGSV and delete all data from `MGS_TPP`. Reinstall the game and make sure to back up all game files. |
| Cannot uninstall or install mods                       | ![](/assets/111pture.PNG)                                                    | MGSV Still running in the background. Force kill with task manager or restart computer.                                                                                                                                                                             |
| IHExt overlay won't work                               |                                                                              | Set `IHExt.exe` (located in `MGS_TPP/mod/`) to always run in administrator.                                                                                                                                                                                         |
| Player model turning invisible - unable to move        | This may not be an issue with IH. This could be a conflict between fova mods | Return to ACC, shut down the game, and check for mod conflicts with Snakebite.                                                                                                                                                                                      |
| Repeating cutscenes when returning to MB               | MB Cutscenes mode set to: Default or Play Selected                           | Disable MB cutscenes.                                                                                                                                                                                                                                               |
| Driving between clusters on MB results in freeze/crash | Conflict between mods and MB settings in IH                                  | Minimize mod conflicts and reset IH settings.                                                                                                                                                                                                                       |
| Emblem Keeps Resetting                                 | This is caused by booting the game offline with IH settings                  | Disable this option and play Online, emblem will update.                                                                                                                                                                                                            |



