---
title: WMV
permalink: /WMV/
---

The pre-rendered video cutscenes in Metal Gear Solid V: The Phantom Pain
are stored as *'.WMV **(**Windows Media Video*') files, with the
extension changed to .dat. Their names are PathCode64 hashes (with
extension) of their actual paths, which are formatted as:

`/Assets/tpp/movie/Win/[videoName][targetSuffix].wmv`

The videoName can be any string, and in The Phantom Pain's case, the
five base game's names are as follows. As for the \[targetSuffix\], it
changes depending on the voice version of the game - English (_en) and
Japanese (_jp)

|                      |                           |                      |                      |
| -------------------- | ------------------------- | -------------------- | -------------------- |
| videoName            | Description               | English File Name    | Japanese File Name   |
| `p21_030010_movie`   | Movie after Cyprus        | e2f9a1fda590d087.dat | e2f861abe2e17760.dat |
| `p31_010055_movie`   | Movie after Miller Rescue | e2fbebbd66f86086.dat | e2f867210cb635ca.dat |
| `movie_Preview`      | Chapter 2 Preview Movie   | e2f8e499bc8f3606.dat | e2fb01787df277e4.dat |
| `p51_020030_01movie` | Nuclear Development       | e2faa449a7e0781d.dat | e2fb41f633494d0c.dat |
| `p51_020030_02movie` | Nuclear Disarmament       | e2fb02c35da41a21.dat | e2f986b5fa138174.dat |

So the resulting path would be something like this:

`/Assets/tpp/movie/Win/p21_030010_movie_en.wmv (e2f9a1fda590d087.dat)`

The .dat files' names are listed in chunk0.dat's foxfs.dat, in the
safiles entry, converted to decimal.

English .foxfs.dat:

`   `<safiles>
`       `<file code="16355565633005451293"/>
`       `<file code="16355073395740587526"/>
`       `<file code="16355925670434988166"/>
`       `<file code="16355669509839002145"/>
`       `<file code="16355281632549195911"/>
`   `</safiles>

Japanese .foxfs.dat:

`   `<safiles>
`       `<file code="16355251637915451764"/>
`       `<file code="16355738997404290316"/>
`       `<file code="16355668088746833892"/>
`       `<file code="16354929437669685088"/>
`       `<file code="16354935438440805834"/>
`   `</safiles>

In-game, the movies are loaded by a .fox2 DataSet entity of the
VideoPlayerMemoryBlock class, using the aforementioned \[videoName\].

`    `<entity class="VideoPlayerMemoryBlock" classVersion="0" addr="0x06A9E9B0" unknown1="84" unknown2="198117">
`      `<staticProperties>
`        `<property name="name" type="String" container="StaticArray" arraySize="1">
`          `<value>`VideoPlayerMemoryBlock0000`</value>
`        `</property>
`        `<property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
`          `<value>`0x03174A00`</value>
`        `</property>
`        `<property name="identify" type="String" container="StaticArray" arraySize="1">
`          `<value>`[videoName]`</value>
`        `</property>
`        `<property name="videoFormat" type="String" container="StaticArray" arraySize="1">
`          `<value></value>
`        `</property>
`        `<property name="videoWidth" type="uint32" container="StaticArray" arraySize="1">
`          `<value>`0`</value>
`        `</property>
`        `<property name="videoHeight" type="uint32" container="StaticArray" arraySize="1">
`          `<value>`0`</value>
`        `</property>
`        `<property name="videoAllocateSize" type="uint32" container="StaticArray" arraySize="1">
`          `<value>`10485760`</value>
`        `</property>
`      `</staticProperties>
`      `<dynamicProperties />
`    `</entity>

And in .lua, they're played with a TppMovie.Play function.

`TppMovie.Play{`
`   videoName = [videoName],    `
`}`