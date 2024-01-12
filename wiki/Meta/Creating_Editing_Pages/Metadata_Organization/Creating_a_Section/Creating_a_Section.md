---
title: 'Creating a Section'
permalink: /Meta/Creating_Editing_Pages/Metadata_Organization/Creating_a_Section/
tags: [Meta]
---

As you can see from the sidebar tree list and from the breadcrumb links above the page title this *Meta* section of the site is different from the usual single-level pages.

## About

Sections are just regular pages that have a `permalink` (URL) metadata with multiple levels in the path. For example this page's `permalink` line is:

```
permalink: /Meta/Creating_Editing_Pages/Creating_a_Section/
```

The wiki automatically detects that a path has multiple levels (distinguished by forwardslashes `/`) and looks for a page that matches a `permalink` of each part of the path.

The wiki continues looking for matching pages until reaching the first level (eg: `/Meta/`), which it then sets as the 'root' section page.

> This means that each part of the `permalink` path requires its own page. This page's parent page is `/Meta/Creating_Editing_Pages/`, which then becomes clickable via the sidebar/breadcrumb links. This is a strict requirement for the hierarchy to work and just general ease of navigation.

> Or put another way, for a `permalink` like `/Meta/Creating_Editing_Pages/Creating_a_Section/` it requires this page and two others. One with a `permalink` of `/Meta/Creating_Editing_Pages/` and another with `/Meta/`.

## Necessity

Sections aren't needed for most parts of the wiki. It's only really for groups of related pages that make sense being collected into a hierarchy for easier navigation.

Sections like the [Entity Reference](/Entity_Reference/) for instance would be far less easy to browse without supporting a hierarchy.

## Organizing the files

The Markdown files themselves don't need to match a directory hierarchy or naming of the `permalink` path. In fact the *only* thing that determines the hierarchy is the `permalink` path itself within each Markdown file and that there is a matching Markdown file that has the same `permalink` for each level in the path.

This allows you to flexibly organize Markdown files.

For example this section currently has the following directory structure:

    wiki/
        Meta/
            Creating_Editing_Pages/
                Creating_Editing_Pages.md
                Creating_a_Section/
                    Creating_a_Section.md
            ... etc

However it could be alternatively organized as a more flat directory structure:

    wiki/
        Meta/
            Creating_Editing_Pages.md
            Creating_a_Section.md
            ... etc

It doesn't matter too much but if working with section files **keeping sub-section Markdown files within a directory named after the root page is recommended**, just for minimum sanity of wiki organization.

> Also if editing an existing section follow its existing directory structure convention if creating new files, for consistency.

### Images/file attachments

For images/files meant for such sections just create an identically named sub-directory inside `assets`.

So for this *Meta* section I have an `assets/Meta/` directory where I placed images used for the various guides/pages and then linked them in the posts like normal. How you organize the files within the directory is up to you.