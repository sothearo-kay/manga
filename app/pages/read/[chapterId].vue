<script setup lang="ts">
definePageMeta({
  layout: false,
});

const route = useRoute();
const { $api } = useNuxtApp();

const chapterId = route.params.chapterId as string;
const mangaId = route.query.mangaId as string;

const { data: result, status } = await useAsyncData(
  `chapter-${chapterId}`,
  () => $api.manga.read(chapterId),
);

const pages = computed(() => result.value?.data);
const error = computed(() => result.value?.error);

const { uniqueChapters } = await useManga(mangaId);

const chapterNav = computed(() => {
  const sorted = [...uniqueChapters.value].sort((a, b) => {
    if (a.volumeNumber !== b.volumeNumber) {
      return Number(a.volumeNumber) - Number(b.volumeNumber);
    }
    return Number(a.chapterNumber) - Number(b.chapterNumber);
  });

  const index = sorted.findIndex(ch => ch.id === chapterId);

  return {
    current: index !== -1 ? sorted[index] : null,
    prev: index > 0 ? sorted[index - 1] : null,
    next: index !== -1 && index < sorted.length - 1
      ? sorted[index + 1]
      : null,
  };
});

const readingMode = useState<"manga" | "manhwa">("reading-mode", () => "manga");

useEventListener("keydown", (e: KeyboardEvent) => {
  if (readingMode.value !== "manga")
    return;

  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    nextPage();
  }
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    prevPage();
  }
});

const currentPageIndex = ref(0);
const currentPage = computed(() => {
  if (!pages.value || readingMode.value !== "manga")
    return null;
  return pages.value[currentPageIndex.value];
});

function nextPage() {
  if (!pages.value || currentPageIndex.value >= pages.value.length - 1)
    return;
  currentPageIndex.value++;
}

function prevPage() {
  if (currentPageIndex.value <= 0)
    return;
  currentPageIndex.value--;
}

function toggleReadingMode() {
  readingMode.value = readingMode.value === "manga" ? "manhwa" : "manga";
  currentPageIndex.value = 0;
}
</script>

<template>
  <div class="min-h-screen">
    <StatusBlock v-if="status === 'pending'" state="loading">
      Loading chapter...
    </StatusBlock>

    <StatusBlock v-else-if="error" state="error" title="Error loading chapter">
      {{ error.message }}
    </StatusBlock>

    <StatusBlock v-else-if="!pages || pages.length === 0" state="empty" title="No pages found">
      This chapter doesn't have any pages.
    </StatusBlock>

    <div v-else class="grid grid-rows-[auto_1fr] py-10" :class="readingMode === 'manga' ? 'h-screen' : 'h-auto'">
      <header class="sticky top-10 z-50">
        <div class="container grid grid-cols-12 items-center pb-4">
          <div class="col-span-3 flex justify-start">
            <Tooltip text="Back to manga" side="bottom">
              <NuxtLink
                :to="`/manga/${mangaId}`"
                class="flex size-12 items-center justify-center rounded-full glass-button"
              >
                <Icon name="lucide:chevron-left" class="h-6 w-6" />
              </NuxtLink>
            </Tooltip>
          </div>

          <div class="col-span-6 flex flex-col items-center gap-1">
            <div v-if="readingMode === 'manga'" class="text-sm font-medium">
              {{ currentPageIndex + 1 }} / {{ pages.length }}
            </div>
            <div v-if="chapterNav.current" class="text-xs text-muted">
              Ch. {{ chapterNav.current.chapterNumber }}
            </div>
          </div>

          <div class="col-span-3 flex items-center justify-end gap-4">
            <Tooltip v-if="chapterNav.prev" text="Previous chapter" side="bottom">
              <NuxtLink
                :to="`/read/${chapterNav.prev.id}?mangaId=${mangaId}`"
                class="flex size-12 items-center justify-center rounded-full glass-button"
              >
                <Icon name="lucide:arrow-left" class="h-5 w-5" />
              </NuxtLink>
            </Tooltip>

            <Tooltip v-if="chapterNav.next" text="Next chapter" side="bottom">
              <NuxtLink
                :to="`/read/${chapterNav.next.id}?mangaId=${mangaId}`"
                class="flex size-12 items-center justify-center rounded-full glass-button"
              >
                <Icon name="lucide:arrow-right" class="h-5 w-5" />
              </NuxtLink>
            </Tooltip>

            <Tooltip :text="readingMode === 'manga' ? 'Switch to scroll mode' : 'Switch to paged mode'" side="bottom">
              <button
                type="button"
                class="flex size-12 items-center justify-center rounded-full glass-button"
                @click="toggleReadingMode"
              >
                <Icon
                  :name="readingMode === 'manga' ? 'lucide:move-vertical' : 'lucide:move-horizontal' "
                  class="h-6 w-6"
                />
              </button>
            </Tooltip>
          </div>
        </div>
      </header>

      <div v-if="readingMode === 'manhwa'" class="container max-w-2xl">
        <div class="flex flex-col">
          <div
            v-for="page in pages"
            :key="page.page"
            class="relative w-full"
          >
            <NuxtImg
              :src="page.img"
              :alt="`Page ${page.page}`"
              width="800"
              height="1200"
              class="h-auto w-full"
              loading="lazy"
              placeholder
            />
          </div>
        </div>

        <div class="border-t border-border py-12 text-center">
          <p class="mb-4 text-muted">
            End of Chapter
          </p>
          <NuxtLink
            to="/"
            class="bg-primary text-primary-foreground inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow hover:bg-primary/90"
          >
            Back to Home
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="readingMode === 'manga' && currentPage" class="container flex max-w-3xl flex-col">
        <div class="flex-1">
          <NuxtImg
            :key="currentPage.page"
            :src="currentPage.img"
            :alt="`Page ${currentPage.page}`"
            class="aspect-square h-full object-contain"
            sizes="100vw"
            loading="lazy"
            placeholder
          />
        </div>

        <div class="mt-10 flex items-center justify-center gap-3 text-sm text-muted">
          <kbd class="kbd">Left</kbd>
          <span>-</span>
          <kbd class="kbd">Right</kbd>
          <span>to navigate</span>
        </div>
      </div>
    </div>
  </div>
</template>
