---
title: PhVehicleNormalEngineParam
permalink: /PhVehicleNormalEngineParam/
tags: [Entities, Reference]
---

The Entity <b>PhVehicleNormalEngineParam</b> sets the torque curve for a
vehicle. It's only used in the vehicle .fpkd archives' .veh file.

## Properties

The game appears to use the NVIDIA PhysX engine, which uses the metric
unit Newton Meters (nM) for torque values. power in kW at the flywheel
can be determined with the following formula.

    kW = ((specPointAngularVelocity[n] * specPointTorque[n]) / 9.5488) * 0.001

If horsepower (HP) is the metric you wish to view then use the following
formula.

    ftLb_torque = specPointTorque[n] * 0.73756
    HP = (specPointAngularVelocity[n] * ftLb_torque) / 5252

Where n in either formula is the position of the value in both property
arrays.


### specPointAngularVelocity

```xml
<property name="specPointAngularVelocity" type="float" container="DynamicArray" arraySize="8">
  <value>0</value>
  <value>1000</value>
  <value>2000</value>
  <value>3000</value>
  <value>4000</value>
  <value>5000</value>
  <value>6000</value>
  <value>12000</value>
</property>
```

Sets engine RPM range. Used in conjunction with specPointTorque to
determine engine power at each RPM.


### specPointTorque

```xml
<property name="specPointTorque" type="float" container="DynamicArray" arraySize="8">
  <value>190</value>
  <value>208</value>
  <value>230</value>
  <value>250</value>
  <value>260</value>
  <value>220</value>
  <value>160</value>
  <value>20</value>
</property>
```

Sets engine torque ranges. Used with specPointAngularVelocity to
determine engine power at each RPM.


### specPointBreakTorque

```xml
<property name="specPointBreakTorque" type="float" container="DynamicArray" arraySize="8">
  <value>12.5</value>
  <value>22.5</value>
  <value>37.5</value>
  <value>42.5</value>
  <value>62.5</value>
  <value>75</value>
  <value>100</value>
  <value>50</value>
</property>
```

Presumably the amount of engine braking being done to naturally
decelerate the vehicle at each RPM, once the throttle is no longer being
applied.
