---
title: Custom Weapons
permalink: /V_Framework/Custom_Weapons/
tags: [Lua, Reference, Guides, Infinite Heaven, Weapons, V Framework]
redirect_from:
    - /V_Framework_Custom_Weapons/
---

A custom weapon is assembled from parts: receiver, barrel, magazine,
bullet, and optional sight, stock, muzzle, laser/light and underbarrel.

Place all calls inside `this.LoadLibraries()`.

## Workflow

1. [Register and declare IDs](#register-and-declare-ids)
2. Configure [Damage](#damage-setdamage),
   [Receiver](#receiver-setreceiver), [Barrel](#barrel-setbarrel),
   [Magazine](#magazine-setmagazine), [Bullet](#bullet-setbullet) and
   any [optional attachments](#optional-attachments)
3. [Assemble with `SetGunBasic`](#assemble-with-setgunbasic)
4. [Add the R&D row](#add-the-rd-row-addtoequipdeveloptable)

Declare a custom part name before any `Set*` call uses it. Every
parameter set takes a **number** (reuse a vanilla row) or a **table**
(custom values).

> Vanilla part IDs (e.g. `TppEquip.BA_10102`) work in any `SetGunBasic`
> slot; configure only the parts you replace.
{:.tip}

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

Map each equip ID to its model and pack ([row
format](/V_Framework/Lua_API#equip-ids)):

```lua
V_TppEquip.AddToEquipIdTable{
  { TppEquip.EQP_WP_Example, TppEquip.EQP_TYPE_Assault, TppEquip.WP_Example, TppEquip.EQP_BLOCK_MISSION,
    "/Assets/tpp/parts/weapon/eft/556x45/example/example_main0.parts",
    "/Assets/tpp/pack/weapon/eft/wp_example_main0.fpk" },
  { TppEquip.EQP_AM_Example, TppEquip.EQP_TYPE_Ammo, 0, TppEquip.EQP_BLOCK_NONE,
    "/Assets/tpp/weapon/amo/Scenes/am01_main0_def.fmdl", "" },
}
```

### Placing in fox2 files

A placed-item or pickable locator's `equipId` field takes a custom
`RegisterConstantEquipId` name (e.g. `"EQP_WP_Example"`) like a vanilla
one; a pickable keeps its count. The declaring mod must load before the
mission. Not in FOB.

---

## Damage (`SetDamage`)

The attack a receiver deals.

```lua
V_TppEquip.SetDamage{
  damageId                = TppDamage.ATK_Example,
  lethalDamage            = 700,
  oldLethalDamageVsSoldier = 7000,
  impactForce             = 40,
  damageSource            = TppDamage.DAM_SOURCE_Assault,
  injureType              = TppDamage.INJ_TYPE_BULLET,
  injurePart              = TppDamage.INJ_PART_ALL,
  isBullet                = 1,
}
```

`damageId` is required; every other field defaults to `0`. Fields are in
vanilla `DamageParameterTables.lua` column order:

| Col | Field | Notes |
|----:|---|---|
| 1 | `damageId` | `TppDamage.ATK_*` |
| 2 | `oldLethalDamageVsSoldier` | vs soldiers and animals. Old name `lethalDamageUI`, at a tenth of the scale (`700` = `7000`). |
| 3 | `oldLethalDamageVsPlayer` | vs the player, buddies, cbox, decoy, supply crate. |
| 4 | `oldLethalDamageVsVehicle` | vs vehicles and Sahelanthropus. |
| 5 | `oldStaminaDamageVsSoldier` | Stamina vs soldiers. |
| 6 | `oldStaminaDamageVsPlayer` | Stamina vs player and buddies. |
| 7 | `blowPower` | `1000`+ staggers; below only flinches. |
| 8 | `shieldDamage` | Shield-breaking power. |
| 9 | `injureType` | `TppDamage.INJ_TYPE_*` |
| 10 | `injurePart` | `TppDamage.INJ_PART_*` |
| 11 | `injureMaxDistance` | Metres the injury applies within, `0-255`; `0` = never. |
| 12 | `injureRate` | Injury chance in %, lethal hits only. |
| 13 | `isBullet` | Set on any bullet attack. Old name `hitNPC`. |
| 14-28 | `isSniper`, `isShotgun`, `isTranq`, `isStun`, `isExplosive`, `isMelee`, `isBlade`, `isFire`, `isParasite`, `isGas`, `isVehicleHit`, `unk25`, `isElectric`, `isWater`, `isPenetrating` | `0`/`1` flags, in this order; `unk25` unused. |
| 29 | `damageSource` | `TppDamage.DAM_SOURCE_*` |
| 30 | `lethalDamage` | |
| 31 | `staminaDamage` | |
| 32 | `impactForce` | |

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
| [`motionFrom`](#borrowing-motion-motionfrom) | No | Receiver whose animations to use. |

### Base fields

| Field | Required | Purpose |
|---|---|---|
| `fireRate` | No (`0`) | Rounds per minute. |
| `aimAssistDist` | No (`0`) | Aim-assist distance. |
| `gunAimAdjust` | No (`0`) | Auto-aim strength. |
| `effectiveRange` | No (`0`) | Effective range. |
| `effectiveRangeUI` | No (`0`) | Range shown in R&D. |
| `adsZoom` | No (`0`) | Zoom while aiming. |
| `adsFov` | No (`0`) | Field of view while aiming. |
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

Uses that receiver's animations; include its `.mtar` in your `.fpk`.

A gun whose kind (its `AddToEquipIdTable` type) differs from its
receiver's kind animates like a game gun of its own kind: the
[`SetWeaponHandling`](#cross-family-handling-setweaponhandling)
`familyFrom` gun, else one sharing its barrel, else its stock, else the
first gun of that kind. The log names the pick once per gun (info line
starting `WeaponKey:`). To choose yourself, point `motionFrom` at a
receiver of the gun's own kind. Own clips: [Custom gun
motion](#custom-gun-motion-setreceivermotion).

---

## Fire sound (`receiverParamSetsSound`)

Takes one of:

| Form | Example | Effect |
|---|---|---|
| Root string | `"ar01"` | Plays that vanilla weapon's fire sound. |
| Number | `12` | Reuses a vanilla sound row. |
| `event` | `{ event = "sfx_w_p_ar01_m_active" }` | Plays that exact event name. |
| `name` + `middle` | `{ name = "ms00", middle = false }` | Root with the `_m` segment forced on (`true`) or off (`false`); for a sound from another weapon family. |

Add `sup = "root"` or `supEvent = "exact_event"` for the suppressed
sound (soldiers use it too). Missile and rocket sounds have none: a
suppressor silences them.

> Roots (`"ar01"`) go in the string form or `name`; full event names in
> `event` or `supEvent`. A silent root: flip `middle` or try a
> neighbouring root.
{:.important}

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

In `barrelParamSetsBase`, `1.0` is neutral and an omitted field is `0`.
The `*Mult` fields go past the vanilla cap of `2.55`; `unk2` and
`percentOverride` stay capped at it.

| Field | Required | Purpose |
|---|---|---|
| `barrelId` | Yes | Barrel to define. |
| `barrelParamSetsBase` | No (`0`) | Number or table; its fields are the next seven rows. |
| `fireRateMult` | No (`0`) | Fire rate. |
| `unk2` (in the table) | No (`0`) | Unknown; capped at `2.55`. Use a vanilla value. |
| `gunAimAdjustMult` | No (`0`) | Aim adjustment. |
| `rangeMult` | No (`0`) | Effective range. |
| `rangeUIMult` | No (`0`) | Range shown in R&D. |
| `spreadMaxMult` | No (`0`) | Maximum bloom. |
| `percentOverride` | No (`0`) | Unknown; use a vanilla value. |
| `barrelLength` | No (`0`) | `TppEquip.BARREL_LENGTH_*`. |
| `hasScopeMount`, `hasSideMount`, `hasUnderMount` | No (`0`) | `1` enables that mount. |
| `unk2` | No (`0`) | Top-level flag, not the `barrelParamSetsBase` field of the same name. Unknown; use a vanilla value. |

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
| `magazineType` | No (the based-on gun's) | A [`V_MagazineType`](/V_Framework/Lua_API#magazine-motion-types); reload animations. Default: the [`familyFrom`](#cross-family-handling-setweaponhandling) gun's, else the first vanilla gun on the receiver's [`motionFrom`](#borrowing-motion-motionfrom). Ignored on a receiver of another gun kind (uses the gun it [animates like](#borrowing-motion-motionfrom)). |

`SetMagazine` may be called again with a different `magazineType`.

An ammo row with a bullet equip in its `subId` slot (third value of an
[`AddToEquipIdTable`](/V_Framework/Lua_API#equip-ids) row, as vanilla
grenade ammo) fires that projectile; `SetMagazine` does not replace it:

```lua
{ TppEquip.EQP_AM_Example, TppEquip.EQP_TYPE_Ammo, TppEquip.EQP_BL_20mmGrenade, TppEquip.EQP_BLOCK_NONE,
  "/Assets/tpp/weapon/amo/Scenes/am01_main0_def.fmdl", "" },
```

Plain ammo rows keep `0` there.

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

| Field | Required | Purpose |
|---|---|---|
| `bulletId` | Yes | Bullet to define. |
| `bulletSpeed` | No (`0`) | Player-fired speed, m/s. |
| `npcBulletSpeed` | No (`0`) | NPC-fired speed. Always set it. |
| `dropRate` | No (`0`) | Bullet drop. |
| `bulletParamSetsBase` | No (`0`) | Player falloff and penetration. |
| `npcBulletParamSetsBase` | No (`0`) | NPC falloff and penetration. Always set it. |
| `bulletTrailEffect` | No (`0`) | Trail index or `.vfx` path. |
| `unk09` | No (`0`) | Unknown; use a vanilla value. |
| `ricochetSize` | No (`0`) | Impact size. |
| `bulletType` | No (`0`) | Normal, spread, blast, shell, water or airshock. |
| `blastId` | No (`0`) | Explosion for explosive projectiles. A shell with `0` never detonates. |
| `isLethal` | No (`0`) | `1` lethal, `0` non-lethal. |
| `eqpType` | No (`0`) | Weapon family. |
| `ammoPerShot` | No (`0`) | Rounds used per trigger pull, `1-1023`. |

Falloff curve and penetration order:
[bulletParamSetsBase](/EquipParameters#bulletparamsetsbase-falloff-pool-row-stride-22).

`DeclareBLs` has no limit; up to 125 custom bullets can be in use per
mission, and each one past that fires as the vanilla bullet of its
`bulletType` with a log warning. `BL_` numbers are stable across
sessions (256 and up past the byte range). Every `bulletId` field takes
any declared `BL_`, `lockOn` and `ammoPerShot` work on it, and
`TppEquip.GetAmmoInfo` returns it.

### Homing bullets (`lockOn`)

Optional `SetBullet` field. Not for launcher shells.

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
the launcher reticle.

---

## Optional attachments

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
| `windowFactoryName`, `scopeUiPath` | No | Pick the scope overlay yourself (below). |

Copy the borrowed sight's UI files into your sight package at the same
paths, or the scope draws nothing. For `st16`: `sight_st16.fox2` in the
`.fpkd`; `UI_wpscope_st16.uilb`, `UI_wpscope_st16.uif` and the
`hud_bino`, `hud_wpscope/UI_bino.uilb` and `hud_keyhelp` UI files in the
`.fpk`. The full set is in
`/Assets/tpp/pack/collectible/chimera/sight/st16_main0_def_v00.fpk`/`.fpkd`.

#### Vanilla scope overlay by name

Set only `windowFactoryName` to a vanilla sight factory to use that
overlay, whatever the zoom:

```lua
windowFactoryName = "SightSt13Factory",
```

Names: `SightSt00Factory`-`SightSt17Factory` (`st03` and `st08` are
`SightSt03_0Factory`/`SightSt03_1Factory` and
`SightSt08_0Factory`/`SightSt08_1Factory`),
`SightMs00Factory`-`SightMs03Factory`, `SightAr02Factory`. Ship that
sight's UI files as above.

#### Custom scope overlay

Give both `windowFactoryName` and `scopeUiPath`:

```lua
windowFactoryName = "V_MyScopeFactory",
scopeUiPath       = "/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_my_scope.uilb",
```

Zoom readout, key help and binocular frame stay vanilla. Copy a vanilla
sight `.fox2` (e.g.
`/Assets/tpp/ui/GraphAsset/entry_datas/sight/sight_st13.fox2`) and
change two values:

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

Ship the `.fox2` in your sight's `.fpkd` under your own path; your
`.uilb` (FoxKit) with its `.uif`, `.uia` and textures, plus
`UI_bino.uilb`, `UI_wp_zoom.uilb` and `UI_bino_keyhelp_zoom_icon.uilb`,
in the `.fpk`. Up to 61 custom overlays loaded at once; same name and
path share one.

### Stock (`SetStock`)

```lua
V_TppEquip.SetStock{
  stockId        = TppEquip.SK_Example,
  spreadRecovery = 1.1,
  movementSway   = 0.8,
}
```

| Field | Required | Purpose |
|---|---|---|
| `stockId` | Yes | Part to define. |
| `spreadRecovery` | No (`1.0`, neutral) | Higher recovers bloom faster. |
| `movementSway` | No (`1.0`, neutral) | Lower is steadier. |

### Laser or flashlight (`SetOption`)

```lua
V_TppEquip.SetOption{ optionId = TppEquip.LS_Example, isLaser = 1 }
V_TppEquip.SetOption{ optionId = TppEquip.LT_Example, isLight = 1 }
```

| Field | Required | Purpose |
|---|---|---|
| `optionId` | Yes | Part to define. |
| `isLaser` | No (`0`) | `1` makes the part a laser sight. |
| `isLight` | No (`0`) | `1` makes the part a flashlight. |
| `iconFtexPath` | No (the vanilla laser part picture) | [LASER box](#laser-switch) picture, 256x128; `.ftex` may be left off. |

#### Laser colour

Optional, with `isLaser = 1`. Values `0.0-1.0`; `a` is alpha (`0` hides
the dot, stock `0.5`).

```lua
laserColor = { r = 0, g = 1, b = 0, a = 0.5 },   -- or { 0, 1, 0, 0.5 }

laserColor = {                                   -- per weapon
  default                    = { 1, 0, 0, 0.5 },
  [TppEquip.EQP_WP_Example1] = { 0, 1, 0, 0.5 },
},
```

A non-red laser has no muzzle flare. Swapping weapons mid-mission
recolours the dot but not the beam. `laserColor` and [Laser
appearance](#laser-appearance) affect the player's laser only.

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

#### Laser switch

Built in, no Lua call: a laser gun gets a LASER box (`iconFtexPath`) in
the hold-weapon options strip. Y / B toggles it there; Z / D-pad Left
while aiming. On by default, remembered per weapon. Not in FOB.

  - A beam needs `CNP_BEAM_POINT` in the model.
  - With two option parts, put the laser in the second slot; the game
    drops a first-slot laser.

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
| `magazineId` | No | Its magazine (vanilla or custom). |
| `underBarrelGrade` | No (`0`) | Grade. |
| `motionFrom` | No (a vanilla underbarrel with the same receiver type) | Vanilla underbarrel whose animations to use. On a model with its own `SKL_200_TRIGGER_UB` / `SKL_201_BARREL_UB`, the motion plays on them by bone name; motion for bones the model lacks is not played. |

> Put the under-barrel ammo mesh in `MESH_AMO_UB`, not `MESH_AMO`; it
> hides while the launcher is empty.
{:.note}

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
| `ammoId` | Yes | Magazine. Missing: rejected, no R&D row. |
| `receiverId` | No (`1`) | Receiver. Left out: log warning. |
| `barrelId` | No (`1`) | Barrel; `0` for none. Left out: log warning. |
| `stockId`, `muzzleId`, `muzzleOptionId`, `scope1Id`, `scope2Id`, `underBarrelId`, `laserFlash1Id`, `laserFlash2Id` | No | Attachments. No custom `muzzleId` yet. |
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

All fields:
[AddToEquipDevelopTable](/V_Framework/Lua_API#addtoequipdeveloptable).

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
    damageId                 = TppDamage.ATK_Example,
    lethalDamage             = 680,
    oldLethalDamageVsSoldier = 6800,
    impactForce              = 300,
    damageSource             = TppDamage.DAM_SOURCE_Assault,
    injureType               = TppDamage.INJ_TYPE_BULLET,
    injurePart               = TppDamage.INJ_PART_ALL,
    isBullet                 = 1,
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

Holds, aims and reloads like another vanilla weapon; keeps its own
model, stats, category and name.

```lua
V_TppEquip.SetWeaponHandling{
  equipId    = TppEquip.EQP_WP_Example,
  familyFrom = TppEquip.EQP_WP_West_ar_010,
}
```

| Field | Required | Purpose |
|---|---|---|
| `equipId` | Yes | Weapon to change. |
| `familyFrom` | Yes | Weapon whose handling to use. Must have a row in the game's equip ID table (e.g. `TppEquip.EQP_WP_30101` has none: refused). Keep it to the gun's own kind; another kind breaks aiming (log warning). |

---

## Custom gun motion (`SetReceiverMotion`)

Gives a receiver its own animations on top of a vanilla motion type:
Snake's hand clips, the gun model's clips, and the slide/bolt/hammer
movement per shot.

| Field | Required | Purpose |
|---|---|---|
| `receiverId` | Yes | Receiver to animate. |
| `receiverType` | No | A [`V_ReceiverType`](/V_Framework/Lua_API#receiver-motion-types) to build on, like [`motionFrom`](#borrowing-motion-motionfrom); wins when both are set. |
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

### `playerMotion`

| Field | Required | Purpose |
|---|---|---|
| `mtar` | Yes | Archive with the hand clips. |
| `pack` | Yes | `.fpk` holding that archive. Missing: no hand clip plays. |
| `extraArchives` | No | More hand-clip archives, `{ mtar = ..., pack = ... }` each in its own `.fpk`. Clips play only from these or `mtar`; don't reuse vanilla clip names. |
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
| `stepReload` | Round-by-round reload: `{ start, loop, loop, end }` (the loops alternate per round) | none |
| `stepReloadEmpty` | Same, when empty | none |

A clip is an asset path (`/Assets/.../x.gani`), the ID MtarTool prints
(`228f6f3d7c6f1`), or a full 16-digit path ID (`0xFC5228F6F3D7C6F1`).

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

Motion row `{ bone, axis, moveType, start, end, value }`; pose row `{
bone, axis, value }`.

| Value | Meaning |
|---|---|
| `bone` | Bone in your model, e.g. `SKL_001_SLIDE`, `SKL_004_HAMMER`, `SKL_002_BOLT`, `SKL_002_CYLINDER`. |
| `axis` | `TppEquip.AXIS_Z_TRANS` (metres), `AXIS_X_ROT` or `AXIS_Z_ROT` (degrees). |
| `moveType` | `TppEquip.MOVE_ROUND` (out and back), `MOVE_ONEWAY` (stays), `MOVE_ONEWAY_REV`. |
| `start`, `end` | Seconds after the shot, `0-2.55`. |
| `value` | Distance or angle from rest. |

`casing.shoot` / `casing.shootLast` (default `true`) eject a casing on
that shot. Revolvers use `false`.

A custom weapon's revolver cylinder (vanilla revolver receiver, or via
[`motionFrom`](#borrowing-motion-motionfrom)) turns 360 / magazine
capacity degrees per shot; vanilla weapons keep the game's turn. A
cylinder row in `partMotion` keeps your angle (e.g. 60 for 5 rounds in 6
chambers).

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
| `fireVoiceId` | No | Voice clip the player shouts on firing. |

---

## Charge shot (`SetChargeShot`)

Holding fire charges; release fires the highest level reached. Release
before level 1, or leaving the fire state (reload, switch, CQC...),
cancels.

```lua
V_TppEquip.SetChargeShot{
  equipId = TppEquip.EQP_WP_Example,
  levels  = {
    { time = 0.5, effect = "ChargeFlash" },
    { time = 1.0, ammo = 2, shots = 2, effect = "ChargeFlash", effectVariation = 0x6448D545 },
    { time = 1.5, ammo = 3, bulletId = TppEquip.BL_Example_Heavy, effect = "ChargeFlash", effectVariation = 0x29CA7A4C },
  },
}
```

Not on the under-barrel; not in FOB. Customize builds charge like their
base weapon, and the [Player
messages](/V_Framework/Lua_API#player-messages) `OnChargeStart`,
`OnChargeLevel`, `OnChargeShot`, `OnChargeCancel` report the base
`equipId`.

| Field | Required | Purpose |
|---|---|---|
| `equipId` | One of these two | One weapon. |
| `receiverId` | One of these two | Every weapon with this receiver (vanilla or custom). |
| `cooldown` | No (`1.0`) | Seconds after a charged shot before a new charge. |
| `levels` | Yes | The [charge levels](#level-fields) in order. |
| `chargeSound` | No (D-Walker stun gun charge loop) | Loops while charging. |
| `fullSound` | No (D-Walker full-charge sound) | On reaching the last level. |
| `chargeEffect` | No | `.parts` effect played while charging. |
| `hud` | No (`true`) | See [Charge HUD](#charge-hud). |

### Level fields

| Field | Required | Purpose |
|---|---|---|
| `time` | Yes | Seconds held to reach it; above the previous level's. |
| `ammo` | No (`1`) | Rounds the shot costs, `0-65535`; not reached if the magazine has fewer. |
| `bulletId` | No (the weapon's bullet) | Vanilla or declared `BL_*` fired instead. |
| `shots` | No (`1`) | Bullets fired at once, `1-255`, same aim line; costs only `ammo`. |
| `sound` | No (D-Walker level sounds) | On reaching the level. |
| `fireSound` | No | On release, over the gun's own sound. |
| `effect` | No (`"ChargeFlash"`) | `.parts` effect while the level holds; replaced by the next level's, fades on fire or cancel. |
| `effectVariation` | No (the `.parts` `effectVariationName`) | Number: variation of `effect`; a new one restarts it. |
| `impactEffect` | No | `.parts` effect played for 1 s where the aim line first hits within 200 m, facing its `.parts` locator. |
| `impactVariation` | No (the effect's own) | `effectVariation` for `impactEffect`; walker stun blast `fx_tpp_mchmgmstn01_m2.vfx` is `0x6448D545`. |

ChargeFlash
(`/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgmstncrg01_s3.vfx`)
variations by level: none, `0x6448D545`, `0x29CA7A4C`.

### Sounds and effects

Sounds take an event name or ID, effects a name or ID; `false` turns one
off. D-Walker defaults need their sound bank loaded: set your own.

Effects must be in the gun's `.parts` (Customize builds: the first part
carrying the name). Only the first 16 effect entries load, in file order
(4 in FOB); the log reports missing names and full slots.

### Charge HUD

`hud` on: the weapon panel swaps the round ammo icons for a charge ring,
one cell per level (up to 3); the ammo count stays. `false`: no gauge.

---

## Support weapons (`SetSupportWeapon`)

A custom grenade, mine or other support item, thrown (`throwAs`) or
placed ([`placeAs`](#placed-items-placeas)) like a vanilla item. Except
for decoys, the vanilla effect never runs: script it on the [Throwing
messages](/V_Framework/Lua_API#throwing-messages) or [Placed
messages](/V_Framework/Lua_API#placed-messages).

```lua
V_TppEquip.RegisterConstantEquipId("EQP_SWP_ChaffGrenade")
V_TppEquip.DeclareSWPs { "SWP_ChaffGrenade" }

V_TppEquip.SetSupportWeaponParameter{ swpId = TppEquip.SWP_ChaffGrenade, ammo = 2, fuseTime = 4, activeTime = 10, grade = 3 }

V_TppEquip.AddToEquipIdTable{
  { TppEquip.EQP_SWP_ChaffGrenade, TppEquip.EQP_TYPE_Throwing, TppEquip.SWP_ChaffGrenade, TppEquip.EQP_BLOCK_COMMON,
    "/Assets/tpp/parts/weapon/thr/tr00_main0_def_v01.parts", "" },
}

V_TppEquip.SetSupportWeapon{ equipId = TppEquip.EQP_SWP_ChaffGrenade, throwAs = TppEquip.EQP_SWP_SmokeGrenade }
```

In your module's `Messages()` table; fires when the fuse expires
(Molotov- and bait-style `throwAs`: on contact):

```lua
Throwing = {
  { msg = "OnActivateThrowing", func = function(handle, equipId, owner)
      if equipId ~= TppEquip.EQP_SWP_ChaffGrenade then return end
      local x, y, z = V_ThrowingSystem.GetPosition(handle)
      V_RangeAttackSystem.RequestToChaff{ pos = { x, y, z }, duration = 10, owner = owner }
      V_NoiseSystem.AddNoise{ pos = { x, y, z }, type = 0x1C, owner = owner }
      V_ThrowingImpl.Deactivate(handle)
    end },
},
```

Vanilla effect anyway: a `V_ThrowingImpl.UpdateAction*` function. On
`OnBounceThrowing`: `V_ThrowingImpl.Activate(handle)` for an impact
grenade, `V_ThrowingImpl.Stop(handle)` for a sticky item. [R&D
row](#add-the-rd-row-addtoequipdeveloptable): `equipDevelopTypeID =
TppMbDev.EQP_DEV_TYPE_Throwing`.

| Field | Required | Purpose |
|---|---|---|
| `equipId` | Yes | Your `EQP_SWP_*`. |
| `throwAs` | One of these two | Vanilla thrown `TppEquip.EQP_SWP_*` (grenade, smoke, Molotov...): how it is held, thrown and flies. |
| `placeAs` | One of these two | Vanilla placed `TppEquip.EQP_SWP_*`: see [Placed items](#placed-items-placeas). |
| `noticeAs` | No (the `throwAs` / `placeAs` item) | Vanilla thrown `EQP_SWP_*` or decoy that enemies hear and feel it as (`throwAs` / `placeAs` still sets holding and throwing): grenade-type = a grenade; `EQP_SWP_Magazine`, decoy or Kibidango = something small (first bounce), they look; `TppEquip.EQP_None` = silent. |
| `attackId` | No (the `throwAs` / `placeAs` item's) | `TppDamage.ATK_*` used when Lua runs a vanilla effect on it. |
| `blastId` | No (the `throwAs` / `placeAs` item's) | `TppEquip.BLA_*` blast, `0-255`, used the same way. |
| `decoyType` | No (the normal look) | `1-7`, decoy `placeAs` only: inflated look (vanilla `1-3` = the PF soldier looks, `TppPlaced.SetCorrelationValueByLocatorName`). Ignored with `decoyParts`. |

  - Ammo boxes and supply drops refill them. Up to 17 keep their own
    ammo count; past that, counts may be shared.
  - Pickups take a free slot. For higher grades to replace lower ones,
    set
    [`baseEquipDevelopId`](/V_Framework/Lua_API#addtoequipdeveloptable)
    on every higher grade.
  - Soldiers can throw them:
    [`RegistGrenadeId`](/V_Framework/Lua_API#grenades).
  - Up to 933 custom `SWP_` rows and 207 custom blast rows.

### Throw physics

Optional `SetSupportWeapon` fields.

| Field | Required | Purpose |
|---|---|---|
| `bounce` | No (the `throwAs` / `placeAs` item's) | Speed kept on a bounce, `0-1.02`. Vanilla `0.16`, decoys `0.2`. |
| `friction` | No (the `throwAs` / `placeAs` item's) | Slide on landing, `0-1.02`: `0` slides, `1` stops dead. Vanilla `0.52`, some `0.4`, decoys `0.2`. |
| `rollingFriction` | No (the `throwAs` / `placeAs` item's) | Rolling stop, `0-655.35`. Vanilla `2`; magazine, Molotov, Kibidango `3.6`; decoys `655.35` (no rolling). |
| `radius` | No (half the model's smallest side) | Collision ball size, metres, above `0`. |
| `throwSpeed` | No (`1`) | Player throw speed, above `0`; the arc follows. Soldiers ignore it. |
| `gravity` | No (`9.8`) | Fall rate, `0-100`; `0` flies straight. Soldiers' aim and the arc follow it. |

### Placed items (`placeAs`)

`TppEquip.EQP_SWP_*` deciding placement and trigger: `C4` (detonator),
`DMine` (anything), `SleepingGusMine` (people), `AntitankMine` /
`ElectromagneticNetMine` (vehicles), `Dung`, `Decoy`, `ActiveDecoy`,
`ShockDecoy`. `CaptureCage`, `WormholePortal`, `DarkMatter` and the
locators are refused.

Script it on the [Placed messages](/V_Framework/Lua_API#placed-messages)
(`OnPlaceCustom`, `OnActivateCustom`) with [`V_BlastSystem.Blast`,
`V_RangeAttackSystem`...](/V_Framework/Lua_API#throwing); set off or
remove with [`V_PlacedSystem`](/V_Framework/Lua_API#placed-items). A
decoy keeps vanilla behaviour and sends neither message.

With its [own pack](#own-model-pack), a decoy shows its own canister
and, with `decoyParts`, its own inflated figure:

```lua
V_TppEquip.AddToEquipIdTable{
  { TppEquip.EQP_SWP_ScarecrowDecoy, TppEquip.EQP_TYPE_Placed, TppEquip.SWP_Decoy, TppEquip.EQP_BLOCK_MISSION,
    "/Assets/tpp/weapon/put/Scenes/scarecrow_decoy_sta.fmdl",
    "/Assets/tpp/pack/collectible/swp/EQP_SWP_ScarecrowDecoy.fpk",
    decoyParts = "/Assets/tpp/parts/weapon/put/scarecrow_decoy_def_v00.parts" },
}
```

The 5th value, the canister `.fmdl`, also shows once landed and under
the figure (a `.parts` there keeps the game's canister on the ground).
`decoyParts` must be in the row's own pack, else ignored with a log
warning. Not in FOB. Feature switch `DecoyModel` in
[`disabled_modules.txt`](/V_Framework#installation).

> The figure plays the game's decoy animations
> (`/Assets/tpp/motion/mtar/equip/DecoyCommon.mtar`): give it the game
> figure's skeleton. The canister opens and closes only if it keeps the
> game canister's mesh group names.
{:.important}

A mine using the [Blast](#blast-setblastparameter) example, registered
like the chaff grenade but with `TppEquip.EQP_TYPE_Placed`:

```lua
V_TppEquip.SetSupportWeapon{ equipId = TppEquip.EQP_SWP_ExampleMine, placeAs = TppEquip.EQP_SWP_DMine }
```

```lua
Placed = {
  { msg = "OnActivateCustom", func = function(handle, equipId, owner)
      if equipId ~= TppEquip.EQP_SWP_ExampleMine then return end
      local x, y, z = V_PlacedSystem.GetPosition(handle)
      V_BlastSystem.Blast{ pos = { x, y, z }, blastId = TppEquip.BLA_Example, attackId = TppDamage.ATK_Example, owner = owner }
    end },
},
```

Enemy mines from a fox2 locator:
`TppPlaced.ChangeEquipIdByLocatorName(locatorName,
TppEquip.EQP_SWP_<custom>)`, or [name it in the
locator](#placing-in-fox2-files).

### Own model pack

A custom `Throwing`, `Placed`, `AmmoBox`, `WeaponBox` or `Item` loads
its model from its own pack when its [`AddToEquipIdTable`
row](/V_Framework/Lua_API#equip-ids) has block
`TppEquip.EQP_BLOCK_MISSION` and a `packPath`. Loaded once, kept; the
item cannot be thrown until then. Not in FOB. `EQP_BLOCK_COMMON` models
must be in `col_common_tpp.fpk`.

### Support weapon stats (`SetSupportWeaponParameter`)

| Field | Required | Purpose |
|---|---|---|
| `swpId` | Yes | Your `SWP_*` from `DeclareSWPs`. |
| `ammo` | No (`0`) | Max carried. |
| `fuseTime` | No (`0`) | Seconds before it goes off. Aliases (set one): `sensorRange` (mines, metres), `decoyStrength` (decoys), `p1`. |
| `activeTime` | No (`0`) | Effect seconds, e.g. smoke. Same as `p2`. |
| `grade` | No (`1`) | Item grade. |
| `damageType` | No (automatic) | Damage type icon: `1` DMG, `2` ZZZ, `3` STN, `4` SMK, `6` ---, `0` hidden. |
| `barDamage`, `barDurability`, `barEffectTime` | No (automatic) | Details-panel bar fill, `0-1`; `false` hides it. Wins over its `*Max`. |
| `durabilityMax`, `effectTimeMax` | No (vanilla) | Value a full Durability / Effect Duration bar stands for. |

Which bars show depends on `throwAs` / `placeAs`: Durability for decoys,
Effect Duration for smoke, sleeping gas and flares, Damage for all.

### Blast (`SetBlastParameter`)

```lua
V_TppEquip.DeclareBLAs { "BLA_Example" }
V_TppEquip.SetBlastParameter{ blastId = TppEquip.BLA_Example, effectRange = 6, optimalRange = 6, blastFlag = 2 }
```

| Field | Required | Purpose |
|---|---|---|
| `blastId` | Yes | Your `BLA_*` from `DeclareBLAs`. |
| `effectRange` | No (`0`) | Blast radius in metres for the player's items. |
| `optimalRange` | No (`0`) | Blast radius in metres for everyone else's. |
| `blastFlag` | No (`2`) | Noise enemies react to, `0-4`, like the vanilla blast table. |

Use it as `blastId` in `SetSupportWeapon` or `SetBullet`.

---

## Resupply and limits

  - The ammo supply drop refills custom weapons (any `equipId`), and
    custom items with a [count](/V_Framework/Lua_API#item-counts) from
    its item box.
  - The suppressor box comes only for a [muzzle
    option](#muzzle-option-setmuzzle) with `durability` `1-254`.
  - Vanilla consumables changed with
    [`SetItemParameter`](/V_Framework/Lua_API#item-parameters) refill to
    the new count.
  - Any number of custom magazines and parts. Parts past the engine's
    free slots read as the gun's part of that kind in a few places (a
    sight as its `scopeUiId` match); stats stay the custom part's.
  - FOB: vanilla IDs changed by any `V_TppEquip` setter,
    `SetWeaponHandling` or `AddToEquipIdTable` use the game's values;
    custom weapons, support weapons and items refuse FOB sorties and
    visits.

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework Lua API](/V_Framework/Lua_API)
  - [V Framework Custom Outfits](/V_Framework/Custom_Outfits)
  - [V Framework Buddy Outfits](/V_Framework/Buddy_Outfits)
