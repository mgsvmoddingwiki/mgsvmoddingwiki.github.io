---
title: V Framework Lua API
permalink: /V_Framework_Lua_API/
tags: [Lua, Reference, Infinite Heaven]
---

## Usage

[V Framework](/V_Framework) loads as an
[Infinite Heaven](/Infinite_Heaven) module. Its libraries become global Lua
tables available to mission modules and other loaded scripts.

```lua
V_TppUiCommand.SetEmergencyMissionPopup(
  "Emergency!",
  "Mother Base is under attack!"
)

V_TppUiCommand.SetMissionEmergency(10070, true)
```

Mission-specific overrides reset when the mission reloads. Most libraries also
provide explicit `Clear*`, `Unset*`, or reset functions.

Soldiers and hostages may usually be referenced by name or `gameObjectId`.

---

# Lua libraries

## Framework

| Function | Description |
|---|---|
| `V_FrameWork.Log(msg)` | Writes to the V Framework log and visible console. |

---

## Fox utilities

| Function | Description |
|---|---|
| `V_Fox.FNVHash32(name)` | Returns the FNVHash32 of a Wwise event name. |
| `V_Fox.ShowConsole(enabled)` | Shows or hides the log console. |

---

## Pickable

Live editing of pickables placed in the stage (weapons, items and supplies
lying in the world). Address a pickable either by its locator index (the
same index domain as `TppPickable.GetLocatorIndex`) or directly by its
stage locator name.

| Function | Description |
|---|---|
| `V_Pickable.SetCountRawByLocatorIndex(index, count)` | Sets a pickable's contained count/ammo (0–4095). |
| `V_Pickable.GetCountRawByLocatorIndex(index)` | Returns the live count, or `nil`. |
| `V_Pickable.SetCountRawByLocatorName(name, count)` | Same, addressed by locator name. |
| `V_Pickable.GetCountRawByLocatorName(name)` | Same, addressed by locator name. |
| `V_Pickable.SetEquipIdByLocatorIndex(index, equipId)` | Changes which equip the pickable grants (0–2047). |
| `V_Pickable.GetEquipIdByLocatorIndex(index)` | Returns the pickable's equip id, or `nil`. |
| `V_Pickable.SetEquipIdByLocatorName(name, equipId)` | Same, addressed by locator name. |
| `V_Pickable.GetEquipIdByLocatorName(name)` | Same, addressed by locator name. |
| `V_Pickable.SetInfoByLocatorIndex(index, info)` | Sets any subset of pickable fields from a table. |
| `V_Pickable.SetInfoByLocatorName(name, info)` | Same, addressed by locator name. |
| `V_Pickable.GetInfoByLocatorIndex(index)` | Returns the full info table, or `nil`. |
| `V_Pickable.GetInfoByLocatorName(name)` | Same, addressed by locator name. |

Keys of the `info` table (every key is optional in setters; getters return
them all plus `locatorIndex`):

| Key | Meaning |
|---|---|
| `equipId` | Which equip the pickup grants (0–2047). |
| `countRaw` | Contained count/ammo added to the player's stock (0–4095). |
| `secondCountRaw` | Secondary (paired) count, e.g. underslung ammo. |
| `countMax` | Cap on rounds loaded into the picked-up weapon's magazine. |
| `secondCountMax` | Secondary magazine cap. |
| `infoType` | The record's type byte. |
| `flags` | Raw flags word. |

```lua
local idx = TppPickable.GetLocatorIndex("wp_loc0001")
V_Pickable.SetInfoByLocatorIndex(idx, {
  countRaw = 300,
  countMax = 300,
})

V_Pickable.SetInfoByLocatorName("wp_loc0002", {
  equipId = 44,       -- any equip id, e.g. a TppEquip constant
  countRaw = 90,
  countMax = 90,
})

-- read everything back
local info = V_Pickable.GetInfoByLocatorIndex(idx)
if info then
  V_FrameWork.Log("equip " .. info.equipId .. " count " .. info.countRaw)
end
```

Overrides persist for the whole game session and re-apply whenever the
stage rebuilds its pickables. They are keyed by locator index, so an
index-based override set on one map also applies to that index on other
maps. When raising a weapon pickup's ammo, set `countMax` together with
`countRaw`, otherwise the magazine fill stays clamped at the vanilla
value. Ammo boxes do not use `countRaw` as a quantity — leave those
untouched.

---

## Player

### Voice overrides

| Function | Description |
|---|---|
| `V_Player.SetPlayerVoiceFpkPathForType(playerType, fpkPath)` | Loads a custom voice package for a player type. |
| `V_Player.ClearPlayerVoiceFpkPathForType(playerType)` | Restores one player type's vanilla voice package. |
| `V_Player.ClearAllPlayerVoiceFpkOverrides()` | Restores all vanilla player voices. |

### Energy Wall

| Function | Returns | Description |
|---|---|---|
| `V_Player.IsBarrierActive()` | `true` / `false` | Whether the player's Energy Wall shield is currently deployed. |

### Custom outfits

See [V Framework Custom Outfits](/V_Framework_Custom_Outfits).

| Function | Returns | Description |
|---|---|---|
| `V_Player.RegisterOutfit(def)` | `partsType, developId, flowIndex` or `false` | Registers a custom uniform. |
| `V_Player.RegisterHeadOption(def)` | `equipId`, or `0` | Registers a custom head. |
| `V_Player.ExtendVanillaOutfit(def)` | vanilla `partsType`, or `false` | Adds variants or heads to a vanilla outfit. |

---

## Equipment

### Equip IDs

| Function | Description |
|---|---|
| `V_TppEquip.RegisterConstantEquipId(name)` | Allocates an equip ID and exposes it as `TppEquip.<name>`. Returns the number or `false`. |
| `V_TppEquip.AddToEquipIdTable(rows)` | Registers model and package rows for custom equip IDs. |

Each `AddToEquipIdTable` row contains six positional values:

```lua
{
  equipId,
  equipType,
  subId,
  block,
  partsPath,
  packPath,
}
```

Example:

```lua
V_TppEquip.AddToEquipIdTable({
  {
    TppEquip.EQP_WP_Com_sg_020,
    TppEquip.EQP_TYPE_Shotgun,
    TppEquip.WP_Com_sg_020,
    TppEquip.EQP_BLOCK_MISSION,
    "/Assets/tpp/parts/weapon/assemble/shg/sg04_main0_aw0_v00.parts",
    "/Assets/tpp/pack/collectible/primary/EQP_WP_Com_sg_020.fpk",
  },
})
```

Malformed rows are skipped. Valid custom rows are reapplied after the game reloads
its equip table.

Only weapons may use the `EQP_WP_` name prefix - the allocator routes those names
into the equip table's weapon id band. The per-boot log line
`[EquipIdCompression] native occupancy: item band N free of 559, weapon band N free of 89`
shows the shared budget all installed mods draw from.

### Weapon-part declarations

Each function creates named constants and returns the assigned value or `false`.

| Declaration | Constant space | Configured by |
|---|---|---|
| `DeclareWPs` | `WP_*` | `SetGunBasic` |
| `DeclareRCs` | `RC_*` | `SetReceiver` |
| `DeclareBAs` | `BA_*` | `SetBarrel` |
| `DeclareAMs` | `AM_*` | `SetMagazine` |
| `DeclareBLs` | `BL_*` | `SetBullet` |
| `DeclareSKs` | `SK_*` | `SetStock` |
| `DeclareMOs` | `MO_*` | `SetMuzzle` |
| `DeclareSTs` | `ST_*` | `SetSight` |
| `DeclareUBs` | `UB_*` | `SetUnderBarrel` |
| `DeclareLTLS` | laser/light | `SetOption` |
| `DeclareDamages` | `TppDamage.ATK_*` | `SetDamage` |

See [V Framework Custom Weapons](/V_Framework_Custom_Weapons) for the complete
weapon-building guide.

`SetReceiver`'s `receiverParamSetsSound` accepts a root string, a vanilla row
index, or a table `{ name, middle, event, sup, supEvent }` - `sup` (a root) and
`supEvent` (an exact event name) pick the **suppressed**-shot sound independently
of the loud one. See
[Fire sound](/V_Framework_Custom_Weapons/#fire-sound-receiverparamsetssound)
for every form.

### Cross-family handling

| Function | Description |
|---|---|
| `V_TppEquip.SetWeaponHandling{equipId, familyFrom}` | Makes a custom weapon hold, aim, and reload like the vanilla weapon `familyFrom` while keeping its own model, bullet, damage, and menu category. |


Unusable donors are refused with a log message. See
[Cross-family handling](/V_Framework_Custom_Weapons/#cross-family-handling-setweaponhandling)
for donor screening, the family support table, and required `.fpk` files.

---

## Mother Base Management

| Function | Description |
|---|---|
| `V_TppMotherBaseManagement.AddToChangeLocationMenu(def)` | Adds a location to the ACC free-roam list. |
| `V_TppMotherBaseManagement.AddPhotoAdditionalText(rows)` | Adds text to VI photos. |

`AddToChangeLocationMenu` takes a plain array of numeric location codes; each one
becomes an entry in the ACC change-location menu:

```lua
V_TppMotherBaseManagement.AddToChangeLocationMenu{
  40,   -- Gntn
}
```

`AddPhotoAdditionalText` takes an array of row tables. `missionCode`, `photoId`,
and `photoType` are required numbers - a row missing any of them is skipped.
`targetTypeLangId` is the language-entry name of the text shown on the photo:

```lua
V_TppMotherBaseManagement.AddPhotoAdditionalText{
  {
    missionCode      = 10043,
    photoId          = 0,
    photoType        = 0,
    targetTypeLangId = "example_photo_text",
  },
}
```

### Develop record state

| Function | Description |
|---|---|
| `GetDevelopId(key)` | Returns a custom record's allocated develop ID. |
| `SetEquipDeveloped(id)` | Marks the record developed. |
| `SetEquipUndeveloped(id)` | Marks the record undeveloped. |
| `IsEquipDevelopable(id)` | Returns whether requirements are currently met. |
| `IsEquipDeveloped(id)` | Returns whether the record is developed. |
| `SetEquipNew(id, isNew)` | Sets or clears the `NEW` flag. |
| `IsEquipNew(id)` | Returns the `NEW` state. |
| `SetEquipDevelopVisible(id, visible)` | Shows or hides the row at runtime without reloading. |

`SetEquipDevelopVisible` can reveal a hidden item immediately. Revealing an item
still marked `NEW` also triggers its requirements-met announcement.

---

## AddToEquipDevelopTable

```lua
local developId =
  V_TppMotherBaseManagement.AddToEquipDevelopTable(
    "MyMod:MySuit",
    {
      const = {
        equipID            = TppEquip.EQP_SUIT,
        equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Suit,
        langEquipName      = "my_suit_name",
        iconFtexPath       = "/Assets/.../ui_icon_alp",
      },

      flow = {
        grade            = 3,
        developGmpCost   = 500,
        initialAvailable = 0,
      },
    }
  )
```

`developId` and `flowIndex` are allocated automatically from the record key. Do
not supply them manually.

Readable names and raw `pNN` names are both accepted.

### Important `const` fields

| Field | Purpose |
|---|---|
| `equipID` (`p01`) | Equipment ID. Use `EQP_None` for heads. |
| `equipDevelopTypeID` (`p02`) | Main R&D category. |
| `baseEquipDevelopId` (`p03`) | Parent record. Child grades must be higher than the parent. |
| `skill` (`p04`) | Required skill ID. |
| `bluePrintId` (`p05`) | Visibility or blueprint requirement. |
| `langEquipName` (`p06`) | Display-name language ID. |
| `langEquipInfo` (`p07`) | Description language ID. |
| `iconFtexPath` (`p08`) | R&D icon path. |
| `equipDevelopGroupID` (`p09`) | Fine R&D tree group. |
| `langPowerUpInfo0-11` (`p10-p21`) | Upgrade-information language IDs. |
| `langEquipRealName` (`p30`) | Real-name language ID. |
| `isResultRankLimited` (`p31`) | Rank-limited flag. |
| `isCustomEnable` (`p32`) | Customization flag. |
| `isColorChangeEnable` (`p33`) | Color-change flag. |
| `isSecurityStaffEquip` (`p35`) | Security-staff equipment flag. |
| `unk34`, `unk36` | Unknown. |

### `bluePrintId` forms

```lua
-- Always visible
bluePrintId = 0xffff

-- Static visibility
bluePrintId = true
bluePrintId = false

-- Live condition
bluePrintId = function()
  return TppStory.IsMissionCleard(10080)
end

-- Real vanilla blueprint/design
bluePrintId = TppMotherBaseManagementConst.DESIGN_2001
```

Function predicates are checked whenever the R&D menu builds, allowing rows to
appear or disappear during the session.

### Important `flow` fields

| Field | Purpose |
|---|---|
| `sideGrade` (`p51`) | Side-branch slot. Must be unique in the develop family. |
| `grade` (`p52`) | R&D grade, clamped to `1-15`. |
| `developGmpCost` (`p53`) | Development cost. |
| `usageGmpCost` (`p54`) | Deployment or usage cost. |
| `sectionLvForDevelop` (`p55`) | Required section level. |
| `sectionID2ForDevelop` (`p56`) | Secondary section. |
| `sectionLv2ForDevelop` (`p57`) | Secondary section level. |
| `resourceType1/2` (`p58`, `p60`) | Required resource names. |
| `resourceType1Count/2Count` (`p59`, `p61`) | Required quantities. |
| `initialAvailable` (`p62`) | Initial developed state. `0` starts locked. |
| `sectionIDForDevelop` (`p63`) | Main required section. |
| `developSectionLv` (`p64`) | Development section level. |
| `resourceUsageType1/2` (`p65`, `p67`) | Per-use resources. |
| `resourceUsageType1Count/2Count` (`p66`, `p68`) | Per-use quantities. |
| `displayInfo` (`p69`) | Display-info ID. |
| `developTimeMinute` (`p71`) | Development time in minutes. |
| `intimacyPoint` (`p73`) | Intimacy requirement/value. |
| `isValidMbCoin` (`p72`) | Forced to `0`. |
| `isFobAvailable` (`p74`) | Forced to `0`. |
| `unk70` | Unknown. |

The framework automatically repairs invalid grade and side-branch collisions and
writes a warning to the log.

---

## Sound

| Function | Description |
|---|---|
| `V_TppSoundDaemon.SetSoldierVoicePitch(gameObjectId, cents)` | Changes one soldier's voice pitch. |
| `V_TppSoundDaemon.UnsetSoldierVoicePitch()` | Clears all soldier pitch overrides. |
| `V_TppSoundDaemon.SetGameOverMusic(enabled, type, playEvent, stopEvent)` | Replaces Game Over music with Wwise events. |

---

## Cassette

### Playback and visibility

| Function | Description |
|---|---|
| `ShowCassetteTape(fileName)` | Shows a hidden unlocked track. |
| `HideCassetteTape(fileName)` | Hides a track. |
| `PlayCassetteTapeByTrackId(id, loop, playAll)` | Starts playback. |
| `GetTapeTrackId(fileName)` | Returns the track ID. |
| `GetCassettePlayingTime()` | Returns playback time. |
| `GetCassettePlayingTrackId()` | Returns the active track ID. |
| `PauseCassette(fadeSec)` | Pauses playback. |
| `ResumeCassette(fadeSec)` | Resumes playback. |
| `StopCassette(fadeSec)` | Stops playback permanently. |
| `IsCassetteSpeakerEnabled()` | Returns speaker-playback state. |
| `SetCassetteSpeakerEnabled(enabled)` | Enables or disables speaker playback. |

All functions above belong to `V_CassetteCommand`.

### Custom tape helpers

| Function | Description |
|---|---|
| `RegisterRadioCassette(gimmickName, fox2Path, event, fileName)` | Makes a custom tape collectible from a radio. |
| `SetOwnershipCassetteTape(fileName, enabled)` | Locks or unlocks a custom tape. |
| `SetNewFlagCassetteTape(fileName, enabled)` | Sets or clears the `NEW` flag. |

### RegisterCustomTapes

```lua
V_CassetteCommand.RegisterCustomTapes({
  albums = {
    {
      albumId = "custom_album",
      langId  = "custom_album_name",
      type    = "PREINSTALL_MUSIC",
    },
  },

  tracks = {
    {
      albumId   = "custom_album",
      langId    = "custom_track_name",
      fileName  = "custom_track",
      dataTimeJp = 0,
      dataTimeEn = 0,
      unlocked   = 1,
    },
  },
})
```

The function returns `true` on success. Invalid album or track entries are skipped.

#### Album fields

| Field | Required | Purpose |
|---|---:|---|
| `albumId` | Yes | Internal album ID. |
| `langId` | Yes | Display-name language ID. |
| `type` | Yes | Album type string. |

Common album types:

```text
PREINSTALL_MISSION_INFO
PREINSTALL_MUSIC
PREINSTALL_BRIEFING
PREINSTALL_SPECIAL
```

#### Track fields

| Field | Required | Default | Purpose |
|---|---:|---:|---|
| `albumId` | Yes | — | Parent album ID. |
| `langId` | Yes | — | Track display-name language ID. |
| `fileName` | Yes | — | Internal track filename. |
| `dataTimeJp` | No | `0` | Japanese duration metadata. |
| `dataTimeEn` | No | `0` | English duration metadata. |
| `important` | No | `0` | Important flag/value. |
| `special` | No | `0` | Special flag/value. |
| `unlocked` | No | `0` | Initial ownership state. |

The track save index is allocated automatically.

---

## UI

All functions below belong to `V_TppUiCommand`.

### Equipment backgrounds

| Function | Description |
|---|---|
| `SetDefaultEquipBgTexturePath(path, colored, opacity)` | Sets the default player-equipment background. |
| `ClearDefaultEquipBgTexture()` | Restores the player default. |
| `SetEquipBgTexturePath(equipId, path, colored, opacity)` | Sets one player-equipment background. |
| `ClearEquipBgTexture(equipId)` | Clears one player-equipment background. |
| `SetEnemyWeaponBgTexturePath(path, colored, opacity)` | Sets the default enemy-weapon background. |
| `ClearEnemyWeaponBgTexture()` | Restores the enemy default. |
| `SetEnemyEquipBgTexturePath(equipId, path, colored, opacity)` | Sets one enemy-equipment background. |
| `ClearEnemyEquipBgTexture(equipId)` | Clears one enemy-equipment background. |
| `ClearAllEquipBgTextures()` | Clears all player and enemy overrides. |

### Screen textures

| Function | Description |
|---|---|
| `SetLoadingSplashMainTexturePath(path)` | Sets the main loading image. |
| `SetLoadingSplashBlurTexturePath(path)` | Sets the blurred loading image. |
| `ClearLoadingSplashTextures()` | Restores loading textures. |
| `SetMissionTelopSplashTexturePath(path)` | Sets the Mission Telop texture. |
| `UnsetMissionTelopSplashTexturePath()` | Restores the Mission Telop texture. |
| `SetGameOverSplashMainTexturePath(path)` | Sets the main Game Over image. |
| `SetGameOverSplashBlurTexturePath(path)` | Sets the blurred Game Over image. |
| `ClearGameOverSplashTextures()` | Restores Game Over textures. |

### Equipment icons

| Function | Description |
|---|---|
| `SetEquipIdIconFtexPath(equipId, path)` | Replaces one equipment icon. |
| `ClearIconFtexPath(equipId)` | Restores one icon. |
| `ClearAllIconFtexPaths()` | Restores all icons. |

### Emergency missions

| Function | Description |
|---|---|
| `SetMissionEmergency(missionCode, enabled)` | Sets emergency status. |
| `IsMissionEmergency(missionCode)` | Returns emergency status. |
| `SetEmergencyMissionPopup(title, body)` | Sets popup text using raw strings. |
| `SetEmergencyMissionPopupLangId(title, body)` | Sets popup text using language IDs. |
| `ClearEmergencyMissionPopupOverride()` | Restores the vanilla popup. |
| `ShowMissionIcon(title, body, time)` | Shows the icon; `nil` uses the vanilla value. |

### Time Cigarette

| Function | Description |
|---|---|
| `ShowTimeCigaretteUi()` | Shows the UI. |
| `HideTimeCigaretteUi()` | Hides the UI. |

### iDroid announcement popups

| Function | Description |
|---|---|
| `ShowMbDvcAnnouncePopupReport(title, body)` | Shows a Report popup with raw text. |
| `ShowMbDvcAnnouncePopupReportLangId(title, body)` | Shows a Report popup using language IDs. |
| `ShowMbDvcAnnouncePopupReward(title, body)` | Shows a Reward popup with raw text. |
| `ShowMbDvcAnnouncePopupRewardLangId(title, body)` | Shows a Reward popup using language IDs. |

### Enemy information

| Function | Description |
|---|---|
| `SetEnemyInformationLangId(langId)` | Sets the global map/marker enemy name. |
| `ClearEnemyInformationLangId()` | Restores it. |
| `SetEnemyUnitName(langId)` | Sets the global binoculars unit name. |
| `ClearEnemyUnitName()` | Restores it. |
| `SetEnemyInformationLangIdForSoldier(id, langId)` | Sets one soldier's map/marker name. |
| `ClearEnemyInformationLangIdForSoldier(id)` | Clears one soldier override. |
| `ClearAllEnemyInformationLangIdForSoldiers()` | Clears all map-name overrides. |
| `SetEnemyUnitNameForSoldier(id, langId)` | Sets one soldier's binoculars name. |
| `ClearEnemyUnitNameForSoldier(id)` | Clears one binoculars-name override. |
| `ClearAllEnemyUnitNameForSoldiers()` | Clears all binoculars-name overrides. |

### Announcement-log sound

| Function | Description |
|---|---|
| `RegisterAnnounceLogSfx(label)` | Registers a Wwise SFX label. |
| `SetAnnounceLogSE(label, conditionOrStateId)` | Assigns the sound to an announcement entry. |
| `UnsetAnnounceLogSE()` | Removes the active override. |
| `UnregisterAnnounceLogSfx()` | Unregisters the sound label. |

### Mission-select warnings

Add a custom warning line to a mission in the iDroid mission list, keyed by
mission code. Both are addressed by the numeric mission code (e.g. `11082` =
Episode 36, `13006` = a side op), take a lang-id key whose text you supply in
your own lang file, and take an optional color-name string.

| Function | Description |
|---|---|
| `SetMissionAcceptWarning(missionCode, langId, color)` | Red warning line in the **"Accept this mission?"** deploy-confirm popup. |
| `ClearMissionAcceptWarning(missionCode)` | Removes the popup override for one mission. |
| `SetMissionMenuHelp(missionCode, langId, color)` | Yellow help/caution line at the **bottom of the mission list** (the `[TOTAL STEALTH]` / `[EXTREME]` slot). |
| `ClearMissionMenuHelp(missionCode)` | Removes the help override for one mission. |

```lua
-- red accept-popup warning, in a custom color
V_TppUiCommand.SetMissionAcceptWarning(13006, "MustOwnRockets", "cmn-col-red")

-- yellow mission-list help, default color
V_TppUiCommand.SetMissionMenuHelp(11082, "MustOwnRockets")
```

---

## Helicopter

| Function | Description |
|---|---|
| `V_Helicopter.SetEnableHeliVoice(enabled, voiceEvent, radioEvent)` | Overrides Pequod voice and radio events. |
| `V_Helicopter.PilotCallVoice(label)` | Plays a pilot voice line. |
| `V_Helicopter.PilotCallRadio(label1, label2)` | Plays one or two radio lines. Helicopter must be rendered. |
| `V_Helicopter.SetFieldTaxiMissionEnabled(missionCode, enabled)` | Enables or disables Taxi for a mission. |
| `V_Helicopter.SetTaxiLandingZoneHidden(lzName, hidden)` | Hides or shows an LZ on the Taxi map. |
| `V_Helicopter.SetTaxiRideState(state)` | Selects player Taxi pose `1-3`. |
| `V_Helicopter.SetTaxiRideLog(enabled)` | Enables Taxi-pose logging. |
| `V_Helicopter.ResetTaxiState()` | Restores the default Taxi state. |

---

## Sahelanthropus

| Function | Description |
|---|---|
| `V_Sahelan.SetEyeLampColorLogging(enabled)` | Logs Sahelanthropus eye-color changes. |

---

## Constants

### Game Over types

| Constant | Value |
|---|---:|
| `V_TppGameObject.GAME_OVER_GENERAL` | 0 |
| `V_TppGameObject.GAME_OVER_PARADOX` | 1 |
| `V_TppGameObject.GAME_OVER_STEALTH` | 2 |
| `V_TppGameObject.GAME_OVER_CYPRUS` | 3 |

### Outfit Develop groups

| Constant | Value |
|---|---:|
| `V_TppMbDev.EQP_OUTFIT_VARIANT_GRADE` | 0 |
| `V_TppMbDev.EQP_OUTFIT_VARIANT_NAME` | 79 |

---

# SendCommand extensions

## Usage

```lua
GameObject.SendCommand(target, {
  id = "CommandName",
  -- command fields
})
```

The target may be a game object ID, mapped index, type target, or Command Post.
Some global commands ignore the target.

---

## Sahelanthropus commands

Use this target:

```lua
{ type = "TppSahelan2", group = 0, index = 0 }
```

| Command | Fields | Returns | Purpose |
|---|---|---|---|
| `SetSahelanPhase` | `phase` | — | Forces an AI phase. |
| `GetSahelanPhase` | — | number | Returns the current phase. |
| `SetSahelanFova` | `fv2` | — | Applies a custom FOVA. |
| `ClearSahelanFova` | — | — | Clears the FOVA override. |
| `SetEyeLampColor` | `color`, optional `phase` | — | Sets eye-lamp color. |
| `ClearEyeLampColor` | — | — | Clears eye-lamp colors. |
| `SetEyeLampDisco` | `enabled`, `speed`, optional `a` | — | Enables eye color cycling. |
| `SetHeartLightColor` | `color`, optional `phase` | — | Sets heart-light color. |
| `ClearHeartLightColor` | — | — | Clears heart-light colors. |
| `SetHeartLightDisco` | `enabled`, `speed`, optional `a` | — | Enables heart color cycling. |

`phase = -1` applies a light override to every phase.

```lua
GameObject.SendCommand(sahelanId, {
  id = "SetEyeLampColor",
  phase = -1,
  color = { r = 255, g = 0, b = 0, a = 255 },
})
```

Colors accept `0-1` normalized values or `0-255` byte values.

---

## Occasional chats

Target:

```lua
{ type = "TppSoldier2" }
```

| Command | Purpose |
|---|---|
| `SetOccasionalChatList` | Replaces the override list. |
| `InsertToOccasionalChatList` | Adds labels. |
| `RemoveFromOccasionalChatList` | Removes labels. |
| `ResetOccasionalChatList` | Restores vanilla behavior. |

`labels` accepts up to 255 strings or StrCode32 values.

```lua
GameObject.SendCommand({ type = "TppSoldier2" }, {
  id = "SetOccasionalChatList",
  labels = {
    "speech_label_1",
    "speech_label_2",
  },
})
```

---

## Caution phase

Target a specific Command Post ID or `{ type = "TppCommandPost2" }` for all CPs.

| Command | Fields | Returns |
|---|---|---|
| `SetCautionPhaseDuration` | `duration` | — |
| `GetCautionPhaseDuration` | — | seconds |
| `UnsetCautionPhaseDuration` | — | — |
| `GetCautionPhaseRemaining` | — | seconds |

```lua
GameObject.SendCommand(
  GameObject.GetGameObjectId("afgh_enemyBase_cp"),
  {
    id = "SetCautionPhaseDuration",
    duration = 99,
  }
)
```

---

## Friendly fire

| Command | Field | Returns |
|---|---|---|
| `SetFriendlyFire` | `isEnable` | — |
| `IsFriendlyFire` | — | `1` or `0` |

Use a Command Post ID or `{ type = "TppCommandPost2" }`.

---

## Hostages

### Escape state

```lua
GameObject.SendCommand(hostageId, {
  id = "SetEscapeState",
  enable = true,
})
```

When enabled, the prisoner is reported as taken by the player rather than escaped.

### Lost-hostage tracking

| Command | Fields | Purpose |
|---|---|---|
| `SetLostHostage` | `hostageType`, optional `customLostLabel` | Registers a lost hostage. |
| `RemoveLostHostage` | — | Removes one hostage. |
| `ClearLostHostages` | — | Clears all registrations. |

Hostage types:

```text
0 = male
1 = female
2 = child
```

---

## VIP soldiers

| Command | Fields | Purpose |
|---|---|---|
| `SetVIPImportant` | `isOfficer`, optional `deadBodyLabel` | Adds VIP sleep, faint, holdup, and radio handling. |
| `RemoveVIPImportant` | — | Removes one VIP override. |
| `ClearVIPImportant` | — | Clears all VIP overrides. |

```lua
GameObject.SendCommand(soldierId, {
  id = "SetVIPImportant",
  isOfficer = true,
  deadBodyLabel = "speech_dead_body_found",
})
```

---

## Holdup recovery

```lua
GameObject.SendCommand({ type = "TppSoldier2" }, {
  id = "SetUseConcernedHoldupRecovery",
  enable = true,
})
```

Controls custom concerned-soldier holdup recovery for non-VIP soldiers.

---

## Call-sign patrol soldiers

| Command | Purpose |
|---|---|
| `AddCallSignPatrolSoldier` | Adds one soldier. |
| `RemoveCallSignPatrolSoldier` | Removes one soldier. |
| `ClearCallSignPatrolSoldiers` | Clears the full list. |

---

## Soldier stealth camouflage

| Command | Field | Purpose |
|---|---|---|
| `EnableSoldierStealthCamo` | `enable` | Enables or disables optical camouflage for one soldier. |
| `ClearSoldierStealthCamoOverrides` | — | Clears all soldier camo overrides. |

```lua
GameObject.SendCommand(
  GameObject.GetGameObjectId("sol_enemyBase_0000"),
  {
    id = "EnableSoldierStealthCamo",
    enable = true,
  }
)
```

---

## Interrogation voice

`AssignInterrogationWithVoice` is a native command; V Framework adds one optional
field, `soundDialogueEvent`, that overrides the Wwise dialogue event played while the
soldier is interrogated (vanilla plays `DD_vox_ene`).

| Command | Field | Purpose |
|---|---|---|
| `AssignInterrogationWithVoice` | `soundDialogueEvent` *(optional)* | Wwise voice event to play during the interrogation. Omit or set `nil` to use the vanilla `DD_vox_ene`. |

`soundDialogueEvent` accepts a Wwise event name (string) or its FNV1-32 hash (number).
The override is remembered per interrogated command post, so different soldiers can be
given different voices.

```lua
GameObject.SendCommand(
  GameObject.GetGameObjectId("sol_enemyBase_0000"),
  {
    id = "AssignInterrogationWithVoice",
    soundDialogueEvent = "DD_vox_ene", -- name string, or its FNV1-32 hash as a number
  }
)
```

---

## Accepted command value types

Boolean fields accept:

```text
true / false
0 / any nonzero number
```

These fields accept a string or StrCode32:

```text
deadBodyLabel
customLostLabel
entries in labels
```

Strings are converted with `FoxHashes.StrCode32`.

---

# Messages

V Framework emits extra executable-to-Lua messages using the normal MGSV message
system.

See the [Messages guide](https://mgsvmoddingwiki.github.io/Messages/).

## GameObject messages

| Message | Parameters | Fires when |
|---|---|---|
| `AntiAir` | `cpId, isEnable` | A CP notices the support helicopter. |
| `HoldupCancelLookToPlayer` | `gameObjectId` | The player aims at a soldier about to cancel a holdup. |
| `NoticeNoise` | `gameObjectId` | A soldier notices a noise. |
| `NoticeIndis` | `gameObjectId` | A soldier notices something related to the player. |
| `AnimalNotice` | `gameObjectId, noticeKind` | Any wildlife animal notices something. |
| `RequestedHeliTaxi` | `heliId, currentLzHash, destinationLzHash` | A Taxi destination is requested. |

`NoticeNoise` and `NoticeIndis` are **soldiers only** — they come from the soldier
notice AI, which animals never run. Wildlife uses a single `AnimalNotice` message
instead, covering every species through one handler.

`noticeKind` says what the animal reacted to:

| Value | Kind | Meaning |
|---|---|---|
| `0` | `NearThreat` | Herbivore: something came too close. |
| `1` | `NoiseAlert` | Herbivore: startled by a noise. |
| `2` | `NearGameObject` | Wolf or bear: sighted a creature, player, or vehicle. |
| `3` | `Noise` | Wolf or bear: heard a noise. |

Coverage is **goats, sheep, wolves and bears**. Birds, rats and D-Dog have no
per-animal notice node and do not fire this message.

## Radio messages

| Message | Parameters | Fires when |
|---|---|---|
| `HeliStart` | `label1, label2, voiceType` | Pequod begins a voice or radio line. |
| `HeliFinish` | `label1, label2, voiceType` | Pequod finishes the line. |

## Player messages

| Message | Parameters | Fires when |
|---|---|---|
| `OnPlayerLockPickStart` | `playerIndex, gimmickId, doorSide` | Lock picking starts. |
| `OnPlayerLockPickEnd` | `playerIndex, gimmickId, doorSide` | Lock picking finishes. |
| `OffBinocularsMode` | — | Binocular mode ends. |
| `CrawlSideRoll` | `playerIndex, rollPhase, rollCount, direction` | The player performs a side roll. |
| `BarrierDamage` | `playerIndex, before, after` | The Energy Wall barrier takes damage. |

## UI messages

| Message | Parameters | Fires when |
|---|---|---|
| `TimeCigaretteUi` | `playerIndex` | The time-passing cigarette UI becomes visible. |
| `StartWalkMan` | `trackId, isStartByUser` | A cassette tape starts playing (fresh play or resume). |
| `StopWalkMan` | `trackId, isStopByUser` | Cassette playback stops. |
| `PauseWalkMan` | `trackId, isPauseByUser` | Cassette playback is paused. |
| `SpeakerWalkMan` | `trackId, isEnable, isOnByUser` | The walkman speaker mode is toggled (`isEnable` = the mode being switched to). |

`trackId` is the cassette track id (the same value `V_CassetteCommand.GetTapeTrackId`
returns). `isXByUser` is `1` when the action came from the in-game walkman UI, and
`0` when it came from a `V_CassetteCommand` function (`PlayCassetteTapeByTrackId`,
`StopCassette`, `PauseCassette`, `ResumeCassette`, `SetCassetteSpeakerEnabled`).

## Subtitles messages

| Message | Parameters | Fires when |
|---|---|---|
| `SubtitlesEventMessage` | `message` | A `.subp` subtitle uses `[m=myMessage]`. |

`message` is the `StrCode32` hash of the name inside the `[m=…]` tag.

---