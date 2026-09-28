---
title: Wwise
permalink: /Wwise/
tags: [Tools, Sound]
---

Wwise is the audio software used to author the sounds in *[Ground Zeroes](/Ground_Zeroes)*, *The Phantom Pain*, *P.T.* and *Metal Gear Survive*.

The soundbank version used in GZ, P.T. and TPP is `88` (which [relates to](https://github.com/bnnm/wwiser/blob/2f0ad2106400b190c14d157c6650d9bc0c872063/wwiser/parser/wdefs.py#L42) Wwise version 2013.1/2). While for Survive the soundbank version is `118` ([relating to](https://github.com/bnnm/wwiser/blob/2f0ad2106400b190c14d157c6650d9bc0c872063/wwiser/parser/wdefs.py#L46) version 2016.1).

Audiokinetic, the makers of Wwise, currently only [publicly host](https://www.audiokinetic.com/downloads/previous/) the 2015.1.9 (build 5624) version as the earliest downloadable (with the exception of the setup installer, which can be found linked below[^2015info]). As such mirrors of earlier versions are only available via user-published mirrors, which are included in the list below.

## Versions

<!-- Using the `#fn:` fragment ID directly for some of the 2015.1.9 links instead of a proper footnote reference just so it's visually clearer what is clickable if absentminded. -->

| Version | Link(s) | Notes |
|-|-|-|
| **2013.2.9** (build 4872) | [Nexus Mods](https://www.nexusmods.com/witcher3/mods/3234) | Used for MGSV and P.T. User [says](https://forums.cdprojektred.com/index.php?threads/wwise-2013-2-9.10979672/) they were provided this archive from Audiokinetic. |
| **2015.1.9** (build 5624) | [Direct links](#fn:2015info)<br/>Or [archive.org zip](https://archive.org/details/wwise-2015.1.9) | Also compatible with creating soundbanks for MGSV but version 2013.2.9 is recommended for correctness.<br/><br/>The checksums of the required files from the archive.org user-published mirror match the original checksums[^2015info], **note** however it is missing the Visual C++ 2013 Redistributable, which can be found [here](#fn:2015info). |
| **2016.1** | ? | Used for Metal Gear Survive. As yet we don't know of a mirror for this version. |

[^2015info]: Direct download links and SHA-256 checksums for 2015.1.9 (build 5624):
    - [`Authoring_Data.msi`](https://www.audiokinetic.com/files/?get=2015.1.9_5624/Authoring_Data.msi): 193e6526d33b82e27b87b5158858ffa5121e25c61c943ceb28f8aeec4431b3b6
    - [`Authoring_x64.msi`](https://www.audiokinetic.com/files/?get=2015.1.9_5624/Authoring_x64.msi): b1c4c1a68aaea6df248c16dcd353aaaa22214115568a1366cc7fd8ee10b388b1
    - [`vc2013redist_x64.exe`](https://www.audiokinetic.com/files/?get=2015.1.9_5624/vc2013redist_x64.exe): e554425243e3e8ca1cd5fe550db41e6fa58a007c74fad400274b128452f38fb8
    - [`Wwise_v2015.1.9_Setup.exe`](https://web.archive.org/web/20250826201342/https://www.audiokinetic.com/files/?get=2015.1.9_5624%2FWwise_v2015.1.9_Setup.exe): 7127e569b34def0c8b0dc1efd858d2ec12c4c6e0e56939aaeb758abcfff992ea


## Installation

1. First disconnect from the internet in Windows.
2. Then install the 64-bit Visual C++ Redistributable installer(s) (the `vc...x64.exe` named installer(s)).
3. Run the `Authoring_Data.msi` installer.
4. Run the `Authoring_x64.msi` installer.
5. Finally run the setup installer (`Wwise_v..._Setup.exe`) while still offline.
6. Once it has finished the window will display the text 'Wwise is installed' in the top-left corner. At this screen  you can close the installer window since we don't need to add other components.
7. Search the start menu for *Wwise* and launch the program.
    - If it doesn't appear you can navigate to the install directory (`C:\Program Files (x86)\Audiokinetic\Wwise...\Authoring\x64\Release\bin\`) and launch `Wwise.exe`.
8. Accept the EULA that pops up and it's now ready to use.

You can also now connect back online.


## Other notes

Wwise when run without a license will be in 'evaluation mode' which limits the maximum number of items in a soundbank to 200.