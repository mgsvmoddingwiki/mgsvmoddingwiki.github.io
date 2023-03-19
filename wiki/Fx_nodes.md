---
title: Fx Nodes
permalink: /Fx_Nodes/
tags: [Effects, Reference]
---

There are a large number of nodes used in [VFX](/VFX "wikilink") files,
although not all of them have been discovered yet. Each has its own set
of parameters, which are written in .vfx files in alphabetical order.

Please add new nodes as you discover them. Also be sure to list a file
in which that node can be found.

## FxModuleGraph

There is a single instance of this node in each .vfx file, and it is the
output of the graph.

  - allFrame (uint32)
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
  - receiveName (string)

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

Example: fx_tpp_splbrdwng01_s1.vfx

  - force (float)
  - global (bool)
  - vector (Vector4)
  - vectorType (int32)

## FxColorVectorNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - color (Vector4)

## FxUniformVelocityVectorNode

Example: fx_tpp_splbrdwng01_s1.vfx

(No parameters)

## FxUniformVelocityTimeVectorNode

Example: fx_tpp_splbrdwng01_s1.vfx

(No parameters)

## FxDragTimeVectorNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - drag (float)
  - method (int32)
  - scale (float)

## FxCompositionVectorNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - maskValue (float)
  - secondMaskW (bool)
  - secondMaskX (bool)
  - secondMaskY (bool)
  - secondMaskZ (bool)

## FxOscillateVector2Node

Example: fx_tpp_splbrdwng01_s1.vfx

  - periodicity (bool)

## FxMultiplyVectorNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - maskValue (float)
  - secondMaskW (bool)
  - secondMaskX (bool)
  - secondMaskY (bool)
  - secondMaskZ (bool)

## FxPlaneRotShapeNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - autoBoundingBoxMargin (Vector4)
  - axisFix (int32)
  - axisFixParticleDirectionPoolName (string)
  - baseRot (Quaternion)
  - baseSizeScale (float)
  - boundingBoxType (int32)
  - centerU (float)
  - centerV (float)
  - cullFace (bool)
  - enable (bool)
  - localSpace (bool)
  - manualBoundingBoxOffset (Vector3)
  - manualBoundingBoxSize (Vector3)
  - numSimulatedMaxParticle (uint32)
  - rotGlobal (bool)
  - rotateOrderType (int32)
  - sortMode (int32)
  - sortOffset (float)

## FxLightInfluenceMaterialNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - ambientRate (float)
  - cameraFadeInFar (float)
  - cameraFadeInNear (float)
  - cameraZOffset (float)
  - directionalLightRate (float)
  - opaque (bool)
  - pointLightRate (float)
  - receiveShadowMap (bool)
  - shaderType (int32)
  - softBlend (bool)
  - softBlendFactor (float)
  - textureAnimeBlend (bool)
  - textureAnimeBlendFrame (float)
  - textureAnimeBlendHeight (uint32)
  - textureAnimeBlendWidth (uint32)
  - textureAnimeClamp (bool)
  - textureAnimeRandomStart (bool)
  - textureFile (string)

## FxTimeScaleVectorNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - endScale (float)
  - maskW (bool)
  - maskX (bool)
  - maskY (bool)
  - maskZ (bool)
  - startScale (float)

## FxUVMapRandomVectorNode

Example: fx_tpp_splbrdwng01_s1.vfx

  - randomDivisionHeightGrid (uint32)
  - randomDivisionWidthGrid (uint32)
  - randomFlipU (bool)
  - randomFlipV (bool)
  - randomGatherSeedValue (uint32)
  - randomGatherType (int32)

## FxDynamicLuminanceMaterialNode

Example: fx_tpp_flrrbw01_s5.vfx

  - unknownUint0 (uint32)
  - unknownUint1 (uint32)
  - unknownUint2 (uint32)
  - unknownUint3 (uint32)
  - unknownBool0 (bool)
  - unknownString0 (string)
  - unknownFloat0 (float)
  - unknownFloat1 (float)
  - unknownFloat2 (float)
  - unknownFloat3 (float)
  - unknownBool1 (bool)
  - unknownUint4 (uint32)
  - unknownFloat4 (float)
  - unknownFloat5 (float)
  - unknownUint5 (uint32)
  - unknownUint6 (uint32)
  - unknownBool2 (bool)
  - unknownBool3 (bool)
  - unknownString1 (string - texture file path)

## FxUVMapVectorNode

Example: fx_tpp_flrrbw01_s5.vfx

  - unknownUint0 (uint32)
  - unknownUint1 (uint32)
  - unknownBool0 (bool)
  - unknownBool1 (bool)
  - unknownVector0 (Vector4)

## FxSpriteRotShapeNode

Example: fx_tpp_flrrbw01_s5.vfx

  - unknownVector0 (Vector4)
  - unknownUint0 (uint32)
  - unknownUint1 (uint32)
  - unknownUint2 (uint32)
  - unknownBool0 (bool)
  - unknownBool1 (bool)
  - unknownBool2 (bool)
  - unknownVector1 (Vector4)
  - unknownVector2 (Vector4)
  - unknownUint3 (uint32)
  - unknownBool3 (bool)
  - unknownBool4 (bool)
  - unknownUint4 (uint32)
  - unknownUint5 (uint32)

## FxInfinityLifeNode

Example: fx_tpp_flrrbw01_s5.vfx

  - unknownUint0 (uint32)

## FxRandomLifeNode

Example: fx_tpp_flrrbw01_s5.vfx

  - unknownUint0 (uint32)
  - unknownUint1 (uint32)
  - unknownUint2 (uint32)
  - unknownUint3 (uint32)

## FxFirstLoopOnlyEmitNode

Example: fx_tpp_flrrbw01_s5.vfx

(No parameters)

## FxKeyframeVectorNode

Example: fx_tpp_flrrbw01_s5.vfx

Notes: Some of the float parameters have been observed to be arrays.
Observed sizes include 2 and 4.

  - unknownUint0 (uint32)
  - unknownUint1 (uint32)
  - unknownUint2 (uint32)
  - unknownUint3 (uint32)
  - unknownUint4 (uint32)
  - unknownUint5 (uint32)
  - unknownUint6 (uint32)
  - unknownFloat0 (float)
  - unknownFloat1 (float)
  - unknownFloat2 (float)
  - unknownFloat3 (float)
  - unknownFloat4 (float)
  - unknownFloat5 (float)
  - unknownUint7 (uint32)
  - unknownFloat6 (float)

## FxLodVectorNode

Example: fx_tpp_flrrbw01_s5.vfx

  - unknownFloat0 (float)
  - unknownFloat1 (float)
  - unknownFloat2 (float)
  - unknownFloat3 (float)
  - unknownFloat4 (float)

## FxUniformAccelVectorNode

Example: fx_tpp_chrquifotsmk01_s1.vfx

(No parameters)

## WindFxVectorNode

Example: fx_tpp_chrquifotsmk01_s1.vfx

  - unknownFloat0 (float)
  - unknownBool0 (bool)
  - unknownUint0 (uint32)

## FxUVAnimeIntervalVectorNode

Example: fx_tpp_chrquifotsmk01_s1.vfx

  - unknownFloat0 (float)
  - unknownBool0 (bool)
  - unknownUint0 (uint32)
  - unknownUint1 (uint32)
  - unknownBool1 (bool)
  - unknownBool2 (bool)
  - unknownBool3 (bool)
  - unknownBool4 (bool)
  - unknownUint2 (uint32)
  - unknownUint3 (uint32)
  - unknownBool5 (bool)

## FxCameraCorrectionVectorNode

Example: fx_tpp_chrwmueye01_s0.vfx

  - unknownFloat0 (float)
  - unknownUint0 (uint32)
  - unknownFloat1 (float)
  - unknownBool0 (bool)
  - unknownUint1 (uint32)
  - unknownFloat2 (float)
  - unknownFloat3 (float)
  - unknownFloat4 (float)
  - unknownFloat5 (float)

## TppLensFlareShapeNode

Example: fx_tpp_chrwmueye01_s0.vfx

  - unknownVector0 (Vector4)
  - unknownUint0 (uint32)
  - unknownUint1 (uint32)
  - unknownBool0 (bool)
  - unknownDouble0 (double)
  - unknownString0 (string - appears to be a .vfxlf path, sans path and
    extension)
  - unknownBool1 (bool)
  - unknownVector1 (Vector4)
  - unknownVector2 (Vector4)
  - unknownUint2 (uint32)
  - unknownString1 (string)
  - unknownBool2 (bool)
  - unknownFloat0 (float)

## FxReceiveVectorNode

Example: fx_tpp_chrwmueye01_s0.vfx

  - unknownBool0 (bool)
  - unknownVector0 (Vector4)
  - unknownFloat0 (float)
  - unknownBool1 (bool)
  - unknownBool2 (bool)
  - unknownBool3 (bool)
  - unknownBool4 (bool)
  - unknownBool5 (bool)
  - unknownBool6 (bool)
  - unknownString0 (string - appears to be a name; the two in
    fx_tpp_chrwmueye01_s0 were "headPosition" and "Size",
    respectively. This could be a way to interface with DataSet classes,
    however, no property of name "size" is listed in
    fx_tpp_flrlnswmueye01_s2VG.vfxlf.)

## FxTrailShapeNode

Example: fx_tpp_chrwmueye01_s0.vfx

  - unknownFloat0 (float)
  - unknownBool0 (bool)
  - unknownUint0 (uint32)
  - unknownFloat1 (float)
  - unknownFloat2 (float)
  - unknownUint1 (uint32)
  - unknownVector0 (Vector4)
  - unknownFloat3 (float)
  - unknownUint2 (uint32)
  - unknownBool1 (bool)
  - unknownUint3 (uint32)
  - unknownUint4 (uint32)
  - unknownBool2 (bool)
  - unknownVector1 (Vector4)
  - unknownVector2 (Vector4)
  - unknownUint5 (uint32)
  - unknownUint6 (uint32)
  - unknownBool3 (bool)
  - unknownUint7 (uint32)
  - unknownBool4 (bool)
  - unknownUint8 (uint32)
  - unknownUint9 (uint32)

## FxSpriteShapeNode

Example: fx_tpp_chrwmueye01_s0.vfx

  - unknownVector0 (Vector4)
  - unknownUint0 (uint32)
  - unknownFloat0 (float)
  - unknownFloat1 (float)
  - unknownBool0 (bool)
  - unknownBool1 (bool)
  - unknownBool2 (bool)
  - unknownVector1 (Vector4)
  - unknownVector2 (Vector4)
  - unknownUint1 (uint32)
  - unknownUint2 (uint32)
  - unknownUint3 (uint32)
