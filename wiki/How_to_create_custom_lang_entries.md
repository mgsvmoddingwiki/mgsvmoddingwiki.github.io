---
title: How to create custom lang entries
permalink: /How_to_create_custom_lang_entries/
tags: [Guides, Lang]
---

This tutorial will help you create your own lang entries instead of
replacing them. This can be useful for when you create your own custom
equips, staff members, or missions/locations. It is recommended that you
read [Lang Files](/Lang_Files "wikilink") before following this
tutorial.

## Getting Ready

Install [SnakeBite Mod Manager](/SnakeBite_Mod_Manager "wikilink"),
which also includes MakeBite, the tool you need to build MGSV files.
Download [GzsTool](/GzsTool "wikilink") and
[LangTool](/LangTool "wikilink") then extract them to their own folders.

## lang_default_data_XXX.fpk

If you haven't extracted **lang_default_data_<language>.fpk**, you
can extract it from **chunk0.dat** by drag & dropping it on
[GzsTool](/GzsTool "wikilink"). Once extraction is finished, go to your
mod's project folder and create this directory structure
**"Assets\\tpp\\pack\\ui\\lang\\".** Copy
**lang_default_data_<language>.fpk** to
**"Assets\\tpp\\pack\\ui\\lang\\".** Last step, open
[MakeBite](/SnakeBite_Mod_Manager "wikilink"), select the mod's project
folder, build the MGSV file as it will also extract all FPKs.
Alternatively, you can drag & drop
**lang_default_data_<language>.fpk** onto
[GzsTool](/GzsTool "wikilink"). If you're unsure which language to
modify, choose **eng (english)**. You can provide support for other
languages if you'd like.

### Creating new entries

If you're only adding custom lang entries, remove all lng2 files inside
of the FPK from the **"\\Assets\\tpp\\lang\\ui"** directory. It should
be empty so it doesn't overwrite any existing entries.

### Modifying existing entries

Inside that directory, you'll find lng2 files for staff, weapons, items,
dialogues, etc. If you're interested in modifying existing lng2 files,
you can use the [LangTool](/LangTool "wikilink") to decompile them as
XML files by drag and dropping them on
[LangTool.exe](/LangTool "wikilink"). From there, you can edit the XMLs
and compile new lng2 files from them. Whatever lgn2 files you don't
modify, should be removed as well.

**NOTE: Decompiling lng2 files might replace langIDs with keys, which
are StrCode32 versions of them.**

## Lang XML Template

Below is an example XML script which you can use to setup your very own
lang entries\! When you replace the LangIDs, make sure they're unique
enough. You can copy the following snippet and paste it into a text
editor, make your modifications, and save it as an XML file, rename the
extension to **".lng2.xml"**.

<?xml version="1.0" encoding="utf-8"?>

<LangFile xmlns:xsi="<nowiki>http://www.w3.org/2001/XMLSchema-instance</nowiki>" xmlns:xsd="<nowiki>http://www.w3.org/2001/XMLSchema</nowiki>" Endianess="BigEndian">
`  `<Entries>
`    `<Entry LangId="custom_lang_id_a" Color="1" Value="Custom Lang ID A" />
`    `<Entry LangId="custom_lang_id_b" Color="1" Value="Custom Lang ID B" />
`    `<Entry LangId="custom_lang_id_c" Color="1" Value="Custom Lang ID C" />
`  `</Entries>
</LangFile>

## Compile lng2 file

Next, drag and drop your lang XML file onto
[LangTool.exe](/LangTool "wikilink"). It should compile the XML as a
[lng2 file](/Lang_Files "wikilink") in the same directory. If it
doesn't, check if your XML file is missing any opening or closing quotes
or tags, such "</Entries>" or "</LangFile>". Once it successfully
compiles it as a lng2 file, you can add it in the
**"\\Assets\\tpp\\lang\\ui"** directory inside your custom
**lang_default_data_<language>.fpk.**

## Using your custom lang entries for equips

To setup an equip's lang entries, you have to change their development
const settings.

|         |                                                                                                      |
| ------- | ---------------------------------------------------------------------------------------------------- |
| **p00** | The DevConst ID for the equip.                                                                       |
| **p06** | The langId for the equip's name in the iDroid development menu and Hud.                              |
| **p07** | The langId for the equip's description in the iDroid development menu and Hud                        |
| **p30** | The langId for the equip's full name shown in the infobox displayed in the iDroids development menu. |

### Setting it up for Zeta

For Zeta mods, you can create new equips or alter existing equips
without overwriting **EquipDevelopConstSetting.lua**. If altering an
equip, **p00** should match the DevConst ID of the equip you wish to
change. \[Coming Soon: A tutorial for creating custom equips in Zeta
will be linked here\]

`function this.EquipDevelopConstSetting()`
`   return{`
`       {`
`           p00=XXX, --Should match the DevConst ID`
`           p06="name_wp_XXX",`
`           p07="info_wp_XXX",`
`           p30="real_wp_XXX",`
`       },`
`   }`
`end`

### EquipDevelopConstSetting.lua

For legacy MGSV mods, you have to modify
**EquipDevelopConstSetting.lua** to replace an equip's lang entries.
Each **RegCstDev** call sets an equip's devconst parameters. You can
modify an existing entry or create your own, and set the **p06, p07,
p30** parameters to use your entries instead.

`TppMotherBaseManagement.RegCstDev{`
`   p00=XXX,`
`   p01=TppEquip.EQP_XXX,`
`   p02=TppMbDev.EQP_DEV_TYPE_XXX,`
`   p03=XXX,`
`   p04=XXX,`
`   p05=XXX,`
`   `**`p06`**`="name_wp_XXX",`
`   `**`p07`**`="info_wp_XXX",`
`   p08="/Assets/tpp/ui/texture/EquipIcon/XXX",`
`   p09=TppMbDev.EQP_DEV_GROUP_XXX,`
`   p10="ability_XXX",`
`   `**`p30`**`="real_wp_XXX",`
`   p31=XXX,`
`   p32=XXX,`
`   p33=XXX,`
`   p34=XXX,`
`   p35=XXX,`
`   p36=XXX`
`}`

## Using your custom lang entries for staff

Unique staff members can have their own unique names. Fortunately, all
that needs to be changed is the **nameLangMessageId**.

### Setting it up for Zeta

For Zeta mods, you can create new unique staff or alter existing staff
without overwriting **MbmCommonSetting.lua**. If modifying a unique
staff member, **uniqueTypeId** should match the uniqueTypeId of the
unique staff member you wish to change. \[Coming Soon: A tutorial for
creating unique staff members in Zeta will be linked here\]

`function this.MbmCommonSetting()`
`   return{`
`       uniqueStaff={`
`           {`
`               uniqueTypeId=XXX, --Should be unique to the staff member`
`               nameLangMessageId="unique_staff_XXX",`
`           },`
`       },`
`   }`
`end`

### MbmCommonSetting.lua

For legacy MGSV mods, you have to modify **MbmCommonSetting.lua** to
replace an equip's lang entries. Each **RegisterUniqueStaff** call sets
a unique staff member parameters. You can modify an existing staff
member or create your own and set the **nameLangMessageId** parameter
with your custom langID.

`TppMotherBaseManagement.RegisterUniqueStaff{`
`   uniqueTypeId=XXX,`
`   `**`nameLangMessageId`**`="staff_name_XXXXX",`
`   combatSectionPoint=XXX,`
`   developSectionPoint=XXX,`
`   baseDevSectionPoint=XXX,`
`   supportSectionPoint=XXX,`
`   spySectionPoint=XXX,`
`   medicalSectionPoint=XXX,`
`   skill=XXX,`
`   isEnmity=XXX,`
`   moraleEnmity=XXX,`
`   condition=XXX,`
`   badConditionWeight=XXX,`
`   langProficEnglish=XXX,`
`   langProficRussian=XXX,`
`   langProficPashto=XXX,`
`   langProficKikongo=XXX,`
`   langProficAfrikaans=XXX,`
`   missionId=XXX`
`}`