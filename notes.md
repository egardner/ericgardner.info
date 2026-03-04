---
title: Notes
---
<script setup>
import { data as posts } from '/data/posts.data'
import formatDate from '/.vitepress/theme/utils/formatDate';
import getSorted from '/.vitepress/theme/utils/getSorted';
const sortedPosts = getSorted( posts );
</script>

<ul>
    <li v-for="post of sortedPosts">
        <strong><a :href="post.url">{{ post.frontmatter.title }}</a></strong><br/>
        <span>{{ formatDate( post.frontmatter.date ) }}</span>
    </li>
</ul>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0;
    font-size: 1.125rem;
    line-height: 1.75;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: 0.25rem 0;
}

li strong a {
    font-family: var(--vp-font-family-heading);
    text-decoration: none;
    color: var(--vp-c-text-1);
    transition: color 0.2s ease;
}

li strong a:hover {
    color: var(--vp-c-brand-1);
}

li span {
    font-family: var(--vp-font-family-mono);
    font-size: var(--vp-code-font-size);
    color: var(--vp-c-text-3);
    white-space: nowrap;
    flex-shrink: 0;
}
</style>