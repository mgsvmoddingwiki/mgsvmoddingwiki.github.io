---
title: V Framework Lua API
permalink: /V_Framework_Lua_API/
tags: [Lua, Reference, Infinite Heaven, V Framework]
---

## About this reference

V Framework's libraries are global Lua tables, usable from any
lua file or [Infinite Heaven](/Infinite_Heaven) module.

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
| `V_TppEquip` | [Equipment](#equipment) |
| `V_ThrowingSystem`, `V_ThrowingImpl`, `V_RangeAttackSystem`, `V_BlastSystem`, `V_NoiseSystem` | [Throwing](#throwing) |
| `V_TppMotherBaseManagement` | [Mother Base Management](#mother-base-management) |
| `V_TppSoldierFace` | [Soldier faces](#soldier-faces) |
| `V_TppSoundDaemon` | [Sound](#sound) |
| `V_CassetteCommand` | [Cassette](#cassette) |
| `V_TppUiCommand` | [UI](#ui) |
| `V_UixUtility` | [V Framework UI](/V_Framework_UI) |
| `V_Helicopter` | [Helicopter](#helicopter) |
| `V_title_sequence` | [Title sequence](#title-sequence) |
| `V_TppGameObject` | [Game Over types](#game-over-types) |
| `V_TppMbDev` | [Outfit Develop groups](#outfit-develop-groups) |
| `V_PlayerCqcStance` | [Player stances](#player-stances) |
| `V_NoticeKind` | [Notice kinds](#notice-kinds) |
| `V_CallMenuItem` | [Call menu items](#call-menu-items) |
| `V_CallMenuColumn` | [Call menu columns](#call-menu-columns) |
| `V_CallMenuCondition` | [Call menu conditions](#call-menu-conditions) |
| `V_CallMenuIcon` | [Call menu icons](#call-menu-icons) |
| `V_TppDataBase` | [DATABASE tabs](#database-tabs) |
| `V_TppCallSign` | [Radio call signs](#radio-call-signs) |
| `V_ReceiverType` | [Receiver motion types](#receiver-motion-types) |
| `V_MagazineType` | [Magazine motion types](#magazine-motion-types) |
| `V_DogCommandType` | [D-Dog gear](/V_Framework_Buddy_Outfits#d-dog-gear) |

---

# Lua libraries

## Core

| Function | Description |
|---|---|
| `V_FrameWork.Log(msg)` | Writes to the V Framework log and visible console. |
| `V_FrameWork.SetFrameCallback(name, fn)` | Calls `fn(seconds)` every frame, loading screens included. `seconds` = real time since launch. Same `name` replaces; `nil` removes. Returns `true` when stored. |
| `V_Fox.FNVHash32(name)` | Returns the FNVHash32 of a Wwise event name. |
| `V_Fox.ShowConsole(enabled)` | Shows or hides the log console. |
| `V_Fox.SwapGani(fromGani, toGani)` | Every character plays `toGani` instead of `fromGani`. `toGani` must be in the character's loaded motion archives. Cleared at mission end; set it in mission init. |
| `V_Fox.RestoreGani(fromGani, toGani)` | Undoes that swap. `toGani` is optional. |

Keep the callback light. A Lua error in it is logged once per message and the callback keeps running. Register it again in `Init` (same `name`) so a reloaded module replaces it.

```lua
V_FrameWork.SetFrameCallback("MyMod", function(seconds)
  local tips = V_TppUiCommand.GetLoadingTipsInfo()
  -- runs on the loading screen too
end)
```

```lua
-- PW-style fulton animation
V_Fox.SwapGani("/Assets/tpp/motion/SI_game/fani/bodies/enet/enetnon/enetnon_ful_st_f", "/Assets/tpp/motion/SI_game/fani/bodies/enem/enemasr/enemasr_snak_fulton_q_st_f")
V_Fox.SwapGani("/Assets/tpp/motion/SI_game/fani/bodies/enet/enetnon/enetnon_ful_st_b", "/Assets/tpp/motion/SI_game/fani/bodies/enem/enemasr/enemasr_snak_fulton_q_st_b")
V_Fox.SwapGani("/Assets/tpp/motion/SI_game/fani/bodies/enet/enetnon/enetnon_ful_idl", "/Assets/tpp/motion/SI_game/fani/bodies/enem/enemasr/enemasr_snak_fulton_idl_lp")
V_Fox.SwapGani("/Assets/tpp/motion/SI_game/fani/bodies/enet/enetnon/enetnon_ful_ed", "/Assets/tpp/motion/SI_game/fani/bodies/enem/enemasr/enemasr_snak_fulton_ed")
V_Fox.SwapGani("/Assets/tpp/motion/SI_game/fani/bodies/snap/snaputh/snaputh_q_seat_idl_lp", "/Assets/tpp/motion/SI_game/fani/bodies/snap/snaputh/snaputh_q_idroid_ed")
```

---

## Motion

| Function | Returns | Description |
|---|---|---|
| `V_TppMotion.AddClipEvent{clip, frame, event}` | `boolean` | Adds a motion event to a clip without editing its archive. It fires each time the clip passes that frame, at any playback speed. Not active in FOB. |

| Field | Required | Description |
|---|---|---|
| `clip` | Required | Asset path, MtarTool id or full 16-digit id. |
| `frame` | Required | Clip frame, 0 or more. |
| `event` | Required | Event name without `MTEV_` (e.g. `"ReloadAmmo"`), or its hash. Any name of your own works too: catch it with the `ClipEvent` GameObject message. |

Events added by V Framework:

| Event | Effect |
|---|---|
| `EjectChamberRound` | On a gun or Snake reload clip, the player's gun ejects a casing if the magazine wasn't empty. Never on under-barrel reloads. |

```lua
V_TppMotion.AddClipEvent{ clip = "/Assets/tpp/motion/SI_game/fani/props/ar01/ar01/ar01_aw0_s_fre_rld.gani", frame = 134, event = "EjectChamberRound" }
```

---

## Pickable

Edit weapons, items and supplies lying in the world, by locator index
(`TppPickable.GetLocatorIndex`) or locator name.

| Function | Description |
|---|---|
| `V_Pickable.SetCountRawByLocatorIndex(index, count)` | Sets a pickable's contained count/ammo (0-4095). |
| `V_Pickable.GetCountRawByLocatorIndex(index)` | Returns the live count, or `nil`. |
| `V_Pickable.SetCountRawByLocatorName(name, count)` | Same, addressed by locator name. |
| `V_Pickable.GetCountRawByLocatorName(name)` | Same, addressed by locator name. |
| `V_Pickable.SetEquipIdByLocatorIndex(index, equipId)` | Changes which equip the pickable grants. |
| `V_Pickable.GetEquipIdByLocatorIndex(index)` | Returns the pickable's equip id, or `nil`. |
| `V_Pickable.SetEquipIdByLocatorName(name, equipId)` | Same, addressed by locator name. |
| `V_Pickable.GetEquipIdByLocatorName(name)` | Same, addressed by locator name. |
| `V_Pickable.SetInfoByLocatorIndex(index, info)` | Sets any subset of pickable fields from a table. |
| `V_Pickable.SetInfoByLocatorName(name, info)` | Same, addressed by locator name. |
| `V_Pickable.GetInfoByLocatorIndex(index)` | Returns the full info table, or `nil`. |
| `V_Pickable.GetInfoByLocatorName(name)` | Same, addressed by locator name. |

`info` keys (getters return all of them plus `locatorIndex`):

| Key | Required | Purpose |
|---|---|---|
| `equipId` | No (unchanged) | Equip the pickup grants. |
| `countRaw` | No (unchanged) | Count/ammo it gives (`0-4095`). |
| `secondCountRaw` | No (unchanged) | Second count, e.g. underbarrel ammo. |
| `countMax` | No (unchanged) | Rounds loaded into the picked-up weapon. |
| `secondCountMax` | No (unchanged) | Second magazine cap. |
| `infoType` | No (unchanged) | Pickup type. |
| `flags` | No (unchanged) | Pickup flags. |

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

Overrides last the whole session and also apply to the same locator
index on other maps. Raise `countMax` with `countRaw` for weapons. Leave
`countRaw` alone on ammo boxes.

---

## Collectibles

Custom world collectibles, like plants and diamonds, placed anywhere.

| Function | Description |
|---|---|
| `V_TppCollection.RegisterCollectionType(name, spec)` | Registers a type; returns its id, also published as `TppCollection.<name>`. |
| `V_TppCollection.AddCollection(name, type, x, y, z [, rotY])` | Places one in the world. |
| `V_TppCollection.RemoveCollection(name)` | Removes a placement. |
| `V_TppCollection.SetCollectionTypeIcon(type, ftexPath)` | Sets the pickup icon. |
| `V_TppCollection.SetCollectionTypeLangId(type, langId)` | Sets the display name (`.lng2` entry). |

`type` is the type name or its id.

```lua
V_TppCollection.RegisterCollectionType("MyMod:Collect",
{
  Model = "/Assets/tpp/item/ibo/Scenes/ibo6_main0_def.fmdl",

  Color            = {r = 1, g = 0, b = 0, a = 0.5},
  Strength         = {x = 0.5, y = 1.0, z = 0.5, w = 1.0},
  Yoffset          = 0.25,
  GroundEffectSize = 0.4,

  RootModel  = "/Assets/.../stump.fmdl",
  Fova       = "/Assets/.../variation.fv2",
  IsHerb     = false,
  IsMaterial = false,
  IsDiamond  = false,
})

V_TppCollection.AddCollection("MyCollect_00", "MyMod:Collect", 185.1, 336.3, 156.8, 90) -- Quickly spawns it in the world.
```

| Key | Required | Purpose |
|---|---|---|
| `Model` | Yes | Mesh to draw. |
| `Color` | No (`{r=0.9, g=0.9, b=0.5, a=0.5}`) | Pickup-burst colour and alpha. |
| `Strength` | No (`{x=0.5, y=1.0, z=0.5, w=1.0}`) | Pickup-burst size and spread. |
| `Yoffset` | No (`0.25`) | Burst height above the item, metres. |
| `GroundEffectSize` | No (`0.4`) | Ground decal size. |
| `RootModel` | No (none) | Mesh left after picking. |
| `Fova` | No (none) | Model variation `.fv2`. |
| `IsHerb`, `IsMaterial`, `IsDiamond` | No (`false`) | Answers for `TppCollection.Is*ByType`. |

---

## Player

### Voice overrides

| Function | Description |
|---|---|
| `V_Player.SetPlayerVoiceFpkPathForType(playerType, fpkPath)` | Loads a custom voice package for a player type, from the next mission load or outfit change. |
| `V_Player.ClearPlayerVoiceFpkPathForType(playerType)` | Restores one player type's vanilla voice package. |
| `V_Player.ClearAllPlayerVoiceFpkOverrides()` | Restores all vanilla player voices. |
| `V_Player.SetPlayerVoiceTypeForType(playerType, voiceType, dialogueEvent, dialogueEvent2)` | Forces a player type's voice now. `voiceType`: name (`"ddmsoldiera"`) or number. Optional `dialogueEvent`, `dialogueEvent2`: your bank's Dialogue Events. |
| `V_Player.ClearPlayerVoiceTypeForType(playerType)` | Restores one player type's normal voice, immediately. |
| `V_Player.ClearAllPlayerVoiceTypeOverrides()` | Restores all normal player voices. |

The package must match the voice type, or it is silent. Voice types:
[Outfit voice](/V_Framework_Custom_Outfits#outfit-voice).

### Energy Wall

| Function | Returns | Description |
|---|---|---|
| `V_Player.IsBarrierActive()` | `true` / `false` | Whether the player's Energy Wall shield is currently deployed. |

### Health

| Function | Returns | Description |
|---|---|---|
| `V_Player.GetPlayerHealth()` | life, or `nil` | The player's life now. |
| `V_Player.SetPlayerHealth(life)` | - | Sets the player's life. `life` Required, capped at the max. Never applies in FOB. |

### Fultons

| Function | Returns | Description |
|---|---|---|
| `V_Player.ResupplyFulton()` | new count | Refills fultons to the max, like a supply drop. |
| `V_Player.SetFultonCount(count)` | new count | Sets the fulton count. `count` Required, capped at the max. |
| `V_Player.GetFultonCount()` | count, max | The player's fultons now and the max their Fulton grade allows. |

### CQC

| Function | Description |
|---|---|
| `V_Player.RequestToSetTargetCqcStance(stance)` | Changes the player's stance to `V_PlayerCqcStance.STAND` or `V_PlayerCqcStance.SQUAT` during CQC hold. |

#### Quiet's CQC

Lets Quiet CQC-hold and interrogate enemies. Also in the
[Infinite Heaven menu](/V_Framework#infinite-heaven-menu).

| Function | Description |
|---|---|
| `V_Player.SetQuietHoldCqc(enable)` | Quiet can CQC-hold and choke. |
| `V_Player.SetQuietInterrogate(enable)` | Quiet can interrogate. |

> **These never apply in FOB.**
{:.note}

### Call menu

Adds your own call menu options, moves options around and turns them on or off.

| Function | Description |
|---|---|
| `V_Player.AddCallMenuItem(item)` | Adds an option. Returns its id. |
| `V_Player.GetCallMenuItem(key)` | Returns the id of the option saved with that `key`, or `nil`. |
| `V_Player.SetCallMenuItemInPlaceOf(item, other)` | Puts an option in place of another. `nil` puts it back. |
| `V_Player.DisableCallMenuItem(item)` | Greys the option out. |
| `V_Player.EnableCallMenuItem(item)` | Makes the option selectable, even where the game greys it out. |
| `V_Player.HideCallMenuItem(item)` | Removes the option from the menu. |
| `V_Player.ShowCallMenuItem(item)` | Brings a hidden option back. |
| `V_Player.ResetCallMenuItem(item)` | Puts one option back to normal. |
| `V_Player.ResetAllCallMenuItems()` | Puts every option back to normal. |

`item` is a [`V_CallMenuItem`](#call-menu-items), an id from `AddCallMenuItem`, or an option's `key`. Every parameter is required.


#### AddCallMenuItem fields

| Field | Required | Description |
|---|---|---|
| `key` | Required | A unique name, e.g. `"MyMod_FireFlare"`. Adding the same key again updates the option. |
| `label` | Required | Lang key of the option's name. |
| `column` | Required | A [`V_CallMenuColumn`](#call-menu-columns). |
| `description` | Optional | Lang key of the help text. Default: `label`. |
| `message` | Optional | Name sent as `item` in `ItemSelected`, so you can match it with `sender`. Default: the item id. |
| `exclusive` | Optional | A name, e.g. your mod's. Pages holding options with this name are kept for them; other options skip those pages. Default: none. |
| `inPlaceOf` | Optional | A `V_CallMenuItem` whose row this option takes. Default: none. |
| `when` | Optional | A [`V_CallMenuCondition`](#call-menu-conditions). Default: `ALWAYS`. |
| `voice` | Optional | Player voice labels (e.g. `"PLA0040_001"`) or ids; Snake says one at random when the option is picked. Default: none. |
| `icon` | Optional | Column logo on its page: a [`V_CallMenuIcon`](#call-menu-icons), or an `.ftex` sheet of 2x2 white shapes on transparent. Topmost option with an `icon` wins. Default: none. |
| `iconCell` | Optional | Which quarter of that sheet: `0` top-left, `1` top-right, `2` bottom-left, `3` bottom-right. Default: `0`. |
| `iconUvRepeat` | Optional | `{ u, v }`: how much of the texture the logo shows. `{ 1, 1 }` shows all of it, e.g. a single-picture `.ftex`. Default: `{ 0.5, 0.5 }`. |
| `iconUvShift` | Optional | `{ u, v }`: where the shown part starts, `0` to `1` across the texture. Overrides `iconCell`. Default: set by `iconCell`. |

Picking any option, yours or the game's, sends the [`ItemSelected`](#player-messages) message.

```lua
V_Player.AddCallMenuItem{
  key       = "MyMod_FireFlare",
  label     = "my_mod_flare",
  message   = "FireFlare",
  column    = V_CallMenuColumn.INTERROGATION,
  when      = V_CallMenuCondition.HOLDING,
  exclusive = "MyMod",
  icon      = "/Assets/mymod/ui/my_mod_logos.ftex",
  iconCell  = 1,
}

V_Player.HideCallMenuItem(V_CallMenuItem.KNOCK)
V_Player.SetCallMenuItemInPlaceOf(V_CallMenuItem.CALL_COMRADE, V_CallMenuItem.KNOCK)

-- any file, any mission
V_Player.DisableCallMenuItem("MyMod_FireFlare")

-- in Messages()
Player = {
  { msg = "ItemSelected", sender = "FireFlare", func = function(item, heldSoldierId) end },
},
```

### Demo attachment

Rides the player on another object's fox connect point (`.fcnp`) during a demo.

| Function | Description |
|---|---|
| `V_Player.RequestToAttachInDemo(info)` | Attaches the player to a connect point. Returns `true` on success. |
| `V_Player.ClearAttachInDemo()` | Releases the player from the connect point. |

| Key | Required | Purpose |
|---|---:|---|
| `ownerId` | Yes | Object to ride: locator name or `gameObjectId`. |
| `connectPoint` | Yes | Connect-point name on it. |
| `unattachOnSleep` | No (`true`) | Detach when the owner sleeps. |

```lua
V_Player.RequestToAttachInDemo{ ownerId = GameObject.GetGameObjectId("Cargo_Truck_WEST_001"), connectPoint = "CNP_DECK_A", unattachOnSleep = false }
```

### Space check

| Function | Returns | Description |
|---|---|---|
| `V_Player.IsThereEnoughSpaceAroundPlayer(minX, maxX, minZ, maxZ)` | `true` / `false` | Whether that area around the player is clear. `X` right (+) / left (-), `Z` forward (+) / back (-). |

```lua
if V_Player.IsThereEnoughSpaceAroundPlayer( -2.5, 2.5, -2.5, 1.5 ) == false then
  -- cramped: take the fallback path
end
```

### Custom outfits

See [V Framework Custom Outfits](/V_Framework_Custom_Outfits).

| Function | Returns | Description |
|---|---|---|
| `V_Player.RegisterOutfit(def)` | `partsType, developId, flowIndex` or `false` | Registers a custom uniform. |
| `V_Player.RegisterHeadOption(def)` | `equipId`, or `0` | Registers a custom head. |
| `V_Player.ExtendVanillaOutfit(def)` | vanilla `partsType`, or `false` | Adds variants or heads to a vanilla outfit. |
| `V_Player.GetOutfitInfo(key)` | `partsType, selectorCode, developId`, or `false` | Ids of an outfit you registered. |
| `V_Player.GetHeadOptionSlot(key)` | `faceEquipId, equipId`, or `false` | The `vars.playerFaceEquipId` value your head wears under. |
| `V_Player.GetHeadOptions()` | list of `{ key, slot, equipId, name, playerTypes }` | Every registered custom head. |
| `V_Player.PlayHeadMotion(clip)` | `true` / `false` | Plays a clip from the worn head's [`motion`](/V_Framework_Custom_Outfits#head-motion). |
| `V_Player.PlayHeadEffect(name)` | `true` / `false` | Starts an effect from the worn head's `motion.effects`. |
| `V_Player.StopHeadEffect(name)` | `true` / `false` | Stops that effect. |
| `V_Player.PlayHeadSound(event, point)` | `true` / `false` | Plays a sound event from the worn head. `point` is optional. |

`key` is the registration key. The head functions act on the custom head the player is wearing.

#### Outfit colours

Read and change an outfit's [colours](/V_Framework_Custom_Outfits#colours).

| Function | Returns | Description |
|---|---|---|
| `V_Player.GetOutfitColors(key)` | table, or `nil` | The outfit's colour channels and picked colours. |
| `V_Player.GetOutfitColor(key, channel)` | number, or `nil` | The picked colour of one channel. |
| `V_Player.SetOutfitColor(key, channel, index, save)` | `true` / `false` | Picks colour `index` of a channel; `true` when it is applied or about to be. |
| `V_Player.GetSortieOutfitCursor()` | `{ key, variant, worn, colors }`, or `nil` | The custom outfit under the Sortie Prep cursor. `colors` = whether it has colours. |
| `V_Player.EquipSortieOutfitCursor()` | `true` / `false` | Equips the outfit under the Sortie Prep cursor. |

| Parameter | Required | Purpose |
|---|---|---|
| `key` | Optional (worn outfit) | Registration key. `nil` = the custom outfit the player wears. |
| `channel` | Required | `"primary"` or `"secondary"`, or `1` / `2`. |
| `index` | Required | Colour number, from `1`. |
| `save` | Optional (`true`) | `false` only previews the colour, until the mission changes. |

`GetOutfitColors` returns `{ key, worn, variant, primary, secondary }`; each channel is `{ selected, colors }`,
`colors` a list of `{ icon, pack }` (`pack` = the colour has its own `fpk`). `variant` is `0` for the outfit itself, `n` for its `variants[n]`.

```lua
V_Player.SetOutfitColor("MyMod:MySuit", "primary", 2)
```

---

## Buddies

See [V Framework Buddy Outfits](/V_Framework_Buddy_Outfits).

| Function | Returns | Description |
|---|---|---|
| `V_TppBuddyService.RegisterBuddyOutfit(def)` | `value, developId` or `false` | Registers a Quiet costume, D-Horse tack or D-Dog gear. |
| `V_TppBuddyService.SetBuddyOutfit(key)` | `true` / `false` | Equips a registered buddy outfit or Quiet weapon. |
| [`V_TppBuddyService.SetQuietWeaponMotion(def)`](/V_Framework_Buddy_Outfits#quiet-weapon-animations) | `true` / `false` | Gives a Quiet weapon its own body and weapon animations. |

---

## Equipment

Weapon-building guide: [V Framework Custom Weapons](/V_Framework_Custom_Weapons).

### Equip IDs

| Function | Description |
|---|---|
| `V_TppEquip.RegisterConstantEquipId(name)` | Allocates an equip ID as `TppEquip.<name>`. Returns the number or `false`. |
| `V_TppEquip.AddToEquipIdTable(rows)` | Gives custom equip IDs their model and package. |

Each row is six values, all required: `{ equipId, equipType, subId,
block, partsPath, packPath }`. Malformed rows are skipped.

```lua
V_TppEquip.AddToEquipIdTable({
  { TppEquip.EQP_WP_Com_sg_020, TppEquip.EQP_TYPE_Shotgun, TppEquip.WP_Com_sg_020, TppEquip.EQP_BLOCK_MISSION,
    "/Assets/tpp/parts/weapon/assemble/shg/sg04_main0_aw0_v00.parts",
    "/Assets/tpp/pack/collectible/primary/EQP_WP_Com_sg_020.fpk" },
})
```

Only weapons may use the `EQP_WP_` prefix, and only support weapons
`EQP_SWP_`. All mods share the weapon ID range; when it is full the log says
`RegisterConstantEquipId '<name>': no free equipId, rejected`.

### Weapon-part declarations

```lua
V_TppEquip.DeclareWPs { "WP_A", "WP_B" }   --> 2
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

#### Other constant spaces

Same argument (a table of names), published under `TppEquip`:

```lua
V_TppEquip.DeclareTriggers    { "TRIGGER_Example" }
V_TppEquip.DeclareBulletTypes { "BULLET_TYPE_Example" }
```

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
| [`V_TppEquip.SetWeaponHandling`](/V_Framework_Custom_Weapons#cross-family-handling-setweaponhandling) | - | Weapon handles like another vanilla weapon. |
| [`V_TppEquip.SetReceiverMotion`](/V_Framework_Custom_Weapons#custom-gun-motion-setreceivermotion) | - | Receiver gets its own animations. |
| [`V_TppEquip.SetRemoteMissile`](/V_Framework_Custom_Weapons#remote-controlled-missile-setremotemissile) | - | Weapon's shell becomes steerable, similar to Rocket arm. |
| `V_TppEquip.AbortRemoteMissile()` | - | Ends the current flight. |
| `V_TppEquip.IsRemoteMissileFlying()` | `boolean` | Whether a steerable missile is in the air. |

### Support weapons

| Function | Description |
|---|---|
| [`V_TppEquip.SetSupportWeapon`](/V_Framework_Custom_Weapons#support-weapons-setsupportweapon) | A custom thrown item, thrown like a vanilla one; you script its effect. |
| [`V_TppEquip.SetSupportWeaponParameter`](/V_Framework_Custom_Weapons#support-weapon-stats-setsupportweaponparameter) | Ammo, fuse, effect time, grade and R&D stats. |
| [`V_TppEquip.SetBlastParameter`](/V_Framework_Custom_Weapons#blast-setblastparameter) | Blast radius and noise. |

---

## Throwing

Thrown items (grenades, smoke, decoys...) in the world, by handle, plus blasts,
clouds, fire and noise. Get a handle from a [Throwing message](#throwing-messages), `Search` or
`GetHandleLatestThrownByPlayer`. Commands are ignored in FOB.

| Function | Returns | Description |
|---|---|---|
| `V_ThrowingSystem.Throw(def)` | `true` | Throws an item. |
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
| `V_ThrowingImpl.UpdateActionGrenade(handle, swpType)` | `true` / `false` | The item acts as a grenade of that `SWP_TYPE_*`. `swpType` Optional (`1`). |
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
| `V_RangeAttackSystem.RequestToChaff(def)` | handle, or nothing | Chaff: jams cameras, UAVs and Sahelanthropus map-wide, cuts CP radio and missile lock-on. One at a time; a new one replaces the old. |
| `V_RangeAttackSystem.RequestToStun(def)` | handle, or nothing | Stun grenade burst at a position. |
| `V_RangeAttackSystem.RequestToSmoke(def)` | handle, or nothing | Smoke or sleeping-gas cloud. |
| `V_RangeAttackSystem.RequestToFlame(def)` | handle, or nothing | Molotov fire. |
| `V_BlastSystem.Blast(def)` | `true` / `false` | An explosion's damage and push, without its look or sound. |
| `V_NoiseSystem.AddNoise(def)` | `true` / `false` | A noise guards hear and check, with no actual sound. |

`pos` is `{ x, y, z }`. A command that returns `true` / `false` is queued (`true`) and runs on the next frame.

#### Throw fields

| Field | Required | Purpose |
|---|---|---|
| `equipId` | Yes | `TppEquip.EQP_SWP_*` to throw. |
| `pos` | Yes | Start position. |
| `velocity` | One of these two | `{ x, y, z }` m/s. |
| `target` | One of these two | `{ x, y, z }` landing point; needs `flightTime` or `angle`. |
| `flightTime` | With `target`, one of these two | Seconds to reach `target`. |
| `angle` | With `target`, one of these two | Throw angle to reach `target`. |
| `rotation` | No (none) | `{ x, y, z, w }`. |
| `fuseTime` | No (item's) | Seconds before it goes off. |
| `owner` | No (`0`, player) | Thrower's game object ID. |
| `hitIgnoreId` | No (none) | Game object it passes through. |
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

Up to 4 requests of each kind per frame. Up to 12 smoke clouds (the oldest is replaced) and 12 fires at once.
Example: the [chaff grenade](/V_Framework_Custom_Weapons#support-weapons-setsupportweapon).

#### Blast fields

| Field | Required | Purpose |
|---|---|---|
| `pos` | Yes | Position. |
| `blastId` | Yes | `TppEquip.BLA_*`; gives the noise and the default radius. |
| `attackId` | Yes | `TppDamage.ATK_*` it deals. |
| `radius` | No (the blast's) | Metres, up to `100`. |
| `shockwave` | No (`true`) | Also pushes things in a 1.5x wider ring. |
| `owner` | No (`0`) | Owner's game object ID. |
| `hitIgnoreId` | No (none) | Game object it leaves unhurt. |
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

## Effects

V Framework has no effect function: use the vanilla effect locators. Put an
effect locator naming the `.vfx` in a `.fox2` the mission loads, then:

```lua
TppDataUtility.SetForcedChangePositionEffectFromId("MyFxLocator", x, y, z)
TppDataUtility.CreateEffectFromId("MyFxLocator")
```

`DestroyEffectFromId`, `DestroyImmediateEffectFromId`, `IsReadyEffectFromId` and
`SetVisibleEffectFromId` work the same way; the `...FromGroupId` versions act on a
whole group. One locator plays one effect at a time, at a position only.

---

## Mother Base Management

Every function in this section belongs to `V_TppMotherBaseManagement`.

| Function | Description |
|---|---|
| `V_TppMotherBaseManagement.AddToChangeLocationMenu(def)` | Adds a location to the ACC free-roam list. |
| `V_TppMotherBaseManagement.AddPhotoAdditionalText(rows)` | Adds text to VI photos. |

### ACC change-location menu

Takes an array of location codes:

```lua
V_TppMotherBaseManagement.AddToChangeLocationMenu{
  40,   -- Gntn
}
```

### VI photo text

Takes an array of rows. `missionCode`, `photoId` and `photoType` are
required (a row missing one is skipped); `targetTypeLangId` is the
text's lang id.

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

Adds an R&D row. Required: the key, a `const` table and a `flow`
table. IDs are allocated from the key. Field names or raw `pNN` names both
work.

#### `const` fields

| Field | Required | Purpose |
|---|---|---|
| `equipID` (`p01`) | No (`0`) | Equipment ID. Use `EQP_None` for heads. |
| `equipDevelopTypeID` (`p02`) | No (`0`) | Main R&D category. |
| `baseEquipDevelopId` (`p03`) | No (none) | Parent R&D row. Child grades must be higher than the parent. |
| `skill` (`p04`) | No (none) | Required skill ID. |
| `bluePrintId` (`p05`) | No (`65535`, none) | Blueprint needed to develop the row, or a show/hide rule. |
| `langEquipName` (`p06`) | No (none) | Display-name language ID. |
| `langEquipInfo` (`p07`) | No (none) | Description language ID. |
| `iconFtexPath` (`p08`) | No (none) | R&D icon path. |
| `equipDevelopGroupID` (`p09`) | No (`0`) | Fine R&D tree group. |
| `langPowerUpInfo0-11` (`p10-p21`) | No (none) | Upgrade-information language IDs. |
| `langEquipRealName` (`p30`) | No (none) | Real-name language ID. |
| `isResultRankLimited` (`p31`) | No (`0`) | `1`: using the item in a mission caps the mission rank, like vanilla rank-limited items. |
| `langResultRankLimited` | No (`langEquipName`) | Lang id of the result-screen line explaining the cap. |
| `isCustomEnable` (`p32`) | No (`1`) | Customization flag. |
| `isColorChangeEnable` (`p33`) | No (`1`) | Color-change flag. |
| `unk34` | No (`0`) | Unknown. |
| `isSecurityStaffEquip` (`p35`) | No (`0`) | Security-staff equipment flag. |
| `unk36` | No (ignored) | Ignored. Custom rows never count toward what the game sends online. |

#### `bluePrintId` forms

```lua
-- No blueprint (default)
bluePrintId = 65535

-- Vanilla blueprint
bluePrintId = TppMotherBaseManagementConst.DESIGN_2001

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
| `resourceType1/2` (`p58`, `p60`) | No (none) | Required resource names. |
| `resourceType1Count/2Count` (`p59`, `p61`) | No (`0`) | Required quantities. |
| `initialAvailable` (`p62`) | No (`0`) | Initial developed state; `0` starts locked. |
| `sectionIDForDevelop` (`p63`) | No (`0`) | Main required section. |
| `developSectionLv` (`p64`) | No (`0`) | Development section level. |
| `resourceUsageType1/2` (`p65`, `p67`) | No (none) | Per-use resources. |
| `resourceUsageType1Count/2Count` (`p66`, `p68`) | No (`0`) | Per-use quantities. |
| `displayInfo` (`p69`) | No (`0`) | `0` shown; `1` needs its `skill` or its `bluePrintId` obtained to show (a design always shows); `2`, `3`, `5` hide the row. |
| `unk70` | No (`0`) | Unknown. |
| `developTimeMinute` (`p71`) | No (`0`) | Development time in minutes. |
| `intimacyPoint` (`p73`) | No (`0`) | Intimacy requirement/value. |

Invalid grades and side-branch clashes are fixed automatically and
logged.

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
| `SetEquipDevelopVisible(id, visible)` | Shows or hides the row at runtime without reloading. |
| `GetUsedRankLimitedItemLangIds()` | Lang ids of the rank-limited custom items used this mission, in first-use order. |

Revealing a row still marked `NEW` also plays its announcement.

### DataBase entries

Custom iDroid DATABASE entries: blueprints, key items, photos, animals,
posters, codenames or medicinal plants.

| Function | Description |
|---|---|
| `RegisterDataBase(key)` | Allocates a DataBase entry and returns its numeric id. |
| `SetBluePrint(keyOrId, owned)` | Marks it obtained (`true`) or not obtained (`false`). |
| `HasBluePrint(keyOrId)` | Returns whether the player has obtained it. |
| `GetBluePrintId(keyOrId)` | Returns the numeric id, or `nil`. |
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
| `langDocName` | No (none) | Row name (lang id). |
| `docIcon` | No (none) | Small row icon. |
| `docImage` | No (`docIcon`) | Large detail image. |
| `langDocInfo` | No (none) | Description (lang id). |
| `tab` | No (Blueprints) | A [`V_TppDataBase`](#database-tabs) tab. |

Set at least one of `langDocName`, `docIcon`, `docImage`, `langDocInfo`.

### Unique staff

A named Mother Base staffer, like Ocelot or Code Talker, with a name,
face, skill and section points.

| Function | Description |
|---|---|
| `RegisterUniqueStaff(def)` | Registers a staffer; returns its `uniqueTypeId`. |
| `GetUniqueStaffTypeId(key)` | Returns the id of a key, or `nil`. |

#### Required fields

`key` plus all of these (a missing one is logged and the staffer is not
created):

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

| Field | Default | Purpose |
|---|---|---|
| `faceId` | face `0` | Face. |
| `faceIdForNoFultonStaff` | game's | Face when not fultoned. |
| `skill` | none | Skill name, e.g. `"Surgeon"`. |
| `missionId` | none | Stored by the game but never used. |
| `deployMissionId` | none | Ignored; the game never reads it. |

```lua
V_TppMotherBaseManagement.RegisterUniqueStaff{
  key                 = "MyMod.Medic13106",
  skill               = "Surgeon",
  nameLangMessageId   = "my_staff_13106_medic",
  faceId              = 120,

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

Your mission scripts place the staffer; get the id with:

```lua
local id = V_TppMotherBaseManagement.GetUniqueStaffTypeId("MyMod.Medic13106")
```

### Dispatch missions

New Combat Deployment missions in the iDroid.

| Function | Description |
|---|---|
| `RegisterDeployMissionParam(def)` | Registers a mission; returns its `deployMissionId`. |
| `RegisterPoolRewardParam(def)` | Its reward; `keyValue1` is the mission `key`. |
| `AddDeployMission(key)` | Lists a rarity-`NONE` mission. |
| `GetDeployMissionId(key)` | Returns the id of a key, or `nil`. |
| `GetDeployMissionCleared(key)` | `true` once a rarity-`NONE` mission was completed, won or lost. |
| `UnsetDeployMissionCleared(key)` | Lets `AddDeployMission` list it again. |

Both register functions take the vanilla table, with `key` instead of
the id:

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

Without `key`, the table edits the vanilla mission of that id (not the
random pool, 21-119).

#### Mission fields

| Field | Default | In game |
|---|---|---|
| `key` | Required | Auto allocates missionId. |
| `nameLangId` | name of its `category` | Name in the list, the result log and the Rewards list. |
| `infoLangId` | text of its `category` | Description under the list. |
| `category` | `COMBAT1_PERSON_GUARD` | `DEPLOY_MISSION_CATEGORY_*`. Only picks the default name and description. |
| `rarity` | `RARITY_N` | `DEPLOY_MISSION_RARITY_*`. Where it is listed, see below. |
| `combatSectionRank` | `"G"` | Enemy strength and the Heroism a win gives. Not a requirement: your staff's rank is never checked. Shown shifted, see below. |
| `combatSectionStaffCountMax` | `10` | Combat staff sent, at most this. At least half is required. |
| `subSection` | none | Unit of a second squad: `"Develop"`, `"BaseDev"`, `"Support"`, `"Spy"` or `"Medical"`. |
| `needSubSectionStaffCount` | `0` | Size of the second squad, required. Adds enemy strength even without `subSection`. |
| `needSubSectionRank` | `"G"` | Enemy strength of the second squad. |
| `_4wdCountMin`/`Max`, `truckCountMin`/`Max`, `armoredCountMin`/`Max`, `tankCountMin`/`Max`, `walkerGearCountMin`/`Max` | `0` | Vehicles you must send, rolled from min to max - 1: `0`/`1` needs none, `1`/`2` needs one. |
| `battleGear` | `false` | Requires the Battle Gear. |
| `baseWinRate` | `80` | Success % when your team is as strong as the enemy. Success is clamped to 5-95. |
| `deadRate` | `5` | Casualty %: killed below it, injured below twice it. Extra staff lower it (3-50). At most half the team is hit. |
| `timeMinute` | `2` | Duration, in minutes of play. |
| `timeMinuteRandom` | `0` | Adds 0 to N - 1 minutes. |
| `latitude`, `longitude` | `0` | Globe pin. |
| `important` | `false` | `true`: always listed first, with the yellow story marker, and the Combat Deployment notice turns yellow. |
| `revengeMissionId` | none | `DEPLOY_MISSION_ID_REVENGE_*`. Listed last unless `important`, with that revenge icon; completing the mission counts as completing that vanilla revenge dispatch. |

Other custom missions take a random row in the top 10 of the list.

Ranks show one step up in game:

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

#### Reward fields

Paid on a successful dispatch only. A left-out field takes its default, so
a table with only `gmp` still recruits staff and pays fuel.

| Field | Default | In game |
|---|---|---|
| `keyValue1` | Required | The mission `key`. |
| `keyValue2` | Required | Recruits' unit icon: `0`/`1` Combat, `2` R&D, `3` Base Development, `4` Support, `5` Intel, `6` Medical. Recruits are still auto-assigned. |
| `mainRewardType` | none | `MAIN_REWARD_TYPE_*`. The list icon only. |
| `gmp` | `0` | GMP. |
| `staffDrawCount` | `10` | Staff recruited. |
| `staffHitRate` | `20` | % chance of the full count, otherwise 40% of it. |
| `staffGRate` ... `staffSppRate` | G `100`, others `0` | Rank weights, relative (not %). Ranks shift as above. |
| `staffRelativeRate`, `staffRelativeP1Rate` | `50`, `50` | Weights for the rank a new recruit gets now, and one above. Rises as Mother Base grows. |
| `resourceDrawCount` | `20` | Resource draws. A material gives 5, a plant 1. |
| `resourceHitRate` | `50` | % chance of all draws, otherwise 40% of them. |
| `fuelResourceRate`, `bioticResourceRate`, `commonMetalRate`, `minorMetalRate`, `preciousMetalRate`, `goldenCrescentRate`, `blackCarrotRate`, `wormwoodRate`, `tarragonRate`, `africanPeachRate`, `digitalisPRate`, `digitalisLRate`, `haomaRate` | `0` | Resource weights, relative. All `0` makes every draw fuel. |
| `materialIsBeforeProcess` | `false` | `true` pays unprocessed materials. |
| `keyItemDataBaseId` | none | DataBase item added on the win. |
| `keyItemRate` | `0` | % chance of that item. |
| `rewardRate` | `10` | No effect. |

Every value is capped at the best vanilla dispatch reward.

---

## Soldier faces

| Function | Description |
|---|---|
| `RegisterFace(def)` | Creates a face under `def.key` and returns its `faceId`. |
| `GetFaceId(key)` | Returns the `faceId` of a key, or `nil`. |

Only `key` is required.

| Field | Default | Values |
|---|---|---|
| `key` | required | Stable name; register it every launch (unregistered for two launches: removed). |
| `gender` | `0` | `0` male, `1` female. |
| `race` | `0` | `0` Caucasian, `1` Brown, `2` Black, `3` Asian. |
| `faceFova`, `faceDecoFova`, `hairFova`, `hairDecoFova` | none | fv2 path, `{fv2=, fpk=}` or row index. A deco needs its base. |
| `eyeFova`, `skinFova` | none | `0-31`. |
| `eyeMeshType` | `0` | `0` or `1` eye mesh. |
| `forceHairFova` | `false` | Always show the hair. |
| `mbEligible` | `false` | `true`: the game may pick it at random for new volunteer staff, hostages and quest targets. |
| `unique` | `false` | For unique prisoners or main-mission soldiers. |
| `uiTextureName` | none | Staff portrait name, e.g. `ui_face_custom`. |
| `uiTextureCount` | `1` with a name | Portraits `0-3`. |
| `uiTexBasePath` | `/Assets/tpp/ui/texture/StaffImage/` | Portrait folder, with trailing slash. |
| `outsideFaceRef1`-`3` | `0` (none) | Alternative faces as `faceId + 1`. |
| `outsideFaceCount` | `0` | How many alternatives are used, `0-3`. |

Declare every fv2/fpk pair in a `mod/fovaInfo/*.lua` file; Infinite Heaven loads it at startup:

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

---

## Sound

| Function | Description |
|---|---|
| `V_TppSoundDaemon.SetGameOverMusic(enabled, type, playEvent, stopEvent)` | Replaces Game Over music with Wwise events. |
| `V_TppSoundDaemon.SetMissionPreparationMusic(playEvent, stopEvent, missionCode)` | Replaces Sortie Prep music with Wwise events. |

### SetGameOverMusic

```lua
V_TppSoundDaemon.SetGameOverMusic(true, V_TppGameObject.GAME_OVER_GENERAL, "Play_bgm_my_gameover", "Stop_bgm_my_gameover")
```

| Parameter | Required | Purpose |
|---|---:|---|
| `enabled` | Yes | `true` replaces, `false` restores vanilla. |
| `type` | Yes | A [Game Over type](#game-over-types). |
| `playEvent` | With `enabled = true` | Wwise event that starts the track. Event name or hash. |
| `stopEvent` | With `enabled = true` | Wwise event that stops it. Event name or hash. |

Returns `true` on success.

### SetMissionPreparationMusic

```lua
V_TppSoundDaemon.SetMissionPreparationMusic("Play_bgm_my_track", "Stop_bgm_my_track")
```

| Parameter | Required | Purpose |
|---|---:|---|
| `playEvent` | Yes | Wwise event that starts the track. Event name or hash. |
| `stopEvent` | Yes | Wwise event that stops it. Event name or hash. |
| `missionCode` | No (every sortie) | Applies only to that mission. |

Returns `true` on success. A mission-specific setting wins over the
global one:

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

Returns `true` on success. Invalid entries are skipped.

#### Album fields

| Field | Required | Purpose |
|---|---:|---|
| `albumId` | Yes | Internal album ID. |
| `langId` | Yes | Display-name language ID. |
| `type` | One of the two | Album type string. |
| `typeValue` | One of the two | Album type as a number. |

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
| `albumId` | Yes | - | Parent album ID. |
| `langId` | Yes | - | Track display-name language ID. |
| `fileName` | Yes | - | Internal track filename. |
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
| `SetDefaultEquipBgTexturePath(path, colored, opacity, scaleX, scaleY)` | Sets the default player-equipment background. |
| `ClearDefaultEquipBgTexture()` | Restores the player default. |
| `SetEquipBgTexturePath(equipId, path, colored, opacity, scaleX, scaleY)` | Sets one player-equipment background. |
| `ClearEquipBgTexture(equipId)` | Clears one player-equipment background. |
| `SetEnemyWeaponBgTexturePath(path, colored, opacity, scaleX, scaleY)` | Sets the default enemy-weapon background. |
| `ClearEnemyWeaponBgTexture()` | Restores the enemy default. |
| `SetEnemyEquipBgTexturePath(equipId, path, colored, opacity, scaleX, scaleY)` | Sets one enemy-equipment background. |
| `ClearEnemyEquipBgTexture(equipId)` | Clears one enemy-equipment background. |
| `ClearAllEquipBgTextures()` | Clears every background, defaults included. |

| Parameter | Required | Description |
|---|---|---|
| `equipId` | Required | A `TppEquip` id. `0` = empty slot. |
| `path` | Required | Texture path; `.ftex` is added if missing. |
| `colored` | Optional | `true` shows the texture as is, black included. Default: `false` (white glow, like vanilla). |
| `opacity` | Optional | Background alpha. Default: `1`. |
| `scaleX` | Optional | Width multiplier, `1` = vanilla size. Default: `1`. |
| `scaleY` | Optional | Height multiplier, `1` = vanilla size. Default: `1`. |

Player equipment is what you carry this mission, supply drops and pickups included. Enemy-only guns and shields always use the enemy backgrounds. Bionic arms and empty slots only use `SetEquipBgTexturePath`.

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

`missionCode` is optional; omitted applies to every mission. A
mission's own setting wins over the global one.

### Resident UI packs

| Function | Description |
|---|---|
| `LoadResidentUiPack(path, sizeBytes)` | Loads a UI pack (`.fpk` + `.fpkd`, with its `.pftxs`) for the rest of the game, so its windows work on loading screens too. Repeat calls do nothing. Returns `true` when asked. |
| `IsResidentUiPackLoaded(path)` | `true` once that pack is loaded, so `V_UixUtility.CreateWindow` can use its files. |

`sizeBytes`: memory for the pack's `.fpk` and `.fpkd` contents (not textures), default 1 MiB, 64 KiB to 32 MiB. Packs are never unloaded: all mods together get at most 16 packs and 64 MiB; past that the call returns `false`. Two spellings of one path are the same pack.

### Loading tips and game over

Read the game's loading tips screen and game over menu, to draw your own versions. Use `V_FrameWork.SetFrameCallback`: `Update` doesn't run during a load.

`GetLoadingTipsInfo()` returns a table, or `nil` when it cannot be read:

| Field | Meaning |
|---|---|
| `session` | `true` while the tips screen runs. |
| `state` | `0` splash, `1` waiting for the tip text, `2` tips shown, `3` ending (the player resumed). |
| `tipIndex`, `tipCount` | The tip shown and how many there are. |
| `pageTurn` | `0` none; `1`..`5` while a page turns (`3` is the frame the game swaps the text). |
| `resumePermitted` | `true` once the game has loaded and the player may leave the screen. |
| `hidden` | `true` while another full-screen menu covers the tips. |
| `tipId` | Only in state `2`: the tip's id. `tipId % 2^32` equals `Fox.StrCode32(tostring(TppDefine.TIPS.COVER))` for the COVER tip. |
| `titleLangId`, `bodyLangId` | Only in state `2`: language ids for `V_UixUtility.GetLangText`. |
| `page`, `pageCount` | Only in state `2`: the page of a multi-page tip. |

For a frame or two after a load starts, the table still holds the previous load's end (`state` `3`) until the game restarts its screen: treat a `state` of `3` at the very start of a session as not yet started.

`GetGameOverInfo()` returns a table, or `nil` when it cannot be read:

| Field | Meaning |
|---|---|
| `open` | `true` from the moment the game over menu starts until it ends. |
| `state` | `3` waiting for black, `4` menu shown, `5` choosing, `6`/`7` confirm popup, `8` chosen, `9` fading out, `10` done. |
| `selected`, `previous` | The highlighted row, from `0`, and the one before it. |
| `count` | Number of rows, `1` to `4`. |
| `type` | `0` normal, `1` Cyprus, `2` time paradox. |
| `items` | The rows' language ids in row order (e.g. `gameover_select_return_cp`); they also tell the rows apart. |

While `open` is `false`, the other fields are `0`.

### Equipment icons

| Function | Description |
|---|---|
| `SetEquipIconFtexPath(equipId, path)` | Replaces one equipment icon. |
| `ClearIconFtexPath(equipId)` | Restores one icon. |
| `ClearAllIconFtexPaths()` | Restores all icons. |

### Equipment names

| Function | Description |
|---|---|
| `SetEquipLangInfo(def)` | Name and description of an equip in pickups, HUD and equip lists (not R&D). Custom equips are blank without it. |

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
| `SetEnemyUnitName(langId)` | Sets the global binoculars unit name. |
| `SetEnemyInformationLangIdForSoldier(id, langId)` | Sets one soldier's map/marker name. |
| `SetEnemyUnitNameForSoldier(id, langId)` | Sets one soldier's binoculars name. |

### Announcement-log sound

| Function | Description |
|---|---|
| `RegisterAnnounceLogSfx(label)` | Registers a Wwise SFX label. |
| `SetAnnounceLogSE(label, conditionOrStateId)` | Assigns the sound to an announcement entry. |
| `UnsetAnnounceLogSE()` | Removes the active override. |
| `UnregisterAnnounceLogSfx()` | Unregisters the sound label. |

### Mission-select warnings

Adds a warning line to a mission in the iDroid mission list. `color`
is optional (default: warning red, help yellow).

| Function | Description |
|---|---|
| `SetMissionAcceptWarning(missionCode, langId, color)` | Red line in the "Accept this mission?" popup. |
| `SetMissionMenuHelp(missionCode, langId, color)` | Yellow line at the bottom of the mission list. |
| `ClearMissionMenuHelp(missionCode)` | Removes one mission's help line. |

```lua
-- red accept-popup warning, in a custom color
V_TppUiCommand.SetMissionAcceptWarning(13006, "MustOwnRockets", "cmn-col-ng")

-- yellow mission-list help, default color
V_TppUiCommand.SetMissionMenuHelp(11082, "MustOwnRockets")
```

---

## UI assets

`V_UixUtility` (editing the HUD, menus and iDroid, and making your own
UI windows) has its own page: [V Framework UI](/V_Framework_UI).

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
| `V_Helicopter.ResetTaxiState()` | Restores the default Taxi state. |
| `V_Helicopter.SetPlayerDropSeatPose(ganiPath, missionCode)` | Replaces Snake's seated pose in the helicopter during the drop (`snaputh_q_seat_idl_b_lp`). `missionCode` Optional (every mission); `nil` `ganiPath` restores vanilla. |

```lua
V_Helicopter.SetPlayerDropSeatPose("/Assets/tpp/motion/SI_game/fani/bodies/snap/snaputh/snaputh_q_seat_idl_b_tgs_lp", 10040)
```

---

## Title sequence

Applies in the ACC (Aerial Command Center).

| Function | Description |
|---|---|
| `V_title_sequence.SetPlayIDroidEndMotion(enabled)` | Snake puts the iDroid away (`snaputh_q_idroid_ed`) when it closes while seated. Default: the [Infinite Heaven option](/V_Framework#infinite-heaven-menu) (on). |
| `V_title_sequence.SetMotion(ganiPath)` | Replaces the seated idle loop (`snaputh_q_seat_idl_lp`). `nil` restores it. |

```lua
V_title_sequence.SetPlayIDroidEndMotion(true)
V_title_sequence.SetMotion("/Assets/tpp/motion/SI_game/fani/bodies/snap/snaputh/snaputh_q_idl_lp")
```

`ganiPath` takes an asset path, a MtarTool id or a full 16-digit id. The clip must be in one of the player's motion archives (for example `player2_heli.mtar` or `player2_resident.mtar`); otherwise the vanilla idle plays. A change applies right away; while the iDroid is open it waits until it closes.

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

### Notice kinds

For [`AddNotice`](#notice).

| Constant | The soldier |
|---|---|
| `V_NoticeKind.DISCOVERED` | Spots the target outright. |
| `V_NoticeKind.SUSPICIOUS` | Sees something suspicious and checks it out. |
| `V_NoticeKind.SUSPICIOUS_ON_GUARD` | Same, while already on guard. |
| `V_NoticeKind.HEARD_NOISE` | Hears a noise there. |
| `V_NoticeKind.SAW_FULTON` | Sees a Fulton balloon. |
| `V_NoticeKind.SAW_DECOY` | Sees a decoy. |
| `V_NoticeKind.SAW_SUPPLY_DROP` | Sees a supply drop. |
| `V_NoticeKind.SAW_HOSTILE_ANIMAL` | Sees a dangerous animal. |
| `V_NoticeKind.SAW_ANIMAL` | Sees a harmless animal. |
| `V_NoticeKind.CALLED_OVER` | Is called over by a comrade; turns and walks over calmly. |
| `V_NoticeKind.CALL_FOR_HELP` | Is called for help; comes over on guard. |

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
| `V_CallMenuItem.CALL_COMRADE` | Call em; takes the knock row while you hold an enemy |
| `V_CallMenuItem.RESCUE_BOY` | Go / Wait for the rescued children |
| `V_CallMenuItem.FALSE_RADIO_RESPONSE` | Lie to them; takes the sonar row while you hold an enemy |

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

| Constant | Value |
|---|---:|
| `V_TppCallSign.NONE` | 0 |
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

For `receiverType` in [`SetReceiverMotion`](/V_Framework_Custom_Weapons#custom-gun-motion-setreceivermotion).
`V_ReceiverType.<name>`:

Names might not be accurate.

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

For `magazineType` in [`SetMagazine`](/V_Framework_Custom_Weapons#magazine-setmagazine).
`V_MagazineType.<name>`:

Names might not be accurate.

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

# SendCommand

## Sending a command

```lua
GameObject.SendCommand(target, {
  id = "CommandName",
  -- command fields
})
```

Target: a game object ID, type target or Command Post. Global commands
ignore it.

---

## Accepted command value types

Booleans take `true`/`false` or `0`/nonzero. `deadBodyLabel`,
`customLostLabel` and `labels` entries take a string or StrCode32.

---

## Life

Soldiers, hostages, animals, vehicles and walker gears.

| Command | Fields | Returns |
|---|---|---|
| `GetLife` | - | `life, maxLife, stamina, maxStamina`. Stamina is `nil` for vehicles and walker gears, all four are `nil` when the target has no life. |
| `SetLife` | `life`, `stamina`, `sleep` | - |

| Field | Required | Description |
|---|---|---|
| `life` | Optional (unchanged) | New life, up to the max. `0` kills. |
| `stamina` | Optional (unchanged) | New stamina, up to the max. `0` knocks out. Give `life`, `stamina` or both. |
| `sleep` | Optional | Soldiers only: with `stamina = 0` he falls asleep instead of fainting. Default: `false`. |

`SetLife` needs `life` or `stamina` and can't change the dead. A soldier
left with 500 life or less starts dying, as when shot. To change the
max, use the vanilla `SetMaxLife`.

```lua
local life, maxLife, stamina, maxStamina = GameObject.SendCommand(soldierId, { id = "GetLife" })
GameObject.SendCommand(soldierId, { id = "SetLife", life = maxLife / 2 })
GameObject.SendCommand(hostageId, { id = "SetLife", stamina = 0 })
```

---

## Animal position

The vanilla `GetPosition` also works on animals: goats, sheep, critter
birds, storks, eagles, rats, zebras, wolves, jackals and bears.

| Command | Fields | Returns |
|---|---|---|
| `GetPosition` | - | The animal's position as a `Vector3`, or `nil` when it isn't in the world (disabled, extracted, or never spawned). |

Target: the animal's numeric game object ID, from
`GameObject.GetGameObjectIdByIndex(type, i)` or a message. A locator name is a
herd's name and doesn't pick one animal. In a scan loop, skip `nil` instead of
stopping.

```lua
local goatId = GameObject.GetGameObjectIdByIndex("TppGoat", 0)
local position = GameObject.SendCommand(goatId, { id = "GetPosition" })
if position then
  local x, y, z = position:GetX(), position:GetY(), position:GetZ()
end
```

---

## Animal damage

The vanilla `AddDamage` also works on goats, sheep, wolves, jackals,
zebras and bears. Birds and rats aren't supported.

| Field | Required | Description |
|---|---|---|
| `attackId` | Required | A `TppDamage.ATK_` value. |
| `ownerGameObjectId` | Optional | Who dealt it. Default: nobody. |
| `isOneHitKill` | Optional | Kills it outright. Default: `false`. |
| `isHeadShot` | Optional | Counts as a head shot. Default: `false`. |

Target: as for [Animal position](#animal-position). An animal that isn't in
the world takes nothing.

```lua
GameObject.SendCommand(goatId, { id = "AddDamage", attackId = TppDamage.ATK_10004, ownerGameObjectId = 0, isOneHitKill = true })
```

---

## Soldiers

### Occasional chats

Target:

```lua
{ type = "TppSoldier2" }
```

| Command | Purpose |
|---|---|
| `SetOccasionalChatList` | Replaces the override list. |
| `InsertToOccasionalChatList` | Adds labels. |
| `RemoveFromOccasionalChatList` | Removes labels. |

> `labels` accepts up to 255 strings or StrCode32 values.
{:.note}

```lua
GameObject.SendCommand({ type = "TppSoldier2" }, {
  id = "SetOccasionalChatList",
  labels = {
    "speech_label_1",
    "speech_label_2",
  },
})
```

### Optical camouflage

| Command | Field | Returns | Purpose |
|---|---|---|---|
| `SetOpticalCamo` | `enable` | - | Enables or disables optical camouflage for one soldier. |

Soldiers only; target a numeric `gameObjectId`.

```lua
GameObject.SendCommand(
  GameObject.GetGameObjectId("sol_enemyBase_0000"),
  {
    id = "SetOpticalCamo",
    enable = true,
  }
)
```

### Radio call sign

| Command | Field | Returns |
|---|---|---|
| `SetRadioCallSign` | `callSign` | - |

Radio chatter calls the soldier Zulu 1, Delta 6 and so on. Use
[`V_TppCallSign`](#radio-call-signs) values.

```lua
GameObject.SendCommand(soldierId, {
  id       = "SetRadioCallSign",
  callSign = V_TppCallSign.ZULU_1,
})
```

### Restrict notice

Vanilla `SetRestrictNotice`, soldiers only, plus an optional
`ignorePlayer`.

| Field | Required | Purpose |
|---|---|---|
| `enabled` | Yes (vanilla) | Leave the Command Post's alerts. |
| `ignorePlayer` | No (`false`) | Never spots the player. |

```lua
GameObject.SendCommand(soldierId, {
  id           = "SetRestrictNotice",
  enabled      = true,
  ignorePlayer = true,
})
```

### Notice

The soldier reacts as if he saw or heard something.

| Field | Required | Purpose |
|---|---|---|
| `kind` | Yes | A [`V_NoticeKind`](#notice-kinds). |
| `targetId` | One of the two | The game object he notices. |
| `pos` | One of the two | A spot he notices, `{x, y, z}`. |

```lua
GameObject.SendCommand(soldierId, { id = "AddNotice", kind = V_NoticeKind.CALLED_OVER, targetId = otherSoldierId })
GameObject.SendCommand(soldierId, { id = "AddNotice", kind = V_NoticeKind.HEARD_NOISE, pos = { -1820.5, 351.2, -310.0 } })
```

### Radio the CP

The soldier radios his Command Post, even while held up or in CQC.

| Field | Required | Purpose |
|---|---|---|
| `label` | Yes | What he says, a CP radio label from `CpRadioSeqCommon.spch` (or your own speech data). |
| `reply` | No (none) | What CP says back once he's been heard. |

```lua
GameObject.SendCommand(soldierId, { id = "LieToRadio", label = "CPR0320ENE", reply = "CPR0321CP" })
```

As with the vanilla `CallRadio`, the CP acts on what a label means (e.g. `CPR0080` makes it stand down).
Handle what happens next in the vanilla `RadioEnd` message.

### Ignore vehicle

The soldier ignores vehicles and won't dodge them.

| Command | Field | Purpose |
|---|---|---|
| `SetIgnoreVehicle` | `enabled` | Whether the soldier ignores vehicles. |

```lua
GameObject.SendCommand(soldierId, {
  id      = "SetIgnoreVehicle",
  enabled = true,
})
```

### Faction

Soldiers in different factions fight each other (still needs work).

| Field | Required | Purpose |
|---|---|---|
| `name` | Yes | Faction name, any string. `""` removes him from his faction. |

```lua
GameObject.SendCommand(soldierId1, { id = "SetFaction", name = "XOF" })
GameObject.SendCommand(soldierId2, { id = "SetFaction", name = "XOF" })
```

### Voice pitch

| Command | Fields | Purpose |
|---|---|---|
| `SetVoicePitch` | `pitch` | Voice pitch in cents. `TppSoldier2` and `TppCommandPost2` only. |

```lua
GameObject.SendCommand(soldierGameObjectId, { id = "SetVoicePitch", pitch = 300 })
```

### VIP soldiers

| Command | Fields | Purpose |
|---|---|---|
| `SetVIPImportant` | `isOfficer`, optional `deadBodyLabel` | Adds VIP sleep, faint, holdup, and radio handling. |
| `RemoveVIPImportant` | - | Removes one VIP override. |

```lua
GameObject.SendCommand(soldierId, {
  id = "SetVIPImportant",
  isOfficer = true,
  deadBodyLabel = "speech_dead_body_found",
})
```

### Staff name

Shows the soldier's name on his head-mark instead of the distance, like a friendly soldier. Only the head-mark changes; his real staff name stays.

| Field | Required | Purpose |
|---|---|---|
| `enable` | Yes | `true` shows the name, `false` shows the distance again. |
| `showOnNeutralized` | No (`false`) | Keep the name while he is asleep, fainted or dying. |
| `langId` | No (his name) | Show this lang text instead. |

```lua
GameObject.SendCommand(soldierId, { id = "ShowStaffName", enable = true, langId = "ene_commander" })
```

### Interrogation voice

Vanilla `AssignInterrogationWithVoice`, plus an optional
`soundDialogueEvent` that replaces the interrogation voice (per Command
Post).

| Field | Required | Purpose |
|---|---|---|
| `soundParameterId` | Yes (vanilla) | Voice entry in `mvars.uniqueInterTable.unique`. |
| `index` | Yes (vanilla) | Voice index: `0`, or table position `+ 64`. |
| `soundDialogueEvent` | No (`DD_vox_ene`) | Wwise event name or FNV1-32 hash. |
| `soundDialogueEventMarker` | No (vanilla) | Same, for answers that mark a spot on the map. |

```lua
GameObject.SendCommand(cpId, {
  id                 = "AssignInterrogationWithVoice",
  soundParameterId   = soundParameterId,
  index              = index,
  soundDialogueEvent = "your_wwise_event",
})
```

---

## Command Posts

### Caution phase

| Command | Fields | Returns |
|---|---|---|
| `SetCautionPhaseDuration` | `duration` | - |
| `GetCautionPhaseDuration` | - | seconds (the game's own length when not set) |
| `UnsetCautionPhaseDuration` | - | - |
| `GetCautionPhaseRemaining` | - | seconds, `-1` when not in caution (one CP only) |

```lua
GameObject.SendCommand(
  GameObject.GetGameObjectId("afgh_enemyBase_cp"),
  {
    id = "SetCautionPhaseDuration",
    duration = 99,
  }
)
```

> Target a specific Command Post ID or `{ type = "TppCommandPost2" }`
> for all CPs.
{:.tip}

### Friendly fire

Lets soldiers damage each other. Off by default.

| Command | Field | Returns |
|---|---|---|
| `SetFriendlyFire` | `enable` | - |
| `IsFriendlyFire` | - | `1` or `0` |

> **This is global, not per-post.**
{:.important}

```lua
GameObject.SendCommand(
  { type = "TppCommandPost2" },
  { id = "SetFriendlyFire", enable = true })
```

---

## Hostages

| Command | Fields | Purpose |
|---|---|---|
| `SetLostHostage` | `hostageType`, optional `customLostLabel`, `customLostLabelTaken` | Registers a lost hostage. |
| `RemoveLostHostage` | - | Removes one hostage. |
| `GetHostageGender` | - | Returns the hostage's type, or `nil` if it cannot be read. |

Hostage types:

```text
0 = male
1 = female
2 = child
```

| You register | Reported as escaped | Reported as taken |
|---|---|---|
| both labels | `customLostLabel` | `customLostLabelTaken` |
| only `customLostLabel` | that label | that same label |
| neither | default line for the gender | default line for the gender |

### Struggle

The hostage struggles against the restraints: the start, then a loop until you
stop it, then the end before the hostage goes back to normal. Regular adult
hostages only (`TppHostage2`).

| Field | Required | Purpose |
|---|---|---|
| `struggle` | Yes | `true` starts struggling, `false` stops. |
| `ever` | No (`false`) | Keep struggling after being carried or hurt. |

```lua
GameObject.SendCommand(hostageId, { id = "SetForceStruggle", struggle = true, ever = true })
```

---

## Head-mark colours

Colours one entity's HUD head-mark per marker state; up to six colours
cycle. Works on any locator with a `HeadMark`.

| Command | Fields | Purpose |
|---|---|---|
| `SetHeadMarkColor` | `state`, `color` ... `color6`, `speed`, `blend`, `fade` | Colors or animates one entity's head-mark for one marker state. |

| `state` | Vanilla colour |
|---|---|
| `"neutral"` | `cmn-col-marker-neutral` |
| `"alive"` / `"enemy"` | `cmn-col-marker-enemy` |
| `"friendly"` / `"friend"` | `cmn-col-marker-friend` |
| `"powerless"` | `cmn-col-marker-powerless` |
| `"dying"` | none - V Framework adds this state |

### Colour values

`color` through `color6` each accept:

| Form | Example |
|---|---|
| Palette name | `"cmn-col-marker-friend"` |
| RGB table, `0-1` or `0-255` | `{ r = 255, g = 0, b = 0 }` |

```lua
GameObject.SendCommand(
  GameObject.GetGameObjectId("sol_enemyBase_0000"),
  {
    id = "SetHeadMarkColor",
    state = "dying",
    color = { r = 255, g = 0, b = 0 },
  }
)
```

### Animation

All optional.

| Field | Default | Purpose |
|---|---|---|
| `speed` | `1.0` | Cycles per second. |
| `blend` | `true` | Fade between colours; `false` switches. |

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

```lua
-- hard blink between two palette colours
GameObject.SendCommand(soldierId, {
  id     = "SetHeadMarkColor",
  state  = "alive",
  color  = "cmn-col-marker-enemy",
  color2 = "cmn-col-marker-powerless",
  speed  = 4.0,
})
```

### Fading between states

All optional.

| Field | Default | Purpose |
|---|---|---|
| `fade` | `0` (instant) | Seconds to fade into this state's colour. |

```lua
-- alive -> dying eases over half a second instead of snapping
GameObject.SendCommand(soldierId, {
  id    = "SetHeadMarkColor",
  state = "dying",
  color = { r = 255, g = 0, b = 0 },
  fade  = 0.5,
})
```

### Clearing

```lua
-- clear one state
GameObject.SendCommand(soldierId, { id = "SetHeadMarkColor", state = "dying" })

-- clear every state for this gameObjectId
GameObject.SendCommand(soldierId, { id = "SetHeadMarkColor" })
```

---

## Sahelanthropus commands

Use this target:

```lua
{ type = "TppSahelan2", group = 0, index = 0 }
```

| Command | Fields | Returns | Purpose |
|---|---|---|---|
| `SetSahelanPhase` | `phase` | - | Forces an AI phase. |
| `GetSahelanPhase` | - | number | Returns the current phase. |
| `SetSahelanFova` | `fv2` | - | Gives Sahelanthropus a custom `.fv2` look. |
| `SetEyeLampColor` | `color`, optional `phase` | - | Sets eye-lamp color. |
| `SetEyeLampDisco` | `enabled`, `speed`, optional `a` | - | Enables eye color cycling. |
| `SetHeartLightColor` | `color`, optional `phase` | - | Sets heart-light color. |
| `SetHeartLightDisco` | `enabled`, `speed`, optional `a` | - | Enables heart color cycling. |

> `phase = -1` applies a light override to every phase.
{:.tip}

```lua
GameObject.SendCommand(sahelanId, {
  id = "SetEyeLampColor",
  phase = -1,
  color = { r = 255, g = 0, b = 0, a = 255 },
})
```

Colors accept `0-1` normalized values or `0-255` byte values.

---

# Messages

Extra messages you can handle like vanilla ones. Each heading is the
message class to use in `Messages()`. See the [Messages guide](/Messages).

## GameObject messages

| Message | Parameters | Fires when |
|---|---|---|
| `AntiAir` | `cpId, isEnable` | A CP notices the support helicopter. |
| `HoldupCancelLookToPlayer` | `gameObjectId` | The player aims at a soldier about to cancel a holdup. |
| `NoticeNoise` | `gameObjectId` | A soldier notices a noise. |
| `NoticeIndis` | `gameObjectId` | A soldier notices something related to the player. |
| `AnimalNotice` | `gameObjectId, noticeKind` | A herbivore, wolf or bear notices something. |
| `RequestedHeliTaxi` | `heliId, currentLzHash, destinationLzHash` | A Taxi destination is requested. Answer it with a [route](#taxi-routes). |
| `ClipEvent` | `eventName, clip, gameObjectId` | An `AddClipEvent` event fires on Snake's or his gun's clip. `eventName` and `clip` are as you passed them. |

`NoticeNoise` and `NoticeIndis` are soldiers only. `noticeKind`:

| Value | Kind | Meaning |
|---|---|---|
| `0` | `NearThreat` | Herbivore: something came too close. |
| `1` | `NoiseAlert` | Herbivore: startled by a noise. |
| `2` | `NearGameObject` | Wolf or bear: sighted a creature, player, or vehicle. |
| `3` | `Noise` | Wolf or bear: heard a noise. |

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
| `ItemSelected` | `item, heldSoldierId` | A call menu option is picked. `item`: a `V_CallMenuItem`, the option's `message`, or its id. `heldSoldierId`: `GameObject.NULL_ID` when holding no one. |

---

## Throwing messages

| Message | Parameters | Fires when |
|---|---|---|
| `OnThrow` | `handle, equipId, owner` | An item is thrown. |
| `OnActivateThrowing` | `handle, equipId, owner` | A thrown item goes off. |
| `OnRemoveThrowing` | `handle, equipId, owner` | A thrown item is gone. |
| `OnBounceThrowing` | `handle, equipId, owner` | A thrown item hits a surface while moving. |
| `OnStopThrowing` | `handle, equipId, owner` | A thrown item comes to rest. |

`handle` works with the [Throwing](#throwing) functions; get the position with `V_ThrowingSystem.GetPosition(handle)`.
`equipId` is always the real `TppEquip.EQP_SWP_*` value.

---

## Mission messages

| Message | Parameters | Fires when |
|---|---|---|
| `MissionStateReset` | `missionCode` | When a mission ends, before the next mission's `OnAllocate`. |

---

## Radio messages

| Message | Parameters | Fires when |
|---|---|---|
| `HeliStart` | `label1, label2, voiceType` | Pequod begins a voice or radio line. |
| `HeliFinish` | `label1, label2, voiceType` | Pequod finishes the line. |

---

## UI messages

| Message | Parameters | Fires when |
|---|---|---|
| `TimeCigaretteUi` | `playerIndex, isShown` | The Phantom Cigar time-skip overlay is shown (`isShown` = 1) or hidden (`isShown` = 0). |
| `StartWalkMan` | `trackId, isStartByUser` | A cassette tape starts playing (fresh play or resume). |
| `StopWalkMan` | `trackId, isStopByUser` | Cassette playback stops. |
| `PauseWalkMan` | `trackId, isPauseByUser` | Cassette playback is paused. |
| `SpeakerWalkMan` | `trackId, isEnable, isOnByUser` | The walkman speaker mode is toggled (`isEnable` = the mode being switched to). |

`trackId` is the `GetTapeTrackId` value. `is*ByUser` is `1` from the
walkman UI, `0` from a `V_CassetteCommand` call.

---

## Subtitles messages

| Message | Parameters | Fires when |
|---|---|---|
| `SubtitlesEventMessage` | `message` | A `.subp` subtitle uses `[m=myMessage]`. |

`message` is the `StrCode32` hash of the name inside the `[m=...]` tag.

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework UI](/V_Framework_UI)
  - [V Framework Custom Weapons](/V_Framework_Custom_Weapons)
  - [V Framework Custom Outfits](/V_Framework_Custom_Outfits)
  - [V Framework Buddy Outfits](/V_Framework_Buddy_Outfits)
