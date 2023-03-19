---
title: TppResult.lua
permalink: /TppResult.lua/
tags: [Lua, Missions]
---

File location: Assets/tpp/script/lib/

Function: Calculates the player's end-of-mission score based on their
performance. We can change several things in this script including GMP
awarded and rank awarded for successful mission completion. Additionally
it also keeps track of the player's playstyle for awarding codenames,
limits the player's rank to A if it detects the player has used a
rank-limiting item and updating the Records tab using various functions.

The game uses a ranking system of E(lowest), D, C, B, A and S (highest)
based on how the player completed the mission according to several
criteria. The criteria are marked below, along with their values and
special notes about how they are counted in-game.

They are contained in the array e.COMMON_SCORE_PARAM:

  - Time taken to complete the mission. (more testing needed. It looks
    like it should make you eligible for an S rank if you complete the
    mission in less than 300 seconds, but upon testing, it doesn't seem
    to.)
  - Enemies neutralised (either killed or subdued). + 200 points
  - Headshots hit. + 1e3 points or 1000 points. All values here above
    999 must be in scientific notation, i.e 1e3 for 1000.
  - Successful interrogations. +150 points (Interrogations count as
    successful only if they give you information. It's successfully
    counted if you see the "Heroism" increased message)
  - Number of Markings done. + 30 points per marker.
  - Prisoners rescued/extracted. + 5e3 points per hostage.
  - Tactical Takedowns. + 1e3 points per tactical takedown.
  - Hits taken. -100 points per hit taken.
  - Re-discovered alerts. -500 points per getting re-discovered. This is
    where the enemy is actively searching for you after you get away
    from a full alert and you are found again, different to a full
    alert(which has reflex mode and the exclamation above enemies'
    heads.).
  - Enemy Alerts. -5e3 points. Note: An enemy alert only counts when an
    enemy discovers you (reflex mode/exclamation mark) and begins
    shooting. Enemies going into "Alert mode" and increasing their
    patrols when they find a dead/unconscious body does NOT count as
    enemy alert to the game.
  - Special Objective bonus award 1. +5e3 points. These are the special
    mission objectives such as "do not use the Honeybee ammunition).
    Changing this value also be kind of buggy with said Honeybee mission
    as it can multiply the award value for each missile left.
  - Special Objective bonus award 2. +5e3 points. Same as above.
  - No Traces bonus. +1e5 points.
  - Perfect Stealth, No Kills. +2e4 points.
  - No Retry bonus. +5e3 points.
  - No Kill bonus. +5e3 points
  - No Alert bonus +5e3 points
  - No reflex bonus +1e4 points

Note: Accuracy is counted here, but not sure where the function for it
is.

Rank point definition:

The Rank point definition is stored in two arrays called
e.RANK_THRESHOLD and e.RANK_BASE_SCORE

e.RANK_BASE_SCORE is the base number of points needed to acquire a
rank and e.RANK_THRESHOLD is the upper limit for a particular rank.
(???)

**e.RANK_THRESHOLD={S=13e4,A=1e5,B=6e4,C=3e4,D=1e4,E=0}**

**e.RANK_BASE_SCORE={S=11e4,A=9e4,B=7e4,C=5e4,D=3e4,E=0}**

Exceptions to these are stored in arrays immediately beneath these for
specific missions called e.RANK_BASE_SCORE_\<missioncode\>\[1\] to edit
and override with their own values:

**e.RANK_BASE_SCORE={S=11e4,A=9e4,B=7e4,C=5e4,D=3e4,E=0}**

**e.RANK_BASE_SCORE_10054={S=1e4,A=9e3,B=7e3,C=5e3,D=3e3,E=0}**

GMP awarded:

e.RANK_BASE_GMP is the array used for awarding GMP based on rank:

**e.RANK_BASE_GMP={S=28e3,A=23400,B=2e4,C=18e3,D=13500,E=9999}**

Each mission also guarantees a set amount of GMP, then the Rank GMP is
added onto this. See the array e.MISSION_GUARANTEE_GMP and uses the
format \[\<missioncode\>=\<NumberInScientificNotation\>\]

## References

1.  <https://metalgearmodding.fandom.com/wiki/MissionCodes>

