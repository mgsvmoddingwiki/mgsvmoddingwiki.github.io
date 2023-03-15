---
title: File Formats
permalink: /File_Formats/
tags: [Files, File Formats]
---

This article lists the presumed names of extensions used in MGSV, as
well as some basic descriptions. The full list of up-to-date templates
can be found [here](https://github.com/kapuragu/FoxEngineTemplates).

<table>
<tbody>
<tr class="odd">
<td><p><b>Extension</b></p></td>
<td><p><b>Full Name</b></p></td>
<td><p><strong>Location(count)</strong> <ref>Counts for archives like fpks contains duplicates. Counts only include files from \master, not master\0,\1</p>
<p>Counts for formats common to both TPP and GZ only added where ineresting (GZ only formats complete counts) </ref></p></td>
<td><p><strong>Tool</strong></p></td>
<td><p><b>Description</b></p></td>
</tr>
<tr class="even">
<td><p>adm</p></td>
<td></td>
<td><p>fpk(5258), gz fpk(1)</p></td>
<td></td>
<td><p>Mentioned in exe in with other extensions:</p>
<p>vpc,twss,tmss,adm,tetl,tmsl,</p>
<p>tlsp,tmsu,tmsf,twpf,cani.</p>
<p>Related to ambient sound somehow.</p></td>
</tr>
<tr class="odd">
<td><p>atsh</p></td>
<td><p>Atmosphere Spherical Harmonics</p></td>
<td><p>fpk(1), gz fpk(9)</p></td>
<td></td>
<td><p>Defines ambient sky lighting, or more specifically, it defines the bounce lighting from the sky.</p>
<p>reference in: resident_common_sky.fox2</p></td>
</tr>
<tr class="even">
<td><p><a href="/BNK" title="wikilink">bnk</a></p></td>
<td><p><a href="https://www.audiokinetic.com/library/edge/?source=WwiseFundamentalApproach&amp;id=understanding_soundbanks_understanding_soundbanks">Wwise SoundBank</a></p></td>
<td><p>data1(1), sbp(214)</p></td>
<td><p><a href="https://github.com/themeldingwars/Documentation/wiki/Ravioli-Game-Tools">Ravioli Game Tools</a></p></td>
<td><p><a href="https://bobdoleowndu.github.io/mgsv/documentation/soundswapping.html">Soundswapping</a> for sound swaps, and to replace sounds with new ones, use this tool instead: <a href="https://www.nexusmods.com/metalgearsolidvtpp/mods/826">Sound Replacement Tool</a></p></td>
</tr>
<tr class="odd">
<td><p>bnd</p></td>
<td><p>Bounder (fox2)</p></td>
<td><p>fpkd(19) gz fpkd(30)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>NavxSquareGraphBounderData ,</p>
<p>on vehicles. Only used in GZ.</p></td>
</tr>
<tr class="even">
<td><p>caar</p></td>
<td><p>Camera Animation Archive</p></td>
<td><p>fpk(9)</p></td>
<td></td>
<td><p>Contains .cani? Likely similar to mtar for camera animations.</p></td>
</tr>
<tr class="odd">
<td><p>cani</p></td>
<td><p>Camera Animation</p></td>
<td><p>gz fpk(92)</p></td>
<td></td>
<td><p>Likely similar to .gani for camera animations.</p></td>
</tr>
<tr class="even">
<td><p>chnk</p></td>
<td></td>
<td><p>mtar(251)</p></td>
<td></td>
<td><p>A chunk of data with an unknown purpose belonging to an Mtar Type 2 file. Extension named by MtarTool author</p></td>
</tr>
<tr class="odd">
<td><p>clo</p></td>
<td><p>Cloth Configuration File (fox2)</p></td>
<td><p>fpkd(25)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>SimClothSettingData</p></td>
</tr>
<tr class="even">
<td><p>dat</p></td>
<td><p>QAR Archive</p></td>
<td><p>master</p></td>
<td><p><a href="http://forum.xentax.com/viewtopic.php?f=10&amp;t=12407&amp;p=124477#p124477">QAR Tool</a>, <a href="/GzsTool" title="wikilink">GzsTool</a></p></td>
<td><p>Main file archives Quark Archive?</p></td>
</tr>
<tr class="odd">
<td><p>dat</p></td>
<td><p>fox file system data XML</p></td>
<td><p>Chunk0(1), \0\00(1)</p></td>
<td><p>Any text editor</p></td>
<td><p>Plain XML with extension .dat. In the root of some Qar files.</p></td>
</tr>
<tr class="even">
<td><p><a href="/WMV" title="wikilink">dat</a></p></td>
<td><p>WMV</p></td>
<td><p>master</p></td>
<td></td>
<td><p>Video</p></td>
</tr>
<tr class="odd">
<td><p>des</p></td>
<td><p>Destruction data (fox2)</p></td>
<td><p>fpkd(32)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>Destruction data set file.</p></td>
</tr>
<tr class="even">
<td><p><a href="/DFRM" title="wikilink">dfrm</a></p></td>
<td><p>Deformation</p></td>
<td><p>fpk(16)</p></td>
<td></td>
<td><p>Deformation data related to avatar customization.</p></td>
</tr>
<tr class="odd">
<td><p>ends</p></td>
<td><p>EndingSettingsFile</p></td>
<td><p>fpk(21), gz fpk(6)</p></td>
<td></td>
<td><p>UiGraphEntry rawfiles, ending settings.</p>
<p>ending_nuke.fox2,ending_okb.fox2...</p></td>
</tr>
<tr class="even">
<td><p>enchnk</p></td>
<td></td>
<td><p>mtar(6099)</p></td>
<td></td>
<td><p>A chunk of animation at the bottom of an Mtar Type 2 file. Tied to a .gani file. Should be brought along with a swapped .gani file. Extension named by MtarTool author.</p></td>
</tr>
<tr class="odd">
<td><p>evf</p></td>
<td><p>EvfFile (fox2)</p></td>
<td><p>fpkd(1), gz fpkd(45)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>Event data</p>
<p>p51_010300_000_snd_000.evf sole example for some demo.</p>
<p>lots of prefixes in exe</p>
<p>.ag.evf,.cc.evf,.fx.evf,.sd.evf,.vo.evf</p></td>
</tr>
<tr class="even">
<td><p>exchnk</p></td>
<td></td>
<td><p>mtar(4748)</p></td>
<td></td>
<td><p>An extra chunk of animation tied to a .gani file from an Mtar Type 2 file. If the .gani file is swapped this should be brought along with it. Extension named by MtarTool author.</p></td>
</tr>
<tr class="odd">
<td><p><a href="/FCLO" title="wikilink">fclo</a></p></td>
<td></td>
<td><p>fpk(49)</p></td>
<td></td>
<td><p>Variant/relation of cloth settings? mentioned in exe in section along with .sim,.clo</p></td>
</tr>
<tr class="even">
<td><p><a href="/FCNP" title="wikilink">fcnp</a></p></td>
<td><p>ConnectPointFile</p></td>
<td><p>fpk(1785)</p></td>
<td><p><a href="https://github.com/BobDoleOwndU/FcnpTool">FcnpTool</a></p></td>
<td><p>Defines positions on a model where meshes and effects can be attached.</p></td>
</tr>
<tr class="odd">
<td><p>fdes</p></td>
<td><p>FoxDestruction</p></td>
<td><p>fpk(44)</p></td>
<td></td>
<td><p>Solid body data file (Binary destruction settings. Relation to.des)</p></td>
</tr>
<tr class="even">
<td><p>ffnt</p></td>
<td><p>Fox Font</p></td>
<td><p>data1(6)</p></td>
<td><p><a href="/FfntTool" title="wikilink">FfntTool</a></p></td>
<td></td>
</tr>
<tr class="odd">
<td><p><a href="/FMDL" title="wikilink">fmdl</a></p></td>
<td><p>FmdlFile</p></td>
<td><p>fpk(14384)</p></td>
<td><p><a href="https://github.com/BobDoleOwndU/FMDL-Studio-v2">Fmdl Studio v2</a></p></td>
<td><p>Model, includes mesh, bone, and material data.</p></td>
</tr>
<tr class="even">
<td><p><a href="/FMTT" title="wikilink">fmtt</a></p></td>
<td><p>Material parameters</p></td>
<td><p>data1(2)</p></td>
<td><p><a href="https://github.com/youarebritish/FoxKit/">FoxKit</a></p></td>
<td><p>GrTools.SetMaterialParamBinary</p></td>
</tr>
<tr class="odd">
<td><p>fnt</p></td>
<td><p>Font</p></td>
<td><p>fpk(7)</p></td>
<td></td>
<td><p>UiFontDataElement entity, fontFile</p>
<p>common_art.fox2,*_art.fox2</p>
<p>In exe section with uil,uif,uia,fnt,utxl</p></td>
</tr>
<tr class="even">
<td><p>fox2</p></td>
<td><p>DataSetFile2</p></td>
<td><p>fpkd(75167), gz fpkd(450)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>Translated comment in pc init.lua</p>
<p>'Object arrangement / property data file'</p></td>
</tr>
<tr class="odd">
<td><p>fpk</p></td>
<td><p>Fox Package</p></td>
<td><p>Chunks(16637)</p></td>
<td><p><a href="http://forum.xentax.com/viewtopic.php?f=10&amp;t=12407&amp;p=110644#p110644">FPK Tool</a>, <a href="/GzsTool" title="wikilink">GzsTool</a></p></td>
<td><p>Usually contains compiled files that have no associated editing tools. Must have a matching fpkd (which may be empty)</p></td>
</tr>
<tr class="even">
<td><p>fpkd</p></td>
<td><p>Fox Package Data</p></td>
<td><p>Chunks(16637)</p></td>
<td><p><a href="http://forum.xentax.com/viewtopic.php?f=10&amp;t=12407&amp;p=110644#p110644">FPK Tool</a>, <a href="/GzsTool" title="wikilink">GzsTool</a></p></td>
<td><p>Archive that allows changes to physics or sound associations; data archive. Must have a matching fpk (which may be empty)</p></td>
</tr>
<tr class="odd">
<td><p>fpkl</p></td>
<td><p>Fox Package Link</p></td>
<td><p>fpk(1), gz fpk(3)</p></td>
<td><p>Any text editor</p></td>
<td><p>Only one instance in chunk0 col_common_tpp.fpk</p>
<p>Seems to define required files to load.</p></td>
</tr>
<tr class="even">
<td><p>frdv</p></td>
<td><p>HelpBoneFile</p></td>
<td><p>fpk(664)</p></td>
<td></td>
<td><p>Related to helper bone rotations.</p></td>
</tr>
<tr class="odd">
<td><p><a href="/FRIG" title="wikilink">frig</a></p></td>
<td><p>RigFile</p></td>
<td><p>fpk(233) gz fpk(1)</p></td>
<td><p><a href="https://github.com/youarebritish/FoxLib">FoxLib</a></p></td>
<td><p>Defines bone groups for IK and animations.</p></td>
</tr>
<tr class="even">
<td><p>frl</p></td>
<td><p>RailFile</p></td>
<td><p>fpk(496)</p></td>
<td></td>
<td><p>Similar to routes, used for vehicle travel plans and long-range reconnaissance patrols (LRRP).</p></td>
</tr>
<tr class="odd">
<td><p>frld</p></td>
<td><p>RailUniqueIdFile</p></td>
<td><p>fpkd(496)</p></td>
<td></td>
<td><p>Defines hashed IDs for rails in .frl files.</p></td>
</tr>
<tr class="even">
<td><p><a href="/Frt" title="wikilink">frt</a></p></td>
<td><p>TppRouteSet</p></td>
<td><p>fpk(476)</p></td>
<td><p><a href="https://github.com/youarebritish/FoxKit/">FoxKit</a></p></td>
<td><p>Defines AI navigation route and events.</p></td>
</tr>
<tr class="odd">
<td><p>fsd</p></td>
<td><p>Facial Setting Data</p></td>
<td><p>fpkd(212)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td></td>
</tr>
<tr class="even">
<td><p><a href="/FSM" title="wikilink">fsm</a></p></td>
<td><p>Fox Stream Movie</p></td>
<td><p>Chunks(235), fpk(1)</p></td>
<td><p><a href="https://github.com/BobDoleOwndU/FsmTool">FsmTool</a></p>
<p>(currently only extracts sounds)</p></td>
<td><p>Demo / Cutscene raw animation tracks and events.</p></td>
</tr>
<tr class="odd">
<td><p>fsop</p></td>
<td><p>Fox Shader Object(?) Pack</p></td>
<td><p>data1(4)</p></td>
<td></td>
<td><p>Shader source code in HLSL format.</p></td>
</tr>
<tr class="even">
<td><p>fstb</p></td>
<td><p>StageBlockFile</p></td>
<td><p>fpk(3)</p></td>
<td></td>
<td><p>Specifies fpks to load in a level and which small block indices they correspond to.</p></td>
</tr>
<tr class="odd">
<td><p>ftdp</p></td>
<td><p>FoxTerrainDecalPackFile</p></td>
<td><p>fpk(732)</p></td>
<td></td>
<td><p>Defines decals used by the terrain.</p></td>
</tr>
<tr class="even">
<td><p><a href="/FTEX/FTEXS" title="wikilink">ftex</a></p></td>
<td><p>Fox Texture</p></td>
<td><p>Textures, pftxs(88957),</p>
<p>fpk(2)</p></td>
<td><p><a href="/FtexTool" title="wikilink">FtexTool</a></p></td>
<td></td>
</tr>
<tr class="odd">
<td><p><a href="/FTEX/FTEXS" title="wikilink">ftexs</a></p></td>
<td><p>Fox Sub-texture</p></td>
<td><p>Textures, pftxs(89005)</p></td>
<td><p><a href="/FtexTool" title="wikilink">FtexTool</a></p></td>
<td><p>Includes .1.ftexs,....6.ftexs</p></td>
</tr>
<tr class="even">
<td><p><a href="/FV2" title="wikilink">fv2</a></p></td>
<td><p>FormVariationFile2</p></td>
<td><p>fpk(2280)</p></td>
<td><p><a href="https://github.com/BobDoleOwndU/FvTwool">FvTwool</a></p></td>
<td><p>Defines an appearance variation, including texture swaps and attachable meshes.</p></td>
</tr>
<tr class="odd">
<td><p>gani</p></td>
<td><p>AnimFile</p></td>
<td><p>mtar(7933), gz fpk(260)</p></td>
<td></td>
<td><p>Generic animation file (in-game characters, environment, etc.)</p></td>
</tr>
<tr class="even">
<td><p>geobv</p></td>
<td><p>GeoBoundingVolumeFile</p></td>
<td><p>fpk(26)</p></td>
<td></td>
<td><p>Level collision grid set</p></td>
</tr>
<tr class="odd">
<td><p>geom</p></td>
<td><p>GeoGeomFile</p></td>
<td><p>fpk(9818)</p></td>
<td></td>
<td><p>Generic collision data. Includes definition of fulton ceilings.</p></td>
</tr>
<tr class="even">
<td><p>geoms</p></td>
<td><p>GeoxGeomSetFile</p></td>
<td><p>fpk(3464)</p></td>
<td></td>
<td><p>Level collision data. .geom but not specific to a model.</p></td>
</tr>
<tr class="odd">
<td><p>gpfp</p></td>
<td><p>GeoPathFixedPackFile</p></td>
<td><p>fpk(2270)</p></td>
<td></td>
<td><p>Player obstacle traversal arrays (climbing, jumping, taking cover, etc.)</p></td>
</tr>
<tr class="even">
<td><p><a href="/GRXLA" title="wikilink">grxla</a></p></td>
<td><p>LightArrayFile, TppLightProbeArray</p></td>
<td><p>fpk(8880)</p></td>
<td><p><a href="https://github.com/kapuragu/GrxArrayTool">GrxArrayTool</a></p></td>
<td><p>Binary light array. They can contain either an array of light probes, or arrays of Point Lights and/or Spot Lights.</p></td>
</tr>
<tr class="odd">
<td><p><a href="/GRXLA" title="wikilink">grxoc</a></p></td>
<td><p>OccluderArrayFile</p></td>
<td><p>fpk(95)</p></td>
<td><p><a href="https://github.com/kapuragu/GrxArrayTool">GrxArrayTool</a></p></td>
<td><p>Binary occluder array file. Technically a .grxla file with occluder entries.</p></td>
</tr>
<tr class="even">
<td><p>gskl</p></td>
<td><p>GeoGsklFile</p></td>
<td><p>fpk(394)</p></td>
<td></td>
<td><p>Rigged skeletal collision (for mechs)</p></td>
</tr>
<tr class="odd">
<td><p>htre</p></td>
<td><p>TerrainTileFile</p></td>
<td><p>fpk(8305)</p></td>
<td><p><a href="https://github.com/youarebritish/FoxKit/">FoxKit</a></p></td>
<td><p>Terrain tile data, including heightmap, material select map, and material ID map.</p></td>
</tr>
<tr class="even">
<td><p>json</p></td>
<td><p>json</p></td>
<td><p>data1(1), data_02.g0s(38)</p></td>
<td><p>Any text editor</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>lad</p></td>
<td><p>Lip Adjust Data (fox2)</p></td>
<td><p>gz fpkd(12)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>In-game dialogue lip sync sound definition data.</p></td>
</tr>
<tr class="even">
<td><p>ladb</p></td>
<td><p>LadbFile</p></td>
<td><p>fpk(241)</p></td>
<td></td>
<td><p>Binary version of .lad</p></td>
</tr>
<tr class="odd">
<td><p>las</p></td>
<td></td>
<td><p>gz fpk(1)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>Seems to be alias for .fox2</p>
<p>Other references to .las files are via entityLinks in same manner as fox2</p>
<p>And references to .las seem to be to equivalent named .fox2</p>
<p>The single GZ .las is just a .fox file.</p></td>
</tr>
<tr class="even">
<td><p><a href="/LBA" title="wikilink">lba</a></p></td>
<td><p>Locator Binary Array</p></td>
<td><p>fpk(14622), gz fpk(4)</p></td>
<td><p><a href="https://github.com/youarebritish/FoxLib">FoxLib</a></p></td>
<td><p>Location data used to place gimmicks.</p></td>
</tr>
<tr class="odd">
<td><p><a href="/Lang_Files" title="wikilink">lng</a></p></td>
<td><p>LangFile</p></td>
<td><p>fpkd(64)</p></td>
<td><p><a href="/LangTool" title="wikilink">LangTool</a></p></td>
<td><p>Localized text mostly used for UI.<a href="/Lang_Files" title="wikilink">Usage.</a></p>
<p>Tpp Includes language prefix (ex .eng.lng), GZ suffix (.lng#eng) eng,fre,ger,ita,jpn,por,rus,spa</p>
<p>(GZ deu instead of ger)</p>
<p>Files typically located under "Assets\tpp\pack\ui\lang".</p></td>
</tr>
<tr class="even">
<td><p><a href="/Lang_Files" title="wikilink">lng2</a></p></td>
<td><p>Language 2</p></td>
<td><p>fpk(240)</p></td>
<td><p><a href="/LangTool" title="wikilink">LangTool</a></p></td>
<td><p>See lng table entry.</p></td>
</tr>
<tr class="odd">
<td><p>lpsh</p></td>
<td><p>Light Probe Spherical Harmonics</p></td>
<td><p>fpk(8245)</p></td>
<td></td>
<td><p>Ambient light data encoded into second-order spherical harmonics.</p></td>
</tr>
<tr class="even">
<td><p>ls</p></td>
<td><p>Lip Sync</p></td>
<td><p>.sab, .stp</p></td>
<td></td>
<td><p>Lip sync track file. In the .sab for embedded sounds, in the .stp for streamed sounds in TPP, only in the .sab in GZ for all sounds. The .sab version is slightly different.</p></td>
</tr>
<tr class="odd">
<td><p><a href="/LUA" title="wikilink">lua</a></p></td>
<td><p>Lua</p></td>
<td><p>data1(120), fpkd(1081)</p></td>
<td><p>Any text editor</p></td>
<td><p>Open source scripting language used by the game. For more info check the <a href="https://www.lua.org/docs.html">Lua documentation page</a>.</p></td>
</tr>
<tr class="even">
<td><p>mbl</p></td>
<td><p>Mother Base Layout</p></td>
<td><p>fpk(47)</p></td>
<td></td>
<td><p>Layout of the UI iDroid map of Mother Base.</p></td>
</tr>
<tr class="odd">
<td><p>mog</p></td>
<td><p>MotionGraphFile</p></td>
<td><p>fpk(184)</p></td>
<td></td>
<td><p>Motion graph</p>
<p>Handles animation states and blending</p></td>
</tr>
<tr class="even">
<td><p><a href="/MTAR" title="wikilink">mtar</a></p></td>
<td><p>Motion Archive</p></td>
<td><p>fpk(910), gz fpk(18)</p></td>
<td><p><a href="/MtarTool" title="wikilink">MtarTool</a></p></td>
<td><p>Contains .gani,.chnk,.enchnk,.exchnk,.trk</p>
<p>(All extensions except for .gani named by MtarTool author).</p></td>
</tr>
<tr class="odd">
<td><p>mtard</p></td>
<td><p>Motion Archive Data?</p></td>
<td><p>fpk(16)</p></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td><p><a href="/nav2" title="wikilink">nav2</a></p></td>
<td><p>NavNavigationFile</p></td>
<td><p>fpk(1634)</p></td>
<td><p><a href="https://github.com/BobDoleOwndU/Nav2Parser">Nav2Parser</a></p></td>
<td><p>NavxNavBlock entity, filePath .1.nav2 (exe)</p></td>
</tr>
<tr class="odd">
<td><p><a href="/NTA" title="wikilink">nta</a></p></td>
<td><p>NavTacticalAction</p></td>
<td><p>fpk(163)</p></td>
<td></td>
<td><p>Navigation related. Indicates points and actions of traversal, such as ladders and steps. Used by NPCs.</p>
<p>In exe section with classes or entities with Navigation in name.</p></td>
</tr>
<tr class="even">
<td><p><a href="/Object_Brush_(.obr)" title="wikilink">obr</a></p></td>
<td><p>Object Brush</p></td>
<td><p>fpk(18)</p></td>
<td></td>
<td><p>Positions for grass, shrubs, pebbles, and other miscellaneous terrain decorations.</p></td>
</tr>
<tr class="odd">
<td><p><a href="/OBRB" title="wikilink">obrb</a></p></td>
<td><p>Object Brush Block</p></td>
<td><p>fpk(8192)</p></td>
<td></td>
<td><p>Positions for grass, shrubs, pebbles, and other miscellaneous terrain tile decorations.</p></td>
</tr>
<tr class="even">
<td><p>parts</p></td>
<td><p>Model Description data (fox2)</p></td>
<td><p>fpkd(3784)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>Character, gimmick, mecha, item etc. model and additional file assembler</p></td>
</tr>
<tr class="odd">
<td><p>pcsp</p></td>
<td><p>PrecomputeSkyFile</p></td>
<td><p>fpk(1)</p></td>
<td><p><a href="https://github.com/youarebritish/FoxKit/">FoxKit</a></p></td>
<td><p>Related to TppAtmosphere entity,</p>
<p>reference in: resident_common_sky.fox2</p>
<p>Contains look-up table of precomputed atmospheric scattering coefficients.</p></td>
</tr>
<tr class="even">
<td><p><a href="/PFTXS" title="wikilink">pftxs</a></p></td>
<td><p>Packed Fox Textures</p></td>
<td><p>Chunks(3068)</p></td>
<td><p><a href="/GzsTool" title="wikilink">GzsTool</a></p></td>
<td><p>Contains .ftex,ftexs Must match an fpk (but not all fpks have pftxs)</p></td>
</tr>
<tr class="odd">
<td><p>ph</p></td>
<td><p>Physics</p></td>
<td><p>fpkd(609)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>Physics hitbox definition data.</p></td>
</tr>
<tr class="even">
<td><p>phsd</p></td>
<td><p>Physics Sound Data</p></td>
<td><p>fpkd(591)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>Physics sound definition data.</p></td>
</tr>
<tr class="odd">
<td><p><a href="/RDF" title="wikilink">rdf</a></p></td>
<td><p>Radio Data File</p></td>
<td><p>fpk(199)</p></td>
<td><p><a href="https://github.com/kapuragu/RdfTool">RdfTool</a></p></td>
<td><p>Defines real-time support radio dialogue data. ("Subject onboard")</p></td>
</tr>
<tr class="even">
<td><p>sab</p></td>
<td><p>Sound Additional Binaries?</p></td>
<td><p>sbp(39)</p></td>
<td><p><a href="https://github.com/kapuragu/StpTool">StpTool</a></p></td>
<td><p>In GZ, has .st (subtitle id string) and .ls (lip sync) files for both embedded and streamed voice clips. In TPP. has .ls files for embedded voice clips only.</p></td>
</tr>
<tr class="odd">
<td><p>sand</p></td>
<td><p>SandFile</p></td>
<td><p>fpk(223)</p></td>
<td></td>
<td><p>Stream animation node data. Assigns tracks from .fsm Fox Stream Movie to bones and objects in a node tree.</p></td>
</tr>
<tr class="even">
<td><p>sani</p></td>
<td><p>Stream Animation</p></td>
<td><p>fpk(1), data_02.g0s(4)</p>
<p>gz fpk(38)</p></td>
<td><p><a href="https://github.com/BobDoleOwndU/FsmTool">FsmTool</a></p>
<p>(currently only divides into chunks)</p></td>
<td><p>GZ includes .sani#eng,.sani#jpn .fsm-alias, in GZ used for subtitle timing.</p></td>
</tr>
<tr class="odd">
<td><p>sbp</p></td>
<td><p>Sound Bank Package</p></td>
<td><p>Chunks(212)</p></td>
<td><p><a href="/GzsTool" title="wikilink">GzsTool</a></p></td>
<td><p>Contains .bnk,.sab,.stp</p></td>
</tr>
<tr class="even">
<td><p>sdf</p></td>
<td><p>SoundDataFile (fox2)</p></td>
<td><p>fpkd(484)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>DataSet that loads .sbp soundbanks.</p></td>
</tr>
<tr class="odd">
<td><p>sim</p></td>
<td><p>SimBinaryFile</p></td>
<td><p>fpkd(493)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>Simulation physics data</p></td>
</tr>
<tr class="even">
<td><p><a href="/SPCH" title="wikilink">spch</a></p></td>
<td><p>TppSpeechFile</p></td>
<td><p>fpk(46)</p></td>
<td><p><a href="https://github.com/kapuragu/SpchTool">SpchTool</a></p></td>
<td><p>Defines in-game world scriptable gameobject dialogue. (Enemy conversations, prisoner monolgues, etc.)</p></td>
</tr>
<tr class="odd">
<td><p>st</p></td>
<td><p>SubTitle</p></td>
<td><p>.sab(GZ only)</p></td>
<td></td>
<td><p>Contains the subtitle id string for the sound file with the embedded string that matches the hash of the .st file name.</p></td>
</tr>
<tr class="even">
<td><p>stp</p></td>
<td><p>Streamed Package</p></td>
<td><p>sbp(187)</p></td>
<td><p><a href="https://github.com/kapuragu/StpTool">StpTool</a></p></td>
<td><p>Contains the streamed audio files for the soundbank. In TPP, .wem sound files are also paired with newer versions of .ls files from .sab.</p></td>
</tr>
<tr class="odd">
<td><p>subp</p></td>
<td><p>SubtitlesPackageFile</p></td>
<td><p>data1(489), fpk(89)</p></td>
<td><p><a href="/SubpTool" title="wikilink">SubpTool</a></p></td>
<td><p>Defines subtitle data.</p></td>
</tr>
<tr class="even">
<td><p>tcvp</p></td>
<td><p>CoverPointFile</p></td>
<td><p>fpk(232)</p></td>
<td><p><a href="https://github.com/kapuragu/TcvpTool">TcvpTool</a></p></td>
<td><p>TppCoverPointFileTransform entity on MB, defines positions of cover points. DataSet equivalent entity is TppCoverPoint.</p></td>
</tr>
<tr class="odd">
<td><p>tgt</p></td>
<td><p>Target</p></td>
<td><p>fpkd(2151)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>Defines hitboxes for characters and props .parts.</p></td>
</tr>
<tr class="even">
<td><p><a href="/TRAP" title="wikilink">trap</a></p></td>
<td><p>GeoTrapFile</p></td>
<td><p>fpk(617)</p></td>
<td><p><a href="https://github.com/kapuragu/TrapTool">TrapTool</a></p></td>
<td><p>Level trigger definition file. Includes camera modes, death zones and mission area boundaries.</p></td>
</tr>
<tr class="odd">
<td><p>tre2</p></td>
<td><p>TerrainFile</p></td>
<td><p>fpk(3)</p></td>
<td></td>
<td><p>Low-resolution LOD data for a level's terrain.</p></td>
</tr>
<tr class="even">
<td><p>trk</p></td>
<td><p>Animation Track</p></td>
<td><p>mtar(251)</p></td>
<td></td>
<td><p>Description of all main animation tracks for an Mtar Type 2 file. Extension named by MtarTool author</p></td>
</tr>
<tr class="odd">
<td><p>twpf</p></td>
<td><p>ParametersFile</p></td>
<td><p>fpk(5)</p></td>
<td></td>
<td><p>TppLocationData entity, weatherParametersFile</p></td>
</tr>
<tr class="even">
<td><p>uia</p></td>
<td><p>UiAnimFile</p></td>
<td><p>fpk(3755), gz fpk(1813)</p></td>
<td></td>
<td><p>UI model asset image transition data?</p></td>
</tr>
<tr class="odd">
<td><p>uif</p></td>
<td><p>UiFile</p></td>
<td><p>fpk(1979) gzfpk(600)</p></td>
<td></td>
<td><p>UI model asset base image?</p></td>
</tr>
<tr class="even">
<td><p><a href="/UIGB" title="wikilink">uigb</a></p></td>
<td><p>UiGraphFile</p></td>
<td><p>fpk(289)</p></td>
<td></td>
<td><p>UI graph asset?</p></td>
</tr>
<tr class="odd">
<td><p><a href="/UILB" title="wikilink">uilb</a></p></td>
<td><p>UiLayoutFile</p></td>
<td><p>fpk(1904)</p></td>
<td></td>
<td><p>Based on vehicle .fox2 DataSet entries.<ref></p>
<pre><code>source: &quot;chunk1.dat/Assets/tpp/pack/vehicle/veh_rl_east_wav.fpkd/Assets/tpp/level_asset/vehicle/veh_rl_east_wav.fox2&quot;

&lt;entity class=&quot;UiGraphEntry&quot; classVersion=&quot;1&quot; addr=&quot;0x073F06A0&quot; unknown1=&quot;96&quot; unknown2=&quot;3058&quot;&gt;
  &lt;staticProperties&gt;
    &lt;property name=&quot;name&quot; type=&quot;String&quot; container=&quot;StaticArray&quot; arraySize=&quot;1&quot;&gt;
      &lt;value&gt;veh_bd_east_wav|sight_vhcl_east_wav|UiGraphEntry0000&lt;/value&gt;
    &lt;/property&gt;
    &lt;property name=&quot;dataSet&quot; type=&quot;EntityHandle&quot; container=&quot;StaticArray&quot; arraySize=&quot;1&quot;&gt;
      &lt;value&gt;0x02D7FC10&lt;/value&gt;
    &lt;/property&gt;
    &lt;property name=&quot;files&quot; type=&quot;FilePtr&quot; container=&quot;DynamicArray&quot; /&gt;
    &lt;property name=&quot;rawFiles&quot; type=&quot;FilePtr&quot; container=&quot;DynamicArray&quot; arraySize=&quot;3&quot;&gt;
      &lt;value&gt;/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_wpscope_vehicle_sav0_b.uilb&lt;/value&gt;
      &lt;value&gt;/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_vhcl_def_FPS_bs.uilb&lt;/value&gt;
      &lt;value&gt;/Assets/tpp/ui/LayoutAsset/hud_wpscope/UI_wpscope_vehicle_common.uilb&lt;/value&gt;
    &lt;/property&gt;
  &lt;/staticProperties&gt;
  &lt;dynamicProperties /&gt;
&lt;/entity&gt;</code></pre>
<p></ref></p></td>
</tr>
<tr class="even">
<td><p>veh</p></td>
<td><p>Vehicle</p></td>
<td><p>fpkd(87)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td></td>
</tr>
<tr class="odd">
<td><p><a href="/VFX" title="wikilink">vfx</a></p></td>
<td><p>FxVfxFile</p></td>
<td><p>fpkd(6378)</p></td>
<td><p><a href="https://github.com/youarebritish/VfxTool">VfxTool</a></p></td>
<td><p>Visual effect graph.</p></td>
</tr>
<tr class="even">
<td><p><a href="/VFXLB" title="wikilink">vfxlb</a></p></td>
<td></td>
<td><p>fpkd(133)</p></td>
<td></td>
<td><p>FxLocatorArrayData entity, vfxlbFile</p>
<p>lba for vfx?</p></td>
</tr>
<tr class="odd">
<td><p>vfxlf</p></td>
<td><p>VFX Lens Flare (fox2)</p></td>
<td><p>fpkd(846)</p></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td><p>wem</p></td>
<td><p>Wwise Encoded Media</p></td>
<td><p>Chunks(255)</p></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td><p>'''Unique ''<strong>'to GZ?</strong></p></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td><p>fagx</p></td>
<td><p>Motion graph / layer definition file (fox)</p></td>
<td><p>gz fpks(1)</p></td>
<td></td>
<td><p>GZ RegisterPackageExtensionInfo</p></td>
</tr>
<tr class="odd">
<td><p>fdmg</p></td>
<td><p>(fox)</p></td>
<td><p>gz fpkd(2)</p></td>
<td></td>
<td><p>GZ only, Damage related</p></td>
</tr>
<tr class="even">
<td><p><a href="/FV2" title="wikilink">fova</a></p></td>
<td><p>Form Variation</p></td>
<td><p>gz fpk(110)</p></td>
<td></td>
<td><p>GZ, superceded in TPP by fv2</p></td>
</tr>
<tr class="odd">
<td><p>fox</p></td>
<td></td>
<td><p>data_02.g0s(3)</p></td>
<td><p>Any text editor</p></td>
<td><p>XML, GZ only, superceded in TPP by fox2</p></td>
</tr>
<tr class="even">
<td><p>g0s</p></td>
<td><p>Qar Archive Gz format</p></td>
<td><p>data_01.g0s, data_02.g0s files</p></td>
<td><p><a href="/GzsTool" title="wikilink">GzsTool 0.2</a></p></td>
<td></td>
</tr>
<tr class="odd">
<td><p><a href="/WMV" title="wikilink">g0s</a></p></td>
<td><p>WMV</p></td>
<td><p>data_00.g0s file</p></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td><p>lani</p></td>
<td><p>LaniFile</p></td>
<td><p>gz fpk(456)</p></td>
<td></td>
<td><p>Lip animation Reference in init.lua RegisterPackageExtensionInfo</p>
<p>Reference in .lad files</p></td>
</tr>
<tr class="odd">
<td><p>tlsp</p></td>
<td></td>
<td><p>gz fpk(2)</p></td>
<td></td>
<td><p>GZ</p></td>
</tr>
<tr class="even">
<td><p>tmsp</p></td>
<td></td>
<td><p>gz fpk(2)</p></td>
<td></td>
<td><p>GZ</p></td>
</tr>
<tr class="odd">
<td><p>tmsf</p></td>
<td></td>
<td><p>gz fpk(1)</p></td>
<td></td>
<td><p>GZ</p></td>
</tr>
<tr class="even">
<td><p>tmsl</p></td>
<td></td>
<td><p>gz fpk(1)</p></td>
<td></td>
<td><p>GZ</p></td>
</tr>
<tr class="odd">
<td><p>tmsu</p></td>
<td></td>
<td><p>gz fpk(1)</p></td>
<td></td>
<td><p>GZ</p></td>
</tr>
<tr class="even">
<td><p>vdp</p></td>
<td><p>Vehicle Driving Parameter</p></td>
<td><p>gz fpkd(20)</p></td>
<td><p><a href="/FoxTool" title="wikilink">FoxTool</a></p></td>
<td><p>GZ</p></td>
</tr>
<tr class="odd">
<td><p>vfxdb</p></td>
<td></td>
<td><p>gz fpk(30)</p></td>
<td></td>
<td><p>GZ, .vfx class database?</p></td>
</tr>
<tr class="even">
<td><p>vpc</p></td>
<td></td>
<td><p>data_02.g0s(3)</p></td>
<td></td>
<td><p>GZ</p></td>
</tr>
<tr class="odd">
<td><p><strong>Other[1]</strong></p></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td><p>ag</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe ag.evf</p></td>
</tr>
<tr class="odd">
<td><p>aia</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>aib</p></td>
<td><p>AI behavior / definition file</p></td>
<td></td>
<td></td>
<td><p>Reference in init.lua RegisterPackageExtensionInfo Translated from comment in PT init.lua</p></td>
</tr>
<tr class="odd">
<td><p>aibc</p></td>
<td><p>AI behavior category file</p></td>
<td></td>
<td></td>
<td><p>Reference in init.lua RegisterPackageExtensionInfo Translated from comment in PT init.lua</p></td>
</tr>
<tr class="even">
<td><p>aig</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>aigc</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>aim</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe AimCamera?</p></td>
</tr>
<tr class="odd">
<td><p>aip</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>ait</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>cc</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe cc.evf</p></td>
</tr>
<tr class="even">
<td><p>col</p></td>
<td></td>
<td></td>
<td></td>
<td><p>RegisterExtensionInfo categories={"Target"}</p></td>
</tr>
<tr class="odd">
<td><p>csnav</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>demo</p></td>
<td></td>
<td></td>
<td></td>
<td><p>Editor format? RegisterExtensionInfo</p>
<p>categories={"Target"}</p></td>
</tr>
<tr class="odd">
<td><p>demox</p></td>
<td></td>
<td></td>
<td></td>
<td><p>RegisterExtensionInfo categories={"Target"}</p></td>
</tr>
<tr class="even">
<td><p>dnav</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>dnav2</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>ese</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>evb</p></td>
<td></td>
<td></td>
<td></td>
<td><p>RegisterExtensionInfo categories={"Target"}</p>
<p>RegisterPackageExtensionInfo</p></td>
</tr>
<tr class="even">
<td><p>fag</p></td>
<td></td>
<td></td>
<td></td>
<td><p>RegisterPackageExtensionInfo</p></td>
</tr>
<tr class="odd">
<td><p>fage</p></td>
<td><p>Motion graph / graph piece file</p></td>
<td></td>
<td></td>
<td><p>RegisterPackageExtensionInfo Translated from comment in PT init.lua</p></td>
</tr>
<tr class="even">
<td><p>fago</p></td>
<td><p>Motion Chart</p></td>
<td></td>
<td></td>
<td><p>RegisterPackageExtensionInfo Translated from comment in PT init.lua</p></td>
</tr>
<tr class="odd">
<td><p>fagp</p></td>
<td><p>Motion graph / route graph file</p></td>
<td></td>
<td></td>
<td><p>exe Translated from comment in PT init.lua</p></td>
</tr>
<tr class="even">
<td><p>fcnpx</p></td>
<td><p>Parts Builder · Extended Connect Point File</p></td>
<td></td>
<td></td>
<td><p>EditableBlockPackage. RegisterPackageExtensionInfo</p>
<p>Translated from comment in PT init.lua</p></td>
</tr>
<tr class="odd">
<td><p>fmdlb</p></td>
<td></td>
<td></td>
<td></td>
<td><p>RegisterExtensionInfo</p>
<p>categories={"Target"}</p></td>
</tr>
<tr class="even">
<td><p>fox_export</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>fsml</p></td>
<td></td>
<td></td>
<td></td>
<td><p>Reference in init.lua RegisterPackageExtensionInfo</p></td>
</tr>
<tr class="even">
<td><p>fx</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe fx.evf</p></td>
</tr>
<tr class="odd">
<td><p>fxp</p></td>
<td><p>Fox Project</p></td>
<td></td>
<td></td>
<td><p>Fox Editor</p></td>
</tr>
<tr class="even">
<td><p>info</p></td>
<td></td>
<td></td>
<td></td>
<td><p>RegisterExtensionInfo</p>
<p>categories={"Target"}</p></td>
</tr>
<tr class="odd">
<td><p>path</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>mas</p></td>
<td></td>
<td></td>
<td></td>
<td><p>SetLanguageGroupExtention{</p>
<p>group={"Sound"}</p>
<p>RegisterExtensionInfo{</p>
<p>categories={"Target","Language"}</p></td>
</tr>
<tr class="odd">
<td><p>mtl</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>nav</p></td>
<td></td>
<td></td>
<td></td>
<td><p>RegisterExtensionInfo categories={"Target"}</p></td>
</tr>
<tr class="odd">
<td><p>phep</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>qar</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>rbs</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>rdb</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>rnav</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>sad</p></td>
<td></td>
<td></td>
<td></td>
<td><p>SetLanguageGroupExtention{</p>
<p>group={"Sound"}</p>
<p>RegisterExtensionInfo{</p>
<p>categories={"Language"}</p></td>
</tr>
<tr class="odd">
<td><p>sd</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe sd.evf</p></td>
</tr>
<tr class="even">
<td><p>sh</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe (but no in alphabetical with the others in the section)</p></td>
</tr>
<tr class="odd">
<td><p>simep</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>snav</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>stm</p></td>
<td></td>
<td></td>
<td></td>
<td><p>SetLanguageGroupExtention{ group={"Sound"}</p>
<p>RegisterExtensionInfo{</p>
<p>categories={"Target","Language"}</p></td>
</tr>
<tr class="even">
<td><p>sub</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>tetl</p></td>
<td></td>
<td></td>
<td></td>
<td><p>RegisterExtensionInfo</p></td>
</tr>
<tr class="even">
<td><p>tevt</p></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td><p>tmss</p></td>
<td></td>
<td></td>
<td></td>
<td><p>RegisterExtensionInfo</p></td>
</tr>
<tr class="even">
<td><p>trmtl</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe, near TerrainRender</p></td>
</tr>
<tr class="odd">
<td><p>txt</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="even">
<td><p>uig</p></td>
<td><p>UI Graph</p></td>
<td></td>
<td></td>
<td><p>EditableBlockPackage.</p>
<p>RegisterPackageExtensionInfo</p></td>
</tr>
<tr class="odd">
<td><p>uil</p></td>
<td><p>UI Layout</p></td>
<td></td>
<td></td>
<td><p>EditableBlockPackage.</p>
<p>RegisterPackageExtensionInfo</p></td>
</tr>
<tr class="even">
<td><p>utxl</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe next to uil,uif,uia,fnt</p></td>
</tr>
<tr class="odd">
<td><p>vfxbin</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe FxVfxBinaryFile</p></td>
</tr>
<tr class="even">
<td><p>vnav</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe</p></td>
</tr>
<tr class="odd">
<td><p>vo</p></td>
<td></td>
<td></td>
<td></td>
<td><p>exe vo.evf</p></td>
</tr>
<tr class="even">
<td><p>xml</p></td>
<td><p>Extensible Markup Language</p></td>
<td></td>
<td><p>Any text editor</p></td>
<td><p>This is may appear to not be used anywhere in the game files, but is listed in the .exe and the fox2 files are just compiled XML files.[2]</p></td>
</tr>
</tbody>
</table>

## References

<references />

[category:File Formats](/category:File_Formats "wikilink")
[Category:Files](/Category:Files "wikilink")
[Category:Resources](/Category:Resources "wikilink")

1.  File types from GZ (to be split further) or referenced in exe or lua
    but not yet found/extracted as seperate files.
2.  <https://github.com/Atvaark/FoxTool>