---
title: EquipDevelopSetting
permalink: /EquipDevelopSetting/
---

## EquipDevelopSetting

These files are responsible for setting up the item development
requirements. Includes EquipDevelopConstSetting.lua and
EquipDevelopFlowSetting.lua. In MGO's chunk0.dat there is also a file
named just EquipDevelopSetting.lua that appears to be a combination of
both of these files with the original variable names intact. However, it
does lack variables for p34, p35 and p36.

| Minified Variable Name | Real Variable Name      | Additional Info                                                                                |
| ---------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| p00                    | equipDevelopID          | Integer ID. I.e. 1e3                                                                           |
| p01                    | equipID                 | TppEquip class ID. I.e. TppEquip.EQP_WP_10101                                                |
| p02                    | equipDevelopTypeID      | Item type. I.e. TppMbDev.EQP_DEV_TYPE_Handgun                                               |
| p03                    | baseEquipDevelopId      | Parent eqipDevelopID.                                                                          |
| p04                    | skill                   | Staff skill requirement. I.e. "SuppressorEngineer." 0 if not required.                         |
| p05                    | bluePrintId             | Blue print requirement. I.e. TppMotherBaseManagementConst.DESIGN_2000. 65535 if not required. |
| p06                    | langEquipName           |                                                                                                |
| p07                    | langEquipInfo           |                                                                                                |
| p08                    | ftexPath                | UI image path.                                                                                 |
| p09                    | equipDevelopGroupID     |                                                                                                |
| p10                    | langPowerUpInfo0        |                                                                                                |
| p11                    | langPowerUpInfo1        |                                                                                                |
| p12                    | langPowerUpInfo2        |                                                                                                |
| p13                    | langPowerUpInfo3        |                                                                                                |
| p14                    | langPowerUpInfo4        |                                                                                                |
| p15                    | langPowerUpInfo5        |                                                                                                |
| p16                    | langPowerUpInfo6        |                                                                                                |
| p17                    | langPowerUpInfo7        |                                                                                                |
|                        | langPowerUpInfo8        | Unused.                                                                                        |
|                        | langPowerUpInfo9        | Unused.                                                                                        |
|                        | langPowerUpInfo10       | Unused.                                                                                        |
|                        | langPowerUpInfo11       | Unused.                                                                                        |
| p30                    | langEquipRealName       |                                                                                                |
| p31                    | isResultRankLimited     | 1 if item will restrict rank.                                                                  |
| p32                    | isCustomEnable          |                                                                                                |
| p33                    | isColorChangeEnable     |                                                                                                |
| p34                    | <Name Missing/Unknown>  | Unknown.                                                                                       |
| p35                    | <Name Missing/Unknown>  | 1 if equippable by Security Team staff.                                                        |
| p36                    | <Name Missing/Unknown>  | Unknown. Includes all DLC and unusable items. As well as some other seemingly random items.    |
| p50                    | N/A                     | Index for relative EquipDevelopConstSetting.                                                   |
| p51                    | derivationIndex         |                                                                                                |
| p52                    | developRank             | Item rank.                                                                                     |
| p53                    | developGmpCost          |                                                                                                |
| p54                    | usageGmpCost            |                                                                                                |
| p55                    | developSectionLv        | R\&D Team level requirement.                                                                   |
| p56                    | sectionIDForDevelop     | Other Team ID.                                                                                 |
| p57                    | SectionLvForDevelop     | Other Team level requirement.                                                                  |
| p58                    | resourceType1           |                                                                                                |
| p59                    | resourceType1Count      |                                                                                                |
| p60                    | resourceType2           |                                                                                                |
| p61                    | resourceType2Count      |                                                                                                |
| p62                    | initialAvailable        |                                                                                                |
| p63                    | sectionID2ForDevelop    |                                                                                                |
| p64                    | sectionLv2ForDevelop    |                                                                                                |
| p65                    | resourceUsageType1      |                                                                                                |
| p66                    | resourceUsageType1Count |                                                                                                |
| p67                    | resourceUsageType2      |                                                                                                |
| p68                    | resourceUsageType2Count |                                                                                                |
| p69                    | displayInfo             |                                                                                                |
| p70                    | developLevel            | Always 0.                                                                                      |
| p71                    | developTimeMinute       |                                                                                                |
| p72                    | isValidMbCoin           | 1 if it's an online item.                                                                      |
| p73                    | intimacyPoint           | Buddy bond requirement.                                                                        |
| p74                    | isFobAvailable          | Can be used during FOB missions.                                                               |