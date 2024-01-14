---
title: Locations
permalink: /Locations/
tags:
  - Locations
  - Reference
published: true
---

A location is part of the system that represents a map/playspace. For a
given location there may be one or more
[Missions](/MissionCodes "wikilink").

See also [Custom Locations List](/Custom_Locations_List "wikilink")

## Quick lookup

More details for each location after the table.

| locationId | locationName | name                              |
| ---------- | ------------ | --------------------------------- |
| 1          | init         |                                   |
| 5          | title        |                                   |
| 10         | afgh         | Afghanistan                       |
| 20         | mafr         | Middle Africa                     |
| 30         | cypr         | Cyprus                            |
| 40         | gntn         |                                   |
| 45         | ombs         | Old Mother Base / MSF Mother Base |
| 50         | mtbs         | Mother Base                       |
| 55         | mbqf         | Mother Base Quarantine Facility   |
| 60         | hlsp         | helispace                         |
| 70         | flyk         | Kingdom of the flies              |
| 91         | sand_afgh   | sandbox                           |
| 92         | sand_mafr   | sandbox                           |
| 95         | sand_mtbs   | sandbox                           |
| mgo        |              |                                   |
| 101-105    |              | mgo release maps                  |
| 111-115    |              | mgo dlc maps                      |
| 150        |              | mgo sandbox                       |
| 200        | store        | store_in_freeplay               |
| ssd        |              |                                   |
| 15-95      | TODO         | Are in between tpp location ids   |

## Afghanistan/afgh

![Afghanistan. Location id 10. White areas are auto fulton traps (leaving them triggers fulton of NPCs within 5m of player). Numbers are LRRP indices.](/assets/afgh_cp_ob_fltn_lrrpNum.png){:.thumb .right}

Afghanistan uses the standard **StageBlockControllerData**-class entity
block streaming system.

TBA

### <u>Large Blocks/Command Posts (cp)</u>

Mountain Relay Base - bridge

OKB Zero - citadel

Sakhra Ee Village (Qarya Sakhra Ee) - cliffTown

Eastern Communications Post - commFacility

Wakh Sind Barracks - enemyBase

Shago Village (Da Shago Kallai) - field

Smasei Fort (Da Smasei Laman) - fort

Serak Power Plant - powerPlant

Lamar Khaate Palace - remnants

Spugmay Keep - ruins

Ghwandai Town (Da Ghwandai Khar) - slopedTown

Afghanistan Central Base Camp - sovietBase

Yakho Oboo Supply Outpost - tent

Wialo Village (Da Wialo Kallai) - village

Aabe Shifap Ruins - waterway

### <u>Guard Posts/Observation Posts (ob)</u>

citadelSouth (1)

sovietSouth (2)

plantWest (3)

waterwayEast (4)

tentNorth (5)

enemyNorth (6)

cliffWest (7)

tentEast (8)

enemyEast (9)

cliffEast (10)

slopedWest (11)

remnantsNorth (12)

cliffSouth (13)

fortWest (14)

villageWest (15)

slopedEast (16)

fortSouth (17)

villageNorth (18)

commWest (19)

bridgeWest (20)

bridgeNorth (21)

fieldWest (22)

villageEast (23)

ruinsNorth (24)

fieldEast (25)

plantSouth (removed)

## Middle Africa/mafr

![Middle Africa. Location id 20. White areas are auto fulton traps (leaving them triggers fulton of NPCs within 5m of player). Numbers are LRRP indices.](/assets/mafr_cp_ob_fltn_lrrpNum.png){:.thumb .right}

Central Africa uses the standard **StageBlockControllerData**-class
entity block streaming system.

TBA

### <u>Large Blocks/Command Posts (cp)</u>

banana

chicoVil (removed)

diamond

factory

flowStation

hill

lab

outland

pfCamp

savannah

swamp

### <u>Guard Posts/Observation Posts (ob)</u>

swampWest (1)

diamondNorth (2)

bananaEast (3)

bananaSouth (4)

savannahNorth (5)

outlandNorth (6)

diamondWest (7)

labWest (8)

savannahWest (9)

swampEast (10)

outlandEast (11)

swampSouth (12)

diamondSouth (13)

pfCampNorth (14)

savannahEast (15)

hillNorth (16)

factoryWest (17)

pfCampEast (18)

hillWest (19)

factorySouth (20)

hillWestNear (21)

chicoVilWest (22)

hillSouth (23)

swampWestNear (removed)

## Cyprus/cypr

Cyprus uses a unique **CyprusBlockControllerData**-class entity for its
block streaming system.

TBA

locationId - 30

## Guantanamo/gntn

The U.S. Naval Prison Facility uses the standard
**StageBlockControllerData**-class entity block streaming system,
however unlike TPP's maps, it does not utilize small blocks at all.

TBA

locationid - 40

## Old Mother Base/ombs

Old Mother Base uses the standard **StageBlockControllerData**-class
entity block streaming system, however unlike TPP's maps, it does not
utilize small blocks at all.

TBA

locationId - 45

## Mother Base/mtbs

Mother Base uses a unique
**TppMotherBaseStageBlockControllerData**-class entity for its dynamic
platform placement.

TBA

locationId - 50

## Mother Base Quarantine Facility/mbqf

The Mother Base Quarantine Facility interior, unlike the main Mother
Base map, instead utilizes the standard
**StageBlockControllerData**-class entity block streaming system,
however it uses only a 2x2 grid of small blocks aside from the common
block, which only seem to contain [Nav2](/Nav2 "wikilink") navmeshes.

TBA

locationId - 55

## Helispace/hlsp

Assets do not exist. All that exists is some orphaned mentions in a few
scripts.

TBA

locationId - 60

## Kingdom of the Flies/flyk

Assets do not exist. All that exists is some orphaned mentions in a few
scripts and some environmental models in Metal Gear Survive.

TBA

locationId - 70
