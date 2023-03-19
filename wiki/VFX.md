---
title: VFX
permalink: /VFX/
tags: [File Formats, Effects]
---

![The Fx editor in Fox Engine.](/assets/UjcBdMG-1-.jpg){:.thumb .legacy-small width="220px"}

An **FxVfxFile**, with the extension .vfx, is a binary file format used
by Fox Engine to define node graphs which drive visual effects.

Because of the complexity of the Fx system, the format remained
indecipherable for a long time, and would have remained unknown until
one non-binary file was found left in the
game: fx_tpp_splbrdwng01_s1.vfx, which is actually a DataSetFile2.
That one file provided insight into the structure of the .vfx
format.![Various examples of VFX usage in Metal Gear Online.](/assets/Mgo3%20vfx%20demo%20reel%20images.png){:.thumb width="220px"}
![Example of custom VFX.](/assets/MGSV%20snow%20vfx.jpg){:.thumb width="220px"} They can be unpacked and
repacked with [VfxTool](https://github.com/youarebritish/VfxTool).

## Structure

A .vfx file is a directed acylic graph of Fx nodes with a single global
output: an FxModuleGraph node. Each node produces different outputs, and
they're combined together to produce complex effects.

There are a wide variety of Fx nodes, although only a small number of
them are currently known. More research must be done to catalog the
nodes, their parameters, and what they do.

## Format

### Header

  - 0x0 - 0x2 (char\[3\] (no null terminator)): 'VFX.' Format signature.
  - 0x3 - 0x4 (uint16): Version number. Often (always?) 2.
  - 0x5 - 0x6 (uint16): Node count.
  - 0x7 - 0x8 (uint16): Edge count.
  - 0x9 - 0xE: Padding.

### Nodes

The bulk of the format is the node data, which follows the header. There
is one entry for each node. The first node is always an FxModuleGraph
node. For details on parameters, see the list of [Fx
nodes](/Fx_nodes "wikilink").

#### Node definition struct

  - 0x0 - 0x7 (uint64): StrCode hash of node class name.
  - Parameters

The parameters differ for each node class. They are listed in
alphabetical order (although the names aren't written in the file) and
can be many different data types. Before each parameter is a single
byte, usually 1, denoting the array size of the parameter.

### Edges

The nodes are followed by the graph edges, which connect nodes together.

#### FxModuleEdge struct

  - 0x0 (byte): Source node index.
  - 0x1 (byte): Target node index.
  - 0x2 (byte): Source port type.
  - 0x3 (byte): Source port index.
  - 0x4 (byte): Target port type.
  - 0x5 (byte): Target port index.
