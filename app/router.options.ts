import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: "Home",
      path: "/",
      meta: {
        mitt: [{ name: "home-enter-animation", time: 4 }],
      },
      component: () => import("~/pages/home.vue").then((r) => r.default || r),
    },
    {
      name: "Lookbook",
      path: "/lookbook",
      component: () =>
        import(`~/pages/lookbook.vue`).then((r) => r.default || r),
      meta: {
        mitt: [{ name: "lookbook-enter-animations", time: 3.8 }],
      },
    },
    {
      name: "Studio",
      path: "/studio",
      component: () => import(`~/pages/studio.vue`).then((r) => r.default || r),
      meta: {
        mitt: [{ name: "studio-enter-animations", time: 3.8 }],
      },
    },
    {
      name: "Easter Egg",
      path: "/3@s73r",
      component: () =>
        import(`~/pages/easter-egg.vue`).then((r) => r.default || r),
      meta: {
        mitt: [{ name: "footer-leave", time: "done" }],
      },
    },
    {
      name: "Contact",
      path: "/contact",
      component: () =>
        import("~/pages/contact.vue").then((r) => r.default || r),
      meta: {
        mitt: [
          { name: "footer-leave", time: "done" },
          { name: "contact-enter-animations", time: 3.8 },
        ],
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return false;
  },
};
