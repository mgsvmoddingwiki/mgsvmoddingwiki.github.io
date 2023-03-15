---
title: Infinite Heaven
permalink: /Infinite_Heaven/
tags: [Lua, Guides, Tools, Infinite Heaven]
---

Infinite Heaven is a mod for Metal Gear Solid V: The Phantom Pain
intended to extend gameplay through customizable settings and features.

Has several hundred toggleable options ranging from Subsistence mode for
all missions, replay side-ops, Mother base invasions with multiple
attack helicopters, Skull attacks in Free roam, Free-cam, skip heli
rides, customization of enemy and mother base gear, foot, heavy vehicle
and heli patrols in free roam, and much more.

The purpose of this article is to provide ease of use to the mod's
utilities as well as troubleshooting steps for errors encountered while
installing or using the mod.


\==Installation== [thumb|daften_23's tutorial on Snakebite and Infinite
Heaven Installation](/File:MGSV_Modding_-_01_-_SnakeBite "wikilink")

**1. Preparation/insurance:**

End/Abort any mission back to ACC before upgrading Infinite Heaven,
upgrading a save that's mid-mission is likely to cause issues.

(Default install path of steam is C:\\Program Files\\Steam)

Back up your save files for safety:

<steam path>\\userdata\\<user id>\\287700 and

<steam path>\\userdata\\<user id>\\311340

MGSV uses two save folders:

\- 311340 is Ground Zeros steam id, but used by MGSV for save data even
if GZ is not installed.

\- 287700 is TPP steam id, most of the files here seem to be just
backup, except for TPP_GRAPHICS_CONFIG

Copy both folders to a safe place.

You may want to back up periodically as you play in case you come across
save breaking issues with the mod.

**2. First-time prep:**

Snakebite should do this, but it's good to have your own backups.

Back up TPPs original 00.dat and 01.dat in

<steam path>\\steamapps\\common\\MGS_TPP\\master\\0\\

This does not apply if you've already modded it.

**3. Already modded:**

Either find and restore your original game 00/01.dat backup or
revalidate the game through steam:

Right click on the game in steam library, choose properties from bottom
of menu, local files tab, verify integrity of game cache button.

or paste this to File Explorer or your browser <steam://validate/287700>

If it gets stuck at 0% for more than a few minutes steam is being
stupid, validate one of the valve games first, hl2, portal etc then try
validating mgsv again.

It should say 1 or two files need to be redownloaded, so go to steam
downloads and make sure that is happening.

**4. Install SnakeBite:**

Get the latest SnakeBite Mod Manager from

http://nexusmods.com/metalgearsolidvtpp/mods/106/

and run through its setup.

Click on the Mods menu item on Snakebites main screen.

Uninstall any earlier version of Infinite Heaven from the Installed Mods
tab.

Extract the Infinite Heaven zip files somewhere.

Click Install .MGSV on the Installed Mods tab in Snakebite

Browse to the Infinite Heaven.msgv from the Infinite Heaven zip file.

This step should only take a minute or so if no other mods installed
(longer with other mods installed, basically proportional to the size of
00.dat).

See log.txt in the snakebite folder which is updated with the installs
progress.

If it takes an excessively long time refer to the sticky on the
snakebite posts page for possible fixes.

Troubleshooting: See Troubleshooting.txt.

**NOTE:**

\------------------------------

By design I try to keep the initial install to all regular game settings
and only changed via infinite heavens in-game mod menu.

All settings are reset to off on doing a FOB mission. But I suggest you
play offline while the mod is installed. Snakebite mod manager allows
easy toggling of mods.

Using alongside other mods:

\------------------------------

Infinite Heaven modifies a lot of the core game lua scripts, combining
with mods that have their own versions of those files will break things
in either obvious or subtle ways.

Mods that shouldn't have a conflict with Infinite Heaven are: Model
swaps, data table mods like development unlocks or times.

Ask the mod author for a snakebite install package.

You can also convert many mods to snakebite yourself either by trying
the Install .ZIP option in the Installed Mods tab of Snakebite

Or by using makebite (comes with snakebite) to create a Snakebite
package (.MGSV)

https://www.youtube.com/watch?v=tYPi_kj3F8g

If you want to manually check to see if a mod conflicts unzip the
Infinite Heaven .mgsv with the zip tool of your choice and check to see
if any of the files match files in the other mod.

**Uninstallation:**

Exit any missions, return to the ACC.

The mod saves some varables to the save file, but on initial testing (I
welcome feedback on this) there is no issue with loading a save from
this mod after the mod has been removed (provided you have exited to
ACC)

Use uninstall in SnakeBite.

Delete the MGS_TPP\\mod folder


\==Features and Technical Data== All options in Infinite Heaven start
set to game defaults and can be adjusted in the Infinite Heaven menus.
It must also be noted that if the mod was not installed correctly, the
in-game menu will not prompt while in the ACC.

The menus and sub-menus listed below are a quick-reference guide on the
menus contained in Infinite Heaven.

<table>
<caption>Discrete Features</caption>
<thead>
<tr class="header">
<th><p>Feature</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><h5 id="disables_self_on_fob">Disables self on FOB</h5></td>
<td><h5 id="fob_mode_automatically_uses_defaultsunmodified_this_does_not_affect_saved_settings_on_return.">FOB mode automatically uses defaults/unmodified, this does not affect saved settings on return.</h5></td>
</tr>
<tr class="even">
<td><h5 id="abort_to_acc_from_title_continue">Abort to ACC from title continue</h5></td>
<td><h5 id="at_the_title_screen_hold_down_escape_for_1.5_seconds_the_kjp_logo_will_flash_clicking_continue_will_load_acc_instead_of_continuing_mission.">At the title screen hold down ESCAPE for 1.5 seconds, the KJP logo will flash, clicking Continue will load ACC instead of continuing mission.</h5></td>
</tr>
<tr class="odd">
<td><h5 id="manually_trigger_skulls_attack_on_quarantine_platform.">Manually trigger Skulls attack on Quarantine platform.</h5></td>
<td><h5 id="after_you_have_captured_some_skulls_attack_them_in_their_cages_to_trigger_an_attack.">After you have captured some Skulls attack them in their cages to trigger an attack.</h5></td>
</tr>
<tr class="even">
<td><h5 id="equip_none_for_primary_and_secondary_via_the_normal_mission_prep_equipment_select_screen.">Equip 'NONE' for primary and secondary via the normal mission prep equipment select screen.</h5></td>
<td><h5 id="the_entries_will_show_as_a_white_square_with_____as_the_text._warning_do_not_equip_these_on_fob_as_there_is_an_equipment_check.">The entries will show as a white square with '---' as the text. WARNING: Do not equip these on FOB as there is an equipment check.</h5></td>
</tr>
<tr class="odd">
<td><h5 id="toggle_disable_pull_out_in_support_heli.">Toggle Disable pull-out in support heli.</h5></td>
<td><h5 id="pressing_while_support_heli_will_toggle_disable_pull_out._if_changing_from_pull_out_to_pull_out_disabled_youll_still_have_to_exit_and_enter_the_heli_but_while_pull_out_is_disabled_pressing_it_will_cause_heli_to_pull_out.">Pressing <Change Stance> while support heli will toggle Disable pull-out. If changing from pull-out to pull-out disabled you'll still have to exit and enter the heli, but while pull-out is disabled pressing it will cause heli to pull-out.</h5></td>
</tr>
<tr class="even">
<td><h5 id="manually_trigger_open_heli_door_at_mission_start.">Manually trigger open heli door at mission start.</h5></td>
<td><h5 id="pressing_while_support_heli_at_mission_start._mostly_useful_with_the_mission_start_time_till_open_door_so_you_can_control_how_long_you_stay_sitting_in_heli_on_mission_start.">Pressing <Change Stance> while support heli at mission start. Mostly useful with the 'Mission start time till open door' so you can control how long you stay sitting in heli on mission start.</h5></td>
</tr>
<tr class="odd">
<td><h5 id="pause_and_restart_cutscenes.">Pause and restart cutscenes.</h5></td>
<td><h5 id="pressing_when_a_cutscene_is_playing_will_toggle_pauseresume._pressing_will_restart_the_cutscene.">Pressing <Change Stance> when a cutscene is playing will toggle pause/resume. Pressing <Reload> will restart the cutscene.</h5></td>
</tr>
<tr class="even">
<td><h5 id="quick_menu_commands.">Quick menu commands.</h5></td>
<td><h5 id="must_be_enabled_via_option_in_ih_system_menu_or_by_editing_infquickmenudefs.lua_shortcut_key_combinations_to_activate_ih_features._see_infinite_heaven_readme_or_infquickmenudefs.lua_in_mod_folder.">(Must be enabled via option in IH system menu, or by editing InfQuickMenuDefs.lua) Shortcut key combinations to activate IH features. See Infinite Heaven readme or InfQuickMenuDefs.lua in mod folder.</h5></td>
</tr>
<tr class="odd">
<td><h5 id="settings_save_file.">Settings save file.</h5></td>
<td><h5 id="ih_writes_its_settings_to_ih_save.lua_in_the_mgs_tppmodsaves_folder._while_the_file_is_editable_editing_an_inmission_save_is_likely_to_cause_issues.">IH writes its settings to ih_save.lua in the MGS_TPPmodsaves folder. While the file is editable, editing an inMission save is likely to cause issues.</h5></td>
</tr>
<tr class="even">
<td><h5 id="profiles.">Profiles.</h5></td>
<td><h5 id="editable_lists_of_options_as_an_alternative_to_using_the_in_game_ih_menu_see_the_modprofiles_folder_in_your_mgs_tpp_game_folder.">Editable lists of options as an alternative to using the in game IH menu, see the \mod\profiles folder in your MGS_TPP game folder.</h5></td>
</tr>
<tr class="odd">
<td><h5 id="reload_lua_scripts_in_mgs_tpp_without_exiting_game.">Reload lua scripts in MGS_TPP without exiting game.</h5></td>
<td><h5 id="hold_can_also_use_the_loadexternalmodules_command_in_the_debug_menu">Hold <Stance>,<Action>,<Ready weapon>,<Binoculars> (Can also use the loadExternalModules command in the Debug menu)</h5></td>
</tr>
<tr class="even">
<td><h5 id="new_sideops_for_mother_base.">New sideops for Mother Base.</h5></td>
<td><h5 id="optional_files_adds_3_new_animal_capture_sideops_for_mother_base._make_sure_youve_cleared_the_target_training_sidops_for_the_clusters_or_they_may_not_show."><a href="https://www.nexusmods.com/metalgearsolidvtpp/mods/45?tab=files">(Optional Files)</a> Adds 3 new animal capture sideops for Mother Base. Make sure you've cleared the target training sidops for the clusters or they may not show.</h5></td>
</tr>
<tr class="odd">
<td><h5 id="ihext_overlay">IHExt overlay</h5></td>
<td><h5 id="ihext_is_an_overlay_app_that_infinite_heaven_can_launch_to_act_as_the_menu_when_mgsv_is_in_borderless_fullscreen_mode._the_normal_ih_activation_and_navigation_of_the_menu_remains_the_same_but_if_you_alt_tab_to_the_overlay_you_can_use_mouse_and_keyboard_to_more_quickly_navigate_and_change_settings._it_can_also_display_more_descriptive_help_text_for_the_current_option._can_also_search_by_selecting_the_menu_line_below_the_menu_list_typing_something_and_pressing_enter."><a href="https://github.com/TinManTex/IHExt">IHExt</a> is an overlay app that Infinite Heaven can launch to act as the menu when MGSV is in Borderless Fullscreen mode. The normal IH activation and navigation of the menu remains the same, but if you alt-tab to the overlay you can use mouse and keyboard to more quickly navigate and change settings. It can also display more descriptive help text for the current option. Can also search by selecting the menu line below the menu list, typing something and pressing enter.</h5>
<h5 id="enable_via_the_ih_system_menu.">Enable via the IH System menu.</h5>
<h5 id="authors_note_this_menu_is_imperative_and_the_easiest_way_to_access_all_options_in_ih_comes_preinstalled_with_ih._see..._1_ih_system_menu1_enable_ihext"><em>Authors note:</em> this menu is imperative and the easiest way to access all options in IH, comes preinstalled with IH. See... 1: IH System Menu&lt;1: Enable IHExt</h5></td>
</tr>
</tbody>
</table>

### In-ACC Menu

| Option:Setting(s)                                             | Description                                                                                                                     |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1: Enable IHExt : Off, On                                     | IHExt is a windows program that acts as an gui overlay if MGSV is running in Windowed Borderless.                               |
| 2: Enable help text (IHExt) : Off, On                         | Shows help text in IHExt for some options.                                                                                      |
| 3: Give IHExt focus : 0-1                                     |                                                                                                                                 |
| 4: Select profile : <Profile name>                            | Selects a profile from MGS_TPP\\mod\\profiles folder. Press the <Action> button to apply the settings of the selected profile. |
| 5: Set profile options to game defaults : 0-1                 | Sets the options described in the selected profile to their default setting.                                                    |
| 6: Save to UserSaved profile : 0-1                            | Saves current IH settings to UserSaved profile at MGS_TPP\\profiles\\UserSaved.lua.                                            |
| 7: Enable Quick Menu : Off, On                                | Shortcut key combinations to activate IH features. See Infinite Heaven readme or InfQuickMenuDefs.lua in mod folder.            |
| 8: Start offline : Off, On                                    | Start the game in offline mode, this also removes the connect option from the pause menu.                                       |
| 9: Skip startup logos : Off, On                               | Stops the konami/kjp/fox/nvidia logos from showing. As well as custom start-up logos.                                           |
| 10: Load addon mission :                                      |                                                                                                                                 |
| 11: Include addon missions in completion percentage : Off, On |                                                                                                                                 |
| 12: Reset all IH settings : 0-1                               | Resets all settings in this submenu                                                                                             |

1:IH system menu

Basic and common implementations for the mod, menu handles profiles,
accessibility, and addon missions
{| class="article-table mw-collapsible mw-collapsed" |+ 2: Camera menu
\!Option:Setting(s) \!Description |- |1: Adjust-cam \[Mode\] : Off, On
|  Move cam with normal move keys   <Dash>(Shift or Left stick click)
to move up

 

<Switch zoom>

(Middle mouse or Right stick click) to move down

  Hold the following and move left stick up/down to increase/decrease
the settings:

  <Fire> - Zoom/focal length

  <Reload> - Aperture (DOF)

  <Stance> - Focus distance (DOF)

  <Action> - Cam move speed

  <Ready weapon> - Camera orbit distance

  Or hold <Binocular> and press the above to reset that setting.

  Hold <Binocular> and press <Dash> to move free cam position to the
player position |- |2: Camera mode : Default, Free cam | |- |3: Warp
body to FreeCam position : 0-1 | |- |4: Cam speed scale : 0.01-10 | |-
|5: Disable mode text feedback : Off, On | |- |6: Set stage position to
camera : 0-1 | |- |7: Show freecam position : 0-1 | |- |8: PlayCam menu
|An alternate camera than the one used by freecam. WARNING: is sometimes
unstable and may crash the game.

<table>
<caption>PlayCam menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Start PlayCam : 0-1</p></td>
<td><p>Starts PlayCam with current settings. Changing any setting also automatically starts the PlayCam.</p></td>
</tr>
<tr class="even">
<td><p>2: Stop PlayCam : 0-1</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: Camera target : Player</p></td>
<td><p>Selects game object for camerat to target. You can add more game objects via the Objects menu in the main Mission menu.</p></td>
</tr>
<tr class="even">
<td><p>4: Focal length : 0.1-10000</p></td>
<td><p>DOF variable<br />
</p></td>
</tr>
<tr class="odd">
<td><p>5: Focus distance : 0.1-30<br />
</p></td>
<td><p>DOF variable</p></td>
</tr>
<tr class="even">
<td><p>6: Aperture : 0.001-100</p></td>
<td><p>DOF variable</p></td>
</tr>
<tr class="odd">
<td><p>7: Follow Position : Off, On</p></td>
<td><p>Follows position of Camera target. Overrides Follow Rotation.</p></td>
</tr>
<tr class="even">
<td><p>8: Follow Rotation : Off, On</p></td>
<td><p>Follows rotation of Camera target.<br />
</p></td>
</tr>
<tr class="odd">
<td><p>9: Target offset X : -1000-1000<br />
</p></td>
<td><p>Adjusts X axis of camera target<br />
</p></td>
</tr>
<tr class="even">
<td><p>10: Target offset Y : -1000-1000<br />
</p></td>
<td><p>Adjusts Y axis of camera target<br />
</p></td>
</tr>
<tr class="odd">
<td><p>11: Target offset Z : -1000-1000<br />
</p></td>
<td><p>Adjusts Z axis of camera target<br />
</p></td>
</tr>
<tr class="even">
<td><p>12: Position offset X : -1000-1000<br />
</p></td>
<td><p>Adjusts X axis of camera position<br />
</p></td>
</tr>
<tr class="odd">
<td><p>13: Position offset Y : -1000-1000<br />
</p></td>
<td><p>Adjusts Y axis of camera position<br />
</p></td>
</tr>
<tr class="even">
<td><p>14: Position offset Z : -1000-1000<br />
</p></td>
<td><p>Adjusts Z axis of camera position<br />
</p></td>
</tr>
<tr class="odd">
<td><p>15: Follow time : 0-10000<br />
</p></td>
<td><p>Time in seconds before camera follow turns off. See Follow Position and Follow Rotation.<br />
</p></td>
</tr>
<tr class="even">
<td><p>16: Follow delay time : 0-1<br />
</p></td>
<td><p>Delay before camera follows. Acts more like interpolation time than one-off. See Follow Position and Follow Rotation.<br />
</p></td>
</tr>
<tr class="odd">
<td><p>17: Time till end : 0-10000<br />
</p></td>
<td><p>Time in seconds before PlayCam turns off. Set to high number if you don't want it to end.<br />
</p></td>
</tr>
<tr class="even">
<td><p>18: Fit on camera : Off, On<br />
</p></td>
<td><p>Unknown<br />
</p></td>
</tr>
<tr class="odd">
<td><p>19: Fit start time : 0-1000<br />
</p></td>
<td><p>For Fit on camera.<br />
</p></td>
</tr>
<tr class="even">
<td><p>20: Fit interp time : 0-5<br />
</p></td>
<td><p>Interpolation time for Fit on camera.<br />
</p></td>
</tr>
<tr class="odd">
<td><p>21: Fit diff focal length : 0-100</p></td>
<td><p>Fit diff focal length</p></td>
</tr>
<tr class="even">
<td><p>22: Call Se of Camera Interp : Off, On</p></td>
<td><p>Unknown</p></td>
</tr>
<tr class="odd">
<td><p>23: Use last selected index : Off, On</p></td>
<td><p>Unknown</p></td>
</tr>
<tr class="even">
<td><p>24: Collision check : Off, On</p></td>
<td><p>Checks between camera and target and moves the camera in if there is something in the way.</p></td>
</tr>
</tbody>
</table>

|}

Lets you move a detached camera, use the main movement stick/keys in
combination with other keys/buttons to adjust camera settings, including
Zoom, aperture, focus distance.


{| class="article-table mw-collapsible mw-collapsed" |+ 3: Cutscenes
menu \!Option:Setting(s) \!Descriptions |- |1: Use selected soldier in
all cutscenes and missions : Off, On | |- |2: MB cutscene play mode :
Default, Play selected, Cutscenes disabled |Forces or Disables cutscenes
that trigger under certain circumstances on returning to Mother Base |-
|3: Select MB cutscene (REQ: Play selected) : <Cutscene ids> | |- |4:
Force allow actions : Off, On |Prevents disabling of player actions
during cutscene, but most cutscenes require the Disable cutscene camera
mod from the IH files page. |- |5: Override time : Cutscene default,
Current, Custom | |- |6: Hour : 0-23 | |- |7: Minute : 0-59 | |- |8:
Override weather : Cutscene default, Current, Sunny, Cloudy, Rainy,
Sandstorm, Foggy, Pouring | |}
{| class="article-table mw-collapsible mw-collapsed" |+4: Debug menu
\!Option:Setting(s) \!Description |- |1: Debug IH mode : Off, On
|Switches on logging messages to ih_log.txt (at the cost of longer load
times) and enables the announce-log during loading. |- |2: debugMessages
: Off, On |Logs game message system, requires Debug IH mode to be on.
|- |3: debugFlow : Off, On |Logs some script execution flow, requires
Debug IH mode to be on. |- |4: debugOnUpdate : Off, On | |- |5:
log_SetFlushLevel : trace, debug, info, warn, error, critical, off | |-
|6: Reload IH modules : 0-1 | |- |7: copyLogToPrev : 0-1 | |- |8:
printPressedButtons : Off, On | |- |9: Show freecam position : 0-1 | |-
|10: Show position : 0-1 | |- |11: Show missionCode : 0-1 | |- |12: Show
game language code : 0-1 | |- |13: appearanceDebugMenu |

<table>
<caption>appearanceDebugMenu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description/Submenu</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: faceFovaDirect : 0-1000</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>2: faceDecoFovaDirect : 0-1000</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: hairFovaDirect : 0-1000</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: hairDecoFovaDirect : 0-1000<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: playerTypeDirect : SNAKE, AVATAR, DD_MALE, DD_FEMALE<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>6: playerPartsTypeDirect : 0-100<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>7: playerCamoTypeDirect : 0-1000<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>8: playerFaceIdDirect : 0-730</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>9: playerFaceEquipIdDirect : 0-100<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>10: Print face info : 0-1<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>11: Print appearance info : 0-1<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>12: faceFova : Only for DD soldiers<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>13: faceDecoFova : Only for DD soldiers<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>14: hairFova : Only for DD soldiers<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>15: hairDecoFova : Only for DD soldiers<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>16: faceFovaUnknown1 : 0-50<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>17: faceFovaUnknown2 : 0-1<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>18: faceFovaUnknown3 : 0-4<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>19: faceFovaUnknown4 : 0-4<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>20: faceFovaUnknown5 : 0-1</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>21: faceFovaUnknown6 : 0-3<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>22: faceFovaUnknown7 : 0-303<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>23: faceFovaUnknown8 : 0-303<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>24: faceFovaUnknown9 : 0-303<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>25: faceFovaUnknown10 : 0-3<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>26: Form Variation menu<br />
</p></td>
<td><p>- Form Variation support for player models (requires model swap to support it), the fova system is how the game shows and hides sub-models.</p>
<table>
<caption>Form Variation menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Use selected fova : Off, On</p></td>
</tr>
<tr class="even">
<td><p>2: <Character model description> : <Fova selection></p></td>
</tr>
<tr class="odd">
<td><p>3: Print current body info : 0-1</p></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

|- |14: Disable game over : Off, On | |- |15: Disable out of bounds
checks : Off, On | |- |16: Disable mission intro credits : Off, On | |-
|17: manualMissionCode : | |} Technical settings menu, extensive
fova/appearance menu contained.

<table>
<caption>5: Enemy Prep menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Free roam prep mode : Enemy prep levels, Custom prep, Prep levels + Custom overrides</p></td>
<td><p>Enemy prep levels - the normal games enemy prep levels, Custom prep - uses all the settings in the Custom prep menu, Prep levels + Custom overrides - overrides the Enemy prep levels config with any Custom prep settings that aren't set to their default setting.</p></td>
</tr>
<tr class="even">
<td><p>2: Missions prep mode : Enemy prep levels, Custom prep, Prep levels + Custom overrides</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: Mother base prep mode : Off, FOB style, Enemy prep levels, Custom prep, Prep levels + Custom overrides</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: Custom prep menu</p></td>
<td><p>Lets you set the individual values that go into an enemy prep configuration (does not use the enemy prep levels), a random value between MIN and MAX for each setting is chosen on mission start. The order of items in the menu is generally ordered the equipment is allocated to each soldier in a CP.</p>
<table>
<caption>4: Custom prep menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Print example current config (look in iDroid Log&gt;All tab) : 0-1</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>2: Weapon deployment</p></td>
<td><table>
<caption>Weapon deployment</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: SNIPER_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>2: SNIPER_MAX : 0-100%<br />
</p></td>
</tr>
<tr class="odd">
<td><p>3: MISSILE_MIN : 0-100%<br />
</p></td>
</tr>
<tr class="even">
<td><p>4: MISSILE_MAX : 0-100%<br />
</p></td>
</tr>
<tr class="odd">
<td><p>5: MG_MIN : 0-100%<br />
</p></td>
</tr>
<tr class="even">
<td><p>6: MG_MAX : 0-100%<br />
</p></td>
</tr>
<tr class="odd">
<td><p>7: SHOTGUN_MIN : 0-100%<br />
</p></td>
</tr>
<tr class="even">
<td><p>8: SHOTGUN_MAX : 0-100%<br />
</p></td>
</tr>
<tr class="odd">
<td><p>9: SMG_MIN : 0-100%<br />
</p></td>
</tr>
<tr class="even">
<td><p>10: SMG_MAX : 0-100%<br />
</p></td>
</tr>
<tr class="odd">
<td><p>11: ASSAULT_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>12: ASSAULT_MAX : 0-100%<br />
</p></td>
</tr>
<tr class="odd">
<td><p>13: GUN_LIGHT_MIN : 0-100%<br />
</p></td>
</tr>
<tr class="even">
<td><p>14: GUN_LIGHT_MAX : 0-100%<br />
</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>3: Armor deployment</p></td>
<td><table>
<caption>Armor Deployment</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: ARMOR_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>2: ARMOR_MAX : 0-100%</p></td>
</tr>
<tr class="odd">
<td><p>3: SOFT_ARMOR_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>4: SOFT_ARMOR_MAX : 0-100%</p></td>
</tr>
<tr class="odd">
<td><p>5: SHIELD_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>6: SHIELD_MAX : 0-100%</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td><p>4: Headgear deployment</p></td>
<td><table>
<caption>Headgear Deployment</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: HELMET_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>2: HELMET_MAX : 0-100%</p></td>
</tr>
<tr class="odd">
<td><p>3: NVG_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>4: NVG_MAX : 0-100%</p></td>
</tr>
<tr class="odd">
<td><p>5: GAS_MASK_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>6: GAS_MASK_MAX : 0-100%</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>5: CP deterrent deployment</p></td>
<td><table>
<caption>CP deterrent deployment</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: DECOY_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>2: DECOY_MAX : 0-100%</p></td>
</tr>
<tr class="odd">
<td><p>3: MINE_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>4: MINE_MAX : 0-100%</p></td>
</tr>
<tr class="odd">
<td><p>5: CAMERA_MIN : 0-100%</p></td>
</tr>
<tr class="even">
<td><p>6: CAMERA_MAX : 0-100%</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td><p>6: Soldier abilities</p></td>
<td><table>
<caption>Soldier Abilities</caption>
<thead>
<tr class="header">
<th><p>Options:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: STEALTH_MIN : NONE, LOW, HIGH, SPECIAL</p></td>
<td><p>Adjusts enemy soldiers notice,cure,reflex and speed ablilities.</p></td>
</tr>
<tr class="even">
<td><p>2: STEALTH_MAX : NONE, LOW, HIGH, SPECIAL</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: COMBAT_MIN : NONE, LOW, HIGH, SPECIAL</p></td>
<td><p>Adjusts enemy soldiers shot,grenade,reload,hp and speed abilities.</p></td>
</tr>
<tr class="even">
<td><p>4: COMBAT_MAX : NONE, LOW, HIGH, SPECIAL</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: HOLDUP_MIN : NONE, LOW, HIGH, SPECIAL</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>6: HOLDUP_MAX : NONE, LOW, HIGH, SPECIAL</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>7: FULTON_MIN : NONE, LOW, HIGH, SPECIAL</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>8: FULTON_MAX : NONE, LOW, HIGH, SPECIAL</p></td>
<td></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>7: Weapon strength menu</p></td>
<td><p>Whether to deploy the stronger weapon class for the weapon type</p>
<table>
<caption>Weapon strength menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: STRONG_WEAPON_MIN : Off, On</p></td>
</tr>
<tr class="even">
<td><p>2: STRONG_WEAPON_MAX : Off, On</p></td>
</tr>
<tr class="odd">
<td><p>3: STRONG_SNIPER_MIN : Off, On</p></td>
</tr>
<tr class="even">
<td><p>4: STRONG_SNIPER_MAX : Off, On</p></td>
</tr>
<tr class="odd">
<td><p>5: STRONG_MISSILE_MIN : Off, On</p></td>
</tr>
<tr class="even">
<td><p>6: STRONG_MISSILE_MAX : Off, On</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td><p>8: CP equip strength menu</p></td>
<td><table>
<caption>CP equip strength menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: ACTIVE_DECOY_MIN : Off, On</p></td>
</tr>
<tr class="even">
<td><p>2: ACTIVE_DECOY_MAX : Off, On</p></td>
</tr>
<tr class="odd">
<td><p>3: GUN_CAMERA_MIN : Off, On</p></td>
</tr>
<tr class="even">
<td><p>4: GUN_CAMERA_MAX : Off, On</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>9: Reinforce calls min : 1-99</p></td>
<td><p>Number of reinforcement calls a CP has.</p></td>
</tr>
<tr class="even">
<td><p>10: Reinforce calls max : 1-99</p></td>
<td><p>Number of reinforcement calls a CP has.</p></td>
</tr>
<tr class="odd">
<td><p>11: Vehicle reinforcement level min : NONE, SUPER_REINFORCE, BLACK_SUPER_REINFORCE</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>12: Vehicle reinforcement level max : NONE, SUPER_REINFORCE, BLACK_SUPER_REINFORCE</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>13: Ignore combat-deploy supply blocks min : Off, On</p></td>
<td><p>Ignores the current results of the Combat Deployment/Dispatch/'cut off the supply' missions that affect enemy prep.</p></td>
</tr>
<tr class="even">
<td><p>14: Ignore combat-deploy supply blocks max : Off, On</p></td>
<td></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>5: Prep system menu</p></td>
<td><table>
<caption>Prep system menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Resupply in #missions : 0-10</p></td>
<td><p>The number of missions the enemy dispatch/resupply with unlock after your last successful dispatch mission for that type.<br />
</p></td>
</tr>
<tr class="even">
<td><p>2: Apply enemy prep to guard posts : Off, On</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: Apply enemy prep to patrol soldiers : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: Allow heavy armor in free roam (may have issues) : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: Allow heavy armor in all missions (may have issues) : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>6: Disable weapon restrictions in certain missions : Off, On<br />
</p></td>
<td><p>Missions 2, 12, 13, 16, 26, 31 normally prevent the application of shields, missiles, shotguns and MGs to the general CP enemy prep (though some may have custom enemy prep).<br />
</p></td>
</tr>
<tr class="odd">
<td><p>7: Allow Enemy Prep change from free roam : Off, On<br />
</p></td>
<td><p>By default enemy prep only changes in response to actual missions, this option allows enemy prep changes to be applied after leaving Free roam (but not via abort)<br />
</p></td>
</tr>
<tr class="even">
<td><p>8: Enemy prep decrease on long MB visit : Off, On<br />
</p></td>
<td><p>Spend a number of game days (break out that cigar) during a mother base visit and enemy prep levels will decrease on leaving. Currently reduces after 3 days (stacking), reduces the same as chicken hat<br />
</p></td>
</tr>
<tr class="odd">
<td><p>9: Allow helmet and NVG or Gas mask combo : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>10: Ballance heavy armor and head gear distribution : Off, On<br />
</p></td>
<td><p>Adjusts application percentages of the normally mutally exclusive options of heavy armor and the different headgear pieces, not nessesary if Allow helmet and NVG or Gas mask combo option is on<br />
</p></td>
</tr>
<tr class="odd">
<td><p>11: Allow missile combo with other weapons : Off, On<br />
</p></td>
<td><p>In the default game soldiers with missiles only have SMGs, this allows them to have MGs, shotguns or assault rifles assigned to them.<br />
</p></td>
</tr>
<tr class="even">
<td><p>12: Mg vs Shotgun variation : Off, On<br />
</p></td>
<td><p>In the default game the enemy prep config chooses randomly either MG or Shotguns which is applied for all CPs in the whole mission. This setting allows mixed MGs and Shotguns (but still with the enemy prep total) and also applies them per CP.</p></td>
</tr>
<tr class="odd">
<td><p>13: Balance small CPs : Off, On</p></td>
<td><p>Adds limits and some randomisation to small cp/lrrps enemy prep application</p></td>
</tr>
<tr class="even">
<td><p>14: Disable convert armor to shield (if armor off) : Off, On</p></td>
<td><p>Where heavy armor is disabled (free roam by default) the normal game converts armor to shields in addition to the normal shield application, this often leads to it feeling like there's just too many.</p></td>
</tr>
<tr class="odd">
<td><p>15: Randomize minefield mine types : Off, On</p></td>
<td><p>Randomizes the types of mines within a minfield from the default anti-personel mine to gas, anti-tank, electromagnetic. While the placing the mines may not be ideal for the minetype, it does enable OSP of items that would be impossible to get otherwise.</p></td>
</tr>
<tr class="even">
<td><p>16: Enable additional minefields : Off, On</p></td>
<td><p>In the game many bases have several mine fields but by default only one is enabled at a time, this option lets you enable all of them. Still relies on enemy prep level to be high enough for minefields to be enabled.</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td><p>6: Custom soldier equip menu</p></td>
<td><p>Allow soldiers to have equipment from other locations/types, including DD equipment usually only used on FOB. Soldiers are assigned a random weapon of the type the prep system assigns them, so you'll see more weapon variation</p>
<table>
<caption>Custom soldier equip menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Enemy use custom equip table in free roam : Off, On</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>2: Enemy use custom equip table in missions : Off, On</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: MB staff use custom equip table : Off, On</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: Weapon stengths : NORMAL, STRONG, Combined</p></td>
<td><p>The game weapon tables have Normal and Strong lists that the Enemy prep system will pick from, this setting allows you to select either, or combine them.</p></td>
</tr>
<tr class="odd">
<td><p>5: Include Soviet weapons : Off, On</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>6: Include PF weapons : Off, On</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>7: Include XOF weapons : Off, On</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>8: Include DD weapons : Off, On</p></td>
<td><p>Add the DD weapons table that's usually used for FOB, the following grade and developed settings control how this table is built</p></td>
</tr>
<tr class="odd">
<td><p>9: DD weapons grade MIN : 1-15<br />
</p></td>
<td><p>A grade will be chosen between MIN and MAX at mission start. Note: Equip grade 3 is the minimum grade that has all types of weapons.</p></td>
</tr>
<tr class="even">
<td><p>10: DD weapons grade MAX : 1-15</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>11: Allow undeveloped DD weapons : Off, On<br />
</p></td>
<td><p>Whether to limit the selection to equipment you have developed or allow all equipment. Restriction does not apply to Enemies using DD weapons.<br />
</p></td>
</tr>
<tr class="even">
<td><p>12: DD equipment non-lethal : Off, On<br />
</p></td>
<td></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>7: Custom soldier type in Free roam : NONE</p></td>
<td><p>Override the soldier type of enemy soldiers in Free Roam</p></td>
</tr>
<tr class="even">
<td><p>8: Reset enemy preparedness levels : 0-1</p></td>
<td><p>Resets enemy prep levels to 0</p></td>
</tr>
<tr class="odd">
<td><p>9: Print enemy prep levels : 0-1</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>10: Random CP subtype in free roam : Off, On</p></td>
<td><p>Randomizes the CP subtype - PF types in middle Affrica, urban vs general camo types in Afghanistan</p></td>
</tr>
<tr class="odd">
<td><p>11: Random CP subtype in missions : Off, On</p></td>
<td><p>Randomizes the CP subtype - PF types in middle Affrica, urban vs general camo types in Afghanistan</p></td>
</tr>
<tr class="even">
<td><p>12: IH interrogation in free roam : Off, On</p></td>
<td><p>Adds some interrogations to soldiers: Travel plan of foot patrol, Location of wild card soldier, Location of walker gear. Inter CP quest: Sets up pairs of soldiers in different cps, interrogating one will give CP of other, interrogating him will give a reward of unprocessed resources (around a couple of containers worth) or a skull soldier/parasite on the next extraction (reaching checkpoint etc)</p></td>
</tr>
</tbody>
</table>

Ways to modify the Enemy preparedness system that equips the enemy in
response to your actions.


{| class="article-table mw-collapsible mw-collapsed" |+6: Enemy phases
menu \!Option:Setting(s) \!Description |- |1: Enable phase modifications
: Off, On |The Minimum, Maximum, and Don't downgrade phase settings are
applied on at every update tick according to the Phase update rate and
random variation settings |- |2: Minimum phase : PHASE_SNEAK,
PHASE_CAUTION, PHASE_EVASION, PHASE_ALERT |PHASE_SNEAK - not alert,
PHASE_CAUTION - alert, PHASE_EVASION - one step down from combat
alert, PHASE_ALERT - combat alert |- |3: Maximum phase : PHASE_SNEAK,
PHASE_CAUTION, PHASE_EVASION, PHASE_ALERT |4: Don't downgrade phase :
Off, On |- |5: Phase mod update rate (seconds) : 1-255 |Rate that the
CPs phase is adjusted to the minimum and maxium settings. |- |6: Phase
mod random variation : 0-255 |Random variation of update rate |- |7:
Alert phase on vehicle attack : PHASE_SNEAK, PHASE_CAUTION,
PHASE_EVASION, PHASE_ALERT |Does not require phase modifications
setting to be enabled. The enemy reactions to heavy vehicle attack in
the default game are lacking, you can kill someone and they'll act as if
it's an unsourced attack. This option changes phase of soldiers command
post on damaging the soldier. Setting it to ALERT recommended. |- |8:
Print phase changes : Off, On |Displays when phase changes. |} Adjust
minimum and maximum alert phase for enemy Command Posts

| Option:Setting(s)                                                     | Description                                                                                                                                                                           |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1: Vehicle reinforcements : Off, Enemy Prep, Force Prep               | In the normal game vehicle reinforcments through this system is only used for two missions, this enables it for more. Only heli will appear in free roam, vehicles depend on mission. |
| 2: Force enable enemy heli reinforce (disable heli sideops) : Off, On |                                                                                                                                                                                       |
| 3: Force reinforce request for heli : Off, On                         |                                                                                                                                                                                       |
| 4: Disable reinforce heli pull-out : Off, On                          |                                                                                                                                                                                       |
| 5: Soldier reinforce with all vehicle reinforce types : Off, On       | Allows an extra set of reinforce soldiers with all vehicle reinforce types instead of just Wheeled Armored Vehicles.                                                                  |

7: Enemy reinforcements menu


{| class="article-table mw-collapsible mw-collapsed" |+8: Events menu
\!Option:Setting(s) \!Description |- |1: Trigger random IH event : 0-1
|Events are temporary combinations of IH settings for free roam and
mother base. Free roam events (can stack): Crashland: Starts you on foot
in at a random start point and randomly selects OSP options - cleared
primary, secondary, back weapons, items, support items. Lost-coms:
Disables most mother base support menus and disables all heli landing
zones except from main bases/towns. Hunted: Sets the enemy to combat
alert every 15-45 seconds (this also sets the player spotted position
right on you), and also disables heli landing zones in a 2k radius from
your start position, so you'll have to travel if you want to 'get out'.
MB events (only one active): DD Training wargame, Soviet attack, Rogue
Coyote attack, XOF attack, DD Infection outbreak, Zombie Obliteration
(non DD) |- |2: Free roam event random trigger chance : 0-100% |Chance
to randomly trigger an IH event on starting Free roam. (See 'Trigger
random IH event') |- |3: MB event random trigger chance : 0-100% |Chance
to randomly trigger an IH event on returning to MB. (See 'Trigger random
IH event') |- |4: Allow Hunted event : Off, On | |- |5: Allow Crashland
event : Off, On | |- |6: Allow Lost Coms event : Off, On | |- |7: Enable
Skull attacks in Free roam : Off, On |Skulls attack at a random time (in
minutes) between Skull attack min and Skull attack max settings. |- |8:
Allow armor skulls : Off, On | |- |9: Allow mist skulls : Off, On | |-
|10: Allow sniper skulls : Off, On | |- |11: Skull attack min (minutes)
: 0-180
| |- |12: Skull attack max (minutes) : 0-180
| |- |13: Weather on Skull attack : None, Parasite fog, Random
| |} Custom-made events and scenarios the player can find themselves in
if enabled. Adds to expand the uncertainty and randomness of the game.

<table>
<caption>9: Mother Base menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Mother base prep mode : Off, FOB style, Enemy prep levels, Custom prep, Prep levels + Custom overrides<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>2: Custom soldier equip menu<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: MB Equip Range Type (MB Prep mode FOB only) : Short-range, Medium-range, Long-range, Random range<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: DD Suit : NONE<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: DD Suit female : NONE<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>6: DD Head gear : Off, Current prep<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>7: NPC support heli patrols in MB : 0-3<br />
</p></td>
<td><p>Spawns some npc support helis that roam around mother base.</p></td>
</tr>
<tr class="even">
<td><p>8: Attack heli patrols in MB : No helis, 1 heli, 2 helis, 3 helis, 4 helis, Enemy prep<br />
</p></td>
<td><p>Spawns some npc attack helis that roam around mother base.<br />
</p></td>
</tr>
<tr class="odd">
<td><p>9: Attack heli class : Default, Black, Red, All one random type, Each heli random type, Enemy prep</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>10: Walker gears in MB : Off, On</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>11: Walker gears type : Soviet, Rogue Coyote, CFA, ZRS, Diamond Dogs, Hueys Prototype (texture issues), All one random type, Each gear random type</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>12: Walker gears weapons : Even split of weapons, Minigun, Missiles, All one random type, Each gear random type<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>13: Repopulate plants and diamonds : Off, On</p></td>
<td><p>Regenerates plants on Zoo platform and diamonds on Mother base over time.<br />
</p></td>
</tr>
<tr class="even">
<td><p>14: Enemy prep decrease on long MB visit : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Spend a number of game days (break out that cigar) during a mother base visit and enemy prep levels will decrease on leaving. Currently reduces after 3 days (stacking), reduces the same as chicken hat<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>15: Enable all buddies : Off, On<br />
</p></td>
<td><p>Does not clear D-Horse and D-Walker if set from deploy screen and returning to mother base, they may however spawn inside building geometry, use the call menu to have them respawn near. Also allows buddies on the Zoo platform, now you can take D-Dog or D-Horse to visit some animals.<br />
</p></td>
</tr>
<tr class="odd">
<td><p>16: More soldiers on MB plats : Off, On<br />
</p></td>
<td><p>Increases soldiers on platforms from 4 soldiers to 9.<br />
</p></td>
</tr>
<tr class="even">
<td><p>17: Force enable Quaranine platform soldiers : Off, On<br />
</p></td>
<td><p>Normally game the Qurantine platform soldiers are disabled once you capture Skulls. This option re-enables them.<br />
</p></td>
</tr>
<tr class="odd">
<td><p>18: Soldiers move between platforms : Off, On<br />
</p></td>
<td><p>Soldiers will periodically move between platforms (only within the same cluster).<br />
</p></td>
</tr>
<tr class="even">
<td><p>19: Staff menu</p></td>
<td><table>
<caption>Staff menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Add player staff to MB priority : 0-1<br />
</p></td>
<td><p>Add the last sortie selected DD member to the Mother Base priority staff list to have them appear on MB<br />
</p></td>
</tr>
<tr class="even">
<td><p>2: Remove player staff to MB priority : 0-1</p></td>
<td><p>Removes the last sortie selected DD member to the Mother Base priority staff list<br />
</p></td>
</tr>
<tr class="odd">
<td><p>3: Clear MB staff priority list : 0-1</p></td>
<td><p>Clears MB staff priority list entirely<br />
</p></td>
</tr>
<tr class="even">
<td><p>4: Female staff selection : Default, None, All available, Half</p></td>
<td><p>By default the game tries to assign a minimum of 2 females per cluster from the females assigned to the clusters section, All available and Half will select females first when trying to populate a MB section, None will prevent any females from showing on mother base<br />
</p></td>
</tr>
<tr class="odd">
<td><p>5: Staff-wide morale boost for good visit : Off, On<br />
</p></td>
<td><p>Gives a staff-wide morale boost on having a number of soldiers salute (most of a cluster), visiting a number of clusters (with at least one salute on each), or staying in base a number of game days (break out that cigar). Must leave the base via heli for it to apply.<br />
</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>20: Show characters menu</p></td>
<td><table>
<caption>Show characters menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Enable Ocelot : Off, On</p></td>
<td><p>Enables Ocelot to roam the command platform.<br />
</p></td>
</tr>
<tr class="even">
<td><p>2: Puppy DDog : Off, Missing eye, Normal eyes</p></td>
<td><p>Note: The training side-op on the command platform will be disabled while this is active.</p></td>
</tr>
<tr class="odd">
<td><p>3: Show Code Talker : Off, On</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: Show Eli : Off, On</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: Show Huey : Off, On</p></td>
<td><p>Shows Huey in BattleGear hangar and in cutscenes even before he's arrived or after he's left story-wise.</p></td>
</tr>
<tr class="even">
<td><p>6: Enable Birds : Off, On</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>7: Additional NPCs menu</p></td>
<td><table>
<caption>Additional NPCs menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Female nurse : Off, On</p></td>
</tr>
<tr class="even">
<td><p>2: Male doctor : Off, On</p></td>
</tr>
<tr class="odd">
<td><p>3: Male researcher : Off, On</p></td>
</tr>
<tr class="even">
<td><p>4: Female researcher : Off, On</p></td>
</tr>
<tr class="odd">
<td><p>5: Male groundcrew : Off, On</p></td>
</tr>
<tr class="even">
<td><p>6: Children : Off, On</p></td>
</tr>
<tr class="odd">
<td><p>7: Kaz Miller : Off, On</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td><p>8: Reset Paz state to beginning : 0-1</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>9: Return Quiet after mission 45 : 0-1</p></td>
<td><p>Instantly return Quiet, runs same code as the Reunion mission 11 replay.</p></td>
</tr>
<tr class="even">
<td><p>10: showQuietReunionMissionCount : 0-1</p></td>
<td></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td><p>21: Show assets menu</p></td>
<td><table>
<caption>Show assets menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Show Big Boss posters : Off, On</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>2: Show nuke elimination monument : Off, On</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: Show Sahelanthropus : Off, On</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: Show ships : Off, On</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: Enable asset alarms : Off, On</p></td>
<td><p>Enables anti fulton theft alarms on containers and AA guns. Only partially working, will only trigger alarm once.</p></td>
</tr>
<tr class="even">
<td><p>6: Enable IR sensors : Off, On</p></td>
<td><p>Enable IR sensor gates. Only partially working, will only trigger alarm once, and will only show one or no beam.</p></td>
</tr>
<tr class="odd">
<td><p>7: Hide containers : Off, On</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>8: Hide AA cannons : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>9: Hide AA gatlings : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>10: Hide turret machineguns : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>11: Hide mortars : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>12: Unlock goal doors : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>13: Force BattleGear built level : 0-5<br />
</p></td>
<td><p>Changes the build state of BattleGear in it's hangar, 0 is use the regular story progression.<br />
</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>22: Allow lethal actions : Off, On</p></td>
<td><p>Enables lethal weapons and actions on Mother Base. You will still get a game over if you kill staff.<br />
</p></td>
</tr>
<tr class="even">
<td><p>23: Women in Enemy Invasion mode : 0-100%</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>24: Mother Base War Games : Off, DD Training, Enemy Invasion, DD Infection, Zombie Obliteration (non DD)<br />
</p></td>
<td></td>
</tr>
</tbody>
</table>


{| class="article-table mw-collapsible mw-collapsed" |+ 10: Patrols and
deployments menu \!Option:Setting(s) \!Description |- |1: Foot patrols
in free roam : Off, On
|Foot patrols will travel between random CPs and will cross the field to
get there.
|- |2: Wildcard soldiers Free roam : Off, On
|Changes a few soldiers throughout the CPs to have unique models and
high end weapons.
|- |3: Attack heli patrols in free roam : No helis, 1 heli, 2 helis, 3
helis, 4 helis, Enemy prep
|Allows multiple enemy helicopters that travel between larger CPs. Due
to limitations their current position will not be saved/restored so may
'dissapear/appear' on reload.
|- |4: Attack heli patrols in MB : No helis, 1 heli, 2 helis, 3 helis, 4
helis, Enemy prep
|Spawns some npc attack helis that roam around mother base.
|- |5: Attack heli class : Default, Black, Red, All one random type,
Each heli random type, Enemy prep
| |- |6: Walker gears in free roam : Off, On
|Adds a Walker gear to each main base.
|- |7: Walker gears in MB : Off, On
| |- |8: Vehicle patrols in free roam : Game default - trucks only, All
of one type, Each vehicle differing type |Replaces the patrolling trucks
in free roam with other vehicles, picked randomly from enabled types. |-
|9: Vehicle patrol class : Default, Dark grey, Red, All one random type,
Each vehicle random type, Enemy prep
| |- |10: Allow jeeps : Off, On | |- |11: Allow trucks : Off, On | |-
|12: Allow wheeled armored vehicles : Off, On | |- |13: Allow heavy
wheeled armored vehicles : Off, On
| |- |14: Allow tanks : Off, On
| |- |15: Equipment on trucks : Off, On
|Puts a random piece of equipment on the back of patrol trucks. |}
{| class="article-table mw-collapsible mw-collapsed" |+ 11: Player
restrictions menu \!Option:Setting(s) \!Description |- |1: Disable
support heli attack : Off, On |Stops support heli from engaging
targets.
|- |2: Disable fulton action : Off, On
| |- |3: Force subsistence suit (Olive Drab, no headgear) : Off, On
| |- |4: Set hand type to default : Off, On
| |- |5: Disable abort mission from pause menu : Off, On
| |- |6: Disable retry on mission fail : Off, On
| |- |7: Game over on combat alert : Off, On
| |- |8: Disable Intel team enemy spotting : Off, On
|Stops the Intel teams enemy spotting audio notification and indication
on the idroid map.
|- |9: Disable Intel team herb spotting (requires game restart) : Off,
On
|Stops the Intel teams plant spotting audio notification and indication
on the idroid map. Since the variable is only read once on game startup
this setting requires a game restart before it will activate/deactivate.
|- |10: Keep equipment Free\<\>Mission : Off, On
|Prevents equipment and weapons being reset when going between free-roam
and missions.
|- |11: Marking display menu
|

<table>
<caption>Marking display menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Disable head markers : Off, On</p></td>
<td><p>Disables markers above soldiers and objects<br />
</p></td>
</tr>
<tr class="even">
<td><p>2: Disable Xray marking : Off, On<br />
</p></td>
<td><p>Disables the 'X-ray' effect of marked soldiers. Note: Buddies that mark still cause the effect.</p></td>
</tr>
<tr class="odd">
<td><p>3: Disable world markers : Off, On<br />
</p></td>
<td><p>Disables objective and placed markers<br />
</p></td>
</tr>
</tbody>
</table>

|- |12: Mission-prep restrictions menu
|Only affects the mission-prep screen, not the in-mission equivalents.

<table>
<caption>Mission-prep restrictions menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Disable select-sortie time : Off, On</p></td>
<td><p>Only allows ASAP at mission prep</p></td>
</tr>
<tr class="even">
<td><p>2: Disable select-buddy : Off, On</p></td>
<td><p>Prevents use of buddies during mission prep.<br />
</p></td>
</tr>
<tr class="odd">
<td><p>3: Disable select vehicle : Off, On<br />
</p></td>
<td><p>Disallows at mission prep.<br />
</p></td>
</tr>
<tr class="even">
<td><p>4: Enable mission prep to MB : Off, On<br />
</p></td>
<td></td>
</tr>
</tbody>
</table>

|- |13: Disable mission support-menus menu
|Disables mission support menus in iDroid

| Option:Setting(s)                             |
| --------------------------------------------- |
| 1: Disable Supply drop support-menu : Off, On |
| 2: Disable Buddies support-menu : Off, On     |
| 3: Disable Attack support-menu : Off, On      |
| 4: Disable Heli attack support-menu : Off, On |
| 5: Disable Support-menu : Off, On             |

Disable mission support-menus menu

|- |14: Item level menu
|

| Option:Setting(s)                                                       |
| ----------------------------------------------------------------------- |
| 1: Int-Scope level : Don't override, Grade 1, Grade 2, Grade 3, Grade 4 |
| 2: IDroid level : Don't override, Grade 1, Grade 2, Grade 3, Grade 4    |

item level menu

|- |15: Hand abilities levels menu
|

<table>
<caption>Hand abilities levels menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Sonar level : Don't override, Disable, Grade 2, Grade 3, Grade 4<br />
</p></td>
</tr>
<tr class="even">
<td><p>2: Mobility level : Don't override, Disable, Grade 2, Grade 3, Grade 4<br />
</p></td>
</tr>
<tr class="odd">
<td><p>3: Precision level : Don't override, Disable, Grade 2, Grade 3, Grade 4<br />
</p></td>
</tr>
<tr class="even">
<td><p>4: Medical level : Don't override, Disable, Grade 2, Grade 3, Grade 4<br />
</p></td>
</tr>
</tbody>
</table>

|- |16: Fulton levels menu
|

| Option:Setting(s)                                                    |
| -------------------------------------------------------------------- |
| 1: Fulton Level : Don't override, Grade 1, Grade 2, Grade 3, Grade 4 |
| 2: Wormhole Level : Don't override, Disable, Enable                  |

Fulton levels menu

|- |17: Fulton success menu
|Adjust the success rate of fultoning

<table>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Disable MB fulton support : Off, On<br />
</p></td>
<td><p>Disregards the success bonus from mother base support section, in the base game this is mostly used to counter weather penalty.<br />
</p></td>
</tr>
<tr class="even">
<td><p>2: Disable MB fulton medical : Off, On<br />
</p></td>
<td><p>Disregards the success bonus from mother base medical section, in the base game this used to counter injured target penalty<br />
</p></td>
</tr>
<tr class="odd">
<td><p>3: Target dying penalty : 0-100<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: Target sleeping penalty : 0-100<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: Target holdup penalty : 0-100<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>6: Dont apply MB medical bonus to sleeping/fainted target : Off, On<br />
</p></td>
<td><p>Lets you balance sleeping penalty separately from dying while keeping mb medical bonus.</p></td>
</tr>
<tr class="odd">
<td><p>7: Hostage handling : Default, Must extract (0%)<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>8: Print fulton success bonus : 0-1<br />
</p></td>
<td></td>
</tr>
</tbody>
</table>

|- |18: OSP menu
|

<table>
<caption>OSP menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Primary weapon OSP : Use selected weapon, Clear weapon<br />
</p></td>
</tr>
<tr class="even">
<td><p>2: Secondary weapon OSP : Use selected weapon, Clear weapon<br />
</p></td>
</tr>
<tr class="odd">
<td><p>3: Back Weapon OSP : Use selected weapon, Clear weapon<br />
</p></td>
</tr>
<tr class="even">
<td><p>4: Items OSP : Off, On<br />
</p></td>
</tr>
<tr class="odd">
<td><p>5: Support items OSP : Off, On<br />
</p></td>
</tr>
</tbody>
</table>

|} Settings to customize the game challenge, including subsistence and
OSP.


{| class="article-table mw-collapsible mw-collapsed" |+ 12: Player
settings menu \!Option:Setting(s) \!Description |- |1: Player life scale
: 0-650%
|Changes the life scale of the player. |- |2: Subtract demon points :
0-1
|Subtracts 999999 points from demon score
|- |3: Add demon points : 0-1
|Adds 999999 points to demon score
|- |4: Use selected soldier in all cutscenes and missions : Off, On
|Lets you be able to play the Mother Base soldier you're playing with in
cutscenes. |- |5: Appearance menu |

<table>
<caption>Appearance menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Player type : SNAKE, AVATAR, DD_MALE, DD_FEMALE, OCELOT, QUIET<br />
</p></td>
<td><p>Change main player type. WARNING: Ocelot and Quiet player types have side effect when used due to trying to work around them being restricted to FOB. The Pause menu will be disabled and the game may hit an infinite load if you complete a mission while they are used. Use nexusmods.com/metalgearsolidvtpp/mods/518 by BobDoleOwndU to fix sound issues with using these player types.<br />
</p></td>
</tr>
<tr class="even">
<td><p>2: Suit type : <Suits for player type><br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: Camo type : <Camos for player type><br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: Headgear : <Headgear for DD type><br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: Filter faces : Show all, Headgear (cosmetic), Unique, Head fova mods<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>6: Face : <Face Id for player type and face filter></p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>7: Print face info : 0-1<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>8: Print appearance info : 0-1<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>9: Form Variation menu</p></td>
<td><p>- Form Variation support for player models (requires model swap to support it), the fova system is how the game shows and hides sub-models.</p>
<table>
<caption>Form Variation menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Use selected fova : Off, On</p></td>
</tr>
<tr class="even">
<td><p>2: <Character model description> : <Fova selection></p></td>
</tr>
<tr class="odd">
<td><p>3: Print current body info : 0-1</p></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

|}
{| class="article-table mw-collapsible mw-collapsed" |+ 13: Progression
menu \!Option:Setting(s) \!Description |- |1: Resource scale menu |

<table>
<caption>Resource scale menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Enable resource amount scales : Off, On</p></td>
<td><p>Enables the resource scale options that scale the amount of resources when gathered (material case resources, containers, diamonds, plants)</p></td>
</tr>
<tr class="even">
<td><p>2: Material case scale : 10-1000%<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: Plant scale : 10-1000%<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: Poster scale : 10-1000%<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: Diamond scale : 10-1000%<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>6: Container scale : 10-1000%<br />
</p></td>
<td></td>
</tr>
</tbody>
</table>

|- |2: Repopulate music tape radios : Off, On | |- |3: Unlock playable
avatar : 0-1 |Unlock avatar before mission 46 |- |4: Unlock weapon
customization : 0-1 |Unlock without having to complete legendary
gunsmith missions |- |5: Reset Paz state to beginning : 0-1 |Resets the
Paz states to the beginning. |- |6: Return Quiet after mission 45 : 0-1
|Instantly return Quiet, runs same code as the Reunion mission 11
replay. |- |7: showQuietReunionMissionCount : 0-1 | |}
{| class="article-table mw-collapsible mw-collapsed" |+ 14: Side ops
menu \!Option:Setting(s) \!Description |- |1: Reroll sideops selection :
0-1
| |- |2: Open specific sideop \# : 0-157
| |- |3: Unlock Sideops mode : Off, Force Replayable, Force Open
|Lets you force story and one-time sideops to be replayable, and open
sideops before the usual progression.
|- |4: Sideop selection mode : Default (first found), Random,
Story/unique, Extract interpreter, Secure blueprint, Extract
highly-skilled soldier, Prisoner extraction, Capture animals, Extract
wandering Mother Base soldier, Unlucky Dog, Eliminate heavy infantry,
Mine clearing, Eliminate armored vehicle unit, Extract legendary
gunsmith, Eliminate tank unit, Eliminate wandering puppets, Addon
sideop
|Sideops are broken into areas to stop overlap, this setting lets you
control the choice of sideop within the area. Random - picks a random
sideop for the sideop area, the other modes choose a random sideop of
the specic sideop category. Also see the Sideops category filter menu.
|- |5: Sideops category filter menu
|Filters selection of sideops per category, Sideop selection mode will
override this.

<table>
<caption>Sideops category filter menu</caption>
<thead>
<tr class="header">
<th><p>Option:Setting(s)</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1: Story/unique : Off, On</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>2: Extract interpreter : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>3: Secure blueprint : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>4: Extract highly-skilled soldier : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>5: Prisoner extraction : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>6: Capture animals : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>7: Extract wandering Mother Base soldier : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>8: Unlucky Dog : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>9: Eliminate heavy infantry : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>10: Mine clearing : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>11: Eliminate the armored vehicle unit : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>12: Extract the Legendary Gunsmith : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>13: Eliminate tank unit : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>14: Eliminate wandering puppets : Off, On<br />
</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>15: Target practice : Off, On<br />
</p></td>
<td></td>
</tr>
</tbody>
</table>

|- |6: Show all open sideops : Off, On
|Shows all open sideops in sideop list, this mostly affects open but not
yet completed sideops from hiding others. There is however a limit of
192 entries for the sideop list, so some will be randomly dropped from
the list.
|- |7: Force enable enemy heli reinforce (disable heli sideops) : Off,
On
| |- |8: Include add-on sideops in completion percentage : Off, On
| |}
{| class="article-table mw-collapsible mw-collapsed" |+ 15: Soldier
parameters menu \!Option:Setting(s) \!Description |- |1: Enable soldier
parameter settings : Off, On |Turn this on to enable the following enemy
param options, turn this off if you have another mod that modifies
Soldier2ParameterTables.lua (ie Hardcore mod).
|- |2: Soldier life scale : 0-900%
|0% will kill off all enemies
|- |3: Soldier sight scale : 0-400%
|A rough scale over all the soldier sight distances, except for night
sight distance, use the command 'Print sight param table (look in iDroid
Log\>All tab)' to see exact values.
|- |4: Soldier night sight scale : 0-400%
|Changes the percentage of how good the soldiers can see you in dark. |-
|5: Soldier hearing distance scale : 0-400%
|Changes the percentage of how far/close the soldiers can hear you. |-
|6: Soldier item drop chance : 0-100%
|Chance soldier will drop an item when eliminated.
|- |7: Print health param table (look in iDroid Log\>All tab) : 0-1
| |- |8: Print sight param table (look in iDroid Log\>All tab) : 0-1
| |- |9: Print hearing distance table (look in iDroid Log\>All tab) :
0-1
| |}
{| class="article-table mw-collapsible mw-collapsed" |+ 16: Support heli
menu \!Option:Setting(s) \!Description |- |1: Disable support heli
attack : Off, On |Stops support heli from engaging targets.
|- |2: Set heli invincible : Off, On
|Prevents the heli from getting damage. |- |3: Force searchlight :
Default, Off, On
| |- |4: Disable pull-out : Off, On
|Prevents heli from leaving when you jump on-board, so you can use the
gun from a stationary position, or just change your mind and jump out
again. Press <STANCE> while in the heli to get it to pull-out again (or
use menu). NOTE: Disable pull-out will prevent the mother base helitaxi
selection menu, press <STANCE> to re-enable or use the mod menu.
|- |5: Set LZ wait height : 5-50
|Set the height at which the heli hovers in wait mode (not landing
mode).
|- |6: Mission start time till open door : 0-120
|Time from mission start to you opening the door to sit on the side. You
can set this lower or 0 to do it immediately, or longer to ride the heli
in first person. Press <STANCE> to manually open the door.
|- |7: Disable landing zones : Off, Assault, Regular
|Disables Assault Landing Zones (those usually in the center of a base
that the support heli will circle before landing), or all LZs but
Assault LZs
|- |8: Start free roam on foot : Off, All but assault LZs, All LZs
|Skips the helicopter scene. |- |9: Start missions on foot : Off, All
but assault LZs, All LZs
|Skips the helicopter scene. |- |10: Start Mother base on foot : Off,
All but assault LZs, All LZs |Skips the helicopter scene. |}
{| class="article-table mw-collapsible mw-collapsed" |+ 17: Time scale
menu \!Option:Setting(s) \!Description |- |1: Toggle TSM : 0-1 |Lets you
manually toggle Time scale mode that's usually used for Reflex/CQC.
|- |2: TSM length (seconds) : 0-1000
|The time in seconds of the TSM
|- |3: TSM world time scale : 0-100
|Time scale of the world, including soldiers/vehicles during TSM
|- |4: TSM player time scale : 0-100
|Time scale of the player during TSM
|- |5: No screen effect : Off, On
|Does not apply the dust and blur effect while TSM is active.
|- |6: Clock time scale : 1-10000
|Changes the time scale of the day/night/weather system. Does not change
the speed of soldiers like the cigar does. Lower for closer to real
time, higher for faster.
|- |7: Set clock time : 00
|Changes the clock in-game. |}

### In-mission menu

###### Soon to be added



## Troubleshooting Procedures

``` apt_sources
Troubleshooting:

Check the FAQ Known Issues document first.

If you have issues with Snakebite try the suggestions on the stickied post on the snakebite nexus posts.

For other issues can you please provide the following files to help me test:

Your save game that's at the point it's having issues.
The save files are in:
<steam path>\userdata\<user id>\311340\remote
(Default install path of steam is C:\Program Files\Steam)

Usually TPP_GAME_DATA alone is sufficient.

Some files from the MGS_TPP game folder (usually in Steam\SteamApps\common):

snakebite.xml from the MGS_TPP folder.

The entire MGS_TPP\mod folder (as this contains the ih_save as well as debug logs).

If you need a place to upload mega.co.nz works well, as does dropbox.
You can message me the link if you wish.

'Infinite Heaven: Could not load modules from MGS_TPP\mod\' error:
If you get this message shortly after startup
Make sure your game folder is actually named MGS_TPP.
Try running mgsvtpp as Administrator.
Try copying the mod folder to C:\mod, after running the game again open ih_log.txt from the mod folder and message me the log.

After you have done so there's a couple of things you can try:

Abort to ACC from title:
At the title screen hold down the Escape key for a couple of seconds, the Fox logo will flash up breifly, upon selecting continue the game will load into ACC instead of the mission the save was on.

Clear IH settings completely:
Exit the game and delete MGS_TPP\mod\saves\ih_save.lua

Resetting from scratch:
1: Pressing the 'Restore original game files' button in snakebites settings page.
2: Verifying game cache through the properties for the game in steam.
3: Delete the entire MGS_TPP\mod (you may want to copy off the ih_save.lua in MGs\mod\saves first)
At this point MGSV will be considered unmodded, but verify by loading the game.

Re-rerun snakebite and go through it's steps.
Again test to see if the game loads.

Install Infinite Heaven only.
Test again to see if the issue still occurs.

If the game save is in-mission and not in ACC you may need to Abort to ACC from title (see above).
```

Information provided by TinMaxTex

| Problem                                                | Technical details                                                            | Solution                                                                                                                                                                                                                                                           |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cannot install mod with Snakebite                      | [thumb|143.994x143.994px](/File:IFXUHRX.jpg "wikilink")                      | This may be a problem with the Snakebite installation/User not backing up files. The easiest solution is to back up your saves, uninstall Snakebite, Uninstall MGSV and delete all data from MGS_TPP. Reinstall the game and make sure to back up all game files. |
| Cannot uninstall or install mods                       | [thumb|204.98x204.98px](/File:111pture.PNG "wikilink")                       | MGSV Still running in the background. Force kill with task manager or restart computer.                                                                                                                                                                            |
| IHExt overlay won't work                               |                                                                              | set IHExt.exe (located in MGS_TPP/mod/) to always run in administrator.                                                                                                                                                                                           |
| Player model turning invisible - unable to move        | This may not be an issue with IH. This could be a conflict between fova mods | Return to ACC, shut down the game, and check for mod conflicts with Snakebite.                                                                                                                                                                                     |
| Repeating cutscenes when returning to MB               | MB Cutscenes mode set to: Default or Play Selected                           | Disable MB cutscenes.                                                                                                                                                                                                                                              |
| Driving between clusters on MB results in freeze/crash | Conflict between mods and MB settings in IH                                  | Minimize mod conflicts and reset IH settings.                                                                                                                                                                                                                      |
| Emblem Keeps Resetting                                 | This is caused by booting the game offline with IH settings                  | Disable this option and play Online, emblem will update.                                                                                                                                                                                                           |

Troubleshooting Chart