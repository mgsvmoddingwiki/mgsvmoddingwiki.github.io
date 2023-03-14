---
title: Weather
permalink: /Weather/
---

Through Lua scripting, the weather, atmosphere, and mood of the game can
be customized in side ops. This page lists some tips and tricks for
achieving various weather and atmosphere effects.

## Color Correction

You can override the color correction [LUT](/LUT "wikilink") (look-up
texture) in order to change the game's color grading. After creating
your LUT, you need to load it into the game in a fox2 file using a
TppTextureLoader entity:

<entity class="TppTextureLoader" classVersion="1" addr="0x02D7E550" unknown1="160" unknown2="1260440">
`  `<staticProperties>
`   `<property name="name" type="String" container="StaticArray" arraySize="1">
`     `<value>`TppTextureLoader0000`</value>
`   `</property>
`   `<property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
`     `<value>`0x02D7E0F0`</value>
`   `</property>
`   `<property name="textures" type="Path" container="StringMap" arraySize="3">
`     `<value key="YOUR KEY HERE">`/Assets/*PATH TO LUT*.ftex`</value>
`   `</property>
`   `<property name="forceLargeTextures" type="Path" container="StringMap" />
`  `</staticProperties>
`  `<dynamicProperties />
</entity>

Inside the textures property, assign a key (name) for the LUT, replacing
"YOUR KEY HERE" with it. Provide the path to the LUT's ftex, which will
create a mapping between your key and the texture file.

Now you can set the color correction LUT in Lua like this:

`TppWeather.OverrideColorCorrectionLUT("YOUR KEY HERE")`

You can put that function call somewhere like your side op's
OnInitialize().

In order to restore the color correction LUT to what it was before, use
this function call:

`TppWeather.RestoreColorCorrectionLUT()`

Put that somewhere like your side op's OnTerminate on OnTerminateQuest
in order to reset the color correction LUT when the side op ends or is
unloaded.