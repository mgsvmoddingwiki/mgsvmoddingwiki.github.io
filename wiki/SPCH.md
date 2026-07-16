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

| Hash | String | Wwise `chara` state | Description |
|-|-|-|-|
| `2982222512` | `Ishmael` | `Ishmael` | Ishmael |
| `3160899738` | `ocelot` | `ocelot` | Ocelot |
| `2519542662` | `miller` | `miller` | Miller |
| `1284241950` | `paz` | `paz` | Paz |
| `164418585` | `codetalker` | `codetalker` | Code Talker |
| `1384308379` | `skullface` | `skullface` | Skull Face |
| `3216082323` | `huey` | `huey` | Huey |
| `3220384043` | `hostage_a` | `hostage_a` | POW(English)A |
| `1821486735` | `hostage_b` | `hostage_b` | POW(English)B |
| `538311216` | `hostage_c` | `hostage_c` | POW(English)C |
| `2126847299` | `hostage_d` | `hostage_d` | POW(English)D |
| `2203168598` | `hostage_a_fml` | `hostage_a_fml` | Female POW(English)A |
| `4133463469` | `hostage_b_fml` | `hostage_b_fml` | Female POW(English)B |
| `2632866946` | `hostage_c_fml` | `hostage_c_fml` | Female POW(English)C |
| `2854716489` | `hostage_d_fml` | `hostage_d_fml` | Female POW(English)D |
| `3131027356` | `hostage_a_ru` | `hostage_a_ru` | POW(Russian)A |
| `120131355` | `hostage_b_ru` | `hostage_b_ru` | POW(Russian)B |
| `4211928341` | `hostage_a_af` | `hostage_a_af` | POW(Afrikaans)A |
| `126944200` | `hostage_b_af` | `hostage_b_af` | POW(Afrikaans)B |
| `2061168817` | `hostage_a_ps` | `hostage_a_ps` | POW(Pashto)A |
| `3608566673` | `hostage_b_ps` | `hostage_b_ps` | POW(Pashto)B |
| `4052534398` | `hostage_a_kg` | `hostage_a_kg` | POW(Kikongo)A |
| `2378805705` | `hostage_b_kg` | `hostage_b_kg` | POW(Kikongo)B |
| `3673459244` | `ene_a` | `ene_a` | Enemy A (English, male) |
| `2009244035` | `ene_b` | `ene_b` | Enemy B (English, male) |
| `1138342536` | `ene_c` | `ene_c` | Enemy C (English, male) |
| `1638688472` | `ene_d` | `ene_d` | Enemy D (English, male) |
| `3673459244` | `ene_a` | `ene_a_af` | Enemy A (Afrikaans, male) |
| `2009244035` | `ene_b` | `ene_b_af` | Enemy B (Afrikaans, male) |
| `1138342536` | `ene_c` | `ene_c_af` | Enemy C (Afrikaans, male) |
| `1638688472` | `ene_d` | `ene_d_af` | Enemy D (Afrikaans, male) |
| `3673459244` | `ene_a` | `ene_a_ru` | Enemy A (Russian, male) |
| `2009244035` | `ene_b` | `ene_b_ru` | Enemy B (Russian, male) |
| `1138342536` | `ene_c` | `ene_c_ru` | Enemy C (Russian, male) |
| `1638688472` | `ene_d` | `ene_d_ru` | Enemy D (Russian, male) |
| `3582783468` | `ene_a_fml` | `ene_a_fml` | Female DD Soldier A |
| `2995112853` | `ene_b_fml` | `ene_b_fml` | Female DD Soldier B |
| `1474976801` | `ene_c_fml` | `ene_c_fml` | Female DD Soldier C |
| `2850771339` | `ene_d_fml` | `ene_d_fml` | Female DD Soldier D |
| `3098098829` | `chsol_a` | `chsol_a` | Child Soldier A |
| `1547935058` | `chsol_b` | `chsol_b` | Child Soldier B |
| `2630575158` | `chsol_c` | `chsol_c` | Child Soldier C |
| `923631464` | `chsol_d` | `chsol_d` | Child Soldier D |
| `2391195479` | `enemy` | See "ene" | Enemy (Voice/language are autoassigned) |
| `3682204573` | `cp` | `cp_a` | CP (English) |
| `3682204573` | `cp` | `cp_a_af` | CP (Afrikaans) |
| `3682204573` | `cp` | `cp_a_ru` | CP (Russian) |
| `2965650325` | `hq` | `hq_a_af` | HQ (Afrikaans) |
| `2965650325` | `hq` | `hq_a_ru` | HQ (Russian) |

## Actions

This is a list of some animation act ids that can be used by SPCH files.

### Common

| hash | string | description |
| - | - | - |
| `104983832` | `None` | None |

### Loop actions

| hash | string | description | video |
| - | - | - | - |
| `3029125695` | `Conversation1` | Talking with a bit of shaking | <video src="/assets/tpp/gm/soldier/action/Conversation1.webm"></video> |
| `2357847038` | `Conversation2` | Tilting head around all smug | <video src="/assets/tpp/gm/soldier/action/Conversation2.webm"></video> |
| `2653120201`| `Salute` | Saluting (doesn't always work?) ||

### Single actions

| hash | string | description | video |
| - | - | - | - |
| `19913283` | `Watch` | Looking at watch | <video src="/assets/tpp/gm/soldier/action/Watch.webm"></video> |
| `3471431647` | `Sweat` | Wiping face | <video src="/assets/tpp/gm/soldier/action/Sweat.webm"></video> |
| `3935815178` | `Yawn` | Yawning | <video src="/assets/tpp/gm/soldier/action/Yawn.webm"></video> |
| `1484142220` | `Sneezing` | Sneeze | <video src="/assets/tpp/gm/soldier/action/Sneezing.webm"></video> |
| `1081954141` | `Stamping` | Looking at feet while stepping in place | <video src="/assets/tpp/gm/soldier/action/Stamping.webm"></video> |
| `1004728074` | `Coughing` | Cough | <video src="/assets/tpp/gm/soldier/action/Coughing.webm"></video> |
| `3632669033` | `ScratchHead` | Scratches head | <video src="/assets/tpp/gm/soldier/action/ScratchHead.webm"></video> |
| `4066632199` | TBA | Stepping left | <video src="/assets/tpp/gm/soldier/action/4066632199.webm"></video> |
| `1351632722` | TBA | Stepping right | <video src="/assets/tpp/gm/soldier/action/1351632722.webm"></video> |
| `1606603300` | TBA | Wiping brow/eyes | <video src="/assets/tpp/gm/soldier/action/1606603300.webm"></video> |
| `1017266580` | `AskQuestion` | Small right shoulder bump | <video src="/assets/tpp/gm/soldier/action/AskQuestion.webm"></video> |
| `1350228116` | `GiveOrder` | Pointing with left hand | <video src="/assets/tpp/gm/soldier/action/GiveOrder.webm"></video> |
| `508960638` | TBA  | Shaking left and right, disagreeing, saying no | <video src="/assets/tpp/gm/soldier/action/508960638.webm"></video>|
| `3575825406` | `GiveWarning` | Point away, to the left | <video src="/assets/tpp/gm/soldier/action/GiveWarning.webm"></video> |
| `1421134289` | TBA | Aggressive nodding, agreeing | <video src="/assets/tpp/gm/soldier/action/1421134289.webm"></video> |
| `828605126` | TBA | Spooked by something to the left | <video src="/assets/tpp/gm/soldier/action/828605126.webm"></video> |
| `2975103228` | TBA | Spooked by something to the right | <video src="/assets/tpp/gm/soldier/action/2975103228.webm"></video> |
| `213441558` | TBA | Directing someone with left arm pointing, direction is random | <video src="/assets/tpp/gm/soldier/action/213441558.webm"></video> |
| `544521629` | TBA | Saying hi to someone, with right hand. Direction is random! | <video src="/assets/tpp/gm/soldier/action/544521629.webm"></video> |
| `1873952626` | `HandSignCome` | Telling to come closer, left arm | <video src="/assets/tpp/gm/soldier/action/HandSignCome.webm"></video> |
| `1715719024` | `HandSignGo` | Stern point with left hand finger | <video src="/assets/tpp/gm/soldier/action/HandSignGo.webm"></video> |
| `1081228083` | TBA | Telling a prisoner to get down | <video src="/assets/tpp/gm/soldier/action/1081228083.webm"></video> |
| `2834988863` | TBA | Telling a prisoner to get up, left arm | <video src="/assets/tpp/gm/soldier/action/2834988863.webm"></video> |
| `1334263530` | TBA | Walks around from the right, kicking the prisoner in the back | <video src="/assets/tpp/gm/soldier/action/1334263530.webm"></video> |
| `584751270` | `AttackToStomach` | Hitting to stomach with gun | <video src="/assets/tpp/gm/soldier/action/AttackToStomach.webm"></video> |
| `3434724606` | `AttackToHead` | Hitting in the head | <video src="/assets/tpp/gm/soldier/action/AttackToHead.webm"></video> |
| `3982806036` | `Greeting` | Greeting with left hand raised up | <video src="/assets/tpp/gm/soldier/action/Greeting.webm"></video> |
| `2573116818` | `Damn` | Frustrated fist | <video src="/assets/tpp/gm/soldier/action/Damn.webm"></video> |
| `3249773322` | `Caution1` | Looking around | <video src="/assets/tpp/gm/soldier/action/Caution1.webm"></video> |
| `393714603` | `Caution2` | Looking around, more exaggerated | <video src="/assets/tpp/gm/soldier/action/Caution2.webm"></video> |
| `911835617` | `CurtainIn` | Moving curtain? Doesn't work (not used in .spch files) ||
| `500855846` | `CurtainOut` | Moving curtain? Doesn't work (not used in .spch files) ||
| `3672734274` | `CeaseFire` | Looking behind and signalling to cease fire | <video src="/assets/tpp/gm/soldier/action/CeaseFire.webm"></video> |
| `1155425596` | `Idly` | Repositioning, more tame | <video src="/assets/tpp/gm/soldier/action/Idly.webm"></video> |
| `2267025732` | `Relax` | Resting gun on neck | <video src="/assets/tpp/gm/soldier/action/Relax.webm"></video> |
| `767686818` | `NoticeRain` | Noticing with hand that it's raining. Not used in .spch | <video src="/assets/tpp/gm/soldier/action/NoticeRain.webm"></video> |
| `2857040360` | `DiscoveryFultonRecovered` | Seeing a comrade hanging on a balloon. Not used in .spch | <video src="/assets/tpp/gm/soldier/action/DiscoveryFultonRecovered.webm"></video> |
| `2643791617` | TBA | Aggressively kicking the ground. Child idle | <video src="/assets/tpp/gm/soldier/action/2643791617.webm"></video> |
| `2114182719` | TBA | Spinning left arm like a windmill. Child idle | <video src="/assets/tpp/gm/soldier/action/2114182719.webm"></video> |
| `859906857` | `Surprise` | Doesn't work (not used in .spch) ||

### Special character actions

#### Ocelot

| hash | string | description |
| - | - | - |
| `3628252758` | `ocelot_a` | Not in .exe but is in .spch. Idle |
| `779601008` | `ocelot_b` | Speaking, gesturing |
| `3655687608` | `ocelot_aa` | Not used in vanilla .spch files |
| `2931446809` | `ocelot_c` | Speaking, gesturing |
| `3879139826` | `ocelot_d` | Ditto |
| `1994854644` | `ocelot_e` | Ditto |
| `3541609199` | `ocelot_f` | Ditto |
| `2289914935` | `ocelot_g` | Ditto |
| `3423893682` | `ocelot_h` | Pulls an item out from back and hands it over (not used in vanilla .spch) |
| `773709529` | `ocelot_prv_a` | Provokes into attacking him (unused) |
| `1714642760` | `ocelot_prv_b` | Provokes into attacking him (unused) |
| `3844657989` | `ocelot_prv_c` | Provokes into attacking him (unused) |
| `631594499` | `ocelot_cqc` | Ocelot takes something from the other character and disarms it. |
| `3574747766` | `ocelot_go_heli` | Ocelot waves goodbye to leaving helicopter (not used in vanilla .spch, but used by lua) |

#### Skull Face

| hash | string | description |
| - | - | - |
| `3601388065` | `skullface_vcl_b` | "Torn from my elders, I was made to speak their language." |
| `3641692078` | `skullface_vcl_c` | "He and the codes he chose as basis for control." |
| `1600328193` | `skullface_vcl_d` | "As one born into this world, he's afflicted." |
| `1178727191` | `skullface_vcl_e` | "To unite America and the entire world." |
| `1122450761` | `skullface_vcl_f` | "I was invaded by words, burrowing and breeding inside me." |
| `3694604647` | `skullface_vcl_g` | "All that's left is the future." |
| `3090331193` | `skullface_vcl_h` | "Words are... peculiar." |
| `2814632016` | `skullface_ba` | Looking left behind. |
| `2421159727` | `skullface_ba_m` | Looking left behind. Warning player |
| `2204356204` | `skullface_bb` | Looking up |
| `203039143` | `skullface_ea` | Looking left behind, both hands on chest. "I've known you since your time at Langley." |
| `649209146` | `skullface_ea_m` | TBA |
| `376561994` | `skullface_eb` | Looking left behind, left hand on heart. |
| `2148314896` | `skullface_eb_m` | TBA |
| `3817661764` | `skullface_fa` | Both hands on self. "America is a country of liberty." |
| `1461113096` | `skullface_fb` | Right hand on chest. "Their roots are varied. Diverse." |
| `273417305` | `skullface_c` | Looking left behind, right hand gesture. |
| `782495120` | `skullface_c_m` | TBA |
| `3996600343` | `skullface_d` | Right hand gesture. |
| `4256214378` | `skullface_g` | Right hand gesture to the side. "I'd like to... redirect it." |
| `1628554459` | `skullface_h` | Right hand first up gesture. "Cipher." |
| `1131812723` | `skullface_ia` | Right hand sweeping gesture upward. "The idea that every citizen would use free will to unite behind their country..." |
| `1447724063` | `skullface_ib` | Both hands sweeping gesture. "His goal was an organization dedicated solely - covertly - to supporting America." |
| `421208123` | `skullface_j` | Slowly shaking head left and right. "With it, our futures became - more or less - set in stone." |
| `4267069497` | `skullface_k` | Right hand on heart, looking down left and right. "To him, it was mourning - the loss of his friend." |
| `3159482895` | `skullface_l` | Looking left behind, right hand pointing. |
| `825112619` | `skullface_l_m` | Looking left behind, right hand pointing. "And then the Major came to me with an idea." |
| `16500010` | `skullface_m` | Right hand pointing. "America's never been made up of just one people." |
| `3810783117` | `skullface_n` | Walking back and to the side, his left, gesturing you to go first. Unused. |
| `4087604842` | `skullface_n_m` | TBA |
| `1051725899` | `skullface_o_r` | Looking right, gesturing to come along. Warning player. |
| `789922051` | `skullface_o_r_m` | TBA |
| `2331924788` | `skullface_o_l` | Looking left, gesturing to come along. Warning player. |
| `2017981767` | `skullface_o_l_m` | TBA |

#### Prisoners

| hash | string | description |
| - | - | - |
| `4075576870` | `kaz_dead` | Dead idle, after 4 days have passed |
| `679773368` | `volgin_dead` | Unused, lua uses a filepath |
| `4290341734` | TBA | exe, TBA |
| `1914717017` | TBA | exe, TBA |
| `3270076323` | TBA | exe, TBA |
| `3792277781` | TBA | exe, TBA |
| `2740470963` | TBA | exe, TBA |

#### Paz

| hash | string | description |
| - | - | - |
| `809469417` | TBA | Used in .spch |
| `693517848` | TBA | Used in .spch |

#### Mantis

| hash | string | description |
| - | - | - |
| `4574962` | TBA | exe, TBA |

#### Mob

| hash | string | description |
| - | - | - |
| `2429334541` | TBA | exe, TBA |
| `1370767770` | TBA | exe, TBA |

### GZ .mog states

| GZ hash | description | TPP equivalent ||
| - | - | - |
| `12150073685120` | | `Conversation1` |
| `188287345343957` | | `Conversation2` |
| `53671881156558` | | `AskQuestion` |
| `136070209132692` | | `GiveOrder` |
| `14066526855038` | | `508960638` |
| `51841676397009` | | `1421134289` |
| `128312361409558` | | `213441558` |
| `172297093532226` | left hand sign up forward | N/A |
| `227858136100581` | looks like Conversation1 but skipped first second | N/A |
| `228398145069710` | right hand "give" gesture | N/A |
| `228777436589485` | intense tilting right arm point at the eyes | N/A |
| `272450800457580` | quick left hand "salute" greeting gesture | N/A |
| `98579340013771` | quick nod, few small nods | N/A |
| `193206393106895` | right hand sign forward | N/A |

## Facial animations

This part of .spch is entirely unused, but it works perfectly well in custom .spch files. This uses a facial animation to play under the lip sync animation of the voice clip.

### Soldier/Prisoner

| hash | string | description | video |
|-|-|-|
| `4273958362` | `chork_lp` | Closed eyes, gritted teeth (restraint?) | <video src="/assets/tpp/gm/soldier/facial/chork_lp.webm"></video> |
| `906448398` | `quest_lp` | | <video src="/assets/tpp/gm/soldier/facial/quest_lp.webm"></video> |
| `4185159514` | `dying_lp` | Wide gritted teeth and frown in pain, furrowed brow | <video src="/assets/tpp/gm/soldier/facial/dying_lp.webm"></video> |
| `875969379` | `hold_lp` | | <video src="/assets/tpp/gm/soldier/facial/hold_lp.webm"></video> |
| `2413225066` | `sleepy_st` | | <video src="/assets/tpp/gm/soldier/facial/sleepy_st.webm"></video> |
| `2370764116` | `sleepy` | | <video src="/assets/tpp/gm/soldier/facial/sleepy.webm"></video> |
| `534101553` | `sleepy_ed` | | <video src="/assets/tpp/gm/soldier/facial/sleepy_ed.webm"></video> |
| `3637848969` | `sleep_lp` | Closed eyes, low open mouth | <video src="/assets/tpp/gm/soldier/facial/sleep_lp.webm"></video> |
| `942521988` | `storm_lp` | Furrowed brow, mouth open with disgust | <video src="/assets/tpp/gm/soldier/facial/storm_lp.webm"></video> |
| `2004836561` | `radio_n_lp` | Furrowed brow, slightly open frown | <video src="/assets/tpp/gm/soldier/facial/radio_n_lp.webm"></video> |
| `1270273108` | `radio_t_lp` | Furrowed brow, low open mouth | <video src="/assets/tpp/gm/soldier/facial/radio_t_lp.webm"></video> |
| `4189128720` | `normal` | | <video src="/assets/tpp/gm/soldier/facial/normal.webm"></video> |
| `3540382066` | `relax` | | <video src="/assets/tpp/gm/soldier/facial/relax.webm"></video> |
| `670785982` | `smoke_st` | | <video src="/assets/tpp/gm/soldier/facial/smoke_st.webm"></video> |
| `1602722026` | `smoke_lp` | | <video src="/assets/tpp/gm/soldier/facial/smoke_lp.webm"></video> |
| `450841444` | `smoke_ed` | Mouth open as if blowing out smoke | <video src="/assets/tpp/gm/soldier/facial/smoke_ed.webm"></video> |
| `995823487` | `damage_l` | Gritted teeth, closed eyes | <video src="/assets/tpp/gm/soldier/facial/damage_l.webm"></video> |
| `1659817747` | `damage_h` | | <video src="/assets/tpp/gm/soldier/facial/damage_h.webm"></video> |
| `1177901058` | `faint` | Mouth hanging open, eyelids drooping | <video src="/assets/tpp/gm/soldier/facial/faint.webm"></video> |
| `3893246598` | `greet` | Open mouth, lifted eyebrows | <video src="/assets/tpp/gm/soldier/facial/greet.webm"></video> |
| `1225486477` | `surprise` | | <video src="/assets/tpp/gm/soldier/facial/surprise.webm"></video> |
| `223061766` | `surprise_big` | | <video src="/assets/tpp/gm/soldier/facial/surprise_big.webm"></video> |
| `1401225578` | `desperate` | Gritted teeth | <video src="/assets/tpp/gm/soldier/facial/desperate.webm"></video> |
| `2432373368` | `suspects` | Furrowed brow, low open mouth | <video src="/assets/tpp/gm/soldier/facial/suspects.webm"></video> |
| `2333752989` | `prick` | | <video src="/assets/tpp/gm/soldier/facial/prick.webm"></video> |
| `472678494` | `dead` | Open mouth, eyes rolled up and somewhat open | <video src="/assets/tpp/gm/soldier/facial/dead.webm"></video> |
| `2020921055` | `dazzle` | Furrowed brow, open mouth frown | <video src="/assets/tpp/gm/soldier/facial/dazzle.webm"></video> |
| `2147014128` | `irritated` | | <video src="/assets/tpp/gm/soldier/facial/irritated.webm"></video> |
| `4233967713` | `smile` | Open-mouth laugh smile | <video src="/assets/tpp/gm/soldier/facial/smile.webm"></video> |
| `105229588` | `chuckle` | Smirk | <video src="/assets/tpp/gm/soldier/facial/chuckle.webm"></video> |

![Facial animation key frames](/assets/tpp/gm/soldier/facial/facial_collage.png)

## Radio callsign param wildcards

These are the values used in the .exe to stand in for the callsign voice clips during radio communcation speech labels.

| uint | chara | voiceId | desc | text |
|-|-|-|-|-|
||||||
||||**Normal phase**||
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
||||**Caution phase**||
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
||||**Alert phase**||
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
||||**Transmission cut short**||
|`367198950`|`cp`|`CPR0200`|CP|Patrol, what's wrong? Come in, patrol!|
