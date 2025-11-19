<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const searchQuery = ref((route.query.q as string) || "");
const debouncedQuery = refDebounced(searchQuery, 500);
const loadMoreTrigger = useTemplateRef<HTMLDivElement>("loadMoreTrigger");

const pagination = reactive({
  currentPage: 1,
  mangas: [] as MangaSearchResult[],
  hasNextPage: false,
  isLoadingMore: false,
});

const { data, execute, status } = await useAsyncData(
  "manga-search",
  () => $api.manga.search(searchQuery.value, pagination.currentPage),
  { immediate: !!searchQuery.value.trim() },
);

useIntersectionObserver(
  loadMoreTrigger,
  async (entries) => {
    const [entry] = entries;
    const canLoadMore
      = entry?.isIntersecting
        && pagination.hasNextPage
        && !pagination.isLoadingMore
        && status.value !== "pending";

    if (canLoadMore) {
      pagination.isLoadingMore = true;
      pagination.currentPage++;
      await execute();
    }
  },
  { rootMargin: "200px" },
);

const mangas = computed(() => pagination.mangas);

watch(searchQuery, (query) => {
  router.replace({ query: { q: query || undefined } });
});

watch(debouncedQuery, async (query) => {
  if (query.trim()) {
    Object.assign(pagination, {
      currentPage: 1,
      mangas: [],
      hasNextPage: false,
      isLoadingMore: false,
    });
    await execute();
  }
});

watch(data, (newData) => {
  if (newData?.data) {
    const { results = [], hasNextPage = false } = newData.data;

    // Handle empty results on pagination (API bug workaround)
    if (pagination.currentPage > 1 && results.length === 0) {
      pagination.hasNextPage = false;
      pagination.isLoadingMore = false;
      return;
    }

    if (pagination.currentPage === 1) {
      pagination.mangas = results;
    }
    else {
      pagination.mangas.push(...results);
    }

    pagination.hasNextPage = hasNextPage;
    pagination.isLoadingMore = false;
  }
}, { immediate: true });
</script>

<template>
  <div>
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
      <div v-if="status === 'pending' && pagination.currentPage === 1 && !mangas.length" class="flex flex-col items-center justify-center py-20">
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

      <div v-else-if="!mangas.length && status !== 'pending'" class="flex flex-col items-center justify-center py-20 text-center">
        <Icon name="lucide:search-x" class="mb-4 h-16 w-16 text-muted" />
        <p class="mb-2 font-medium">
          No manga found
        </p>
        <p class="text-sm text-muted">
          Try searching for a different title
        </p>
      </div>

      <div v-else>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6">
          <NuxtLink
            v-for="manga in mangas"
            :key="manga.id"
            :to="`/manga/${manga.id}`"
            class="group flex flex-col"
          >
            <div class="mb-2 overflow-hidden rounded-lg">
              <Image
                :src="`/api/image?url=${encodeURIComponent(manga.image)}&referer=${encodeURIComponent(manga.headerForImage.Referer)}`"
                :alt="manga.title"
                width="256"
                height="384"
                class="aspect-[2/3] object-cover"
              />
            </div>
            <h2 class="font-heading line-clamp-2 text-sm leading-snug font-semibold">
              {{ manga.title }}
            </h2>
          </NuxtLink>
        </div>

        <div ref="loadMoreTrigger" class="py-8">
          <div v-if="pagination.isLoadingMore" class="flex justify-center">
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-foreground" />
          </div>
          <div v-else-if="!pagination.hasNextPage && mangas.length > 0" class="flex justify-center">
            <p class="text-sm text-muted">
              You've reached the end of the results
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
