---
title: Messages
permalink: /Messages/
tags: [Lua, Reference]
---

Message systems are a somewhat common design pattern.

In TPP messages are sent from the engine to the lua vm to communicate
events or other information.

There is no direct equivalent from lua to engine, instead direct engine
module function calls are used or game object
[commands](/Commands "wikilink").

For the TPP Lua modules subscribe to whatever message it's interested
with a function to be called.

```lua
function this.Messages()
    return Tpp.StrCode32Table{
        [message Class]={
            {msg='msgName', func=this.functionName(params)}
        }
    }
}
```

The messages pass through TppMain.OnMessage which dispatches to the
subscribed modules.

A breakdown of some messages by message class with parameter information
can be found in the Infinite Heavens [InfLookup.lua](https://github.com/kapuragu/InfiniteHeaven/blob/6d81d985b27f23187b04e86976120f0473c2e4d9/tpp/gamedir-ih/GameDir/mod/modules/InfLookup.lua#L1642)

#### Semi-Organized Notes About Events

Sender → MessageID → Arguments

  - **GameObject**
      - **VehicleTrouble**
          - *Description*
              - called when two tires on a vehicle (including 6-wheel
                trucks) are shot out, no other unknown event is raised
                when all tires are shot out
              - presumably, denotes reduced handling
          - *Args*
              - arg0: gameId -- the affected vehicle
              - arg1: unknown -- example value: `CanNotMove`
  - **Radio**
      - **3116057018**
          - *Description*
              - called when using the Inf-Scope to view a target with
                radio information set, which changes the information
                you'll receive when you use the Intel radio
          - *Args*
              - arg0: gameId -- the object to receive radio information
                about
              - arg1: conversation type -- unknown enum?
                  - **3:** heavy machine gun (stationary turret)
                  - **4:** mortar
                  - **6:** communications equipment (blue radios)
                  - **8:** power generator (GZ)
                  - **9:** comms equipment
                  - **11:** searchlight
                  - **18:** dumpster
                  - **19:** metal drum (explosive)
                  - **20:** portable toilet
                  - **27:** military four-wheel drive
                  - **31:** walker gear
                  - **44:** raven (bird)
                  - **54:** Nubian Goat
                  - **65:** Soviet soldier
  - **Block**
      - TBD
  - **Player**
      - **2990447840**
          - *Description*
              - called twice when opening the iDROID in the ACC, once
                with the arg0=0 and a second time shortly after with
                arg0=1
              - while in the field, only called one time always with
                arg0=0 -- after menu fully closes
          - *Args*
              - arg0: number
      - **2307345963**
          - *Description*
              - called twice when opening the iDROID in the ACC, once
                with the arg0=1 and a second time shortly after with
                arg0=0
              - while in the field, only called one time always with
                arg0=0 -- after menu fully closes
          - *Args*
              - arg0: number
      - **316563185**
          - *Description*
              - occurs when the <Call Radio> button is held and the menu
                opens
          - *Args*
              - arg0: number -- seemingly always 0
      - **4213428578**
          - *Description*
              - occurs when the <Call Radio> button is released and the
                menu closes
          - *Args*
              - arg0: number -- seemingly always 0
      - **2533923076**
          - *Description*
              - occurs when a wolf-type animal begins a lunge at the
                player
          - *Args*
              - arg0: number -- seemingly always 0
              - arg1: gameId -- the gameId of the instigating animal
      - **2526961808**
          - *Description*
              - occurs every game tick while being lunged at by an
                animal, beginning with Message **2533923076**, concludes
                with a **DogBiteConnect** Message or ???
          - *Args*
              - arg0: number -- seemingly always 0

## Sources

<https://github.com/unknown321/mgsvdump/blob/master/tpp/sequences/messages_for_sequences.lua>

<https://github.com/kapuragu/InfiniteHeaven/blob/6d81d985b27f23187b04e86976120f0473c2e4d9/tpp/gamedir-ih/GameDir/mod/modules/InfLookup.lua#L1642>
