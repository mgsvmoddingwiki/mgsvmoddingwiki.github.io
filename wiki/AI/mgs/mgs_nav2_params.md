---
title: Sahelanthropus Navmesh data
permalink: /AI/mgs/mgs_nav2_params/
tags: [AI, Metal Gear]
---


## Navworld / Navmesh Information
### Navworld Generation Information

- flags: `7`
- resolution: `0.5`
- verticalThreshold: `1.5`
- doesDivideIslandWithSector: `false`
- doesHoleSimplification: `true`
- holeSimplificationConvexThreshold: `10`
- holeSimplificationObbExpandThreshold: `50`
- holeSimplificationObbToAabbThreshold: `10`
- holeSimplificationSmoothingThreshold: `10`
- isHoleSimplificationDoesNotClosePassage: `false`
- holeSimplificationReduceCount: `1`
- doesAdjustSearchSpaceToNavmesh: `false`
- doesGenerateFillNavVolumeInRadius: `true`
- roughGraphFilePath:  
- roughGraphFilePtr: 
- worldName: `sahelan`
- maxFileSizeInKb: `300`
- parameters: `NavxNavigableParameter`:
	- name: `Human`
	- isDefault: `true`
	- radius: `8`
	- simplificationThreshold: `8`
	- height: `25`
	- maxClimbableAngle: `89`
	- maxStepSize: `4`
	- minArea: `0.4`
- sectorSizeHorizontal: `32`
- tileSizeHorizontal: `640`
- searchSpaceBucketSizeHorizontal: `20`
- collisionAttributes: `Sahelan`
- loadFox2FileListScriptPath:

> `mafr` does not have an entity to define this params and Sahelanthropus works fine
{:.important}

### Navmesh Information

- flags: `1`
- Path Finding Optimization
	- u4: `0`
	- u5: `0`
	- u6: `0`

## How to change flags and Path Finding Optimization values

### Flags

`flags` indicate what type of AI can use the Navmesh, usualy MGSV uses `1249`, that allows Soldiers and Animals to use the navmesh but it does not allow Sahelanthropus to use it.<br>

In order to allow Sahelanthropus to use an navmesh, the `flags` inside the `.nav2` need to be set to `1` <br>
Keep in mind that an .nav2 can contain hundreds of `flags` to edit <br>

While using the 010 editor nav2 template, flags can be found on:<br>
- `NAVWORLD`: 
	- Entry type NAVWORLD --> world --> subsection5<br>
- `Section2Entry[0]`:
	- Section2Entry --> Subsection1Entries<br><br>

>In most cases there will be more then one Entry for `NAVWORLD`, `NAVMESH_CHUNK`, `SEGMENT_CHUNK` and `NAVWORLD_SEGMENT_GRAPH`.<br>
>On `Section2Entry` only the 1st entry contains `flags` data.<br>
{:.important}

### Path Finding Optimization Params
I dont know much about this but Path Finding Optimization Params are important, Sahelanthropus wont walk if the right values are not set on the `.nav2` file.<br>

While using the 010 editor nav2 template, Path Finding Optimization Params can be found on:<br>
- `NAVWORLD_SEGMENT_GRAPH`:
	- Entry type NAVWORLD_SEGMENT_GRAPH --> navWorldSegmentGraph --> Subsection2

>**ONLY CHANGE** `u4`, `u5` and `u6`<br>
>Set those values to `0`
{:.important}


