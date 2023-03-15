---
title: MotherBase Clusters
permalink: /MotherBase_Clusters/
tags: [MotherBase, Missions, Reference]
---

Each section of MotherBase/a FOB is called a cluster.

Each cluster may have up to four platforms. Platforms may also be
referred to as plants (which may be abbreviated to plnt).

Each platform may have 1 unique or 4 divisions.

A clusters grade is the number of platforms built for it, with 0 being
no platforms for cluster. Plant Id may be 0 indexed or 1 indexed
depending on the function using it, usually if the function is exe based
it will be from 0, lua based from 1. With the lowest Id representing the
unique platform for the cluster.

## Cluster Ids

May be referenced in files and lua either 0 indexed or 1 indexed
depending on the function using it, usually if the function is exe based
it will be from 0, lua based from 1.

In some cases in lua a list of cluster names may be used in a different
order/will not conform to the standard clusterIds.

When used as part of the name uses cl%02d format, 0 indexed, ex Medical
is cl04

| id(0) | id(1) | Cluster name | Game name                |                                                                                                                       |
| ----- | ----- | ------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| 0     | 1     | Command      |                          |                                                                                                                       |
| 1     | 2     | Combat       |                          |                                                                                                                       |
| 2     | 3     | Develop      | Research and Development |                                                                                                                       |
| 3     | 4     | Support      |                          |                                                                                                                       |
| 4     | 5     | Medical      |                          |                                                                                                                       |
| 5     | 6     | Spy          | Intel                    |                                                                                                                       |
| 6     | 7     | BaseDev      | Base Development         |                                                                                                                       |
| 7     | 8     | Separation   | Quarantine Platform      |                                                                                                                       |
| 0     | 1     |              | Zoo                      | As it uses a seperate mission/is not part of mother base it uses clusterId 0, also isn't referred to by cluster name. |

## Divisions

Common platforms are divided into 4 divisions, unique covers all
4/central area of plat

Reference to the fpks seem to only be in exe:

%s/pack_division/%s_%03d%01d.%s

ex:
/Assets/tpp/pack/location/mtbs/pack_division/mtbs_division_0010.fpk

params:

1.  %s: locationPath: /Assets/tpp/pack/location/mtbs/
2.  location div str?: mtbs_division
3.  %03d: divisionId: 001
4.  %01d: subdivision? variant?: 0
5.  %s: extension: fpk

dv_0000

  - 0000 - flat base - used for container storage
  - 0010 - rectangular blocks of ducting with grated walkway on top
  - 0020 - low walkways
  - 0030 - mix of some larger weird shaped building with overhang and
    studd
  - 0040 - lotsa small silos
  - 0050 - 3 big silos
  - 0060 - the pits, two covers closed, one open - used in the kid
    falls-down-a-well story beat
  - 0061 - the pits, all covers open - used in the kid falls-down-a-well
    story beat
  - 0070 - overall raised connected blocks with under walkway and
    minipit
  - 0080 - tall tower and lower pit
  - 0090 - tall drilling righ thing
  - 0100 - vehicle/large elevator, has room to lower flush with platform
    ground level
  - 0101 - vehicle/large elevator, actually flush? or without elev?
    TODO: no actual use on MB, any uses in demos or FOB layouts??
  - 0110 - dual division: rectangular blocks similar to 10, but also low
    walkway, dual/connected divisions
  - 0111 - not sure if separate or some kind of overlay (look at texture
    vs 110 vs actual mother base map), if so it's not in line with 0110
    even though it is on ui
  - 0120 - dual division: diagonal multi level walkway, dual/connected
    divisions
  - 0121 - overlay for 0120? or is this how they handle the dual
    divisions (see 0110,0111), but then see 0130, TODO: check if there
    actually is a 0131 rather than just going by ui files
  - 0130 - seems to be same as 110, but the actual combined ui texture,
    and it's also a larger resolution?
  - 0500 - zoo pit that takes up 4 divisions
  - 0510 - ?? zoo again I guess? dual division?

uq_0000

  - 0000 - Command
  - 0010 - Combat
  - 0020 - Develop
  - 0030 - Support
  - 0040 - Medical
  - 0050 - Spy
  - 0060 - BaseDev
  - 0070 - Separation / quarantine
  - 0080 - Zoo

## Layout Codes

Set by vars.mbLayoutCode layouts are positions and orientations of
clusters and platforms.

For a given range of a layout there is actually four layouts, indexed
from 0 to account for the available connections from the center/command
cluster depending on the number of platforms built for that cluster.

FOB events run on 'fully built' bases, so the highest number in a range
(i.e. layouts 10-13 -\> mbLayoutCode == 13)

vars.mbLayoutCode is driven by
MotherBaseStage.ModifyLayoutCode(layoutCode), via
TppLocation.ModifyMbsLayoutCode, While this is set next-mission
functions in TppMission, it gets its actual value in TppMission.Load
where unless it's a story mission is driven by
TppMotherBaseManagement.GetMbsTopologyType(), with further setup via
TppLocation.ApplyPlatformParamToMbStage

You can derive the layout pack using TppPackList.AddFOBLayout

MB:

`local
layoutPack="/Assets/tpp/pack/mission2/"..missionTypeName.."/"..missionCodeName.."/"..missionCodeName..string.format("_ly%03d",vars.mbLayoutCode)..".fpk"`

FOB:

<code>local
layoutPath="/Assets/tpp/pack/mission2/"..missionTypeName.."/"..missionCodeName.."/"..missionCodeName..string.format"_area_ly%03d",vars.mbLayoutCode)

..".fpk"</code>

FOB also has clusterLayoutPack:

`local
clusterLayoutPack=layoutPath..string.format("_cl%02d",clusterId)..".fpk"`

Layouts use the packs `/pack/location/mtbs/pack_layout/mtbs_layout_[5
number layoutCode].fpk` to define the placement and types of clusters of
platforms and bridges surrounding them, and
`/pack/location/mtbs/pack_area/mtbs_area_ly[layoutCode]_cl[clusterId].fpk`
to place gimmicks and other entities that can't be parented to Mother
Base layout locators. While it's not fully known how they work, the game
will not accept empty .fpk/.fpkd at those paths when loading a layout.

Idroid/UI .mbl layout files are in
/Assets/tpp/pack/mbdvc/mb_dvc_top.fpk

Mother Base layout notes

While positions of all (except command) change between layout 0\>1, from
1\> BaseDev and Spy(Intel) doesnt move, and from 2\>3 Medical and
Support dont move

rotations change between 0\>1 (all clusters but medical and combat), but
no change between 1\>3

Game sometimes uses releative positions and rotations to the plnt or
cluster center,

which can be gotten via MotherBaseStage.GetDemoCenter and various
helpers built around that

If you want to cut down on work you may just want to support just
mbLayout 3, which has the following cluster centers

mbLayout 3

0 Command     Cluster plnt0 center: 0,0,0

1 Combat Cluster plnt0 center: 1132.5300292969,0,-606.62774658203

2 Develop Cluster plnt0 center: 1188.8494873047,0,306.6155090332

3 Support Cluster plnt0 center: 371.46563720703,0,863.11901855469

4 Medical     Cluster plnt0 center: -137.1102142334,0,-957.18774414063

5 Spy         Cluster plnt0 center: -681.25305175781,0,536.275390625

6 BaseDev     Cluster plnt0 center: -746.36590576172,0,-372.41799926758

| layoutCode | Description                                                                                                                                   | Map Image                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 00-03      | Default offline Mother Base layout code.                                                                                                      | [frameless](/File:LayoutCode_0.png "wikilink")   |
| 10-13      | Layout code used in FOBs.                                                                                                                     | [frameless](/File:LayoutCode_10.png "wikilink")  |
| 20-23      | Layout code used in FOBs.                                                                                                                     | [frameless](/File:LayoutCode_20.png "wikilink")  |
| 30-33      | Layout code used in FOBs.                                                                                                                     | [frameless](/File:LayoutCode_30.png "wikilink")  |
| 40-43      | Layout code used in FOBs.                                                                                                                     | [frameless](/File:LayoutCode_40.png "wikilink")  |
| 53         | Unused layout code. Only the .mbl UI map layout file 53 remains.                                                                              | [frameless](/File:LayoutCode_53.png "wikilink")  |
| 60-63      | Unused layout code. Only the .mbl UI map layout files 60, 61, 62 and 63 remain.                                                               | [frameless](/File:LayoutCode_63.png "wikilink")  |
| 70-73      | Layout code used in FOBs.                                                                                                                     | [frameless](/File:LayoutCode_70.png "wikilink")  |
| 80-83      | Layout code used in FOBs.                                                                                                                     | [frameless](/File:LayoutCode_80.png "wikilink")  |
| 90-93      | Layout code used in FOBs.                                                                                                                     | [frameless](/File:LayoutCode_90.png "wikilink")  |
| 100-103    | Unused layout code. Only .mbl UI map layouts 100, 101, 102 and 103 remain.                                                                    | [frameless](/File:LayoutCode_100.png "wikilink") |
| 500        | Layout code used for the Animal Conservation Platform.                                                                                        | [frameless](/File:500.png "wikilink")            |
| 900        | Unused layout code. Only the .mbl UI map layout file 900 exists, which is pretty broken.                                                      | [frameless](/File:LayoutCode_900.png "wikilink") |
| 950-953    | Unused layout code with platforms placed strangely close together. Only the .mbl UI map layout files 950, 952 and 953 remain, 951 is missing. | [frameless](/File:LayoutCode_953.png "wikilink") |
| 971        | Unused layout code with every common platform being identical and a bridge corner missing. Only the .mbl UI map layout file 971 remains.      | [frameless](/File:LayoutCode_971.png "wikilink") |
| 980        | Mentioned in TppLocation, no assets remain.                                                                                                   | N/A                                              |

layoutCodes