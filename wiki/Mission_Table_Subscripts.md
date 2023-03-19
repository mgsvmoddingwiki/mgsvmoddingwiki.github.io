---
title: Mission Table Subscripts
permalink: /Mission_Table_Subscripts/
tags: [Lua, Missions, Reference]
---

The Mission Table subscripts exist in every mission in the game in
various forms, though always at least having a Sequence subscript. Each
subscript contains code relating to an element of the mission, such as
enemies and NPCs, cutscenes, support radio, result score, opening
credits and music.

The TppSimpleMissionData class of entity in a DataSet .fox2 file loaded
with the mission defines paths to the Mission Table subscripts.

``` xml
<entity class="TppSimpleMissionData" classVersion="1" addr="0x053506A0" unknown1="136" unknown2="1989016">
  <staticProperties>
    <property name="name" type="String" container="StaticArray" arraySize="1">
      <value>mission_data</value>
    </property>
    <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
      <value>0x04D8FF20</value>
    </property>
    <property name="script" type="FilePtr" container="StaticArray" arraySize="1">
      <value>/Assets/tpp/script/mission/mission_main.lua</value>
    </property>
    <property name="subScripts" type="FilePtr" container="StringMap" arraySize="7">
      <value key="sequence">/Assets/tpp/level/mission2/ih/example/example_sequence.lua</value>
      <value key="enemy">/Assets/tpp/level/mission2/ih/example/example_enemy.lua</value>
      <value key="radio">/Assets/tpp/level/mission2/ih/example/example_radio.lua</value>
      <value key="demo">/Assets/tpp/level/mission2/ih/example/example_demo.lua</value>
      <value key="telop">/Assets/tpp/level/mission2/ih/example/example_telop.lua</value>
      <value key="sound">/Assets/tpp/level/mission2/ih/example/example_sound.lua</value>
      <value key="score">/Assets/tpp/level/mission2/ih/example/example_score.lua</value>
    </property>
  </staticProperties>
  <dynamicProperties />
</entity>
```

TppSimpleMissionData entity example with all subscripts used in the
game.

The `sequence` subscript is the only truly integral subscript, and while
there is exclusive functionality behind other subscripts, they are
optional to the mission running at all. The example above lists all
possible subscripts used in vanilla missions.

Along with any defined subscripts, the `mission_main` script must be
packed and loaded with the DataSet as well. Here is a compressed version
of that script:

``` lua
local this = {}
this.OnAllocate = function(subScripts) return TppMain.OnAllocate(subScripts) end
this.OnInitialize = function(subScripts) return TppMain.OnInitialize(subScripts) end
this.OnReload = function(subScripts) return TppMain.OnReload(subScripts) end
this.OnUpdate = function(subScripts) return TppMain.OnUpdate(subScripts) end
this.OnChangeSVars = function(subScripts, varName, key) return TppMain.OnChangeSVars(subScripts, varName, key) end
this.OnMessage = function(subScripts, sender, messageId, arg0, arg1, arg2, arg3) return TppMain.OnMessage(subScripts, sender, messageId, arg0, arg1, arg2, arg3) end
this.OnTerminate = function(subScripts) return TppMain.OnTerminate(subScripts) end
return this
```

mission_main.lua, compressed

## All Subscripts

These can be used in any subscript, though usually only one utilizes
them.

### Callback functions

#### OnLoad

The `OnLoad` function, which is looked for and is called in all
subscripts, but most importantly in the Sequence subscript, has to
contain two function calls that define the sequence tables: the
index-name table, `TppSequence.RegisterSequences()`, and the
name-callbacks table, `TppSequence.RegisterSequenceTable()`.

``` lua
--Sequence names in order. The first listed sequence will be the one we will first boot to.
local sequenceNames = {
    "Seq_Game_MainGame",
    "Seq_Game_Escape"
}
--Define the sequences callback table.
local sequences = {}
--Register a callback table for each sequence in sequenceNames.
sequences.Seq_Game_MainGame={}
sequences.Seq_Game_Escape={
    OnEnter=function(self,sequenceName)
        TppMission.CanMissionClear()
    end,
}
--Tell TppSequence to register these tables.
function this.OnLoad()
    TppSequence.RegisterSequences(sequenceNames)
    TppSequence.RegisterSequenceTable(sequences)
end
```

Example of an `OnLoad` callback that defines the sequence tables.

The example above registers two sequences, although only one, of any
name, is required for the mission to boot. One of them, MainGame, has no
callbacks, but is a valid sequence nonetheless. The other sequence,
Escape, has an OnEnter callback that calls TppMission.CanMissionClear().
The OnEnter callback is called when the game switches to or starts with
that sequence. Calling TppMission.CanMissionClear() will make the game
start asking if you're not within the hot zone, so if you don't have a
hot zone area defined in a .trap file or as a GeoTriggerTrap, the start
of that sequence will clear the mission immediately.

### Tables

#### saveVarsList

The `saveVarsList` table initializies variables that are written to the
save file for the mission. Essentially, it's a simplified version of the
returned table of the DeclareSVars function, simplified specifically
through the `TppSequence.MakeSVarsTable` function.

``` lua
this.saveVarsList = {
    isFlag00    = false,
    isFlag01    = false,
    isFlag02    = false,
    isFlag03    = false,
    numFlag00 = 0,
    numFlag01 = 0,
    numFlag02 = 0,
    numFlag03 = 0,
}
```

The only data types of variables that you can define here as is are
booleans or integers, other types, and with different parameters, you
will have to write out its own table.

``` lua
this.saveVarsList = {
    posAbortWarmhole_x = { name = "posAbortWarmhole_x", type = TppScriptVars.TYPE_FLOAT, value = 0, save = true, sync = true, wait = true, category = TppScriptVars.CATEGORY_MISSION },
    posAbortWarmhole_y = { name = "posAbortWarmhole_y", type = TppScriptVars.TYPE_FLOAT, value = 0, save = true, sync = true, wait = true, category = TppScriptVars.CATEGORY_MISSION },
    posAbortWarmhole_z = { name = "posAbortWarmhole_z", type = TppScriptVars.TYPE_FLOAT, value = 0, save = true, sync = true, wait = true, category = TppScriptVars.CATEGORY_MISSION },
}
```

#### DeclareSVars

Is called from all subscripts, but seemingly only the equivalent from
other libraries is actually used. In those uses, it seems to be a
function that returns a table of the more detailed table save lists,
just not additionally indexed by the save variable name. This and the
save variables list from before get merged into one list.

``` lua
function this.DeclareSVars()
  return{
    {name="chk_checkPointName",arraySize=TppDefine.CHECK_POINT_MAX,type=TppScriptVars.TYPE_UINT32,value=0,save=true,sync=false,wait=false,category=TppScriptVars.CATEGORY_MISSION},
    {name="chk_checkPointEnable",arraySize=TppDefine.CHECK_POINT_MAX,type=TppScriptVars.TYPE_BOOL,value=0,save=true,sync=false,wait=false,category=TppScriptVars.CATEGORY_MISSION},
  }
end
```

## Sequence

### Callback functions

#### MissionPrepare

TBA

#### OnEndMissionPrepareSequence

TBA

#### OnBuddyBlockLoad

Called in `TppMain`'s read of the sequence subscript right before
`TppBuddy2BlockController.Load()` is called. Usually has functions that
set up pre-placed positions or flags for buddies.

### Flags

#### MISSION_START_INITIAL_WEATHER

Defines the mission start weather type.

``` lua
this.MISSION_START_INITIAL_WEATHER = TppDefine.WEATHER.SUNNY
```

#### ALWAYS_APPLY_TEMPORATY_PLAYER_PARTS_SETTING

Only seems to be used for the ACC missions.

#### ENABLE_DEFAULT_HELI_MISSION_CLEAR

The ENABLE_DEFAULT_HELI_MISSION_CLEAR flag is a boolean that defines
whether the game will clear or abort the mission when the player closes
the door on the support helicopter.

``` lua
this.ENABLE_DEFAULT_HELI_MISSION_CLEAR=true
```

Example use of the flag. When enabled, the mission will end when the
helicopter door is closed.

### Tables

#### missionStartPosition

The `missionStartPosition` table defines order box names and helicopter
drop route names to help the game keep track of the player's mission
start type.

``` lua
this.missionStartPosition = {
    orderBoxList = {
        --Order box names, i.e. "box_s12000_00",
        "box_flowTape_00",
    },
    helicopterRouteList = {
        --Drop point route names, need to be here when order boxes are
        "lz_drp_flowStation_E0000|lz_drp_flowStation_E_0000",
        "lz_drp_flowStation_I0000|rt_drp_flowStation_I_0000",
        "lz_drp_swamp_W0000|lz_drp_swamp_W_0000",
    },
}
```

#### DISABLE_BUDDY_TYPE

This variable will block a buddy from participating in the mission from
within. It can either be one buddy type, or a table of multiple buddy
types.

``` lua
this.DISABLE_BUDDY_TYPE = BuddyType.QUIET
```

``` lua
this.DISABLE_BUDDY_TYPE = {
    BuddyType.HORSE,
    BuddyType.WALKER_GEAR,
    BuddyType.BATTLE_GEAR
}
```

#### playerInitialWeaponTable

The initial weapon table will override the player's specified secondary,
primary hip, back and support weapons. Unspecified slots are not
overwritten, however.

``` lua
this.playerInitialWeaponTable = {
    { secondary     = "EQP_WP_10101",   magazine = TppDefine.INIT_MAG.HANDGUN_DEFAULT },
    { primaryHip    = "EQP_WP_30101",   magazine = TppDefine.INIT_MAG.ASSAULT_DEFAULT },
    { primaryBack   = "EQP_None" },
    { support       = "EQP_SWP_Grenade" },
    { support       = "EQP_SWP_Magazine" },
}
```

``` lua
this.playerInitialWeaponTable = {
    { secondary     = "EQP_WP_10004",   magazine = TppDefine.INIT_MAG.HANDGUN_DEFAULT },
    { primaryHip    = "EQP_WP_30103",   magazine = TppDefine.INIT_MAG.ASSAULT_DEFAULT },
    { primaryBack   = "EQP_None" },
    { support       = "EQP_None", },
    { support       = "EQP_None", },
    { support       = "EQP_None", },
    { support       = "EQP_None", },
    { support       = "EQP_None", },
    { support       = "EQP_None", },
    { support       = "EQP_None", },
    { support       = "EQP_None", },
}
```

You can also use `TppDefine.CYPR_PLAYER_INITIAL_WEAPON_TABLE` to
overwrite all of the player's weapons with `"EQP_None"`.

``` lua
this.playerInitialWeaponTable = TppDefine.CYPR_PLAYER_INITIAL_WEAPON_TABLE
```

#### playerInitialItemTable

The initial item table will overwrite the player's items on mission
start. Unspecified slots will not be overwritten.

``` lua
this.playerInitialItemTable = {
    "EQP_IT_TimeCigarette", "EQP_IT_Nvg", "EQP_None",
}
```

``` lua
this.playerInitialItemTable = { "EQP_None", "EQP_None","EQP_None","EQP_None","EQP_None","EQP_None","EQP_None","EQP_None",}
```

You can also use `TppDefine.CYPR_PLAYER_INITIAL_ITEM_TABLE` to
completely overwrite the item table with `"EQP_None"`.

``` lua
this.playerInitialItemTable = TppDefine.CYPR_PLAYER_INITIAL_ITEM_TABLE
```

#### checkPointList

The `checkPointList` table lists the names of checkpoint locators.

``` lua
this.checkPointList = {
    "CHK_NotKillQuiet",
    "CHK_MovedToMB",
    "CHK_E3_killQuiet",
    "CHK_StartPos",
}
```

#### baseList

The `baseList` table defines what bases - large outposts or observation
guard posts - are in the mission and which should save a checkpoint when
entering or leaving them.

``` lua
this.baseList={
    "flowStation",
    "swampWest",
}
```

#### missionObjectiveDefine, missionObjectiveTree and missionObjectiveEnum

See this page: [Mission Objectives\#Mission Table Sequence subscript
tables](/Mission_Objectives#Mission_Table_Sequence_subscript_tables "wikilink")

TBA

## Enemy

The `enemy` subscript defines callbacks related to NPCs, like enemy
soldiers and hostages.

### Callback functions

#### InitEnemy

The `InitEnemy` callback is called early into `TppMain`'s reading of the
enemy sub-table, just after the `soldierDefine` table is read. It seems
to be mainly used for Mother Base missions with enemies. It's also used
to use routes for soldiers with `TppEnemy.SetSneakRoute()` and
`TppEnemy.SetCautionRoute()` or set them to use specific route groups
without shift changes before `routeSets` has the chance to give them
more random ones.

#### SetUpEnemy

The `SetUpEnemy` callback is called after all other callbacks in
`TppMain`'s read of the enemy subscript. It's usually used for more
generic custom later NPC set-ups that are not yet accounted for by other
callbacks and tables.

#### SpawnVehicleOnInitialize

This function doesn't seem to do anything on its own, but it's during
this function that `TppEnemy.SpawnVehicles(...)` is called from.

``` lua
this.SpawnVehicleOnInitialize = function()
    TppEnemy.SpawnVehicles( this.VEHICLE_SPAWN_LIST )
end
```

The name `this.VEHICLE_SPAWN_LIST` seems to be completely arbitrary
despite being common. It can be anything. The list itself is actually a
list of `SendCommand` tables sent to `TppVehicle2`, all of them spawn a
specific locator of `TppVehicle2`. See more arguments for this
`SendCommand` on the [Commands](/Commands "wikilink") page.

``` lua
this.VEHICLE_SPAWN_LIST = {
    {
        id = "Spawn",
        locator = "sol_vehicle_0000",
        type = Vehicle.type.EASTERN_TRUCK,
        subType = Vehicle.subType.EASTERN_TRUCK_CARGO_MATERIAL,
    },
}
```

The same can also be done with `TppEnemy.DespawnVehicles(...)` and a
similar arbitrary table with `"Despawn"` as the command id and just the
locator name specified. TBA

### Flags

#### MAX_SOLDIER_STATE_COUNT

The `MAX_SOLDIER_STATE_COUNT` integer is an optional setting for your
mission that overrides the maximum amount of soldier states saved to
`svars`. The default setting is 160, and vanilla missions find that
enough, except for free roam missions in Afghanistan, Africa and Mother
Base, which raise it to 360 or 256. This only has to be done if your
totalCount of TppSoldier2 type in its GameObject definition exceeds 160.

``` lua
this.MAX_SOLDIER_STATE_COUNT = 360
```

#### USE_COMMON_REINFORCE_PLAN

The `MAX_SOLDIER_STATE_COUNT` bool is an optional flag that allows
common reinforce plans to be used if you have vanilla outposts and LRRP
patrols defined between them in `soldierDefine` and `routeSets`.

``` lua
this.USE_COMMON_REINFORCE_PLAN = true
```

### Tables

#### soldierDefine

The `soldierDefine` table defines which soldiers should belong to which
outposts, as well as their default starting LRRP patrols and vehicles.
This table is integral to the soldiers appearing in your mission.
However, it alone will not simply spawn soldiers - you need
GameObjectLocators of TppSoldier2 type in .fox2 DataSets with the
soldier names, along with the GameObject entity that defines the
TppSoldier2 GameObject type for your mission.

Here's a simple example with two CPs with very few soldiers:

``` lua
this.soldierDefine = {
    cp_swamp_vip = {
        "sol_mis_0000",
    },
    cp_savannah = {
        "sol_mis_0004",
        "sol_mis_0005",
        "sol_mis_0006",
    },
}
```

Here's an example of a LRRP unit with a given travel plan:

``` lua
this.soldierDefine = {
    mafr_02_21_lrrp={
        "sol_02_21_0000",
        "sol_02_21_0001",
        lrrpTravelPlan  = "travel_swampWest",
    },
}
```

And with a vehicle:

``` lua
this.soldierDefine = {
    afgh_01_13_lrrp = {
        "sol_01_13_0000",
        "sol_01_13_0001",
        lrrpTravelPlan  = "travelArea2_01",
        lrrpVehicle     = "veh_trc_0000",
    },
}
```

#### routeSets

The `routeSet` table defines route sets for soldiers in the command
posts defined in the `soldierDefine` table.

See this page: [Route Set](/Route_Set "wikilink").

#### travelPlans

The `travelPlans` table defines LRRP travel and other kinds of travel
between sets of routes and outposts, with some parameters like wait hold
time, one-way patrols, etc..

This example using the `base` parameter might seem like a simple travel
plan, but it actually has some prerequisites. You have to have the
numbered LRRP CPs defined, along with their standard uniformed route
sets.

``` lua
this.travelPlans = {
    travel_swampWest={
        { base = "mafr_swampWest_ob", },
        { base = "mafr_flowStation_cp", },
    }
}
```

Here's an example of a more detailed travel route that does more or less
the same:

``` lua
this.travelPlans = {
    travelCommFacility01 = {
        { cp="afgh_02_34_lrrp",         routeGroup={ "travel", "lrrp_02to34" } },
        { cp="afgh_commFacility_cp",    routeGroup={ "travel", "lrrpHold" },wait=15 },
        { cp="afgh_02_34_lrrp",         routeGroup={ "travel", "lrrp_34to02" } },
        { cp="afgh_commWest_ob",        routeGroup={ "travel", "lrrpHold" },wait=15 },
    },
}
```

The `cp` parameter defines which command post the soldiers will belong
to and which outpost the `routeGroup` will be taken from. The
`routeGroup` defines the set of routes that will be taken from the
specified command post's route set. The `wait` time on the hold
parameter is the time in seconds that the soldiers will wait at the hold
routes. It might actually be overwritten by a common time of 15 seconds
somewhere in the code.

This is an example of a one-way travel plan:

``` lua
this.travelPlans = {
    travelCommFacility01 = {
        ONE_WAY = true,
        { cp="afgh_02_34_lrrp",         routeGroup={ "travel", "lrrp_02to34" } },
        { cp="afgh_commFacility_cp",    finishTravel=true },
    },
}
```

Once the soldiers on the travel plan finish the travel plan, they will
not loop back to the first route set and will instead join the last
command post as regular soldiers.

In this example, they will loop on the last route group instead of
joining regular route groups:

``` lua
this.travelPlans = {
    travelVip = {
        ONE_WAY = true,
        { cp="afgh_10036_lrrp",         routeGroup={ "travel", "lrrp_16to29" } },
        { cp="afgh_field_cp",           routeGroup={ "travel", "lrrp_Vip_Hold" } },
    },
}
```

TBA

#### soldierPowerSettings

The `soldierPowerSettings` table forces certain power settings onto
soldier locators from the `soldierDefine` table. The power settings
table given to a soldier can be empy to remove their power settings
entirely. See `TppEnemy`'s `POWER_SETTING` table for all power settings.

This simple example of the table will simply remove all power settings
from the given soldier.

``` lua
this.soldierPowerSettings = {
    sol_vip_0000 = { },
}
```

This example gives some specific soldiers sniper rifles, body armor,
helmets and missiles.

``` lua
this.soldierPowerSettings = {
    sol_pfCamp_0001 = { "SNIPER" },
    sol_pfCamp_0002 = { "SNIPER" },
    sol_pfCamp_0003 = { "SNIPER" },
    sol_ZRS_0010    = { "SOFT_ARMOR", "HELMET", },
    sol_ZRS_0011    = { "SOFT_ARMOR", "HELMET", },
    sol_ZRS_0012    = { "SOFT_ARMOR", "HELMET", "MISSILE" },
    sol_ZRS_0013    = { "SOFT_ARMOR", "HELMET", "MISSILE" },
}
```

#### soldierPersonalAbilitySettings

The soldier personal ability settings table forces specified soldiers to
use specific personal abilities. It's seemingly never used in the
vanilla game.

The setting types are: "`shot`", which most likely refers to firearm aim
precision, "`grenade`" grenade throw precision, "`reload`" how often
they need to reload, "`hp`" their life, "`notice`" how they prioritize
suspicious sights and noises, "`cure`" how fast they regenerate,
"`reflex`" how long the reflex mode encounter with them lasts, "`speed`"
how fast they move, "`fulton`" how often they will shoot down Fulton
balloons, and "`holdup`" how often they resist in response to being held
up. Any of these settings can be specified here.

The setting levels range from `"low"`, `"mid"`, `"high"` to `"sp"`.

``` lua
this.soldierPersonalAbilitySettings={
    sol_vip_0000={
        shot    = "sp",
        grenade = "high",
        reload  = "mid",
        hp      = "low",
        notice  = "sp",
        cure    = "high",
        reflex  = "mid",
        speed   = "low",
        fulton   = "sp",
        holdup  = "high",
    },
    sol_vip_0001={
        hp      = "sp",
        cure    = "sp",
        speed   = "sp",
        fulton   = "sp",
        holdup  = "sp",
    },
    sol_vip_0002={
        holdup  = "low",
    },
}
```

#### cpGroups

The CP groups table defines command post groups, and joins specified
outposts to existing vanilla command post groups, if you make custom
ones. See the `afgh_cpGroups` and `mafr_cpGroups` scripts for the
vanilla CP groups, or alert a CP in free roam in the game and see how
many will be raised to alert when their HQ is alerted to your presence
as well.

This example adds the custom observation post to the vanilla
`group_Area2`.

``` lua
this.cpGroups = {
    group_Area2 = {
        "ms_13_34_ob",
    }
}
```

#### interrogation

TBA

#### useGeneInter

TBA

#### uniqueInterrogation

TBA

#### soldierSubTypes

TBA

#### vehicleSettings

This table doesn't even seem to be used.

#### vehicleDefine

The `vehicleDefine` table only defines the number of vehicle instances
that should have `svars` reserved for them. You can define a specific
number of vehicles you use here, but you always should add 1 more for
the player's own vehicle. Since spawned vehicles are often defined in a
table, the fastest way to define them here would be to get the length of
the table with `#`.

``` lua
this.vehicleDefine = {
    instanceCount = #this.VEHICLE_SPAWN_LIST + 1,
}
```

#### syncRouteTable

The sync route table defines parameters for the Sync Route route node
event. In the vanilla game, it's only used in s10086/Lingua Franca,
s10110/Voices and s10150/Skull Face. It defines a group of routes that
will get synced with the Sync Route event. The `script` flag seems to
allow the function `SyncRouteManager.SetScriptStep(...)` to manipulate
it somehow.

``` lua
this.syncRouteTable = {
    interrogation1 = {
        "rts_guard1_interrogation1_0000",
        "rts_interpreter_interrogation1_0000",
        "rts_interrogator_interrogation1_0000",
    },
    interrogation1_caution = {
        "rts_guard1_interrogation1_c_0000",
        "rts_interpreter_interrogation1_c_0000",
        "rts_interrogator_interrogation1_c_0000",
    },
    interrogation2 = {
        "rts_interpreter_interrogation2_0000",
        "rts_interrogator_interrogation2_0000",
    },
}
```

``` lua
this.syncRouteTable = {
    SyncRoute = {
        "rts_Fire_fW",
        "rts_Fire_fW2",
    },
}
```

``` lua
this.syncRouteTable = {
    sync_bringer = {
        "rts_bringer_A",
        "rts_bringer_B",
        script = true,
    },
}
```

#### GetRouteSetPriority

This only seems to be used in Mother Base missions, and its result is
generated with `mtbs_enemy`'s `GetRouteSetPriority`. It's initialized as
`nil` and only set with the `mtbs_enemy` function on the script's
`OnAllocate` callback.

TBA

## Radio

The `radio` subscript defines callbacks related to support radio lines,
like real-time radio, intel radio, optional radio, debriefings and more.

### gameOverRadioTable

This table overrides game over lines. See
`TppRadio.COMMON_GAME_OVER_RADIO_LIST` for all the default labels used
with the `TppDefine.GAME_OVER_RADIO` enum.

``` lua
this.gameOverRadioTable = {
    [TppDefine.GAME_OVER_RADIO.PLAYER_DEAD] = "f8000_gmov0100",
    [TppDefine.GAME_OVER_RADIO.S10020_OUT_OF_MISSION_AREA] = "f8000_gmov0090"
    [TppDefine.GAME_OVER_RADIO.S10020_TARGET_TIMEOVERDEAD] = "s0020_gmov4010",
    [TppDefine.GAME_OVER_RADIO.S10020_TARGET_DEAD] = "s0020_gmov4020",
    [TppDefine.GAME_OVER_RADIO.S10020_TARGET_KILL] = "s0020_gmov4030",
    [TppDefine.GAME_OVER_RADIO.S10020_RIDING_HELI_DESTROYED] = "s0020_gmov4040",
    [TppDefine.GAME_OVER_RADIO.S10020_PLAYER_DESTROY_HELI] = "s0020_gmov4050",
}
```

### debugRadioLineTable

Even though there is no functionality to actually display these debug
radio messages in the vanilla game, you can use this table to help
yourself debug your custom missions.

``` lua
this.debugRadioLineTable = {
    RescueHuey_announce = {
        "[dbg]ボス、東側で兵器開発をしている科学者がHECを通じて接触してきた",
        "[dbg]名前はエメリッヒ",
        "[dbg]彼は西側への亡命を希望している",
        "[dbg]まずは依頼者であり、ターゲットでもあるエメリッヒと接触したい",
        "[dbg]この科学者は常時、北のソビエト軍ベースキャンプで軟禁状態にある",
        "[dbg]だが今は変電施設に来ている",
        "[dbg]新兵器のデモンストレーションをするためにな",
        "[dbg]今がターゲット接触のチャンスといえるだろう",
        "[dbg]変電施設へ向かえ。エメリッヒに接触するんだ",
    },
    RescueHuey_updateArea = {
        "[dbg]変電施設に到達したな",
        "[dbg]エメリッヒ博士は施設北端の実験場にいるはずだ",
        "[dbg]実験場の入り口を目指してくれ",
    },
}
```

### radioList

The `radioList` table defines radio labels that can be used in the
mission. Any label can be played without having to be registered here,
but the optional `playOnce` boolean parameter is useful, as if it's set,
it will block repeated playbacks of that label as its own radio group.
`debugRadioLineTable` entries can also be defined here the same way as
they were there.

``` lua
this.radioList = {
    { "s0033_rtrg0010", playOnce = true },
    "f1000_rtrg2250",
    test_MissionComplete_LeaveBase  = {"(dbg)拠点から離れて安全を確保するんだ" ,},
}
```

### optionalRadioList

This table seemingly has no functionality behind it aside from
registering it to also unused mvars tables. One of them shows that this
had the same playOnce functionality as radioList, but since this whole
thing is unused, it doesn't much matter.

### intelRadioList

The intel radio list registers radio labels for intel radio (espionage
radio) for specific locators or overall intel radio types of entities.
The specific locators include NPC locator names and special
`EspionageRadioLocator`s made for this specifically. The intel radio
types list is large and is listed as StrCode64 hashes in the game's
.exe... a few hundred times. You can find most examples of intel radio
types in `TppTutorial.IntelRadioSetting`.

``` lua
this.intelRadioList = {
    --Intel radio type
    type_walkergear = "s0080_esrg4050",
    --Espionage Radio locator
    erl_dirtyriver = "s0080_esrg1010",
    --Enemy soldier locator
    sol_outland_0000 = "s0080_esrg1030",
}
```

### USE_COMMON_RESULT_RADIO

The `USE_COMMON_RESULT_RADIO` boolean flag seemingly does nothing and is
only used in s10041.

### blackTelephoneDisplaySetting

This table defines the shape, texture path, image description `langId`
and timing of appearance and disappearance of the images seen in the
debriefing, or as the game internally calls it, the "black telephone"
sequence.

The table entry's key is the debriefing radio's label, as you would need
different timings for different debriefing radio labels, which change in
some missions based on what you do in them. The value is a table with a
`Japanese` and `English` tables within, and the Japanese one is only
used if the game version being used is the Japanese voice one.

The first string of an entry within either the `Japanese` or `English`
table determines the shape of the photo image - `"sub"` for vertical and
`"main"` for horizontal, and the index, starting from `"1"`. The second
string is the path to the `.ftex` file that will be used for the photo.
The texture will be stretched to the proportions dictated by the first
string. Then comes the timing float, in seconds - the image will appear
this many seconds into this radio label's version of the debriefing. The
optional fourth value is the `langId`, which only shows up for vertical
`sub` images.

If the first string is instead `"hide"`, the second string becomes which
previously defined image to hide, and the the third parameter float
becomes the time in seconds at which the image is hidden.

What controls where on the screen in the image is placed is unknown.

``` lua
this.blackTelephoneDisplaySetting = {
    f6000_rtrg0150  = {
        Japanese = {
            { "sub_1", "/Assets/tpp/ui/texture/Photo/tpp/10115/mb_photo_10115_010_1.ftex", 0.6,"cast_mosquito" },
            { "main_1", "/Assets/tpp/ui/texture/Photo/tpp/demo/mission_demo_s10115_02.ftex", 3.5 },
            { "main_2", "/Assets/tpp/ui/texture/Photo/tpp/demo/mission_demo_s10115_03.ftex", 7.3 },
            { "main_3", "/Assets/tpp/ui/texture/Photo/tpp/demo/mission_demo_s10115_04.ftex", 29.9 },
            { "hide", "main_1", 47.1 },
            { "hide", "main_2", 47.4 },
            { "hide", "main_3", 47.7 },
        },
        English = {
            { "sub_1", "/Assets/tpp/ui/texture/Photo/tpp/10115/mb_photo_10115_010_1.ftex", 0.6,"cast_mosquito" },
            { "main_1", "/Assets/tpp/ui/texture/Photo/tpp/demo/mission_demo_s10115_02.ftex", 4.0 },
            { "main_2", "/Assets/tpp/ui/texture/Photo/tpp/demo/mission_demo_s10115_03.ftex", 7.1 },
            { "main_3", "/Assets/tpp/ui/texture/Photo/tpp/demo/mission_demo_s10115_04.ftex", 28.3 },
            { "hide", "main_1", 43.3 },
            { "hide", "main_2", 43.7 },
            { "hide", "main_3", 44.0 },
        },
    },
}
```

### commonRadioTable

This table overrides common radio lines for various contexts, like
recovering an enemy soldier or prisoner, approaching an enemy
helicopter, being warned about leaving the mission area, etc. You can
also use `TppRadio.IGNORE_COMMON_RADIO` to completely disable that radio
call in your mission. See `TppRadio.COMMON_RADIO_LIST` for the radio
labels used for the `TppDefine.COMMON_RADIO` enum.

``` lua
this.commonRadioTable = {
    [ TppDefine.COMMON_RADIO.HOSTAGE_RECOVERED ] = TppRadio.IGNORE_COMMON_RADIO,
    [ TppDefine.COMMON_RADIO.SEARCH_TARGET_ENABLED ] = TppRadio.IGNORE_COMMON_RADIO,
    [ TppDefine.COMMON_RADIO.PLAYER_NEAR_ENEMY_HELI ] = "f1000_rtrg3781",
    [ TppDefine.COMMON_RADIO.OUTSIDE_MISSION_AREA ] = "s0150_rtrg0050",
    [ TppDefine.COMMON_RADIO.ABORT_BY_HELI ] = "s0260_rtrg0430"
}
```

## Demo

The `demo` subscript defines callbacks related to cutscenes.

### demoList

The `demoList` table defines internal `demoId`s to indexed with more
descriptive names used by functions like `TppDemo.Play()`.

``` lua
this.demoList = {
    Demo_ArrivalInAfghanistan       = "p31_010010",
    Demo_RescueMillerExplanation    = "p31_010020",
    Demo_GetIntel                   = "p31_010025",
    Demo_RescueMiller               = "p31_010030",
    Demo_TimeOverDeadMiller         = "p31_010035",
    Demo_ParasiteAppearance         = "p31_010040",
    Demo_ParasiteDiscover_upper     = "p31_010045",
    Demo_EscapeWithMillerOnHeli     = "p31_010050",
}
```

### demoBlockList

The `demoBlockList` table defines the blocks that will get loaded for
specific cutscenes, using the more descriptive names from the `demoList`
table. This table is based on the `ScriptBlock` system, so you can load
multiple .fpk packs at once, but only one of these needs to have a
`ScriptBlockData` entity with the relevant script in it.

``` lua
this.demoBlockList = {
    Demo_SahelanTest        = { "/Assets/tpp/pack/mission2/story/s10070/s10070_d01.fpk" },
    Demo_GetIntel           = { "/Assets/tpp/pack/mission2/story/s10070/s10070_d07.fpk" },
    Demo_ContactHuey        = { "/Assets/tpp/pack/mission2/story/s10070/s10070_d02.fpk" },
    Demo_RideMetal          = { "/Assets/tpp/pack/mission2/story/s10070/s10070_d06.fpk" },
    Demo_SahelanHerald01    = {
        TppDefine.MISSION_COMMON_PACK.EAST_TRUCK,
        "/Assets/tpp/pack/mission2/story/s10070/s10070_d08.fpk"
    },
    Demo_SahelanHerald02    = { "/Assets/tpp/pack/mission2/story/s10070/s10070_d08.fpk" },
    Demo_SahelanAttacks     = {
        TppDefine.MISSION_COMMON_PACK.SKULLFACE,
        TppDefine.MISSION_COMMON_PACK.EAST_TRUCK,
        "/Assets/tpp/pack/mission2/story/s10070/s10070_d03.fpk",
    },
    Demo_SahelanFalling     = { "/Assets/tpp/pack/mission2/story/s10070/s10070_d04.fpk" },
    Demo_MotherBase         = { "/Assets/tpp/pack/mission2/story/s10070/s10070_d05.fpk" },
}
```

## Sound

The `sound` subscript defines callbacks related to the mission's music,
like certain jingles, including the helicopter's descend track.

### USE_COMMON_ESCAPE_BGM

If the `USE_COMMON_ESCAPE_BGM` bool is set to true and the `bgmList`
exists as a table in the subscript, the game will use the location's
common escape scene music.

``` lua
this.USE_COMMON_ESCAPE_BGM=true
```

### bgmList

The `bgmList` table defines scene BGM event sets. They're indexed by
their name, which will get used with functions like
`TppSound.SetSceneBGM(...)`.

``` lua

this.bgmList = {
    bgm_volgin = {
        start = "Play_bgm_s10110_volgin_01",
        finish = "Stop_bgm_s10110_volgin_01",
        restore = "Set_Switch_bgm_boss_phase_none",
        switch = {
            "Set_Switch_bgm_boss_phase_al",
            "Set_Switch_bgm_boss_phase_ed",
            "Set_Switch_bgm_boss_phase_none",
            "Set_Switch_bgm_boss_phase_sn",
        },
    },
    bgm_south_africa = {
        start = "Play_bgm_s10080_south_africa",
        finish = "Stop_bgm_s10080_south_africa",
    },
}
```

### missionStartTelopJingleName

The mission start telop jingle name is seemingly unused in the game's
vanilla missions. It seems to define the play event for the music that
plays at the start of the mission, and in the vanilla game, the only
unique ones that are heard are in free roam Afghanistan and Africa
helicopter entries.

``` lua
this.missionStartTelopJingleName="Play_bgm_afgh_jingle_op"
```

### noRestorePhaseBGMList

This is seemingly unused entirely, all that's there is that the mvars
table it's turned into hashes the table's values, which are therefore
most likely the BGM set names.

### showCreditJingleName

This overrides the event that plays the music in the mission's end
credits.

``` lua
this.showCreditJingleName = "Play_bgm_s10240_jingle_ed"
```

### heliDescentJingleName

This overrides the event that plays when the mission can be cleared and
helicopter descends for the player to ride it.

``` lua
this.heliDescentJingleName = "Play_bgm_mission_heli_descent_low"
```

### startHeliClearJingleName

This overrides the event that plays when the mission can be cleared and
you're riding the helicopter on your way to clear the mission.

``` lua
this.startHeliClearJingleName = "Play_bgm_mission_clear_heli_sad"
```

### finishHeliClearJingleName

This overrides the event that ends the previously mentioned event's
music.

``` lua
this.finishHeliClearJingleName = "Stop_bgm_mission_clear_heli_sad"
```

## Telop

The `telop` subscript defines the `langIds` for names appearing
mission's opening credits. It entirely consists of a few tables of
langIds.

### mainCharacterLangList

The main character list defines the `langId`s credits for what main
characters are either the player or give support radio in the mission.
The vanilla game usually uses the given three standard main character
`langId`s.

``` lua
this.mainCharacterLangList = {
    "cast_venom_snake",
    "cast_kazuhira_miller",
    "cast_sharashka_ocelot"
}
```

Missions where supporting characters also provide support radio also
include those characters, specifically `"cast_code_talker"` and
`"cast_emmerich"`.

### enemyCombatantsLangList

The enemy combatants list defines the `langId`s for credits for which
faction of enemy soldiers the player encounters in the mission. It can
be one group or multiple. This telop list is optional.

Commonly, one enemy combatants group `langId` is used:

``` lua
this.enemyCombatantsLangList = {
    "cast_soviet_soldiers"
}
```

Sometimes, multiple credits are shown, and always in a sub-table, as
well:

``` lua
this.enemyCombatantsLangList = {
    {
        "cast_soviet_soldiers",
        "cast_Spetsnaz"
    }
}
```

### guestCharacterLangList

The guest character list defines the `langId`s for credits for mission
targets or optional targets in the mission. This table is optional.

Just like the enemy combatants list, a single `langId` is within the
table directly, but multiple have to be in a sub-table.

``` lua
this.guestCharacterLangList = {
    "cast_bionics_engineer"
}
```

``` lua
this.guestCharacterLangList = {
    {
        "cast_skull_face",
        "cast_tretij_rebenok",
        "cast_soldier_skulls",
        "cast_hamid_fighters_mujahid"
    }
}
```

### specialMechanicLangList

The special mechanic list defines the `langId`s for credits for the
featured mechas in the mission, like armored vehicles, enemy
helicopters, Walker Gears or Sahelanthropus. This table is optional.

Like before, a single `langId` is within the table directly, but
multiple have to be in a sub-table.

``` lua
this.specialMechanicLangList = {
    "cast_tt-77"
}
```

``` lua
this.specialMechanicLangList = {
    {
        "cast_sahelanthropus",
        "cast_HP-48_Krokodil"
    }
}
```

### missionWriter

The mission writer list defines the `langIds` for the mission's writers.
There can only be one or two writers - third or more will not display on
the screen. Unlike the previous three lists, this table does not use a
sub-table for multiple entries.

``` lua
this.missionWriter = {
    "staff_hideo_kojima",
    "staff_hidenari_inamura"
}
```

### missionDirector

The mission director table is orphaned and is not used in `TppTelop`.

### missionLevelDesigner

The mission level designer list defines the `langId`s first for the
mission's director / tuner, and second the mission location's level
designer. Unlike some of the previous lists, this does not need to use a
sub-table for multiple entries.

``` lua
this.missionLevelDesigner = {
    "staff_yuji_korekado",
    "staff_shinpei_yamamoto"
}
```

## Score

The `score` subscript defines time limits for certain mission ranks and
the max amount of tactical takedowns that count as bonuses to the score.
The only contents it ever has is the table `missionScoreTable`.

### missionScoreTable

This table defines the base time in seconds for each mission completion
rank with `baseTime` and the count limit for tactical takedown bonuses
in with `tacticalTakeDownPoint`.

``` lua
this.missionScoreTable = {
    baseTime = {
        S = 720, A = 1380, B = 2370, C = 5928, D = 7836, E = 11754
    },
    tacticalTakeDownPoint = { countLimit = 40 },
}
```
