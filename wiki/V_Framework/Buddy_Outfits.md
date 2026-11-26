---
title: Buddy Outfits
permalink: /V_Framework/Buddy_Outfits/
tags: [Lua, Reference, Guides, Infinite Heaven, V Framework]
redirect_from:
    - /V_Framework_Buddy_Outfits/
---

New costumes for Quiet, tack for D-Horse and gear for D-Dog, picked in
Sortie Prep like the vanilla ones. [Quiet weapons](#quiet-weapons) and
[D-Walker sidearms](#d-walker-sidearm) are custom weapons.

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

Returns the new costume, tack or gear number (numbered after the vanilla
ones) and its `developId`, or `false`.

| Field | Required | Purpose |
|---|---|---|
| `key` | Yes | Registration key. |
| `quiet`, `horse`, `dog` | Exactly one | The buddy that wears it. |

### Branch fields

| Field | Branch | Required | Purpose |
|---|---|---|---|
| `fpkPath` | all | Yes | The buddy's package. Not installed: the vanilla default is worn. |
| `bruise` | `quiet` | No (`false`) | `true` shows NAKED's bruises. |
| `bruiseFv2`, `bruiseFpk` | `quiet` | No | Own bruise look. Give both. |
| `damageRate` | `horse` | No (`1`) | Share of damage D-Horse takes. `1` = full, max `1.275`. |
| `gallopSpeedRate` | `horse` | No (`1`) | Gallop speed multiplier. |
| `bodyAttackId` | `horse` | No (`ATK_HorseBodyAttack`) | `TppDamage.ATK_*` hit when D-Horse rams soldiers. |
| `soundType` | `horse` | No (`0`) | Vanilla tack whose movement sounds play, see [D-Horse tack](#d-horse-tack). |
| `commandType` | `dog` | No (`KEEP_BUSY`) | D-Dog's "Do it" order, a `V_DogCommandType` value, see [D-Dog gear](#d-dog-gear). |
| `damageRate` | `dog` | No (`1`) | Share of damage D-Dog takes. |
| `bulletFlinch` | `dog` | No (`true`) | `false`: bullets don't stagger D-Dog. |
| `armorHitEffect`, `armorHitSound` | `dog` | No (`false`) | Armour spark and ricochet sound when shot. |
| `escapeDistance` | `dog` | No (`30`) | Metres D-Dog runs to escape. |
| `hitRetreatDistance` | `dog` | No (`20`) | Metres D-Dog backs off when hit. |
| `retargetRange` | `dog` | No (`0`) | Extra metres D-Dog looks for the next enemy. |
| `soldierThreat` | `dog` | No (`false`) | `true`: soldiers treat D-Dog as armed, not as a stray. |

Unset fields: tack plays like NORMAL, gear like NAKED. Quiet costumes
change only the look; Customize colours and designs still apply. Quiet
wears NAKED in "A Quiet Exit".

Bruises show only when a script sends:

```lua
GameObject.SendCommand(quietId, { id = "SetBruise", enable = true })
```

### D-Horse tack

```lua
horse = {
  fpkPath    = "/Assets/tpp/pack/mymod/buddy_horse_armor.fpk",
  damageRate = 0.4,
  soundType  = 4,
},
```

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

### The package

Copy the vanilla package and point its `.fox2` at your `.parts`; ship
the `.fpkd` and `.pftxs` with it.

| Branch | Vanilla package |
|---|---|
| `quiet` | `/Assets/tpp/pack/buddy/quiet/buddy_quiet2_00.fpk` |
| `horse` | `/Assets/tpp/pack/buddy/horse/buddy_horse2_00.fpk` |
| `dog` | `/Assets/tpp/pack/buddy/dog/buddy_dog2_00.fpk` |

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

Sortie Prep cost and ability line come from the R&D row: `usageGmpCost`
and `langPowerUpInfo0` (e.g. `"ability_1043"`).

Leave `equipID` out. Other fields:
[AddToEquipDevelopTable](/V_Framework/Lua_API#addtoequipdeveloptable).

---

## SetBuddyOutfit

```lua
V_TppBuddyService.SetBuddyOutfit("MyMod:QuietRed")
```

Takes a `RegisterBuddyOutfit` key or a Quiet weapon's R&D key. Applies
at once if the buddy is out, else next time. Returns `true`, or `false`
when the key is not registered or the buddy is busy.

---

## Quiet weapons

A [custom weapon](/V_Framework/Custom_Weapons) whose R&D row has
`equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Quiet`. No other call.

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

Quiet has rifle animations only.

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
| `quietMotion.mtar` | Yes, with `clips` or `prone` | Motion archive packed in the weapon's pack. |
| `quietMotion.clips` | No (rifle) | Standing clips; crouching fire and reload use them too. |
| `quietMotion.prone` | No (rifle) | Prone clips. |
| `weaponMotion.clips` | No (vanilla) | The weapon model's own fire and reload clips. |

Clips take the forms of [custom weapon
clips](/V_Framework/Custom_Weapons#clip-fields). Leave a move out and
she plays her rifle clip for it. `aim` must be a 25-frame aim sweep like
hers; author `fire` and `reload` against your `aim`.

---

## D-Walker sidearm

Any
[AddToEquipDevelopTable](/V_Framework/Lua_API#addtoequipdeveloptable)
row with `equipDevelopTypeID` (`p02`) =
`TppMbDev.EQP_DEV_TYPE_WalkerGear` and a handgun or SMG as `equipID`
(`p01`) is a D-Walker sidearm; no other call. Other weapon types are
refused with a log warning. Picked in the D-Walker's sub weapon slot.

```lua
V_TppEquip.RegisterConstantEquipId("EQP_WP_MyWalkerPistol")

V_TppEquip.AddToEquipIdTable{
  { TppEquip.EQP_WP_MyWalkerPistol, TppEquip.EQP_TYPE_Handgun, TppEquip.WP_MyPistol, TppEquip.EQP_BLOCK_MISSION,
    "/Assets/.../my_pistol.parts", "/Assets/.../my_pistol.fpk" },
}

V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:WalkerPistol", {
  const = {
    equipID             = TppEquip.EQP_WP_MyWalkerPistol,
    equipDevelopTypeID  = TppMbDev.EQP_DEV_TYPE_WalkerGear,
    equipDevelopGroupID = TppMbDev.EQP_DEV_GROUP_BUDDY_230,
    langEquipName       = "name_mymod_walker_pistol",
    iconFtexPath        = "/Assets/.../ui_walker_pistol",
  },
  flow = { grade = 1, developGmpCost = 1000, initialAvailable = 1 },
})
```

  - Needs its own equip ID (one per R&D row); its `AddToEquipIdTable`
    row may reuse a Snake weapon's weaponId, parts and pack.
  - Each row is its own sidearm; chain upgrades with
    `baseEquipDevelopId` (`p03`).
  - `equipDevelopGroupID` (`p09`): one of the vanilla sidearm groups,
    `TppMbDev.EQP_DEV_GROUP_BUDDY_230` .. `_260`.
  - The pack loads automatically.
  - Mod removed: the D-Walker falls back to the DW S.PISTOL.

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework Lua API](/V_Framework/Lua_API)
  - [V Framework Custom Weapons](/V_Framework/Custom_Weapons)
  - [V Framework Custom Outfits](/V_Framework/Custom_Outfits)
