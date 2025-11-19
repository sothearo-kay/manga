<script setup lang="ts">
const route = useRoute();
const mangaId = route.params.id as string;

const { manga, error, status } = await useManga(mangaId);
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

    <div v-else>
      <div class="mb-12 flex flex-col gap-8 md:flex-row">
        <div class="flex-shrink-0 max-md:mx-auto">
          <img
            :src="`/api/image?url=${encodeURIComponent(manga.image)}&referer=${encodeURIComponent(manga.headers.Referer)}`"
            :alt="manga.title"
            width="256"
            height="384"
            class="h-96 w-64 rounded-lg object-cover shadow-lg"
            loading="lazy"
          >
        </div>

        <div class="flex flex-1 flex-col">
          <div class="mb-6">
            <h1 class="mb-3 text-3xl leading-tight font-bold md:text-4xl">
              {{ manga.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-2">
              <span
                v-for="genre in manga.genres"
                :key="genre"
                class="inline-flex items-center rounded-md bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground ring-1 ring-foreground/10 ring-inset"
              >
                {{ genre }}
              </span>
              <span
                class="inline-flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1 text-xs font-semibold text-background"
              >
                <Icon name="lucide:circle-dot" class="size-3.5" />
                {{ manga.status }}
              </span>
            </div>
          </div>

          <div v-if="manga.rating" class="mb-6">
            <StarRating :rating="manga.rating" />
          </div>

          <div v-if="manga.authors?.length" class="mb-4 flex items-start gap-2">
            <Icon name="lucide:user-pen" class="mt-0.5 size-4 flex-shrink-0 text-muted" />
            <div class="flex-1">
              <p class="text-xs font-medium tracking-wide text-muted uppercase">
                Authors
              </p>
              <p class="mt-0.5 text-sm text-foreground">
                {{ manga.authors.join(', ') }}
              </p>
            </div>
          </div>

          <div v-if="manga.description" class="mb-6 flex items-start gap-2">
            <Icon name="lucide:file-text" class="mt-0.5 size-4 flex-shrink-0 text-muted" />
            <div class="flex-1">
              <p class="text-xs font-medium tracking-wide text-muted uppercase">
                Description
              </p>
              <p class="mt-0.5 text-sm leading-relaxed text-foreground/80">
                {{ manga.description }}
              </p>
            </div>
          </div>

          <NuxtLink
            v-if="manga.chapters.length > 0"
            :to="`/read/${manga.chapters[manga.chapters.length - 1]!.id}?mangaId=${mangaId}`"
            class="inline-flex w-max items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-90 active:scale-[0.98]"
          >
            <Icon name="lucide:book-open" class="size-4" />
            Start Reading
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-hidden">
        <div class="border-b border-border px-6 py-4">
          <h2 class="font-heading text-xl font-semibold">
            Chapters ({{ manga.chapters.length }})
          </h2>
        </div>

        <div class="divide-y divide-border">
          <NuxtLink
            v-for="chapter in manga.chapters"
            :key="chapter.id"
            :to="`/read/${chapter.id}?mangaId=${mangaId}`"
            class="flex items-center justify-between px-6 py-4 transition-colors hover:bg-border/50"
          >
            <div class="flex w-full items-center justify-between">
              <span class="font-body capitalize">{{ chapter.title.toLowerCase() }}</span>
              <FormattedDate :date="chapter.releasedDate" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
