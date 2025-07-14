---
title: Save files
permalink: /Save_files/
tags: [File Formats, EXE]
---

PC save files are located at:
  - `<Steam-folder>\userdata\<user-id>\287700\local\`
  - `<Steam-folder>\userdata\<user-id>\311340\remote\`

On Windows, `<Steam-folder>` is `%PROGRAMFILES(X86)%\Steam`. On Linux: `$HOME/.steam/steam/`.

TPP uses GZ directory (311340) to store actual save files and backs them up in TPP directory (287700) for Steam Cloud sync.
First, game creates files with index `0` in `287700\local\`. After server login (code proof?) another file created with 
index `1`. That file is then copied to `311340\remote\` and used for Steam Cloud sync. Save data manipulations (editing/replacing)
must be performed on files in `311340` directory.

You can remove all save data by turning Steam Cloud sync off and removing `287700` and `311340` directories.

Save file names:
  - 287700 (TPP):
    - `PERSONAL_DATA<index>`
    - `TPP_CONFIG_DATA<index>`
    - `TPP_GAME_DATA<index>`
    - TPP_GRAPHICS_CONFIG
  - 311340 (GZ):
    - MGO_GAME_DATA
    - PERSONAL_DATA
    - TPP_CONFIG_DATA
    - TPP_GAME_DATA

`TPP_GRAPHICS_CONFIG` is a plain json file with graphics settings (resolution, effects etc.).

Others are encrypted with symmetric algorithm. Their contents are player-specific variables (like GMP, staff etc.) and 
lua variables encoded in strcode32. Save file name is set in lua, `00_dat/Assets/tpp/script/lib/TppDefine.lua`.
You can change it to keep main save file safe. More information about saves can be found in `0/00/Assets/tpp/script/lib/TppSave.lua`.
In the exe you'll be looking for `tpp::gm::impl::ScriptVar_*` functions.

Use [squib](https://github.com/unknown321/squib) to decode/encode files and inspect their contents.
