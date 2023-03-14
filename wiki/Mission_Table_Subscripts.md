---
title: Mission Table Subscripts
permalink: /Mission_Table_Subscripts/
---

## TppSimpleMissionData

TppSimpleMissionData is a class of DataSet entity that defines paths to
the Mission Table subscripts.

``` xml
<entity class="TppSimpleMissionData" classVersion="1" addr="0x053506A0" unknown1="136" unknown2="1989016">
  <staticProperties>
    <property name="name" type="String" container="StaticArray" arraySize="1">
      <value>mission_data</value>
    </property>
    <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
      <value>0x04D8FF20</value>
    </property>
    <property name="script" type="FilePtr" container="StaticArray" arraySize="1">
      <value>/Assets/tpp/script/mission/mission_main.lua</value>
    </property>
    <property name="subScripts" type="FilePtr" container="StringMap" arraySize="7">
      <value key="sequence">/Assets/tpp/level/mission2/ih/example/example_sequence.lua</value>
      <value key="enemy">/Assets/tpp/level/mission2/ih/example/example_enemy.lua</value>
      <value key="radio">/Assets/tpp/level/mission2/ih/example/example_radio.lua</value>
      <value key="demo">/Assets/tpp/level/mission2/ih/example/example_demo.lua</value>
      <value key="telop">/Assets/tpp/level/mission2/ih/example/example_telop.lua</value>
      <value key="sound">/Assets/tpp/level/mission2/ih/example/example_sound.lua</value>
      <value key="score">/Assets/tpp/level/mission2/ih/example/example_score.lua</value>
    </property>
  </staticProperties>
  <dynamicProperties />
</entity>
```

TppSimpleMissionData entity example with all subscripts used in the
game.

The `sequence` subscript is the only truly integral subscript, and while
there is exclusive functionality behind other subscripts, they are
optional to the mission running at all. The example above lists all
possible subscripts used in vanilla missions.

Along with any defined subscripts, the `mission_main` script must be
packed and loaded with the DataSet as well. Here is a compressed version
of that script:

``` lua
local this = {}
this.OnAllocate = function(subScripts) return TppMain.OnAllocate(subScripts) end
this.OnInitialize = function(subScripts) return TppMain.OnInitialize(subScripts) end
this.OnReload = function(subScripts) return TppMain.OnReload(subScripts) end
this.OnUpdate = function(subScripts) return TppMain.OnUpdate(subScripts) end
this.OnChangeSVars = function(subScripts, varName, key) return TppMain.OnChangeSVars(subScripts, varName, key) end
this.OnMessage = function(subScripts, sender, messageId, arg0, arg1, arg2, arg3) return TppMain.OnMessage(subScripts, sender, messageId, arg0, arg1, arg2, arg3) end
this.OnTerminate = function(subScripts) return TppMain.OnTerminate(subScripts) end
return this
```

mission_main.lua, compressed

## Sequence

### Callbacks

#### OnLoad

The `OnLoad` function has to contain two function calls that define the
sequence tables: the index-name table,
`TppSequence.RegisterSequences()`, and the name-callbacks table,
`TppSequence.RegisterSequenceTable()`.

``` lua
--Sequence names in order. The first listed sequence will be the one we will first boot to.
local sequenceNames = {
    "Seq_Game_MainGame",
    "Seq_Game_Escape"
}
--Define the sequences callback table.
local sequences = {}
--Register a callback table for each sequence in sequenceNames.
sequences.Seq_Game_MainGame={}
sequences.Seq_Game_Escape={
    OnEnter=function(self,sequenceName)
        TppMission.CanMissionClear()
    end,
}
--Tell TppSequence to register these tables.
function this.OnLoad()
    TppSequence.RegisterSequences(sequenceNames)
    TppSequence.RegisterSequenceTable(sequences)
end
```

Example of an `OnLoad` callback that defines the sequence tables.

The example above registers two sequences, although only one, of any
name, is required for the mission to boot. One of them, MainGame, has no
callbacks, but is a valid sequence nonetheless. The other sequence,
Escape, has an OnEnter callback that calls TppMission.CanMissionClear().
The OnEnter callback is called when the game switches to or starts with
that sequence. Calling TppMission.CanMissionClear() will make the game
start asking if you're not within the hot zone, so if you don't have a
hot zone area defined in a .trap file or as a GeoTriggerTrap, the start
of that sequence will clear the mission immediately.

#### ENABLE_DEFAULT_HELI_MISSION_CLEAR

The ENABLE_DEFAULT_HELI_MISSION_CLEAR flag is a boolean that defines
whether the game will clear or abort the mission when the player closes
the door on the support helicopter.

``` lua
this.ENABLE_DEFAULT_HELI_MISSION_CLEAR=true
```

Example use of the flag. When enabled, the mission will end when the
helicopter door is closed.

TBA

## Enemy

The `enemy` subscript defines callbacks related to NPCs, like enemy
soldiers and hostages.

TBA

## Radio

The `radio` subscript defines callbacks related to support radio lines,
like real-time radio, intel radio, optional radio, debriefings and more.

TBA

## Demo

The `demo` subscript defines callbacks related to cutscenes.

TBA

## Sound

The `sound` subscript defines callbacks related to the mission's music,
like certain jingles, including the helicopter's descend track.

TBA

## Telop

The `telop` subscript defines the names appearing mission's opening
credits.

TBA

## Score

The `score` subscript defines time limits for certain mission ranks and
the max amount of tactical takedowns that count as bonuses to the score.

TBA