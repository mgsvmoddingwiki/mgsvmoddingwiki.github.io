---
title: 'Wiki Tips'
permalink: /Meta/Wiki_Tips/
tags: [Meta, Guides]
redirect_from:
    - /Meta-Wiki_Tips/
---

This page covers tips for using the wiki, some of which are non-obvious so worth skimming through even as a savvy user.

## Search

The search box returns results in the form of autocomplete suggestions. As it peforms a full text search it can be little sluggish on Firefox-based browsers. The results can also be navigated using keyboard arrow or tab keys.

There are a number of search operators that can be used to refine queries:

| Operator | Example | Description |
|-|-|-|
| ` ` | `inf hook` | Spaces act as an *and*. Strings can be partial and still match. |
| `|` | `hair | sound` | Pipes act as an *or*, returning results of either string. |
| `""` | `"infinite heaven"` | Wrapping in double quotes returns exact match. |
| `!` | `inf heaven !guide` | Prefixing an exclamation mark before a string will exclude results that contain the string. To exclude multiple words wrap the string in double quotes like `!"some term"`. |
| `^` | `^meta` | Returns results beginning with string. |
| `$` | `entries$` | Returns results ending with string. Note: this can match things like tag fields that end with a particular tag. |
{:.stretch}

> **Tip:** if you still can't find what you're after you can try the [All Pages](/Meta-All_Pages) list, where there's a list of all pages by title and a list of all categories to browse.


## Top toolbar buttons

At the top of every page are a row of icons. This table explains them from left to right.

> **Tip:** for simple, text-only page edits or new pages the Prose.io buttons with the colored backgrounds are the easiest way. It just requires a single authorization with your Github account and then it can handle submissions on your behalf. For more about creating/editing pages see the [Creating/Editing a Page](/Meta-Creating_Editing_a_Page) guide.

| Icon | Title | Description |
|-|-|-|
| [](/){:.iconed.icon-toolbar.icon-add} | Add New Page | Reserved mostly for approved Github contributors to add a new wiki page directly to the repository.<br/><br/>If a user who isn't logged into Github clicks this they'll be prompted to login. If a regular user logged into Github clicks this it will suggest forking the Github repository and submitting a pull request. |
| [](/){:.iconed.icon-toolbar.icon-edit} | Edit Page | Reserved mostly for approved Github contributors to edit a wiki page directly in the repository.<br/><br/>Ditto to the non-logged in/regular user behavior. |
| [](/){:.iconed.icon-toolbar.icon-history} | Page History | Displays a page's history of edits, along with who contributed. |
| [](/){:.iconed.icon-toolbar.icon-source} | Page Source | Displays the raw code used to generate the page. |
| [](/){:.iconed.icon-toolbar.icon-expand} | Expand Wiki Width | A toggle button that when clicked expands/contracts the width of the wiki page. Useful for viewing dense/long tables on various pages. Button only appears on non-mobile browser widths. |
| [](/){:.iconed.icon-toolbar.icon-overflow} | More Options | Menu pop-up with customization options like light/dark theme selector. Also a delete page option for approved contributors. |
| [](/){:.iconed.icon-toolbar.icon-add.prose} | Prose.io - Add New Page | Opens [prose.io](https://prose.io) where you can add a new wiki page.<br/><br/>Requires an initial authorization of Prose with your Github account. See [this page](/Meta-Creating_Editing_a_Page) for more info. |
| [](/){:.iconed.icon-toolbar.icon-edit.prose} | Prose.io - Edit Page | Opens [prose.io](https://prose.io) where you can edit an a wiki page.<br/><br/>Requires an initial authorization of Prose with your Github account. See [this page](/Meta-Creating_Editing_a_Page) for more info. |