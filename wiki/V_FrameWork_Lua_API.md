---
title: V_Framework Lua API
permalink: /V_FrameWork_Lua_API/
tags: [Lua, Reference, Infinite Heaven]
---

This is the Lua API reference for [V_Framework](/V_FrameWork "wikilink").
For an overview of the mod and its automatic fixes, see the
[V_Framework](/V_FrameWork "wikilink") page.

## How to use

V_Framework loads as an [Infinite Heaven](/Infinite_Heaven "wikilink")
module. Once it's loaded, every library below is a **global table** you
can call from your Infinite Heaven mission modules (or any loaded Lua):

```lua
V_TppUi.SetEmergencyMissionPopup("Emergency!", "An urgent situation has developed.")
V_TppUi.SetMissionEmergency(10070, true)
```

Anything you set per-mission is reset automatically on each mission
reload, so you rarely need to clean up by hand — but every library still
provides `Clear*`/`Unset*` functions if you want to. **Soldiers and
hostages** can be referenced by their **name** (e.g. `"sol_enemyBase_0000"`) or
by their **game-object ID**.

## Parameters & `nil`

The wrappers validate their inputs, so behavior is consistent:

- **Required parameters** (paths, equip IDs, mission codes, soldier/hostage
  references, labels) — if `nil` or the wrong type, the function **logs a
  warning and does nothing**; getters return `nil`, `0`, or `false` instead.
- **Optional parameters** can be omitted or passed `nil`, and the wrapper
  substitutes a default:

| Optional parameter | Default when `nil` / omitted |
|---|---|
| `colored`, `opacity` — equip backgrounds | no color tint / default opacity |
| `a` (alpha) — `V_TppSahelan` colors & disco | default alpha |
| `mode` / `phase` — `V_TppSahelan` colors | `-1` — applies to **all** phases |
| `speed` — `V_TppSahelan` disco | `2.0` |
| `isLoop`, `playAll` — `PlayCassetteTape` | `false` |
| `fadeSec` — cassette pause / resume / stop | `0` (no fade) |
| `stopByUser` — `StopCassette` | `false` |
| `enable` — `SetCassetteSpeakerEnabled` | `true` |
| `title`, `body` — `ShowMissionIcon` | no text |
| `time` — `ShowMissionIcon` | `6` seconds |
| `chara`, `dialogueEvent` — `SetAnnounceLogSE` | none — plays just the sound/event |
| `line2` — `PilotCallRadio` | single-line radio |
| `gender` — `SetLostHostage` | `0` (male) |
| `hostageLostLabel` — `SetLostHostage` | a default lost label |
| `isOfficer` — `SetVIPImportant` | `false` |
| `foundDeadBodyRadioLabel` — `SetVIPImportant` | no radio line on body discovery |
| `enable` — `EnableSoldierStealthCamo`, `SetUseConcernedHoldupRecovery` | `true` |

- **Conditionally required:**
  - `SetEnableHeliVoice(isEnable, voiceEvent, radioEvent)` — `voiceEvent` and
    `radioEvent` are **required when `isEnable` is `true`**, and ignored when
    disabling.
  - `SetGameOverMusic(isEnable, gameOverType, playEvent, stopEvent)` —
    `gameOverType` is **required** (`0`–`3`); `playEvent`/`stopEvent` are
    required when enabling and ignored when disabling.
  - The `V_TppCommandPost` getters and `UnsetCautionPhaseDuration` need a
    `cpId` — passing `nil` does nothing. Use `SetGlobalCautionPhaseDuration`
    to affect every command post.

| Library | Covers |
|---|---|
| [V_TppUi](#v_tppui) | Equip backgrounds & icons, splashes, popups, emergency missions, mission icons, announce-log SFX, time-cigarette UI |
| [V_TppEnemy](#v_tppenemy) | VIPs, callsigns, optical camo, enemy names & info, soldier chatter |
| [V_TppHostage](#v_tpphostage) | Lost-hostage tracking + custom labels |
| [V_TppSahelan](#v_tppsahelan) | Sahelanthropus eye-lamp & heart-light colors, fova, phase |
| [V_TppCassette](#v_tppcassette) | Cassette playback |
| [V_TppSound](#v_tppsound) | Per-soldier voice pitch |
| [V_TppMusicManager](#v_tppmusicmanager) | Custom Game Over music |
| [V_TppCommandPost](#v_tppcommandpost) | Caution-phase duration |
| [V_TppHelicopter](#v_tpphelicopter) | Pilot voice/radio, free-roam taxi |
| [V_TppPlayer](#v_tppplayer) | Player voice-FPK overrides |
| [V_TppPickable](#v_tpppickable) | Pickable counts |

---

## V_TppUi

UI and HUD features.

### Equip-screen backgrounds

Replace the background behind weapons/items on the equip screen. `colored`
(optional) tints it; `opacity` (optional, `0`–`10`) sets transparency.

| Function | Description |
|---|---|
| `SetDefaultEquipBgTexturePath(path, colored, opacity)` | Background for every equip slot |
| `SetEquipBgTexturePath(equipId, path, colored, opacity)` | Background for one specific equip ID |
| `SetEnemyWeaponBgTexturePath(path, colored, opacity)` | Background for enemy / non-sortie weapons |
| `SetEnemyEquipBgTexturePath(equipId, path, colored, opacity)` | Per-equip enemy background |
| `ClearDefaultEquipBgTexture()` · `ClearEquipBgTexture(equipId)` · `ClearEnemyWeaponBgTexture()` · `ClearEnemyEquipBgTexture(equipId)` · `ClearAllEquipBgTextures()` | Remove overrides |

### Equip icons

| Function | Description |
|---|---|
| `SetEquipIdIconFtexPath(equipId, path)` | Replace an equip's icon (`.ftex`) |
| `ClearIconFtexPath(equipId)` · `ClearAllIconFtexPaths()` | Remove icon overrides |

### Splash screens

| Function | Description |
|---|---|
| `SetLoadingSplashMainTexturePath(path)` · `SetLoadingSplashBlurTexturePath(path)` · `SetLoadingTexturePath(path)` | Custom loading screen |
| `SetGameOverSplashMainTexturePath(path)` · `SetGameOverSplashBlurTexturePath(path)` | Custom Game Over screen |
| `ClearLoadingSplashTextures()` · `ClearGameOverSplashTextures()` | Restore defaults |

### Popups

| Function | Description |
|---|---|
| `ShowMbDvcAnnouncePopupReport(title, body)` · `ShowMbDvcAnnouncePopupReportLangId(titleLangId, bodyLangId)` | "Report"-style announce popup (text or lang IDs) |
| `ShowMbDvcAnnouncePopupReward(title, body)` · `ShowMbDvcAnnouncePopupRewardLangId(titleLangId, bodyLangId)` | "Reward"-style announce popup |

### Emergency missions

| Function | Description |
|---|---|
| `SetMissionEmergency(missionCode, enabled)` | Flag a mission as an Emergency mission |
| `IsMissionEmergency(missionCode)` | Returns `true`/`false` |
| `ClearAllMissionEmergencies()` | Clear all flags |
| `SetEmergencyMissionPopup(title, body)` · `SetEmergencyMissionPopupLangId(titleLabel, bodyLabel)` | Customize the emergency-mission popup |
| `ClearEmergencyMissionPopupOverride()` | Restore the default popup |

### Mission icon

| Function | Description |
|---|---|
| `ShowMissionIcon(title, body, time)` | Show a mission banner for `time` seconds |
| `HideMissionIcon()` | Hide it |

### Announce-log sound effects

`SetAnnounceLogSE(label, value, chara, dialogueEvent)` — play a sound the
moment a HUD announce-log notification (identified by its lang `label`)
appears. `value` is a built-in **sound-id number** or a **custom Wwise
event-name string**; `chara`/`dialogueEvent` (optional numbers) play a
**dialogue line** instead.

### Time-cigarette UI

`ShowTimeCigaretteUi()` · `HideTimeCigaretteUi()`

```lua
-- Custom loading screen + a custom sound when the "mission clear" log appears
V_TppUi.SetLoadingTexturePath("/Assets/tpp/pack/mymod/loading.ftex")
V_TppUi.SetAnnounceLogSE("announce_mission_clear", "mymod_fanfare")  -- custom Wwise event
```

---

## V_TppEnemy

Control enemy soldiers. Also an **Infinite Heaven mission module** — add it
to your mission's module list, then configure it with the functions below.

### VIPs

| Function | Description |
|---|---|
| `SetVIPImportant(soldierNameOrId, isOfficer, foundDeadBodyRadioLabel)` | Mark a soldier as an important VIP. `isOfficer` flags them as an officer; `foundDeadBodyRadioLabel` plays if their body is found |
| `RemoveVIPImportant(soldierNameOrId)` · `ClearVIPImportant()` | Remove VIP status |
| `SetUseConcernedHoldupRecovery(enable)` | VIPs recover from holdups in a "concerned" manner |

### Callsigns

| Function | Description |
|---|---|
| `AddCallSignPatrolSoldier(gameId)` · `RemoveCallSignPatrolSoldier(gameId)` · `ClearCallSignPatrolSoldiers()` | Give patrol soldiers their own callsigns |

### Optical camo

| Function | Description |
|---|---|
| `EnableSoldierStealthCamo(soldierNameOrId, enable)` | Make a soldier invisible |
| `ClearSoldierStealthCamoOverrides()` | Remove all camo overrides |

### Enemy names & info text

| Function | Description |
|---|---|
| `SetEnemyUnitName(langId)` · `ClearEnemyUnitName()` | Unit name for **all** enemies |
| `SetEnemyInformationLangId(langId)` · `ClearEnemyInformationLangId()` | Binocular info text for **all** enemies |
| `SetEnemyUnitNameForSoldier(soldierNameOrId, langId)` · `ClearEnemyUnitNameForSoldier(...)` · `ClearAllEnemyUnitNameForSoldiers()` | Per-soldier unit name |
| `SetEnemyInformationLangIdForSoldier(soldierNameOrId, langId)` · `ClearEnemyInformationLangIdForSoldier(...)` · `ClearAllEnemyInformationLangIdForSoldiers()` | Per-soldier info text |

### Soldier chatter

| Function | Description |
|---|---|
| `SetOccasionalChatList(labels)` | Set the occasional-chat lines (a table of labels) |
| `InsertToOccasionalChatList(labels)` · `RemoveFromOccasionalChatList(labels)` · `ResetOccasionalChatList()` | Add / remove / reset |

```lua
-- Officer VIP with optical camo and a custom binocular name
V_TppEnemy.SetVIPImportant("sol_vip_0000", true, "V_CPRGZ0040")
V_TppEnemy.EnableSoldierStealthCamo("sol_vip_0000", true)
V_TppEnemy.SetEnemyUnitNameForSoldier("sol_vip_0000", "my_vip_name") -- my_vip_name is a langId
```

---

## V_TppHostage

Track "lost" hostages and give them custom radio labels. Also an
**Infinite Heaven mission module**.

| Function | Description |
|---|---|
| `SetLostHostage(hostageNameOrId, gender, hostageLostLabel)` | Track a hostage as "lost", with `gender` and the radio `label` used when reported missing |
| `RemoveLostHostage(hostageNameOrId)` · `ClearLostHostages()` | Stop tracking |
| `SetLostHostageFromPlayer(hostageNameOrId, enable)` | Track a hostage the player is carrying/Fultoning |
| `AutoSetLostHostage()` · `AutoSetLostHostageFromPlayer(enable)` | Auto-track the mission's hostages |
| `BuildHostageList()` | (Re)build the internal hostage list |
| `IsHostageFemale(hostageNameOrId)` · `IsHostageChild(hostageNameOrId)` | Returns `true`/`false` |
| `SetCustomLostLabel(key, value)` · `ClearCustomLostLabel(key)` · `ClearAllCustomLostLabels()` · `RegisterCustomLostLabels(t)` · `RefreshCustomLabels()` | Custom lost-labels |

```lua
V_TppHostage.SetLostHostage("hostage_woman_0", "FEMALE", "mymod_radio_woman_missing") -- mymod_radio_woman_missing can be left nil for the default.
-- ...or just track every hostage the mission spawns:
V_TppHostage.AutoSetLostHostage()
```

---

## V_TppSahelan

Customize the Sahelanthropus boss. Colors are `r, g, b, a` floats `0`–`1`
(`a` optional). `mode`/`phase` selects the battle phase
(`TppSahelan2.SAHELAN2_PHASE_*`); pass `-1`/`nil` for all phases.

| Function | Description |
|---|---|
| `SetSahelanFova(fv2Path)` · `ClearSahelanFova()` | Apply / clear a custom `.fv2` fova |
| `SetEyeLampColor(r, g, b, a, mode)` · `ClearEyeLampColor()` | Eye-lamp color override |
| `SetEyeLampDisco(enabled, speed, a)` | Cycle the eye lamp through colors (`speed` default `2.0`) |
| `SetHeartLightColor(r, g, b, a, phase)` · `ClearHeartLightColor()` | Heart-light color override |
| `SetHeartLightDisco(enabled, speed, a)` | Cycle the heart light through colors |
| `SetPhase(phase)` · `GetPhase()` | Force / read the battle phase |
| `SetEyeLampColorLogging(enabled)` | Toggle eye-color debug logging |

```lua
V_TppSahelan.SetEyeLampColor(1.0, 0.0, 0.0, 1.0)       -- red eye, all phases
V_TppSahelan.SetHeartLightColor(0.0, 0.4, 1.0, 1.0)    -- blue heart, all phases
V_TppSahelan.SetEyeLampDisco(true, 3.0)                -- fast color cycling
```

---

## V_TppCassette

Play, pause and stop cassette tapes.

| Function | Description |
|---|---|
| `PlayCassetteTape(trackOrName, isLoop, playAll)` | Play a tape by track **name** (e.g. `"tp_sp_01_03"`) or **direct-play ID** |
| `PauseCassette(fadeSec)` · `ResumeCassette(fadeSec)` | Pause / resume with optional fade |
| `StopCassette(fadeSec, stopByUser)` | Stop playback |
| `GetCassettePlayingTime()` · `GetCassettePlayingTrackId()` | Playback queries |
| `SetCassetteSpeakerEnabled(enable)` · `IsCassetteSpeakerEnabled()` | Route through the in-world cassette speaker |

```lua
V_TppCassette.PlayCassetteTape("tp_sp_01_03", true, false)
```

---

## V_TppSound

| Function | Description |
|---|---|
| `SetSoldierVoicePitch(soldierNameOrId, cents)` | Shift a soldier's voice pitch by `cents` (positive = higher) |
| `UnsetSoldierVoicePitch()` | Clear all voice-pitch overrides |

```lua
V_TppSound.SetSoldierVoicePitch("sol_vip_0000", -200)  -- deeper voice
```

---

## V_TppMusicManager

| Function | Description |
|---|---|
| `SetGameOverMusic(isEnable, gameOverType, playEvent, stopEvent)` | Custom Game Over track. `gameOverType` selects which Game Over; `playEvent`/`stopEvent` are the Wwise events |

```lua
V_TppMusicManager.SetGameOverMusic(true, V_TppGameObject.GAME_OVER_GENERAL, "Play_bgm_s10010_gameover", "Stop_bgm_s10010_gameover")
```

---

## V_TppCommandPost

Tune how long a command post stays in **Caution**. Pass a command-post ID
as `cpId`, or omit it / pass `nil` for all posts globally.

| Function | Description |
|---|---|
| `SetGlobalCautionPhaseDuration(seconds)` | Caution duration for every command post |
| `SetCautionPhaseDuration(cpId, seconds)` | Caution duration for one post |
| `GetCautionPhaseDuration(cpId)` · `GetRemainingCautionPhaseTime(cpId)` | Queries |
| `UnsetCautionPhaseDuration(cpId)` | Restore vanilla behavior |

```lua
V_TppCommandPost.SetGlobalCautionPhaseDuration(180)  -- enemies stay alert for 3 minutes
```

---

## V_TppHelicopter

| Function | Description |
|---|---|
| `SetEnableHeliVoice(isEnable, voiceEvent, radioEvent)` | Enable/disable heli voice, optionally overriding the events |
| `PilotCallVoice(voice)` | Play a pilot **voice** line |
| `PilotCallRadio(line1, line2)` | Play a pilot **radio** line, Pequad must be realized. |
| `SetTaxiLandingZoneHidden(lz, hidden)` | Hide/show a taxi landing zone |
| `SetTaxiRidePose(option)` | Player pose while riding |
| `SetTaxiRideLog(enabled)` | Toggle taxi ride debug logging |

---

## V_TppPlayer

Override the voice FPK loaded for a player type.

| Function | Description |
|---|---|
| `SetPlayerVoiceFpkPathForType(playerType, path)` | Use a custom voice `.fpk` for a player type |
| `ClearPlayerVoiceFpkPathForType(playerType)` · `ClearAllPlayerVoiceFpkOverrides()` | Remove overrides |

---

## V_TppPickable

Read/set the raw count of a pickable-item locator.

| Function | Description |
|---|---|
| `SetCountRaw(locator, countRaw)` | Set the raw stored count |
| `GetCountRaw(locator)` | Return the raw stored count |
