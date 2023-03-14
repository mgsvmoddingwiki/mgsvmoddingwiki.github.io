---
title: FTEX FTEXS
permalink: /FTEXS/
---

The .ftex format is a binary format used in conjunction with a variable
number of .ftexs files (which is also a binary format) to store a
texture in GZ and TPP. The .ftex file contains information on the
texture (like the mipmap count, width, height, and depth (for 3D/Volume
textures) of the texture) while the .ftexs files contain the raw texture
data and information regarding it, such as chunk size, compressed or
uncompressed, etc. Together, these files mostly just serve as a wrapper
for ZLib-compressed DDS ([DirectDraw
Surface](https://docs.microsoft.com/windows-hardware/drivers/display/directdraw-surfaces))
files.

## Usage

The Fox Engine uses textures in a completely standard way, but does
store them differently. The .ftex file contains information about the
texture as a whole and the .ftexs files, which contain the actual image
data, albeit ZLib-compressed, have an extension number. Most textures
will have a .1.ftexs, .2.ftexs, and a .3.ftexs, and all will have a
.ftex. Most of the time, for quick loading, the .ftex and .1.ftexs (the
lowest mipmaps are stored in this one) are stored in a .pftxs file in
the chunk\#.dat files with the rest of the game data, while all four
files (.ftex, .1-3.ftexs) are stored in the texture\#.dat files. This is
not always true - notable exceptions include the Metal Gear Survive
(SSD) beta and MGO, which store only the .2.ftexs and .3.ftexs files in
the texture\#.dat files.

## Format - Ftex

### Header

  - 0x0 - 0x3 (char\[4\]): 'FTEX' Format signature.
  - 0x4 - 0x7 (float): Version number. 2.03 for TPP.
  - 0x8 - 0x9 (uint16): Pixel format type.
  - 0xA - 0xB (uint16): Texture height.
  - 0xC - 0xD (uint16): Texture width.
  - 0xE - 0xF (uint16): Texture depth.
  - 0x10 (byte): Mipmap count.
  - 0x11 (byte): Nrt flag.<sup>\[1\]</sup>
  - 0x12 - 0x13 (uint16): Unknown flags.<sup>\[2\]</sup>
  - 0x14 - 0x7 (uint32): Unknown (always 1.)
  - 0x18 - 0x1B (uint32): Unknown (always 0.)
  - 0x1C - 0x1F (uint32): Texture type.<sup>\[3\]</sup>
  - 0x20 (byte): .ftexs file count (not including the .ftex file.)
  - 0x21 (byte): Unknown (always .ftexs file count - 1.)
  - 0x22 - 0x2F (byte\[14\]): Padding.
  - 0x30 - 0x37 (StrPathCode64 hash): Hash \#1 (unknown use.)
  - 0x38 - 0x3F (StrPathCode64 hash): Hash \#2 (unknown use.)

The header is preceded by an array of mip map information blocks - one
for each mipmap in the texture.

<sup>\[1\]</sup>What this flag does is unknown but it is 0x02 for all
files except for ones suffixed with "_nrt".

<sup>\[2\]</sup>What this flag does is unknown but for most files it is
0x111, for a *very* small amount of files it is 0x0, and for an
*extremely* (almost no files have this flag) it is 0x11.

<sup>\[3\]</sup>This flag tells the game some information about texture.
The flag is 0x01000001 for linear-space textures, 0x01000003 for
sRGB-space textures, 0x01000007 for cubemap textures, and 0x01000009 for
normal map textures.

### Mipmap Information

  - 0x0 - 0x3 (uint32): Offset in the corresponding .\#.ftexs file.
  - 0x4 - 0x7 (uint32): Uncompressed file size.
  - 0x8 - 0xB (uint32): Compressed file size.
  - 0xC (byte): Mipmap index (0 is the highest mipmap.)
  - 0xD (byte): .ftexs file number (3 if in .3.ftexs, 2 if in .2.ftexs,
    etc.)
  - 0xE - 0xF (uint16): Chunk count.

## Format - Ftexs

If a given mipmap has a chunk count of 0, then it will use the entire
file it references and will contain nothing but ZLib-compressed, raw DDS
data of the given DDS format. If the chunk count is greater than one,
each mipmap in a file will have an array (table) of chunk information
entries, preceded by the data for that mipmap. Each mipmap chunk it its
own zlib block; they can't simply all be concatenated and deflated; each
needs to be deflated prior to concatenation.

### Chunk Information

  - 0x0 - 0x1 (uint16): Compressed chunk size.
  - 0x2 - 0x3 (uint16): Uncompressed chunk size.
  - 0x4 - 0x7 (uint32): Data offset.<sup>\[1\]</sup>

<sup>\[1\]</sup>This offset accounts for the size of the chunk
information array, and adding the base offset (as specified in the .ftex
file via the mipmap information) to the data offset yields the start of
the image chunk data.

## Map Types

<table>
<thead>
<tr class="header">
<th><p>Name</p></th>
<th><p>Suffix</p></th>
<th><p>Description</p></th>
<th><p>Additional Information</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Base_Tex_SRGB, Layer_Tex_SRGB, MetalicLayer_Tex_SRGB</p></td>
<td><p>bsm</p></td>
<td><p>Albedo</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>Base_Tex_SRGB</p></td>
<td><p>bsm_alp</p></td>
<td><p>Albedo w/ Alpha</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>NormalMap_Tex_NRM</p></td>
<td><p>nrm</p></td>
<td><p>Normal</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>NormalMap_Tex_NRM</p></td>
<td><p>hnm</p></td>
<td><p>Normal</p></td>
<td><p>Unknown if there's a difference between these normal maps and the ones with the nrm suffix.</p></td>
</tr>
<tr class="odd">
<td><p>SpecularMap_Tex_LIN</p></td>
<td><p>srm</p></td>
<td><p>Specular Occlusion / Roughness / Cubemap Mask</p></td>
<td><p>R: Specular Mask, G: Roughness, B: Cubemap Mask</p></td>
</tr>
<tr class="even">
<td><p>Translucent_Tex_LIN</p></td>
<td><p>trm</p></td>
<td><p>Transmissive</p></td>
<td><p>Transmissive map for subsurface scattering.</p></td>
</tr>
<tr class="odd">
<td><p>MatParamMap_Tex_LIN</p></td>
<td><p>mtm</p></td>
<td><p>Material Parameter Map</p></td>
<td><p>Used to apply multiple MatParamIndices to a single material. The indices are based on the following shades: 0: #212221</p>
<p>1: #606160</p>
<p>2: #9F9F9F</p>
<p>3: #E1DFE1</p></td>
</tr>
<tr class="even">
<td><p>LayerMask_Tex_LIN</p></td>
<td><p>lym</p></td>
<td><p>Layer Mask</p></td>
<td><p>Used in combination with a Layer_Tex_SRGB texture to overlay color.</p></td>
</tr>
<tr class="odd">
<td><p>MetalicBacteria_Tex_LIN</p></td>
<td><p>lbm</p></td>
<td><p>Layer Mask</p></td>
<td><p>Used in combination with a MetalicLayer_Tex_SRGB texture for parasite effects on Quiet and the Skulls.</p></td>
</tr>
<tr class="even">
<td><p>TensionSubNormalMap_Tex_NRM</p></td>
<td><p>sub_nrm</p></td>
<td><p>Subnormal</p></td>
<td><p>Additional Normal map for added details.</p></td>
</tr>
<tr class="odd">
<td><p>SubNormalMask_Tex_LIN</p></td>
<td><p>sbm</p></td>
<td><p>Subnormal Layer Mask</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>Dirty_Tex_LIN</p></td>
<td><p>dtm</p></td>
<td><p>Blood/Water/Dirt Overlay</p></td>
<td><p>R: Blood, G: Water, B: Dirt</p></td>
</tr>
</tbody>
</table>

## Normal Map Conversion

### Normal Map Conversion

To convert a Fox Engine texture to a standard normal map, do the
following:

1.  Copy the texture's alpha channel to the red channel.
2.  Invert the texture's green channel.
3.  Paint the blue channel completely white.
4.  Paint the alpha channel completely white.

To convert a texture from a standard normal map to the Fox Engine
format, do the following:

1.  Copy the red channel over the alpha channel.
2.  Invert the green channel.
3.  Paint both the red and blue channels 50% grey (hex 808080).

The process to convert a standard normal map to the Fox Engine format in
Gimp is similar.

1.  Open the normal map
2.  Click on Colors \> Components \> Decompose
3.  In the Decompose window make sure the Color Model is RGBA
    1.  Optional: Check Decompose to layers to pull all of the channels
        in a single image as layers
4.  Copy the contents of the Red layer and paste them into the Alpha
    layer in the new image that opens
5.  Select the green layer and click on Colors \> Invert
    1.  This may or may not need to be done depending on the normal map.
        If the original normal was made for OpenGL, then you should not
        do this step. If you aren't sure, then see if the normal map
        appears inverted on your model, and use this layer to adjust it.
6.  Click on Colors \> Components \> Recompose
7.  The original image should have changed to the converted map
    1.  This image will look different than one from the game, that's
        fine though it still functions as it should. Save it as a DDS,
        and then convert it with ftex tool.

[Category:File Formats](/Category:File_Formats "wikilink")
[Category:Textures](/Category:Textures "wikilink")