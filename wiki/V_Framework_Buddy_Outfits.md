---
title: V Framework Buddy Outfits
permalink: /V_Framework_Buddy_Outfits/
tags: [Lua, Reference, Guides, Infinite Heaven, Buddy, V Framework]
---

New costumes for Quiet, tack for D-Horse and gear for D-Dog, picked in
Sortie Prep like the vanilla ones. New rifles for Quiet are
[custom weapons](#quiet-weapons).

Place all calls inside `this.LoadLibraries()`.

## Functions

| Function | Description |
|---|---|
| [`V_TppBuddyService.RegisterBuddyOutfit`](#registerbuddyoutfit) | Create a buddy costume, tack or gear. |
| [`V_TppBuddyService.SetBuddyOutfit`](#setbuddyoutfit) | Equip a registered buddy outfit or Quiet weapon from script. |
| [`V_TppBuddyService.SetQuietWeaponMotion`](#quiet-weapon-animations) | Give a Quiet weapon its own animations. |
| [`V_TppMotherBaseManagement.AddToEquipDevelopTable`](#rd-row) | R&D name, icon, cost and unlock state. |

> `RegisterBuddyOutfit` needs an `AddToEquipDevelopTable` row with the
> same key.
{:.important}

---

## RegisterBuddyOutfit

```lua
V_TppBuddyService.RegisterBuddyOutfit({
  key   = "MyMod:QuietRed",
  quiet = { fpkPath = "/Assets/tpp/pack/mymod/buddy_quiet_red.fpk" },
})
```

Returns `value, developId`, or `false`.

| Field | Required | Purpose |
|---|---|---|
| `key` | Yes | Registration key. |
| `quiet`, `horse`, `dog` | Exactly one | The buddy that wears it. |

### Branch fields

| Field | Branch | Required | Purpose |
|---|---|---|---|
| `fpkPath` | all | Yes | The buddy's package. Not installed: the vanilla default is worn. |
| `bruise` | `quiet` | No (`false`) | `true` shows NAKED's bruises. |
| `bruiseFv2`, `bruiseFpk` | `quiet` | No (none) | Own bruise look. Give both. |
| `damageRate` | `horse` | No (NORMAL) | Share of damage D-Horse takes. `1` = full, max `1.275`. |
| `gallopSpeedRate` | `horse` | No (NORMAL) | Gallop speed multiplier. |
| `bodyAttackId` | `horse` | No (NORMAL) | `TppDamage.ATK_*` hit when D-Horse rams soldiers. |
| `soundType` | `horse` | No (NORMAL) | Vanilla tack whose movement sounds play, see [D-Horse tack](#d-horse-tack). |
| `commandType` | `dog` | No (`KEEP_BUSY`) | D-Dog's "Do it" order, a `V_DogCommandType` value, see [D-Dog gear](#d-dog-gear). |
| `damageRate` | `dog` | No (`1`) | Share of damage D-Dog takes. |
| `bulletFlinch` | `dog` | No (`true`) | `false`: bullets don't stagger D-Dog. |
| `armorHitEffect`, `armorHitSound` | `dog` | No (`false`) | Armour spark and ricochet sound when shot. |
| `escapeDistance` | `dog` | No (`30`) | Metres D-Dog runs to escape. |
| `hitRetreatDistance` | `dog` | No (`20`) | Metres D-Dog backs off when hit. |
| `retargetRange` | `dog` | No (`0`) | Extra metres D-Dog looks for the next enemy. |
| `soldierThreat` | `dog` | No (`false`) | `true`: soldiers treat D-Dog as armed, not as a stray. |

Bruises show only when a script sends
`GameObject.SendCommand(quietId, { id = "SetBruise", enable = true })`.

### D-Horse tack

```lua
horse = {
  fpkPath    = "/Assets/tpp/pack/mymod/buddy_horse_armor.fpk",
  damageRate = 0.4,
  soundType  = 4,
},
```

Vanilla values:

| `soundType` | Vanilla tack | `damageRate` | `gallopSpeedRate` | `bodyAttackId` |
|---|---|---|---|---|
| `0` | NORMAL | 1 | 1 | `ATK_HorseBodyAttack` |
| `1` | FURICORN | 1 | 1 | `ATK_HorseBodyAttack` |
| `2` | BATTLE DRESS | 0.895 | 0.98 | `ATK_HorseBodyAttackMil1` |
| `3` | BATTLE DRESS (Defense Up [1]) | 0.75 | 0.96 | `ATK_HorseBodyAttackMil2` |
| `4` | BATTLE DRESS (Defense Up [2]) | 0.5 | 0.94 | `ATK_HorseBodyAttackMil3` |
| `5` | PARADE CLOTH | 1 | 1 | `ATK_HorseBodyAttack` |
| `6` | WESTERN CLOTH | 1 | 1 | `ATK_HorseBodyAttack` |

### D-Dog gear

```lua
dog = {
  fpkPath       = "/Assets/tpp/pack/mymod/buddy_dog_armor.fpk",
  commandType   = V_DogCommandType.KILL,
  damageRate    = 0.5,
  bulletFlinch  = false,
  soldierThreat = true,
},
```

| `V_DogCommandType` | "Do it" order | Vanilla gear |
|---|---|---|
| `KEEP_BUSY` | Keep 'em busy (bite and hold) | NAKED |
| `FULTON` | Get it (Fulton) | TACTICAL (FULTON) |
| `KNOCK_OUT` | Knock out | SNEAKING (STUN) |
| `WOUND` | Wound | BATTLE DRESS |
| `KILL` | Kill | SNEAKING (KNIFE) |
| `KEEP_BUSY_NO_HOLD` | Keep 'em busy, without the hold | MILLER, OCELOT |

Vanilla BATTLE DRESS: `damageRate` 0.25 during orders, `bulletFlinch`
`false`, armour effect and sound, `escapeDistance` and
`hitRetreatDistance` 10, `retargetRange` 15. Soldiers treat the two
SNEAKING suits and BATTLE DRESS as a threat.

Sortie Prep cost and ability line come from the R&D row: `usageGmpCost`
and `langPowerUpInfo0` (e.g. `"ability_1043"`).

### The package

Copy the vanilla package and point its `.fox2` at your `.parts`; ship
the `.fpkd` and `.pftxs` with it.

| Branch | Vanilla package |
|---|---|
| `quiet` | `/Assets/tpp/pack/buddy/quiet/buddy_quiet2_00.fpk` |
| `horse` | `/Assets/tpp/pack/buddy/horse/buddy_horse2_00.fpk` |
| `dog` | `/Assets/tpp/pack/buddy/dog/buddy_dog2_00.fpk` |

Tack plays like NORMAL and gear like NAKED apart from the fields you
set; Quiet costumes only change the look. Customize colours and designs
still apply. Quiet wears NAKED in "A Quiet Exit".

### R&D row

```lua
V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:QuietRed", {
  const = {
    equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Quiet,
    langEquipName      = "name_mymod_quiet_red",
    iconFtexPath       = "/Assets/.../ui_quiet_red",
  },
  flow = {
    grade            = 1,
    developGmpCost   = 1000,
    initialAvailable = 1,
  },
})
```

| Branch | `equipDevelopTypeID` |
|---|---|
| `quiet` | `TppMbDev.EQP_DEV_TYPE_Quiet` |
| `horse` | `TppMbDev.EQP_DEV_TYPE_Horse` |
| `dog` | `TppMbDev.EQP_DEV_TYPE_DDog` |

Leave `equipID` out. Other fields:
[AddToEquipDevelopTable](/V_Framework_Lua_API#addtoequipdeveloptable).

---

## Quiet weapons

Build the rifle as a [custom weapon](/V_Framework_Custom_Weapons), then
give its R&D row `equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Quiet`. It
appears in Quiet's weapon list; no other call is needed.

```lua
V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:QuietRifle", {
  const = {
    equipID             = TppEquip.EQP_WP_MyQuietRifle,
    equipDevelopTypeID  = TppMbDev.EQP_DEV_TYPE_Quiet,
    equipDevelopGroupID = TppMbDev.EQP_DEV_GROUP_BUDDY_010,
    langEquipName       = "name_mymod_quiet_rifle",
    iconFtexPath        = "/Assets/.../ui_quiet_rifle",
  },
  flow = { grade = 1, developGmpCost = 1000, initialAvailable = 1 },
})
```

| Rule | Effect |
|---|---|
| `equipDevelopGroupID` is `EQP_DEV_GROUP_BUDDY_010`, `_020` or `_030` | Sortie Prep shows ammo and stat bars. Other groups: name and description only. |
| Its `AddToEquipIdTable` row needs a pack | Quiet loads that pack. Not installed: WICKED BUTTERFLY. |
| Put `sr02qui_asm.mtar` from `bq_wp_00.fpk` in the pack | Quiet's aim and fire animations. |
| A suppressor muzzle option (`suppressor = 1`, e.g. `MO_60106`) | Quiet fires suppressed. |
| A non-lethal bullet | Tranquilizer rifle, with its iDroid orders. |
| A shell bullet (`bulletType = 3`) | She fires the shell; its blast is the only hit. |

### Quiet weapon animations

Quiet has rifle animations only. Give a weapon its own:

```lua
V_TppBuddyService.SetQuietWeaponMotion{
  equipId = TppEquip.EQP_WP_MyLauncher,
  quietMotion = {
    mtar  = "/Assets/tpp/motion/mtar/mymod/quiet_launcher.mtar",
    clips = { hold = "...", aim = "...", fire = "...", reload = "..." },
    prone = { hold = "...", aim = "...", fire = "...", reload = "..." },
  },
  weaponMotion = { clips = { fire = "...", reload = "..." } },
}
```

| Field | Required | Purpose |
|---|---|---|
| `equipId` | Yes | The weapon. |
| `quietMotion.mtar` | With body clips | Motion archive packed in the weapon's pack. |
| `quietMotion.clips` | No (rifle) | Standing clips; crouching fire and reload use them too. |
| `quietMotion.prone` | No (rifle) | Prone clips. |
| `weaponMotion.clips` | No (vanilla) | The weapon model's own fire and reload clips. |

A clip is a path, MtarTool id or `0x` id. Leave a move out and she plays her rifle clip for it. `aim` must be a 25-frame aim sweep like hers; author `fire` and `reload` against your `aim`.

---

## SetBuddyOutfit

```lua
V_TppBuddyService.SetBuddyOutfit("MyMod:QuietRed")
```

Takes a `RegisterBuddyOutfit` key or a Quiet weapon's R&D key. If that
buddy is out, it changes at once; otherwise it is worn next time.

Returns `true`, or `false` when the buddy is busy (try again later).

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework Lua API](/V_Framework_Lua_API)
  - [V Framework Custom Weapons](/V_Framework_Custom_Weapons)
  - [V Framework Custom Outfits](/V_Framework_Custom_Outfits)
