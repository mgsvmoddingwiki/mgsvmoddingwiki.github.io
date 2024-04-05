---
title: MG Hellbound Routes
permalink: /AI/mgs/mgs_hellroutes/
tags: [AI, Metal Gear]
---

## Hellbound Routes

Hellbound AI, unlike Dominion AI, does not use navmesh at all, it uses routes to move around.<br><br>

There is 3 types of routes for Hellbound AI: <br>

**Base Route**: Used by Sahelanthropus if the current Sneak/Caution route is far away<br>
**Sneak Routes**: Used by Sahelanthropus while its on Phase Sneak<br>
**Caution Routes**: Used by Sahelanthropus while its on Phase Caution and Phase Alert<br>

>Hellbound AI was made to operate on small areas only, making it operate on bigger areas is currently very hard since there is a limit of 128 total GeoTraps assigned to it<br>
{:.important}

>You can see the current Sahelanthropus phase by the color of its "eyes", if its blue, Sahelanthropus is on phase sneak, if its orange, Sahelanthropus is on phase caution and if its red, Sahelanthropus is on phase alert.

## How it works ?

The way routes work on Hellbound AI can be a bit confusing.<br>
To start, on the mission enemy subscript you need to assign 1 base route, 1 sneak route and 1 caution route<br>
they can be assigned with the following code:<br>

Base Route:
```lua
--1st you need to create the function, it can be like the one bellow

this.UpdateSahelanBaseRoute = function( baseRouteName )
	local gameObjectId = {type="TppSahelan2", group=0, index=0}
	local command = {id="SetBaseRoute", route=baseRouteName}
	GameObject.SendCommand(gameObjectId, command)
end

--then you need to call this function with the route you want to use as a base route
--i recommend you to call it on the "SetUpSahelan" function
--it should be something like this

this.UpdateSahelanBaseRoute( "x" )

--replace x with the ID/name of the route that you want to use
```
Caution and Sneak routes:
```lua
--1st you need to create the function, it can be like the one bellow

this.SetSahelanRoute = function( sneakRouteName, cautionRouteName )
	local gameObjectId = {type="TppSahelan2", group=0, index=0}
	local command1 = {id="SetSneakRoute", route=sneakRouteName}
	GameObject.SendCommand(gameObjectId, command1)
end

--then you need to call this function with the routes you want to use as sneak and caution when the mission starts
--i recommend you to call it on the "SetUpSahelan" function
--it should be something like this

this.SetSahelanRoute( "x", "y" )

--replace x with the ID/name of the route that you want to use for sneak
--replace y with the ID/name of the route that you want to use for caution
```


### How are routes updated while in-game?

While in-game, the routes for Hellbound AI are updated with geotraps.<br>
Every time one geotrap that is assigned to Sahelanthropus is activated by player, the game will check what routes are assigned to the geotrap and update them.

>Updating the base route with Sahelanthropus active is a bad idea.
{:.important}

Caution and Sneak routes:
```lua

--this function can be a bit hard to understand.
this.UpdateSahelanRoute = function( trapName )
	local sahelanRouteTable = this.sahelanRouteTable
	local ignoreTrapList = this.ignoreTrapList

--basically starts by checking if the geotrap that got activated is assigned to ignoreTrapList

--if it is, it checks if SahelanCounter is bigger then SAHELAN_WEAKENING_COUNT
--SahelanCounter starts at 0 and its increased every time Sahelanthropus goes into phase_alert
--SAHELAN_WEAKENING_COUNT is originaly set to 2

--that means if Sahelanthropus goes into phase_alert 3 or more times
--the geotraps present on ignoreTrapList will be igored by it.

--you can modify SAHELAN_WEAKENING_COUNT value to your liking

	for k, ignoreTrap in pairs(ignoreTrapList) do
		if trapName == ignoreTrap and this.SahelanCounter > SAHELAN_WEAKENING_COUNT then
			return
		end
	end

--here it checks if the activated geotrap matches a geotrap assigned on sahelanRouteTable

-- v[1] is sneak route and v[2] is caution route

--this is a fuction that i created since the origianal one updates both sneak and caution
--at the same time for all geotraps assigned

--this function allows you to update either both routes at once or only update the sneak/caution route.
--It requires one route on the dataset called rt_shln_Null, otherwise it wont work

	for k, v in pairs(sahelanRouteTable) do
		--if none are are null, means both have routes assigned, both routes are updated
		if v[1] ~= "rt_shln_Null" and v[2] ~= "rt_shln_Null" then 
				if k == trapName then		
					this.SetSahelanRoute( v[1], v[2] )
					return	
				end
		--if both are null, nothing is done
		elseif v[1] == "rt_shln_Null" and v[2] == "rt_shln_Null" then 
				if k == trapName then	
					return	
				end
		--if caution route is null and sneak is not, only sneak route is updated
		elseif v[1] ~= "rt_shln_Null" and v[2] == "rt_shln_Null" then 
			if k == trapName then	
					this.SetSahelanSneakRoute(v[1])
					return	
			end
		--if caution route is not null and sneak is, only caution route is updated
		elseif v[1] == "rt_shln_Null" and v[2] ~= "rt_shln_Null" then 
			if k == trapName then	
					this.SetSahelanCautionRoute(v[2])
					return	
			end
		else
			InfCore.DebugPrint("this should not happen")	
		end	

	end	
end

--this functions also need to be inside the script since the function above depends on them

--only updates caution route
this.SetSahelanCautionRoute = function( cautionRouteName)
	local gameObjectId = {type="TppSahelan2", group=0, index=0}
	local command1 = {id="SetCautionRoute", route=cautionRouteName}
	GameObject.SendCommand(gameObjectId, command1)
end

--only updates sneak route
this.SetSahelanSneakRoute = function( sneakRouteName)
	local gameObjectId = {type="TppSahelan2", group=0, index=0}
	local command1 = {id="SetSneakRoute", route=sneakRouteName}
	GameObject.SendCommand(gameObjectId, command1)
end

--updates both sneak and caution route
this.SetSahelanRoute = function( sneakRouteName, cautionRouteName )
	local gameObjectId = {type="TppSahelan2", group=0, index=0}
	local command1 = {id="SetSneakRoute", route=sneakRouteName}
	GameObject.SendCommand(gameObjectId, command1)
end

```

### how are Geotraps assigned to Sahelanthropus ?

>You need to know how Geotraps work and how they are created and managed on Foxkit, im not going to be explaining that here
{:.important}

First you need a dataset with the geotraps you want to use. the geotrap must have the following parameters:<br>

- GeoModuleCondition Params
	- flags: `7`
	- trapCategory:
	- trapPriority: `0`
	- enable: `true`
	- isOnce: `false`
	- isAndCheck: `true`
	- checkFuncNames: `IsPlayer`
	- execFuncNames: 
	- checkCallbackDataElements: `TppTrapCheckIsPlayerCallbackDataElement`
		- funcName: `IsPlayer`

Geotrap entity Parameters:
![Make sure the Geotrap Entity is enabled](/assets/AI/images/mgs/hellgeotrap.png)

GeoModuleCondition Parameters:
![](/assets/AI/images/mgs/hellgeotrap_01.png)

TppTrapCheckIsPlayerCallbackDataElement Parameters:
![](/assets/AI/images/mgs/hellgeotrap_02.png)

Geotraps are assigned with Sahelanthropus like showed bellow: 
```lua

--1st Create the table for the geotraps
this.sahelanRouteTable = {
	-- to assign the geotrap, you need to add its name + 2 routes
	-- the 1st one will be sneak route and 2nd one will be caution

	--examples: 

	--this one will only update sneak route
	trap_shln_RoadToOKB0001 = { "rt_shln_SBtoOKB_s_0015", "rt_shln_Null", },

	--this one will only update caution route
	trap_shln_RoadToOKB0002 = { "rt_shln_Null", "rt_shln_SBtoOKB_c_0020", },

	--this one will update both caution and sneak routes
	trap_shln_area3010 = { "rts_shln_s_3010", "rts_shln_c_3010" },
}
```
>You cant load only 1 route on a Assigned Geotrap, it wont work, using the function i created above with `rt_shln_Null` is just a workaround for that
{:.important}

the name of the geotrap assigned on the script needs to be the name of that geotrap on the dataset
![](/assets/AI/images/mgs/hellgeotrap_03.png)

if everything is done correctly, every time the geotrap is triggered the game will update the routes with the routes assigned to the geotrap.

{% include youtube id="02Z1byWcZMQ" %}
