---
title: Lua API
permalink: /V_Framework/Lua_API/
tags: [Lua, Reference, Infinite Heaven, V Framework]
redirect_from:
    - /V_Framework_Lua_API/
---

## About this reference

V Framework's libraries are global Lua tables, usable from any Lua file
or [Infinite Heaven](/Infinite_Heaven) module.

Parts: [Lua libraries](#lua-libraries), [SendCommand](#sendcommand),
[Messages](#messages).

| Namespace | Documented in |
|---|---|
| `V_FrameWork` | [Core](#core) |
| `V_Fox` | [Core](#core) |
| `V_TppMotion` | [Motion](#motion) |
| `V_Pickable` | [Pickable](#pickable) |
| `V_TppCollection` | [Collectibles](#collectibles) |
| `V_Player` | [Player](#player) |
| `V_TppBuddyService` | [Buddies](#buddies) |
| `V_TppEquip` | [Equipment](#equipment) |
| `V_ThrowingSystem`, `V_ThrowingImpl`, `V_RangeAttackSystem`, `V_BlastSystem`, `V_NoiseSystem` | [Throwing](#throwing) |
| `V_PlacedSystem` | [Placed items](#placed-items) |
| `V_TppDataUtility` | [Data utility](#data-utility) |
| `V_TppMotherBaseManagement` | [Mother Base Management](#mother-base-management) |
| `V_TppSoldierFace` | [Soldier faces](#soldier-faces) |
| `V_TppSoundDaemon` | [Sound](#sound) |
| `V_CassetteCommand` | [Cassette](#cassette) |
| `V_TppUiCommand` | [UI](#ui) |
| `V_UixUtility` | [V Framework UI](/V_Framework/UI) |
| `V_Helicopter` | [Helicopter](#helicopter) |
| `V_Vehicle` | [Custom vehicles](#custom-vehicles) |
| `V_title_sequence` | [Title sequence](#title-sequence) |
| `V_TppGameObject` | [Game Over types](#game-over-types) |
| `V_TppMbDev` | [Outfit Develop groups](#outfit-develop-groups) |
| `V_PlayerCqcStance` | [Player stances](#player-stances) |
| `V_PlayerSkill` | [Player skills](#player-skills) |
| `V_NoticeKind` | [Notice kinds](#notice-kinds) |
| `V_CallMenuItem` | [Call menu items](#call-menu-items) |
| `V_CallMenuColumn` | [Call menu columns](#call-menu-columns) |
| `V_CallMenuCondition` | [Call menu conditions](#call-menu-conditions) |
| `V_CallMenuIcon` | [Call menu icons](#call-menu-icons) |
| `V_TppDataBase` | [DATABASE tabs](#database-tabs) |
| `V_TppCallSign` | [Radio call signs](#radio-call-signs) |
| `V_ReceiverType` | [Receiver motion types](#receiver-motion-types) |
| `V_MagazineType` | [Magazine motion types](#magazine-motion-types) |
| `V_DogCommandType` | [D-Dog gear](/V_Framework/Buddy_Outfits#d-dog-gear) |

---

# Lua libraries

## Core

| Function | Description |
|---|---|
| `V_FrameWork.Log(msg)` | Writes to the V Framework log and visible console. |
| `V_FrameWork.LogDebug(message)` | Same, Debug build of V Framework only; Release ignores it. `message` required. |
| `V_FrameWork.SetFrameCallback(name, fn)` | Calls `fn(seconds)` every frame, loading screens included. `seconds` = real time since launch. Same `name` replaces; `nil` removes. Returns `true` when stored. |
| `V_FrameWork.GetVersion()` | Installed version string, e.g. `"2.0.0"`. Missing before 2.0.0. |
| `V_Fox.FNVHash32(name)` | FNVHash32 of a Wwise event name. |
| `V_Fox.GetPadDeviceType(pad)` | `"PAD_DEVICE_TYPE_"` + `"X360"`, `"PS3"`, `"PS4"`, `"OTHERS"` or `"UNKNOWN"`. `pad` `0`-`3`, optional (main pad). Every XInput pad reads X360; only the first DualShock 4 (CUH-ZCT1) reads PS4, a CUH-ZCT2 or DualSense reads PS3. |
| `V_Fox.ShowConsole(enabled)` | Shows or hides the log console. |
| `V_Fox.SwapGani(fromGani, toGani)` | Every character plays `toGani` instead of `fromGani`. `toGani` must be in the character's loaded motion archives. Cleared at mission end; set it in mission init. |
| `V_Fox.RestoreGani(fromGani, toGani)` | Undoes that swap. `toGani` optional. |

Frame callback: keep it light. A Lua error is logged once per distinct
text and the callback keeps running. Register it again in `Init` (same
`name`) so a reloaded module replaces it.

```lua
-- PW-style fulton animation
V_Fox.SwapGani("/Assets/tpp/motion/SI_game/fani/bodies/enet/enetnon/enetnon_ful_st_f", "/Assets/tpp/motion/SI_game/fani/bodies/enem/enemasr/enemasr_snak_fulton_q_st_f")
```

A library table existing (`if V_TppDataUtility then`) does not mean a
newer function or SendCommand field does:

```lua
if V_FrameWork and V_FrameWork.GetVersion then
  V_FrameWork.Log("V Framework " .. V_FrameWork.GetVersion())
end
```

Log: `mod\V_FrameWork\V_FrameWork_log.txt`. A mission or area pack still
loading after 30 s logs `WARNING: LoadWatch: pack <path> has been
loading for 30 s without finishing, ...` once, ending with what it waits
on ("still waiting for its file", "still building its contents", "it
failed and is being reset" / "went back to the queue"); an unnamed path
shows its path code. `LoadWatch: pack ... finished or was dropped after
all` follows if it finishes. Usual cause: a pack path no installed file
matches, in a mission or `AddMissionPacks` list or from avatar or fova
settings.

### Feature switches

| Function | Description |
|---|---|
| `V_FrameWork.SetFeatureEnabled(name, enabled)` | Turns the feature `name` on (`true`) or off (`false`). |
| `V_FrameWork.IsFeatureEnabled(name)` | Returns `true` / `false`; nothing for an unknown `name`. |

Both parameters required. `name`: one below, exact case. An unknown
`name` or non-boolean `enabled` logs a warning and changes nothing.

All on by default. Off stops new instances; one under way finishes.
Lasts until set again or the game closes, but each mission load the
[Infinite Heaven menu](/V_Framework#infinite-heaven-menu) re-applies
every switch with an option. Switches stop only V Framework's automatic
content; what a mission sets itself (`SetConversationList`,
`SetSaluteVoiceList`, `SetHeadMarkColor`, `RequestInvestigation`,
`LieToRadio`, ...) still works.

| Name | Infinite Heaven option |
|---|---|
| `SurveyTeams` | Survey teams |
| `BackupRequests` | Backup requests |
| `UavDownChecks` | Downed UAV checks |
| `SoldierRadioAnswers` | Soldier radio answers |
| `SoldierConversations` | Soldier conversations |
| `LongBarrelRadio` | Long-barrel crouch radio |
| `DyingMarkerColour` | Dying soldier marker |
| `RestoredIdroidLines` | Restored iDroid lines |
| `PainAndDeathLines` | Pain and death lines |
| `BuddyLines` | Buddy lines |
| `QuietLines` | Quiet's lines |
| `PinUpPosterReactions` | Pin-up poster reactions |
| `OcelotBinocularComments` | Ocelot binocular comments |
| `LiquidDriving` | Liquid drives vehicles |
| `DangerLandingZones` | Danger High LZs |
| `ModerateLandingZones` | Danger Moderate LZs |
| `PequodExtraLines` | Pequod extra lines |
| `PequodLzMove` | Pequod LZ move |
| `MillerChopperReports` | Miller's chopper reports |
| `StaffSaluteNews` | Staff salute news |
| `StaffTalk` | Staff talk |

  - `PequodExtraLines` off: Pequod still moves LZ, with the vanilla
    line; `PequodLzMove` off stops the move.
  - `DyingMarkerColour` off keeps [head-mark
    colours](#head-mark-colours) set on single soldiers.
  - `ModerateLandingZones` needs `DangerLandingZones` on; that off makes
    every LZ Danger Low (vanilla).
  - `SoldierConversations` and `StaffTalk` are read when a mission
    starts.
  - Call Em and Lie to Them have no switch: hide them with
    `V_Player.HideCallMenuItem(V_CallMenuItem.CALL_COMRADE)` /
    `(V_CallMenuItem.FALSE_RADIO_RESPONSE)` ([call menu](#call-menu)).

```lua
V_FrameWork.SetFeatureEnabled("SurveyTeams", false)
```

---

## Motion

| Function | Returns | Description |
|---|---|---|
| `V_TppMotion.AddClipEvent{clip, frame, event}` | `true` / `false` | Adds a motion event to a clip, no archive edit. Fires each time the clip passes `frame`, any speed. Not in FOB. |

| Field | Required | Purpose |
|---|---|---|
| `clip` | Yes | A [clip ID](/V_Framework/Custom_Weapons#clip-fields). |
| `frame` | Yes | Clip frame, `0` or more. |
| `event` | Yes | Event name without `MTEV_` (e.g. `"ReloadAmmo"`), or its hash. Own names fire the [`ClipEvent`](#gameobject-messages) message (Snake's and his gun's clips only). |

V Framework's own event: `EjectChamberRound` - on a gun or Snake reload
clip, ejects a casing if the magazine wasn't empty; never on
under-barrel reloads.

```lua
V_TppMotion.AddClipEvent{ clip = "/Assets/tpp/motion/SI_game/fani/props/ar01/ar01/ar01_aw0_s_fre_rld.gani", frame = 134, event = "EjectChamberRound" }
```

---

## Pickable

Weapons, items and supplies lying in the world, by locator index
(`TppPickable.GetLocatorIndex`) or name. Each function has a
`...ByLocatorIndex(index, ...)` and a `...ByLocatorName(name, ...)`
form.

| Function | Description |
|---|---|
| `V_Pickable.SetCountRawByLocator*(key, count)` | Sets the contained count/ammo (`countRaw`). |
| `V_Pickable.GetCountRawByLocator*(key)` | Live count, or `nil`. |
| `V_Pickable.SetEquipIdByLocator*(key, equipId)` | Changes which equip it grants. |
| `V_Pickable.GetEquipIdByLocator*(key)` | Its equip ID, or `nil`. |
| `V_Pickable.SetInfoByLocator*(key, info)` | Sets any subset of the fields below. |
| `V_Pickable.GetInfoByLocator*(key)` | Full info table, or `nil`. |

`info` fields (`GetInfoByLocator*` returns all of them plus
`locatorIndex`):

| Field | Required | Purpose |
|---|---|---|
| `equipId` | No (unchanged) | Equip the pickup grants. |
| `countRaw` | No (unchanged) | Count/ammo it gives (`0-4095`). |
| `secondCountRaw` | No (unchanged) | Second count, e.g. under-barrel ammo. |
| `countMax` | No (unchanged) | Rounds loaded into the picked-up weapon. |
| `secondCountMax` | No (unchanged) | Second magazine cap. |
| `infoType` | No (unchanged) | Pickup type. |
| `flags` | No (unchanged) | Pickup flags. |

```lua
V_Pickable.SetInfoByLocatorName("wp_loc0002", { equipId = 44, countRaw = 90, countMax = 90 })
```

Overrides clear at mission change; set them each mission. Raise
`countMax` with `countRaw` for weapons. Leave `countRaw` alone on ammo
boxes.

---

## Collectibles

Custom world collectibles (like plants and diamonds), placed anywhere.

| Function | Description |
|---|---|
| `V_TppCollection.RegisterCollectionType(name, spec)` | Registers a type; returns its ID, also as `TppCollection.<name>`. |
| `V_TppCollection.AddCollection(name, type, x, y, z [, rotY])` | Places one. |
| `V_TppCollection.RemoveCollection(name)` | Removes a placement. |
| `V_TppCollection.SetCollectionTypeIcon(type, ftexPath)` | Pickup icon. |
| `V_TppCollection.SetCollectionTypeLangId(type, langId)` | Display name (`.lng2` entry). |
| `V_TppCollection.GetMapCollections()` | Collectibles the iDroid map shows (found by Intel Materials or Plants Surveying, or marked), as `{ index, type, collected, x, y, z }`. Types `7`-`46` materials (8 each: common, minor, precious metal, fuel, biotic), `100`-`107` medicinal plants. Nothing in FOB. |

`type`: type name or ID.

```lua
V_TppCollection.RegisterCollectionType("MyMod:Collect", {
  Model = "/Assets/tpp/item/ibo/Scenes/ibo6_main0_def.fmdl",
  RootModel = "/Assets/.../stump.fmdl",
})
V_TppCollection.AddCollection("MyCollect_00", "MyMod:Collect", 185.1, 336.3, 156.8, 90)
```

`spec` fields:

| Field | Required | Purpose |
|---|---|---|
| `Model` | Yes | Mesh to draw. |
| `Color` | No (`{r=0.9, g=0.9, b=0.5, a=0.5}`) | Pickup-burst colour and alpha. |
| `Strength` | No (`{x=0.5, y=1.0, z=0.5, w=1.0}`) | Pickup-burst size and spread. |
| `Yoffset` | No (`0.25`) | Burst height above the item, metres. |
| `GroundEffectSize` | No (`0.4`) | Ground decal size. |
| `RootModel` | No | Mesh left after picking. |
| `Fova` | No | Model variation `.fv2`. |
| `IsHerb`, `IsMaterial`, `IsDiamond` | No (`false`) | Answers for `TppCollection.Is*ByType`. |

---

## Player

### Voice overrides

| Function | Description |
|---|---|
| `V_Player.SetPlayerVoiceFpkPathForType(playerType, fpkPath)` | Custom voice package for a player type, from the next mission load or outfit change. |
| `V_Player.ClearPlayerVoiceFpkPathForType(playerType)` | Restores that type's vanilla package. |
| `V_Player.ClearAllPlayerVoiceFpkOverrides()` | Restores all vanilla packages. |
| `V_Player.SetPlayerVoiceTypeForType(playerType, voiceType, dialogueEvent, dialogueEvent2)` | Forces a type's voice now. `voiceType`: name (`"ddmsoldiera"`) or number. Optional dialogue events: your bank's Dialogue Events. |
| `V_Player.ClearPlayerVoiceTypeForType(playerType)` | Restores that type's voice now. |
| `V_Player.ClearAllPlayerVoiceTypeOverrides()` | Restores all voices. |

The package must match the voice type ([Outfit
voice](/V_Framework/Custom_Outfits#outfit-voice)) or it is silent. FOB:
your own character only.

### Energy Wall

| Function | Returns | Description |
|---|---|---|
| `V_Player.IsBarrierActive()` | `true` / `false` | Whether the Energy Wall is deployed. |

### Health

None of the setters apply in FOB; values last until the next mission
load.

| Function | Returns | Description |
|---|---|---|
| `V_Player.GetPlayerLife()` | life, or `nil` | Current life. |
| `V_Player.SetPlayerLife(life)` | - | `life` required, capped at the max. |
| `V_Player.GetLifeRecoveryPerSecond()` | number, or `nil` | Recovery rate (`TppPlayer2Parameter` `lifeRecoveryPerSecond`). |
| `V_Player.SetLifeRecoveryPerSecond(value)` | - | `value` required, below `0` = `0`. Full speed regains about 0.75 x `value` per second. |
| `V_Player.GetLifeRecoveryCooldownTimer()` | seconds, or `nil` | Delay after a hit before recovery (vanilla `4`). |
| `V_Player.SetLifeRecoveryCooldownTimer(seconds)` | - | `seconds` required, below `0` = `0`. Extreme missions use 1.5 x (vanilla `6`). |

Recovery ramps to full speed over 10 s after the delay.

### Respawn

Vanilla `Player.RequestToRespawn()` also revives the player outside FOB.
Your mod must block `TppMission.ReserveGameOver` for `PLAYER_DEAD` /
`PLAYER_FALL_DEAD` itself.

### Fultons

Setters do nothing in FOB.

| Function | Returns | Description |
|---|---|---|
| `V_Player.ResupplyFulton()` | new count, or `nil` | Refills to the max. |
| `V_Player.SetFultonCount(count)` | new count, or `nil` | `count` required, capped at the max. |
| `V_Player.GetFultonCount()` | count and max, or `nil` | Max = what the Fulton grade allows. |

### Battery charge

| Function | Returns | Description |
|---|---|---|
| `V_Player.GetItemBattery(equipId)` | charge, or `nil` | Custom item's charge, `0`-`1`. `nil` without a [battery](#item-batteries). |
| `V_Player.SetItemBattery(equipId, fraction)` | charge, or `nil` | Sets it. Nothing in FOB. |
| `V_Player.SetItemOn(equipId, on)` | - | `equipId` required; `on` `true` / `false`, `nil` = normal. |
| `V_Player.IsItemOn(equipId)` | `true` / `false`, or `nil` when never set | Whether it is on. |

On: drains while in the loadout, selected or not. Off: never drains,
recharges. Never set: [normal](#item-batteries). An on item that runs
empty turns off and sends `ItemBatteryEmpty`; unequipped only if
selected. Lasts until the game closes. Toggle it from an
[`ItemUse`](#player-messages) handler.

### Item count

| Function | Returns | Description |
|---|---|---|
| `V_Player.GetItemCount(equipId)` | `count, max`, or `nil` | `nil` without a [count](#item-counts). |
| `V_Player.SetItemCount(equipId, count)` | new count, or `nil` | Clamped to `0`-`max`. `nil` and a log warning without a count. Nothing in FOB. |

### Item effects

Starts and stops vanilla consumable effects on Snake without the item;
for custom items, from an [`ItemUse`](#player-messages) handler.

| Function | Returns | Description |
|---|---|---|
| `V_Player.StartSkill(skill, level, seconds)` | `true` when accepted | Starts the effect. |
| `V_Player.StopSkill(skill)` | `true` / `false` | Ends it now. |
| `V_Player.IsSkillActive(skill)` | `true` / `false` | Whether it is running. |
| `V_Player.GetSkillTime(skill)` | seconds left, or `nil` when not running | Time left. |

| Parameter | Required | Purpose |
|---|---|---|
| `skill` | Yes | A [`V_PlayerSkill`](#player-skills). |
| `level` | No (`1`) | Grade whose length applies ([Item parameters](#item-parameters)). |
| `seconds` | No (the grade's length) | Own length; time left becomes exactly this. Ignored for `Acceleramin`. |

  - Without `seconds`, a running effect gains the grade's length.
  - Applies on the next HUD frame; a call while the player is not in
    control (loading) is dropped after 2 s.
  - From a custom item's `ItemUse`, that item shows the effect's time
    bar, unless it has a battery.
  - `ParasiteMist`, `ParasiteCamo`, `ParasiteHard`: Parasite Suit only,
    else `false` (logged once).
  - `false` in FOB.

```lua
-- Player message "ItemUse"
func = function(equipId, fromWheel)
  if equipId == TppEquip.EQP_IT_FieldStim then
    V_Player.StartSkill(V_PlayerSkill.Pentazemin, 1, 45)
  end
end
```

### CQC

| Function | Description |
|---|---|
| `V_Player.RequestToSetTargetCqcStance(stance)` | During a CQC hold: `V_PlayerCqcStance.STAND` or `.SQUAT`. |

#### Quiet's CQC

Also in the [Infinite Heaven menu](/V_Framework#infinite-heaven-menu).
Not in FOB.

| Function | Description |
|---|---|
| `V_Player.SetQuietHoldCqc(enable)` | Quiet can CQC-hold and choke. |
| `V_Player.SetQuietInterrogate(enable)` | Quiet can interrogate. |

### Call menu

| Function | Description |
|---|---|
| `V_Player.AddCallMenuItem(def)` | Adds an option ([fields](#addcallmenuitem-fields)). Returns its ID. |
| `V_Player.GetCallMenuItem(key)` | ID of the option with that `key`, or `nil`. |
| `V_Player.SetCallMenuItemInPlaceOf(item, other)` | Puts an option in place of another; `nil` puts it back. |
| `V_Player.DisableCallMenuItem(item)` | Greys it out. |
| `V_Player.EnableCallMenuItem(item)` | Selectable, even where the game greys it out. |
| `V_Player.HideCallMenuItem(item)` | Removes it from the menu. |
| `V_Player.ShowCallMenuItem(item)` | Brings it back. |
| `V_Player.ResetCallMenuItem(item)` | Back to normal. |
| `V_Player.ResetAllCallMenuItems()` | Every option back to normal. |

`item`: a [`V_CallMenuItem`](#call-menu-items), an `AddCallMenuItem` ID,
or a `key`. All parameters required, except `other` may be `nil`.

#### AddCallMenuItem fields

| Field | Required | Purpose |
|---|---|---|
| `key` | Yes | Unique name, e.g. `"MyMod_FireFlare"`. Same key again updates the option. |
| `label` | Yes | Lang key of the name. |
| `column` | Yes | A [`V_CallMenuColumn`](#call-menu-columns). |
| `description` | No (`label`) | Lang key of the help text. |
| `message` | No (the item ID) | Sent as `item` in `ItemSelected`; match it with `sender`. |
| `exclusive` | No | A name, e.g. your mod's. Pages with options of this name are kept for them; other options skip those pages. |
| `inPlaceOf` | No | A `V_CallMenuItem` whose row this takes. |
| `when` | No (`ALWAYS`) | A [`V_CallMenuCondition`](#call-menu-conditions). |
| `voice` | No | Player voice labels (e.g. `"PLA0040_001"`) or IDs; one plays at random on pick. |
| `icon` | No | Column logo: a [`V_CallMenuIcon`](#call-menu-icons), or an `.ftex` sheet of 2x2 white shapes on transparent. Topmost option with an `icon` wins. |
| `iconCell` | No (`0`) | Sheet quarter: `0` top-left, `1` top-right, `2` bottom-left, `3` bottom-right. |
| `iconUvRepeat` | No (`{ 0.5, 0.5 }`) | `{ u, v }` share of the texture shown; `{ 1, 1 }` for a single-picture `.ftex`. |
| `iconUvShift` | No (from `iconCell`) | `{ u, v }` start, `0`-`1`. Overrides `iconCell`. |

Picking any option, yours or the game's, sends
[`ItemSelected`](#player-messages).

```lua
V_Player.AddCallMenuItem{
  key       = "MyMod_FireFlare",
  label     = "my_mod_flare",
  message   = "FireFlare",
  column    = V_CallMenuColumn.INTERROGATION,
  when      = V_CallMenuCondition.HOLDING,
  exclusive = "MyMod",
}
V_Player.SetCallMenuItemInPlaceOf(V_CallMenuItem.CALL_COMRADE, V_CallMenuItem.KNOCK)
```

In `Messages()`:

```lua
Player = {
  { msg = "ItemSelected", sender = "FireFlare", func = function(item, heldSoldierId) end },
},
```

### Demo attachment

| Function | Description |
|---|---|
| `V_Player.RequestToAttachInDemo(info)` | During a demo, attaches the player to another object's connect point (`.fcnp`). `true` on success. |
| `V_Player.ClearAttachInDemo()` | Releases the player. |

`info` fields:

| Field | Required | Purpose |
|---|---|---|
| `ownerId` | Yes | Object to ride: locator name or `gameObjectId`. |
| `connectPoint` | Yes | Connect-point name on it. |
| `unattachOnSleep` | No (`true`) | Detach when the owner sleeps. |

```lua
V_Player.RequestToAttachInDemo{ ownerId = GameObject.GetGameObjectId("Cargo_Truck_WEST_001"), connectPoint = "CNP_DECK_A", unattachOnSleep = false }
```

### Space check

| Function | Returns | Description |
|---|---|---|
| `V_Player.IsThereEnoughSpaceAroundPlayer(minX, maxX, minZ, maxZ)` | `true` / `false` | Whether that area around the player is clear. `X` right (+) / left (-), `Z` forward (+) / back (-), e.g. `(-2.5, 2.5, -2.5, 1.5)`. |

### Custom outfits

See [V Framework Custom Outfits](/V_Framework/Custom_Outfits).

| Function | Returns | Description |
|---|---|---|
| `V_Player.RegisterOutfit(def)` | `partsType, developId, flowIndex` or `false` | Registers a custom uniform. |
| `V_Player.RegisterHeadOption(def)` | `equipId`, or `0` | Registers a custom head. |
| `V_Player.ExtendVanillaOutfit(def)` | vanilla `partsType`, or `false` | Adds variants or heads to a vanilla outfit. |
| `V_Player.GetOutfitInfo(key, variant)` | `partsType, camoType, developId`, or `false` | Set `vars.playerPartsType` / `vars.playerCamoType` to them to wear it. `variant` optional (`0` = the outfit itself). |
| `V_Player.GetOutfits(playerType)` | list of `{ key, name, developId, partsType, variants }` | Registered outfits that type can wear. `playerType` optional (current). |
| `V_Player.GetHeadOptionSlot(key)` | `faceEquipId, equipId`, or `false` | The `vars.playerFaceEquipId` your head wears under. |
| `V_Player.GetHeadOptions()` | list of `{ key, slot, equipId, name, playerTypes }` | Registered custom heads. |
| `V_Player.PlayHeadMotion(clip)` | `true` / `false` | Plays a clip from the worn head's [`motion`](/V_Framework/Custom_Outfits#head-motion). |
| `V_Player.PlayHeadEffect(name)` | `true` / `false` | Starts an effect from its `motion.effects`. |
| `V_Player.StopHeadEffect(name)` | `true` / `false` | Stops it. |
| `V_Player.PlayHeadSound(event, point)` | `true` / `false` | Sound event from the worn head. `point` optional. |

`key`: the registration key. `GetOutfits`: `name` = R&D name (or key);
`variants` = `{ camo, variant, name }`, the outfit first, `variant` as
`GetOutfitInfo` takes it. Undeveloped variants with their own R&D row
are left out, so list position can differ from `variant`. No
`displayName`, no `name`. `partsType` and `camo` are `0` until the
outfit has IDs (`GetOutfitInfo` gives them).

#### Outfit colours

See [colours](/V_Framework/Custom_Outfits#colours).

| Function | Returns | Description |
|---|---|---|
| `V_Player.GetOutfitColors(key)` | `{ key, worn, variant, primary, secondary }`, or `nil` | Each channel `{ selected, colors }`; `colors` a list of `{ icon, pack }` (`pack` = own `fpk`). `variant` `0` = the outfit, `n` = `variants[n]`. |
| `V_Player.GetOutfitColor(key, channel)` | number, or `nil` | Picked colour of a channel. |
| `V_Player.SetOutfitColor(key, channel, index, save)` | `true` / `false` | Picks colour `index`; `true` when applied or pending. |
| `V_Player.GetSortieOutfitCursor()` | `{ key, variant, worn, colors }`, or `nil` | Custom outfit under the Sortie Prep cursor. `colors` = has colours. |
| `V_Player.EquipSortieOutfitCursor()` | `true` / `false` | Equips it. |

| Parameter | Required | Purpose |
|---|---|---|
| `key` | No (worn outfit) | Registration key; `nil` = the worn custom outfit. |
| `channel` | Yes | `"primary"` / `"secondary"`, or `1` / `2`. |
| `index` | Yes | Colour number, from `1`. |
| `save` | No (`true`) | `false` previews until the mission changes. |

```lua
V_Player.SetOutfitColor("MyMod:MySuit", "primary", 2)
```

### Liquid

Sortie Prep has a Liquid (Eli) row; Lua can set `vars.playerType =
PlayerType.LIQUID`. Not offered in Snake-only missions or FOB; an FOB
mission switches him back to Snake.

  - No Uniform or Head option, no bionic arm.
  - Drives only with [`LiquidDriving`](#feature-switches) on; else
    passenger only.
  - Carries only children, female soldiers and female prisoners. In his
    CQC hold a child stays; an adult slips out, as a child does from
    Snake's.
  - Own voice; other player types use it with [`voiceType =
    "eli"`](/V_Framework/Custom_Outfits#outfit-voice).

---

## Buddies

See [V Framework Buddy Outfits](/V_Framework/Buddy_Outfits).

| Function | Returns | Description |
|---|---|---|
| `V_TppBuddyService.RegisterBuddyOutfit(def)` | costume, tack or gear number and `developId`, or `false` | Registers a Quiet costume, D-Horse tack or D-Dog gear. |
| `V_TppBuddyService.SetBuddyOutfit(key)` | `true` / `false` | Equips a registered buddy outfit or Quiet weapon. |
| [`V_TppBuddyService.SetQuietWeaponMotion(def)`](/V_Framework/Buddy_Outfits#quiet-weapon-animations) | `true` / `false` | Gives a Quiet weapon its own body and weapon animations. |

---

## Equipment

Weapon-building guide: [V Framework Custom
Weapons](/V_Framework/Custom_Weapons).

### Equip IDs

| Function | Description |
|---|---|
| `V_TppEquip.RegisterConstantEquipId(name)` | Allocates an equip ID as `TppEquip.<name>`. Returns the number or `false`. |
| `V_TppEquip.AddToEquipIdTable(rows)` | Gives custom equip IDs their model and package. |

Row: `{ equipId, equipType, subId, block, partsPath, packPath }`, all
required (`""` = no pack), plus optional pack size in MiB (`4`) of an
[own model pack](/V_Framework/Custom_Weapons#own-model-pack). Malformed
rows are skipped. Custom-ID rows in the game's own
`TppEquip.AddToEquipIdTable` or a `ReloadEquipIdTable` table work too.
Decoy rows take optional `decoyParts` ([Placed
items](/V_Framework/Custom_Weapons#placed-items-placeas)).

```lua
V_TppEquip.AddToEquipIdTable({
  { TppEquip.EQP_WP_Com_sg_020, TppEquip.EQP_TYPE_Shotgun, TppEquip.WP_Com_sg_020, TppEquip.EQP_BLOCK_MISSION,
    "/Assets/tpp/parts/weapon/assemble/shg/sg04_main0_aw0_v00.parts",
    "/Assets/tpp/pack/collectible/primary/EQP_WP_Com_sg_020.fpk" },
})
```

`EQP_WP_` is for weapons only, `EQP_SWP_` for support weapons only. All
mods share the weapon ID range; when full the log says
`RegisterConstantEquipId '<name>': no free equipId, rejected`.

These game messages carry the custom item's registered ID (e.g.
`TppEquip.EQP_SWP_ChaffGrenade` = 2048), not its stand-in: `Player`
`OnEquipWeapon`, `OnEquipHudClosed`, `OnEquipItem`, `OnPickUpWeapon`,
`OnPickUpPlaced`, `PlayerHoldWeapon`, `WeaponPutPlaced`,
`OnAmmoLessInMagazine`, `OnAmmoStackEmpty`; `Placed` `OnActivatePlaced`,
`OnBreakPlaced`; `Terminal` `MbDvcActSelectItemDropPoint`. `ItemUse`,
`ItemCountEmpty` and `ItemBatteryEmpty` carry the real equipId, above
`0x7FF` too; count, battery and effect time bar work for those IDs.

### Weapon-part declarations

```lua
V_TppEquip.DeclareWPs { "WP_A", "WP_B" }   --> 2 (how many were declared)
V_TppEquip.DeclareWPs("WP_A")              --> the assigned number, or false
```

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

`TppEquip.X` (or `TppDamage.X`) can be read before the declaring module
loads; it gets the same ID it will have, whatever the module file names.
Only for names written as plain strings in a `V_TppEquip.Declare...` or
`RegisterConstantEquipId` call (`{ }` or `( )`) in a `mod\modules` file;
runtime-built names need their module loaded first. Undeclared names
stay `nil`, so "is this mod installed" checks work.

#### Other constant spaces

Same arguments and returns, published under `TppEquip`.

| Declaration | Constant space | Read by |
|---|---|---|
| `DeclareEQPTypes` | `EQP_TYPE_*` | `AddToEquipIdTable`, and `SetReceiver` -> `receiverParamSetsSystem.eqpType` |
| `DeclareEQPBlocks` | `EQP_BLOCK_*` | `AddToEquipIdTable` |
| `DeclareTriggers` | `TRIGGER_*` | `SetReceiver` -> `receiverParamSetsSystem.triggerId` |
| `DeclareReticleUIs` | `RETICLE_UI_*` | `SetReceiver` -> `receiverParamSetsSystem.reticleUiId` |
| `DeclareScopeUIs` | `SCOPE_UI_*` | `SetSight` -> `scopeUiId` |
| `DeclareBarrelLengths` | `BARREL_LENGTH_*` | `SetBarrel` -> `barrelLength` |
| `DeclareBulletTypes` | `BULLET_TYPE_*` | `SetBullet` -> `bulletType` |
| `DeclareRicochetSizes` | `RICOCHET_SIZE_*` | `SetBullet` -> `ricochetSize` |
| `DeclarePenetrateLevels` | `PENETRATE_LEVEL_*` | `SetBullet` -> `bulletParamSetsBase.penNear` / `.penFar` |
| `DeclareBLAs` | `BLA_*` | `SetBullet` / `SetSupportWeapon` -> `blastId`, `SetBlastParameter` |
| `DeclareMZs` | `MZ_*` | `SetGunBasic` -> `muzzleId` |
| `DeclareCasings` | `CASING_*` | - |
| `DeclareWeaponPaints` | `WEAPON_PAINT_*` | - |
| `DeclareSWPs` | `SWP_*` | `AddToEquipIdTable`, `SetSupportWeaponParameter` |
| `DeclareSWPTypes` | `SWP_TYPE_*` | - |

### Handling, motion and missiles

| Function | Returns | Description |
|---|---|---|
| [`V_TppEquip.SetWeaponHandling`](/V_Framework/Custom_Weapons#cross-family-handling-setweaponhandling) | - | Weapon handles like another vanilla weapon of its own kind. |
| [`V_TppEquip.SetReceiverMotion`](/V_Framework/Custom_Weapons#custom-gun-motion-setreceivermotion) | - | Receiver gets its own animations. |
| [`V_TppEquip.SetRemoteMissile`](/V_Framework/Custom_Weapons#remote-controlled-missile-setremotemissile) | - | Weapon's shell becomes steerable, like the rocket arm. |
| `V_TppEquip.AbortRemoteMissile()` | - | Ends the current flight. |
| `V_TppEquip.IsRemoteMissileFlying()` | `true` / `false` | Whether a steerable missile is in the air. |
| [`V_TppEquip.SetChargeShot`](/V_Framework/Custom_Weapons#charge-shot-setchargeshot) | - | Holding fire charges a shot, fired on release. |

### Support weapons

| Function | Description |
|---|---|
| [`V_TppEquip.SetSupportWeapon`](/V_Framework/Custom_Weapons#support-weapons-setsupportweapon) | A custom thrown or placed item, used like a vanilla one; you script its effect. |
| [`V_TppEquip.SetSupportWeaponParameter`](/V_Framework/Custom_Weapons#support-weapon-stats-setsupportweaponparameter) | Ammo, fuse, effect time, grade and R&D stats. |
| [`V_TppEquip.SetBlastParameter`](/V_Framework/Custom_Weapons#blast-setblastparameter) | Blast radius and noise. |

### Item batteries

`V_TppEquip.SetItemBattery{ ... }`: NVG-style battery for a custom item.
Drains while selected, recharges otherwise (faster moving), full at
mission start. Empty: switches off and greys out until it recharges a
little. Nothing in FOB.

| Field | Required | Purpose |
|---|---|---|
| `equipId` | Yes | A custom `EQP_IT_` ID from `RegisterConstantEquipId`. One call per grade ID. |
| `seconds` | Yes | How long a full battery lasts. |
| `rechargeSeconds` | No (`90`) | Empty to full, standing still. |
| `rechargeSecondsMoving` | No (`30`) | Empty to full, moving. |
| `gaugeLength` | No (from `seconds`) | Battery bar cells, `1`-`3`. Default: up to 180 s `1`, up to 360 s `2`, longer `3`. |

Charge: [`V_Player.GetItemBattery` / `SetItemBattery`](#battery-charge).
Empty sends [`ItemBatteryEmpty`](#player-messages). A [UAV EMP](#uavs)
drains it.

### Item counts

`V_TppEquip.SetItemCount{ ... }`: a number of uses for a custom item,
like Pentazemin. Call after `RegisterConstantEquipId` /
`AddToEquipIdTable`, one call per grade ID. Nothing in FOB.

| Field | Required | Purpose |
|---|---|---|
| `equipId` | Yes | A custom `EQP_IT_` ID from `RegisterConstantEquipId`. |
| `count` | Yes | Uses carried, whole number from `1`. |
| `consumeOnUse` | No (`true`) | `false`: Use sends `ItemUse` without taking one; take it with [`V_Player.SetItemCount`](#item-count). |

```lua
V_TppEquip.SetItemCount{ equipId = TppEquip.EQP_IT_X, count = 3 }
```

Each Use takes one; at `0` Use does nothing and `ItemUse` is not sent.
Refilled at mission start and by an ammo supply drop. With a
[battery](#item-batteries) too, the wheel shows the battery gauge.
Read/set: [`V_Player.GetItemCount` / `SetItemCount`](#item-count); the
last use sends [`ItemCountEmpty`](#player-messages).

### Item parameters

`V_TppEquip.SetItemParameter{ ... }`: per-grade carried count (also the
supply-drop refill) and effect length of a vanilla consumable.

| Field | Required | Purpose |
|---|---|---|
| `equipId` | Yes | One of the items below. |
| `grade` | No (every grade) | `1` = the first grade. |
| `count` | No | Uses carried, `1`-`999`. |
| `seconds` | No | Effect length. |

Set at least one of `count` and `seconds`.

```lua
V_TppEquip.SetItemParameter{ equipId = TppEquip.EQP_IT_Pentazemin, grade = 1, count = 8, seconds = 60 }
```

| Item | Grades | Vanilla `count` | Vanilla `seconds` |
|---|---:|---|---|
| `EQP_IT_InstantStealth` | 3 | 2/3/4 | 24/36/48 |
| `EQP_IT_Pentazemin` | 3 | 6/8/10 | 24/36/48 |
| `EQP_IT_Clairvoyance` (Noctocyanin) | 5 | 4/4/6/6/8 | 24/36/36/48/48 |
| `EQP_IT_ReflexMedicine` (Acceleramin) | 5 | 4/4/6/6/8 | 10/12/12/14/14 |
| `EQP_IT_TimeCigarette` | 3 | 6/8/10 | - |
| `EQP_IT_ParasiteMist` | 3 | 4/6/8 | - |
| `EQP_IT_ParasiteCamouf` | 3 | 4/6/8 | - |
| `EQP_IT_ParasiteHard` | 3 | 4/6/8 | - |

`seconds` on a `-` item is ignored with a log warning. Lengths also
apply to [`V_Player.StartSkill`](#item-effects) at that `level`. FOB
uses vanilla values.

---

## Throwing

Thrown items (grenades, smoke, decoys...) in the world, by handle, plus
blasts, clouds, fire, animal lures, shock areas, weather and noise. Get
a handle from a [Throwing message](#throwing-messages), `Search` or
`GetHandleLatestThrownByPlayer`. Commands are ignored in FOB.

| Function | Returns | Description |
|---|---|---|
| `V_ThrowingSystem.Throw(def)` | `true`, or nothing | Throws an item. A rejected `def` logs a warning. |
| `V_ThrowingSystem.Search(pos, radius)` | list of handles | Items within `radius` metres of `pos`, nearest first. |
| `V_ThrowingSystem.GetPosition(handle)` | `x, y, z` | Item position. |
| `V_ThrowingSystem.GetRotation(handle)` | `x, y, z, w` | Item rotation. |
| `V_ThrowingSystem.GetInfo(handle)` | table | `{ equipId, owner, lifeLeft, reboundCount, isActivated, isStopped, isDone }`. |
| `V_ThrowingSystem.GetLifeLeft(handle)` | number | Time the item has left. |
| `V_ThrowingSystem.GetHandleLatestThrownByPlayer()` | handle | The player's last thrown item. |
| `V_ThrowingSystem.GetThrowingCount(owner, swpType)` | number | Items of a `TppEquip.SWP_TYPE_*` an owner has out. |
| `V_ThrowingSystem.GetPredictedPositionAtTime(handle, seconds)` | `x, y, z` | Where the item will be. |
| `V_ThrowingSystem.OverwriteVelocity(handle, target, flightTime)` | `true` / `false` | Redirects the item to land on `target` (`{ x, y, z }`) after `flightTime` seconds. |
| `V_ThrowingSystem.RequestSmoke(handle)` | - | The item gives off smoke. |
| `V_ThrowingImpl.Activate(handle)` | `true` / `false` | The item goes off now. |
| `V_ThrowingImpl.Deactivate(handle)` | `true` / `false` | Removes the item. |
| `V_ThrowingImpl.SetLifeLeft(handle, time)` | `true` / `false` | Sets the time the item has left. |
| `V_ThrowingImpl.Stop(handle)` | `true` / `false` | Stops the item where it is; its fuse keeps running. |
| `V_ThrowingImpl.GetVelocity(handle)` | `x, y, z` | Item velocity. |
| `V_ThrowingImpl.UpdateActionGrenade(handle, swpType)` | `true` / `false` | The item acts as a grenade of that `SWP_TYPE_*`; `swpType` defaults to `1`. |
| `V_ThrowingImpl.UpdateActionSmoke(handle)` | `true` / `false` | Acts as a smoke grenade. |
| `V_ThrowingImpl.UpdateActionMolotovCocktail(handle)` | `true` / `false` | Acts as a Molotov cocktail. |
| `V_ThrowingImpl.UpdateActionDecoy(handle)` | `true` / `false` | Acts as a decoy. |
| `V_ThrowingImpl.UpdateActionKibidango(handle)` | `true` / `false` | Acts as bait. |
| `V_ThrowingImpl.UpdateActionFakeSign(handle)` | `true` / `false` | Acts as the fake sign. |
| `V_ThrowingImpl.AddReboundNoise(handle)` | `true` / `false` | Enemies hear the item land. |
| `V_ThrowingImpl.PostReboundSound(handle)` | `true` / `false` | Plays the item's landing sound. |
| `V_ThrowingImpl.IsObstructSight(equipId)` | `true` / `false` | Whether that item blocks sight, like smoke. |
| `V_ThrowingImpl.CreateEffectLanding(pos)` | `true` / `false` | Landing effect at `pos`. |
| `V_ThrowingImpl.CreateEffectDropInWater(pos)` | `true` / `false` | Water splash at `pos`. |
| `V_RangeAttackSystem.RequestToChaff(def)` | handle, or nothing | Chaff: jams cameras, UAVs and Sahelanthropus map-wide, cuts Command Post (CP) radio and missile lock-on. One at a time; a new one replaces it. |
| `V_RangeAttackSystem.RequestToStun(def)` | handle, or nothing | Stun grenade burst at a position. |
| `V_RangeAttackSystem.RequestToSmoke(def)` | handle, or nothing | Smoke or sleeping-gas cloud. |
| `V_RangeAttackSystem.RequestToFlame(def)` | handle, or nothing | Molotov fire. |
| `V_RangeAttackSystem.RequestToAttractant(def)` | handle, or nothing | Animals come to a position, like the Kibidango's lure. |
| `V_RangeAttackSystem.RequestToElectro(def)` | handle, or nothing | Electric shock area, like the Electromagnetic Net Mine's. |
| `V_RangeAttackSystem.RequestToModifyWeather(def)` | handle, or nothing | Changes the weather. |
| `V_BlastSystem.Blast(def)` | `true` / `false` | An explosion's damage and push, without its look or sound. |
| `V_NoiseSystem.AddNoise(def)` | `true` / `false` | A noise guards hear and check, with no actual sound. |

`pos` is `{ x, y, z }`. `true` / `false` commands return `true` when
queued and run next frame; `IsObstructSight` answers at once.
`V_RangeAttackSystem`: up to 4 requests of each kind per frame.

#### Throw fields

| Field | Required | Purpose |
|---|---|---|
| `equipId` | Yes | `TppEquip.EQP_SWP_*` to throw. |
| `pos` | Yes | Start position. |
| `velocity` | One of these two | `{ x, y, z }` m/s. |
| `target` | One of these two | `{ x, y, z }` landing point; needs `flightTime` or `angle`. |
| `flightTime` | With `target`, one of these two | Seconds to reach `target`. |
| `angle` | With `target`, one of these two | Throw angle to reach `target`. |
| `rotation` | No | `{ x, y, z, w }`. |
| `fuseTime` | No (item's) | Seconds before it goes off. |
| `owner` | No (`0`, player) | Thrower's game object ID. |
| `hitIgnoreId` | No | Game object it passes through. |
| `grade` | No (`0`) | Item grade. |

```lua
V_ThrowingSystem.Throw{
  equipId    = TppEquip.EQP_SWP_Grenade,
  pos        = { vars.playerPosX, vars.playerPosY + 1.5, vars.playerPosZ },
  target     = { vars.playerPosX + 10, vars.playerPosY, vars.playerPosZ },
  flightTime = 1.5,
}
```

#### Chaff, stun, smoke and flame fields

| Field | Chaff | Stun | Smoke | Flame | Purpose |
|---|---|---|---|---|---|
| `pos` | Yes | Yes | Yes | Yes | Position. |
| `duration` | Yes, unless `endless` | - | Yes | No (`12`) | Seconds. A smoke cloud then fades out. |
| `radius` | - | No (`0`) | Yes | No (`8.8`) | Metres. |
| `endless` | No (`false`) | - | - | - | Lasts until replaced. |
| `noEffect` | No (`false`) | - | - | - | Jams without the cloud effect. |
| `type` | - | - | No (`"Smoke"`) | - | `"Smoke"`, `"SleepGas"`, or `0-4`. |
| `attackId` | - | No (`TppDamage.ATK_StunGrenade`) | - | No (`TppDamage.ATK_MolotovCocktailFire`) | Damage row. |
| `grade` | - | No (`1`) | - | No (`0`) | Grade. |
| `owner` | No (`0`) | No (`0`) | No (`0`) | No (`0`) | Owner's game object ID. |

Up to 12 smoke clouds (oldest replaced) and 12 fires at once. Example:
the [chaff
grenade](/V_Framework/Custom_Weapons#support-weapons-setsupportweapon).

#### Attractant, electro and weather fields

| Field | Attractant | Electro | Weather | Purpose |
|---|---|---|---|---|
| `pos` | Yes | Yes | - | Position. |
| `duration` | Yes, unless `endless` | Yes, unless `endless` | Yes | Seconds. |
| `kind` | No (`1`) | - | - | Animals called: `1` any animal (the Kibidango's), `5` wolves, `6` bears. Herbivores answer their own kind or `1`. Kind `1` lasts 3 s past `duration`. |
| `radius` | - | Yes | - | Metres. The shock area is a box `radius` x 2 m x `radius`. |
| `rotation` | - | No | - | `{ x, y, z, w }` quaternion of the box. |
| `weather` | - | - | Yes | `TppDefine.WEATHER.SUNNY`, `CLOUDY`, `RAINY`, `SANDSTORM` or `FOGGY`. `FOGGY` also thickens the fog. |
| `slot` | - | - | No (`1`) | `1` (the iDroid weather support's) or `2`. |
| `endless` | No (`false`) | No (`false`) | - | No time limit. |
| `owner` | No (`0`) | No (`0`) | No (`0`) | Owner's game object ID. |

Up to 12 attractants (oldest replaced), 12 shock areas and one weather
change at once.

#### Blast fields

| Field | Required | Purpose |
|---|---|---|
| `pos` | Yes | Position. |
| `blastId` | Yes | `TppEquip.BLA_*`; gives the noise and the default radius. |
| `attackId` | Yes | `TppDamage.ATK_*` it deals. |
| `radius` | No (the blast's) | Metres, up to `100`. |
| `shockwave` | No (`true`) | Also pushes things in a 1.5x wider ring. |
| `owner` | No (`0`) | Owner's game object ID. |
| `hitIgnoreId` | No | Game object it leaves unhurt. |
| `grade` | No (`0`) | Grade. |

Up to 4 blasts per frame.

```lua
V_BlastSystem.Blast{ pos = { x, y, z }, blastId = TppEquip.BLA_Grenade, attackId = TppDamage.ATK_Grenade }
```

#### Noise fields

| Field | Required | Purpose |
|---|---|---|
| `pos` | Yes | Position. |
| `type` | Yes | Noise kind, `0-127`: `0x0D` grenade bouncing (a threat), `0x1A` small item bouncing, `0x1C` smoke grenade going off, `0x50` the vanilla `AddSpecialNoise` noise. |
| `owner` | No (`0`) | Who made it. |

---

## Placed items

Custom placed items
([`placeAs`](/V_Framework/Custom_Weapons#placed-items-placeas)) in the
world, by handle. Get a handle from the
[`OnPlaceCustom`](#placed-messages) (when it lands) or
`OnActivateCustom` (when it goes off) message.

| Function | Returns | Description |
|---|---|---|
| `V_PlacedSystem.GetPosition(handle)` | `x, y, z` | Item position. |
| `V_PlacedSystem.Activate(handle)` | `true` / `false` | Sets the item off. |
| `V_PlacedSystem.Remove(handle)` | `true` / `false` | Fades the item out. |

`Activate` and `Remove`: custom placed items only; nothing in FOB.

---

## Effects

V Framework has no effect function: use a vanilla effect locator
([FxLocatorData](/FoxKit-_TppPrimRiverModel_TppWaterBounding_TppTextureLoader_and_FxLocatorData#fxlocatordata)),
then:

```lua
TppDataUtility.SetForcedChangePositionEffectFromId("MyFxLocator", x, y, z)
TppDataUtility.CreateEffectFromId("MyFxLocator")
```

`DestroyEffectFromId`, `DestroyImmediateEffectFromId`,
`IsReadyEffectFromId` and `SetVisibleEffectFromId` work the same way;
`...FromGroupId` versions act on a group. One effect per locator at a
time, at a position only.

---

## Data utility

Character mesh groups and on-screen checks.

| Function | Returns | Description |
|---|---|---|
| `V_TppDataUtility.SetMeshVisible(gameObjectId, meshName, visible)` | `true` / `false` | Applies at once. |
| `V_TppDataUtility.IsMeshVisible(gameObjectId, meshName)` | `true` / `false`, or `nil` when unknown | Whether the mesh is shown. |

| Parameter | Required | Purpose |
|---|---|---|
| `gameObjectId` | Yes | The player, a soldier, a hostage, Quiet (buddy), D-Horse, D-Walker, an enemy walker gear, or another character (Skulls, animals, Sahelanthropus...). Vehicles are not supported (a log warning, returns `false`). |
| `meshName` | Yes | A mesh group name from the model, e.g. `"MESH_xxx"`, or its `Fox.StrCode32` number. Unknown names do nothing. |
| `visible` | Yes (`SetMeshVisible`) | `false` hides, `true` shows. |

  - Survives the character reloading and outfit changes; a mission
    change clears every setting. Set before he loads: applies on load.
  - Player: every part model (body, head, hats...) is searched; soldier:
    body model only.
  - FOB: does nothing (`false` / `nil`).

```lua
V_TppDataUtility.SetMeshVisible(GameObject.GetGameObjectId("sol_quest_0000"), "MESH_xxx", false)
```

For level data in a DataIdentifier (props, heli interior), use vanilla
`TppDataUtility.InvisibleMeshFromIdentifier(identifier, key, meshName)`
/ `VisibleMeshFromIdentifier`.

| Function | Returns | Description |
|---|---|---|
| `V_TppDataUtility.IsOnScreen(position, radius)` | `true` / `false`, or `nil` | Any part of the `radius`-metre ball around `position` is in the camera view. Walls and cover do not hide it. FOB: always `true`. |
| `V_TppDataUtility.GetCameraDistance(position)` | metres, or `nil` | Distance from the camera; zoom (binoculars, scopes) shortens it. FOB: always `0`. |

| Parameter | Required | Purpose |
|---|---|---|
| `position` | Yes | A `Vector3` or `{x, y, z}`. Missing or wrong: `nil`. |
| `radius` | No (`1.2`) | Metres; more for big things like vehicles. |

```lua
local position = GameObject.SendCommand(soldierId, { id = "GetPosition" })
if not V_TppDataUtility.IsOnScreen(position, 1.2) then
  GameObject.SendCommand(soldierId, { id = "SetEnabled", enabled = false })
end
```

---

## Mother Base Management

All functions here belong to `V_TppMotherBaseManagement`.

### ACC change-location menu

`AddToChangeLocationMenu(codes)` adds location codes to the ACC (Aerial
Command Center) free-roam list:

```lua
V_TppMotherBaseManagement.AddToChangeLocationMenu{
  40,   -- Gntn
}
```

### VI photo text

`AddPhotoAdditionalText(rows)` adds text to VI photos. A row missing a
required field is skipped.

| Field | Required | Purpose |
|---|---|---|
| `missionCode` | Yes | Mission of the photo. |
| `photoId` | Yes | Photo number. |
| `photoType` | Yes | Photo type. |
| `targetTypeLangId` | No | The text (language ID). |

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

### AddToEquipDevelopTable

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

Adds an R&D row. Required: the key (IDs are allocated from it), a
`const` table and a `flow` table. Field names or raw `pNN` names both
work.

#### `const` fields

| Field | Required | Purpose |
|---|---|---|
| `equipID` (`p01`) | No (`0`) | Equipment ID. Use `EQP_None` for heads. |
| `equipDevelopTypeID` (`p02`) | No (`0`) | Main R&D category. |
| `baseEquipDevelopId` (`p03`) | No | Parent R&D row; child grades must be higher. Sortie Prep grade picking swaps the carried one, like vanilla (`GradeFamily` in [`disabled_modules.txt`](/V_Framework#installation) turns this off). |
| `skill` (`p04`) | No | Required skill ID. |
| `bluePrintId` (`p05`) | No (`65535`, none) | Blueprint needed to develop the row, or a show/hide rule. |
| `langEquipName` (`p06`) | No | Display-name language ID. |
| `langEquipInfo` (`p07`) | No | Description language ID. |
| `iconFtexPath` (`p08`) | No | R&D icon path. |
| `equipDevelopGroupID` (`p09`) | No (`0`) | Fine R&D tree group. |
| `langPowerUpInfo0-11` (`p10-p21`) | No | Upgrade-information language IDs. |
| `langEquipRealName` (`p30`) | No | Real-name language ID. |
| `isResultRankLimited` (`p31`) | No (`0`) | `1`: using the item caps the mission rank, like vanilla. |
| `langResultRankLimited` | No (`langEquipName`) | Result-screen line explaining the cap (language ID). |
| `isCustomEnable` (`p32`) | No (`1`) | Customization flag. |
| `isColorChangeEnable` (`p33`) | No (`1`) | Colour-change flag. |
| `unk34` (`p34`) | No (`0`) | Unknown. |
| `isSecurityStaffEquip` (`p35`) | No (`0`) | Security-staff equipment flag. |
| `unk36` (`p36`) | No (ignored) | Custom rows never count toward what the game sends to FOB. |

#### `bluePrintId` forms

```lua
-- No blueprint (default)
bluePrintId = 65535

-- Vanilla blueprint
bluePrintId = TppMotherBaseManagementConst.DESIGN_2001

-- Custom DataBase entry (its RegisterDataBase key, or the published ID)
bluePrintId = "MyMod_AK50"
bluePrintId = TppMotherBaseManagementConst.MyMod_AK50

-- Live condition
bluePrintId = function()
  return TppStory.IsMissionCleard(10080)
end
```

#### `flow` fields

| Field | Required | Purpose |
|---|---|---|
| `sideGrade` (`p51`) | No (automatic) | Side-branch slot. Must be unique in the develop family. |
| `grade` (`p52`) | No (automatic) | R&D grade, clamped to `1-15`. |
| `developGmpCost` (`p53`) | No (`0`) | Development cost. |
| `usageGmpCost` (`p54`) | No (`0`) | Deployment or usage cost. |
| `sectionLvForDevelop` (`p55`) | No (`0`) | Required section level. |
| `sectionID2ForDevelop` (`p56`) | No (`0`) | Secondary section. |
| `sectionLv2ForDevelop` (`p57`) | No (`0`) | Secondary section level. |
| `resourceType1/2` (`p58`, `p60`) | No | Required resource names. |
| `resourceType1Count/2Count` (`p59`, `p61`) | No (`0`) | Required quantities. |
| `initialAvailable` (`p62`) | No (`0`) | Initial developed state; `0` starts locked. |
| `sectionIDForDevelop` (`p63`) | No (`0`) | Main required section. |
| `developSectionLv` (`p64`) | No (`0`) | Development section level. |
| `resourceUsageType1/2` (`p65`, `p67`) | No | Per-use resources. |
| `resourceUsageType1Count/2Count` (`p66`, `p68`) | No (`0`) | Per-use quantities. |
| `displayInfo` (`p69`) | No (`0`) | `0` shown; `1` needs its `skill` or its `bluePrintId` obtained to show (a design always shows); `2`, `3`, `5` hide the row. |
| `unk70` (`p70`) | No (`0`) | Unknown. |
| `developTimeMinute` (`p71`) | No (`0`) | Development time in minutes. |
| `intimacyPoint` (`p73`) | No (`0`) | Intimacy requirement/value. |

Invalid grades and side-branch clashes are fixed and logged. Custom rows
follow the game's own, so a mod replacing `EquipDevelopConstSetting.lua`
or `EquipDevelopFlowSetting.lua` cannot overwrite them.

`TppMbDev.EQP_DEV_TYPE_Tool` rows are listed under Sortie Prep TOOLS
once developed (name, icon, grade stars, `usageGmpCost`); a
`baseEquipDevelopId` chain shows once, at its highest developed grade.
Display only, always carried. Not in FOB Sortie Prep or the supply drop
list.

`TppMbDev.EQP_DEV_TYPE_WalkerGear` rows: [D-Walker
sidearm](/V_Framework/Buddy_Outfits#d-walker-sidearm).

### R&D row state

| Function | Description |
|---|---|
| `GetDevelopId(key)` | Returns a custom R&D row's develop ID. |
| `SetEquipDeveloped(id)` | Marks the item developed. |
| `SetEquipUndeveloped(id)` | Marks the item undeveloped. |
| `IsEquipDevelopable(id)` | Returns whether requirements are currently met. |
| `IsEquipDeveloped(id)` | Returns whether the item is developed. |
| `SetEquipNew(id, isNew)` | Sets or clears the `NEW` flag. |
| `IsEquipNew(id)` | Returns the `NEW` state. |
| `SetEquipDevelopVisible(id, visible)` | Shows or hides the row at runtime. A hide set before the row loads, or while it pages out, still applies. Revealing a `NEW` row plays its announcement. |
| `GetUsedRankLimitedItemLangIds()` | Lang IDs of the rank-limited custom items used this mission, in first-use order. |

### Removing a mod

A custom weapon, outfit or head option unregistered for 2 launches in a
row frees its equip ID, R&D row and outfit selector slot. Its developed
and seen state is kept, so re-adding the mod restores it.

### Sortie Prep lists

  - Suit, head option, item, arm and buddy tabs: up to 1024 rows each.
    Weapon tabs: up to 256 variants per base weapon.
  - The item list shows only the newest developed grade of a custom item
    family (`baseEquipDevelopId` chain, `EQP_DEV_TYPE_Equip`); lower
    grades stay in R&D. Weapons are not affected.

### DataBase entries

Custom iDroid DATABASE entries: blueprints, key items, photos, animals,
posters, codenames or medicinal plants.

| Function | Description |
|---|---|
| `RegisterDataBase(key)` | Allocates a DataBase entry and returns its numeric ID. |
| `SetBluePrint(keyOrId, owned)` | Marks it obtained (`true`) or not obtained (`false`). |
| `HasBluePrint(keyOrId)` | Returns whether the player has obtained it. |
| `GetBluePrintId(keyOrId)` | Returns the numeric ID, or `nil`. |
| `SetDataBaseDisplay(table)` | Gives it a row in the iDroid DATABASE. See [below](#the-idroid-database-entry). |

#### The iDroid DATABASE entry

```lua
local bpId = V_TppMotherBaseManagement.RegisterDataBase("MyMod_Rsh12")

V_TppMotherBaseManagement.SetDataBaseDisplay{
  dataBaseId  = bpId,
  langDocName = "langId_name",
  langDocInfo = "langId_desc",
  docIcon     = "/Assets/tpp/ui/texture/Resource/keyitem/icon/ui_kit_devdata_sr_alp.ftex",
  docImage    = "/Assets/tpp/ui/texture/Resource/keyitem/image/ui_kit_devdata_sr.ftex",
  tab         = V_TppDataBase.TAB_BLUEPRINT,
}

TppTerminal.BLUE_PRINT_LANG_ID[bpId] = "langId_name"
TppTerminal.keyItemAnnounceLogTable[bpId] = "langId_name"
TppTerminal.keyItemRewardTable[bpId] = "langId_name"
```

| Field | Required | Purpose |
|---|---|---|
| `dataBaseId` or `key` | Yes | The entry. |
| `langDocName` | No | Row name (language ID). |
| `docIcon` | No | Small row icon. |
| `docImage` | No (`docIcon`) | Large detail image. |
| `langDocInfo` | No | Description (language ID). |
| `tab` | No (Blueprints) | A [`V_TppDataBase`](#database-tabs) tab. |

Set at least one of `langDocName`, `docIcon`, `docImage`, `langDocInfo`.
A DATABASE tab lists up to 32767 rows.

### Unique staff

A named Mother Base staffer, like Ocelot or Code Talker.

| Function | Description |
|---|---|
| `RegisterUniqueStaff(def)` | Registers a staffer; returns its `uniqueTypeId`. |
| `GetUniqueStaffTypeId(key)` | Returns the ID of a key, or `nil`. |

#### Required fields

`key` plus all of these (a missing one is logged; no staffer):

| Field | Type | Field | Type |
|---|---|---|---|
| `nameLangMessageId` | string | `badConditionWeight` | number |
| `combatSectionPoint` | number | `langProficEnglish` | boolean |
| `developSectionPoint` | number | `langProficRussian` | boolean |
| `baseDevSectionPoint` | number | `langProficPashto` | boolean |
| `supportSectionPoint` | number | `langProficKikongo` | boolean |
| `spySectionPoint` | number | `langProficAfrikaans` | boolean |
| `medicalSectionPoint` | number | `isEnmity` | boolean |
| `moraleEnmity` | number | `condition` | string |

`nameLangMessageId` must exist in your lang files, or the name is blank.

#### Optional fields

| Field | Required | Purpose |
|---|---|---|
| `faceId` | No (face `0`) | Face, e.g. `V_TppSoldierFace.GetFaceId("...")` ([Soldier faces](#soldier-faces)). Missing logs `no faceId, the game gives this staff face 0`. |
| `faceIdForNoFultonStaff` | No (the game's) | Face when not fultoned. |
| `skill` | No | Skill name, e.g. `"Surgeon"`. |
| `missionId`, `deployMissionId` | No | Unused. |

A non-number `faceId` or `faceIdForNoFultonStaff` logs `faceId must be a
number, not registered`.

The custom face shows on staff portraits, the player model and Mother
Base soldiers, also for staff recruited before it was registered; the
last two only when the staff record's face has the same gender.

```lua
V_TppMotherBaseManagement.RegisterUniqueStaff{
  key                 = "MyMod.Medic13106",
  skill               = "Surgeon",
  nameLangMessageId   = "my_staff_13106_medic",
  faceId              = V_TppSoldierFace.GetFaceId("MyMod.face.veteran"),

  combatSectionPoint  = 40,
  developSectionPoint = 55,
  baseDevSectionPoint = 45,
  supportSectionPoint = 50,
  spySectionPoint     = 35,
  medicalSectionPoint = 110,

  isEnmity            = false,
  moraleEnmity        = 7,
  condition           = "Normal",
  badConditionWeight  = 3,

  langProficEnglish   = true,
  langProficRussian   = false,
  langProficPashto    = false,
  langProficKikongo   = false,
  langProficAfrikaans = false,
}
```

#### Placing the staff in a mission

Your mission scripts place the staffer, by ID:

```lua
local id = V_TppMotherBaseManagement.GetUniqueStaffTypeId("MyMod.Medic13106")
```

> Add unique staff after the save loads: Infinite Heaven's first
> `OnLoad` (`missionCode` 1) runs before the save restore and loses a
> `DirectAddStaff`. Start `OnLoad` with `if missionCode == 1 then return
> end`.
{:.tip}

### Dispatch missions

New Combat Deployment missions in the iDroid.

| Function | Description |
|---|---|
| `RegisterDeployMissionParam(def)` | Registers a mission; returns its `deployMissionId`. |
| `RegisterPoolRewardParam(def)` | Registers a mission's reward. |
| `AddDeployMission(key)` | Lists a rarity-`NONE` mission. |
| `GetDeployMissionId(key)` | Returns the ID of a key, or `nil`. |
| `GetDeployMissionCleared(key)` | `true` once a rarity-`NONE` mission was completed, won or lost. |
| `UnsetDeployMissionCleared(key)` | Lets `AddDeployMission` list it again. |

Both take the vanilla table with the mission key in place of the ID
(`key` in the mission table, `keyValue1` in the reward table):

```lua
local id = V_TppMotherBaseManagement.RegisterDeployMissionParam{
  key                        = "custom_Dispatch",
  nameLangId                 = "langId_name",
  infoLangId                 = "langId_info",
  category                   = TppMotherBaseManagementConst.DEPLOY_MISSION_CATEGORY_COMBAT3_UNIT_EXCLUSION,
  rarity                     = TppMotherBaseManagementConst.DEPLOY_MISSION_RARITY_R,
  combatSectionRank          = "C",
  combatSectionStaffCountMax = 10,
  _4wdCountMin = 0, _4wdCountMax = 0,
  truckCountMin = 0, truckCountMax = 0,
  armoredCountMin = 0, armoredCountMax = 0,
  tankCountMin = 0, tankCountMax = 0,
  walkerGearCountMin = 0, walkerGearCountMax = 0,
  battleGear                 = false,
  baseWinRate                = 60,
  deadRate                   = 15,
  timeMinute                 = 20,
  timeMinuteRandom           = 10,
  latitude                   = 12.6,
  longitude                  = 43.1,
}

V_TppMotherBaseManagement.RegisterPoolRewardParam{
  keyValue1         = "custom_Dispatch",
  keyValue2         = 1,
  mainRewardType    = TppMotherBaseManagementConst.MAIN_REWARD_TYPE_GMP,
  gmp               = 20000,
  staffHitRate      = 30,
  staffDrawCount    = 2,
  staffGRate        = 60,
  staffFRate        = 40,
  resourceHitRate   = 100,
  resourceDrawCount = 40,
  commonMetalRate   = 70,
  fuelResourceRate  = 30,
}
```

With a number in place of the key (`deployMissionId`, or a numeric
`keyValue1`), the table edits that vanilla mission. IDs 21-119 (the
random pool) are refused and logged.

#### Mission fields

| Field | Required | Purpose |
|---|---|---|
| `key` | Yes | Stable name; the `deployMissionId` is allocated from it. |
| `nameLangId` | No (its `category`'s name) | Name in the list, the result log and the Rewards list. |
| `infoLangId` | No (its `category`'s text) | Description under the list. |
| `category` | No (`COMBAT1_PERSON_GUARD`) | `DEPLOY_MISSION_CATEGORY_*`. Only picks the default name and description. |
| `rarity` | No (`RARITY_N`) | `DEPLOY_MISSION_RARITY_*`; where it is listed (below). |
| `combatSectionRank` | No (`"G"`) | Enemy strength and the Heroism a win gives; your staff's rank is never checked. Shown shifted (below). |
| `combatSectionStaffCountMax` | No (`10`) | Combat staff sent, at most this. At least half is required. |
| `subSection` | No | Unit of a second squad: `"Develop"`, `"BaseDev"`, `"Support"`, `"Spy"` or `"Medical"`. |
| `needSubSectionStaffCount` | No (`0`) | Size of the second squad, required. Adds enemy strength even without `subSection`. |
| `needSubSectionRank` | No (`"G"`) | Enemy strength of the second squad. |
| `_4wdCountMin`/`Max`, `truckCountMin`/`Max`, `armoredCountMin`/`Max`, `tankCountMin`/`Max`, `walkerGearCountMin`/`Max` | No (`0`) | Vehicles you must send, rolled from min to max - 1: `0`/`1` needs none, `1`/`2` needs one. |
| `battleGear` | No (`false`) | Requires the Battle Gear. |
| `baseWinRate` | No (`80`) | Success % when your team is as strong as the enemy. Success is clamped to 5-95. |
| `deadRate` | No (`5`) | Casualty %: killed below it, injured below twice it. Extra staff lower it (3-50). At most half the team is hit. |
| `timeMinute` | No (`2`) | Duration, in minutes of play. |
| `timeMinuteRandom` | No (`0`) | Adds 0 to N - 1 minutes. |
| `latitude`, `longitude` | No (`0`) | Globe pin. |
| `important` | No (`false`) | `true`: always listed first, with the yellow story marker, and the Combat Deployment notice turns yellow. |
| `revengeMissionId` | No | `DEPLOY_MISSION_ID_REVENGE_*`. Listed last unless `important`, with that revenge icon; completing the mission counts as completing that vanilla revenge dispatch. |

Other custom missions take a random row in the top 10 of the list.

Ranks as shown in game:

| Lua | `G` | `F` | `E` | `D` | `C` | `B` | `A` | `S` | `S+` | `S++` |
|---|---|---|---|---|---|---|---|---|---|---|
| Shown | E | D | C | B | A | A+ | A++ | S | S+ | S++ |

| `rarity` | Where it appears |
|---|---|
| `DEPLOY_MISSION_RARITY_N` | Rotates in the five N slots, after the vanilla N missions. |
| `DEPLOY_MISSION_RARITY_R` / `_SR` | The five R/SR slots, which open once enough N missions are won (28 in vanilla). |
| `DEPLOY_MISSION_RARITY_NONE` | Only via `AddDeployMission(key)`, up to 6 at once. Once completed, not added again until `UnsetDeployMissionCleared(key)`. |

```lua
V_TppMotherBaseManagement.AddDeployMission("MyMod.PirateHunt")
```

To keep an `important` rarity-`NONE` mission listed after it is done,
call `UnsetDeployMissionCleared(key)` then `AddDeployMission(key)` in
`LoadLibraries` and `OnMissionCanStart`.

#### Reward fields

Paid on success only. Left-out fields take their defaults, so a table
with only the two keys and `gmp` still recruits staff and pays fuel.

| Field | Required | Purpose |
|---|---|---|
| `keyValue1` | Yes | The mission `key`. |
| `keyValue2` | Yes | Recruits' unit icon: `0`/`1` Combat, `2` R&D, `3` Base Development, `4` Support, `5` Intel, `6` Medical. Recruits are still auto-assigned. |
| `mainRewardType` | No | `MAIN_REWARD_TYPE_*`. The list icon only. |
| `gmp` | No (`0`) | GMP. |
| `staffDrawCount` | No (`10`) | Staff recruited. |
| `staffHitRate` | No (`20`) | % chance of the full count, otherwise 40% of it. |
| `staffGRate` ... `staffSppRate` | No (G `100`, others `0`) | Rank weights, relative (not %). Ranks shift as above. |
| `staffRelativeRate`, `staffRelativeP1Rate` | No (`50`, `50`) | Weights for the rank a new recruit gets now, and one above. Rises as Mother Base grows. |
| `resourceDrawCount` | No (`20`) | Resource draws. A material gives 5, a plant 1. |
| `resourceHitRate` | No (`50`) | % chance of all draws, otherwise 40% of them. |
| `fuelResourceRate`, `bioticResourceRate`, `commonMetalRate`, `minorMetalRate`, `preciousMetalRate`, `goldenCrescentRate`, `blackCarrotRate`, `wormwoodRate`, `tarragonRate`, `africanPeachRate`, `digitalisPRate`, `digitalisLRate`, `haomaRate` | No (`0`) | Resource weights, relative. All `0` makes every draw fuel. |
| `materialIsBeforeProcess` | No (`false`) | `true` pays unprocessed materials. |
| `keyItemDataBaseId` | No | DataBase item added on the win. |
| `keyItemRate` | No (`0`) | % chance of that item. |
| `rewardRate` | No (`10`) | No effect. |
| `rewards` | No | Up to 16 extra lines (below); more are ignored. |

Every value, `rewards` pool lines included, is capped at the best
vanilla dispatch reward.

Each `rewards` line takes `count` No (`1`) and `chance` No (`100`),
`1`-`100`, rolled once per mission. Lines show on the Deployment preview
(first 5, with their chance) and in Mother Base > Rewards.

| Line | Fields | Pays |
|---|---|---|
| Mod vehicle | `vehicle` = a [`RegisterVehicle`](#custom-vehicles) name with a `sortie` table; `count` `1`-`99` | That many into its Mother Base stock. |
| Pool | `type` = `"GMP"`, `"STAFF_S"`, `"COMMON_METAL"`, ... or `TppMotherBaseManagementConst.POOL_REWARD_TYPE_*`; staff only: `section` `0`-`6` (default `keyValue2`) | The game pays it. |
| Custom | `name`, `nameLangId`, `icon` (`.ftex` added if missing) | Nothing; receiving it sends [`OnRewardReceived`](#dispatch-messages). |

```lua
rewards = { { vehicle = "ROAD_RAGE", count = 5 }, { type = "GMP", count = 50000, chance = 50 } },
```

---

## Soldier faces

| Function | Description |
|---|---|
| `RegisterFace(def)` | Creates a face under `def.key` and returns its `faceId`. |
| `GetFaceId(key)` | Returns the `faceId` of a key, or `nil`. |

| Field | Required | Purpose |
|---|---|---|
| `key` | Yes | Stable name; register it every launch (unregistered for two launches: removed). |
| `gender` | No (`0`) | `0` male, `1` female. |
| `race` | No (`0`) | `0` Caucasian, `1` Brown, `2` Black, `3` Asian. |
| `faceFova`, `faceDecoFova`, `hairFova`, `hairDecoFova` | No | fv2 path, `{fv2=, fpk=}` or row index. A deco needs its base. |
| `eyeFova`, `skinFova` | No | `0-31`. |
| `eyeMeshType` | No (`0`) | `0` or `1` eye mesh. |
| `forceHairFova` | No (`false`) | Always show the hair. |
| `mbEligible` | No (`false`) | `true`: the game may pick it at random for new volunteer staff, hostages and quest targets. |
| `unique` | No (`false`) | For unique prisoners or main-mission soldiers. |
| `uiTextureName` | No | Staff portrait name, e.g. `ui_face_custom`. |
| `uiTextureCount` | No (`1` with a name) | Portraits `0-3`. |
| `uiTexBasePath` | No (`/Assets/tpp/ui/texture/StaffImage/`) | Portrait folder, with trailing slash. |
| `outsideFaceRef1`-`3` | No (`0`, none) | Alternative faces as `faceId + 1`. |
| `outsideFaceCount` | No (`0`) | How many alternatives are used, `0-3`. |

Declare every fv2/fpk pair in a `mod/fovaInfo/*.lua` file (Infinite
Heaven loads it at startup):

```lua
return {
  faceFova = {
    { "/Assets/tpp/fova/my_mod/my_face.fv2", "/Assets/tpp/pack/fova/my_mod/my_face.fpk" },
  },
}
```

Then point `RegisterFace` at the fv2:

```lua
function this.LoadLibraries()
  V_TppSoldierFace.RegisterFace{
    key      = "MyMod.face.veteran",
    faceFova = "/Assets/tpp/fova/my_mod/my_face.fv2",
  }
end
```

Staff with a custom face can deploy to FOB (the other player sees a
vanilla stand-in). A player face set directly to a custom face ID blocks
the deploy and logs `FobGuard: deploy blocked, the player's face id N is
a custom face`.

---

## Sound

| Function | Description |
|---|---|
| `V_TppSoundDaemon.SetGameOverMusic(enabled, type, playEvent, stopEvent)` | Replaces Game Over music with Wwise events. Returns `true` on success. |
| `V_TppSoundDaemon.SetMissionPreparationMusic(playEvent, stopEvent, missionCode)` | Replaces Sortie Prep music with Wwise events. Returns `true` on success. |

Events are a name or hash.

### SetGameOverMusic

```lua
V_TppSoundDaemon.SetGameOverMusic(true, V_TppGameObject.GAME_OVER_GENERAL, "Play_bgm_my_gameover", "Stop_bgm_my_gameover")
```

| Parameter | Required | Purpose |
|---|---|---|
| `enabled` | Yes | `true` replaces, `false` restores vanilla. |
| `type` | Yes | A [Game Over type](#game-over-types). |
| `playEvent` | No | Start event; required when `enabled` is `true`. |
| `stopEvent` | No | Stop event; required when `enabled` is `true`. |

### SetMissionPreparationMusic

| Parameter | Required | Purpose |
|---|---|---|
| `playEvent` | Yes | Start event. |
| `stopEvent` | Yes | Stop event. |
| `missionCode` | No (every sortie) | Only that mission; wins over the global setting. |

```lua
V_TppSoundDaemon.SetMissionPreparationMusic("Play_bgm_default", "Stop_bgm_default")
V_TppSoundDaemon.SetMissionPreparationMusic("Play_bgm_s10010", "Stop_bgm_s10010", 10010)
```

---

## Cassette

All functions below belong to `V_CassetteCommand`.

### Playback and visibility

| Function | Description |
|---|---|
| `ShowCassetteTape(fileName)` | Shows a hidden unlocked track. File name or save index. |
| `HideCassetteTape(fileName)` | Hides a track until shown, acquired, or the game exits (not saved: hide it each boot). File name or save index. |
| `PlayCassetteTapeByTrackId(id, loop, playAll)` | Plays a track. `id` from `GetTapeTrackId`, not the save index. |
| `GetTapeTrackId(fileName)` | Returns the track ID, or `-1`. |
| `GetCassettePlayingTime()` | Returns playback time. |
| `GetCassettePlayingTrackId()` | Returns the active track ID. |
| `PauseCassette(fadeSec)` | Pauses playback. |
| `ResumeCassette(fadeSec)` | Resumes playback. |
| `StopCassette(fadeSec)` | Stops playback. |
| `IsCassetteSpeakerEnabled()` | Returns speaker-playback state. |
| `SetCassetteSpeakerEnabled(enabled)` | Enables or disables speaker playback. |

### Custom tape helpers

| Function | Description |
|---|---|
| `RegisterRadioCassette(gimmickName, fox2Path, event, fileName)` | Makes a custom tape collectible from a radio. |
| `SetOwnershipCassetteTape(fileName, enabled)` | Locks or unlocks a custom tape. |
| `SetNewFlagCassetteTape(fileName, enabled)` | Sets or clears the `NEW` flag. |
| `RegisterCustomTapes(def)` | Adds custom albums and tracks, see below. |

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

Returns `true` on success; invalid entries are skipped. Track save
indexes are allocated automatically.

#### Album fields

| Field | Required | Purpose |
|---|---|---|
| `albumId` | Yes | Internal album ID. |
| `langId` | Yes | Display-name language ID. |
| `type` | No | Album type string, e.g. `PREINSTALL_MISSION_INFO`, `PREINSTALL_MUSIC`, `PREINSTALL_BRIEFING`, `PREINSTALL_SPECIAL`. Give `type` or `typeValue`. |
| `typeValue` | No | Album type as a number. |

#### Track fields

| Field | Required | Purpose |
|---|---|---|
| `albumId` | Yes | Parent album ID. |
| `langId` | Yes | Track display-name language ID. |
| `fileName` | Yes | Internal track filename. |
| `dataTimeJp` | No (`0`) | Japanese duration metadata. |
| `dataTimeEn` | No (`0`) | English duration metadata. |
| `important` | No (`0`) | Important flag/value. |
| `special` | No (`0`) | Special flag/value. |
| `unlocked` | No (`0`) | Initial ownership state. |

---

## UI

All functions below belong to `V_TppUiCommand`.

### Equipment backgrounds

| Function | Description |
|---|---|
| `SetDefaultEquipBgTexturePath(path, colored, opacity, scaleX, scaleY)` | Sets the default player-equipment background. |
| `ClearDefaultEquipBgTexture()` | Restores the player default. |
| `SetEquipBgTexturePath(equipId, path, colored, opacity, scaleX, scaleY)` | Sets one player-equipment background. |
| `ClearEquipBgTexture(equipId)` | Clears one player-equipment background. |
| `SetEnemyWeaponBgTexturePath(path, colored, opacity, scaleX, scaleY)` | Sets the default enemy-weapon background. |
| `ClearEnemyWeaponBgTexture()` | Restores the enemy default. |
| `SetEnemyEquipBgTexturePath(equipId, path, colored, opacity, scaleX, scaleY)` | Sets one enemy-equipment background. |
| `ClearEnemyEquipBgTexture(equipId)` | Clears one enemy-equipment background. |
| `ClearAllEquipBgTextures()` | Clears every background, defaults included. |

| Parameter | Required | Purpose |
|---|---|---|
| `equipId` | Yes | A `TppEquip` ID. `0` = empty slot. |
| `path` | Yes | Texture path; `.ftex` is added if missing. |
| `colored` | No (`false`, white glow like vanilla) | `true` shows the texture as is, black included. |
| `opacity` | No (`1`) | Background alpha. |
| `scaleX` | No (`1`) | Width multiplier, `1` = vanilla size. |
| `scaleY` | No (`1`) | Height multiplier, `1` = vanilla size. |

Player equipment is what you carry this mission, supply drops and
pickups included. Enemy-only guns and shields always use the enemy
backgrounds. Bionic arms and empty slots only use
`SetEquipBgTexturePath`.

### Screen textures

| Function | Description |
|---|---|
| `SetLoadingSplashMainTexturePath(path, missionCode)` | Sets the main loading image. |
| `SetLoadingSplashBlurTexturePath(path, missionCode)` | Sets the blurred loading image. |
| `ClearLoadingSplashTextures(missionCode)` | Restores the loading textures. |
| `SetMissionTelopSplashTexturePath(path, missionCode)` | Sets the Mission Telop texture. |
| `UnsetMissionTelopSplashTexturePath(missionCode)` | Restores the Mission Telop texture. |
| `SetGameOverSplashMainTexturePath(path, missionCode)` | Sets the main Game Over image. |
| `SetGameOverSplashBlurTexturePath(path, missionCode)` | Sets the blurred Game Over image. |
| `ClearGameOverSplashTextures(missionCode)` | Restores the Game Over textures. |
| `SetBonusScreenPopupTexturePath(path, missionCode)` | Replaces the Diamond Dogs logo behind every popup that shows it. |
| `SetReportScreenPopupTexturePath(path, missionCode)` | Replaces the Mother Base photo behind the staff Report popup. |
| `ClearBonusPopupTextures(missionCode)` | Restores the popup textures. |

`missionCode` is optional. Setters: omitted = every mission; a mission's
own setting wins. Clears: omitted clears only the all-missions picture,
given clears only that mission's.

Popup textures: `.ftex` is added if missing; use 16:9.

### Resident UI packs

| Function | Description |
|---|---|
| `LoadResidentUiPack(path, sizeBytes)` | Loads a UI pack (`.fpk` + `.fpkd`, with its `.pftxs`) for the rest of the game, loading screens included. Never unloaded; repeat calls do nothing. Returns `true` when the load is requested. |
| `IsResidentUiPackLoaded(path)` | `true` once loaded, so `V_UixUtility.CreateWindow` can use its files. |

`sizeBytes`: memory for the `.fpk` and `.fpkd` contents (not textures),
default 1 MiB, 64 KiB to 32 MiB. No cap on pack count or total memory.

### Loading tips and Game Over

Read the loading tips screen and Game Over menu to draw your own. Poll
from `V_FrameWork.SetFrameCallback`: `Update` doesn't run during a load.

`GetLoadingTipsInfo()` returns a table, or `nil` when unreadable:

| Field | Meaning |
|---|---|
| `session` | `true` while the tips screen runs. |
| `state` | `0` splash, `1` waiting for the tip text, `2` tips shown, `3` ending (the player resumed). |
| `tipIndex`, `tipCount` | The tip shown and how many there are. |
| `pageTurn` | `0` none; `1`..`5` while a page turns (`3` is the frame the game swaps the text). |
| `resumePermitted` | `true` once the game has loaded and the player may leave the screen. |
| `hidden` | `true` while another full-screen menu covers the tips. |
| `tipId` | Only in state `2`: the tip's ID. `tipId % 2^32` equals `Fox.StrCode32(tostring(TppDefine.TIPS.COVER))` for the COVER tip. |
| `titleLangId`, `bodyLangId` | Only in state `2`: language IDs for `V_UixUtility.GetLangText`. |
| `page`, `pageCount` | Only in state `2`: the page of a multi-page tip. |

For a frame or two after a load starts, `state` is still the previous
load's `3`: treat `3` at the start of a session as not yet started.

`GetGameOverInfo()` returns a table, or `nil` when unreadable:

| Field | Meaning |
|---|---|
| `open` | `true` while the Game Over menu runs. |
| `state` | `3` waiting for black, `4` menu shown, `5` choosing, `6`/`7` confirm popup, `8` chosen, `9` fading out, `10` done. |
| `selected`, `previous` | The highlighted row, from `0`, and the one before it. |
| `count` | Number of rows, `1` to `4`. |
| `type` | `0` normal, `1` Cyprus, `2` time paradox. Not the [Game Over types](#game-over-types) values. |
| `items` | The rows' language IDs in row order (e.g. `gameover_select_return_cp`); they also tell the rows apart. |

While `open` is `false`, the number fields are `0` and `items` is empty.

### Equipment icons

| Function | Description |
|---|---|
| `SetEquipIconFtexPath(equipId, path)` | Replaces one equipment icon. `.ftex` optional. |
| `ClearIconFtexPath(equipId)` | Restores one icon. |
| `ClearAllIconFtexPaths()` | Restores all icons. |

When needed: see [Equipment names](#equipment-names).

### Equipment names

| Function | Description |
|---|---|
| `SetEquipLangInfo(def)` | Name and description of an equip in pickups, HUD and equip lists (not R&D). |

An equip with an [`AddToEquipDevelopTable`](#addtoequipdeveloptable) row
already uses its `langEquipName` and `iconFtexPath` in the item wheel,
HUD and Sortie Prep. `SetEquipLangInfo` and
[`SetEquipIconFtexPath`](#equipment-icons) are for an equip with no R&D
row (a pickup), or to differ from the row.

```lua
V_TppUiCommand.SetEquipLangInfo{
  equipId           = TppEquip.EQP_WP_Example,
  langEquipName     = "example_weapon_name",
  langEquipInfo     = "example_weapon_info",
  langEquipRealName = "example_weapon_real_name",
}
```

### Emergency missions

| Function | Description |
|---|---|
| `SetMissionEmergency(missionCode, enabled)` | Sets emergency status. |
| `IsMissionEmergency(missionCode)` | Returns emergency status. |
| `SetEmergencyMissionPopup(title, body)` | Sets popup text using raw strings. |
| `SetEmergencyMissionPopupLangId(title, body)` | Sets popup text using language IDs. |
| `ClearEmergencyMissionPopupOverride()` | Restores the vanilla popup. |
| `ShowMissionIcon(title, body, time)` | Shows the emergency-mission icon. `title` and `body` are language IDs, `time` is in seconds (default `6`); a `nil` `title` or `body` uses the vanilla text. |

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
| `SetEnemyUnitName(langId)` | Sets the global binoculars unit name. |
| `SetEnemyInformationLangIdForSoldier(id, langId)` | Sets one soldier's map/marker name. |
| `SetEnemyUnitNameForSoldier(id, langId)` | Sets one soldier's binoculars name. |

### iDroid map

| Function | Returns | Description |
|---|---|---|
| `IsMbMapPhotoRealMode()` | `true` / `false`, or `nil` | `true` in satellite view, `nil` with no iDroid map. Read side of `TppUiCommand.SetMbMapPhotoRealModeByForce`. |
| `GetMbStageObjects(layoutCode)` | list, or `nil` | The pieces of a Mother Base layout. `layoutCode` is required, e.g. `vars.mbLayoutCode`. |
| `IsMbMapNorthUpMode()` | `true` / `false`, or `nil` | `true` for North Up (map or aerial), `false` for Heading Up, `nil` with no iDroid map. Keeps the last choice while the iDroid is closed. |
| `GetMapMarkerSlots()` | list, or `nil` | Every marker the iDroid map can draw, Intel Scouting's predicted enemy areas included (`markerType` `3`, offset as on the iDroid). `nil` in FOB. |

Each `GetMapMarkerSlots` entry has the
[`GetMarkers`](/V_Framework/UI#world-and-markers) fields except `dying`,
`mapX`, `mapY` and `mapZ`, plus `slot`.

Each `GetMbStageObjects` piece:

```lua
{
  x, z, turn, type, cluster, plant,
  joined    = { [edge] = true },
  buildings = { [slot] = { id, turn } },
}
```

`turn`, and each building's `turn`, are in radians.

| `type` | Piece |
|---|---|
| `0` | HQ |
| `1` | A cluster's first plant |
| `2` | Plant |
| `3` | Connector |
| `4` | Bridge |
| `5` | Cluster bridge |

`GetMbStageObjects` returns `nil` until the layout is loaded; the first
call starts the load. `nil` in FOB.

### Announcement log

Announcements are the typed lines at the top left; a `SetAnnounceLogSE`
sound plays when one starts typing.

| Function | Returns | Description |
|---|---|---|
| `SetAnnounceLogSE(langId, sound, extra)` | announcement key (number), `0` on failure | Sets the announcement's sound. |
| `SetAnnounceLogSE(langId, { condition, chara, event }, extra)` | announcement key (number), `0` on failure | The announcement plays an iDroid dialogue line. |
| `SetAnnounceLogSE(langId, condition, chara, event, extra)` | announcement key (number), `0` on failure | The same, without the table. |
| `RegisterAnnounceLogSfx(eventName)` | `true` / `false` | For Wwise events in gameplay sound banks: registers the name so it plays through the gameplay sound. Order with `SetAnnounceLogSE` does not matter. |
| `UnsetAnnounceLogSE(langId)` | `true` if something was set | Back to the vanilla sound. |
| `UnregisterAnnounceLogSfx(eventName)` | `true` / `false` | Undoes `RegisterAnnounceLogSfx`. |
| `RequestMbSoundControllerDialogue(condition, chara, event)` | `true` when queued | Plays an iDroid dialogue line through the iDroid's voice queue. Also takes `{ condition, chara, event }`. |
| `SetAnnounceLogTypingSpeed(speed)` | `true` when it took effect | How fast announcement lines type out. |
| `SetAnnounceLogHoldTime(seconds)` | `true` when it took effect | How long a finished line stays on screen. |
| `SetAnnounceLogPriority(langId, priority)` | `true` when it took effect | Where a new announcement goes in the log's waiting queue. |

| Parameter | Required | Purpose |
|---|---|---|
| `langId` | Yes | The announcement's langId string. |
| `sound` | No (no sound) | A string is an iDroid voice name, otherwise a Wwise event name. A number `1`-`134` is a vanilla UI announcement sound, `135`-`251` a vanilla iDroid voice (number - 135). |
| `condition` | Yes | Dialogue forms only: the dialogue line. In the `{ condition, chara, event }` table a name or its number; as a separate argument a number. |
| `chara`, `event` | No (the iDroid's own: `"idroid"`, `"DD_vox_idroid"`) | A name or its number; `0` also means the iDroid's own. |
| `extra` | No | A second sound that starts at the same moment as the main one. Same forms as `sound`. Only one of the two can be an iDroid voice. |

Voices with their own UI sound: `222`, `225` -> `48`; `230` -> `89`;
`236` -> `125`; `238`-`240` -> `123`; `244`-`246`, `248` -> `124`. An
`extra` replaces it; `extra` `0` drops it.

A voice, dialogue line or Wwise event on consecutive announcements plays
once for the run; UI sounds alone play on every line. A sound and its
`extra` count as one (a voice in the pair decides).

`SetAnnounceLogSE` also reaches announcements shown without a sound
(e.g. dispatch results). Off in FOB.

Dialogue lines (dialogue forms and `RequestMbSoundControllerDialogue`)
queue with the iDroid's own voice lines; one that cannot start within 10
s is dropped.

```lua
-- the dialogue line plus the level-up jingle
V_TppUiCommand.SetAnnounceLogSE("announce_unit_lvup_RD", { condition = 1167242151 }, 89)

-- an iDroid line with no announcement
V_TppUiCommand.RequestMbSoundControllerDialogue(1150464567)
```

#### Typing speed and hold time

`speed` (required): multiplier, `1` = vanilla, above `0` to `1000`.
`seconds` (required): `0` to `3600`, vanilla `1.5`. Both reset at every
mission start: set them in your mission start code.

#### Priority

| `priority` | Place in the waiting queue |
|---|---|
| `"high"` | Ahead of the waiting lines that aren't `"high"`. |
| `"normal"` | In order. |
| `"low"` | Every newer line goes ahead of it. |
| `"default"`, `""`, `"none"` | The game's own. |

Both parameters are required. Lines already typing never move. Vanilla:
34 lines `"high"` (side op and mission goals, pickups, fame, dispatch
results); `announce_dev_requirements_met`, `announce_ops_destroy_*`,
`announce_ops_staff_dead`, `announce_ops_staff_proficiency_inc`,
`announce_extract_resouce`, `announce_extract_processed_res`,
`announce_res_develop` and `announce_res_dev_report` `"low"`; the rest
`"normal"`. Persists across missions. FOB uses vanilla order.

```lua
V_TppUiCommand.SetAnnounceLogPriority("announce_quest_add", "low")
```

A mod's own `SetAnnounceLogSE` wins over V Framework's restored iDroid
line.

### Mission-select warnings

`color` is an optional UI palette name (e.g. `"cmn-col-ng"`); default is
the colour each row names.

| Function | Description |
|---|---|
| `SetMissionAcceptWarning(missionCode, langId, color)` | Red line in the "Accept this mission?" popup. |
| `SetMissionMenuHelp(missionCode, langId, color)` | Yellow line at the bottom of the mission list. |
| `ClearMissionMenuHelp(missionCode)` | Removes one mission's help line. |

```lua
V_TppUiCommand.SetMissionAcceptWarning(13006, "MustOwnRockets", "cmn-col-ng")
```

### Custom locations

| Function | Description |
|---|---|
| `SetLocationIcon(def)` | Icon for a custom location's missions, Free Roam and Side Ops rows and iDroid location header. |
| `AddMissionListLocationTab(def)` | A Missions list tab after Africa listing only that location's missions, with its `SetLocationIcon` icon. |
| `SetMissionListLocationTabVisible(locationId, visible)` | Shows or hides that tab. V Framework calls it at every mission load; call it only to override. |

`SetLocationIcon` takes `{ locationId, texturePath, u, v }` or `{
locationId, iconLocationId }`:

| Field | Required | Purpose |
|---|---|---|
| `locationId` | Yes | Any location ID except `10`/`20`/`30`/`50`. |
| `texturePath` | No | Own icon texture; `.ftex` is added if missing. |
| `u`, `v` | No (`0`) | Top-left of the icon in a 4 x 4 grid sheet: `0`, `0.25`, `0.5` or `0.75`. |
| `iconLocationId` | No | Reuse the game's icon of `10`, `20`, `30` or `50`. Needed without `texturePath`. |

`AddMissionListLocationTab` takes `{ locationId, nameLangId }`:

| Field | Required | Purpose |
|---|---|---|
| `locationId` | Yes | Not `10` or `20` (they have tabs). |
| `nameLangId` | Yes | Tab label. |

The tab shows only while the location has an open mission below 30000;
the missions stay in the first tab too, Free Roam rows in Free Roam. Up
to 15 custom tabs; a 16th logs a warning and gets no tab.

```lua
V_TppUiCommand.SetLocationIcon{ locationId = 40, iconLocationId = 10 }
V_TppUiCommand.AddMissionListLocationTab{ locationId = 40, nameLangId = "tpp_loc_gntn" }
```

---

## Helicopter

| Function | Description |
|---|---|
| `V_Helicopter.SetEnableHeliVoice(enabled, voiceEvent, radioEvent)` | Overrides Pequod voice and radio events. |
| `V_Helicopter.PilotCallVoice(label)` | Plays a pilot voice line. |
| `V_Helicopter.PilotCallRadio(label1, label2)` | Plays one or two radio lines. Helicopter must be rendered. |
| `V_Helicopter.SetFieldTaxiMissionEnabled(missionCode, enabled)` | Enables or disables Taxi for a mission. Never in FOB. |
| `V_Helicopter.SetTaxiLandingZoneHidden(lzName, hidden)` | Hides or shows an LZ on the Taxi map. |
| `V_Helicopter.SetTaxiRideState(state)` | Sets Snake's pose for Taxi rides: `3` on the edge (default), `8` inside by the closed door, `6` inside with the door open, `10` back seat. Mid-ride, Snake moves there. |
| `V_Helicopter.ResetTaxiState()` | Clears the Taxi ride in progress. Does not undo `SetTaxiRideState`: the pose stays until set again (`3` for the default). |
| `V_Helicopter.SetPlayerDropSeatPose(ganiPath, missionCode)` | Replaces Snake's seated pose in the helicopter during the drop (`snaputh_q_seat_idl_b_lp`). Without `missionCode`, every mission; a `nil` `ganiPath` restores vanilla. |

```lua
V_Helicopter.SetPlayerDropSeatPose("/Assets/tpp/motion/SI_game/fani/bodies/snap/snaputh/snaputh_q_seat_idl_b_tgs_lp", 10040)
```

Helicopter SendCommands: [Helicopters](#helicopters).

### Pequod weapons

| Function | Returns | Description |
|---|---|---|
| `V_Helicopter.RegisterSupportHeliWeapon(key, def)` | `true` when registered, `false` on a bad argument (the log says why) | Registers a custom Pequod sub weapon. |

Make the R&D row with
[`AddToEquipDevelopTable`](#addtoequipdeveloptable)`(key, ...)`,
`equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Heli` and
`equipDevelopGroupID = TppMbDev.EQP_DEV_GROUP_OTHER_050` (rocket list)
or `TppMbDev.EQP_DEV_GROUP_OTHER_060` (missile list), then call this
with the same `key`.

| Field | Required | Purpose |
|---|---|---|
| `type` | Yes | `"Rocket"` (volleys at a ground position) or `"Missile"` (homing missiles at a target). |
| `ammo` | Yes | Per sortie, refilled every sortie. Rocket: volleys; Missile: missiles. |
| `podCount` | No (`2`) | `2` or `4`: which vanilla pod set the shots leave from. |
| `attackId` | No (vanilla) | `TppDamage.ATK_*`, `0`-`1023`, `DeclareDamages` rows included. Sets the R&D tag: tranquilizer ZZZ, stun STN, lethal DMG, else the base row's. |
| `shellId` | No (vanilla) | Only `TppEquip.EQP_BL_uth0_ammo1` (rocket) or `TppEquip.EQP_BL_uth0_ammo0` (missile; homes only for `"Missile"`). |
| `blastId` | No (vanilla) | `TppEquip.BLA_*`, `DeclareBLAs` rows included. `BLA_SleepingGusGrenade`, `BLA_SleepingGusMine`, `BLA_SleepGusAssist` (gas, tag ZZZ) and `BLA_SmokeGrenade`, `BLA_SmokeAssist` (smoke, smoke grenade's tag) replace the explosion with a cloud of the row's range and ignore `attackId`. Other rows keep the explosion with the row's range and noise. |
| `voice` | No (vanilla) | Pilot line on attack: `"SHR..."` (radio) or `"SHV..."` (cabin), see `HeliStart` in [Radio messages](#radio-messages); `false` = none. Vanilla `SHR0240` rocket, `SHR0250` missile, `SHR0280` gas, `SHR0270` smoke. |
| `shotCount` | No (Rocket `8`, Missile `2`) | Rocket: shots per volley, `1`-`8`. Missile: missiles per salvo. |
| `shotInterval` | No (`0.2`) | Seconds between shots. |
| `windup` | No (`2.0`) | Seconds before the first shot. |
| `cooldown` | No (`30`) | Seconds between two attacks. |
| `pods` | No (vanilla) | Visible pods: `"RocketLauncherLL"`, `"RocketLauncherLR"`, `"RocketLauncherRL"`, `"RocketLauncherRR"`, `"MissileLauncherLL"`, `"MissileLauncherLR"`, `"MissileLauncherRL"`, `"MissileLauncherRR"`. |

Up to 255. FOB, PVP and saves without V Framework use the vanilla weapon
of the row's `baseEquipDevelopId` (or none).

```lua
V_TppMotherBaseManagement.AddToEquipDevelopTable(
  "MyMod:SleepRockets",
  {
    const = {
      equipDevelopTypeID  = TppMbDev.EQP_DEV_TYPE_Heli,
      equipDevelopGroupID = TppMbDev.EQP_DEV_GROUP_OTHER_050,
      langEquipName       = "my_heli_rocket_name",
      iconFtexPath        = "/Assets/.../ui_icon_alp",
    },
    flow = {
      developGmpCost = 500,
    },
  }
)

V_Helicopter.RegisterSupportHeliWeapon("MyMod:SleepRockets", {
  type    = "Rocket",
  ammo    = 4,
  blastId = TppEquip.BLA_SleepingGusGrenade,
})
```

### Pequod customize parts

| Function | Returns | Description |
|---|---|---|
| `V_Helicopter.RegisterSupportHeliOutfit(key, def)` | `true` when registered, `false` on a bad argument | Registers a Pequod outfit. |
| `V_Helicopter.RegisterSupportHeliGatling(key, def)` | `true` / `false` | Registers a gatling for the heli's own door guns. |
| `V_Helicopter.RegisterSupportHeliSideGun(key, def)` | `true` / `false` | Registers a side gun for the door gun the player fires. |

One R&D row per part with
[`AddToEquipDevelopTable`](#addtoequipdeveloptable)`(key, ...)`, then
this call with the same `key`:

  - Outfit rows: `equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_HeliBody`.
  - Gatling and side-gun rows: `TppMbDev.EQP_DEV_TYPE_Heli`, any group
    but body, rocket, missile, flare and armor.
    `EQP_DEV_GROUP_OTHER_030` on a gatling shows the gatling details.

Developed parts are picked in CUSTOMIZE > HELICOPTER (Outfit, Gatling
Gun, Side Gun rows). A gatling or side-gun row's R&D tag follows its
`attackId`. Labels need the V_FrameWork lang packs. Off in FOB.

Outfit `def` fields:

| Field | Required | Purpose |
|---|---|---|
| `fova` | No | The `.fv2` the heli wears under its paint (same as `models = { Default = "..." }`). |
| `models` | No | Files per part; see below. |
| `paints` | No | `{ ["<game paint .fv2>"] = "<outfit .fv2>" }`. A paint without an entry applies the game's file. |
| `wholeHeli` | No (`false`) | `true`: the outfit names every file of its helicopter, and each Pequod part it does not name is left out. |
| `pack` | No | The `.fpk` holding the files; its `.fpkd` and `.pftxs` load with it, with the mission, like a vanilla paint pack. |

Set at least one of `fova`, `models` and `paints`. Game paint files:
`/Assets/tpp/fova/mecha/all/mfv_scol_c00` to `c21.fv2`, `mfv_camo_c00`
to `c17.fv2`, and
`/Assets/tpp/fova/mecha/special_color/mechaGoldUth.fv2` and
`mechaSilverUth.fv2`.

Gatling and side-gun `def` fields:

| Field | Required | Purpose |
|---|---|---|
| `attackId` | No (vanilla) | `TppDamage.ATK_*`. |
| `bulletId` | No (vanilla) | `TppEquip.BL_*`, `0`-`255`. |
| `models` | No | Files per part; see below. |
| `pack` | No | As for an outfit. |

`models` takes `{ <part> = "<file>" }`, `{ <part> = { "<file>", "<file>"
} }` or `{ <part> = false }` (nothing under that part name), up to 64
files per registration, all parts together (an outfit's `fova` counts as
one). The file's extension picks the part names:

| Extension | Parts |
|---|---|
| `.parts` | `Main` (the body), `Missile`, `Rocket` |
| `.fmdl` | `GunL`, `GunR`, `GunArmL`, `GunArmR`, `ExtraWeapon`, `Shield`, `Logo`, `Glass0`-`Glass5`, `PilotL`, `PilotR`, `MissileLauncherLL` / `LR` / `RL` / `RR`, `RocketLauncherLL` / `LR` / `RL` / `RR` |
| `.fcnp` | `Main`, `GunArmL`, `GunArmR`, `ExtraWeapon`, `Gun`, `MissileLauncher`, `RocketLauncher` |
| `.gskl` | The `.fmdl` names without the pilots, shield, logo and glass |
| `.vfx` | `Downwash`, `DownwashWater`, `Explosion`, `MuzzleFlash`, `LauncherMuzzleFlash`, `LauncherBackFire`, `Flare`, `SearchLight`, `BarrelHeat`, `BarrelHeatSmoke`, `LensFlare` |
| `.fv2` | `Default` |
| `.mtar` | Any name (the heli's motion archive) |

---

## Custom vehicles

A new vehicle type beside the game's 8, up to 7 at once: spawn it by
name (`Vehicle.type.<name>`), in place of a share of a game vehicle's
spawns, or from its own Sortie Prep row. Soldiers, fulton and markers
treat it as its `proxyVehicleTypeIndex` vehicle.

| Function | Returns | Description |
|---|---|---|
| `V_Vehicle.RegisterVehicle(def)` | the vehicle type number, or nothing (logged) when refused | Registers a vehicle. |
| `V_Vehicle.SetSpawnChance(def)` | `true` / `false` | Spawns it in place of a game vehicle. |
| `V_Vehicle.SetReliefPack(def)` | `true` / `false` | Deploys the player with another relief pack. |
| `V_Vehicle.IsLoaded(name)` | `true` / `false` | `true` while its body is loaded. |

### RegisterVehicle fields

| Field | Required | Purpose |
|---|---|---|
| `name` | Yes | Letters, digits and `_`, up to 48, not a game vehicle type name. Becomes `Vehicle.type.<name>`. |
| `partsFile` | Yes | The `.parts` path the pack's TppVehicle2BodyData names: the vehicle's own path, never a game vehicle's. |
| `attachments` | No | A list of attachment `.parts` paths (turret, cargo); their TppVehicle2AttachmentData follows the vehicle. |
| `bodyLife`, `wheelLife`, `turretLife`, `subWeaponLife`, `defenseGrade`, `defenseValues` | No | Used by every spawn that does not give its own. `defenseValues` = 4 numbers. |
| `gearRatios` | No | `{ reverse, first, second, ... }`, 2 to 6 numbers. |
| `finalGearRatio`, `shiftDownRpm`, `shiftUpRpm` | No | Gearbox. |
| `speeds` | No | `{ FORWARD_SLOW, FORWARD_NORMAL, FORWARD_FAST, FORWARD_MAX, BACKWARD_SLOW, BACKWARD_NORMAL, BACKWARD_FAST, BACKWARD_MAX }` in m/s: the speeds soldiers drive at. |
| `sounds` | No | `{ engine, engineStop, horn, hornStop }`, sound event names. |
| `sortie` | No | Sortie Prep row; see [below](#sortie-fields). |

### Sortie fields

```lua
sortie = {
  pack       = "/Assets/.../veh_rl_my.fpk",
  countsAs   = "WESTERN_LIGHT_VEHICLE",
  nameLangId = "name_vehicle_MY",
  icon       = "/Assets/tpp/ui/texture/.../ui_vhcl_my",
}
```

| Field | Required | Purpose |
|---|---|---|
| `pack` | Yes | The vehicle's relief pack: a copy of the game's `veh_rl_` pack of the `countsAs` vehicle, with the mod's files on their own paths. |
| `countsAs` | Yes | The game vehicle it deploys as. The relief pack's TppVehicle2BodyData `vehicleTypeIndex` and `proxyVehicleTypeIndex` must name the same type. |
| `subType` | No | A `Vehicle.subType` name. |
| `nameLangId` | No (the `countsAs` vehicle's name) | Lang ID of the row name, shipped in the mod's own `lang_default_data` packs. Also the name on its map marker. |
| `icon` | No (the `countsAs` vehicle's picture) | The row picture, an `.ftex` path; the extension is optional. |

With a `sortie` table the vehicle is a Mother Base resource counted like
the game's (fulton or ride one out to get one; deploying or a supply
drop uses one); its rows (Sortie Prep, supply drop, Resources >
Vehicles) show only while you have one. Supply drop and sale use the
`countsAs` vehicle's GMP. The count is kept by V Framework, not the
game's resource table or the server.

### Spawn chance and relief packs

```lua
V_Vehicle.SetSpawnChance{ vehicle = "MY_VEHICLE", inPlaceOf = "WESTERN_LIGHT_VEHICLE", chance = 30 }
V_Vehicle.SetReliefPack{ type = "WESTERN_LIGHT_VEHICLE", pack = "/Assets/.../veh_rl_my.fpk" }
```

`SetSpawnChance` fields:

| Field | Required | Purpose |
|---|---|---|
| `vehicle` | Yes | A registered vehicle. |
| `inPlaceOf` | Yes | A game vehicle type. |
| `chance` | Yes | `0`-`100`; `0` removes it. |
| `subType`, `inPlaceOfSubType` | No | `Vehicle.subType` names. |

Applies to `Spawn` and `Respawn` in missions that load the vehicle's
pack; a locator keeps its roll for the mission.

`SetReliefPack` fields:

| Field | Required | Purpose |
|---|---|---|
| `type` | Yes | The game vehicle type. |
| `pack` | No | The player deploys with that pack's vehicle. Omitted restores the game's. |
| `subType` | No | A `Vehicle.subType` name. |

Both are optional; with a `sortie` table neither is needed.

### Vehicle pack

Required:

  - A fox2 with TppVehicle2BodyData (`vehicleTypeIndex` `0`,
    `proxyVehicleTypeIndex` = the game vehicle it behaves as,
    `bodyImplTypeIndex`, `partsFile`, `bodyInstanceCount`) and the
    SoundPackage of that game vehicle.
  - Own paths for the `.parts`, model, `.fcnp` and `.veh`.
  - Added with `AddMissionPacks`.

A relief pack for `SetReliefPack` is a copy of the game's `veh_rl_` pack
with the same changes; its `vehicleTypeIndex` stays the game's.

Off in FOB. Saves load without the vehicle once the mod is removed.

---

## Title sequence

Applies in the ACC.

| Function | Description |
|---|---|
| `V_title_sequence.SetPlayIDroidEndMotion(enabled)` | Snake puts the iDroid away (`snaputh_q_idroid_ed`) when it closes while seated. Default: the [Infinite Heaven option](/V_Framework#infinite-heaven-menu) (on). |
| `V_title_sequence.SetMotion(ganiPath)` | Replaces the seated idle loop (`snaputh_q_seat_idl_lp`). `nil` restores it. |

```lua
V_title_sequence.SetPlayIDroidEndMotion(true)
V_title_sequence.SetMotion("/Assets/tpp/motion/SI_game/fani/bodies/snap/snaputh/snaputh_q_idl_lp")
```

`ganiPath` takes any [clip](/V_Framework/Custom_Weapons#clip-fields)
form. The clip must be in a player motion archive (e.g.
`player2_heli.mtar`, `player2_resident.mtar`), else the vanilla idle
plays. Applies at once, or when the iDroid closes.

---

## Constants

### Game Over types

For `V_TppSoundDaemon.SetGameOverMusic`.

| Constant | Value |
|---|---:|
| `V_TppGameObject.GAME_OVER_GENERAL` | 0 |
| `V_TppGameObject.GAME_OVER_PARADOX` | 1 |
| `V_TppGameObject.GAME_OVER_STEALTH` | 2 |
| `V_TppGameObject.GAME_OVER_CYPRUS` | 3 |

### Outfit Develop groups

For `equipDevelopGroupID` in an outfit's
`V_TppMotherBaseManagement.AddToEquipDevelopTable` `const` table.

| Constant | Value |
|---|---:|
| `V_TppMbDev.EQP_OUTFIT_VARIANT_GRADE` | 0 |
| `V_TppMbDev.EQP_OUTFIT_VARIANT_NAME` | 79 |

### Player stances

For `V_Player.RequestToSetTargetCqcStance`.

| Constant | Value |
|---|---:|
| `V_PlayerCqcStance.STAND` | 0 |
| `V_PlayerCqcStance.SQUAT` | 1 |

### Player skills

For [`V_Player.StartSkill`](#item-effects). `V_PlayerSkill.<name>`:

| Name | Effect | Length without `seconds` |
|---|---|---|
| `StealthCamo` | Stealth camo, like STEALTH CAMO.PP | 24/36/48 s by level 1-3 |
| `Pentazemin` | Steady aim | 24/36/48 s by level 1-3 |
| `Noctocyanin` | People seen through walls | 24/36/36/48/48 s by level 1-5 |
| `Acceleramin` | Reflex mode starts | 10/12/12/14/14 s by level 1-5; `seconds` is ignored |
| `ParasiteMist` | Parasite Suit mist | - |
| `ParasiteCamo` | Parasite Suit camo | - |
| `ParasiteHard` | Parasite Suit hardening | - |

### Notice kinds

For [`AddNotice`](#notice).

| Constant | The soldier | Needs |
|---|---|---|
| `V_NoticeKind.DISCOVERED` | Spots the player outright. | `targetId` = the player. |
| `V_NoticeKind.DISCOVERED_ON_GUARD` | Spots the player while already on guard, and aims at him (laser). | `targetId` = the player. |
| `V_NoticeKind.SUSPICIOUS` | Glimpses the player, turns, then goes to check, calling a comrade or radioing the CP. | `targetId` = the player. |
| `V_NoticeKind.SAW_CARDBOARD_BOX` | Checks a suspicious cardboard box. | `targetId` = the player (in a box), or a cardboard box. |
| `V_NoticeKind.SAW_DECOY` | Goes to a decoy and breaks it. | `targetId` = a decoy. |
| `V_NoticeKind.SAW_SUPPLY_DROP` | Goes for the player's supply drop box. | Neither: `targetId` and `pos` are ignored. |
| `V_NoticeKind.SAW_HOSTILE_ANIMAL` | Faces a dangerous animal. | `targetId` = an animal, or Quiet. |
| `V_NoticeKind.SAW_ANIMAL` | Looks at something harmless. | `targetId` = any game object. |
| `V_NoticeKind.HEARD_NOISE` | Investigates a noise. | `pos`, or `targetId` = a soldier. |
| `V_NoticeKind.CALLED_OVER` | Is called over by a comrade: with `targetId` he turns and walks over calmly, with `pos` he comes over weapon-ready. | `pos`, or `targetId` = a soldier. |
| `V_NoticeKind.CALL_FOR_HELP` | Comes over weapon-ready. | `pos`, or `targetId` = a soldier. |

`DISCOVERED_ON_GUARD` = `0x05`, `SAW_CARDBOARD_BOX` = `0x19`,
`SUSPICIOUS` = `0x26`. No Fulton kind: it cannot work from Lua.

### Call menu items

For the [Call menu](#call-menu) functions.

| Constant | Option |
|---|---|
| `V_CallMenuItem.KNOCK` | Knock |
| `V_CallMenuItem.ACTIVE_SONAR` | Active Sonar |
| `V_CallMenuItem.BUDDY_1` to `BUDDY_4` | Buddy commands, top to bottom |
| `V_CallMenuItem.REQUEST_INFO` | Spit it out |
| `V_CallMenuItem.SELL_OUT_COMRADE` | Where are the rest? |
| `V_CallMenuItem.REQUEST_CRAWL` | Get down |
| `V_CallMenuItem.CALL_COMRADE` | Call Em; takes the knock row while you hold an enemy; not on a child soldier |
| `V_CallMenuItem.RESCUE_BOY` | Go / Wait for the rescued children |
| `V_CallMenuItem.FALSE_RADIO_RESPONSE` | Lie to Them; takes the sonar row while you hold an enemy; not on a child soldier |

### Call menu columns

For `column` in `V_Player.AddCallMenuItem`.

| Constant | Column |
|---|---|
| `V_CallMenuColumn.KNOCK` | Top (one row) |
| `V_CallMenuColumn.BUDDY` | Right (four rows) |
| `V_CallMenuColumn.ACTIVE_SONAR` | Bottom (one row) |
| `V_CallMenuColumn.INTERROGATION` | Left (four rows) |

### Call menu conditions

For `when` in `V_Player.AddCallMenuItem`.

| Constant | Shown |
|---|---|
| `V_CallMenuCondition.ALWAYS` | Always |
| `V_CallMenuCondition.HOLDING` | While you hold an enemy (CQC or hold-up) |
| `V_CallMenuCondition.NOT_HOLDING` | While you don't |

### Call menu icons

For `icon` in `V_Player.AddCallMenuItem`. Any logo can go on any column.

| Constant | Logo |
|---|---|
| `V_CallMenuIcon.KNOCK` | Knock |
| `V_CallMenuIcon.INTERROGATION` | Interrogation speech bubble |
| `V_CallMenuIcon.BUDDY` | Diamond Dogs emblem |
| `V_CallMenuIcon.SONAR` | Sonar |

### Radio call signs

For `callSign` in the [Radio call sign](#radio-call-sign) command.
`V_TppCallSign.<name>`:

| Constant | Value |
|---|---:|
| `NONE` | 0 |
| `ZULU_1` / `ZOYA_1` | 1 |
| `ZULU_4` / `ZOYA_4` | 2 |
| `ZULU_7` / `ZOYA_7` | 3 |
| `ZULU_2` / `ZOYA_2` | 4 |
| `ZULU_6` / `ZOYA_6` | 5 |
| `ZULU_10` / `ZOYA_10` | 6 |
| `DELTA_2` / `DMITRY_2` | 7 |
| `DELTA_6` / `DMITRY_6` | 8 |
| `DELTA_9` / `DMITRY_9` | 9 |
| `PATROL` | 10 |
| `DELTA_1` / `DMITRY_1` | 11 |
| `DELTA_3` / `DMITRY_3` | 12 |
| `DELTA_4` / `DMITRY_4` | 13 |

### Receiver motion types

For `receiverType` in
[`SetReceiverMotion`](/V_Framework/Custom_Weapons#custom-gun-motion-setreceivermotion).
`V_ReceiverType.<name>` (names might not be accurate):

```text
AssaultQuickRefire, HandgunQuickRefire, HandgunCockEveryShot,
HandgunReloadOneRound, HandgunLongGunStance, HandgunRefireAfterAnimation,
MachineGunQuickRefire, ShotgunPumpReloadOneRoundPlusOne,
ShotgunPumpReloadFullPlusOne, ShotgunReloadOneRound,
ShotgunPumpReloadOneRound, ShotgunReloadFull, SubMachineGunQuickRefire,
SniperQuickRefire, SniperBoltAction, SniperBoltActionFastCycle,
SniperQuickRefireTacticalReload, GrenadeLauncherRefireAfterAnimation,
GrenadeLauncherQuickRefire, GrenadeLauncherReloadOneRound,
MissileWideReloadAim
```

### Magazine motion types

For `magazineType` in
[`SetMagazine`](/V_Framework/Custom_Weapons#magazine-setmagazine).
`V_MagazineType.<name>` (names might not be accurate):

```text
HandgunNormal, HandgunSpeedLoader, AssaultNormal, AssaultDualMagazine,
MachineGunNormal, ShotgunNormal, SubMachineGunNormal,
SubMachineGunDualMagazine, SniperNormal, GrenadeLauncherNormal
```

### DATABASE tabs

For `tab` in `V_TppMotherBaseManagement.SetDataBaseDisplay`.

| Constant | Value | Screen |
|---|---:|---|
| `V_TppDataBase.TAB_MEDICINAL_PLANTS` | 0 | ENCYCLOPEDIA |
| `V_TppDataBase.TAB_PHOTO` | 1 | DOCUMENTATION |
| `V_TppDataBase.TAB_BLUEPRINT` | 2 | DOCUMENTATION |
| `V_TppDataBase.TAB_ANIMAL` | 4 | ENCYCLOPEDIA |
| `V_TppDataBase.TAB_CODENAMES` | 5 | ENCYCLOPEDIA |
| `V_TppDataBase.TAB_KEY_ITEM` | 7 | DOCUMENTATION |
| `V_TppDataBase.TAB_POSTERS` | 8 | DOCUMENTATION |

---

## Engine limits

Two game object tables are bigger outside FOB; FOB keeps their vanilla
sizes. The [texture](#textures) changes apply in FOB too.

### Notice table

64 entries in 16 groups (vanilla 32 in 8), counted by each pool's
realized size: soldiers + cameras + UAVs + animals (wolves, jackals,
bosses) must stay at or under 64. More crashes; the log shows:

```text
NoticeSensor: mission N: game objects asked for X notice entries ... expect a crash
```

### Command Post members

512 slots (vanilla 360), counted by each pool's total size: soldiers +
cameras + UAVs + enemy helis must stay at or under 512. Soldiers stop at
the limit; cameras, UAVs and helis past it crash on mission unload. Only
4 member groups, one per object type. The log shows:

```text
CommandPost: mission N: X UAVs need command post member slots, only Y of 512 are free ... expect a crash
```

### Textures

8192 textures (8176 usable), vanilla 4880 (4864). Streamed textures past
the 4880 streaming slots load at full resolution and do not stream down.
Needs the built-in `TextureStoragePool` (pool 0 at 448 MiB, vanilla
262.5 MiB); without it the limit stays vanilla. Off: `TexturePools` in
[`disabled_modules.txt`](/V_Framework#installation).

A failed `.pftxs` does not stall later mission starts 30 s; its textures
stay missing and the log counts it. Off: `TexturePackAbort`.

---

# SendCommand

## Sending a command

```lua
GameObject.SendCommand(target, {
  id = "CommandName",
  -- command fields
})
```

Target: a game object ID, type target or Command Post (CP). Global
commands ignore it. Settings last until the mission ends or restarts; a
checkpoint reload keeps them.

### Whole-type targets

`{ type = T }` reaches every object of that type, also ones loaded
later; a later command to one object makes it the exception. `{ type =
T, index = N }` or an ID names one. A wrong-type target is ignored with
one log warning.

| Target | Commands |
|---|---|
| `{ type = "TppSoldier2" }` | [`SetRestrictNotice`](#restrict-notice) (`ignorePlayer`), [`SetIgnoreVehicle`](#ignore-vehicle), [`ShowStaffName`](#staff-name), [`SetVoicePitch`](#voice-pitch), [`SetOpticalCamo`](#optical-camouflage), [`SetHoldupSelfRelease`](#hold-up-self-release) |
| `{ type = "TppVehicle2" }` | [`SetCannotRide`](#cannot-ride) |
| `{ type = "TppCommandPost2" }` | [`SetInvestigationMemberCount`](#investigation), the [phase duration](#phase-durations) commands |
| `{ type = T }`, any game object type (`"TppSoldier2"`, `"TppHostage2"`, ...) | [`SetHeadMarkColor`](#head-mark-colours) |

For `SetHeadMarkColor`, an object's own colour wins; to give one object
the vanilla colour back, [clear](#clearing) the type.

---

## Accepted command value types

Booleans take `true`/`false` or `0`/nonzero. `customLostLabel`,
`customLostLabelTaken`, `deadBodyLabel`, `label`, `reply`, `endLabel`
and `labels` entries take a string or StrCode32.

---

## Life

Soldiers, hostages, animals, vehicles and walker gears.

| Command | Fields | Returns |
|---|---|---|
| `GetLife` | - | `life, maxLife, stamina, maxStamina`. Stamina is `nil` for vehicles and walker gears, all four are `nil` when the target has no life. |
| `SetLife` | `life`, `stamina`, `sleep` | - |

| Field | Required | Purpose |
|---|---|---|
| `life` | No (unchanged) | New life, up to the max. `0` kills. |
| `stamina` | No (unchanged) | New stamina, up to the max. `0` knocks out. |
| `sleep` | No (`false`) | Soldiers only: with `stamina = 0` he falls asleep instead of fainting. |

Needs `life` or `stamina`, else ignored and logged. No effect on the
dead. A soldier left at 500 life or less starts dying. Max: vanilla
`SetMaxLife`.

```lua
local life, maxLife = GameObject.SendCommand(soldierId, { id = "GetLife" })
GameObject.SendCommand(soldierId, { id = "SetLife", life = maxLife / 2 })
```

---

## Reinitialize

Resets a game object to its mission-start state. Objects of a type share
pool slots, so a new set loaded into them inherits the old set's broken
or dead state and marker: send `Reinitialize` to the old ones before
unloading them.

| Command | Fields | Returns |
|---|---|---|
| `Reinitialize` | - | `true` when it was reset, `false` otherwise. |

Target: a game object ID; index `0x1FF` = every object of that type
(those returning `false` skipped).

| Type | Effect |
|---|---|
| `TppSecurityCamera2` | Life back to full, not broken, marker cleared. |
| `TppUav` | Life back to full, alive, marker cleared. A downed UAV then needs `SetEnabled` with `enabled = true`. |
| `TppVehicle2` | Vanilla `Respawn`: spawn point, original type, paint and class, full life, marker cleared. Despawned: `false`. |
| `TppHeli2`, `TppEnemyHeli`, `TppOtherHeli`, `TppOtherHeli2` | Vanilla `Recover`: full life, not broken, marker cleared. Stays put: give it routes again. |
| `TppSoldier2`, `TppHostage2` (and other hostage types) | Living: woken, full life and stamina, marker cleared. Dead, dying, fultoned or carried: `false`. |
| `TppWalkerGear2`, `TppCommonWalkerGear2` | Intact: full life, pending damage dropped, marker cleared. Destroyed: `false`. |
| `TppSahelan2` | Standing: body and all 17 parts to max life, marker cleared; lost parts can stay broken. Down: `false`. |

Other types return `false`, logged once per type. Does nothing in FOB.

```lua
GameObject.SendCommand(cameraId, { id = "Reinitialize" })
```

---

## Animal position

Vanilla `GetPosition` also works on goats, sheep, critter birds, storks,
eagles, rats, zebras, wolves, jackals and bears.

| Command | Fields | Returns |
|---|---|---|
| `GetPosition` | - | `Vector3`, or `nil` when not in the world (disabled, extracted, never spawned). |

Target: the numeric ID, from `GameObject.GetGameObjectIdByIndex(type,
i)` or a message; a locator name is a herd's, not one animal's.

```lua
local goatId = GameObject.GetGameObjectIdByIndex("TppGoat", 0)
local position = GameObject.SendCommand(goatId, { id = "GetPosition" })
```

---

## Animal damage

Vanilla `AddDamage` also works on goats, sheep, wolves, jackals, zebras
and bears (not birds or rats).

| Field | Required | Purpose |
|---|---|---|
| `attackId` | Yes | `TppDamage.ATK_*`. |
| `ownerGameObjectId` | No (nobody) | Who dealt it. |
| `isOneHitKill` | No (`false`) | Kills it outright. |
| `isHeadShot` | No (`false`) | Counts as a head shot. |

Target: as for [Animal position](#animal-position); one not in the world
takes nothing.

```lua
GameObject.SendCommand(goatId, { id = "AddDamage", attackId = TppDamage.ATK_10004, ownerGameObjectId = 0, isOneHitKill = true })
```

---

## Soldiers

### Occasional chats

Target: `{ type = "TppSoldier2" }`. `labels`: up to 255.

| Command | Purpose |
|---|---|
| `SetOccasionalChatList` | Replaces the override list. |
| `InsertToOccasionalChatList` | Adds labels. |
| `RemoveFromOccasionalChatList` | Removes labels. |

```lua
GameObject.SendCommand({ type = "TppSoldier2" }, { id = "SetOccasionalChatList", labels = { "speech_label_1", "speech_label_2" } })
```

### Optical camouflage

`SetOpticalCamo`, for a soldier or [every soldier](#whole-type-targets);
any number can wear it at once.

| Field | Required | Purpose |
|---|---|---|
| `enable` | Yes | `true` on, `false` off. |
| `time` | No (stays on) | With `enable = true`: seconds of play time (pause and loads excluded) until it turns off. A new command replaces the timer. |

```lua
GameObject.SendCommand(soldierId, { id = "SetOpticalCamo", enable = true, time = 60 })
```

### Radio call sign

`SetRadioCallSign`: `callSign`, a [`V_TppCallSign`](#radio-call-signs)
value (Zulu 1, Delta 6, ...).

```lua
GameObject.SendCommand(soldierId, { id = "SetRadioCallSign", callSign = V_TppCallSign.ZULU_1 })
```

### Restrict notice

Vanilla `SetRestrictNotice`, soldiers only, plus `ignorePlayer` (also
for [every soldier](#whole-type-targets)).

| Field | Required | Purpose |
|---|---|---|
| `enabled` | Yes (vanilla) | `true`: he takes no part in his CP's alerts. |
| `ignorePlayer` | No (`false`) | With `enabled = true` only: never spots the player. He still fights soldiers of hostile [factions](#faction). |

```lua
GameObject.SendCommand(soldierId, { id = "SetRestrictNotice", enabled = true, ignorePlayer = true })
```

### Hold-up self-release

`SetHoldupSelfRelease`, for a soldier or [every
soldier](#whole-type-targets) (his own setting wins). Default: the
[Infinite Heaven option](/V_Framework#infinite-heaven-menu).

| Field | Required | Purpose |
|---|---|---|
| `enabled` | Yes | `true` lets held-up soldiers free themselves, `false` = vanilla. |

```lua
GameObject.SendCommand({ type = "TppSoldier2" }, { id = "SetHoldupSelfRelease", enabled = false })
```

### Notice

`AddNotice`: the soldier reacts as if he saw or heard something.

| Field | Required | Purpose |
|---|---|---|
| `kind` | Yes | A [`V_NoticeKind`](#notice-kinds). |
| `targetId` | Per kind | The game object he notices. |
| `pos` | Per kind | A spot he notices, `{x, y, z}`. |
| `range` | No (soldiers' own hearing or sight) | Metres around the spot, every-soldier form only. |

[Notice kinds](#notice-kinds) lists which of `targetId` and `pos` each
kind wants; anything else is refused with a log warning. A soldier busy
with something more important, or unable to react (held up, asleep,
...), ignores it, logged.

`{ type = "TppSoldier2" }` sends it to every soldier within `range` of
`pos` or the target (needs one of them; the target soldier never gets
it). Without `range`: noise kinds (`HEARD_NOISE`, `CALLED_OVER`,
`CALL_FOR_HELP`) use loud-noise hearing (30 m vanilla, varies with
weather); other kinds the dim sight band (45 m day, 35 m night, 50 m
alert, less in a sandstorm).

```lua
GameObject.SendCommand(soldierId, { id = "AddNotice", kind = V_NoticeKind.CALLED_OVER, targetId = otherSoldierId })
GameObject.SendCommand({ type = "TppSoldier2" }, { id = "AddNotice", kind = V_NoticeKind.HEARD_NOISE, pos = { -1820.5, 351.2, -310.0 }, range = 40 })
```

### Radio the CP

`LieToRadio`: the soldier radios his CP, even held up or in CQC. Returns
`true` when queued, `false` (logged) when the target isn't a soldier,
`label` is missing, or he can't radio now. As with vanilla `CallRadio`,
the CP acts on the label (e.g. `CPR0080` stands it down); follow up in
vanilla `RadioEnd`. In combat: [Radio in combat](#radio-in-combat).

| Field | Required | Purpose |
|---|---|---|
| `label` | Yes | A CP radio label from `CpRadioSeqCommon.spch` (or your own speech data). |
| `reply` | No | The CP's answer. |

```lua
GameObject.SendCommand(soldierId, { id = "LieToRadio", label = "CPR0320ENE", reply = "CPR0321CP" })
```

### Grenades

Vanilla `RegistGrenadeId` ([commands](/Commands)) sets what soldiers
throw in combat, custom support weapons included;
[`OnActivateThrowing`](#throwing-messages) fires with the soldier as
`owner`. To one soldier's ID or `{ type = "TppSoldier2", index = N }` it
sets only him (his IDs win over the shared ones); `{ type =
"TppSoldier2" }` sets everyone. Vanilla in FOB.

| Field | Required | Purpose |
|---|---|---|
| `grenadeId` | No (`TppEquip.EQP_SWP_Grenade`) | His grenade. |
| `stunId` | No | His stun item. |

Both `TppEquip.EQP_None` = back to the shared IDs. He throws `stunId`,
else `grenadeId`, else `EQP_SWP_Grenade`; but general combat throws
`grenadeId` at a player in a dumpster or toilet or a spot in the
outpost's intrude zone. Whether he throws is up to his AI.

```lua
GameObject.SendCommand(soldierId, { id = "RegistGrenadeId", grenadeId = TppEquip.EQP_SWP_SmokeGrenade, stunId = TppEquip.EQP_None })
```

`ThrowGrenade` and `ThrowGrenadeInDoor`, to one soldier: he throws once,
then resumes his orders. A hit, knock-out or death interrupts. `equipId`
(both): any throwing item, custom included; default his
`RegistGrenadeId` item, `stunId` first (no combat exception).

| Command | Fields |
|---|---|
| `ThrowGrenade` | `pos` (required, `Vector3` or `{x, y, z}`): where it lands. |
| `ThrowGrenadeInDoor` | `gimmickId` (required, the door's locator name, as for vanilla `Gimmick.CloseDoor`), `dataSetName` (required, its `.fox2` path). Stand him at the door (a route): he opens it and throws 7.5 m into the far room, flat. |

Both return `true` when he throws, else `false` plus a log line: a
soldier within 5 m of the landing spot, he is down, held up, in CQC,
hit, on a heli or already throwing, not a throwing item, or door not
found. Nothing in FOB.

```lua
GameObject.SendCommand(soldierId, { id = "ThrowGrenade", pos = Vector3(x, y, z), equipId = TppEquip.EQP_SWP_SmokeGrenade })
```

### Ignore vehicle

`SetIgnoreVehicle`: the soldier, or [every
soldier](#whole-type-targets), ignores vehicles and won't dodge them.

| Field | Required | Purpose |
|---|---|---|
| `enabled` | No (`true`) | `false` = vanilla. |

```lua
GameObject.SendCommand(soldierId, { id = "SetIgnoreVehicle", enabled = true })
```

### Faction

`SetFaction`: soldiers and enemy helis of different factions fight.
Target: a soldier, `{ type = "TppSoldier2", index = N }`, or an enemy
heli (`TppEnemyHeli`, `TppOtherHeli`, `TppOtherHeli2`); no-`index` type
targets and the support heli are refused.

| Field | Required | Purpose |
|---|---|---|
| `name` | Yes | Any string; `""` removes the faction. Missing or non-string: ignored, log warning. |

```lua
GameObject.SendCommand(soldierId, { id = "SetFaction", name = "XOF" })
GameObject.SendCommand({ type = "TppEnemyHeli", index = 0 }, { id = "SetFaction", name = "XOF" })
```

  - An enemy vehicle or walker gear takes the faction of a faction
    soldier riding it: hostile bullets hit it and the crew fights back
    (not tank or APC crews).
  - Hostile soldiers shoot a faction heli within about 50 m horizontally
    until it is destroyed, gone or past 150 m, and man up to 4 free
    anti-air guns. One hit doesn't destroy it; its own faction can't
    hurt it.
  - A faction heli picks its own visible targets (hostile soldiers, also
    mounted, hostile faction helis, the player) and fires only with a
    clear line of sight, never at its own faction.

### Voice pitch

`SetVoicePitch`: `pitch` in cents. Target: a soldier, [every
soldier](#whole-type-targets), or a CP ID (its radio voice).

```lua
GameObject.SendCommand(soldierId, { id = "SetVoicePitch", pitch = 300 })
```

### VIP soldiers

Vanilla `SetVip` and `SetVipSpecial` ([commands](/Commands)) give VIP
reactions and body-found lines; every mission target gets `SetVip`.

### Body-found line

`SetDeadBodyLabel`: the line radioed when this soldier's body is found
(on foot or from a vehicle). Any soldier; wins over the [VIP
lines](#vip-soldiers).

| Field | Required | Purpose |
|---|---|---|
| `deadBodyLabel` | No (the normal line) | The speech label. |

```lua
GameObject.SendCommand(soldierId, { id = "SetDeadBodyLabel", deadBodyLabel = "V_CPR0042_KEEP" })
```

### Staff name

`ShowStaffName`: his head-mark shows a name instead of the distance (his
staff name is unchanged). One soldier or [every
soldier](#whole-type-targets); at most 30 at once.

| Field | Required | Purpose |
|---|---|---|
| `enable` | Yes | `false` shows the distance again. |
| `showOnNeutralized` | No (`false`) | Keep it while asleep, fainted or dying. |
| `langId` | No (his name) | Show this lang text instead. |

```lua
GameObject.SendCommand(soldierId, { id = "ShowStaffName", enable = true, langId = "ene_commander" })
```

### Interrogation voice

Vanilla `AssignInterrogationWithVoice`, plus an optional
`soundDialogueEvent` that replaces the interrogation voice (per CP).

| Field | Required | Purpose |
|---|---|---|
| `soundParameterId` | Yes (vanilla) | Voice entry in `mvars.uniqueInterTable.unique`. |
| `index` | Yes (vanilla) | Voice index: `0`, or table position `+ 64`. |
| `soundDialogueEvent` | No (`DD_vox_ene`) | Wwise event name or FNV1-32 hash. |
| `soundDialogueEventMarker` | No (vanilla) | Same, for answers that mark a spot on the map. |

```lua
GameObject.SendCommand(cpId, { id = "AssignInterrogationWithVoice", soundParameterId = soundParameterId, index = index, soundDialogueEvent = "your_wwise_event" })
```

### Off-screen look changes

Vanilla `ChangeFova` and `SetWearEquip` ([commands](/Commands)) take
`applyOffScreen`. Target one soldier or `{ type = "TppSoldier2" }`.

| Field | Required | Purpose |
|---|---|---|
| `applyOffScreen` | No (`false`) | `true` delays the new look until he is off screen or 50 m or more from the camera (the game's NVG [rule](#data-utility)), however long that takes. |

A later command without it applies at once and drops the wait.
`SetWearEquip`'s gameplay effect (helmet, NVG sight) is immediate; only
the look waits. Waits drop at mission start and checkpoint reload.
Ignored in FOB.

```lua
GameObject.SendCommand(soldierId, { id = "ChangeFova", bodyId = bodyId, faceId = faceId, balaclavaFaceId = balaclavaId, applyOffScreen = true })
GameObject.SendCommand(soldierId, { id = "SetWearEquip", flag = WearEquip.NVG, applyOffScreen = true })
```

### Helicopter riders

Ported from Ground Zeroes' `TppEnemyUtility`. Target: a soldier ID or `{
type = "TppSoldier2", index = N }`. `heli` and `target` take a
[name](#helicopters) or `gameObjectId`.

| Command | Purpose |
|---|---|
| `RequestToGetOnHelicopterAndAimTarget` | He boards a heli and crouch-aims out of its door. |
| `RequestToGetOffHelicopter` | He gets out and returns to his AI. No fields; only for riders seated with the command above. |
| `RequestToFireOnHelicopter` | Any armed soldier (on a door, on foot, in a vehicle) fires one sure shot near a target. |
| `SetFlagDisableBulletDamageReactionInHelicopter` | `flag` (required): `true` = a rider doesn't flinch when hit. |

`RequestToGetOnHelicopterAndAimTarget`:

| Field | Required | Purpose |
|---|---|---|
| `heli` | Yes | Support heli or enemy heli. |
| `side` | No (a free door, the nearer if both) | `"LEFT"` or `"RIGHT"`. |
| `target` | No | He keeps his gun and bursts on it. |

No door point on that side: centre seat. His AI can't pull him out. One
rider per door: a taken door, or no `side` with both taken, is refused;
so is a soldier already controlled by something else or still getting
off. Refusals are logged.

Riders fire bursts while their AI wants to or their base is on alert,
use ammo and reload seated (under a quarter of the magazine, a launcher
after every rocket; a hit cancels it). Their rockets and grenades don't
hit their own heli.

  - Non-lethal lethal-ammo hit or small blast: flinch, keeps riding.
  - Asleep: lies at the door, wakes and aims again. Killed: stays in.
  - Fainted, dying, or blown off his feet: falls out.
  - Heli destroyed: riders go limp, and fall when the wreck is gone.
  - A fall of 8 m or more kills him; the kill goes to whoever hit him
    last.

`RequestToFireOnHelicopter`:

| Field | Required | Purpose |
|---|---|---|
| `heli` | Yes | A heli in this mission. |
| `target` | Yes | What he shoots near. |
| `angle` | No (`0`) | Degrees round the line of fire; `0` is above the target. |
| `radius` | No (`0`) | Metres from the target; `0` is straight at it. |

Fires on his next update without turning and always lands at the aimed
point; uses a round (a launcher its rocket). With an empty magazine or
mid-reload the shot waits up to 1 s, then is dropped; a shot faster than
his fire rate is skipped. Nothing if he is down, unarmed or not loaded.
Failures are logged.

```lua
GameObject.SendCommand(soldierId, { id = "RequestToGetOnHelicopterAndAimTarget", heli = "EnemyHeli", target = "Player", side = "LEFT" })
GameObject.SendCommand(soldierId, { id = "RequestToFireOnHelicopter", heli = "EnemyHeli", target = "Player", angle = 30, radius = 2 })
```

---

## Command Posts

### Phase durations

| Command | Fields | Returns |
|---|---|---|
| `SetCautionPhaseDuration`, `SetEvasionPhaseDuration`, `SetAlertPhaseDuration` | `duration` | - |
| `GetCautionPhaseDuration`, `GetEvasionPhaseDuration`, `GetAlertPhaseDuration` | - | seconds (the game's own length when not set; `-1` for an every-CP target when the CPs' own lengths differ) |
| `UnsetCautionPhaseDuration`, `UnsetEvasionPhaseDuration`, `UnsetAlertPhaseDuration` | - | - |
| `GetCautionPhaseRemaining`, `GetEvasionPhaseRemaining`, `GetAlertPhaseRemaining` | - | seconds, or `-1` when that CP is not in that phase. One CP only (`-1` for every-CP targets). |

| Field | Required | Purpose |
|---|---|---|
| `duration` | Yes | Seconds. `0` or less counts as `1`. |

Target: a CP ID or `{ type = "TppCommandPost2", index = n }`, or `{ type
= "TppCommandPost2" }` for every CP (a one-CP setting wins). Evasion:
search time before the SITREP call and the drop to caution. Alert: time
after the CP loses sight of Snake. The game still speeds or slows these
timers, so `Get...Remaining` is an estimate. No effect in FOB.

```lua
GameObject.SendCommand(GameObject.GetGameObjectId("afgh_enemyBase_cp"), { id = "SetCautionPhaseDuration", duration = 99 })
```

### Friendly fire

Soldiers damage each other. Off by default.

> **Global, not per CP.**
{:.important}

| Command | Field | Returns |
|---|---|---|
| `SetFriendlyFire` | `enable` | - |
| `IsFriendlyFire` | - | `1` or `0` |

```lua
GameObject.SendCommand({ type = "TppCommandPost2" }, { id = "SetFriendlyFire", enable = true })
```

### Investigation

`RequestInvestigation`: the CP sends soldiers to search a spot, as in
Caution, then they radio the end report and return. Target one CP: its
ID or `{ type = "TppCommandPost2", index = N }`. Returns the IDs sent;
empty = nobody went.

| Field | Required | Purpose |
|---|---|---|
| `pos` | Yes | `Vector3` or `{x, y, z}`. The CP pulls it into its own area. |
| `memberCount` | No (the CP's `SetInvestigationMemberCount` value, else `4`) | Any number; the nearest free soldiers go, in squads of up to four. |
| `soldiers` | No | Soldier IDs to send instead; only free soldiers of that CP. |
| `endLabel` | No | Replaces the end report label. |
| `silent` | No (`false`) | `true` = no end report voice (the radio pose still plays). |
| `noCaution` | No (Sneak goes to Caution) | `true` = the CP stays in its phase. |
| `takeOver` | No (`true`) | One search per CP. `true`: replaces the running one. `false`: refused while one runs. |

`SetInvestigationMemberCount`: `memberCount` (required; `0` = back to
`4`) for that CP or [every CP](#whole-type-targets). The end sends
[`InvestigationEnd`](#gameobject-messages) with the reason.

```lua
local ids = GameObject.SendCommand(cpId, { id = "RequestInvestigation", pos = Vector3(x, y, z) })
```

### Radio in combat

`AssignRadioInCombat`: a soldier does the radio pose and calls the CP
with the label, also in combat (where vanilla `CallRadio` is ignored by
a soldier who has spotted Snake); the CP reacts as to that label. Heard
under the combat music, whatever the label. As in vanilla, no call while
Snake is outside the base's radio range, and no repeat of a label the
base just played.

| Field | Required | Purpose |
|---|---|---|
| `label` | Yes | Any CP radio label. |
| `noPose` | No (`false`) | `true` = he only talks. |

To a CP: it picks its radio man as for its own calls (the second-nearest
awake soldier at least 25 m from Snake, 15 m at some posts). To a
soldier: he takes it. Returns `true` when queued, `false` when the CP's
radio is taken (another radio man, a Lua call, the alert call) or the
soldier is down or held up.

```lua
GameObject.SendCommand(cpId, { id = "AssignRadioInCombat", label = "CPR0153" })
```

---

## Hostages

### Lost hostages

| Command | Fields | Purpose |
|---|---|---|
| `SetLostHostage` | `hostageType`, optional `customLostLabel`, `customLostLabelTaken` | Registers a lost hostage. |
| `RemoveLostHostage` | - | Removes him for the mission (not re-added automatically); `SetLostHostage` adds him back. |
| `GetHostageGender` | - | Returns his `hostageType`, or `nil` if unreadable. |

`hostageType`: `0` male, `1` female, `2` child.

| You register | Reported as escaped | Reported as taken |
|---|---|---|
| both labels | `customLostLabel` | `customLostLabelTaken` |
| only `customLostLabel` | that label | that same label |
| only `customLostLabelTaken` | default line for the `hostageType` | `customLostLabelTaken` |
| neither | default line for the `hostageType` | default line for the `hostageType` |

### Struggle

`SetForceStruggle`: the hostage struggles against the restraints until
stopped. Adult `TppHostage2` only.

| Field | Required | Purpose |
|---|---|---|
| `struggle` | Yes | `true` starts, `false` stops. |
| `ever` | No (`false`) | Keep struggling after being carried or hurt. |

```lua
GameObject.SendCommand(hostageId, { id = "SetForceStruggle", struggle = true, ever = true })
```

---

## Head-mark colours

`SetHeadMarkColor` (`state`, `color`, `color2`, ..., `speed`, `blend`,
`fade`) colours a head-mark per marker state; with `color2` and up the
colours cycle. Any locator with a `HeadMark`, or [every object of a
type](#whole-type-targets).

| `state` | Vanilla colour |
|---|---|
| `"neutral"` | `cmn-col-marker-neutral` |
| `"enemy"` | `cmn-col-marker-enemy` |
| `"friendly"` / `"friend"` | `cmn-col-marker-friend` |
| `"powerless"` | `cmn-col-marker-powerless` |
| `"dying"` | none - V Framework adds this state |

### Colour values

Any number of stops, `color`, `color2`, ... (or `colour`, ...), in
number order; gaps are fine. Each takes:

| Form | Example |
|---|---|
| Palette name | `"cmn-col-marker-friend"` |
| RGB table, `0-1`, or `0-255` when any of `r`, `g`, `b` is above 1 | `{ r = 255, g = 0, b = 0 }` |

### Animation

| Field | Required | Purpose |
|---|---|---|
| `speed` | No (`1.0`) | Cycles per second. |
| `blend` | No (`true`) | Fade between colours; `false` switches. |

```lua
-- red -> orange -> white pulse, one full cycle every two seconds
GameObject.SendCommand(soldierId, {
  id     = "SetHeadMarkColor",
  state  = "dying",
  color  = { r = 255, g = 0,   b = 0 },
  color2 = { r = 255, g = 128, b = 0 },
  color3 = { r = 255, g = 255, b = 255 },
  speed  = 0.5,
})
```

### Fading between states

| Field | Required | Purpose |
|---|---|---|
| `fade` | No (`0`, instant) | Seconds to fade into this state's colour. |

### Clearing

```lua
-- clear one state
GameObject.SendCommand(soldierId, { id = "SetHeadMarkColor", state = "dying" })

-- clear every state for this gameObjectId
GameObject.SendCommand(soldierId, { id = "SetHeadMarkColor" })

-- clear every state of the type's colour; each object's own colour stays
GameObject.SendCommand({ type = "TppSoldier2" }, { id = "SetHeadMarkColor" })
```

---

## Helicopters

Ported from Ground Zeroes' `TppSupportHelicopterService`. Every heli
type, enemy helis included, except
[`SetActionCommandFireToTarget`](#fire-at-a-target) and
[`SetPlayerMachineGunEnabled`](#door-machine-gun) (support heli,
`TppHeli2`, only). Target: a heli `gameObjectId`, or a type target with
`index`. Settings are per heli; only the support heli has the cockpit
alarm and cabin lights.

Name fields take a locator name (soldiers, hostages, helis, vehicles,
walker gears) or `gameObjectId`; an unknown name is logged. Riders:
[Helicopter riders](#helicopter-riders). Life:
[`NotifyLifeRate`](#gameobject-messages).

```lua
GameObject.SendCommand({ type = "TppEnemyHeli", index = 0 }, { id = "OpenLeftDoor" })
```

### Searchlight

| Command | Purpose |
|---|---|
| `StartSearchLightAutoAimToCharacter` | `name` (required): the beam follows that character. An unreadable position is logged once. |
| `StopSearchLightAutoAim` | Back to the `SetSearchLightAngle` angle, or the normal aim. No fields. |
| `SetSearchLightAngle` | A fixed direction, used while no auto-aim target is set. |

`SetSearchLightAngle`, relative to the light's rest direction; neither
field = normal aim:

| Field | Required | Purpose |
|---|---|---|
| `yaw` | No (`0`) | Degrees left/right. |
| `pitch` | No (`0`) | Degrees; positive points down. |

> None of these switches the light on: use vanilla `{ id =
> "SetSearchLightForcedType", type = "On" }`.
{:.note}

```lua
GameObject.SendCommand(heliId, { id = "SetSearchLightForcedType", type = "On" })
GameObject.SendCommand(heliId, { id = "StartSearchLightAutoAimToCharacter", name = "sol_0010" })
GameObject.SendCommand(heliId, { id = "SetSearchLightAngle", yaw = 25, pitch = 35 })
```

### Flight speed

`ChangeTargetSpeed`. The next route node with its own speed replaces it.

| Field | Required | Purpose |
|---|---|---|
| `targetSpeed` | Yes | Flight speed along its route, km/h. |
| `changeTime` | No (`0`) | Seconds to reach it. |

```lua
GameObject.SendCommand(heliId, { id = "ChangeTargetSpeed", targetSpeed = 30 })
```

### Doors

`OpenLeftDoor`, `CloseLeftDoor`, `OpenRightDoor`, `CloseRightDoor`, no
fields: the door is held until the opposite command or `ResetDoors`
(back to the heli's own door logic).

### Damage effects

`DisableDamageEffects` stops a damaged heli's smoke and cockpit alarm;
`EnableDamageEffects` restores them. No fields. Wreck smoke stays.

### Cabin light

`SetRoomLightMode`, support heli. A wrong `mode` is logged.

| Field | Required | Purpose |
|---|---|---|
| `mode` | Yes | `1` = cabin light and both effects on; `2` = all off; `0` = as before the first `SetRoomLightMode`. |

### Fire at a target

`SetActionCommandFireToTarget`, support heli: fires the fitted sub
weapon, vanilla or [custom](#pequod-weapons), once, with the pilot's
attack line. Nothing without rockets or missiles or with `0` ammo.

| Field | Required | Purpose |
|---|---|---|
| `targetId` | One of these two | A game object; a `"Rocket"` weapon aims at its current position. |
| `position` | One of these two | A `Vector3`. |

```lua
GameObject.SendCommand(heliId, { id = "SetActionCommandFireToTarget", targetId = gameId })
```

### Door machine gun

`SetPlayerMachineGunEnabled`. Nothing in FOB.

| Field | Required | Purpose |
|---|---|---|
| `enabled` | Yes | `false` removes the side door minigun prompt on this heli and dismounts a player on it; other door prompts stay. |

### Pilot radio lines

`SetEnablePilotAiVoice`. [`V_Helicopter.PilotCallVoice`](#helicopter)
lines play either way.

| Field | Required | Purpose |
|---|---|---|
| `enabled` | Yes | `false` stops the pilot's automatic lines (approach, landing, combat, damage). |

---

## Vehicles

### Cannot ride

`SetCannotRide`, from Ground Zeroes' `TppVehicleUtility`, made two-way.
Target: a vehicle `gameObjectId`, `{ type = "TppVehicle2", index = N }`,
or [every vehicle](#whole-type-targets). Removes the player's "get in"
prompt only; a player inside, soldiers and scripted rides are
unaffected.

| Field | Required | Purpose |
|---|---|---|
| `enabled` | No (`true`) | `false` = allowed again. |

> Walker gears: vanilla `NoRideOn`.
{:.note}

```lua
GameObject.SendCommand(vehicleId, { id = "SetCannotRide", enabled = false })
```

### Armed jeep

Vanilla `Spawn` and `Respawn` vehicle commands ([commands](/Commands))
take a `subType` that arms the jeep; both names (value `1`) are added to
`Vehicle.subType`. Up to 4 at once. Not in FOB.

| Field | Required | Purpose |
|---|---|---|
| `subType` | No (vanilla jeep) | `Vehicle.subType.EASTERN_LIGHT_VEHICLE_MACHINE_GUN` (DShK, Afghanistan only) or `Vehicle.subType.WESTERN_LIGHT_VEHICLE_MACHINE_GUN` (M2, Africa only). Elsewhere: a plain jeep. |

  - Seats 5: driver, roof gunner (the first soldier after the driver), 3
    passengers. Hostages take passenger seats only.
  - Vanilla `SetRelativeVehicle` takes up to 5; the gunner needs no
    `isMust`.
  - `GetRiderId` omits the gunner.

```lua
GameObject.SendCommand({ type = "TppVehicle2" }, { id = "Respawn", name = "veh_lv_0000", type = Vehicle.type.WESTERN_LIGHT_VEHICLE, subType = Vehicle.subType.WESTERN_LIGHT_VEHICLE_MACHINE_GUN })
```

---

## UAVs

The EMP of vanilla
[`SetDevelopLevel`](/Commands#commands-by-gameobject-type) also works
outside FOB.

| Field | Required | Purpose |
|---|---|---|
| `developLevel` | No (`TppUav.DEVELOP_LEVEL_LMG_0`) | A `TppUav.DEVELOP_LEVEL_*`. |
| `empLevel` | No (`0`, off) | `1`, `2`, `3`: within 50, 75, 100 m of the nearest such UAV. |

In range it empties the NVG, stealth camo, Stun Arm, Hand of Jehuty,
rocket arm and custom [battery](#item-batteries) items and switches them
off; a player carrying none is unaffected. Reported by [`UavEmpStart`
and `UavEmpEnd`](#player-messages), except in FOB. A UAV whose `.frt`
route was unloaded has no route until given a loaded one.

```lua
GameObject.SendCommand(uavId, { id = "SetDevelopLevel", developLevel = TppUav.DEVELOP_LEVEL_LMG_0, empLevel = 2 })
```

---

## Sahelanthropus

Target: `{ type = "TppSahelan2", group = 0, index = 0 }`.

| Command | Fields | Purpose |
|---|---|---|
| `SetSahelanPhase` | `phase` | Forces an AI phase. |
| `GetSahelanPhase` | - | Returns the current phase. |
| `SetSahelanFova` | `fv2` | A custom `.fv2` look. |
| `SetEyeLampColor` | `color`, optional `phase` | Eye-lamp colour. |
| `SetEyeLampDisco` | `enabled`, `speed` (hue cycles per second), optional `a` (alpha) | Eye colour cycling. |
| `SetHeartLightColor` | `color`, optional `phase` | Heart-light colour. |
| `SetHeartLightDisco` | as `SetEyeLampDisco` | Heart colour cycling. |

`color`: the RGB table of [Colour values](#colour-values) plus `a`, same
scale. `phase = -1` = every phase.

```lua
GameObject.SendCommand(sahelanId, {
  id = "SetEyeLampColor",
  phase = -1,
  color = { r = 255, g = 0, b = 0, a = 255 },
})
```

---

# Messages

Each heading is the message class for `Messages()` ([guide](/Messages)).
They reach handlers at the end of the game's current Lua call, same
frame.

## GameObject messages

| Message | Parameters | Fires when |
|---|---|---|
| `AntiAir` | `cpId, isEnable` | A CP notices the support helicopter. |
| `HoldupCancelLookToPlayer` | `gameObjectId` | The player aims at a soldier about to cancel a hold-up. |
| `NoticeNoise` | `soldierId, noiseType, noiseMakerId, position` | A soldier hears a noise. `noiseType`: the [`V_NoiseSystem.AddNoise`](#noise-fields) number; it and `noiseMakerId` are `nil` when unknown. `position`: `Vector3`. |
| `NoticeIndis` | `soldierId, targetId, position` | A soldier half-spots something (the "?"). `targetId` `nil` when unknown; `position`: `Vector3`. |
| `DamageGimmick` | `gimmickId, locatorNameS32, dataSetPath32, attackerId` | A gimmick takes damage. |
| `AnimalNotice` | `gameObjectId, noticeKind` | A herbivore, wolf or bear notices something. |
| `RequestedHeliTaxi` | `heliId, currentLzHash, destinationLzHash` | A Taxi destination is requested. |
| `NotifyLifeRate` | `heliId, lifeRate` | A helicopter's life drops past a tenth, or it dies. |
| `InvestigationEnd` | `commandPostId, reason, memberCount` | A CP's [`RequestInvestigation`](#investigation) search ends. |
| `ClipEvent` | `eventName, clip, gameObjectId` | An [`AddClipEvent`](#motion) event fires on Snake's or his gun's clip; `eventName` and `clip` as passed. |

```lua
{ msg = "NoticeNoise", func = function(soldierId, noiseType, noiseMakerId, position)
    GameObject.SendCommand(soldierId, { id = "ThrowGrenade", pos = position })
end },
```

`DamageGimmick` has vanilla `BreakGimmick`'s arguments (`gimmickId`:
`GameObject.GetTypeIndex` gives its type; `locatorNameS32`: its locator
name as `Fox.StrCode32`; `dataSetPath32`: `.fox2` path hash, low 32
bits; `attackerId`: who hit it, or the driver or pilot for a vehicle or
walker gear). Fires only when the hit costs life or breaks it, before
`BreakGimmick`. Gimmicks: doors, gatling and machine guns, mortars,
searchlights, watch towers, IR sensors, antennas, other breakable
equipment (AA radars, generators, comms gear, ...), event animation
objects, bridges, water towers, toilets, radios.

`AnimalNotice`'s `noticeKind`:

| Value | Kind | Meaning |
|---|---|---|
| `0` | `NearThreat` | Herbivore: something came too close. |
| `1` | `NoiseAlert` | Herbivore: startled by a noise. |
| `2` | `NearGameObject` | Wolf or bear: sighted a creature, player, or vehicle. |
| `3` | `Noise` | Wolf or bear: heard a noise. |

`NotifyLifeRate`: support heli (`TppHeli2`) and enemy helis, after
damage, at each tenth crossed (below 100%, 90%, ...) and always at 0 on
death. `lifeRate`: life / max life, `0` to `1`. Not sent for life set
from Lua.

`InvestigationEnd`'s `reason` is a str32:

| Value | Meaning |
|---|---|
| `Done` | The search finished normally. |
| `TakenOut` | All of the team are down. |
| `Reassigned` | The game gave them other jobs. |
| `Replaced` | A new request took over. |
| `TimeUp` | 4 minutes elapsed. |
| `Refused` | Nobody could go. |

---

## Player messages

| Message | Parameters | Fires when |
|---|---|---|
| `OnPlayerLockPickStart` | `playerIndex, gimmickId, doorSide` | Lock picking starts. |
| `OnPlayerLockPickEnd` | `playerIndex, gimmickId, doorSide` | Lock picking finishes. |
| `OffBinocularsMode` | - | Binocular mode ends. |
| `CrawlSideRoll` | `playerIndex, rollPhase, rollCount, direction` | The player performs a side roll. |
| `BarrierDamage` | `playerIndex, before, after` | The Energy Wall barrier takes damage. |
| `OnPickUpCollection` | `playerIndex, uid, type, nameLangId` | The player picks up a custom collectible. |
| `FinishHeadMotion` | `playerIndex, clipName` | A head-option motion finishes. |
| `partsTypeChange` | `playerType, partsType, selector` | The player's outfit changes. |
| `ItemBatteryEmpty` | `equipId` | A custom item's [battery](#item-batteries) runs empty and the item switches off. |
| `ItemUse` | `equipId, fromWheel` | The item Use button is pressed, any item (vanilla items still act). `fromWheel`: `1` from the open item wheel, `0` for the selected item. Not for a counted item with none left. |
| `ItemCountEmpty` | `equipId` | A [counted item](#item-counts)'s last use, after its `ItemUse`. Not for `consumeOnUse = false`, or `V_Player.SetItemCount` to `0`. |
| `SkillStart` | `skill` | A [`V_PlayerSkill`](#player-skills) effect starts, also from the game's own item. |
| `SkillEnd` | `skill` | It ends, same rule. |
| `UavEmpStart` | `uavId, empLevel` | A [UAV's EMP](#uavs) starts hitting the player, or a different UAV takes over. |
| `UavEmpEnd` | `uavId` | It stops (out of range, UAV destroyed, no battery device), or for the old UAV just before a takeover's `UavEmpStart`. |
| `ItemSelected` | `item, heldSoldierId` | A call menu option is picked. `item`: a `V_CallMenuItem`, the option's `message`, or its ID. `heldSoldierId`: `GameObject.NULL_ID` when holding no one. |
| `OnChargeStart` | `equipId` | The player starts a [charge shot](/V_Framework/Custom_Weapons#charge-shot-setchargeshot). |
| `OnChargeLevel` | `equipId, level` | The charge reaches a new level. |
| `OnChargeShot` | `equipId, level` | The charged shot is fired. |
| `OnChargeCancel` | `equipId` | The charge is cancelled. |

---

## Throwing messages

| Message | Parameters | Fires when |
|---|---|---|
| `OnThrow` | `handle, equipId, owner` | An item is thrown. |
| `OnActivateThrowing` | `handle, equipId, owner` | A thrown item goes off. |
| `OnRemoveThrowing` | `handle, equipId, owner` | A thrown item is gone. |
| `OnBounceThrowing` | `handle, equipId, owner` | A thrown item hits a surface while moving. |
| `OnStopThrowing` | `handle, equipId, owner` | A thrown item comes to rest. |
| `OnHitThrowing` | `handle, equipId, owner, hitId` | Any thrown item, vanilla included, hits a game object `hitId`. Not again for the object it hit last; the thrower only after one bounce. |

`handle`: for the [Throwing](#throwing) functions. `equipId`: a custom
item's own ID, not its `throwAs` stand-in.

---

## Placed messages

| Message | Parameters | Fires when |
|---|---|---|
| `OnPlaceCustom` | `handle, equipId, owner` | A custom placed item ([`placeAs`](/V_Framework/Custom_Weapons#placed-items-placeas)) settles on the ground. Once per item. |
| `OnActivateCustom` | `handle, equipId, owner` | It goes off, with the game's `OnActivatePlaced`; then it is removed. |

A decoy `placeAs` sends neither. `handle`: for the [Placed
items](#placed-items) functions.

---

## Mission messages

| Message | Parameters | Fires when |
|---|---|---|
| `MissionStateReset` | `missionCode` | A mission ends, before the next mission's `OnAllocate`. |

---

## Dispatch messages

| Message | Parameters | Fires when |
|---|---|---|
| `OnRewardReceived` | `missionKey, rewardName, count` | A custom [`rewards`](#reward-fields) line is received in Mother Base > Rewards. |

---

## Radio messages

| Message | Parameters | Fires when |
|---|---|---|
| `HeliStart` | `label1, label2, voiceType` | Pequod begins a voice or radio line. |
| `HeliFinish` | `label1, label2, voiceType` | Pequod finishes the line, or a newer line cuts it off. |

---

## UI messages

| Message | Parameters | Fires when |
|---|---|---|
| `TimeCigaretteUi` | `playerIndex, isShown` | The [Time Cigarette](#time-cigarette) overlay is shown (`1`) or hidden (`0`). |
| `StartWalkMan` | `trackId, isStartByUser` | A tape starts or resumes. |
| `StopWalkMan` | `trackId, isStopByUser` | Playback stops. |
| `PauseWalkMan` | `trackId, isPauseByUser` | Playback pauses. |
| `SpeakerWalkMan` | `trackId, isEnable, isOnByUser` | Speaker mode toggles; `isEnable` = the new mode. |
| `IDroidMenuItemSelected` | `itemId` | One of your [iDroid menu items](/V_Framework/UI#idroid-menu-and-pages) is pressed. |

`trackId` is the `GetTapeTrackId` value. `is*ByUser` is `1` from the
walkman UI, `0` from a `V_CassetteCommand` call.

---

## Subtitles messages

| Message | Parameters | Fires when |
|---|---|---|
| `SubtitlesEventMessage` | `message` | A `.subp` subtitle uses `[m=myMessage]`; `message` is the name's `StrCode32`. |

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework UI](/V_Framework/UI)
  - [V Framework Custom Weapons](/V_Framework/Custom_Weapons)
  - [V Framework Custom Outfits](/V_Framework/Custom_Outfits)
  - [V Framework Buddy Outfits](/V_Framework/Buddy_Outfits)
  - [Route Events](/V_Framework/Route_Events)
