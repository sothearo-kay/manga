import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/icon",
    "@vueuse/nuxt",
  ],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    apiBaseUrl: "",
    public: {
      connector: "",
    },
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
        weights: [400, 500],
      },
    ],
    defaults: {
      styles: ["normal"],
      subsets: ["latin"],
      preload: true,
    },
  },
});
