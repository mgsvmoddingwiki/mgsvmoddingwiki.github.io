---
title: V Framework Custom Weapons
permalink: /V_Framework_Custom_Weapons/
tags: [Lua, Reference, Guides, Infinite Heaven, Weapons, V Framework]
---

A custom weapon is assembled from parts: receiver, barrel, magazine,
bullet, and optional sight, stock, muzzle, laser/light and underbarrel.

Place all calls inside `this.LoadLibraries()`.

## Workflow

1. [Register and declare IDs](#register-and-declare-ids)
2. Configure [Damage](#damage-setdamage), [Receiver](#receiver-setreceiver),
   [Barrel](#barrel-setbarrel), [Magazine](#magazine-setmagazine),
   [Bullet](#bullet-setbullet) and any [optional attachments](#optional-attachments)
3. [Assemble with `SetGunBasic`](#assemble-with-setgunbasic)
4. [Add the R&D row](#add-the-rd-row-addtoequipdeveloptable)

Declare a custom part name before any `Set*` call uses it. Every
parameter set takes a **number** (reuse a vanilla row) or a **table**
(custom values).

> Vanilla part IDs (e.g. `TppEquip.BA_10102`) work in any `SetGunBasic`
> slot; configure only the parts you replace.

---

## Register and declare IDs

```lua
V_TppEquip.RegisterConstantEquipId("EQP_WP_Example")
V_TppEquip.RegisterConstantEquipId("EQP_AM_Example")

V_TppEquip.DeclareWPs     { "WP_Example" }
V_TppEquip.DeclareRCs     { "RC_Example" }
V_TppEquip.DeclareBAs     { "BA_Example" }
V_TppEquip.DeclareAMs     { "AM_Example" }
V_TppEquip.DeclareSKs     { "SK_Example" }
V_TppEquip.DeclareMOs     { "MO_Example" }
V_TppEquip.DeclareSTs     { "ST_Example" }
V_TppEquip.DeclareUBs     { "UB_Example" }
V_TppEquip.DeclareLTLS    { "LS_Example", "LT_Example" }
V_TppEquip.DeclareBLs     { "BL_Example" }
V_TppEquip.DeclareDamages { "ATK_Example" }
```

`DeclareDamages` creates `TppDamage.ATK_*`; the others create
`TppEquip.*` constants.

Map each equip ID to its model and pack (all six values required per
row; `""` for no pack):

```lua
V_TppEquip.AddToEquipIdTable{
  { TppEquip.EQP_WP_Example, TppEquip.EQP_TYPE_Assault, TppEquip.WP_Example, TppEquip.EQP_BLOCK_MISSION,
    "/Assets/tpp/parts/weapon/eft/556x45/example/example_main0.parts",
    "/Assets/tpp/pack/weapon/eft/wp_example_main0.fpk" },
  { TppEquip.EQP_AM_Example, TppEquip.EQP_TYPE_Ammo, 0, TppEquip.EQP_BLOCK_NONE,
    "/Assets/tpp/weapon/amo/Scenes/am01_main0_def.fmdl", "" },
}
```

Row format: [Equipment](/V_Framework_Lua_API#equipment).

---

## Damage (`SetDamage`)

The attack a receiver deals.

```lua
V_TppEquip.SetDamage{
  damageId       = TppDamage.ATK_Example,
  lethalDamage   = 700,
  lethalDamageUI = 700,
  impactForce    = 40,
  damageSource   = TppDamage.DAM_SOURCE_Assault,
  injureType     = TppDamage.INJ_TYPE_BULLET,
  injurePart     = TppDamage.INJ_PART_ALL,
  hitNPC         = 1,
}
```

`damageId` is required; every other field is optional, default `0`.

Fields in vanilla `DamageParameterTables.lua` column order, so a vanilla
row can be copied straight down:

| Col | Field | Notes |
|----:|---|---|
| 1 | `damageId` | `TppDamage.ATK_*` |
| 2 | `oldLethalDamageVsSoldier` | vs soldiers and animals. Old name `lethalDamageUI` also works. |
| 3 | `oldLethalDamageVsPlayer` | vs the player, buddies, cbox, decoy, supply crate. |
| 4 | `oldLethalDamageVsVehicle` | vs vehicles and Sahelanthropus. |
| 5 | `oldStaminaDamageVsSoldier` | Stamina vs soldiers. |
| 6 | `oldStaminaDamageVsPlayer` | Stamina vs player and buddies. |
| 7 | `blowPower` | `1000`+ staggers; below only flinches. |
| 8 | `shieldDamage` | Shield-breaking power. |
| 9 | `injureType` | `TppDamage.INJ_TYPE_*` |
| 10 | `injurePart` | `TppDamage.INJ_PART_*` |
| 11 | `injureMaxDistance` | Metres the injury applies within, `0-255`; `0` = never. |
| 12 | `injureRate` | Injury chance x2 (`200` = 100%), lethal hits only. |
| 13 | `isBullet` | Set on any bullet attack. |
| 14-28 | `isSniper`, `isShotgun`, `isTranq`, `isStun`, `isExplosive`, `isMelee`, `isBlade`, `isFire`, `isParasite`, `isGas`, `isVehicleHit`, `unk25`, `isElectric`, `isWater`, `isPenetrating` | `0`/`1` flags, in this order. `unk25` is unused. |
| 29 | `damageSource` | `TppDamage.DAM_SOURCE_*` |
| 30 | `lethalDamage` | |
| 31 | `staminaDamage` | |
| 32 | `impactForce` | |

`hitNPC` has no column.

> **Non-lethal weapons:** set `oldStaminaDamageVsPlayer` too, or the
> player takes no stamina damage from them.
{:.important}

---

## Receiver (`SetReceiver`)

Firing behaviour, handling and the attack.

```lua
V_TppEquip.SetReceiver{
  receiverId = TppEquip.RC_Example,
  attackId   = TppDamage.ATK_Example,

  receiverParamSetsBase = {
    fireRate = 700, aimAssistDist = 45, gunAimAdjust = 0.5,
    effectiveRange = 45, effectiveRangeUI = 45,
    adsZoom = 0.18, adsFov = 30, reloadSpeed = 1.1,
  },

  receiverParamSetsWobbling = {
    spreadPerShot = 1.3, unk2 = 0.9, spreadRecovery = 8.1,
    spreadMin = 0.35, spreadMax = 2.9, shotKick = 0.16, shotKick2 = 0.31,
  },

  receiverParamSetsSystem = {
    eqpType = TppEquip.EQP_TYPE_Assault,
    reticleUiId = TppEquip.RETICLE_UI_ASSAULT,
    triggerId = TppEquip.TRIGGER_FULLAUTO,
    showMagazineMesh = 1, plusOneChamber = 1,
  },

  receiverParamSetsSound = "ar01",
  motionFrom             = TppEquip.RC_10102,
}
```

| Field | Required | Purpose |
|---|---|---|
| `receiverId` | Yes | Receiver to define. |
| `receiverParamSetsBase`, `receiverParamSetsWobbling`, `receiverParamSetsSystem` | Yes | Number or table (below). |
| [`receiverParamSetsSound`](#fire-sound-receiverparamsetssound) | Yes | Fire sound. |
| `attackId` | No (`0`) | Damage row. |
| [`motionFrom`](#borrowing-motion-motionfrom) | No (none) | Receiver whose animations to use. |

### Base fields

| Field | Required | Purpose |
|---|---|---|
| `fireRate` | No (`0`) | Rounds per minute. |
| `aimAssistDist` | No (`0`) | Aim-assist distance. |
| `gunAimAdjust` | No (`0`) | Auto-aim strength. |
| `effectiveRange` | No (`0`) | Effective range. |
| `effectiveRangeUI` | No (`0`) | Range shown in R&D. |
| `adsZoom` | No (`0`) | ADS zoom. |
| `adsFov` | No (`0`) | ADS field of view. |
| `reloadSpeed` | No (`0`) | Reload speed; `1.0` normal. |

### Wobbling fields

| Field | Required | Purpose |
|---|---|---|
| `spreadPerShot` | No (`0`) | Bloom per shot. |
| `spreadRecovery` | No (`0`) | Bloom recovery speed. |
| `spreadMin` / `spreadMax` | No (`0`) | Spread limits. |
| `shotKick` / `shotKick2` | No (`0`) | Aim kick. |
| `unk2` | No (`0`) | Unknown; use a vanilla value. |

### System fields

| Field | Required | Purpose |
|---|---|---|
| `eqpType` | No (`0`) | Weapon family. Also picks the fire-sound template. |
| `reticleUiId` | No (`0`) | HUD reticle. |
| `triggerId` | No (`0`) | Cocking, semi-auto, burst or full-auto. |
| `plusOneChamber` | No (`0`) | `1` allows a round in the chamber. |
| `showMagazineMesh`, `missileMeshVariant`, `modelDedupExclude`, `flag5`, `sightMountMesh`, `railMountMesh`, `railMountMesh2`, `altMagazineSocket` | No (`0`) | Model mesh flags. |

### Borrowing motion (`motionFrom`)

`motionFrom` uses that receiver's animations. Include its `.mtar` in
your `.fpk`, and use the same weapon family in `AddToEquipIdTable`
(e.g. a handgun `motionFrom` needs `EQP_TYPE_Handgun`). For another
family's handling, see [`SetWeaponHandling`](#cross-family-handling-setweaponhandling).
For your own clips, see [Custom gun motion](#custom-gun-motion-setreceivermotion).

---

## Fire sound (`receiverParamSetsSound`)

Takes one of:

| Form | Example | Effect |
|---|---|---|
| Root string | `"ar01"` | Plays that vanilla weapon's fire sound. |
| Number | `12` | Reuses a vanilla sound row. |
| `event` | `{ event = "sfx_w_p_ar01_m_active" }` | Plays that exact event name. |
| `name` + `middle` | `{ name = "ms00", middle = false }` | Root with the `_m` segment forced on (`true`) or off (`false`); for a sound from another weapon family. |

Add `sup = "root"` or `supEvent = "exact_event"` to the table to pick
the suppressed sound separately.

Soldiers whose weapon carries a suppressor play the suppressed sound too. The
`event` and `supEvent` forms play the same event for the player and soldiers.

> Pass the root (`"ar01"`), not a full event name, or the weapon is
> silent. Silent anyway: flip `middle`, or try a neighbouring root.
{:.important}

Missile and rocket sounds have no suppressed version: a suppressor
silences them.

---

## Barrel (`SetBarrel`)

Multiplies receiver stats and enables attachment mounts.

```lua
V_TppEquip.SetBarrel{
  barrelId = TppEquip.BA_Example,

  barrelParamSetsBase = {
    fireRateMult = 1.2, gunAimAdjustMult = 1.15,
    rangeMult = 0.9, rangeUIMult = 0.9,
    spreadMaxMult = 1.1, percentOverride = 1.05,
  },

  barrelLength  = TppEquip.BARREL_LENGTH_MIDDLE,
  hasScopeMount = 1,
  hasSideMount  = 1,
  hasUnderMount = 1,
}
```

`barrelId` is required. `barrelParamSetsBase` is a table or a vanilla
row number; `1.0` is neutral and values above `2.55` work.

| Field | Required | Purpose |
|---|---|---|
| `fireRateMult` | No (`0`) | Fire rate. |
| `gunAimAdjustMult` | No (`0`) | Aim adjustment. |
| `rangeMult` | No (`0`) | Effective range. |
| `rangeUIMult` | No (`0`) | Range shown in R&D. |
| `spreadMaxMult` | No (`0`) | Maximum bloom. |
| `percentOverride` | No (`0`) | Unknown; use a vanilla value. |
| `barrelLength` | No (`0`) | `TppEquip.BARREL_LENGTH_*`. |
| `hasScopeMount`, `hasSideMount`, `hasUnderMount` | No (`0`) | `1` enables that mount. |

---

## Magazine (`SetMagazine`)

```lua
V_TppEquip.SetMagazine{
  ammoId       = TppEquip.AM_Example,
  equipAmmoId  = TppEquip.EQP_AM_Example,
  capacity     = 30,
  totalCarry   = 210,
  bulletId     = TppEquip.BL_Example,
  magazineType = V_MagazineType.AssaultNormal,
}
```

| Field | Required | Purpose |
|---|---|---|
| `ammoId` | Yes | Magazine to define. |
| `equipAmmoId` | No (`0`) | Ammo equip ID for resupply. |
| `capacity` | No (`0`) | Magazine size. |
| `totalCarry` | No (`0`) | Maximum carried rounds. |
| `bulletId` | No (`0`) | Projectile fired. |
| `magazineType` | No (unchanged) | A [`V_MagazineType`](/V_Framework_Lua_API#magazine-motion-types); reload animations. |

---

## Bullet (`SetBullet`)

Speed, drop, falloff, penetration, tracer and bullet type.

```lua
V_TppEquip.SetBullet{
  bulletId       = TppEquip.BL_Example,
  bulletSpeed    = 450,
  npcBulletSpeed = 450,
  dropRate       = 18,

  bulletParamSetsBase = {
    tranqNear  = 50, tranqFar  = 90, tranqResidual  = 0.75,
    damageNear = 45, damageFar = 60, damageResidual = 0.75,
    impactNear = 40, impactFar = 70, impactResidual = 0.8,
    penNear = TppEquip.PENETRATE_LEVEL_RIFLE,
    penFar  = TppEquip.PENETRATE_LEVEL_TRANQ,
    penSwitchDistance = 45,
  },

  npcBulletParamSetsBase = 8,
  bulletTrailEffect      = 0,
  ricochetSize           = TppEquip.RICOCHET_SIZE_DEFAULT,
  bulletType             = TppEquip.BULLET_TYPE_NORMAL,
  blastId                = 0,
  isLethal               = 1,
  eqpType                = TppEquip.EQP_TYPE_Assault,
  ammoPerShot            = 1,
}
```

`bulletId` is required.

| Field | Required | Purpose |
|---|---|---|
| `bulletSpeed` | No (`0`) | Player-fired speed, m/s. |
| `npcBulletSpeed` | No (`0`) | NPC-fired speed. Always set it. |
| `dropRate` | No (`0`) | Bullet drop. |
| `bulletParamSetsBase` | No (`0`) | Player falloff and penetration (table or vanilla row). |
| `npcBulletParamSetsBase` | No (`0`) | NPC falloff and penetration. Always set it. |
| `bulletTrailEffect` | No (`0`) | Trail index or `.vfx` path. |
| `ricochetSize` | No (`0`) | Impact size. |
| `bulletType` | No (`0`) | Normal, spread, blast, shell, water or airshock. |
| `blastId` | No (`0`) | Explosion for explosive projectiles. A shell with `0` never detonates. |
| `isLethal` | No (`0`) | `1` lethal, `0` non-lethal. |
| `eqpType` | No (`0`) | Weapon family. |
| `ammoPerShot` | No (`0`) | Rounds used per trigger pull, `1-1023`. |

Falloff: full value until `*Near`, fades by `*Far`, then stays at
`*Residual`. Penetration order: `MINIMUM < TRANQ < HANDGUN < RIFLE <
SNIPER < AMRIFLE`.

### Homing bullets (`lockOn`)

Optional. Makes bullets lock on and home. Not for launcher shells.

```lua
lockOn = {
  count = 1, time = 0.8, turnRate = 120,
  minRange = 0, maxRange = 100,
  canLockOnSoldier = true, canLockOnVehicle = false,
}
```

| Field | Required | Purpose |
|---|---|---|
| `count` | No (`1`) | Targets locked at once. |
| `time` | No (`1`) | Seconds to lock. |
| `turnRate` | No (`90`) | Steering, degrees per second. |
| `minRange` / `maxRange` | No (`0` / `50`) | Lock distance, metres. |
| `bulletSpeed`, `bulletType`, `ammoPerShot` | No (the bullet's) | Overrides for locked shots. |
| `homingStartDistance` | No (`0`) | Straight flight before homing. |
| `canLockOnSoldier`, `canLockOnVehicle` | No (vanilla targets) | Allowed targets. |

For the lock marker, add
`/Assets/tpp/ui/GraphAsset/entry_datas/reticle/reticle_lockon.fox2` to
the weapon `.fpkd`, and the `hud_marker_lockon` `.uilb`, `.uif` and all
eight `.uia` files to the `.fpk`. `TppEquip.RETICLE_UI_MISSILE` gives
the launcher hip-fire reticle.

---

## Optional attachments

Everything here is optional.

### Muzzle option (`SetMuzzle`)

Suppressor or compensator. The model comes from the weapon pack.

```lua
V_TppEquip.SetMuzzle{
  muzzleOptionId = TppEquip.MO_Example,
  grouping       = 1.0,
  durability     = 30,
  suppressor     = 1,
}
```

| Field | Required | Purpose |
|---|---|---|
| `muzzleOptionId` | Yes | Part to define. |
| `grouping` | No (`1.0`) | Spread per shot multiplier; below `1.0` is tighter. |
| `durability` | No (`-1`) | Suppressor life in shots; `-1` infinite. |
| `suppressor` | No (`0`) | `1` suppressor, `0` brake/compensator. |

### Sight (`SetSight`)

```lua
V_TppEquip.SetSight{
  scopeId = TppEquip.ST_Example,
  zoom1 = 2, zoom2 = 4, zoom3 = 0,
  scopeUiId = TppEquip.SCOPE_UI_DEFAULT,
  booster = 0, nvg = 0, builtIn = 1,
  rangeFinder = 0, rangeFinderBulletDrop = 0,
}
```

| Field | Required | Purpose |
|---|---|---|
| `scopeId` | Yes | Part to define. |
| `zoom1`-`zoom3` | No (`0`) | Zoom steps; `0` disables a step. |
| `scopeUiId` | No (`SCOPE_UI_NONE`) | Overlay borrowed from the vanilla sight with this value and the nearest zoom: `SCOPE_UI_NONE` (0), `SCOPE_UI_DEFAULT` (1), `SCOPE_UI_DOT` (2). |
| `booster`, `nvg`, `builtIn`, `rangeFinder`, `rangeFinderBulletDrop` | No (`0`) | `1` enables. |
| `windowFactoryName`, `scopeUiPath` | No (none) | Pick the scope overlay yourself (below). |

Copy the borrowed sight's UI files into your sight package at the same paths,
or the scope draws nothing. For `st16`: `sight_st16.fox2` in the `.fpkd`;
`UI_wpscope_st16.uilb`, `UI_wpscope_st16.uif` and the `hud_bino`,
`hud_wpscope/UI_bino.uilb` and `hud_keyhelp` UI files in the `.fpk`. The full
set is in `/Assets/tpp/pack/collectible/chimera/sight/st16_main0_def_v00.fpk`/`.fpkd`.

#### Vanilla scope overlay by name

Set only `windowFactoryName` to a vanilla sight factory to use that
overlay, whatever the zoom:

```lua
windowFactoryName = "SightSt13Factory",
```

Names: `SightSt00Factory`-`SightSt17Factory` (`st03` and `st08` are
`SightSt03_0Factory`/`SightSt03_1Factory` and
`SightSt08_0Factory`/`SightSt08_1Factory`), `SightMs00Factory`-`SightMs03Factory`,
`SightAr02Factory`. Ship that sight's UI files as above.

#### Custom scope overlay

Give both `windowFactoryName` and `scopeUiPath`:

```lua
windowFactoryName = "V_MyScopeFactory",
scopeUiPath       = "/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_my_scope.uilb",
```

The overlay shows your `scopeUiPath` art; the zoom readout, key help and
binocular frame stay vanilla. Your sight package needs a sight `.fox2` naming
the factory: copy a vanilla one, for example
`/Assets/tpp/ui/GraphAsset/entry_datas/sight/sight_st13.fox2`, and change two
values:

```xml
<property name="rawFiles" type="FilePtr" container="DynamicArray" arraySize="4">
  <value>/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_my_scope.uilb</value>
  <value>/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_bino.uilb</value>
  <value>/Assets/tpp/ui/LayoutAsset/hud_bino/UI_wp_zoom.uilb</value>
  <value>/Assets/tpp/ui/LayoutAsset/hud_keyhelp/UI_bino_keyhelp_zoom_icon.uilb</value>
</property>
...
<property name="createWindowParams" type="FilePtr" container="StringMap" />
<property name="windowFactoryName" type="String" container="StaticArray" arraySize="1">
  <value>V_MyScopeFactory</value>
</property>
```

| Property | Set to |
|---|---|
| `rawFiles`, first entry | Your `scopeUiPath`. The other three stay as in vanilla. |
| `windowFactoryName` | Your `windowFactoryName`. Must not be a vanilla name. |
| `createWindowParams` | Leave empty. |

Ship the `.fox2` in your sight's `.fpkd` under your own path. Put your `.uilb`
(cloned and edited in FoxKit) with its `.uif`, `.uia` and textures in the
`.fpk`, together with `UI_bino.uilb`, `UI_wp_zoom.uilb` and
`UI_bino_keyhelp_zoom_icon.uilb`. Up to 61 custom overlays can be loaded at
once; sights with the same name and path share one.

### Stock (`SetStock`)

```lua
V_TppEquip.SetStock{
  stockId        = TppEquip.SK_Example,
  spreadRecovery = 1.1,
  movementSway   = 0.8,
}
```

`stockId` is required. Both fields default to `1.0` (neutral); higher
`spreadRecovery` is better, lower `movementSway` is steadier.

### Laser or flashlight (`SetOption`)

```lua
V_TppEquip.SetOption{ optionId = TppEquip.LS_Example, isLaser = 1 }
V_TppEquip.SetOption{ optionId = TppEquip.LT_Example, isLight = 1 }
```

`optionId` is required; `isLaser` and `isLight` default to `0`.

#### Laser colour

Optional, with `isLaser = 1`. Values `0.0-1.0`; `a` is alpha (`0`
hides the dot, stock `0.5`).

```lua
laserColor = { r = 0, g = 1, b = 0, a = 0.5 },   -- or { 0, 1, 0, 0.5 }

laserColor = {                                   -- per weapon
  default                    = { 1, 0, 0, 0.5 },
  [TppEquip.EQP_WP_Example1] = { 0, 1, 0, 0.5 },
},
```

A non-red laser has no muzzle flare. Swapping weapons mid-mission
recolours the dot but not the beam.

#### Laser appearance

All optional; omitted fields keep the stock value.

| Field | Stock | Effect |
|---|---|---|
| `laserThickness` | `4.0` | Beam width on screen. |
| `laserFadeIn` | `8.0` | Metres the beam fades in from the muzzle. |
| `laserOvershoot` | `3.0` | Metres past the end when hitting nothing. |
| `laserOvershootBlocked` | `0.1` | Same, when hitting something. |
| `laserScrollU` / `laserScrollV` | `-0.6` / `0.2` | Texture scroll, layer 1. |
| `laserScrollU2` / `laserScrollV2` | `-0.5` / `-0.11` | Texture scroll, layer 2. |
| `laserTilingAlong` / `laserTilingAcross` | `0.2` / `0.8` | Texture tiling, layer 1. |
| `laserTilingAlong2` / `laserTilingAcross2` | `0.3` / `1.2` | Texture tiling, layer 2. |
| `laserDotCone` | `0.06` | Dot glow width. |
| `laserDotLuminance` / `laserDotLuminanceMin` | `600.0` / `1.0` | Dot brightness, bright and dim. |
| `laserExposureMax` / `laserExposureMin` | `-13.6` / `-4.0` | Exposure range for the brightness. |

### Underbarrel (`SetUnderBarrel`)

```lua
V_TppEquip.SetUnderBarrel{
  underBarrelId    = TppEquip.UB_Example,
  receiverId       = TppEquip.RC_10307_u,
  magazineId       = TppEquip.AM_10302,
  underBarrelGrade = 7,
}
```

| Field | Required | Purpose |
|---|---|---|
| `underBarrelId` | Yes | Part to define. |
| `receiverId` | Yes | Receiver it fires with (vanilla or custom). |
| `magazineId` | No (none) | Its magazine (vanilla or custom). |
| `underBarrelGrade` | No (`0`) | Grade. |
| `motionFrom` | No (a vanilla underbarrel with the same receiver type) | Vanilla underbarrel whose animations to use. |

---

## Assemble with `SetGunBasic`

```lua
V_TppEquip.SetGunBasic{
  weaponId       = TppEquip.WP_Example,
  receiverId     = TppEquip.RC_Example,
  barrelId       = TppEquip.BA_Example,
  ammoId         = TppEquip.AM_Example,
  stockId        = TppEquip.SK_Example,
  muzzleId       = TppEquip.MZ_None,
  muzzleOptionId = TppEquip.MO_Example,
  scope1Id       = TppEquip.ST_Example,
  underBarrelId  = TppEquip.UB_Example,
  laserFlash1Id  = TppEquip.LT_Example,
  laserFlash2Id  = TppEquip.LS_Example,
  weaponGrade    = 7,
}
```

| Field | Required | Purpose |
|---|---|---|
| `weaponId` | Yes | Weapon to assemble. |
| `ammoId` | Yes | Magazine. Missing: rejected. |
| `receiverId` | No (vanilla part) | Receiver. |
| `barrelId` | No (vanilla part) | Barrel; `0` for none. |
| `stockId`, `muzzleId`, `muzzleOptionId`, `scope1Id`, `scope2Id`, `underBarrelId`, `laserFlash1Id`, `laserFlash2Id` | No (none) | Attachments. No custom `muzzleId` yet. |
| `weaponGrade` | No (`1`) | Sets the weapon's actual stats. The R&D grade does not. |

---

## Add the R&D row (`AddToEquipDevelopTable`)

Makes the weapon developable in R&D. Stat bars come from its parts.

```lua
V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:Example", {
  const = {
    equipID            = TppEquip.EQP_WP_Example,
    equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Assault,
    langEquipName      = "example_weapon_name",
    langEquipInfo      = "example_weapon_desc",
    iconFtexPath       = "/Assets/.../ui_icon_example",
  },
  flow = {
    grade             = 7,
    developGmpCost    = 180000,
    developTimeMinute = 30,
    initialAvailable  = 0,
  },
})
```

All fields: [AddToEquipDevelopTable](/V_Framework_Lua_API#addtoequipdeveloptable).

---

## Minimal complete example

An assault rifle reusing vanilla barrel and stock.

```lua
local this = {}

function this.LoadLibraries()
  V_TppEquip.RegisterConstantEquipId("EQP_WP_Example")
  V_TppEquip.RegisterConstantEquipId("EQP_AM_Example")

  V_TppEquip.DeclareWPs     { "WP_Example" }
  V_TppEquip.DeclareRCs     { "RC_Example" }
  V_TppEquip.DeclareAMs     { "AM_Example" }
  V_TppEquip.DeclareBLs     { "BL_Example" }
  V_TppEquip.DeclareDamages { "ATK_Example" }

  V_TppEquip.AddToEquipIdTable{
    { TppEquip.EQP_WP_Example, TppEquip.EQP_TYPE_Assault, TppEquip.WP_Example, TppEquip.EQP_BLOCK_MISSION,
      "/Assets/tpp/parts/weapon/example_main0.parts", "/Assets/tpp/pack/weapon/wp_example_main0.fpk" },
    { TppEquip.EQP_AM_Example, TppEquip.EQP_TYPE_Ammo, 0, TppEquip.EQP_BLOCK_NONE,
      "/Assets/tpp/weapon/amo/Scenes/am01_main0_def.fmdl", "" },
  }

  V_TppEquip.SetDamage{
    damageId       = TppDamage.ATK_Example,
    lethalDamage   = 680,
    lethalDamageUI = 680,
    impactForce    = 300,
    damageSource   = TppDamage.DAM_SOURCE_Assault,
    injureType     = TppDamage.INJ_TYPE_BULLET,
    injurePart     = TppDamage.INJ_PART_ALL,
    hitNPC         = 1,
  }

  V_TppEquip.SetReceiver{
    receiverId = TppEquip.RC_Example,
    attackId   = TppDamage.ATK_Example,
    receiverParamSetsBase = {
      fireRate = 540, aimAssistDist = 47, gunAimAdjust = 0.3,
      effectiveRange = 47, effectiveRangeUI = 47,
      adsZoom = 0.35, adsFov = 42, reloadSpeed = 1,
    },
    receiverParamSetsWobbling = {
      spreadPerShot = 0.64, unk2 = 0.64, spreadRecovery = 3.4,
      spreadMin = 0.38, spreadMax = 2.8, shotKick = 0.18, shotKick2 = 0.39,
    },
    receiverParamSetsSystem = {
      eqpType = TppEquip.EQP_TYPE_Assault,
      reticleUiId = TppEquip.RETICLE_UI_ASSAULT,
      triggerId = TppEquip.TRIGGER_FULLAUTO,
      showMagazineMesh = 1, plusOneChamber = 1,
    },
    receiverParamSetsSound = "ar01",
    motionFrom = TppEquip.RC_10102,
  }

  V_TppEquip.SetMagazine{
    ammoId = TppEquip.AM_Example, equipAmmoId = TppEquip.EQP_AM_Example,
    capacity = 30, totalCarry = 210, bulletId = TppEquip.BL_Example,
  }

  V_TppEquip.SetBullet{
    bulletId = TppEquip.BL_Example,
    bulletSpeed = 450, npcBulletSpeed = 450, dropRate = 18,
    bulletParamSetsBase = 8, npcBulletParamSetsBase = 8,
    bulletTrailEffect = 0,
    ricochetSize = TppEquip.RICOCHET_SIZE_DEFAULT,
    bulletType = TppEquip.BULLET_TYPE_NORMAL,
    isLethal = 1, eqpType = TppEquip.EQP_TYPE_Assault,
  }

  V_TppEquip.SetGunBasic{
    weaponId = TppEquip.WP_Example, receiverId = TppEquip.RC_Example,
    barrelId = TppEquip.BA_10102, ammoId = TppEquip.AM_Example,
    stockId = TppEquip.SK_10102, scope1Id = TppEquip.ST_None,
    weaponGrade = 7,
  }

  V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:Example", {
    const = {
      equipID            = TppEquip.EQP_WP_Example,
      equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Assault,
      langEquipName      = "example_Title",
      langEquipInfo      = "example_Desc",
      iconFtexPath       = "/Assets/tpp/pack/ui/texture/EquipIcon/weapon/example/example_UIHigh",
    },
    flow = { grade = 7, developGmpCost = 180000, initialAvailable = 1 },
  })
end

return this
```

---

## Cross-family handling (`SetWeaponHandling`)

Makes a weapon hold, aim and reload like any vanilla weapon while
keeping its own model, stats, category and name - e.g. a handgun that
handles like a shotgun.

```lua
V_TppEquip.SetWeaponHandling{
  equipId    = TppEquip.EQP_WP_SkullFace_010,
  familyFrom = TppEquip.EQP_WP_SP_sg_010,
}
```

Both fields required.

---

## Custom gun motion (`SetReceiverMotion`)

Gives a receiver its own animations on top of a vanilla motion type:
Snake's hand clips, the gun model's clips, and the slide/bolt/hammer
movement per shot.

| Key | Required | Animates |
|---|---|---|
| `playerMotion` | No (vanilla) | Snake's hands and arms (clips in your player-side `.mtar`). |
| `weaponMotion` | No (vanilla) | The gun model during a clip (clips in your gun-side `.mtar`). |
| `partMotion` | No (vanilla) | Slide, bolt and hammer per shot, and the idle pose. |

This example uses only vanilla hg00 assets; pack a copy of
`hg00_asm.mtar` in your weapon `.fpk` under the same path.

```lua
V_TppEquip.SetReceiverMotion{
  receiverId   = TppEquip.RC_Example,
  receiverType = V_ReceiverType.HandgunQuickRefire,

  playerMotion = {
    mtar = "/Assets/tpp/motion/mtar/player2/Receiver/pl_rcvr_hg00.mtar",
    pack = "/Assets/tpp/pack/player/motion/equip/receiver/pl_rcvr_hg00.fpk",
    clips = {
      hold        = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snaphg00/snaphg00_s_fre.gani",
      fire        = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snaphg00/snaphg00_s_fre.gani",
      cock        = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snaphg00/snaphg00_s_fre.gani",
      reload      = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snaphg00/snaphg00_s_fre_emp_rld.gani",
      reloadEmpty = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snaphg00/snaphg00_s_fre_emp_rld.gani",
      grip        = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snaphg00/snaphg00_s_fre.gani",
    },
    oneHand = {
      hold   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre.gani",
      fire   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre.gani",
      reload = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre_rld.gani",
      grip   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre.gani",
    },
    oneHandCqc = {
      hold   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcqc/snapcqc_s_chk_fre.gani",
      fire   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcqc/snapcqc_s_chk_fre.gani",
      reload = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcqc/snapcqc_s_chk_fre_rld.gani",
      grip   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcqc/snapcqc_s_chk_fre.gani",
    },
    oneHandCrouch = {
      hold   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre.gani",
      fire   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre.gani",
      reload = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre_rld.gani",
    },
    horse = {
      hold   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre.gani",
      fire   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre.gani",
      reload = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre_rld.gani",
    },
    crouch = {
      reload      = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snaphg00/snaphg00_c_fre_emp_rld_std.gani",
      reloadEmpty = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snaphg00/snaphg00_c_fre_emp_rld_std.gani",
    },
  },

  weaponMotion = {
    mtar  = "/Assets/tpp/motion/mtar/equip/chimera/assemble/hg00_asm.mtar",
    clips = {
      reloadEmpty = "/Assets/tpp/motion/SI_game/fani/props/hg00/hg00snap/hg00snap_s_fre_emp_rld.gani",
    },
  },

  partMotion = {
    shoot      = { { "SKL_001_SLIDE",  TppEquip.AXIS_Z_TRANS, TppEquip.MOVE_ROUND,  0, 0.10, -0.033 },
                   { "SKL_004_HAMMER", TppEquip.AXIS_X_ROT,   TppEquip.MOVE_ONEWAY, 0, 0.05, -62 } },
    shootLast  = { { "SKL_001_SLIDE",  TppEquip.AXIS_Z_TRANS, TppEquip.MOVE_ONEWAY, 0, 0.05, -0.033 },
                   { "SKL_004_HAMMER", TppEquip.AXIS_X_ROT,   TppEquip.MOVE_ONEWAY, 0, 0.05, -62 } },
    poseLoaded = { { "SKL_004_HAMMER", TppEquip.AXIS_X_ROT,   -62 } },
    poseEmpty  = { { "SKL_001_SLIDE",  TppEquip.AXIS_Z_TRANS, -0.033 },
                   { "SKL_004_HAMMER", TppEquip.AXIS_X_ROT,   -62 } },
    casing     = { shoot = true, shootLast = true },
  },
}
```

`receiverType` does what `motionFrom` does; if both are set, it wins.

### `playerMotion`

| Field | Required | Purpose |
|---|---|---|
| `mtar` | Yes | Archive with the hand clips. |
| `pack` | Yes | `.fpk` holding that archive. Missing: no hand clip plays. |
| `clips` | Yes | Normal two-hand stance. |
| `oneHand` | No (`clips`) | One-hand mode, e.g. carrying a body. |
| `oneHandCqc` | No (`oneHand`) | One-hand while holding someone in CQC, standing or crouched. |
| `oneHandCrouch` | No (`oneHand`) | One-hand while crouched, outside CQC. hg00 has no such clip, so the example reuses `oneHand`'s. |
| `horse` | No (`clips`) | On horseback. Handguns: give it the `oneHand` clips. |
| `crouch` | No (`clips`) | Crouched two-hand stance. |

### Clip fields

All optional.

| Field | Plays for | Fallback |
|---|---|---|
| `hold` | Aim and idle, and any request not listed | none |
| `fire` | Firing | `hold` |
| `cock` | Chambering a round | `hold` |
| `reload` | Reload with rounds left | none |
| `reloadEmpty` | Reload when empty | `reload` |
| `dualReload` | Reload with a dual magazine | `reload` |
| `grip` | Support-hand grip | none |
| `magazineGrip` | Support hand on the magazine | none |
| `magazineGripDual` | Same, dual magazine | `magazineGrip` |
| `underBarrelGrip` | Grip with an underbarrel | none |
| `stepReload` | Round-by-round reload | none |
| `stepReloadEmpty` | Same, when empty | none |

A clip is an asset path (`/Assets/.../x.gani`), the id MtarTool prints
(`228f6f3d7c6f1`), or a full 16-digit path id (`0xFC5228F6F3D7C6F1`).

### `weaponMotion`

| Field | Required | Purpose |
|---|---|---|
| `mtar` | Yes | Gun-side archive; pack it in your weapon `.fpk`. |
| `clips` | No (vanilla clips) | Same fields as `playerMotion.clips`. |

### `partMotion`

All optional. At most two rows per list.

| List | Plays on |
|---|---|
| `shoot` | A shot with rounds left |
| `shootLast` | The shot that empties the magazine |
| `poseLoaded` | Idle, rounds left |
| `poseEmpty` | Idle, empty |

Motion row `{ bone, axis, moveType, start, end, value }`; pose row
`{ bone, axis, value }`.

| Value | Meaning |
|---|---|
| `bone` | Bone in your model, e.g. `SKL_001_SLIDE`, `SKL_004_HAMMER`, `SKL_002_BOLT`, `SKL_002_CYLINDER`. |
| `axis` | `TppEquip.AXIS_Z_TRANS` (metres), `AXIS_X_ROT` or `AXIS_Z_ROT` (degrees). |
| `moveType` | `TppEquip.MOVE_ROUND` (out and back), `MOVE_ONEWAY` (stays), `MOVE_ONEWAY_REV`. |
| `start`, `end` | Seconds after the shot, `0-2.55`. |
| `value` | Distance or angle from rest. |

`casing.shoot` / `casing.shootLast` (default `true`) eject a casing on
that shot. Revolvers use `false`.

---

## Remote-controlled missile (`SetRemoteMissile`)

Makes a weapon's shell steerable like the rocket arm.

```lua
V_TppEquip.SetRemoteMissile{
  receiverId       = TppEquip.RC_Nikita_010,
  maxFlightSeconds = 20,
  cameraDistance   = 4.0,
}
```

| Field | Required | Purpose |
|---|---|---|
| `receiverId` | One of these two | Every weapon with this receiver. |
| `equipId` | One of these two | One weapon only. |
| `attackId` | No (receiver's) | Damage row `1-1023` for the blast and hit. |
| `maxFlightSeconds` | No (`20`) | Flight time, `1-90`. |
| `maxRange` | No (`0`, unlimited) | Metres from launch, `0-100000`. |
| `cameraDistance` | No (`4.0`) | Camera distance behind, `0-50`. |
| `cameraHeight` | No (`0.0`) | Camera height, `-50-50`. |
| `minSpeed` / `maxSpeed` | No (`0`, game default) | Speed limits, `0-100`. Full boost reaches `maxSpeed`. |
| `fireVoiceId` | No (none) | Voice clip the player shouts on firing. |

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework Lua API](/V_Framework_Lua_API)
  - [V Framework Custom Outfits](/V_Framework_Custom_Outfits)
