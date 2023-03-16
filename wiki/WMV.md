---
title: WMV
permalink: /WMV/
tags: [File Formats, Cutscenes]
---

The pre-rendered video cutscenes in Metal Gear Solid V: The Phantom Pain
are stored as **.WMV (Windows Media Video)** files, with the
extension changed to .dat. Their names are PathCode64 hashes (with
extension) of their actual paths, which are formatted as:

`/Assets/tpp/movie/Win/[videoName][targetSuffix].wmv`

The videoName can be any string, and in The Phantom Pain's case, the
five base game's names are as follows. As for the \[targetSuffix\], it
changes depending on the voice version of the game - English (_en) and
Japanese (_jp). The targetSuffix is assigned in Lua's TppMovie library,
and therefore can be skipped if calling the TppVideoPlayer functions
directly. The subtitle track is seemingly hardcoded in the .exe.

| videoName            | Description               | English File Name    | Japanese File Name   |
| -------------------- | ------------------------- | -------------------- | -------------------- |
| `p21_030010_movie`   | Movie after Cyprus        | e2f9a1fda590d087.dat | e2f861abe2e17760.dat |
| `p31_010055_movie`   | Movie after Miller Rescue | e2fbebbd66f86086.dat | e2f867210cb635ca.dat |
| `p31_050100_movie`   | Chapter 2 Preview Movie   | e2f8e499bc8f3606.dat | e2fb01787df277e4.dat |
| `p51_020030_01movie` | Nuclear Development       | e2faa449a7e0781d.dat | e2fb41f633494d0c.dat |
| `p51_020030_02movie` | Nuclear Disarmament       | e2fb02c35da41a21.dat | e2f986b5fa138174.dat |

So the resulting path would be something like this:

`/Assets/tpp/movie/Win/p21_030010_movie_en.wmv (e2f9a1fda590d087.dat)`

The .dat files' names are listed in chunk0.dat's foxfs.dat, in the
safiles entry, converted to decimal.

English .foxfs.dat:

```xml
<safiles>
   <file code="16355565633005451293"/>
   <file code="16355073395740587526"/>
   <file code="16355925670434988166"/>
   <file code="16355669509839002145"/>
   <file code="16355281632549195911"/>
</safiles>
```

Japanese .foxfs.dat:

```xml
<safiles>
    <file code="16355251637915451764"/>
    <file code="16355738997404290316"/>
    <file code="16355668088746833892"/>
    <file code="16354929437669685088"/>
    <file code="16354935438440805834"/>
</safiles>
```

In-game, the movies are loaded by a .fox2 DataSet entity of the
VideoPlayerMemoryBlock class, using the aforementioned \[videoName\].

```xml
<entity class="VideoPlayerMemoryBlock" classVersion="0" addr="0x06A9E9B0" unknown1="84" unknown2="198117">
    <staticProperties>
    <property name="name" type="String" container="StaticArray" arraySize="1">
        <value>VideoPlayerMemoryBlock0000</value>
    </property>
    <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
        <value>0x03174A00</value>
    </property>
    <property name="identify" type="String" container="StaticArray" arraySize="1">
        <value>[videoName]</value>
    </property>
    <property name="videoFormat" type="String" container="StaticArray" arraySize="1">
        <value></value>
    </property>
    <property name="videoWidth" type="uint32" container="StaticArray" arraySize="1">
        <value>0</value>
    </property>
    <property name="videoHeight" type="uint32" container="StaticArray" arraySize="1">
        <value>0</value>
    </property>
    <property name="videoAllocateSize" type="uint32" container="StaticArray" arraySize="1">
        <value>10485760</value>
    </property>
    </staticProperties>
    <dynamicProperties />
</entity>
```

And in .lua, they're played with a TppMovie.Play function.

```lua
TppMovie.Play{
    videoName = [videoName],
    subtitleName = "string",
    memoryPool = [videoName],
    isLoop = false,
    onStart = function() end,
    onEnd = function() end,
}
```

  - **videoName**: Required. Actually specifies the movie to play.
  - **memoryPool**: Optional. Also uses the same string as videoName,
    but not sure what it actually does.
  - **subtitleName**: Does not seem to work. Subtitle id seems to be
    hardcoded in the .exe.
  - **isLoop**: Optional. Bool. Seemingly unused in TPP's TppMovie.Play,
    but may still be usable in a direct call of
    TppVideoPlayer.LoadVideo.
  - **onStart**: Optional. This function will be executed when the movie
    starts playing.
  - **onEnd**: Optional. The function will be executed when the movie
    finishes playing, whether it's skipped or not.

Alternatively, you can directly call TppVideoPlayer, just like how
TppMovie.Play does, with the isLoop flag, but without any fancy onStart
or onEnd callbacks or status changes and such.

```lua
local movie=TppVideoPlayer.LoadVideo{
    VideoName=[videoName],
    SubtitleName="string",
    MemoryPool=[videoName],
    Loop=false
}
if not movie then
    TppVideoPlayer.PlayVideo()
end
TppMovie.CallbackFunctionTable[Fox.StrCode32([videoName])]={
    videoName=[videoName],
    onStart=function()end,
    onEnd=function()end
}
```

  - **videoName**: Required. Specifies the movie to play. Lua's TppMovie
    adds the targetSuffix here, but calling it directly doesn't require
    that.
  - **subTitleName**: Does not seem to work. Subtitle id seems to be
    hardcoded in the .exe.
  - **memoryPool**: Optional. Also uses the same string as videoName,
    but not sure what it actually does.
  - **isLoop**: Optional. Bool. Never used in TPP, but used in Survive
    for the title screen.
  - **onStart**: Optional. This function will be executed when the movie
    starts playing.
  - **onEnd**: Optional. The function will be executed when the movie
    finishes playing, whether it's skipped or not.
