---
title: V Framework Lua API
permalink: /V_Framework_Lua_API/
tags: [Lua, Reference, Infinite Heaven, V Framework]
---

## About this reference

[V Framework](/V_Framework) loads as an [Infinite
Heaven](/Infinite_Heaven) module. Its libraries become global Lua tables
available to mission modules and other loaded scripts.

```lua
V_TppUiCommand.SetEmergencyMissionPopup(
  "Emergency!",
  "Mother Base is under attack!"
)

V_TppUiCommand.SetMissionEmergency(10070, true)
```

Mission-specific overrides reset when the mission reloads. Most
libraries also provide explicit `Clear*`, `Unset*`, or reset functions.

Soldiers and hostages may usually be referenced by name or
`gameObjectId`.

This page has three parts: [Lua libraries](#lua-libraries),
[SendCommand](#sendcommand) and [Messages](#messages).

| Namespace | Documented in |
|---|---|
| `V_FrameWork` | [Core](#core) |
| `V_Fox` | [Core](#core) |
| `V_Pickable` | [Pickable](#pickable) |
| `V_TppCollection` | [Collectibles](#collectibles) |
| `V_Player` | [Player](#player) |
| `V_TppEquip` | [Equipment](#equipment) |
| `V_TppMotherBaseManagement` | [Mother Base Management](#mother-base-management) |
| `V_TppSoundDaemon` | [Sound](#sound) |
| `V_CassetteCommand` | [Cassette](#cassette) |
| `V_TppUiCommand` | [UI](#ui) |
| `V_Helicopter` | [Helicopter](#helicopter) |
| `V_Sahelan` | [Sahelanthropus](#sahelanthropus) |
| `V_TppGameObject` | [Game Over types](#game-over-types) |
| `V_TppMbDev` | [Outfit Develop groups](#outfit-develop-groups) |
| `V_PlayerCqcStance` | [Player stances](#player-stances) |
| `V_TppDataBase` | [DATABASE tabs](#database-tabs) |
| `V_TppCallSign` | [Radio call signs](#radio-call-signs) |

---

# Lua libraries

## Core

| Function | Description |
|---|---|
| `V_FrameWork.Log(msg)` | Writes to the V Framework log and visible console. |
| `V_Fox.FNVHash32(name)` | Returns the FNVHash32 of a Wwise event name. |
| `V_Fox.ShowConsole(enabled)` | Shows or hides the log console. |

---

## Pickable

Live editing of pickables placed in the stage (weapons, items and
supplies lying in the world). Address a pickable either by its locator
index (`TppPickable.GetLocatorIndex`) or directly by its stage locator
name.

| Function | Description |
|---|---|
| `V_Pickable.SetCountRawByLocatorIndex(index, count)` | Sets a pickable's contained count/ammo (0-4095). |
| `V_Pickable.GetCountRawByLocatorIndex(index)` | Returns the live count, or `nil`. |
| `V_Pickable.SetCountRawByLocatorName(name, count)` | Same, addressed by locator name. |
| `V_Pickable.GetCountRawByLocatorName(name)` | Same, addressed by locator name. |
| `V_Pickable.SetEquipIdByLocatorIndex(index, equipId)` | Changes which equip the pickable grants (0-2047). |
| `V_Pickable.GetEquipIdByLocatorIndex(index)` | Returns the pickable's equip id, or `nil`. |
| `V_Pickable.SetEquipIdByLocatorName(name, equipId)` | Same, addressed by locator name. |
| `V_Pickable.GetEquipIdByLocatorName(name)` | Same, addressed by locator name. |
| `V_Pickable.SetInfoByLocatorIndex(index, info)` | Sets any subset of pickable fields from a table. |
| `V_Pickable.SetInfoByLocatorName(name, info)` | Same, addressed by locator name. |
| `V_Pickable.GetInfoByLocatorIndex(index)` | Returns the full info table, or `nil`. |
| `V_Pickable.GetInfoByLocatorName(name)` | Same, addressed by locator name. |

Keys of the `info` table (every key is optional in setters; getters
return them all plus `locatorIndex`):

| Key | Purpose |
|---|---|
| `equipId` | Which equip the pickup grants (0-2047). |
| `countRaw` | Contained count/ammo added to the player's stock (0-4095). |
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
value. Ammo boxes do not use `countRaw` as a quantity - leave those
untouched.

---

## Collectibles

World collectibles - the plants, diamonds, and emblems lying around a
location. Custom types can be registered and placed anywhere.

| Function | Description |
|---|---|
| `V_TppCollection.RegisterCollectionType(name, spec)` | Registers a custom type. Returns its numeric id. |
| `V_TppCollection.AddCollection(name, type, x, y, z [, rotY])` | Places one in the world, (can be done in `.fox2`, not tested). |
| `V_TppCollection.RemoveCollection(name)` | Removes a placement. |
| `V_TppCollection.SetCollectionTypeIcon(type, ftexPath)` | Sets the pickup icon. |
| `V_TppCollection.SetCollectionTypeLangId(type, langId)` | Sets the display name from a `.lng2` entry. |

Setters take either the type name or its numeric id. Registering also
publishes the id as `TppCollection.<name>`, which is how you compare it
later.

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

| Key | Purpose |
|---|---|
| `Model` | Mesh to draw. Required. |
| `Color` | Pickup-burst colour, `a` being its alpha. |
| `Strength` | Pickup-burst size and spread. Zeroed lanes collapse the effect. |
| `Yoffset` | Height of the burst above the item, in metres. |
| `GroundEffectSize` | Size of the scorch decal beneath it. |
| `RootModel` | Mesh left behind after picking. |
| `Fova` | - |
| `IsHerb`, `IsMaterial`, `IsDiamond` | For `TppCollection.Is*ByType`. |

---

## Player

### Voice overrides

| Function | Description |
|---|---|
| `V_Player.SetPlayerVoiceFpkPathForType(playerType, fpkPath)` | Loads a custom voice package for a player type. |
| `V_Player.ClearPlayerVoiceFpkPathForType(playerType)` | Restores one player type's vanilla voice package. |
| `V_Player.ClearAllPlayerVoiceFpkOverrides()` | Restores all vanilla player voices. |
| `V_Player.SetPlayerVoiceTypeForType(playerType, voiceType)` | Forces the voice a player type speaks with. `voiceType` is a name such as `"ddmsoldiera"` or its number. |
| `V_Player.ClearPlayerVoiceTypeForType(playerType)` | Restores one player type's normal voice. |
| `V_Player.ClearAllPlayerVoiceTypeOverrides()` | Restores all normal player voices. |

The package and the voice type have to agree, or the package loads
silent. The voice type names and numbers, and the per-voice `voiceFpk`
table, are covered under
[Outfit voice](/V_Framework_Custom_Outfits#outfit-voice).

### Energy Wall

| Function | Returns | Description |
|---|---|---|
| `V_Player.IsBarrierActive()` | `true` / `false` | Whether the player's Energy Wall shield is currently deployed. |

### CQC

| Function | Description |
|---|---|
| `V_Player.RequestToSetTargetCqcStance(stance)` | Changes the player's stance to `V_PlayerCqcStance.STAND` or `V_PlayerCqcStance.SQUAT` during CQC hold. |

#### Quiet's CQC

In the vanilla game, Quiet can't hold enemies with CQC nor interrogate
them. These two functions enable that and they can also be toggled via
IH in V Framework menu.

| Function | Description |
|---|---|
| `V_Player.SetQuietHoldCqc(enable)` | Enables Quiet take an enemy into a CQC hold/choke. |
| `V_Player.SetQuietInterrogate(enable)` | Enables Quiet to interrogate enemies. |

```lua
V_Player.SetQuietHoldCqc(true)
V_Player.SetQuietInterrogate(true)
```

> **These never apply in FOB.**
{:.note}

### Demo attachment

Rides the player on another game object's connect point for the duration
of a demo.

| Function | Description |
|---|---|
| `V_Player.RequestToAttachInDemo(info)` | Attaches the player to a connect point. Returns `true` on success. |

| Key | Required | Purpose |
|---|---:|---|
| `ownerId` | Yes | The object to ride, as a locator name or a `gameObjectId`. |
| `connectPoint` | Yes | Connect-point name on that object. |
| `unattachOnSleep` | No | Detaches when the owner sleeps. Defaults to `true`. |

```lua
V_Player.RequestToAttachInDemo{ ownerId = GetGameObjectId"Cargo_Truck_WEST_001", connectPoint = "CNP_DECK_A", unattachOnSleep = false }
```

### Space check

| Function | Returns | Description |
|---|---|---|
| `V_Player.IsThereEnoughSpaceAroundPlayer(minX, maxX, minZ, maxZ)` | `true` / `false` | Whether the given rectangle is clear of world collision. `X` is right (+) / left (-), `Z` is forward (+) / back (-). |

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
| `V_Player.GetOutfitInfo(key)` | `partsType, selectorCode, developId`, or `false` | Reads back the ids assigned to an outfit you registered. |

`key` is the same string you passed to `RegisterOutfit`, either
positionally or as `{ key = "..." }`. An unknown key returns `false`.

```lua
local partsType, selectorCode, developId = V_Player.GetOutfitInfo("MyOutfit")
```

---

## Equipment

See [V Framework Custom Weapons](/V_Framework_Custom_Weapons) for the
complete weapon-building guide.

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

Malformed rows are skipped. Valid custom rows are reapplied after the
game reloads its equip table.

Only weapons may use the `EQP_WP_` name prefix - the allocator routes
those names into the equip table's weapon id band. The per-boot log line
`[EquipIdCompression] native occupancy: item band N free of 559, weapon
band N free of 89` shows the shared budget all installed mods draw from.

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

`SetOption` also carries the laser's colour and appearance -
`laserColor` plus the `laser*` tuning fields. See
[Custom Weapons](V_Framework_Custom_Weapons).
| `DeclareDamages` | `TppDamage.ATK_*` | `SetDamage` |

Each of these reserves a real part slot in the engine's parameter
tables, which is what lets a custom part behave differently from every
vanilla one.

#### Other constant spaces

These declare into the remaining spaces. They take the same argument
shape - a table of name strings - and publish under `TppEquip` the same
way:

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
| `DeclareBLAs` | `BLA_*` | `SetBullet` -> `blastId` |
| `DeclareMZs` | `MZ_*` | `SetGunBasic` -> `muzzleId` |
| `DeclareCasings` | `CASING_*` | - |
| `DeclareWeaponPaints` | `WEAPON_PAINT_*` | - |
| `DeclareSWPs` | `SWP_*` | - |
| `DeclareSWPTypes` | `SWP_TYPE_*` | - |

### Receiver sound (`receiverParamSetsSound`)

`SetReceiver`'s `receiverParamSetsSound` accepts a root string, a
vanilla row index, or a table `{ name, middle, event, sup, supEvent }` -
`sup` (a root) and `supEvent` (an exact event name) pick the
**suppressed**-shot sound independently of the loud one. See [Fire
sound](/V_Framework_Custom_Weapons#fire-sound-receiverparamsetssound)
for every form.

### Cross-family handling

| Function | Description |
|---|---|
| `V_TppEquip.SetWeaponHandling{equipId, familyFrom}` | Makes a custom weapon hold, aim, and reload like the vanilla weapon `familyFrom` while keeping its own model, bullet, damage, and menu category. |

Unusable donors are refused and no mapping is registered; in a release
build that refusal is silent. See [Cross-family
handling](/V_Framework_Custom_Weapons#cross-family-handling-setweaponhandling)
for the full description.

### Receiver motion

| Function | Description |
|---|---|
| `V_TppEquip.SetReceiverMotion{receiverId, playerMotion, weaponMotion, partMotion}` | Gives a custom receiver its own hand clips, gun clips and per-shot slide, bolt and hammer rows instead of borrowing from a vanilla weapon. |

Every field is documented in [Custom gun
motion](/V_Framework_Custom_Weapons#custom-gun-motion-setreceivermotion).

### Remote-controlled missile

| Function | Returns | Description |
|---|---|---|
| `V_TppEquip.SetRemoteMissile{receiverId \| equipId, ...}` | - | Makes a weapon's shell steerable like a rocket arm. |
| `V_TppEquip.AbortRemoteMissile()` | - | Ends the current flight and gives the camera back. |
| `V_TppEquip.IsRemoteMissileFlying()` | `boolean` | Whether a steerable missile is in the air. |

Only `equipId`/`receiverId  ` is required.

---

## Mother Base Management

Every function in this section belongs to `V_TppMotherBaseManagement`.

| Function | Description |
|---|---|
| `V_TppMotherBaseManagement.AddToChangeLocationMenu(def)` | Adds a location to the ACC free-roam list. |
| `V_TppMotherBaseManagement.AddPhotoAdditionalText(rows)` | Adds text to VI photos. |

### ACC change-location menu

`AddToChangeLocationMenu` takes a plain array of numeric location codes;
each one becomes an entry in the ACC change-location menu:

```lua
V_TppMotherBaseManagement.AddToChangeLocationMenu{
  40,   -- Gntn
}
```

### VI photo text

`AddPhotoAdditionalText` takes an array of row tables. `missionCode`,
`photoId`, and `photoType` are required numbers - a row missing any of
them is skipped. `targetTypeLangId` is the language-entry name of the
text shown on the photo:

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

`developId` and `flowIndex` are allocated automatically from the record
key. Do not supply them manually.

Readable names and raw `pNN` names are both accepted.

#### Important `const` fields

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

#### `bluePrintId` forms

```lua
-- Always visible
bluePrintId = 65535

-- Live condition
bluePrintId = function()
  return TppStory.IsMissionCleard(10080)
end

-- Real vanilla blueprint/design
bluePrintId = TppMotherBaseManagementConst.DESIGN_2001

-- Custom blueprint, by key or by id - both are equivalent
bluePrintId = "MyMod_AK50"
bluePrintId = TppMotherBaseManagementConst.MyMod_AK50
```

Function predicates are checked whenever the R&D menu builds, allowing
rows to appear or disappear during the session.

#### Important `flow` fields

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

The framework automatically repairs invalid grade and side-branch
collisions and writes a warning to the log.

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

`SetEquipDevelopVisible` can reveal a hidden item immediately. Revealing
an item still marked `NEW` also triggers its requirements-met
announcement.

### DataBase entries

A DataBase entry is the slot the iDroid DATABASE is built out of. The
game uses one kind for all of it - blueprints, key items, photos,
animals, posters, codenames and medicinal plants are the same thing with
a different category.

| Function | Description |
|---|---|
| `RegisterDataBase(key)` | Allocates a DataBase entry and returns its numeric id. |
| `SetBluePrint(keyOrId, owned)` | Marks it obtained (`true`) or not obtained (`false`). |
| `HasBluePrint(keyOrId)` | Returns whether the player has obtained it. |
| `GetBluePrintId(keyOrId)` | Returns the numeric id, or `nil`. |
| `SetDataBaseDisplay(table)` | Gives it a row in the iDroid DATABASE. See [below](#the-idroid-database-entry). |

> Registering gives an entry an identity, a row and an obtained flag. It
> does not make the entry *behave* like its category - that part is
> always yours to add
{:.note}

Registering also publishes the id as a constant under both
`TppMotherBaseManagementConst` and `V_TppMotherBaseManagement`, provided
the key is a valid Lua identifier - so `MyMod_AK50` over `MyMod:AK50` if
you want `TppMotherBaseManagementConst.MyMod_AK50` to exist.

#### The iDroid DATABASE entry

A registered entry gets no DATABASE row of its own until you describe
it. `SetDataBaseDisplay` supplies the row's name, icons, description and
tab.

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

| Field | Purpose |
|---|---|
| `dataBaseId` | The id from `RegisterDataBase`. `key` is accepted instead. |
| `langDocName` | Lang id for the list-row name. |
| `docIcon` | Texture path for the **small** list-row icon. |
| `docImage` | Texture path for the **large** detail image. Falls back to `docIcon`. |
| `langDocInfo` | Lang id for the description in the detail panel. |
| `tab` | Which DATABASE tab lists the row. Defaults to Blueprints. |

#### Choosing a tab

`tab` takes any value in [`V_TppDataBase`](#database-tabs). The game
builds a list for seven of the nine categories; the other two are
rejected with a log rather than accepted into a row that could never
appear.

The tabs are split across two screens:

| Screen | Tabs, in on-screen order |
|---|---|
| ENCYCLOPEDIA | `TAB_ANIMAL`, `TAB_MEDICINAL_PLANTS`, `TAB_CODENAMES` |
| DOCUMENTATION | `TAB_BLUEPRINT`, `TAB_KEY_ITEM`, `TAB_POSTERS`, `TAB_PHOTO` |

### Unique staff

A unique staff record is one named, hand-authored Mother Base staffer.
Ocelot, Miller, Code Talker and the special soldiers are all vanilla
examples. Registering one gives it a name, a face, a skill and six
section-point values. Putting it on a soldier or hostage in a mission is
a separate step, covered [below](#placing-the-staff-in-a-mission).

| Function | Description |
|---|---|
| `RegisterUniqueStaff(def)` | Registers a staffer under a string key and returns its allocated `uniqueTypeId`. |
| `GetUniqueStaffTypeId(key)` | Returns the id allocated to a key, or `nil` if that key was never registered. |

Vanilla `TppMotherBaseManagement.RegisterUniqueStaff` takes a
`uniqueTypeId` number you pick yourself, nothing detects a clash, and
two mods that pick the same number silently overwrite one another. V
Framework takes a `key` instead and allocates the number:

```lua
local id = V_TppMotherBaseManagement.RegisterUniqueStaff{
  key = "MyMod.Medic13106",
  -- ...
}
```

#### Required fields

The game discards a unique staff record that is missing any one of these
- no error, no log, the staff simply never exists. V Framework checks
them first and logs the field that is missing or has the wrong type.

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

`nameLangMessageId` must name an entry in your lang files. Unique staff
have no generated fallback name, so a missing entry shows as blank.

These are optional:

| Field | Purpose |
|---|---|
| `faceId` | Omitting it does not randomise - the default decodes to face index 0, so every staffer without one shares a face. |
| `faceIdForNoFultonStaff` | Face used when the staff is not fultoned. |
| `skill` | Skill name, e.g. `"Surgeon"`. This is what the iDroid mission list shows under OBTAINABLE SKILLS/BLUEPRINTS. |
| `missionId` | Advertises the staff on that mission's list entry. Read only by that panel - it does not place anyone. |
| `deployMissionId` | Combat Deployment equivalent. |

```lua
V_TppMotherBaseManagement.RegisterUniqueStaff{
  key                 = "MyMod.Medic13106",
  missionId           = 13106,
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

Registering creates the record. It does not put anyone in a mission -
that is a separate step in the mission's own scripts, outside V
Framework. What V Framework gives you is the id to hand to it:

```lua
local id = V_TppMotherBaseManagement.GetUniqueStaffTypeId("MyMod.Medic13106")
```

Returns `nil` if the key was never registered, so check it before use.

---

## Sound

| Function | Description |
|---|---|
| `V_TppSoundDaemon.SetGameOverMusic(enabled, type, playEvent, stopEvent)` | Replaces Game Over music with Wwise events. |
| `V_TppSoundDaemon.SetMissionPreparationMusic(playEvent, stopEvent, missionCode)` | Replaces Sortie Prep music with Wwise events. |

### SetMissionPreparationMusic

```lua
V_TppSoundDaemon.SetMissionPreparationMusic("Play_bgm_my_track", "Stop_bgm_my_track")
```

| Parameter | Required | Purpose |
|---|---:|---|
| `playEvent` | Yes | Wwise event that starts the track. Event name or hash. |
| `stopEvent` | Yes | Wwise event that stops it. Event name or hash. |
| `missionCode` | No | Applies only to that mission. Omitted or `0` applies to every sortie. |

The function returns `true` on success. Both events are required, since
the stop event is what silences the track when the player leaves the
screen.

A mission code takes priority over the mission-independent setting:

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

The function returns `true` on success. Invalid album or track entries
are skipped.

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
| `SetLoadingSplashMainTexturePath(path, missionCode)` | Sets the main loading image. |
| `SetLoadingSplashBlurTexturePath(path, missionCode)` | Sets the blurred loading image. |
| `ClearLoadingSplashTextures(missionCode)` | Restores the loading textures. |
| `SetMissionTelopSplashTexturePath(path, missionCode)` | Sets the Mission Telop texture. Returns a boolean: `false` means `path` was empty and nothing was set. |
| `UnsetMissionTelopSplashTexturePath(missionCode)` | Restores the Mission Telop texture. |
| `SetGameOverSplashMainTexturePath(path, missionCode)` | Sets the main Game Over image. |
| `SetGameOverSplashBlurTexturePath(path, missionCode)` | Sets the blurred Game Over image. |
| `ClearGameOverSplashTextures(missionCode)` | Restores the Game Over textures. |

`missionCode` is optional on every function above, but it does not mean
the same thing to a setter as it does to a clear.

**Setting.** Omit it, or pass `0`, and you set the **global default**.
That is a fallback, not a blanket: a mission that has its own entry keeps
using that entry, because a per-mission texture always wins over the
global one. Pass a mission code to set that mission's entry.

**Clearing.** Omit it, or pass `0`, and `ClearLoadingSplashTextures`,
`ClearGameOverSplashTextures` and `UnsetMissionTelopSplashTexturePath`
drop the global default **and every per-mission entry** with it. Pass a
mission code to clear only that mission and leave the rest standing.

A path is hashed as given. The Mission Telop path has `.ftex` appended
when it does not already end in it; the loading and Game Over paths do
not, so pass those exactly as the asset is named.

### Equipment icons

| Function | Description |
|---|---|
| `SetEquipIconFtexPath(equipId, path)` | Replaces one equipment icon. |
| `ClearIconFtexPath(equipId)` | Restores one icon. |
| `ClearAllIconFtexPaths()` | Restores all icons. |

### Equipment names

| Function | Description |
|---|---|
| `SetEquipLangInfo(def)` | Sets the displayed name and description for one equip id. |

Custom equip ids have no row in the game's name data and otherwise
render blank. This is the pickup/HUD/equip-list name path - the R&D
develop row takes its label from the develop record instead.

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

Add a custom warning line to a mission in the iDroid mission list, keyed
by mission code. Both are addressed by the numeric mission code, take a
lang-id key whose text you supply in your own lang file, and take an
optional color-name string.

| Function | Description |
|---|---|
| `SetMissionAcceptWarning(missionCode, langId, color)` | Red warning line in the **"Accept this mission?"** deploy-confirm popup. |
| `SetMissionMenuHelp(missionCode, langId, color)` | The Yellow help/caution line at the **bottom of the mission list**. |
| `ClearMissionMenuHelp(missionCode)` | Removes the help override for one mission. |

> Leaving the `color` param nil will make it use the default color. The
> Warning will be Red, and Help Yellow
{:.tip}

```lua
-- red accept-popup warning, in a custom color
V_TppUiCommand.SetMissionAcceptWarning(13006, "MustOwnRockets", "cmn-col-ng")

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

### Radio call signs

For `callSign` in the [Radio call sign](#radio-call-sign) command.

Call signs live in the `V_TppCallSign` table, for example
`V_TppCallSign.ZULU_1`. Valid call signs are `1` to `13`.

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

The target may be a game object ID, mapped index, type target, or
Command Post. Some global commands ignore the target.

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

Soldiers only, and the target must be given as a numeric GameObjectId -
a `{ type = "TppSoldier2" }` is not accepted.

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

Gives one soldier a radio call sign, so radio chatter refers to them as
Zulu 1, Delta 6 and so on. Use the [`V_TppCallSign`](#radio-call-signs)
table rather than raw numbers.

```lua
GameObject.SendCommand(soldierId, {
  id       = "SetRadioCallSign",
  callSign = V_TppCallSign.ZULU_1,
})
```

Valid call signs are `1` to `13`.

### Restrict notice

`SetRestrictNotice` is a vanilla command. V_FrameWork adds one optional
`ignorePlayer` field and passes the vanilla field through untouched.
Soldiers only.

| Field | Owner | Purpose |
|---|---|---|
| `enabled` | vanilla | Excludes the soldier from his Command Post's notice/alert. |
| `ignorePlayer` | V_FrameWork | Never spots the player. |

```lua
GameObject.SendCommand(soldierId, {
  id           = "SetRestrictNotice",
  enabled      = true,
  ignorePlayer = true,
})
```

### Ignore vehicle

Stops one soldier reacting to vehicles. He no longer notices or takes
evasive action from them, so he will not flee an approaching vehicle.

| Command | Field | Purpose |
|---|---|---|
| `SetIgnoreVehicle` | `enabled` | Whether the soldier ignores vehicles. |

```lua
GameObject.SendCommand(soldierId, {
  id      = "SetIgnoreVehicle",
  enabled = true,
})
```

### Voice pitch

| Command | Fields | Purpose |
|---|---|---|
| `SetVoicePitch` | `pitch` | Changes one soldier's voice pitch, in cents. Sent to the soldier. |

```lua
GameObject.SendCommand(soldierGameObjectId, { id = "SetVoicePitch", pitch = 300 })
```
> `SetVoicePitch` currently only works on `TppSoldier2` and
> `TppCommandPost2`
{:.note}

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

### Interrogation voice

`AssignInterrogationWithVoice` is a vanilla command. V_FrameWork adds
one optional field, `soundDialogueEvent`, that overrides the Wwise
dialogue event played while the soldier is interrogated (vanilla plays
`DD_vox_ene`), and passes the vanilla fields through untouched.

The vanilla `soundParameterId` and `index` fields are documented for a
Command Post ID target; the worked example on this page targets a
soldier `gameObjectId`.

| Field | Owner | Purpose |
|---|---|---|
| `soundParameterId` | vanilla | Voice entry looked up in `mvars.uniqueInterTable.unique`. |
| `index` | vanilla | Voice slot: `0`, or the table position `+ 64`. |
| `soundDialogueEvent` | V_FrameWork | Wwise event that replaces the interrogation voice. Optional - omit it or set `nil` to use the vanilla `DD_vox_ene`. |

`soundDialogueEvent` accepts a Wwise event name (string) or its FNV1-32
hash (number). The override is remembered per interrogated command post,
so different soldiers can be given different voices.

```lua
GameObject.SendCommand(cpId, {
  id                 = "AssignInterrogationWithVoice",
  soundParameterId   = soundParameterId,
  index              = index,
  soundDialogueEvent = "your_wwise_event",
})
```

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

## Command Posts

### Caution phase

| Command | Fields | Returns |
|---|---|---|
| `SetCautionPhaseDuration` | `duration` | - |
| `GetCautionPhaseDuration` | - | seconds |
| `UnsetCautionPhaseDuration` | - | - |
| `GetCautionPhaseRemaining` | - | seconds |

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
| `ClearLostHostages` | - | Clears all registrations. |
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

---

## Head-mark colours

Overrides the colour of one entity's HUD head-mark, per marker state. Up
to six colours can be given, and the marker then cycles through them.

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

| Form | Example | Meaning |
|---|---|---|
| Palette name | `"cmn-col-marker-friend"` | A colour that already exists in the game's palette. |
| RGB table | `{ r = 255, g = 0, b = 0 }` | Any colour, not limited to the palette. |

> RGB values accept `0-1` normalized values or `0-255` byte values.
{:.tip}

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

Give two or more colours and the marker cycles through them.

| Field | Default | Purpose |
|---|---|---|
| `speed` | `1.0` | Full cycles per second through the whole colour ring. |
| `blend` | `true` | Fades between colours instead of switching. |

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

Set `blend = false` to switch between colours instead of fading.

### Fading between states

`fade` is how long, in seconds, the marker takes to cross to this
state's colour when the soldier enters the state. It defaults to `0`,
which changes colour instantly.

| Field | Default | Purpose |
|---|---|---|
| `fade` | `0` | Seconds spent crossing from the previous state's colour to this one. |

```lua
-- alive -> dying eases over half a second instead of snapping
GameObject.SendCommand(soldierId, {
  id    = "SetHeadMarkColor",
  state = "dying",
  color = { r = 255, g = 0, b = 0 },
  fade  = 0.5,
})
```

The fade starts from whatever colour the marker was actually showing, so
it works from a vanilla state as well as from another override, and it
picks up mid-animation colours correctly. Leaving a faded state also
fades back out to the vanilla colour.

### Clearing

```lua
-- clear one state
GameObject.SendCommand(soldierId, { id = "SetHeadMarkColor", state = "dying" })

-- clear every state for this gameObjectId
GameObject.SendCommand(soldierId, { id = "SetHeadMarkColor" })
```
> `SetHeadMarkColor` is **NOT** exclusive to `TppSoldier2` and can work
> on any locator that has a `HeadMark`.
{:.note}

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
| `SetSahelanFova` | `fv2` | - | Applies a custom FOVA. |
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

V Framework emits extra executable-to-Lua messages using the normal MGSV
message system.

See the [Messages guide](/Messages).

## GameObject messages

| Message | Parameters | Fires when |
|---|---|---|
| `AntiAir` | `cpId, isEnable` | A CP notices the support helicopter. |
| `HoldupCancelLookToPlayer` | `gameObjectId` | The player aims at a soldier about to cancel a holdup. |
| `NoticeNoise` | `gameObjectId` | A soldier notices a noise. |
| `NoticeIndis` | `gameObjectId` | A soldier notices something related to the player. |
| `AnimalNotice` | `gameObjectId, noticeKind` | Any wildlife animal notices something. |

`NoticeNoise` and `NoticeIndis` are **soldiers only** - they come from
the soldier notice AI, which animals never run. Wildlife uses a single
`AnimalNotice` message instead, covering every species through one
handler.

`noticeKind` says what the animal reacted to:

| Value | Kind | Meaning |
|---|---|---|
| `0` | `NearThreat` | Herbivore: something came too close. |
| `1` | `NoiseAlert` | Herbivore: startled by a noise. |
| `2` | `NearGameObject` | Wolf or bear: sighted a creature, player, or vehicle. |
| `3` | `Noise` | Wolf or bear: heard a noise. |

Coverage is **goats, sheep, wolves and bears**. Birds, rats and D-Dog
have no per-animal notice node and do not fire this message.

---

## Player messages

| Message | Parameters | Fires when |
|---|---|---|
| `OnPlayerLockPickStart` | `playerIndex, gimmickId, doorSide` | Lock picking starts. |
| `OnPlayerLockPickEnd` | `playerIndex, gimmickId, doorSide` | Lock picking finishes. |
| `OffBinocularsMode` | - | Binocular mode ends. |
| `CrawlSideRoll` | `playerIndex, rollPhase, rollCount, direction` | The player performs a side roll. |
| `BarrierDamage` | `playerIndex, before, after` | The Energy Wall barrier takes damage. |

---

## Mission messages

| Message | Parameters | Fires when |
|---|---|---|
| `MissionStateReset` | `missionCode` | Early in a mission, once the previous one has been torn down. |

---

## Helicopter messages

| Message | Parameters | Fires when |
|---|---|---|
| `HeliStart` | `label1, label2, voiceType` | Pequod begins a voice or radio line. |
| `HeliFinish` | `label1, label2, voiceType` | Pequod finishes the line. |
| `RequestedHeliTaxi` | `heliId, currentLzHash, destinationLzHash` | A Taxi destination is requested. |

---

## Cassette messages

| Message | Parameters | Fires when |
|---|---|---|
| `StartWalkMan` | `trackId, isStartByUser` | A cassette tape starts playing (fresh play or resume). |
| `StopWalkMan` | `trackId, isStopByUser` | Cassette playback stops. |
| `PauseWalkMan` | `trackId, isPauseByUser` | Cassette playback is paused. |
| `SpeakerWalkMan` | `trackId, isEnable, isOnByUser` | The walkman speaker mode is toggled (`isEnable` = the mode being switched to). |

`trackId` is the cassette track id (the same value
`V_CassetteCommand.GetTapeTrackId` returns). `isXByUser` is `1` when the
action came from the in-game walkman UI, and `0` when it came from a
`V_CassetteCommand` function (`PlayCassetteTapeByTrackId`,
`StopCassette`, `PauseCassette`, `ResumeCassette`,
`SetCassetteSpeakerEnabled`).

---

## UI messages

| Message | Parameters | Fires when |
|---|---|---|
| `TimeCigaretteUi` | `playerIndex, isShown` | The Phantom Cigar time-skip overlay is shown (`isShown` = 1) or hidden (`isShown` = 0). |

---

## Subtitles messages

| Message | Parameters | Fires when |
|---|---|---|
| `SubtitlesEventMessage` | `message` | A `.subp` subtitle uses `[m=myMessage]`. |

`message` is the `StrCode32` hash of the name inside the `[m=...]` tag.

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework Custom Weapons](/V_Framework_Custom_Weapons)
  - [V Framework Custom Outfits](/V_Framework_Custom_Outfits)
