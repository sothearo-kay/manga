import type { FetchOptions } from "ofetch";
import { mangaRepository } from "~/assets/repositories";

export default defineNuxtPlugin(() => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const fetchOptions: FetchOptions = {
    baseURL: "/api",
    onRequest({ options }) {
      options.headers = { ...defaultHeaders, ...options.headers };
    },
  };

  const fetcher = $fetch.create(fetchOptions);

  const repositories = {
    manga: mangaRepository(fetcher),
  };

  return {
    provide: {
      api: repositories,
    },
  };
});
