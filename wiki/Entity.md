---
title: Entity
permalink: /Entity/
tags: [Entities, Reference]
---

**Entity** is a type of object used in the Fox Engine. It is believed
that  Entity lies at the top of the hierarchy of entity classes,
due in part to its name and the fact that none are actually placed
anywhere in .fox2 files, but referenced as an included class in the
`<classes>` block.

## Format

Serialized representation - [010 Editor template](https://github.com/kapuragu/FoxEngineTemplates/blob/c40c5d4e5cf556a0fed14b57d3f2a5653cbd0ecc/fox2.bt#L21).

Entity is supposedly serializable into xml via built-in method `fox::EntitySerializationFormatterV2::Save`.
All attempts to invoke that function without errors were unsuccessful.

## Usage

The **Entity** is not an object directly placed in a level, but
rather, it is the super class that all entities in the Fox Engine derive
basic properties from. As such, it is not advisable to place one
directly in a .fox2, and its properties and associated values are
unknown at this time (if any such exist).

The only known usage of the entity of type **Entity** is as a reference
in the `<classes>` header block.

### Example

```xml
<classes>
  <class name="Entity" super="" version="2" />
</classes>
```
