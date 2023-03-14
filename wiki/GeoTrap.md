---
title: GeoTrap
permalink: /GeoTrap/
---

**GeoTrap** entity is one of the most interesting to use for achieve
conditions and callbacks. It set some area which can be triggered by the
**TppPlayer2**, **TppEnemy2** or **TppHostage**, and others types, which
can fire whatever coded in lua script.

**GeoTrap** always have two more entities parent with it.
**GeoModuleCondition** and a entity Shape that trigger while inside the
GeoTrap area, namely **BoxShape** or **SphereShape**.

**GeoModuleCondition** deal with callbacks and functions. I mean,
**checkFuncNames** and
**execFuncNames**.[thumb|434x434px](/File:GeoTrap_Visual.jpg "wikilink")

A common *checkFuncNames*, for example, can be the "*IsPlayer*" and have
the *TppTrapCheckIsPlayerCallbackDataElement* which set the Trap to be
trigger if the Player is inside the Trap Area.

A *execFuncNames* can be to add some weatherTag with
"*TppRequestWeatherTagTrapExec*" and have the
*TppRequestWeatherTagTrapExecDataElement*. So once the Player in Trap
area will trigger the weatherTag.

For a better understand about it. Let's build a Trap. We can use now
Foxkit to write fox2 files better than just write from scratch with XML
which is very time consuming. With Foxkit is just plenty simple and
friendly.

## **GeoTrap** Entity

[`thumb|451x451px`](/File:GeoTrap_Entity.jpg "wikilink")**`name`**`. It is important to set the name so it will be call as a sender, later in Lua Script. `

**dataSet**. A fix value to the current fox2 file.

**parent**. Always 0x00000000.

**transform**. Address to TransformEntity for the values of scale,
rotation and translate of the geoTrap area. Scale here is important to
define the size of the area. It is important to notice that it will
exponence the size of BoxShape. Using Foxkit its possible to visually
knows the better size for the trap, otherwise it might get far from what
you may want to achieve.

**shearTransform and pivotTransform**. Can be 0x00000000.

**children**. Will list the entities parented with GeoTrap. In this case
0x10000150 is the GeoModule Condition and the following two are
respectively the BoxShapes. Of course, having GeoModuleCondition or the
Shapes outside of GeoTrap it will not work.

**flags**. I do not have much info about it other than using Foxkit it
will generate the right value for it. In this case, value 7.

**conditionArray**. It will link the GeoModuleCondition and show the
path to the fox2 where GeoModuleCondition is. Even using Foxkit the user
may open the fox2 and manually editing the packagePath to empty.

**enable**. Bool true or false.

## **GeoModuleCondition** entity

[thumb|473x473px](/File:GeoModuleCondition-0.jpg "wikilink")**name**.
Not so important, but link with GeoTrap.

**dataSet**. A fix value to the current fox2 file.

**parent**. Address of GeoTrap.

**transform**. Address to TransformEntity for the values of scale,
rotation and translate of the geoTrap area. Scale and Rotation are
useless here, but one thing about translate is that only work if the
values are set as x: -0.1, y: -0,1,z: -0,1. using Foxkit the user may
find that x is positive but once exported it will be negative.

**shearTransform and pivotTransform**. Can be 0x00000000.

**children**. None.

**flags**. I do not have much info about it other than using Foxkit it
will generate the right value for it. In this case, value 7.

**trapCategory**. I do not know much about it, set as empty is fine. I
wonder what means "Category" for condition.

**trapPriority**. I do not know much about it, set as 0 is fine. I
wonder if GeoTraps can handle more than one condition so that this value
may find be useful.

**enable**. Bool true or false. **isOnce**.''' '''Bool true or false.
**isAndCheck**. Bool true or false.

**checkFuncNames**. IsPlayer. Other types are such IsHostage or IsEnemy.
For now IsPlayer. Enabling this will open the
**checkCallbackDataElements**.

**execFuncNames**. Though not using here in the example, one that is
simple to use is ''TppRequestWeatherTagTrapExec. Enabling this will open
the '**'execCallbackDataElements**.

### **checkCallbackDataElements**.

With checkFuncNames enabled as **IsPlayer** a new entity parameter show
up.

**owner**. Address of GeoModuleCondition.

**funcName**. The checkFuncNames IsPlayer.

## **BoxShape** entity

[thumb|487x487px](/File:BoxShape.jpg "wikilink")**name**. Not so
important, but link with GeoTrap.

**dataSet**. A fix value to the current fox2 file.

**parent**. Address of GeoTrap.

**transform**. Address to TransformEntity for the values of scale,
rotation and translate of the geoTrap area. Here scale, rotation and
translate are quite important because BoxShape is using exactly to place
at the map to trigger the trap. And scale here need some digs. Using
Foxkit the user may have a better understand about the right value for
BoxShape. In this case the scale is 0,03333334 as it can see in the
first image of this post.

**shearTransform and pivotTransform**. Can be 0x00000000.

**children**. None.

**flags**. I do not have much info about it other than using Foxkit it
will generate the right value for it. In this case, value 7.

## And Now...

To achieve the Trap Ingame the user just need to pass a sender in the
message code "Trap".

Message signatures for PrintOnMessage/Ivars.debugMessages. Trap is a
message with two types, Enter and Exit. Sender is the name of GeoTrap
linking. Below i show a simple way of once the player reach the Trap or
collide with the BoxShape it will change the weather to RAINY. Once out
of the GeoTrap it will be SUNNY.

`this.Seq_Example = {`

`   Messages = function( self )`
`   return`
`   StrCode32Table {        `
`       Trap = {`
`           {`
`               msg = "Enter", sender = "GeoTrap0000", -- Name of GeoTrap`
`               func = function()`
`                   TppWeather.RequestWeather(TppDefine.WEATHER.RAINY,0)                    `
`               end,            `
`           },`
`           {`
`               msg = "Exit", sender = "GeoTrap0000", -- Name of GeoTrap`
`               func = function()`
`                   TppWeather.RequestWeather(TppDefine.WEATHER.SUNNY,0)`
`               end,                `
`           },          `
`   }`
`   end,`
`   OnEnter = function() end,   `
`   OnLeave = function () end,`
`}`

[Category:Entities](/Category:Entities "wikilink")
[Category:Lua](/Category:Lua "wikilink")
[Category:Foxkit](/Category:Foxkit "wikilink")
[Category:Missions](/Category:Missions "wikilink")