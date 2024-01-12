---
title: 'Formatting Reference'
permalink: /Meta/Virtual_Pages/Formatting_Reference/
tags: [Meta]
---

This page covers formatting for [Virtual Pages](/Meta/Virtual_Pages/) and the differences to the [regular syntax](/Meta/Formatting_Reference/). The differences mostly affect tables syntax, lack of custom classes and limited Liquid 'includes' support. Most Markdown formatting is identical though.

> Further support for Liquid includes may be added in the future.

Click the spoiler labels to show each section.

---

## Headings

Headings are identical to the [regular syntax](/Meta/Formatting_Reference/#headings). 

---

## General

General is the same as the [regular syntax](/Meta/Formatting_Reference/#lists), with the exception of lacking an `{% raw %}{:.important}{% endraw %}` class feature for blockquotes.

---

## Images

Unlike regular page syntax there's no support for scaling the images smaller or aligning them to the left/right. So all images will appear their full width and centered.

{% include spoiler-start %}

![](/assets/45-0-1448484425.jpg)

    ![](/assets/45-0-1448484425.jpg)

{% include spoiler-end %}

---

## Lists

Lists share the same syntax as the [regular syntax](/Meta/Formatting_Reference/#lists), with the exception of lacking a `{% raw %}{:.split}{% endraw %}` class feature.

---

## Index lists (auto-generated)

{% include spoiler-start %}

**Auto-generated index for multi-level section pages:**

This can be used to auto populate a list of direct child pages of a virtual page section. 

{% include index-autolist type="section" %}

    {% raw %}
    {% include index-autolist type="section" %}
    {% endraw %}

> **Note:** nothing will appear in this example list since this page doesn't have a multi-level path with child pages.

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

## Spoiler elements

Lists share the same syntax as the [regular syntax](/Meta/Formatting_Reference/#spoiler-elements), with the exception of lacking support for custom titles.