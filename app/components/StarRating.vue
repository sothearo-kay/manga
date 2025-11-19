<script setup lang="ts">
interface Props {
  rating: number;
  maxStars?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxStars: 5,
});

const fullStars = computed(() => Math.floor(props.rating));
const hasHalfStar = computed(() => props.rating % 1 >= 0.5);

function customizeFilled(content: string) {
  return content
    .replace(/fill="[^"]*"/g, "fill=\"currentColor\"")
    .replace(/stroke-width="[^"]*"/g, "stroke-width=\"0\"");
}

function customizeEmpty(content: string) {
  return content
    .replace(/fill="[^"]*"/g, "fill=\"currentColor\"")
    .replace(/stroke-width="[^"]*"/g, "stroke-width=\"0\"");
}
</script>

<template>
  <div class="flex items-center gap-4">
    <span class="text-2xl font-bold text-foreground">
      {{ rating.toFixed(1) }}
    </span>

    <div class="relative inline-flex">
      <div class="flex gap-1 text-muted">
        <Icon
          v-for="i in maxStars"
          :key="`empty-${i}`"
          name="lucide:star"
          :customize="customizeEmpty"
          class="h-6 w-6"
        />
      </div>

      <div class="absolute inset-0 flex gap-1 text-yellow-400">
        <Icon
          v-for="i in fullStars"
          :key="`full-${i}`"
          name="lucide:star"
          :customize="customizeFilled"
          class="h-6 w-6"
        />
        <Icon
          v-if="hasHalfStar"
          name="lucide:star-half"
          :customize="customizeFilled"
          class="h-6 w-6"
        />
      </div>
    </div>
  </div>
</template>
