---
title: Metal Gear Sahelanthropus
permalink: /AI/mgs/
tags: [AI, Metal Gear]
---

## General Information

![Sahelanthropus art from "The Art of Metal Gear Solid V" (page 110)](/assets/AI/images/mgs/sally art.png){:.thumb .right}

Sahelanthropus, also known as "Sally" is the Metal Gear present on Metal Gear Solid V.<br>

Sahelanthropus contains a vast arsenal, composed by 2 Vulcan guns, multiple guided small missiles, search missiles, a flamethrower, Archaea grenades capable of disabling any vehicle on the nearby area, 2 Archaea blades with different functions, a pile bunker used for precise melee attacks, a Railgun capable of firing nuclear shells and for last, an armor composed of depleted uranium that can be enriched with parasites during self destruction for an powerful nuclear explosion.<br><br>
Each attack varies with the AI being used on it, for example, using hellbound AI, search missiles will act as an independent drone looking for the player and warning Sahelanthropus if they detect the player but on Dominion AI, search missiles will act as guided missiles, unlike small guided missiles they don't follow the player movement, they only fly towards the player location on the moment they lift off.<br><br>

In the game, the guns that Sahelanthropus can use is controled by AI and Battle sequence, for example, the Railgun, Archaea blades and Archaea grenades are not used by Hellbound AI and the weapons that Dominion AI can use is controled by battle sequences<br><br>

There is also an shield that is disabled by default, this shield was meant to be used on "Kingdom of the Flies" but since we never got that, we never got a working shield.<br>The shield is present on Sahelanthropus Main and Static models, there is also colision files for it but the mesh and colision are disabled by the .exe, unlike the Railgun and the Railgun Loader that are disabled only on Hellbound AI, the shield is fully disabled all the time.<br>
![Sahelanthropus with the shield mesh visible](/assets/AI/images/mgs/shln_shield example.png){:.thumb}

Sahelanthropus does have colision with the player, animals, soldiers and vehicles but can only deal damage to animals, vehicles and the player, and no, Sahelanthropus isn't coded to attack anything else besides the player and Huey(?) on Hellbound episode.<br>Funnily enough, if you use soldiers as a human shield while it attacks you with the vulcan guns, it will damage the soldiers and they will fall to the ground heavily wounded but no blood will be present.

{% include youtube id="Dz0OX3ymO1Y" %}


{% include spoiler-start title="More Information" %}

- Model Location
    - Main: `/Assets/tpp/mecha/mgs/Scenes/mgs0_main0_def.fmdl`
    - Static: `/Assets/tpp/mecha/mgs/Scenes/mgs0_main0_obj.fmdl`
    - Demos (?): `/Assets/tpp/mecha/mgs/Scenes/mgs0_main0_snd.fmdl`
- Common Pack
	- Pack Name: `MISSION_COMMON_PACK.SAHELAN`
	- Location: `/Assets/tpp/pack/mission2/common/mis_com_sahelan.fpk`
- Sound Package
	- `/Assets/tpp/sound/se_e_mgs.sdf`
- Linked Entities
	- `TppMantis2`
	- `TppSearchMissilePointData`
	- `TppHidePointData`
- Game Object Locator Data
	- Flags: `7`
    - TypeName: `TppSahelan2`
    - Parameters: `TppSahelan2LocatorParameter`
- GameObject File
	- Hellbound AI: `/Assets/tpp/level_asset/chara/mecha/sahelan_afgn_1st.fox2`
	- Dominion AI: `/Assets/tpp/level_asset/chara/mecha/sahelan_afgn.fox2`
- GameObject Data
	- typeName: `TppSahelan2`
	- parameters: `TppSahelan2Parameter`
- connectPointFile
	- Main: `/Assets/tpp/mecha/mgs/Scenes/mgs0_main0_def.fcnp`
- gameRigFile
	- Main: `/Assets/tpp/rig/frig/tpp_sahelan_all.frig`
- helpBoneFile
	- Main: `/Assets/tpp/mecha/mgs/Scenes/mgs0_main0_def.frdv`
- GeomSkeleton
	- Main: `/Assets/tpp/mecha/mgs/Scenes/mgs0_main0_def.gskl`
- FoxTargetDescription (Hitboxes)
	- Main (Target): `/Assets/tpp/parts/mecha/mgs/SahelanTargetDefense.tgt`
	- Damaged Main (TargetEx): `/Assets/tpp/parts/mecha/mgs/SahelanTargetDefenseEx.tgt`
	- Damaged Shield (TargetExShield): `/Assets/tpp/parts/mecha/mgs/SahelanTargetDefenseExShield.tgt`
	- Left Front Parasites/propane? tank (TargetPTLF): `/Assets/tpp/parts/mecha/mgs/SahelanTargetDefensePTLF.tgt`
	- Right Front Parasites/propane? tank (TargetPTRF): `/Assets/tpp/parts/mecha/mgs/SahelanTargetDefensePTRF.tgt`
	- Left Back Parasites/propane? tank (TargetPTLB): `/Assets/tpp/parts/mecha/mgs/SahelanTargetDefensePTLB.tgt`
	- Right Back Parasites/propane? tank (TargetPTRB): `/Assets/tpp/parts/mecha/mgs/SahelanTargetDefensePTRB.tgt`
- Motion Graph File
	- Hellbound AI: `/Assets/tpp/motion/motion_graph/sahelan2/TppSahelan2for1st_layers.mog`
	- Dominion AI: `/Assets/tpp/motion/motion_graph/sahelan2/TppSahelan2_layers.mog`
- Motion Archive File
	- Hellbound AI: `/Assets/tpp/motion/mtar/sahelan2/TppSahelan2for1st_layers.mtar`
	- Dominion AI: `/Assets/tpp/motion/mtar/sahelan2/TppSahelan2_layers.mtar`
- Hellbound AI Effects
	- SwordStick: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsatk02_s5.vfx`
	- SwordSwing: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsatk01_s5.vfx`
	- BlastMissile: `/Assets/tpp/effect/vfx_data/weapon/fx_tpp_wepexprpg01_s2LG.vfx`
	- DamageSmoke: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsdmgsmk01_s5.vfx`
	- BrokenSmoke: `/Assets/tpp/effect/vfx_data/smoke/fx_tpp_smkmchbrk02_m2LG.vfx`
	- BreakExplosion: `/Assets/tpp/effect/vfx_data/explosion/fx_tpp_expmch02_m1LG.vfx`
	- FireFlame: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchatkfir01_m2.vfx`
	- SwordPreEffect: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsatk03_s5.vfx`
	- MissileMuzzle: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsmslmzf01_s1.vfx`
	- TestRailGunReady: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgmstncrg01_s3.vfx`
	- MantisEffect: `/Assets/tpp/effect/vfx_data/chara/fx_tpp_chamntsmk01_s0LD.vfx`
	- SwordSwingNew: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsatk01c_s5.vfx`
	- RailGunFire: `/Assets/tpp/effect/vfx_data/weapon/fx_tpp_wepbltrgn01_m1.vfx`
	- Search: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrc01_m5.vfx`
	- DeadExplosion: `/Assets/tpp/effect/vfx_data/explosion/fx_tpp_expmch03_m2.vfx`
	- PileBunkerStick: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsatk01s_s5.vfx`
	- DeadFloorSmoke: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsfotsmk03b_m2.vfx`
	- BlastSearchMissile: `/Assets/tpp/effect/vfx_data/explosion/fx_tpp_expgrnd01_s2LG.vfx`
- Dominion AI Effects
	- SwordStick: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsatk02_s5.vfx`
	- SwordSwing: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsatk01_s5.vfx`
	- BlastMissile: `/Assets/tpp/effect/vfx_data/weapon/fx_tpp_wepexprpg01_s2LG.vfx`
	- DamageSmoke: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsdmgsmk01_s5.vfx`
	- BrokenSmoke: `/Assets/tpp/effect/vfx_data/smoke/fx_tpp_smkmchbrk02_m2LG.vfx`
	- BreakExplosion: `/Assets/tpp/effect/vfx_data/explosion/fx_tpp_expmch02_m1LG.vfx`
	- FireFlame: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchatkfir01_m2.vfx`
	- SwordPreEffect: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsatk03_s5.vfx`
	- MissileMuzzle: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsmslmzf01_s1.vfx`
	- TestRailGunReady: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgmstncrg01_s3.vfx`
	- MantisEffect: `/Assets/tpp/effect/vfx_data/chara/fx_tpp_chamntsmk01_s0LD.vfx`
	- RailGunFire: `/Assets/tpp/effect/vfx_data/weapon/fx_tpp_wepbltrgn01_m1.vfx`
	- SwordSwingNew: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsatk01c_s5.vfx`
	- Search: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgssrc01_m5.vfx`
	- ActiveBlade: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgswep03_m2.vfx`
	- BladeHit: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgswep06_m2.vfx`
	- GroundFire: `/Assets/tpp/effect/vfx_data/fire/fx_tpp_firvol04b_s1.vfx`
	- DeadExplosion: `/Assets/tpp/effect/vfx_data/explosion/fx_tpp_expmch03_m2.vfx`
	- MantisEffectSlow: `/Assets/tpp/effect/vfx_data/chara/fx_tpp_chrmntrip02_s5.vfx`
	- MushiarashiSmoke: `/Assets/tpp/effect/vfx_data/dust/fx_tpp_dstsndstmviw01s_m1.vfx`
- General Effects
	- fx_tpp_expmch01_m1LG: `/Assets/tpp/effect/vfx_data/explosion/fx_tpp_expmch01_m1LG.vfx`
	- fx_tpp_expgrnd01_s2LG: `/Assets/tpp/effect/vfx_data/explosion/fx_tpp_expgrnd01_s2LG.vfx`
	- MgsFootSmokeS: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsfotsmk01_s5.vfx`
	- MgsFootSmokeM: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsfotsmk02_m1.vfx`
	- MgsJumpSmokeM: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsfotsmk03_m2.vfx`
	- MgsJumpSmokeS: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsfotsmk04_m1.vfx`
	- Seeker: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgslgtldm01_m1.vfx`
	- BladeLaunchL: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgswep02_m1.vfx`
	- BladeLaunchR: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgswep02_m1.vfx`
	- SparkActive: `/Assets/tpp/effect/vfx_data/weapon/fx_tpp_wepltb04_s0.vfx`
	- BreakBody: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakBP: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakHead: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakArmR: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakArmL: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakThighR: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakThighL: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakLegR: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakLegL: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakRGun: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakLdr: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- BreakTnk: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsbrk01_s5.vfx`
	- HeartLight: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgslgtwst01_s6.vfx`
	- PositionLightRed: `/Assets/tpp/effect/vfx_data/flare/fx_tpp_flrcom00_s0LG.vfx`
	- PositionLightBlue: `/Assets/tpp/effect/vfx_data/flare/fx_tpp_flrcom00_s0LG.vfx`
	- MuzzleLamp: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgslgtmzf01_s0.vfx`
	- EyeLamp: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgslgthed01_s2.vfx`
	- EyeLampSide: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgslgthed01_s2.vfx`
	- EyeFlare: `/Assets/tpp/effect/vfx_data/flare/fx_tpp_flrlgt20evs_m1LD.vfx`
	- MuzzleFlashR: `/Assets/tpp/effect/vfx_data/muzzle/fx_tpp_mzfhli_s0FG.vfx`
	- MuzzleFlashL: `/Assets/tpp/effect/vfx_data/muzzle/fx_tpp_mzfhli_s0FG.vfx`
	- MgsStomp: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsfotsmk09_m1.vfx`
	- RailCharge: `/Assets/tpp/effect/vfx_data/weapon/fx_tpp_wepltbrgn01_m1.vfx`
	- DamageSmokeHead: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsdmgsmk01_s5.vfx`
	- HeartLightWeak: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgslgtwst01_s6.vfx`
	- BladeLaunchFinishR: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgswep02_m1.vfx`
	- BladeLaunchFinishL: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgswep02_m1.vfx`
	- FinishCharge: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgslgtldm02_m1.vfx`
	- DamageWeak: `/Assets/tpp/effect/vfx_data/mecha/fx_tpp_mchmgsdmgspk01_s5.vfx`
- Geom Colision tag
	- `GEO_COL_A_MISSILE2`
- Attack IDs
	- `ATK_Sahelan_FootStamp`
	- `ATK_Sahelan_RodAttack`
	- `ATK_Sahelan_RodAttackImpact`
	- `ATK_Sahelan_JumpImpact`
	- `ATK_Sahelan_HeadVulcan`
	- `ATK_Sahelan_ParasiteSword`
	- `ATK_Sahelan_SmallMissile`
	- `ATK_Sahelan_MidleMissile`
	- `ATK_Sahelan_AirMine`
	- `ATK_Sahelan_Grenade`
	- `ATK_Sahelan_Flame`
	- `ATK_Sahelan_RailGun`
	- `ATK_Sahelan_PileBunker`
	- `ATK_Sahelan_Stomp`
	- `ATK_Sahelan_RockExplosion`
	- `ATK_Sahelan_TowerBreak`
- Parts Strings
	- `SAHELAN2_PARTS_BODY`
	- `SAHELAN2_PARTS_BP`
	- `SAHELAN2_PARTS_HEAD`
	- `SAHELAN2_PARTS_ARMR`
	- `SAHELAN2_PARTS_ARML`
	- `SAHELAN2_PARTS_THIGHR`
	- `SAHELAN2_PARTS_THIGHL`
	- `SAHELAN2_PARTS_LEGR`
	- `SAHELAN2_PARTS_LEGL`
	- `SAHELAN2_PARTS_RGUN`
	- `SAHELAN2_PARTS_LDR`
	- `SAHELAN2_PARTS_TNK`
	- `SAHELAN2_PARTS_SHIELD`
	- `SAHELAN2_PARTS_PT_LF`
	- `SAHELAN2_PARTS_PT_RF`
	- `SAHELAN2_PARTS_PT_LB`
	- `SAHELAN2_PARTS_PT_RB`
- Route events
	- Edge event: `All`
	- Edge event: `Run Walk`
	- Edge event: `Walk Only`
	- Edge event: `Run Only`
	- Edge event: `Jump Only`
	- Edge event: `Jump Walk`
	- Node event: `Stand Search`
	- Node event: `Search Missile`
	- Node event: `Stand Idle`
	- Node event: `On The Hill`
	- Node event: `Pile Bunker`
	- Node event: `4257632892 (Break Steel Tower)`

{% include spoiler-end %}

## Health Points and parts
Sahelanthropus Health Points are managed on the enemy subscript. There is on total 17 parts for Sahelanthropus.<br>
Example of `sahelanLifeTable` from Episode 30:<br>
```lua
Body     = 12000,-- Body
Bp       = 840,  -- ???
Head     = 3000, -- Head
ArmR     = 840,  -- Right Arm
ArmL     = 840,  -- Left Arm
ThighR   = 840,  -- Right Thigh
ThighL   = 840,  -- Left Thigh
LegR     = 840,  -- Right Leg
LegL     = 840,  -- Left Leg
RGun     = 1200, -- RailGun
Ldr      = 840,  -- RailGun Loader
Tnk      = 840,  -- Flame thrower
Shield   = 0,    -- Shield
PTLF     = 96,   -- Left Front Parasite/Propane? Tank
PTRF     = 96,   -- Right Front Parasite/Propane? Tank
PTLB     = 96,   -- Left Back Parasite/Propane? Tank
PTRB     = 96,   -- Right Back Parasite/Propane? Tank
```

{% include spoiler-start title="Parts with pictures" %}

![Body](/assets/AI/images/mgs/shln_hp body.png){:.thumb}
![Bp](/assets/AI/images/mgs/shln_hp bp.png){:.thumb}
![Head](/assets/AI/images/mgs/shln_hp head.png){:.thumb}
![ArmR](/assets/AI/images/mgs/shln_hp rarm.png){:.thumb}
![ArmL](/assets/AI/images/mgs/shln_hp larm.png){:.thumb}
![ThighR](/assets/AI/images/mgs/shln_hp rthigh.png){:.thumb}
![ThighL](/assets/AI/images/mgs/shln_hp lthigh.png){:.thumb}
![LegR](/assets/AI/images/mgs/shln_hp rleg.png){:.thumb}
![LegL](/assets/AI/images/mgs/shln_hp lleg.png){:.thumb}
![RGun](/assets/AI/images/mgs/shln_hp railgun.png){:.thumb}
![Ldr](/assets/AI/images/mgs/shln_hp loader.png){:.thumb}
![Tnk](/assets/AI/images/mgs/shln_hp flamet.png){:.thumb}
![Shield](/assets/AI/images/mgs/shln_hp shield.png){:.thumb}
![PTLF](/assets/AI/images/mgs/shln_hp PTLF.png){:.thumb}
![PTRF](/assets/AI/images/mgs/shln_hp PTRF.png){:.thumb}
![PTLB](/assets/AI/images/mgs/shln_hp PTLB.png){:.thumb}
![PTRB](/assets/AI/images/mgs/shln_hp PTRB.png){:.thumb}

{% include spoiler-end %}

>Shield Value Does not matter since the shield is disabled on the .exe<br>
>Only use integer values for Health Points<br>
>Parts names might be case sensitive
{:.important}

## Stage Types
The Stage type controls what AI is used, if Sahelanthropus is used without an stage type set, it will remain idle, same happens if the user sets an Stage Type that does not exist.<br>
There is 3 types of Stages available to be used:<br><br>
`0` --> HellBound AI -- Used on Episode 12 - HELLBOUND<br>
`1` --> Dominion AI (Normal) -- Used on Episode 31 - SAHELANTHROPUS<br>
`2` --> Dominion AI (Extreme) -- Used on Episode 50 - (EXTREME) SAHELANTHROPUS<br>

> **Note:** Hellbound AI and Dominion AI are names given by me (retali8), they are not official names for the AIs.
> There is an 4th type of AI for Sahelanthropus with index `3`, unfortunately nothing happens when we use it, could have been created for "Kingdom of the Flies".

The stage type can be changed with the next lua code:<br>
```lua
this.SetSahelanType = function()
	local gameObjectId = {type="TppSahelan2", group=0, index=0}
	local command = {id="SetStageType", index = 0, }	
	GameObject.SendCommand(gameObjectId, command)
end
```
The index value Inside the command variable will determine the stage type
>Setting Sahelanthropus to Index `2` will not change its color to black, that is done by the .exe.<br>
>This command must be used on `sequence` subscript.
{:.important}

## Route Events

### Edge Events
**Edge event: `All`**<br>
Used on base routes for Hellbound AI, allows it to run, walk and jump?<br><br>
**Edge event: `Run Walk`**<br>
Used on Caution and Sneak routes for Hellbound AI, allows both walk and run. Its also used on routes for Dominion AI but its unclear what it does since Dominion AI uses navmesh to move around.<br><br>
**Edge event: `Walk Only`**<br>
Can be used on Caution and Sneak routes, allows Sahelanthropus to only walk.<br><br>
**Edge event: `Run Only`**<br>
Only allows Sahelanthropus to run.<br><br> 
**Edge event: `Jump Only`**<br>
Only allows Sahelanthropus to jump to the next node.<br><br>
**Edge event: `Jump Walk`**<br>
Allows Sahelanthropus to either jump to the next node or walk to it.<br><br>

>Sahelanthropus will only run if the player is far away, even if the event is set to `Run Only`<br>
>Hellbound AI cant jump, if you use `Jump only` as an event, it will walk and not jump<br>
>On Dominion AI, routes are only used to Mantis Jump Attacks, Dominion AI uses navmesh to walk, run and jump<br>
{:.important}

### Node Events

**Node event: `Stand Search`**<br>
Triggers an animations where Sahelanthropus searches for the player with an spotlight.

{% include spoiler-start title="Stand Search Example" %}

{% include youtube id="MY68hoGsTog" %}

{% include spoiler-end %}

**Node event: `Search Missile`**<br>
TODO<br><br>
**Node event: `Stand Idle`**<br>
TODO<br><br>
**Node event: `On The Hill`**<br>
Nothing?<br><br>
**Node event: `Pile Bunker`**<br>
Triggers an attack, Sahelanthropus will attack with the pile bunker, it can affect rock gimmicks if its set up properly.

{% include spoiler-start title="Pile Bunker Example" %}

{% include youtube id="Bp7Eyhgqry0" %}

{% include spoiler-end %}

**Node event: `4257632892 (Break Steel Tower)`**<br>
Triggers an attack, Sahelanthropus will attack an antenna if the route node and antenna are set up properly.

{% include spoiler-start title="4257632892 (Break Steel Tower) Example" %}

{% include youtube id="uqhU47nRlUk" %}

{% include spoiler-end %}

## Hellbound Documentation
[Hellbound Debug Functions](/AI/mgs/mgs_hellbound_Debug_Functions)<br>
[Hellbound route assignment](/AI/mgs/mgs_hellroutes)<br>
[Hellbound Search Missiles](/AI/mgs/mgs_hellsearchmissiles)<br>
[Hellbound Heli attack sequence](/AI/mgs/mgs_Hellheli)<br>

## Dominion Documentation
[Navmesh Params and Flags](/AI/mgs/mgs_nav2_params)<br>
[sahelan Navworld](/AI/mgs/mgs_NavWorld)<br>
[Dominion route assignment](/AI/mgs/mgs_DomRoutes)<br>
[Dominion REX mode](/AI/mgs/mgs_rexmode)<br>
