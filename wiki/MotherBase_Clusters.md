---
title: MotherBase Clusters
permalink: /MotherBase_Clusters/
---

Each section of MotherBase/a FOB is called a cluster.

Each cluster may have up to four platforms.

Platforms may also be referred to as plants (which may be abbreviated to
plnt).

A clusters grade is the number of platforms built for it, with 0 being
no platforms for cluster.

Plant Id may be 0 indexed or 1 indexed depending on the function using
it, usually if the function is exe based it will be from 0, lua based
from 1.

With the lowest Id representing the unique platform for the cluster.

## Cluster Ids

May be referenced in files and lua either 0 indexed or 1 indexed
depending on the function using it, usually if the function is exe based
it will be from 0, lua based from 1.

In some cases in lua a list of cluster names may be used in a different
order/will not conform to the standard clusterIds.

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

## Layout Codes

Set by vars.mbLayoutCode layouts are positions and orientations of
clusters and platforms.

For a given range of a layout there is actually four layouts, indexed
from 0 to account for the available connections from the center/command
cluster depending on the number of plaftorms built for that cluster.

**MotherBase Layout codes**

0-3

**FOB Layout codes**

10-13

20-23

30-33

40-43

50-53

60-63

70-73

80-83

90-93 [Category:Lua](/Category:Lua "wikilink")