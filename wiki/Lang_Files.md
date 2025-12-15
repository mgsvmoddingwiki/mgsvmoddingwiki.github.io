---
title: Lang Files
permalink: /Lang_Files/
tags: [Lang]
---

Lng/lng2 files aka lang files are lists of strings used for localization
of text, mainly used for UI.

Mostly found in `Assets\tpp\pack\ui\lang\lang_default_data_<language>.fpk`

{% include spoiler-start title="Lang fpk list (english)" %}

```
0/00.dat/Assets/tpp/pack/ui/lang/lang_default_data_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_challenge_task_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_emblem_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_event_item_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_fob_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_parts_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_ps3_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_ps4_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_stm_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_x36_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_xb1_eng.fpk
0/00.dat/Assets/tpp/pack/ui/lang/lang_tpp_tips_info_eng.fpk

chunk0.dat/Assets/tpp/pack/ui/lang/lang_default_data_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_database_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_emblem_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_fob_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_mbhelp_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_mbhelp_fob_cstm_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_parts_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_ps3_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_ps4_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_stm_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_x36_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_system_xb1_eng.fpk
chunk0.dat/Assets/tpp/pack/ui/lang/lang_tpp_tips_info_eng.fpk
```

{% include spoiler-end %}

Remember, `00.dat` takes priority over chunk files.

Fox Engine will load **all** lng2 files from a pack (fpk) enabling addition of
completely new .lng2 files.

### Language codes

List of language codes:

| code | name |
|---|---|
| 00 | jpn |
| 01 | eng |
| 02 | fre |
| 03 | ita |
| 04 | ger |
| 05 | spa |
| 06 | por |
| 07 | rus |
| 08 | ara (tpp, unused) |
| 09 | cht (survive) |
| 10 | kor (survive) |

### Converting

lng/lng2 files can be converted to and from editable xml files using
[LangTool](/LangTool).  Alternatively, [datfpk](https://github.com/unknown321/datfpk)
can be used for the same purpose.

The converted lng2 xml localization string entries will look like:

```xml
<Entry Key="4191827342" Value="Soviet Soldier" />
<Entry LangId="announce_get_gravure" Color="5" Value="Obtained Poster [%s] [GMP +%d]" />
```

Key is a `Fox.StrCode32` hash of the lua key string, most commonly refereed to
at langId in the lua scripts. It will be replaced by `LangId` if there is a matching entry
in LangTool dictionary (4191827342 resolves to `key_poster_3500`).

Color is...?

### String formatting

Localization strings support string formatting characters, in the above
entries seen as `%s` for another langId, `%d` for a number.

What it will accept however seems dependent on the function.
AnnounceLogViewLangId will only accept the string, number, or two
numbers as its parameters, other combinations may lock the game up.
Evidence from other localization strings in lng2 files suggest other
functions are less restricted.

### Lua usage

```lua
TppUiCommand.AnnounceLogViewLangId("announce_get_gravure", "key_poster_3500", 500)
TppUiCommand.ShowPopup("key_poster_3500", Popup.TYPE_ONE_BUTTON)
```

If a langId is called without a matching entry in the particular
language lang file it will return empty string.

### Lng2 file notes

The following is a partial list of lng2 files and an explanation of what
they are:

#### lang_default_data_eng.fpk

| name | note |
|---|---|
| mb_staff_name | List of all possible Mother Base Staff codenames. Split into "firstname lastname" entries for unique staff such as Silent Basilisk, Doom Kangaroo and Laughing Wallaby, and two sets of random generator staff name for first, then last codenames, for each gender. |
| tpp_announce_log | List of all the text that goes into the Log tab of the iDroid (All the messages displayed on the left hand side of the screen during gameplay). Includes, but not limited to: Buddy status messages, FOB status messages (espionage points), obtaining/developing equipment messages, Diamond Dogs Unit level increases and decreases, Platform construction heroism points messages, etc, etc. |
| tpp_cassette | Contains all info tape titles ("Afghanistan Today \[3\]"), in-game/licensed music tape titles ("MGO Trailer Music") and ambient/collectable tape titles ("Quiet's Humming") |
| tpp_cast_staff | Contains the names displayed during the opening mission credits roll. ("Benedict "Kazuhira" Miller", ""SKULLS" Parasite Unit"). |
| tpp_common | Catch-all for many different things, both UI and game-world such as:<br>- Title of the bases/outposts when viewing them in the iDroid map or entering them in-game<br>- Unit Suitability dialog in Staff Management<br>- Info dialog about each Unit's function and staff skills (troublemaker, etc)<br>- "DMG", "ZZZ", "SMK" text, as well as weapon type, attachments, ammo types and grenade type text<br>- Vehicle descriptions<br>- Resource names, for materials and plants<br><br>Generally a lot of the sortie prep text is here |
| tpp_dialog | Contains the text for the pop-up dialog and confirmation boxes players will encounter. Platform/item development confirmation boxes, reassigning staff dialog boxes, etc. |
| tpp_emblem | Contains a list of all the names of the emblems when creating a new emblem. |
| tpp_gmp_mission | Contains all text for dispatch mission types. Both the short "outpost defense" and "plants gathering" ones, and the "main"/riskier dispatch missions, including long description text for them. |
| tpp_hud | Contains the hud text items when playing missions or in free-roam. Includes Buddy/Interrogation actions (and long text descriptions of the actions), compass directions, commencing/stopping side ops/FOB alert text and long text descriptions of licensed songs. |
| tpp_item | Contains a list of every single developable item and its long text description, as well as Key Items, Photos and Blueprint names. Uniforms, buddy equipment are all here, as are the Codenames attained during mission completion. |
| tpp_mb | Contains Motherbase Staff assignment text, all the buddy markers text (Quiet, D-Dog, D-Horse) and iDroid map text ("Enemy Predicted FOM"), including intel/d-dog finds such as Cassette Tapes, Trucks, Materials, etc. Also includes the text for the tape player, and some FOB help text. Of note is the log_speaker and marker_chara entries, which define what text will appear when certain characters' actions get put into the iDroid's Log tab. |
| tpp_menu | Contains the descriptions for the Options menu settings, Game Over screen text. Mother Base staff assignment/reassignment and Unit levels and lots and lots of the iDroid text descriptions for resupply, buddy drop points and menu text for the iDroid itself/sub-menus of the iDroid. |
| tpp_mission | Contains all main mission text from the "Missions" tab of the iDroid. Mission name, mission description and all mission tasks are listed here. |
| tpp_quest | Contains all side-ops text from the "Side-ops" tab of the iDroid. Mission name and mission description are listed here. |
| tpp_record | Contains all the text for the "Records" tab of the iDroid. |
| tpp_tips | Lists the title of all the tips displayed in the pause or loading screen menus. |
| tpp_tutorial | Tutorial text (toggleable from the Options menu). short in-game text prompts for open/close iDroid, first aid, climb up/down ladder, etc. |
| tpp_weapon | Contains a list of every developable gun and its long text description is here. This includes throwable explosives, deployable decoys/mines and grenade/rocket launchers too, along with ammo types and the special characteristics ("Live round conversion (Attack Type: Lethal)"). Suppressors are here too along with their durability rating, as are the various scope and barrel attachments. |

#### Lngs in Assets\\lang\\ui:

| name | note |
|---|---|
| tpp_database | Contains all descriptions of Key Items, Photos and Codenames in the database. |

### Mod examples

  - [Arabic localization](https://www.nexusmods.com/metalgearsolidvtpp/mods/2224)
