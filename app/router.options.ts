import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: "Home",
      path: "/",
      meta: {
        mitt: "home",
      },
      component: () => import("~/pages/home.vue").then((r) => r.default || r),
    },
    {
      name: "Lookbook",
      path: "/lookbook",
      component: () =>
        import(`~/pages/lookbook.vue`).then((r) => r.default || r),
      meta: {
        mitt: "lookbook",
      },
    },
    {
      name: "Studio",
      path: "/studio",
      component: () => import(`~/pages/studio.vue`).then((r) => r.default || r),
      meta: {
        mitt: "studio",
      },
    },
    {
      name: "Easter Egg",
      path: "/3@s73r",
      component: () =>
        import(`~/pages/easter-egg.vue`).then((r) => r.default || r),
      meta: {
        mitt: "easter",
      },
    },
    {
      name: "Contact",
      path: "/contact",
      component: () =>
        import("~/pages/contact.vue").then((r) => r.default || r),
      meta: {
        mitt: "contact",
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return false;
  },
};
