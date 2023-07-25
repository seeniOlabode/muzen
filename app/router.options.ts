import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: "Home",
      path: "/",
      component: () => import("~/pages/home.vue").then((r) => r.default || r),
    },
    {
      name: "Lookbook",
      path: "/lookbook",
      component: () =>
        import(`~/pages/lookbook.vue`).then((r) => r.default || r),
    },
    {
      name: "Studio",
      path: "/studio",
      component: () => import(`~/pages/studio.vue`).then((r) => r.default || r),
    },
    {
      name: "Easter Egg",
      path: "/3@s73r",
      component: () =>
        import(`~/pages/easter-egg.vue`).then((r) => r.default || r),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return false;
  },
};
