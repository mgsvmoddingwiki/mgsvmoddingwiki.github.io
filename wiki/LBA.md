---
title: LBA
permalink: /LBA/
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
in s10070_gimmick.fox2:

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

## Format

TODO [Category:File Formats](/Category:File_Formats "wikilink")