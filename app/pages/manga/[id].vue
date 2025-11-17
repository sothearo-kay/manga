<script setup lang="ts">
const route = useRoute();
const { $api } = useNuxtApp();

const mangaId = route.params.id as string;

const { data: _manga } = await useAsyncData(
  `manga-${mangaId}`,
  () => $api.manga.info(mangaId),
);
</script>

<template>
  <div />
</template>
