---
title: IHHook
permalink: /IHHook/
tags: [Infinite Heaven, EXE]
---

A proxy dll (of dinput8.dll) that loads with MGSV to provide extended
features for modding. Previously bundled with [Infinite
Heaven](/Infinite_Heaven "wikilink"), IHHook has been split into a
separate install and nexus page to isolate feedback and issues.

## Requirements

  - MGSV version 1.15 (in title screen), 1.0.15.3 in exe.
  - [Infinite Heaven r258](/Infinite_Heaven "wikilink")
  - [Microsoft Visual C++ Redistributable for Visual Studio,
    x64](https://aka.ms/vs/17/release/VC_redist.x64.exe)

## Features

  - [dear-IMGUI based menu for Infinite
    Heaven.](https://youtu.be/ERL7okZVcW4)
  - Lua C API support (mostly complete): Allows extending the MGSVs
    embedded lua via C. Does not have dynamic library support as mgsv
    lua is statically compiled, and running the mgsv lua state through a
    seperate distro of lua isn't desirable since the mgsv lua core is
    modified from default. However it is possible to compile lua C
    modules into IHHook.
  - Logging via spdlog: Infinite Heaven uses this for better performance
    (mostly used for debugging). Has it's own separate log for
    debug/info output.
  - Named Pipe server: Starts up a threaded Named Pipe server with two
    pipes mgsv_in, mgsv_out. Currently used by Infinite Heaven to
    improve performance when using IHExt and should open further
    possibilities I was reluctant to pursue due to old text file based
    IH\>IHExt communication.
  - CityHash logging (currently has to be compiled in with a \#define)
    using emooses cityhash logging (though using spdlog for better
    performance) that IHHook was initially built off.
  - RawInput keyboard processing and blocking (proof of concept)

**[See this Youtube playlist for features that are visually
demonstratable](https://www.youtube.com/playlist?list=PLSKlVTXYh6F9XCIpHUGTSkd9gDzoU6N1s).**
