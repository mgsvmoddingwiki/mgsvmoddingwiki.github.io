---
title: UIGB
permalink: /UIGB/
tags: [File Formats, UI]
---

The .uigb format is a binary file format used in Fox Engine to store a
UiGraph, which encapsulates and manages a set of user interface assets.
The format is still not fully reverse engineered.

## Overview

A UiGraph is a node graph format which contains five main types of
nodes:

  - UiPageNode
  - UiPhaseNode
  - UiEventNode
  - UiActionNode
  - UiOperationNode

In addition to containing nodes and edges, a UiGraph can reference
external files such as .uilb (layout) files, .uia (animation) files, and
even other .uigb files.

One of the primary challenges of understanding the format is the large
number of hashes it uses. In addition to each node class name being
hashed, properties are referenced by hash and often have hash values.
While some have been uncovered, many still remain a mystery, making
understanding what a given property does, much less its owning node
class, a challenge.

There is also a large number of subclasses of the basic node types. Here
are the ones which have currently been discovered.

### UiEventNode subclasses

| Hash       | Name                     | Found in                          | Description |
| ---------- | ------------------------ | --------------------------------- | ----------- |
| 387457081  | UiEvTriggerNode          | scrollbar.uigb                    |             |
| 4056320095 | EvControlSubtitlesNode   |                                   |             |
| 1132904100 | UiEvScriptNode           | map.uigb                          |             |
| 4086693208 | UiEvTimerNode            |                                   |             |
| 3328748391 | UiEvSelectNode           |                                   |             |
| 3163851170 | UiEvControllerNode       |                                   |             |
| 2794031067 | HeadMarkMarkerEvCallNode | headmark_marker.uigb             |             |
| 3811152451 | GameOverEvCallNode       | game_over.uigb                   |             |
| 3289094937 |                          | mb_dvc.uigb                      |             |
| 4218853920 |                          | mb_dvc_menu.uigb                |             |
| 2209625524 |                          | start_title.uigb                 |             |
| 1029062350 | NoticeDirEvCallNode      | notice_dir.uigb                  |             |
| 1335296452 | DamageDirEvCallNode      | damage_dir.uigb                  |             |
| 1548172620 |                          | mb_dvc_title.uigb               |             |
| 3650117291 |                          | mb_dvc_title.uigb               |             |
| 553707658  | KeySettingEvCallNode     | option_key_setting.uigb         |             |
| 3540561745 | EulaEvCallNode           | eula.uigb                         |             |
| 822423478  | TimeCigaretteEvCallNode  | time_cigarette.uigb              |             |
| 3493125727 | WalkmanEvCallNode        | walkman.uigb                      |             |
| 2490646102 | DisplayTimerEvCallNode   | display_timer.uigb               |             |
| 1402779846 | PopupEvCallNode          | popup.uigb                        |             |
| 3419581678 | SaveLoadEvCallNode       | saveload_ingame.uigb             |             |
| 1570974952 | CqcIconEvCallNode        | cqc_action_icon.uigb            |             |
| 2064477394 | ActionIconEvCallNode     | action_icon.uigb                 |             |
| 3448827577 | EquipCrossEvCallNode     | equip_cross.uig                  |             |
| 2755355081 | WorldMarkerEvCallNode    | world_marker.uigb                |             |
| 1080635794 | TppGameOverEvCall        |                                   |             |
| 3424538963 | TppInstallEvCallNode     |                                   |             |
| 693978763  | DemoPauseEvCallNode      | demo_pause.uigb                  |             |
| 303948018  |                          | map.uigb, mb_dvc_gz_map.uigb   |             |
| 359322064  |                          | demo_p31_010010_sandstorm.uigb |             |
| 2835314347 | EvSubtitlesNode          | SubtitlesBasic.uigb               |             |

### UiActionNode subclasses

| Hash       | Name                      | Found in                  | Description |
| ---------- | ------------------------- | ------------------------- | ----------- |
| 4161305626 | UiActDisplayNode          | demo_provisional.uigb    |             |
| 3936517678 | UiActScriptNode           | tilelist.uigb, tab.uigb   |             |
| 3355990556 | UiActAnimationNode        | tabcursor.uigb            |             |
| 762754712  | UiActTextureNode          | tabcursor.uigb, tab.uigb  |             |
| 1212229654 | UiActTransformNode        | SubtitlesBasic.uigb       |             |
| 3526460790 | UiActColorNode            |                           |             |
| 2481144418 | UiActFadeSceneNode        |                           |             |
| 1618112073 | UiActPageChangeNode       | demo_pause.uigb          |             |
| 1516971955 | UiActPhaseChangeNode      | foxengine_logo.uigb      |             |
| 1132903556 | UiActSoundNode            |                           |             |
| 594098297  | UiActSendTriggerNode      |                           |             |
| 2414984170 | UiActSetTextNode          | SubtitlesBasic.uigb       |             |
| 1655745168 | UiActColorGroupNode       |                           |             |
| 1459057519 | UiActPriorityNode         |                           |             |
| 460711256  | UiActAddWindowNode        |                           |             |
| 2964015700 | UiActConnectComponentNode | demo_pause.uigb          |             |
| 1363932755 |                           | tilelist.uigb             |             |
| 3661971897 | MbCommonPopupActNode      | mb_common_popup.uigb    |             |
| 618710194  | KeyMappingActNode         | option_key_mapping.uigb |             |
| 1530452003 |                           | recordtitle.uigb          |             |
| 2322539195 |                           | game_pause.uigb          |             |

### UiOperationNode subclasses

| Hash       | Name                          | Found in        | Description |
| ---------- | ----------------------------- | --------------- | ----------- |
| 3048924616 | UiOpeSwitchNode               |                 |             |
| 211157817  | UiOpeAndNode                  |                 |             |
| 3628566006 | UiOpeOrNode                   | game_over.uigb |             |
| 2414032825 | UiOpeGreaterThanNode          |                 |             |
| 2688149979 | UiOpePushFloatNode            |                 |             |
| 4103982738 | UiOpePushTextNode             |                 |             |
| 1830337801 | UiOpePushColorNode            |                 |             |
| 3471508532 | UiOpePushArrayNode            |                 |             |
| 262091004  | UiOpePushResourceNode         |                 |             |
| 1895623951 | UiOpeCompareNode              |                 |             |
| 4260229017 | UiOpeGetPropertyNode          |                 |             |
| 2630584519 | UiOpeTriggerParamToStringNode |                 |             |

## Format

There are two known .uigb formats: one used in GZ and one used in TPP.
The GZ format has not yet been reversed, so this format specification
refers exclusively to TPP.

### Header

  - 0x0 - 0x3 (string): 'UIGB.' Format signature.
  - 0x4 (uint8): Magic number. Always 1.
  - 0x5 (uint8): Version number. 0 in GZ and 1 in TPP.
  - 0x6 - 0x7 (uint16): Padding.
  - 0x8 - 0x9 (uint16): Number of nodes.
  - 0xA (uint8): Number of .uilb file references.
  - 0xB (uint8): Number of .uigb file references.
  - 0xC (uint8): Magic number. Always 1.

<!-- end list -->

  - 0xD (uint8): Number of Section 6 entries.
  - 0xE - 0xF (uint16): Number of external files referenced.
  - 0x10 - 0x13 (uint32): Number of StrCode32 hashes in the hash table.
  - 0x14 - 0x17 (uint32): Node table offset.
  - 0x18 - 0x1B (uint32): Layout table offset.
  - 0x1C - 0x1F (uint32): Section 4 offset.
  - 0x20 - 0x23 (uint32): Unknown.
  - 0x24 - 0x27 (uint32): Section 6 offset.
  - 0x28 - 0x2B (uint32): .uilb hash table offset.
  - 0x2C - 0x2F (uint32): Number of bytes in Section 5.
  - 0x30 - 0x33 (uint32): Unknown.
  - 0x34 - 0x37 (uint32): Section 5 offset.