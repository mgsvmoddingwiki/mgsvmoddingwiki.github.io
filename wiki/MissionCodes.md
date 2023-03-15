---
title: MissionCodes
permalink: /MissionCodes/
tags: [Missions, Reference]
---

## Overview

MissionCodes or missionIds are used in MGSV to identify missions in .lua
and file names. Main missions fall into 6 main categories in 10k ranges.

  - Story: 10k
  - Extra: 20k
  - Free: 30k
  - Heli: 40k
  - Online: 50k
  - Shows/Select: 60k

The missionCode is seemingly stored as an unsigned short integer, so it
runs out at its max value. Hard story missions (extreme, total stealth,
subsistence) have a mission code 1k higher than the original mission.

## Specific mission codes

See also [Custom Missions List](/Custom_Missions_List "wikilink")

### System mission codes

  - 1 : Init
  - 5 : Title

### Free mission codes

  - 30010: Northern Kabul, Afghanistan
  - 30020: Angola-Zaire Border Region, Central Africa
  - 30050: Mother Base, Seychelles Waters
  - 30051: Mother Base MissionPackLabel "DemoStage" *(Not used as an
    actual mission code)*
  - 30150: Mother Base, Seychelles Waters - Animal Conservation Platform
  - 30250: Mother Base, Seychelles Waters - Quarantine Facility Interior

### ACC mission codes

  - 40010: Northern Kabul, Afghanistan
  - 40020: Angola-Zaire Border Region, Central Africa
  - 40050: Mother Base, Seychelles Waters
  - 40060: Helispace *(This and the location HLSP don't exist in the
    game's data except for several mentions)*

### Online

  - 50050: FOB
  - 50055: FOB *(Seemingly not used as an actual mission code, but used
    in the name of additional files for 50050.)*

### Shows/Select

  - 60000: Select
  - 65020 : E3 2014, Afghanistan
  - 65030 : E3 2014, Mother Base
  - 65050 : E3 2014
  - 65060 : TGS 2014, Africa
  - 65414 : gamescom 2014
  - 65415 : TGS 2014
  - 65416 : TGS 2014

## Sequence mission codes

### The Phantom Pain main ops

From TppUIBootInit.lua \>
TppUiCommand.RegistMissionEpisodeNo(missionCode,episodeNumber)

  - 10010 : PROLOGUE: AWAKENING
  - 10020 : Episode 1 - PHANTOM LIMBS
  - 10030 : Episode 2 - DIAMOND DOGS
  - 10036 : Episode 3 - A HERO'S WAY
  - 10043 : Episode 4 - C2W
  - 10033 : Episode 5 - OVER THE FENCE
  - 10040 : Episode 6 - WHERE DO THE BEES SLEEP?
  - 10041 : Episode 7 - RED BRASS
  - 10044 : Episode 8 - OCCUPATION FORCES
  - 10054 : Episode 9 - BACKUP, BACK DOWN
  - 10052 : Episode 10 - ANGEL WITH BROKEN WINGS
  - 10050 : Episode 11 - CLOAKED IN SILENCE
  - 10070 : Episode 12 - HELLBOUND
  - 10080 : Episode 13 - PITCH DARK
  - 10086 : Episode 14 - LINGUA FRANCA
  - 10082 : Episode 15 - FOOTPRINTS OF PHANTOMS
  - 10090 : Episode 16 - TRAITORS' CARAVAN
  - 10091 : Episode 17 - RESCUE THE INTEL AGENTS
  - 10100 : Episode 18 - BLOOD RUNS DEEP
  - 10195 : Episode 19 - ON THE TRAIL
  - 10110 : Episode 20 - VOICES
  - 10121 : Episode 21 - THE WAR ECONOMY
  - 10115 : Episode 22 - RETAKE THE PLATFORM
  - 10120 : Episode 23 - THE WHITE MAMBA
  - 10085 : Episode 24 - CLOSE CONTACT
  - 10200 : Episode 25 - AIM TRUE, YE VENGEFUL
  - 10211 : Episode 26 - HUNTING DOWN
  - 10081 : Episode 27 - ROOT CAUSE
  - 10130 : Episode 28 - CODE TALKER
  - 10140 : Episode 29 - METALLIC ARCHAEA
  - 10150 : Episode 30 - SKULL FACE
  - 10151 : Episode 31 - SAHELANTHROPUS
  - 10045 : Episode 32 - TO KNOW TOO MUCH
  - 11043 : Episode 33 - \[SUBSISTENCE\] C2W
  - 11054 : Episode 34 - \[EXTREME\] BACKUP, BACK DOWN
  - 10093 : Episode 35 - CURSED LEGACY
  - 11082 : Episode 36 - \[TOTAL STEALTH\] FOOTPRINTS OF PHANTOMS
  - 11090 : Episode 37 - \[EXTREME\] TRAITORS' CARAVAN
  - 10156 : Episode 38 - EXTRAORDINARY
  - 11033 : Episode 39 - \[TOTAL STEALTH\] OVER THE FENCE
  - 11050 : Episode 40 - \[EXTREME\] CLOAKED IN SILENCE
  - 10171 : Episode 41 - PROXY WAR WITHOUT END
  - 11140 : Episode 42 - \[EXTREME\] METALLIC ARCHAEA
  - 10240 : Episode 43 - SHINING LIGHTS, EVEN IN DEATH
  - 11080 : Episode 44 - \[TOTAL STEALTH\] PITCH DARK
  - 10260 : Episode 45 - A QUIET EXIT
  - 10280 : Episode 46 - TRUTH: THE MAN WHO SOLD THE WORLD
  - 11121 : Episode 47 - \[TOTAL STEALTH\] THE WAR ECONOMY
  - 11130 : Episode 48 - \[EXTREME\] CODE TALKER
  - 11044 : Episode 49 - \[SUBSISTENCE\] OCCUPATION FORCES
  - 11151 : Episode 50 - \[EXTREME\] SAHELANTHROPUS

### "Missing" Missions

Sources: [Excel
document](https://docs.google.com/spreadsheets/d/1f4PLyHsO4Alo1PFCKqtjN2m90LH4b9Hmq-Mvz_umCDE) *\\Assets\\tpp\\script\\lib\\TppDefine.lua*, *TppStory.lua*

  - 10230: - KINGDOM OF THE FLIES - *(No substantial assets exist at all
    in TPP, not even any langids) *Set in its own eponymous and also
    missing map, *FLYK*.
  - 10034: - Mentioned in TppDefine.lua, set in Afghanistan.
  - 10060: - Mentioned in TppDefine.lua, set in Afghanistan.
  - 10153: - Mentioned in TppDefine.lua, set in Afghanistan.
  - 10154: - Mentioned in TppDefine.lua, set in Middle Africa
  - 10160: - Mentioned in TppDefine.lua, set in Middle Africa. Cassette
    tapes relating to the child soldiers escaping also bear this mission
    code in their names.
  - 10162: - Mentioned in TppDefine.lua, set in Middle Africa.
  - 10164: - Mentioned in TppDefine.lua, set in Afghanistan.
  - 10190: - Cassette tapes relating to Huey's exile bear this mission
    code in their names.
  - 10199: - Mentioned in TppDefine.lua, set in Afghanistan.

### "Missing" Replay Missions

  - 11041: - \[EXTREME\] RED BRASS *(No actual UI title exists.
    Launching the mission via Infinite Heaven works. This applies to
    almost all of the following missing number Extreme missions.)*
  - 11085: - \[EXTREME\] CLOSE CONTACT
  - 11036: - \[EXTREME\] A HERO'S WAY
  - 11091: - \[EXTREME\] RESCUE THE INTEL AGENTS
  - 11195: - \[EXTREME\] ON THE TRAIL
  - 11211: - \[EXTREME\] HUNTING DOWN
  - 11200: - \[EXTREME\] AIM TRUE, YE VENGEFUL
  - 11171: - \[EXTREME\] PROXY WAR WITHOUT END
  - 11115: - \[EXTREME\] RETAKE THE PLATFORM *(Unlike the other missing
    number Extreme missions, is broken - spawns no enemies, among other
    bugs. Caused by the lack of a mention in a function in TppPackList)*
  - 11052: - \[EXTREME\] ANGEL WITH BROKEN WINGS

<!-- end list -->

  - 11070: - \[???\] HELLBOUND - *(This and the following missions only
    have orphaned mentions by missionCode in scripts and don't have
    enough data to be played via Infinite Heaven) *Mentioned in
    TppStory.lua.
  - 11100: - \[???\] BLOOD RUNS DEEP - Mentioned in TppStory.lua.
  - 11110: - \[???\] VOICES - Mentioned in TppStory.lua.
  - 11150: - \[???\] SKULL FACE - Mentioned in TppStory.lua.
  - 11230: - \[???\] KINGDOM OF THE FLIES - Mentioned in TppStory.lua.
  - 11240: - \[???\] SHINING LIGHTS, EVEN IN DEATH - Mentioned in
    TppStory.lua.
  - 11260: - \[???\] A QUIET EXIT - Mentioned in TppStory.lua.
  - 11280: - \[???\] TRUTH: THE MAN WHO SOLD THE WORLD - Mentioned in
    TppStory.lua.

### Ground Zeroes/Extra

  - 20000: Title Screen
  - 20001: Installation Screen
  - 20010: GROUND ZEROES
  - 20015: GROUND ZEROES Ending
  - 20020: Eliminate the Renegade Threat
  - 20030: Classified Intel Acquisition
  - 20040: Intel Operative Rescue
  - 20050: Destroy the Anti-Air Emplacements
  - 20060: Déjà-Vu
  - 20070: Jamais Vu

### Survive Missions

  - 10010: Prologue
  - 10035: First battle with The Lord of Dust
  - 10050: Battle against Seth
  - 10060: Ending

## Side Ops/Quests

Sideops also have numeric ids separate from missionCodes. Side ops fall
into 9 main categories in 10k ranges.

  - Infantry extraction/elimination: 10k
  - Rescue: 20k
  - Animal: 30k
  - MB or container: 40k
  - Vehicle elimination: 50k
  - Mines or keyitem: 60k
  - Wandering Puppets: 70k
  - Wandering MSF soldier: 80k
  - Story or Gunsmith: 90k

## Side Op ids

See also: [Custom Side-Ops List](/Custom_Side-Ops_List "wikilink")

From tpp_quest.eng.lng2 \> name_\[q\]questId LangId format (e.g.
name_q10010)

### Infantry extraction/elimination

  - 10010 : Extract the Highly-Skilled Soldier 01
  - 10020 : Extract the Highly-Skilled Soldier 02
  - 10080 : Extract the Highly-Skilled Soldier 03
  - 10050 : Extract the Highly-Skilled Soldier 04
  - 10040 : Extract the Highly-Skilled Soldier 05
  - 10060 : Extract the Highly-Skilled Soldier 06
  - 10200 : Extract the Highly-Skilled Soldier 07
  - 10100 : Extract the Highly-Skilled Soldier 08
  - 10300 : Extract the Highly-Skilled Soldier 09
  - 10500 : Extract the Highly-Skilled Soldier 10
  - 10400 : Extract the Highly-Skilled Soldier 11
  - 10600 : Extract the Highly-Skilled Soldier 12
  - 10030 : Extract the Highly-Skilled Soldier 13
  - 10070 : Extract the Highly-Skilled Soldier 14
  - 10700 : Extract the Highly-Skilled Soldier 15
  - 10090 : Extract the Highly-Skilled Soldier 16

<!-- end list -->

  - 11010 : Eliminate the Heavy Infantry 01
  - 11020 : Eliminate the Heavy Infantry 02
  - 11030 : Eliminate the Heavy Infantry 03
  - 11040 : Eliminate the Heavy Infantry 04
  - 11400 : Eliminate the Heavy Infantry 05
  - 11200 : Eliminate the Heavy Infantry 06
  - 11080 : Eliminate the Heavy Infantry 07
  - 11060 : Eliminate the Heavy Infantry 08
  - 11090 : Eliminate the Heavy Infantry 09
  - 11600 : Eliminate the Heavy Infantry 10
  - 11050 : Eliminate the Heavy Infantry 11
  - 11500 : Eliminate the Heavy Infantry 12
  - 11300 : Eliminate the Heavy Infantry 13
  - 11700 : Eliminate the Heavy Infantry 14
  - 11070 : Eliminate the Heavy Infantry 15
  - 11100 : Eliminate the Heavy Infantry 16

<!-- end list -->

  - 19010 : Extract Interpreter (Russian)
  - 19011 : Extract Interpreter (Afrikaans)
  - 19012 : Extract Interpreter (Kikongo)
  - 19013 : Extract Interpreter (Pashto)

### Rescue

  - 20015 : Unlucky Dog 01
  - 20085 : Unlucky Dog 02
  - 20205 : Unlucky Dog 03
  - 20705 : Unlucky Dog 04
  - 20095 : Unlucky Dog 05

<!-- end list -->

  - 20065 : Prisoner Extraction 01
  - 20025 : Prisoner Extraction 02
  - 20075 : Prisoner Extraction 03
  - 20805 : Prisoner Extraction 04
  - 20905 : Prisoner Extraction 05
  - 20305 : Prisoner Extraction 06
  - 20035 : Prisoner Extraction 07
  - 23005 : Prisoner Extraction 08
  - 20045 : Prisoner Extraction 09
  - 21005 : Prisoner Extraction 10
  - 20105 : Prisoner Extraction 11
  - 24005 : Prisoner Extraction 12
  - 20505 : Prisoner Extraction 13
  - 20605 : Prisoner Extraction 14
  - 25005 : Prisoner Extraction 15
  - 27005 : Prisoner Extraction 16
  - 26005 : Prisoner Extraction 17
  - 20055 : Prisoner Extraction 18
  - 22005 : Prisoner Extraction 19
  - 20405 : Prisoner Extraction 20

<!-- end list -->

  - 20913 : Search for the Escaped Children 01
  - 20914 : Search for the Escaped Children 02
  - 20912 : Search for the Escaped Children 03
  - 20910 : Search for the Escaped Children 04
  - 20911 : Search for the Escaped Children 05

### Animal extraction

  - 30010 : Extract the Little Lost Sheep
  - 39010 : Capture the Legendary Brown Bear
  - 39011 : Capture the Legendary Ibis
  - 39012 : Capture the Legendary Jackal

### Target practice or container extraction

  - 40010 : Extract Materials Containers

<!-- end list -->

  - 42010 : Target Practice (Command Platform)
  - 42020 : Target Practice (R\&D Platform)
  - 42030 : Target Practice (Support Unit Platform)
  - 42040 : Target Practice (Base Development Platform)
  - 42050 : Target Practice (Medical Platform)
  - 42060 : Target Practice (Intel Team Platform)
  - 42070 : Target Practice (Combat Unit Platform)

### Vehicle elimination

  - 52030 : Eliminate the Armored Vehicle Unit 01
  - 52010 : Eliminate the Armored Vehicle Unit 02
  - 52040 : Eliminate the Armored Vehicle Unit 03
  - 52020 : Eliminate the Armored Vehicle Unit 04
  - 52050 : Eliminate the Armored Vehicle Unit 05
  - 52070 : Eliminate the Armored Vehicle Unit 06
  - 52060 : Eliminate the Armored Vehicle Unit 07
  - 52080 : Eliminate the Armored Vehicle Unit 08
  - 52090 : Eliminate the Armored Vehicle Unit 09
  - 52100 : Eliminate the Armored Vehicle Unit 10
  - 52130 : Eliminate the Armored Vehicle Unit 11
  - 52110 : Eliminate the Armored Vehicle Unit 12
  - 52120 : Eliminate the Armored Vehicle Unit 13
  - 52140 : Eliminate the Armored Vehicle Unit 14

<!-- end list -->

  - 52035 : Eliminate the Tank Unit 01
  - 52025 : Eliminate the Tank Unit 02
  - 52015 : Eliminate the Tank Unit 03
  - 52075 : Eliminate the Tank Unit 04
  - 52065 : Eliminate the Tank Unit 05
  - 52045 : Eliminate the Tank Unit 06
  - 52055 : Eliminate the Tank Unit 07
  - 52095 : Eliminate the Tank Unit 08
  - 52085 : Eliminate the Tank Unit 09
  - 52105 : Eliminate the Tank Unit 10
  - 52135 : Eliminate the Tank Unit 11
  - 52115 : Eliminate the Tank Unit 12
  - 52125 : Eliminate the Tank Unit 13
  - 52145 : Eliminate the Tank Unit 14

<!-- end list -->

  - 52018 : Eliminate the Gunship Unit *(Orphaned lang id)*

### Mine clearing or blueprint extraction

  - 60010 : Mine Clearing 01
  - 60011 : Mine Clearing 02
  - 60024 : Mine Clearing 03
  - 60013 : Mine Clearing 04
  - 60021 : Mine Clearing 05
  - 60020 : Mine Clearing 06
  - 60012 : Mine Clearing 07
  - 60023 : Mine Clearing 08
  - 60014 : Mine Clearing 09
  - 60022 : Mine Clearing 10

<!-- end list -->

  - 60110 : Secure the \[STUN ARM\] Blueprint
  - 60111 : Secure the \[UA-DRONE\] Blueprint
  - 60112 : Secure the \[IR-SENSOR\] Blueprint
  - 60113 : Secure the \[ANTITHEFT DEVICE\] Blueprint
  - 60114 : Secure the \[GUN-CAM DEFENDER\] Blueprint
  - 60115 : Secure the \[RIOT SMG\] Blueprint

### Wandering Puppets

  - 71010 : Eliminate the Wandering Puppets 01
  - 71300 : Eliminate the Wandering Puppets 02
  - 71020 : Eliminate the Wandering Puppets 03
  - 71600 : Eliminate the Wandering Puppets 04
  - 71030 : Eliminate the Wandering Puppets 05
  - 71070 : Eliminate the Wandering Puppets 06
  - 71050 : Eliminate the Wandering Puppets 07
  - 71700 : Eliminate the Wandering Puppets 08
  - 71090 : Eliminate the Wandering Puppets 09
  - 71040 : Eliminate the Wandering Puppets 10
  - 71080 : Eliminate the Wandering Puppets 11
  - 71060 : Eliminate the Wandering Puppets 12
  - 71500 : Eliminate the Wandering Puppets 13
  - 71400 : Eliminate the Wandering Puppets 14
  - 71200 : Eliminate the Wandering Puppets 15

### Wandering MSF soldier

  - 80060 : Extract the Wandering Mother Base Soldiers 01
  - 80020 : Extract the Wandering Mother Base Soldiers 02
  - 80100 : Extract the Wandering Mother Base Soldiers 03
  - 80200 : Extract the Wandering Mother Base Soldiers 04
  - 80600 : Extract the Wandering Mother Base Soldiers 05
  - 80400 : Extract the Wandering Mother Base Soldiers 06
  - 80010 : Extract the Wandering Mother Base Soldiers 07
  - 80700 : Extract the Wandering Mother Base Soldiers 08
  - 80080 : Extract the Wandering Mother Base Soldiers 09
  - 80040 : Extract the Wandering Mother Base Soldiers 10

### Story or Legendary Gunsmith

  - 99010 : Search for the Sniper "Quiet" *(hidden)*
  - 99011 : Visit Quiet
  - 99012 : Secure Quiet

<!-- end list -->

  - 99020 : Make Contact with Emmerich

<!-- end list -->

  - 99030 : Extract the AI Pod

<!-- end list -->

  - 99040 : Secure the Remains of the Man on Fire

<!-- end list -->

  - 99050 : Eli's Challenge

<!-- end list -->

  - 99060 : Curing Paz's Amnesia *(hidden)*

<!-- end list -->

  - 99080 : Intel Agent Extraction

<!-- end list -->

  - 99071 : Extract the Legendary Gunsmith
  - 99070 : Extract the Legendary Gunsmith Again
  - 99072 : Extract the Legendary Gunsmith Yet Again

### Other

  - dummy_car_01: Driver's Ed 01 *(Orphaned, was never even given a
    quest number Info from lang data: "Pass through all the checkpoints
    on the deck of Mother Base within the time limit. Stop a vehicle on
    the starting point to make the markers appear and the training
    begin.")*
  - dummy_car_02: Driver's Ed 02
  - dummy_car_03: Driver's Ed 03

<!-- end list -->

  - mtbs_wait_quiet: ? Never enabled by canOpenQuestChecks. Seems to
    just wake up Quiet when entering her room.
  - mtbs_return_quiet: ? Never enabled by canOpenQuestChecks.
  - Mtbs_child_dog: Puppy DD block on Mother Base's Command platform.
  - Mtbs_ddog_walking: Walking adult DD block on Mother Base's Command
    platform.
  - quest_q101210: Seems to manage a Mother Base conversation between a
    male and a female Diamond Dogs soldier on the Support platform.
  - quest_q101220: Seems to manage a Mother Base conversation between
    two female Diamond Dogs soldiers on the Intel platform.
  - quest_smoking/Mtbs_SmokingSoldierCommand: Seems to manage Mother
    Base smoke break routes on the Command platform.
  - quest_smoking/Mtbs_SmokingSoldierCombat: Seems to manage Mother
    Base smoke break routes on the Combat platform.

## References

TppDefine.lua TppStory.lua

TppUIBootInit.lua

tpp_quest.eng.lng2

xentax

reddit