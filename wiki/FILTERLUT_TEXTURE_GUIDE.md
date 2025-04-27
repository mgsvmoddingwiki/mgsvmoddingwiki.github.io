# Working with FILTERLUT Textures

This guide was originally written for a user interested in creating the mod [I Can't Believe It's Not ReShade](https://www.nexusmods.com/metalgearsolidvtpp/mods/406). It covers the different lookup tables (LUTs) present in the base game, their interactions (stacking), and how to save changes using Photoshop's DDS Plugin.

**Note:** FILTERLUT files use a special format: `8.8.8.8 ARGB 32 bpp | unsigned / BC7`. This format is unsupported in GIMP (as of version 2.10.38). Therefore, the Adobe Photoshop Plugin is recommended for editing lookup tables.

## Contents

1. [What They Do, Where to Find Them](#what-they-do-where-to-find-them)
2. [In-Game Effects](#in-game-effects)
   - [In Summary](#in-summary)
   - [Miscellaneous Filters & Speculation](#miscellaneous-filters--speculation)
3. [Modding LUTs](#modding-luts)

## What They Do, Where to Find Them

LUTs are responsible for in-game color processing. For example:

- Night Vision Goggles apply a green tint.
- Fixing a critical injury desaturates red colors.
- The FOXDIE effect in *Ground Zeroes* introduces erratic color changes.

These filters can be modified to create mods like [I Can't Believe It's Not ReShade](https://www.nexusmods.com/metalgearsolidvtpp/mods/406) and [OniVision Goggles](https://www.nexusmods.com/metalgearsolidvtpp/mods/402), though the process differs from conventional texture modding.

Most of *The Phantom Pain*'s filters are located in:

```
Assets\tpp\pack\resident\resident.pftxs
```

After unpacking `resident00.pftxs`, navigate to:

```
resident00_pftxs\Assets\tpp\effect\gr_pic\lut\
```

Here, you'll find six filter lookup tables. Since FILTERLUTs don't have mipmaps, each will consist of a `.ftex` and a `.1.ftexs` file.

Use [FtexTool](https://mgsvmoddingwiki.github.io/FtexTool/) to convert them.  
*Note: Versions before v0.3.3 did not support A8R8G8B8; v0.3.3 specifically fixed FILTERLUT modding.*

Open the `.dds` texture with Photoshop. It will appear as 16 tiles ranging from black/green/red to white/blue/purple.

## In-Game Effects

Filters in the game behave like layers. Most areas in *The Phantom Pain* will have multiple filters stacked together.

### In Summary

- Filters are layered to achieve the final visual effect.
- Different game scenarios or equipment (like Night Vision Goggles) apply specific LUTs.

### Miscellaneous Filters & Speculation

Some filters' exact functions are still under investigation. Modders continue to explore and document their effects.

## Modding LUTs

To modify LUTs:

1. **Extract the `.ftex` and `.ftexs` files** from the game's archives.
2. **Convert them to `.dds` format** using [FtexTool](https://mgsvmoddingwiki.github.io/FtexTool/).
3. **Edit the `.dds` file** in Photoshop using the DDS Plugin.
4. **Save the edited file** in the original format (`8.8.8.8 ARGB 32 bpp | unsigned / BC7`).
5. **Repack the files** back into the game using the appropriate tools.

*Note:* Always back up original files before making modifications.
