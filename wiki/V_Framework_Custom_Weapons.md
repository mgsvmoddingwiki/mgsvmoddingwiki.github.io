---
title: V Framework Custom Weapons
permalink: /V_Framework_Custom_Weapons/
tags: [Lua, Reference, Guides, Infinite Heaven, Weapons, V Framework]
---

A custom MGSV weapon is assembled from parts such as a receiver, barrel,
magazine, bullet, sight, stock, muzzle, laser/light, and underbarrel.

Place all registration calls inside your module's
`this.LoadLibraries()`.

## Workflow

1. **[Register and declare IDs](#register-and-declare-ids)**
2. **Configure damage and parts** - [Damage](#damage-setdamage),
   [Receiver](#receiver-setreceiver), [Fire
   sound](#fire-sound-receiverparamsetssound),
   [Barrel](#barrel-setbarrel), [Magazine](#magazine-setmagazine),
   [Bullet](#bullet-setbullet), and any [optional
   attachments](#optional-attachments)
3. **[Assemble with `SetGunBasic`](#assemble-with-setgunbasic)**
4. **[Add the R&D row](#add-the-rd-row-addtoequipdeveloptable)**

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

Each custom part name must be created with its matching `Declare*` call
before it is used by a `Set*` function.

Each parameter set accepts either:

  - a **number** to reuse a vanilla pool row; or
  - a **table** to define custom values.

> **Beginner option:** reuse vanilla part IDs in `SetGunBasic`, such as
> `TppEquip.RC_10102` or `TppEquip.BA_10102`. Configure only the parts
> you want to replace.

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

`DeclareDamages` creates `TppDamage.ATK_Example`; all other declarations
create constants under `TppEquip`.

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

See [Equipment](/V_Framework_Lua_API#equipment) for the complete row
format.

---

## Damage (`SetDamage`)

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

Set only what applies. Unspecified values default to `0`.

### Full field list, in vanilla column order

Vanilla `DamageParameterTables.lua` rows are positional arrays of 32
values. The table below lists the `SetDamage` fields that map to those
columns, in that same column order, so a vanilla row can be transcribed
straight down. Column 1 is the attack id itself. It is not a complete
list of `SetDamage` fields - `hitNPC`, used in the example above, has no
column here.

| Col | `SetDamage` field | Native | Notes |
|----:|---|---|---|
| 1 | `damageId` | row index | `TppDamage.ATK_*` |
| 2 | `oldLethalDamageVsSoldier` | +0x06 |  vs soldiers and animals; stored x 0.1. Old name `lethalDamageUI` still accepted |
| 3 | `oldLethalDamageVsPlayer` | +0x08 |  vs the player, buddies, and player-owned life pools (cbox, decoy, supply crate); stored x 0.1 |
| 4 | `oldLethalDamageVsVehicle` | +0x0A |  vs breakable vehicles and Sahelanthropus; stored x 0.1 |
| 5 | `oldStaminaDamageVsSoldier` | +0x0C | legacy stamina vs soldiers; raw u16, clamp to 65535 |
| 6 | `oldStaminaDamageVsPlayer` | +0x0E | legacy stamina vs player and buddies. |
| 7 | `blowPower` | +0x10 | knockback impulse. 1000 or above triggers a blow/stagger reaction, below it only a flinch |
| 8 | `shieldDamage` | +0x12 | shield-breaking power, compared against the engine's shield endurance table |
| 9 | `injureType` | +0x17 low nibble | `TppDamage.INJ_TYPE_*` |
| 10 | `injurePart` | +0x17 high nibble | `TppDamage.INJ_PART_*` |
| 11 | `injureMaxDistance` | +0x18 | metres. The injury is only used below this bullet travel distance; 0 = never. **u8, truncates** |
| 12 | `injureRate` | +0x19 | injury chance in percent, stored x 2 (200 = 100%). Used only when the hit is lethal |
| 13 | `isBullet` | +0x14 bit 0 | `0x0001`, Set it on any bullet attack |
| 14 | `isSniper` | +0x14 bit 1 | `0x0002` |
| 15 | `isShotgun` | +0x14 bit 2 | `0x0004` |
| 16 | `isTranq` | +0x14 bit 3 | `0x0008` |
| 17 | `isStun` | +0x14 bit 4 | `0x0010` |
| 18 | `isExplosive` | +0x14 bit 5 | `0x0020` |
| 19 | `isMelee` | +0x14 bit 6 | `0x0040` |
| 20 | `isBlade` | +0x14 bit 7 | `0x0080` |
| 21 | `isFire` | +0x14 bit 8 | `0x0100` |
| 22 | `isParasite` | +0x14 bit 11 | `0x0800` |
| 23 | `isGas` | +0x14 bit 12 | `0x1000` |
| 24 | `isVehicleHit` | +0x14 bit 13 | `0x2000` |
| 25 | `unk25` | +0x14 bit 14 | `0x4000`, unused |
| 26 | `isElectric` | +0x14 bit 10 | `0x0400` |
| 27 | `isWater` | +0x14 bit 9 | `0x0200` |
| 28 | `isPenetrating` | +0x14 bit 15 | `0x8000` |
| 29 | `damageSource` | +0x16 | `TppDamage.DAM_SOURCE_*` |
| 30 | `lethalDamage` | +0x00 | |
| 31 | `staminaDamage` | +0x02 | |
| 32 | `impactForce` | +0x04 | |

### Two traps worth knowing

**The flag columns are not in bit order.** The engine parser writes bits
11, 12, 13, 14 and only then doubles back for bits 10 and 9, finishing
on bit 15. Read the Native column, not the row position, when mapping a
flag to its bit.

**Non-lethal weapons must set `oldStaminaDamageVsPlayer`.** If
`oldStaminaDamageVsSoldier` is above zero while
`oldStaminaDamageVsPlayer` is zero, the player routes onto the legacy
path and takes **no stamina damage at all**, while soldiers behave
normally. This is why every vanilla tranq weapon carries a flat 245
there. A custom tranq that omits it will look like it works right up
until someone shoots the player with it.

---

## Receiver (`SetReceiver`)

The receiver controls firing behavior, handling, and the attack ID.

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
| `fireRate` | Rounds per minute. |
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

`eqpType` also shapes your weapon's fire-sound name; the `<root>` it
wraps comes from
[`receiverParamSetsSound`](#fire-sound-receiverparamsetssound), which
has the details.

### Borrowing motion (`motionFrom`)

> `motionFrom` copies the `.mtar` file used by the specified receiver,
> so you must include the correct `.mtar` file in the `.fpk`. The
> `equipType` in `V_TppEquip.AddToEquipIdTable` must also match the
> receiver type used by `motionFrom`. For example, if you use
> `TppEquip.EQP_TYPE_Handgun`, `motionFrom` must reference a handgun
> receiver. To use a shotgun receiver instead and have your weapon in
> the handgun menu, you must make the game treat the weapon as
> `TppEquip.EQP_TYPE_Shotgun`. For more information, see
> [`SetWeaponHandling`](#cross-family-handling-setweaponhandling).
{:.important}

A receiver can also carry animation of its own instead of borrowing any:
hand clips, gun clips, and per-shot slide, bolt and hammer rows. See
[Custom gun motion](#custom-gun-motion-setreceivermotion).

---

## Fire sound (`receiverParamSetsSound`)

`receiverParamSetsSound` is the weapon's fire-sound **name root**, not
the full event name. The game wraps it: it builds
`sfx_w_p_<root>_m_active` (and the enemy `sfx_w_e_`, suppressed `_sup`,
etc.) around whatever you set. So the root is only the middle piece:

```lua
receiverParamSetsSound = "ar01",   -- fires sfx_w_p_ar01_m_active, etc.
```

> **Common mistake:** passing a full event name here.
> `"sfx_w_p_ar01_m_active"` becomes
> `sfx_w_p_`**`sfx_w_p_ar01_m_active`**`_m_active` - which doesn't
> exist, so the weapon is silent. Pass just `"ar01"`. If you want to
> name an event exactly as-is (including non-weapon sounds), use the
> `event` form below.
{:.important}

It accepts:

  - a **string** - the fire-sound root (e.g. `"ar01"`). Vanilla roots
    are short `<family><NN>` codes: `ar01` (assault), `hg00` (handgun),
    and so on. Roots up to 7 characters ride in the native sound row;
    longer roots still work (see the table form below);
  - a **number** - reuse an existing vanilla sound row by index; or
  - a **table** `{ name = "root", middle = true|false }` - for full
    control (below).

Pass any vanilla weapon's root here to borrow its fire sound,
independent of the weapon's part IDs or damage. The gameplay family,
recoil, reload, and ballistics are untouched.

By default the `_m` segment and whether a sound plays follow
`receiverParamSetsSystem.eqpType`: families
`Assault/Sniper/Shotgun/Machinegun/GrenadeLauncher/Missile` build
`sfx_w_p_<root>_m_active`; `Handgun` and the rocket family omit the
`_m`; families with no sound template are silent. So a root from any
`_m` family plays on any other `_m`-family weapon with just the string
form.

### Playing an exact event name (`event`)

To fire a sound event by its **exact** name - no `sfx_w_p_` wrapping, no
`_m` - use `event`. The full name is hashed straight into the fire-sound
slots:

```lua
receiverParamSetsSound = { event = "sfx_w_p_ar01_m_active" },
```

This is the form to use when you already have a complete event name
(e.g. copied from the game's sound data). It also lets you try
non-weapon sound events. Caveat: the shot is played through the weapon's
SE emitter, so other weapon/`sfx_*` SE events generally work, but events
from unrelated subsystems (BGM/`Play_bgm_*`, some UI cues) may not sound
even with a correct name - they aren't routed through the weapon
emitter.

### Overriding the `_m` template (table form)

To use a sound whose name does **not** match your weapon's family - e.g.
a no-`_m` rocket/missile sound on an Assault-family weapon - pass a
table and set `middle`:

```lua
-- an Assault-family AK that fires the missile launch sound (no _m):
receiverParamSetsSound = { name = "ms00", middle = false },
```

  - `name` - the fire-sound root (any length; not limited to 7 chars
    here).
  - `middle` - forces the `_m` segment regardless of `eqpType`: `true` =
    `sfx_w_p_<root>_m_active`, `false` = `sfx_w_p_<root>_active`. Omit
    it to follow the weapon's family.

If the sound is silent, the name didn't resolve - flip `middle`, or try
a neighbouring root (`ms00` -> `ms01`/`ms02`). Missiles/rockets have no
suppressed variant, so a suppressor on such a weapon will silence its
fire until you remove it.

### Picking the suppressed sound (`sup` / `supEvent`)

The suppressed shot normally follows the same root: attaching a
suppressor plays `sfx_w_p_<root>_sup_active` (no `_m` segment). To pick
the suppressed sound **independently** of the loud one, add `sup` (a
root) or `supEvent` (an exact event name) to the table form:

```lua
receiverParamSetsSound = { name = "ar01", supEvent = "sfx_w_p_ar01_sup_active" },
```

  - `sup` - suppressed-sound root; plays `sfx_w_p_<sup>_sup_active`. Use
    any vanilla weapon's root whose suppressed variant you want.
  - `supEvent` - exact event name for the suppressed shot, hashed
    verbatim.
  - Both work together with `name`/`middle`/`event` for the loud shot;
    each side is chosen independently.

---

## Barrel (`SetBarrel`)

The barrel applies multipliers to receiver stats and enables attachment
mounts.

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

`1.0` is neutral. `barrelParamSetsBase` may also be a vanilla pool
index.

| Field | Purpose |
|---|---|
| `fireRateMult` | Fire rate. |
| `gunAimAdjustMult` | Aim adjustment. |
| `rangeMult` | Aim-assist and runtime range. |
| `rangeUIMult` | R&D menu range. |
| `spreadMaxMult` | Maximum bloom. |
| `percentOverride` | Unknown; copy a suitable vanilla value. |

Multipliers are **not** limited to the engine's native `2.55` ceiling:
values like `fireRateMult = 5.0` work - the engine applies its part, and
the framework applies the remainder to the assembled gun at setup.

---

## Magazine (`SetMagazine`)

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

## Bullet (`SetBullet`)

`SetBullet` controls speed, drop, falloff, penetration, tracer effects,
and bullet type.

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

### Base fields (`SetBullet`)

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
| `ammoPerShot` | Ammunition consumed per trigger pull: `1` to `1023`. Values past the engine's native 255 are fired as chunked re-triggers; a mag running empty stops the burst. |

Each falloff channel uses:

```text
near distance -> far distance -> residual strength
```

For example, damage remains full until `damageNear`, fades by
`damageFar`, then stays at `damageResidual`.

Penetration order:

```text
MINIMUM < TRANQ < HANDGUN < RIFLE < SNIPER < AMRIFLE
```

### Homing bullets (`lockOn`)

Add `lockOn` to a Bullet3 projectile:

```lua
lockOn = {
  count    = 1,
  time     = 0.8,
  turnRate = 120,
  minRange = 0,
  maxRange = 100,
  canLockOnSoldier = true,
  canLockOnVehicle = false,
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

Homing works on Bullet3 weapons such as rifles, pistols, SMGs, MGs, and
shotguns. It does not replace the separate shell system used by
launchers.

#### Lock-on HUD files

For the visible lock marker, add this to the weapon `.fpkd`:

```text
/Assets/tpp/ui/GraphAsset/entry_datas/reticle/reticle_lockon.fox2
```

Add the lock-marker `.uilb`, `.uif`, and all eight `.uia` files from
`hud_marker_lockon` to the weapon `.fpk`.

Use `TppEquip.RETICLE_UI_MISSILE` in the receiver only when you also
want the launcher-style hip-fire reticle.

---

## Optional attachments

Only the receiver, barrel and ammo/magazine are required. Everything
below is optional - fit a weapon with as many or as few of these parts
as you like.

### Muzzle option (`SetMuzzle`)

`SetMuzzle` controls suppressor or compensator behavior. The model
itself is stored in the weapon pack.

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

### Sight (`SetSight`)

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

Use `zoom1` to `zoom3` for zoom steps; `0` disables a step. Other fields
enable the booster, NVG, built-in status, range finder, and bullet-drop
display.

### Stock (`SetStock`)

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

### Laser or flashlight (`SetOption`)

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

#### Laser colour

Vanilla lasers are always red. `laserColor` overrides that per option, and
takes either a single colour or one colour per weapon. Components are
`0.0`-`1.0`.

```lua
-- named
V_TppEquip.SetOption{
  optionId   = TppEquip.LS_Example,
  isLaser    = 1,
  laserColor = { r = 0, g = 1, b = 0, a = 0.5 },
}

-- positional, same thing
V_TppEquip.SetOption{
  optionId   = TppEquip.LS_Example,
  isLaser    = 1,
  laserColor = { 0, 1, 0, 0.5 },
}

-- one laser part, a different colour on each gun that mounts it
V_TppEquip.SetOption{
  optionId   = TppEquip.LS_Example,
  isLaser    = 1,
  laserColor = {
    default                    = { 1, 0, 0, 0.5 },
    [TppEquip.EQP_WP_Example1] = { 0, 1, 0, 0.5 },
    [TppEquip.EQP_WP_Example2] = { 0, 0.4, 1, 0.5 },
  },
}
```

A table whose values are themselves tables is read as the per-weapon form;
otherwise it is a single colour. `a` is the alpha the beam and the dot are
drawn with - `0` makes the dot invisible, and the engine's own value is `0.5`.

The colour must be declared alongside `isLaser = 1`. An option without the
laser flag never reaches the laser code, so its colour is ignored.

#### Laser appearance

These tune the same laser. Every field is optional and independent: omit one
and the engine's own value is left alone. The values below are the stock ones,
so the block as written changes nothing.

```lua
V_TppEquip.SetOption{
  optionId = TppEquip.LS_Example,
  isLaser  = 1,

  laserThickness        = 4.0,
  laserFadeIn           = 8.0,
  laserOvershoot        = 3.0,
  laserOvershootBlocked = 0.1,

  laserScrollU          = -0.6,
  laserScrollV          = 0.2,
  laserScrollU2         = -0.5,
  laserScrollV2         = -0.11,

  laserTilingAlong      = 0.2,
  laserTilingAcross     = 0.8,
  laserTilingAlong2     = 0.3,
  laserTilingAcross2    = 1.2,

  laserDotCone          = 0.06,
  laserDotLuminance     = 600.0,
  laserDotLuminanceMin  = 1.0,
  laserExposureMax      = -13.6,
  laserExposureMin      = -4.0,
}
```

| Field | Stock | What it does |
|---|---|---|
| `laserThickness` | `4.0` | Beam width. See the note below - this is **not** a world-space size. |
| `laserFadeIn` | `8.0` | Metres over which the beam ramps up from the muzzle. A beam shorter than this is dimmed overall. |
| `laserOvershoot` | `3.0` | Metres the beam carries on past its end point and fades out, when it is not hitting anything. |
| `laserOvershootBlocked` | `0.1` | The same overshoot when the beam does land on something. Keeping it small is what stops the beam poking through walls. |
| `laserScrollU` / `laserScrollV` | `-0.6` / `0.2` | Texture scroll speed of the first layer, in UV per second. |
| `laserScrollU2` / `laserScrollV2` | `-0.5` / `-0.11` | The same for the second texture layer. |
| `laserTilingAlong` | `0.2` | First layer's tiling along the beam, in UV per metre. `0.2` is one repeat every 5 m. |
| `laserTilingAcross` | `0.8` | First layer's tiling across the beam's width. Barely visible at stock thickness. |
| `laserTilingAlong2` / `laserTilingAcross2` | `0.3` / `1.2` | The same for the second layer. |
| `laserDotCone` | `0.06` | Cone angle of the light the dot casts. Widens or tightens the glow, not the dot itself. |
| `laserDotLuminance` | `600.0` | Dot brightness at the bright end of the exposure range. |
| `laserDotLuminanceMin` | `1.0` | Dot brightness at the dim end. |
| `laserExposureMax` / `laserExposureMin` | `-13.6` / `-4.0` | The scene exposure values the two brightnesses are interpolated between. |

Three things worth knowing before tuning:

  - **`laserThickness` is measured on screen, not in the world.** The beam is
    drawn at a constant pixel width whatever the distance, so it does not get
    thinner as it goes away from you. It is also silently doubled while night
    vision is on.
  - **There is no range setting.** How far the laser reaches is decided by the
    game when it traces the beam, not by the laser part, so it cannot be set
    here.
  - **A non-red laser has no muzzle flare.** The engine only creates the flare
    when the colour is reddish, and that decision is made once when the laser
    is built.

Colour and appearance are applied when the laser is created and again every
frame. One consequence: if you swap weapons mid-mission, the dot follows the
new weapon's colour but the beam keeps the colour it was built with, because
the game creates one laser per character rather than one per gun.

### Underbarrel (`SetUnderBarrel`)

An underbarrel reuses a receiver for firing behavior and a magazine for
ammunition.

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

## Assemble with `SetGunBasic`

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

A row missing `receiverId`, `barrelId`, or `ammoId` is rejected - a
weapon cannot be assembled without all three. Vanilla part IDs work fine
here (e.g. `barrelId = TppEquip.BA_10102`).

`weaponGrade` sets the weapon's **actual** stats. The grade shown in the
R&D menu comes from the Develop row instead, and does not affect them.

---

## Add the R&D row (`AddToEquipDevelopTable`)

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

This makes the weapon appear in the Mother Base development tree. Its
stat bars are calculated from the configured parts.

See
[AddToEquipDevelopTable](/V_Framework_Lua_API#addtoequipdeveloptable)
for every optional R&D field.

---

## Minimal complete example

This example creates a basic assault rifle while reusing vanilla parts
where possible.

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

---

## Cross-family handling (`SetWeaponHandling`)

By default a custom weapon handles like the family its parts imply. With
`SetWeaponHandling` it can borrow the **hold, aim, and reload behavior
of any vanilla weapon** while keeping its own identity - model, bullet,
damage, stats, menu category, and name all stay yours.

```lua
V_TppEquip.SetWeaponHandling{
  equipId    = TppEquip.EQP_WP_SkullFace_010,
  familyFrom = TppEquip.EQP_WP_SP_sg_010,
}
```

This allows some creative combinations, such as a handgun that handles
like a shotgun.

---

## Custom gun motion (`SetReceiverMotion`)

A custom receiver normally borrows the animation of a vanilla one
through [`motionFrom`](#borrowing-motion-motionfrom) or
`SetWeaponHandling` above. With `V_TppEquip.SetReceiverMotion` a
receiver gets animation of its own instead: the hand clips Snake plays,
the clips the gun model plays, and the per-shot slide, bolt and hammer
movement. Nothing is borrowed from a vanilla family.

Place the call inside your module's `this.LoadLibraries()`, after the
`SetReceiver` and `SetGunBasic` calls that declare the receiver and the
weapons built on it. Build support is limited; see [Current
limits](#current-limits).

### The three layers

| Layer | Key | What it animates | Where it comes from |
|---|---|---|---|
| Player | `playerMotion` | Snake's hands and arms: hold, fire, reload, cock, grip | `.gani` clips inside your player-side `.mtar` |
| Gun | `weaponMotion` | The gun model itself during a clip: magazine drop, slide release | `.gani` clips inside your gun-side `.mtar` |
| Part motion | `partMotion` | Slide, bolt and hammer on every shot, and the idle pose | Rows the engine plays natively, no clip needed |


### Full example

Every path below is a vanilla asset of the hg00 pistol family, so the
example runs without authoring any archive. The player-side pack is
mounted straight from the game data. The gun-side archive is not, so
pack a copy of `hg00_asm.mtar` inside your weapon's own `.fpk` under
that same path.

```lua
V_TppEquip.SetReceiverMotion{
  receiverId = TppEquip.RC_Example,

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
    horse = {
      hold   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre.gani",
      fire   = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre.gani",
      reload = "/Assets/tpp/motion/SI_game/fani/bodies/snap/snapcry/snapcry_s_hag_fre_rld.gani",
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

| Field | Purpose |
|---|---|
| `mtar` | Archive holding the hand clips. It is added to the player's archive list for every weapon built on this receiver. |
| `pack` | The `.fpk` that contains that archive. **Required.** Without it the engine never mounts the archive and no hand clip plays. |
| `clips` | The two-hand set, used in the normal stance. |
| `oneHand` | Used whenever the engine puts the weapon in one-hand mode, carrying a body for example. Missing fields fall back to `clips`. |
| `oneHandCqc` | Used in one-hand mode while holding someone in a CQC hold. Missing fields fall back to `oneHand`, then `clips`. |
| `horse` | Used on horseback. Missing fields fall back to `clips`. Vanilla rides a handgun one-handed, so a handgun gives `horse` the same clips as `oneHand`, as in the example. Rifles and other two-handed weapons use their normal set on horseback and can leave `horse` out. |

### Clip fields

| Field | When the engine asks for it | Fallback |
|---|---|---|
| `hold` | Aim and idle hold. Also answers any request not listed below. | none |
| `fire` | GunFire | `hold` |
| `cock` | GunCock, chambering a round after an empty reload or a bolt cycle | `hold` |
| `reload` | Reload with rounds still in the magazine | none |
| `reloadEmpty` | Reload with the magazine empty | `reload` |
| `dualReload` | Reload with a dual magazine fitted | `reload` |
| `grip` | Support-hand grip, normal and per-category grip selectors | none |
| `magazineGrip` | Support hand on the magazine | none |
| `magazineGripDual` | Same, with a dual magazine fitted | `magazineGrip` |
| `underBarrelGrip` | Grip with an under-barrel attachment fitted | none |
| `stepReload` | Round-by-round reload, one-handed handguns | none |


### `partMotion`

These rows are appended to the engine's own per-shot part-motion table,
the same one the vanilla `EquipMotionDataForChimera.lua` fills, so the
engine plays them natively. Each list takes at most two rows. A third
row is silently dropped, and rows are positional, without named fields.

| List | Played when |
|---|---|
| `shoot` | A normal shot, rounds remaining |
| `shootLast` | The shot that empties the magazine |
| `poseLoaded` | Re-applied every idle frame while rounds remain |
| `poseEmpty` | Re-applied every idle frame while the magazine is empty |

A motion row is `{ bone, axis, moveType, start, end, value }`. A pose
row is `{ bone, axis, value }`.

| Position | Meaning |
|---|---|
| `bone` | Bone name in the receiver model, for example `SKL_001_SLIDE`, `SKL_004_HAMMER`, `SKL_002_BOLT`, `SKL_002_CYLINDER`. The bone must exist in your model. |
| `axis` | `TppEquip.AXIS_Z_TRANS` moves along the bone's Z in metres. `TppEquip.AXIS_X_ROT` and `TppEquip.AXIS_Z_ROT` rotate in degrees. |
| `moveType` | `TppEquip.MOVE_ROUND` goes out and comes back. `TppEquip.MOVE_ONEWAY` goes and stays until a pose or the next row moves it. `TppEquip.MOVE_ONEWAY_REV` is the reverse. |
| `start`, `end` | Seconds after the shot when the movement begins and ends, 0 to 2.55. |
| `value` | Amplitude from the bone's rest position. |

`casing.shoot` and `casing.shootLast` decide whether a casing is ejected
on that shot type. Both default to `true`. Revolvers set them `false`.

---

## Remote-controlled missile (`SetRemoteMissile`)

`V_TppEquip.SetRemoteMissile` Turns a weapon's shell steerable like a rocket arm.

```lua
V_TppEquip.SetRemoteMissile{
    receiverId       = TppEquip.RC_Nikita_010,
    maxFlightSeconds = 20,
    maxRange         = 0,
    cameraDistance   = 4.0,
    cameraHeight     = 0.0,
    minSpeed         = 0,
    maxSpeed         = 0,
}
```

Give it **exactly one key**, `receiverId` or `equipId`.

Every other field has a working default, and the call above spells out
what those defaults already are.

### Full field list

| Field | Default | Accepted | Purpose |
|---|---|---|---|
| `receiverId` | - | must be `> 0` | **One key required.** Every weapon whose `SetGunBasic` declares this receiver fires a steerable shell. |
| `equipId` | - | must be `> 0` | **One key required.** Binds the spec to a single weapon equip instead of a whole receiver. |
| `attackId` | none | `1`..`1023` | **Optional.** Charges the blast and the direct hit to this damage row instead of the one the receiver carries. Omitted, nothing is written and the receiver's own id is used. |
| `maxFlightSeconds` | `20` | clamped to `1`..`90` | How long the missile may fly before control is handed back. |
| `maxRange` | `0` | clamped to `0`..`100000`; `0` = unlimited | Straight-line metres from the launch point. |
| `cameraDistance` | `4.0` | clamped to `0`..`50` | Chase camera sits behind the missile. |
| `cameraHeight` | `0.0` | clamped to `-50`..`50` | Chase camera sits above (positive) or below (negative) the missile. |
| `minSpeed` | `0` | clamped to `0`..`100`; `0` = engine default | Slowest the missile flies, in the engine's own speed unit. |
| `maxSpeed` | `0` | clamped to `0`..`100`; `0` = engine default | Fastest the missile flies. Full boost settles here. |
| `fireVoiceId` | none | clip-name string, or the pre-hashed id as a number | **Optional.** The player shouts this voice clip when the weapon fires, the way the Rocket Arm shouts its line. Omitted means nothing plays. |

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework Lua API](/V_Framework_Lua_API)
  - [V Framework Custom Outfits](/V_Framework_Custom_Outfits)
