---
title: Mission Objectives
permalink: /Mission_Objectives/
tags: [Guides, Missions, Lua]
---

This page describes how to use mission objectives in missions, including
defining them in the Sequence mission table subscript and using
functions to update them.

## Mission Table Sequence subscript tables

### missionObjectiveDefine

The `missionObjectiveDefine` table defines the precise details about
objectives, such as objective markers for areas, NPCs and gimmicks,
iDroid VI photos, subgoals, enemy routes on the map, target area CP
music, mission tasks and forced spy search on specific enemy soldiers.
An objective can also simply be an empty table, as a dummy objective
that can be the parent of another objective in the objective tree, so
when the parent is shown, its child objective that does have something
like a marker will be disabled.

#### packLabel

The `packLabel` parameter in the objective will restrict the objective
from being updated if the current packLabel isn't the one specified in
it.

``` lua
this.missionObjectiveDefine = {
    mission_target_cp = {
        packLabel = { "afterSahelanTestDemo" },
        --...
    },
}
```

#### announceLog

The `announceLog` parameter in the objective will print a message in the
announce log. The parameter is not a `langId`, instead it uses a string
key of a `langId` value string from `TppUI`'s `ANNOUNCE_LOG_TYPE` table.

``` lua
this.missionObjectiveDefine = {
    announce_eliminateTarget = {
        announceLog = "eliminateTarget",
    },
}
```

#### gameObjectName and gimmickId

The `gameObjectName` or `gimmickId` parameters will place a marker on
the given game object or gimmick with the following parameters as
arguments using the function `TppMarker.Enable(gameObjectId,...)`. The
`gameObjectName` can be a TppMarkerLocatorSystem game object or an NPC
like a soldier or a hostage, and if you're using a `gimmickId`, it will
be the name of the gimmick in the `mvars.gim_identifierParamTable`
table, meaning either a vanilla gimmick set up in the location's
scripts, or a custom one, though you'll have to push to that table
yourself somehow.

``` lua
this.missionObjectiveDefine = {
    default_area_slopedTown = {
        --EITHER:
        --Name of the marker, soldier, etc. gameobject
        gameObjectName = "s10020_marker_slopedTown",
        --OR:
        --Name of the gimmick in mvars.gim_identifierParamTable
        gimmickId = "lab_cntn001",

        --TppMarker.Enable arguments:
        visibleArea = 5, --Marker's area size, 0 is default if unassigned
        goalType = "none", --Goal type, "none" is default if unassigned
        viewType = "all", --Visible on map or game world or both, "map" is default if unassigned
        randomRange = 3, --Level of random area, randomized offset, 0 by default if unassigned
        setImportant = true, --Yellow/important marker, will make the target marker visible in the world
        setNew = true, --Mark as a new marker on the map or not
        langId = "marker_info_mission_targetArea", --Lang id of the marker
        goalLangId = "marker_info_mission_targetArea", --Lang id of the goal
        mapRadioName = "s0020_mprg0020", --Radio label on the map marker
        setInterrogation = true, --Interrogation bool, true by default?
    },
}
```

#### photoId

The `photoId` parameter will add a photo to the iDroid mission info
section. Its additional parameters are a little backwards, though: if
`addFirst` is true, it will use the vertical photo. If `addSecond` is
false, it will use a horizontal photo. There is also a seemingly unused
(non-functional, orphaned) `isComplete` parameter.

The photo index is generated into this `.ftex` texture path:

`"/Assets/tpp/ui/texture/Photo/tpp/[%05d missionCode]]/mb_photo_[%05d
missionCode]_[%03 photoId].ftex"`

Add `"_1.ftex"` as a suffix for the vertical photo texture version. The
generated example would be:
`"/Assets/tpp/ui/texture/Photo/tpp/10020/mb_photo_10020_010.ftex"`

``` lua
this.missionObjectiveDefine = {
    default_photo_target_a = {
        photoId = 10, --Photo index:
        addFirst = true,--If true, use a vertical photo. False if unassigned
        addSecond = false, --If false, use a horizontal photo. Confusing, I know. False if unassigned
        isComplete = false, --Unused flag that doesn't do anything
        photoRadioName = "s0093_mirg0010", --Photo radio label
    },
}
```

#### hudPhotoId

The `hudPhotoId` parameter will show the previously defined `photoId`,
the vertical version of it, on the right side of the screen.

``` lua
this.missionObjectiveDefine = {
    hud_10 = {
        --Vertical photo index to show on the screen when the objective is shown
        hudPhotoId = 10,
    },
}
```

#### subGoalId

The `subGoalId` parameter will change the subgoal `langId` and if the
subgoal is above 0, print the new subgoal in the announcement log.

The subgoal index is generated into this `langId`:

`"subgoal_mission_[%02 locationCode]_[%05 missionCode]_[%02 subGoalId]"`

An output example would be:

`"subgoal_mission_10_10020_02"`

``` lua
this.missionObjectiveDefine = {
    on_subGoal_missionComplete = {
        --The subgoal index to use when the objective is shown.
        subGoalId = 2,
    },
}
```

#### showEnemyRoutePoints

The `showEnemyRoutePoints` parameter will show on the map a route made
out of the given list of `Vector3` coordinates. Strangely, the line is
drawn in backwards order from the ones listed, as in the first point
will be the one that has an arrow pointing outward.

``` lua
this.missionObjectiveDefine = {
    route_vip_field_arrival = {
        --Show a red route on the map
        showEnemyRoutePoints = {
            groupIndex = 0, --Route index, starts from 0
            width = 200.0, --Route width in meters
            langId = "marker_target_forecast_path", --Lang id for the route
            radioGroupName = "f1000_mprg0260", --Map radio label for the route
            --Coordinates starting from end arrow (the first point will be pointed at by the path)
            points={
                Vector3( 588.3,0.0,1163.0 ),
                Vector3( 739.0,0.0,1212.0 ),
                Vector3( 929.0,0.0,1261.7 ),
                Vector3( 1161.8,0.0,1408.5 ),
                Vector3( 1247.8,0.0,1733.9 ),
                Vector3( 956.9,0.0,1970.4 ),
                Vector3( 728.8,0.0,1940.4 ),
                Vector3( 455.6,0.0,2165.6 ),
            }
        },
    },
}
```

#### targetBgmCp

The `targetBgmCp` parameter will enable the Target Area Infiltration
track to play when infiltrating the specified outpost.

``` lua
this.missionObjectiveDefine = {
    --Enable the Target Area Infiltration track to play for this CP gameobject
    mission_target_cp = {
        --CP gameobject name
        targetBgmCp = "afgh_sovietBase_cp",
    },
}
```

#### missionTask

The `missionTask` parameter will modify the mission task list. A mission
can only have 8 tasks - 0 to 7. A task can also be hidden by default to
avoid telling the player what they will have to do later on.

Here's an example of two `missionTask` parameter objectives that first
define a normal objective that's shown from the start, and another that
clears it:

``` lua
this.missionObjectiveDefine = {
    --Objective example: shown by default
    --Show objective to define the mission task.
    default_missionTask_00 = {
        missionTask = {
            --Task index, 0 to 7. Include this index in  the external missionTaskList table.
            taskNo = 0,
            --New yellow marker boolean.
            isNew = true,
            --Task completion boolean.
            isComplete = false,
            --Boolean for whether to hide the task or not.
            isFirstHide = false
        },
    },
    --Show objective to clear the mission task.
    clear_missionTask_00 = {
        missionTask = {
            taskNo = 0,
            isNew = true,
            isComplete = true
        },
    },
}
```

And here's an example of a set of `missionTask`-using objectives that
use a task that's hidden by default, but then is shown, and then
completed.

``` lua
this.missionObjectiveDefine = {
    --Objective example: hidden by default
    --Show objective to define the hidden task.
    default_missionTask_01 = {
        missionTask = {
            taskNo = 1,
            isNew = true,
            isComplete = false,
            isFirstHide = true
        },
    },
    --Show objective to show the hidden task.
    open_missionTask_01 = {
        missionTask = {
            taskNo = 1,
            isNew = true,
            isComplete = false,
            isFirstHide = false
        },
    },
    --Show objective to clear the mission task.
    clear_missionTask_00 = {
        missionTask = {
            taskNo = 1,
            isNew = true,
            isComplete = true
        },
    },
}
```

#### spySearch

The `spySearch` parameter will force enable the Enemy FOM marker for an
enemy soldier, even if they're far away, set an important yellow New
mark on it, and change the marker's `langId`.

``` lua
this.missionObjectiveDefine = {
    route_vip_field_arrival = {
        --Force enable the FOM marker on an enemy soldier on the map
        spySearch = {
            --The soldier locator's name
            gameObjectName = "sol_vip_field",
            --Yellow new marker bool
            isNew = true,
            --Lang id for the FOM marker
            langId = "marker_info_mission_target",
        },
    },
}
```

### missionObjectiveTree

The missionObjectiveTree table defines a table of priorities for the
previously defined objectives. In short, when an objective is shown, all
its children in the tree will be disabled, removed and hidden. Not all
objectives have to be on the tree, because not all of them have to be
hidden by another marker eventually. The simplest example is often used
in `missionTask` objectives:

``` lua
this.missionObjectiveTree = {
    clear_missionTask_00 = {
        default_missionTask_00 = {},
    },
    clear_missionTask_01 = {
        open_missionTask_01 = {
            default_missionTask_01 = {},
        },
    },
}
```

Here we have two task branches: the deeper you go into them, the earlier
the objective is. The `default` one defines the objective as not yet
cleared, and the `clear` one updates it to be marked as cleared. In the
second one, an in-between is introduced: since the `default` one defines
it as being hidden by default, the `open` one shows it, and afterward,
the `clear` one marks it as clear. With markers, it looks often like
this:

``` lua
this.missionObjectiveTree = {
    missionClear = {
        marker_target = {
            marker_area_targetVagueLocationMarker = {
                marker_area_targetOutpostMarker = {},
            },
        },
    },
}
```

The deepest one is the vaguest marker, and the one we are given in this
hypothetical mission, `marker_area_targetOutpostMarker`, marking the
entire outpost our target is in. The next level is
`marker_area_targetVagueLocationMarker`, a location within the outpost,
but not as precise as it would be if you were to mark the target
yourself directly, which is exactly what's up next, `marker_target` -
we've marked the target directly. Finally, the highest outer level is
`missionClear`, an objective with no markers. We have cleared the
mission after eliminating or rescuing the target, so we no longer need
any of the markers we had before.

The reason we have this tree is because of how much there is to disable
or remove from our UI when we've reached the next step in the mission.
Since we can also skip some steps, this is useful too.

It can get a bit more complex with multiple objectives with the same
children:

``` lua
this.missionObjectiveTree = {
    rv_missionClear = {
        get_s10093_Container_A = {
            add_s10093_Container_A = {
                add_lab_enemy_map = {
                    default_area_lab = {},
                },
            },
        },
        get_s10093_Container_B = {
            add_s10093_Container_B = {
                add_lab_enemy_map = {
                    default_area_lab = {},
                },
            },
        },
        default_photo_target_a  = {},
        default_photo_target_b  = {},
        target_area_cp  = {},
        intermediate_target01 = {},
    },
}
```

The objectives `default_area_lab` and `add_lab_enemy_map` are repeated
here, because showing either `add_s10093_Container_A` or
`add_s10093_Container_B` should remove those markers. A simplified
example would be this:

``` lua
this.missionObjectiveTree = {
    AreaMarker_A_ClearVersion = {
        default_mission_intel = {},
    },
    AreaMarker_B_ClearVersion = {
        default_mission_intel = {},
    },
    AreaMarker_C_ClearVersion = {
        default_mission_intel = {},
    },
    missionTask_1_RecoverTarget_clear = {
        missionTask_1_RecoverTarget ={},
        AreaMarker_A_ClearVersion = {},
        AreaMarker_B_ClearVersion = {},
        AreaMarker_C_ClearVersion ={},
        default_mission_intel = {},
    },
}
```

Here, the `default_mission_intel` marker is hidden if we get any of the
`A`, `B` or `C` `AreaMarkers`. All three are hidden if the mission task
is cleared. You can also have it be very simplistic and not bother at
all with big trees, and use something like this for everything:

``` lua
this.missionObjectiveTree = {
    clear_Area_hosTarget_flee = {
        Area_hosTarget_flee = {},
    },
    clear_Area_hosTarget_convoy = {
        Area_hosTarget_convoy = {},
    },
}
```

The `clear_` objectives are actually empty in the definition table;
they're there simply to hide their children on this tree.

### missionObjectiveEnum

The missionObjectiveEnum enum is used by the game's code to index around
objectives instead of using their names. Every objective in the
missionObjectiveDefine table needs to be here.

This is an example of what the game does:

``` lua

this.missionObjectiveEnum = Tpp.Enum{
    "default_mission_intel",
    "default_viewPoint",
    "Arrived_viewPoint",
    --...
}
```

...and more. But you can completely ignore this weird thing and instead
use this method that incredibly easily automates it from a previously
defined missionObjectiveDefine.

``` lua
this.missionObjectiveEnum = {}
for objectiveName, objectiveTable in pairs(this.missionObjectiveDefine) do
    if Tpp.IsTypeString(objectiveName) then
        table.insert(this.missionObjectiveEnum,objectiveName)
    end
end
this.missionObjectiveEnum=Tpp.Enum(this.missionObjectiveEnum)
```

## Objective functions

### TppMission.UpdateObjective

The function `TppMission.UpdateObjective(...)` updates the current
objectives, with possible parameters like radio calls before or after
the objective is updated. There is also an `options` parameter, but none
of them seem to do anything.

A simple update of objectives would be this: we're simply defining the
mission tasks with these objectives.

``` lua
TppMission.UpdateObjective{
    objectives = {
        "default_missionTask_00",
        "default_missionTask_01",
        "default_missionTask_02",
        "default_missionTask_03",
        "default_missionTask_04",
    },
}
```

However, even if you want to update one objective, you have to use it in
a table.

If we want to update the objective after a specified radio label plays,
we can do this:

``` lua
TppMission.UpdateObjective{
    objectives = {
        "default_area_field"
    },
    radio = {
        radioGroups = "s0036_rtrg0010",
    },
}
```

You can also use a table of multiple radio labels as the `radioGroups`,
and also use `radioOptions` the same way we can use the second argument
in `TppRadio.Play()` for parameters for radio playback, like `delayTime`
or `priority`.

``` lua
TppMission.UpdateObjective{
    objectives = {
        "default_area_clifftown"
    },
    radio = {
        radioGroups = {
            "s0044_rtrg0010",
            "s0044_rtrg0020"
        },
        radioOptions = {
            priority = "strong"
        },
    },
}
```

We can also use `radioSecond` to play a `radioGroups` of either one or
multiple radio labels after the objective has already been updated.
`radioOptions` applies there as well.

``` lua
TppMission.UpdateObjective{
    objectives = {
        "default_area_enemyBase"
    },
    radio = {
        radioGroups = "s0033_rtrg0010",
    },
    radioSecond = {
        radioGroups = "s0033_rtrg0011",
    },
}
```
