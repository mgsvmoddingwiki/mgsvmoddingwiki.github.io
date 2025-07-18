---
title: Marker
permalink: /Marker/
tags: [EXE, Lua, UI]
---

Markers are hud elements attached to various game entites such as: soldiers, plants, wall cracks, enemy 
location fields, etc. Markers are created automatically when player zooms in on the 
entity, uses binoculars or your intel team detects enemy presence.

![Map markers: player, plants, resources, wall cracks, target area, user-placed marker (A)](/assets/marker/map.png)

### Lua

Markers can be placed in mission scripts using `this.missionObjectiveDefine` directive:

`s10036_sequence.lua`:

```lua
this.missionObjectiveDefine = {
	default_area_field = {
		gameObjectName = "default_area_field",
		visibleArea = 5,
		randomRange = 0,
		viewType = "all",
		setNew = false,
		langId = "marker_info_mission_targetArea",
		mapRadioName = "s0036_mprg0010",
		announceLog = "updateMap",
		subGoal = 0,
	},
	marker_VIP = {
		gameObjectName = TARGET_ENEMY_NAME,
		goalType = "moving",
		viewType = "map_and_world_only_icon",
		setNew = true,
		setImportant = true,
		langId = "marker_info_mission_target",
	},
    ...
}
```

Alternatively, use `TppMarker` lua module (`data1/Assets/tpp/script/lib/TppMarker.lua`):

`s10130_sequence.lua`:

```lua
    TppMarker.SetUpSearchTarget{
        {
            gameObjectName = TARGET_HOSTAGE_NAME,
            gameObjectType = "TppCodeTalker2",
            messageName = TARGET_HOSTAGE_NAME,
            langId = "marker_chara_codetalker",
            skeletonName = "SKL_004_HEAD",
            func = this.TargetFound
        },
```

More commands are available using `TppMarker2System` built-in module. List of functions:

```
EnableMarker
SetMarkerGoalType
SetMarkerImportant
SetMarkerNew
SetMarkerInterrogation
ResetAllNewMarker
DisableMarker
DisableAllMarker
ClearMarkerOption
SetHideAll
```

### EXE

![](/assets/marker/icons.png){:.thumb .legacy-small width="200px"}

&nbsp;

Game reserves 128 slots for marker info. There are different ways to set a marker, some of them are set automatically 
like buddy and helicopter ones (how?). Markers are rendered using ui graph system ([UIGB](/UIGB/), [UILB](/UILB/)).
Head icon textures are located at `texture0/Assets/tpp/ui/ModelAsset/hud_headmark/Pictures`.

Head marker is tied to object; icon and iDroid icon caption depend on [object system type](/GameObjectTypes/).
Markers have duration, 15 seconds by default.

Functions you might be interested in:

```c++
tpp::ui::hud::impl::UiMarkerCommonDataImpl::GetUiMarkerTypeFromSystemType2
tpp::gm::player::impl::SightManagerImpl::SetMarker
tpp::ui::hud::HeadMarkMarkerEvCall::Update
```

#### Stacktraces

Setting a marker using player zoom:

{% include spoiler-start %}

```c++
	mgsvtpp.00000001496AD0A0 = tpp::gm::player::impl::UiControllerImpl::RegisterMarker
	mgsvtpp.00000001409C64D0 = tpp::gm::player::impl::Player2GameObjectImpl::ProcessSignal
	mgsvtpp.0000000146CAB07C = fox::gm::impl::GameObjectExecutionImpl::ProcessSignal
	mgsvtpp.0000000146C908E3 = fox::gm::GameObjectInstanceHandle::ProcessSignal
	mgsvtpp.0000000146C91E9A = fox::gm::impl::`anonymous_namespace'::QuarkGameObjectSystemImpl::SendSignal
	mgsvtpp.0000000149C68882 = tpp::gm::player::impl::SightManagerImpl::SetMarker
	mgsvtpp.00000001412824F7 = tpp::gm::player::impl::SightManagerImpl::UpdateMarker
	mgsvtpp.0000000149C6D0C0 = tpp::gm::player::impl::SightManagerImpl::Update
	mgsvtpp.00000001409C1DF4 = tpp::gm::player::impl::Player2GameObjectImpl::ExecuteSerially
	mgsvtpp.0000000146CA9E25 = fox::gm::impl::GameObjectLevel::ExecuteSerially
	mgsvtpp.0000000146CA89EA = fox::gm::impl::GameObjectExecuteJob::Do
	mgsvtpp.0000000142F2646A = fox::Job::Execute
	mgsvtpp.0000000142F2ADBA = fox::JobExecutor::Execute
	mgsvtpp.000000014002E5C9 = fox::impl::JobPool::Wait
	mgsvtpp.000000014311BE5D = fox::CoreFramework::Run
	mgsvtpp.0000000143119C1B = fox::CoreFramework::Go
```

{% include spoiler-end %}

Updating marker state (always runs):

{% include spoiler-start %}

```c++
	mgsvtpp.0000000145D185C3 = tpp::ui::hud::HeadMarkMarkerEvCall::Update
	mgsvtpp.000000014D72C20B = fox::ui::Event::MainProcess
	mgsvtpp.000000014D91CF24 = fox::ui::Phase::Update
	mgsvtpp.000000014D91EA8B = fox::ui::Page::Update
	mgsvtpp.000000014D85DFA7 = fox::ui::Graph::Update
	mgsvtpp.000000014D9647FC = fox::ui::WindowManager::UpdateGraphs
	mgsvtpp.0000000142F2646A = fox::Job::Execute
	mgsvtpp.0000000142F2ADBA = fox::JobExecutor::Execute
	mgsvtpp.000000014002E5C9 = fox::impl::JobPool::Wait
	mgsvtpp.000000014311BE5D = fox::CoreFramework::Run
	mgsvtpp.0000000143119C1B = fox::CoreFramework::Go
```

{% include spoiler-end %}


You can override all marker types by changing `EAX` at `0x140936686` to `0x1c` to set all markers to D-Dog.
More identificators are available in `tpp::ui::hud::impl::UiMarkerCommonDataImpl::GetUiMarkerTypeFromSystemType2`:

![](/assets/marker/original.png){:.inline width="auto"} ![](/assets/marker/sahelan.png){:.inline width="auto"} ![DD logo with fuzzy filter](/assets/marker/dd_filter.png){:.inline width="auto"} 
