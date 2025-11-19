<script setup lang="ts">
interface Props {
  date: string | Date;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
});

const dateObj = computed(() => {
  return typeof props.date === "string" ? new Date(props.date) : props.date;
});

const formattedDate = computed(() => {
  const formatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(dateObj.value);

  return formatted.replace(/\//g, "-");
});

const isoDate = computed(() => dateObj.value.toISOString());
</script>

<template>
  <time :datetime="isoDate" class="text-sm font-medium tracking-wide text-muted" :class="[props.class]">
    {{ formattedDate }}
  </time>
</template>
