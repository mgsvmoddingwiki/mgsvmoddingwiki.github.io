---
layout: null
is_wiki_page: false
---

export const searchIndex = [
    {% for page in site.html_pages %}
    {
        {% assign title = page.title | default: page.name %}
        {% if title != nil and title != 'Page Not Found' and title != 'index.html' %}
            title: `{{ title }}`,
            tags: `{{ page.tags | join: ', ' }}`,
            url: `{{ site.baseurl }}{{ page.url }}`,
            content: {{ page.content | jsonify  }}
        {% endif %}
    } {% unless forloop.last %},{% endunless %}
    {% endfor %}
];