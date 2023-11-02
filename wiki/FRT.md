---
title: FRT
permalink: /FRT/
tags: [File Formats, Routes, Missions]
---

The .frt format is a binary file format used in GZ and TPP to store an
AI route set. A route set contains a number of
[routes](/Route), which dictate AI movement and behavior.

There is a file format implementation in [FoxLib](/FoxLib).

frt files can be opened and created with [FoxKit](/FoxKit).
Further info
[here](https://github.com/youarebritish/FoxKit/wiki/Working-with-Route-Builder).

## Usage

Each quest and each mission can load a single frt file at a time. Some
missions have more than one frt, but in different fpks, so only one of
them is loaded at a time. A given AI agent is assigned a number of
routes, and which one it's currently using is dependent upon the alert
state:

  - Sneak route: Used when the agent's CP is unaware of the player.
  - Caution route: Used when the encampment is on alert.
  - Alert route: Used during combat alert. Combat AI usually uses a
    unique system, however, so having an alert route defined is rare.

You can change an agent's sneak route in Lua by calling:

`GameObject.SendCommand(gameObjectId, { id="SetSneakRoute", route=routeId })`

where gameObjectId is the GameObject's ID (obtained through calling
GameObject.GetGameObjectId) and routeId is the name of the desired
route, for instance, rts_ptr_e_citadel_W_0000. The caution and
alert routes can be changed the same way, using "SetCautionRoute" and
"SetAlertRoute" respectively.

For a detailed description of the route system, see the article on
[routes](/Route).

## Format

There are two known frt formats: one used in GZ and one used in TPP. The
GZ format uses a packed World Space Vector3 in a uint64 with an origin point in the header.

### Header

  - 0x0 - 0x3 (string): 'ROUT' format signature.
  - 0x4 - 0x5 (uint16): Version number. 3 for TPP, 2 for GZ.
  - 0x6 - 0x7 (uint16): Route count.
  
  If version is GZ:
  - 0x0 - 0x7: Skipped.
  - 0x8 - 0x13 (Vector3Float): World space origin point. 
  - 0x14 - 0x17: Skipped.
  
  If end.
  
  - 0x0 - 0x3 (uint32): Route IDs offset.
  - 0x4 - 0x7 (uint32): Route definitions offset.
  - 0x8 - 0xB (uint32): Route node positions offset.
  - 0xC - 0xF (uint32): Route node event tables offset.
  - 0x10 - 0x13 (uint32): Events offset.
  
  If version is GZ:
  - 0x0 - 0x7: Skipped.
  
  If end.

The header is followed by the route IDs, of which there is one for each
route. A route ID is a StrCode32 hash, and is the name the route is
referred to by in Lua or route event parameters.

### Route definitions

After the route IDs are the route definitions, of which there is one for
each route. The offsets listed in each entry are relative to the entry's
own offset. In other words, add the offset for the route definition to
its component offsets in order to find the data that they point to.

#### Route definition struct

  - 0x0 - 0x3 (uint32): Initial node offset.
  - 0x4 - 0x7 (uint32): Initial node event table offset.
  - 0x8 - 0xB (uint32): Initial node event offset.
  - 0xC - 0xD (uint16): Number of nodes.
  - 0xE - 0xF (uint16): Number of events.

### Node positions

This section contains the node positions in sequential order. The first
route's node positions are stored here, then the second route's node
positions, and so on. The GZ version packs its node positions into uint64.

#### Node position struct

  If version is GZ:
  - 0x0 - 0x7 (uint64): A packed Vector3 added onto the origin point.

The first 21 bits are the x coordinate, with the most significant bit, 21, serving as the sign. The same follows for the next 19 bits for for the y coordinate and the rest of the 21 bits for the z coordinate. Finally, each are divided by 1024, and added onto the origin point Vector3 world position.

  If version is TPP:
  - 0x0 - 0x3 (float): World space position, x coordinate.
  - 0x4 - 0x7 (float): World space position, y coordinate.
  - 0x8 - 0xB (float): World space position, z coordinate.

### Node event tables

This section contains metadata for each node linking it to its events.
There is one entry for each node.

#### Node event table struct

  - 0x0 - 0x1 (uint16): Event count.
  - 0x2 - 0x3 (uint16): Edge event index. This is the index of the
    node's initial event (which is also its edge event), from the start
    of the route's event list.

Contrary to what you might expect, the edge event index is an index into
the *route*'s event list, not the *routeset*'s. In other words, it will
always be 0 for the first node in a route, and will increment for each
subsequent node by its event count.

### Events

This section contains all of the events in sequential order. The first
node's events are stored here, then the second node's events, and so on.
The first event in each node's event list is its edge event.

#### Event struct

  - 0x0 - 0x3 (uint32): StrCode32 hash of the event type.
  - 0x4 (uint8): Node Bool. 1 if Node event, 0 if Edge event.
  - 0x5 (uint8): Aim Point Enum.
  - 0x6: Empty.
  - 0x7 (uint8): Loop Bool. 1 if the agent should loop on this event.
  - 0x8 - 0x9 (uint16): Wait time, in frames, minus one. 0 on Edge events.
  - 0xA - 0xB (int16): Facing direction. 0 on Edge events.
  
  If version is GZ:
  - 0x0 (uint8): Inverse of the Node Bool: 255 if Node event, 0 if Edge event.
  
  If end.
  
  - 0x0 - 0x3 - Aim Point param 1.
  - 0x4 - 0x7 - Aim Point param 2.
  - 0x8 - 0xB - Aim Point param 3.
  - 0xC - 0xF - Aim Point param 4.
  - 0x10 - 0x13 - Event Type param 1.
  - 0x14 - 0x17 - Event Type param 2.
  - 0x18 - 0x1B - Event Type param 3.
  - 0x1C - 0x1F - Event Type param 4.
  
  If version is TPP:
  - 0x0 - 0x3 (string): Memory leak string on PC, skipped.
  
  If end.

##### Aim Point param types

One of the following Aim Point Param sets will be used based on the Aim Point Enum.

##### No Target (0)

All params are zero. The route agent has no aim target.

##### Static Point (1)

The route agent uses a world space point as an aim target.
  - Param 1 (float): World space x coordinate.
  - Param 2 (float): World space y coordinate.
  - Param 3 (float): World space z coordinate.

##### Character (2)

The route agent uses a character id as an aim target. Examples of the strings hashed here include "Player" for the player, and GameObjectLocator entity names, like "SupportHeli" or "hos_quest_0000".
  - Param 1 (uint32): StrCode32 hash of the character id.
  - Param 2: Skipped, but a 64-bit leftover of the hash is often written here.

##### Route as Sight Move Path (3)

The route agent uses a special route as an aim target. If the hash is of an empty string, "", it will be skipped.
  - Param 1 (uint32): StrCode32 hash of the route name.
  - Param 2 (uint32): StrCode32 hash of the route name.
  - Param 3 (uint32): StrCode32 hash of the route name.
  - Param 4 (uint32): StrCode32 hash of the route name.

##### Route as Object (4)
Very rare, and seems to be structurally identical to Route as Sight Move Path (3). Not much is known about it.

#### Event Type params

One of the following Event Type Param sets will be used based on the Event Type hash.

Here are some of the discovered event types and their known parameters:

### Edge events

## Common Vehicle

Used by VehicleBackFast, VehicleBackNormal, VehicleBackSlow, VehicleMoveFast, VehicleMoveNormal, VehicleMoveSlow and VehicleDir in TPP.

  - Param 1 (uint32): StrCode32 hash of the rail name found in .frld files.
  - Param 2 (int32): Usually zero, but may sometimes be a speed measurement in RPM.

### Node events

## IdleAct

Used by RelaxedIdleAct and CautionIdleAct in TPP.

  - Param 1 (uint32): StrCode32 hash of an animation act type.
  - Param 2: Unknown, rare, definitely not a 64 bit leftover. Not zero in s10030.frt.

## Conversation

Used in GZ.

  - Param 1 (uint32): StrCode32 hash of the name of the "conversation list" found in EnemyConversationList .json files.
  - Param 2: Skipped, but a 64-bit leftover of the hash is often written here.
  - Param 3 (uint32): StrCode32 hash of the name of the "friend" conversation partner to the route agent.
  - Param 4: Skipped, but a 64-bit leftover of the hash is often written here.

## ConversationIdle

Used in TPP.

  - Param 1 (uint32): StrCode32 hash of the "conversation label" found in .spch files.
  - Param 2 (uint32): StrCode32 hash of the name of the "friend" conversation partner to the route agent.
  - Param 3: Skipped, but a 64-bit leftover of the hash is often written here.
  - Param 4 (int32): Range integer, in world space units/meters.

## SendMessage

Used by SendMessage, and strangely by PutHostageInVehicle and TakeHostageOutOfVehicle, in TPP.

  - Param 1: Unknown.
  - Param 2 (uint32): StrCode32 hash of the message string received in Lua messages.
  - Param 3 (uint32): StrCode32 hash of a route's name for some reason.
  - Param 4: Skipped, but a 64-bit leftover of the hash is often written here.

## SwitchRoute

Used in TPP. If a route agent triggers this event, a designated Lua function will be called with the "function name" and "argument" hashes, and if it returns true, the route agent will change to the specified route. This function can be found in [TppEnemy.lua](https://github.com/TinManTex/mgsv-deminified-lua/blob/master/data1/Assets/tpp/script/lib/TppEnemy.lua).

The game's default vanilla functions only include "IsGimmickBroken", "IsNotGimmickBroken", "CanUseSearchLight" and "CanNotUseSearchLight". If the function name is not one of these four, this function will return true.

"IsGimmickBroken" checks if the argument hash is a broken gimmick with TppGimmick.IsBroken, and returns true if so, allowing the route agent to switch routes. Naturally, "IsNotGimmickBroken" simply returns the opposite. "CanUseSearchLight" similarly checks if the gimmick in the argument is not broken, and if it's currently nighttime with TppClock.GetTimeOfDay, returning true only if both are correct. "CanNotUseSearchLight" also returns the opposite here.

  - Param 1 (uint32): StrCode32 hash of the name of the route to switch to.
  - Param 2 (uint32): StrCode32 hash of the function name.
  - Param 3 (uint32): StrCode32 hash of an argument to use in the function.

## SyncRoute

Used in TPP.

Used in conjunction with [the mission's syncRouteTable](https://mgsvmoddingwiki.github.io/Mission_Table_Subscripts/#syncroutetable).

  - Param 1 (uint32): Sync table index.
  - Param 2 (int32): Sync route step index.


## Resources

  - [010 Editor
    template](https://gist.github.com/youarebritish/014633a757f8647d03e5861b3182f27c)
  - [Some research notes and data
    dumps](https://github.com/TinManTex/mgsv-lookup-strings/tree/master/RouteTool/Research)
