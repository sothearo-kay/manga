<template>
  <div class="grid grid-rows-[auto,minmax(0,1fr)]">
    <header class="sticky top-0 h-16 border-b bg-background">
      <div class="container flex h-full items-center">
        <NuxtLink to="/">
          <h1 class="text-2xl font-bold">
            Manga
          </h1>
        </NuxtLink>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>
