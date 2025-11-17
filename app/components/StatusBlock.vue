<script setup lang="ts">
interface Props {
  state: "loading" | "error" | "empty";
  title?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h2 v-if="title" class="font-heading mb-2 text-2xl">
        {{ title }}
      </h2>

      <p class="text-muted">
        <slot />
      </p>
    </div>
  </div>
</template>
