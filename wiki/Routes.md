---
title: Routes
permalink: /Routes/
tags: [Routes, Level]
---

If you discover anything interesting or useful about routes or route
events, please feel free to document them here for others to learn from.
This page can be a general repository of unsorted route-related
information. If your findings are complicated or in-depth, consider
creating a separate page for them.

## Introduction

[thumb|268x268px|Edge Node : Relaxed
Walk](/File:EdgeNode.jpg "wikilink") Each Event Node has ten parameters.
And each parameter defines a behavior for the event as well as each
event has very specific parameters. There is no event that has used all
ten parameters.

Even the Edge Node can contain numbers in the ten parameters. An
interesting one is while using Relaxed Walk there is a parameter to make
the Soldier stare at something while moving.

[thumb|267x267px|Event Node : Relaxed Idle Act with parameters
filled](/File:EventNode.jpg "wikilink")

## Relaxed Idle Act and Caution Idle Act \[event node\]

These two events are simple to use. Only three parameters out of ten are
needed to run.

**Param0**. 1, There are other values but for now 1 is enough for these
two Events.

**Param1**. It holds values where the event will point to a specific
direction, as well as hold for a brief time what has been chosen in
Param6. For this there are unique numbers intended for this.
[thumb|166x166px|Old
Param1](/File:Param1_Unique_Numbers_.jpg "wikilink") *Values to used in
vanilla routes' Param1*

<https://github.com/TinManTex/mgsv-lookup-strings/blob/master/RouteTool/Hashes/Tpp/Previous/routeEventMessages_unique.txt>

The values in Param1 are actually two shorts - rotation and afterward
the wait time, but currently FoxKit's Route Builder reads them as one
integer. To more accurately edit Param1, you can convert the integer
from a decimal a hexadecimal format and edit the first and last half
separately.

The rotation value ranges from **0** to **65535**/**FFFFh**, rotating
counter-clockwise.

**479**/**01DFh** is the most common wait time value.

**Param6**. Display specific behavior/animations.

|                    |                           |                                                |
| ------------------ | ------------------------- | ---------------------------------------------- |
| Name string        | StrCode32 hash in decimal | Description and notes                          |
| StandActNormal     | 496717012                 | Looking forward                                |
| StandActWalkAround | 2277088634                | Stepping around                                |
| StandActSmoking    | 2014502296                | Smoking                                        |
| TBA                | 911690047                 | Sleeping in a bed                              |
| TBA                | 4113090604                | This needs some testing                        |
| TBA                | 3641544758                | Looking left and right, caution-like           |
| StandActKick       | 2135364818                | Relaxed kick with a sound effect               |
| StandActIdleStill  | 1049359963                | TBA                                            |
| TBA                | 3641544758                | Slow start, sneak into caution, left and right |
| TBA                | 4293802043                | TBA                                            |

### **Relaxed Stand Idle**

The mostly simple one. Just hold a value 1 in Param0 and a list of
Unique Numbers in Param2 for wait idle and rotation. It is slightly
different from **Relaxed Idle Act.**

## Caution Stand Idle Aim/ Caution Squat Idle Aim \[event node\]

As the name itself says these Events Nodes works to aim at something.
Also it take part another Node that will be treated as the target of the
scope (Edge Move and Event Wait)

**Param0**. There are two values that work here, not just "1". Route As
Sight Move Path and Route As Object. The others somehow get in the way.

  - **No target** = 1. It works fine. In fact I'm astonished that it
    works exactly like the Route As Sight Move Path

<!-- end list -->

  - **Static Point** = 257. This aim type will make the soldier look at
    static point in space at the coordinates defined in Param2 (x),
    Param3 (y) and Param4 (z), as float values converted to decimal.

<!-- end list -->

  - **Character** = 513. This aim type will make the soldier look at an
    entity defined by a StrCode32 hash of a GameObjectLocator's name in
    a Param.

<!-- end list -->

  - '''Route As Sight Move Path '''= 769.  This aim type will make the
    soldier's looking target follow a route, the StrCode32 hash of which
    is placed in Param2. And if the target follows a movement of Edge
    Node "Move", "Move Slow", "Move Normal" and "Move Fast" the Event
    Node Aim will follow the movement.

<!-- end list -->

  - **Route As Object** = 1025. Sorry for that but I haven't not tested
    this value yet. But it should be similar to 769.

**Param1**. It holds values where the event will point to a specific
direction. Unique Numbers to use in Param1 [thumb|395x395px|A simple
Route to Sight a target called
Bait](/File:Setting_up_a_Aim.jpg "wikilink")
<https://github.com/TinManTex/mgsv-lookup-strings/blob/master/RouteTool/Hashes/Tpp/Previous/routeEventMessages_unique.txt>

**Param2**. Holds a number that means the target of the sight. Any Node
can be a target. Even moving.

So if you create a Node called "Target". And if you convert Target to
number, 2924226716. This will be the value to be placed in Param2.

See *Edge Move and Event Wait* to set better Targets.

**Param3**. It holds a **Empty String** "", which is **3205930904**.
These could also be a set of coordinates for a static point in space,
possibly used in case the target route isn't there.

**Param4**. Same as Param3.

**Param5**. Same as Param3 and 4. However this parameter seems to be
dispensable. Since in some cases it worked even without any value.

### **Edge Move and Event Wait**

'''
Both the Edge Move and the Event Wait are indispensable for the Aim to
work with more realism, I must say.

Edge Move works like a Relaxed Walk and Run, Caution Walk and Run. There
is slow, normal and fast.

Event Wait is similar to Act idle. And hold only two Parameters.

**Param0**. 1

**Param1**. Set the Aim to hold for a brief moment before switching to
another Node. Unique Numbers to use here.

<https://github.com/TinManTex/mgsv-lookup-strings/blob/master/RouteTool/Hashes/Tpp/Previous/routeEventMessages_unique.txt>

## Relaxed Walk \[edge node\]

This edge node also have parameters. A simple one is while the node move
it can target another route. I mean, the soldier while walking can turn
his head and stare to something instead of looking straight like a
robot.

It works the same as above in the Aim nodes. But Edges events have
values -1 in Param0. So if Param0 is 769 to event node, for edge node
should be 768 otherwise will not work.

Param2 is the string of another Route that should do the soldier to look
at. Param3, 4 and 5 holds a fixed number '''3205930904. '''Which is just
a empty string.

This edge paramaters is usuful to a enemy guard scan better areas while
walking.

## Conversation Idle \[event node\]

A simple Event Node that triggers a specific conversation. Using this
Node will cause a conversation to be on one side only. To create more
specific situations it would be necessary to define it by scripting.
Even so, here are some parameters that work, although simple.

**Param0**. 1

**Param1**. It holds values where the event will point to a specific
direction, as well as hold for a brief time what has been chosen in
Param6. For this there are unique numbers intended for this.

*Unique Numbers to use in Param1*

<https://github.com/TinManTex/mgsv-lookup-strings/blob/master/RouteTool/Hashes/Tpp/Previous/routeEventMessages_unique.txt>

**Param6**: String as S32 unit. Use the above strings and convert to
numbers. I mean.. “USSR_story_04” is converted to 1380492315. So use
this number in Param6. You may find this
[here](https://github.com/TinManTex/mgsv-deminified-lua/blob/fb0254475fee5978ac38d968d5b75f41ca072f2c/data1/Assets/tpp/script/lib/TppEnemy.lua)

**Param7**. Does not need any value to work actually but this one point
to another route. So if you want to link together two soldiers in
conversation. "sol_quest_0000" should be 1856151639 as example.

By Script:

`--  CallConversation`
`this.CallConversation = function( speakerGameObjectId, friendGameObjectId, speechLabel )   `

`   local speakerGameObjectId   = "sol_vip"`
`   local friendGameObjectId    = "sol_vip2"`
`   local speechLabel = "CT10195_01" -- A conversation`

`   if Tpp.IsTypeString( speakerGameObjectId ) then`
`       speakerGameObjectId = GameObject.GetGameObjectId( speakerGameObjectId )`
`   end`
`   if Tpp.IsTypeString( friendGameObjectId ) then`
`       friendGameObjectId = GameObject.GetGameObjectId( friendGameObjectId )`
`   end`

`   local command = { id = "CallConversation", label = speechLabel, friend  = friendGameObjectId, } -- Im sure using this will set a conversation between two listeners.`
`   GameObject.SendCommand( speakerGameObjectId, command )`

`end`

The speech should be a string that fires some dialogue inside the .spch
files. Right now the file is not reversed to be made from scratch but
its possible to reuse some **special speech** like the one in the
mission s10036 "A Heroes Way", located in
s10036_area_fpk\\Assets\\tpp\\level\\mission2\\story\\s10036\\speech_data_s10036_Vip.spch

And if you see the lua file enemy in
s10036_area_fpkd\\Assets\\tpp\\level\\mission2\\story\\s10036\\s10036_enemy.lua

It calls the speechlabel "VIP_001".

But using special speechs needs to be loaded in a fox2 file with
'''TppSpeechData. '''

## Send Message \[event node\]

I think the best possible Node Event. It can activate any command
including AI such as SetCommandAi (FORCE_SHOOT, SHOOT_PRACTICE,
FORCE_WAIT, SHOOT_ROCKET). Send Message can work with at least three
parameters (Param0, Param1 and Param7). Although it is possible to
access other parameters, currently unknown.

**Param0**: 1

**Param1**. It holds values where the event will point to a specific
direction, as well as hold for a brief time what has been chosen in
Param6. For this there are unique numbers intended for this.

*Unique Numbers to use in Param1*

<https://github.com/TinManTex/mgsv-lookup-strings/blob/master/RouteTool/Hashes/Tpp/Previous/routeEventMessages_unique.txt>

**Param6**: Sometimes it have 4 to 6 numbers. But I have not figured out
anything that might make sense. It is possible to ignore this param.

**Param7**: This parameter is what sends a message. If you wrote "doIt"
and turned this string into numbers. That will be 1780500634. String As
32 uint. This number is what will be placed in this parameter.

After that just write a code that identifies the string "doIt" and then
some script.

`if messageId == StrCode32( "doIt" ) then`
`  this.NowYes("sol_quest_0003") -- function whatever`

A simple example to trigger a soldier to kill a hostage.

`function this.SoldierWantsToKillThatHostage ( soldierName )`

`  local soldierId = GameObject.GetGameObjectId("TppSoldier2", soldierName ) -- `
`  local hostageId = GameObject.GetGameObjectId("TppHostageUnique2", "Hostage_0" ) `
`  local command = { id="SetExecuteHostage", targetId=hostageId } `
`  GameObject.SendCommand( soldierId, command ) `

`end`

`this.Messages = function()`
`  return`
`    StrCode32Table`
`      {        `
`        GameObject = `
`     {`
`       {   `
`              msg = "RoutePoint2", `
`         func = function (gameObjectId, routeId ,routeNode, messageId )`
`       if messageId == StrCode32( "doIt" ) then`
`       this.SoldierWantsToKillThatHostage("sol_quest_0000")`
`       end `
`         end`
`       },`
`     },`
`      }`
`end`

[thumb|226x226px](/File:SendMessage.jpg "wikilink")

**Param8**: Sometimes it have 4 to 6 numbers. But I have not figured out
anything that might make sense. It is possible to ignore this param.

**Param9**: Sometimes it have 4 to 6 numbers. But I have not figured out
anything that might make sense. It is possible to ignore this param.

## Caution Stand Fire/ Caution Squat Fire \[event node\]

[thumb|387x387px](/File:Sphere_of_possibilities_lol.jpg "wikilink")
Using the right parameters this event fires steady shots in a certain
direction. It's a bit confusing as to what parameters to set for the
direction of the shots. Here is an image that illustrates the dimension
of where to shoot.

**Param0**: If for **1** as value will not activate the shots. The
soldier will just stand and stare. **257** static point is the value
that really works. **769** activates the shot but can not move to a
certain direction. So use 257 to continue.

**Param1**. Here it hold for a brief time the shoot. If set **0** the
enemy will constantly shoot. For this there are unique numbers intended
below.

*Unique Numbers to use in Param1*

<https://github.com/TinManTex/mgsv-lookup-strings/blob/master/RouteTool/Hashes/Tpp/Previous/routeEventMessages_unique.txt>

The next three parameters, Param2, Param3 and Param4 will set the
direction of the fire. Its a bit confusing choose the right numbers as
the three values depends of each one to work. Setting 0 in the three
params will be the safety zone and the default direction.
[thumb|508x508px](/File:Fire_Parameters.jpg "wikilink") **Param2**: 0

**Param3**: 0

**Param4**: 0

Those values may vary a lot. It can set one direction different values
than what it show in the image.

Using Cheat Engine to change those values ingame can be very helpful.

## Vehicle Move Fast/Normal/Slow \[event node\]

Simple to use it. To work it just need to choose a unique id number at
Param6. Some routes use more parameters for more complex AI, but
currently unknown how to use it.

The unique number to be set in **Param6** can be find looking at the
vanilla routes. Taking the Field Area as example and looking inside the
s10036_area.frt.

Look at the image, there is four unique numbers divided along the small
cp to the field cp and then goes to another small cp.
[thumb|439x439px](/File:Field_Area.jpg "wikilink") So.. If you want to
do a route where a vehicle start at the small cp 22 and goes trhough the
field cp (Shago Kallai) to end at the small cp 25 just use those numbers
in param6.

Some routes in story mission have one unique number to pass all the road
instead of using slices of the road. In s10036_area.frt the vip vehicle
start at small cp 25 and travel to the shago village with just
**3554650167**, instead of using 2662551924 and 1108895110.

Currently unknown what those numbers means.

As you see, its a lot of work to figure out which unique id every road
have inside the Vanilla Routes. But with those four numbers in the image
above it is a start to have a lot of fun see vehicles moving. Its
possible to spawn a vehicle in the Shago Village that holds the number
2510639541 which belongs to the road outside of where the vehicle spawn
and yet the vehicle will try to move there no matter what. Lots of fun
because the model keeps try to running throught the map like crazy.

## Switch Route

A Condition route. Though using SendMessage is much more easy to have a
condition switch route is pretty much used to change a route to
something linked to a gimmick location, resource or passage of time.
SwitchRoute always use two routes to work. The conditions names for it
are:

"IsNotGimmickBroken" - 665243854

"IsGimmickBroken" - 844380222

"CanUseSearchLight" - 1327217007

"CanNotUseSearchLight" - 1982248506

The first example can be this one. A route that will switch to another
route to use a Search Light equipament once isNight. The first one
called **rts_walkingAtDay_00** and the second route
**rts_usingSearchLightAtNight_00**.

**rts_walkingAtDay_00**

**Param0**: 1

**Param1**. It holds values where the event will point to a specific
direction, as well as hold for a brief time what has been chosen in
Param6. For this there are unique numbers intended for this.

*Unique Numbers to use in Param1*

<https://github.com/TinManTex/mgsv-lookup-strings/blob/master/RouteTool/Hashes/Tpp/Previous/routeEventMessages_unique.txt>

**Param6**: Point to the route '''rts_usingSearchLightAtNight_00,
'''which is 3067857059.

**Param7**: Is where holds the conditionName. In this case
CanUseSearchLight, 1327217007
[thumb](/File:Gimmick_lua_table_entries.png "wikilink") **Param8**: Is
the gimmick id of the searchlight gimmick. In this case I will use a
gimmick id from Afghanistan, the locatorName of which is
"gntn_srlg001_vrtn002_gim_n0002|srt_gntn_srlg001_gm" in
*/Assets/tpp/level/location/afgh/block_large/field/afgh_field_gimmick.fox2*.
We can find its gimmick id to use in this parameter in the location's
gimmick script, located in
*Assets\\tpp\\pack\\location\\afgh\\pack_common\\afgh_script_fpkd\\Assets\\tpp\\script\\location\\afgh\\afgh_gimmick.lua*.
With the .fox2 path and locatorName, we'll find the gimmick id used by
the gimmick tables within that script's gimmickIdentifierParamTable,
here it being "*field_light003*," which is 4280345761 in StrCode32
decimal. This is what we'll use for Param 8.

So... In this Route **rts_walkingAtDay_00** if the condition used is
CanUseSearchLight and once the passage of time becames Night it will
switchRoute to '''rts_usingSearchLightAtNight_00. '''Now the second
route...

**rts_usingSearchLightAtNight_00**

**Param0**: 1

**Param1**. It holds values where the event will point to a specific
direction, as well as hold for a brief time what has been chosen in
Param6. For this there are unique numbers intended for this.

*Unique Numbers to use in Param1*

<https://github.com/TinManTex/mgsv-lookup-strings/blob/master/RouteTool/Hashes/Tpp/Previous/routeEventMessages_unique.txt>

**Param6**: Point to the route '''rts_usingSearchLightAtNight_00,
'''which is 3067857059. This maybe keep a loop. If the route name to be
**rts_walkingAtDay_00** may break the loop?

**Param7**: Is where holds the conditionName. In this case now it use
CanNotUseSearchLight, 1982248506. Means that once the Night is over the
Route will switch to **rts_walkingAtDay_00.**

**Param8**: Is the same gimmick used in **rts_walkingAtDay_00.**

But, switchroute is just a Event that change to another route. Once the
condition is true it needs to have another event such Relaxed Idle, Aim,
Fire and so on. In this case as the route is using Search Light there is
a event called **UseSearchLight.**

### UseSearchLight

**Param0**: 16777985

**Param1**. It holds values where the event will point to a specific
direction, as well as hold for a brief time what has been chosen in
Param6. For this there are unique numbers intended for this.

*Unique Numbers to use in Param1*

<https://github.com/TinManTex/mgsv-lookup-strings/blob/master/RouteTool/Hashes/Tpp/Previous/routeEventMessages_unique.txt>

**Param6**: Works the same as Aim. So the seacrhLight will move
alongside of the path of this route the same way in Caution Stand Idle
Aim.

**Param3, 4 and 5**: It holds a **Empty String** "", which is
**3205930904.** [thumb|373x373px](/File:SwitchRoute.jpg "wikilink")

And there it is. Im still figure out how to use the other conditionName
'''IsGimmickBroken. '''So far it use to access gimmick WatchTower and
Mortars, heavy equipament and so on.

## Use Flash Light and 1875147223

UseFlashLight a node event that has no unique parameters, but when
soldiers use it, they will shine a flashlight at their sight target. In
the daytime, UseFlashLight will instead use a Caution Idle Search-like
animation, however the still unhashed 1875147223 node event will use the
flashlight animation even in the daytime.
[Category:FRT](/Category:FRT "wikilink")