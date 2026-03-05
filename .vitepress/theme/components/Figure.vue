<template>
    <figure>
        <img :src="imgSrc" :alt="alt" :width="imgWidth" :height="imgHeight">
        <figcaption v-if="caption">{{ caption }}</figcaption>
    </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ImageMeta {
    src: string;
    width: number;
    height: number;
    format: string;
}

const props = defineProps<{
    src: string | ImageMeta;
    alt?: string;
    caption?: string;
}>();

const imgSrc = computed( () =>
    typeof props.src === 'string' ? props.src : props.src.src
);
const imgWidth = computed( () =>
    typeof props.src === 'string' ? undefined : props.src.width
);
const imgHeight = computed( () =>
    typeof props.src === 'string' ? undefined : props.src.height
);
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
