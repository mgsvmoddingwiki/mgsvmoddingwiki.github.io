---
title: Lang Files
permalink: /Lang_Files/
---

lng/lng2 files aka lang files are lists of strings used for localization
of text, mainly used for UI.

Mostly found in
Assets\\tpp\\pack\\ui\\lang\\lang_default_data_<language>.fpk

Language codes - eng,fre,ger,ita,jpn,por,rus,spa

lng/lng2 files be converted to and from editable xml files using
[LangTool](/LangTool "wikilink") alongside a lang_dictionary that
recovers the langIds.

The converted lng2 xml localization string entries will look like:

<Entry Key="4191827342" Value="Soviet Soldier" />

<code><Entry LangId="announce_get_gravure" Color="5" Value="Obtained Poster [%s] [GMP +%d]" />
</code>

The Key is a StrCode32 of the lua key string, most commonly refereed to
at langId in the lua scripts.

The second entry langId actually resolves from key_poster_3500, but
was omitted from the dictionary for this example.

Localization strings support string formatting characters, in the above
entries seen as %s for another langId, %d for a number.

What it will accept however seems dependent on the function.
AnnounceLogViewLangId will only accept the string, number, or two
numbers as it's parameters, other combinations lock the game up.

Evidence from other localization strings in lng2 files suggest other
functions are less restricted.

Lua usage:

`TppUICommand.AnnounceLogViewLangId("announce_get_gravure","key_poster_3500",500)`

If a langId is called without a matching entry in the particular
language lang file it will return empty.

Fox engine will load all lng2 files from a pack enabling addition of
completely new .lng2 files.