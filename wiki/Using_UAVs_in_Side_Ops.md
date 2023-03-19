---
title: Using UAVs in Side-Ops
permalink: /Using_UAVs_in_Side_Ops/
tags: [Guides, Missions, FoxKit]
---

## **UAV**

A guide to load UAVs in quests.

The user may find the parts file in
*\\chunk3_dat\\Assets\\tpp\\pack\\mission2\\online\\o50050\\o50050_area_fpkd\\Assets\\tpp\\parts\\mecha\\uav*

And the fmdl in
*\\chunk3_dat\\Assets\\tpp\\pack\\mission2\\online\\o50050\\o50050_area_fpk\\Assets\\tpp\\mecha\\uav\\Scenes*

### Code\#01

Set a local list where the name should be whatever what is set in the
gamebjectLocator in fox2 file.

```lua
localuavList = {
    "ovniFun_01",
    "ovniFun_02"
}
```

After that the user may script a Setup to run all the commands for once
to just one gameobject in the list.

```lua
function this.SetupUAV()
   
   for index, uavName in pairs(uavList) do
       local gameObjectId = GameObject.GetGameObjectId(uavName)
       if gameObjectId ~= GameObject.NULL_ID then
           GameObject.SendCommand( gameObjectId, {id = "SetEnabled", enabled = true } )
           GameObject.SendCommand( gameObjectId, {id = "SetPatrolRoute", route="rts_uav" } )
           GameObject.SendCommand( gameObjectId, {id = "SetCombatRoute", route="rts_uav" } )
           GameObject.SendCommand( gameObjectId, {id = "SetCommandPost", cp="quest_cp" } )
           --GameObject.SendCommand( gameObjectId, {id = "WarpToNearestPatrolRouteNode"} )         
       end
   end 

end
```

### Code\#01

Or set separately for each Uav listed about the Routes.

```lua
local uavList = {
   "ovniFun_01",
    "ovniFun_02"
}

-- Uav_01
function this.SetupUAV01(uavName)  
   GameObject.SendCommand( GameObject.GetGameObjectId( uavName ), {id = "SetPatrolRoute", route="rts_uav" } )
end

-- Uav_02
function this.SetupUAV01(uavName)  
   GameObject.SendCommand( GameObject.GetGameObjectId( uavName ), {id = "SetPatrolRoute", route="rts_uav" } )
end
```

After that the user should add the functions to load inside `OnEnter =
function()`. In Quests normally

```lua
quest_step.QStep_Start = {
   OnEnter = function()
       
       this.SetupUAV() 

       this.SetupUAV01("ovniFun_01")
       
       TppQuest.SetNextQuestStep( "QStep_Main" )
   end,
}
```

### RouteSet

Uavs use the *edge node* **Move Slow**, **Move Normal**, **Move Fast** and **Move
Very Fast**. It may use a *event node* **Wait Idle** with just param0:
1 and param1: a unique number. See [Routes](/Routes).

### Fox2 file

Same as Hostage and Soldiers, Cameras and Vehicles. Uav use a gameobject
to set the parts file and count. And a gameobjectLocator to load each
Uav.

**GameObject**

name = TppUav

totalCount = the amount of Uavs in the field

realizedCount = Fova

parameters = TppUavParameter

```xml
<entity class="GameObject" classVersion="2" addr="0x051256B0" unknown1="88" unknown2="295013">
  <staticProperties>
    <property name="name" type="String" container="StaticArray" arraySize="1">
      <value>UavGameObject</value>
    </property>
    <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
      <value>0x10000690</value>
    </property>
    <property name="typeName" type="String" container="StaticArray" arraySize="1">
      <value>TppUav</value>
    </property>
    <property name="groupId" type="uint32" container="StaticArray" arraySize="1">
      <value>0</value>
    </property>
    <property name="totalCount" type="uint32" container="StaticArray" arraySize="1">
      <value>1</value>
    </property>
    <property name="realizedCount" type="uint32" container="StaticArray" arraySize="1">
      <value>1</value>
    </property>
    <property name="parameters" type="EntityPtr" container="StaticArray" arraySize="1">
      <value>0x05125720</value>
    </property>
  </staticProperties>
  <dynamicProperties />
</entity>
```

**TppUavParameter**

```xml
<entity class="TppUavParameter" classVersion="1" addr="0x05125720" unknown1="56" unknown2="295015">
    <staticProperties>
    <property name="owner" type="EntityHandle" container="StaticArray" arraySize="1">
        <value>0x051256B0</value>
    </property>
    <property name="partsFile" type="FilePtr" container="StaticArray" arraySize="1">
        <value>/Assets/tpp/parts/mecha/uav/uav0_main0_def_v00.parts</value>
    </property>
    </staticProperties>
    <dynamicProperties />
</entity>
```

**GameObjectLocator**

```xml
<entity class="GameObjectLocator" classVersion="2" addr="0x06D7A340" unknown1="272" unknown2="54055">
    <staticProperties>
    <property name="name" type="String" container="StaticArray" arraySize="1">
        <value>ovniFun_01</value>
    </property>
    <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
        <value>0x10000690</value>
    </property>
    <property name="parent" type="EntityHandle" container="StaticArray" arraySize="1">
        <value>0x00000000</value>
    </property>
    <property name="transform" type="EntityPtr" container="StaticArray" arraySize="1">
        <value>0x06D7A3B0</value>
    </property>
    <property name="shearTransform" type="EntityPtr" container="StaticArray" arraySize="1">
        <value>0x00000000</value>
    </property>
    <property name="pivotTransform" type="EntityPtr" container="StaticArray" arraySize="1">
        <value>0x00000000</value>
    </property>
    <property name="children" type="EntityHandle" container="List" />
    <property name="flags" type="uint32" container="StaticArray" arraySize="1">
        <value>7</value>
    </property>
    <property name="typeName" type="String" container="StaticArray" arraySize="1">
        <value>TppUav</value>
    </property>
    <property name="groupId" type="uint32" container="StaticArray" arraySize="1">
        <value>0</value>
    </property>
    <property name="parameters" type="EntityPtr" container="StaticArray" arraySize="1">
        <value>0x06D7A490</value>
    </property>
    </staticProperties>
    <dynamicProperties />
</entity>
```

**TransformEntity**

```xml
<entity class="TransformEntity" classVersion="0" addr="0x06D7A3B0" unknown1="80" unknown2="54058">
    <staticProperties>
    <property name="owner" type="EntityHandle" container="StaticArray" arraySize="1">
        <value>0x06D7A340</value>
    </property>
    <property name="transform_scale" type="Vector3" container="StaticArray" arraySize="1">
        <value x="1.00000048" y="1" z="1.00000048" w="1.121039E-44" />
    </property>
    <property name="transform_rotation_quat" type="Quat" container="StaticArray" arraySize="1">
        <value x="0" y="-0.707106948" z="0" w="0.7071066" />
    </property>
    <property name="transform_translation" type="Vector3" container="StaticArray" arraySize="1">
        <value x="-330" y="278" z="1758" w="1" />
    </property>
    </staticProperties>
    <dynamicProperties />
</entity>
```

**TppUavLocatorParameter**

```xml
<entity class="TppUavLocatorParameter" classVersion="0" addr="0x06D7A490" unknown1="32" unknown2="54062">
    <staticProperties>
    <property name="owner" type="EntityHandle" container="StaticArray" arraySize="1">
        <value>0x06D7A340</value>
    </property>
    <property name="identifier" type="String" container="StaticArray" arraySize="1">
        <value></value>
    </property>
    </staticProperties>
    <dynamicProperties />
</entity>
```

