---
title: V Framework Custom Weapons
permalink: /V_Framework_Custom_Weapons/
tags: [Lua, Reference, Infinite Heaven, Weapons]
---

A custom MGSV weapon is assembled from parts such as a receiver, barrel, magazine,
bullet, sight, stock, muzzle, laser/light, and underbarrel.

Place all registration calls inside your module's `this.LoadLibraries()`.

## Workflow

1. **Register and declare IDs**
2. **Configure damage and parts**
3. **Assemble the weapon with `SetGunBasic`**
4. **Add an R&D row**

```lua
function this.LoadLibraries()
  -- 1. Register and declare
  V_TppEquip.RegisterConstantEquipId("EQP_WP_Example")
  V_TppEquip.AddToEquipIdTable{ -- model and pack rows }

  -- 2. Configure
  V_TppEquip.SetDamage{ -- ... }
  V_TppEquip.SetReceiver{ -- ... }
  V_TppEquip.SetBarrel{ -- ... }
  V_TppEquip.SetMagazine{ -- ... }
  V_TppEquip.SetBullet{ -- ... }

  -- 3. Assemble
  V_TppEquip.SetGunBasic{ -- ... }

  -- 4. Add to R&D
  V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:Example", { -- ... })
end
```

> **Beginner option:** reuse vanilla part IDs in `SetGunBasic`, such as
> `TppEquip.RC_10102` or `TppEquip.BA_10102`. Configure only the parts you want to
> replace.

Each custom part name must be created with its matching `Declare*` call before it is
used by a `Set*` function.

---

## 1. Register and declare IDs

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

`DeclareDamages` creates `TppDamage.ATK_Example`; all other declarations create
constants under `TppEquip`.

Map equip IDs to their model and pack:

```lua
V_TppEquip.AddToEquipIdTable{
  {
    TppEquip.EQP_WP_Example,
    TppEquip.EQP_TYPE_Assault,
    TppEquip.WP_Example,
    TppEquip.EQP_BLOCK_MISSION,
    "/Assets/tpp/parts/weapon/eft/556x45/example/example_main0.parts",
    "/Assets/tpp/pack/weapon/eft/wp_example_main0.fpk",
  },
  {
    TppEquip.EQP_AM_Example,
    TppEquip.EQP_TYPE_Ammo,
    0,
    TppEquip.EQP_BLOCK_NONE,
    "/Assets/tpp/weapon/amo/Scenes/am01_main0_def.fmdl",
    "",
  },
}
```

See [Equipment](/V_Framework_Lua_API/#equipment) for the complete row format.

---

## 2. Damage

`SetDamage` creates the attack used by the receiver.

```lua
V_TppEquip.SetDamage{
  damageId       = TppDamage.ATK_Example,
  lethalDamage   = 700,
  staminaDamage  = 0,
  impactForce    = 40,
  lethalDamageUI = 700,
  damageSource   = TppDamage.DAM_SOURCE_Assault,
  injureType     = TppDamage.INJ_TYPE_BULLET,
  injurePart     = TppDamage.INJ_PART_ALL,
  hitNPC         = 1,
}
```

Common flags are `isSniper`, `isShotgun`, `isTranq`, `isStun`, `isExplosive`,
`isMelee`, `isBlade`, `isFire`, `isWater`, `isElectric`, `isParasite`, `isGas`,
`isVehicleHit`, and `isPenetrating`.

Set only the flags that apply. Unspecified values default to `0`.

---

## 3. Receiver

The receiver controls firing behavior, handling, and the attack ID.

Each parameter set accepts either:

- a **number** to reuse a vanilla pool row; or
- a **table** to define custom values.

```lua
V_TppEquip.SetReceiver{
  receiverId = TppEquip.RC_Example,
  attackId   = TppDamage.ATK_Example,

  receiverParamSetsBase = {
    fireRate         = 700,
    aimAssistDist    = 45,
    gunAimAdjust     = 0.5,
    effectiveRange   = 45,
    effectiveRangeUI = 45,
    adsZoom          = 0.18,
    adsFov           = 30,
    reloadSpeed      = 1.1,
  },

  receiverParamSetsWobbling = {
    spreadPerShot  = 1.3,
    unk2           = 0.9,
    spreadRecovery = 8.1,
    spreadMin      = 0.35,
    spreadMax      = 2.9,
    shotKick       = 0.16,
    shotKick2      = 0.31,
  },

  receiverParamSetsSystem = {
    eqpType            = TppEquip.EQP_TYPE_Assault,
    reticleUiId        = TppEquip.RETICLE_UI_ASSAULT,
    triggerId          = TppEquip.TRIGGER_FULLAUTO,
    showMagazineMesh   = 1,
    plusOneChamber     = 1,
    missileMeshVariant = 0,
    modelDedupExclude  = 0,
    flag5              = 0,
    sightMountMesh     = 0,
    railMountMesh      = 0,
    railMountMesh2     = 0,
    altMagazineSocket  = 0,
  },

  receiverParamSetsSound = "ar01",
  motionFrom             = TppEquip.RC_10102,
}
```

### Base fields

| Field | Purpose |
|---|---|
| `fireRate` | It's the fire rate... |
| `aimAssistDist` | Aim-assist distance. |
| `gunAimAdjust` | Auto-aim correction strength. |
| `effectiveRange` | Runtime effective range. |
| `effectiveRangeUI` | R&D menu range value. |
| `adsZoom` | ADS camera zoom blend. |
| `adsFov` | ADS field of view. |
| `reloadSpeed` | Reload multiplier; `1.0` is normal. |

### Wobbling fields

| Field | Purpose |
|---|---|
| `spreadPerShot` | Bloom added per shot. |
| `spreadRecovery` | How quickly bloom recovers. |
| `spreadMin` / `spreadMax` | Minimum and maximum spread. |
| `shotKick` / `shotKick2` | Aim kick values. |
| `unk2` | Unknown; use a vanilla-like value. |

### System fields

The main fields are:

- `eqpType`: weapon family
- `reticleUiId`: HUD reticle
- `triggerId`: cocking, semi-auto, burst, or full-auto
- `plusOneChamber`: allows one round in the chamber

The remaining flags mainly control model meshes or loading behavior.

`eqpType` also decides two things about your weapon's fire sound: whether the name
gets a `_m` segment, and whether a sound plays at all. Families
`Assault/Sniper/Shotgun/Machinegun/GrenadeLauncher/Missile` build the name with `_m`
(`sfx_w_p_<root>_m_active`); `Handgun` and the rocket family build it without
(`sfx_w_p_<root>_active`). The `<root>` itself comes from
[`receiverParamSetsSound`](#fire-sound-receiverparamsetssound) - set it to pick any
sound you want.

> `motionFrom` selects a vanilla animation set, but the matching receiver `.mtar`
> must also exist in the custom weapon's `.fpk`.<br>
{:.important}

### Fire sound (`receiverParamSetsSound`)

`receiverParamSetsSound` is the weapon's fire-sound **name root**, not the full
event name. The game wraps it: it builds `sfx_w_p_<root>_m_active` (and the enemy
`sfx_w_e_`, suppressed `_sup`, etc.) around whatever you set. So the root is only the
middle piece:

```lua
receiverParamSetsSound = "ar01",   -- fires sfx_w_p_ar01_m_active, etc.
```

> **Common mistake:** passing a full event name here. `"sfx_w_p_ar01_m_active"`
> becomes `sfx_w_p_`**`sfx_w_p_ar01_m_active`**`_m_active` - which doesn't exist, so
> the weapon is silent. Pass just `"ar01"`. If you want to name an event exactly as-is
> (including non-weapon sounds), use the `event` form below.<br>
{:.important}

It accepts:

- a **string** - the fire-sound root (e.g. `"ar01"`). Vanilla roots are short
  `<family><NN>` codes: `ar01` (assault), `hg00` (handgun), and so on. Roots up to 7
  characters ride in the native sound row; longer roots still work (see the table
  form below);
- a **number** - reuse an existing vanilla sound row by index; or
- a **table** `{ name = "root", middle = true|false }` - for full control (below).

Pass any vanilla weapon's root here to borrow its fire sound, independent of the
weapon's part IDs or damage. The gameplay family, recoil, reload, and ballistics
are untouched.

By default the `_m` segment and whether a sound plays follow
`receiverParamSetsSystem.eqpType`: families
`Assault/Sniper/Shotgun/Machinegun/GrenadeLauncher/Missile` build `sfx_w_p_<root>_m_active`;
`Handgun` and the rocket family omit the `_m`; families with no sound template are
silent. So a root from any `_m` family plays on any other `_m`-family weapon with
just the string form.

#### Overriding the `_m` template (table form)

To use a sound whose name does **not** match your weapon's family - e.g. a no-`_m`
rocket/missile sound on an Assault-family weapon - pass a table and set `middle`:

```lua
-- an Assault-family AK that fires the missile launch sound (no _m):
receiverParamSetsSound = { name = "ms00", middle = false },
```

- `name` - the fire-sound root (any length; not limited to 7 chars here).
- `middle` - forces the `_m` segment regardless of `eqpType`: `true` =
  `sfx_w_p_<root>_m_active`, `false` = `sfx_w_p_<root>_active`. Omit it to follow the
  weapon's family.

If the sound is silent, the name didn't resolve - flip `middle`, or try a
neighbouring root (`ms00` -> `ms01`/`ms02`). Missiles/rockets have no suppressed
variant, so a suppressor on such a weapon will silence its fire until you remove it.

#### Playing an exact event name (`event`)

To fire a sound event by its **exact** name - no `sfx_w_p_` wrapping, no `_m` - use
`event`. The full name is hashed straight into the fire-sound slots:

```lua
receiverParamSetsSound = { event = "sfx_w_p_ar01_m_active" },   -- verbatim, no wrapping
```

This is the form to use when you already have a complete event name (e.g. copied from
the game's sound data). It also lets you try non-weapon sound events. Caveat: the shot
is played through the weapon's SE emitter, so other weapon/`sfx_*` SE events generally
work, but events from unrelated subsystems (BGM/`Play_bgm_*`, some UI cues) may not
sound even with a correct name - they aren't routed through the weapon emitter.

---

## 4. Barrel

The barrel applies multipliers to receiver stats and enables attachment mounts.

```lua
V_TppEquip.SetBarrel{
  barrelId = TppEquip.BA_Example,

  barrelParamSetsBase = {
    fireRateMult     = 1.2,
    gunAimAdjustMult = 1.15,
    rangeMult        = 0.9,
    rangeUIMult      = 0.9,
    spreadMaxMult    = 1.1,
    percentOverride  = 1.05,
  },

  barrelLength  = TppEquip.BARREL_LENGTH_MIDDLE,
  hasScopeMount = 1,
  hasSideMount  = 1,
  hasUnderMount = 1,
}
```

`1.0` is neutral. `barrelParamSetsBase` may also be a vanilla pool index.

| Field | Effect |
|---|---|
| `fireRateMult` | Fire rate. |
| `gunAimAdjustMult` | Aim adjustment. |
| `rangeMult` | Aim-assist and runtime range. |
| `rangeUIMult` | R&D menu range. |
| `spreadMaxMult` | Maximum bloom. |
| `percentOverride` | Unknown; copy a suitable vanilla value. |

---

## 5. Magazine

```lua
V_TppEquip.SetMagazine{
  ammoId      = TppEquip.AM_Example,
  equipAmmoId = TppEquip.EQP_AM_Example,
  capacity    = 30,
  totalCarry  = 210,
  bulletId    = TppEquip.BL_Example,
}
```

| Field | Purpose |
|---|---|
| `ammoId` | Magazine ID. |
| `equipAmmoId` | Ammo equip ID used for resupply. |
| `capacity` | Magazine size. |
| `totalCarry` | Maximum carried rounds. |
| `bulletId` | Projectile fired by the magazine. |

A vanilla `EQP_AM_*` or `BL_*` may be reused.

---

## 6. Bullet

`SetBullet` controls speed, drop, falloff, penetration, tracer effects, and bullet
type.

```lua
V_TppEquip.SetBullet{
  bulletId       = TppEquip.BL_Example,
  bulletSpeed    = 450,
  npcBulletSpeed = 450,
  dropRate       = 18,

  bulletParamSetsBase = {
    tranqNear      = 50,
    tranqFar       = 90,
    tranqResidual  = 0.75,

    damageNear     = 45,
    damageFar      = 60,
    damageResidual = 0.75,

    impactNear     = 40,
    impactFar      = 70,
    impactResidual = 0.8,

    penNear           = TppEquip.PENETRATE_LEVEL_RIFLE,
    penFar            = TppEquip.PENETRATE_LEVEL_TRANQ,
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

### Main fields

| Field | Purpose |
|---|---|
| `bulletSpeed` | Player-fired velocity in m/s. |
| `npcBulletSpeed` | NPC-fired velocity; always set this. |
| `dropRate` | Player bullet-drop strength. |
| `bulletParamSetsBase` | Player falloff and penetration. |
| `npcBulletParamSetsBase` | NPC falloff and penetration; always set this. |
| `bulletTrailEffect` | Trail index or `.vfx` path. |
| `ricochetSize` | Impact radius category. |
| `bulletType` | Normal, spread, blast, shell, water, or airshock. |
| `blastId` | Explosion ID for explosive projectiles. |
| `isLethal` | `1` lethal, `0` non-lethal. |
| `ammoPerShot` | Ammunition consumed per trigger pull. |

Each falloff channel uses:

```text
near distance -> far distance -> residual strength
```

For example, damage remains full until `damageNear`, fades by `damageFar`, then
stays at `damageResidual`.

Penetration order:

```text
MINIMUM < TRANQ < HANDGUN < RIFLE < SNIPER < AMRIFLE
```

### Optional homing bullets

Add `lockOn` to a Bullet3 projectile:

```lua
lockOn = {
  count    = 1,
  time     = 0.8,
  turnRate = 120,
  minRange = 0,
  maxRange = 100,
}
```

Useful fields:

| Field | Purpose |
|---|---|
| `count` | Simultaneous lock slots. |
| `time` | Seconds required to lock. |
| `turnRate` | Steering speed in degrees per second. |
| `minRange` / `maxRange` | Lock distance limits. |
| `bulletSpeed` | Speed override for locked shots. |
| `bulletType` | Bullet-type override for locked shots. |
| `ammoPerShot` | Ammo-cost override for locked shots. |
| `homingStartDistance` | Straight-flight distance before homing starts. |
| `canLockOnSoldier` | Enable or disable soldier targets. |
| `canLockOnVehicle` | Enable or disable vehicle targets. |

Example:

```lua
lockOn = {
  count = 1,
  time = 0.5,
  turnRate = 360,
  canLockOnSoldier = true,
  canLockOnVehicle = false,
}
```

Homing works on Bullet3 weapons such as rifles, pistols, SMGs, MGs, and shotguns.
It does not replace the separate shell system used by launchers.

### Lock-on HUD files

For the visible lock marker, add this to the weapon `.fpkd`:

```text
/Assets/tpp/ui/GraphAsset/entry_datas/reticle/reticle_lockon.fox2
```

Add the lock-marker `.uilb`, `.uif`, and all eight `.uia` files from
`hud_marker_lockon` to the weapon `.fpk`.

Use `TppEquip.RETICLE_UI_MISSILE` in the receiver only when you also want the
launcher-style hip-fire reticle.

---

## 7. Muzzle option

`SetMuzzle` controls suppressor or compensator behavior. The model itself is stored
in the weapon pack.

```lua
V_TppEquip.SetMuzzle{
  muzzleOptionId = TppEquip.MO_Example,
  grouping       = 1.0,
  durability     = 30,
  suppressor     = 1,
}
```

| Field | Purpose |
|---|---|
| `grouping` | Multiplies spread added per shot; below `1.0` is tighter. |
| `durability` | Suppressor life in shots; `-1` is infinite. |
| `suppressor` | `1` suppressor, `0` brake/compensator. |

---

## 8. Sight

```lua
V_TppEquip.SetSight{
  scopeId               = TppEquip.ST_Example,
  zoom1                 = 2,
  zoom2                 = 4,
  zoom3                 = 0,
  scopeUiId             = TppEquip.SCOPE_UI_DEFAULT,
  booster               = 0,
  nvg                   = 0,
  builtIn               = 1,
  rangeFinder           = 0,
  rangeFinderBulletDrop = 0,
}
```

Use `zoom1` to `zoom3` for zoom steps; `0` disables a step. Other fields enable
the booster, NVG, built-in status, range finder, and bullet-drop display.

---

## 9. Stock

```lua
V_TppEquip.SetStock{
  stockId        = TppEquip.SK_Example,
  spreadRecovery = 1.1,
  movementSway   = 0.8,
}
```

- `spreadRecovery`: higher is better.
- `movementSway`: lower is steadier.
- `1.0` is neutral.

---

## 10. Laser or flashlight

```lua
V_TppEquip.SetOption{
  optionId = TppEquip.LS_Example,
  isLaser  = 1,
}

V_TppEquip.SetOption{
  optionId = TppEquip.LT_Example,
  isLight  = 1,
}
```

---

## 11. Underbarrel

An underbarrel reuses a receiver for firing behavior and a magazine for ammunition.

```lua
V_TppEquip.SetUnderBarrel{
  underBarrelId    = TppEquip.UB_Example,
  receiverId       = TppEquip.RC_10307_u,
  magazineId       = TppEquip.AM_10302,
  underBarrelGrade = 7,
}
```

The receiver and magazine may be vanilla or custom.

---

## 12. Assemble with `SetGunBasic`

```lua
V_TppEquip.SetGunBasic{
  weaponId       = TppEquip.WP_Example,
  receiverId     = TppEquip.RC_Example,
  barrelId       = TppEquip.BA_Example,
  ammoId         = TppEquip.AM_Example,
  stockId        = TppEquip.SK_Example,
  muzzleId       = TppEquip.MZ_None, -- There is still no way to make a custom one yet.
  muzzleOptionId = TppEquip.MO_Example,
  scope1Id       = TppEquip.ST_Example,
  underBarrelId  = TppEquip.UB_Example,
  laserFlash1Id  = TppEquip.LT_Example,
  laserFlash2Id  = TppEquip.LS_Example,
  weaponGrade    = 7,
}
```

**Required** fields:

- `weaponId`
- `receiverId`
- `barrelId`
- `ammoId`

A row missing `receiverId`, `barrelId`, or `ammoId` is rejected - a weapon
cannot be assembled without all three. Vanilla part IDs work fine here
(e.g. `barrelId = TppEquip.BA_10102`).

`weaponGrade` affects weapon **ACTUAL** stats, but the R&D menu grade that comes from the Develop
row and doesn't actually effect it.

---

## 13. Add the R&D row

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
    grade            = 7,
    developGmpCost   = 180000,
    developTimeMinute = 30,
    initialAvailable = 0,
  },
})
```

This makes the weapon appear in the Mother Base development tree. Its stat bars are
calculated from the configured parts.

See
[AddToEquipDevelopTable](/V_Framework_Lua_API/#addtoequipdeveloptable)
for every optional R&D field.

---

## Minimal complete example

This example creates a basic assault rifle while reusing vanilla parts where
possible.

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
    {
      TppEquip.EQP_WP_Example,
      TppEquip.EQP_TYPE_Assault,
      TppEquip.WP_Example,
      TppEquip.EQP_BLOCK_MISSION,
      "/Assets/tpp/parts/weapon/example_main0.parts",
      "/Assets/tpp/pack/weapon/wp_example_main0.fpk",
    },
    {
      TppEquip.EQP_AM_Example,
      TppEquip.EQP_TYPE_Ammo,
      0,
      TppEquip.EQP_BLOCK_NONE,
      "/Assets/tpp/weapon/amo/Scenes/am01_main0_def.fmdl",
      "",
    },
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
      fireRate         = 540,
      aimAssistDist    = 47,
      gunAimAdjust     = 0.3,
      effectiveRange   = 47,
      effectiveRangeUI = 47,
      adsZoom          = 0.35,
      adsFov           = 42,
      reloadSpeed      = 1,
    },

    receiverParamSetsWobbling = {
      spreadPerShot  = 0.64,
      unk2           = 0.64,
      spreadRecovery = 3.4,
      spreadMin      = 0.38,
      spreadMax      = 2.8,
      shotKick       = 0.18,
      shotKick2      = 0.39,
    },

    receiverParamSetsSystem = {
      eqpType          = TppEquip.EQP_TYPE_Assault,
      reticleUiId      = TppEquip.RETICLE_UI_ASSAULT,
      triggerId        = TppEquip.TRIGGER_FULLAUTO,
      showMagazineMesh = 1,
      plusOneChamber   = 1,
    },

    receiverParamSetsSound = "ar01",
    motionFrom = TppEquip.RC_10102,
  }

  V_TppEquip.SetMagazine{
    ammoId      = TppEquip.AM_Example,
    equipAmmoId = TppEquip.EQP_AM_Example,
    capacity    = 30,
    totalCarry  = 210,
    bulletId    = TppEquip.BL_Example,
  }

  V_TppEquip.SetBullet{
    bulletId       = TppEquip.BL_Example,
    bulletSpeed    = 450,
    npcBulletSpeed = 450,
    dropRate       = 18,
    bulletParamSetsBase = 8,
    npcBulletParamSetsBase = 8,
    bulletTrailEffect = 0,
    ricochetSize = TppEquip.RICOCHET_SIZE_DEFAULT,
    bulletType   = TppEquip.BULLET_TYPE_NORMAL,
    isLethal     = 1,
    eqpType      = TppEquip.EQP_TYPE_Assault,
  }

  V_TppEquip.SetGunBasic{
    weaponId   = TppEquip.WP_Example,
    receiverId = TppEquip.RC_Example,
    barrelId   = TppEquip.BA_10102,
    ammoId     = TppEquip.AM_Example,
    stockId    = TppEquip.SK_10102,
    scope1Id   = TppEquip.ST_None,
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
    flow = {
      grade             = 7,
      developGmpCost    = 180000,
      initialAvailable  = 1,
    },
  })
end

return this
```