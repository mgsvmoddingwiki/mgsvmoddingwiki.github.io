---
title: CQC Damage Tables
permalink: /CQC_Damage_Tables/
tags: [Weapons, Lua, Reference]
---

Recommended reading.

To get a good overview of each of the values for editing the
hand-to-hand and CQC damage values I recommend having a look at the
following spreadsheet of the damage value parameters.

<https://docs.google.com/spreadsheets/d/1VVcthy86QGg3M7IeFWx1ou-c7x1iKb1Qa_sX7VW8Bq0/edit#gid=0>

Also, Muffins' has created his own notes about what each value of the
damage array does. The following comes from his 4PR mod and I highly
recommend reading through that mod as it's mostly intended to be
self-documenting:

```lua
    this.DamageParameter={

    -- I'm trying to make sense of this mess. For now I gave up so yeah.

    -- {TppDamage.ATK_10001, -- D114/M1911 ATTACK

    -- 750,-- Displays Lethal Damage UI

    -- 500, -- ???

    -- 40,-- ???

    -- 0,-- ???

    -- 0,-- ???

    -- 300,-- ???

    -- 90,-- ???

    -- TppDamage.INJ_TYPE_BULLET,

    -- TppDamage.INJ_PART_ALL,

    -- 15,-- ???

    -- 2,-- ???

    -- 1,-- Projectile Hitting NPCs Boolean

    -- 0,

    -- 0,-- Vortex Ring Boolean?

    -- 0,-- Tranquilizer Boolean, Requires Non-Lethal Damage Value

    -- 0,-- Stun Damage Boolean, Requires Non-Lethal Damage Value

    -- 0,

    -- 0,

    -- 0,

    -- 0, -- Fire Boolean

    -- 0,

    -- 0,-- Gas Boolean?

    -- 0,

    -- 0,

    -- 0,-- Electric Boolean?

    -- 0,

    -- 0,

    -- TppDamage.DAM_SOURCE_Handgun,

    -- 400,-- Lethal Damage Value

    -- 0,-- Non-Lethal Damage Value

    -- 300},-- Impact Force
```

For the CQC in particular, we're most interested in the last 3rd-to-last
and 2nd-to-last values so we can make various throws, punches, kicks,
etc lethal or non-lethal.

As Muffins notes, the damage table has to have the Stun damage boolean
flipped to 1 so the NL damage will be applied.

## **Damage lethality:**

Enemies have roughly between 2500 and 3000 health by default. In terms
of outright killing an enemy and putting them into an 'injured' state
where they roll on the ground in agony before dying, the difference is
about 500 points of damage or so.

In layman's terms:

**Injured state:** 2000 points of damage.

**Kill:** 3000-4000 points of damage.



## CQC notes for DamageParametersTables.lua:

or what damage table gets applied when I throw or punch someone



##### Punches:

These are damage modifiers and I believe they don't stack when comboing
per se. i.e if atk_punch1 is set as a one hit kill, doing a atk_punch2
that's set as a non-lethal attack will knock out the target and totally
bypass atk_punch1's damage values.

**atk_punch:** Part of the front-facing 5 punch combo

**atk_punch1:** Your standard single button melee punch.

**atk_punch2:** Used as part of the "back facing 3 punch combo"
cinematic combo and the 2 or 3 punch/kick combo where you stop and don't
finish the full combo.

**Kick:** Standing kick.

**KickDown:** Kick when an enemy is down. A small amount of damage is
applied, so the target wakes up, but the majority of damage is stun.



### CQCHit types:

**CQCHit:** "counter attack" hit when the player activates the cinematic
combo to stop an enemy hitting them with the butt of their gun.

**CQCHitFinish:** Used as part of the back facing 3 punch combo and the
front facing 5 punch combo.

**CQCFinish:** Used as part of the front facing 5 punch combo.



### Throws:

**CQCThrow:** Standard standing throw from the front, as well as the
knife disarm cinematic throw when the enemy attempts to slash the
player.

**CQCHoldThrow:** Throw when you have an NPC grappled.

**CqcThrowBehind:** Standard standing throw from behind.

**CqcThrowLadder:** Throwing someone off a ladder using the 'grab'
prompt.

**CqcContinuous2nd:** Damage applied to the 2nd person in a CQC chain
throw.

**CqcContinousOver3Times:** Damage applied to the 3rd and 4th person
(and so on) in a CQC chain throw.

__FORCETOC__

