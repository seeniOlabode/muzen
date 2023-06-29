// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
    }
  },
   tailwindcss: {
    configPath: "~/tailwind.config.js"
  },
})
