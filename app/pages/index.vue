<script setup lang="ts">
const testMangaId = "e896c48c-3150-437d-ba57-d8567eb399ae";
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <div class="text-center">
      <h1 class="font-heading mb-8 text-4xl font-bold">
        Manga Reader
      </h1>
      <p class="mb-8 text-muted">
        Development test page
      </p>
      <NuxtLink
        :to="`/manga/${testMangaId}`"
        class="font-body inline-block rounded-lg bg-foreground px-6 py-3 text-background transition-opacity hover:opacity-90"
      >
        Test Manga Info Page
      </NuxtLink>
    </div>
  </div>
</template>
