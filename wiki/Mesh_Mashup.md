---
title: Mesh Mashup
permalink: /Mesh_Mashup/
---

This guide will explain the process you'll have to go through if you
want to exchange meshes between models using blender

## Intro

Let's say your objective is to put quiet's boots into the goblin
swimsuit, this will work because both leg and boot meshes share the same
bones, so something like a model from a different game, or a mesh
specific with specific bones from another fox-model will not work
without rigging it which will not be covered in this guide.

## Pipeline

1.  import all the fmdl models you want in unity, they should all be at
    0,0,0 so overlapping each other.
2.  select the desired meshes then drag and drop them inside of the
    model hierarchy you want, avoid repeating numbers such as: "5 -
    MESH_leg" and "5 - MESH_body" otherwise they'll disappear in
    blender.
3.  to export them out of unity as .dae, convert them to .fbx with the
    [autodesk fbx
    converter](https://www.autodesk.com/developer-network/platform-technologies/fbx-converter-archives)
    .
4.  import it into blender, no actual changes need to be made in it,
    it's simply the case that a "dry" swap in unity only cannot be done
    or else the model will stretch into infinity in a random direction
    when ported into the game.
5.  the model will have a 90 degree rotation on the x axis, change that
    number to 0, the model should lay flat on it's back.
6.  immediately bring it back up again by putting the value back to 90.
7.  then while having the armature selected press "ctrl+a" and select
    "rotation", this will bring the x axis' rotational values back to 0
    but the model's orientation will not visually change but all the
    meshes will have a +90 degree rotation on the x axis.
8.  now export as .dae with no global transforms with -z forward and y
    up.
9.  in unity the model's orientation should appear to be correct in the
    model preview but wrong when you drag and drop in the viewport so
    when you bring all the positional and rotational values back to 0
    the model should be centered and up straight, if that's not the case
    you screwed up some previous step.
10. now export as .fbx and reimport it back into unity, this is done so
    that the bounding boxes are generated correctly, the model will and
    should be oriented wrong, specifically it should be on it's back,
    now apply the materials and etc.
11. export it as .fmdl and reimport it, now the model should be oriented
    correctly and game ready, now export once again.

## Additional Notes

Sometimes if you're suffering from non-model related visual glitches
you'll need to implement the textures you'll use in the file structure
of your mod which would look something like this:
"Assets\\tpp\\chara\\(variable asset suffix like 'dld' or
'sna')\\Pictures". to find those textures you can double click the
texture icons in the inspector tab in unity, that will show you the
texture size, name, resolution, and location, you can use that info to
fetch the dds and drop them on the "Pictures" to later convert them back
to .ftex and .ftexs by using the .ftex tool.