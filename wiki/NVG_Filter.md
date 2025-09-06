---
title: NVG Filter
permalink: /NVG_Filter/
tags: [Rendering, Guides]
---

### Night vision goggles

NVG filter is applied on equipping night vision goggles. Highlights destructibles and living beings. It is made of two parts: noise filter and LUT. 
There is no info on tuning noise filter, it might be set in the exe.

![NVG off](/assets/NVG_Filter/nvg_off.jpg){:.inline width="300px"}![NVG on](/assets/NVG_Filter/nvg_on.jpg){:.inline width="300px"}
{:.center}

### Parasite goggles

Parasite goggles (exe name) or TDG (Thermal imaging infection detector, game name) are equipped only during mission 43 (SHINING LIGHTS). They hightlight neck area (how?) and make everything darker a bit. Equipping them in regular missions does not apply filter - there is a specific flag check in `tpp::gm::player::impl::ActionCoreImpl::UpdateEffectAndBatteryAboutGoggle`. Apparently NVG entity parameters (see below) do not affect parasite goggles (needs checking).

![Parasite goggles, mission 43](/assets/NVG_Filter/parasite_goggles.jpg){:.thumb .center}

### Modifying filter

You have several approaches:

  - edit .fox2 entity properties
  - edit LUT

#### Entity properties

<p class="iconed icon-sidebar icon-lightbulb">Need examples!</p>

Properties are defined in `chunk0/Assets/tpp/pack/collectible/common/col_common_tpp_fpkd/Assets/tpp/level_asset/weapon/NightVisions.fox2`

##### TppNightVisionParam

| name | type |
| :--- | :--- |
| owner | EntityHandle |
| enable | bool |
| colorCorrectionLUT | Path |
| exposureCompensation | float |
| switchOnCompensation | float |
| switchOnEffectTime | float |
| switchOffCompensation | float |
| switchOffEffectTime | float |
| tonemapThreshold | float |
| tonemapRange | float |

##### TppNvgFilterNoise

| name | type |
| :--- | :--- |
| name | String |
| dataSet | EntityHandle |
| visibility | bool |
| scale | float |
| offset | float |
| cutScale | float |
| cutOffset | float |
| isForceVisible | bool |
| color | Color |
| radialSlope | float |
| radialShift | float |

#### LUT

LUT path for NVG is `/texture0/Assets/tpp/effect/gr_pic/lut/common_nvg_a_FILTERLUT.ftex`, loaded by `NightVisions.fox2` (see above).

Parasite goggles use `/texture3/Assets/tpp/effect/gr_pic/lut/common_wvg_a_FILTERLUT.ftex`, which is loaded by `chunk3/Assets/tpp/pack/location/mbqf/pack_common/mbqf_common_fpkd/Assets/tpp/level/location/mtbs/block_large/mtbs_qrntnFacility_effect.fox2`

See [FILTERLUT Texture Guide](https://mgsvmoddingwiki.github.io/FILTERLUT_Texture_Guide/) for more info on LUTs.

### Removing the filter completely

You need to patch the exe.

Function `tpp::gm::player::impl::FilterEffectControllerImpl::SetEnableNVGFilter`, replace `0x0f, 0x85` with `0x48, 0x90` at:

  - debugger (attached): `0x140af9e43`

or

  - hex editor (file offset): `0x00af9243`

Result:

![NVG without filter](/assets/NVG_Filter/nvg_no_filter.jpg){:.thumb .center}

### Mod example

[Thermal Vision Goggles](https://www.nexusmods.com/metalgearsolidvtpp/mods/1519)
