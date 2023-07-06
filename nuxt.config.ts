import { searchForWorkspaceRoot } from "vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    server: {
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd()), "/Users/macbookpro/"],
      },
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: ["@nuxt/image"],
  css: ["~/styles/styles.css", "~/styles/typography/typo.pcss"],
  postcss: {
    plugins: {
      autoprefixer: {},
      "postcss-nested": {},
      "postcss-import": {},
      "postcss-media-minmax": {},
    },
  },
  build: {
    transpile: ["gsap"],
  },
});
