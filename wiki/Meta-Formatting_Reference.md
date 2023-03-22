---
title: 'Meta: Formatting Reference'
permalink: /Meta-Formatting_Reference/
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

    Code block with syntax highlighting:
    ```xml
    <safiles>
        <file code="16355565633005451293"/>
    </safiles>
    ```

> **Note:** replace `xml` with whatever the filetype you want highlighted. Eg: you'd use `lua` if the code was Lua.

> Blockquote

    > Blockquote

> Blockquote with `.important` class.
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

    > Blockquote with `.important` class.
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

> **Note:** since text on page will flow around images when they're aligned right/left both these examples are shown in code form only. Otherwise the images would look odd without paragraphs of text surrounding them.

**Aligned left and `.thumb` width:**

    ![](/assets/45-0-1448484425.jpg){:.thumb .left}

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

**Divided style with `.split` class:**
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

**Split style with headings and additional `.index` class:**
- ### Category heading
    + [Linked page]()
    + [Linked page]()
- ### Category heading
    + [Linked page]()
    + [Linked page]()
{:.index .split}

```
- ### Category heading
    + [Linked page]()
    + [Linked page]()
- ### Category heading
    + [Linked page]()
    + [Linked page]()
{:.index .split}
```

> **Note:** the `.index` class is intended for category pages.

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