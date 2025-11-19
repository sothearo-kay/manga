<script setup lang="ts">
interface Props {
  src: string;
  alt?: string;
  decoding?: "async" | "sync" | "auto";
}

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<Props>(), {
  alt: "",
  decoding: "async",
});

const loaded = ref(false);
const imgRef = useTemplateRef<HTMLImageElement>("imgRef");

function handleLoad() {
  loaded.value = true;
}

watchEffect(() => {
  if (imgRef.value?.complete && imgRef.value?.naturalHeight !== 0) {
    loaded.value = true;
  }
});
</script>

<template>
  <div class="relative block">
    <img
      ref="imgRef"
      :src="src"
      :alt="alt"
      loading="eager"
      :decoding="decoding"
      class="block w-full"
      :style="{
        clipPath: loaded ? 'inset(0%)' : 'inset(0% 0% 100% 0%)',
        transition: 'clip-path 500ms cubic-bezier(0.4, 0, 0.2, 1)',
      }"
      v-bind="$attrs"
      @load="handleLoad"
    >
  </div>
</template>
