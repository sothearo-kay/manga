<script setup lang="ts">
const route = useRoute();
const { $api } = useNuxtApp();

const chapterId = route.params.chapterId as string;

const { data: _pages } = await useAsyncData(
  `chapter-${chapterId}`,
  () => $api.manga.read(chapterId),
);
</script>

<template>
  <div />
</template>
