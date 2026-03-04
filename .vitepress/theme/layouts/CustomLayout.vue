<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import PageHeader from '../components/PageHeader.vue';
import useImageFade from '../composables/useImageFade';
const { Layout } = DefaultTheme;

useImageFade();
</script>

<template>
    <Layout>
        <template #doc-before>
            <PageHeader />
        </template>

        <template #layout-bottom>
        </template>
    </Layout>
</template>

<style scoped>
.Layout {
    min-height: 100dvh;
}
</style>