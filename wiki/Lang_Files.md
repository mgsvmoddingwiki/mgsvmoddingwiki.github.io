---
title: Lang Files
permalink: /Lang_Files/
tags: [Lang]
---

lng/lng2 files aka lang files are lists of strings used for localization
of text, mainly used for UI.

Mostly found in
Assets\\tpp\\pack\\ui\\lang\\lang_default_data_<language>.fpk

Language codes - eng,fre,ger,ita,jpn,por,rus,spa

lng/lng2 files be converted to and from editable xml files using
[LangTool](/LangTool "wikilink") alongside a lang_dictionary that
recovers the langIds.

The converted lng2 xml localization string entries will look like:

<Entry Key="4191827342" Value="Soviet Soldier" />

<code><Entry LangId="announce_get_gravure" Color="5" Value="Obtained Poster [%s] [GMP +%d]" />
</code>

The Key is a StrCode32 of the lua key string, most commonly refereed to
at langId in the lua scripts.

The second entry langId actually resolves from key_poster_3500, but
was omitted from the dictionary for this example.

Localization strings support string formatting characters, in the above
entries seen as %s for another langId, %d for a number.

What it will accept however seems dependent on the function.
AnnounceLogViewLangId will only accept the string, number, or two
numbers as it's parameters, other combinations lock the game up.

Evidence from other localization strings in lng2 files suggest other
functions are less restricted.

Lua usage:

`TppUICommand.AnnounceLogViewLangId("announce_get_gravure","key_poster_3500",500)`

If a langId is called without a matching entry in the particular
language lang file it will return empty.

Fox engine will load all lng2 files from a pack enabling addition of
completely new .lng2 files.

The following is a partial list of lng2 files and an explanation of what
they are:

File: lang_default_data_eng.fpk

\- mb_staff_name

List of all possible Mother Base Staff codenames. Split into "firstname
lastname" entries for unique staff such as Silent Basilisk, Doom
Kangaroo and Laughing Wallaby, and two sets of random generator staff
name for first, then last codenames, for each gender.

\- tpp_announce_log

List of all the text that goes into the Log tab of the idroid (All the
messages displayed on the left hand side of the screen during gameplay).
Includes, but not limited to: Buddy status messages, FOB status messages
(espionage points), obtaining/developing equipment messages, Diamond
Dogs Unit level increases and decreases, Platform construction heroism
points messages, etc, etc.

\- tpp_cassette

Contains all info tape titles ("Afghanistan Today \[3\]"),
in-game/licensed music tape titles ("MGO Trailer Music") and
ambient/collectable tape titles ("Quiet's Humming")

\-tpp_cast_staff

Contains the names displayed during the opening mission credits roll.
("Benedict "Kazuhira" Miller", ""SKULLS" Parasite Unit").

\- tpp_common

Catch-all for many different things, both UI and game-world such as:

Title of the bases/outposts when viewing them in the idroid map or
entering them in-game

Unit Suitability dialog in Staff Management. Info dialog about each
Unit's function and staff skills (troublemaker, etc).

"DMG", "ZZZ", "SMK" text, as well as weapon type, attachments, ammo
types and grenade type text. Also vehicle descriptions too. Generally
alot of the sortie prep text is here.

Resource names, for materials and plants.

\- tpp_dialog

Contains the text for the pop-up dialog and confirmation boxes players
will encounter. Platform/item development confirmation boxes,
reassigning staff dialog boxes, etc.

\- tpp_emblem

Contains a list of all the names of the emblems when creating a new
emblem.

\- tpp_gmp_mission

Contains all text for dispatch mission types. Both the short "outpost
defense" and "plants gathering" ones, and the "main"/riskier dispatch
missions, including long description text for them.

\- tpp_hud

Contains the hud text items when playing missions or in free-roam.
Includes Buddy/Interrogation actions (and long text descriptions of the
actions), compass directions, commencing/stopping side ops/FOB alert
text and long text descriptions of licensed songs.

\- tpp_item

Contains a list of every single developable item and its long text
description, as well as Key Items, Photos and Blueprint names. Uniforms,
buddy equipment are all here, as are the Codenames attained during
mission completion.

\- tpp_mb

Contains Motherbase Staff assignment text, all the buddy markers text
(Quiet, D-Dog, D-Horse) and idroid map text ("Enemy Predicted FOM"),
including intel/d-dog finds such as Cassette Tapes, Trucks, Materials,
etc. Also includes the text for the tape player, and some FOB help text.
Of note is the log_speaker and marker_chara entries, which define what
text will appear when certain characters' actions get put into the
Idroid's Log tab.

\-tpp_menu

Contains the descriptions for the Options menu settings, Game Over
screen text. Mother Base staff assignment/reassignment and Unit levels
and lots and lots of the idroid text descriptions for resupply, buddy
drop points and menu text for the idroid itself/sub-menus of the idroid.

\-tpp_mission

Contains all main mission text from the "Missions" tab of the idroid.
Mission name, mission description and all mission tasks are listed here.

\- tpp_quest

Contains all side-ops text from the "Side-ops" tab of the idroid.
Mission name and mission description are listed here.

\- tpp_record

Contains all the text for the "Records" tab of the idroid.

\- tpp_tips

Lists the title of all the tips displayed in the pause or loading screen
menus.

\- tpp_tutorial

Tutorial text (toggleable from the Options menu). short in-game text
prompts for open/close idroid, first aid, climb up/down ladder, etc.

\- tpp_weapon

Contains a list of every developable gun and its long text description
is here. This includes throwable explosives, deployable decoys/mines and
grenade/rocket launchers too, along with ammo types and the special
characteristics ("Live round conversion (Attack Type: Lethal)").
Suppressors are here too along with their durability rating, as are the
various scope and barrel attachments.

Lngs in Assets\\lang\\ui:

\-tpp_database:

Contains all descriptions of Key Items, Photos and Codenames in the
database.
