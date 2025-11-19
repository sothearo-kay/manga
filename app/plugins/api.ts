import type { FetchOptions } from "ofetch";
import { mangaRepository } from "~/repositories";

export default defineNuxtPlugin(() => {
  const { connector } = useRuntimeConfig().public;

  const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const fetchOptions: FetchOptions = {
    baseURL: `/api/${connector}`,
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
