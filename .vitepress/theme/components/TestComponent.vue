<template>
    <div class="test">
        {{ name }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string
}>();
</script>

<style>
.test {
    border: solid 1px #ccc;
}
</style>