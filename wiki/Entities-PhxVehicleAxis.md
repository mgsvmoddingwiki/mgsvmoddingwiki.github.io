---
title: PhxVehicleAxis
permalink: /Entities-PhxVehicleAxis/
tags: [Entities, Reference]
---

<b>PhxVehicleAxis</b> is a parent entity that assigns child entity
addresses for handling various properties of each axle.

## PhxVehicleAxis

    <entity class="PhxVehicleAxis" classVersion="1" addr="0x03177BE0" unknown1="128" unknown2="212203">
      <staticProperties>
        <property name="name" type="String" container="StaticArray" arraySize="1">
          <value>PhxVehicleAxis0000</value>
        </property>
        <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
          <value>0x03177B70</value>
        </property>
        <property name="vehicleAxisParam" type="EntityPtr" container="StaticArray" arraySize="1">
          <value>0x03177940</value>
        </property>
        <property name="wheelConstraintParam" type="EntityPtr" container="StaticArray" arraySize="1">
          <value>0x031779B0</value>
        </property>
        <property name="wheelAssociationUnitParams" type="EntityPtr" container="DynamicArray" arraySize="2">
          <value>0x03177F60</value>
          <value>0x03178200</value>
        </property>
        <property name="torqueDistributions" type="float" container="DynamicArray" />
        <property name="gearRatios" type="float" container="DynamicArray" />
      </staticProperties>
      <dynamicProperties />
    </entity>




### name

String that sets the name for a particular axle. This can be used to
determine which axle you are modifying, as the game sequentially lists
axles from 0-n, front to back.


### vehicleAxisParam

Assigns child entity PhVehicleAxisParam, which sets max braking power
and whether a differential is being used.

    <entity class="PhVehicleAxisParam" classVersion="1" addr="0x03177940" unknown1="32" unknown2="212205">
      <staticProperties>
        <property name="maxBreakTorque" type="float" container="StaticArray" arraySize="1">
          <value>15000</value>
        </property>
        <property name="useDifferential" type="bool" container="StaticArray" arraySize="1">
          <value>true</value>
        </property>
      </staticProperties>
      <dynamicProperties />
    </entity>




### wheelConstraintParam

Assigns child entity PhxWheelConstraintParam, which controls the model's
wheel coordinates, and physics for the suspension and tires.


#### Suspension properties

suspensionLength is the max length of the axle's suspension.

    <property name="suspensionLength" type="float" container="StaticArray" arraySize="1">
      <value>0.324</value>
    </property>

maxSuspensionForce is the max spring rate.

    <property name="maxSuspensionForce" type="float" container="StaticArray" arraySize="1">
      <value>1.8</value>
    </property>

restitution is the factor of time it will take for the suspension to
return to a normal state.

    <property name="restitution" type="float" container="StaticArray" arraySize="1">
      <value>0.1</value>
    </property>

dampingFactorElong and dampingFactorCompress set the amount of
elongation and compression that the suspension can undergo,
respectively.

    <property name="dampingFactorElong" type="float" container="StaticArray" arraySize="1">
      <value>0.02</value>
    </property>
    <property name="dampingFactorCompress" type="float" container="StaticArray" arraySize="1">
      <value>0.003</value>
    </property>




#### Wheel coordinate properties

These are coordinates on the vehicle model. It's currently unknown what
each property controls.

    <property name="defaultPosition" type="Vector3" container="StaticArray" arraySize="1">
      <value x="0" y="0" z="0" w="0" />
    </property>
    <property name="defaultRotation" type="Quat" container="StaticArray" arraySize="1">
      <value x="0" y="0" z="0" w="1" />
    </property>
    <property name="positionL" type="Vector3" container="StaticArray" arraySize="1">
      <value x="0" y="0" z="0" w="0" />
    </property>
    <property name="frontL" type="Vector3" container="StaticArray" arraySize="1">
      <value x="0" y="0" z="1" w="0" />
    </property>
    <property name="upL" type="Vector3" container="StaticArray" arraySize="1">
      <value x="0" y="1" z="0" w="0" />
    </property>
    <property name="wheelPositionOffset" type="Vector3" container="StaticArray" arraySize="1">
      <value x="0" y="-0.122" z="0" w="0" />
    </property>




#### Wheel physics properties

radius is the size of the axle's tires, from the center of the wheel to
the outer edge of the tire.

    <property name="radius" type="float" container="StaticArray" arraySize="1">
      <value>0.34</value>
    </property>

friction is the amount of roll resistance that a tire experiences. 1
equates to the default amount of friction.

    <property name="friction" type="float" container="StaticArray" arraySize="1">
      <value>0.94</value>
    </property>

inertia sets the amount of force that must be overcome to initial start
moving. 1 equates to the default amount of inertia.

    <property name="inertia" type="float" container="StaticArray" arraySize="1">
      <value>1</value>
    </property>




### wheelAssociationUnitParams

Assigns an individual child entity of PhxWheelAssociationUnitParam to
set a model bone to each wheel on the axle, via property boneName.

    <entity class="PhxWheelAssociationUnitParam" classVersion="0" addr="0x03177F60" unknown1="32" unknown2="212207">
      <staticProperties>
        <property name="boneName" type="String" container="StaticArray" arraySize="1">
          <value>SKL_110_WHEELLF</value>
        </property>
      </staticProperties>
      <dynamicProperties />
    </entity>
    <entity class="PhxWheelAssociationUnitParam" classVersion="0" addr="0x03178200" unknown1="32" unknown2="212208">
      <staticProperties>
        <property name="boneName" type="String" container="StaticArray" arraySize="1">
          <value>SKL_120_WHEELRF</value>
        </property>
      </staticProperties>
      <dynamicProperties />
    </entity>




### torqueDistributions & gearRatios

These arrays are unused in all vehicle .fpkd .veh files and attempts at
editing them result in a CTD upon attempting to load into a sortie.