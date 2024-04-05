---
title: MG Dominion Routes
permalink: /AI/mgs/mgs_DomRoutes/
tags: [AI, Metal Gear]
---
## What are routes used for on Dominion AI ?

The Base route for Dominion AI is used for the Mantis jump attack.

>the Boss fight wont work without one base route assigned.
{:.important}

## How to manage Base Routes for Dominion AI

Unlike Hellbound AI, where routes need to be manually activated with geotraps, routes for Dominion AI are much easier to manage since it only uses one.

### Managing routes with Foxkit

Start by creating a Routeset on foxkit and inside that routeset create the route, for Dominion AI i recommend you to:
>keep it only for roads and wide areas<br>
>Make sure there is a big space between nodes<br>
>Always remember that Sahelanthropus wont follow the route, it will only use the route nodes as an reference point for the mantis jump attack

As an example, im going to make a route inside Nova Braga Airport like the one bellow: 

![The yellow line represents the route](/assets/AI/images/mgs/shln_Domroute.png)

>Use edge event type `Run Walk` for Dominion Base route
{:.important}

After you finish creating the route, export the dataset and make sure it will be loaded on the mission pack

### Assign a base route on the mission scripts

In order to make the boss fight start without any issue, you need to assign a base route to Sahelanthropus. The base route can be assigned with the next command on the enemy subscript: 

```lua
local gameObjectId = {type="TppSahelan2", group=0, index=0}
local command = {id="SetBaseRoute", route="ROUTE NAME HERE"}
GameObject.SendCommand(gameObjectId, command)
```
In this example, im going to be loading one route, one named `rt_shln_Africa_b_0000`, on Nova Braga Airport and it will be assigned on the enemy subscript with the command bellow.

```lua
local gameObjectId = {type="TppSahelan2", group=0, index=0}
local command = {id="SetBaseRoute", route="rt_shln_Africa_b_0000"}
GameObject.SendCommand(gameObjectId, command)
```

During the Boss fight, the assigned route nodes will be used by Sahelanthropus on the Mantis Jump Attack, the order of the nodes does not mater since Sahelanthropus wont follow the route order at all.<br>

Keep in mind that Sahelanthropus will only use the Mantis Jump Attack after the game returns the message `SahelanReturned1stRailGun`, and of course the player needs to be near a route node.

>The route will also be used if the player is on a area without navmesh for Sahelanthropus.