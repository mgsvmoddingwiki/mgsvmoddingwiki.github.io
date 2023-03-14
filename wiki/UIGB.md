---
title: UIGB
permalink: /UIGB/
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
class, a challenge. [Category:File
Formats](/Category:File_Formats "wikilink")