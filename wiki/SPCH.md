---
title: SPCH
permalink: /SPCH/
---

**SPCH**, or Speech Data, is a format used in Metal Gear Solid V: The
Phantom Pain to make in-game characters speak specified voice clips,
either in enemy soldier conversations, prisoner carrying monologues or
unique story characters' monologues. It functions when called by
[commands](/commands "wikilink") CallVoice, CallMonologue, CallRadio,
CallConversation or other with a label, making the specified in-game
character speak a voice clip, with an option for the character to play
unique animations while doing so. The format is Little-Endian, meaning
bytes are written in reverse order of significance.

## Header

`0x00-0x03 - "spch"`
`0x04-0x05 - Padding`
`0x06-0x07 - (uint16) Amount of labels in the file`
`0x08-0x0F - Padding - 0x07 bytes of padding per label.`

## Label entry definition

`0x00-0x03 - (uint32) StrCode32 hash of the label's name`
`0x04-0x07 - (uint32?) Voice clips list id`
`0x08 - (uint8) Number of voice clip entries in this label`
`0x09 - 0x0B - Padding`

The voice clips list ids can be found inside the HIRC.dat of .sbp
soundbank files, if extracted by SecaProject's SBP_Tool. The voice
clips list ids are always followed up by 0x6402, and the voice clips
used in the label are usually from the same list specified here, however
sometimes the voice clips list id in the label entry definition is null,
specifically in CpRadioSeqCommon.spch.

## Voice clip entry

`0x00-0x03 - (uint32) StrCode32 of the speaker's voice type`
`0x04-0x07 - (uint32?) Voice clip id`
`0x08-0x0B - (uint32) StrCode32 hash of animation act`
`0x0C-0x0F - Padding?`
`0x10-0x13 - (float) Pause before the next voice clip is played, in seconds`

As previously mentioned, the voice clip id can be found in a list in the
HIRC.dat of .sbp soundbank files, after the label entry definition's
voice clips list id. The entries in the list are seperated with
0x32006400. The first four bytes of the entry are the voice clip id, and
the other is a link to another much earlier section where .wem sound
file names (as extracted by SecaProject's SBP_Tool) are listed twice in
a row, twelve bytes before the link mentioned in the voice clip ids,
however this manual method of locating sound files' voice clip ids
doesn't always apply.

Animation act ids for each entity are listed in Metal Gear Solid V's
.exe, as Little-Endian StrCode32 hashes.

### Voice type dictionary

This is a list of some voice types that can be used by SPCH files,
presented here as a reference, first as a Little-Endian StrCode32 hash,
then its description, then the string behind the hash.

`B0 1A C1 B1 - Ishmael - "Ishmael"`
`9A 80 67 BC - Ocelot - "ocelot"`
`86 2B 2D 96 - Miller - "miller"`
`1E FA 8B 4C - Paz - "paz"`
`19 D4 CC 09 - Code Talker - "codetalker"`
`9B DE 82 52 - Skull Face - "skullface"`
`2B 29 F3 BF - POW(English)A - "hostage_a"`
`8F AE 91 6C - POW(English)B - "hostage_b"`
`30 FA 15 20 - POW(English)C - "hostage_c"`
`43 1D C5 7E - POW(English)D - "hostage_d"`
`B4 86 C3 3E - Female POW(English)A - "hostage_a_fml"`
`ad a5 5f f6 - Female POW(English)B - "hostage_b_fml"`
`82 5c ee 9c - Female POW(English)C - "hostage_c_fml"`
`49 84 27 aa - Female POW(English)D - "hostage_d_fml"`
`9C AF 9F BA - POW(Russian)A - "hostage_a_ru"`
`1b 0f 29 07 - POW(Russian)B - "hostage_b_ru"`
`15 ed 0c fb - POW(Afrikaans)A - "hostage_a_af"`
`c8 03 91 07 - POW(Afrikaans)B - "hostage_b_af"`
`B1 F0 DA 7A - POW(Pashto)A - "hostage_a_ps"`
`91 5b 16 d7 - POW(Pashto)B - "hostage_b_ps"`
`7e c4 8c f1 - POW(Kikongo)A - "hostage_a_kg"`
`C9 B1 C9 8D - POW(Kikongo)B - "hostage_b_kg"`
`2C 8A F4 DA - Enemy A - "ene_a"`
`83 A1 C2 77 - Enemy B - "ene_b"`
`88 BA D9 43 - Enemy C - "ene_c"`
`D8 66 AC 61 - Enemy D - "ene_d"`
`EC EF 8C D5 - Female DD Soldier A - "ene_a_fml"`
`95 CB 85 B2 - Female DD Soldier B - "ene_b_fml"`
`21 5c ea 57 - Female DD Soldier C - "ene_c_fml"`
`8b 51 eb a9 - Female DD Soldier D - "ene_d_fml"`
`8D 3C A9 B8 - Child Soldier A - "chsol_a"`
`52 9D 43 5C - Child Soldier B - "chsol_b"`
`36 64 CB 9C - Child Soldier C - "chsol_c"`
`68 7F 0D 37 - Child Soldier D - "chsol_d"`
`57 BF 86 8E - CpRadioSeqCommon Soldier - "enemy"`
`9D FB 79 DB - CpRadioSeqCommon CP`

### Enemy soldier animation act dictionary

This is a list of some animation act ids that can be used by enemy
soldier SPCH files, presented here as a reference, first as a
Little-Endian StrCode32 hash, then its description, then the string
behind the hash.

`18 ED 41 06 - None - "None"`
`C9 66 23 9E - Saluting - "Salute"`
`43 DA 2F 01 - Looking at watch`
`DF D7 E9 CE - Wiping face`
`0A C6 97 EA - Yawn`
`8C 36 76 58 - Sneeze`
`5D 4F 7D 40 - Foot step (looking at feet while stepping in place a bit)`
`0A EF E2 3B - Cough`
`69 21 86 D8 - Scratch head`
`07 E2 63 F2 - Repositioning self by about half a meter and back, to the left`
`52 47 90 50 - Repositioning self by about half a meter and back, to the right`
`24 D2 C2 5F - Wiping brow/eyes (sandstorm reaction?)`
`94 41 A2 3C - ? `
`94 D8 7A 50 - Pointing `
`7E 1F 56 1E - ?`
`FE C3 22 D5 - Point away, to the left`
`D1 C9 B4 54 - Aggressive nodding, agreeing`
`C6 82 63 31 - Spooked by something to the left`
`FC 78 54 B1 - Spooked by something to the right`
`16 DC B8 0C - Directing someone with left arm palm and wide gesture, to the left`
`9D BD 74 20 - Saying hi to someone to the right, with right hand`
`72 3F B2 6F - Telling the other to come closer, wide gesture, left arm`
`70 CB 43 66 - ?`
`33 3B 72 40 - "Get up" motion`
`3F 7F FA A8 - Telling the other to come closer, close and shorter gesture, left arm`
`EA 3E 87 4F - Walks around the other, from the right, kicking the spoken to prisoner in the back`
`A6 98 DA 22 - Hitting the kneeling prisoner with the barrel of gun, then looks down at him`
`FE BC B9 CC - Hitting with barrel of rifle, prisoner standing on knees reacts`
`14 CC 64 ED - Greeting with left hand raised up in the air`
`92 A5 5E 99 - Frustrated "damn!" fist motion, caution-y`
`0A 9B B3 C1 - Caution looking around`
`AB 9B 77 17 - Caution looking around, left and right`
`E1 81 59 36 - Frustrated "damn!" fist motion, caution-y, left arm, maybe when failed to save comrade from fulton balloon?`
`26 74 DA 1D - Frustrated "damn!" fist motion, caution-y, left arm, maybe when failed to save comrade from fulton balloon?`
`42 7A E9 DA - Cautiony, looking behind and aggresively waving to people behind him`
`3C 65 DE 44 - Repositioning self, much more relaxed and tamer`
`44 11 20 87 - Relaxed, resting gun on neck`
`A2 F8 C1 2D - Reacting to rain`
`E8 F9 4A AA - Looking at comrade hanging by fulton balloon`
`01 0F 95 9D - Aggressively kicking the ground, relaxed otherwise`
`3F DE 03 7E - Spinning left arm like a windmill`