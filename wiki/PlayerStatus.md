---
title: PlayerStatus
permalink: /PlayerStatus/
---

Some player status can be checked via bit flags using specfic bitflag
functions

Example:

`if PlayerInfo.AndCheckStatus{PlayerStatus.NORMAL_ACTION}then`

## PlayerStatus bitflags

**STAND** --standing; false if HORSE_STAND; true when ON_VEHICLE

**SQUAT** --crouching or doing cbox slide

**CRAWL** --prone or when CBOX_EVADE

**NORMAL_ACTION** --true for most basic on-foot movement-related
actions like walking; false when ON_VEHICLE or ON_HORSE or CBOX

**PARALLEL_MOVE** --aiming

**IDLE**

**GUN_FIRE** --true even with suppressor; GUN_FIRE and
GUN_FIRE_SUPPRESSOR not true with vehicle/static weapons

**GUN_FIRE_SUPPRESSOR** --true when discharging with suppressor

**STOP** --when idle on foot or cbox; true when CBOX_EVADE; always true
if ON_VEHICLE;

**WALK** --min speed

**RUN** --mid speed (default when standing)

**DASH** --max speed (default when stance is limited to two speeds)

**ON_HORSE** --piloting D-Horse

**ON_VEHICLE** --piloting vehicle

**ON_HELICOPTER** --riding helicopter

**HORSE_STAND**

**HORSE_HIDE_R** --hiding on right side of horse

**HORSE_HIDE_L** --hiding on left side of horse

**HORSE_IDLE** --HORSE_\[speed\] also used for D-Walker; can tell
which with ON_HORSE check

**HORSE_TROT** --slow speed

**HORSE_CANTER** --mid speed (default)

**HORSE_GALLOP** --fast speed

**BINOCLE** --using int-scope

**SUBJECT** --first-person camera or when in certain vehicle
emplacements

**INTRUDE**

**LFET_STOCK**

**CUTIN** --placing guard in something (probably dev typo for PUT_IN)

**DEAD**

**DEAD_FRESH**

**NEAR_DEATH**

**NEAR_DEAD**

**FALL**

**CBOX** --true while in cbox and not sliding and not CBOX_EVADE

**CBOX_EVADE** --crawling out of cbox; CBOX false if true

**TRASH_BOX** --in trash box with closed lid

**TRASH_BOX_HALF_OPEN** --in trash box and aiming weapon

**INJURY_LOWER**

**INJURY_UPPER**

**CURE**

**CQC_CONTINUOUS**

**BEHIND** --pressed against cover/wall

**ENABLE_TARGET_MARKER_CHECK**

**UNCONSCIOUS**

**PARTS_ACTIVE** --seems to always be true during gameplay

**CARRY** --player is carrying an AI (use with "Carried" FoxStrCode32
msg to check status and obj type)

**CURTAIN**

**VOLGIN_CHASE**