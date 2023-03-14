---
title: Fx nodes
permalink: /Fx_nodes/
---

There are a large number of nodes used in [VFX](/VFX "wikilink") files,
although not all of them have been discovered yet. Each has its own set
of parameters, which are written in .vfx files in alphabetical order.

Please add new nodes as you discover them. Also be sure to list a file
in which that node can be found.

## FxModuleGraph

There is a single instance of this node in each .vfx file, and it is the
output of the graph.

  - allFrameSize (byte)
  - boundingBoxOffsetPos (Vector3)
  - boundingBoxOffsetSize (Vector3)
  - boundingBoxType (int)
  - debugInfo (bool)
  - effectName (uint64)
  - executionPriorityType (int)
  - fadeInEndFrame (uint32)
  - fadeOutStartFrame (uint32)
  - playMode (int)
  - updateType (int)

## FxIntervalProbabilityEmitNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - delayFrame (uint32)
  - delayFrameRandomRange (uint32)
  - emitVersion (int32)
  - fadeOutPosition (float)
  - fadeOutReverse (bool)
  - intervalFrame (uint32)
  - lifeFrame (uint32)
  - lifeRandomRangeFrame (uint32)
  - numMax (uint32)
  - numMin (uint32)
  - probability (float)
  - randomGatherSeedValue (uint32)
  - randomGatherType (int32)

## FxConstLifeNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - lifeFrame (uint32)

## FxRandomVectorNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - force (float)
  - global (bool)
  - globalEvaluateRealTimeRootRotate (bool)
  - randomGatherSeedValue (uint32)
  - randomGatherType (int32)
  - randomMax (Vector4)
  - randomMin (Vector4)
  - vectorType (int32)
  - xySquere (bool)

## FxConstVectorNode

## FxColorVectorNode

## FxUniformVelocityVectorNode

## FxUniformVelocityTimeVectorNode

## FxDragTimeVectorNode

## FxCompositionVectorNode

## FxOscillateVector2Node

## FxMultiplyVectorNode

## FxPlaneRotShapeNode

## FxLightInfluenceMaterialNode\>

## FxTimeScaleVectorNode

## FxUVMapRandomVectorNode