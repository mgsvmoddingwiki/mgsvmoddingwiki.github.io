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
reload, so you rarely need to clean up by hand - but every library still
provides Clear*/Unset* functions if you want to. **Soldiers and
hostages** can be referenced by their **name** (e.g. "sol_enemyBase_0000") or
by their **gameObjectId**.

---

## Limits

How many custom things you can register (across **all** mods loaded together, not per-mod):

| Content | Limit | Notes |
|---|---|---|
| **Custom tapes / cassettes** | **~31,700** | Save-index range 300-32000. Effectively unlimited. |
| **R&D Develop rows** (weapons + outfits + heads, combined) | **102** | Everything registered via `AddToEquipDevelopTable` shares this pool (develop flow-index band 922-1023). This is the overall ceiling. |
| **Custom outfits/uniforms** | **64** | Also limited by the custom partsType range `0x40-0x7F`. You hit this before the 102-row pool. |
| **Variants per outfit** | **15** | Each variant needs one selector slot (see below). |
| **Head options per outfit** | **8** | - |
| **Outfit variant-selectors** | **127 total** | Shared across all outfits (`0x80-0xFE`), one per variant. |
| **Custom weapons** | remaining pool | Weapons only cost one develop row + an equipId, so they fill whatever the 102-row pool has left. |

In practice the number to watch is the **102 R&D rows**, shared by outfits, weapons, and heads together. Example: 64 outfits + 38 weapons = 102 (full), or 0 outfits + 102 weapons, etc.

---

## Lua functions


### Framework

| Function | Parameters | Description |
|---|---|---|
| V_FrameWork.Log | msg | Writes a line to the V Framework log file (and to the console, if it is shown). |

### Fox Utilities

| Function | Parameters | Description |
|---|---|---|
| V_Fox.FNVHash32 | wwiseEventName | Returns the FNVHash32 value for a Wwise event name. |
| V_Fox.SetPickableCountRawByIndex | locatorIndex, countRaw | Updates the raw count of a TppPickable locator during the current session. |
| V_Fox.GetPickableCountRawByIndex | locatorIndex | Returns the raw count of a TppPickable locator. |
| V_Fox.ShowConsole | isEnable | Shows a console window and prints Fox.Log and V_FrameWork.Log logs. |

### Player

| Function | Parameters | Description |
|---|---|---|
| V_Player.SetPlayerVoiceFpkPathForType | playerType, fpkPath | Loads a custom .fpk for the specified player type during gameplay. |
| V_Player.ClearPlayerVoiceFpkPathForType | playerType | Restores the vanilla voice .fpk for the specified player type. |
| V_Player.ClearAllPlayerVoiceFpkOverrides | - | Restores the vanilla voice .fpk for all player types. |

#### Custom Outfits

Registers custom uniforms and head options. `developId`/`flowIndex`/`partsType`/`selector`
are auto-allocated and persisted per `key` - you never pass them yourself.

| Function | Parameters | Returns | Description |
|---|---|---|---|
| V_Player.RegisterOutfit | def (table) | partsType, developId, flowIndex (or `false`) | Registers a custom uniform/outfit. |
| V_Player.RegisterHeadOption | def (table) | equipId (0 on failure) | Registers a custom head option. |

##### RegisterOutfit

**Top level**

| Field | Type | Req / Default | Description |
|---|---|---|---|
| key | string | **required** | Identity. All ids are auto-allocated + persisted under this key. |
| snake / ddMale / ddFemale / avatar | table | **>=1 required** | Per-player-type branch (see below). |

**Per-player-type branch** (inside `snake`/`ddMale`/`ddFemale`/`avatar`)

| Field | Type | Default | Description |
|---|---|---|---|
| partsPath | string `.parts` | **required** | Body parts model. Missing -> branch skipped. |
| fpkPath | string `.fpk` | **required** | Parts package. Missing -> branch skipped. |
| camoFpk | string `.fpk` / bool | **Disabled** | Camo package. |
| camoFv2 | string `.fv2` / bool | Disabled | Camo material. |
| diamondFpk | string `.fpk` / bool | **Disabled** | DD-emblem package. |
| diamondFv2 | string `.fv2` / bool | Disabled | DD-emblem material. |
| voiceFpk | string `.fpk` / bool | UseVanilla | Voice (applied per-outfit). |
| faceFpk | string `.fpk` / bool | UseVanilla | Face package. *(branch-only)* |
| skinFv2 | string `.fv2` / bool | UseVanilla | Skin material. *(branch-only)* |
| enableArm | bool | true | Bionic arm present (For Snake and Avatar only). |
| enableHead | bool | true | Keeps head. |
| displayName / displayNameHash | string / number | - | Display name (like NAKED, STANDARD, SCARF). |
| camoBonusType | number `0-116` or camo name | - | Camo profile to inherit (e.g. `"RAIDEN"` or `20`). |
| camoBonusValues | table | - | Per-material camo bonus (`["MTR_IRON_A"]=n` or `[1..82]=n`). |
| headOptions | array | - | Head options (see format below). Max 8. |
| variants | array | - | Up to 14 variant sub-tables (see below). |

**Per-variant** (entries in the `variants` array) - most variant fields are **self-owned**:
leaving one nil uses that field's **own default below**, not the branch value. The exceptions are
`partsPath`/`fpkPath` (reuse the branch model) and `enableArm`/`enableHead` (inherit the branch
toggle) - flagged as *inherits* in the Default column.

| Field | Type | Default | Description |
|---|---|---|---|
| partsPath | string `.parts` | inherits base | Variant model. Omit to reuse the branch model. |
| fpkPath | string `.fpk` | inherits base | Variant package. Omit to reuse the branch package. |
| camoFpk | string `.fpk` / bool | UseVanilla | Camo package. |
| camoFv2 | string `.fv2` / bool | Disabled | Camo material. |
| diamondFpk | string `.fpk` / bool | Disabled | Emblem package. |
| diamondFv2 | string `.fv2` / bool | Disabled | Emblem material. |
| voiceFpk | string `.fpk` / bool | UseVanilla | Voice bank. |
| displayName / displayNameHash | string / number | - | Variant display name. |
| default | bool | false | Marks this variant as the outfit's default (see below). |
| enableArm | bool | inherits branch | Bionic-arm toggle for this variant. Omit (nil) to use the branch's `enableArm`. |
| enableHead | bool | inherits branch | Keep-head toggle for this variant. Omit (nil) to use the branch's `enableHead`. |
| headOptions | array | none | Variant's own head list. Omit = **no** heads (does not inherit the branch's). |

> **`default`** - set `default = true` on one variant to make it the outfit's default.

**Sub-asset value convention** - every `*Fpk`/`*Fv2` field accepts a **string path** (must end
in the correct extension, else it is rejected), **`true`** = use vanilla, or **`false`** = disabled.

**`headOptions` entries** - each array element is one of:

* a **number** -> raw equipId
* a **vanilla alias** string (case-insensitive; `-`/`_`/spaces ignored): `none`=0x400,
  `bandana`=0x20E, `infinitebandana`=0x20F, `balaclava`=0x210, `spheadgear`=0x211,
  `hpheadgear`=0x212
* a **custom head key** string (from `RegisterHeadOption`) -> resolves to that head (deferred
  if it is not registered yet)

```lua
V_Player.RegisterOutfit({
    key = "MyMod:MySuit",
    ddMale = {
        partsPath   = "/Assets/.../body.parts",
        fpkPath     = "/Assets/.../body.fpk",
        camoFv2     = "/Assets/.../camo.fv2",
        camoFpk     = "/Assets/.../camo.fpk",
        headOptions = { "balaclava", "MyMod:MyHead" },
    },
})
```

##### RegisterHeadOption

The head's **name and icon come from `V_TppMotherBaseManagement.AddToEquipDevelopTable`**
(`p06`/`p08`) for the same `key` - not here. Order-independent with it (resolved when the
equip menu opens).

**Top level**

| Field | Type | Req / Default | Description |
|---|---|---|---|
| key | string | **required** | Head identity (also the key for its `AddToEquipDevelopTable` record). |
| snake / ddMale / ddFemale / avatar | table | - | Per-player-type branch (see below). |
| showInDevelopMenu | bool | false | Whether it lists in the R&D Develop browser. |

**Per-player-type branch** (inside `snake`/`ddMale`/`ddFemale`/`avatar`)

| Field | Type | Default | Description |
|---|---|---|---|
| TppEnemyFaceId | number | 0x22D | Soldier face the head maps to. *(ddMale/ddFemale only - Snake/Avatar never use it)* |
| fv2 | string `.fv2` | UseVanilla | Custom head fova for this player type. |
| fpk | string `.fpk` | UseVanilla | Package with the assets the fv2 references. |
| faceStages | array | - | *(snake only)* Per-demon-stage fova overrides - see below. |


* **snake / avatar** - use the `fv2` and `fpk` paths; `TppEnemyFaceId` does not apply.

* **ddMale / ddFemale** - use `TppEnemyFaceId` (the soldier face the head maps to); the `fv2`/`fpk` paths do not apply.

> Unlike `RegisterOutfit` path fields, `fv2`/`fpk` are **not extension-validated** -
> a wrong path fails silently at load time, so double-check them.

**`faceStages` (snake only) - demon/horn stages**

Snake's face changes with Demon Points: the engine drives a face id (0-2) that
selects one of three face fova sets (vanilla `plfova_sna0_face0/1/2`). A plain
registration serves **one** fova pair for every stage, so the custom head
freezes Snake's face while worn - no horn growth, no Demon Snake. To follow
the stages, declare per-stage overrides; each array entry is `{ fv2 = "...",
fpk = "..." }`:

| Entry | faceId | Stage |
|---|---|---|
| [1] | 0 | Normal shrapnel |
| [2] | 1 | Grown horn |
| [3] | 2 | Demon Snake |

```lua
V_Player.RegisterHeadOption({
    key = "MyMod:MyHead",
    snake = {
        fv2 = "/Assets/.../myhead.fv2",   -- fallback for undeclared stages
        fpk = "/Assets/.../myhead.fpk",
        faceStages = {
            [1] = { fv2 = "/Assets/.../myhead_normal.fv2", fpk = "/Assets/.../myhead_normal.fpk" },
            [2] = { fv2 = "/Assets/.../myhead_horn.fv2",   fpk = "/Assets/.../myhead_horn.fpk"   },
            [3] = { fv2 = "/Assets/.../myhead_demon.fv2",  fpk = "/Assets/.../myhead_demon.fpk"  },
        },
    },
})
```

> * Any stage you omit (or leave without `fv2`/`fpk`) falls back to the branch's
>   base `fv2`/`fpk` - registrations without `faceStages` behave exactly as before.
> * The bandana-fit face variants (vanilla `face4/5/6`) are picked by the engine's
>   own loader - you never handle them yourself.
> * The Gold and Silver suits hardcode their own face fova and ignore the stage
>   system entirely - that is vanilla behavior, not a bug.
> * `faceStages` only exists on the `snake` branch; no other player type has the
>   demon face-id system.

**Returns** the head's `equipId`.

```lua
V_Player.RegisterHeadOption({
    key = "MyMod:MyHead",
    snake = {
        fv2 = "/Assets/tpp/fova/chara/sna/plfova_sna0_face4_v00.fv2",
        fpk = "/Assets/tpp/pack/mymod/plparts_myhead.fpk",
        faceStages = {
            [1] = { fv2 = "/Assets/.../myhead_normal.fv2", fpk = "/Assets/.../myhead_normal.fpk" },
            [2] = { fv2 = "/Assets/.../myhead_horn.fv2",   fpk = "/Assets/.../myhead_horn.fpk"   },
            [3] = { fv2 = "/Assets/.../myhead_demon.fv2",  fpk = "/Assets/.../myhead_demon.fpk"  },
        },
    },
    avatar = {
        fv2 = "/Assets/tpp/fova/chara/sna/plfova_sna0_face4_v00.fv2",
        fpk = "/Assets/tpp/pack/mymod/plparts_myhead.fpk",
    },
    ddMale = {
        TppEnemyFaceId = TppEnemyFaceId.svs_balaclava,
    },
    ddFemale = {
        TppEnemyFaceId = TppEnemyFaceId.fsvs_balaclava,
    },
    showInDevelopMenu = false,
})
```

### Equipment

| Function | Parameters | Description |
|---|---|---|
| V_TppEquip.RegisterConstantEquipId | name | Declares a new `EQP_*` equip-id constant, allocates a native equip slot for it, and exposes it as `TppEquip.<name>`. Returns the assigned value (number), or `false` on failure. |
| V_TppEquip.AddToEquipIdTable | rows | Registers custom equip-id table rows (model + pack) so a custom equip id resolves to its assets. See the row format below. |

#### Row format for `V_TppEquip.AddToEquipIdTable`

`rows` is an array of rows; each row is a **positional array** of 6 values:

| # | Field | Type | Description |
|---|---|---|---|
| [1] | equipId | int (>0) | The equip id to register. |
| [2] | equipType | int | Equip type. |
| [3] | subId | int | Sub id. |
| [4] | block | int | Block index. |
| [5] | partsPath | string | `.parts` model path. |
| [6] | packPath | string | `.fpk` package path. |

```lua
V_TppEquip.AddToEquipIdTable(
    {
        {
            TppEquip.EQP_WP_Com_sg_020, -- equipId
            TppEquip.EQP_TYPE_Shotgun, -- equipType
            TppEquip.WP_Com_sg_020, -- subId
            TppEquip.EQP_BLOCK_MISSION, -- block
            "/Assets/tpp/parts/weapon/assemble/shg/sg04_main0_aw0_v00.parts", -- partsPath
            "/Assets/tpp/pack/collectible/primary/EQP_WP_Com_sg_020.fpk" -- packPath
        }
    })
```

Malformed rows are skipped, and custom rows are re-applied automatically after the game
reloads its equip-id table.

#### Weapon / equip constant declarations

Each declares a new named constant in a specific weapon/equip **space**, exposes it as
`TppEquip.<name>`, and returns the assigned value (a number), or `false` on failure.
All take a single `name` (string) argument.

| Function | Constant space |
|---|---|
| V_TppEquip.DeclareEQPTypes | EQP_TYPE |
| V_TppEquip.DeclareSWPTypes | SWP_TYPE |
| V_TppEquip.DeclareEQPBlocks | EQP_BLOCK |
| V_TppEquip.DeclareSWPs | SWP |
| V_TppEquip.DeclareBLs | BL |
| V_TppEquip.DeclareBLAs | BLA |
| V_TppEquip.DeclareCasings | CASING |
| V_TppEquip.DeclareMZs | MZ |
| V_TppEquip.DeclareLTLS | LTLS |
| V_TppEquip.DeclareWPs | WP |
| V_TppEquip.DeclareMOs | MO |
| V_TppEquip.DeclareUBs | UB |
| V_TppEquip.DeclareAMs | AM |
| V_TppEquip.DeclareSTs | ST |
| V_TppEquip.DeclareRCs | RC |
| V_TppEquip.DeclareBAs | BA |
| V_TppEquip.DeclareSKs | SK |
| V_TppEquip.DeclareReticleUIs | RETICLE_UI |
| V_TppEquip.DeclareScopeUIs | SCOPE_UI |
| V_TppEquip.DeclareBarrelLengths | BARREL_LENGTH |
| V_TppEquip.DeclareRicochetSizes | RICOCHET_SIZE |
| V_TppEquip.DeclareBulletTypes | BULLET_TYPE |
| V_TppEquip.DeclarePenetrateLevels | PENETRATE_LEVEL |
| V_TppEquip.DeclareTriggers | TRIGGER |
| V_TppEquip.DeclareWeaponPaints | WEAPON_PAINT |

### Mother Base Management

| Function | Parameters | Description |
|---|---|---|
| V_TppMotherBaseManagement.AddToChangeLocationMenu | { locationCode, ... } | Adds locations to the ACC free-roam (change location) list. |
| V_TppMotherBaseManagement.AddPhotoAdditionalText | { { missionCode=, photoId=, photoType=, targetTypeLangId= }, ... } | Adds text for VI photos. |

#### Equip Develop (R&D)

These manage custom R&D **develop records** - the entries in the Mother Base Develop tree.
A custom outfit/equip gets an auto-allocated **develop id** from its string `key`;
`GetDevelopId(key)` returns it, and the other functions take that id.

| Function | Parameters | Returns | Description |
|---|---|---|---|
| V_TppMotherBaseManagement.GetDevelopId | key (string) | number \| nil | Returns the auto-allocated develop id for a registered **CUSTOM** outfit/equip key (nil if unknown). |
| V_TppMotherBaseManagement.SetEquipDeveloped | developId (int) | boolean | Sets the equipment developed (unlocked). |
| V_TppMotherBaseManagement.SetEquipUndeveloped | developId (int) | boolean | Sets the equipment not developed. |
| V_TppMotherBaseManagement.IsEquipDevelopable | developId (int) | boolean | True if the equipment can currently be developed (requirements met, not yet developed). |
| V_TppMotherBaseManagement.IsEquipDeveloped | developId (int) | boolean | True if the equipment is developed. |
| V_TppMotherBaseManagement.SetEquipNew | developId (int), isNew (bool, default true) | boolean | Sets/clears the "NEW" flag (framework-managed ids only). |
| V_TppMotherBaseManagement.IsEquipNew | developId (int) | boolean | True if the record has the "NEW" flag. |
| V_TppMotherBaseManagement.SetEquipDevelopVisible | developId (int), visible (bool, default true) | boolean | Shows/hides the row in the R&D Develop browser **at runtime, no reload** (framework-managed ids only). Revealing a still-"NEW" row fires its "requirements met" announce. Use this to unlock a `bluePrintId`-gated item live, e.g. on mission complete. |

#### AddToEquipDevelopTable

| Function | Parameters | Returns | Description |
|---|---|---|---|
| V_TppMotherBaseManagement.AddToEquipDevelopTable | key (string), definition (table) | number (developId) | Registers/updates a develop-tree record (name, icon, R&D cost, grade, etc.). `developId`/`flowIndex` (p00 and p50) are auto-allocated and persisted per `key` - never pass them yourself. |

The `definition` table holds two sub-tables, `const` and `flow`. Use the readable param
names below (or the raw `pNN` names - both work).

```lua
local devId = V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:MySuit", { -- MyMod:MySuit is the key
    const = {
        equipID            = TppEquip.EQP_SUIT,
        equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Suit,
        langEquipName      = "my_suit_name",
        iconFtexPath       = "/Assets/.../ui_icon_alp",
    },
    flow = {
        grade            = 3,
        developGmpCost   = 500,
        initialAvailable = 0,   -- 0 = starts locked
    },
})
```

**`const` fields**

| Param | pNN | Description |
|---|---|---|
| equipID | p01 | Equip id (e.g. `TppEquip.EQP_SUIT`; `EQP_None` for heads). |
| equipDevelopTypeID | p02 | Coarse R&D tab/type (e.g. `TppMbDev.EQP_DEV_TYPE_Suit`). |
| baseEquipDevelopId | p03 | Parent develop id (dependency link) - locks this grade until the parent is developed. Use the developId returned by the parent's `AddToEquipDevelopTable` call (`0` = root). |
| skill | p04 | Required skill id. |
| bluePrintId | p05 | Visibility gate, accepts three forms. **Function** (recommended for conditional unlocks) = a predicate the DLL re-evaluates each time the R&D menu builds, so the row appears/disappears **live, mid-session, no reload**: `bluePrintId = function() return TppStory.IsMissionCleard(10080) end` (any condition works). **Boolean** = static gate, evaluated once at registration: `false` hides, `true` shows (re-reads on each game load). **Number** = a real vanilla design id (e.g. `TppMotherBaseManagementConst.DESIGN_2001`): hidden until that design/blueprint is acquired in-game, like the vanilla weapons that use it. Omit/`0xffff` = always shown. |
| langEquipName | p06 | equip-name lang key. |
| langEquipInfo | p07 | description lang key. |
| iconFtexPath | p08 | R&D card icon .ftex path. |
| equipDevelopGroupID | p09 | Fine R&D group/node id (see the `V_TppMbDev` constants or use vanilla's). |
| langPowerUpInfo0..11 | p10-p21 | power-up info lang keys. |
| langEquipRealName | p30 | real-name lang key. |
| isResultRankLimited | p31 | Rank-limited flag. |
| isCustomEnable | p32 | Customize-enabled flag. |
| isColorChangeEnable | p33 | Color-change flag. |
| unk34 | p34 | Unknown |
| isSecurityStaffEquip | p35 | Security-staff equip flag. |
| unk36 | p36 | Unknown |

**`flow` fields**

| Param | pNN | Description |
|---|---|---|
| sideGrade | p51 | Side-branch slot (setting it disables the auto-rules below). Must be unique across the develop **family** (vanilla rows and other mods included) - a duplicate is auto-bumped to the next free slot with a log warning. A side branch's grade must also sit **above its parent's grade** - if not, it is auto-bumped to parent+1 with a warning. |
| grade | p52 | R&D grade / star position (clamped 1-15). Auto-rules for a child (`baseEquipDevelopId` set, no `sideGrade`): under a **mod-registered** parent, grades must ascend and be unique - collisions auto-bump to the next free grade (if none is free the row becomes grade 15 on a side branch). Under a **vanilla** parent, the row stays mainline only if its grade is above the family's highest; otherwise it **keeps its authored grade but is forced onto a side branch** (next free `sideGrade`). All fixes log a warning. |
| developGmpCost | p53 | GMP cost to develop. |
| usageGmpCost | p54 | GMP cost to use. |
| sectionLvForDevelop | p55 | Required section level. |
| sectionID2ForDevelop / sectionLv2ForDevelop | p56 / p57 | Secondary section requirement. |
| resourceType1 / resourceType1Count | p58 / p59 | Required resource #1 and its count. |
| resourceType2 / resourceType2Count | p60 / p61 | Required resource #2 and its count. |
| initialAvailable | p62 | Initial developed state (`0` = starts locked). |
| sectionIDForDevelop | p63 | Required section id. |
| developSectionLv | p64 | Develop section level. |
| resourceUsageType1..2 (+ Count) | p65-p68 | Per-use resource costs. |
| displayInfo | p69 | Display-info id. |
| unk70 | p70 | Unknown |
| developTimeMinute | p71 | Develop time (minutes). |
| isValidMbCoin | p72 | MB-coin flag (Forced to 0). |
| intimacyPoint | p73 | Intimacy points (buddies?). |
| isFobAvailable | p74 | FOB-available flag (Forced to 0). |

### Sound

| Function | Parameters | Description |
|---|---|---|
| V_TppSoundDaemon.SetSoldierVoicePitch | gameObjectId, cents | Changes the voice pitch of a specific soldier. |
| V_TppSoundDaemon.UnsetSoldierVoicePitch | - | Removes the voice-pitch overrides from ALL soldiers. |
| V_TppSoundDaemon.SetGameOverMusic | isEnable, gameOverType (0-3), playEvent, stopEvent | Replaces the Game Over music with a custom or existing Wwise event. |

### Cassette

#### General functions

| Function | Parameters | Description |
|---|---|---|
| V_CassetteCommand.ShowCassetteTape | trackFileName | Shows a hidden track to the menu (Does not work on locked tracks). |
| V_CassetteCommand.HideCassetteTape | trackFileName | Hides a track from the menu. |
| V_CassetteCommand.PlayCassetteTapeByTrackId | trackId, isLoop, playAll | Immediately starts playing a cassette tape. |
| V_CassetteCommand.GetTapeTrackId | trackFileName | Returns a cassette tape's track ID using the filename defined in `PreinstallTape.lua.` |
| V_CassetteCommand.GetCassettePlayingTime | - | Returns the current playback time of the active cassette tape. |
| V_CassetteCommand.GetCassettePlayingTrackId | - | Returns the track ID of the active cassette tape. |
| V_CassetteCommand.PauseCassette | fadeSec | Pauses the active cassette tape. Set fadeSec to 0 to disable the fade-out. |
| V_CassetteCommand.ResumeCassette | fadeSec | Resumes the paused cassette tape. Set fadeSec to 0 to disable the fade-in. |
| V_CassetteCommand.StopCassette | fadeSec, stopByUser | Stops the active cassette tape. A stopped tape cannot be resumed. |
| V_CassetteCommand.IsCassetteSpeakerEnabled | - | Returns true when cassette speaker playback is enabled. |
| V_CassetteCommand.SetCassetteSpeakerEnabled | isEnable | Enables or disables cassette speaker playback. |

#### Custom Tapes

| Function | Parameters | Description |
|---|---|---|
| V_CassetteCommand.RegisterRadioCassette | gimmickName, fox2Path, wwiseEvent, fileName | Allows a custom cassette tape to be collected from a radio, similarly to vanilla music tapes. |
| V_CassetteCommand.SetOwnershipCassetteTape | trackFileName, isEnable | Locks/unlocks tracks for the player (Works on custom tapes only). |
| V_CassetteCommand.SetNewFlagCassetteTape | trackFileName, isEnable | Sets/Unsets the "NEW" flag on a track. (Can also work on Vanilla tracks)|

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
            type = "PREINSTALL_BRIEFING",
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
| albumId   | string  |         Yes |       - | Internal identifier used to associate tracks with the album.                                          |
| langId    | string  |         Yes |       - | Language ID used for the album's displayed name.                                                      |
| type      | string  | Conditional |       - | String representation of the album type. Either type or a nonnegative typeValue must be supplied. |

An album is accepted only when:

* albumId is a valid string.
* langId is a valid string.
* type is a valid string.


##### Track Definition

| Field        | Type      | Required | Default | Description                                                                    |
| ------------ | --------- | -------: | ------: | ------------------------------------------------------------------------------ |
| albumId    | string  |      Yes |       - | ID of the album that contains the track.                                       |
| langId     | string  |      Yes |       - | langId used for the track's displayed name.                               |
| fileName   | string  |      Yes |       - | Internal cassette track filename.                                              |
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
-- PREINSTALL_MISSION_INFO, the name of the track must match this tp_m_10044_00 (10044 is the missionCode)
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

### UI

#### Player Equipment Backgrounds

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetDefaultEquipBgTexturePath | ftexPath, isColored, opacity | Sets the default background texture used by player equipment icons. |
| V_TppUiCommand.ClearDefaultEquipBgTexture | - | Restores the default player equipment background texture. |
| V_TppUiCommand.SetEquipBgTexturePath | equipId, ftexPath, isColored, opacity | Sets the background texture for a specific player equipment item. |
| V_TppUiCommand.ClearEquipBgTexture | equipId | Restores the default background texture for a specific player equipment item. |

#### Enemy Equipment Backgrounds

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetEnemyWeaponBgTexturePath | ftexPath, isColored, opacity | Sets the default background texture used by enemy weapon icons. |
| V_TppUiCommand.ClearEnemyWeaponBgTexture | - | Restores the default enemy weapon background texture. |
| V_TppUiCommand.SetEnemyEquipBgTexturePath | equipId, ftexPath, isColored, opacity | Sets the background texture for a specific enemy equipment item. |
| V_TppUiCommand.ClearEnemyEquipBgTexture | equipId | Restores the default background texture for a specific enemy equipment item. |
| V_TppUiCommand.ClearAllEquipBgTextures | - | Restores all player and enemy equipment background textures to their defaults. |

#### Loading Screen

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetLoadingSplashMainTexturePath | ftexPath | Sets the main loading-screen texture. |
| V_TppUiCommand.SetLoadingSplashBlurTexturePath | ftexPath | Sets the blurred loading-screen texture. |
| V_TppUiCommand.ClearLoadingSplashTextures | - | Restores the default loading-screen textures. |

#### Mission Telop screen

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetMissionTelopSplashTexturePath | ftexPath | Sets the Mission Telop screen texture. |
| V_TppUiCommand.UnsetMissionTelopSplashTexturePath | - | Restores the default Mission Telop screen textures. |

#### Game Over Screen

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetGameOverSplashMainTexturePath | ftexPath | Sets the main Game Over texture. |
| V_TppUiCommand.SetGameOverSplashBlurTexturePath | ftexPath | Sets the blurred Game Over texture. |
| V_TppUiCommand.ClearGameOverSplashTextures | - | Restores the default Game Over textures. |

#### Equipment Icons

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetEquipIdIconFtexPath | equipId, ftexPath | Changes the icon of a specific equipment item. |
| V_TppUiCommand.ClearIconFtexPath | equipId | Restores the default icon for a specific equipment item. |
| V_TppUiCommand.ClearAllIconFtexPaths | - | Restores the default icons for all equipment items. |

#### Emergency Missions

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetMissionEmergency | missionCode, isEnable | Enables or disables emergency status for a mission. |
| V_TppUiCommand.IsMissionEmergency | missionCode | Returns true if the given mission currently has emergency status. |
| V_TppUiCommand.SetEmergencyMissionPopup | title, body | Overrides the Emergency Mission iDroid popup using raw text. |
| V_TppUiCommand.SetEmergencyMissionPopupLangId | title, body | Overrides the Emergency Mission iDroid popup using language IDs. |
| V_TppUiCommand.ClearEmergencyMissionPopupOverride | - | Restores the default Emergency Mission popup text used by the Retake the Platform mission. |
| V_TppUiCommand.ShowMissionIcon | title, body, time | Shows the Emergency Mission icon and overrides its title, body, and time. Any argument set to nil uses its vanilla hardcoded value. |

#### Time Cigarette

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.ShowTimeCigaretteUi | - | Shows the Time Cigarette UI. |
| V_TppUiCommand.HideTimeCigaretteUi | - | Hides the Time Cigarette UI. |

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
| V_TppUiCommand.SetEnemyInformationLangId | langId | Overrides the enemy information name shown on the map/marker. |
| V_TppUiCommand.ClearEnemyInformationLangId | - | Restores the default enemy information name shown on the map/marker. |
| V_TppUiCommand.SetEnemyUnitName | langId | Overrides the enemy unit name shown through the binoculars. |
| V_TppUiCommand.ClearEnemyUnitName | - | Restores the default enemy unit name shown through the binoculars. |
| V_TppUiCommand.SetEnemyInformationLangIdForSoldier | gameObjectId, langId | Overrides the map/marker information name for a specific soldier. |
| V_TppUiCommand.ClearEnemyInformationLangIdForSoldier | gameObjectId | Restores the default map/marker information name for a specific soldier. |
| V_TppUiCommand.ClearAllEnemyInformationLangIdForSoldiers | - | Clears all soldier-specific map/marker information-name overrides. |
| V_TppUiCommand.SetEnemyUnitNameForSoldier | gameObjectId, langId | Overrides the binoculars unit name for a specific soldier. |
| V_TppUiCommand.ClearEnemyUnitNameForSoldier | gameObjectId | Restores the default binoculars unit name for a specific soldier. |
| V_TppUiCommand.ClearAllEnemyUnitNameForSoldiers | - | Clears all soldier-specific binoculars unit-name overrides. |

#### Announcement Log Sound Effects

| Function | Parameters | Description |
|---|---|---|
| V_TppUiCommand.SetAnnounceLogSE | label, conditionOrStateId | Assigns a Wwise sound effect (by registered sfx label) to an announcement-log entry. |
| V_TppUiCommand.RegisterAnnounceLogSfx | sfxLabel | Registers a sound-effect label for use with SetAnnounceLogSE. Example: "sfx_s_enemytag_main_tgt". |
| V_TppUiCommand.UnsetAnnounceLogSE | - | Removes the sound-effect override from the announcement log. |
| V_TppUiCommand.UnregisterAnnounceLogSfx | - | Unregisters the announcement-log sound effect. |


### Helicopter

| Function | Parameters | Description |
|---|---|---|
| V_Helicopter.SetEnableHeliVoice | isEnable, voiceEvent, radioEvent | Overrides the voice and radio events used by Pequod with events from a custom .sbp, avoiding the need to replace the vanilla .sbp. |
| V_Helicopter.PilotCallVoice | label | Plays a voice line using the hardcoded DD_vox_SH_voice source. |
| V_Helicopter.PilotCallRadio | label1, label2 (optional) | Plays a radio line using the hardcoded DD_vox_SH_radio source. A second line can be played sequentially. The support helicopter must be rendered. |
| V_Helicopter.SetFieldTaxiMissionEnabled | missionCode, isEnable (optional, default true) | Enables or disables the Taxi system for a specific mission. |
| V_Helicopter.SetTaxiLandingZoneHidden | lzName, isEnable (optional, default true) | Shows or hides a landing zone on the Taxi map only. |
| V_Helicopter.SetTaxiRideState | state (1-3) | Changes the pose used by the player during Taxi rides. |
| V_Helicopter.SetTaxiRideLog | isEnable (optional, default true) | Enables or disables logging for Taxi ride poses. |
| V_Helicopter.ResetTaxiState | - | Resets the Taxi ride state back to its default. |

### Sahelanthropus

| Function | Parameters | Description |
|---|---|---|
| V_Sahelan.SetEyeLampColorLogging | isEnable | Enables or disables logging when Sahelanthropus's eye color changes. |

### Constants

Some libraries expose read-only named integer constants, so you can use them in
place of plain numbers.

#### V_TppGameObject

Game-over type ids - pass as the `gameOverType` argument of
`V_TppSoundDaemon.SetGameOverMusic`.

| Constant | Value |
|---|---|
| V_TppGameObject.GAME_OVER_GENERAL | 0 |
| V_TppGameObject.GAME_OVER_PARADOX | 1 |
| V_TppGameObject.GAME_OVER_STEALTH | 2 |
| V_TppGameObject.GAME_OVER_CYPRUS | 3 |

#### V_TppMbDev

Equip-develop group ids - pass as the `equipDevelopGroupID` (`p09`) field of
`V_TppMotherBaseManagement.AddToEquipDevelopTable`.

| Constant | Value |
|---|---|
| V_TppMbDev.EQP_OUTFIT_VARIANT_GRADE | 0 |
| V_TppMbDev.EQP_OUTFIT_VARIANT_NAME | 79 |


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
| SetSahelanPhase | { type = "TppSahelan2", group = 0, index = 0 } | phase | -        | Forces Sahelanthropus to use the specified AI phase. |
| GetSahelanPhase | { type = "TppSahelan2", group = 0, index = 0 } | -       | number | Returns Sahelanthropus's current AI phase.           |

#### FOVA Override

| Command            | Target  | Fields | Returns | Description                                     |
| ------------------ | ------- | ------ | ------- | ----------------------------------------------- |
| SetSahelanFova   | { type = "TppSahelan2", group = 0, index = 0 } | fv2  | -       | Sets a custom .fv2 path for Sahelanthropus.   |
| ClearSahelanFova | { type = "TppSahelan2", group = 0, index = 0 } | -      | -       | Clears the custom Sahelanthropus FOVA override. |

#### Eye Lamp

| Command             | Target  | Fields                           | Returns | Description                                                                                             |
| ------------------- | ------- | -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| SetEyeLampColor   | { type = "TppSahelan2", group = 0, index = 0 } | color, optional phase        | -       | Overrides the eye-lamp color. Phase defaults to -1, which will apply it to ALL phases. |
| ClearEyeLampColor | { type = "TppSahelan2", group = 0, index = 0 } | -                                | -       | Clears all eye-lamp color overrides.                                                                    |
| SetEyeLampDisco   | { type = "TppSahelan2", group = 0, index = 0 } | enabled, speed, optional a | -       | Enables or disables the eye-lamp color-cycling effect. a controls opacity and defaults to 1.        |

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
| SetHeartLightColor   | { type = "TppSahelan2", group = 0, index = 0 } | color, optional phase        | -       | Overrides the heart-light color. phase defaults to -1. Note that this field uses a lowercase p. |
| ClearHeartLightColor | { type = "TppSahelan2", group = 0, index = 0 } | -                                | -       | Clears all heart-light color overrides.                                                               |
| SetHeartLightDisco   | { type = "TppSahelan2", group = 0, index = 0 } | enabled, speed, optional a | -       | Enables or disables the heart-light color-cycling effect. a controls opacity and defaults to 1.   |

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
| SetOccasionalChatList        | { type = "TppSoldier2" } | labels | -       | Replaces the occasional-chat override list with the supplied labels. |
| InsertToOccasionalChatList   | { type = "TppSoldier2" } | labels | -       | Adds the supplied labels to the occasional-chat override list.       |
| RemoveFromOccasionalChatList | { type = "TppSoldier2" } | labels | -       | Removes the supplied labels from the occasional-chat override list.  |
| ResetOccasionalChatList      | { type = "TppSoldier2" } | -        | -       | Clears the occasional-chat override and restores default behavior.   |

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
| SetCautionPhaseDuration   | Global or Command Post gameObjectId | duration | -        | Sets the caution-phase duration in seconds. The target determines whether the override is global or Command Post-specific. |
| GetCautionPhaseDuration   | Global or Command Post gameObjectId | -          | number | Returns the configured caution-phase duration in seconds.                                                                  |
| UnsetCautionPhaseDuration | Global or Command Post gameObjectId | -          | -        | Removes the caution-duration override and restores default behavior.                                                       |
| GetCautionPhaseRemaining  | Global or Command Post gameObjectId | -          | number | Returns the remaining caution-phase time in seconds.                                                                       |


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
| SetFriendlyFire   | Global or Command Post gameObjectId | isEnable | -        | Makes it possible for enemies to accidentally shoot each other. |
| IsFriendlyFire   | Global or Command Post gameObjectId | -        | number   | Returns whether friendly fire is currently enabled (1 or 0). |

### Hostages

#### Escape State

| Command          | Target                 | Fields   | Returns | Description                                                     |
| ---------------- | ---------------------- | -------- | ------- | --------------------------------------------------------------- |
| SetEscapeState | Hostage gameObjectId | enable | -       | When enabled, the enemy will report the lost prison was *taken* by the player rather than just *escaped*. |

```lua
GameObject.SendCommand(hostageGameObjectId, {
    id = "SetEscapeState",
    enable = true,
})
```

#### Lost Hostages

| Command             | Target                 | Fields                           | Returns | Description                                                                                                 |
| ------------------- | ---------------------- | -------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| SetLostHostage    | Hostage gameObjectId | hostageType, customLostLabel | -       | Registers the target as a lost hostage and configures its hostage type and optional custom discovery label. |
| RemoveLostHostage | Hostage gameObjectId | -                                | -       | Removes the target from the lost-hostage trap and discovery systems.                                        |
| ClearLostHostages | Ignored                | -                                | -       | Removes all registered lost-hostage overrides.                                                              |

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
| SetVIPImportant    | Soldier gameObjectId | isOfficer, deadBodyLabel | -       | Registers a soldier as important for sleep, faint, holdup, and radio handling. |
| RemoveVIPImportant | Soldier gameObjectId | -                            | -       | Removes a soldier from all VIP-important handling systems.                     |
| ClearVIPImportant  | Ignored                | -                            | -       | Removes all registered VIP-important soldiers.                                 |

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
| SetUseConcernedHoldupRecovery | { type = "TppSoldier2" } | enable | -       | Enables or disables the custom concerned-soldier holdup recovery behavior for non-VIP soldiers. |

### Call-Sign Patrol Soldiers

| Command                       | Target                 | Fields | Returns | Description                                             |
| ----------------------------- | ---------------------- | ------ | ------- | ------------------------------------------------------- |
| AddCallSignPatrolSoldier    | Soldier gameObjectId | -      | -       | Adds a soldier to the extra call-sign patrol list.      |
| RemoveCallSignPatrolSoldier | Soldier gameObjectId | -      | -       | Removes a soldier from the extra call-sign patrol list. |
| ClearCallSignPatrolSoldiers | { type = "TppSoldier2" }                | -      | -       | Clears all extra call-sign patrol soldiers.             |

### Soldier Stealth Camo

| Command                            | Target                | Fields   | Returns | Description                                                                    |
| ---------------------------------- | --------------------- | -------- | ------- | ------------------------------------------------------------------------------ |
| EnableSoldierStealthCamo         | Soldier gameObjectId | enable | -       | Enables or disables optical camouflage for the specified soldier mapped index. |
| ClearSoldierStealthCamoOverrides | { type = "TppSoldier2" }               | -        | -       | Clears all soldier optical-camouflage overrides.                               |

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
| NoticeNoise    | gameObjectId | Fires when a soldier notices a noise.| 
| NoticeIndis    | gameObjectId | Fires when a soldier notices something the player.| 
| RequestedHeliTaxi    | heliId, currentLzHash, destinationLzHash | Fires when a destination is requested from the Taxi map (landing-zone cluster StrCode32 hashes).| 

### Radio

| msg                       | Params                 | Description |
| ----------------------------- | ---------------------- | ------ |
| HeliStart    | label1, label2, voiceType | Fires when Pequod uses one of his radio/voice lines.| 
| HeliFinish    | label1, label2, voiceType | Fires when Pequod finishes one of his radio/voice lines.| 

### Player

| msg                       | Params                 | Description |
| ----------------------------- | ---------------------- | ------ |
| OnPlayerLockPickStart    | playerIndex, gimmickId, Doorside | Fires when the player starts lock picking.| 
| OnPlayerLockPickEnd    | playerIndex, gimmickId, Doorside | Fires when the player finishes lock picking.| 
| OffBinocularsMode    | - | Fires when the player stops using the Binoculars.| 
| CrawlSideRoll    | playerIndex, rollPhase, rollCount, Direction | Fires when the player rolls.| 
| BarrierDamage    | playerIndex, before, after | Fires when the player's Energy Wall barrier takes damage (shield health before/after).| 

### UI

| msg                       | Params                 | Description |
| ----------------------------- | ---------------------- | ------ |
| SubtitlesEventMessage    | message | Fires when the subtitle in `.subp` files use `[m= myMessage]`.| 