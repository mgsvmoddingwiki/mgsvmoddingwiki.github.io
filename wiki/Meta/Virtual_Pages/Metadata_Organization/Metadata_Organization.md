---
title: 'Metadata/Organization'
permalink: /Meta/Virtual_Pages/Metadata_Organization/
tags: [Meta]
---

This section covers the differences in metadata and files for virtual pages compared to the [regular metadata syntax](/Meta/Creating_Editing_Pages/Metadata_Organization/#main-metadata).

## Page filename

The only difference compared to [regular pages](/Meta/Creating_Editing_Pages/Metadata_Organization/#page-filename) is virtual page files should use a `.txt` extension rather than a `.md` extension.

---

## Main metadata

The first difference to the regular syntax is instead of using `---` to enclose the metadata block we wrap the metadata in a single HTML comment. This is to exclude the file from being parsed like normal by Jekyll.

### Example metadata

```
<!--
title: Example Virtual Page
permalink: /Example_Root_Page/?/Example_Virtual_Page/
tags: [Missions, Guides]
-->
```

Apart from the `permalink` value the way other values are formatted remain the same as the regular syntax.

For the `permalink` value virtual pages require a 'real' page as the first level root of the path. A 'real' page is any Jekyll-based page (ie: the kind of page explained in all the other regular Meta guides).

Then the virtual page path is appended to the end of the `permalink` path with a `?/`.

So in the above example:

- `/Example_Root_Page/` is the part of the path that represents the path of a 'real' root page.
- `?/Example_Virtual_Page/` represents the virtual page.

> **Tip:** live examples of multi-level virtual pages can be found in the [Entity Reference](/Entity_Reference) section, including deeper multi-level paths such as [TppCollectionLocatorArray](/Entity_Reference/?/Tpp/Collectible/TppCollectionLocatorArray/).

### Page content

After the metadata block you can add the page content that will be visible. **Virtual pages differ in various syntax** to the regular formatting so check out the [virtual page formatting reference](/Meta/Virtual_Pages/Formatting_Reference) for details.

---

## Directory structure of the wiki

Directory structure for virtual page text files themselves is the same as the outlined on the [Creating a Section](/Meta/Creating_Editing_Pages/Metadata_Organization/Creating_a_Section/#organizing-the-files) page.

### Pointing the wiki to a new virtual page root path

The way the virtual pages are detected by the wiki is two-fold:

- The `permalink` path of the 'real' page used as the basis is defined as a custom variable in the `_config.yml` file.
- The physical directory path to the virtual pages directory, defined in the `build-virtual-index.ps1` Powershell script used to generate an Javascript index all virtual pages. 

#### Defining a root page variable

1. Navigate to the root of the site's files and open `_config.yml` in a text editor.
2. Scroll to the `virtual_page_roots` array and add the path to the real root page that the virtual pages section will use as the basis, like the following:
```
virtual_page_roots:
- '/Entity_Reference/'
- '/Another_Example_Real_Page/'
```

#### Defining a root directory for the virtual page files

1. In the root of the site open `build-virtual-index.ps1` in a text editor.
2. In the `$rootDirs` array add the path to the directory that contains the virtual page `.txt` files, like so:
```
$rootDirs = [System.Collections.ArrayList]@(
    "wiki/Entity_Reference/"
    "wiki/Another_Example_Real_Page/"
)
```
> **Note:** no comma is needed to be added between path values in the Powershell array.

> As per the usual advice on [adding a directory](/Meta/Creating_Editing_Pages/Metadata_Organization/Creating_a_Section/#organizing-the-files) for sections the base directory for the virtual pages should use the name as the 'real' page used for the root (in the above examples that's `Another_Example_Real_Page`).

### Images/other files

Images and other files can be added to the `assets` directory as per the [regular overview](/Meta/Creating_Editing_Pages/Metadata_Organization/#imagesother-files).

---

## Page redirections

Page redirections aren't support on virtual pages.