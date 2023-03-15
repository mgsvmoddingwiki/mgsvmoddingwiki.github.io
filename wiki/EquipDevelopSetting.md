---
title: EquipDevelopSetting
permalink: /EquipDevelopSetting/
tags: [Guides]
---

## EquipDevelopSetting

These files are responsible for setting up the item development
requirements. Includes EquipDevelopConstSetting.lua and
EquipDevelopFlowSetting.lua. In MGO's chunk0.dat there is also a file
named just EquipDevelopSetting.lua that appears to be a combination of
both of these files with the original variable names intact. However, it
does lack variables for p34, p35 and p36.

<table>
<thead>
<tr class="header">
<th><p>Minified Variable Name</p></th>
<th><p>Real Variable Name</p></th>
<th><p>Additional Info</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>p00</p></td>
<td><p>equipDevelopID</p></td>
<td><p>Integer ID. I.e. 1e3</p></td>
</tr>
<tr class="even">
<td><p>p01</p></td>
<td><p>equipID</p></td>
<td><p>TppEquip class ID. I.e. TppEquip.EQP_WP_10101</p></td>
</tr>
<tr class="odd">
<td><p>p02</p></td>
<td><p>equipDevelopTypeID</p></td>
<td><p>Item type. I.e. TppMbDev.EQP_DEV_TYPE_Handgun</p></td>
</tr>
<tr class="even">
<td><p>p03</p></td>
<td><p>baseEquipDevelopId</p></td>
<td><p>Parent equipDevelopID.</p></td>
</tr>
<tr class="odd">
<td><p>p04</p></td>
<td><p>skill</p></td>
<td><p>Staff skill requirement. I.e. "SuppressorEngineer." 0 if not required.</p></td>
</tr>
<tr class="even">
<td><p>p05</p></td>
<td><p>bluePrintId</p></td>
<td><p>Blue print requirement. I.e. TppMotherBaseManagementConst.DESIGN_2000. 65535 if not required.</p></td>
</tr>
<tr class="odd">
<td><p>p06</p></td>
<td><p>langEquipName</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p07</p></td>
<td><p>langEquipInfo</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p08</p></td>
<td><p>ftexPath</p></td>
<td><p>UI image path.</p></td>
</tr>
<tr class="even">
<td><p>p09</p></td>
<td><p>equipDevelopGroupID</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p10</p></td>
<td><p>langPowerUpInfo0</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p11</p></td>
<td><p>langPowerUpInfo1</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p12</p></td>
<td><p>langPowerUpInfo2</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p13</p></td>
<td><p>langPowerUpInfo3</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p14</p></td>
<td><p>langPowerUpInfo4</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p15</p></td>
<td><p>langPowerUpInfo5</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p16</p></td>
<td><p>langPowerUpInfo6</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p17</p></td>
<td><p>langPowerUpInfo7</p></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td><p>langPowerUpInfo8</p></td>
<td><p>Unused.</p></td>
</tr>
<tr class="even">
<td></td>
<td><p>langPowerUpInfo9</p></td>
<td><p>Unused.</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p>langPowerUpInfo10</p></td>
<td><p>Unused.</p></td>
</tr>
<tr class="even">
<td></td>
<td><p>langPowerUpInfo11</p></td>
<td><p>Unused.</p></td>
</tr>
<tr class="odd">
<td><p>p30</p></td>
<td><p>langEquipRealName</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p31</p></td>
<td><p>isResultRankLimited</p></td>
<td><p>1 if item will restrict rank.</p></td>
</tr>
<tr class="odd">
<td><p>p32</p></td>
<td><p>isCustomEnable</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p33</p></td>
<td><p>isColorChangeEnable</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p34</p></td>
<td><p><Name Missing/Unknown></p></td>
<td><p>Unknown.</p></td>
</tr>
<tr class="even">
<td><p>p35</p></td>
<td><p><Name Missing/Unknown></p></td>
<td><p>1 if equippable by Security Team staff.</p></td>
</tr>
<tr class="odd">
<td><p>p36</p></td>
<td><p><Name Missing/Unknown></p></td>
<td><p>Unknown. Includes all DLC and unusable items. As well as some other seemingly random items.</p></td>
</tr>
<tr class="even">
<td><p>p50</p></td>
<td><p>N/A</p></td>
<td><p>Index for relative EquipDevelopConstSetting.</p></td>
</tr>
<tr class="odd">
<td><p>p51</p></td>
<td><p>derivationIndex</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p52</p></td>
<td><p>developRank</p></td>
<td><p>Equipment grade.</p></td>
</tr>
<tr class="odd">
<td><p>p53</p></td>
<td><p>developGmpCost</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p54</p></td>
<td><p>usageGmpCost</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p55</p></td>
<td><p>developSectionLv</p></td>
<td><p>R&amp;D Team level requirement.</p></td>
</tr>
<tr class="even">
<td><p>p56</p></td>
<td><p>sectionIDForDevelop</p></td>
<td><p>Other Team ID.</p></td>
</tr>
<tr class="odd">
<td><p>p57</p></td>
<td><p>SectionLvForDevelop</p></td>
<td><p>Other Team level requirement.</p></td>
</tr>
<tr class="even">
<td><p>p58</p></td>
<td><p>resourceType1</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p59</p></td>
<td><p>resourceType1Count</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p60</p></td>
<td><p>resourceType2</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p61</p></td>
<td><p>resourceType2Count</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p62</p></td>
<td><p>initialAvailable</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p63</p></td>
<td><p>sectionID2ForDevelop</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p64</p></td>
<td><p>sectionLv2ForDevelop</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p65</p></td>
<td><p>resourceUsageType1</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p66</p></td>
<td><p>resourceUsageType1Count</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p67</p></td>
<td><p>resourceUsageType2</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p68</p></td>
<td><p>resourceUsageType2Count</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>p69</p></td>
<td><p>displayInfo</p></td>
<td><p>Under what conditions should this item be shown in the development screen.</p>
<p>0: Always.</p>
<p>1: After staff level requirement has been met. (Actual level requirement is unknown.)</p>
<p>2: Never show.</p>
<p>3: Never show. Only used on EQP_IT_Fulton_WormHole entries.</p></td>
</tr>
<tr class="even">
<td><p>p70</p></td>
<td><p>developLevel</p></td>
<td><p>Always 0.</p></td>
</tr>
<tr class="odd">
<td><p>p71</p></td>
<td><p>developTimeMinute</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>p72</p></td>
<td><p>isValidMbCoin</p></td>
<td><p>1 if it's an online item.</p></td>
</tr>
<tr class="odd">
<td><p>p73</p></td>
<td><p>intimacyPoint</p></td>
<td><p>Buddy bond requirement.</p></td>
</tr>
<tr class="even">
<td><p>p74</p></td>
<td><p>isFobAvailable</p></td>
<td><p>Can be used during FOB missions.</p></td>
</tr>
</tbody>
</table>