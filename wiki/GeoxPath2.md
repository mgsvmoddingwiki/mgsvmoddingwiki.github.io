---
title: GeoxPath2
permalink: /GeoxPath2/
---

**GeoxPath2** Entity makes it possible to create nodes on the map where
the player can interact with specific places in the environment.
Climbling, Jumping, Hanging is some of the examples.

List of the Tags:
<https://drive.google.com/open?id=1O_3mzxlP5WEyq8QOcoGsCHowzYaRHoDt>

Some Tags still need more study to know how to use them. For now, here
some common, easy and useful tags to start.

`Climb, Elude, Fence and Jump`

The minimal nodes and edges seems to be Two Nodes and One Edge. Four
Nodes to Three Edges, Eight Nodes for Seven Edges. And so on.

Notice that the Nodes are parented with the Transform Position of the
Entity.

The **Fence** Tag seems to work if the Nodes are in a Horizontal line,
same for **Elude** and **Jump**. **Climb** tag work with the nodes in
Vertical.

Foxkit can build GeoxPath2, but missing the choice to order the Nodes
with the Edges. The user should edit manually in XML the Outlink and the
Edges address. See the image below to understand how it works.

The First Node is at the same place as the Entity Transform. So 0,0,0.
The Second Node move enough to create a linear where the player will
receive the action icon of the Tag.

Each First GeoxPathNode have a Outlink to the first Edge. The Second
GeoxPathNode have a Outlink to the Second Edge, IF there is a Second
Edge. In the Image below there is only one GeoxPathEdge.
[thumb|464x464px](/File:ClimbNodesEdges.jpg "wikilink") Take some time
to look the GeoxPath2 in
\\Chunk2\\Assets\\tpp\\level\\location\\afgh\\block_large\\waterway\\afgh_waterway_path.fox2.
There, one GeoxPath2 use a tag Climb with Three Nodes and Two Edges. The
first node Outlink with the First Edge. The Second Node outlink with the
First edge and the second edge. The Third Node outlink with the Last and
second edge... Well Kind confuse?

s'''electIndex '''does seems to have values similar to the amount of
Nodes or Edges. Or the Nodes + Edges. But I lack any info about it. So
far a number equal to the amount of Nodes make it work.

This is the minimal info enough to start with the Entity GeoxPath2.

Image reference
:<https://drive.google.com/uc?id=15ii6crOxoGsQ0jt_taA4fYuH16FOkwLL>
[thumb|642x642px](/File:GeoxPath2ExampleFence.jpg "wikilink")