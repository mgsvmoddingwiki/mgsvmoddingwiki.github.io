---
title: MtarTool
permalink: /MtarTool/
tags: [Guides, Tools, File Tools, Animation]
---

MtarTool is an open-source unpacker and repacker for Metal Gear Solid V:
The Phantom Pain's .mtar (Motion Archive) files, written by
BobDoleOwndU. The tool is able to extract .gani (animation) files from
the archives, and supports adding new animations to existing archives.

## Usage

To unpack an .mtar archive, a user needs to simply drag and drop the
archive onto the MtarTool. Alternatively, the user can unpack an archive
by command line, by passing the filepath as an argument (example:
MtarTool Example.mtar). The tool will output the contained files in a
<filename>_mtar folder, and an .xml with a list of all of the files
that were unpacked. If the archive was an Mtar Type 2 file, additional
files may appear alongside the .gani files. Reference the table below to
see what the additional files are.

Note: All extensions besides .gani are not used by The Phantom Pain.
They are just used by the tool to reference an extracted chunk.

| Extension | Name              | Description                                                                             |
| --------- | ----------------- | --------------------------------------------------------------------------------------- |
| .gani     | Game Animation    | Animation file used by The Phantom Pain.                                                |
| .trk      | Track Description | Description of all main animation tracks for an Mtar Type 2 file.                       |
| .chnk     | Chunk             | A chunk of data with an unknown purpose belonging to an Mtar Type 2 file.               |
| .exchnk   | Extra Chunk       | An extra chunk of animation tied to a .gani file from an Mtar Type 2 file.              |
| .enchnk   | End Chunk         | A chunk of animation tied to a .gani file located at the bottom of an Mtar Type 2 file. |

To repack an archive, the user needs to drag the output .xml file onto
the tool. This can also be done by command line, by providing the
filepath as an argument (example: MtarTool Example.xml).

To add a new file to the archive, the user needs to add it as an entry
in the .xml, and add the file to the unpacked folder. If the file has an
.exchnk and/or a .enchnk, they should be added to the unpacked folder as
well, but do not need to be added as entries in the .xml. The tool will
automatically detect these files if they are present.

### Commands

Currently, the MtarTool only supports one command. The -n, or number
command. The -n command adds a four digit id to the beginning of every
file's name, indicating its position in the archive. The command can be
used by command line like this: MtarTool Example.mtar -n. If the first
file in the archive was named 333558ec7872a, it will instead be output
as 0000_333558ec7872a. The user does not need to use the -n command
when repacking, as the tool automatically detects if the name of a file
contains an id or not.

## Dictionary

MtarTool utilizes a dictionary of strings called mtar*_dictionary.txt*
to match hashed file names to original file path names. If it does not
find a match it will output the files with the hash in the root of the
extraction folder for the mtar, if it does find a match it will create
the original file/folder layout and name.

An up to date dictionary can be found at
<https://github.com/TinManTex/mgsv-lookup-strings>