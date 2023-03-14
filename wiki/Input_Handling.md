---
title: Input Handling
permalink: /Input_Handling/
---

Input is handled by checking bitflags on PlayerVars.scannedButtonsDirect

Example:

`if bit.band( PlayerVars.scannedButtonsDirect, PlayerPad.EVADE ) ==
PlayerPad.EVADE then`

# Bitflags for PlayerPad

DECIDE=0,

STANCE=1,

DASH=2,

HOLD=3,

FIRE=4,

RIDE_ON=5,

RIDE_OFF=5,

ACTION=5,

MOVE_ACTION=5,

JUMP=5,

RELOAD=6,

STOCK=7,

ZOOM_CHANGE=7,

VEHICLE_CHANGE_SIGHT=7,

MB_DEVICE=8,

CALL=9,

INTERROGATE=9,

SUBJECT=10,

UP=11,

PRIMARY_WEAPON=11,

DOWN=12,

SECONDARY_WEAPON=12,

LEFT=13,

RIGHT=14,

VEHICLE_LIGHT_SWITCH=14,

VEHICLE_TOGGLE_WEAPON=14,

CQC=15,

SIDE_ROLL=16,

LIGHT_SWITCH=17,

EVADE=18,

VEHICLE_FIRE=19,

VEHICLE_CALL=20,

VEHICLE_DASH=21,

BUTTON_PLACE_MARKER=22,

PLACE_MARKER=22,

ESCAPE=23,--tex Not in PlayerPad, own name

# Notes

dash,hold,fire,subject and cqc aren't listed in exe for whatever reason
but are used at different points in script. I worked through it all
manually anyway back when, both printing out the value of the flags and
testing flags that would fall in the gaps.

The numbers on the list are the pow values, so do 2^flag index (except
for ALL obviously) if for whatever reason you want to use a direct
value, though not much use since they mostly seem accounted for.

ESCAPE (my naming) is a bit odd, figured it out manually from the next
logical value/outputting scannedbuttons, but there's no actual matching
use of it I could see in the scripts, it's not strictly the Pause
binding since it's still set on press even if Pause is rebound.

2^24 is set on both quick dive and RS click, which has so much bound to
it that I can't really figure out what it's supposed to signify.

Testing 2^25 to 2^32(assuming uint) didn't come up with anything
further, though it can't remember how exhaustively I tested those (it's
been a while)

You'll see a bunch of the flags use the same values, which means there's
no way to differentiate on those when pressed.

The naming of the functions band/bor/bxor and the rest in the exe
suggest fox engine is using an implementation of bitops
http://bitop.luajit.org

STICK_L STICK_R TRIGGER_L TRIGGER_R TRIGGER_ACCEL TRIGGER_BREAK
are used with other functions/variables/not used with scannedButtons

See Infinite Heavens /Assets/tpp/script/ih/InfButtons.lua for some more
notes. [Category:Lua](/Category:Lua "wikilink")
[Category:Player](/Category:Player "wikilink")