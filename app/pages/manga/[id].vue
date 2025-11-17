<script setup lang="ts">
const route = useRoute();
const { $api } = useNuxtApp();

const mangaId = route.params.id as string;

const { data: result, status } = await useAsyncData(
  `manga-${mangaId}`,
  () => $api.manga.info(mangaId),
);

const manga = computed(() => result.value?.data);
const error = computed(() => result.value?.error);

const uniqueChapters = computed(() => {
  if (!manga.value?.chapters)
    return [];

  const seen = new Map();

  for (const chapter of manga.value.chapters) {
    const key = `${chapter.volumeNumber}-${chapter.chapterNumber}`;
    const existing = seen.get(key);

    // Keep the chapter with more pages, or the first one if pages are equal
    if (!existing || chapter.pages > existing.pages) {
      seen.set(key, chapter);
    }
  }

  return Array.from(seen.values());
});
</script>

<template>
  <div class="min-h-screen">
    <StatusBlock v-if="status === 'pending'" state="loading">
      Loading...
    </StatusBlock>

    <StatusBlock v-else-if="error" state="error" title="Error loading manga">
      {{ error.message }}
    </StatusBlock>

    <StatusBlock v-else-if="!manga" state="empty" title="Manga not found">
      The manga you're looking for doesn't exist.
    </StatusBlock>

    <div v-else class="container py-10">
      <div class="mb-12 flex flex-col gap-8 md:flex-row">
        <div class="flex-shrink-0 max-md:mx-auto">
          <NuxtImg
            :src="manga.image"
            :alt="manga.title"
            placeholder
            loading="lazy"
            class="h-96 w-64 rounded-lg object-cover shadow-lg"
          />
        </div>

        <div class="flex-1">
          <h1 class="font-heading mb-4 text-4xl font-bold">
            {{ manga.title }}
          </h1>

          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span
              v-for="genre in manga.genres"
              :key="genre"
              class="rounded-full bg-border px-3 py-1 text-sm text-foreground"
            >
              {{ genre }}
            </span>

            <span class="mx-2">•</span>

            <span class="rounded-full bg-border px-3 py-1 text-sm">
              {{ manga.status }}
            </span>
            <span class="text-sm text-muted">{{ manga.releaseDate }}</span>
          </div>

          <p v-if="manga.description.en" class="font-body mb-4 text-sm leading-relaxed">
            {{ manga.description.en }}
          </p>

          <div v-if="manga.altTitles.length" class="mb-4">
            <h3 class="font-heading mb-2 text-sm font-semibold text-muted">
              Alternative Titles:
            </h3>
            <div class="space-y-1">
              <p
                v-for="(altTitle, idx) in manga.altTitles.slice(0, 3)"
                :key="idx"
                class="text-sm text-muted"
              >
                {{ Object.values(altTitle)[0] }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-hidden">
        <div class="border-b border-border px-6 py-4">
          <h2 class="font-heading text-xl font-semibold">
            Chapters ({{ uniqueChapters.length }})
          </h2>
        </div>

        <div class="divide-y divide-border">
          <NuxtLink
            v-for="chapter in uniqueChapters"
            :key="chapter.id"
            :to="`/read/${chapter.id}`"
            class="flex items-center justify-between px-6 py-4 transition-colors hover:bg-border/50"
          >
            <div class="flex items-center gap-4">
              <span class="w-16 font-mono text-sm text-muted">
                Ch. {{ chapter.chapterNumber }}
              </span>
              <div class="flex flex-col">
                <span class="font-body">{{ chapter.title }}</span>
                <span class="text-xs text-muted">Volume {{ chapter.volumeNumber }}</span>
              </div>
            </div>
            <span class="text-sm text-muted">
              {{ chapter.pages }} pages
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
