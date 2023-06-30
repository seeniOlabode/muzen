import { searchForWorkspaceRoot } from "vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
   vite: {
        server: {
          fs: {
            allow: [
              searchForWorkspaceRoot(process.cwd()),
              "/Users/macbookpro/"
            ]
          }
        }
    },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  css: ["~/styles/styles.css"],
  postcss: {
    plugins: {
      "postcss-nested": {},
      "postcss-import": {},
      "postcss-media-minmax": {},
    }
  },
   tailwindcss: {
    configPath: "~/tailwind.config.js"
  },
})
