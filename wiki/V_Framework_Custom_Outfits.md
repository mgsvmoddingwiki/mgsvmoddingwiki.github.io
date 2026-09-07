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
| [`V_TppMotherBaseManagement.AddToEquipDevelopTable`](#outfit-rd-row) | Provides the R&D name, icon, grade, cost, and unlock state. |
| [`V_Player.GetOutfitInfo`](/V_Framework_Lua_API#custom-outfits) | Reads back the ids assigned to an outfit you registered. |

IDs are allocated automatically and saved under each registration `key`.

Most `*Fpk` and `*Fv2` fields accept a path, `true` for vanilla, or
`false` to disable the asset.

> `RegisterOutfit` needs an `AddToEquipDevelopTable` row with the same
> key. `ExtendVanillaOutfit` uses the vanilla outfit's existing row.
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

### Required branch fields

Use at least one player branch:

```text
snake, avatar, ddMale, ddFemale, ocelot, quiet
```

`ocelot` and `quiet` are the two unique characters.

Each branch requires:

| Field | Purpose |
|---|---|
| `partsPath` | Body model. |
| `fpkPath` | Package containing its assets. |

A branch missing either field is skipped.

### Optional branch fields

| Field | Purpose |
|---|---|
| `camoFpk`, `camoFv2` | Camo assets. |
| `diamondFpk`, `diamondFv2` | Diamond Dogs emblem or overlay assets. |
| `voiceFpk` | Outfit voice package. |
| `chickenCapFpk`, `chickenCapFv2` | Chicken Hat assets used while this outfit is worn. |
| `lilChickCapFpk`, `lilChickCapFv2` | Lil' Chick Hat assets used while this outfit is worn. |
| `faceFpk`, `skinFv2` | Branch-level face and skin assets. |
| `iconFtexPath` | Suit-list icon for this branch. |
| `enableArm` | Keep Snake or Avatar's bionic arm. Default: `true`. Ignored on `ddMale` and `ddFemale`, where the arm is always off. |
| `enableHead` | Keep the character head. Default: `true`. |
| `displayName` | Outfit-cell label. |
| [`motionMtars`](#outfit-motion) | Per-archive motion overrides. Branch level only. |
| [`camoBonusType`](#camo-bonus) | Vanilla camo profile name or number `0-116`. |
| [`camoBonusValues`](#camo-bonus) | Per-material camo values. |
| [`headOptions`](#head-options) | Available heads. Maximum 120. |
| [`variants`](#variants) | Additional outfit variations. Maximum 254. (With the base one = 255 cells) |
| [`abilities`](#abilities) | Abilities granted while this outfit is worn. |

```lua
V_Player.RegisterOutfit({
  key = "MyMod:MySuit",

  snake = {
    partsPath     = "/Assets/tpp/parts/chara/mymod/body.parts",
    fpkPath       = "/Assets/tpp/pack/mymod/body.fpk",
    camoFv2       = "/Assets/tpp/fova/chara/mymod/camo.fv2",
    camoFpk       = "/Assets/tpp/pack/mymod/camo.fpk",
    diamondFv2    = "/Assets/tpp/fova/chara/mymod/emblem.fv2",
    diamondFpk    = "/Assets/tpp/pack/mymod/emblem.fpk",
    faceFpk       = "/Assets/tpp/pack/mymod/face.fpk",
    skinFv2       = "/Assets/tpp/fova/chara/mymod/skin.fv2",
    voiceFpk      = "/Assets/tpp/pack/mymod/voice.fpk",
    chickenCapFpk = "/Assets/tpp/pack/mymod/chickencap.fpk",
    chickenCapFv2 = "/Assets/tpp/fova/chara/mymod/chickencap.fv2",
    lilChickCapFpk = "/Assets/tpp/pack/mymod/lilchickcap.fpk",
    lilChickCapFv2 = "/Assets/tpp/fova/chara/mymod/lilchickcap.fv2",
    iconFtexPath  = "/Assets/tpp/ui/texture/EquipIcon/mymod/ui_mysuit",
    displayName   = "staff_name_99_051",
    enableArm     = false,
    enableHead    = true,
    camoBonusType = "TIGERSTRIPE",
    headOptions   = { "balaclava", "MyMod:MyHead" },
  },
})
```

The function returns `partsType, developId, flowIndex`, or `false`.

### Head options

A `headOptions` entry may be:

  - a raw equip ID.
  - a custom head key.

Vanilla head options that can be used:

```text
none, bandana, infinitebandana, balaclava, spheadgear, hpheadgear
```

### Variants

Variants are extra variation cells on the same suit - the alternative
appearances you cycle through on one outfit entry. They are **not** R&D
grades: adding variants does not create development levels, and the
grade shown in R&D is unrelated to how many variants a suit has.

```lua
variants = {
  {
    partsPath    = "/Assets/tpp/parts/chara/mymod/body_alt.parts",
    fpkPath      = "/Assets/tpp/pack/mymod/body_alt.fpk",
    camoFv2      = "/Assets/tpp/fova/chara/mymod/camo_alt.fv2",
    camoFpk      = "/Assets/tpp/pack/mymod/camo_alt.fpk",
    diamondFv2   = "/Assets/tpp/fova/chara/mymod/emblem_alt.fv2",
    diamondFpk   = "/Assets/tpp/pack/mymod/emblem_alt.fpk",
    voiceFpk     = "/Assets/tpp/pack/mymod/voice_alt.fpk",
    chickenCapFpk  = "/Assets/tpp/pack/mymod/chickencap_alt.fpk",
    chickenCapFv2  = "/Assets/tpp/fova/chara/mymod/chickencap_alt.fv2",
    lilChickCapFpk = "/Assets/tpp/pack/mymod/lilchickcap_alt.fpk",
    lilChickCapFv2 = "/Assets/tpp/fova/chara/mymod/lilchickcap_alt.fv2",
    iconFtexPath = "/Assets/tpp/ui/texture/EquipIcon/mymod/ui_mysuit_alt",
    displayName  = "staff_name_99_052",
    enableArm    = true,
    enableHead   = false,
    headOptions  = { "bandana" },
    default      = true,
  },
}
```

Variant fields:

| Field | Purpose |
|---|---|
| `partsPath`, `fpkPath` | Variant model and package. Inherit the base model when omitted. |
| `camoFpk`, `camoFv2` | Variant camo assets. |
| `diamondFpk`, `diamondFv2` | Variant emblem assets. |
| `voiceFpk` | Variant voice. |
| `chickenCapFpk`, `chickenCapFv2` | Variant Chicken Hat assets. |
| `lilChickCapFpk`, `lilChickCapFv2` | Variant Lil' Chick Hat assets. |
| `displayName` | Variant label. |
| `iconFtexPath` | Suit-list icon for this variant. |
| `default` | Make this the initial variation. |
| `enableArm`, `enableHead` | Override the branch toggles. |
| `headOptions` | This variant's own head list. |

> The icon falls back in order: the variant's `iconFtexPath`, then the
> branch's, then the `iconFtexPath` in the R&D row. Omit it at every
> level and the R&D icon is used, exactly as before. This applies to the
> customize and loadout suit list; the R&D menu always shows its own
> icon.
{:.important}

> Omit `headOptions` and the variant has no selectable heads.
{:.note}

### Camo bonus

`camoBonusType` borrows an existing camo's concealment. Pass a name or a
number `0-116`:

```lua
camoBonusType = "TIGERSTRIPE"
```

Names are the vanilla camo names:

The full list is `playerCamoTypes` in
[player2_camouf_param.lua](https://github.com/kapuragu/InfiniteHeaven/blob/4a52888a714c958a65037a67a0d7d4d1dfdecf60/tpp/data1_dat-lua/Assets/tpp/level_asset/chara/player/game_object/player2_camouf_param.lua#L136).

`camoBonusValues` gives the outfit its own concealment instead, one
value per material. Keys are material names or `1-82`:

```lua
V_Player.RegisterOutfit({
  key = "MyMod:MySuit",

  ddFemale = {
    partsPath = "/Assets/tpp/parts/chara/mymod/body.parts",
    fpkPath   = "/Assets/tpp/pack/mymod/body.fpk",

    camoBonusValues = {
      MTR_LEAF   = 90,
      MTR_MOSS_A = 85,
      MTR_TURF_A = 80,
      MTR_SOIL_A = 60,
      MTR_ROCK_A = 45,
      MTR_SAND_A = 20,
      MTR_CONC_A = 15,
    },
  },
})
```

Materials you leave out are `0` - the table is the whole profile, not a
patch on top of one. Material names are the engine's `MTR_*` set, such
as `MTR_LEAF`, `MTR_SOIL_A`, `MTR_IRON_A`, `MTR_WATE_A`, `MTR_WOOD_A`.
The full list is `materialTypes` in
[player2_camouf_param.lua](https://github.com/kapuragu/InfiniteHeaven/blob/4a52888a714c958a65037a67a0d7d4d1dfdecf60/tpp/data1_dat-lua/Assets/tpp/level_asset/chara/player/game_object/player2_camouf_param.lua#L49).

> The two fields do not combine. `camoBonusType` wins when both are
> present, and `camoBonusValues` is ignored. Use one or the other.
{:.important}

### Abilities

Any branch may carry an `abilities` table:

```lua
quiet = {
  partsPath = "/Assets/.../body.parts",
  fpkPath   = "/Assets/.../body.fpk",
  abilities = {
    quietMovement  = true,
    silentFootsteps = true,
    defense        = 4,
    lifeRecovery   = 2,
    rattleSuit     = "snk",
  },
}
```

| Field | Type | Meaning |
|---|---|---|
| `quietMovement` | boolean | Moves like Quiet - the engine's quiet-movement branch. |
| `silentFootsteps` | boolean | Forces the engine's one-level-quieter footstep branch. |
| `defense` | number | Damage reduction, `0`-`9`. `0` is off, not a floor. |
| `lifeRecovery` | number | Health regeneration rate, `0`-`9`. `0` is off, not a floor. |
| `rattleSuit` | string or number | The `player_type_switch` value that selects the suit's cloth-rustle foley. The stock sound script registers four: `"nom"` (the default), `"bony"`, `"snk"` and `"amr"`. |

Abilities are per branch, so the same outfit can grant different
abilities to different characters.

### Outfit motion

`motionMtars` points individual player motion archives at your own
`.mtar` files while the outfit is worn. Name an archive to replace it;
leave it out to keep the vanilla one:

```lua
V_Player.RegisterOutfit({
  key = "MyMod:MySuit",

  snake = {
    partsPath = "/Assets/tpp/parts/chara/mymod/body.parts",
    fpkPath   = "/Assets/tpp/pack/mymod/body.fpk",

    motionMtars = {
      cqc  = "/Assets/tpp/motion/mtar/mymod/mysuit_cqc.mtar",
      jump = "/Assets/tpp/motion/mtar/mymod/mysuit_jump.mtar",
    },
  },
})
```

There are 32 keys, one per player motion archive. Every vanilla archive
lives in `/Assets/tpp/motion/mtar/player2/`, and the key is its filename
with the `player2_` prefix dropped:

{% include spoiler-start %}

| Key | Vanilla archive |
|---|---|
| `avatar_edit` | `/Assets/tpp/motion/mtar/player2/player2_avatar_edit.mtar` |
| `behind` | `/Assets/tpp/motion/mtar/player2/player2_behind.mtar` |
| `camera` | `/Assets/tpp/motion/mtar/player2/player2_camera.mtar` |
| `carry` | `/Assets/tpp/motion/mtar/player2/player2_carry.mtar` |
| `cbox` | `/Assets/tpp/motion/mtar/player2/player2_cbox.mtar` |
| `cqc` | `/Assets/tpp/motion/mtar/player2/player2_cqc.mtar` |
| `cure` | `/Assets/tpp/motion/mtar/player2/player2_cure.mtar` |
| `cypr` | `/Assets/tpp/motion/mtar/player2/player2_cypr.mtar` |
| `ddf_facial` | `/Assets/tpp/motion/mtar/player2/player2_ddf_facial.mtar` |
| `ddm_facial` | `/Assets/tpp/motion/mtar/player2/player2_ddm_facial.mtar` |
| `elude` | `/Assets/tpp/motion/mtar/player2/player2_elude.mtar` |
| `facial_ddf_helispace` | `/Assets/tpp/motion/mtar/player2/player2_facial_ddf_helispace.mtar` |
| `facial_ddm_helispace` | `/Assets/tpp/motion/mtar/player2/player2_facial_ddm_helispace.mtar` |
| `facial_snake_helispace` | `/Assets/tpp/motion/mtar/player2/player2_facial_snake_helispace.mtar` |
| `gimmick` | `/Assets/tpp/motion/mtar/player2/player2_gimmick.mtar` |
| `heli` | `/Assets/tpp/motion/mtar/player2/player2_heli.mtar` |
| `horse` | `/Assets/tpp/motion/mtar/player2/player2_horse.mtar` |
| `jump` | `/Assets/tpp/motion/mtar/player2/player2_jump.mtar` |
| `ladder` | `/Assets/tpp/motion/mtar/player2/player2_ladder.mtar` |
| `liquid` | `/Assets/tpp/motion/mtar/player2/player2_liquid.mtar` |
| `ocelot_facial` | `/Assets/tpp/motion/mtar/player2/player2_ocelot_facial.mtar` |
| `okb_zero` | `/Assets/tpp/motion/mtar/player2/player2_okb_zero.mtar` |
| `online` | `/Assets/tpp/motion/mtar/player2/player2_online.mtar` |
| `paz` | `/Assets/tpp/motion/mtar/player2/player2_paz.mtar` |
| `pipe` | `/Assets/tpp/motion/mtar/player2/player2_pipe.mtar` |
| `quiet_facial` | `/Assets/tpp/motion/mtar/player2/player2_quiet_facial.mtar` |
| `resident` | `/Assets/tpp/motion/mtar/player2/player2_resident.mtar` |
| `timecigarette` | `/Assets/tpp/motion/mtar/player2/player2_timecigarette.mtar` |
| `trashbox` | `/Assets/tpp/motion/mtar/player2/player2_trashbox.mtar` |
| `vehicle` | `/Assets/tpp/motion/mtar/player2/player2_vehicle.mtar` |
| `vram_resident` | `/Assets/tpp/motion/mtar/player2/player2_vram_resident.mtar` |
| `TppPlayer2Facial` | `/Assets/tpp/motion/mtar/player2/TppPlayer2Facial.mtar` |

{% include spoiler-end %}

Your replacement must contain the same animation clips as the archive it
stands in for. The engine asks for clips by name inside the archive, so
a file missing one leaves that animation broken. The practical way to
build one is to start from the vanilla `.mtar` and edit the clips you
want to change.

### Outfit R&D row

Use the same key as `RegisterOutfit`:

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

This provides the R&D name, icon, grade, cost, and unlock state.

See
[AddToEquipDevelopTable](/V_Framework_Lua_API#addtoequipdeveloptable)
for additional Develop fields.

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

The function returns the head's `equipId`.

### Branches

For `snake` and `avatar`, use:

```lua
fv2 = "/Assets/.../head.fv2"
fpk = "/Assets/.../head.fpk"
```

For `ddMale` and `ddFemale`, use a soldier face ID:

```lua
TppEnemyFaceId = TppEnemyFaceId.svs_balaclava
```

`TppEnemyFaceId` does not apply to Snake or Avatar. Custom `fv2` and
`fpk` paths do not apply to DD soldiers.

```lua
V_Player.RegisterHeadOption({
  key = "MyMod:MyHead",

  snake = {
    fv2 = "/Assets/tpp/fova/chara/mymod/head_sna.fv2",
    fpk = "/Assets/tpp/pack/mymod/head_sna.fpk",
  },

  avatar = {
    fv2 = "/Assets/tpp/fova/chara/mymod/head_ava.fv2",
    fpk = "/Assets/tpp/pack/mymod/head_ava.fpk",
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

Head paths are not extension-validated. Invalid paths fail during
loading.

### Face stages (`faceStages`)

Without stage overrides, a custom Snake head uses the same face at every
Demon Point stage.

Use `faceStages` to support horn growth:

```lua
snake = {
  fv2 = "/Assets/.../myhead.fv2",
  fpk = "/Assets/.../myhead.fpk",

  faceStages = {
    [1] = {
      fv2 = "/Assets/.../myhead_normal.fv2",
      fpk = "/Assets/.../myhead_normal.fpk",
    },
    [2] = {
      fv2 = "/Assets/.../myhead_horn.fv2",
      fpk = "/Assets/.../myhead_horn.fpk",
    },
    [3] = {
      fv2 = "/Assets/.../myhead_demon.fv2",
      fpk = "/Assets/.../myhead_demon.fpk",
    },
  },
}
```

| Entry | Stage |
|---|---|
| `[1]` | Normal |
| `[2]` | Grown horn |
| `[3]` | Demon Snake |

Missing stages use the branch's base `fv2` and `fpk`.

`faceStages` is Snake-only. The engine handles bandana-fit faces
automatically. Gold and Silver suits keep their vanilla hardcoded faces.

### Head R&D row

The head's displayed name and icon come from a Develop row with the same
key:

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

See
[AddToEquipDevelopTable](/V_Framework_Lua_API#addtoequipdeveloptable)
for additional Develop fields.

Registration order does not matter.

---

## ExtendVanillaOutfit

Use this to add variations or heads under an existing vanilla suit.

```lua
V_Player.ExtendVanillaOutfit({
  outfit = "TIGERSTRIPE",

  snake = {
    variants = {
      {
        partsPath = "/Assets/.../variant.parts",
        fpkPath   = "/Assets/.../variant.fpk",
      },
    },

    headOptions = { "bandana", "MyMod:MyHead" },
    voiceFpk    = "/Assets/tpp/pack/mymod/voice_tiger.fpk",
    enableArm   = false,
    enableHead  = true,
  },
})
```

It does not create a new uniform cell or R&D row. The function returns
the resolved vanilla `partsType`, or `false`.

### Select the vanilla suit

Use:

```lua
outfit = "TIGERSTRIPE"
```

or a raw camo number from `0-116`.

A raw `partsType` may be used for head options only. Use `outfit` for
variants, because several fatigue camos share one parts type.

```lua
V_Player.ExtendVanillaOutfit({
  partsType = 3,

  snake = {
    headOptions = { "bandana", "MyMod:MyHead" },
  },
})
```

Head options follow the same rule. Named with `outfit`, they are offered
on that camo alone; given a raw `partsType`, they are offered on every
camo sharing it.

### Vanilla-outfit branch fields

These mirror the [optional branch fields](#optional-branch-fields) on
`RegisterOutfit`, with three differences: `headOptions` is scoped to the
named camo, `voiceFpk` covers the whole suit, and `enableArm` and
`enableHead` are only read when you set them.

| Field | Purpose |
|---|---|
| `variants` | Extra variation cells. Maximum 254. |
| `headOptions` | Heads added to the suit, scoped to the named camo. Maximum 120. |
| `voiceFpk` | Voice override for the entire suit and player type. |
| `enableArm` | `false` hides the bionic arm on this suit. Snake and Avatar only. |
| `enableHead` | `false` hides the character head on this suit. Snake and Avatar only. |

A branch-level voice override affects the base suit, native variants,
custom variants, and FOB.

`enableArm` and `enableHead` are only read when you set them, so suits
you do not touch are unchanged. They apply to `snake` and `avatar`
branches only; on `ddMale` and `ddFemale` they are ignored, and the
bionic arm is always off for those two. `enableArm` persists in FOB;
`enableHead` reverts to the vanilla head online. A suit may attach head
or hair geometry that this does not reach, so verify the result in game.

### Vanilla-outfit variant fields

These mirror the [variant fields](#variants) on `RegisterOutfit`, except
that `partsPath` and `fpkPath` are required here rather than inherited
from the base model.

| Field | Purpose |
|---|---|
| `partsPath`, `fpkPath` | Required variant model and package. |
| `camoFv2`, `camoFpk` | Variant camo assets. |
| `diamondFv2`, `diamondFpk` | Wet, mud, or emblem assets. |
| `voiceFpk` | Voice used by this variant. |
| `displayName` | Cycle-button label. |

Set `diamondFpk = false` to remove the vanilla overlay.

A variant voice overrides the branch voice while worn, but does not work
in FOB.

```lua
V_Player.ExtendVanillaOutfit({
  outfit = "TIGERSTRIPE",

  ddFemale = {
    variants = {
      {
        partsPath   = "/Assets/tpp/parts/chara/sna/sna4_plyf0_def_v00.parts",
        fpkPath     = "/Assets/tpp/pack/mymod/plparts_female_5.fpk",
        camoFv2     = "/Assets/tpp/fova/chara/mymod/camo_female_5.fv2",
        camoFpk     = "/Assets/tpp/pack/mymod/camo_female_5.fpk",
        diamondFv2  = "/Assets/tpp/fova/chara/mymod/emblem_female_5.fv2",
        diamondFpk  = "/Assets/tpp/pack/mymod/emblem_female_5.fpk",
        voiceFpk    = "/Assets/tpp/pack/mymod/voice_female_5.fpk",
        displayName = "name_wp_50052",
      },
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

    snake = {
      fv2 = "/Assets/tpp/fova/chara/mymod/ogrehorn.fv2",
      fpk = "/Assets/tpp/pack/mymod/ogrehorn.fpk",

      faceStages = {
        [1] = {
          fv2 = "/Assets/.../ogrehorn_normal.fv2",
          fpk = "/Assets/.../ogrehorn_normal.fpk",
        },
        [2] = {
          fv2 = "/Assets/.../ogrehorn_horn.fv2",
          fpk = "/Assets/.../ogrehorn_horn.fpk",
        },
        [3] = {
          fv2 = "/Assets/.../ogrehorn_demon.fv2",
          fpk = "/Assets/.../ogrehorn_demon.fpk",
        },
      },
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
      displayName = "staff_name_99_051",
      headOptions = { "MyMod:OgreHorn", "balaclava" },

      variants = {
        {
          partsPath   = "/Assets/tpp/parts/chara/mymod/ogre_alt.parts",
          fpkPath     = "/Assets/tpp/pack/mymod/ogre_alt.fpk",
          displayName = "staff_name_99_052",
          default     = true,
        },
      },
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
