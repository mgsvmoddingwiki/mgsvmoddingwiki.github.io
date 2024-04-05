---
title: Hellbound Debug Functions
permalink: /AI/mgs/mgs_hellbound_Debug_Functions/
tags: [AI, Metal Gear]
---

# Hellbound AI Debug Functions

There is some debug functions that devs left inside the episode 12 enemy script:<br>
```lua
DEBUG.SetDebugMenuValue("Sahelan2", "ToStopActionRestLifeVal",	100 )			
DEBUG.SetDebugMenuValue("Sahelan2", "StompAttackSize",	100 )		
DEBUG.SetDebugMenuValue("Sahelan2", "AttackShortRange",  25 )	
DEBUG.SetDebugMenuValue("Sahelan2", "LostAlertTime", 20)			
DEBUG.SetDebugMenuValue("Sahelan2", "LostPlayerTime", 40 )		
DEBUG.SetDebugMenuValue("Sahelan2", "GoToHeliDistanceMin", 120 )		
DEBUG.SetDebugMenuValue("Sahelan2", "CloseToTargetLength", 55 )	
DEBUG.SetDebugMenuValue("Sahelan2", "LengthForPeepAction", 30 )	
DEBUG.SetDebugMenuValue("Sahelan2", "RouteEvToPlayerLength", 40 )		
DEBUG.SetDebugMenuValue("Sahelan2", "ReflexTimeOnAlert", 600)			
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "BodyDiscoveryDist", 35)		
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "BodyDiscoveryVAngle", 90)	
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "BodyDiscoveryHAngle", 60)	
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "BodyNormalDist", 75)			
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "BodyNormalVAngle", 90)		
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "BodyNormalHAngle", 50)		
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "BodyFarDist", 150)			
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "BodyFarVAngle", 60)			
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "BodyFarHAngle", 50)			
DEBUG.SetDebugMenuValue("Sahelan2 Sight", "NormalToFarSpeed", 30)		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VsHeliMissileSpdRate", 150 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VsHeliSrchMissInterval", 75 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VsHeliSrchMissWaitingTime", 85 )	
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VsHeliLastAttackTime", 400 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunFireMaxTime", 6 )			
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunFireLostTime", 3 )			
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunFireRange", 100 )			
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunFireNumOfOneShot", 5 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunOneShotInterval", 45 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunFireNumOfOneUnit", 3 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunOneUnitInterval", 150 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunOneSetInterval", 300 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunWobbingRate2", 3 )			
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "VulcunImpactRange", 45 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "PileAtkStartWaitTime", 80 )		
DEBUG.SetDebugMenuValue("Sahelan2 Weapon", "PileAtkEndWaitTime", 150 )
```