---
title: FRT
permalink: /FRT/
tags: [File Formats, Routes, Missions]
---

The .frt format is a binary file format used in GZ and TPP to store an
AI route set. A route set contains a number of
[routes](/route "wikilink"), which dictate AI movement and behavior.

There is a file format implementation in [FoxLib](/FoxLib "wikilink").

frt files can be opened and created with [FoxKit](/FoxKit "wikilink").
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
[routes](/route "wikilink").

## Format

There are two known frt formats: one used in GZ and one used in TPP. The
GZ format has not yet been reversed, so this format specification refers
exclusively to TPP.

### Header

  - 0x0 - 0x3 (string): 'ROUT.' Format signature.
  - 0x4 - 0x5 (uint16): Version number. 3 for TPP.
  - 0x6 - 0x7 (uint16): Route count.
  - 0x8 - 0xB (uint32): Route IDs offset.
  - 0xC - 0xF (uint32): Route definitions offset.
  - 0x10 - 0x13 (uint32): Route node positions offset.
  - 0x14 - 0x17 (uint32): Route node event tables offset.
  - 0x18 - 0x1B (uint32): Events offset.

The header is followed by the route IDs, of which there is one for each
route. A route ID is a StrCode32 hash, and is the name the route is
referred to by in Lua.

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
positions, and so on.

#### Node position struct

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

  - 0x0 - 0x1 (uint32): StrCode32 hash of the event type.
  - 0x2 - 0xB: Event parameters. The contents vary depending on event
    type.
  - 0xC - 0xF (string): Unknown. A plaintext snippet associated with the
    event.

## Node events

A route node event has an event type and 10 parameters, most of which
are 0. The parameters that an event takes vary depending on the event
type.

Here are some of the discovered event types and their known parameters:

### RelaxedWalk

  - Params: None
  - The most common edge event.

### 104983832  

  - Name: "None"
  - Example: f30010.frt
  - Params: None known

### 2265318157  

  - Name: "SendMessage"
  - Example: f30010.frt
  - Params\[0\]: bool
  - Params\[1\]: Hash (e.g., 3531407419)
  - Params\[6\]: Hash?
  - Params\[7\]: Hash (e.g., 1889384352)
  - Params\[8\]: Hash (e.g., 3205930904)

### 561913624

  - Name: "Wait"
  - Example: f30010.frt
  - Params\[0\]: bool
  - Params\[1\]: Hash (e.g., 1108738227)
  - Params\[6\]: bool?

### 561913624

  - Name: "Move"
  - Example: f30010.frt
  - Params: None

### 1500257626

  - Name: Unknown
  - Example: f30010.frt
  - Params\[10\]: Hash?

### 357669894

  - Name: Unknown
  - Params\[10\]: Hash, or 0

### 2628821024

  - Name: Unknown
  - Example: mafr_common.frt
  - Params\[0\]: bool
  - Params\[1\]: Hash (e.g., 4255711291)
  - Params\[10\]: Hash (e.g., 1685021218) or 0

### 518500859

  - Name: Unknown
  - Example: mafr_common.frt
  - Params\[0\]: bool
  - Params\[1\]:Hash (e.g., 500629563)

### 3396619717

  - Name: Unknown
  - Example: mafr_common.frt
  - Params\[0\]: bool
  - Params\[1\]: Hash (e.g., 3786145851)

### 2445979707

  - Name: Unknown
  - Params\[0\]: bool
  - Params\[1\]: Hash (e.g., 2428895291)

### 2343446301

  - Name: Unknown
  - Params\[0\]: bool
  - Params\[1\]: Hash (e.g., 3733192763)

### 518500859

  - Name: Unknown
  - Params\[0\]: bool
  - Params\[1\]: Hash (e.g.,500629563)

### 1375828191

  - Name: Unknown
  - Params\[0\]: bool
  - Params\[1\]: Hash (e.g., 351469627)
  - Params\[6\]: Integer (Angle? Seen values 0, 60, 90, 120)

### 1530489467

  - Name: Unknown

### 1432398056

  - Name: Unknown
  - Example: f30010.frt
  - Params\[0\]: bool
  - Params\[1\]: Integer

### 3942535391

  - Name: Unknown
  - Example: f30010.frt
  - Params\[0\]: Hash (e.g., 16777217)
  - Params\[1\]: Hash (e.g., 3575906363)

### 4019510599

  - Name: Unknown
  - Example: f30010.fr
  - Params\[0\]: Hash (e.g., 16777217)
  - Params\[1\]: Hash (e.g., 960704211)
  - Params\[6\]: Hash (e.g., 911690047)

### 3487140098

  - Name: Unknown
  - Params\[6\]: Hash (e.g., 2845408250)

## Resources

  - [010 Editor
    template](https://gist.github.com/youarebritish/014633a757f8647d03e5861b3182f27c)
  - [Some research notes and data
    dumps](https://github.com/TinManTex/mgsv-lookup-strings/tree/master/RouteTool/Research)
