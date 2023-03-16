---
title: LBA
permalink: /LBA/
tags: [File Formats, Missions]
---

The .lba file format is a binary file format used in GZ and TPP to store
locator data for [gimmicks](/Gimmick "wikilink"). Its technical name is
unknown, but it's referred to in [DataSets](/DataSet "wikilink") as a
*locaterFile* (sic) and is unofficially called a GimmickLocatorSet by
FoxLib.

## Usage

While most entities have their transforms specified by a
[Locator](/Locator "wikilink"),
[TransformData](/TransformData "wikilink"), or
[TransformEntity](/TransformEntity "wikilink") in a DataSet, gimmicks
instead pull their transform from a .lba file. An example can be found
in s10070_gimmick.fox2\[1\]:

```xml
<entity class="TppPermanentGimmickData" classVersion="0" addr="0x07C64B50" unknown1="144" unknown2="3094"> 
    <staticProperties> 
        <property name="name" type="String" container="StaticArray" arraySize="1"> 
        <value>gntn_cntn001_vrtn001_gim_i0000|TppPermanentGimmick_gntn_cntn001_vrtn001</value> 
        </property> 
        <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1"> 
        <value>0x06C69D20</value> 
        </property> 
        <property name="partsFile" type="FilePtr" container="StaticArray" arraySize="1"> 
        <value>/Assets/tpp/parts/environ/object/guantanamo/container/gntn_cntn001/gntn_cntn001_vrtn001.parts</value> 
        </property> 
        <property name="locaterFile" type="FilePtr" container="StaticArray" arraySize="1"> 
        <value>/Assets/tpp/level/mission2/story/s10070/lba/gntn_cntn001_vrtn001.lba</value> 
        </property> 
        <property name="parameters" type="EntityPtr" container="StaticArray" arraySize="1"> 
        <value>0x00000000</value> 
        </property> 
        <property name="flags1" type="uint32" container="StaticArray" arraySize="1"> 
        <value>1</value> 
        </property> 
        <property name="flags2" type="uint32" container="StaticArray" arraySize="1"> 
        <value>0</value> 
        </property> 
    </staticProperties> 
    <dynamicProperties /> 
    </entity>
```

In this case, when the gimmick is spawned, gntn_cntn001_vrtn001.lba is
read to determine where it should be placed. This has a few advantages
over specifying the transform directly in the DataSet: most importantly,
it's possible to query the Locator in Lua and to grab a reference to the
gimmick from its Locator.

The ID of a gimmick can be obtained in Lua by calling

`TppGimmick.GetGimmickID(gameId, locatorNameHash, dataSetNameHash)`

Where gameId is a TppGameObject type ID\[2\], locatorNameHash is the
StrCode32 hash of the locatorName (in this example,
*gntn\_cntn001\_vrtn001\_gim_i0000|TppPermanentGimmick\_gntn\_cntn001\_vrtn001*),
and dataSetNameHash is the PathFileNameCode32 hash of the dataSetName
(in this example,
*/Assets/tpp/level/mission2/story/s10070/s10070_gimmick.fox2*).

Many TppGimmick functions take in a gimmick ID, such as
TppGimmick.GetGameObjectId and TppGimmick.SetVisibility.

By using these functions, you can perform various operations on gimmicks
through scripting, such as showing them, hiding them, breaking them,
querying their location, querying their broken status, and sending
messages when their state changes.

## Format

There are three known types of gimmick locators. Their technical names
are unknown but have been given unofficial names in FoxLib:

  - **PowerCutAreaGimmickLocators** are used by
    TppGimmickPowerCutAreaData entities. They have a position and
    rotation. As they have no locatorName, it's unknown if they can be
    accessed through Lua or how they're referenced by the engine at all.
  - **NamedGimmickLocators** are by far the most common variety. They
    have a position, a rotation, a locatorName, and a dataSetName. When
    creating a custom .lba file, this should be the default format
    unless you're working with TppGImmickPowerCutAreaData entities or
    wish to scale the gimmick.
  - **ScaledGimmickLocators** are a rare variety which appear to be
    usable anywhere a NamedGimmickLocator is used. They have a position,
    a rotation, a scale, a locatorName, and a dataSetName. The scale
    format is still not fully understood. All known
    ScaledGimmickLocatorSets have the suffix \_scl in the filename
    (e.g., *cypr_cabl002_vrtn001_scl.lba*).

### Header

  - 0x0 - 0x3 (uint32): Number of locators.
  - 0x4 - 0x7 (uint32): Locator type. 0 indicates
    PowerCutAreaGimmickLocators, 2 indicates NamedGimmickLocators, and 3
    indicates ScaledGimmickLocators.
  - 0x8 - 0xF: Padding.

### Transforms

This section, the main body of the file, contains one entry for each
locator. Its content differs depending on the type of locator.
PowerCutAreaGimmickLocators and NamedGimmickLocators use unscaled
transforms and ScaledGimmickLocators use scaled transforms.

#### Unscaled transform struct

  - 0x0 - 0x3 (float): World space position, x coordinate.
  - 0x4 - 0x7 (float): World space position, y coordinate.
  - 0x8 - 0xB (float): World space position, z coordinate.
  - 0xC - 0xF (float): World space position, w coordinate.
  - 0x10 - 0x13 (float): World space rotation quaternion, x coordinate.
  - 0x14 - 0x17 (float): World space rotation quaternion, y coordinate.
  - 0x18 - 0x1B (float): World space rotation quaternion, z coordinate.
  - 0x1C - 0x1F (float): World space rotation quaternion, w coordinate.

#### Scaled transform struct

  - 0x0 - 0x3 (float): World space position, x coordinate.
  - 0x4 - 0x7 (float): World space position, y coordinate.
  - 0x8 - 0xB (float): World space position, z coordinate.
  - 0xC - 0xF (float): World space position, w coordinate.
  - 0x10 - 0x13 (float): World space rotation quaternion, x coordinate.
  - 0x14 - 0x17 (float): World space rotation quaternion, y coordinate.
  - 0x18 - 0x1B (float): World space rotation quaternion, z coordinate.
  - 0x1C - 0x1F (float): World space rotation quaternion, w coordinate.
  - 0x20 - 0x23 (float): World space scale, x factor.
  - 0x24 - 0x27 (float): World space scale, y factor.
  - 0x28 - 0x2B (float): World space scale, z factor.
  - 0x2C - 0x2D (uint16): Unknown value A.
  - 0x2E - 0x2F (uint16): Unknown value B.

### Footer

The footer, only present in NamedGimmickLocatorSets and
ScaledGimmickLocatorSets, has one entry for each locator.

#### Footer struct

  - 0x0 - 0x3 (uint32): StrCode32 hash of the locatorName.
  - 0x4 - 0x7 (uint32): PathFileNameCode32 hash of the dataSetName.

## References

1.  Assets\\tpp\\level\\mission2\\story\\s10070\\s10070_gimmick.fox2
2. <https://github.com/TinManTex/MockFox/blob/cd6d825ed01982e99f341c5ced4d330a768855e2/MockFoxLua/MockFoxEngine.lua#L285>
