---
title: Hair Materials
permalink: /Hair_Materials/
tags: [Rendering]
---


## Do you want the hair on your custom model too look awesome?

Well here's a guide to help you!

This guide is only dedicated to explaining the individual hair texture maps the game uses and how to create them and what shader's to use.


If you don't have FMDL Studio set up and the game unpacked etc, please make sure to check out these guide's below first before going through this guide! We are assuming you already have a more or less idea on how to add texture's to models and export them!!
[Beginner Modding Pipe line](https://www.youtube.com/playlist?list=PLvs_Pavo7cCXJoassPaeMKWE9R99M22Fz)

### Before we begin with practical demonstration!

There would be no point in just demonstrating without explaining what the texture's do and how they work so let's get that out of the way first.

The game uses one hair shader most of the time although there are instances where it will use a normal skin shader instead of a hair shader but this is only used when you might want to add a normal map for the hair but it's been noted that the effect won't look as good as the dedicated hair shader most vanilla models use unlike *Commander Cheeseburger Miller*, his hair uses a skin shader to use a normal map to give the strands depth and well it's another way to make hair look really messy, unfortunately the game doesn't have a shader that supports both a normal map(NRM) texture and a shift texture(SHM).

First let's understand what texture map's Fox engine use's for it's hair materials.

| FMDL Studion texture Names  | Sufixes | Compression Format |
|-----------------------------|---------|--------------------|
| Base_Tex_SRGB               | bsm     | DXT5               |
| SpecularMap_Tex_LIN 		  |	srm 	| DXT1				 |
| Translucent_Tex_LIN 	      | trm     | DXT1               |
| Shift_Tex_LIN               | shm     | DXT1               |

Let's explore each texture!

### Base_Tex_SRGB(bsm)
The base texture is prefixed with the bsm word for calling it the base colour map or diffuse map which will basically give your custom hair model it's colouring on the hair strands.The texture will be saved in the compression ratio of DXT5 and that goes for any texture that will be containing an alpha map,which in this case will be the opacity map.

This picture below just show's the diffuse map without the alpha texture:
![](/assets/Hair_Materials/hair_diffuse_example.jpg)

This picture show's how the alpha texture looks:
![](/assets/Hair_Materials/hair_diffuse_example-alpha.jpg)

### SpecularMap_Tex_LIN(srm)
The specular map mostly will give your hair it's reflection on the material.In this case we will only be using a roughness map and a specular occlusion map for the SRM texture.
![](/assets/Hair_Materials/hair_srm_example.jpg)

### Translucent_Tex_LIN(trm)
The trm map ,is a fairly important texture to make your hair look snazzy as most people might know ,this map is responsible for the Subsurface Scattering effect softer materials will have when light hits the material instead of deflecting it ,it will absorb the light usually this will cause the material to glow.What this basically does is it will highlight strand's giving it more depth ,since fox engine's dedicated hair material doesn't support normal map's it would end up looking flat well if your trm texture is done correctly it might just give you the edge to make hair look nice and 3d.
![](/assets/Hair_Materials/hair_trm_example.jpg)

**Example the TRM texture effect in game**
![](/assets/Hair_Materials/DEDICATED_TRM_VS_BLACK_TRM.jpg)

### Shift_Tex_LIN(shm)
The shm is responsible for the anisotropic diffusion, well what does that do?
This gives the hair a real bright reflection.Real life hair has a shiny reflection to it, people with longer hair, pony tails for example will really give of the anisotropic effect, the same with weed in weed fields will give of the same effects the important part of this texture is it can practically highlight individual strands giving it a better in depth look, highlighting strands and deflecting light with more contrast and sharpness.Good example is the small grey hair's you might see when you are getting older they will pop-out and shine more than the darker one's with much more reflection to them.
![](/assets/Hair_Materials/hair_shm_example.jpg)

**Example of a SHM texture compared to hair without one in the game**
![](/assets/Hair_Materials/no_shm_vs_shm_2_ring.jpg)
![](/assets/Hair_Materials/shm_vs_no_shm.jpg)

## Well now that we took a brief look at what texture maps we will be utilizing we can look at hair shaders. ##

The Fox Engine uses the **FoxShaders/fox3DDF_Hair** shader most of the time other hair shader is Quiet's hair shader designed for her abilities to disappear, but for the most part **FoxShaders/fox3DDF_Hair** is the preferred one to use.

### Now lets understand the material settings. ###

**The picture below shows the different settings the shader has.**
![](/assets/Hair_Materials/hair_shader_base_changes.jpg)


The constant values that never change for hair shaders are underlined in Red.
The one's underlined with orange are settings you might need to change but it's depending on what final effect you are looking for!
The one's underlined in blue are the one's that might need absolute adjustment's but yet again it depend's on what you are looking for which I will explain next.

The settings that's important to us for the final output that might need adjustments are the `Anistropic_Diffusion` underlined in Orange and the `Incidence_Colour` underlined in Blue.

### What does these settings do? ###
	 Anistropic_Diffusion
This determines how strong the anistropic reflection must be for the hair ,now this is also affected by how bright your SHM texture is so you might need to adjust the texture before tampering with the `Anistropic_Diffusion` value but for the most part `16` is used for Quiet's hair while Snake,Ocelot and Paz uses a value of `30` ,using either one of them will work fine.
The higher the number the stronger the reflection effect will be.

	Incidence_Colour
Incidence colour is basically the Subsurface Scattering colour in `x,y,z` values or `RGB` where `x=R ,y=G ,z=B` and `w` is the strength or Alpha strength of the Subsurface Scattering(SSS).Most hair Incidence Colour use's an X,Y,Z values of 1 which will just highlight the hair as a semi white, 1 for all values would be ideal to use for hair colours like black,white and grey while brown and red hair sometimes will have adjusted values.Quiet and Mantis have there own unique Incidence colouring ,while Quiets hair has a more brownish highlights to it and Mantis hair highlights has a reddish colouring when light passes through the hair.It is advised to not use a value larger than 1 otherwise the hair will lit up like a candle having a balance is always preferred.

**Example of the Incidence_Colouring**

| Incidence_Colour  | X 	| Y		| Z 	| W   |
|-------------------|-------|-------|-------|-----|
|	White			| 1 	| 1 	| 1 	| 0.25|
|	Brown			| 0.976 | 1 	| 0.996 | 0.25|
|	Light Red 		| 1 	| 0.773 | 0.541 | 0.3 |

	You can adjust the W value to be more if you wish to have a larger Subsurface Scattering (SSS) radius on the hair.

## Let's begin! ##

Now that we have an understanding of what we are working with we can do a practise run.

We can start with converting the textures of our custom model to be properly utilized in Fox Engines material settings.

### Diffuse Map (BSM) ###
Let's start with the diffuse map,depending on what custom hair model you will be using we are going to import the diffuse map into a texture editing program either using GIMP,PhotoShop or Paint.Net .This is the simplest one to do ,decompose the RGB value's of the diffuse map then compose them as `RGBA` add the corresponding layers to where they were so RED -> Red channel ,BLUE -> Blue Channel and GREEN-> Green Channel only extra channel now is the Alpha texture most games will have the diffuse and Alpha texture separated but some will have them combined like MGSV!The alpha texture will be added to the Alpha channel to add the transparency to the hair.
Now that we composed the layers you can export the texture take note of the export settings in the screen shot below ,it's very important!
**Export Settings**
![](/assets/Hair_Materials/diffuse_export_setting.jpg)

**Custom Diffuse Map**
![](/assets/Hair_Materials/hair_diffuse_example.jpg)


**Hair Naming convention**
I like to keep a good practice of exporting the texture with the name tag of `chara_hair_bsm`

| Texture Map  | alias 			| Example	   |
|--------------|----------------|--------------| 
| diffuse      | chara_hair_bsm | sna_hair_bsm |
| specular     | chara_hair_srm | sna_hair_srm |
| Translucency | chara_hair_trm | sna_hair_trm |
| Shift text   | chara_hair_shm | sna_hair_shm |

In this example I was using Ashley's hair over Ada Wong's head ,so I named it `ada_hair0_bsm`
this is just part of good organizing of texture names.


### Specular Map (SRM) ###
If your custom hair model has a lot of different texture's you'll have to try and find the roughness map and specular occlusion.This can depend from texture to texture that you have in my case I used the base albedo for the red channel, this channel should not be very bright the only thing in the red channel that must be a little bit bright is the hair strands them self so I dragged down the brightness and increased the contrast which will make the strands brighter but not too much.For the Green channel I took the roughness texture and inverted it but depending on how it looks some games might have it already inverted.The strands in the green channel are usually darker for the most with the surrounding background being bright white basically the inversion of what the red channel has.The srm output with all textures combined should have the hair strands either be a really light yellow or very light grey.For female hair I use a balance between the two for more reflection so the strands would be a light yellow, for males usually I use a specular map that highlights the strands as dark grey for less reflection.

For Example the two pictures down below.
**Custom SRM for Snake**
![](/assets/Hair_Materials/delta_hair_srm.jpg)

**Custom SRM For Ashley**
![](/assets/Hair_Materials/hair_srm_example.jpg)

As you can see Ashley's hair is a bit more yellow than that of Snake's srm which will give it a bit more reflection.

### Subsurface Scattering Map (TRM)
Your trm will mostly have a dark grey back ground, why? Well the brighter the back ground colour of the texture the more it will be highlighted, well is this what we want? Not at all you will see area's glow more that doesn't have a hair strand there which will look out of place so this is why it might be better to have a way darker back ground to only highlight the hair strands and not the transparent area's of the hair.
In my case the albedo map for Ashley's hair had a certain amount of strands that were darker than the other which will be ideal to get more depth.I composed a texture map with the albedo as one solid colour which will look grey and added the alpha map in the alpha channel to only have the strands visible.You can create a new image texture of the same size and colour it to a dark grey.Add a new layer in the texture and paste the composed albedo with the alpha texture you made it over  the background texture this way they are separated from each other which will make it easier to adjust the strand's colouring.At first it might not be what we want but that's ok.You can select the new layer and adjust its brightness I like to have it a bright grey but not too much.Anchor the layer down and that's all that's needed you can export the texture.

**Custom TRM for Ashley**
![](/assets/Hair_Materials/hair_trm_example.jpg)

### Anistropic Texture Map (SHM)

We are almost done with the texture's!The last one well also very important and is luckily easy to make.
Anistropic hair highlight's move from bright to dull so at the base origin of the hair on the texture it should be duller and in the middle brighter and transition back to dull when it go's to the hair tips.
well how do you make it?
In my case I used the trm texture and started to adjust the colours ,to get the transition of brighter highlights to lighter one's you can use a black paint brush with a low opacity and paint over it,but I use a contrast adjustment of the texture in this case ,where it will be darker on the edges and brighter in the middle and it's as simple as that,depending on how reflective you would like your hair to be, you can stick with a bright grey to a light white for super reflection or a darker grey for lighter or duller reflection .

**Custom SHM for Ashley**
![](/assets/Hair_Materials/hair_shm_example.jpg)

**Ay there is a tip!**
Most game's might have a extra map for some individual hair strand pop-outs.In my case I used the roughness map of Ashley's hair now of course you might not have this so it is possible that you might need to improvise.In that case you could actually use the diffuse map or even the alpha map and turn the contrast way up and adjust it's brightness to use it as a alpha texture to paste it over your shm.

I used the roughness texture as an alpha since it already had individual strands and made the texture a brighter white with a dark background and pasted this as a layer over the SHM map I just made.It will now basically highlight a couple of random individual strands.

If you are still fairly Unsure take a look at this YouTube Video it is a practice session of the textures I converted above: [MGSV:TPP Hair Texture practice session](https://youtu.be/mDqAXhOCQt4)

Basically what I do in this video is what I explained above ,now perhaps it could be tricky to explain the step's since sometimes it might become super free hand and guess work depending on what texture map's your custom model has.



**Great Job** now we have created our texture's for our custom hair model.

## Adding the shaders inside of FMDL Studio!

**This is the simple part!**
I like to use what is in the game so in this example I imported Quiet's XOF model which uses a normal hair shader.Drag and drop Quiets hair onto your custom hair model.Now that it has Quiets hair shaders you can drag and drop the textures into the corresponding texture slots ,if you might be unsure which texture go's where you can look at the explanation I made above.

**Well great now its applied where do we go from here?**

Depending on what your custom model is for example (Male hair,female hair,...ect) you might need to adjust some shader settings for your hair.

This will depend on what result you are looking for, in my case the only setting I changed was the `Incidence_Colour` value's I changed the `x,y and z` values to be all 1 as I mentioned previously it's so far the preferred colour for black hair and in general most hair, unless you are looking for a specific SSS colour it must be.

**Importantly well what Fox Model component settings must be used?**

Hair textures and any texture that will be rendering an alpha map is recommended to have the settings to be set to `Alpha`, to render the transparency of the diffuse map.For a hair shader it must never cast a shadow other wise your hair will be flagging a red colour, well why is that?It appears some shaders support only a couple of Fox Model settings it can be different depending on the shader you are using,the hair shader here can only be set to `Alpha` and `No Shadow` .The only occasion when you can set it too cast a Shadow is if you wanted to use a normal Skin shader or Quiet's hair shader for your hair it is able to render the hair with an `Alpha` and a `Shadow` although normal Skin shader's might cast's extremely strange shadow's onto the hair when the the Fox Model component is set to  cast a shadow, so keep that in mind if you do want the Hair model to cast a shadow.

**Example of Fox Model Component**
![](/assets/Hair_Materials/hair_shader_base_Fox_Model_settings.jpg)

**And BOOM!!**
Export that beauty and we are done!
Check the result in game!


## Final result!
Here was the final result of Ashley's hair in the FOX Engine.
![](/assets/Hair_Materials/Ingame_Hair_Result_1.jpg)
![](/assets/Hair_Materials/Ingame_Hair_Result_2.jpg)


## A couple of Notes!
This isn't related to this guide but perhaps since we are dealing with hair well your hair will always have a different outcome than that of other hair models.Well why? Many modern hair models have become ever more realistic but at the cost of performance in my case here this model had a really large polly count that will have a large effect on the appearance from a far distance since high polly models with an alpha texture applied to them will become pixelated at a certain distance.







