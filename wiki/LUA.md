---
title: LUA
permalink: /LUA/
---

This article is a fundamental approach to Lua and it's relation in the
FOX Engine and MGSV Modding.

Lua is a high-level programming language (scripting language) designed
for embedded use in applications. It's cross-platform since the
interpreter of the compiled bytecode is written in the C Programming
Language.

Lua was designed primarily for extending software applications
customization.



## Lua in MGSV

The Lua that is implemented into MGSV is hard to read. That's why
TinManTex went ahead and made a [deminified
version](https://github.com/TinManTex/mgsv-deminified-lua) of these
scripts for ease of use.

Less formal talk, the way Lua works in general you are not scripting
elements that directly change the game engine, much rather you are
scripting customizable options that are provided by the Engine. This is
how Lua works in most cases and that's the way it's being implemented
here.