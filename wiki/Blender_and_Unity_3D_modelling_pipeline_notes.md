---
title: Blender and Unity 3D modelling pipeline notes
permalink: /Blender_and_Unity_3D_modelling_pipeline_notes/
---

## Blender 2.81+

#### Fmdl Studio Steps Part 1

1.  Use the *Fmdl Studio \> Convert to COLLADA* menu option to export
    your model.

#### Blender Steps Part 1

1.  Follow the instruction for installing the
    io_import_collada_normals plugin on [this
    page](https://github.com/BobDoleOwndU/FMDL-Studio-v2/wiki/Setting-up-Fmdl-Studio-v2#blender-users-only-install-the-io_import_collada_normals-plugin).

**Note:** The reason we need to install this plugin is that currently,
Blender does not import COLLADA files' normals by default. Since fmdls
are usually split into several meshes, generated normals will look
incorrect. With the plugin, we can import the model with the original
normals intact.

#### Blender Steps Part 2

1.  Import the COLLADA file using the *File \> Import \> Collada w/
    Normals (.dae)* menu option.
2.  Remove the 90° X Rotation from the armature.
3.  Edit the model to get your desired result.
4.  Apply the location on any reposition meshes through the *Object \>
    Apply \> Location* menu option while in Object Mode.
5.  Apply the rotation on any rotated meshes through the Object \> Apply
    \> Rotation menu option while in Object Mode.
6.  Apply the scale on any scaled meshes through the Object \> Apply \>
    Scale menu option while in Object Mode.
7.  After the above three steps, the mesh's location and rotation should
    both be at 0, 0, 0. The scale should be 1, 1, 1. If they are, the
    transforms have been applied correctly.
8.  Export the model as COLLADA.

#### Fmdl Studio Steps Part 2

1.  Import the COLLADA file into Unity and bring it into the scene.
2.  Position the model in the scene at 0, 0, 0.
3.  Remove the 270° X rotation from the model. It should now be oriented
    correctly.
4.  Generate the bounding boxes through the *Fmdl Studio \> Generate
    Bounding Boxes* menu option. If the bounding boxes look correct, the
    transforms were correctly applied in Blender. If they look incorrect
    (i.e. too big/don't match the model), it's likely that your
    transforms were not correctly reset in Blender, and need to be fixed
    in Blender before the model can be successfully converted to an
    fmdl.
5.  Go through the rest of the Fmdl Studio process and export your model
    to fmdl.
6.  Done\!

## 2.7 and below

A very haphazard guide (mostly my own notes) of the ins and outs for
getting models out of Unity to edit in Blender and exporting them to
Unity again.

Prerequisites.

I will assume you know the basics of setting up FMDL studio and how to
assign materials, etc. If not, please check out the wiki page for it
here:

<https://github.com/BobDoleOwndU/FMDL-Studio-v2/wiki>

Guide:

1.  Export the file you want to edit as Collada.
2.  Use Autodesk's FBX 2013.3 converter to convert the Collada file to a
    BINARY 2013 FBX file. This gets us past a bug in the current version
    of Blender where custom normals are not imported from Collada files.
    <https://developer.blender.org/T49814>. Unfortunately as well, FMDL
    Studio only exports ASCII FBX files and Blender only imports binary
    FBX files. The FBX Converter is available from here:
    <https://www.autodesk.com/developer-network/platform-technologies/fbx-converter-archives>
    and I've made a backup available of it here:
    <https://drive.google.com/file/d/1o_HXjrzDECFyPeqPMvZKaqkfoI1bYQis/view?usp=sharing>
3.  Import the model into Blender (yes, the model is absurdly shiny, but
    that's fine). Select the top-level Armature on the right, make sure
    Blender is in object mode and press 'N' to open up the transform
    menu. By default you should see that the model is imported with a
    +90 degree rotation on the X axis. Unity and Blender don't play well
    because Blender's "Up" axis is Z, while Unity's is Y, so we'll need
    to edit the rotation once we're done our own edits.
4.  Make your intended edits of the model.
5.  Having done the edits, we want to export it back out. See below for
    the export notes.
6.  Import the model into Unity (Add new asset). At this point, our
    model will no doubt be upside down and facing all kinds of weird
    ways. Drag the model into the Unity scene and unpack the prefab from
    the rightclick menu. On the right hand properties menu, reset the
    rotation back to 0 for all 3 X,Y,Z positions on the toplevel object
    itself. Looking good right? Nearly.
7.  Expand the toplevel object and at the bottom we will have our
    \[Root\] bone. Select it, set the X rotation back to 0 and ta-da\!
    The model is now oriented correctly.
8.  Time to assign the materials, the fox model component and do the
    bounding boxes, as usual.

## Model export notes.

I'm still researching the most consistent steps to follow to get models
out of blender and into Unity, with the correct orientation, bone
position and bounding boxes generation. The following are two methods
that have worked several times over:

1.  With the model standing upright at 0,0,0 (press ctrl+A in "object
    mode" and select Apply Rotation), apply a -90 degree rotation on the
    X axis so it's lying on its back. Then export as Collada and check
    the "apply global transform" in the export dialog with -Z "forward"
    and Y "up".
2.  Place the model laying on its back at 0,0,0, (reset the transform
    with Ctrl + A as above), apply a +90 degree rotation on the X axis
    so it's standing up straight again. Reset the transform again to
    0,0,0 for the top-level armature object. Important to note now is
    that the meshes are also saying they have a +90 degree rotation, but
    they still look fine. Do not reset the transforms on the meshes.
    Export as Collada and this time do not tick the global transform
    box.

## Old information.

Since the release of FMDL Studio 1.9.3 Beta, the bounding boxes code
generation has been corrected and should generate the bounding boxes
correctly in all cases. Consider this information outdated, but maybe
useful:

I noticed that hitting the bounding boxes button will cause the boxes to
stretch into infinity. There are 2 currently known methods around this:

1.  1\) (Thanks to Franzyd for this info) Make the root bone bounding
    box about as wide as the model itself (eyeball it) and make all the
    other bounding boxes for every bone smaller than that but of equal
    size to one another.
2.  2\) Do it the "I'm lazy way". Export the model from FMDL Studio as
    an FBX file and re-import it. Then hit the bounding boxes button
    again and FMDL should roughly get it right first time. Some tweaking
    will probably be needed at this stage.

[Category:Guides](/Category:Guides "wikilink")
[Category:Rendering](/Category:Rendering "wikilink")