---
title: SPCH
permalink: /SPCH/
tags: [File Formats, Sound]
---

**SPCH**, or Speech Data, is a format used in Metal Gear Solid V: The
Phantom Pain to make in-game characters speak specified voice clips,
either in enemy soldier conversations, prisoner carrying monologues or
unique story characters' monologues. It functions when called by
[commands](/Commands) CallVoice, CallMonologue, CallRadio,
CallConversation or other with a label, making the specified in-game
character play a voice clip, with an option for the character to play
unique animations while doing so. The format is Little-Endian, meaning
bytes are written in reverse order of significance.

These files can be decompiled and compiled with
[SpchTool](https://github.com/kapuragu/SpchTool) into XML files.

## Header

`0x00-0x03 - "spch"`
`0x04-0x05 - Padding`
`0x06-0x07 - (uint16) Amount of labels in the file`
`0x08-0x0F - Padding - 0x07 bytes of padding per label.`

## Label entry definition

`0x00-0x03 - (uint32) StrCode32 hash of the label's name`
`0x04-0x07 - (uint32) FNV132 hash of the Voice Event name from the soundbanks`
`0x08 - (uint8) Number of voice clip entries in this label`
`0x09 - 0x0B - Padding`

The Voice Event name hashes can be found inside the HIRC sections of
.sbp soundbank files, separated into HIRC.dat if extracted by
SecaProject's SBP_Tool. The Voice Event is always followed up by
0x6402, and the Voice Ids used in the label are usually from the same
list specified here. Sometimes, the Voice Event in the label entry
definition is null, specifically in CpRadioSeqCommon.spch.

### Voice clip entry

`0x00-0x03 - (uint32) StrCode32 of the speaker's voice type`
`0x04-0x07 - (uint32) FNV132 hash of the Voice Id from the .sbp soundbanks `
`0x08-0x0B - (uint32) StrCode32 hash of animation act`
`0x0C-0x0F - Padding?`
`0x10-0x13 - (float) Pause before the next voice clip is played, in seconds`

As previously mentioned, the Voice Id can be found in a list in the HIRC
sections of .sbp soundbank files, after the label entry definition's
Voice Event. The entries in the list are separated with 0x32006400. The
first four bytes of the entry are the Voice Id, and the other is HIRC
object name to another much earlier object where .wem sound file names
(as extracted by SecaProject's SBP_Tool) are usually listed twice in a
row, of course, in Little-Endian, twelve bytes after the link mentioned
in the Voice Ids, however this manual method of locating sound files'
Voice Ids doesn't always apply.

Animation act ids for each entity are listed in Metal Gear Solid V's
.exe, as Little-Endian StrCode32 hashes.

## SpchTool Usage

With [SpchTool](https://github.com/kapuragu/SpchTool), it's possible to
edit .spch files by decompiling them into simpler XML documents and
compiling them back. However, values from .sbp soundbanks still have to
be acquired manually.

Decompiled label entries are represented like this:

``` xml
  <label labelName="CT10041_03c" sbpListId="3445964925">
    <voiceClip voiceType="ene_a" sbpVoiceClipId="585221331" animationAct="0" beforePause="0" afterPause="0" />
    <voiceClip voiceType="ene_a" sbpVoiceClipId="585221330" animationAct="0" beforePause="0" afterPause="0" />
    <voiceClip voiceType="ene_c" sbpVoiceClipId="585221341" animationAct="0" beforePause="0" afterPause="0" />
    <voiceClip voiceType="ene_a" sbpVoiceClipId="585221340" animationAct="0" beforePause="0" afterPause="0" />
    <voiceClip voiceType="ene_a" sbpVoiceClipId="568443746" animationAct="0" beforePause="0" afterPause="0" />
  </label>
```

The labelName are be used by Lua [Commands](/Commands "wikilink")
`RequestRadio`, `CallRadio`, `CallMonologue` and `CallConversation`, and
with some cases like CP radio conversations, by the .exe. Sometimes
they're hashed in StrCode32. The sbpListId FNV132 hash can be found in
.sbp files' HIRC section. You can divide .sbp into .wem files and data
sections with SecaProject's
[SBP_Tool](https://github.com/secaproject/SBP_tool). From there, you'll
need to find the hash in hexadecimal Little-Endian format on top of
arrays at the bottom of the HIRC section, and they're usually followed
up by the bytes `64 02`. In CpRadioSeqCommon.spch, this is not
specified, as the voiceType is not specified either.

The voiceClip entries will all be played in order, and the soldier first
listed will begin the conversation, the second one will be the "friend"
specified by CallConversation, and any more will be the third parties in
given order. The voiceType will specify which voice the soldier should
use, however CpRadioSeqCommon.spch only specifies soldiers as `enemy` to
make it open to what voiceType should be used based on what the
soldier's voiceType already is. The sbpVoiceClipId FNV132 hash can be
found in the .sbp files' HIRC section, in the arrays at the end, which
area headed by the sbpListId used in the label, and there they are
paired with values that can also be found in a much earlier section in
the HIRC section with eight bytes after them, names of the .wem sound
files written twice in a row. However, this doesn't always apply. The
animationAct is the name or hash of the animation the speaker will play
- there's descriptions and names of them later down this page. The
afterPause is a float value representing how many seconds long the pause
between the end of the current voiceClip and the start of the next one
will be. The beforePause value is never used in-game, and it might
possibly not be the inverse of afterPause.

## Voice type dictionary

This is a list of some voice types that can be used by SPCH files.

|                              |                                                           |                 |
| ---------------------------- | --------------------------------------------------------- | --------------- |
| Little-Endian StrCode32 hash | Description                                               | Unhashed String |
| `B0 1A C1 B1`                | Ishmael                                                   | `Ishmael`       |
| `9A 80 67 BC`                | Ocelot                                                    | `ocelot`        |
| `86 2B 2D 96`                | Miller                                                    | `miller`        |
| `1E FA 8B 4C`                | Paz                                                       | `paz`           |
| `19 D4 CC 09`                | Code Talker                                               | `codetalker`    |
| `9B DE 82 52`                | Skull Face                                                | `skullface`     |
| `93 85 B1 BF`                | Huey                                                      | `huey`          |
| `2B 29 F3 BF`                | POW(English)A                                             | `hostage_a`     |
| `8F AE 91 6C`                | POW(English)B                                             | `hostage_b`     |
| `30 FA 15 20`                | POW(English)C                                             | `hostage_c`     |
| `43 1D C5 7E`                | POW(English)D                                             | `hostage_d`     |
| `B4 86 C3 3E`                | Female POW(English)A                                      | `hostage_a_fml` |
| `ad a5 5f f6`                | Female POW(English)B                                      | `hostage_b_fml` |
| `82 5c ee 9c`                | Female POW(English)C                                      | `hostage_c_fml` |
| `49 84 27 aa`                | Female POW(English)D                                      | `hostage_d_fml` |
| `9C AF 9F BA`                | POW(Russian)A                                             | `hostage_a_ru`  |
| `1b 0f 29 07`                | POW(Russian)B                                             | `hostage_b_ru`  |
| `15 ed 0c fb`                | POW(Afrikaans)A                                           | `hostage_a_af`  |
| `c8 03 91 07`                | POW(Afrikaans)B                                           | `hostage_b_af`  |
| `B1 F0 DA 7A`                | POW(Pashto)A                                              | `hostage_a_ps`  |
| `91 5b 16 d7`                | POW(Pashto)B                                              | `hostage_b_ps`  |
| `7e c4 8c f1`                | POW(Kikongo)A                                             | `hostage_a_kg`  |
| `C9 B1 C9 8D`                | POW(Kikongo)B                                             | `hostage_b_kg`  |
| `2C 8A F4 DA`                | Enemy A (Language is autoassigned if applicable)          | `ene_a`         |
| `83 A1 C2 77`                | Enemy B (Language is autoassigned if applicable)          | `ene_b`         |
| `88 BA D9 43`                | Enemy C (Language is autoassigned if applicable)          | `ene_c`         |
| `D8 66 AC 61`                | Enemy D (Language is autoassigned if applicable)          | `ene_d`         |
| `EC EF 8C D5`                | Female DD Soldier A                                       | `ene_a_fml`     |
| `52 9D 43 5C`                | Female DD Soldier B                                       | `ene_b_fml`     |
| `36 64 CB 9C`                | Female DD Soldier C                                       | `ene_c_fml`     |
| `8b 51 eb a9`                | Female DD Soldier D                                       | `ene_d_fml`     |
| `8D 3C A9 B8`                | Child Soldier A                                           | `chsol_a`       |
| `52 9D 43 5C`                | Child Soldier B                                           | `chsol_b`       |
| `36 64 CB 9C`                | Child Soldier C                                           | `chsol_c`       |
| `68 7F 0D 37`                | Child Soldier D                                           | `chsol_d`       |
| `57 BF 86 8E`                | Enemy (Voice and language are autoassigned if applicable) | `enemy`         |
| `9D FB 79 DB`                | CP (Language is autoassigned if applicable)               | `cp`            |
| `95 3B C4 B0`                | HQ (Language is autoassigned if applicable)               | `hq`            |

## Animation act dictionary

This is a list of some animation act ids that can be used by SPCH files.

|                       |                                                                                         |                            |
| --------------------- | --------------------------------------------------------------------------------------- | -------------------------- |
| StrCode32 Hash as int | Description                                                                             | Unhashed String            |
| `104983832`           | None                                                                                    | `None`                     |
| `2653120201`          | Saluting                                                                                | `Salute`                   |
| `19913283`            | Looking at watch                                                                        | `Watch`                    |
| `3471431647`          | Wiping face                                                                             | `Sweat`                    |
| `3935815178`          | Yawn                                                                                    | `Yawn`                     |
| `1484142220`          | Sneeze (not used in vanilla .spch files)                                                | `Sneezing`                 |
| `1081954141`          | Foot step (looking at feet while stepping in place a bit)                               | TBA                        |
| `1004728074`          | Cough (not used in vanilla .spch files)                                                 | `Coughing`                 |
| `3632669033`          | Scratch head                                                                            | `ScratchHead`              |
| `4066632199`          | Repositioning self by about half a meter and back, to the left                          | TBA                        |
| `1351632722`          | Repositioning self by about half a meter and back, to the right                         | TBA                        |
| `1606603300`          | Wiping brow/eyes (sandstorm reaction?)                                                  | TBA                        |
| `1017266580`          | TBA                                                                                     | TBA                        |
| `1350228116`          | Pointing                                                                                | TBA                        |
| `508960638`           | TBA                                                                                     | TBA                        |
| `3575825406`          | Point away, to the left                                                                 | `GiveWarning`              |
| `1421134289`          | Aggressive nodding, agreeing                                                            | TBA                        |
| `828605126`           | Spooked by something to the left                                                        | TBA                        |
| `2975103228`          | Spooked by something to the right                                                       | TBA                        |
| `213441558`           | Directing someone with left arm palm and wide gesture, to the left                      | TBA                        |
| `544521629`           | Saying hi to someone to the right, with right hand                                      | TBA                        |
| `1873952626`          | Telling the other to come closer, wide gesture, left arm                                | TBA                        |
| `1715719024`          | TBA                                                                                     | TBA                        |
| `1081228083`          | "Get up" motion                                                                         | TBA                        |
| `2834988863`          | Telling the other to come closer, close and shorter gesture, left arm                   | TBA                        |
| `1334263530`          | Walks around the other, from the right, kicking the spoken to prisoner in the back      | TBA                        |
| `584751270`           | Hitting the kneeling prisoner with the barrel of gun, then looks down at him            | TBA                        |
| `3434724606`          | Hitting with barrel of rifle, prisoner standing on knees reacts                         | `AttackToHead`             |
| `3982806036`          | Greeting with left hand raised up in the air                                            | `Greeting`                 |
| `2573116818`          | Frustrated "damn\!" fist motion, caution-y                                              | TBA                        |
| `3249773322`          | Caution looking around                                                                  | TBA                        |
| `393714603`           | Caution looking around, more exaggerated body movement, left and right                  | TBA                        |
| `911835617`           | Moving curtain (not used in vanilla .spch files)                                        | `CurtainIn`                |
| `500855846`           | Moving curtain (not used in vanilla .spch files)                                        | `CurtainOut`               |
| `3672734274`          | Cautiony, looking behind and aggresively waving to people behind him                    | TBA                        |
| `1155425596`          | Repositioning self, much more relaxed and tamer                                         | TBA                        |
| `2267025732`          | Relaxed, resting gun on neck                                                            | `Relax`                    |
| `767686818`           | Reacting to rain (not used in vanilla .spch files)                                      | `NoticeRain`               |
| `2857040360`          | Looking at comrade hanging by fulton balloon (not used in vanilla .spch files)          | `DiscoveryFultonRecovered` |
| `2643791617`          | Aggressively kicking the ground, relaxed otherwise                                      | TBA                        |
| `2114182719`          | Spinning left arm like a windmill (Part of the LookWatch cycle for child soldiers)      | TBA                        |
| `859906857`           | TBA (not used in vanilla .spch files)                                                   | `Surprise`                 |
| `3029125695`          | TBA                                                                                     | TBA                        |
| `2357847038`          | TBA                                                                                     | TBA                        |
| `3628252758`          | Ocelot animation                                                                        | `ocelot_a`                 |
| `3655687608`          | Ocelot animation (not used in vanilla .spch files)                                      | `ocelot_aa`                |
| `779601008`           | Ocelot animation                                                                        | `ocelot_b`                 |
| `2931446809`          | Ocelot animation                                                                        | `ocelot_c`                 |
| `631594499`           | Ocelot takes something from the other character and disarms it.                         | `ocelot_cqc`               |
| `3879139826`          | Ocelot animation                                                                        | `ocelot_d`                 |
| `1994854644`          | Ocelot animation                                                                        | `ocelot_e`                 |
| `3541609199`          | Ocelot animation                                                                        | `ocelot_f`                 |
| `2289914935`          | Ocelot animation                                                                        | `ocelot_g`                 |
| `3574747766`          | Ocelot waves goodbye to leaving helicopter (not used in vanilla .spch, but used by lua) | `ocelot_go_heli`           |
| `3423893682`          | Ocelot animation (not used in vanilla .spch)                                            | `ocelot_h`                 |

## Radio callsign param wildcards

These are the values used in the .exe to stand in for the callsign voice clips during radio communcation speech labels.

||||||
|-|-|-|-|-|
|uint|chara|voiceId|desc|text|
||||||
||||Normal phase||
||||(1) Start (Call for attention & self-identification): ||
|`78712560`|`cp`|`CSN0100`|CP > Soldier|Patrol, this is CP.|
|`2386932356`|`enemy`|`CSN0100`|Soldier > CP|CP, this is patrol.|
|`87327801`|`cp`|`CSN0110`|CP > Soldier|All fireteams, this is CP.|
|`3931792783`|`cp`|`HSN0010`|CP→HQ|HQ, this is CP.|
|`676881547`|`hq`|`HSN0011`|HQ→CP|CP, this is HQ.|
|`646808857`|`hq`|`HSN0012`|HQ→CP|All bases, this is HQ.|
||||(2) Start (Self-identification, copy): ||
|`1987888591`|`cp`|`CSN0200`|CP|This is CP - understood.|
|`702674820`|`enemy`|`CSN0200`|Soldier|This is patrol, copy.|
||||(3) Start (No "this is," copy): ||
|`2262682492`|`cp`|`CSN0300`|CP|CP - understood.|
|`3809894425`|`enemy`|`CSN0300`|Soldier|Patrol copies.|
|`2525393500`|`hq`|`HSN0013`|HQ|HQ copies.|
||||(4) End (continues, requesting response): ||
|`1434401699`|`cp`|`CEN0010`|CP|Over.|
|`3622427360`|`enemy`|`CEN0010`|Soldier|Over.|
|`1286612739`|`hq`|`HEN0010`|HQ|Over.|
||||(5) End (finishing, ending conversation)||
|`932012133`|`cp`|`CEN0020`|CP|Out.|
|`3388597016`|`enemy`|`CEN0020`|Soldier|Out.|
|`3953815365`|`hq`|`HEN0020`|HQ|Out.|
||||||
||||Caution phase||
||||(1) Start (Call for attention & self-identification): ||
|`6190386`|`cp`|`CSC0100`|CP > Soldier|Patrol, this is CP!|
|`1774348542`|`enemy`|`CSC0100`|Soldier > CP|CP, this is patrol!|
|`2458855629`|`cp`|`CSC0110`|CP > Soldier|All fireteams, this is CP!|
|`70191719`|`cp`|`HSC0010`|CP→HQ|HQ, HQ, this is CP!|
|`2140409707`|`hq`|`HSC0011`|HQ→CP|CP, this is HQ!|
|`2321717165`|`hq`|`HSC0012`|HQ→CP|All bases, this is HQ!|
||||(2) Start (Self-identification, copy): ||
|`2558089895`|`cp`|`CSC0200`|CP|This is CP - understood!|
|`1623394302`|`enemy`|`CSC0200`|Soldier|This is patrol, copy!|
||||(3) Start (No "this is," copy): ||
|`2720577430`|`cp`|`CSC0300`|CP|CP - understood!|
|`1439914157`|`enemy`|`CSC0300`|Soldier|Patrol copies!|
|`1437954934`|`hq`|`HSC0013`|HQ|HQ copies!|
||||(4) End (continues, requesting response): ||
|`348583075`|`cp`|`CEC0010`|CP|Over!|
|`854076898`|`enemy`|`CEC0010`|Soldier|Over!|
|`1372754819`|`hq`|`HEC0010`|HQ|Over!|
||||(5) End (finishing, ending conversation)||
|`3551973937`|`cp`|`CEC0020`|CP|Out!|
|`442391802`|`enemy`|`CEC0020`|Soldier|Out!|
|`662546577`|`hq`|`HEC0020`|HQ|Out!|
||||||
||||Alert phase||
||||(1) Start (Call for attention & self-identification): ||
|`2872943061`|`cp`|`CSA0100`|CP > Soldier|Patrol, this is CP!!|
|`3495247209`|`enemy`|`CSA0100`|Soldier > CP|CP, CP, this is patrol!!|
|`2907562658`|`cp`|`CSA0110`|CP > Soldier|All fireteams, this is CP!|
||||(2) Start (Self-identification, copy): ||
|`3385565124`|`cp`|`CSA0200`|CP|This is CP - understood!!|
|`2521236585`|`enemy`|`CSA0200`|Soldier|This is patrol, copy!!|
||||(3) Start (No "this is," copy): ||
|`2901637249`|`cp`|`CSA0300`|CP|CP - understood!!|
|`1609925378`|`enemy`|`CSA0300`|Soldier|Patrol copies!!|
||||(4) End (continues, requesting response): ||
|`1213215976`|`cp`|`CEA0010`|CP|Over!!|
|`3434381957`|`enemy`|`CEA0010`|Soldier|Over!!|
||||(5) End (finishing, ending conversation)||
|`365330910`|`cp`|`CEA0020`|CP|Out!!|
|`884595133`|`enemy`|`CEA0020`|Soldier|Out!!|
||||||
||||Reactions to radio trooper being shot during transmission, cutting it short.||
|`367198950`|`cp`|`CPR0200`|CP|Patrol, what's wrong? Come in, patrol!|
