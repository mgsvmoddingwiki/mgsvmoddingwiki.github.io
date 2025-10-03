---
title: Converting Between FTEX and DDS
permalink: /Converting_Between_FTEX_and_DDS/
tags: [Rendering, Guides]
---

To convert the game engine's [FTEX](/FTEXS) texture file format to the standard [DDS](https://en.wikipedia.org/wiki/DirectDraw_Surface) file format (so they can be manipulated in image editors/etc) there are two tools you can use: [FtexTool](/FtexTool) or [File Monolith](/File_Monolith)'s Mass Texture Converter.

While for converting DDS back to FTEX only FtexTool supports this.

## Using FtexTool

[FtexTool](/FtexTool) is a standalone command-line program that accepts either a *single file* or a *single directory* as input.

### Convert an FTEX file to a DDS file

- Drag a single `.ftex` file onto the `FtexTool.exe` program icon.

If successful you'll see a new `.dds` file created beside it.

{% include video url="/assets/Converting_Between_FTEX_and_DDS/FtexTool - Converting FTEX to DDS - Single file.webm" %}

### Convert a DDS file to an FTEX file

- Drag a single `.dds` file onto the `FtexTool.exe` program icon.

You should see a new `.ftex` and sibling `.ftexs` file(s) created beside it.

{% include video url="/assets/Converting_Between_FTEX_and_DDS/FtexTool - Converting DDS to FTEX - Single file.webm" %}

### Convert an entire directory of FTEX files to DDS files

- Drag a single directory that contains `.ftex` and their related `.ftexs` files onto the `FtexTool.exe` program icon.

If successful you'll see new `.dds` files created within.

{% include video url="/assets/Converting_Between_FTEX_and_DDS/FtexTool - Converting FTEX to DDS - Directory.webm" %}

{% include spoiler-start title="Other notes" %}

For directory inputs FtexTool is recursive and will convert all FTEX found in every sub-directory of the input directory.

Also FtexTool doesn't support DDS to FTEX conversion for directory inputs, only FTEX to DDS conversion. To batch convert a entire directory from DDS to FTEX would require a custom batch script.

For the sake of representing general use cases drag-and-dropping has been suggested the steps above but obviously being command-line based the program also supports CLI usage (see the tool's Github readme).

{% include spoiler-end %}

> **Tip:** if any of the above doesn't produce the expected output check the [troubleshooting](#ftextool-troubleshooting) section below.
{:.important}

### FtexTool troubleshooting

{% include spoiler-start %}

- If you've exported a DDS file via an image editor it must be the correct pixel format/encoding in order to successfully convert back to FTEX (see [this page](/Working_With_DDS_Files) for what to save your DDS files as), otherwise FtexTool will throw an unhandled error.
- If dragging a `.ftex` file onto the program and it doesn't output a `.dds` file check that you have all the associated `.ftexs` (note the `s` at the end) files.
	- Large textures with mipmaps will have have 3 FTEXS files, while smaller textures will have fewer. All the related FTEXS are required to be present in order to convert the FTEX to a DDS.
- When dragging files onto the program make sure only a single DDS or FTEX file is dragged onto the program. Otherwise the program will throw an error and exit without converting anything.
- When converting an FTEX to DDS check that you dragged the `.ftex` and not one of the `.ftexs` files onto the program.
- If you're instead dragging a directory onto FtexTool only single directories are supported for batch processing. If dragging more than one directory only the on that happens to be ordered first will get processed and the others skipped.
- If you're converting a 3D [LUT texture](/FILTERLUT_Texture_Guide) from an FTEX to DDS make sure you're on at least version 0.3.3 of FtexTool, which added support for BGRA volume textures.

{% include spoiler-end %}

---

## Using File Monolith's Mass Texture Converter

Mass Texture Converter is one of the included programs of the [File Monolith](/File_Monolith) suite that allows converting a directory of FTEX files to DDS files as a one-way conversion.

It has a GUI, a setting to toggle recursive directory parsing and allows choosing a directory to output the converted DDS files to.

However it only supports converting an entire directory of FTEX to DDS and doesn't support converting DDS back to FTEX.

### Convert an entire directory of FTEX files to DDS files

1. Open `Mass Texture Converter.exe` from the File Monolith program directory.
2. Beside the *Input Folder* field select the `...` button and choose the directory that contains the FTEX (and related FTEXS) files.
3. Beside the *Output Folder* field select the `...` button and choose where you want to output the convered DDS files to.
4. Click *Convert Textures*.

{% include video url="/assets/Converting_Between_FTEX_and_DDS/Mass Texture Converter - Converting directory of FTEX to DDS.webm" %}

> Typically you'll see Mass Texture Converter suggested for converting all the game's unpacked texture files to DDS, following use of File Monolith's other tool, Archive Unpacker (with its *Condensed Directory Structure* option checked). However it can also be used like the above steps for smaller batch conversions.