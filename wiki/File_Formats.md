---
title: File Formats
permalink: /File_Formats/
tags: [Files, File Formats]
---

This article lists the presumed names of extensions used in MGSV, as
well as some basic descriptions. The full list of up-to-date templates
can be found [here](https://github.com/kapuragu/FoxEngineTemplates).

> **Tip:** tables can be more comfortably viewed on widescreen monitors by pressing the *Expand Wiki Width* button at the top of the page.

| Extension | Full Name | Location(count)[[1]](#references) | Tool | Description |
|---|---|---|---|---|
| adm | fpk(5258), gz fpk(1) | Mentioned in exe in with other extensions: vpc,twss,tmss,adm,tetl,tmsl, tlsp,tmsu,tmsf,twpf,cani. Related to ambient sound somehow. |  |  |
| atsh | Atmosphere Spherical Harmonics | fpk(1), gz fpk(9) | Defines ambient sky lighting, or more specifically, it defines the bounce lighting from the sky. reference in: resident_common_sky.fox2 |  |
| [bnk](/BNK) | [Wwise SoundBank](https://www.audiokinetic.com/library/edge/?source=WwiseFundamentalApproach&id=understanding_soundbanks_understanding_soundbanks) | data1(1), sbp(214) | [Ravioli Game Tools](https://github.com/themeldingwars/Documentation/wiki/Ravioli-Game-Tools) | [Soundswapping](https://bobdoleowndu.github.io/mgsv/documentation/soundswapping.html) for sound swaps, and to replace sounds with new ones, use this tool instead: [Sound Replacement Tool](https://www.nexusmods.com/metalgearsolidvtpp/mods/826) |
| bnd | Bounder (fox2) | fpkd(19) gz fpkd(30) | [FoxTool](/FoxTool) | NavxSquareGraphBounderData , on vehicles. Only used in GZ. |
| caar | Camera Animation Archive | fpk(9) | Contains .cani? Likely similar to mtar for camera animations. |  |
| cani | Camera Animation | gz fpk(92) | Likely similar to .gani for camera animations. |  |
| chnk | mtar(251) | A chunk of data with an unknown purpose belonging to an Mtar Type 2 file. Extension named by MtarTool author |  |  |
| clo | Cloth Configuration File (fox2) | fpkd(25) | [FoxTool](/FoxTool) | SimClothSettingData |
| dat | QAR Archive | master | [QAR Tool](http://forum.xentax.com/viewtopic.php?f=10&t=12407&p=124477#p124477), [GzsTool](/GzsTool) | Main file archives Quark Archive? |
| dat | fox file system data XML | Chunk0(1), \0\00(1) | Any text editor | Plain XML with extension .dat. In the root of some Qar files. |
| [dat](/WMV) | WMV | master | Video |  |
| des | Destruction data (fox2) | fpkd(32) | [FoxTool](/FoxTool) | Destruction data set file. |
| [dfrm](/DFRM) | Deformation | fpk(16) | Deformation data related to avatar customization. |  |
| ends | EndingSettingsFile | fpk(21), gz fpk(6) | UiGraphEntry rawfiles, ending settings. ending_nuke.fox2,ending_okb.fox2... |  |
| enchnk | mtar(6099) | A chunk of animation at the bottom of an Mtar Type 2 file. Tied to a .gani file. Should be brought along with a swapped .gani file. Extension named by MtarTool author. |  |  |
| evf | EvfFile (fox2) | fpkd(1), gz fpkd(45) | [FoxTool](/FoxTool) | Event data p51_010300_000_snd_000.evf sole example for some demo. lots of prefixes in exe .ag.evf,.cc.evf,.fx.evf,.sd.evf,.vo.evf |
| exchnk | mtar(4748) | An extra chunk of animation tied to a .gani file from an Mtar Type 2 file. If the .gani file is swapped this should be brought along with it. Extension named by MtarTool author. |  |  |
| [fclo](/FCLO) | fpk(49) | Variant/relation of cloth settings? mentioned in exe in section along with .sim,.clo |  |  |
| [fcnp](/FCNP) | ConnectPointFile | fpk(1785) | [FcnpTool](https://github.com/BobDoleOwndU/FcnpTool) | Defines positions on a model where meshes and effects can be attached. |
| fdes | FoxDestruction | fpk(44) | Solid body data file (Binary destruction settings. Relation to.des) |  |
| ffnt | Fox Font | data1(6) | FfntTool |  |
| [fmdl](/FMDL) | FmdlFile | fpk(14384) | [Fmdl Studio v2](https://github.com/BobDoleOwndU/FMDL-Studio-v2) | Model, includes mesh, bone, and material data. |
| [fmtt](https://mgsvmoddingwiki.github.io/FMTT) | Material parameters | data1(2) | [FoxKit](https://github.com/youarebritish/FoxKit/) | GrTools.SetMaterialParamBinary |
| fnt | Font | fpk(7) | UiFontDataElement entity, fontFile common_art.fox2,*_art.fox2 In exe section with uil,uif,uia,fnt,utxl |  |
| fox2 | DataSetFile2 | fpkd(75167), gz fpkd(450) | [FoxTool](/FoxTool) | Translated comment in pc init.lua 'Object arrangement / property data file' |
| fpk | Fox Package | Chunks(16637) | [FPK Tool](http://forum.xentax.com/viewtopic.php?f=10&t=12407&p=110644#p110644), [GzsTool](/GzsTool) | Usually contains compiled files that have no associated editing tools. Must have a matching fpkd (which may be empty) |
| fpkd | Fox Package Data | Chunks(16637) | [FPK Tool](http://forum.xentax.com/viewtopic.php?f=10&t=12407&p=110644#p110644), [GzsTool](/GzsTool) | Archive that allows changes to physics or sound associations; data archive. Must have a matching fpk (which may be empty) |
| fpkl | Fox Package Link | fpk(1), gz fpk(3) | Any text editor | Only one instance in chunk0 col_common_tpp.fpk Seems to define required files to load. |
| frdv | HelpBoneFile | fpk(664) | Related to helper bone rotations. |  |
| [frig](/FRIG) | RigFile | fpk(233) gz fpk(1) | [FoxLib](https://github.com/youarebritish/FoxLib) | Defines bone groups for IK and animations. |
| frl | RailFile | fpk(496) | Similar to routes, used for vehicle travel plans and long-range reconnaissance patrols (LRRP). |  |
| frld | RailUniqueIdFile | fpkd(496) | Defines hashed IDs for rails in .frl files. |  |
| [frt](/FRT) | TppRouteSet | fpk(476) | [FoxKit](https://github.com/youarebritish/FoxKit/) | Defines AI navigation route and events. |
| fsd | Facial Setting Data | fpkd(212) | [FoxTool](/FoxTool) |  |
| [fsm](/FSM) | Fox Stream Movie | Chunks(235), fpk(1) | [FsmTool](https://github.com/BobDoleOwndU/FsmTool) (currently only extracts sounds) | Demo / Cutscene raw animation tracks and events. |
| fsop | Fox Shader Object(?) Pack | data1(4) | Shader source code in HLSL format. |  |
| fstb | StageBlockFile | fpk(3) | Specifies fpks to load in a level and which small block indices they correspond to. |  |
| ftdp | FoxTerrainDecalPackFile | fpk(732) | Defines decals used by the terrain. |  |
| [ftex](/FTEXS) | Fox Texture | Textures, pftxs(88957), fpk(2) | FtexTool |  |
| [ftexs](/FTEXS) | Fox Sub-texture | Textures, pftxs(89005) | FtexTool | Includes .1.ftexs,....6.ftexs |
| [fv2](/FV2) | FormVariationFile2 | fpk(2280) | [FvTwool](https://github.com/BobDoleOwndU/FvTwool) | Defines an appearance variation, including texture swaps and attachable meshes. |
| gani | AnimFile | mtar(7933), gz fpk(260) | Generic animation file (in-game characters, environment, etc.) |  |
| geobv | GeoBoundingVolumeFile | fpk(26) | Level collision grid set |  |
| geom | GeoGeomFile | fpk(9818) | Generic collision data. Includes definition of fulton ceilings. |  |
| geoms | GeoxGeomSetFile | fpk(3464) | Level collision data. .geom but not specific to a model. |  |
| gpfp | GeoPathFixedPackFile | fpk(2270) | Player obstacle traversal arrays (climbing, jumping, taking cover, etc.) |  |
| [grxla](/GRXLA) | LightArrayFile, TppLightProbeArray | fpk(8880) | [GrxArrayTool](https://github.com/kapuragu/GrxArrayTool) | Binary light array. They can contain either an array of light probes, or arrays of Point Lights and/or Spot Lights. |
| [grxoc](/GRXLA) | OccluderArrayFile | fpk(95) | [GrxArrayTool](https://github.com/kapuragu/GrxArrayTool) | Binary occluder array file. Technically a .grxla file with occluder entries. |
| gskl | GeoGsklFile | fpk(394) | Rigged skeletal collision (for mechs) |  |
| htre | TerrainTileFile | fpk(8305) | [FoxKit](https://github.com/youarebritish/FoxKit/) | Terrain tile data, including heightmap, material select map, and material ID map. |
| json | json | data1(1), data_02.g0s(38) | Any text editor |  |
| lad | Lip Adjust Data (fox2) | gz fpkd(12) | [FoxTool](/FoxTool) | In-game dialogue lip sync sound definition data. |
| ladb | LadbFile | fpk(241) | Binary version of .lad |  |
| las | gz fpk(1) | [FoxTool](/FoxTool) | Seems to be alias for .fox2 Other references to .las files are via entityLinks in same manner as fox2 And references to .las seem to be to equivalent named .fox2 The single GZ .las is just a .fox file. |  |
| [lba](/LBA) | Locator Binary Array | fpk(14622), gz fpk(4) | FoxLib](https://github.com/youarebritish/FoxLib) | Location data used to place gimmicks. |
| [lng](/Lang_Files) | LangFile | fpkd(64) | [LangTool](https://mgsvmoddingwiki.github.io/LangTool) | Localized text mostly used for UI.Usage. Tpp Includes language prefix (ex .eng.lng), GZ suffix (.lng#eng) eng,fre,ger,ita,jpn,por,rus,spa (GZ deu instead of ger) Files typically located under "Assets   pp\pack\ui\lang". |
| [lng2](/Lang_Files) | Language 2 | fpk(240) | [LangTool](https://mgsvmoddingwiki.github.io/LangTool) | See lng table entry. |
| lpsh | Light Probe Spherical Harmonics | fpk(8245) | Ambient light data encoded into second-order spherical harmonics. |  |
| ls | Lip Sync | .sab, .stp | Lip sync track file. In the .sab for embedded sounds, in the .stp for streamed sounds in TPP, only in the .sab in GZ for all sounds. The .sab version is slightly different. |  |
| [lua](/Lua) | Lua | data1(120), fpkd(1081) | Any text editor | Open source scripting language used by the game. For more info check the [Lua documentation page](https://www.lua.org/docs.html). |
| mbl | Mother Base Layout | fpk(47) | Layout of the UI iDroid map of Mother Base. |  |
| mog | MotionGraphFile | fpk(184) | Motion graph Handles animation states and blending |  |
| [mtar](/MTAR) | Motion Archive | fpk(910), gz fpk(18) | [MtarTool](https://mgsvmoddingwiki.github.io/MtarTool) | Contains .gani,.chnk,.enchnk,.exchnk,.trk (All extensions except for .gani named by MtarTool author). |
| mtard | Motion Archive Data? | fpk(16) |  |  |
| [nav2](/NAV2) | NavNavigationFile | fpk(1634) | [Nav2Parser](https://github.com/BobDoleOwndU/Nav2Parser) | NavxNavBlock entity, filePath .1.nav2 (exe) |
| [nta](/NTA) | NavTacticalAction | fpk(163) | Navigation related. Indicates points and actions of traversal, such as ladders and steps. Used by NPCs. In exe section with classes or entities with Navigation in name. |  |
| [obr](/OBR) | Object Brush | fpk(18) | Positions for grass, shrubs, pebbles, and other miscellaneous terrain decorations. |  |
| [obrb](/OBRB) | Object Brush Block | fpk(8192) | Positions for grass, shrubs, pebbles, and other miscellaneous terrain tile decorations. |  |
| parts | Model Description data (fox2) | fpkd(3784) | [FoxTool](/FoxTool) | Character, gimmick, mecha, item etc. model and additional file assembler |
| pcsp | PrecomputeSkyFile | fpk(1) | [FoxKit](https://github.com/youarebritish/FoxKit/) | Related to TppAtmosphere entity, reference in: resident_common_sky.fox2 Contains look-up table of precomputed atmospheric scattering coefficients. |
| [pftxs](/PFTXS) | Packed Fox Textures | Chunks(3068) | [GzsTool](/GzsTool) | Contains .ftex,ftexs Must match an fpk (but not all fpks have pftxs) |
| ph | Physics | fpkd(609) | [FoxTool](/FoxTool) | Physics hitbox definition data. |
| phsd | Physics Sound Data | fpkd(591) | [FoxTool](/FoxTool) | Physics sound definition data. |
| [rdf](/RDF) | Radio Data File | fpk(199) | [RdfTool](https://github.com/kapuragu/RdfTool) | Defines real-time support radio dialogue data. ("Subject onboard") |
| sab | Sound Additional Binaries? | sbp(39) | [StpTool](https://github.com/kapuragu/StpTool) | In GZ, has .st (subtitle id string) and .ls (lip sync) files for both embedded and streamed voice clips. In TPP. has .ls files for embedded voice clips only. |
| sand | SandFile | fpk(223) | Stream animation node data. Assigns tracks from .fsm Fox Stream Movie to bones and objects in a node tree. |  |
| sani | Stream Animation | fpk(1), data_02.g0s(4) gz fpk(38) | [FsmTool](https://github.com/BobDoleOwndU/FsmTool) (currently only divides into chunks) | GZ includes .sani#eng,.sani#jpn .fsm-alias, in GZ used for subtitle timing. |
| sbp | Sound Bank Package | Chunks(212) | [GzsTool](/GzsTool) | Contains .bnk,.sab,.stp |
| sdf | SoundDataFile (fox2) | fpkd(484) | [FoxTool](/FoxTool) | DataSet that loads .sbp soundbanks. |
| sim | SimBinaryFile | fpkd(493) | [FoxTool](/FoxTool) | Simulation physics data |
| [spch](/SPCH) | TppSpeechFile | fpk(46) | [SpchTool](https://github.com/kapuragu/SpchTool) | Defines in-game world scriptable gameobject dialogue. (Enemy conversations, prisoner monolgues, etc.) |
| st | SubTitle | .sab(GZ only) | Contains the subtitle id string for the sound file with the embedded string that matches the hash of the .st file name. |  |
| stp | Streamed Package | sbp(187) | [StpTool](https://github.com/kapuragu/StpTool) | Contains the streamed audio files for the soundbank. In TPP, .wem sound files are also paired with newer versions of .ls files from .sab. |
| subp | SubtitlesPackageFile | data1(489), fpk(89) | [SubpTool](https://mgsvmoddingwiki.github.io/SubpTool) | Defines subtitle data. |
| tcvp | CoverPointFile | fpk(232) | [TcvpTool](https://github.com/kapuragu/TcvpTool) | TppCoverPointFileTransform entity on MB, defines positions of cover points. DataSet equivalent entity is TppCoverPoint. |
| tgt | Target | fpkd(2151) | [FoxTool](/FoxTool) | Defines hitboxes for characters and props .parts. |
| [trap](/TRAP) | GeoTrapFile | fpk(617) | [TrapTool](https://github.com/kapuragu/TrapTool) | Level trigger definition file. Includes camera modes, death zones and mission area boundaries. |
| tre2 | TerrainFile | fpk(3) | Low-resolution LOD data for a level's terrain. |  |
| trk | Animation Track | mtar(251) | Description of all main animation tracks for an Mtar Type 2 file. Extension named by MtarTool author |  |
| twpf | ParametersFile | fpk(5) | TppLocationData entity, weatherParametersFile |  |
| uia | UiAnimFile | fpk(3755), gz fpk(1813) | UI model asset image transition data? |  |
| uif | UiFile | fpk(1979) gzfpk(600) | UI model asset base image? |  |
| [uigb](/UIGB) | UiGraphFile | fpk(289) | UI graph asset? |  |
| [uilb](/UILB) | UiLayoutFile | fpk(1904) | Based on vehicle .fox2 DataSet entries.[[2]](#references) |  |
| veh | Vehicle | fpkd(87) | [FoxTool](/FoxTool) |  |
| [vfx](/VFX) | FxVfxFile | fpkd(6378) | [VfxTool](https://github.com/youarebritish/VfxTool) | Visual effect graph. |
| [vfxlb](/VFXLB) | fpkd(133) | FxLocatorArrayData entity, vfxlbFile lba for vfx? |  |  |
| vfxlf | VFX Lens Flare (fox2) | fpkd(846) |  |  |
| wem | Wwise Encoded Media | Chunks(255) |  |  |

## Unique to GZ?

| Extension | Full Name | Location(count) | Tool | Description |
|---|---|---|---|---|
| fagx | Motion graph / layer definition file (fox) | gz fpks(1) | GZ RegisterPackageExtensionInfo |  |
| fdmg | (fox) | gz fpkd(2) | GZ only, Damage related |  |
| [fova](/FV2) | Form Variation | gz fpk(110) | GZ, superceded in TPP by fv2 |  |
| fox | data_02.g0s(3) | Any text editor | XML, GZ only, superceded in TPP by fox2 |  |
| [g0s](/WMV) | Qar Archive Gz format | data_01.g0s, data_02.g0s files | [GzsTool 0.2](/GzsTool) |  |
| g0s | WMV | data_00.g0s file |  |  |
| lani | LaniFile | gz fpk(456) | Lip animation Reference in init.lua RegisterPackageExtensionInfo Reference in .lad files |  |
| tlsp | gz fpk(2) | GZ |  |  |
| tmsp | gz fpk(2) | GZ |  |  |
| tmsf | gz fpk(1) | GZ |  |  |
| tmsl | gz fpk(1) | GZ |  |  |
| tmsu | gz fpk(1) | GZ |  |  |
| vdp | Vehicle Driving Parameter | gz fpkd(20) | [FoxTool](/FoxTool) | GZ |
| vfxdb | gz fpk(30) | GZ, .vfx class database? |  |  |
| vpc | data_02.g0s(3) | GZ |  |  |
| Other[[3]](#references) |  |  |  |  |
| ag | exe ag.evf |  |  |  |
| aia | exe |  |  |  |
| aib | AI behavior / definition file | Reference in init.lua RegisterPackageExtensionInfo Translated from comment in PT init.lua |  |  |
| aibc | AI behavior category file | Reference in init.lua RegisterPackageExtensionInfo Translated from comment in PT init.lua |  |  |
| aig | exe |  |  |  |
| aigc | exe |  |  |  |
| aim | exe AimCamera? |  |  |  |
| aip | exe |  |  |  |
| ait | exe |  |  |  |
| cc | exe cc.evf |  |  |  |
| col | RegisterExtensionInfo<br/>categories={"Target"} |  |  |  |
| csnav | exe |  |  |  |
| demo | Editor format? RegisterExtensionInfo<br/>categories={"Target"} |  |  |  |
| demox | RegisterExtensionInfo categories={"Target"} |  |  |  |
| dnav | exe |  |  |  |
| dnav2 | exe |  |  |  |
| ese | exe |  |  |  |
| evb | RegisterExtensionInfo<br/>categories={"Target"} RegisterPackageExtensionInfo |  |  |  |
| fag | RegisterPackageExtensionInfo |  |  |  |
| fage | Motion graph / graph piece file | RegisterPackageExtensionInfo Translated from comment in PT init.lua |  |  |
| fago | Motion Chart | RegisterPackageExtensionInfo Translated from comment in PT init.lua |  |  |
| fagp | Motion graph / route graph file | exe Translated from comment in PT init.lua |  |  |
| fcnpx | Parts Builder · Extended Connect Point File | EditableBlockPackage. RegisterPackageExtensionInfo Translated from comment in PT init.lua |  |  |
| fmdlb | RegisterExtensionInfo<br/>categories={"Target"} |  |  |  |
| fox_export | exe |  |  |  |
| fsml | Reference in init.lua RegisterPackageExtensionInfo |  |  |  |
| fx | exe fx.evf |  |  |  |
| fxp | Fox Project | Fox Editor |  |  |
| info | RegisterExtensionInfo<br/>categories={"Target"} |  |  |  |
| path | exe |  |  |  |
| mas | SetLanguageGroupExtention{<br/>group={"Sound"}<br/><br/>RegisterExtensionInfo{<br/>categories={"Target","Language"} |  |  |  |
| mtl | exe |  |  |  |
| nav | RegisterExtensionInfo<br/>categories={"Target"} |  |  |  |
| phep | exe |  |  |  |
| qar | exe |  |  |  |
| rbs | exe |  |  |  |
| rdb | exe |  |  |  |
| rnav | exe |  |  |  |
| sad | SetLanguageGroupExtention{<br/>group={"Sound"}<br/><br/>RegisterExtensionInfo{<br/>categories={"Language"} |  |  |  |
| sd | exe sd.evf |  |  |  |
| sh | exe (but no in alphabetical with the others in the section) |  |  |  |
| simep | exe |  |  |  |
| snav | exe |  |  |  |
| stm | SetLanguageGroupExtention{<br/>group={"Sound"}<br/><br/>RegisterExtensionInfo{<br/>categories={"Target","Language"} |  |  |  |
| sub | exe |  |  |  |
| tetl | RegisterExtensionInfo |  |  |  |
| tevt |  |  |  |  |
| tmss | RegisterExtensionInfo |  |  |  |
| trmtl | exe, near TerrainRender |  |  |  |
| txt | exe |  |  |  |
| uig | UI Graph | EditableBlockPackage. RegisterPackageExtensionInfo |  |  |
| uil | UI Layout | EditableBlockPackage. RegisterPackageExtensionInfo |  |  |
| utxl | exe next to uil,uif,uia,fnt |  |  |  |
| vfxbin | exe FxVfxBinaryFile |  |  |  |
| vnav | exe |  |  |  |
| vo | exe vo.evf |  |  |  |
| xml | Extensible Markup Language | Any text editor | This is may appear to not be used anywhere in the game files, but is listed in the .exe and the fox2 files are just compiled XML files.[[4]](#references) |  |


## References

1. Counts for archives like fpks contains duplicates. Counts only include files from \master, not master\0,\1 Counts for formats common to both TPP and GZ only added where ineresting (GZ only formats complete counts)
2. Source: `chunk1.dat/Assets/tpp/pack/vehicle/veh_rl_east_wav.fpkd/Assets/tpp/level_asset/vehicle/veh_rl_east_wav.fox2`

    ```xml
    <entity class="UiGraphEntry" classVersion="1" addr="0x073F06A0" unknown1="96" unknown2="3058">
      <staticProperties>
        <property name="name" type="String" container="StaticArray" arraySize="1">
          <value>veh_bd_east_wav|sight_vhcl_east_wav|UiGraphEntry0000</value>
        </property>
        <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
          <value>0x02D7FC10</value>
        </property>
        <property name="files" type="FilePtr" container="DynamicArray" />
        <property name="rawFiles" type="FilePtr" container="DynamicArray" arraySize="3">
          <value>/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_wpscope_vehicle_sav0_b.uilb</value>
          <value>/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_vhcl_def_FPS_bs.uilb</value>
          <value>/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_wpscope_vehicle_common.uilb</value>
        </property>
      </staticProperties>
      <dynamicProperties />
    </entity>
    ```
3.  File types from GZ (to be split further) or referenced in exe or lua
    but not yet found/extracted as seperate files.
4.  <https://github.com/Atvaark/FoxTool>