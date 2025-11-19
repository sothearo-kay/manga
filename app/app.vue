<script setup lang="ts">
import { SITE_DESCRIPTION, SITE_NAME } from "~/shared/constants";

const url = useRequestURL();

useSeoMeta({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  ogTitle: SITE_NAME,
  ogDescription: SITE_DESCRIPTION,
  ogSiteName: SITE_NAME,
  ogUrl: url.href,
  twitterCard: "summary_large_image",
  twitterTitle: SITE_NAME,
  twitterDescription: SITE_DESCRIPTION,
  ogImage: `${url.origin}/home-og.jpg`,
  twitterImage: `${url.origin}/home-og.jpg`,
});
</script>

<template>
  <NuxtLoadingIndicator color="red" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
