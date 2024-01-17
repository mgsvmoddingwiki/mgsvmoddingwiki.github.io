---
title: 'Metadata/Organization'
permalink: /Meta/Creating_Editing_Pages/Metadata_Organization/
tags: [Meta]
---

This page explains how the metadata info placed above every page should be formatted, along with where to place wiki files.

There's also info on how to redirect pages to other pages [here](#page-redirections).

> This page was made to just avoid duplicating the steps on other how-to guides and assumes you're coming from one of them (such as [Using Prose.io](/Meta/Creating_Editing_Pages/Using_Prose_io/) or [Using Github.com](/Meta/Creating_Editing_Pages/Using_Github_com/)). These give more context to the info here.

> The only time some of the below info differs are for [Virtual Pages](/Meta/Virtual_Pages). Such pages are distinguished by a `/?/` in their URL and are currently exclusive to the Entity Reference section.

---

## Page filename

When creating a new page on the wiki it uses the `.md` (Markdown) file extension. This is just a renamed `.txt` file. Eg: this page's filename is `Metadata_Organization.md`.

### Filename tips

- Make the filename essentially match the page title, with the same capitalization.
- Replace/substitute all special characters with legal filename characters. For any colons (`:`) in a title use a dash (`-`) for the filename instead and for spaces use an underscore (`_`) instead.

So as an example, for a desired page title of `Example: My Page` either of the following filenames would be fine:
- `Example-_My_Page.md`
- `Example-My_Page.md`

{% include spoiler-start title="Info for Prose.io users" %}

> If you're [creating a new page using Prose.io](/Meta/Creating_Editing_Pages/Using_Prose_io/)'s interface it handles creating the file for you but the same filename tips apply when filling the filename text box.<br/>
<br/>
A full example path for Prose.io's filename textbox would be the following (see also the [directory structure](#directory-structure-of-the-wiki) section below for more info):
```
wiki/Example_Page.md
```

{% include spoiler-end %}

---

## Main metadata

Within the Markdown page itself it needs some metadata for the wiki to understand info about it.

At the top of every page should contain a metadata block so the wiki can check what title a page should have, its URL and what its categories it should be tagged with (if any). This block is hidden on the visible page.

The metadata block begins and ends with three dashes (`---`) and should always begin on the *very first* line of the page.

### Example metadata

```
---
title: Example Page
permalink: /Example_Page/
tags: [Missions, Guides]
---
```

- `title` = What your page title is. If it contains special characters like a colon (`:`) then wrap the title in single quotes (like `'Example: Your Page Name'`).
> If a title contains both special characters and single quotes for apostrophes then you can wrap the title in double quotes.

- `permalink` = Your page title but in URL form with special characters substituted and beginning and ending in a forwardslash.
> Unlike page filenames there should not be any `.md` suffix for permalinks (or any `wiki/` prefix).

- `tags` = Add tag(s) if you want the page to be automatically discoverable via category pages. A list of existing tags to use can be found in the All Pages [Categories list](/Meta/All_Pages/#categories). If you've chosen multiple tags then separate them by a comma and space (`, `).
> Tags can also have spaces (eg: `Infinite Heaven`).

### Page content

After the metadata block you can add the page content that will be visible. For a full reference of what you can add check out the [Formatting Reference](/Meta/Formatting_Reference) page. You can also check out how others made their pages by clicking the *Page Source* button at the top of any wiki page.

---

## Directory structure of the wiki

Once you have your page file made there are two places the wiki expects things to be.

### Wiki pages

All wiki pages are contained inside the `wiki` directory in the root of the site's files. Eg:

```
wiki/Example_Page.md
```

- For Prose.io users this just means filling the filename text box with the above path (replacing `Example_Page` with the desired name of your page).

- For users using Github.com for adding files this means adding the page file within the `wiki` directory of the wiki.

> If you're a user with Collaborator status you can click the non-colored *Add New Page* button at the top of any wiki page and it will auto place you within the `wiki` section, where you can add a filename and fill the page content.

> The exception to this would be if you're [creating a section](/Meta/Creating_Editing_Pages/Metadata_Organization/Creating_a_Section/) but in the majority of cases you'll just be creating a single page.

### Images/other files

All images/other files of the wiki are located in the root `assets` directory.

To keep new images/other files organized always place them in their own sub-directory within `assets`, named identically to the page filename (but without the `.md` extension). Eg:

```
assets/Example_Page/Some-image.jpg
```

> This is to avoid filename conflicts with other pages and generally keep things easier to manage.

{% include spoiler-start title="Info for Prose.io users about images" %}

> New images and files are only possible to add if using one of the Github options to upload to. Prose.io users can't add new files besides Markdown pages.

{% include spoiler-end %}

---

## Page redirections

The wiki offers the ability to auto redirect URLs to/from other URLs. Useful if a page has been renamed/moved to a new location.

{% include spoiler-start %}

#### Redirect from

To redirect a current page *from* another URL add the following to a page's metadata block:

```
redirect_from:
    - /Current_Page_Link/
```

Full metadata example:

```
---
title: 'My Title'
permalink: /Current_Page_Link/
tags: [Tag, Tag 2]
redirect_from:
    - /Original_Page_Link/
---
```

This auto creates a redirection from (in the above example) `/Original_Page_Link/` to `/Current_Page_Link/`.

> **Tip:** redirections are useful for if you've had an existing page up for a while but needed to rename/move it, to allow users to be taken to the new page automatically.

#### Redirect to

Similarly it's possible to redirect *to* another page, in which case a page should be created with *only* metadata and no content (since the redirect will occur so fast without loading the page content). Using eg:

```
redirect_to:
    - /Page_Link_To_Redirect_To/
```

{% include spoiler-end %}