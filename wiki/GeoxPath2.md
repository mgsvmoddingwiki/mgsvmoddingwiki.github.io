---
title: GeoxPath2
permalink: /GeoxPath2/
tags: [Entities, FoxKit, Geo]
---

**GeoxPath2** entity makes it possible to create nodes on the map where
the player can interact with specific places in the environment.
Climbling, jumping and hanging are some of the examples.

List of the tags:
<https://drive.google.com/open?id=1O_3mzxlP5WEyq8QOcoGsCHowzYaRHoDt>

Some tags still need more study to know how to use them. For now, here
are some common, easy and useful tags to start with:

`Climb, Elude, Fence and Jump`

The minimal nodes and edges seems to be two nodes and one edge. Four
nodes for three edges, eight nodes for seven edges, and so on. Basically
the nodes are always the edges + 1.

Notice that the nodes are parented with the **Transform Position** of
the entity.

The **Fence** tag seems to work if the nodes are in a horizontal line,
same for **Elude** and **Jump**. But things like the **climb** tag works
with the nodes in a vertical position too.

FoxKit can build GeoxPath2, but is missing the choice to order the nodes
with the edges for now. The user has to manually edit the **Outlink**
and the **Edges** address in its XML file instead. See the image below
to understand how it works.

The first node is at the same place as the **Entity Transform**, so it's
0,0,0. The second node together with the first one will create a line
where the player will receive the action icon of the tag.

Each first GeoxPathNode has an **Outlink** to the first edge, and the
second GeoxPathNode has a **Outlink** to the second edge, IF it exists.
In the Image below there is only one GeoxPathEdge.
[thumb|464x464px](/File:ClimbNodesEdges.jpg "wikilink") Take some time
to look at the GeoxPath2 in
'''\\Chunk2\\Assets\\tpp\\level\\location\\afgh\\block_large\\waterway\\afgh_waterway_path.fox2
'''(found inside the '''afgh_waterway.fpkd '''in
**\\Assets\\tpp\\pack\\location\\afgh\\pack_large**). Inside that, one
GeoxPath2 uses a climb tag with three nodes and two edges. The first
node has an **Outlink** with the first edge. The second node has an
**Outlink** with the first edge and the second edge. Finally, the third
node has an **Outlink** with the second edge... Yeah it's quite
confusing.

Another setting of the GeoxPath2 is the **selectIndex**, which'''
'''seems to have values similar to the amount of nodes or edges?... or
the nodes + edges. But I lack any info about it. So far a number equal
to the amount of nodes make it
[thumb|359pxwork](/File:Unknown.png "wikilink").

This is the minimal info enough to start with the Entity GeoxPath2.

Image
reference: https://drive.google.com/uc?id=15ii6crOxoGsQ0jt_taA4fYuH16FOkwLL

Image reference
\#2: https://cdn.discordapp.com/attachments/364177950805065732/713501348200710157/unknown.png (it's
the same as the 3rd image on this page)

## nodeTags[thumb|359x359px](/File:GeoxPath2ExampleFence.jpg "wikilink")

To be written...

## edgeTags

|               |                                                                                                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ToIdle        | Make the player walk more steps after the climbing is done                                                                                                                                                                 |
| Window        | Fires a sound similar to Intrude Cam and after the climbing it does a small step forward                                                                                                                                   |
| EnableFall    | Make the player walk more steps after climbing, same as ToIdle...                                                                                                                                                          |
| FallNear      | Make the Player stop moving forward after climbing                                                                                                                                                                         |
| LineCheck     | TBD                                                                                                                                                                                                                        |
| FenceToStepOn | The distance where the player starts climbing here is different than the tags above. It's a short distance. Seems like this one work better for box or square models, while the others tags are better for rounded models. |

**Fence**

Best config to Close a Square Model is to set five nodes and four edges.
Load three tags at once, Fence, Jump and Urgent. Fence for Climbing,
Jump for get out "flying" and Urgent for fast grab if fall. Set the
position quite near to the model and add edgeTag "**FenceToStepOn**" to
land right after Climb.

## Orientation Axis using GeoxPath2

The order and direction of Blue Axis and Red Axis matter to Fence,
StepOn, Jump, Behind, Elude and Urgent work properly. See image. The
Blue Axis lead the direction to start the Nodes. The Red Axis should
face the player action and therefore the Action will only occurs in that
side even for Jump and Elude. Behind is the only one that need to be
lower, at the bottom of model/wall.
[left|830x830px](/File:AxisGeoxPath2.jpg "wikilink")