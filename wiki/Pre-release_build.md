---
title: Pre-Release Build
permalink: /Pre-release_build/
tags: [EXE]
---
# August 4, 2015 Pre-Release

[Download on Hidden Palace.](https://hiddenpalace.org/Metal_Gear_Solid_V:_The_Phantom_Pain_(Aug_4,_2015_prototype))

## Notes
This build comes with packing logs, a Steam and Steam-less executable, and a .map file with function signatures for each. Otherwise, it's nearly identical to the release version.

The Steam executable requires a Steam license for the game, will not connect to the server due to being an out of date version, and will not read the latest version's save data, and may even overwrite them if you don't back them up.

The Steamless executable requires a "fox" folder in the %TEMP% directory of the current user to save progress data. That's "%TEMP%\fox\", or usually, "C:\Users\(username)\AppData\Local\Temp\fox\".

## Bugs

- Terrain pattern blend parsing appears to be completely broken. It's especially visible in and around Shago Village.

- Cassette tapes cannot be obtained from radios. Approaching them, before or after breaking them, will not yield a button prompt to acquire them.

- The build does not come with a "CustomSoundtrack" folder, or the "Sands.mp3" usage example file. The "Musical content" album in the in-game Cassette Tapes menu does not have a name, but does exist. If there is no content in the "CustomSoundtrack" folder, selecting that nameless album will not let you back out of it, but you can close the iDroid to close it. Placing an .mp3 file in the directory avoids this, however the album will still be nameless.
