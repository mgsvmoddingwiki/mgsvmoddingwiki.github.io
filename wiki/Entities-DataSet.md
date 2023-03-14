---
title: Entities:DataSet
permalink: /Entities-DataSet/
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

*<entity class="DataSet" classVersion="0" addr="0x02D7DFA0" unknown1="232" unknown2="89171">*

​The only header property known is *addr*​. This header property
indicates where in the .fox2 the beginning of the **DataSet** entity is
located. *unknown1* and *unknown2* remain just that; their usage and
importance remains a mystery.
[Category:Entities](/Category:Entities "wikilink")