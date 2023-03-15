---
title: FsmTool
permalink: /FsmTool/
tags: [Tools, File Tools, Cutscenes]
---

FsmTool is open-source unpacker and repacker for Metal Gear Solid V: The
Phantom Pain's .fsm files written by BobDoleOwndU. The tool can extract
the DEMO and SND chunks from .fsm files. Additionally, when extracting
SND chunks, the tool automatically builds them into a Wwise sound file
(.wem).

## Usage

To unpack a .fsm, a user simply needs to drag and drop a .fsm onto the
tool. The tool will output the extracted chunks into a folder named
*\<filename\>_fsm* along with a .xml file documenting the contained
chunks. A .wem file built from the file's SND chunks will also be inside
the folder containing the chunks.

To repack a .fsm file, the user needs to drag an output .xml file onto
the tool. The tool will read the file list from the .xml and repack the
.fsm file based on that list.
