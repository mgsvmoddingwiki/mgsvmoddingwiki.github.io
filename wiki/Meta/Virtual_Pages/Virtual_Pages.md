---
title: Virtual Pages
permalink: /Meta/Virtual_Pages/
tags: [Meta]
---

A unique feature we've added to this wiki is the ability to create a [section](/Meta/Creating_Editing_Pages/Metadata_Organization/Creating_a_Section/) with Javascript rather than Jekyll (the software the wiki uses normally to auto generate the site).

## Motivations

This allows the wiki to save a *lot* of time when generating (building) the pages. For example with ~1400 pages it can take several minutes to build the site while with virtual pages there's no time spent building the virtual pages as they're read and converted on-the-fly using Javascript.

> This is only relevant since longer build times means more waiting for changes to appear on the wiki and also Github seems to have issues with overly long builds.

Keep in mind that there are limitations to this approach (outlined below) so it's only useful for scenarios where *hundreds* of pages need to added.

## Differences

To the reader the pages appear almost identical but under the hood there are some differences:

- Virtual pages require a single 'real', Jekyll-based page to serve as the root basis for all child virtual pages. Eg: the [Entity Reference](/Entity_Reference) page is a real page, while all its child pages are virtual.
- The URLs have a `/?/` following the real page basis. Such as `/Entity_Reference/?/Fox/`.
- Virtual pages use a different and more limited kind of Markdown formatting (CommonMark/Github Flavored Markdown) than the version Jekyll uses (Kramdown). This means less options for content styling and some code differences.
- Limited Liquid 'includes' support. Includes are used on the wiki for things like spoilers, embedding videos, showing lists of tags, etc.
- Page metadata only supports `title`, `permalink` and `tags` (no redirection support). The metadata block is also formatted differently to avoid Jekyll parsing it.
- Page files use a `.txt` extension rather than `.md` (due to Jekyll seemingly spending time reading `.md` files even if they lack a Jekyll metadata block).

Because virtual pages differ enough from regular pages in these ways this section has its [own Formatting Reference](/Meta/Virtual_Pages/Formatting_Reference) and [Metadata/Organization](/Meta/Virtual_Pages/Metadata_Organization/) pages which lists the differences.

{% include index-autolist type="section" %}