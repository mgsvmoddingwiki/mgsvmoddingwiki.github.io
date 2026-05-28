---
title: 'Formatting Reference'
permalink: /Meta/Formatting_Reference/
tags: [Meta, Guides]
redirect_from:
    - /Meta-Formatting_Reference/
---

This page serves as a reference guide for the various Markdown and customized styling/formatting possible when creating pages.

Each example first shows how it looks on the page, followed by the raw code used. Click the spoiler labels to show each section.

> For how to format page metadata (title, URL, tags, redirections) when creating/editing a page, along with how to organize files check out this [other guide](/Meta/Creating_Editing_Pages/Metadata_Organization/).

---

## Headings

{% include spoiler-start %}

## Headings - Section (h2)
### Headings - Lower importance (h3)
#### Headings - Lower importance (h4)

    ## Headings - Section (h2)
    ### Headings - Lower importance (h3)
    #### Headings - Lower importance (h4)


> H1 headings that use a single `#` are intended to be reserved for only the page title not section headings. It's recommended to use `h2` style and lower.
{:.note}

{% include spoiler-end %}

---

## General

Most of this section will be familiar to Discord users.

{% include spoiler-start %}

### Text

**Bold**

    **Bold**    

*Italic*

    *Italic*

~~Strike-through~~

    ~~Strike-through~~

### Links

[Link - internal](/Meta)

    [Link - internal](/Meta)

[Link - jump to section on same page](#tables)

    [Link - jump to section on same page](#tables)

> If linking to another page can use eg: `[Name](/Page#section)` or `[Name](/Page/#section)`.
{:.tip}

[Link - external](https://wikipedia.org)

    [Link - external](https://wikipedia.org)

### Code

`Inline code`

    `Inline code`    

```
Code block:
<safiles>
    <file code="16355565633005451293"/>
</safiles>
```

    ```
    Code block:
    <safiles>
        <file code="16355565633005451293"/>
    </safiles>
    ```

> You can alternatively indent any line of text by four spaces and it will become a code block.
{:.tip}

```xml
Code block with syntax highlighting:
<safiles>
    <file code="16355565633005451293"/>
</safiles>
```

    ```xml
    Code block with syntax highlighting:
    <safiles>
        <file code="16355565633005451293"/>
    </safiles>
    ```

> Replace `xml` with whatever the filetype you want highlighted. Eg: you'd use `lua` if the code was Lua.
{:.not}

### Blockquotes

> Blockquote

    > Blockquote

**With classes to draw attention:**

> Blockquote with multiple lines and `important` class.
>
> Code block:
> ```xml
> <file code="16355565633005451293"/>
> ```
{:.important}

    > Blockquote with multiple lines and `.important` class.
    >
    > Code block:
    > ```xml
    > <file code="16355565633005451293"/>
    > ```
    {:.important}

> Blockquote with `tip` class.
{:.tip}

    > Blockquote with `tip` class.
    {:.tip}

> Blockquote with `note` class.
{:.note}

    > Blockquote with `note` class.
    {:.note}

> Blockquote with `needs-revision` class. For noting where a page needs editing or expansion.
> 
> Can also search for pages which have this by using the query `.needs-revision` (assuming the *Ignore markup* search filter isn't enabled).
{:.needs-revision}

    > Blockquote with `needs-revision` class. For noting where a page needs editing or expansion.
    > 
    > Can also search for pages which have this by using the query `.needs-revision` (assuming the *Ignore markup* search filter isn't enabled).
    {:.needs-revision}

### Miscellaneous

**Horizontal rule (dividing line):**

---

```
---
```

{% include spoiler-end %}

---

## Footnotes

{% include spoiler-start %}

To add a footnote first add a footnote name like {% raw %}`[^my-footnote-name]`{% endraw %} among the text. The same name can be reused throughout the text to refer to the same footnote definition.

> Footnote names can be in any case (not just lowercase) but can't use spaces.

Then for the definition add the the same syntax but suffixed with a colon, like {% raw %}`[^my-footnote-name]:`{% endraw %}, followed by the definition text.

**Example:**

This is one reference[^example].

[^example]: And the definition here.

And some another reference[^another] in following text. This[^example] reference reuses the earlier one.

[^another]: Here's another definition.

```
{% raw %}
This is one reference[^example].

[^example]: And the definition here.

And some another reference[^another] in following text. This[^example] reference reuses the earlier one.

[^another]: Here's another definition.
{% endraw %}
```

> As you can see from the example the definition can be placed anywhere in the text, it doesn't have to be at the bottom of the page. The processor will itself remove the definition and always place it in a [References](#meta-references) section at the bottom of the page.
{:.tip}

> After clicking on the reference you can return to the text that included the footnote link by hovering over the defintion text and clicking the return arrow backlink button. If the footnote was used multiple times in the text there will be multiple backlinks.
{:.tip}

> Indented code immediately following a footnote definition will become part of the definition. If this is unintended it can be avoided by removing the indentation and instead wrapping the code block in the three backtick ({% raw %}```{% endraw %}) syntax.
{:.note}

{% include spoiler-end %}

---

## Images

{% include spoiler-start %}

**Regular:**
![](/assets/45-0-1448484425.jpg)

    ![](/assets/45-0-1448484425.jpg)

**With custom width:**
![](/assets/45-0-1448484425.jpg){:width="300px"}

    ![](/assets/45-0-1448484425.jpg){:width="300px"}

**With caption and `.thumb` width:**
![Caption text](/assets/45-0-1448484425.jpg){:.thumb}

    ![Caption text](/assets/45-0-1448484425.jpg){:.thumb}

> The `.thumb` class limits images to 50% of the page width by default, and 30% width if combined with `.left` or `.right` classes (shown in code below). It's useful if you don't want to define a custom width but would like a smaller image.
{:.note}

**Aligned right and `.thumb` width:**

![](/assets/45-0-1448484425.jpg){:.thumb .right}

    ![](/assets/45-0-1448484425.jpg){:.thumb .right}
{:.clear}

> If you need to make an element to not flow around an aligned left/right element but instead clear past it you can add a `.clear` class to the element. Eg:
> 
> ```
> > Example blockquote
> {:.clear}
> ```
{:.note}

**Aligned left and `.thumb` width:**

![](/assets/45-0-1448484425.jpg){:.thumb .left}

    ![](/assets/45-0-1448484425.jpg){:.thumb .left}
{:.clear}

**Aligned center and `.thumb` width:**

![](/assets/45-0-1448484425.jpg){:.thumb .center}

    ![](/assets/45-0-1448484425.jpg){:.thumb .center}

> By default images will be aligned center anyway, if no alignment specified.
{:.note}

**Inline with custom width and caption:**

![Image one](/assets/45-0-1448484425.jpg){:.inline width="300px"} ![Image two](/assets/45-0-1448484425.jpg){:.inline width="300px"}

    ![Image one](/assets/45-0-1448484425.jpg){:.inline width="300px"} ![Image two](/assets/45-0-1448484425.jpg){:.inline width="300px"}

**Inline with custom width and caption, then wrapped in `.center` class:**

![Image one](/assets/45-0-1448484425.jpg){:.inline width="300px"} ![Image two](/assets/45-0-1448484425.jpg){:.inline width="300px"}
{:.center}

    ![Image one](/assets/45-0-1448484425.jpg){:.inline width="300px"} ![Image two](/assets/45-0-1448484425.jpg){:.inline width="300px"}
    {:.center}

{% include spoiler-end %}

---

## Lists

{% include spoiler-start %}

**Unordered list with sub-items:**

- Item
    - Sub-item
- Item
    - Sub-item

```
- Item
    - Sub-item
- Item
    - Sub-item
```

> Alternatively `*` or `+` can be used as unordered list characters instead of `-`.
{:.tip}

**Ordered list with sub-items:**

1. Item
    1. Sub-item
    2. Sub-item
2. Item
    1. Sub-item

```
1. Item
    1. Sub-item
    2. Sub-item
2. Item
    1. Sub-item
```

> If you'd like to begin an ordered list at a different starting number then prefix the list with `{:start="<number>"}`, like so:
>   ```
>   {:start="8"}
>   8. Item
>   9. Item
>   ```
{:.tip}

**Adding multi-line breaks for a single list item:**
- Item<br/>
Second line of same list item
- Item<br/>
<br/>
We can insert empty lines, too

```
- Item\
Second line of same list item
- Item\
\
We can insert empty lines, too
```

> Such line breaks aren't rendered correctly if the list is inside a [spoiler element](#spoiler-elements). Use `<br/>` instead of `\` if inside a spoiler element.
{:.important}

**Split style with `.split` class:**
- Item
    - Sub-item
- Item
    - Sub-item
{:.split}

```
- Item
    - Sub-item
- Item
    - Sub-item
{:.split}
```

{% include spoiler-end %}

---

## Index lists (incl. auto-generated)

These are intended for category/quasi-category pages which have related tags or are part of a section (eg: *Guides*, *Infinite Heaven*, *Reference*, etc).

{% include spoiler-start %}

**Unique split style with headings using `.index` class:**
- ## Category heading
    + [Linked page]()
    + [Linked page]()
- ## Category heading
    + [Linked page]()
    + [Linked page]()
{:.index}

```
- ## Category heading
    + [Linked page]()
    + [Linked page]()
- ## Category heading
    + [Linked page]()
    + [Linked page]()
{:.index}
```

> The `.index` class automatically uses split styling without the need for an additional class.
{:.note}

> It's also recommended for the `.index` lists to use h2 headings (`##`) since if using h3 (`###`) Jekyll's table of contents list doesn't correctly pick up on the heading directly following the list, affecting the table of contents hierarchy.
{:.important}

**Auto-generated index for category pages:**

To show all pages of a given tag we can use the `index-autolist` include like the following. This will fill an index list automatically.

{% include index-autolist tag="Infinite Heaven" %}

    {% raw %}
    {% include index-autolist tag="Infinite Heaven" %}
    {% endraw %}

> For a more discreet list size you can add a `.small` class to the end of the include (`{% raw %}{% include ... %}{:.small}{% endraw %}`) to decrease the font size.
{:.tip}

> For tag indexes you can also add `heading="alpha"` within the Jekyll include line to change the heading of a list to 'Alphabetical' instead of 'Related pages'.
{:.tip}

**Auto-generated index for multi-level section pages:**

For multi-level path pages (eg: `/Example_Page/Second_Level/`), where we want a list of direct child pages (eg: `/../../Third_Level/`) the following can be used. This is particularly useful if the pages aren't categorized by (or intentionally lack) tags.

{% include index-autolist type="section" %}

    {% raw %}
    {% include index-autolist type="section" %}
    {% endraw %}

> Nothing will appear in this example list since this page doesn't have a multi-level path with child pages. Also unlike the tag index the content of section indexes is generated by Javascript.
{:.note}

{% include spoiler-end %}

---

## Tables

{% include spoiler-start %}

**Basic:**

| First row text  | First row text  | First row text    |
| Second row text | Second row text | Second row text   |

```
| First row text  | First row text  | First row text    |
| Second row text | Second row text | Second row text   |
```

**With headings:**

| Heading One     | Heading Two     | Heading Three     |
|-----------------|-----------------|-------------------|
| First row text  | First row text  | First row text    |

```
| Heading One     | Heading Two     | Heading Three     |
|-----------------|-----------------|-------------------|
| First row text  | First row text  | First row text    |
```

**With aligned text:**

| Right-aligned             | Center-aligned            | Left-aligned                |
|--------------------------:|:-------------------------:|:----------------------------|
| First row text. Foo bar.  | First row text. Foo bar.  | First row text. Foo bar.    |

```
| Right-aligned             | Center-aligned            | Left-aligned                |
|--------------------------:|:-------------------------:|:----------------------------|
| First row text. Foo bar.  | First row text. Foo bar.  | First row text. Foo bar.    |
```

**Alternative compact syntax:**

| Default aligned | Right-aligned | Center-aligned | Left-aligned |
|-|-:|:-:|:-|
| First row text. Foo bar. | First row text. Foo bar. | First row text. Foo bar. | First row text. Foo bar. |

```
| Default aligned | Right-aligned | Center-aligned | Left-aligned |
|-|-:|:-:|:-|
| First row text. Foo bar. | First row text. Foo bar. | First row text. Foo bar. | First row text. Foo bar. |
```

**Adding manual line breaks:**

| First row text<br/>Another line  | `Code example {`<br/>`Another line`<br/>`}`  | First row text    |

```
| First row text<br/>Another line  | `Code example {`<br/>`Another line`<br/>`}`  | First row text    |
```

> Manual line breaks within table cells have to use the HTML `<br/>` line break. Empty new lines can be made by doubling the line breaks (`<br/><br/>`).
{:.note}

**Stretched:**

| First row text  | First row text  | First row text    |
{:.stretch}

```
| First row text  | First row text  | First row text    |
{:.stretch}
```

> This class can be applied to a table to force it to expand to the page width. Keep in mind this prevents any horizontal scrollbar at narrower browser widths if there are too many table columns, so use thoughtfully.
{:.note}

{% include spoiler-end %}

---

## Infobox

Floating sidebar for program/tool/script information.

{% include spoiler-start %}

{% include infobox dev="choc, Joey" site="https://mgsvmoddingwiki.github.io/" download="https://mgsvmoddingwiki.github.io/Meta/Formatting_Reference" sourcecode="https://github.com/mgsvmoddingwiki/mgsvmoddingwiki.github.io" %}

- By default the name will be detected from the page it's included on but this can be overridden by adding a `title=""` attribute and value.

- The `dev`, `site`, `download` and `sourcecode` values are all optional and can be removed/added as needed. Javascript will automatically detect the base domain names from provided URLs and will show them for the visible link names.

- To add multiple names to the `dev` item separate each name by a comma and a space (`, `). Multiple URLs can also be added to the `site`, `download` and `sourcecode` items by separating the URLs with a space (any literal spaces in a URL can be replaced with `%20`).

```
{% raw %}
{% include infobox dev="choc, Joey" site="https://mgsvmoddingwiki.github.io/" download="https://mgsvmoddingwiki.github.io/Meta/Formatting_Reference" sourcecode="https://github.com/mgsvmoddingwiki/mgsvmoddingwiki.github.io" %}
{% endraw %}
```
{:.clear}

> Place the include line before the opening paragraphs so text properly flows around it.
{:.note}

{% include spoiler-end %}

---

## Spoiler elements

We can add expandable sections that are collapsed by default, like all those on this page and the table of contents.

{% include spoiler-start %}

It's best to only use spoilers for secondary information that would otherwise take up too much space, or when it helps the readability of the page.

**Default:**

{% include spoiler-start %}

> Hey, you found me.
{:.important}

{% include spoiler-end %}

    {% raw %}
    {% include spoiler-start %}
    
    > Hey, you found me.
    {:.important}

    {% include spoiler-end %}
    {% endraw %}

> Always leave an empty line after the `spoiler-start` line.
{:.important}

**With custom title:**

{% include spoiler-start title="Example" %}

1. Item
2. Item

{% include spoiler-end %}

    {% raw %}
    {% include spoiler-start title="Example" %}
    
    1. Item
    2. Item
    
    {% include spoiler-end %}
    {% endraw %}

> Anything can be added between the `spoiler-start` and `spoiler-end`. Multiple lines, elements, etc.
{:.tip}

**With important class**

{% include spoiler-start %}

Something relevant.

{% include spoiler-end %}
{:.important}

    {% raw %}
    {% include spoiler-start %}

    Something relevant.

    {% include spoiler-end %}
    {:.important}
    {% endraw %}

**Nested spoilers:**

{% include spoiler-start title="Outer spoiler" %}

Some text

{% include spoiler-start title="Inner spoiler" %}

Some other text

{% include spoiler-end %}
{% include spoiler-end %}

    {% raw %}
    {% include spoiler-start title="Outer spoiler" %}

    Some text

    {% include spoiler-start title="Inner spoiler" %}

    Some other text

    {% include spoiler-end %}
    {% include spoiler-end %}
    {% endraw %}

> Nested spoilers are best avoided unless there's a good reason for them but they're demonstrated here to show it's possible.
{:.note}

> Spoilers within other types of elements (like within tables and list items) aren't supported.
{:.important}

> Any list within a spoiler element that has a code block (wrapped in ```` ``` ````) in it beginning with a `<` character will cause the everything past that point to render incorrectly. In such a case you can prefix a non-breaking space character (alt+255) to resolve this issue (` <`).
{:.note}

{% include spoiler-end %}

---

## Videos

{% include spoiler-start %}

**Native video files:**

{% include video url="/assets/VideoGimmick01.webm" %}

    {% raw %}{% include video url="/assets/VideoGimmick01.webm" %}{% endraw %}

> Use the URL of the video for the `url` value. Here showing a video hosted on the wiki itself so using the root path format, like for images.
{:.note}

> Video embeds are best avoided being placed within lists. It breaks the formatting of subsquent list items. Placing them around regular paragraph text is fine though.
{:.important}

**Changing width and placement:**

Similiar to the images section we can use classes to change the width/position. Here using the `.thumb` class to set its max width to around half the page width. We can also additionally use `.left`/`.right` to set position.

{% include video url="/assets/VideoGimmick01.webm" %}{:.thumb}

    {% raw %}{% include video url="/assets/VideoGimmick01.webm" %}{:.thumb}{% endraw %}

> Changing size via `width=""` isn't supported for videos.
{:.note}

**Adding a caption:**

{% include video url="/assets/VideoGimmick01.webm" caption="Ventos' capture from the FoxKit: TppSharedGimmickData wiki page" %}{:.thumb}

    {% raw %}{% include video url="/assets/VideoGimmick01.webm" caption="Ventos' capture from the FoxKit: TppSharedGimmickData wiki page" %}{:.thumb}{% endraw %}

**Youtube embeds:**

{% include youtube id="pHjgbENgnvA" %}

    {% raw %}{% include youtube id="pHjgbENgnvA" %}{% endraw %}

> Use the ID of the video for the `id` value.
{:.note}

> Like the native video file embeds the Youtube embeds support adding the same classes as above and also captions.
{:.tip}

**Vimeo embeds:**

{% include vimeo id="123281253" %}

    {% raw %}{% include vimeo id="123281253" %}{% endraw %}

> Use the ID of the video for the `id` value.
{:.note}

> Like the native video file embeds the Vimeo embeds support adding the same classes as above and also captions.
{:.tip}

{% include spoiler-end %}

---

## Download button

{% include spoiler-start %}

You can link files like regular links however a download button is useful when you'd like to force the browser to download a file instead of displaying it (for example `.txt` files or images) and/or prefer a styled download link to make files more obvious on the page.

{% include download file="/assets/Chimera_Package_Table/ChimeraPartsPackageTable.lua" %}

    {% raw %}{% include download file="/assets/Chimera_Package_Table/ChimeraPartsPackageTable.lua" %}{% endraw%}

**Adding a custom name:**

{% include download file="/assets/Chimera_Package_Table/ChimeraPartsPackageTable.lua" name="Custom name" %}

    {% raw %}{% include download file="/assets/Chimera_Package_Table/ChimeraPartsPackageTable.lua" name="Custom name" %}{% endraw%}

{% include spoiler-end %}

---

## Widgets

{% include spoiler-start %}

### Embedded page highlight

**All featured pages:**

{% include embed-page-highlight type="featured" %}

    {% raw %}{% include embed-page-highlight type="featured" %}{% endraw %}

**All pages of a specific tag:**

{% include embed-page-highlight type="tag" tag="FoxKit" %}

    {% raw %}{% include embed-page-highlight type="tag" tag="FoxKit" %}{% endraw %}

**Single page, with custom height:**

{% include embed-page-highlight type="single" permalink="/File_Formats" height="300" %}

    {% raw %}{% include embed-page-highlight type="single" permalink="/File_Formats" height="300" %}{% endraw %}

> The `permalink` value uses the same path as you'd link other pages with.

> As you can see if a page lacks an image (none in its metadata, no image in the content, or if the image fails to load) then the page text will be used for the background.

### Recent wiki changes

This is currently expected to be on the home page, within a particular grid layout but it can be embedded standalone, too.

{% include recent-changes %}

    {% raw %}{% include recent-changes %}{% endraw %}

> Optionally can add `type="full"` to expand fully and hide heading. This is intended only for the dedicated [Recent Changes](/Meta/Recent_Changes) page.

{% include spoiler-end %}

---

## Sidebar menu icons

For those editing the sidebar of the wiki itself these are a list of available custom icons to choose from.

{% include spoiler-start %}

| Icon | Class | Notes |
|-|-|-|
| [](/){:.iconed.icon-sidebar.icon-curly-brackets} | `icon-curly-brackets` |  |
| [](/){:.iconed.icon-sidebar.icon-diamond} | `icon-diamond` | Intended for home page |
| [](/){:.iconed.icon-sidebar.icon-discord} | `icon-discord` | For Discord links |
| [](/){:.iconed.icon-sidebar.icon-globe} | `icon-globe` | For generic external links |
| [](/){:.iconed.icon-sidebar.icon-lightbulb} | `icon-lightbulb` |  |
| [](/){:.iconed.icon-sidebar.icon-nexusmods} | `icon-nexusmods` | For Nexus Mods links |
| [](/){:.iconed.icon-sidebar.icon-nodes} | `icon-nodes` | For eg: Entity Reference section |
| [](/){:.iconed.icon-sidebar.icon-open-pages} | `icon-open-pages` |  |
| [](/){:.iconed.icon-sidebar.icon-package} | `icon-package` | For eg: file formats |
| [](/){:.iconed.icon-sidebar.icon-page} | `icon-page` | |
| [](/){:.iconed.icon-sidebar.icon-tag} | `icon-tag` |  |
| [](/){:.iconed.icon-sidebar.icon-text-caret} | `icon-text-caret` |  |
| [](/){:.iconed.icon-sidebar.icon-tool} | `icon-tool` |  |
| [](/){:.iconed.icon-sidebar.icon-youtube} | `icon-youtube` | For Youtube links |

As a full example of the classes/structure needed for a menu item in the sidebar here's the code for single list item in an unordered list (`ul`) element:

```html
<ul>
    <li>
        <a class="iconed icon-sidebar icon-curly-brackets" href="/Meta/Formatting_Reference">
            <span class="label">Formatting Reference</span>
        </a>
    </li>
</ul>
```

{% include spoiler-end %}