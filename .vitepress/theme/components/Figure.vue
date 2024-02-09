<template>
    <figure>
        <img :src="src" :alt="alt">
        <figcaption v-if="caption">{{ caption }}</figcaption>
    </figure>
</template>

<script setup lang="ts">
const props = defineProps<{
    src: string,
    alt?: string
    caption?: string,
}>();
</script>

<style scoped>
figure {
    margin: 1.5rem 0;
}

figure img {
    height: auto;
    width: 100%;
}

figure figcaption {
    color: var( --vp-c-text-3 );
    margin: 0.5rem 0;
}
</style>