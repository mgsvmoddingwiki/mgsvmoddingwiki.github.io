---
title: Commands
permalink: /Commands/
tags: [Lua, Reference]
---

Commands in The Phantom Pain's lua files are typically used in the
format of:

`   GameObject.SendCommand(gameObjectId, {id='commandName'})`

e.g. to get a player's vehicle type index do:

`   GameObject.SendCommand(vars.playerVehicleGameObjectId, {id='GetVehicleType'})`

Commands are specific to a game object type, and to a specific instance
or overall object of that type.

## Commands by GameObject Type

TppBear

| id argument name (hash if unknown) | Other argument names           | Description |
| ---------------------------------- | ------------------------------ | ----------- |
| SetAnimalId                        | name, animalId                 |             |
| SetEnabled                         | name, enabled                  |             |
| SetIgnoreDisableNpc                | enabled                        |             |
| SetIgnoreNotice                    | isPlayer, isSoldier, isHostage |             |
| SetKind                            | name, fv2Index                 |             |
| SetRoute                           | name, route, nodeIndex         |             |

TppBossQuiet2 (includes both boss Quiet and sniper Parasite Unit)

| id argument name (hash if unknown) | Other argument names                     | Description                                                                            |
| ---------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| ClearFogRequest                    | time                                     | no known lua reference                                                                 |
| DisableSnipePointIndex             | snipeIndex                               | no known lua reference                                                                 |
| EnableSnipePointIndex              | snipeIndex                               | no known lua reference                                                                 |
| FogRequest                         | density, time                            | no known lua reference                                                                 |
| GetActionStatus                    | NA                                       |                                                                                        |
| GetLifeStatus                      | NA                                       |                                                                                        |
| GetPosition                        | NA                                       |                                                                                        |
| GetQuietType                       | NA                                       |                                                                                        |
| Jump                               | position                                 | no known lua reference hash: 8bcf42eb                                                  |
| NarrowFarSight                     | enabled                                  |                                                                                        |
| ResetAI                            | NA                                       |                                                                                        |
| ResetBossQuiet2Flag                | NA                                       |                                                                                        |
| ResetPosition                      | NA                                       |                                                                                        |
| RestoreState                       | state, index, rotY, isHandcuff           | used in Cloaked in Silence                                                             |
| SetAntiHeliRoute                   | route                                    | used by Quiet if you call a chopper into the boss fight                                |
| SetBossQuiet2Flag                  | flag, on                                 | no known lua reference                                                                 |
| SetCombatGrade                     | defenseValue, offenseGrade, defenseGrade |                                                                                        |
| SetCloseCombatMode                 | enabled                                  |                                                                                        |
| SetDemoRoute                       | route                                    | route on death                                                                         |
| SetForceUnrealze                   | flag                                     |                                                                                        |
| SetFultonEnabled                   | enabled                                  |                                                                                        |
| SetHumming                         | flag                                     |                                                                                        |
| SetInvincible                      | enabled                                  |                                                                                        |
| SetKill                            | flag                                     |                                                                                        |
| SetKillRoute                       | route                                    |                                                                                        |
| SetLandingRoute                    | route                                    |                                                                                        |
| SetLifeRate                        | rate                                     | no known lua reference                                                                 |
| SetMarkerEnabledCommand            | enabled                                  |                                                                                        |
| SetNoiseNotice                     | flag                                     |                                                                                        |
| SetRecoveryRoute                   | route                                    |                                                                                        |
| SetRoute                           | route, phase                             | no known lua reference for TppBossQuiet2. Actually appears to be same as SetSnipeRoute |
| SetRoutePointIndex                 | NA                                       | likely dummied                                                                         |
| SetSightCheck                      | flag                                     |                                                                                        |
| SetSnipeRoute                      | route, phase                             |                                                                                        |
| SetStealth                         | flag                                     |                                                                                        |
| SetVisibleHandcuff                 | visible                                  | no known lua reference                                                                 |
| SetWatherFallShift                 | enabled                                  | misspelling of waterfall shift. Used in Code Talker to reposition parasite unit        |
| SetWithdrawal                      | enabled                                  | no known lua reference                                                                 |
| ShootPlayer                        | NA                                       | no known lua reference hash: 3a974476                                                  |
| ShootPosition                      | position                                 | no known lua reference hash: 50548397                                                  |
| StartCombat                        | NA                                       |                                                                                        |
| StartDeadEffect                    | NA                                       |                                                                                        |
| WarpRequest                        | pos, rotY                                |                                                                                        |

TppBuddyDog2

<table>
<thead>
<tr class="header">
<th><p>id argument name (hash if unknown)</p></th>
<th><p>Other argument names</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>GetPlacedItem</p></td>
<td><p>index</p></td>
<td><p>called when Snake picks up placed items</p></td>
</tr>
<tr class="even">
<td><p>GetPlant</p></td>
<td><p>uniqueId</p></td>
<td><p>called when Snake picks up plants</p></td>
</tr>
<tr class="odd">
<td><p>LuaAiStayAndSnarl</p></td>
<td><p>position, useMarker, look, dash, warp, ignoreMarker</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>LuaAiStayAndSnarl</p></td>
<td><p>position, useMarker, look, dash, warp</p></td>
<td><p>possibly defunct version of the above</p></td>
</tr>
<tr class="odd">
<td><p>SetActionCommand</p></td>
<td><p>useNav, destinationPosition, rotationDegreeY, toPlayer, relayPoints, speedType, phaseType, keyActionType, keyActionParam, subActionType, subActionParam</p></td>
<td><p>no known lua reference. Many other associated strings - possibly they are keys in a table. Associated with keyActionParam: stance, face, position, rotationY, degRotationY, targetAngleY, actingTime, noNoise, force, actionType</p>
<p>Associated with subActionParam: lookType, isBlurred, targetPosition</p></td>
</tr>
<tr class="even">
<td><p>SetEnabled</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetMode</p></td>
<td><p>mode</p></td>
<td><p>likely accepts TppBuddyDog.MODE_COMMAND or TppBuddyDog.MODE_NORMAL (1 and 0 respectively). No known lua reference</p></td>
</tr>
<tr class="even">
<td><p>SetMotherBaseCenterAndRadius</p></td>
<td><p>center, radius</p></td>
<td><p>used in the walking D-dog sequence at Mother Base</p></td>
</tr>
<tr class="odd">
<td><p>SetQueueEnabled</p></td>
<td><p>enabled</p></td>
<td><p>no known lua reference. hash: bbde553f</p>
<p>possibly also</p>
<p>InitiateChangeVehicleSeatLeft</p></td>
</tr>
<tr class="even">
<td><p>SetWaitTime</p></td>
<td><p>frame, time</p></td>
<td><p>presumably sets time DD waits. Time can be given either in frames or seconds?</p></td>
</tr>
<tr class="odd">
<td><p>SetWarpPosition</p></td>
<td><p>pos</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>WarpCommand</p></td>
<td><p>stanceType, rotationDegreeY, playerIndex, rotationY, degRotationY, position</p></td>
<td><p>No known lua reference</p></td>
</tr>
</tbody>
</table>

TppBuddyQuiet2

<table>
<thead>
<tr class="header">
<th><p>id argument name (hash if unknown)</p></th>
<th><p>Other argument names</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>90ef1e9</p></td>
<td><p>distance</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>1501783b</p></td>
<td><p>stance</p></td>
<td><p>possibly</p>
<p>SetForceIDot2R</p></td>
</tr>
<tr class="odd">
<td><p>5397f767</p></td>
<td><p>targetId</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>94e6d8cd</p></td>
<td><p>targetId</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>bcbaa88b</p></td>
<td><p>position, rotationY, index</p></td>
<td><p>possibly SetRideStartOutOfManually</p></td>
</tr>
<tr class="even">
<td><p>d802facb</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>f176bc2e</p></td>
<td><p>position, delayTime</p></td>
<td><p>possibly InitializeEventCautionRouteRain</p></td>
</tr>
<tr class="even">
<td><p>EnableAim</p></td>
<td><p>enable</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>EnableAnnounceLog</p></td>
<td><p>enable</p></td>
<td><p>no known lua reference hash: 35073206</p></td>
</tr>
<tr class="even">
<td><p>EnableAutoCombatMove</p></td>
<td><p>enable</p></td>
<td><p>no known lua reference hash: 685cc719</p></td>
</tr>
<tr class="odd">
<td><p>EnableDying</p></td>
<td><p>enable</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>EnableEscape</p></td>
<td><p>enable</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>EnableFire</p></td>
<td><p>enable</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>EnableHumming</p></td>
<td><p>enable</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>GetPosition</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>GetStatus</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Hello</p></td>
<td><p>index</p></td>
<td><p>no known lua reference hash: 1561a38a</p></td>
</tr>
<tr class="even">
<td><p>MoveToPosition</p></td>
<td><p>position, rotationY, disableAim, index</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>RequestRideHeli</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>RequestSupplyFlare</p></td>
<td><p>NA</p></td>
<td><p>used in a Quiet Exit</p></td>
</tr>
<tr class="odd">
<td><p>SetActionCommand</p></td>
<td><p>destinationPosition, toPlayer, relayPoints, speedType, keyActionType, keyActionParam, subActionType, subActionParam</p></td>
<td><p>no known lua reference. Many other associated strings - possibly they are keys in a table. Associated with keyActionParam: stance, face, rotationY, degRotationY, actingTime, actionType</p>
<p>Associated with subActionParam: isStopOnly, lookType, targetPosition</p></td>
</tr>
<tr class="even">
<td><p>SetBruise</p></td>
<td><p>enable</p></td>
<td><p>no known lua reference hash: ba46f702</p>
<p>possibly SetSecondaryAreaBuddyQuiet2</p></td>
</tr>
<tr class="odd">
<td><p>SetDownIdle</p></td>
<td><p>enable</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetEscapeTime</p></td>
<td><p>time</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>SetLife</p></td>
<td><p>life</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetMarkerEnabledCommand</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetRelayPoint</p></td>
<td><p>position</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>SetScriptAiEnabled</p></td>
<td><p>enabled</p></td>
<td><p>no known lua reference hash: ebad07cf</p></td>
</tr>
<tr class="odd">
<td><p>SetShootStance</p></td>
<td><p>stance</p></td>
<td><p>no known lua reference hash: 80ceae92</p></td>
</tr>
<tr class="even">
<td><p>SetStrongMode</p></td>
<td><p>mode</p></td>
<td><p>no known lua reference hash: 77fe5027</p></td>
</tr>
<tr class="odd">
<td><p>WarpCommand</p></td>
<td><p>stanceType, playerIndex, rotationY, degRotationY, position</p></td>
<td><p>No known lua reference. stanceType accepts value "Squat", else defaults to standing?</p></td>
</tr>
<tr class="even">
<td><p>WarpToPosition</p></td>
<td><p>position, rotationY</p></td>
<td></td>
</tr>
</tbody>
</table>

TppBuddyPuppy

| id argument name (hash if unknown) | Other argument names | Description                                            |
| ---------------------------------- | -------------------- | ------------------------------------------------------ |
| CallSe                             | seId, position       | no known lua reference. Se may stand for sound effect? |
| SetEnabled                         | enabled              |                                                        |
| SetFova                            | fv2Index             |                                                        |
| SetFultonEnabled                   | enabled              |                                                        |
| SetLocatorArea                     | radius               | no known lua reference                                 |
| SetRoute                           | route, nodeIndex     |                                                        |

TppCommandPost2

<table>
<thead>
<tr class="header">
<th><p>id argument name (hash if unknown)</p></th>
<th><p>Other argument names</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>d011cfb</p></td>
<td><p>NA (?)</p></td>
<td><p>possibly SetItemDropSourceGimmickLocatorName, SetMvarsOfRainRouteInit</p>
<p>EraseNoTelop</p></td>
</tr>
<tr class="even">
<td><p>d247ad0</p></td>
<td><p>locatorName</p></td>
<td><p>possibly AssignForceFrontLine, SetCombatLocatorMemberHideIcon</p></td>
</tr>
<tr class="odd">
<td><p>6f21ecdc</p></td>
<td><p>NA (?)</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>77e31c45</p></td>
<td><p>NA (?)</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>9640311a</p></td>
<td><p>NA (?)</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>9da02c05</p></td>
<td><p>locatorName</p></td>
<td><p>possibly AssignDefaultInactive</p></td>
</tr>
<tr class="odd">
<td><p>d1b64e6d</p></td>
<td><p>NA (?)</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>e7a4ea4f</p></td>
<td><p>locatorName</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>f46836cb</p></td>
<td><p>use</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>AssignInterrogation</p></td>
<td><p>messageId, index</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>AssignInterrogationWithVoice</p></td>
<td><p>soundParameterId, index</p></td>
<td><p>appears in TppInterrogation.lua but not used to my knowledge</p></td>
</tr>
<tr class="even">
<td><p>AssignInterrogationCollection</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>AssignMemberRoleInLocator</p></td>
<td><p>locatorName, soldier2GameObjectId</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>AssignMemberRoleInCombatLocator</p></td>
<td><p>locatorName, soldier2GameObjectId</p></td>
<td><p>no known lua reference hash: c7ac540d</p></td>
</tr>
<tr class="odd">
<td><p>AssignSneakRouteGroup</p></td>
<td><p>group, soldiers</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>AssignVipInCombatLocator</p></td>
<td><p>locatorName, soldier2GameObjectId</p></td>
<td><p>no known lua reference hash: e9c49da1</p>
<p>possibly also DisableCombatRotaion</p></td>
</tr>
<tr class="odd">
<td><p>ChangeRouteSets</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>ClearMemberRole</p></td>
<td><p>soldier2GameObjectId</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>GetCpPosition</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>GetLocatorPosition</p></td>
<td><p>name</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>GetLocatorRadius</p></td>
<td><p>name</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>GetPhase</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>IgnoreFlear</p></td>
<td><p>ignore</p></td>
<td><p>possibly a misspelling of flare?</p></td>
</tr>
<tr class="even">
<td><p>RemoveForceDiscovery</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>RemoveIgnoreCoop</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>RemoveIgnoreLookHeli</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>RemoveIgnoreReinforce</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>RemoveIgnoreReinforceInCp</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>RemoveShootLineCheck</p></td>
<td><p>NA (?)</p></td>
<td><p>no known lua reference hash: 5ff6ae8f</p></td>
</tr>
<tr class="even">
<td><p>RemoveUseAreaBalance</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>RequestForceReinforce</p></td>
<td><p>NA</p></td>
<td>Forces the enemy to call for Reinforcement. Used in EXTRAORDINARY (s10156)</td>
</tr>
<tr class="even">
<td><p>RequestNotice</p></td>
<td><p>type, targetId, sourceId</p></td>
<td><p>used in FOBs to make enemy respond to IR sensor and antitheft device gimmicks</p></td>
</tr>
<tr class="odd">
<td><p>RequestRadio</p></td>
<td><p>label, memberId, isHqRadio</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>RestoreFromSVars</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetAddReinforceCount</p></td>
<td><p>add</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>SetChatEnable</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetChildCp</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetCombatArea</p></td>
<td><p>cpName, combatAreaList</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetCommunicateAnnounce</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetCommunicateAreaGimmick</p></td>
<td><p>cpName, gimmicks, locatorName, dataSetName, areaName</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetCpForceSiren</p></td>
<td><p>enable</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetCpGroups</p></td>
<td><p>groupd</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetCpMissionTarget</p></td>
<td><p>enable</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetCpPosition</p></td>
<td><p>x, y, z, r</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetCpSirenType</p></td>
<td><p>type, pos</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetCpType</p></td>
<td><p>type</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetFOBPlayerDiscovery</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetFOBReinforceCount</p></td>
<td><p>count</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetForceDiscovery</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>SetFriendlyCp</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetFultonLevel</p></td>
<td><p>fultonLevel, isWormHole</p></td>
<td><p>Enables enemies to fulton the player when unconscious, used in FOB</p></td>
</tr>
<tr class="even">
<td><p>SetGrenadeTime</p></td>
<td><p>time</p></td>
<td><p>controls grenade fuse time for CP?</p></td>
</tr>
<tr class="odd">
<td><p>SetHitRate</p></td>
<td><p>hitRate</p></td>
<td><p>presumably controls accuracy of soldiers in CP. No known lua reference.</p></td>
</tr>
<tr class="even">
<td><p>SetIgnoreCoop</p></td>
<td><p>NA</p></td>
<td><p>used in a Quiet Exit</p></td>
</tr>
<tr class="odd">
<td><p>SetIgnoreLookHeli</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetIgnoreReinforce</p></td>
<td><p>NA</p></td>
<td>Disables the ability for soliders to call for reinforcements</td>
</tr>
<tr class="odd">
<td><p>SetIgnoreReinforceInCp</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>SetKeepAlert</p></td>
<td><p>enable</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetKeepCaution</p></td>
<td><p>enable</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetKeepCharge</p></td>
<td><p>enable</p></td>
<td><p>used in Pitch Dark</p></td>
</tr>
<tr class="odd">
<td><p>SetLocatorMemberCount</p></td>
<td><p>name, count, front</p></td>
<td><p>used to assign guards to FOB platforms. Front is also a count value.</p></td>
</tr>
<tr class="even">
<td><p>SetLocatorPosition</p></td>
<td><p>name, x, y, z, r</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetLookPlayerWithNotice</p></td>
<td><p>enable</p></td>
<td><p>used in a Quiet Exit</p></td>
</tr>
<tr class="even">
<td><p>SetLrrpCp</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetMarchCp</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetNominateList</p></td>
<td><p>vehicle, driver, sol01, sol02, sol03, sol04</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetNormalCp</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetOuterBaseCp</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetOutOfRainRoute</p></td>
<td><p>routes</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetPhase</p></td>
<td><p>phase</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetPowerSourceGimmick</p></td>
<td><p>cpName, gimmicks, locatorName, dataSetName, areaName</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetReinforceCount</p></td>
<td><p>count</p></td>
<td><p>Controls how many waves of reinforcements are allowed, resets when reentering Alert Phase</p></td>
</tr>
<tr class="odd">
<td><p>SetReinforceEnable</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetReinforcePlan</p></td>
<td><p>reinforcePlan</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetReinforcePrepared</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetReinforceTime</p></td>
<td><p>time</p></td>
<td><p>Controls the cooldown between reinforcements, used in FOBs</p></td>
</tr>
<tr class="odd">
<td><p>SetRouteEnabled</p></td>
<td><p>routes, enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetRouteExcludeChat</p></td>
<td><p>routes, enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetRouteSelector</p></td>
<td><p>func</p></td>
<td><p>used in combination with SetSwitchRouteFunc in TppEnemy.lua</p></td>
</tr>
<tr class="even">
<td><p>SetShootLineCheck</p></td>
<td><p>NA (?)</p></td>
<td><p>no known lua reference hash: a6991152</p></td>
</tr>
<tr class="odd">
<td><p>SetSkullCp</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetTargetQuietTime</p></td>
<td><p>time</p></td>
<td><p>used in a Quiet Exit</p></td>
</tr>
<tr class="odd">
<td><p>SetUseAreaBalance</p></td>
<td><p>NA</p></td>
<td><p>used in Hellbound</p></td>
</tr>
<tr class="even">
<td><p>SetWalkerGearParkRoute</p></td>
<td><p>routes</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>ShiftChange</p></td>
<td><p>schedule, holdTime</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>StoreToSVars</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
</tbody>
</table>

TppCorpse

| id argument name (hash if unknown) | Other argument names                        | Description                                                                                               |
| ---------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 94b88e62                           | enabled                                     |                                                                                                           |
| ChangeFovaCorpse                   | name, faceId, balaclavaFaceId, bodyId, seed |                                                                                                           |
| DisableDeactivateInUnrealize       | enabled                                     |                                                                                                           |
| FreeExtendFova                     | NA                                          |                                                                                                           |
| InitializeAndAllocateExtendFova    | face, body                                  |                                                                                                           |
| KeepInitMotion                     | enabled                                     |                                                                                                           |
| RequestDisableWithFadeout          | NA                                          |                                                                                                           |
| RequestDisableWithFadeout          | all, name, index (?)                        |                                                                                                           |
| RequestVanish                      | NA                                          |                                                                                                           |
| RequestVanish                      | all, name, index (?)                        |                                                                                                           |
| SetBloodFaceMode                   | enabled                                     |                                                                                                           |
| SetBloodFaceMode                   | enabled, name                               |                                                                                                           |
| SetBloodStain                      | offsetPos, radius                           |                                                                                                           |
| SetBurnt                           | enabled                                     |                                                                                                           |
| SetClothActive                     | active                                      | no known lua reference                                                                                    |
| SetClothStop                       | enabled, active (?)                         |                                                                                                           |
| SetForceDisabledCarried            | enabled                                     |                                                                                                           |
| SetForceRealize                    | forceRealize, name, index (?)               |                                                                                                           |
| SetForceUnreal                     | enabled                                     |                                                                                                           |
| SetInitMotion                      | path                                        | I think this is used to set the pose of corpses. KeepInitMotion makes them hold the pose until disturbed? |
| SetInRoomRealizeMode               | enabled                                     |                                                                                                           |
| UseExtendParts                     | enabled                                     |                                                                                                           |

TppCritterBird, TppEagle, TppStork

| id argument name (hash if unknown) | Other argument names                          | Description             |
| ---------------------------------- | --------------------------------------------- | ----------------------- |
| ChangeFlyingZone                   | name, center, radius, height                  |                         |
| ForceFlying                        | name                                          |                         |
| ForceLandingOnGround               | birdIndex, name, groundIndex                  | no known lua reference? |
| ForceLandingOnPerch                | birdIndex, name, perchIndex                   | no known lua reference? |
| SetAutoLanding                     | name, birdIndex                               |                         |
| SetEnabled                         | name, enabled                                 |                         |
| SetIgnoreDisableNpc                | enabled                                       |                         |
| SetIgnoreNotice                    | name                                          |                         |
| SetKind                            | name, fv2Index                                |                         |
| SetLandingPoint                    | name, groundPos, perchPos                     |                         |
| SetParameter                       | name, maxSpeed, minSpeed, flyTime, idleTime   |                         |
| UnsetAutoLanding                   | name, birdIndex                               | no known lua reference  |
| UnsetIgnoreNotice                  | name                                          | no known lua reference  |
| Warp                               | name, birdIndex, position, degreeRotationY    |                         |
| WarpOnGround                       | birdIndex, name, groundIndex, degreeRotationY |                         |
| WarpOnPerch                        | birdIndex, name, perchIndex, degreeRotationY  |                         |

TppDecoySystem

| id argument name (hash if unknown) | Other argument names | Description            |
| ---------------------------------- | -------------------- | ---------------------- |
| DisableForceUnrealizeAll           | NA                   | no known lua reference |
| EnableForceUnrealizeAll            | NA                   | no known lua reference |
| StorePlayerDecoyInfos              | NA                   |                        |

TppGoat, TppNubian

| id argument name (hash if unknown) | Other argument names                 | Description                  |
| ---------------------------------- | ------------------------------------ | ---------------------------- |
| SetAnimalId                        | name, animalId                       |                              |
| SetEnabled                         | name, enabled                        |                              |
| SetEscapeAttribute                 | enabled                              |                              |
| SetFovaInfo                        | name, isSetAll, seed, color          |                              |
| SetHerdEnabledCommand              | name, type, position, route, isForce |                              |
| SetIgnoreDisableNpc                | enabled                              |                              |
| SetKind                            | name, fv2Index                       |                              |
| SetIgnoreNotice                    | isPlayer, isSoldier, isHostage       |                              |
| SetNoticeDistance                  | name, distance, isForce              |                              |
| SetNoticeEnabled                   | name, enabled                        |                              |
| SetStatus                          | status, set                          | only valid status is "Sleep" |

TppHeli2, TppEnemyHeli, TppOtherHeli (WestHeli), TppOtherHeli2 (some
likely exclusive to one)

| id argument name (hash if unknown) | Other argument names                                                                        | Description                                                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1a9f9df3                           | direction                                                                                   |                                                                                                                                                                 |
| 1bc3608c                           | enabled                                                                                     | possibly KeepNoticeSightRemove RidehelicopterJam                                                                                                                |
| 66ab2df4                           | NA (?)                                                                                      |                                                                                                                                                                 |
| 902ed5fe                           | alpha                                                                                       |                                                                                                                                                                 |
| c8b2d4a6                           | NA (?)                                                                                      | possibly SetLifeStatusChangedRideFromLanding                                                                                                                    |
| e8b7b9ee                           | enabled                                                                                     | possibly EnableInSightCheckCBox, SetCombatLookPlayerWithMaxInstance                                                                                             |
| CallSound                          | eventName                                                                                   |                                                                                                                                                                 |
| CallToLandingZoneAtName            | name                                                                                        |                                                                                                                                                                 |
| CallToLandingZoneAtPosition        | position                                                                                    | no known lua reference                                                                                                                                          |
| ChangeToIdleState                  | NA                                                                                          |                                                                                                                                                                 |
| CreateWormhole                     | isEnter                                                                                     |                                                                                                                                                                 |
| DisableDescentToLandingZone        | NA                                                                                          |                                                                                                                                                                 |
| DisableLandingZone                 | name                                                                                        |                                                                                                                                                                 |
| DisablePullOut                     | NA                                                                                          |                                                                                                                                                                 |
| DoesLandingZoneExists              | name                                                                                        |                                                                                                                                                                 |
| EnableDescentToLandingZone         | NA                                                                                          |                                                                                                                                                                 |
| EnableLandingZone                  | name                                                                                        |                                                                                                                                                                 |
| EnablePullOut                      | NA                                                                                          |                                                                                                                                                                 |
| GetAiState                         | NA                                                                                          | will return hashed values of the following: WaitPoint, Descent, Landing, PullOut, MoveToLandingZone, MoveToWaitPoint The following are unknown states: 7ed0472b |
| GetCurrentLandingZoneName          | NA                                                                                          |                                                                                                                                                                 |
| GetDoingRouteEventIndex            | NA                                                                                          |                                                                                                                                                                 |
| GetPassengerIds                    | NA                                                                                          |                                                                                                                                                                 |
| GetPassengerStaffIdsStaffOnly      | NA                                                                                          |                                                                                                                                                                 |
| GetPosition                        | NA                                                                                          |                                                                                                                                                                 |
| GetUsingRoute                      | NA                                                                                          |                                                                                                                                                                 |
| InitializePassengers               | NA                                                                                          |                                                                                                                                                                 |
| IsBroken                           | NA                                                                                          |                                                                                                                                                                 |
| PrepareWormhole                    | NA                                                                                          | no known lua reference hash: b625d5f2                                                                                                                           |
| PullOut                            | forced                                                                                      |                                                                                                                                                                 |
| Realize                            | NA                                                                                          |                                                                                                                                                                 |
| Recover                            | NA                                                                                          | often used in combination with IsBroken. Causes heli to flee                                                                                                    |
| RequestReinforce                   | fromCp, toCp                                                                                |                                                                                                                                                                 |
| RequestRoute                       | enabled, route, point, warp                                                                 |                                                                                                                                                                 |
| RequestSnedDoorOpen                | NA                                                                                          |                                                                                                                                                                 |
| RestoreFromSVars                   | NA                                                                                          |                                                                                                                                                                 |
| SendPlayerAtRoute                  | route                                                                                       |                                                                                                                                                                 |
| SendPlayerAtRouteReady             | route                                                                                       |                                                                                                                                                                 |
| SendPlayerAtRouteStart             | isAssault                                                                                   |                                                                                                                                                                 |
| SetActionCommandFireToPlayer       | time                                                                                        | used in Prologue when killed by heli                                                                                                                            |
| SetAlertRoute                      | enabled, route, point, warp                                                                 |                                                                                                                                                                 |
| SetAntiSahelanEnabled              | enabled                                                                                     |                                                                                                                                                                 |
| SetAntiSahelanEventEnabled         | enabled                                                                                     |                                                                                                                                                                 |
| SetAutoWithdrawalEnabled           | enabled                                                                                     |                                                                                                                                                                 |
| SetCautionRoute                    | enabled, route, point, warp                                                                 |                                                                                                                                                                 |
| SetColoring                        | coloringType, fova                                                                          |                                                                                                                                                                 |
| SetCombatEnabled                   | enabled                                                                                     |                                                                                                                                                                 |
| SetCombatGrade                     | defenseValueMain, defenseValueCanopy, offenseGradeGun, offenseGradeMainWeapon, defenseGrade | no known lua reference for helis.                                                                                                                               |
| SetCommandPost                     | enabled, cp                                                                                 |                                                                                                                                                                 |
| SetDeltaTimeMin                    | deltaTime                                                                                   | no known lua reference                                                                                                                                          |
| SetDemoToAfterDropEnabled          | enabled, route, isTakeOff                                                                   |                                                                                                                                                                 |
| SetDemoToIdleEnabled               | enabled                                                                                     |                                                                                                                                                                 |
| SetDemoToLandingZoneEnabled        | enabled, name                                                                               |                                                                                                                                                                 |
| SetDemoToPullOutEnabled            | enabled                                                                                     |                                                                                                                                                                 |
| SetDemoToSendEnabled               | enabled, route                                                                              |                                                                                                                                                                 |
| SetEnabled                         | enabled                                                                                     |                                                                                                                                                                 |
| SetEyeMode                         | mode                                                                                        | I think it turns on and off heli sight. Mode will accept values "Close" or "Open"                                                                               |
| SetFallingRoute                    | route                                                                                       | no known lua reference hash: c037b56d                                                                                                                           |
| SetForceRoute                      | enabled, route, point, warp                                                                 |                                                                                                                                                                 |
| SetGettingOutEnabled               | enabled                                                                                     |                                                                                                                                                                 |
| SetIgnoreDisableNpc                | enabled                                                                                     |                                                                                                                                                                 |
| SetInvincible                      | enabled                                                                                     |                                                                                                                                                                 |
| SetLandingZnoeDoorFlag             | name, leftDoor, rightDoor                                                                   |                                                                                                                                                                 |
| SetLandingZoneWaitHeightTop        | height                                                                                      |                                                                                                                                                                 |
| SetLife                            | life                                                                                        |                                                                                                                                                                 |
| SetLightEnabled                    | enabled                                                                                     | no known lua reference                                                                                                                                          |
| SetMaxLife                         | life                                                                                        |                                                                                                                                                                 |
| SetMeshType                        | typeName                                                                                    | typeName accepts values "uth_v00", "uth_v01", or "uth_v02"                                                                                                   |
| SetMessagePlayerIsWithinRange      | name, enabled, range                                                                        |                                                                                                                                                                 |
| SetParameter                       | NA                                                                                          | likely dummied                                                                                                                                                  |
| SetRequestedLandingZoneToCurrent   | NA                                                                                          |                                                                                                                                                                 |
| SetRestrictNotice                  | enabled                                                                                     |                                                                                                                                                                 |
| SetRotorSoundEnabled               | enabled                                                                                     |                                                                                                                                                                 |
| SetSearchLightForcedType           | type                                                                                        | type accepts values "On", "Off", or ""                                                                                                                          |
| SetSendDoorOpenManually            | enabled                                                                                     |                                                                                                                                                                 |
| SetSneakRoute                      | route, point, warp                                                                          |                                                                                                                                                                 |
| SetTakeOffWaitTime                 | time                                                                                        |                                                                                                                                                                 |
| SetTaxiRoute                       | currentClusterRoute, relayRoute, nextClusterRoute                                           |                                                                                                                                                                 |
| StartAntiSahelan                   | startPosition, pullOutPosition                                                              |                                                                                                                                                                 |
| StoreToSVars                       | NA                                                                                          |                                                                                                                                                                 |
| Unrealize                          | NA                                                                                          |                                                                                                                                                                 |

TppHorse2 and TppCommonHorse2

| id argument name (hash if unknown) | Other argument names                     | Description                                |
| ---------------------------------- | ---------------------------------------- | ------------------------------------------ |
| 9bba9494                           | index, interval, scale, velocity         | possibly SetNoticedAntiSahelanEventDescend |
| GetCarriedHostage                  | NA                                       | no known lua reference                     |
| GetRidePlayer                      | NA                                       |                                            |
| HorseForceStop                     | NA                                       |                                            |
| IsCarriedHostage                   | NA                                       | no known lua reference                     |
| IsRidePlayer                       | NA                                       |                                            |
| SetCallHorse                       | startPosition, goalPosition              |                                            |
| SetCombatGrade                     | defenseValue, offenseGrade, defenseGrade |                                            |
| SetMaxLife                         | life                                     |                                            |

TppHorse2forVr (volgin_horse) and TppPlayerHorse2forVr (ocelot_horse)
(some likely exclusive to one)

| id argument name (hash if unknown) | Other argument names | Description                           |
| ---------------------------------- | -------------------- | ------------------------------------- |
| GetRearRider                       | NA                   | no known lua reference hash: 4dccfdcf |
| GetRidePlayer                      | NA                   |                                       |
| IsRearRider                        | NA                   | no known lua reference hash: 9dfe65ba |
| IsRidePlayer                       | NA                   |                                       |
| RequestHandsGunToPlayer            | NA                   |                                       |
| SetInvincibleMode                  | enable               |                                       |
| SetMaxLife                         | life                 |                                       |
| SetRoute                           | warp, route          |                                       |

TppHostage2, TppHostageUnique, TppHostageUnique2, TppHostageKaz,
TppOcelot2, TppHuey2, TppCodeTalker2, TppSkullFace2, TppMantis2 (some
likely exclusive to one)

| id argument name (hash if unknown) | Other argument names                                                                                                                                                                                                                                                                                                                                                                                     | Description                                                                             |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 2c2eb775                           | type                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                         |
| CallMonologue                      | label, reset, carry, pause                                                                                                                                                                                                                                                                                                                                                                               | used to make hostages talk while being carried                                          |
| CallVoice                          | dialogueName, parameter                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                         |
| ChangeFova                         | faceId, bodyId, seed, demoBodyId                                                                                                                                                                                                                                                                                                                                                                         |                                                                                         |
| ChangeLifeState                    | state                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                         |
| FreeExtendFova                     | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetActionStatus                    | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetCurrentEquipId                  | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetCurrentLife                     | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetFaceId                          | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetKeepFlagValue                   | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetLifeStatus                      | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetMarkerEnabled                   | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetMaxInstanceCount                | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetMaxLife                         | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetNoticeState                     | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetPosition                        | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetRideVehicleState                | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetRotationY                       | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetStaffId                         | divided                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                         |
| GetStatus                          | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| GetVehicleGameObjectId             | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| InitializeAndAllocateExtendFova    | face, body                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                         |
| IsChild                            | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| IsDD                               | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| IsFemale                           | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| IsInRange                          | range, target                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                         |
| IsReal                             | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| ReadyToStoreToSVars                | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| RecoveryAll                        | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| RecoveryLife                       | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| RecoveryStamina                    | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| RequestDisableWithFadeout          | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| RequestForceFulton                 | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| RequestVanish                      | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| RestoreFromSVars                   | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| RideVehicle                        | vehicleId, type, fastRide, off, seatIndex                                                                                                                                                                                                                                                                                                                                                                |                                                                                         |
| SetBloodStain                      | slowFadeOut, offsetPos, radius                                                                                                                                                                                                                                                                                                                                                                           |                                                                                         |
| SetCombatGrade                     | defenseValue, offenseGrade, defenseGrade                                                                                                                                                                                                                                                                                                                                                                 |                                                                                         |
| SetCountAnyoneNearBy               | enabled, enable                                                                                                                                                                                                                                                                                                                                                                                          | no known lua reference. Hash: 4da60fbb                                                  |
| SetDemoToRideHorse                 | horseId                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                         |
| SetDisableDamage                   | life, faint, sleep                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| SetEnabled                         | enabled                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                         |
| SetEnemyDamageRate                 | rate                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                         |
| SetEquipId                         | primary                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                         |
| SetEverDown                        | enabled                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                         |
| SetFaceBloodMode                   | enabled                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                         |
| SetFaceId                          | faceId                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                         |
| SetFollowed                        | enable                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                         |
| SetForceScared                     | scared, time, ever                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| SetHostage2Flag                    | flag                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                         |
| SetHostage2Flag                    | flag, updateModel                                                                                                                                                                                                                                                                                                                                                                                        | updateModel is used in combination with the "unlocked" flag in Where do the Bees Sleep? |
| SetIgnoreDisableNpc                | enable                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                         |
| SetKeepFlagValue                   | keepFlagValue                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                         |
| SetLangType                        | langType                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                         |
| SetMarkerEnabledCommand            | enabled                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                         |
| SetMaxLife                         | life, stamina                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                         |
| SetMovingNoticeTrap                | enable                                                                                                                                                                                                                                                                                                                                                                                                   | I think it makes enemies notice when a hostage has been moved from an area              |
| SetNoticeState                     | state                                                                                                                                                                                                                                                                                                                                                                                                    | I think this sets a flag which marks whether soldiers should notice the hostage         |
| SetPlayerDistanceCheck             | enabled, near, far                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| SetRandomActing                    | actions, intervalMax, intervalMin                                                                                                                                                                                                                                                                                                                                                                        |                                                                                         |
| SetRelativeVehicle                 | targetId                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                         |
| SetStaffId                         | divided, staffId, staffId2                                                                                                                                                                                                                                                                                                                                                                               |                                                                                         |
| SetSneakRoute                      | route, point                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                         |
| SetTargetId                        | targetId, headshot, curtain                                                                                                                                                                                                                                                                                                                                                                              | used to make Ishmael do stuff, like open doors, shoot XOF                               |
| SetVoiceType                       | voiceType                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                         |
| SpecialAction                      | action, facial, stance, path, state, startPosition, startAngleY, override, autoFinish, enableMessage, enableGravity, enableCollision, enableSubCollision, enableGunFire, enableCurtain, enableIk, enableAim, enableFinishPlayerIn, enableFinishEnemiesOut, enableFinishCarried, enableFinishInterrupted, enableGroupDelay, enableGroupRate, enableKeepStartLocation, disableMove, commandId, interpFrame | used to make hostages play special animations                                           |
| StoreToSVars                       | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| UnsetRelativeVehicle               | NA                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                         |
| Warp                               | demoEnd, rotationY, degRotationY, control, interpTime, position                                                                                                                                                                                                                                                                                                                                          |                                                                                         |

TppLiquid2

| id argument name (hash if unknown) | Other argument names | Description |
| ---------------------------------- | -------------------- | ----------- |
| GetLifeStatus                      | NA                   |             |
| ForceUnconscious                   | NA                   |             |
| GetMaxInstanceCount                | NA                   |             |
| GetPhase                           | NA                   |             |
| GetPlayerDistance                  | NA                   |             |
| IsSittingInChair                   | NA                   |             |
| InitiateCombat                     | NA                   |             |
| RestoreFromSVars                   | NA                   |             |
| SetCommandPost                     | cp                   |             |
| SetForceRealize                    | forceRealize         |             |
| SetForceUnrealize                  | forceUnrealize       |             |
| SetMotherBaseMode                  | NA                   |             |
| SetRoute                           | route, point         |             |
| StoreToSVars                       | NA                   |             |
| Warp                               | position, rotationY  |             |

TppMarker2LocatorSystem

<table>
<thead>
<tr class="header">
<th><p>id argument name</p>
<p>(hash if unknown)</p></th>
<th><p>Other argument names</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>RestoreFromSVars</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>StoreToSVars</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
</tbody>
</table>

TppMbQuiet

| id argument name (hash if unknown) | Other argument names | Description            |
| ---------------------------------- | -------------------- | ---------------------- |
| SetLoop                            | isLoop               | no known lua reference |
| StartWakeUp                        | isLoop, isAll        |                        |

TppParasite2 (only mist and armoured Skulls)

| id argument name (hash if unknown) | Other argument names                                                              | Description                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GetParasiteType                    | NA                                                                                | returns hashed values of "Fog" or "Metal"                                                                                                                                                                                                                                                                                                                        |
| Realize                            | NA                                                                                |                                                                                                                                                                                                                                                                                                                                                                  |
| SetAreaCombatEnabled               | enabled                                                                           |                                                                                                                                                                                                                                                                                                                                                                  |
| SetCombatGrade                     | defenseValueMain, defenseValueArmor, defenseValueWall, offenseGrade, defenseGrade |                                                                                                                                                                                                                                                                                                                                                                  |
| SetCorrodeActionEnabled            | enabled                                                                           |                                                                                                                                                                                                                                                                                                                                                                  |
| SetDeterrentEnabled                | enabled                                                                           |                                                                                                                                                                                                                                                                                                                                                                  |
| SetDeterrentVehicleEnabled         | enabled                                                                           |                                                                                                                                                                                                                                                                                                                                                                  |
| SetFogActionEnabled                | enabled                                                                           |                                                                                                                                                                                                                                                                                                                                                                  |
| SetFogState                        | NA                                                                                | likely dummied                                                                                                                                                                                                                                                                                                                                                   |
| SetGuardTargetId                   | targetId                                                                          |                                                                                                                                                                                                                                                                                                                                                                  |
| SetFultonEnabled                   | enabled                                                                           |                                                                                                                                                                                                                                                                                                                                                                  |
| SetParameters                      | params                                                                            | params is a table which can take the following keys and their values: sightDistance, sightDistanceCombat, sightVertical, sightHorizontal, noiseRate, avoidSideMin, avoidSideMax, throwRecastTime, areaCombatBattleRange, areaCombatBattleToSearchTime, areaCombatLostSearchRange, areaCombatLostToGuardTime, areaCombatGuardSearchRange, areaCombatGuardDistance |
| SetStateAfterDemo                  | realize, harden                                                                   |                                                                                                                                                                                                                                                                                                                                                                  |
| StartAppearance                    | position, radius                                                                  |                                                                                                                                                                                                                                                                                                                                                                  |
| StartCombat                        | harden                                                                            |                                                                                                                                                                                                                                                                                                                                                                  |
| StartGuard                         | NA                                                                                |                                                                                                                                                                                                                                                                                                                                                                  |
| StartSearch                        | NA                                                                                |                                                                                                                                                                                                                                                                                                                                                                  |
| StartTargetKill                    | targetId                                                                          |                                                                                                                                                                                                                                                                                                                                                                  |
| StartWithdrawal                    | NA                                                                                |                                                                                                                                                                                                                                                                                                                                                                  |
| Unrealize                          | NA                                                                                |                                                                                                                                                                                                                                                                                                                                                                  |

TppPlayer2

| id argument name (hash if unknown) | Other argument names   | Description                                                                                                                              |
| ---------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 44d414a9                           | level, equip, all      |                                                                                                                                          |
| ea35c35b                           | level, equip, all      |                                                                                                                                          |
| CreateWormhole                     | isEnter, isVfxDisabled | Makes the player disappear with the wormhole affect, enemies can still spot the player.                                                  |
| GetWormholePosition                | NA                     |                                                                                                                                          |
| RequestCarryOff                    | NA                     |                                                                                                                                          |
| SetBaseMotionSpeedRate             | speedRate              | Alters the animation speed of most player motions                                                                                        |
| SetHesitatingFire                  | enabled                |                                                                                                                                          |
| SetSpecialAttackMode               | \*WIP\*                | Puts player into special attack state (executing Quiet/Skull Face, attacking Volgin at hospital) and controls mission prepare animation. |
| SetStandMoveSpeedLimit             | speedRateLimit         | Caps the speed of the running animation (not dash)                                                                                       |
| SetWormhole                        | disp                   | Makes the FOB abort wormhole circle appear                                                                                               |
| SetWormholeIcon                    | enable                 | The icon that enables you to interact with the Abort wormhole used in FOB                                                                |
| SetWormholeIconType                | enable                 | Wormhole is useable if true, used in FOB to disable the ability to abort via wormhole if in Alert Phase.                                 |
| SetWormholePosition                | position               | Abort WormHole circle position. if not given, it will be the player's position? not sure                                                 |
| Warp                               | pos, rotY              |                                                                                                                                          |
| WarpToStation                      | stationId              | Warps player between delivery points via cardboard box                                                                                   |

TppRat

| id argument name (hash if unknown) | Other argument names                                        | Description |
| ---------------------------------- | ----------------------------------------------------------- | ----------- |
| SetEnabled                         | name, ratIndex, enabled                                     |             |
| SetFovaInfo                        | name, isSetAll, seed, color                                 |             |
| SetIgnoreDisableNpc                | enabled                                                     |             |
| SetKind                            | name, fv2Index                                              |             |
| SetRoute                           | name, ratIndex, route, nodeIndex                            |             |
| Warp                               | name, ratIndex, position, degreeRotationY, route, nodeIndex |             |

TppSahelan2

| id argument name (hash if unknown) | Other argument names                                               | Description                                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| GetDistanceToLandingZone           | NA                                                                 |                                                                                                                                                       |
| GetDistanceToPlayer                | NA                                                                 |                                                                                                                                                       |
| GetPhase                           | NA                                                                 |                                                                                                                                                       |
| GetPosition                        | NA                                                                 |                                                                                                                                                       |
| IsPlayerInSight                    | NA                                                                 |                                                                                                                                                       |
| ResetEnableAttackToHoveringHeli    | NA                                                                 |                                                                                                                                                       |
| ResetHeliPosition                  | NA                                                                 |                                                                                                                                                       |
| ResetParasiteEffect                | NA                                                                 |                                                                                                                                                       |
| SetBaseRoute                       | route                                                              |                                                                                                                                                       |
| SetCautionRoute                    | route                                                              |                                                                                                                                                       |
| SetCautionRouteAll                 | index, all                                                         |                                                                                                                                                       |
| SetCombatGrade                     | defenseValue, defenseValueForWeakPoint, offenseGrade, defenseGrade |                                                                                                                                                       |
| SetDeadClear                       | NA                                                                 | no known lua reference seems to kill Sahelanthropus                                                                                                   |
| SetEnableAttackToHoveringHeli      | NA                                                                 |                                                                                                                                                       |
| SetHeliPosition                    | position                                                           |                                                                                                                                                       |
| SetLostPlayerTime                  | time                                                               | no known lua reference                                                                                                                                |
| SetMarkerEnabledCommand            | enabled                                                            |                                                                                                                                                       |
| SetMaxLife                         | life                                                               |                                                                                                                                                       |
| SetMaxPartsLife                    | life, parts                                                        |                                                                                                                                                       |
| SetParasiteEffect                  | NA                                                                 |                                                                                                                                                       |
| SetPrevVsHeliSequencePosition      | targetPosition, targetRotationY                                    |                                                                                                                                                       |
| SetRelativeRouteNode               | index0, index1, route0, route1                                     |                                                                                                                                                       |
| SetSearchMissileRouteAll           | index, route                                                       |                                                                                                                                                       |
| SetSneakRoute                      | route                                                              |                                                                                                                                                       |
| SetStageType                       | index                                                              | index value is 0 in Hellbound, 1 in Sahelanthropus, and 2 in Sahelanthropus \[EXTREME\]. 3 is a valid value, but only makes Sahelanthropus stand idle |
| SetStopLife                        | life                                                               | damage needed to stop Sahelanthropus in heli sequence in Hellbound                                                                                    |
| SetStopSahelan                     | NA                                                                 | seems to kill Sahelanthropus                                                                                                                          |
| SetSupportAttack                   | NA                                                                 |                                                                                                                                                       |
| SetVsHeliSequenceLast              | targetPosition                                                     |                                                                                                                                                       |
| SetVsHeliSequenceMissileStop       | NA                                                                 |                                                                                                                                                       |
| SetVsHeliSequenceStart             | landingPosition, targetPosition                                    |                                                                                                                                                       |

TppSecurityCamera2

| id argument name (hash if unknown) | Other argument names                     | Description                                          |
| ---------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| IsGunCamera                        | NA                                       |                                                      |
| RemoveCautionTarget                | NA                                       | no known lua reference                               |
| RemoveSneakTarget                  | NA                                       | no known lua reference                               |
| RestoreFromSVars                   | NA                                       |                                                      |
| SetCautionTarget                   | target                                   | no known lua reference                               |
| SetCombatGrade                     | defenseValue, offenseGrade, defenseGrade |                                                      |
| SetCommandPost                     | cp                                       |                                                      |
| SetDevelopLevel                    | developLevel                             |                                                      |
| SetEnabled                         | enabled                                  |                                                      |
| SetFreePositionCamera              | NA                                       | I think it is used to turn on placed cameras on FOBs |
| SetFriendly                        | enabled                                  |                                                      |
| SetGunCamera                       | NA                                       |                                                      |
| SetLocator                         | pos, rotY                                | no known lua reference                               |
| SetMarkerEnabledCommand            | enabled                                  |                                                      |
| SetNormalCamera                    | NA                                       |                                                      |
| SetSneakTarget                     | target                                   | no known lua reference                               |
| StoreToSVars                       | NA                                       |                                                      |
| SwitchOffCamera                    | NA                                       | no known lua reference                               |
| SwitchOnCamera                     | NA                                       | no known lua reference                               |

TppSoldier2

<table>
<thead>
<tr class="header">
<th><p>id argument name (hash if unknown)</p></th>
<th><p>Other argument names</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1e02b734</p></td>
<td><p>enabled</p></td>
<td><p>possibly SetCombatAiActiveCollision ForceOutOfAcitveByLastPosition</p></td>
</tr>
<tr class="even">
<td><p>94b88e62</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>d6409d25</p></td>
<td><p>NA (?)</p></td>
<td><p>possibly SetKillFriendHostage2Flag</p></td>
</tr>
<tr class="even">
<td><p>ee110127</p></td>
<td><p>time</p></td>
<td><p>possibly SetOptCamTime, GetReinforceCpRadioTime</p></td>
</tr>
<tr class="odd">
<td><p>AddDamage</p></td>
<td><p>attackId, ownerGameObjectId, isOneHitKill, isHeadShot</p></td>
<td><p>used in Prologue to kill XOF after Ishmael "shoots" them</p></td>
</tr>
<tr class="even">
<td><p>AddRouteAssignMember</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>AddSpecialNoise</p></td>
<td><p>noiseType, pos</p></td>
<td><p>used in Root Cause - It makes the enemies react to the given position as if there was an explotion.</p></td>
</tr>
<tr class="even">
<td><p>CallConversation</p></td>
<td><p>label, friend, friend2, hostage, range</p></td>
<td><p>no known instances of using friend2 argument?</p></td>
</tr>
<tr class="odd">
<td><p>CallMonologue</p></td>
<td><p>label</p></td>
<td><p>play a voice clip, usually scripted to play while being carried</p></td>
</tr>
<tr class="even">
<td><p>CallRadio</p></td>
<td><p>label, stance, isHqRadio, voiceType, isForce</p></td>
<td><p>Can be used to trigger a caution phase with the right radio label</p></td>
</tr>
<tr class="odd">
<td><p>CallSoundEffect</p></td>
<td><p>isCheckShield, isFollow, sound</p></td>
<td><p>used to make MB soldiers hum in Shining Lights Even in Death</p></td>
</tr>
<tr class="even">
<td><p>CallVoice</p></td>
<td><p>dialogueName, parameter</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>ChangeEquipSlot</p></td>
<td><p>slot</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>ChangeFova</p></td>
<td><p>faceId, balaclavaFaceId, bodyId, seed</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>ChangeFova</p></td>
<td><p>seed, race, faceId, balaclavaFaceId, bodyId, isScarf</p></td>
<td><p>a different instance of the same id name</p></td>
</tr>
<tr class="even">
<td><p>ChangeLifeState</p></td>
<td><p>state, stance</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>ChangeSpecialFova</p></td>
<td><p>seed, faceId, faceIndex, balaclavaFaceId, bodyId, bodyIndex</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>ClearEscapePosition</p></td>
<td><p>NA</p></td>
<td><p>related to wandering mother base soldier fleeing behaviour</p></td>
</tr>
<tr class="odd">
<td><p>CreateFaceIdList</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>DisablePickupMainWeapon</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>DisableSwitchCorpse</p></td>
<td><p>enabled</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>DyingFireOnce</p></td>
<td><p>enabled</p></td>
<td><p>used in Shining Lights Even in Death to make dying soldier fire pistol</p></td>
</tr>
<tr class="odd">
<td><p>FreeExtendFova</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>GetActionStatus</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>GetCurrentEquipId</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>GetGameObjectIdUsingRoute</p></td>
<td><p>route</p></td>
<td>Checks the soldier that is using the given route, and returns the soldier's id</td>
</tr>
<tr class="odd">
<td><p>GetLangType</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>GetLifeStatus</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>GetPosition</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>GetSoldier2Gender</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>GetSoldier2Race</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>GetSoldier2Type</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>GetStaffId</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>GetStateFlag</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>GetStatus</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>GetVehicleGameObjectId</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>InitializeAndAllocateExtendFova</p></td>
<td><p>face, body</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>IsActiveSoldierInRange</p></td>
<td><p>range, position</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>IsChild</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>IsDD</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>IsDoneHoldUp</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>IsDoneTacticalTakedown</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>IsDyingFobStaff</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference hash: 41438b61</p>
<p>possibly</p>
<p>GetVehicleIdleEndCheckTime</p></td>
</tr>
<tr class="even">
<td><p>IsDyingLife</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>IsLimbo</p></td>
<td><p>NA (?)</p></td>
<td><p>no known lua reference hash: e8245e93</p>
<p>possibly</p>
<p>SetRegistSwarmEffectFromBeginningZombieUse</p></td>
</tr>
<tr class="even">
<td><p>IsOnRoute</p></td>
<td><p>route</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>IsZombieOrMsf</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>RecoveryAll</p></td>
<td><p>NA</p></td>
<td><p>wakes up unconscious or sleeping soldier</p></td>
</tr>
<tr class="odd">
<td><p>RecoveryLife</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>RecoveryStamina</p></td>
<td><p>isDelay, delayTime, enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Refresh</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>RegenerateStaffIdForReinforce</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>RegisterMessage</p></td>
<td><p>isRegistered, message</p></td>
<td><p>only allowed value for message is "ChangePhase"</p></td>
</tr>
<tr class="even">
<td><p>RegistGrenadeId</p></td>
<td><p>grenadeId, stunId</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>RegistSwarmEffect</p></td>
<td><p>NA</p></td>
<td><p>for puppet soldiers</p></td>
</tr>
<tr class="even">
<td><p>RemoveCommandAi</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>RequestDisableWithFadeout</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>RequestForceFulton</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>RequestVanish</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>ResetInterrogationFlag</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>ResetSoldier2Flag</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>RestoreFromSVars</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetAlertRoute</p></td>
<td><p>route, point, enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetBloodFaceMode</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetBringPlayerAsPrisoner</p></td>
<td><p>enabled</p></td>
<td><p>used in Skull Face to make escort soldiers keep pace with the player after meeting at helipad. Additionally, enables AI behaviour which warns the player but unclear how to activate.</p></td>
</tr>
<tr class="even">
<td><p>SetCannonTime</p></td>
<td><p>time</p></td>
<td><p>used in a Quiet Exit - I think it acts on soldier in tank to control fire interval</p></td>
</tr>
<tr class="odd">
<td><p>SetCautionRoute</p></td>
<td><p>route, point</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetChargeMode</p></td>
<td><p>enable</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetCharger</p></td>
<td><p>enable</p></td>
<td><p>applied to soldiers in a Quiet Exit after they exit APCs</p></td>
</tr>
<tr class="even">
<td><p>SetChickenwingGunAim</p></td>
<td><p>enabled</p></td>
<td><p>used in Prologue to set special XOF aim stance</p></td>
</tr>
<tr class="odd">
<td><p>SetCombatGrade</p></td>
<td><p>defenseValue, offenseGrade, defenseGrade</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetCommandAi</p></td>
<td><p>commandType, commandIndex, x, y, z, vehicle, sol01, sol02, sol03, formationIndex</p></td>
<td><p>selection of arguments depends on commandType value</p></td>
</tr>
<tr class="odd">
<td><p>SetCommandAiStep</p></td>
<td><p>step</p></td>
<td><p>used in Prologue to move XOF during gun tutorial?</p></td>
</tr>
<tr class="even">
<td><p>SetCommandPost</p></td>
<td><p>cp</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetConversationList</p></td>
<td><p>list</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetDisableDamage</p></td>
<td><p>life, faint, sleep</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetDisableOccasionalChat</p></td>
<td><p>disable</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetDisableWarpToNav</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetDiscoveryPlayer</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetDoneHoldup</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetDyingFireInfinity</p></td>
<td><p>enabled</p></td>
<td><p>used in Shining Lights Even in Death to make dying soldier fire his pistol</p></td>
</tr>
<tr class="even">
<td><p>SetEmblemType</p></td>
<td><p>type</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetEnabled</p></td>
<td><p>enabled, noAssignRoute</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetEnableDyingState</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetEnableHotThroat</p></td>
<td><p>enabled</p></td>
<td><p>used in Shining Lights Even in Death to set glowing throat</p></td>
</tr>
<tr class="even">
<td><p>SetEnableSendMessageAimedFromPlayer</p></td>
<td><p>enabled</p></td>
<td><p>contrary to lua, will not work for TppLiquid2</p></td>
</tr>
<tr class="odd">
<td><p>SetEquipId</p></td>
<td><p>primary, secondary, tertiary</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetEscapePosition</p></td>
<td><p>posList</p></td>
<td><p>set wondering mother base soldier flee position</p></td>
</tr>
<tr class="odd">
<td><p>SetEverDown</p></td>
<td><p>enabled</p></td>
<td><p>sets enemy permanently unconscious</p></td>
</tr>
<tr class="even">
<td><p>SetExecuteHostage</p></td>
<td><p>targetId</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetFrameDamage</p></td>
<td><p>NA</p></td>
<td><p>kills soldiers by setting them on fire</p></td>
</tr>
<tr class="even">
<td><p>SetFriendly</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetForceDisableCarried</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetForceDownStance</p></td>
<td><p>stance</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>SetForceDyingFire</p></td>
<td><p>toPlayer, toEnemy, toNone</p></td>
<td><p>used in Shining Lights Even in Death to make dying soldier fire his pistol</p></td>
</tr>
<tr class="even">
<td><p>SetForceFormationLine</p></td>
<td><p>enable</p></td>
<td><p>seems to override combat AI to force soldiers to move to and hold a pre-defined position</p></td>
</tr>
<tr class="odd">
<td><p>SetForceHoldup</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetForceRealize</p></td>
<td><p>forceRealize</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetGunLightSwitch</p></td>
<td><p>isReset, isOn, useCastShadow</p></td>
<td><p>used in Prologue to turn XOF gun lights on</p></td>
</tr>
<tr class="even">
<td><p>SetIgnoreDamageAction</p></td>
<td><p>flag</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetIgnoreDisableNpc</p></td>
<td><p>enable</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetIgnoreSupportBlastInUnreal</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetInfantry</p></td>
<td><p>setNum, vehicle, sol01, sol02, sol03</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>SetInheritanceForceRealizeToCorpse</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetInRoomRealizeMode</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetInVehicle</p></td>
<td><p>vehicle, sol01, sol02, sol03, sol04</p></td>
<td><p>used in a Quiet Exit to release soldiers from the back of APCs</p></td>
</tr>
<tr class="odd">
<td><p>SetLrrp</p></td>
<td><p>travelPlan, travelPlanStep</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetMarkerEnabledCommand</p></td>
<td><p>enabled, alwaysDisable</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetMarkerTextType</p></td>
<td><p>type, on</p></td>
<td><p>Changes text that appears above stats when marked with binoculars</p></td>
</tr>
<tr class="even">
<td><p>SetMaxLife</p></td>
<td><p>life, stamina</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetMbInterrogate</p></td>
<td><p>enableMask</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetMsfCombatLevel</p></td>
<td><p>level</p></td>
<td><p>for wandering mother base soldiers</p></td>
</tr>
<tr class="odd">
<td><p>SetNoBloodMode</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetOutOfArea</p></td>
<td><p>isOut, soldiers</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetPersonalAbility</p></td>
<td><p>ability</p></td>
<td><p>value for ability is a table which may contain the following arguments: shot, grenade, hp, cure, speed, notice, reflex, reload, holdup, fulton. Each may be assigned a value of "low", "med", "high", or "sp"</p></td>
</tr>
<tr class="even">
<td><p>SetPuppet</p></td>
<td><p>enabled</p></td>
<td><p>makes soldier a cutscene puppet (not zombie) - will not respond to most player actions</p></td>
</tr>
<tr class="odd">
<td><p>SetRelativeVehicle</p></td>
<td><p>targetId, rideFromBeginning, isMust, isVigilance</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetRestrictNotice</p></td>
<td><p>enabled</p></td>
<td><p>turns off "notice" cone of vision - can still discover player</p></td>
</tr>
<tr class="odd">
<td><p>SetRideHeliFromBeginning</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference hash: 272af721</p></td>
</tr>
<tr class="even">
<td><p>SetRouteFront</p></td>
<td><p>NA</p></td>
<td><p>used in The War Economy - possibly sets one soldier in front on a shared route</p></td>
</tr>
<tr class="odd">
<td><p>SetSaluteDisable</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetSaluteMoraleDisable</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetSaluteToCqc</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetSaluteVoiceList</p></td>
<td><p>list</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetSimpleAction</p></td>
<td><p>actionName</p></td>
<td><p>no known lua reference. valid actionName values are the same as action values found in SPCH files.</p></td>
</tr>
<tr class="even">
<td><p>SetSkull</p></td>
<td><p>enabled</p></td>
<td><p>used in Prologue</p></td>
</tr>
<tr class="odd">
<td><p>SetSlowDeadSoundEffect</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetSneakRoute</p></td>
<td><p>route, point, isRelaxed</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetSoldier2Flag</p></td>
<td><p>flag, on</p></td>
<td><p>many possible flags, some unknown ex flags: <code>highRank</code> (TppEnemy.lua) <code>inLocator</code> (s10211), <code>forceDeadMessageOwnerPlayer</code>, <code>forceDeadMessageOwnerInvalid</code>, <code>forceFriendlyMarker</code> (s10240)</p></td>
</tr>
<tr class="even">
<td><p>SetSoldier2SubType</p></td>
<td><p>type</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetSoldier2Type</p></td>
<td><p>type</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetSoundSwitchCyprusMask</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetStaffId</p></td>
<td><p>staffId</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetSwitchRouteFunc</p></td>
<td><p>func</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetTacticalTakedown</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetToHeliRecoveredComplete</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetTravelPlan</p></td>
<td><p>travelPlan</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetUnarmed</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetUseHotThroat</p></td>
<td><p>NA</p></td>
<td><p>likely dummied hash: b60f74d6</p></td>
</tr>
<tr class="even">
<td><p>SetVehicleSpecialAct</p></td>
<td><p>NA</p></td>
<td><p>used in Skull Face - plays animation where driver turns on radio</p></td>
</tr>
<tr class="odd">
<td><p>SetVip</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetVipSpecial</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetVisibleSuppressor</p></td>
<td><p>isVisible, enabled</p></td>
<td><p>used in Prologue to set suppressors on XOF</p></td>
</tr>
<tr class="even">
<td><p>SetVoiceType</p></td>
<td><p>voiceType</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetWearEquip</p></td>
<td><p>flag</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetZombie</p></td>
<td><p>enabled, isMsf, isHalf, isZombieSkin, isHagure</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetZombieUseRoute</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SpecialAction</p></td>
<td><p>action, isDisable, stance, autoFinish, enableMessage, enableGravity, enableCollision, enableDeadEnd, path, commandId, interpFrame, startFrame, startPos, startRot</p></td>
<td><p>arguments vary depending on action value. Many possible action values (e.g. PlayMotion, PlayStance, ocelot_go_heli).</p></td>
</tr>
<tr class="odd">
<td><p>StartTravel</p></td>
<td><p>travelPlan, step, enabled, keepInAlert</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>StoreToSVars</p></td>
<td><p>markerOnly, mvars, isClientSessionStart</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SwitchRoute</p></td>
<td><p>route</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>UnequipArmorHelmet</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>UnregistSwarmEffect</p></td>
<td><p>NA</p></td>
<td><p>for puppet soldiers</p></td>
</tr>
<tr class="even">
<td><p>UnsetRelativeVehicle</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>UseExtendParts</p></td>
<td><p>enabled</p></td>
<td>Used in 10240-SHINING LIGHTS for female soldiers and 10080-PITCH DARK for child soldiers. </td>
</tr>
</tbody>
</table>

TppSupplyCboxSystem

<table>
<thead>
<tr class="header">
<th><p>id argument name</p>
<p>(hash if unknown)</p></th>
<th><p>Other argument names</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>DisableRequest</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>EnableRequest</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>RestoreRequest</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>StoreRequest</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
</tbody>
</table>

TppSupportAttackSystem

<table>
<thead>
<tr class="header">
<th><p>id argument name</p>
<p>(hash if unknown)</p></th>
<th><p>Other argument names</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>DisableRequest</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>EnableRequest</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>RestoreRequest</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>StoreRequest</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
</tbody>
</table>

TppUav

| id argument name (hash if unknown) | Other argument names       | Description                                                                             |
| ---------------------------------- | -------------------------- | --------------------------------------------------------------------------------------- |
| GetMaxInstanceCount                | NA                         |                                                                                         |
| RestoreFromSVars                   | NA                         |                                                                                         |
| SetCombatGrade                     | offenseGrade, defenseGrade |                                                                                         |
| SetCombatRoute                     | route                      |                                                                                         |
| SetCommandPost                     | cp                         |                                                                                         |
| SetDevelopLevel                    | developLevel, empLevel     |                                                                                         |
| SetEnabled                         | enabled                    |                                                                                         |
| SetFriendly                        | NA                         |                                                                                         |
| SetMarkerEnabledCommand            | enabled                    |                                                                                         |
| SetPatrolRoute                     | route                      |                                                                                         |
| SetWeaponType                      | weaponType                 | Most likely sets whether it fires bullets, sleep grenades, etc. No known lua reference. |
| StoreToSvars                       | NA                         |                                                                                         |
| WarpToNearestPatrolRouteNode       | NA                         |                                                                                         |

TppVehicle2

<table>
<thead>
<tr class="header">
<th><p>id argument name (hash if unknown)</p></th>
<th><p>Other argument names</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>26a17ef3</p></td>
<td><p>NA</p></td>
<td><p>possibly GetVehicleEmptyGetOff</p></td>
</tr>
<tr class="even">
<td><p>ef20fb10</p></td>
<td><p>NA (?)</p></td>
<td><p>possibly Procedure</p></td>
</tr>
<tr class="odd">
<td><p>Annihilate</p></td>
<td><p>NA (?)</p></td>
<td><p>no known lua reference hash: 6b363ef0</p>
<p>possibly also SetObjectIdUsingRestorePosition</p></td>
</tr>
<tr class="even">
<td><p>CancelForceRailDriveSpeed</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>CancelToObserve</p></td>
<td><p>observation</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>Constrain</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Despawn</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>ForceRailDriveSpeed</p></td>
<td><p>speed</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>ForceStop</p></td>
<td><p>enabled</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>GetPosition</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>GetResourceId</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>GetRiderID</p></td>
<td><p>NA</p></td>
<td><p>can use to check who is in a vehicle and how many people are in a vehicle</p></td>
</tr>
<tr class="odd">
<td><p>GetState</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>GetVehicleType</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>IsAlive</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>RegisterConvoy</p></td>
<td><p>convoyId</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>RegisterSpecialEngineSfx</p></td>
<td><p>targetId, eventName</p></td>
<td><p>used in Skull Face</p></td>
</tr>
<tr class="even">
<td><p>Rename</p></td>
<td><p>newName, index</p></td>
<td><p>no known lua reference hash: bb73b5ce</p></td>
</tr>
<tr class="odd">
<td><p>RequestToObserve</p></td>
<td><p>observation</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>Respawn</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>RespawnVehicles</p></td>
<td><p>NA</p></td>
<td><p>no known lua reference hash: 2b7f5898</p>
<p>possibly also SetRideBackObject</p></td>
</tr>
<tr class="even">
<td><p>RestoreFromSVars</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Seize</p></td>
<td><p>options</p></td>
<td><p>removes vehicle from play and adds it to MB inventory? Argument "options" takes a table which can include the following keys: DirectAccount, CheckFultonType, Instant, Fulton, FadeOut, CheckFarFromPlayer</p></td>
</tr>
<tr class="even">
<td><p>SetBodyDamageRate</p></td>
<td><p>rate</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>SetBodyLife</p></td>
<td><p>life</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetIgnoreDisableNpc</p></td>
<td><p>enable</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>SetPosition</p></td>
<td><p>position, rotY</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>SetRealizePriority</p></td>
<td><p>priority</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>SetVehicleType</p></td>
<td><p>type, subType</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="even">
<td><p>SetWheelDamageRate</p></td>
<td><p>rate</p></td>
<td><p>no known lua reference</p></td>
</tr>
<tr class="odd">
<td><p>Spawn</p></td>
<td><p>locator, type, name, position, rotY, subType, class, paintType, emblemType, defenseValues, offenseGrades, defenseGrade, bodyLife, wheelLife, turretLife, subWeaponLife, priority, index</p></td>
<td><p>need to test that all these argument names are valid</p></td>
</tr>
<tr class="even">
<td><p>StoreToSVars</p></td>
<td><p>NA</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>UnregisterConvoy</p></td>
<td><p>convoyId</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>UnregisterSpecialEngineSfx</p></td>
<td><p>targetId</p></td>
<td><p>no known lua reference</p></td>
</tr>
</tbody>
</table>

TppVolgin2

| id argument name (hash if unknown) | Other argument names | Description                           |
| ---------------------------------- | -------------------- | ------------------------------------- |
| 8edf9ec8                           | route, point         |                                       |
| DisableCombat                      | NA                   |                                       |
| EnableCombat                       | NA                   |                                       |
| RequestAttack                      | attackType           |                                       |
| SetChasePlayerMode                 | chasePlayer          |                                       |
| SetCyprusMode                      | NA                   |                                       |
| SetFireballMode                    | enable               |                                       |
| SetForceRealize                    | forceRealize         |                                       |
| SetForceUnrealize                  | forceUnrealize       |                                       |
| SetRoute                           | route, point         |                                       |
| SetTunnelDestroyed                 | NA                   |                                       |
| ToggleCombat                       | NA (?)               | no known lua reference hash: 29e62b8e |
| Warp                               | position, rotationY  |                                       |

TppVolgin2forVr (volgin_vr)

| id argument name (hash if unknown) | Other argument names        | Description |
| ---------------------------------- | --------------------------- | ----------- |
| EnableFinalScream                  | NA                          |             |
| RequestAttack                      | attackType                  |             |
| SetEnableAiAttacking               | enable                      |             |
| SetFirewallInfo                    | firewallInfo, delay, offset |             |
| SetForceRealize                    | forceRealize                |             |
| SetForceUnrealize                  | forceUnrealize              |             |
| SetInvincibleMode                  | enable                      |             |

TppWalkerGear2 and TppCommonWalkerGear2 (some likely exclusive to one)

| id argument name (hash if unknown) | Other argument names                     | Description                                |
| ---------------------------------- | ---------------------------------------- | ------------------------------------------ |
| CountEnemyGearNearPlayer           | NA                                       |                                            |
| ForceStop                          | enabled                                  |                                            |
| GetMaxInstanceCount                | NA                                       |                                            |
| GetPosition                        | NA                                       |                                            |
| GetResourceId                      | NA                                       |                                            |
| IsBroken                           | NA                                       |                                            |
| IsEnemyRiding                      | NA                                       |                                            |
| IsFultonCaptured                   | NA                                       |                                            |
| IsPlayerRiding                     | NA                                       |                                            |
| NoRideOn                           | enabled                                  |                                            |
| RestoreFromSVars                   | NA                                       |                                            |
| SetColoringType                    | type                                     |                                            |
| SetCombatGrade                     | defenseValue, offenseGrade, defenseGrade |                                            |
| SetExtraPartsForSpecialEnemy       | enabled                                  | Used to set appearance to Huey's prototype |
| SetIgnoreDisableNpc                | enabled                                  |                                            |
| SetMainWeapon                      | weapon                                   |                                            |
| SetMarkerEnabledCommand            | enabled                                  |                                            |
| SetMaxLife                         | life                                     |                                            |
| SetPosition                        | pos, rotY                                |                                            |
| StoreToSVars                       | NA                                       |                                            |

TppWolf, TppJackal

| id argument name (hash if unknown) | Other argument names              | Description |
| ---------------------------------- | --------------------------------- | ----------- |
| ChangeDeadState                    | position, degRotationY            |             |
| SetAnimalId                        | name, animalId                    |             |
| SetEnabled                         | name, enabled                     |             |
| SetHerdEnabledCommand              | name, type, position, route, flag |             |
| SetIgnoreDisableNpc                | enabled                           |             |
| SetIgnoreNotice                    | isPlayer, isSoldier, isHostage    |             |
| SetKind                            | name, fv2Index                    |             |
| SetNoticeDistance                  | name, distance                    |             |

TppZebra

| id argument name (hash if unknown) | Other argument names                 | Description |
| ---------------------------------- | ------------------------------------ | ----------- |
| SetAnimalId                        | name, animalId                       |             |
| SetEnabled                         | name, enabled                        |             |
| SetHerdEnabledCommand              | name, type, position, route, isForce |             |
| SetIgnoreDisableNpc                | enabled                              |             |
| SetIgnoreNotice                    | isPlayer, isSoldier, isHostage       |             |
| SetKind                            | name, fv2Index                       |             |
| SetNoticeEnabled                   | name, enabled                        |             |

Invalid

| id argument name (hash if unknown) | Other argument names | Description     |
| ---------------------------------- | -------------------- | --------------- |
| DEBUG_ChangeChimeraWeapon         | chimeraInfo          | for debug only? |
| DEBUG_ChangeEquip                 | equipId              | for debug only? |
| ExecuteScriptAll                   | command              | for MGO only    |

## Sources

<https://github.com/unknown321/mgsvdump/blob/master/tpp/sequences/commands_for_sequences.lua>
