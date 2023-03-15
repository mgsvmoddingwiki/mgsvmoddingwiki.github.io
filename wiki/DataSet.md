---
title: DataSet
permalink: /DataSet/
tags: [Entities, Reference]
---

The entity of type '''DataSet '''​is common to all .fox2 files and is
mandatory if any entities are placed in the .fox2 file. It contains a
list of every entity used in that particular .fox2, presumably used as a
table referenced by the editor to enumerate the various objects placed
therein.

## ​Usage

Only one entity of type **DataSet** has ever been observed to exist in a
given .fox2, and it is assumed due to the nature of this entity that
only one is allowed. An entity block defining the **DataSet** has the
following header:

> *<entity class="DataSet" classVersion="0" addr="0x02D7DFA0" unknown1="232" unknown2="89171">*

​The only header property known is *addr*​. This header property
indicates where in the .fox2 the beginning of the **DataSet** entity is
located. *unknown1* and *unknown2* remain just that; their usage and
importance remains a mystery.

Following the header block are three property blocks: *name*, *dataSet*,
and *dataList*.

''name ''follows the following convention and is usually left empty in a
**DataSet**:

> *<property name="name" type="String" container="StaticArray" arraySize="1">
> <value></value>
> </property>*

Following *name* is *dataSet*, a property common to all Fox entities. As
a **DataSet** entity is necessarily not contained by itself or another
**DataSet**, this field is usually zeroed, like so:

> *<property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
> <value>0x00000000</value>
> </property>*

The *value* subblock is a pointer to the **DataSet** entity, if this
entity belongs to a **DataSet**. Typically you may acquire the value of
this field by observing the *addr* property in the header block of the
**DataSet**. It should be the same for all entities in the .fox2.

Following *dataSet* is *dataList*, which is the property block that
actually contains the list of entities used in a given .fox2. It has a
format like the following:

> *<property name="dataList" type="EntityPtr" container="StringMap" arraySize="2">
> <value key="cypr_location">0x02D7E010</value>
> <value key="TexturePackLoadConditioner0000">0x0827ADC0</value>
> </property>*

Each value block contains one property, ''key, ''which is equivalent to
the *name* static property of the given entity. The value itself is a
pointer to that entity, given by the ''addr ''header block property of
that given entity.

The size of the **DataSet** is variable, depending on the number of
entries listed in *dataList*.