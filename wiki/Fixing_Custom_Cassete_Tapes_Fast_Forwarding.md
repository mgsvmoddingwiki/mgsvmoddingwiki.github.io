---
title: Fixing fast forwarding for custom Cassete Tapes
permalink: /Fixing_Custom_Cassete_Tapes_Fast_Forwarding/
tags: [Guides, Sound]
---

When exporting a WEM from Wwise, it normally lacks the seektable needed for fast-forwarding. For 99% of WEMs, this isn't a big issue, but for cassete tapes, it poses a moderate issue. 
To enable the seektable, first open your Wwise project and select the sound you wish to add a seektable to. ![](/assets/seektableStep1.png)
The sound property editor should appear ![](/assets/seektableWindow.png)
Select "Source Settings" in the sound property editor, then click on "Edit" next to "PCM as Input".
![](/assets/seektableSourceSettings.png)
Another window should pop up, this should be the "Conversion Settings Editor" window.
![](/assets/seektablecse.png)
In the row for Windows, select format and change it from "PCM" to "Vorbis".
![](/assets/seektablevorbis.png)
A new column should appear, click the "Edit" button in this column.
Pressing the "Edit" button should open the "Vorbis Encoder Parameters" window.
![](/assets/seektablevorbWin.png)
Select "No Seek Table" under "Seek Table Granularity", and change it to "8192" (other values may work, but I am certain that 8192 will work).
Click "OK", and exit the "Conversion Settings Editor", then right click on your sound, and select "Convert" from the drop-down list (or you can just select it, and do it SHIFT + C both work).
Congrats! Your WEM should now (hopefully) have a seektable, and you should now be able to fast forward your custom cassette tapes.
