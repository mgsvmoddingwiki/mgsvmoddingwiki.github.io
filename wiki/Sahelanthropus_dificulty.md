---
title: ! 'Sahelanthropus dificulty'
tags: [Guides, Missions]
permalink: /Sahelanthropus_difficulty.md/
---

# Sahelanthropus Health Points and Attack Speed/Damage

## defining Sahelanthropus Health Points
Sahelanthropus Health Points can be changed on the enemy.lua, see the original data below

```lua
local SAHELAN_MAX_LIFE = 23000*1.5

this.sahelanLifeTable = {
	Body 	=	12000,	 -- Body
	Bp 		=	840,	 -- ???
	Head 	=	3000,	 -- Head
	ArmR 	=	840,	 -- Right Arm
	ArmL 	=	840,	 -- Left Arm
	ThighR 	=	840,	 -- Right Thigh
	ThighL 	=	840,	 -- Left Thigh
	LegR 	=	840,	 -- Right Leg
	LegL 	=	840,	 -- Left Leg
	RGun	=	1200,	 -- RailGun
	Ldr 	=	840,	 -- ???
	Tnk		=	840,	 -- ???
	Shield 	=	SAHELAN_MAX_LIFE * 0, -- Value Does not matter since the shield is disabled on the .exe
	PTLF 	=	96,  	 -- Left Front White Cilynder
	PTRF 	=	96,		 -- Right Front White Cilynder
	PTLB 	=	96,		 -- Left Back White Cilynder
	PTRB 	=	96,		 -- Right Back White Cilynder
}
```

You can add more health points on Sahelanthropus by changing the values in front of the part names, the **local SAHELAN_MAX_LIFE** variable must be equal or more than his parts health points sum

For example 
```lua
local SAHELAN_MAX_LIFE = 41310

this.sahelanLifeTable = {
	Body 	=	22000,	
	Bp 		=	1450,	
	Head 	=	4100,	
	ArmR 	=	1200,
	ArmL 	=	1200,	
	ThighR 	=	1200,	
	ThighL 	=	1200,	
	LegR 	=	1200,	 
	LegL 	=	1200,	 
	RGun	=	3200,	 
	Ldr 	=	1200,	 
	Tnk		=	1200,	 
	Shield 	=	0, 
	PTLF 	=	240,  	 
	PTRF 	=	240,		
	PTLB 	=	240,		 
	PTRB 	=	240,		 
}
```
    
The health points on each part, defines when that same part explodes during the boss fight, when the health points drop to 0.

## Defining Sahelanthropus Attack damage and speed

Sahelanthropus Attack damage and speed are controled by **TYPE_OKB** Variable, example:

```lua
this.SetUpSahelan = function()

local TYPE_OKB = 2 

local missionName = TppMission.GetMissionName()

local gameObjectId = {type="TppSahelan2", group=0, index=0}
local command = {
	id = "SetStageType",
	index = TYPE_OKB, 
}
GameObject.SendCommand( gameObjectId, command )

if mvars.isNormal then
	this.SetSahelanLife(SAHELAN_MAX_LIFE)
	this.SetSahelanPartsLife(this.sahelanLifeTable)
else -- does not work
	this.SetSahelanLife(SAHELAN_MAX_LIFE_EX)-- does not work
	this.SetSahelanPartsLife(this.sahelanLifeTableEx)-- does not work

	local gameObjectId = {type="TppSahelan2", group=0, index=0}
	local command = { id = "SetCombatGrade", defenseValue=60000, defenseValueForWeakPoint=20000, offenseGrade=6, defenseGrade=2 }
	GameObject.SendCommand(gameObjectId, command)
end

this.SetSahelanLife = function(slife)
	local gameObjectId = {type="TppSahelan2", group=0, index=0}
	local cmdSetLife = { id = "SetMaxLife", life = slife } 
	GameObject.SendCommand( gameObjectId, cmdSetLife )
end

this.SetSahelanPartsLife =function(sahelanLifeTable)
	for partsName,partsLife in pairs ( sahelanLifeTable ) do

		local gameObjectId = {type="TppSahelan2", group=0, index=0}
		local command = { id = "SetMaxPartsLife", parts = partsName, life = partsLife }
		GameObject.SendCommand( gameObjectId, command )
	end
end
 ```   
  
In order to change is Attack damage and speed you must change the value of **TYPE_OKB**

```lua
TYPE_OKB = 1 -- Normal Speed/damage
TYPE_OKB = 2 -- Extreme Speed/damage    
```

After you made all your changes, save the file and thats it.

### Notes

**Only Integer Values work**, no Decimal or Strings in his Life Table and **SAHELAN_MAX_LIFE** Variable.

I have made Multiple tests to trigger Normal / Extreme mode using the mission code and no luck.
**mvars** Variable is an boolean, its used on sequence.lua, i made multiple tests and no change.

I only tested 1 and 2 as **TYPE_OKB** Values, others probably wont work since that is probably controled on the game .exe
