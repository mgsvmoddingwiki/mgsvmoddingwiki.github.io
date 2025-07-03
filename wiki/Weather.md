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

{% include spoiler-start %}

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

{% include spoiler-end %}

### mafr

{% include spoiler-start %}

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

{% include spoiler-end %}

### mtbs

{% include spoiler-start %}

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

{% include spoiler-end %}

### cypr

{% include spoiler-start %}

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

{% include spoiler-end %}

### gntn

{% include spoiler-start %}

  - default
  - under
  - dark
  - shadowLong
  - bake
  - bake_sky
  - e20060_lightOff

{% include spoiler-end %}

## ParameterNames

### TppGlobalVolumetricFog

|ID|Name|Notes|
| - | - | - |
|257|density||
|258|color||
|259||GUESS: GZ_albedo|
|260|luminance||
|261||GUESS:GZ_height, 135 in pouring, like gntn_nightRain_sky|
|262|nearDistance||
|263||GUESS: GZ_bottom, 0 except ombs which is -10 in e20015_sky|
|264|skyAlbedo||
|265|rayleighScattering||
|266|mieScattering||
|267|falloff||
|268|mieAnisotropy||
|269|exposureOffset0||
|270|exposureOffset0_Ev||
|271|exposureOffset1||
|272|exposureOffset1_Ev||
|273|exposureOffset2||
|274|exposureOffset2_Ev||
|275|power||
|276|fogDirLightGain||
|277|density_noise0_ratio||
|278|density_envelope0_add||

### TppAtmosphere

|ID|Name|Notes|
| - | - | - |
|513||GUESS: GZ_mieAnisotropy, twpfs go from 0.2 at night to 1 in day, datasets do 0.8 and ofCloudySky 0.2|
|514|daySkyAmbientScale|0 in avatar_space and low in volginride, 0.5 in nonsunny|
|515||GUESS:GZ_multiScatteringOrder|
|516|starLight||
|517|cloudiness||
|518|skyColorSunScale|Bright sky to dark or white. Between 0-5|
|519|skyLightSunScale|0 disappear directionl light, while anything above 1 make light and shadow strong|
|520||0 at most times, 7 at midnight cloudy, 4.5 at midnight rainy, 0 in title|
|521|shadowMaskSpecular|Bright specular|
|522|shadowRange||
|523|shadowRangeExtra||
|524|hiResShadowRange||
|525|shadowProjectionRange||
|526|shadowfadeRange||
|527|selfShadowBias||
|528|shadowRangeLimit||
|529|shadowRangeFoculLengthConnectionScale||
|530|influenceOfFog||
|~|~|~|
|549|dirLightFadeStart||
|550|dirLightFadeLength||
|551|dirLightFadeEnable||
|552|fogFalloff||
|553|fogFalloffStart||
|~|~|~|
|556|followCameraEnable||
|557|offsetPosY|Move sky/sun in Y|
|558|skyColor|Dark or Bright Sky color|
|559|skyEnable|Disable or enable sun and sky. 0-1. cypr group_photo is 0, but cypr default and other uses is 1|
|560|enviromentSpecular_ShScale0||
|561|enviromentSpecular_ShScale0_Ev||
|562|enviromentSpecular_ShScale1||
|563|enviromentSpecular_ShScale1_Ev||
|564|enviromentSpecular_ShScale2||
|565|enviromentSpecular_ShScale2_Ev||
|566|enviromentSpecular_minFrontReflectionRate||
|567|enviromentSpecular_Color||
|568|enableSteppedMoveOfDirectionalLight||
|569|divisionNumOfSteppedMove||
|570|interpolateTimeInSecond||
|~|~|~|
|576|starLuminanceScale||
|577|skyLightSunScaleOcean||
|578|influenceOfFogMin||

### TppSky

|ID|Name|Notes|
| - | - | - |
|641|diffusion||
|642|cloudDensity||
|643|dirLightGain||
|644|inCloudScatterGain||
|645|ambLightGain||
|646|cylCloudDensity||
|647|cylBackScatGain||
|648|cylFrontDirGain||
|649|cylFrontAmbGain||
|650|cloudInfluenceOfFog||
|651|cloudFogFalloff||
|652|cloudFogFalloffStart||
|653|dom2Density||
|654|dom3Density||
|655|cloudDensityMax||
|656|dom2DensityMax||
|657|dom3DensityMax||
|658|cylCloudDensityMax||
|659|cloudInfluenceOfFogMin|| 

### GrPluginSettings

|ID|Name|Notes|
| - | - | - |
|769|minExposure||
|770|maxExposure||
|~|~|~|
|772|exposureCompensation|Same as Param777|
|~|~|~|
|775|bloomSize||
|776|shutterSpeed||
|777|keyValue|Bright or Dark everytinhg. Work with minExposure and maxExposure|
|~|~|~|
|782|addExpComp0||
|783|addExpComp0_Ev||
|784|addExpComp1||
|785|addExpComp1_Ev||
|786|addExpComp2||
|787|addExpComp2_Ev||
|788|bloomBrightnessExtraction||
|789|bloomWeight||
|790|ghostStrength|Make a Halo light strong or none|
|791|ghostScreenScale|Make a Halo light strong or none|

### ColorCorrection

|ID|Name|Notes|
| - | - | - |
|1025|colorScale||
|1027|startSlope||
|1028|endSlope||
|1030|lut|LUT path|
|1031|exposureThreshold||
|1032|colorScale2||
|1033|startSlope2||
|1034|endSlope2||
|1035|lut2|LUT path|
|1036|exposureThreshold2||

### LineSSAOParameters

|ID|Name|Notes|
| - | - | - |
|1281|innerRadius|0 is none occlusion, 1 start some shadow|
|1282|outerRadius|0 is none occlusion, 1 start some shadow|
|1283|maxDistanceInner|0 is none occlusion, 1 start some shadow|
|1284|maxDistanceOuter|Cast range starting at player or camera?|
|1285||GUESS: GZ_contrast|
|1286|blurRadius|0 to sharp, 1+ to soft|
|1287|falloffStart|Occlusion distance|
|1288|falloffRange|Occlusion distance|
|1289|gainonStart|Near shadow, 0 make dark.|
|1290|gainonRange|Near shadow, 0 make dark too|
|1291|contrastLow|it enlarge shadow area until all screen is black float between 0 to 1|
|1292|contrastHigh|Dark screen or light a little bit 0-1|
|1293|maxDistanceThresholdInner|Seems like a switch that 0 or 1 dark or not a little bit|
|1294|maxDistanceThresholdOuter|Dark far 0-1000|

### WeatherParameters

|ID|Name|Notes|
| - | - | - |
|1793|raininess|Enable Rain. 0 is none, 0.4 start a soft rain and a soft wet material. Sound volume is also increase if value increase. 1 Is the normal rain. 2 or above make everything bright, strong.|
|1794|windSpeed||
|1795|speedTurbulentRate|Sandstorm Wind, no effects. Sound is include and increase volume if value is higher.|
|1796|speedTurbulentCycle|TBW. Maybe only work if fog is enable.|

### NoiseEnvelopeGenerator

|ID|Name|Notes|
| - | - | - |
|2049|envelopeAttackTime||
|2050|envelopeDecayTime||
|2051|noiseRate||

### LocalReflectionSettings

|ID|Name|Notes|
| - | - | - |
|2305|effectScale||
|2306|roughnessBias||
|2307|rayStepScale||
|2308|rayCount||
|2309|shaderType||
|2310|fade||
|2311|mask||

### GenerativeClouds

|ID|Name|Notes|
| - | - | - |
|2561|gcEnable|Enable or not Volumetric Clouds|
|2562|gcDensity||
|2563|gcDensityMax||
|2564|gcScattering||
|2565|gcAbsorption||
|2566|gcMieAnisotropy||
|2567|gcDirLightGain||
|2568|gcSkyLightGain||
|2569|gcRayMarchDepth||
|2570|gcExponent0||
|2571|gcExponent0Max||
|2572|gcExponent1||
|2573|gcExponent1Max||
