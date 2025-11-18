<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const searchQuery = ref((route.query.q as string) || "");
const debouncedQuery = refDebounced(searchQuery, 500);

const { data, execute, status } = useAsyncData(
  () => `manga-search-${debouncedQuery.value}`,
  () => $api.manga.search(debouncedQuery.value),
  { immediate: !!searchQuery.value.trim() },
);

watch(searchQuery, (query) => {
  router.replace({ query: { q: query || undefined } });
});

watch(debouncedQuery, (query) => {
  if (query.trim()) {
    execute();
  }
});

const mangas = computed(() => data.value?.data?.results ?? []);
</script>

<template>
  <div class="min-h-screen">
    <div>
      <h1 class="font-heading mb-2 text-4xl font-bold">
        Manga Reader
      </h1>
      <p class="mb-6 text-sm text-muted">
        Search and read your favorite manga
      </p>

      <div class="relative max-w-2xl">
        <Icon
          name="lucide:search"
          class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search manga..."
          class="w-full rounded-lg border border-border bg-background py-3 pr-4 pl-12 text-sm transition-colors outline-none focus:border-foreground"
        >
      </div>
    </div>

    <div class="mt-10">
      <div v-if="status === 'pending'" class="flex flex-col items-center justify-center py-20">
        <div class="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-border border-t-foreground" />
        <p class="text-sm text-muted">
          Searching...
        </p>
      </div>

      <div v-else-if="!debouncedQuery" class="flex flex-col items-center justify-center py-20 text-center">
        <Icon name="lucide:book-open" class="mb-4 h-16 w-16 text-muted" />
        <p class="text-muted">
          Start typing to search for manga
        </p>
      </div>

      <div v-else-if="!mangas.length" class="flex flex-col items-center justify-center py-20 text-center">
        <Icon name="lucide:search-x" class="mb-4 h-16 w-16 text-muted" />
        <p class="mb-2 font-medium">
          No manga found
        </p>
        <p class="text-sm text-muted">
          Try searching for a different title
        </p>
      </div>

      <div v-else class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
        <NuxtLink
          v-for="manga in mangas"
          :key="manga.id"
          :to="`/manga/${manga.id}`"
          class="group flex flex-col"
        >
          <div class="mb-3 overflow-hidden rounded-lg">
            <ClientOnly>
              <img
                :src="`/api/image?url=${encodeURIComponent(manga.image)}`"
                :alt="manga.title"
                width="256"
                height="384"
                class="aspect-[2/3] w-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              >
            </ClientOnly>
          </div>
          <h2 class="font-heading line-clamp-2 text-sm leading-snug font-semibold">
            {{ manga.title }}
          </h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
