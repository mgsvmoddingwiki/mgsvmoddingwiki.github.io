---
title: LangTool
permalink: /LangTool/
tags: [Lang, Tools, File Tools]
---

LangTool is an open-source Fox Engine XML compiler/decompiler for Metal
Gear Solid V: Ground Zeroes and Metal Gear Solid V: The Phantom Pain
created by Atvaark. It is capable of reading the data from lng and lng2
files and converting them into XML files, where users may read and edit
them. It can also do the opposite, converting XML files into lng/lng2
files.

## Usage

To decompile a lng or lng2 file, the user simply needs to drag the file
onto LangTool. To compile a decompiled lng file, the user simply needs
to drag the lng.xml file onto the tool.

## Dictionary

LangTool utilizes a dictionary of filenames called
lang*_dictionary.txt.* As it decompiles the lng, it compares the hashes
generated from this dictionary to any hashed keys it finds. If it finds
a match, it will output the string by it's real name with the XML
attribute 'LangId'. If it cannot find a match, it will output the string
by its hash with the XML attribute 'Key'.

The most current dictionary can be found here:
<https://github.com/TinManTex/mgsv-lookup-strings>
