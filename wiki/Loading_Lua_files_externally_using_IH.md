---
title: Loading Lua files externally using IH
permalink: /Loading_Lua_files_externally_using_IH/
---

Using IH to load lua files externally (in MGS_TPP\\mod) instead of
internally (in dat or fpkd)

These methods should only be used to speed up developing a mod, when
building a release version you should revert to using the lua files
loaded normally/internally.

in-dat lua files:

Simply copy the in-dat lua file to mgs_tpp\\mod , while retaining the
internal path ex copy:

<Whatever folder you extracted dat to>\\Assets\\tpp\\motherbase\\script\\MbmCommonSetting.lua

to

MGS_TPP\\mod\\Assets\\tpp\\motherbase\\script\\MbmCommonSetting.lua

Edit your external lua, then quit and start the game again and IH should
load the external lua. If there's an error IH should log that to
MGS_TPP\\mod\\ih_log.txt , search for: 'ERROR'

in-fpkd lua files:

Fox automatically loads when it loads the fpkd so these need a
workaround to get them to load an external lua file instead

Should only be used while developing, should just revert to using the
internal fpkd script when releasing mod.

1\. At top of the existing in-fpkd lua file add:

if true then

  local fileName="f30050_sequence_dev.lua"

  return InfCore.PCall(function()return
InfCore.LoadSimpleModule(InfCore.paths.dev,fileName)end)

end

2\. Make a 'dev' folder (or name it anything really) in mgs_tpp\\mod\\

ex mgs_tpp\\mod\\dev\\

3\. Copy the fpkd lua you want to work on into here, rename it, just add
something to the end of the name like

f30050_sequence.lua \> f30050_sequence_dev.lua

4\. Edit the

'if true then'

in your dev copy to

'if false then'

or you'll get an infinite recursion of loading until it fails lol

5\. build/install your .mgsv

Then whenever the game loads the in-fpkd lua that will load the external
_dev lua, and (if you have debugMode on, via IH debug menu) it will log
parsing errors when it first loads.

This method is useful depending on when the game loads/unloads the fpk.

For mission scripts it means you can just quit the game (or quit to
ACC), edit the _dev lua in mgs_tpp\\mod\\debug\\ then restart the game
and it will used the edited lua.

Which is a bit faster than building .mgsv/installing .mgsv (though that
can be automated with a batch file it's still slow depending on your
.mgsv).

For sideops scripts just exit the sideops loadArea (is there a wiki page
on quest areas?), edit your external lua then return to the sideop
loadArea, and it should load your external lua.

When you're ready to do a release build just copy the _dev lua back
over the in-fpkd lua.

And if you want to continue developing after remember to change the

'if false then'

to

'if true then'

in the in-fpkd lua.