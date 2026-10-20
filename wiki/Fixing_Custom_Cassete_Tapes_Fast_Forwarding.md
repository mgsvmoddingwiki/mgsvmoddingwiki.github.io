---
title: Fixing fast forwarding for custom Cassete Tapes
permalink: /Fixing_Custom_Cassete_Tapes_Fast_Forwarding/
tags: [Guides, Sound]
---

When exporting a WEM from Wwise, it normally lacks the seektable needed for fast-forwarding. For 99% of WEMs, this isn't a big issue, but for cassete tapes, it poses a moderate issue. 
To enable the seektable (and a whole lot of other things which help when exporting Wwise thingys for Tpp, which include conversion settings for Voices (Vorbis + Embed filename marker for subtitles), Demos (Vorbis + 4096 granularity table) and Tapes (Vorbis + 8192 granularity table)), simply place this WWU file (that caplag made) into your Wwise projects "Conversion Settings" folder e.g "C:/Users/{insert your own username}/Documents/Wwise Projects/{name of your Wwise Project}/Conversion Settings"
{% include download file="/assets/Fox Conversion Settings.wwu" %}
