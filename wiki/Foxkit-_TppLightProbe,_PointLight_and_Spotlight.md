---
title: Foxkit: TppLightProbe, PointLight and Spotlight
permalink: /Foxkit-_TppLightProbe,_PointLight_and_Spotlight/
---

This guide show how to set a Probe to indoor space and add two types of
light, Point and Spot. Require the user to know how Datasets and
Entities in Foxkit.

First. create a Dataset and add two Entities.
TppLightProbeSHCoefficients and TppLightProbe. Ground and House is just
to have a better picture of the use here.

[390x390px](/File:Light1.jpg "wikilink")

## **LightProbe**

### **TppLightProbeSHCoefficients**

TppLightProbeSHCoefficients will load the lpsh file that have all the
probes inside to use. We can reuse the lpsh **afgh_field_light.lpsh**
found in
*Chunks\\Assets\\tpp\\pack\\location\\afgh\\pack_large\\afgh_field_fpk\\Assets\\tpp\\level\\location\\afgh\\block_large\\field\\**afgh_field_light.lpsh***

Copy and paste to the fpk of you mod that match with the folder
structure in Foxkit. In my case my mod load here
*\\Assets\\tpp\\pack\\location\\smpl\\smpl_fpk\\Assets\\tpp\\level\\location\\smpl\\block_common\\**afgh_field_light.lpsh***

*And in Foxkit
Assets\\tpp\\level\\location\\smpl\\block_common\\**afgh_field_light.lpsh.***

Drag and drop the file ***afgh_field_light.lpsh*** in
TppLightProbeSHCoefficients.

[465.991x465.991px](/File:Light2.jpg "wikilink")

### **LightProbes in LPSH file**

Before move to TppLightProbe have a look on image below. I list all the
124 probes that afgh_field_light have inside in day and night light.
Some are dark while other are bright. All have this tint of afgh colour
in red, orange, yellow. At night it goes green, grey blue. Indoor areas
use dark probes. So lets choose the LP_0038. The name "LP_0038" you
can find inspecting the lpsh in Foxkit and its matter write the exactly
name of the Probe in Dataset if you want make work.

[586.993x586.993px](/File:Light3.jpg "wikilink")

Name in Foxkit.

[372.972x372.972px](/File:Light4.jpg "wikilink")
[left|thumb](/File:LPSH_Field_ref.jpg "wikilink")

### **TppLightProbe**

1 . After choose the probe to use. Rename to the one in Dataset before
adding to the scene. We choose LP_0038.

2\. Hit TransformEntity to the Entity go to Scene.

3\. Create a primitive cube under the lightprobe and move/rotate/scale
the entity to fill the inside of the house. Remember to add the scale in
TppLightProbe window later,

[670.979x670.979px](/File:LightProbe5.jpg "wikilink")

Now. Lets see all the parameters TppLightProbe have.

**enable** = True or False. Check true of course.

**lightArea** = Can be a locator entity to store the area where probe
will happen, but in this case we dont need to use.

**innerArea** = To be Written. Can be left empty for now.

**shCoefficientsData** = is the lpsh so our LP_0038 will have the probe
inside the lpsh. Open and choose TppLightProbeSHCoefficients0000 here.

**onLights and OffLights** = To be Written. Can be left empty for now.

**innerScales** = Are the float values between 0 and 1. If above 1 it
will unload. Look the graphic about it below. The Axis is the mid of
this probe and then we have the X+-, Y+- and Z+-. A Value of 1 in all
will fullfill the probe in the map sharp. While a value of 0 in all the
innerScales will show a soft probe. For indoors the best is 0.98 in all.
There are nice probes to configure here. If the house were open on a
side so we could diffuse the probe to this open side.

[650.979x650.979px](/File:Light6.jpg "wikilink")

**priority** = This parameter define which probe will be over another
probe. Its common use tons of probes and then use a huge one to diffuse
some probes or use a Probe to Dark all the map first and then use lots
of probes with more priority to bright the area. Number can be 500 to 1
and 500 be the low in priority and 1 be the first of course.

**debugMode** = To be Written. Can be left empty for now.

**drawRejectionLevel** = We can choose Level 7, no Reject. This show the
distance of rendering the entity. Game normally use Level 4.

**shapeType** = Default is the square cube. For experimentation later,
why not use the other options...

**exposure** = To be Written. I try to add lots of values but nothing
happen here. I choose -1 mostly because all the entities I found use the
same. Need to test more to see if more values does something or not. I
have some ideas that this is the amount of time the player need to
recover from see the color of probes or when goes off the probe to the
light.

**localFlags** = To be Written. Choose 11 should be fine.

**occlusionModeOpenRate** = To be Written. Can be 0.

[362.995x362.995px](/File:Light7.jpg "wikilink")

In Game it shows like this.

[520.991x520.991px](/File:Light8.jpg "wikilink")

### **Small Fix in Foxkit to show Flags.**

Foxkit normally dont show the localFlags parameter. To enable this
option in the Entity go to
\\FoxKit\\Assets\\FoxKit\\Modules\\DataSet\\Fox\\TppEffect and open in
any editor the file TppLightProbe.Generated.cs.

Find this line and change the **Never** word to **EditorAndGame.** Same
will be happen to PointLight and SpotLight entities.

` [OdinSerializeAttribute, NonSerializedAttribute, PropertyInfoAttribute(Core.PropertyInfoType.UInt32, 504, 1, Core.ContainerType.StaticArray, PropertyExport.`**`Never`**`, PropertyExport.`**`Never`**`, null, null)]`

` private System.UInt32 localFlags;`



## **PointLight**

To be written

## **SpotLight**

To be written