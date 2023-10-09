---
title: 'Meta: Wiki Tips'
permalink: /Meta-Wiki_Tips/
tags: [Guides]
---

This page covers tips for using the wiki, some of which are non-obvious so worth skimming through even as a savvy user.

## Search

The search box is quite simple in it's current form, acting more like a filter. It will return the first matches for a query from anywhere on a page (whether a tag, title, body text or URL) in alphabetical order.

> **Tip:** if you know the beginning word of a page title you can typically filter results better by adding a forwardslash to the start of the query (eg: `/FoxKit`), since it's contained in the page URL.
>
> Alternatively if you know a page title contains a colon you can search using that which similarly improves results (eg: `FoxKit:`).

![`/Foxkit` as query. Without using these tips the 'FoxKit' page doesn't show in results normally, despite being the most relevant.](/assets/Meta-Wiki_Tips/Search - Forwardslash use.png){:width="600px"}

> **Tip:** if the search hasn't helped you can always visit the [All Pages](/Meta-All_Pages) list and Ctrl+F in the browser to find a title.


## Top toolbar buttons

At the top of every page are a row of icons. This table explains them beginning from leftmost icon to rightmost.

> **Tip:** for simple, text-only page edits or new pages the Prose.io buttons with the colored backgrounds are the easiest way. It just requires a single authorization with your Github account and then it can handle submissions on your behalf. For more about creating/editing pages see the [Creating/Editing a Page](/Meta-Creating_Editing_a_Page) guide.

| Icon | Title | Description |
|-|-|-|
| ![](/assets/images/ui.svg#icons-editing-add){:width="30px" height="30px" style="background: var(--color-secondary); padding: 14px; -webkit-mask: url("/assets/images/ui.svg#icons-editing-add"); mask: url("/assets/images/ui.svg#icons-editing-add") 2px 2px;"} | Add New Page | Reserved mostly for approved Github contributors to add a new wiki page directly to the repository.<br/><br/>If a user who isn't logged into Github clicks this they'll be prompted to login. If a regular user logged into Github clicks this it will suggest forking the Github repository and submitting a pull request. |
| ![](/assets/images/ui.svg#icons-editing-edit){:width="30px" height="30px" style="background: var(--color-secondary); padding: 14px; -webkit-mask: url("/assets/images/ui.svg#icons-editing-edit") 2px 2px; mask: url("/assets/images/ui.svg#icons-editing-edit") 2px 2px;"} | Edit Page | Reserved mostly for approved Github contributors to edit a wiki page directly in the repository.<br/><br/>Ditto to the non-logged in/regular user behavior. |
| ![](/assets/images/ui.svg#icons-editing-delete){:width="30px" height="30px" style="background: var(--color-secondary); padding: 14px; -webkit-mask: url("/assets/images/ui.svg#icons-editing-delete") 2px 2px; mask: url("/assets/images/ui.svg#icons-editing-delete") 2px 2px;"} | Delete Page | Reserved for approved Github contributors to delete a wiki page directly in the repository.<br/><br/>Ditto to the non-logged in/regular user behavior. |
| ![](/assets/images/ui.svg#icons-editing-history){:width="30px" height="30px" style="background: var(--color-secondary); padding: 14px; -webkit-mask: url("/assets/images/ui.svg#icons-editing-history") 2px 2px; mask: url("/assets/images/ui.svg#icons-editing-history") 2px 2px;"} | Page History | Displays a page's history of edits. |
| ![](/assets/images/ui.svg#icons-editing-source){:width="30px" height="30px" style="background: var(--color-secondary); padding: 14px; -webkit-mask: url("/assets/images/ui.svg#icons-editing-source") 2px 2px; mask: url("/assets/images/ui.svg#icons-editing-source") 2px 2px;"} | Page Source | Displays the raw code used to generate the page. |
| ![](/assets/images/ui.svg#icons-page-expand-expand){:width="30px" height="30px" style="background: var(--color-secondary); padding: 14px; -webkit-mask: url("/assets/images/ui.svg#icons-page-expand-expand") 2px 2px; mask: url("/assets/images/ui.svg#icons-page-expand-expand") 2px 2px;"} | Expand Wiki Width | A UI button that When clicked will toggle an expanded width of the wiki page. Useful for viewing dense/long tables on various wiki pages. Button only appears on desktop browsers. |
| ![](/assets/images/ui.svg#icons-editing-add){:width="30px" height="30px" style="background: var(--color-accent); border-radius: var(--radius-full); padding: 14px;"} ![](/assets/images/ui.svg#icons-editing-add){:width="30px" height="30px" style="background: var(--color-inverse); padding: 14px; -webkit-mask: url("/assets/images/ui.svg#icons-editing-add") 2px 2px; mask: url("/assets/images/ui.svg#icons-editing-add") 2px 2px; margin-top: -59px;"} | Prose.io - Add New Page | Opens [prose.io](https://prose.io) where you can add a new wiki page.<br/><br/>Requires an initial authorization of Prose with your Github account. See [this page](/Meta-Creating_Editing_a_Page) for more info. |
| ![](/assets/images/ui.svg#icons-editing-edit){:width="30px" height="30px" style="background: var(--color-accent); border-radius: var(--radius-full); padding: 14px;"} ![](/assets/images/ui.svg#icons-editing-edit){:width="30px" height="30px" style="background: var(--color-inverse); padding: 14px; -webkit-mask: url("/assets/images/ui.svg#icons-editing-edit") 2px 2px; mask: url("/assets/images/ui.svg#icons-editing-edit") 2px 2px; margin-top: -59px;"} | Prose.io - Edit Page | Opens [prose.io](https://prose.io) where you can edit an a wiki page.<br/><br/>Requires an initial authorization of Prose with your Github account. See [this page](/Meta-Creating_Editing_a_Page) for more info. |