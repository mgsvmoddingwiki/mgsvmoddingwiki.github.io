---
layout: null
is_wiki_page: false
---

{%- assign guides_count = 0 -%}
{%- assign allpages_count = 0 -%}

export const searchIndex = [
    {% for page in site.html_pages %}
        {% for tag in page.tags %}
            {% if tag == 'Guides' %}
                {%- assign guides_count = guides_count | plus: 1 -%}
            {% endif %}
        {% endfor %}
    {
        {% assign title = page.title | default: page.name %}
        {% if title != nil and title != 'Page Not Found' and title != 'index.html' %}
            {%- assign allpages_count = allpages_count | plus: 1 -%}
            title: `{{ title }}`,
            tags: `{{ page.tags | join: ', ' }}`,
            url: `{{ site.baseurl }}{{ page.url }}`,
            content: {{ page.content | jsonify  }}
        {% endif %}
    } {% unless forloop.last %},{% endunless %}
    {% endfor %}
];

export const pageCounters = {
    guides: `{{ guides_count }}`,
    allPages: `{{ allpages_count }}`
}