---
title: Entities - Entity
permalink: /Entities-Entity/
tags: [Entities, Reference]
---

'''Entity '''is a type of object used in the Fox Engine. It is believed
that '''Entity '''lies at the top of the hierarchy of entity classes,
due in part to its name and the fact that none are actually placed
anywhere in .fox2 files, but referenced as an included class in the
*<classes>* block.

## Format

There is no known format for placed entities of type **Entity**.

## Usage

The **Entity**'' ''is not an object directly placed in a level, but
rather, it is the super class that all entities in the Fox Engine derive
basic properties from. As such, it is not advisable to place one
directly in a .fox2, and its properties and associated values are
unknown at this time (if any such exist).

The only known usage of the entity of type **Entity** is as a reference
in the '''<classes> '''header block.

***Example:** <classes>* *<class name="Entity" super="" version="2" />
</classes>*