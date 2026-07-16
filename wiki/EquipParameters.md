---
title: EquipParameters
permalink: /EquipParameters/
tags: [EXE, Research, Weapons]
---

This page documents the weapon parameter tables inside [EquipParameters.lua](https://github.com/kapuragu/InfiniteHeaven/blob/master/tpp/data1_dat-lua/Assets/tpp/level_asset/weapon/ParameterTables/parts/EquipParameters.lua). When the game equips a weapon
it resolves the equip ID to a weapon ID, reads that weapon's part IDs, follows
each part ID into its parameter buffer, and folds everything into a single
`GunInfo` struct that gameplay reads from. All stats a weapon has - fire rate,
spread, damage, range, ammo, sounds - live in these tables.

All addresses on this page are for **EN 1.0.15.4** (`tpp_steam_mst_en_day3800`).

## The pipeline

```text
equipId
  -> weaponId            (equip table object, vtable call)
  -> gunBasic row        (11 part ids + grade)
  -> part rows           (receiver, barrel, magazine, bullet, ...)
  -> pool rows           (receiver base/wobbling/system/sound, falloff curves)
  -> GunInfo             (0x90-byte struct gameplay reads)
```

The assembly happens in
`tpp::gm::impl::equip::EquipSystemImpl::SetUpGunInfoFromGunPartsDesc`
(`0x140DC3850`). Its input is a **GunPartsDesc**: 11 bytes, one part ID per
byte, in exactly the same order as a gunBasic row (see below). For a normal
weapon the desc is copied from the gunBasic table; for the six custom-weapon
slots it comes from `ChimeraPartsSetWork` instead.

The tables are (re)built from the game's Lua parameter files by
`ReloadEquipParameterTables2` (`0x140A41AE0`).

## The buffer directory

`0x142A711F0` holds the parameter-tables instance. It is a directory of
pointers - each offset below holds a pointer to one buffer.

Two indexing conventions apply. **Part buffers are 1-based**: row for id N sits
at `base + (N - 1) * stride`, and id 0 means "no part". **Pool buffers are
0-based**: row for index N sits at `base + N * stride`.

| Offset | Buffer | Row stride | Vanilla rows | Indexed by |
|---|---|---:|---:|---|
| +0x08 | gunBasic | 12 | 514 | weaponId (1-based) |
| +0x10 | receiver | 6 | 233 | receiverId (1-based) |
| +0x18 | barrel | 2 | 114 | barrelId (1-based) |
| +0x20 | magazine | 8 | 191 | ammoId (1-based) |
| +0x28 | muzzle option | 3 | 39 | muzzleOptionId (1-based) |
| +0x30 | option (laser/light) | 1 | 9 | optionId (1-based) |
| +0x38 | sight | 5 | 24 | scopeId (1-based) |
| +0x40 | stock | 2 | 42 | stockId (1-based) |
| +0x48 | underbarrel | 3 | 22 | underBarrelId (1-based) |
| +0x50 | bullet | 14 | 112 | bulletId (1-based) |
| +0x58 | receiverParamSetsBase pool | 12 | 96 | pool index (0-based) |
| +0x60 | receiverParamSetsWobbling pool | 14 | 127 | pool index (0-based) |
| +0x68 | receiverParamSetsSystem pool | 3 | 66 | pool index (0-based) |
| +0x70 | receiverParamSetsSound pool | 8 | 40 | pool index (0-based) |
| +0x78 | barrelParamSetsBase pool | 7 | - | pool index (0-based) |
| +0x80 | bulletParamSetsBase pool (falloff) | 22 | - | pool index (0-based) |

The gunBasic buffer is a static block at `0x142C25C50`.

## equipId to weaponId

Weapon equip IDs do **not** carry their weapon ID in the equip-ID table's type
words. The mapping lives in a separate equip table object reached through the
quark system table:

```text
obj = *( *( *(GetQuarkSystemTable() + 0x98) + 0x1E8 ) + 8 )
type     = obj->vtbl[0](obj, equipId)     // 1..8 = gun categories
weaponId = obj->vtbl[2](obj, equipId)     // vtbl offset 0x10
```

`GetQuarkSystemTable` = `0x140BFF050`. A reference consumer of this exact
chain is `EquipParameterTablesImpl::GetAttackIdByEquipId` (`0x140A3BCD0`),
which resolves `equipId -> weaponId -> receiver -> attackId`.

Weapon IDs are effectively capped at **0x3FF** because the equip-ID table
packs them into a 10-bit field (see below).

## gunBasic row (stride 12)

One row per weaponId. Each part ID is a single byte, which is why every part
ID space is capped at 255.

| Byte | Part |
|---:|---|
| 0 | receiverId |
| 1 | barrelId |
| 2 | ammoId (magazine) |
| 3 | stockId |
| 4 | muzzleId (barrel-muzzle model) |
| 5 | muzzleOptionId (suppressor/compensator) |
| 6 | scope1Id |
| 7 | scope2Id |
| 8 | laserFlash1Id |
| 9 | laserFlash2Id |
| 10 | underBarrelId |
| 11 | weaponGrade (1-15) |

The 11-byte **GunPartsDesc** used at realize time is bytes 0-10 of this row.

## Receiver row (stride 6)

The receiver is the weapon's core: it selects the attack (damage row) and
points at four pool rows that carry the actual numbers.

| Offset | Size | Field |
|---:|---:|---|
| +0 | u16 | attackId (damage table row) |
| +2 | u8 | receiverParamSetsBase pool index |
| +3 | u8 | receiverParamSetsWobbling pool index |
| +4 | u8 | receiverParamSetsSystem pool index |
| +5 | u8 | receiverParamSetsSound pool index |

A separate byte table (`0x142349A90`, one byte per receiverId, read through
`0x140DB6CB0`) selects the receiver's **motion/animation family** - which set
of handling animations (draw, reload, idle pose) the weapon plays.

### receiverParamSetsBase pool row (stride 12)

| Offset | Size | Field | Stored as |
|---:|---:|---|---|
| +0x0 | u16 | fireRate | value x 10 |
| +0x2 | u8 | aimAssistDist | meters |
| +0x3 | u8 | gunAimAdjust | value x 200 |
| +0x4 | u8 | effectiveRange | meters (runtime falloff anchor) |
| +0x5 | u8 | effectiveRangeUI | meters (menu stat bar only) |
| +0x6 | u16 | adsZoom | value x 1000 |
| +0x8 | u16 | adsFov | value x 100 |
| +0xA | u8 | reloadSpeed | multiplier x 100 |

### receiverParamSetsWobbling pool row (stride 14)

Seven consecutive u16 values, each stored as value x 1000:

| # | Field |
|---:|---|
| 0 | spreadPerShot |
| 1 | unk2 |
| 2 | spreadRecovery |
| 3 | spreadMin |
| 4 | spreadMax |
| 5 | shotKick |
| 6 | shotKick2 |

### receiverParamSetsSystem pool row (stride 3)

Bit-packed:

| Byte | Bits | Field |
|---:|---|---|
| 0 | 0-4 | eqpType (weapon family, 1-8) |
| 0 | 5 | showMagazineMesh |
| 0 | 6 | plusOneChamber |
| 0 | 7 | missileMeshVariant |
| 1 | 0-4 | reticleUiId |
| 1 | 5-7 | triggerId (cock / semi / burst / full-auto) |
| 2 | 0 | modelDedupExclude |
| 2 | 1 | flag5 |
| 2 | 2 | sightMountMesh |
| 2 | 3 | railMountMesh |
| 2 | 4 | railMountMesh2 |
| 2 | 5 | altMagazineSocket |

`plusOneChamber` is the only flag here with a gameplay effect: during GunInfo
assembly it adds +1 to the magazine capacity. The rest drive model meshes,
HUD reticle choice and trigger behavior. `eqpType` also picks the fire-sound
template (below).

### receiverParamSetsSound pool row (stride 8)

An inline `char[8]` string: the weapon's **fire-sound name root**, up to 7
characters plus a terminator (`"ar01"`, `"hg00"`, ...). Not a hash - the raw
text lives in the row.

## Fire-sound name construction

`DefineWeaponFireSound` (`0x140DC03A0`) wraps the root into full Wwise event
names at weapon-init time:

```text
sfx_w_p_<root>[_m][_sup]_(active|nonact)    player-fired
sfx_w_e_<root>[_m][_sup]_(active|nonact)    NPC-fired
```

Whether the `_m` segment is inserted - and whether a sound is produced at
all - follows the receiver's `eqpType`:

| eqpType | Template |
|---|---|
| 1, 3, 4, 5, 6, 7 | `sfx_w_p_<root>_m_active` (with `_m`) |
| 2, 8 | `sfx_w_p_<root>_active` (no `_m`) |

The finished names are hashed through the sound system's own hasher and the
32-bit hashes are stored into the weapon work slots, so anything resolvable
by the loaded soundbanks can be produced by pointing the root (and family)
at it.

## Barrel row (stride 2)

| Byte | Bits | Field |
|---:|---|---|
| 0 | 0-3 | barrelLength (BarrelLengthType) |
| 0 | 4 | hasUnderMount |
| 0 | 5 | hasScopeMount |
| 0 | 6 | unk |
| 0 | 7 | hasSideMount |
| 1 | all | barrelParamSetsBase pool index |

### barrelParamSetsBase pool row (stride 7)

Seven u8 multipliers, each stored as value x 100 (100 = 1.0 = neutral):

| # | Field |
|---:|---|
| 0 | fireRate |
| 1 | unk2 (no consumer found - dead) |
| 2 | gunAimAdjust |
| 3 | range (aim assist) |
| 4 | rangeUI (menu stat bar) |
| 5 | spreadMax |
| 6 | percentOverride |

## Magazine row (stride 8)

A magazine's parameter set is `ammoId, equipAmmoId, capacity, totalCarry,
bulletId` - but `ammoId` is the **row index**, not a stored field. The row
holds the remaining four:

| Offset | Size | Field |
|---:|---:|---|
| +0 | u16 | equipAmmoId (the ammo equip used for resupply) |
| +2 | u16 | capacity (clamped to 10 bits) |
| +4 | u16 | totalCarry (0x3FFF acts as the unlimited sentinel) |
| +6 | u8 | bulletId |
| +7 | u8 | padding |

The same convention holds for every part buffer on this page: the part's own
id (receiverId, barrelId, stockId, ...) selects the row and is never stored
inside it.

## Bullet row (stride 14)

| Offset | Size | Field |
|---:|---:|---|
| +0x0 | u16 | bulletSpeed (m/s, player-fired) |
| +0x2 | u16 | npcBulletSpeed (m/s, NPC-fired) |
| +0x4 | u16 | dropRate (player bullet drop; NPC rounds fly flat) |
| +0x6 | u8 | bulletParamSetsBase index (Player) |
| +0x7 | u8 | bulletParamSetsBase index (NPC) |
| +0x8 | u8 | trail-effect index |
| +0x9 | u8 | unk |
| +0xA | u8 | bulletType (normal / spread / blast / shell / water / airshock) |
| +0xB | u8 | ricochetSize |
| +0xC | u8 | blastId |
| +0xD | u8 | bit 0 = lethal flag, bits 1-5 = eqpType |

Both falloff indices matter: the player curve drives the player's damage
model, the NPC curve drives soldiers firing the same weapon. NPC ballistics
ignore `dropRate` entirely - NPC rounds have zero drop.

`bulletType` spread (buckshot) is engine-handled: the fire routine spawns a
hardcoded 8 pellets in a 2-degree cone for that type.

### bulletParamSetsBase (falloff) pool row (stride 22)

Three damage channels, each "full strength until near, fades to far, then a
residual floor", plus penetration:

| Offset | Size | Field | Stored as |
|---:|---:|---|---|
| +0x00 | u16 | tranqNear | meters x 10 |
| +0x02 | u16 | tranqFar | meters x 10 |
| +0x04 | u16 | tranqResidual | fraction x 100 |
| +0x06 | u16 | damageNear | meters x 10 |
| +0x08 | u16 | damageFar | meters x 10 |
| +0x0A | u16 | damageResidual | fraction x 100 |
| +0x0C | u16 | impactNear | meters x 10 |
| +0x0E | u16 | impactFar | meters x 10 |
| +0x10 | u16 | impactResidual | fraction x 100 |
| +0x12 | u8 | penetrateLevel near | MINIMUM < TRANQ < HANDGUN < RIFLE < SNIPER < AMRIFLE |
| +0x13 | u8 | penetrateLevel far | |
| +0x14 | u16 | penSwitchDistance | meters x 10 |

## Stock row (stride 2)

| Byte | Field | Stored as |
|---:|---|---|
| 0 | spreadRecovery multiplier | value x 100 |
| 1 | movementSway multiplier | value x 100 |

## Muzzle option row (stride 3)

| Byte | Field |
|---:|---|
| 0 | grouping multiplier (value x 100) |
| 1 | durability in shots (255 = infinite) |
| 2 | bit 0 = suppressor (0 = brake/compensator) |

The HUD suppressor gauge derives its segment count from durability:
255 = 4 segments (infinite), under 16 = 1, up to 30 = 2, above = 3.

## Sight row (stride 5)

| Byte | Field |
|---:|---|
| 0 | zoom1 |
| 1 | zoom2 |
| 2 | zoom3 |
| 3 | scopeUiId |
| 4 | flags: bit 0 booster, bit 1 nvg, bit 2 builtIn, bit 3 rangeFinder, bit 4 rangeFinderBulletDrop |

## Option row (stride 1)

| Bit | Field |
|---:|---|
| 0 | isLight (flashlight) |
| 1 | isLaser |

## Underbarrel row (stride 3)

An underbarrel is a sub-weapon: it borrows a receiver for firing behavior and
a magazine for ammunition. During GunInfo assembly the underbarrel's receiver
and pools are re-read into a secondary block of the same GunInfo.

| Byte | Field |
|---:|---|
| 0 | receiverId |
| 1 | ammoId (magazine) |
| 2 | weaponGrade |

## Custom-weapon slots (Chimera)

The six saveable custom-weapon builds occupy fixed equip IDs `0x367-0x36C`.
Their parts do not come from gunBasic - each slot stores its own GunPartsDesc
in the `ChimeraPartsSetWork` block at `0x142C934A0` (returned by
`tpp::gm::GetChimeraPartsSetWork`, `0x141E03790`):

| Offset | Contents |
|---|---|
| +0x00 | u16 x 6: the base equipId each custom build was created from |
| +0x12 + slot * 0xE | 14 bytes per slot: the 11-byte parts desc + 3 extra bytes |

Weapon-init and `GetAttackIdByEquipId` both special-case this equip ID range
and read the desc from here instead of resolving a weaponId.

## Damage parameter table

Damage rows live in a separate table, keyed by **attackId** (the u16 in the
receiver row). Instance pointer at `0x142BDCFF0`; the row array starts at
instance + 8. Rows are **0-based**: row for attackId N at
`base + N * 0x1A`. 489 rows. Rebuilt by `ReloadDamageParameter`
(`0x1405CE160`), read through `GetDamageParameter` (`0x1405C9E30`).

Row layout (stride 0x1A):

| Offset | Size | Field |
|---:|---:|---|
| +0x00 | u16 | lethalDamage |
| +0x02 | u16 | staminaDamage |
| +0x04 | u16 | impactForce |
| +0x06 | u16 | lethalDamageUI (menu stat bar) |
| +0x08 | u16 | unk3 |
| +0x0A | u16 | unk4 |
| +0x0C | u16 | unk5 |
| +0x0E | u16 | unk6 |
| +0x10 | u16 | unk7 |
| +0x12 | u16 | unk8 |
| +0x14 | u16 | flags (see below) |
| +0x16 | u8 | damageSource |
| +0x17 | u8 | bits 0-3 injureType, bits 4-7 injurePart |
| +0x18 | u8 | unk11 |
| +0x19 | u8 | unk12 |

Flag bits at +0x14:

| Bit | Flag |
|---:|---|
| 0 | hitNPC |
| 1 | isSniper |
| 2 | isShotgun |
| 3 | isTranq |
| 4 | isStun |
| 5 | isExplosive |
| 6 | isMelee |
| 7 | isBlade |
| 8 | isFire |
| 9 | isWater |
| 10 | isElectric |
| 11 | isParasite |
| 12 | isGas |
| 13 | isVehicleHit |
| 14 | unk |
| 15 | isPenetrating |

## Equip-ID table (model and package)

Separate from the parameter tables: every equipId maps to its model and
package through a compressed-index table. The equipId is first compressed to
a slot index (649 slots), then:

- **Info list** (`0x142C20FD0`, stride 0x18): +0x00 u64 `.parts` path hash,
  +0x08 u64 `.fpk` path hash, +0x10 block byte.
- **Type words** (`0x142A70928`, u16 per slot): `(equipType & 0x3F) |
  (subId << 6)`. The 10-bit subId field is what caps weapon IDs at 0x3FF.
  For gun equips the subId here is not used for parameter resolution - the
  equip table object above is authoritative.

## Address summary (EN 1.0.15.4)

| Address | What |
|---|---|
| 0x142A711F0 | parameter-tables buffer directory |
| 0x142C25C50 | gunBasic buffer (514 rows) |
| 0x142BDCFF0 | damage table instance pointer |
| 0x142C934A0 | ChimeraPartsSetWork (custom-weapon descs) |
| 0x142C20FD0 | equip-ID info list |
| 0x142A70928 | equip-ID type words |
| 0x142349A90 | receiver motion-type table |
| 0x140DC3850 | SetUpGunInfoFromGunPartsDesc |
| 0x140DC03A0 | DefineWeaponFireSound |
| 0x140A3BCD0 | GetAttackIdByEquipId |
| 0x140A41AE0 | ReloadEquipParameterTables2 |
| 0x1405CE160 | ReloadDamageParameter |
| 0x1405C9E30 | GetDamageParameter |
| 0x140DB6CB0 | GetReceiverType (motion family) |
| 0x141E03790 | GetChimeraPartsSetWork |
| 0x140BFF050 | GetQuarkSystemTable |
