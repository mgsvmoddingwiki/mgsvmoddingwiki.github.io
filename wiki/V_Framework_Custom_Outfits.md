---
title: V Framework Custom Outfits
permalink: /V_Framework_Custom_Outfits/
tags: [Lua, Reference, Guides, Infinite Heaven, Player, V Framework]
---

A custom outfit is a body model (`.parts`) and package (`.fpk`), with
optional camo, voice, face, head, and variant assets.

Place all calls inside `this.LoadLibraries()`.

## Functions

| Function | Description |
|---|---|
| [`V_Player.RegisterOutfit`](#registeroutfit) | Create a new uniform. |
| [`V_Player.RegisterHeadOption`](#registerheadoption) | Create a new custom head. |
| [`V_Player.ExtendVanillaOutfit`](#extendvanillaoutfit) | Add variants or heads to an existing vanilla outfit. |
| [`V_TppMotherBaseManagement.AddToEquipDevelopTable`](#outfit-rd-row) | R&D name, icon, grade, cost, and unlock state. |
| [`V_Player.GetOutfitInfo`](/V_Framework_Lua_API#custom-outfits) | Read back the ids assigned to an outfit you registered. |
| [`V_Player.GetHeadOptionSlot`](/V_Framework_Lua_API#custom-outfits) | Read back the `vars.playerFaceEquipId` value a custom head wears under. |

IDs are assigned automatically and saved under each registration `key`.

Most `*Fpk` and `*Fv2` fields take a path, `true` for vanilla, or
`false` to disable the asset.

> `RegisterOutfit` needs an `AddToEquipDevelopTable` row with the same
> key.
{:.important}

---

## RegisterOutfit

```lua
V_Player.RegisterOutfit({
  key = "MyMod:MySuit",

  ddFemale = {
    partsPath = "/Assets/.../body.parts",
    fpkPath   = "/Assets/.../body.fpk",
  },
})
```

Returns `partsType, developId, flowIndex`, or `false`.

| Field | Required | Purpose |
|---|---|---|
| `key` | Yes | Registration key. |
| `snake`, `avatar`, `ddMale`, `ddFemale`, `ocelot`, `quiet` | At least one | Per-character branch. |

### Branch fields

| Field | Required | Purpose |
|---|---|---|
| `partsPath` | Yes | Body model. |
| `fpkPath` | Yes | Its package. Not installed: the vanilla suit is worn. |
| `camoFpk`, `camoFv2` | No (none) | Camo. `camoFpk` not installed: no camo. |
| `diamondFpk`, `diamondFv2` | No (none) | Diamond Dogs emblem or overlay. `diamondFpk` not installed: neither is used. |
| [`voiceFpk`, `voiceType`](#outfit-voice) | No (vanilla) | Outfit voice. |
| `faceFpk`, `skinFv2` | No (vanilla) | Face and skin. |
| `iconFtexPath` | No (R&D icon) | Suit-list icon. |
| `displayName` | No | Outfit-cell label. |
| `enableArm` | No (`true`) | Keep Snake or Avatar's bionic arm. Always off on `ddMale` and `ddFemale`. |
| `enableHead` | No (`true`) | Keep the character head. |
| [`headOptions`](#head-options) | No (none) | Selectable heads. Max 120. |
| [`variants`](#variants) | No (none) | Alternative looks you cycle through. Max 254. |
| [`camoBonusType`](#camo-bonus) | No (none) | Use a vanilla camo's concealment. |
| [`camoBonusValues`](#camo-bonus) | No (none) | Own concealment per material. |
| [`abilities`](#abilities) | No (none) | Abilities while worn. |
| [`motionMtars`](#outfit-motion) | No (vanilla) | Replacement player motion archives. |

### Head options

Each `headOptions` entry is a raw equip ID, a custom head key, or one of
these vanilla heads:

```text
none, bandana, infinitebandana, balaclava, spheadgear, hpheadgear
```

```lua
headOptions = { "balaclava", "MyMod:MyHead" },
```

### Variants

```lua
variants = {
  {
    partsPath   = "/Assets/tpp/parts/chara/mymod/body_alt.parts",
    fpkPath     = "/Assets/tpp/pack/mymod/body_alt.fpk",
    displayName = "staff_name_99_052",
    default     = true,
  },
},
```

All variant fields are optional.

| Field | Default | Purpose |
|---|---|---|
| `partsPath`, `fpkPath` | base model | Variant model and package. |
| `camoFpk`, `camoFv2`, `diamondFpk`, `diamondFv2` | none | Variant camo and emblem. An `*Fpk` not installed: its pair is not used. |
| [`voiceFpk`, `voiceType`](#outfit-voice) | branch's | Variant voice. |
| `displayName` | - | Variant label on the cycle button. |
| `iconFtexPath` | branch's | Suit-list icon. |
| `default` | `false` | `true` makes this the initial variant. |
| `enableArm`, `enableHead` | branch's | Override the branch values. |
| `headOptions` | none | This variant's heads. |
| [`motionMtars`](#outfit-motion) | branch's | Motion while this variant is worn. |

### Camo bonus

`camoBonusType` takes a vanilla camo name (`playerCamoTypes` in
[player2_camouf_param.lua](https://github.com/kapuragu/InfiniteHeaven/blob/4a52888a714c958a65037a67a0d7d4d1dfdecf60/tpp/data1_dat-lua/Assets/tpp/level_asset/chara/player/game_object/player2_camouf_param.lua#L136))
or a number `0-116`:

```lua
camoBonusType = "TIGERSTRIPE",
```

`camoBonusValues` takes one value per material. Keys are `MTR_*` names
(`materialTypes` in
[player2_camouf_param.lua](https://github.com/kapuragu/InfiniteHeaven/blob/4a52888a714c958a65037a67a0d7d4d1dfdecf60/tpp/data1_dat-lua/Assets/tpp/level_asset/chara/player/game_object/player2_camouf_param.lua#L49))
or `1-82`. Materials left out are `0`:

```lua
camoBonusValues = {
  MTR_LEAF   = 90,
  MTR_SOIL_A = 60,
  MTR_CONC_A = 15,
},
```

> Use one or the other. With both, `camoBonusType` wins.
{:.important}

### Abilities

```lua
abilities = {
  quietMovement = true,
  defense       = 4,
  rattleSuit    = "snk",
},
```

All ability fields are optional.

| Field | Type (default) | Effect |
|---|---|---|
| `quietMovement` | boolean (`false`) | Move like Quiet. |
| `silentFootsteps` | boolean (`false`) | Footsteps one level quieter. |
| `raidenSprint` | boolean (`false`) | Sprint like the Raiden suit: faster dash and its dash sound. |
| `ninjaSprint` | boolean (`false`) | Sprint like the Cyborg Ninja suit: a smaller dash boost and the same sound. |
| `sprintSpark` | string (none) | `.vfx` at each dashing footstep, packed with the outfit; needs `raidenSprint` or `ninjaSprint`. Raiden's: `/Assets/tpp/effect/vfx_data/chara/fx_tpp_chrfotspk01_s5.vfx`. |
| `defense` | number `0-9` (`0`, off) | Damage reduction. |
| `lifeRecovery` | number `0-9` (`0`, off) | Health regeneration rate. |
| `rattleSuit` | string or number (`"nom"`) | Cloth-rustle sound: `"nom"`, `"bony"`, `"snk"`, `"amr"`. |
| `damageSe` | string (vanilla) | Sound when hit: `"battledress"` (Battle Dress) or `"default"`. |

### Outfit motion

Name a player motion archive in `motionMtars` to replace it while the
outfit is worn. Archives you leave out stay vanilla.

```lua
motionMtars = {
  cqc  = "/Assets/tpp/motion/mtar/mymod/mysuit_cqc.mtar",
  jump = "/Assets/tpp/motion/mtar/mymod/mysuit_jump.mtar",
},
```

Keys are the archive filenames in `/Assets/tpp/motion/mtar/player2/`,
without the `player2_` prefix and `.mtar`:

```text
avatar_edit, behind, camera, carry, cbox, cqc, cure, cypr,
ddf_facial, ddm_facial, elude, facial_ddf_helispace,
facial_ddm_helispace, facial_snake_helispace, gimmick, heli, horse,
jump, ladder, liquid, ocelot_facial, okb_zero, online, paz, pipe,
quiet_facial, resident, timecigarette, trashbox, vehicle,
vram_resident, TppPlayer2Facial
```

The replacement must hold every clip of the vanilla archive, or those
animations break. Build it from the vanilla `.mtar`.

### Outfit voice

`voiceFpk` is one package path, or a table with one package per voice
type. `voiceType` forces the voice the player speaks with.

```lua
ddMale = {
  partsPath = "/Assets/tpp/parts/chara/mymod/body.parts",
  fpkPath   = "/Assets/tpp/pack/mymod/body.fpk",

  voiceFpk = {
    ddmsoldiera = "/Assets/tpp/pack/mymod/voice_a.fpk",
    ddmsoldierb = "/Assets/tpp/pack/mymod/voice_b.fpk",
  },
  voiceType = "ddmsoldiera",
},
```

#### Voice types

| Player type | Voice | Number |
|---|---|---|
| `snake`/`avatar` | `snak` | `0x3CF677C6` |
| `ddMale` | `ddmsoldiera` | `0x2EED93D9` |
| `ddMale` | `ddmsoldierb` | `0x2EED93DA` |
| `ddMale` | `ddmsoldierc` | `0x2EED93DB` |
| `ddMale` | `ddmsoldierd` | `0x2EED93DC` |
| `ddFemale` | `ddfsoldiera` | `0x80400AFA` |
| `ddFemale` | `ddfsoldierb` | `0x80400AF9` |
| `ddFemale` | `ddfsoldierc` | `0x80400AF8` |
| `ddFemale` | `ddfsoldierd` | `0x80400AFF` |
| `ocelot` | `ocelot` | `0x1BF9CBC1` |
| `quiet` | `quiet` | `0x5D5262DF` |

### Outfit R&D row

```lua
V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:MySuit", {
  const = {
    equipID             = TppEquip.EQP_SUIT,
    equipDevelopTypeID  = TppMbDev.EQP_DEV_TYPE_Suit,
    langEquipName       = "staff_name_99_051",
    iconFtexPath        = "/Assets/.../ui_suit_icon",
    equipDevelopGroupID = V_TppMbDev.EQP_OUTFIT_VARIANT_NAME,
  },
  flow = {
    grade            = 5,
    developGmpCost   = 50000,
    initialAvailable = 0,
  },
})
```

Other fields:
[AddToEquipDevelopTable](/V_Framework_Lua_API#addtoequipdeveloptable).

---

## RegisterHeadOption

```lua
V_Player.RegisterHeadOption({
  key = "MyMod:MyHead",

  snake = {
    fv2 = "/Assets/.../myhead.fv2",
    fpk = "/Assets/.../myhead.fpk",
  },
})
```

### Head fields

| Field | Required | Purpose |
|---|---|---|
| `key` | Yes | Registration key, shared with its [R&D row](#head-rd-row). Max 63 characters; no line break, double quote or backslash. |
| `snake`, `avatar`, `ddMale`, `ddFemale` | At least one | Per-character [branches](#branches). |
| `showInDevelopMenu` | No (`false`) | `true` lists the head in R&D. |
| [`abilities`](#head-abilities) | No (none) | Abilities while the head is worn. |

### Branches

| Field | Branch | Required | Purpose |
|---|---|---|---|
| `fv2`, `fpk` | `snake`, `avatar` | Yes | Head model. |
| `TppEnemyFaceId` | `ddMale`, `ddFemale` | No (balaclava) | Soldier face worn as the head. |
| `fv2`, `fpk` | `ddMale`, `ddFemale` | No | Own head model. Wins over `TppEnemyFaceId`. |

```lua
ddMale = {
  TppEnemyFaceId = TppEnemyFaceId.svs_balaclava,
},

ddFemale = {
  fv2 = "/Assets/tpp/fova/chara/mymod/head_ddf.fv2",
  fpk = "/Assets/tpp/pack/mymod/head_ddf.fpk",
},
```

### Head motion

A branch can animate the head and attach effects; play them with
[`PlayHeadMotion`, `PlayHeadEffect` and `PlayHeadSound`](/V_Framework_Lua_API).

```lua
snake = {
  -- fv2, fpk ...
  motion = {
    mtar    = "/Assets/tpp/motion/mymod/head_motion.mtar",
    clips   = { blink = "/Assets/tpp/motion/mymod/blink.gani" },
    effects = {
      sparks = { vfx = "/Assets/tpp/effect/mymod/sparks.vfx", point = "CNP_HEAD", clip = "blink" },
    },
    rest    = "blink",
  },
},
```

| Field | Required | Purpose |
|---|---|---|
| `mtar` | Yes, for clips | Head animation archive, packed in the head's `fpk`. |
| `clips` | Yes, for clips | Clip name = clip id (path, MtarTool id or `0x` id). |
| `effects` | No (none) | Effects by name. |
| `rest` | No (none) | Clip whose effects run while no other clip plays. |

Each effect:

| Field | Required | Purpose |
|---|---|---|
| `vfx` | Yes | Effect file. |
| `point` | No (none) | Connect point to attach to. |
| `clip` | No (none) | Starts with this clip. |

### Head abilities

`abilities` goes at the top level, next to `key`. Inside a branch it is
ignored.

```lua
V_Player.RegisterHeadOption({
  key       = "MyMod:MyHead",
  snake     = { fv2 = "/Assets/.../myhead.fv2", fpk = "/Assets/.../myhead.fpk" },
  abilities = { infiniteAmmo = true },
})
```

| Field | Type (default) | Effect |
|---|---|---|
| `infiniteAmmo` | boolean (`false`) | Infinite ammo. |

### Face layers (DD soldiers)

Optional, `ddMale`/`ddFemale` only. `true` keeps the soldier's own
layer, `false` hides it under the head. Omitted: vanilla behaviour.

| Layer | Contents | Toggle |
|---|---|---|
| face | Face model. | `enableFaceFova` |
| face deco | Beard, stubble or face paint on the face. | `enableFaceDecoFova` |
| hair | Hair model. | `enableHairFova` |
| hair deco | Hair colour or style. | `enableHairDecoFova` |

```lua
ddMale = {
  TppEnemyFaceId     = TppEnemyFaceId.dds_balaclava2,
  enableFaceFova     = false,
  enableFaceDecoFova = false,
},
```

#### Layer path overrides

Optional. Force specific layer assets, such as a hair, for a head:

```lua
V_Player.RegisterHeadOption({
  key = "MyMod:CapWithPixieHair",

  ddFemale = {
    fv2 = "/Assets/tpp/fova/chara/mymod/cap_ddf.fv2",
    fpk = "/Assets/tpp/pack/mymod/cap_ddf.fpk",

    faceFovaPath        = "",
    faceFovaFpkPath     = "",
    faceDecoFovaPath    = "",
    faceDecoFovaFpkPath = "",
    hairFovaPath        = "/Assets/tpp/fova/common_source/chara/cm_head/hair/cm_hair_c101.fv2",
    hairFovaFpkPath     = "/Assets/tpp/pack/fova/common_source/chara/cm_head/hair/cm_hair_c101.fpk",
    hairDecoFovaPath    = "/Assets/tpp/fova/common_source/chara/cm_head/hair_deco/cm_hair_c101_c000.fv2",
    hairDecoFovaFpkPath = "/Assets/tpp/pack/fova/common_source/chara/cm_head/hair_deco/cm_hair_c101_c000.fpk",
  },
})
```

### Face stages (Snake only)

Optional. `faceStages` gives a Snake head its own face per Demon Point stage.
Missing stages use the branch's `fv2` and `fpk`.

```lua
snake = {
  fv2 = "/Assets/.../myhead.fv2",
  fpk = "/Assets/.../myhead.fpk",

  faceStages = {
    [1] = { fv2 = "/Assets/.../myhead_normal.fv2", fpk = "/Assets/.../myhead_normal.fpk" }, -- Normal
    [2] = { fv2 = "/Assets/.../myhead_horn.fv2",   fpk = "/Assets/.../myhead_horn.fpk" },   -- Grown horn
    [3] = { fv2 = "/Assets/.../myhead_demon.fv2",  fpk = "/Assets/.../myhead_demon.fpk" },  -- Demon Snake
  },
}
```

### Head R&D row

Gives the head its name and icon.

```lua
V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:MyHead", {
  const = {
    equipID            = TppEquip.EQP_None,
    equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Suit,
    langEquipName      = "staff_name_99_050",
    iconFtexPath       = "/Assets/.../ui_head_icon",
  },
  flow = {
    grade            = 1,
    developGmpCost   = 1000,
    initialAvailable = 0,
  },
})
```

---

## ExtendVanillaOutfit

Adds to a vanilla suit; no new suit cell or R&D row.

```lua
V_Player.ExtendVanillaOutfit({
  outfit = "TIGERSTRIPE",

  snake = {
    headOptions = { "bandana", "MyMod:MyHead" },
    variants = {
      {
        partsPath = "/Assets/.../variant.parts",
        fpkPath   = "/Assets/.../variant.fpk",
      },
    },
  },
})
```

### Select the vanilla suit

Use one of these:

| Field | Required | Purpose |
|---|---|---|
| `outfit` | One of the two | Vanilla camo name, such as `"TIGERSTRIPE"`, or a number `0-116`. |
| `partsType` | One of the two | Raw parts type. `variants` do not work with it. |

```lua
V_Player.ExtendVanillaOutfit({
  partsType = 3,
  snake     = { headOptions = { "bandana", "MyMod:MyHead" } },
})
```

### Vanilla-outfit branch fields

All optional; only fields you set change the suit. `headOptions` and
the voice fields apply only to the named camo.

| Field | Required | Purpose |
|---|---|---|
| `variants` | No (none) | Extra looks. A vanilla parts type holds 29 in total. |
| `headOptions` | No (none) | Heads added to the suit. Max 120. |
| [`voiceFpk`, `voiceType`](#outfit-voice) | No (vanilla voice) | Voice for the suit on this player type. |
| `enableArm` | No (`true`) | `false` hides the bionic arm, also in FOB. Snake and Avatar only. |
| `enableHead` | No (`true`) | `false` hides the head (face and hair on DD); the vanilla head shows online. A head built into the suit stays. |
| [`abilities`](#abilities) | No (none) | Suit abilities for this branch. |

### Vanilla-outfit variant fields

These mirror the [variant fields](#variants), with these differences:

| Field | Required | Purpose |
|---|---|---|
| `partsPath`, `fpkPath` | Yes | If `fpkPath` is not installed, the vanilla suit is used. |
| `camoFpk`, `camoFv2` | No (vanilla camo) | If `camoFpk` is not installed, the vanilla camo is used. |
| `diamondFpk`, `diamondFv2` | No (vanilla overlay) | Wet, mud or emblem overlay; `false` removes it. If `diamondFpk` is not installed, the vanilla overlay is used. |
| `voiceFpk`, `voiceType` | No (branch voice) | Not applied in FOB. |

```lua
V_Player.ExtendVanillaOutfit({
  outfit = "TIGERSTRIPE",

  ddFemale = {
    variants = {
      {
        partsPath   = "/Assets/tpp/parts/chara/sna/sna4_plyf0_def_v00.parts",
        fpkPath     = "/Assets/tpp/pack/mymod/plparts_female_6.fpk",
        diamondFpk  = false,
        displayName = "staff_name_99_117",
      },
    },
  },
})
```

---

## Minimal complete example

```lua
local this = {}

function this.LoadLibraries()

  V_Player.RegisterHeadOption({
    key = "MyMod:OgreHorn",

    ddFemale = {
      fv2 = "/Assets/tpp/fova/chara/mymod/ogrehorn.fv2",
      fpk = "/Assets/tpp/pack/mymod/ogrehorn.fpk",
    },
  })

  V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:OgreHorn", {
    const = {
      equipID            = TppEquip.EQP_None,
      equipDevelopTypeID = TppMbDev.EQP_DEV_TYPE_Suit,
      langEquipName      = "staff_name_99_050",
      iconFtexPath       = "/Assets/.../ui_head_ogre",
    },
    flow = {
      grade            = 1,
      developGmpCost   = 1000,
      initialAvailable = 0,
    },
  })

  V_Player.RegisterOutfit({
    key = "MyMod:OgreSuit",

    ddFemale = {
      partsPath   = "/Assets/tpp/parts/chara/mymod/ogre.parts",
      fpkPath     = "/Assets/tpp/pack/mymod/ogre.fpk",
      headOptions = { "MyMod:OgreHorn", "balaclava" },
    },
  })

  V_TppMotherBaseManagement.AddToEquipDevelopTable("MyMod:OgreSuit", {
    const = {
      equipID             = TppEquip.EQP_SUIT,
      equipDevelopTypeID  = TppMbDev.EQP_DEV_TYPE_Suit,
      langEquipName       = "staff_name_99_051",
      iconFtexPath        = "/Assets/.../ui_ogre_suit",
      equipDevelopGroupID = V_TppMbDev.EQP_OUTFIT_VARIANT_NAME,
    },
    flow = {
      grade            = 5,
      developGmpCost   = 50000,
      initialAvailable = 1,
    },
  })
end

return this
```

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework Lua API](/V_Framework_Lua_API)
  - [V Framework Custom Weapons](/V_Framework_Custom_Weapons)
