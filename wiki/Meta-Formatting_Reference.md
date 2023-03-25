---
title: 'Meta: Formatting Reference'
permalink: /Meta-Formatting_Reference/
tags: [Guides]
---

This page serves as a reference guide for the various Markdown and customized styling/formatting possible when creating pages.

Each example first shows how it looks on the page, followed by the raw code used.

> **Side-note:** if a page title you're creating contains a colon character (`:`) then wrap the title in single quotes, such as used for this very page:
> ```
> title: 'Meta: Formatting Reference'
> ```

---

## Headings

## Headings - Section (h2)
### Headings - Lower importance (h3)
#### Headings - Lower importance (h4)

    ## Headings - Section (h2)
    ### Headings - Lower importance (h3)
    #### Headings - Lower importance (h4)


> **Note:** h1 headings that use a single `#` are intended to be reserved for only the page title not section headings. It's recommended to use `h2` style and lower.

---

## General

Most of this section will be familiar to Discord users.

**Bold**

    **Bold**    

*Italic*

    *Italic*

~~Strike-through~~

    ~~Strike-through~~

[Link - internal](/Meta-Formatting_Reference)

    [Link - internal](/Meta-Formatting_Reference)

[Link - external](https://wikipedia.org)

    [Link - external](https://wikipedia.org)

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

> **Tip:** you can alternatively indent any line of text by four spaces and it will become a code block.

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

> **Note:** replace `xml` with whatever the filetype you want highlighted. Eg: you'd use `lua` if the code was Lua.

> Blockquote

    > Blockquote

> Blockquote with multiple lines and `.important` class.
>
> Correct:
> ```xml
> <file code="16355565633005451293"/>
> ```
> Incorrect:
> ```xml
> <file code="snafu"/>
> ```
{:.important}

    > Blockquote with multiple lines and `.important` class.
    >
    > Correct:
    > ```xml
    > <file code="16355565633005451293"/>
    > ```
    > Incorrect:
    > ```xml
    > <file code="snafu"/>
    > ```
    {:.important}

**Horizontal rule (dividing line):**

---

```
---
```

---

## Images

**Regular:**
![](/assets/45-0-1448484425.jpg)

    ![](/assets/45-0-1448484425.jpg)

**With custom width:**
![](/assets/45-0-1448484425.jpg){:width="300px"}

    ![](/assets/45-0-1448484425.jpg){:width="300px"}

**With caption and `.thumb` width:**
![Caption text](/assets/45-0-1448484425.jpg){:.thumb}

    ![Caption text](/assets/45-0-1448484425.jpg){:.thumb}

> **Note:** the `.thumb` class limits images to 50% of the page width by default, and 30% width if combined with `.left` or `.right` classes (shown in code below). It's useful if you don't want to define a custom width but would like a smaller image.

**Aligned right and `.thumb` width:**

![](/assets/45-0-1448484425.jpg){:.thumb .right}

    ![](/assets/45-0-1448484425.jpg){:.thumb .right}
{:.clear}

> **Note:** if you need to make an element to not flow around an aligned left/right element but instead clear past it you can add a `.clear` class to the element. Eg:
> 
> ```
> > Example blockquote
> {:.clear}
> ```

**Aligned left and `.thumb` width:**

![](/assets/45-0-1448484425.jpg){:.thumb .left}

    ![](/assets/45-0-1448484425.jpg){:.thumb .left}
{:.clear}

**Aligned center and `.thumb` width:**

![](/assets/45-0-1448484425.jpg){:.thumb .center}

    ![](/assets/45-0-1448484425.jpg){:.thumb .center}

> **Note:** by default images will be aligned center anyway, if no alignment specified.

**Inline with custom width and caption:**

![Image one](/assets/45-0-1448484425.jpg){:.inline width="300px"} ![Image two](/assets/45-0-1448484425.jpg){:.inline width="300px"}

    ![Image one](/assets/45-0-1448484425.jpg){:.inline width="300px"} ![Image two](/assets/45-0-1448484425.jpg){:.inline width="300px"}

**Inline with custom width and caption, then wrapped in `.center` class:**

![Image one](/assets/45-0-1448484425.jpg){:.inline width="300px"} ![Image two](/assets/45-0-1448484425.jpg){:.inline width="300px"}
{:.center}

    ![Image one](/assets/45-0-1448484425.jpg){:.inline width="300px"} ![Image two](/assets/45-0-1448484425.jpg){:.inline width="300px"}
    {:.center}

---

## Lists

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

> **Tip:** alternatively `*` or `+` can be used as unordered list characters instead of `-`.

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

**Adding multi-line breaks for a single list item:**
- Item\
Second line of same list item
- Item\
\
We can insert empty lines, too

```
- Item\
Second line of same list item
- Item\
\
We can insert empty lines, too
```

> **Note:** such line breaks aren't rendered correctly if the list is inside a [spoiler element](#spoiler-elements). Use `<br/>` instead of `\` if inside a spoiler element.
{:.important}

> **Note:** if a list uses a manual line break and code from a code block (wrapped in ```` ``` ````) begins with a `<` character it will render everything past it incorrectly. I've found adding a non-breaking space character (alt+255) before such characters fixes this (` <`).
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

> **Note:** the `.index` class is intended for category pages. It automatically uses split styling without the need for an additional class.

> **Note:** it's also recommended for the `.index` lists to use h2 headings (`##`) since if using h3 (`###`) Jekyll's table of contents list doesn't correctly pick up on the heading directly following the list, affecting the table of contents hierarchy.
{:.important}

**Auto-generated index for category pages:**

To be used selectively for category/quasi-category pages to auto generate a list of all pages that contain the matching `tag` value.

{% include index-autolist tag="Infinite Heaven" %}

    {% raw %}
    {% include index-autolist tag="Infinite Heaven" %}
    {% endraw %}

> **Tip:** can add a `.small` class to the end (`...%}{:.small}`) to decrease the font size for a more discrete list.

> **Tip:** can add `type="dedicated"` within the Jekyll include line to change the title of the list to 'Alphabetical' instead of 'Related pages'. Intended for pages dedicated to being a category page.

---

## Tables

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

---

## Infobox

Floating sidebar for program/tool/script information.

{% include infobox dev="choc, Joey, others" site="https://mgsvmoddingwiki.github.io/" download="https://mgsvmoddingwiki.github.io/Meta-Formatting_Reference" %}

- By default the name will be detected from the page it's included on but this can be overridden by adding a `name=""` attribute and value.

- The `dev`, `site` and `download` values are all optional and can be removed/added as needed. Javascript will automatically detect the base domain names from provided URLs and will show them for the visible link names.

```
{% raw %}
{% include infobox dev="choc, Joey, others" site="https://mgsvmoddingwiki.github.io/" download="https://mgsvmoddingwiki.github.io/Meta-Formatting_Reference" %}
{% endraw %}
```
{:.clear}

> **Note:** always place the include line at the start of a page, before the opening paragraphs. That way it properly makes the text flow around it.

---

## Spoiler elements

We can add expandable sections that are collapsed by default, like the table of contents at the start of every page.

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

> **Note:** always leave an empty line after the `spoiler-start` line.
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

> **Tip:** anything can be added between the `spoiler-start` and `spoiler-end`. Multiple lines, elements, etc.

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

> **Note:** nested spoilers are best avoided unless there's a good reason for them but they're demonstrated here to show it's possible.

> **Note:** spoilers within other types of elements (like within tables and list items) aren't supported.
{:.important}

> **Note:** some formatting behaves differently when placed in a spoiler element. For instance, manual line breaks in lists (using `\`) need to instead be `<br/>`.
{:.important}

---

## Videos

The wiki uses customized templates for embedding videos.

**Native video files:**

{% include video url="/assets/VideoGimmick01.webm" %}

    {% raw %}{% include video url="/assets/VideoGimmick01.webm" %}{% endraw %}

> **Note:** use the URL of the video for the `url` value. Here showing a video hosted on the wiki itself so using the root path format, like for images.

**Changing width and placement:**

Similiar to the images section we can use classes to change the width/position. Here using the `.thumb` class to make the video smaller. We can also use `.left`/`.right`.

{% include video url="/assets/VideoGimmick01.webm" %}{:.thumb}

    {% raw %}{% include video url="/assets/VideoGimmick01.webm" %}{:.thumb}{% endraw %}

> **Note:** changing size via `width=""` isn't supported for videos.

**Adding a caption:**

{% include video url="/assets/VideoGimmick01.webm" caption="Ventos' capture from the FoxKit: TppSharedGimmickData wiki page" %}{:.thumb}

    {% raw %}{% include video url="/assets/VideoGimmick01.webm" caption="Ventos' capture from the FoxKit: TppSharedGimmickData wiki page" %}{:.thumb}{% endraw %}

**Youtube embeds:**

{% include youtube id="pHjgbENgnvA" %}

    {% raw %}{% include youtube id="pHjgbENgnvA" %}{% endraw %}

> **Note:** use the ID of the video for the `id` value.

> **Tip:** like the native video file embeds the Youtube embeds support adding the same classes as above and also captions.

**Vimeo embeds:**

{% include vimeo id="123281253" %}

    {% raw %}{% include vimeo id="123281253" %}{% endraw %}

> **Note:** use the ID of the video for the `id` value.

> **Tip:** like the native video file embeds the Vimeo embeds support adding the same classes as above and also captions.