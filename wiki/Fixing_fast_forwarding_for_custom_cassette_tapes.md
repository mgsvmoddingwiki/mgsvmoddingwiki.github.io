---
title: Fixing fast forwarding for custom cassete tapes
permalink: /Fixing_fast_forwarding_for_custom_cassette_tapes/
tags: [Guides, Sound]
---

When exporting a WEM from [Wwise](/Wwise), it normally lacks the seektable needed for fast-forwarding. For 99% of WEMs, this isn't a big issue, but for cassette tapes, it poses a moderate issue.

To enable the seektable (and a whole lot of other things which help when exporting Wwise thingys for TPP, which include conversion settings for Voices (Vorbis + Embed filename marker for subtitles), Demos (Vorbis + 4096 granularity table) and Tapes (Vorbis + 8192 granularity table)), simply place the downloadable WWU file below (made by caplag) into your Wwise projects "Conversion Settings" folder, eg: `C:/Users/<insert your own username>/Documents/Wwise Projects/<name of your Wwise Project>/Conversion Settings`.

{% include download file="/assets/Fox Conversion Settings.wwu" %}
