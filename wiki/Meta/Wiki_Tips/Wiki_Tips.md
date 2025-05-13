---
title: 'Wiki Tips'
permalink: /Meta/Wiki_Tips/
tags: [Meta, Guides]
redirect_from:
    - /Meta-Wiki_Tips/
---

## Search

The search suggestions can be navigated using keyboard arrow or tab keys. Word matches appear beside each result.

Pressing Enter without navigating via keys through the list opens the full results, or they can be opened via the *See all \<n\> results* item at the bottom of the suggestions.

> The highlighted match text beside results always ignores markup to reduce visual noise, however the full original text is still searched. Strings hidden include some HTML tags, Markdown syntax (including URLs/images but not title text) and Liquid tags. Any results that have a no visible match text will instead display labels about which metadata was matched.

### Search operators

The following operators can be entered in the search box to adjust results.

| Operator | Example | Description |
|-|-|-|
| ` ` | `inf hook` | Spaces act as an *and*. Strings can be partial and still match. |
| `|` | `hair | sound` | Pipes act as an *or*, returning results of either string. |
| `""` | `"infinite heaven"` | Wrapping in double quotes returns exact match. |
| `!` | `inf heaven !guide` | Prefixing an exclamation mark before a string will exclude results that contain the string. To exclude multiple words wrap the string in double quotes like `!"some term"`.<br/><br/> Keep in mind this matches also against page URLs, so if a result continues to display it may be the URL differs from the string (eg: if the string `some_term` is unique to the URL path then using `!"some term"` won't exclude it from result, only `!"some_term"`).  |
| `^` | `^meta` | Returns results beginning with string. |
| `$` | `entries$` | Returns results ending with string. Note: this can match things like tag fields that end with a particular tag. |
{:.stretch}

> **Tip:**  Results will match substrings too (eg: `ai` in `contain`). To only match whole words you can double quote the query with spaces, like `"ai "` or `" ai "`.

### Filters

In the search box suggestions and search results page are some filters that adjust results.

> Toggling any of the filters in the suggestions drop-down menu will save the user preference for subsequent searches.

| Filter | Description |
|-|-|
| Search within section | Only visible on [section](/Meta/Creating_Editing_Pages/Metadata_Organization/Creating_a_Section/) pages that have multiple parts to the page URL. Enabled by default if no user preference has been toggled yet. |
| Exclude Entity Reference | Excludes the entire [Entity Reference](/Entity_Reference) section. Helpful to reduce that section populating other results. |
| Ignore markup | When enabled will match the search query against a cleaned version of wiki page content text, which basically strips everything non-visual from the text, like URLs, Liquid/Kramdown/Markdown/HTML tags. It's the same patterns used to clean the highlighted match text beside results but applied to the search itself.<br/><br/>This filter is useful when the visual text differs from the markup code of the page (eg: raw page content of `C\#` but visually is `C#`). |
| Has media | Includes only pages that contain images/videos.<br/><br/>**Note:** if the *Ignore markup* filter is also enabled results will be omitted due to that filter stripping markup (image/video links) from the search. |

> **Tip:** for a complete list of all page titles for checking, see the [All Pages](/Meta-All_Pages) list, which includes links to all categories/tags.

---

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