---
title: Export Symbols
permalink: /Export_Symbols/
tags: [EXE, Lua, Guides]
redirect_from:
  - /ExportSymbols/
---

### Fox.ExportSymbols

Game shipped with some debug functions still in the exe, locked behind debug flags. One of them is `Fox.ExportSymbols`.
To enable it, patch the exe (version 1.0.15.3, md5 7cc5f282b068f741adda2bb1076fb721):
  - at 0x1431779CA change `0x74,0x17` to `0xEB,0x17`
  - at 0x143177A29 change `0x75,0x47` to `0x48,0x90`

Call `Fox.ExportSymbols("")` in lua, check "modules.txt" contents (same directory as exe).

According to code, there should be "symbols.txt" with entity info, but file is missing.

### Fox.ExportSerializeInfo

You can also dump xml-serialized info without any patches:

Create directory `tmp` in same directory as exe and call `Fox.ExportSerializeInfo()` from lua. Output is in `tmp/Tpp_edb_win64.xml`.

Sample data: 
  - [Tpp_edb_win64.xml](/assets/Export_Symbols/Tpp_edb_win64.xml)
  - [modules.txt](/assets/Export_Symbols/modules.txt)
