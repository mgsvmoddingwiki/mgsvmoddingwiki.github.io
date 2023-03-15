---
title: Route Set
permalink: /Route_Set/
tags: [Lua, Routes, Reference]
---

Route sets define groups of route names that will be used by the
specified command post to arrange its soldiers for time and phase-based
patrols, shift break routes, travel route groups, special Walker Gear
parking routes and weather-dependent routes. These do not define the
actual route data - that would be `.frt` Fox Route files, only one of
which can be loaded in an `.fpk` pack.

This is as minimal as you can get with a custom route set: one priority
route group, sneak day and night sets, and a caution set, along with an
empty hold route group.

``` lua
this.routeSets = {
    ms_13_34_ob = {
        priority = {
            "groupA",
        },
        sneak_day = {
            groupA = {
                "rts_d_ene01_13to34_0000",
                "rts_d_ene02_13to34_0000",
            },
        },
        sneak_night = {
            groupA = {
                "rts_n_ene01_13to34_0000",
                "rts_n_ene02_13to34_0000",
            },
        },
        caution = {
            groupA = {
                "rts_d_ene01_13to34_0000",
                "rts_d_ene01_13to34_0000",
            },
        },
        hold = {
            default = {},
        },
    },
    //...
}
```

## Route Sets Lua Table

### Parameters

#### USE_COMMON_ROUTE_SETS

Optional boolean flag. Set to true to use common route sets from
`afgh_routeSets.lua` or `mafr_routeSets.lua`. The merging is a complex
process if you define more custom route set types.

``` lua
this.routeSets={
    afgh_field_cp = {
        USE_COMMON_ROUTE_SETS = true,
        //...
    },
    //...
}
```

#### priority

List of shift-based route group names, listed in descending order of
priority. Usually named "groupA", "groupB", etc., but they're arbitrary.

``` lua
this.routeSets={
    afgh_field_cp = {
        priority = {
            "vip",
            "groupSniper",
            "groupA",
            "groupB",
            "groupC",
            "groupD",
        },
        //...
    },
    //...
}
```

#### fixedShiftChangeGroup

List of shift-based route group names that are fixed, meaning the
soldiers using these routes will not cross over into other route groups
on shift changes. Used commonly for VIPs, snipers, and other
importantly-placed soldier routes.

``` lua
this.routeSets={
    afgh_field_cp = {
        fixedShiftChangeGroup = {
            "vip",
            "groupSniper",
        },
        //...
    },
    //...
}
```

### Shift-based grouped route sets

These route sets of groups change by shifts and phases, and are grouped
with names like the ones defined above. These route sets all follow the
same format:

``` lua
this.routeSets={
    afgh_field_cp = {
        sneak_day = {
            groupA = {
                "rt_field_d_0000",
                "rt_field_d_0002",
                "rt_field_d_0012",
                "rt_field_d_0013",
            },
            groupB = {
                "rt_field_d_0011",
                "rt_field_d_0010_sub",
                "rt_field_d_0014",
                "rt_field_d_0006",
            },
            //...
        },
        //...
    },
    //...
}
```

For route names that are meant to attract a soldier with a sniper rifle
or a VIP, you should use a table instead of a route, with the first
entry in the table being the route name, and the other, an `attr` string
that defines whether the route should only be used by snipers or a VIP.

``` lua
this.routeSets={
    mafr_lab_cp = {
        sneak_day = {
            vip = {
                { "rts_10093_d_0000", attr = "VIP" },
            },
            //...
        },
        //...
    },
    //...
}
```

``` lua
this.routeSets={
    afgh_remnants_cp = {
        sneak_day = {
            groupSniper = {
                { "rt_remnants_snp_0000", attr = "SNIPER" },
                { "rt_remnants_snp_0001", attr = "SNIPER" },
            },
            //...
        },
        //...
    },
    //...
}
```

#### sneak_day

Sets of groups of routes used in the Sneak phase in the daytime,
starting from 06:04:33.

#### sneak_night

Used in the Sneak phase in the nighttime, starting from 18:14:13. When
the set `sneak_midnight` is not defined, which is always in the vanilla
game, is also used starting from 22:00:00.

#### sneak_midnight

Used in the Sneak phase around midnight, starting from 22:00:00. Never
used in the vanilla game, but seemingly can still be used. When it's not
defined, `sneak_night` overwrites it.

#### caution

Used in the Caution phase. Usually all routes are stored into the first
route group, leaving other route groups as empty tables.

#### hold

Used for extra soldiers who don't get a free route in other route groups
on shift changes in the Sneak phase in the daytime. Usually uses an
undefined `default` route group, but seemingly per-route group hold and
sleep routes can be used. Is usually always there, even if it's empty,
as in contains an empty table of a `default` route group.

``` lua
this.routeSets={
    afgh_field_cp = {
        hold = {
            default = {
                "rt_field_h_0000",
                "rt_field_h_0001",
                "rt_field_h_0002",
                "rt_field_h_0003",
            },
            //...
        },
        //...
    },
    //...
}
```

#### sleep

Just like `hold` above, but for nighttime, and has sleep routes where
soldiers sleep while sitting or lying on beds.

### Other

#### travel

This route set's route groups are fully managed by the travel plan
system, they are not at all affected by priority, the fixed list, shifts
or phases. The route groups expected here can be used for the
reinforcements system or by simplified travel plans.

##### lrrpHold

This route group that appears in guard posts (`_ob`) and command posts
(`_cp`) is used by simplified travel plans. The routes in it are for
soldiers smoking in a spot where the LRRP patrol stays at the CP after
moving into it and before moving out of it. Usually has two different
routes.

``` lua
this.routeSets={
    afgh_field_cp = {
        travel = {
            lrrpHold = {
                "rt_field_l_0000",
                "rt_field_l_0001",
            },
            //...
        },
        //...
    },
    //...
}
```

##### lrrp_%02dto%02d

These route groups that appear in LRRP CPs (`_lrrp`) between the indexed
CPs in its name. These usually contain two duplicate names of the same
route that leads from the first indexed CP and to the other, and the
soldiers driving a vehicle or walking along that route will be
synchronized that way. Used by simplified travel plans. For simplified
travel plans, the LRRP CP name should also be formatted in
`%s_%02d_%02d_lrrp`, with the four letter location name at the start and
the first CP index being the lesser number to the second. The indices
are defined for vanilla locations in `afgh_travelPlans.lua` and
`mafr_travelPlans.lua`, or in the enemy subscript's `lrrpNumberDefine`
and `cpLink` tables, which are never used in the vanilla game.

``` lua
this.routeSets={
    afgh_field_cp = {
        travel = {
            lrrp_01to13 = {
                "rt_01to13_0000",
                "rt_01to13_0000",
            },
            lrrp_13to01 = {
                "rt_13to01_0000",
                "rt_13to01_0000",
            },
            //...
        },
        //...
    },
    //...
}
```

Formatted name examples would be: `lrrp_01to13`, `lrrp_21to20`.

##### rp_%02dto%02d

Just like `lrrp_%02dto%02d` above, but used by reinforcement plans. Has
four duplicate route names instead, and those route names can be the
same as the two `lrrp_%02dto%02d` has.

``` lua
this.routeSets={
    afgh_field_cp = {
        travel = {
            rp_01to13 = {
                "rt_01to13_0000",
                "rt_01to13_0000",
                "rt_01to13_0000",
                "rt_01to13_0000",
            },
            rp_13to01 = {
                "rt_13to01_0000",
                "rt_13to01_0000",
                "rt_13to01_0000",
                "rt_13to01_0000",
            },
            //...
        },
        //...
    },
    //...
}
```

#### walkergearpark

A list of routes that soldiers will leave Walker Gears at when they
return to the Sneak phase. These are not grouped and are just a direct
list of routes for the CP, which can't be merged into the common route
set.

``` lua
this.routeSets={
    afgh_sovietBase_cp = {
        walkergearpark = {
            "rts_sovietBase_walkerGearPark0000",
            "rts_sovietBase_walkerGearPark0001",
            "rts_sovietBase_walkerGearPark0002",
        },
        //...
    },
    //...
}
```

#### outofrain

A list of routes soldiers will temporarily use when it rains or a
sandstorm comes in. Usually they're placed indoors or under a roof.
These are also not grouped and are a direct list of routes, which also
can't be merged into the common route set.

``` lua
this.routeSets={
    afgh_sovietBase_cp = {
        outofrain = {
            "rt_field_r_0000",
            "rt_field_r_0001",
            "rt_field_r_0002",
            "rt_field_r_0003",
            "rt_field_r_0004",
            "rt_field_r_0005",
            "rt_field_r_0006",
            "rt_field_r_0007",
            "rt_field_r_0008",
            "rt_field_r_0009",
            "rt_field_r_0010",
            "rt_field_r_0011",
            "rt_field_r_0012",
            "rt_field_r_0013",
            "rt_field_r_0014",
            "rt_field_r_0015",
            "rt_field_r_0016",
        },
        //...
    },
    //...
}
```