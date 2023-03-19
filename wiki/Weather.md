---
title: Weather
permalink: /Weather/
tags: [Lua, Reference, Effects]
---

Through Lua scripting, the weather, atmosphere, and mood of the game can
be customized in side ops. This page lists some tips and tricks for
achieving various weather and atmosphere effects.

## Color Correction

You can override the color correction [LUT](/LUT "wikilink") (look-up
texture) in order to change the game's color grading. After creating
your LUT, you need to load it into the game in a fox2 file using a
TppTextureLoader entity:

```xml
<entity class="TppTextureLoader" classVersion="1" addr="0x02D7E550" unknown1="160" unknown2="1260440">
  <staticProperties>
   <property name="name" type="String" container="StaticArray" arraySize="1">
     <value>TppTextureLoader0000</value>
   </property>
   <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
     <value>0x02D7E0F0</value>
   </property>
   <property name="textures" type="Path" container="StringMap" arraySize="3">
     <value key="YOUR KEY HERE">/Assets/*PATH TO LUT*.ftex</value>
   </property>
   <property name="forceLargeTextures" type="Path" container="StringMap" />
  </staticProperties>
  <dynamicProperties />
</entity>
```

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

## Weather Tags

Weather parameter files (.twpf) define weather tags, which are named
collections of weather/atmosphere settings. It's not currently clear
exactly what kind of data they contain. You can change between weather
tags with this function call:

`WeatherManager.RequestTag("YOUR TAG HERE", 0 )`[`Category:Lua`](/Category:Lua "wikilink")

The list of valid weather tags varies based on the location's .twpf
file.

### afgh

  - default
  - indoor
  - indoor_noSkySpe
  - indoor_noSkySpe_RLR
  - indoor_RLR
  - indoor_RLR_paz
  - fort_shadow_inside
  - foggy_20
  - qntnFacility
  - pitchDark
  - avatar_space
  - sortie_space
  - sortie_space_ShadowShort
  - sortie_space_heli
  - citadel_indoor
  - soviet_hanger
  - soviet_hanger2
  - Sahelan_fog
  - Sahelan_RedFog
  - factory_fog
  - factory_fog_indoor
  - VolginRide
  - mafr_forest
  - uq0040_p31_030020
  - heli_space
  - tunnel
  - diamond_tunnel
  - fort_shadow_outside
  - ruins_shadow
  - slopedTown_shadow
  - shadow_middle
  - shadow_long
  - citadel_color_shadowMiddle
  - citadel_color_shadowLong
  - temp_CaptureLongShadow
  - citadel_redDoor
  - factory_Volgin_shadow_middle
  - factory_Volgin_shadow_long
  - bridge_shadow
  - cypr_day
  - cypr_title
  - kypr_indoor
  - group_photo
  - edit
  - probe_check
  - exposureAdd_1
  - citadel_color
  - exposureSub_1
  - bloomAdd_1
  - cypr_Night_RLR
  - cypr_Night_RLR2
  - citadel_color2
  - kypr_drizzle

### mafr

  - default

<!-- end list -->

  - indoor
  - indoor_noSkySpe
  - indoor_noSkySpe_RLR

<!-- end list -->

  - indoor_RLR
  - indoor_RLR_paz
  - fort_shadow_inside
  - foggy_20
  - qntnFacility
  - pitchDark
  - avatar_space
  - sortie_space
  - sortie_space_ShadowShort
  - sortie_space_heli
  - citadel_indoor
  - soviet_hanger
  - soviet_hanger2
  - Sahelan_fog
  - Sahelan_RedFog
  - factory_fog
  - factory_fog_indoor
  - VolginRide
  - mafr_forest
  - uq0040_p31_030020
  - heli_space
  - tunnel
  - diamond_tunnel
  - fort_shadow_outside
  - ruins_shadow
  - slopedTown_shadow
  - shadow_middle
  - shadow_long
  - citadel_color_shadowMiddle
  - citadel_color_shadowLong
  - temp_CaptureLongShadow
  - citadel_redDoor
  - factory_Volgin_shadow_middle
  - factory_Volgin_shadow_long
  - bridge_shadow
  - cypr_day
  - cypr_title
  - kypr_indoor
  - group_photo
  - edit
  - probe_check
  - exposureAdd_1
  - citadel_color
  - exposureSub_1
  - bloomAdd_1
  - cypr_Night_RLR
  - cypr_Night_RLR2
  - citadel_color2
  - kypr_drizzle

### mtbs

  - default
  - indoor
  - indoor_noSkySpe
  - indoor_noSkySpe_RLR
  - indoor_RLR
  - indoor_RLR_paz
  - fort_shadow_inside
  - foggy_20
  - qntnFacility
  - pitchDark
  - avatar_space
  - sortie_space
  - sortie_space_ShadowShort
  - sortie_space_heli
  - citadel_indoor
  - soviet_hanger
  - soviet_hanger2
  - Sahelan_fog
  - Sahelan_RedFog
  - factory_fog
  - factory_fog_indoor
  - VolginRide
  - mafr_forest
  - uq0040_p31_030020
  - heli_space
  - tunnel
  - diamond_tunnel
  - fort_shadow_outside
  - ruins_shadow
  - slopedTown_shadow
  - shadow_middle
  - shadow_long
  - citadel_color_shadowMiddle
  - citadel_color_shadowLong
  - temp_CaptureLongShadow
  - citadel_redDoor
  - factory_Volgin_shadow_middle
  - factory_Volgin_shadow_long
  - bridge_shadow
  - cypr_day
  - cypr_title
  - kypr_indoor
  - group_photo
  - edit
  - probe_check
  - exposureAdd_1
  - citadel_color
  - exposureSub_1
  - bloomAdd_1
  - cypr_Night_RLR
  - cypr_Night_RLR2
  - citadel_color2
  - kypr_drizzle

### cypr

  - default
  - indoor
  - indoor_noSkySpe
  - indoor_noSkySpe_RLR
  - indoor_RLR
  - indoor_RLR_paz
  - fort_shadow_inside
  - foggy_20
  - qntnFacility
  - pitchDark
  - avatar_space
  - sortie_space
  - sortie_space_ShadowShort
  - citadel_indoor
  - soviet_hanger
  - soviet_hanger2
  - Sahelan_fog
  - Sahelan_RedFog
  - factory_fog
  - factory_fog_indoor
  - VolginRide
  - mafr_forest
  - uq0040_p31_030020
  - heli_space
  - tunnel
  - diamond_tunnel
  - fort_shadow_outside
  - ruins_shadow
  - slopedTown_shadow
  - shadow_middle
  - shadow_long
  - citadel_color_shadowMiddle
  - citadel_color_shadowLong
  - temp_CaptureLongShadow
  - citadel_redDoor
  - factory_Volgin_shadow_middle
  - factory_Volgin_shadow_long
  - bridge_shadow
  - cypr_day
  - cypr_title
  - kypr_indoor
  - group_photo
  - edit
  - probe_check
  - exposureAdd_1
  - citadel_color
  - exposureSub_1
  - bloomAdd_1
  - cypr_Night_RLR
  - cypr_Night_RLR2
  - edit_1
  - citadel_color2
  - edit_2
  - kypr_drizzle

### gntn

  - default
  - under
  - dark
  - shadowLong
  - bake
  - bake_sky
  - e20060_lightOff



## ParameterNames

### TppGlobalVolumetricFog

| Name                   | Notes |
| ---------------------- | ---   |
| density                |       |
| power                  |       |
| fogDirLightGain        |       |
| color(.R)              |       |
| color(.G)              |       |
| color(.B)              |       |
| skyAlbedo(.R)          |       |
| skyAlbedo(.G)          |       |
| skyAlbedo(.B)          |       |
| rayleighScattering(.R) |       |
| rayleighScattering(.G) |       |
| rayleighScattering(.B) |       |
| mieScattering(.R)      |       |
| mieScattering(.G)      |       |
| mieScattering(.B)      |       |
| Param 262              | TBW   |
| luminance              |       |
| Param 267              | TBW   |
| mieAnisotropy          |       |
| exposureOffset0        |       |
| exposureOffset0_Ev    |        |
| exposureOffset1        |     |
| exposureOffset1_Ev    |     |
| exposureOffset2        |     |
| exposureOffset2_Ev    |     |
| Param 277              | TBW |
| Param 278              | TBW |

### TppAtmosphere

| Name | Notes                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------- |
| Param 514                                  | TBW                                                                               |
| starLight                                  |                                                                                   |
| Param 517                                  | TBW                                                                               |
| skyColorSunScale                           | Bright sky to dark or white. Between 0-5                                          |
| skyLightSunScale                           | 0 disappear directionl light, while anything above 1 make light and shadow strong |
| Param 521                                  | Bright specular                                                                   |
| shadowRange                                |                                                                                   |
| shadowRangeExtra                           |                                                                                   |
| hiResShadowRange                           |                                                                                   |
| shadowProjectionRange                      |                                                                                   |
| shadowfadeRange                            |                                                                                   |
| selfShadowBias                             |                                                                                   |
| influenceOfFog                             |                                                                                   |
| Param 578                                  | TBW                                                                               |
| shadowRangeLimit                           |                                                                                   |
| shadowRangeFoculLengthConnectionScale      |                                                                                   |
| fogFalloff                                 |                                                                                   |
| fogFalloffStart                            |                                                                                   |
| enviromentSpecular_ShScale0               |                                                                                   |
| enviromentSpecular_ShScale0_Ev           |                                                                                   |
| enviromentSpecular_ShScale1               |                                                                                   |
| enviromentSpecular_ShScale1_Ev           |                                                                                   |
| enviromentSpecular_ShScale2               |                                                                                   |
| enviromentSpecular_ShScale2_Ev           |                                                                                   |
| enviromentSpecular_minFrontReflectionRate |                                                                                   |
| enviromentSpecular_Color(.R)              |                                                                                   |
| enviromentSpecular_Color(.G)              |                                                                                   |
| enviromentSpecular_Color(.B)              |                                                                                   |
| enableSteppedMoveOfDirectionalLight        |                                                                                   |
| divisionNumOfSteppedMove                   |                                                                                   |
| interpolateTimeInSecond                    |                                                                                   |
| dirLightFadeStart                          |                                                                                   |
| dirLightFadeLength                         |                                                                                   |
| dirLightFadeEnable                         |                                                                                   |
| Param 556                                  | TBW                                                                               |
| offsetPosY                                 | Move sky/sun in Y                                                                 |
| Param 558(.R)                              | Dark or Bright Sky color                                                          |
| Param 558(.G)                              | Dark or Bright Sky color                                                          |
| Param 558(.B)                              | Dark or Bright Sky color                                                          |
| Param 559                                  | Disable or enable sun and sky. 0-1                                                |
| starLuminanceScale                         |                                                                                   |
| Param 577                                  | TBW                                                                               |

### TppSky

| Name                      | Notes |
| ---------------------- | ------- |
| diffusion              |  |
| cloudDensity           |  |
| dom2Density            |  |
| dom3Density            |  |
| dirLightGain           |  |
| inCloudScatterGain     |  |
| ambLightGain           |  |
| cylCloudDensity        |  |
| cylBackScatGain        |  |
| cylFrontDirGain        |  |
| cylFrontAmbGain        |  |
| cloudInfluenceOfFog    |  |
| cloudInfluenceOfFogMin |  |
| cloudFogFalloff        |  |
| cloudFogFalloffStart   |  |
| cloudDensityMax        |  |
| dom2DensityMax         |  |
| dom3DensityMax         |  |
| cylCloudDensityMax     |  |

### GrPluginSettinsg

| Name | Notes                                                                 |
| ------------------------- | ---------------------------------------------------------------- |
| minExposure               |                                                                  |
| maxExposure               |                                                                  |
| Param 777                 | Bright or Dark everytinhg. Work with minExposure and maxExposure |
| addExpComp0               | Same as Param777                                                 |
| addExpComp0_Ev           | Same as Param777                                                 |
| addExpComp1               | Same as Param777                                                 |
| addExpComp1_Ev           | Same as Param777                                                 |
| addExpComp2               | Same as Param777                                                 |
| addExpComp2_Ev           | Same as Param777                                                 |
| Param 772                 | Same as Param777                                                 |
| bloomBrightnessExtraction |                                                                  |
| bloomWeight               |                                                                  |
| bloomSize                 |                                                                  |
| Param 776                 |                                                                  |
| Param 790                 | Make a Halo light strong or none                                 |
| Param 791                 | Make a Halo light strong or none                                 |


### ColorCorrection

| Name | Notes |
|------|-------|
| colorScale(.R) |   |
| colorScale(.G) |   |
| colorScale(.B) |   |
| Param 1027 |   |
| Param 1028 |   |
| Param 1030 | LUT path |
| Param 1031 |   |
| colorScale2(.R) |   |
| colorScale2(.G) |   |
| colorScale2(.B) |   |
| Param 1033 |   |
| Param 1034 |   |
| Param 1035 | LUT path |
| Param 1036 |   |

### 327693 (Ambient Occlusion)

| Name | Notes |                                                                       
| ----------------- | --------------------------------------------------------------------- |
| Param 1281        | 0 is none occlusion, 1 start some shadow                              |
| Param 1282        | 0 is none occlusion, 1 start some shadow                              |
| Param 1283        | 0 is none occlusion, 1 start some shadow                              |
| Param 1284        | Cast range starting at player or camera?                              |
| Param 1286        | 0 to sharp, 1+ to soft                                                |
| Param 1287        | Oclusion distance                                                     |
| Param 1288        | Oclusion distance                                                     |
| Param 1289        | Near shadow, 0 make dark.                                             |
| Param 1290        | Near shadow, 0 make dark too                                          |
| Param 1291        | it enlarge shadow area until all screen is black float between 0 to 1 |
| Param 1292        | Dark screen or light a little bit 0-1                                 |
| Param 1293        | Seems like a switch that 0 or 1 dark or not a little bit              |
| Param 1294        | Dark far 0-1000                                                       |

### 524291

| Name           | Notes |
| ---------- | --- |
| Param 2049 | TBW |
| Param 2050 | TBW |
| Param 2051 | TBW |

### WeatherParameters

| Name | Notes                                                                                                                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Param 1793 | Enable Rain. 0 is none, 0.4 start a soft rain and a soft wet material. Sound volume is also increase if value increase. 1 Is the normal rain. 2 or above make everything bright, strong. |
| windSpeed  |                                                                                                                                                                                          |
| Param 1795 | Sandstorm Wind, no effects. Sound is include and increase volume if value is higher.                                                                                                     |
| Param 1796 | TBW. Maybe only work if fog is enable.                                                                                                                                                   |

### 589831

| Name | Notes    |
| ---------- | --- |
| Param 2305 | TBW |
| Param 2306 | TBW |
| Param 2307 | TBW |
| Param 2308 | TBW |
| Param 2309 | TBW |
| Param 2310 | TBW |
| Param 2311 | TBW |

### GenerativeClouds

| Name     | Notes        |
| ------ | -------- |
| gcEnable | Enable or not Volumetric Clouds |
| Param 2562 | TBW |
| gcDensityMax |  |
| gcScattering |  |
| gcAbsorption |  |
| gcMieAnisotropy |  |
| gcDirLightGain |  |
| gcSkyLightGain |  |
| gcRayMarchDepth |  |
| gcExponent0 |  |
| gcExponent0Max |  |
| gcExponent1 |  |
| gcExponent1Max |  |

