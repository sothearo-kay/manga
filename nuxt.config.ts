import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/fonts"],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    apiBaseUrl: "",
  },

  compatibilityDate: "2025-07-15",

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  fonts: {
    families: [
      {
        name: "Nunito",
        provider: "google",
        weights: [600, 700],
      },
      {
        name: "Open Sans",
        provider: "google",
        weights: [400],
      },
    ],
    defaults: {
      styles: ["normal"],
      subsets: ["latin"],
      preload: true,
    },
  },
});
