---
title: Custom weapons
permalink: /Custom_weapons/
---

This tutorial will show you how to import/port custom weapon models to
MGSV:TPP.

**Tools needed:**

3ds max

fmdl studio

photoshop (or any other image editing software)

file proliferator

fcnp tool

fv2 tool

**Skills needed:**

basic 3ds max knowledge

basic mgsv modding knowledge



## Getting your model ready in 3ds max

import the gun you want to port into 3ds max. and use fmdl studio to
export the gun model you want to replace as an .fbx.
[center|thumb|552x552px](/File:1.jpg "wikilink") if you have your gun
model ready, import the fbx file of the original weapon and start
scaling your custom weapon so it fits the original one.
[center|thumb|414x414px](/File:2.jpg "wikilink") try to keep the area's
circled in red to somewhat match the vanilla gun, if its not possible no
worries as this can be edited.

now we are gonna rig the gun so moving parts actually move ingame.

make sure no vertices on your custom model are selected and next select
all vertices on the vanilla weapon.
[center|thumb|404x404px](/File:3.jpg "wikilink") now attach the vanilla
weapon to the custom one and delete the selected vertices.

the old weapon will be deleted now and the new one is rigged, however we
still need to edit the skin weights.

select your model and click on the skin modifier, click on edit
envelopes and also the checkbox ''vertices''.
[center|thumb|417x417px](/File:4.png "wikilink") select all the vertices
on your weapon and make sure you have select the root bone
(SKL_000_ROOT) in the skin modifier.

then drag up the abs .effect untill the max (1.0) and the vertices all
turn red. [center|thumb|415x415px](/File:5.jpg "wikilink") your whole
gun is rigged to the root bone now, next we will rig the moving parts.

in this case we will rig the slide first, so in the skin modifier select
the slide bone (SKL_001_SLIDE).

to make this easier also click the select element checkbox.
[center|thumb|319x319px](/File:6.jpg "wikilink") now select all the
parts of the gun that should move when the slide bone moves.

the whole element will be selected now, drag up the abs. effect again to
the max. [center|thumb|411x411px](/File:7.jpg "wikilink") the silde
should be red now as the picture above.

no continue to do this for all parts (hammer/trigger...)

if you want your weapon to have a rail system that apears/dissapears
when you select attachments do the same as with the gun itself.

deselect all vertices on your custom model and select them all on the
vanilla one, attach them and delete the selected vertices.

the rail should be automatically rigged to the root bone.

continue to do this if you have a model that uses multiple meshes.

now if you have rigged the whole gun we are gonna make life easier be
already naming our meshes.

all main gun parts should be named MESH_ROOT, the rail parts
MESH_RAIL_OPTION_IV.

this is important or else the rail wont go away if you dont use
attachments. [center|thumb|388x388px](/File:8.jpg "wikilink") now select
all objects in the scene and export them as an .fbx file, dont close 3ds
max yet.

now you can make your textures ready for the fox engine just as you
would normally.

weapons use bsm/ nrm/ srm/ mtm but also special camo bsm and lbm
textures for the camo patterns you can apply ingame.

an easy way to make these camo textures is by using 3ds max viewport
canvas.

apply the base texture to your model in 3ds max, then select all
elements that you want to have painted with camo and detach them.

go to tools/viewport canvas and click it.
[center|thumb|631x631px](/File:9.jpg "wikilink")

a panel should apear with option, set the paint color to white and click
on the brush icon.

now you can paint your gun parts white in the viewport.
[center|thumb|407x407px](/File:10.jpg "wikilink")

when you have painted all parts, click the brush icon again and save the
file as an .psd.

now open that .psd file with photoshop and you should have an channel
with the white painted parts.

paste the white parts over your base texture (a copy of it).
[center|thumb|463x463px](/File:11.jpg "wikilink")

now save this as your camo bsm texture.

you can edit the white parts to have more details, wear,scratches
anything.

now paint the base texture completly black and save the result as your
camo lbm texture. [center|thumb|471x471px](/File:12.jpg "wikilink")

now that we have all textures ready we can import the new .fbx into fmdl
studio and also import the gun you want to replace.

drag all materials over from the vanilla to the custom one and delete
the vanilla gun.

now this part will be a bit different then usual, in the texture part
only asign the normal map and leave the others be.
[center|thumb|453x453px](/File:13.jpg "wikilink")

make sure you have set up your fmdl parameters and export the model as
you would with any fmdl.
[center|thumb|389x389px](/File:14.jpg "wikilink")

now you need to find the specific weapons .fcnp and .fv2 files

the fcnp file should be in the same location as the .fmdl.

the .fv2 files should be assets/tpp/fova/weapon

now drag your fcnp file onto the fcnp tool and open the xml file it
generates.

load a attachment into fmdl studio together with your custom weapon.

move the attachment to where you want it attached to the gun and copy
the coordinates from it into the xml file.
[center|thumb|383x383px](/File:15.jpg "wikilink")
[center|thumb|471x471px](/File:16.jpg "wikilink")

now when you have all attachments done save the xml file and drag it
over the fcnp tool again.

this method will also be used to align the iron sights but this has to
be done by just trying to get the right values as you can set those in
fmdl studio.

now open the fv2 files with the fv2 tool and edit the texture paths to
your custom textures in the external files tab.
[center|thumb|378x378px](/File:17.jpg "wikilink")

do this for all 3 the fv2 files, main is base colors/ cam is for the
camo overlay/ clv is for the solid color camos.

when the fv2 files are done you can use file proliferator to make your
files ready for in the game.

be sure to also put your .ftex files in the right folder.

make a .mgsv file with make bite and install with snake bite and test
your weapon.

i will also include a video here made by TrikzMe with some help from me
on how to do this, although the video doesnt cover everything.

[1](https://www.youtube.com/watch?v=x5pYG-x6ctg)