---
title: PlayerStatus
permalink: /PlayerStatus/
tags: [Lua, Player, Reference]
---

Some player status can be checked via bit flags using specfic bitflag
functions

Example:

`if PlayerInfo.AndCheckStatus{PlayerStatus.NORMAL_ACTION}then`

`if not PlayerInfo.OrCheckStatus{PlayerStatus.DEAD}then`



## PlayerStatus bitflags

| Value | Key (PlayerStatus)            | Key (Proposed)                | Notes                                                                                                                                      |
| ----- | ----------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 0     | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 1     | \-                            | DEPLOYED                      | On when not in ACC or mission prepare                                                                                                      |
| 2     | \-                            | UNK                           | Always on, unknown meaning                                                                                                                 |
| 3     | \-                            | UNK                           | Always on except briefly during loading screens                                                                                            |
| 4     | STAND                         | STAND                         | \--standing; false if HORSE_STAND; true when ON_VEHICLE                                                                                  |
| 5     | SQUAT                         | SQUAT                         | \--crouching or doing cbox slide                                                                                                           |
| 6     | CRAWL                         | CRAWL                         | \--prone or when CBOX_EVADE                                                                                                               |
| 7     | NORMAL_ACTION                | NORMAL_ACTION                | \--true for most basic on-foot movement-related actions like walking; false when ON_VEHICLE or ON_HORSE or CBOX                          |
| 8     | PARALLEL_MOVE                | PARALLEL_MOVE                | \--aiming                                                                                                                                  |
| 9     | IDLE                          | IDLE                          | Never on (to my knowledge), unknown meaning                                                                                                |
| 10    | \-                            | GUN_READY                    | On when holding a weapon which can be fired but not currently firing                                                                       |
| 11    | GUN_FIRE                     | GUN_FIRE                     | \--true even with suppressor; GUN_FIRE and GUN_FIRE_SUPPRESSOR not true with vehicle/static weapons                                     |
| 12    | GUN_FIRE_SUPPRESSOR         | GUN_FIRE_SUPPRESSOR         | \--true when discharging with suppressor                                                                                                   |
| 13    | \-                            | GUN_RELOAD                   | On when reloading a weapon but not when manually cycling rounds                                                                            |
| 14    | \-                            | GUN_CYCLE                    | On when manually cycling rounds (e.g. pump-action, bolt-action weapons)                                                                    |
| 15    | \-                            | STUN_ARM_READY              | On when aiming (but not firing? - check) the stun-arm                                                                                      |
| 16    | \-                            | ROCKET_ARM_READY            | On when aiming (but not firing? - check) the rocket-arm                                                                                    |
| 17    | \-                            | SHIELD_READY                 | On when aiming with a shield                                                                                                               |
| 18    | \-                            | PLACEABLE_READY              | On when aiming with a placeable item (e.g. C4)                                                                                             |
| 19    | \-                            | PLACEABLE_PLACE              | On when placing a placeable item (e.g. C4)                                                                                                 |
| 20    | STOP                          | STOP                          | \--when idle on foot or cbox; true when CBOX_EVADE; always true if ON_VEHICLE;                                                           |
| 21    | WALK                          | WALK                          | \--min speed                                                                                                                               |
| 22    | RUN                           | RUN                           | \--mid speed (default when standing)                                                                                                       |
| 23    | DASH                          | DASH                          | \--max speed (default when stance is limited to two speeds)                                                                                |
| 24    | \-                            | RUN_INTERPOLATE              | On when in run state but animation below full run speed                                                                                    |
| 25    | ON_HORSE                     | ON_HORSE                     | \--piloting D-Horse                                                                                                                        |
| 26    | ON_VEHICLE                   | ON_VEHICLE                   | \--piloting vehicle                                                                                                                        |
| 27    | \-                            | ON_LIGHT_VEHICLE            | On when piloting a light vehicle                                                                                                           |
| 28    | \-                            | ON_TRUCK                     | On when piloting a truck                                                                                                                   |
| 29    | \-                            | ON_APC                       | On when piloting an armoured personnel carrier                                                                                             |
| 30    | \-                            | ON_TANK                      | On when piloting a tank                                                                                                                    |
| 31    | \-                            | TRUCK_HIDE                   | On when turning off the engine and hiding in a truck                                                                                       |
| 32    | \-                            | VEHICLE_ACCL                 | On when accelerating in a vehicle                                                                                                          |
| 33    | \-                            | VEHICLE_REV                  | On when reversing in a vehicle                                                                                                             |
| 34    | \-                            | VEHICLE_IDLE                 | On when idle in a vehicle (does not include moving due to momentum only)                                                                   |
| 35    | \-                            | VEHICLE_FIRE                 | On when firing a weapon on a vehicle (I think?)                                                                                            |
| 36    | \-                            | VEHICLE_CRASH                | On when crashing a vehicle                                                                                                                 |
| 37    | ON_HELICOPTER                | ON_HELICOPTER                | \--riding helicopter                                                                                                                       |
| 38    | \-                            | ON_WALKERGEAR                | On when piloting walker gear (including D-Walker)                                                                                          |
| 39    | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 40    | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 41    | HORSE_STAND                  | HORSE_STAND                  | On when on a horse and not hiding                                                                                                          |
| 42    | HORSE_HIDE_R                | HORSE_HIDE_R                | \--hiding on right side of horse                                                                                                           |
| 43    | HORSE_HIDE_L                | HORSE_HIDE_L                | \--hiding on left side of horse                                                                                                            |
| 44    | HORSE_IDLE                   | HORSE_IDLE                   | \--HORSE_\[speed\] also used for D-Walker; can tell which with ON_HORSE check                                                            |
| 45    | HORSE_TROT                   | HORSE_TROT                   | \--slow speed                                                                                                                              |
| 46    | HORSE_CANTER                 | HORSE_CANTER                 | \--mid speed (default)                                                                                                                     |
| 47    | HORSE_GALLOP                 | HORSE_GALLOP                 | \--fast speed                                                                                                                              |
| 48    | \-                            | HORSE_MOUNT                  | On while climbing on horse                                                                                                                 |
| 49    | \-                            | HORSE_STEP_DOWN             | On when horse steps down from any height                                                                                                   |
| 50    | \-                            | HORSE_AIR                    | On when horse is airborne during to a jump                                                                                                 |
| 51    | \-                            | HORSE_LANDING                | On when horse is landing during a jump                                                                                                     |
| 52    | \-                            | HORSE_JUMP                   | On at all times during a horse jump                                                                                                        |
| 53    | \-                            | HORSE_STEP_DOWN_CANTER     | On when horse is stepping down from a height at a canter (special animation)                                                               |
| 54    | \-                            | HORSE_STEP_DOWN_GALLOP     | On when horse is stepping down from a height at a gallop (special animation)                                                               |
| 55    | \-                            | WALERGEAR_DRIVE_MODE        | On when in D-Walker's drive mode                                                                                                           |
| 56    | SUBJECT                       | SUBJECT                       | On when subjective camera is active (POV camera)                                                                                           |
| 57    | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 58    | BINOCLE                       | BINCOLE                       | \--using int-scope                                                                                                                         |
| 59    | INTRUDE                       | INTRUDE                       | On when forced subjective camera is active in crawl-spaces                                                                                 |
| 60    | LFET_STOCK                   | LEFT_STOCK                   | On when camera is behind player's right shoulder                                                                                           |
| 61    | CUTIN                         | CUTIN                         | On when "cut-in" camera is active (e.g. climbing on horse, entering vehicles, toilets, dumpsters, or putting enemies in things)            |
| 62    | DEAD                          | DEAD                          | On when player is dead                                                                                                                     |
| 63    | DEAD_FRESH                   | DEAD_FRESH                   | On during death animation?                                                                                                                 |
| 64    | NEAR_DEATH                   | NEAR_DEATH                   | On when health is low? Perhaps during or recovering from serious injury?                                                                   |
| 65    | NEAR_DEAD                    | \-                            | Despite being named, there is no code to set this flag?                                                                                    |
| 66    | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 67    | FALL                          | FALL                          | On when falling                                                                                                                            |
| 68    | CBOX                          | CBOX                          | \--true while in cbox and not sliding and not CBOX_EVADE                                                                                  |
| 69    | CBOX_EVADE                   | CBOX_EVADE                   | \--crawling out of cbox; CBOX false if true                                                                                                |
| 70    | \-                            | CBOX_STANCE                  | On when changing stance while in cardboard box                                                                                             |
| 71    | TRASH_BOX                    | TRASH_BOX                    | \--in trash box with closed lid                                                                                                            |
| 72    | TRASH_BOX_HALF_OPEN        | TRASH_BOX_HALF_OPEN        | \--in trash box and aiming weapon                                                                                                          |
| 73    | \-                            | TRASH_BOX_OPEN              | On when entering/exiting trash box                                                                                                         |
| 74    | \-                            | SEARCH_LIGHT                 | On when using search lights                                                                                                                |
| 75    | \-                            | MORTAR                        | On when using mortars                                                                                                                      |
| 76    | \-                            | MACHINE_GUN                  | On when using machine gun placements                                                                                                       |
| 77    | \-                            | AA_GUN                       | On when using anti-air emplacements                                                                                                        |
| 78    | \-                            | BUTTON_PRESS                 | On when pressing interactive buttons (e.g. power supplies)                                                                                 |
| 79    | \-                            | DOOR_PICKING                 | On when picking locks                                                                                                                      |
| 80    | INJURY_LOWER                 | INJURY_LOWER                 | On when player has a leg injury                                                                                                            |
| 81    | INJURY_UPPER                 | INJURY_UPPER                 | On when player has an arm injury                                                                                                           |
| 82    | \-                            | INJURY_BODY                  | On when player has an injury other than of the leg or arm                                                                                  |
| 83    | CURE                          | CURE                          | On during cure animation (injury flags remain on until animation is finished)                                                              |
| 84    | \-                            | CQC_LOCK_ON                 | On when using CQC moves with tracking (CQC on standing enemy within range, holding enemies, throwing enemies)                              |
| 85    | \-                            | CQC_MANUAL                   | On when using CQC moves without tracking (whiffed CQC, CQC on prone enemies)                                                               |
| 86    | \-                            | CQC_MANUAL_HOLD             | On when holding CQC moves without tracking (whiffed grabs)                                                                                 |
| 87    | \-                            | CQC_HOLD                     | On while holding enemies                                                                                                                   |
| 88    | CQC_CONTINUOUS               | CQC_CONTINUOUS               | On during consecutive CQC (high speed camera throw loops on enemies)                                                                       |
| 89    | \-                            | UNK                           | Flag exists but unknown conditions and meaning. Possibly being held in CQC by another player on FOBs but untested                          |
| 90    | BEHIND                        | BEHIND                        | \--pressed against cover/wall                                                                                                              |
| 91    | \-                            | BEHIND_CAMERA_SHIFT         | On when camera has shifted to see around edge                                                                                              |
| 92    | \-                            | BEHIND_SIDE_CQC_ENABLED    | On when behind a wall and at edge where CQC around corner is allowed?                                                                      |
| 93    | \-                            | BEHIND_FORCE_CROUCH         | On when behind a wall where crouching is forced                                                                                            |
| 94    | \-                            | CLIMB_CRACK                  | On when climbing cracks in walls and cliff faces (note: movement flags don't apply)                                                        |
| 95    | \-                            | ELUDE                         | On when hanging from edge (note: movement flags don't apply)                                                                               |
| 96    | \-                            | PIPE                          | On when climbing pipes (note: movement flags don't apply)                                                                                  |
| 97    | \-                            | CLAMBER                       | On when climbing up or over edges with action button                                                                                       |
| 98    | \-                            | JUMP                          | On when jumping using action button                                                                                                        |
| 99    | \-                            | EVADE                         | On when diving                                                                                                                             |
| 100   | \-                            | FULTON                        | On when using the fulton recovery device                                                                                                   |
| 101   | \-                            | DAMAGE                        | On when sustaining damage (not tested for sleep and stun damage?)                                                                          |
| 102   | \-                            | SLIDE                         | On when sliding on a steep incline                                                                                                         |
| 103   | UNCONSCIOUS                   | UNCONSCIOUS                   | On when rendered unconscious by sleep or stun weapons (includes animation?)                                                                |
| 104   | \-                            | UNCONSCUOUS_START            | On during animation where player falls unconscious                                                                                         |
| 105   | \-                            | UNCONSCIOUS_END              | On when player can wiggle stick to wake faster and when waking                                                                             |
| 106   | \-                            | DAMAGE_SLEEP                 | On when sustaining sleep damage                                                                                                            |
| 107   | \-                            | DAMAGE_STUN                  | On when sustaining stun damage                                                                                                             |
| 108   | \-                            | FULTONED                      | On when player is fultoned by another player or enemies on FOBs                                                                            |
| 109   | \-                            | LADDER                        | On when climbing ladder (note: movement flags \*do\* apply)                                                                                |
| 110   | \-                            | TOILET                        | On when hiding in toilet                                                                                                                   |
| 111   | \-                            | TOILET_DOOR                  | On when entering and exiting toilet/shower (excludes diving out)                                                                           |
| 112   | \-                            | SHOWER                        | On when taking a shower                                                                                                                    |
| 113   | \-                            | SPECIAL_ACTION               | On during special animations involving NPCs (e.g. grabbed by or countering, zombies, dogs, Liquid, Volgin, but not regular soldiers)       |
| 114   | \-                            | COUNTER                       | On when successfully countering enemies including those above?                                                                             |
| 115   | \-                            | LUNGE                         | On during dog/zombie lunge animation, regardless of successful counter                                                                     |
| 116   | \-                            | LUNGE_ZOMBIE                 | On during zombie lunge animation only, regardless of successful counter                                                                    |
| 117   | \-                            | COUNTER_PROJECTILE           | On when countering Liquid's thrown bottles                                                                                                 |
| 118   | \-                            | MAUL_ZOMBIE                  | On when being mauled by zombie after unsuccessful counter (115, 113 remain on too)                                                         |
| 119   | \-                            | MAUL_DOG                     | On when being mauled by dog after unsuccessful counter (115, 113 remain on too)                                                            |
| 120   | \-                            | PET_DD                       | On when petting DD                                                                                                                         |
| 121   | \-                            | ROCKET_ARM_PILOT            | On when piloting rocket arm                                                                                                                |
| 122   | VOLGIN_CHASE                 | VOLGIN_CHASE                 | On during prologue's horseback fight with Volgin                                                                                           |
| 123   | \-                            | KILL_QUIET                   | On when player can choose to kill Quiet in mission 11 (not on when player can choose to shoot Skull Face)                                  |
| 124   | \-                            | STEALTH_CAMO                 | On when stealth camo is active                                                                                                             |
| 125   | \-                            | UNDETECTABLE                  | On when stealth camo is active and player is not doing things which enable enemies to notice them (e.g. holding enemies, shooting, diving) |
| 126   | \-                            | NVG                           | On when using NVGs (includes mission 43?)                                                                                                  |
| 127   | \-                            | PARASITE_ARMOUR              | On when using parasite suit with armour parasites active                                                                                   |
| 128   | \-                            | STEALTH_MODE                 | On when using action button to hide while prone                                                                                            |
| 129   | \-                            | EXIT_HELICOPTER              | On when exiting helicopter (but not entering)                                                                                              |
| 130   | \-                            | CHICKEN_CAP                  | On when chicken cap is on                                                                                                                  |
| 131   | \-                            | CHICK_CAP                    | On when lil' chicken cap is on                                                                                                             |
| 132   | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 133   | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 134   | CARRY                         | CARRY                         | \--player is carrying an AI (use with "Carried" FoxStrCode32 msg to check status and obj type)                                             |
| 135   | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 136   | \-                            | CARRY_HORSE_ACTION          | On when putting an NPC on D-horse or taking them off                                                                                       |
| 137   | \-                            | MB_TERMINAL                  | On when using the iDroid                                                                                                                   |
| 138   | \-                            | UNK                           | Flag exists but unknown conditions and meaning                                                                                             |
| 139   | \-                            | UNK                           | Flag exists but unknown conditions and meaning - seems related to 138                                                                      |
| 140   | CURTAIN                       | CURTAIN                       | On when playing animation to pass through curtain in Prologue                                                                              |
| 141   | ENABLE_TARGET_MARKER_CHECK | ENABLE_TARGET_MARKER_CHECK | Unknown meaning. Probably on when some UI element is on.                                                                                   |
| 142   | \-                            | FLARE_LIGHT                  | On when player's visibility is increased due to enemy flares                                                                               |
| 143   | \-                            | STATIC_LIGHT                 | On when player's visibility is increased due to environmental light (does not include search lights or flashlights)                        |
| 144   | \-                            | VEHICLE_ARMOUR               | On when piloted vehicle's armour is intact (reduces damage)                                                                                |
| 145   | PARTS_ACTIVE                 | PARTS_ACTIVE                 | \--seems to always be true during gameplay                                                                                                 |
| 146   | \-                            | FOB_WORMHOLE                 | On when travelling from helicopter to FOB by wormhole                                                                                      |
| 147   | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 148   | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 149   | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 150   | \-                            | \-                            | There is no code to set this flag?                                                                                                         |
| 151   | \-                            | \-                            | There is no code to set this flag?                                                                                                         |