---
title: FoxTool
permalink: /FoxTool/
tags: [Tools, File Tools]
---

FoxTool is an open-source Fox Engine XML compiler/decompiler for Metal
Gear Solid V: Ground Zeroes and Metal Gear Solid V: The Phantom Pain
created by Atvaark. It is capable of reading the data from compiled XML
files and converting them back into standard XML files, where users may
read and edit them. It can also do the opposite, converting standard XML
files into compiled XML files.

## Usage

To decompile a compiled XML, the user simply needs to drag the file onto
FoxTool. To compile a decompiled XML, the user simply needs to drag the
.xml file onto the tool.

## Supported Formats

The following is a list of all formats compatible with FoxTool:

  - .bnd
  - .clo
  - .des
  - .evf
  - .fox2
  - .fsd
  - .lad
  - .parts
  - .ph
  - .phsd
  - .sdf
  - .sim
  - .tgt
  - .vdp
  - .veh
  - .vfxlf

## Dictionary

FoxTool utilizes a dictionary of filenames called fox_dictionary.txt.
As it decompiles the fox2, it compares the hashes generated from this
dictionary to any hashed string literals it finds. If it finds a match,
it will output the string by it's real name. If it cannot find a match,
it will output the string by its hashed
name.
