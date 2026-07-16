---
title: V Framework Custom Outfits
permalink: /V_Framework_Custom_Outfits/
tags: [Lua, Reference, Infinite Heaven, Outfits]
---

A custom outfit is a body model (`.parts`) and package (`.fpk`), with optional
camo, voice, face, head, and variant assets.

Place all calls inside `this.LoadLibraries()`.

## Functions

| Function | Use |
|---|---|
| `V_Player.RegisterOutfit` | Create a new uniform. |
| `V_Player.RegisterHeadOption` | Create a new custom head. |
| `V_Player.ExtendVanillaOutfit` | Add variants or heads to an existing vanilla outfit. |

IDs are allocated automatically and saved under each registration `key`.

Most `*Fpk` and `*Fv2` fields accept a path, `true` for vanilla, or `false` to
disable the asset.

> `RegisterOutfit` needs an `AddToEquipDevelopTable` row with the same key.
> `ExtendVanillaOutfit` uses the vanilla outfit's existing row.<br>
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

Use at least one player branch:

```text
snake, avatar, ddMale, ddFemale
```

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
| `faceFpk`, `skinFv2` | Branch-level face and skin assets. |
| `enableArm` | Keep Snake or Avatar's bionic arm. Default: `true`. |
| `enableHead` | Keep the character head. Default: `true`. |
| `displayName` / `displayNameHash` | Outfit-cell label. |
| `camoBonusType` | Vanilla camo profile name or number `0-116`. |
| `camoBonusValues` | Per-material camo values. |
| `headOptions` | Available heads. Maximum 8. |
| `variants` | Additional outfit variations. Maximum 14. (With base one + 1 = 15) |

```lua
V_Player.RegisterOutfit({
  key = "MyMod:MySuit",

  ddFemale = {
    partsPath   = "/Assets/tpp/parts/chara/mymod/body.parts",
    fpkPath     = "/Assets/tpp/pack/mymod/body.fpk",
    camoFv2     = "/Assets/tpp/fova/chara/mymod/camo.fv2",
    camoFpk     = "/Assets/tpp/pack/mymod/camo.fpk",
    displayName = "staff_name_99_051",
    headOptions = { "balaclava", "MyMod:MyHead" },
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
---

## Outfit variants

```lua
variants = {
  {
    partsPath   = "/Assets/.../body_alt.parts",
    fpkPath     = "/Assets/.../body_alt.fpk",
    displayName = "staff_name_99_052",
    default     = true,
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
| `displayName` / `displayNameHash` | Variant label. |
| `default` | Make this the initial variation. |
| `enableArm`, `enableHead` | Override the branch toggles. |
| `headOptions` | This variant's own head list. |

Only the model paths and body toggles inherit from the base branch. Other variant
assets use their own defaults.

An omitted `headOptions` list means the variant has no selectable heads.

---

## Outfit R&D row

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
[Mother Base Management](/V_Framework_Lua_API/#mother-base-management)
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

### Player types

For `snake` and `avatar`, use:

```lua
fv2 = "/Assets/.../head.fv2"
fpk = "/Assets/.../head.fpk"
```

For `ddMale` and `ddFemale`, use a soldier face ID:

```lua
TppEnemyFaceId = TppEnemyFaceId.svs_balaclava
```

`TppEnemyFaceId` does not apply to Snake or Avatar. Custom `fv2` and `fpk` paths do
not apply to DD soldiers.

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

Head paths are not extension-validated. Invalid paths fail during loading.

---

## Snake demon stages

Without stage overrides, a custom Snake head uses the same face at every Demon
Point stage.

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

`faceStages` is Snake-only. The engine handles bandana-fit faces automatically.
Gold and Silver suits keep their vanilla hardcoded faces.

---

## Head name and icon

The head's displayed name and icon come from a Develop row with the same key:

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
  },
})
```

It does not create a new uniform cell or R&D row. The function returns the resolved
vanilla `partsType`, or `false`.

### Select the vanilla suit

Use:

```lua
outfit = "TIGERSTRIPE"
```

or a raw camo number from `0-116`.

A raw `partsType` may be used for head options only. Use `outfit` for variants,
because several fatigue camos share one parts type.

### Branch fields

| Field | Purpose |
|---|---|
| `variants` | Extra variation cells. Maximum 14. |
| `headOptions` | Heads added to the suit. Maximum 8. |
| `voiceFpk` | Voice override for the entire suit and player type. |

A branch-level voice override affects the base suit, native variants, custom
variants, and FOB.

### Vanilla-outfit variant fields

| Field | Purpose |
|---|---|
| `partsPath`, `fpkPath` | Required variant model and package. |
| `camoFv2`, `camoFpk` | Variant camo assets. |
| `diamondFv2`, `diamondFpk` | Wet, mud, or emblem assets. |
| `voiceFpk` | Voice used by this variant. |
| `displayName` / `displayNameHash` | Cycle-button label. |

Set `diamondFpk = false` to remove the vanilla overlay.

A variant voice overrides the branch voice while worn, but does not work in FOB.

```lua
V_Player.ExtendVanillaOutfit({
  outfit = "TIGERSTRIPE",

  ddFemale = {
    variants = {
      {
        partsPath   = "/Assets/tpp/parts/chara/sna/sna4_plyf0_def_v00.parts",
        fpkPath     = "/Assets/tpp/pack/mymod/plparts_female_5.fpk",
        displayName = "name_wp_50052",
      },
      {
        partsPath   = "/Assets/tpp/parts/chara/sna/sna4_plyf0_def_v00.parts",
        fpkPath     = "/Assets/tpp/pack/mymod/plparts_female_6.fpk",
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