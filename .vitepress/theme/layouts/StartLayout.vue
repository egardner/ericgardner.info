<template>
    <div class="home-page">
        <section class="home-hero">
            <p class="home-hero__tagline">Software developer <span class="ampersand">&amp;</span> photographer in Portland, Oregon.</p>
        </section>

        <section class="home-image">
            <img :src="ferryImage" alt="View from inside a Washington State Ferry" />
        </section>

        <section class="home-recent" v-if="recentPosts.length">
            <h2 class="home-recent__heading">Recent Notes</h2>
            <ul class="home-recent__list">
                <li v-for="post of recentPosts" :key="post.url">
                    <a :href="post.url">{{ post.frontmatter.title }}</a>
                    <span class="home-recent__date">{{ formatDate( post.frontmatter.date, true ) }}</span>
                </li>
            </ul>
            <a href="/notes" class="home-recent__more">All notes &rarr;</a>
        </section>
    </div>
</template>

<script setup lang="ts">
import { data as posts } from '/data/posts.data';
import formatDate from '../utils/formatDate';
import getSorted from '../utils/getSorted';
import ferryImage from '/images/ferry.jpg?w=900';

const recentPosts = getSorted( posts ).slice( 0, 5 );
</script>

<style>
.home-page {
    grid-area: main;
    display: grid;
    grid-template-columns: var(--content-grid);
    align-content: center;
    min-height: 70vh;
    padding: 4rem 0;
}

.home-hero {
    grid-column: content;
    margin-bottom: 3rem;
}

.home-hero__tagline {
    font-family: var(--vp-font-family-heading);
    font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
    color: var(--vp-c-text-2);
    margin: 0;
    line-height: 1.4;
}

.ampersand {
    font-style: italic;
}

.home-image {
    grid-column: feature;
    margin-bottom: 3rem;
}

.home-image img {
    width: 100%;
    height: auto;
    border-radius: 4px;
}

.home-recent {
    grid-column: content;
}

.home-recent__heading {
    font-family: var(--vp-font-family-heading);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--vp-c-text-2);
    font-variant-caps: all-small-caps;
    letter-spacing: 0.05em;
    margin: 0 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--vp-c-divider);
}

.home-recent__list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.home-recent__list li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.5rem 0;
    gap: 1rem;
}

.home-recent__list a {
    font-family: var(--vp-font-family-heading);
    font-size: 1.125rem;
    color: var(--vp-c-text-1);
    text-decoration: none;
    transition: color 0.2s ease;
}

.home-recent__list a:hover {
    color: var(--vp-c-brand-1);
}

.home-recent__date {
    font-family: var(--vp-font-family-heading);
    font-variant-caps: all-small-caps;
    font-variant-numeric: oldstyle-nums;
    color: var(--vp-c-text-3);
    white-space: nowrap;
    flex-shrink: 0;
}

.home-recent__more {
    display: inline-block;
    margin-top: 1.25rem;
    font-size: 0.95rem;
    color: var(--vp-c-brand-1);
    text-decoration: none;
    transition: color 0.2s ease;
}

.home-recent__more:hover {
    color: var(--vp-c-brand-2);
}
</style>
