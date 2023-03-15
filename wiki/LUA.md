---
title: Lua
permalink: /Lua/
tags: [File Formats, Lua]
---

This article is a fundamental approach to Lua and it's relation in the
FOX Engine and MGSV Modding.

Lua is a high-level programming language (scripting language) designed
for embedded use in applications. It's cross-platform since the
interpreter of the compiled bytecode is written in the C Programming
Language.

Lua was designed primarily for extending software applications
customization and is a popular scripting system for games.

## Lua in MGSV

MGSV uses [Lua 5.1](https://www.lua.org/manual/5.1/).

The lua files are spread across data1.dat and patch .dat (00.dat
unmodded, 01.dat with snakebite installed), which are loaded when the
game is initialized, and in fpkds, which are loaded when the respective
fpk is.

For ease of reference we will call them data1 luas or fpk luas.

The data1 luas were run through a
[minifier](https://en.wikipedia.org/wiki/Minification_\(programming\))
for the mgsv build, so TinManTex has worked on creating [deminified
versions](https://github.com/TinManTex/mgsv-deminified-lua) of these
scripts for ease of use.

Less formal talk, the way Lua works in general you are not scripting
elements that directly change the game engine, much rather you are
scripting customizable options that are provided by the engine. This is
how Lua works in most cases and that's the way it's being implemented
here.