---
layout: null
is_wiki_page: false
---

import { virtualIndex } from './virtualindex.js';

{%- assign guides_count = 0 -%}
{%- assign allpages_count = 0 -%}

var regularIndex = [
    {% for page in site.html_pages %}
    {
        {% assign title = page.title | default: page.name %}
        {% if title != nil and title != 'Page Not Found' and title != 'index.html' %}
            {% if title != 'redirect.html' %}
                {%- assign allpages_count = allpages_count | plus: 1 -%}
            {% endif %}
            title: `{{ title }}`,
            tags: [{% for tag in page.tags %}{% assign tag_lower = tag | downcase %}{% if tag_lower == 'guides' %}{%- assign guides_count = guides_count | plus: 1 -%}{% endif %}`{{ tag }}`{% unless forloop.last %},{% endunless %}{% endfor %}],
            {% comment Force trailing forwardslash for lookup consistency %}{% endcomment %}
            {% assign pos = page.url | size | minus: 1 %}
            {% assign last_char = page.url | slice: pos, 1 %}
            {% if last_char == '/' %}
            url: `{{ site.baseurl }}{{ page.url }}`,
            {% else %}
            url: `{{ site.baseurl }}{{ page.url }}/`,
            {% endif %}
            content: {{ page.content | jsonify  }}
        {% endif %}
    } {% unless forloop.last %},{% endunless %}
    {% endfor %}
];

export const searchIndex = [...regularIndex, ...virtualIndex];

export const pageCounters = {
    guides: {{ guides_count }},
    allPages: {{ allpages_count }} + virtualIndex.length
}