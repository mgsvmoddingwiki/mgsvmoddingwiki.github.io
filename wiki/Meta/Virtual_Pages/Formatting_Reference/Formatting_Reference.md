---
title: 'Formatting Reference'
permalink: /Meta/Virtual_Pages/Formatting_Reference/
tags: [Meta]
---

This page covers formatting for [Virtual Pages](/Meta/Virtual_Pages/) and the differences to the [regular syntax](/Meta/Formatting_Reference/).

Click the spoiler labels to show each section.

---

```cpp
Terrain : Fox.Core.TransformData 
```

## Headings

Headings share the [regular syntax](/Meta/Formatting_Reference/#headings).

> Small thing to keep in mind is making sure the first heading on the page is higher hierarchy than any the second heading (if there is one), since the Javascript-based table of contents generation for virtual pages will fail otherwise.\
\
Eg: h2 (`##`) followed by a h3 (`###`, or another h2) is fine, just not starting with h3 and then having a h2 second.
{:.note}

---

## General

General styling shares the [regular syntax](/Meta/Formatting_Reference/#lists), with the following differences:

> Blockquote classes don't get applied if the blockquote is within any list item (even if only one level deep).
{:.important}

> Minor code syntax highlighting differences due to a simpler parser used on virtual pages.
{:.note}

---

## Footnotes

Footnotes are unsupported in virtual pages.

---

## Images

Images share the [regular syntax](/Meta/Formatting_Reference/#images), with the following caveat:

> Unlike the Jekyll-based Kramdown parsing of images any filenames containing spaces have to be manually escaped in virtual pages, using `%20` in place of any space character.\
\
Eg: `![](/assets/Example%20with%20spaces.jpg)` instead of `![](/assets/Example with spaces.jpg)`.
{:.important}

---

## Lists

Lists share the [regular syntax](/Meta/Formatting_Reference/#lists), with the following differences:

> Any nested lists where you want to add a class to the outermost list you need to add a single empty new line between the end of the list and the class, instead of the class being flush beneath the last item. Eg:
> ```
> - Parent item
>    - Child item
> - Parent item
>     - Child item
>
> {:.split}
> ```
{:.note}

> No support for starting an ordered list from a different number (ie: `{:start="<number>"}` is unsupported).
{:.note}

> Line breaks of list items within spoiler elements **don't** require using `<br/>` (though these are still supported). Instead you can use the typical `\` that would be used outside spoiler elements.
{:.note}

---

## Index lists (auto-generated)

{% include spoiler-start %}

**Unique split style with headings using .index class:**

Same as [regular syntax](/Meta/Formatting_Reference/#index-lists-incl-auto-generated), with the following caveat:

> As noted in the above [lists](#lists) section caveats you'll need to add the `{:.index}` line with a single empty new line above it, between the end of the last list item and the class line, or else on virtual pages the class won't get applied to the root parent list.
{:.note}

**Auto-generated index for category pages:**

Same as [regular syntax](/Meta/Formatting_Reference/#index-lists-incl-auto-generated).

> **Important:** it's not recommended using this tag-based index include in virtual pages as the LiquidJS parser used for virtual pages struggles with performance of large Liquid loops, causing multi-second page load hitches.<br/>
<br/>
> Best to only use the section pages include (below) for virtual pages.
{:.important}

**Auto-generated index for multi-level section pages:**

This can be used to auto populate a list of direct child pages of a virtual page section. 

{% include index-autolist type="section" %}

    {% raw %}
    {% include index-autolist type="section" %}
    {% endraw %}

> Nothing will appear in this example list since this page doesn't contain child pages.
{:.note}

{% include spoiler-end %}

---

## Tables

Tables differ in their syntax compared to the [regular formatting](/Meta/Formatting_Reference/#tables), in that they *always require* headings (even if they're empty) in order for the entire table to be rendered. Also a difference in using the `.stretch` class.

{% include spoiler-start %}

So for the **Basic** heading on that linked page instead of being headerless it necessitates empty headers as follows:

**Basic:**

| First row text  | First row text  | First row text    |
| Second row text | Second row text | Second row text   |

```
|                 |                 |                   |
|-----------------|-----------------|-------------------|
| First row text  | First row text  | First row text    |
| Second row text | Second row text | Second row text   |
```

**Basic with compact syntax:**

| First row text | First row text | First row text |
| Second row text | Second row text | Second row text |

```
| | | |
|-|-|-|
| First row text | First row text | First row text |
| Second row text | Second row text | Second row text |
```

**Stretched:**

| First row text | First row text | First row text |
{:.stretch}

```
| | | |
|-|-|-|
| First row text | First row text | First row text |

{:.stretch}
```

> The stretch class only works if adding an empty new line between the end of the last table cell and the class line, similar to the caveat for adding classes to [lists](#lists) in virtual pages.
{:.note}

{% include spoiler-end %}

---

## Infobox

Infobox shares the [regular syntax](/Meta/Formatting_Reference/#infobox).

---

## Spoiler elements

Spoiler elements share the [regular syntax](/Meta/Formatting_Reference/#spoiler-elements).

---

## Videos

Videos share the [regular syntax](/Meta/Formatting_Reference/#videos), with the exeption of not supporting adding classes/attributes to change their size/position (so they'll always be full width).

---

## Download button

Download buttons share the [regular syntax](/Meta/Formatting_Reference/#download-button).

---

## Widgets

Widgets are unsupported in virtual pages.