---
title: Create a Custom Mission
permalink: /Create_Custom_Mission/
tags: [Guides, Mission Design]
---

This guide will help you create an empty working mission.  
And will require the mission to be packed using [MakeBite](https://www.nexusmods.com/metalgearsolidvtpp/mods/106).  
As well as a tutorial on [how to use it MakeBite](https://mgsvmoddingwiki.github.io/SnakeBite_Mod_Manager/#makebite)

# Creating the Mod Folder

there are two main folders for each custom mission, Assets and GameDir (Game Directory)  
Here is a ready mission that can be used as a base to make any mission.  
https://drive.google.com/file/d/1DFVEL_g7R0glkKKQvlua4L2qM3XMSEYa/view?usp=sharing

![Mod Folder Example](/assets/Create_Custom_Mission/Main_Mod_Folders.png)

## GameDir folder Setup

GameDir will have `lua` files that will act as the heart of our mission, it will add the mission's core "area" pack.  
and in order for [Infinite Heaven](https://www.nexusmods.com/metalgearsolidvtpp/mods/45) we need to set that lua file in a specific path.

![External Lua Path](/assets/Create_Custom_Mission/GameDir_Path.png)  

### Lua file contents
This is as basic as an external lua can get, below the code, will check what each variable do. 

```lua
local this = {}
    this.missionCode = 13000
    this.location = "AFGH"
    this.hideMission = false

    this.packs = function(missionCode)
        --Common packs:
        TppPackList.AddLocationCommonScriptPack(missionCode)
        TppPackList.AddLocationCommonMissionAreaPack(missionCode)

        --Mission pack (has to be last):
        TppPackList.AddMissionPack"/Assets/tpp/pack/mission2/custom_story/FPK_Name_Example.fpk"--The mission's core "area" pack
    end


    this.enableOOB = true --Enable out of bounds system (innerZone, outerZone, hotZone)
    this.missionMapParams={
        --Normal mission area zones as they appear on the iDroid
        --The actual in-game check traps are in .trap files.
        missionArea2 = {
            --Leaving the innerZone will only warn the player that they're leaving
            {
                name="trig_innerZone",
                vertices =
                {
                    Vector3(-58.000,315.000,1764.000),
                    Vector3(-238.000,321.000,2445.000),
                    Vector3(768.000,289.000,2486.000),
                    Vector3(653.000,353.000,1824.000),

                }
            }
            --Leaving the outerZone will actually trigger the mission clear/abort
            --Commented out as it will be be displayed alongside the innerZone otherwise
            --[[
            {
				name="trig_outerZone",
            	--.trap only:
				--minY=-213.1406,maxY=1299.037,
                vertices =
                { 
                    Vector3(-58.000,315.000,1764.000),
                    Vector3(-238.000,321.000,2445.000),
                    Vector3(768.000,289.000,2486.000),
                    Vector3(653.000,353.000,1824.000),

                } 
			},
			]]
        },
		--Hot zone as it appears on the iDroid
        safetyArea2 = {
			{
				name="trig_hotZone",
				vertices =
				{
                    Vector3(-58.000,315.000,1764.000),
                    Vector3(-238.000,321.000,2445.000),
                    Vector3(768.000,289.000,2486.000),
                    Vector3(653.000,353.000,1824.000),

				},
			},
		},
        missionStartPoint = {
            point = Vector3(418.33,278.22,2261.37),
		},
        heliLandPoint = {
    		{
                point=Vector3(418.33,278.22,2261.37),startPoint=Vector3(418.33,278.22,2261.37),routeId="lz_drp_field_I0000|rt_drp_field_I_0000"
            },
            {
                point=Vector3(141.47,275.51,2353.44),startPoint=Vector3(141.47,275.51,2353.44),routeId="lz_drp_fieldWest_S0000|rt_drp_fiieldWest_S_0000"
            },

		},
        -- Sortie/mission prep screen feature flags
        heliSpaceFlags = {
    		SkipMissionPreparetion = false,   --No sortie prep, like vanilla Mother Base.
    		NoBuddyMenuFromMissionPreparetion = false,    -- No buddy select in the sortie
   			NoVehicleMenuFromMissionPreparetion = false,    -- No vehicle select in the sortie
    		DisableSelectSortieTimeFromMissionPreparetion = false,    -- Only ASAP as deployment time option
  		},
    }


return this
```

#### missionCode

MissionCodes or missionIds are used in MGSV to identify missions in .lua and file names. Main missions fall into 6 main categories in 10k ranges.

    Story: 10k
    Extra: 20k
    Free: 30k
    Heli: 40k
    Online: 50k
    Shows/Select: 60k

The missionCode is seemingly stored as an unsigned short integer, so it runs out at its max value. Hard story missions (extreme, total stealth, subsistence) have a mission code 1k higher than the original mission.

> **Note for mission authors:** Due to how the engine uses missionCodes must be unique for each mission. So if you are creating missions you should make sure you don't conflict with existing ones, and update this page with the ids you intend to use.

Detailed information about [missionCode](https://mgsvmoddingwiki.github.io/MissionCodes/)

#### location

A string value location tthat is a part of the system that represents a map/playspace. For a
given location there may be one or more
Missions

See also [Custom Locations List](https://mgsvmoddingwiki.github.io/Custom_Locations_List/)

Detailed information about [Locations](https://mgsvmoddingwiki.github.io/Locations/)

#### hideMission

A boolean value that makes the mission hidden if set to `true`, it can be later opened using `TppStory.SetMissionOpenFlag`.
Here is a full example of a moudle that opens a hidden custom mission.

It check if that mission with the Uniqe missionCode `13105` has been cleared, if so open the other mission with the missionCode `13106`
```lua
local this = {}

function this.Init(missionTable)
	if TppMission.IsFOBMission(vars.missionCode) then
		return
	end

    if TppStory.IsMissionCleard(13105) then
		TppStory.SetMissionOpenFlag(13106,true)
    else
        TppStory.SetMissionOpenFlag(13106,false)
	end
end

return this
```

Main Vanilla missions can also be checked if it's clear, creating a unique story proggrestion!

#### `this.packs = function(missionCode)`
    
This function will contain the packs that will be added for the mission.

This is as basic as it can get
```lua
this.packs = function(missionCode)
    --Common packs:
    TppPackList.AddLocationCommonScriptPack(missionCode)--[locationName]_script.fpk
    TppPackList.AddLocationCommonMissionAreaPack(missionCode)--enemies, heli, decoys, etc.
    
    --Mission pack (has to be last):
    TppPackList.AddMissionPack"/Assets/tpp/pack/mission2/custom_story/FPK_Name_Example.fpk"--The mission's core "area" pack
end
```

#### enableOOB
A boolean value that will enable out of bounds system (innerZone, outerZone, hotZone).  

#### missionMapParams

is a table that containts other tables that will have information about differnant things like the mission area,
mission start point and heli land points.

##### missionArea2
Normal mission area zones as they appear on the iDroid, the actual in-game check traps are in a `.trap` file.  
and leaving it will **only warn** the player that they're leaving.
More info about [.trap](https://mgsvmoddingwiki.github.io/TRAP/).

**You can get the coordinates using Infinite heaven by holding the Call Button and the Stance button.**

```lua
 missionArea2 = {
     {
        name="trig_innerZone",
        vertices =
        {
            Vector3(-58.000,315.000,1764.000),
            Vector3(-238.000,321.000,2445.000),
            Vector3(768.000,289.000,2486.000),
            Vector3(653.000,353.000,1824.000),
        }
    }
     --Leaving the outerZone will actually trigger the mission clear/abort
     --Commented out as it will be be displayed alongside the innerZone otherwise
     --[[
     {
		name="trig_outerZone",
         vertices =
         { 
            Vector3(-58.000,315.000,1764.000),
            Vector3(-238.000,321.000,2445.000),
            Vector3(768.000,289.000,2486.000),
            Vector3(653.000,353.000,1824.000),
         } 
	},
	]]
 },
```

##### safetyArea2
Hot zone as it appears on the iDroid.  
and remember that this only affects it visually.

**You can get the coordinates using Infinite heaven by holding the Call Button and the Stance button.**
```lua
safetyArea2 = {
	{
		name="trig_hotZone",
		vertices =
		{
            Vector3(-58.000,315.000,1764.000),
            Vector3(-238.000,321.000,2445.000),
            Vector3(768.000,289.000,2486.000),
            Vector3(653.000,353.000,1824.000),
		},
	},
},
```

##### missionStartPoint
It sets where the player spawns if in `Infinite Heaven`, the option to start missions on foot is enabled.
It it can take a single `Vector3`.
```lua
missionStartPoint = {
    point = Vector3(141.47,275.51,2353.44),
},
```

##### heliLandPoint
The landing zones that the player can select from the Idroid while in the ACC.
```lua
heliLandPoint = {
	{
        point=Vector3(418.33,278.22,2261.37),startPoint=Vector3(418.33,278.22,2261.37),routeId="lz_drp_field_I0000|rt_drp_field_I_0000"
    },
    {
        point=Vector3(141.47,275.51,2353.44),startPoint=Vector3(141.47,275.51,2353.44),routeId="lz_drp_fieldWest_S0000|rt_drp_fiieldWest_S_
    },
},
```

##### heliSpaceFlags
Sortie/mission prep screen feature flags
```lua
heliSpaceFlags = {
	SkipMissionPreparetion = false,   --No sortie prep, like vanilla Mother Base.
	NoBuddyMenuFromMissionPreparetion = false,    -- No buddy select in the sortie
	NoVehicleMenuFromMissionPreparetion = false,    -- No vehicle select in the sortie
	DisableSelectSortieTimeFromMissionPreparetion = false,    -- Only ASAP as deployment time option
},
```

And that's everything you need to make it work, there are of course tons of other options that you can do.
For example setting the`GMP Reward` when the mission is completed.
Or even how many` Mission Tasks` the mission has, but that of course needs extra steps.
```lua
missionGuaranteeGMP=600000,
```

## Assets Folder

Assets folder contains... the mission's assets, mainly the `fpk`, and it's pair, the `fpkd`.
if you notice in the `this.packs = function(missionCode)` function, there was something called the `The mission's core "area" pack`.

First will create this, you can set any path you want, but it is recommened to set it in this path `/Assets/tpp/pack/mission2/custom_story/`.  
**Note: MakeBite will automaticlly repack any _fpk and _fpkd folders as .fpk and .fpkd, and will overwrite any existing ones**.
![Example](/assets/Create_Custom_Mission/Mission_Core_Pack_Path_Example.png)

The path written in `TppPackList.AddMissionPack` must  match what's in the Assets folder.  
So with the example we have above, it *MUST* look like this:
```lua 
TppPackList.AddMissionPack"/Assets/tpp/pack/mission2/custom_story/FPK_Name_Example.fpk"
```

### fpk
The `_fpk` folder  will contain assets, like models, the routes that the GameObjectLocators will take... etc.

### fpkd
The `_fpkd` folder  will contain data, like fox2, effects and lua files that will controll everything with mission.
More info about that can be found in [Mission Objectives](https://mgsvmoddingwiki.github.io/Mission_Objectives/) and [Mission Table Subscripts](https://mgsvmoddingwiki.github.io/Mission_Table_Subscripts/) wiki pages.

**For a ready zip file that contains everything explained here, check the google drive link above.**