---
title: Entities - PhxVehicleNormalEngine
permalink: /Entities-PhxVehicleNormalEngine/
tags: [Entities, Reference]
---

    <entity class="PhxVehicleNormalEngine" classVersion="1" addr="0x031784A0" unknown1="120" unknown2="212215">
      <staticProperties>
        <property name="name" type="String" container="StaticArray" arraySize="1">
          <value>PhxVehicleNormalEngine0000</value>
        </property>
        <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
          <value>0x03177B70</value>
        </property>
        <property name="vehicleAxes" type="EntityLink" container="DynamicArray" arraySize="2">
          <value packagePath="" archivePath="/Assets/tpp/parts/mecha/slv/slv.veh" nameInArchive="PhxVehicleAxis0000">0x03177BE0</value>
          <value packagePath="" archivePath="/Assets/tpp/parts/mecha/slv/slv.veh" nameInArchive="PhxVehicleAxis0001">0x03178270</value>
        </property>
        <property name="torqueDistributions" type="float" container="DynamicArray" />
        <property name="gearRatios" type="float" container="DynamicArray" />
        <property name="vehicleNormalEngineParam" type="EntityPtr" container="StaticArray" arraySize="1">
          <value>0x03178510</value>
        </property>
      </staticProperties>
      <dynamicProperties />
    </entity>

## vehicleAxes

Sets the address of individual axis entities in the file. These are
numbered in sequential order from front to back, meaning that on the 4WD
vehicles PhxVehicleAxis0000 is the front axle and PhxVehicleAxis0001 is
the rear axle.


## torqueDistributions

This is unused in all vehicle .fpkd archive .veh files, but values can
still be edited in. This property sets the amount of power being sent to
each axle. The arraySize should be set to the number of PhxVehicleAxis
properties in the .veh file and final sum of distribution values should
be equal to 1 (100%). Values set the power given in decimal percentages.
Like with the PhxVehicleAxis numbering, these are in sequential order
from front to back.

e.g. For 30% of power being given to the front axle and 70% to the rear
axle on a 4WD vehicle:

    <property name="torqueDistributions" type="float" container="DynamicArray" arraySize="2">
      <value>0.3</value>
      <value>0.7</value>
    </property>

## gearRatios

This is another unused property found in all vehicle .fpkd archive .veh
files. Values here can also be edited in. It sets the gear ratio of each
vehicle gear. The number of gears a vehicle has can be determined by
listening to the number of upshifts a vehicle makes in game from a
complete stop to full throttle top speed. The gist of what gear ratios
in the real world do is that higher gear ratios give faster acceleration
at the cost of lower top speed while in that gear, and lower amounts are
the inverse (hence why your vehicle may go from 0-30 in a few seconds
but 70-85 takes much longer).

Standard gear ratios are n:1 but the property simply takes n for the
value. For a 4WD vehicle, which has three gears, with sequential gear
ratios of 2.5:1, 1.5:1, and 0.7:1 you would do:

    <property name="gearRatios" type="float" container="DynamicArray" arraySize="3">
      <value>2.5</value>
      <value>1.5</value>
      <value>0.7</value>
    </property>