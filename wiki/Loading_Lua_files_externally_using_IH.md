---
title: Loading Lua files externally using IH
permalink: /Loading_Lua_files_externally_using_IH/
---

## Using IH to load lua files externally (in MGS_TPP\\mod) instead of internally (in dat or fpkd)

These methods should only be used to speed up developing a mod, when
building a release version you should revert to using the lua files
loaded normally/internally.

### in-dat lua files:

Simply copy the in-dat lua file to `MGS_TPP\mod` , while retaining the
internal path ex copy:

`-Whatever folder you extracted dat
to-\Assets\tpp\motherbase\script\MbmCommonSetting.lua`

to

`MGS_TPP\mod\Assets\tpp\motherbase\script\MbmCommonSetting.lua`

Edit your external lua, then quit and start the game again and IH should
load the external lua. If there's an error IH should log that to
`MGS_TPP\mod\ih_log.txt` , search for: 'ERROR'

### in-fpkd lua files:

Fox automatically loads the lua files in the fpkd when it loads it, so
these need a workaround to get them to load an external lua file
instead.

1\. Make a 'dev' folder in `MGS_TPP\mod\`, ex:

`MGS_TPP\mod\dev\`

2\. Copy the fpkd lua you want to work on into that dev folder, rename
it, just add something to the end of the name like

f30050_sequence.lua to f30050_sequence_dev.lua

3\. At top of the existing in-fpkd lua file add:

<code>local loadExternal=true

if loadExternal then

  local fileName="f30050_sequence_dev.lua"

  return InfCore.PCall(function()return
InfCore.LoadSimpleModule(InfCore.paths.dev,fileName)end)

end</code>

Making sure the `fileName=` matches the external lua filename.

4\. Copy the same block of code from `local loadExtenal` to the `end` to
the top of the external dev lua. Changing to `loadExternal=false`

or you'll get an infinite recursion of loading until it fails lol

6\. Build/install your .mgsv

Then whenever the game loads the in-fpkd lua that will load the external
dev lua, and (if you have debugMode on, via IH debug menu) it will log
parsing errors to ih_log.txt when it first loads.

When you're ready to do a release build just copy the _dev lua back
over the in-fpkd lua (and double check the in-fpk lua has the
`loadExternal=false` from the external lua)

This method is useful depending on when the game loads/unloads the fpk.

For mission scripts it means you can just quit the game (or quit to
ACC), edit your _dev lua in MGS_TPP\\mod\\dev\\ then restart the game
and it will used the edited lua.

For sideops scripts just exit the sideops loadArea, edit your external
lua then return to the sideop loadArea, and it should load your external
lua.

[Category:Lua](/Category:Lua "wikilink") [Category:Infinite
Heaven](/Category:Infinite_Heaven "wikilink")