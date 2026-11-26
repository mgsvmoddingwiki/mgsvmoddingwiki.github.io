---
title: Custom Outfits
permalink: /V_Framework/Custom_Outfits/
tags: [Lua, Reference, Guides, Infinite Heaven, Player, V Framework]
redirect_from:
    - /V_Framework_Custom_Outfits/
---

A custom outfit is a body model (`.parts`) and package (`.fpk`), with
optional camo, voice, face, head and variant assets.

Place all calls inside `this.LoadLibraries()`.

## Functions

| Function | Description |
|---|---|
| [`V_Player.RegisterOutfit`](#registeroutfit) | Create a new uniform. |
| [`V_Player.RegisterHeadOption`](#registerheadoption) | Create a new custom head. |
| [`V_Player.ExtendVanillaOutfit`](#extendvanillaoutfit) | Add variants or heads to an existing vanilla outfit. |
| [`V_TppMotherBaseManagement.AddToEquipDevelopTable`](#outfit-rd-row) | R&D name, icon, grade, cost and unlock state. |
| [`V_Player.GetOutfitInfo`](/V_Framework/Lua_API#custom-outfits) | Read back the IDs assigned to an outfit you registered. |
| [`V_Player.GetOutfits`](/V_Framework/Lua_API#custom-outfits) | List the registered outfits a player type can wear. |
| [`V_Player.GetHeadOptionSlot`](/V_Framework/Lua_API#custom-outfits) | The `vars.playerFaceEquipId` value to wear a custom head; assigns and keeps a [slot](#registerheadoption) if it has none. |

IDs are assigned automatically and saved under each registration `key`.

A custom outfit, extended variant or custom head option worn by the
player refuses FOB sorties and visits.

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
| `camoFpk`, `camoFv2` | No | Camo. `camoFpk` not installed: no camo. |
| `diamondFpk`, `diamondFv2` | No | Wet, mud or emblem overlay. `diamondFpk` not installed: neither is used. |
| [`voiceFpk`, `voiceType`](#outfit-voice) | No (vanilla) | Outfit voice. |
| `faceFpk`, `skinFv2` | No (vanilla) | Face and skin. |
| `iconFtexPath` | No (R&D icon) | Suit-list icon. |
| `displayName` | No (R&D name) | Outfit-cell label. |
| `enableArm` | No (`true`) | Keep Snake or Avatar's bionic arm. Always off on `ddMale` and `ddFemale`. |
| `enableHead` | No (`true`) | Keep the character head. |
| [`eyeFv2`, `eyeColor`](#iris-colour) | No | Iris colour on the outfit's body. |
| [`headOptions`](#head-options) | No | Selectable heads. Max 120. |
| [`colors`](#colours) | No | Colours for the Sortie Prep colour palette. |
| [`variants`](#variants) | No | Alternative looks you cycle through. Max 254. |
| [`camoBonusType`](#camo-bonus) | No | Use a vanilla camo's concealment. |
| [`camoBonusValues`](#camo-bonus) | No | Own concealment per material. |
| [`abilities`](#abilities) | No | Abilities while worn. |
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

### Iris colour

`eyeFv2` is an fv2 with an iris group (ID 110, one unit per iris),
packed with the outfit. DD staff then keep their own iris colour on the
outfit; `eyeColor = n` (`0-31`) shows unit `n` instead, for every
character, and `false` turns the iris off.

```lua
ddMale = {
  -- partsPath, fpkPath ...
  eyeFv2 = "/Assets/tpp/fova/chara/sna/sna4_plym0_def_v00.fv2",
},
```

`eyeFv2` may hold only the iris group, plus the skin group (ID 100) on
DD soldiers, who get their own skin tone. The body needs the `eye`
material of the DD player bodies.

### Colours

In Sortie Prep, press Triangle (Y) on the uniform to open the colour
palette. The picked colour's fv2 is applied over the outfit and saved
per outfit, character and channel. The second channel goes on top of the
first, so give the channels different materials. A variant's `colors`
replace the branch's.

```lua
colors = {
  primary = {
    { fv2 = "/Assets/tpp/fova/mymod/olive.fv2", icon = "/Assets/tpp/ui/texture/mymod/olive.ftex" },
  },
  secondary = { count = 12, fv2 = "/Assets/tpp/fova/mymod/trim_%02d.fv2" },
},
```

| Field | Required | Purpose |
|---|---|---|
| `primary`, `secondary` | At least one | Colour channels, one palette tab each. |
| `fv2` | Yes | Applied when picked. Must be in a loaded package: the outfit's, `camoFpk` or the colour's `fpk`. |
| `fpk` | No | Package with the fv2 and its textures, loaded as the camo package. Not installed: the colour isn't applied. |
| `icon` | No (empty swatch) | Swatch picture. |
| `count` | No | Builds `count` colours from fields with one `%d` (or `%02d`), numbered from 0. |

Read or pick colours from Lua: [outfit
colours](/V_Framework/Lua_API#outfit-colours).

### Variants

```lua
variants = {
  {
    key         = "MyMod:DesertTiger",
    partsPath   = "/Assets/tpp/parts/chara/mymod/body_alt.parts",
    fpkPath     = "/Assets/tpp/pack/mymod/body_alt.fpk",
    displayName = "staff_name_99_052",
    default     = true,
  },
},
```

| Field | Required | Purpose |
|---|---|---|
| `key` | No | R&D key of this look; make its cell with [`AddToEquipDevelopTable`](/V_Framework/Lua_API#addtoequipdeveloptable)`("<key>", {...})`. |
| `partsPath`, `fpkPath` | No (base model) | Variant model and package. |
| `camoFpk`, `camoFv2`, `diamondFpk`, `diamondFv2` | No | Variant camo and overlay. An `*Fpk` not installed: its pair is not used. |
| [`voiceFpk`, `voiceType`](#outfit-voice) | No (branch's) | Variant voice. |
| `displayName` | No | Variant label on the cycle button. |
| `iconFtexPath` | No (branch's) | Suit-list icon. |
| `default` | No (`false`) | `true` makes this the initial variant. |
| `enableArm`, `enableHead` | No (branch's) | Override the branch values. |
| [`eyeFv2`, `eyeColor`](#iris-colour) | No (branch's) | This variant's iris. |
| [`headOptions`](#head-options) | No (none) | This variant's heads. |
| [`colors`](#colours) | No (branch's) | This variant's colours. |
| [`camoBonusType`, `camoBonusValues`](#camo-bonus) | No (branch's) | This variant's concealment. |
| [`motionMtars`](#outfit-motion) | No (branch's) | Motion while this variant is worn. |

A keyed variant gets its own R&D cell; once developed it has its own
Sortie Prep and supply drop entry, and until then it is hidden there and
in Infinite Heaven's Appearance > Camo. Unkeyed variants stay on the
outfit's entry.

A `key` must be unique: the outfit's own key, a key already used by
another look, or a second key for the same look is ignored and logged.
If two bodies give one variant different keys, the first is used.

The worn variant is picked by `vars.playerCamoType`. To wear one from
script, set both vars to what
[`GetOutfitInfo`](/V_Framework/Lua_API#custom-outfits) returns for it
(variant `0` is the base look):

```lua
local partsType, camoType = V_Player.GetOutfitInfo("MyMod:MySuit", 1)
vars.playerPartsType = partsType
vars.playerCamoType  = camoType
```

Applies at once in a mission, on deploy in the ACC.

Looks are not limited by camo codes. Only a look that is worn, in a
loadout preset, remembered for a character or in a supply crate holds
one of the 132 custom camo codes; others get one when picked. With all
held, the picked look falls back to the base look (warning logged).
[`ExtendVanillaOutfit`](#extendvanillaoutfit) looks hold theirs from
registration.

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

> Use one or the other. On a branch with both, `camoBonusType` wins.
{:.important}

On a [variant](#variants), its `camoBonusValues` come first, then its
`camoBonusType`, then the branch's.

### Abilities

```lua
abilities = {
  quietMovement = true,
  defense       = 4,
  rattleSuit    = "snk",
},
```

| Field | Type (default) | Effect |
|---|---|---|
| `quietMovement` | boolean (`false`) | Move like Quiet. |
| `silentFootsteps` | boolean (`false`) | Footsteps one level quieter. |
| `sprintSpeed` | number (suit's own) | Sprint speed, `0.1-10`. Ninja suit `1.3`, Raiden suit `1.5`. |
| `raidenRun` | boolean (`false`) | Raiden's sprint animation. |
| `dashAttack` | boolean or `TppDamage.ATK_*` (`false`) | Sprinting into an enemy knocks them down (Ninja and Raiden suits); an `ATK_` ID uses that attack. |
| `sprintSound` | boolean (`false`) | The Ninja and Raiden sprint sound. |
| `sprintSpark` | string (none) | `.vfx` at each sprinting footstep, packed with the outfit. Raiden's: `/Assets/tpp/effect/vfx_data/chara/fx_tpp_chrfotspk01_s5.vfx`. |
| `defense` | number `0-9` (`0`, off) | Damage reduction. |
| `lifeRecovery` | number `0-9` (`0`, off) | Health regeneration rate. |
| `rattleSuit` | string or number (`"nom"`) | Cloth-rustle sound and Snake's footstep sound class: `"nom"`, `"bony"`, `"snk"`, `"amr"`. `"bony"` changes only the rustle; footsteps stay vanilla. |
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
| `Liquid` | `eli` | `0x2192FF2F` |

`voiceType = "eli"`, on any branch or via
`V_Player.SetPlayerVoiceTypeForType(playerType, "eli")`, loads Eli's
voice pack itself; no `voiceFpk` needed.

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

`equipDevelopGroupID`: [outfit develop
groups](/V_Framework/Lua_API#outfit-develop-groups). Other fields:
[`AddToEquipDevelopTable`](/V_Framework/Lua_API#addtoequipdeveloptable).

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

Returns `equipId`, or `0`.

No registration limit; up to 250 heads worn or shown at once, each
taking a free slot when previewed or worn.
[`GetHeadOptions()`](/V_Framework/Lua_API#custom-outfits) lists every
head; `slot` `0` means it holds none now.

### Head fields

| Field | Required | Purpose |
|---|---|---|
| `key` | Yes | Registration key, shared with its [R&D row](#head-rd-row). Max 63 characters; no line break, double quote or backslash. |
| `snake`, `avatar`, `ddMale`, `ddFemale` | At least one | Per-character [branches](#branches). |
| `showInDevelopMenu` | No (`false`) | `true` lists the head in R&D. |
| [`abilities`](#head-abilities) | No | Abilities while the head is worn. |
| `saluteRection` | No | Soldier voice line, such as `"salute0070"`, said once per Mother Base visit by saluting staff instead of the welcome-back greetings. |

### Branches

| Field | Branch | Required | Purpose |
|---|---|---|---|
| `fv2`, `fpk` | `snake`, `avatar` | Without a [hat](#hat-style-heads) | Head model. |
| `TppEnemyFaceId` | `ddMale`, `ddFemale` | No (balaclava) | Soldier face worn as the head. |
| `fv2`, `fpk` | `ddMale`, `ddFemale` | No | Own head model. Wins over `TppEnemyFaceId`. |
| [`hatFpk`](#hat-style-heads) | `snake`, `avatar` | For a hat | `.fpk` with the hat model. |
| [`hatFv2`](#hat-style-heads) | `snake`, `avatar` | For a hat | `.fv2` that attaches the hat to the player. |
| [`hideHair`](#hat-style-heads) | `snake`, `avatar` | No (`false`) | Hides the player's hair while the hat is worn. |
| [`colors`](#colours) | any | No | Head colours (Triangle (Y) in the HEAD OPTION list). Needs the branch's `fv2` and `fpk` (their fv2s and textures go in that `fpk`) or a [hat](#hat-style-heads). |

```lua
ddMale = {
  TppEnemyFaceId = TppEnemyFaceId.svs_balaclava,
},

ddFemale = {
  fv2 = "/Assets/tpp/fova/chara/mymod/head_ddf.fv2",
  fpk = "/Assets/tpp/pack/mymod/head_ddf.fpk",
},
```

### Hat-style heads

A `snake` or `avatar` branch with both `hatFpk` and `hatFv2` is worn
like the Chicken Hat, over Snake's face, which keeps the horn, blood and
[face stages](#face-stages-snake-only). The vanilla Chicken Hat and Lil'
Chick cap do not show while it is worn.

```lua
snake = {
  hatFpk   = "/Assets/.../hat01.fpk",
  hatFv2   = "/Assets/.../hat01.fv2",
  hideHair = true,
},
```

  - The hat's meshes must be visible by default in the fmdl.
  - The branch's `fv2` and `fpk` still replace the face alongside a hat;
    without them the vanilla face stays.
  - [`colors`](#colours) colour the hat; their fv2s and textures go in
    `hatFpk`.

### Head motion

A branch can animate the head and attach effects; play them with
[`PlayHeadMotion`, `PlayHeadEffect` and
`PlayHeadSound`](/V_Framework/Lua_API#custom-outfits).

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
| `mtar` | With `clips` | Head animation archive, packed in the head's `fpk`. |
| `clips` | With `mtar` | Clips by name; each takes a [clip](/V_Framework/Custom_Weapons#clip-fields) form. |
| `effects` | No | Effects by name. |
| `rest` | No | Clip whose effects run while no other clip plays. |

Each effect:

| Field | Required | Purpose |
|---|---|---|
| `vfx` | Yes | Effect file. |
| `point` | No | Connect point to attach to. |
| `clip` | No | Starts with this clip. |

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
| `stealthAssist` | boolean (`false`) | The Chicken Hat effect. |
| `chickCap` | boolean (`false`) | The Lil' Chick effect. |

`stealthAssist` and `chickCap` are checked at mission start and mark the
run as the vanilla hats do. Their models never show, and HEAD OPTION
gets no CHICKEN HAT or CHICK row.

> Neither applies in the helicopter, in Extreme, Subsistence or Total
> Stealth missions, or in missions 10010, 10240 and 10280.
{:.note}

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
`faceFovaPath` / `faceFovaFpkPath`, `faceDecoFovaPath` /
`faceDecoFovaFpkPath`, `hairFovaPath` / `hairFovaFpkPath` and
`hairDecoFovaPath` / `hairDecoFovaFpkPath`. A path is read only when its
layer's toggle is `true`; an empty string does nothing.

```lua
V_Player.RegisterHeadOption({
  key = "MyMod:CapWithPixieHair",

  ddFemale = {
    fv2 = "/Assets/tpp/fova/chara/mymod/cap_ddf.fv2",
    fpk = "/Assets/tpp/pack/mymod/cap_ddf.fpk",

    enableHairFova      = true,
    enableHairDecoFova  = true,
    hairFovaPath        = "/Assets/tpp/fova/common_source/chara/cm_head/hair/cm_hair_c101.fv2",
    hairFovaFpkPath     = "/Assets/tpp/pack/fova/common_source/chara/cm_head/hair/cm_hair_c101.fpk",
    hairDecoFovaPath    = "/Assets/tpp/fova/common_source/chara/cm_head/hair_deco/cm_hair_c101_c000.fv2",
    hairDecoFovaFpkPath = "/Assets/tpp/pack/fova/common_source/chara/cm_head/hair_deco/cm_hair_c101_c000.fpk",
  },
})
```

### Face stages (Snake only)

Optional. `faceStages` gives a Snake head its own face per Demon Point
stage. Missing stages use the branch's `fv2` and `fpk`.

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

Adds to a vanilla suit; no new suit cell or R&D row, except for a
variant with a [`key`](#variants).

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

Returns the vanilla `partsType`, or `false`.

### Select the vanilla suit

| Field | Required | Purpose |
|---|---|---|
| `outfit` | One of these two | Vanilla camo name, such as `"TIGERSTRIPE"`, or a number `0-116`. |
| `partsType` | One of these two | Raw parts type. `variants` do not work with it. |

### Vanilla-outfit branch fields

Only fields you set change the suit, and only on the named camo; with
`partsType`, on every camo of that parts type.

| Field | Required | Purpose |
|---|---|---|
| `variants` | No | Extra looks. A vanilla suit holds 29 at most, shared by all its camos; the log names looks that did not fit. |
| `headOptions` | No | Heads added to the suit. Max 120. |
| [`voiceFpk`, `voiceType`](#outfit-voice) | No (vanilla voice) | Voice for the suit on this player type. In FOB, your own character only. |
| [`enableArm`](#removing-the-bionic-arm) | No (the suit's own arm) | Bionic arm on Snake and Avatar, including FOB. |
| `enableHead` | No (`true`) | `false` hides the head (face and hair on DD); the vanilla head shows in FOB. A head built into the suit stays. |
| [`abilities`](#abilities) | No | Suit abilities for this branch. |

### Removing the bionic arm

`enableArm = false` hides the arm, removes Bionic Arm from the weapon
wheel and prevents supply drops from swapping it.

```lua
V_Player.ExtendVanillaOutfit({
  outfit = "TIGERSTRIPE",
  snake  = { enableArm = false },
  avatar = { enableArm = false },
})
```

### Vanilla-outfit variant fields

Each variant takes `key`, `displayName`, [`abilities`](#abilities) and
the fields below; the other [variant fields](#variants) are not read.

| Field | Required | Purpose |
|---|---|---|
| `partsPath`, `fpkPath` | Yes | Variant model and package. `fpkPath` not installed: the vanilla suit is used. |
| `camoFpk`, `camoFv2` | No (vanilla camo) | Variant camo. `camoFpk` not installed: the vanilla camo is used. |
| `diamondFpk`, `diamondFv2` | No (vanilla overlay) | Wet, mud or emblem overlay; `false` removes it. `diamondFpk` not installed: the vanilla overlay is used. |
| `voiceFpk`, `voiceType` | No (branch voice) | The variant's voice never plays in FOB; the branch voice does. |

A variant shows only on the body it is declared for: Snake, Avatar and
DD male share one, DD female has her own, and Ocelot and Quiet never
show them.

  - Looks from several mods or calls on one vanilla camo add up.
  - `variants[i]` of every body in one call is one look; separate calls
    give separate looks unless the variants share a `key`.
  - A look registered again (same `key`, or without one the same
    `partsPath`, `fpkPath`, `camoFpk` and `camoFv2` on every body) keeps
    its cell.
  - Each look keeps its own camo code in saves, so adding or removing
    mods does not change which look a save wears.

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
  - [V Framework Lua API](/V_Framework/Lua_API)
  - [V Framework Custom Weapons](/V_Framework/Custom_Weapons)
  - [V Framework Buddy Outfits](/V_Framework/Buddy_Outfits)
