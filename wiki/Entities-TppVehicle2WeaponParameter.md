---
title: Entities:TppVehicle2WeaponParameter
permalink: /Entities-TppVehicle2WeaponParameter/
---

Entity class <b>TppVehicle2WeaponParameter</b> assigns turret rotation
speed, depression and elevation angles, and misc attack and damage
properties.

## attackId

    DamageParameterTables.TppDamage[attackId]

String that assigns an attack ID from the global TppDamage tables set in
DamageParameterTables.lua.

    <property name="attackId" type="String" container="StaticArray" arraySize="1">
          <value>ATK_Tankgun_30mmAutoCannon</value>
    </property>

Assigns TppDamage.ATK_Tankgun_30mmAutoCannon.


## equipId

    TppEquip[equipId]

String that assigns a TppEquip ammo table. This property value is left
blank on autocannons and tank cannons, and presumably must be assigned a
valid string value when an ammoFile property is specified; as is the
case with the vehicle MRLS weapon system.

    <property name="equipId" type="String" container="StaticArray" arraySize="1">
      <value>EQP_BL_Tankgun_82mmRocketPoweredProjectile</value>
    </property>




## bulletId

    TppEquip[bulletId]

String that assigns a bullet ID from the global TppEquip tables with the
associated parameters set in EquipParameters.lua. Assigned table sets
parameters such as ricochet size, bullet type, equipment type, and blast
table
(EquipParameterTables.TppEquip.ReloadEquipParameterTables.BlastParameter\[BLA_\*\]).

e.g.

    <property name="bulletId" type="String" container="StaticArray" arraySize="1">
      <value>BL_Tankgun_30mmAutoCannon</value>
    </property>

Assigns
EquipParameters.TppEquip.ReloadEquipParameterTables2.bullet\[18\].

    {
        TppEquip.BL_Tankgun_30mmAutoCannon,
        625,
        625,
        12,
        30,
        29,
        7,
        2,
        TppEquip.RICOCHET_SIZE_LARGE,
        TppEquip.BULLET_TYPE_BLAST,
        TppEquip.BLA_Wav1,
        1,
        TppEquip.EQP_TYPE_None
    }




## weaponImplTypeIndex

Unknown usage. However a list of known values are:

    ATK_Tankgun_20mmAutoCannon: 1
    ATK_Tankgun_30mmAutoCannon: 1
    ATK_Tankgun_105mmRifledBoreGun: 2
    ATK_Tankgun_120mmSmoothBoreGun: 2
    ATK_Tankgun_125mmSmoothBoreGun: 2
    ATK_Tankgun_82mmRocketPoweredProjectile: 3
    ATK_Tankgun_12_7mmHeavyMachineGun_East: 4
    ATK_Tankgun_12_7mmHeavyMachineGun_West: 4




## fireInterval

Property sets fire rate in a decimal representation of 60 seconds / RPM.

    n = rounds per minute (RPM)

    60/n == fireInterval
    60/fireInterval == n

    <property name="fireInterval" type="float" container="StaticArray" arraySize="1">
      <value>0.333333</value>
    </property>

A value of 0.333333 sets the fire rate to 180 RPM.


## weaponFile

File pointer assigning a weapon .parts file. This is only used for
vehicle machine guns.

    <property name="weaponFile" type="FilePtr" container="StaticArray" arraySize="1">
      <value>/Assets/tpp/parts/weapon/hew/hw01_main0_def_wav0.parts</value>
    </property>




## ammoFile

File pointer assigning an ammo .parts file. This is only used for the
vehicle MRLS weapon.

    <property name="ammoFile" type="FilePtr" container="StaticArray" arraySize="1">
      <value>/Assets/tpp/parts/mecha/sav/sav0_ammo0_def.parts</value>
    </property>




## ownerCnpName & model bones

Sets the owner connection point and bone names, if applicable.

    <property name="ownerCnpName" type="String" container="StaticArray" arraySize="1">
      <value>CNP_awp_a</value>
    </property>
    <property name="weaponBoneName" type="String" container="StaticArray" arraySize="1">
      <value></value>
    </property>
    <property name="turretBoneName" type="String" container="StaticArray" arraySize="1">
      <value>SKL_010_KYUPOL1</value>
    </property>
    <property name="barrelBoneName" type="String" container="StaticArray" arraySize="1">
      <value>SKL_010_GUN</value>
    </property>




## minPitch & maxPitch

Both properties assign a max depression and elevation angle to a turret.
The values are decimal representations of the max degree of vertical
movement a turret can move in either direction. minPitch must be set to
a negative value to allow downward movement below base orientation and
maxPitch must be positive for the inverse.

    minPitch == (n*-1)/100
    maxPitch == (n+90)/100



    <property name="minPitch" type="float" container="StaticArray" arraySize="1">
      <value>-0.20944</value>
    </property>
    <property name="maxPitch" type="float" container="StaticArray" arraySize="1">
      <value>1.745329</value>
    </property>

The values here allow for 85 degrees of upward movement and 21 degrees
of downward movement.


## rotSpeed

    <property name="rotSpeed" type="float" container="StaticArray" arraySize="1">
      <value>0.785398</value>
    </property>

Sets the rotation speed of the turret in a decimal representation of the
max degrees of movement per second.

    n/100 == rotSpeed
    rotSpeed*100 == n

[Category:Entities](/Category:Entities "wikilink")