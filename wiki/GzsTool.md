---
title: GzsTool
permalink: /GzsTool/
tags: [Tools, File Tools]
---

{% include infobox dev="Atvaark" site="https://github.com/Atvaark/GzsTool" download="https://github.com/Atvaark/GzsTool/releases" %}

GzsTool is an open-source archive unpacker and repacker for Metal Gear
Solid V: Ground Zeroes and Metal Gear Solid V: The Phantom Pain written
by Atvaark. It supports unpacking and repacking QAR .dat, .fpk, .fpkd,
.pftxs, and .sbp files. When unpacking archives, it automatically
decrypts encrypted text files. It can also calculate file name hashes on
the fly, allowing it to add new files to archives without needing a
pre-calculated hash.

> **Ground Zeroes compatibility:** if wanting to mod Ground Zeroes, the current version of GzsTool does not support Ground Zeroes .g0s files, you must use an earlier version: [GzsTool v0.2](https://github.com/Atvaark/GzsTool/releases/tag/v0.2)
{:.important}

## Usage

GzsTool can unpack files simply by having an archive file dragged onto
it. It can also unpack archives by command line, providing GzsTool the
path to the file (example: `GzsTool Example.dat`). It will output all of
the files contained in the archive into a folder named
*\<filename\>_\<extension\>*, and an .xml file detailing all of the files
that were contained in the archive. GzsTool can also unpack all .fpk and
.fpkd archives in a specified directory, by dragging the folder onto
GzsTool, or specifying the directory in command line (example: `GzsTool C:\Example\Folder`).

GzsTool utilizes a dictionary of filenames called `qar_dictionary.txt`.
As it outputs files, it compares the hashes generated from this
dictionary to the hashed filenames found in the archive. If it finds a
match, it will output the file by its real name. If it cannot find a
match, it will output the file by its hashed name.

To repack an archive, the user needs to drag the .xml file output by
GzsTool onto GzsTool, or by using command line and providing GzsTool the
path to the .xml (example: `GzsTool Example.xml`). GzsTool will
reference the list of files listed in the .xml to find and add files to
the archive.

GzsTool can also add new files to an archive by adding files into its
output folder and adding the file to the .xml list. Because it can
calculate hashes on the fly, it does not need a pre-calculated hash for
new files with unhashed names. For files with hashed names, a separate
entry for the hash with its extension is required.

## Dictionary

GzsTool utilizes a dictionary of strings called `qar_dictionary.txt`
for qar (dat) and pftxs archives to match hashed file names to original
file path names. If it does not find a match it will output the files
with the hash in the root of the extraction folder for the archive, if
it does find a match it will create the original file/folder layout and
name.

> An up to date qar_dictionary can be found at [TinManTex's repository](https://github.com/TinManTex/mgsv-lookup-strings).

GzsTool also uses a dictionary called fpk_dictionary.txt to recover
full filenames of files in fpks VERIFY possibly this is only for GZ
fpks.

## BobDoleOwndU's Fork

{% include infobox dev="Atvaark, BobDoleOwndU" site="https://github.com/BobDoleOwndU/GzsTool" download="https://github.com/BobDoleOwndU/GzsTool/releases" %}

BobDoleOwndU created a fork of GzsTool with some added debugging
commands, and the ability to repack .pftxs files without providing a
hash for entries with hashed names.

### Debugging Commands

All debugging commands can be accessed by command line by providing
GzsTool a `-d` argument.

| Command Name        | Command                            | Description                                                                                                                                  |
| ------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Hash Filename       | `-d -h <filename>`                 | Produces the hashed version of a given filename.                                                                                             |
| Hash Extension      | `-d -he <extension (without *.*)>` | Produces the digits that when binary left-shifted by 51 then binary ored with the filename, will produce the filename's hash with extension. |
| Hash With Extension | `-d hwe <filename with extension>` | Produces the hashed version of a given filename with its extension included.                                                                 |
| Hash Legacy         | `-d -hl`                           | Uses the legacy hash function, which is still used in TPP to hash most strings.                                                              |

