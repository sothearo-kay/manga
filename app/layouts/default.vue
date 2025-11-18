<template>
  <div class="grid grid-rows-[auto,minmax(0,1fr)]">
    <header class="sticky top-0 z-50 h-16 border-b bg-background">
      <div class="container flex h-full items-center">
        <NuxtLink to="/">
          <h1 class="text-2xl font-bold">
            Manga
          </h1>
        </NuxtLink>
      </div>
    </header>

    <main class="container py-10">
      <slot />
    </main>
  </div>
</template>
