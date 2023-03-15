---
title: FMTT
permalink: /FMTT/
tags: [File Formats, Rendering, Textures]
---

The file type .fmtt is a reference for the material ID maps for models,
shaders load the material ID texture and use it to load the fmtt. A
condensed definition of this format would be an array of code similar to
the reference below:

``` csharp
type public MaterialPreset = {

    F0 : float32

    RoughnessThreshold : float32

    ReflectionDependDiffuse : float32

    AnisotropicRoughness : float32

    SpecularColor : ColorRGB

    Translucency : float32

}
```

It should be noted that MatParamIndex_\# parameters allow one material
to have multiple presets assigned to it. The codeblock above is a
parameter for all materials. Most notably SpecularColor. The location of
these files can be found in data1.dat. There can only be 256 material
presets assigned to this array.