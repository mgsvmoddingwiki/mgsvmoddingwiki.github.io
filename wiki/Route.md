---
title: Route
permalink: /Route/
---

In TPP and GZ, the **route system** governs the behavior of AI agents
such as soldiers. Routes are stored in route sets, defined in
[FRT](/FRT "wikilink") files.

## Overview

A route is a linear sequence of nodes, each of which has a location in
space. An agent acting along a route will travel from node to node, and
upon reaching the end of the route, they will return to the first node
and the route will repeat.

Although each agent only acts along one route at a time, multiple agents
may patrol the same route together. In addition, an AI agent is assigned
a number of routes, and which one they use at a given moment is dictated
by the alert status:

  - Sneak route: Used when the agent's CP is unaware of the player.
  - Caution route: Used when the encampment is on alert.
  - Alert route: ???

You can change an agent's sneak route in Lua by calling:

`GameObject.SendCommand(gameObjectId, { id="SetSneakRoute", route=routeId })`

where gameObjectId is the GameObject's ID (obtained through calling
GameObject.GetGameObjectId) and routeId is the name of the desired
route, for instance, rts_ptr_e_citadel_W_0000. The caution and
alert routes can be changed the same way, using "SetCautionRoute" and
"SetAlertRoute" respectively.

## Events

The most complex aspect of the route system are route events, and they
are still not fully understood. There are two classes of route events:

  - Node events are performed once an agent has arrived at a node.
  - Edge events are performed while an agent is on their way to a node.

An example of a node event is CautionStandIdleReady, which causes the
agent to stand idle in the caution stance. An example of an edge event
is RelaxedWalk, which causes the agent to walk in a leisurely way to the
node.

One of the most versatile node events is SendMessage, which can trigger
a message in Lua, allowing you to write custom code to invoke whenever
an agent arrives at that node.

As each event has different parameters, and not all of the event names
have been discovered yet, this is still an area of active research. If
interested, consider using
[FoxLib](https://github.com/youarebritish/FoxLib) to unpack, edit, and
create frt files to experiment with routes.