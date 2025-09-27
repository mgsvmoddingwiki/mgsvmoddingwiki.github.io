---
title: Working With DDS Files
permalink: /Working_With_DDS_Files/
tags: [Rendering, Tools]
redirect_from:
  - /How_to_save_your_.DDS_image/
---

Fox Engine uses the [FTEX](/FTEXS) file format for storing its images. It's effectively a wrapper for the [DDS](https://en.wikipedia.org/wiki/DirectDraw_Surface) container file format.

DDS files support various pixel formats/encodings. So when [converting FTEX to DDS](/Converting_Between_FTEX_and_DDS) and then editing them in an image editor make sure to choose the correct pixel format when exporting out to DDS again, depending on what the original game texture was.

Further down the page lists some DDS image viewers along with import/export tools and plugins.

## Pixel formats

| Format | Has alpha channel | Uses mipmaps | Example texture types that use it | Notes |
|-|-|-|-|-|
| **BC1** (aka **DXT1**) | No | Yes | `bsm` (albedo)<br/>`srm`/`dtm`/`lbm`/etc | Uses compressed 4 bits per pixel (bpp) |
| **BC3** (aka **DXT5**) | Yes | Yes | `bsm_alp` (albedo with alpha channel, eg: hair/eyelashes)<br/>`nrm`/`sub_nrm`/`hnm` (normal maps) | Uses compressed 8 bpp |
| **B8G8R8A8** (aka A8R8G8B8\*) **volume texture** | Yes | **No** | Exclusively used for 3D [LUT](/FILTERLUT_Texture_Guide/) color grading | Uses uncompressed 32 bpp (8:8:8:8) |


There are also other pixel formats [referenced by the engine](https://github.com/kapuragu/FoxEngineTemplates/blob/main/ftex.bt#L20), which are renamed from [DXGI_FORMAT](https://learn.microsoft.com/en-us/windows/win32/api/dxgiformat/ne-dxgiformat-dxgi_format). If anyone is aware of what type of texture files in-game use these others free to update the list above with examples.

> \* Direct3D 10 [changed the naming](https://forums.developer.nvidia.com/t/cant-find-8-8-8-8-argb-format/305413/) of ARGB to BGRA for consistency, so more modern tools/plugins will display this option under the new naming.

---

## Image viewers

Since it's useful identifying which pixel format a DDS has, after having been converted from the original FTEX, some DDS image viewers support displaying this info, which makes it simpler to be sure which type to export back to after you've made edits to the texture.

### WTV

{% include infobox title="WTV" site="https://developer.nvidia.com/legacy-texture-tools" download="https://web.archive.org/web/20170720031656/https://developer.nvidia.com/sites/default/files/akamai/tools/files/Windows_Texture_Viewer_v089b.rar" %}

Lightweight DDS image viewer that displays the pixel format and and number of mipmaps in the statusbar.

Using the `R`, `G`, `B` and `A` keys you can also toggle each color/alpha channel. Keep in mind even if an alpha channel isn't present it will still display 'ARGB' to indicate which channels are toggled.

> Since it's an older program more recent DDS encoding formats won't be identified but for the purposes of identifying DDS texture info for MGSV it's suitable.\
\
Also because of this it will display B8G8R8A8 textures as 'A8R8G8B8'.

![DXT1 texture](/assets/Working_With_DDS_Files/WTV - DXT1.png){:.inline width="250px"} ![B8G8R8A8 LUT texture](/assets/Working_With_DDS_Files/WTV - FILTERLUT.png){:.inline width="250px"}
{:.center}

---

## Import/export tools and plugins

This section covers a selection of tools/editors that support DDS import/export with the appropriate settings. There are plenty other tools for DDS import/export not covered here.

### Paint.NET (with plugin)

{% include infobox title="Paint.NET" site="https://www.getpaint.net/index.html" download="https://www.dotpdn.com/downloads/pdn.html https://github.com/paintdotnet/release/releases/latest" %}

A third-party plugin for the Paint.NET freeware image editor, called [pdn-ddsfiletype-plus](https://github.com/0xC0000054/pdn-ddsfiletype-plus) ([download](https://github.com/0xC0000054/pdn-ddsfiletype-plus/releases/latest)), allows importing and exporting DDS images.

Once installed (see plugin's readme for where to place the plugin files) to open a DDS image use *File>Open* or drag-and-drop a DDS file onto the program and select the *Open* option. There are no options for opening mip maps together so only the largest texture size is opened (which is fine).

![Main window](/assets/Working_With_DDS_Files/Paint.NET - Main window.png){:.thumb .right}
![Save dialog with options set for DXT1 output and mipmaps](/assets/Working_With_DDS_Files/Paint.NET - DDS plugin save options.png){:.thumb .right}

To export out to DDS again after making your edits:

- For DXT1 output choose the following options (see thumbnail image):

    - BC1 (Linear, DXT1)
    - Generate Mip Maps [*Enabled*]

- For DXT5 output choose the following options:
    - BC3 (Linear, DXT5)
    - Generate Mip Maps [*Enabled*]

While B8G8R8A8 output is also supported it doesn't appear to support volume texture output.


### Photoshop (with plugin)
{:.clear}

{% include infobox title="Photoshop" site="https://www.adobe.com/products/photoshop.html" %}

For those with the commercial Photoshop image editor Nvidia offers a couple texture tool plugins:

- A 'legacy' plugin for versions 5.0 to CS6. [Download](https://web.archive.org/web/20130125163329/https://developer.nvidia.com/nvidia-texture-tools-adobe-photoshop) (archive.org mirror from original site to avoid new login requirement).
- A currently maintained plugin for newer Adobe versions. [Download](https://developer.nvidia.com/texture-tools-exporter).
    > **Note:** this version requires an Nvidia account to download.

DDS files can then be opened like any other image file, with options on import such as conditionally displaying all mipmaps, along with advanced options for export.

![Legacy plugin](/assets/FILTERLUT_TEXTURE_GUIDE/Dds_format.png){:.inline width="300px"} ![Current plugin](/assets/FILTERLUT_TEXTURE_GUIDE/Screenshot_texture_exporter.png){:.inline width="300px"}
{:.center}


### Nvidia Texture Tools Exporter
{:.clear}

{% include infobox title="Nvidia Texture Tools Exporter" site="https://developer.nvidia.com/texture-tools-exporter" download="https://developer.nvidia.com/downloads/texture-tools-standalone-app" %}

Essentially the modern Photoshop plugin from above but available as a standalone program, without the need for Photoshop.

> **Note:** requires an Nvidia account to download.
{:.clear}

### Nvidia DDS Utilities
{:.clear}

{% include infobox title="Nvidia DDS Utilities" site="https://developer.nvidia.com/legacy-texture-tools" download="https://developer.download.nvidia.com/akamai/tools/files/DDS_Utilities_8.31.1127.1645.exe" %}

A set of legacy command-line (CLI) only tools that include the useful `nvdxt.exe`.

Supports the following input filetypes: PNG, DDS, JPEG, TIFF, BMP, GIF, TGA, PSD, along with a few others listed in the included PDF.

#### Creating a shortcut to output an image to DDS

Because it's CLI-based it enables setting up a Windows shortcut that you can drag-and-drop a PNG file for example onto to output it as a DDS, without having to interact with the command-line.

However it lacks the ability to convert *from* DDS to a easily editable format like PNG.

> These steps assume you've already installed Nvidia DDS Utilities to its default location.

{% include spoiler-start title="Shortcut for conversion to DXT1" %}

1. In Windows right-click in File Explorer somewhere and select *New>Shortcut*.
2. In the Create Shortcut window paste in the following for the *location* value:
    
    ```
    "C:\Program Files (x86)\NVIDIA Corporation\DDS Utilities\nvdxt.exe" -rescale nearest -dxt1a -append _dxt1 -file
    ```

3. Click *Next* and then give the shortcut a name like `Convert to DXT1 DDS`.
4. Click *Finish*.
5. Then right-click the newly created shortcut and select *Properties* and delete the value in the *Start in* field, on the *Shortcut* tab.
    > This is to make sure the output DDS is placed beside the original input file.

{% include spoiler-end %}

{% include spoiler-start title="Shortcut for conversion to DXT5" %}

1. In Windows right-click in File Explorer somewhere and select *New>Shortcut*.
2. In the Create Shortcut window paste in the following for the *location* value:
    
    ```
    "C:\Program Files (x86)\NVIDIA Corporation\DDS Utilities\nvdxt.exe" -rescale nearest -dxt5 -append _dxt5 -file
    ```

3. Click *Next* and then give the shortcut a name like `Convert to DXT1 DDS`.
4. Click *Finish*.
5. Then right-click the newly created shortcut and select *Properties* and delete the value in the *Start in* field, on the *Shortcut* tab.
    > This is to make sure the output DDS is placed beside the original input file.

{% include spoiler-end %}

{% include spoiler-start title="Shortcut for conversion to B8G8R8A8 volume texture" %}

1. In Windows right-click in File Explorer somewhere and select *New>Shortcut*.
2. In the Create Shortcut window paste in the following for the *location* value:
    
    ```
    "C:\Program Files (x86)\NVIDIA Corporation\DDS Utilities\nvdxt.exe" -rescale nearest -volumeMap -nomipmap -u8888 -append _volume -file
    ```

3. Click *Next* and then give the shortcut a name like `Convert to Volume Texture DDS`.
4. Click *Finish*.
5. Then right-click the newly created shortcut and select *Properties* and delete the value in the *Start in* field, on the *Shortcut* tab.
    > This is to make sure the output DDS is placed beside the original input file.

{% include spoiler-end %}

After following any one of the above steps you can drag and drop a *single* supported image type on the shortcut to output a DDS file beside it of the chosen pixel format.

> While nvdxt also supports batch processing the syntax used for the Windows shortcuts above only support single file conversions.

![Example of drag-and-drop conversion from PNGs to DDS files](/assets/Working_With_DDS_Files/Nvidia DDS Utilities - Windows shortcut conversions.gif){:.inline width="300px"} ![LUT conversion using nvdxt (screenshot and mod by JinMarr)](/assets/Working_With_DDS_Files/nvdxt - LUT conversion example.jpg){:.inline width="300px"}
{:.center}

### ImageMagick
{:.clear}

{% include infobox title="ImageMagick" site="https://imagemagick.org" download="https://imagemagick.org/script/download.php#windows" %}

The Swiss Army knife of command-line based image transcoders, with powerful image manipulation features. Can convert DDS to any arbitrary image format and vice versa.

#### Example commands

These commands show a PNG but ImageMagick supports virtually any input image format.

**Converting DDS to PNG:**

```
magick input.dds output.png
```

**Converting a PNG to DXT5:**

```
magick input.png -define dds:compression=dtx5 output.dds
```

> For DXT1 output change it to `dds:compression=dtx1`. Mipmaps are generated by default.

> **Note:** the only caveat is the DDS mipmaps generated by ImageMagick use a poorer quality scaling algorithm than Nvidia's conversion tools (something I also found with DirectXTex even when using `-if CUBIC`). At least as of 2019 when I was last testing it for this specifically.