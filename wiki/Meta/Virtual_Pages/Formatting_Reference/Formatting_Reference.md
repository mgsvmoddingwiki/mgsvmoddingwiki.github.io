---
title: 'Formatting Reference'
permalink: /Meta/Virtual_Pages/Formatting_Reference/
tags: [Meta]
---

This page covers formatting for [Virtual Pages](/Meta/Virtual_Pages/) and the differences to the [regular syntax](/Meta/Formatting_Reference/). The differences mostly affect tables syntax and lack of custom classes. Most Markdown formatting is identical though.

Click the spoiler labels to show each section.

---

## Headings

Headings are identical to the [regular syntax](/Meta/Formatting_Reference/#headings).

> Small thing to keep in mind is making sure the first heading on the page is higher hierarchy than any the second heading (if there is one), since the Javascript-based table of contents generation for virtual pages will fail otherwise.\
\
Eg: h2 (`##`) followed by a h3 (`###`, or another h2) is fine, just not starting with h3 and then having a h2 second.
{:.note}

---

## General

General is the same as the [regular syntax](/Meta/Formatting_Reference/#lists), with the exception of lacking support for blockquote classes.

---

## Footnotes

Footnotes are unsupported in virtual pages.

---

## Images

Unlike the [regular syntax](/Meta/Formatting_Reference/#images) there's no support for scaling the images smaller or aligning them to the left/right. So all images will appear their full width and centered.

{% include spoiler-start %}

![Caption text](/assets/45-0-1448484425.jpg)

    ![Caption text](/assets/45-0-1448484425.jpg)

> As you can see captions are still supported.
{:.tip}

{% include spoiler-end %}

---

## Lists

Lists share the same syntax as the [regular syntax](/Meta/Formatting_Reference/#lists), with the exception of lacking a `{% raw %}{:.split}{% endraw %}` class feature.

---

## Index lists (auto-generated)

{% include spoiler-start %}

**Unique split style with headings using .index class:**

Unsupported in virtual pages.

**Auto-generated index for category pages:**

Same syntax as [regular](/Meta/Formatting_Reference/#index-lists-incl-auto-generated).

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

Tables differ in their syntax compared to the [regular formatting](/Meta/Formatting_Reference/#tables), in that they *always require* headings (even if they're empty) in order for the entire table to be rendered.

Also the `{% raw %}{:.stretch}{% endraw %}` class feature is unsupported.

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

{% include spoiler-end %}

---

## Infobox

Infobox shares same syntax as the [regular syntax](/Meta/Formatting_Reference/#infobox).

---

## Spoiler elements

Spoiler elements share same syntax as the [regular syntax](/Meta/Formatting_Reference/#spoiler-elements).

---

## Videos

Videos share same syntax as the [regular syntax](/Meta/Formatting_Reference/#videos) with the exeption of lacking classes to change their size/position/caption.

---

## Download button

Download button shares same syntax as the [regular syntax](/Meta/Formatting_Reference/#download-button).

---

## Widgets

Widgets are unsupported in virtual pages.