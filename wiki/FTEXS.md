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
uncompressed, etc.