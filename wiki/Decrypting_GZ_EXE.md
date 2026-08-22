---
title: 'Decrypting GZ EXE'
permalink: /Decrypting_GZ_EXE/
tags: [EXE, Guides]
---

Ground Zeroes EXE is encrypted with [SteamStub DRM](https://partner.steamgames.com/doc/features/drm); since game code is encrypted, analysis or binary patching is impossible (the only functions you will see in the encrypted EXE in Ghidra are from SteamStub).
Luckily there are public tools to remove SteamStub from the EXE. To decrypt it, use [Steamless](https://github.com/atom0s/Steamless) on the EXE. Assuming the input EXE name is "MgsGroundZeroes.exe", the unencrypted EXE will be called "MgsGroundZeroes.unpacked.exe".  
