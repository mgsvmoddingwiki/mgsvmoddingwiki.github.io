---
title: V Framework Lua API
permalink: /V_Framework_Lua_API/
tags: [Lua, Reference, Infinite Heaven]
---


## How to use

[V Framework](/V_Framework) loads as an [Infinite Heaven](/Infinite_Heaven)
module. Once it's loaded, every library below is a **global table** you
can call from your Infinite Heaven mission modules (or any loaded Lua):

For example:
```lua
V_TppUiCommand.SetEmergencyMissionPopup("Emergency!", "Mother base is under attack!")
V_TppUiCommand.SetMissionEmergency(10070, true)
```

Anything you set per-mission is reset automatically on each mission
reload, so you rarely need to clean up by hand — but every library still
provides Clear*/Unset* functions if you want to. **Soldiers and
hostages** can be referenced by their **name** (e.g. "sol_enemyBase_0000") or
by their **gameObjectId**.

---

## Lua functions


### Fox Utilities

| Function | Parameters | Description |
|---|---|---|
| V_Fox.FNVHash32 | wwiseEventName | Returns the FNVHash32 value for a Wwise event name. |
| V_Fox.SetPickableCountRawByIndex | locatorIndex, countRaw | Updates the raw count of a TppPickable locator during the current session. |
| V_Fox.GetPickableCountRawByIndex | locatorIndex | Returns the raw count of a TppPickable locator. |
| V_Fox.ShowConsole | isEnable | Shows a console window and prints Fox.Log and V_FrameWork.Log logs. |

### Helicopter

| Function | Parameters | Description |
|---|---|---|
| V_Helicopter.SetEnableHeliVoice | isEnable, voiceEvent, radioEvent | Overrides the voice and radio events used by Pequod with events from a custom .sbp, avoiding the need to replace the vanilla .sbp. |
| V_Helicopter.PilotCallVoice | label | Plays a voice line using the hardcoded DD_vox_SH_voice source. |
| V_Helicopter.PilotCallRadio | label1, label2 | Plays a radio line using the hardcoded DD_vox_SH_radio source. A second line can be played sequentially. The support helicopter must be rendered. |
| V_Helicopter.SetFieldTaxiMissionEnabled | missionCode, isEnable | Enables or disables the Taxi system for a specific mission. |
| V_Helicopter.SetTaxiLandingZoneHidden | lzName, isEnable | Shows or hides a landing zone on the Taxi map only. |
| V_Helicopter.SetTaxiRideState | state (1–3) | Changes the pose used by the player during Taxi rides. |
| V_Helicopter.SetTaxiRideLog | isEnable | Enables or disables logging for Taxi ride poses. |

### Player

| Function | Parameters | Description |
|---|---|---|
| V_Player.SetPlayerVoiceFpkPathForType | playerType, fpkPath | Loads a custom .fpk for the specified player type during gameplay. |
| V_Player.ClearPlayerVoiceFpkPathForType | playerType | Restores the vanilla voice .fpk for the specified player type. |
| V_Player.ClearAllPlayerVoiceFpkOverrides | — | Restores the vanilla voice .fpk for all player types. |

### Cassette

#### Playback

| Function | Parameters | Description |
|---|---|---|
| V_CassetteCommand.PlayCassetteTapeByTrackId | trackId, isLoop, playAll | Immediately starts playing a cassette tape. |
| V_CassetteCommand.GetTapeTrackId | trackFileName | Returns a cassette tape's track ID using the filename defined in `PreinstallTape.lua.` |
| V_CassetteCommand.GetCassettePlayingTime | — | Returns the current playback time of the active cassette tape. |
| V_CassetteCommand.GetCassettePlayingTrackId | — | Returns the track ID of the active cassette tape. |
| V_CassetteCommand.PauseCassette | fadeSec | Pauses the active cassette tape. Set fadeSec to 0 to disable the fade-out. |
| V_CassetteCommand.ResumeCassette | fadeSec | Resumes the paused cassette tape. Set fadeSec to 0 to disable the fade-in. |
| V_CassetteCommand.StopCassette | fadeSec, stopByUser | Stops the active cassette tape. A stopped tape cannot be resumed. |
| V_CassetteCommand.IsCassetteSpeakerEnabled | — | Returns true when cassette speaker playback is enabled. |
| V_CassetteCommand.SetCassetteSpeakerEnabled | isEnable | Enables or disables cassette speaker playback. |

#### Custom Tapes

| Function | Parameters | Description |
|---|---|---|
| V_CassetteCommand.RegisterCustomTapes | — | Registers a completely new custom cassette tape.|
| V_CassetteCommand.RegisterRadioCassette | gimmickName, fox2Path, wwiseEvent, fileName | Allows a custom cassette tape to be collected from a radio, similarly to vanilla music tapes. |

#### Custom Tape Registration

| Function | Parameters | Returns | Description |
|---|---|---|---|
| V_CassetteCommand.RegisterCustomTapes | definition | boolean | Registers custom cassette albums and tracks. Returns true when registration succeeds; otherwise returns false. |

##### Definition Format

```lua
V_CassetteCommand.RegisterCustomTapes({
    albums = {
        {
            albumId = "custom_album",
            langId = "custom_album_name",
            type = "music",
        },
    },

    tracks = {
        {
            albumId = "custom_album",
            langId = "custom_track_name",
            fileName = "custom_track",
            dataTimeJp = 0,
            dataTimeEn = 0,
            important = 0,
            special = 0,
            unlocked = 1,
        },
    },
})
```

The function accepts one table containing two arrays:

| Field    | Type      | Required | Description                    |
| -------- | --------- | -------: | ------------------------------ |
| albums | table[] |       No | Album definitions to register. |
| tracks | table[] |       No | Track definitions to register. |

At least one valid album or track should normally be supplied. Invalid entries are skipped rather than causing the entire Lua call to fail immediately.

##### Album Definition

| Field       | Type      |    Required | Default | Description                                                                                           |
| ----------- | --------- | ----------: | ------: | ----------------------------------------------------------------------------------------------------- |
| albumId   | string  |         Yes |       — | Internal identifier used to associate tracks with the album.                                          |
| langId    | string  |         Yes |       — | Language ID used for the album's displayed name.                                                      |
| type      | string  | Conditional |       — | String representation of the album type. Either type or a nonnegative typeValue must be supplied. |

An album is accepted only when:

* albumId is a valid string.
* langId is a valid string.
* type is a valid string.


##### Track Definition

| Field        | Type      | Required | Default | Description                                                                    |
| ------------ | --------- | -------: | ------: | ------------------------------------------------------------------------------ |
| albumId    | string  |      Yes |       — | ID of the album that contains the track.                                       |
| langId     | string  |      Yes |       — | langId used for the track's displayed name.                               |
| fileName   | string  |      Yes |       — | Internal cassette track filename.                                              |
| dataTimeJp | integer |       No |     0 | Japanese track-time metadata.                                                  |
| dataTimeEn | integer |       No |     0 | English track-time metadata.                                                   |
| important  | integer |       No |     0 | Value stored in the track's important field.                                 |
| special    | integer |       No |     0 | Value stored in the track's special field.                                   |
| unlocked   | integer |       No |     0 | Sets the initial unlocked state. 0 is locked; any nonzero value is unlocked. |

A track is accepted only when albumId, langId, and fileName are valid strings.

The track's internal saveIndex is automatically initialized to -1 and cannot be set through this registration table.

##### Complete Example

```lua
-- type Values
-- PREINSTALL_MISSION_INFO, the name of the tape must match this tp_m_10044_00 (10044 is the missionCode)
-- PREINSTALL_MUSIC
-- PREINSTALL_BRIEFING 
-- PREINSTALL_SPECIAL

V_CassetteCommand.RegisterCustomTapes({
    albums = {
        {
            albumId = "GZ_Album",
            langId = "GZ_Album_lang",
            type = "PREINSTALL_MUSIC",
        },
        {
            albumId = "ZOE_Album",
            langId = "ZOE_Album_lang",
            type = "PREINSTALL_MUSIC",
        },
    },

    tracks = {
        {
            albumId = "GZ_Album",
            langId = "HeresToYou_Lang",
            fileName = "tp_bgm_03_01",
            dataTimeJp = 188e3,
            dataTimeEn = 188e3,
            important = 0,
            special = 0,
            unlocked = 1,
        },
        {
            albumId = "ZOE_Album",
            langId = "ZOE_tp_bgm_01_lang",
            fileName = "ZOE_tp_bgm_01",
            unlocked = 0,
        },
    },
})
```

### Mother Base Management

| Function | Parameters | Description |
|---|---|---|
| V_TppMotherBaseManagement.AddToChangeLocationMenu | — | TBD. |
| V_CassetteCommand.AddPhotoAdditionalText | — | TBD. |

### Sahelanthropus

| Function | Parameters | Description |
|---|---|---|
| V_Sahelan.SetEyeLampColorLogging | isEnable | Enables or disables logging when Sahelanthropus's eye color changes. |

### Sound

| Function | Parameters | Description |
|---|---|---|
| V_TppSoundDaemon.SetSoldierVoicePitch | gameObjectId, cents | Changes the voice pitch of a specific soldier. |
| V_TppSoundDaemon.UnsetSoldierVoicePitch | gameObjectId | Removes the voice-pitch override from a specific soldier. |
| V_TppSoundDaemon.SetGameOverMusic | isEnable, gameOverType (0–3), playEvent, stopEvent | Replaces the Game Over music with a custom or existing Wwise event. |

### UI

#### Player Equipment Backgrounds

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetDefaultEquipBgTexturePath | ftexPath, isColored, opacity | Sets the default background texture used by player equipment icons. |
| V_TppUiCommand.ClearDefaultEquipBgTexture | — | Restores the default player equipment background texture. |
| V_TppUiCommand.SetEquipBgTexturePath | equipId, ftexPath, isColored, opacity | Sets the background texture for a specific player equipment item. |
| V_TppUiCommand.ClearEquipBgTexture | equipId | Restores the default background texture for a specific player equipment item. |

#### Enemy Equipment Backgrounds

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetEnemyWeaponBgTexturePath | ftexPath, isColored, opacity | Sets the default background texture used by enemy weapon icons. |
| V_TppUiCommand.ClearEnemyWeaponBgTexture | — | Restores the default enemy weapon background texture. |
| V_TppUiCommand.SetEnemyEquipBgTexturePath | equipId, ftexPath, isColored, opacity | Sets the background texture for a specific enemy equipment item. |
| V_TppUiCommand.ClearEnemyEquipBgTexture | equipId | Restores the default background texture for a specific enemy equipment item. |
| V_TppUiCommand.ClearAllEquipBgTextures | — | Restores all player and enemy equipment background textures to their defaults. |

#### Loading Screen

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetLoadingSplashMainTexturePath | ftexPath | Sets the main loading-screen texture. |
| V_TppUiCommand.SetLoadingSplashBlurTexturePath | ftexPath | Sets the blurred loading-screen texture. |
| V_TppUiCommand.ClearLoadingSplashTextures | — | Restores the default loading-screen textures. |

#### Mission Telop screen

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetMissionTelopTexture | ftexPath | Sets the Mission Telop screen texture. |
| V_TppUiCommand.UnsetMissionTelopTexture | ftexPath | Restores the default Mission Telop screen textures. |

#### Game Over Screen

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetGameOverSplashMainTexturePath | ftexPath | Sets the main Game Over texture. |
| V_TppUiCommand.SetGameOverSplashBlurTexturePath | ftexPath | Sets the blurred Game Over texture. |
| V_TppUiCommand.ClearGameOverSplashTextures | — | Restores the default Game Over textures. |

#### Equipment Icons

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetEquipIdIconFtexPath | equipId, ftexPath | Changes the icon of a specific equipment item. |
| V_TppUiCommand.ClearIconFtexPath | equipId | Restores the default icon for a specific equipment item. |
| V_TppUiCommand.ClearAllIconFtexPaths | — | Restores the default icons for all equipment items. |

#### Emergency Missions

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetMissionEmergency | missionCode, isEnable | Enables or disables emergency status for a mission. |
| V_TppUiCommand.SetEmergencyMissionPopup | title, body | Overrides the Emergency Mission iDroid popup using raw text. |
| V_TppUiCommand.SetEmergencyMissionPopupLangId | title, body | Overrides the Emergency Mission iDroid popup using language IDs. |
| V_TppUiCommand.ClearEmergencyMissionPopupOverride | — | Restores the default Emergency Mission popup text used by the Retake the Platform mission. |
| V_TppUiCommand.ShowMissionIcon | title, body, time | Shows the Emergency Mission icon and overrides its title, body, and time. Any argument set to nil uses its vanilla hardcoded value. |

#### Time Cigarette

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.ShowTimeCigaretteUi | — | Shows the Time Cigarette UI. |
| V_TppUiCommand.HideTimeCigaretteUi | — | Hides the Time Cigarette UI. |

#### iDroid Announcement Popups

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.ShowMbDvcAnnouncePopupReport | title, body | Shows an iDroid announcement popup with the Report sound effect using raw text. |
| V_TppUiCommand.ShowMbDvcAnnouncePopupReportLangId | title, body | Shows an iDroid announcement popup with the Report sound effect using language IDs. |
| V_TppUiCommand.ShowMbDvcAnnouncePopupReward | title, body | Shows an iDroid announcement popup with the Reward sound effect using raw text. |
| V_TppUiCommand.ShowMbDvcAnnouncePopupRewardLangId | title, body | Shows an iDroid announcement popup with the Reward sound effect using language IDs. |

#### Enemy Information

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetEnemyInformationLangId | langId | Overrides the enemy information name shown through the binoculars. |
| V_TppUiCommand.ClearEnemyInformationLangId | — | Restores the default enemy information name shown through the binoculars. |
| V_TppUiCommand.SetEnemyUnitName | langId | Overrides the enemy unit name shown on the map. |
| V_TppUiCommand.ClearEnemyUnitName | — | Restores the default enemy unit name shown on the map. |
| V_TppUiCommand.SetEnemyInformationLangIdForSoldier | gameObjectId, langId | Overrides the binoculars information name for a specific soldier. |
| V_TppUiCommand.ClearEnemyInformationLangIdForSoldier | gameObjectId | Restores the default binoculars information name for a specific soldier. |
| V_TppUiCommand.ClearAllEnemyInformationLangIdForSoldiers | — | Clears all soldier-specific binoculars information-name overrides. |
| V_TppUiCommand.SetEnemyUnitNameForSoldier | gameObjectId, langId | Overrides the map unit name for a specific soldier. |
| V_TppUiCommand.ClearEnemyUnitNameForSoldier | gameObjectId | Restores the default map unit name for a specific soldier. |
| V_TppUiCommand.ClearAllEnemyUnitNameForSoldiers | — | Clears all soldier-specific map unit-name overrides. |

#### Announcement Log Sound Effects

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetAnnounceLogSE | langId, conditionOrStateId | Assigns a Wwise sound effect to an announcement-log entry. |
| V_TppUiCommand.RegisterAnnounceLogSfx | sfxLabel | Registers a sound-effect label for use with SetAnnounceLogSE. Example: "sfx_s_enemytag_main_tgt". |
| V_TppUiCommand.UnsetAnnounceLogSE | — | Removes the sound-effect override from the announcement log. |
| V_TppUiCommand.UnregisterAnnounceLogSfx | — | Unregisters the announcement-log sound effect. |


---


## SendCommands

### Usage

```lua
GameObject.SendCommand(target, {
    id = "CommandName",
    -- command-specific fields
})
```

The target argument is separate from the command table. Some commands interpret it as a game object ID, mapped index, or Command Post target, while global commands ignore it.

### Sahelanthropus

#### Phase Control

| Command           | Target  | Fields  | Returns  | Description                                          |
| ----------------- | ------- | ------- | -------- | ---------------------------------------------------- |
| SetSahelanPhase | { type = "TppSahelan2", group = 0, index = 0 } | phase | —        | Forces Sahelanthropus to use the specified AI phase. |
| GetSahelanPhase | { type = "TppSahelan2", group = 0, index = 0 } | —       | number | Returns Sahelanthropus's current AI phase.           |

#### FOVA Override

| Command            | Target  | Fields | Returns | Description                                     |
| ------------------ | ------- | ------ | ------- | ----------------------------------------------- |
| SetSahelanFova   | { type = "TppSahelan2", group = 0, index = 0 } | fv2  | —       | Sets a custom .fv2 path for Sahelanthropus.   |
| ClearSahelanFova | { type = "TppSahelan2", group = 0, index = 0 } | —      | —       | Clears the custom Sahelanthropus FOVA override. |

#### Eye Lamp

| Command             | Target  | Fields                           | Returns | Description                                                                                             |
| ------------------- | ------- | -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| SetEyeLampColor   | { type = "TppSahelan2", group = 0, index = 0 } | color, optional phase        | —       | Overrides the eye-lamp color. Phase defaults to -1, which will apply it to ALL phases. |
| ClearEyeLampColor | { type = "TppSahelan2", group = 0, index = 0 } | —                                | —       | Clears all eye-lamp color overrides.                                                                    |
| SetEyeLampDisco   | { type = "TppSahelan2", group = 0, index = 0 } | enabled, speed, optional a | —       | Enables or disables the eye-lamp color-cycling effect. a controls opacity and defaults to 1.        |

Example:

```lua
GameObject.SendCommand(sahelanId, {
    id = "SetEyeLampColor",
    phase = -1,
    color = {
        r = 255,
        g = 0,
        b = 0,
        a = 255,
    },
})
```

#### Heart Light

| Command                | Target  | Fields                           | Returns | Description                                                                                           |
| ---------------------- | ------- | -------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| SetHeartLightColor   | { type = "TppSahelan2", group = 0, index = 0 } | color, optional phase        | —       | Overrides the heart-light color. phase defaults to -1. Note that this field uses a lowercase p. |
| ClearHeartLightColor | { type = "TppSahelan2", group = 0, index = 0 } | —                                | —       | Clears all heart-light color overrides.                                                               |
| SetHeartLightDisco   | { type = "TppSahelan2", group = 0, index = 0 } | enabled, speed, optional a | —       | Enables or disables the heart-light color-cycling effect. a controls opacity and defaults to 1.   |

#### Color Format

The color field is a table containing:

| Field | Description                       |
| ----- | --------------------------------- |
| r   | Red component.                    |
| g   | Green component.                  |
| b   | Blue component.                   |
| a   | Alpha component. Defaults to 1. |

Colors may use either normalized values from 0 to 1 or byte values from 0 to 255.

When any RGB component is greater than 1, all three RGB components are divided by 255. Alpha is scaled independently when it is greater than 1.

### Occasional Chats

| Command                        | Target  | Fields   | Returns | Description                                                          |
| ------------------------------ | ------- | -------- | ------- | -------------------------------------------------------------------- |
| SetOccasionalChatList        | { type = "TppSoldier2" } | labels | —       | Replaces the occasional-chat override list with the supplied labels. |
| InsertToOccasionalChatList   | { type = "TppSoldier2" } | labels | —       | Adds the supplied labels to the occasional-chat override list.       |
| RemoveFromOccasionalChatList | { type = "TppSoldier2" } | labels | —       | Removes the supplied labels from the occasional-chat override list.  |
| ResetOccasionalChatList      | { type = "TppSoldier2" } | —        | —       | Clears the occasional-chat override and restores default behavior.   |

The labels field must be an array containing up to 255 entries. Each entry may be either a label string or an existing StrCode32 value.

```lua
GameObject.SendCommand(target, {
    id = "SetOccasionalChatList",
    labels = {
        "speech_label_1",
        "speech_label_2",
    },
})
```

### Caution Phase

| Command                     | Target                 | Fields     | Returns  | Description                                                                                                                |
| --------------------------- | ---------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| SetFriendlyFire   | Global or Command Post gameObjectId | isEnable | —        | Makes it possible for enemies to accedantilly shoot each other. |
| SetFriendlyFire   | Global or Command Post gameObjectId |  | —        | Makes it possible for enemies to accedantilly shoot each other. |                                                                  |


```lua
GameObject.SendCommand(GameObject.GetGameObjectId("afgh_enemyBase_cp"), { -- for a specific CP
    id = "SetCautionPhaseDuration",
    duration = 99,
})

-- OR
GameObject.SendCommand({type="TppCommandPost2"}, { -- for ALL CPs
    id = "SetCautionPhaseDuration",
    duration = 99,
})
```

### Friendly Fire

| Command                     | Target                 | Fields     | Returns  | Description                                                                                                                |
| --------------------------- | ---------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| SetCautionPhaseDuration   | Global or Command Post gameObjectId | duration | —        | Sets the caution-phase duration in seconds. The target determines whether the override is global or Command Post-specific. |
| GetCautionPhaseDuration   | Global or Command Post gameObjectId | —          | number | Returns the configured caution-phase duration in seconds.                                                                  |
| UnsetCautionPhaseDuration | Global or Command Post gameObjectId | —          | —        | Removes the caution-duration override and restores default behavior.                                                       |
| GetCautionPhaseRemaining  | Global or Command Post gameObjectId | —          | number | Returns the remaining caution-phase time in seconds.  

### Hostages

#### Escape State

| Command          | Target                 | Fields   | Returns | Description                                                     |
| ---------------- | ---------------------- | -------- | ------- | --------------------------------------------------------------- |
| SetEscapeState | Hostage gameObjectId | enable | —       | When enabled, the enemy will report the lost prison was *taken* by the player rather than just *escaped*. |

```lua
GameObject.SendCommand(hostageGameObjectId, {
    id = "SetEscapeState",
    enable = true,
})
```

#### Lost Hostages

| Command             | Target                 | Fields                           | Returns | Description                                                                                                 |
| ------------------- | ---------------------- | -------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| SetLostHostage    | Hostage gameObjectId | hostageType, customLostLabel | —       | Registers the target as a lost hostage and configures its hostage type and optional custom discovery label. |
| RemoveLostHostage | Hostage gameObjectId | —                                | —       | Removes the target from the lost-hostage trap and discovery systems.                                        |
| ClearLostHostages | Ignored                | —                                | —       | Removes all registered lost-hostage overrides.                                                              |

```lua
GameObject.SendCommand(GameObject.GetGameObjectId("hos_0000"), {
    id = "SetLostHostage",
    hostageType = 1, -- MALE = 0, FEMALE = 1, CHILD = 2.
})
```

customLostLabel may be either a label string or an existing StrCode32 value.

### VIP Soldiers

| Command              | Target                 | Fields                       | Returns | Description                                                                    |
| -------------------- | ---------------------- | ---------------------------- | ------- | ------------------------------------------------------------------------------ |
| SetVIPImportant    | Soldier gameObjectId | isOfficer, deadBodyLabel | —       | Registers a soldier as important for sleep, faint, holdup, and radio handling. |
| RemoveVIPImportant | Soldier gameObjectId | —                            | —       | Removes a soldier from all VIP-important handling systems.                     |
| ClearVIPImportant  | Ignored                | —                            | —       | Removes all registered VIP-important soldiers.                                 |

deadBodyLabel may be either a label string or an existing StrCode32 value.

```lua
GameObject.SendCommand(soldierGameObjectId, {
    id = "SetVIPImportant",
    isOfficer = true,
    deadBodyLabel = "speech_dead_body_found",
})
```

### Holdup Recovery

| Command                         | Target  | Fields   | Returns | Description                                                                                     |
| ------------------------------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------- |
| SetUseConcernedHoldupRecovery | { type = "TppSoldier2" } | enable | —       | Enables or disables the custom concerned-soldier holdup recovery behavior for non-VIP soldiers. |

### Call-Sign Patrol Soldiers

| Command                       | Target                 | Fields | Returns | Description                                             |
| ----------------------------- | ---------------------- | ------ | ------- | ------------------------------------------------------- |
| AddCallSignPatrolSoldier    | Soldier gameObjectId | —      | —       | Adds a soldier to the extra call-sign patrol list.      |
| RemoveCallSignPatrolSoldier | Soldier gameObjectId | —      | —       | Removes a soldier from the extra call-sign patrol list. |
| ClearCallSignPatrolSoldiers | { type = "TppSoldier2" }                | —      | —       | Clears all extra call-sign patrol soldiers.             |

### Soldier Stealth Camo

| Command                            | Target                | Fields   | Returns | Description                                                                    |
| ---------------------------------- | --------------------- | -------- | ------- | ------------------------------------------------------------------------------ |
| EnableSoldierStealthCamo         | Soldier gameObjectId | enable | —       | Enables or disables optical camouflage for the specified soldier mapped index. |
| ClearSoldierStealthCamoOverrides | { type = "TppSoldier2" }               | —        | —       | Clears all soldier optical-camouflage overrides.                               |

```lua
GameObject.SendCommand(GameObject.GetGameObjectId("sol_enemyBase_0000"), {
    id = "EnableSoldierStealthCamo",
    enable = true,
})
```

### Accepted Value Types

#### Boolean Fields

Boolean fields such as enable, enabled, and isOfficer accept:

* true or false.
* A number, where 0 is false and any nonzero value is true.

#### String-Code Fields

The following fields accept either a string or a numeric StrCode32 value:

* deadBodyLabel
* customLostLabel
* Entries in labels

String values are automatically converted using FoxHashes.StrCode32.


## Messages
Similar to the vanilla message system, V Framework also emits messages from the exe to lua for modders to use that did not exist before, and the format is similar to Vanilla's.

Here is a full guide on how to use [Messages](https://mgsvmoddingwiki.github.io/Messages/).

### GameObject

| msg                       | Params                 | Description |
| ----------------------------- | ---------------------- | ------ |
| AntiAir    | cpId, isEnable | Fires when CP notices Support Heli.| 
| HoldupCancelLookToPlayer    | gameObjectId | Fires when the player aims at a soldier that was about to cancel a hold-up.| 

### Radio

| msg                       | Params                 | Description |
| ----------------------------- | ---------------------- | ------ |
| HeliStart    | label1, label2, voiceType | Fires when pequad uses one of his radio/voice lines.| 
| HeliFinish    | label1, label2, voiceType | Fires when pequad finishes one of his radio/voice lines.| 

### Player

| msg                       | Params                 | Description |
| ----------------------------- | ---------------------- | ------ |
| OnPlayerLockPickStart    | playerIndex, gimmickId, Doorside | Fires when the player starts lock picking.| 
| OnPlayerLockPickEnd    | playerIndex, gimmickId, Doorside | Fires when the player finishes lock picking.| 
| OffBinocularsMode    | — | Fires when the player stops using the Binoculars.| 
| CrawlSideRoll    | playerIndex, rollPhase, rollCount, Direction | Fires when the player rolls.| 

### UI

| msg                       | Params                 | Description |
| ----------------------------- | ---------------------- | ------ |
| TimeCigaretteUi    | playerIndex | Fires when the Phantom Cigar time UI shows (named it `TimeCigaretteUi` because that's the litral name of the function in exe).| 
