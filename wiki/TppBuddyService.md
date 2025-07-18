---
title: TppBuddyService
permalink: /TppBuddyService/
tags: [Lua]
---

TppBuddyService is a built-in lua module for buddy manipulation.

## Enum reference

```lua
BuddyFriendlyType = {
  QUIET,
  DOG,
  HORSE,
  HORSE_RAFECORN,
  HORSE_MILITARY,
  HORSE_PARADE,
  HORSE_WESTERN,
}
```

```lua
BuddyCommonFlag = {
  BOSS_QUIET_KILL,
  BUDDY_QUIET_DYING,
  BUDDY_QUIET_HOSPITALIZE,
  BUDDY_QUIET_LOST,
  BUDDY_QUIET_VANISH,
  BUDDY_RIDE_HELI,
  BUDDY_RESERVED,
  BUDDY_FORCE_HOSPITALIZE,
}
```

```lua
EntryBuddyType = {
  BUDDY,
  VEHICLE,
}
```

```lua
BuddyCommand = {
  QUIET_AIM_TARGET,
  QUIET_COMBAT_START,
  QUIET_SHOOT_THIS,
  HORSE_SHIT,
  DOG_BARKING,
}
```

## Command reference

#### SetMissionGroundStartPositions
---
#### ResetDogLeakedInformation
---
#### SetDogSnarlDecoyFriendlyPoint
---
#### SetDogBarkBossRadius
---
#### BuddyMissionInit
---
#### ResetFriendlyCounts
---
#### SetFriendlyPoint

Set bond points for specified buddy.

Parameters (names are not real):

| Name | Type |
|---|---|
| buddyID | number (BuddyFriendlyType) |
| friendlyPoint | number (0-100) |

Example:

```lua
TppBuddyService.SetFriendlyPoint(BuddyFriendlyType.QUIET, 100)
```

---
#### GetFriendlyPoint

Get bond points for specified buddy.

Parameters (names are not real):

| Name | Type |
|---|---|
| buddyID | number (BuddyFriendlyType) |

Returns:

| Name | Type |
|---|---|
| points | number |


Example:

```lua
TppBuddyService.GetFriendlyPoint(BuddyFriendlyType.DOG)
```

---
#### AddFriendlyPoint

Add bond points for specified buddy.

| Name | Type |
|---|---|
| buddyID | number (BuddyFriendlyType) |
| friendlyPoint | number (possibly negative?) |

Example:

```lua
TppBuddyService.AddFriendlyPoint(BuddyFriendlyType.QUIET, 2)
```

---
#### SetFriendlyMaxPoint
---
#### GetFriendlyMaxPoint
---
#### SetFriendlyCount
---
#### AddFriendlyCount
---
#### IsEnableBuddyCommand
---
#### SetBuddyCommonFlag
---
#### UnsetBuddyCommonFlag
---
#### CheckBuddyCommonFlag
---
#### SetBuddyCommonDisableRideHeliFlag
---
#### UnsetBuddyCommonDisableRideHeliFlag
---
#### CheckBuddyCommonDisableRideHeliFlag
---
#### DidObtainBuddyType
---
#### SetObtainedBuddyType
---
#### UnsetObtainedBuddyType
---
#### CanSortieBuddyType
---
#### SetSortieBuddyType
---
#### UnsetSortieBuddyType
---
#### IsEnableCallBuddyType
---
#### IsDisableCallBuddyType
---
#### SetDisableCallBuddyType
---
#### AllDisableCallBuddyType
---
#### UnsetDisableCallBuddyType
---
#### ClearDisableCallBuddyType
---
#### IsDeadBuddyType
---
#### SetDeadBuddyType
---
#### UnsetDeadBuddyType
---
#### IsDisableBuddyType
---
#### SetDisableBuddyType
---
#### UnsetDisableBuddyType
---
#### SetDisableAllBuddy
---
#### ClearDisableAllBuddy
---
#### ChangeQuietWeaponType
---
#### SetVarsQuietWeaponType
---
#### ChangeQuietCostume
---
#### SetVarsQuietCostume
---
#### IsQuietDeadFromDying
---
#### QuietDyingToDead
---
#### QuietHospitalized
---
#### IsNeedQuietHospitalizeInHeli
---
#### QuietDisableHospitalized
---
#### QuietOutOfHospital
---
#### BuddyProcessMissionEnd
---
#### BuddyProcessMissionSuccess
---
#### ResetEspionageCpHistory
---
#### IsEspionagedCp
---
#### SummonBuddy

Instantly spawns buddy at specified coordinates; does not charge GMP.

Parameters (names are not real):

| Name | Type |
|---|---|
| buddyID | number (0 = despawn, 1 = D-Horse, 2 = D-Dog, 3 = Quiet, 4 = D-Walker) |
| position | Vector3 |
| rotY | number |

Buddy ID does **NOT** match `BuddyFriendlyType` enum.

Example:

```lua
-- summon D-Dog nearby
local pos = TppPlayer.GetPosition()
TppBuddyService.SummonBuddy(2, Vector3(pos[1], pos[2], pos[3]), 500)
```

---
#### SetIgnoreDisableNpc
---
#### SetDisable
---
#### SetVarsMissionStart
---
#### ResetVarsMissionStart
---
#### IsRideHeli
---
#### HeliSpaceSetting
---
#### AdjustFromDropPoint
---
#### SetMissionEntryPosition
---
#### SetMissionEntryRotationY
---
#### EntryGateGo
---
#### GetReserveBuddyType
---
#### ReserveBuddyForLandStart
---
#### DidBuddyPuppyMBDemoPlay
---
#### SetBuddyPuppyMBDemoPlayed
---
#### UnsetBuddyPuppyMBDemoPlayed
---
#### IsBuddyDogGot
---
#### SetBuddyDogGot
---
#### UnsetBuddyDogGot
---
#### IsBuddyDogSecondGot
---
#### SetBuddyDogSecondGot
---
#### UnsetBuddyDogSecondGot
---
#### SetTargetAnimalId
---
#### RemoveTargetAnimalId
---
#### SetIgnoreEventAttribute
---
#### ClearParachute
