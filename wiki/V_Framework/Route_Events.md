---
title: Route Events
permalink: /V_Framework/Route_Events/
tags: [Reference, Guides, Infinite Heaven, Routes, V Framework]
---

Soldier route events and act values added by V Framework or restored
from Ground Zeroes (GZ). Set them with RouteSetTool; no Lua is needed.

## Node events

### SquatIdle / SquatIdleAct

| Field | Required | Purpose |
|---|---|---|
| `Param6` | No (`0`, `SquatActNormal`) | The squat [act](#acts). |

### RelaxedIdleAct / CautionIdleAct

`Param6` accepts `StandActBinocular` from the [act table](#acts).

### AttackFireAAG

The soldier mans the nearest free, unbroken anti-air gun
(`GIMMICK_TYPE.ANTIAIR`) within 10 m of the node and fires at targets
within 150 m of the gun (tracks beyond). He stays, past the wait time,
until his route or phase changes, the gun is destroyed or another
soldier takes it. No aim target: the support heli, else the player. Aim
target not spawned: holds fire.

| Field | Required | Purpose |
|---|---|---|
| `Param6` | No (`0`, about 400 rpm) | Fire rate in rounds per minute. |
| `Param7` | No (`0`, 2.5-3 s) | Burst length in 1/100 s. |
| `Param8` | No (`0`, no pause) | Pause between bursts in 1/100 s. |
| `Param9` | No (`0`, 45) | Turn speed in degrees per second. |

---

## Acts

| Act | StrCode32 (decimal) | Node event | Description |
|---|---|---|---|
| `SquatActNormal` | `2961615098` | `SquatIdle` / `SquatIdleAct` | TPP's relaxed squat, without the gun butt hitting the ground in its loop. |
| `SquatActRifle` | `2732276527` | `SquatIdle` / `SquatIdleAct` | GZ's relaxed squat, only when the gun in his hand has a long barrel (`TppEquip.BARREL_LENGTH_LONG`). With a short or middle barrel, TPP's squat, as `SquatActNormal`. |
| `SquatActBinocular` | `1627885257` | `SquatIdle` / `SquatIdleAct` | Binocular scan, squatting. |
| `StandActBinocular` | `2290079834` | `RelaxedIdleAct` / `CautionIdleAct` | Binocular scan, standing. |

### Binocular acts

Every phase. Scans for the node's wait time, seeing up to 200 m in a
narrow cone ahead. An aim target turns him up to 70 degrees off his
arrival facing.

---

## Edge events

### CautionSquatWalk

Crouched walk, weapon ready, every phase; aims at the aim target if set.
At the next node a standing idle stands him up;
[SquatIdleAct](#squatidle--squatidleact) keeps him crouched.

### Restored GZ edge events

GZ routes work unchanged. New routes may use either name.

| GZ event | TPP equivalent | Behaviour |
|---|---|---|
| `CautionStandWalkAim` | `CautionWalkAim` | Walks aiming, at the aim target if it has one. |
| `CautionStandRunAim` | `CautionWalkAim` | An aiming walk, not a run, as in GZ. |
| `RouteMoveRun` | `RelaxedRun` | Runs; weapon ready in caution and above. |
| `StandDash` | `CautionDash` | Dashes. |
| `NormalStandWalk` | `RelaxedWalk` | Relaxed walk. |
| `CautionStandWalkReady` | none | Walks weapon ready, not aiming, in every phase. |

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework Lua API](/V_Framework/Lua_API)
  - [Route](/Route)
  - [Routes](/Routes)
