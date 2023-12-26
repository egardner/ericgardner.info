<template>
    <div class="gallery">
        <div class="gallery__wrapper">
            <div v-for="image in props.images" class="gallery__item">
                <template v-if="image.srcset">
                    <img
                        :src="image.src"
                        :srcset="image.srcset"
                        :sizes="image.sizes"
                        :alt="image.alt"
                    >
                </template>
                <template v-else>
                    <img :src="image.src" :alt="image.alt">
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Image {
    src: string,
    srcset?: string
    alt?: string,
    sizes?: string
}

const props = defineProps<{
    images: Image[]
}>();

</script>

<style>
/* 
* Gallery styles. Galleries are responsive, horizontally scrolling
* areas suitable for showing images (which do not all have to be
* the same aspect ratio). This layout is adapted from:
* https://ryanmulligan.dev/blog/x-scrolling-centered-max-width-container/
*/
.gallery {
    grid-column: bleed;
    display: grid;
    grid-template-columns: inherit;
    padding-block: var(--grid-space);
    overflow-x: scroll;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
}

.gallery::-webkit-scrollbar {
    inline-size: 0 !important;
    display: none;
}

.gallery__wrapper {
    grid-column: feature;
    display: flex;
    align-items: center;
    gap: 6rem;
}

.gallery__wrapper::after {
    content: "";
    align-self: stretch;
    padding-inline-end: max(
        var(--grid-space),
        (100vw - var(--content-max-width)) / 2 - var(--grid-space)
    );
}

.gallery__item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: center;
    inline-size: 100%;
    max-inline-size: 35rem;
    max-block-size: 80vh;
    border-radius: 4px;
    overflow: hidden;
    padding-left: var(--grid-space);
    padding-right: var(--grid-space);
    object-fit: contain;
}

@media screen and (min-width: 600px) {
    .gallery__item {
        max-inline-size: 40rem;
    }
}

@media screen and (min-width: 820px) {
    .gallery__item {
        max-inline-size: 60rem;
    }
}
</style>