---
title: MG Sahelanthropus Hellbound Search Missiles
permalink: /AI/mgs/mgs_hellsearchmissiles/
tags: [AI, Metal Gear]
---

## General Information

![Sahelanthropus Search Missile](/assets/AI/images/mgs/shln_seachmissile.png){:.thumb .right}

Search Missiles used by Sahelanthropus Hellbound have the function to patrol areas defined with Routes, they alert Sahelanthropus if the player is detected with their red laser, Sahelanthropus then heads towards that area to investigate.<br>
Search Missiles are used by Sahelanthropus after it goes from `PHASE_ALERT` to `PHASE_CAUTION` (this is controled by the .exe), Sahelanthropus will always use the closest search missile entities the player position.<br><br>
Unfortunately, the duration that search missiles are active is controlled on the .exe<br>

{% include spoiler-start title="More Information" %}

- Model Location
	- Main: `/Assets/tpp/mecha/mgs/Scenes/mgs0_srcm0_def.fmdl`
- Common Pack
	- Pack Name: `MISSION_COMMON_PACK.SAHELAN`
	- Location: `/Assets/tpp/pack/mission2/common/mis_com_sahelan.fpk`
- TppSearchMissilePointData
	- flag: `7`
	- Type: `0` (`normal` on foxkit)
- connectPointFile
	- Main: `/Assets/tpp/mecha/mgs/Scenes/mgs0_srcm0_def.fcnp`
- GeomSkeleton
	- Main: `/Assets/tpp/mecha/mgs/Scenes/mgs0_srcm0_def.gskl`
- FoxTargetDescription (Hitboxes)
	- Main (Target): `/Assets/tpp/parts/mecha/mgs/SrcmTargetDefense.tgt`
- General Effects
	- TailSmoke: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet02_s3.vfx`
	- BackFire1: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet01_s1.vfx`
	- MoveFireFront1: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet01_s1.vfx`
	- MoveFireBackLeft1: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet01_s1.vfx`
	- MoveFireBackRight1: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet01_s1.vfx`
	- BackFire2: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet01_s1.vfx`
	- BackFire3: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet01_s1.vfx`
	- MoveFireFront2: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet01_s1.vfx`
	- MoveFireBackLeft2: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet01_s1.vfx`
	- MoveFireBackRight2: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrcjet01_s1.vfx`
- Route events
	- Edge event: `All`
	- Node event: `Stand Idle`

{% include spoiler-end %}

## How to set up Search Missiles for Hellbound AI

In order to make Search Missiles work while using Hellbound AI, you will need routes, `TppSearchMissilePointData` entities on a dataset and of course, link the routes to the dataset entities.<br>
Lets start with the routes.

>For this you need to know how Routesets and routes work, how they are created, managed and loaded on both foxkit and in the game, im not going to explain that here.
{:.important}

### Routes for Search Missiles

First you need to create the routes you want (the name can be whatever you want but keep in mind that you are going to need it later and please, don't use special characters on the names).<br><br>

The Search Missile will follow the route but the laser will be pointing at random directions(?).<br> The edge event must be `All` and the node event, if you want to use one, must be `Stand Idle`, you can use `Stand Idle` to make it look at an direction during a certain time defined on it. Here is an example of an route for it that covers the Power Plant main building:<br>

![The route its the yellow line](/assets/AI/images/mgs/shln_search_missile_route_example.png)

### Dataset entity

After you have made all the routes for the search missiles, its time to create an dataset and create the entities for them, the entity that you need to use for search missiles is `TppSearchMissilePointData`.<br>

Each search missile entity can only be linked to 1 route, that means you need one `TppSearchMissilePointData` for each route you want to be used.<br>

On `TppSearchMissilePointData` transform property (`TransformEntity`), make sure that the Scale values are set to `1` (except for `w`, that one should be `0`), the rotation will not matter here and the `transform_translation` must be near the route 1st node like in the example bellow:

![The Search Missile model represents its entity transform_translation values and the route its the yellow line](/assets/AI/images/mgs/shln_searchmissile_entity_translation_example.png)

Now you must be asking yourself "why is it important that the `TransformEntity`  `transform_translation` values need to be near the route 1st node?"<br>

Well its simple, when Sahelanthropus fires the Search Missiles they don't travel to the linked route 1st node, they travel to their entity `TransformEntity` and then follow the route, unless you want the search missile to go trough walls or cliffs etc... make the `TransformEntity`  `transform_translation` values be near the 1st route node.<br>

For this example, both route 1st node and entity will share the same translation (position) values, as you can see in the 2 images bellow: 

![In this example, the route 1st node contains this values on its translation (called position on Unity3d)](/assets/AI/images/mgs/shln_searchmissile_entity_translation_example_01.png)

![The entity does have the same translation values](/assets/AI/images/mgs/shln_searchmissile_entity_translation_example_02.png)

After all this is done, the only thing left to do, is link the routes with the entities.

### Link routes with entities

Routes must be linked on the enemy subscript, the routes are declared with `missileRouteList` and then assigned with the function `SetSahelanMissileRouteList`<br>

`missileRouteList` example:
```lua
this.missileRouteList = {
	"rts_SearchMissile0000",
	"...",
}
```
`SetSahelanMissileRouteList` example:<br>
```lua
this.SetSahelanMissileRouteList = function()
	local routeList = this.missileRouteList
	local gameObjectId = {type="TppSahelan2", group=0, index=0}
	local indexNum = 0
	for k, routeName in pairs(routeList) do
		local command = {id="SetSearchMissileRouteAll", route= routeName, index=indexNum }
		GameObject.SendCommand(gameObjectId, command)
		indexNum = indexNum + 1
	end
end
```

How it works?<br>

its simple, the routes on `missileRouteList` will be linked with the entities on the dataset following their order, the 1st route on the `missileRouteList` will be linked to the 1st `TppSearchMissilePointData` on the dataset and so on.<br>

In this example i want to link the route `rt_SearchMissile_PowePlant_c_0000` with the entity `TppSearchMissilePointData0042`: 

![](/assets/AI/images/mgs/shln_searchmissile_entity_translation_example_03.png)

that means that the route will need to be the 43rd on the `missileRouteList` since we want to link it to the 43rd entity on the dataset

![](/assets/AI/images/mgs/shln_searchmissile_entity_translation_example_04.png)

If everything is done correctly, the search missiles will work fine

{% include youtube id="qYTR549UyJY" %}

>Use only 1 dataset to load `TppSearchMissilePointData` entities
{:.important}