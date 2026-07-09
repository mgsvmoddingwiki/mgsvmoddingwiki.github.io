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
CallConversation or other with a label string, making the specified in-game
character play a voice clip part, with the option for the character to play
unique body or face animations while doing so. The format is Little-Endian on PC, meaning
bytes are written in reverse order of significance.

These files can be decompiled and compiled with
[SpchTool](https://github.com/kapuragu/SpchTool) into XML files.

## Header

`0x00-0x03 - "spch" signature`

`0x04-0x05 - 00 on PC, 01 on PS3`

`0x06-0x07 - (uint16) Amount of sequences in the file`

`0x08-0x0F - Padding - 8 bytes of padding per label. Pointer space?`

## Sequence definition

`0x00-0x03 - (uint32) StrCode32 hash of the sequence's label name`

`0x04-0x07 - (uint32) FNV132 hash of the Dynamic Dialogue Voice Event name from the soundbanks`

`0x08-0x0B - (uint32) Number of voice clip parts in this sequence`

The Voice Event name hashes can be found inside the HIRC sections of
.sbp soundbank files, separated into HIRC.dat if extracted by
SecaProject's SBP_Tool. The Voice Event is always followed up by
0x6402, and the Voice Ids used in the label are usually from the same
list specified here. Sometimes, the Voice Event in the label entry
definition is null, specifically in CpRadioSeqCommon.spch.

In Wwise, the Voice Event parameter will be the name of your custom Dynamic Dialogue event. You can have only one per seequence.

### Part entry

`0x00-0x03 - (uint32) StrCode32 of the speaker's voice type`

`0x04-0x07 - (uint32) FNV132 hash of the "condition" Voice Parameter from the .sbp soundbanks `

`0x08-0x0B - (uint32) StrCode32 hash of the body action animation`

`0x0C-0x0F - (uint32) StrCode32 hash of the facial animation`

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

In Wwise, the "chara" state in your related Dynamic Dialogue event will be decided based on the speaker hash.
The "condition" state will be the exact string value of the Voice Parameter given in the .spch part entry.

Animation act ids for each entity are listed in Metal Gear Solid V's
.exe, as Little-Endian StrCode32 hashes.

## SpchTool Usage

With [SpchTool](https://github.com/kapuragu/SpchTool), it's possible to
edit .spch files by decompiling them into simpler XML documents and
compiling them back. However, values from .sbp soundbanks still have to
be acquired manually.

Decompiled label entries are represented like this:

``` xml
<sequence label="CTF0000_0030" voiceEvent="dd_vox_ene_conversation_gz">
  <part speaker="ene_b" voiceParam="ctg0010_0030" action="Greeting" facial="greet" intervalNext="0.5" />
  <part speaker="ene_b" voiceParam="ctf0000_0030_1" action="1081228083" intervalNext="3" />
  <part speaker="ene_c" voiceParam="ctf0000_0030_2" action="Relax" />
  <part speaker="ene_b" voiceParam="ctf0000_0030_3" action="AskQuestion" facial="chuckle" intervalNext="3" />
  <part speaker="ene_c" voiceParam="ctf0000_0030_4" />
  <part speaker="ene_b" voiceParam="ctf0000_0030_5" action="Conversation2" facial="smile" intervalNext="3" />
  <part speaker="ene_c" voiceParam="ctf0000_0030_6" action="Watch" facial="storm_lp" />
  <part speaker="ene_b" voiceParam="ctf0000_0030_7" action="GiveOrder" facial="desperate" />
  <part speaker="ene_c" voiceParam="ctf0000_0030_8" action="Damn" facial="irritated" />
</sequence>
```

The labels are be used by Lua [Commands](/Commands "wikilink")
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

||||
| - | - | - |
| hash | description | string |
| `104983832` | None | `None` |

|||||
| - | - | - | - |
||Loop actions|||
| hash | description | video | string | GZ hash |
| `3029125695` | Talking with a bit of shaking | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Conversation1.webm" type="video/webm"></video> | `Conversation1` | `12150073685120` |
| `2357847038` | Tilting head around all smug | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Conversation2.webm" type="video/webm"></video> | `Conversation2` | `188287345343957` |
| `2653120201` | Saluting (doesn't always work?) || `Salute` ||

|||||
| - | - | - | - |
||Single actions|||
| hash | description | video | string | GZ hash |
| `19913283` | Looking at watch | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Watch.webm" type="video/webm"></video> | `Watch` ||
| `3471431647` | Wiping face | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Sweat.webm" type="video/webm"></video> | `Sweat` ||
| `3935815178` | Yawning | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Yawn.webm" type="video/webm"></video> | `Yawn` ||
| `1484142220` | Sneeze | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Sneezing.webm" type="video/webm"></video> | `Sneezing` ||
| `1081954141` | Looking at feet while stepping in place | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Stamping.webm" type="video/webm"></video> | `Stamping` ||
| `1004728074` | Cough | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Coughing.webm" type="video/webm"></video> | `Coughing` ||
| `3632669033` | Scratches head | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/ScratchHead.webm" type="video/webm"></video> | `ScratchHead` ||
| `4066632199` | Stepping left | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/4066632199.webm" type="video/webm"></video> | TBA ||
| `1351632722` | Stepping right | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/1351632722.webm" type="video/webm"></video> | TBA ||
| `1606603300` | Wiping brow/eyes | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/1606603300.webm" type="video/webm"></video> | TBA ||
| `1017266580` | Small right shoulder bump | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/AskQuestion.webm" type="video/webm"></video> | `AskQuestion` | `53671881156558` |
| `1350228116` | Pointing with left hand | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/GiveOrder.webm" type="video/webm"></video> | `GiveOrder` | `136070209132692` |
| `508960638` | Shaking left and right, disagreeing, saying no | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/508960638.webm" type="video/webm"></video> | TBA | `14066526855038` |
| `3575825406` | Point away, to the left | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/GiveWarning.webm" type="video/webm"></video> | `GiveWarning` | `172297093532226` |
| `1421134289` | Aggressive nodding, agreeing | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/1421134289.webm" type="video/webm"></video> | TBA | `51841676397009` |
| `828605126` | Spooked by something to the left | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/828605126.webm" type="video/webm"></video> | TBA ||
| `2975103228` | Spooked by something to the right | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/2975103228.webm" type="video/webm"></video> | TBA ||
| `213441558` | Directing someone with left arm pointing, direction is random | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/213441558.webm" type="video/webm"></video> | TBA ||
| `544521629` | Saying hi to someone, with right hand. Direction is random! | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/544521629.webm" type="video/webm"></video> | TBA | `128312361409558` |
| `1873952626` | Telling to come closer, left arm | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/HandSignCome.webm" type="video/webm"></video> | `HandSignCome` ||
| `1715719024` | Stern point with left hand finger | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/HandSignGo.webm" type="video/webm"></video> | `HandSignGo` ||
| `1081228083` | Telling a prisoner to get down | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/1081228083.webm" type="video/webm"></video> | TBA ||
| `2834988863` | Telling a prisoner to get up, left arm | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/2834988863.webm" type="video/webm"></video> | TBA ||
| `1334263530` | Walks around from the right, kicking the prisoner in the back | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/1334263530.webm" type="video/webm"></video> | TBA ||
| `584751270` | Hitting to stomach with gun | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/AttackToStomach.webm" type="video/webm"></video> | `AttackToStomach` ||
| `3434724606` | Hitting in the head | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/AttackToHead.webm" type="video/webm"></video> | `AttackToHead` ||
| `3982806036` | Greeting with left hand raised up | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Greeting.webm" type="video/webm"></video> | `Greeting` ||
| `2573116818` | Frustrated fist | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Damn.webm" type="video/webm"></video> | `Damn` ||
| `3249773322` | Looking around | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Caution1.webm" type="video/webm"></video> | `Caution1` ||
| `393714603` | Looking around, more exaggerated | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Caution2.webm" type="video/webm"></video> | `Caution2` ||
| `911835617` | Moving curtain? Doesn't work (not used in .spch files) || `CurtainIn` ||
| `500855846` | Moving curtain? Doesn't work (not used in .spch files) || `CurtainOut` ||
| `3672734274` | Looking behind and signalling to cease fire | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/CeaseFire.webm" type="video/webm"></video> | `CeaseFire` ||
| `1155425596` | Repositioning, more tame | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Idly.webm" type="video/webm"></video> | | `Idly` ||
| `2267025732` | Resting gun on neck | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/Relax.webm" type="video/webm"></video> | `Relax` ||
| `767686818` | Noticing with hand that it's raining. Not used in .spch | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/NoticeRain.webm" type="video/webm"></video> | `NoticeRain` ||
| `2857040360` | Seeing a comrade hanging on a balloon. Not used in .spch | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/DiscoveryFultonRecovered.webm" type="video/webm"></video> | `DiscoveryFultonRecovered` ||
| `2643791617` | Aggressively kicking the ground. Child idle | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/2643791617.webm" type="video/webm"></video> | TBA ||
| `2114182719` | Spinning left arm like a windmill. Child idle | <video width="213" height="160" controls><source src="/assets/tpp/gm/soldier/action/2114182719.webm" type="video/webm"></video> | TBA ||
| `859906857` | Doesn't work (not used in .spch) | | `Surprise` ||

||||
| - | - | - |
||Single actions||
| hash | description | string |
||Ocelot||
| `3628252758` | Not in .exe but is in .spch. Idle | `ocelot_a` |
| `779601008` | Speaking, gesturing | `ocelot_b` |
| `3655687608` | Not used in vanilla .spch files | `ocelot_aa` |
| `2931446809` | Speaking, gesturing | `ocelot_c` |
| `3879139826` | Ditto | `ocelot_d` |
| `1994854644` | Ditto | `ocelot_e` |
| `3541609199` | Ditto | `ocelot_f` |
| `2289914935` | Ditto | `ocelot_g` |
| `3423893682` | Pulls an item out from back and hands it over (not used in vanilla .spch) | `ocelot_h` |
| `773709529` | Provokes into attacking him (unused) | `ocelot_prv_a` |
| `1714642760` | Provokes into attacking him (unused)| `ocelot_prv_b` |
| `3844657989` | Provokes into attacking him (unused) | `ocelot_prv_c` |
| `631594499` | Ocelot takes something from the other character and disarms it. | `ocelot_cqc` |
| `3574747766` | Ocelot waves goodbye to leaving helicopter (not used in vanilla .spch, but used by lua) | `ocelot_go_heli` |

||||
| - | - | - |
||Skull Face||
| hash | description | string |
| `3601388065` | "Torn from my elders, I was made to speak their language."  | `skullface_vcl_b` |
| `3641692078` | "He and the codes he chose as basis for control." | `skullface_vcl_c` |
| `1600328193` | "As one born into this world, he's afflicted." | `skullface_vcl_d` |
| `1178727191` | "To unite America and the entire world." | `skullface_vcl_e` |
| `1122450761` | "I was invaded by words, burrowing and breeding inside me." | `skullface_vcl_f` |
| `3694604647` | "All that's left is the future." | `skullface_vcl_g` |
| `3090331193` | "Words are... peculiar." | `skullface_vcl_h` |
| `2814632016` | Looking left behind. | `skullface_ba` |
| `2421159727` | Looking left behind. Warning player | `skullface_ba_m` |
| `2204356204` | Looking up | `skullface_bb` |
| `203039143` | Looking left behind, both hands on chest. "I've known you since your time at Langley." | `skullface_ea` |
| `649209146` | TBA | `skullface_ea_m` |
| `376561994` | Looking left behind, left hand on heart. | `skullface_eb` |
| `2148314896` | TBA | `skullface_eb_m` |
| `3817661764` | Both hands on self. "America is a country of liberty." | `skullface_fa` |
| `1461113096` | Right hand on chest. "Their roots are varied. Diverse." | `skullface_fb` |
| `273417305` | Looking left behind, right hand gesture. | `skullface_c` |
| `782495120` | TBA | `skullface_c_m` |
| `3996600343` | Right hand gesture. | `skullface_d` |
| `4256214378` | Right hand gesture to the side. "I'd like to... redirect it." | `skullface_g` |
| `1628554459` | Right hand first up gesture. "Cipher." | `skullface_h` |
| `1131812723` | Right hand sweeping gesture upward. "The idea that every citizen would use free will to unite behind their country..." | `skullface_ia` |
| `1447724063` | Both hands sweeping gesture. "His goal was an organization dedicated solely - covertly - to supporting America." | `skullface_ib` |
| `421208123` | Slowly shaking head left and right. "With it, our futures became - more or less - set in stone." | `skullface_j` |
| `4267069497` | Right hand on heart, looking down left and right. "To him, it was mourning - the loss of his friend." | `skullface_k` |
| `3159482895` | Looking left behind, right hand pointing. | `skullface_l` |
| `825112619` | Looking left behind, right hand pointing. "And then the Major came to me with an idea." | `skullface_l_m` |
| `16500010` | Right hand pointing. "America's never been made up of just one people." | `skullface_m` |
| `3810783117` | Walking back and to the side, his left, gesturing you to go first. Unused. | `skullface_n` |
| `4087604842` | TBA | `skullface_n_m` |
| `1051725899` | Looking right, gesturing to come along. Warning player. | `skullface_o_r` |
| `789922051` | TBA | `skullface_o_r_m` |
| `2331924788` | Looking left, gesturing to come along. Warning player. | `skullface_o_l` |
| `2017981767` | TBA | `skullface_o_l_m` |

||||
| - | - | - |
||Prisoners||
| hash | description | string |
| `4075576870` | Dead idle, after 4 days have passed | `kaz_dead` |
| `679773368` | Unused, lua uses a filepath | `volgin_dead` |
| `4290341734` | exe, TBA | TBA |
| `1914717017` | exe, TBA | TBA |
| `3270076323` | exe, TBA | TBA |
| `3792277781` | exe, TBA | TBA |
| `2740470963` | exe, TBA | TBA |

||||
| - | - | - |
||Paz||
| hash | description | string |
| `809469417` | Used in .spch | TBA |
| `693517848` | Used in .spch | TBA |

||||
| - | - | - |
||Mantis||
| hash | description | string |
| `4574962` | exe, TBA | TBA |

||||
| - | - | - |
||Mob||
| hash | description | string |
| `2429334541` | exe, TBA | TBA |
| `1370767770` | exe, TBA | TBA |

|||||
| - | - | - | - |
||GZ|||
| hash | description | string | GZ hash |
| TBA | talking with small bit of shake | TBA | `227858136100581` |
| TBA | right hand "give" gesture | TBA | `228398145069710` |
| TBA | intense tilting right arm point at the eyes | TBA | `228777436589485` |
| TBA | quick left hand "salute" greeting gesture | TBA | `272450800457580` |
| TBA | quick nod, few small nods | TBA | `98579340013771` |

## Facial animation dictionary

This part of .spch is entirely unused, but it works perfectly well in custom .spch files. This uses a facial animation to play under the lip sync animation of the voice clip.

||||
|-|-|-|
|hash|desc|string|
||||
|`4273958362`|Closed eyes, gritted teeth (restraint?)|`chork_lp`|
|`906448398`||`quest_lp`|
|`4185159514`|Wide gritted teeth and frown in pain, furrowed brow|`dying_lp`|
|`875969379`||`hold_lp`|
|`2413225066`||`sleepy_st`|
|`2370764116`||`sleepy`|
|`534101553`||`sleepy_ed`|
|`3637848969`|Closed eyes, low open mouth|`sleep_lp`|
|`942521988`|Furrowed brow, mouth open with disgust|`storm_lp`|
|`2004836561`|Furrowed brow, slightly open frown|`radio_n_lp`|
|`1270273108`|Furrowed brow, low open mouth|`radio_t_lp`|
|`4189128720`||`normal`|
|`3540382066`||`relax`|
|`670785982`||`smoke_st`|
|`1602722026`||`smoke_lp`|
|`450841444`|Mouth open as if blowing out smoke|`smoke_ed`|
|`995823487`|Gritted teeth, closed eyes|`damage_l`|
|`1659817747`||`damage_h`|
|`1177901058`|Mouth hanging open, eyelids drooping|`faint`|
|`3893246598`||`greet`|
|`1225486477`|Open mouth, lifted eyebrows|`surprise`|
|`223061766`||`surprise_big`|
|`1401225578`|Gritted teeth|`desperate`|
|`2432373368`|Furrowed brow, low open mouth|`suspects`|
|`2333752989`||`prick`|
|`472678494`|Open mouth, eyes rolled up and somewhat open|`dead`|
|`2020921055`|Furrowed brow, open mouth frown|`dazzle`|
|`2147014128`||`irritated`|
|`4233967713`|Open-mouth laugh smile|`smile`|
|`105229588`|Smirk|`chuckle`|

![Facial animation key frames](/assets/tpp/gm/soldier/facial/facial_collage.png)

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
||||Transmission cut short.||
|`367198950`|`cp`|`CPR0200`|CP|Patrol, what's wrong? Come in, patrol!|
