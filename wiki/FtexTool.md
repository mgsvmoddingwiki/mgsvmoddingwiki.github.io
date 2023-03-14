---
title: FtexTool
permalink: /FtexTool/
---

FtexTool is an open-source tool which converts Fox Engine textures
(.ftex) to Direct-Draw Surface textures (.dds). FtexTool works by
getting information about the image from the .ftex file, and the actual
image data from the image's sub-texture files (.ftexs). It then converts
this data into a single .dds image with mipmaps. It reverses this
process when converting a .dds image back into a .ftex file. It stores
information about the image in an .ftex file, and its mipmap and image
data in the .ftexs files.

## Usage

FtexTool can convert an .ftex file into a .dds file by dragging the
.ftex file onto the tool. (Note that the .ftex file must be in the same
directory as all of its sub-textures for this process to work.) It can
also convert all .ftex files in a directory into .dds images if the
folder containing the .ftex files is dragged onto the tool.