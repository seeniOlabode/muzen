<template>
  <header class="site-header container">
    <site-header-mobile class="mobile-header" :menu-links="mobileMenuLinks" />
    <nav class="desktop-header">
      <ul class="links">
        <li v-for="link in links" :key="link.text + link.path">
          <site-link
            :to="link.path"
            :text="link.text"
            color="white"
            size="md"
            :prefetch="link.prefetch"
          />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { text: "home", path: "/", prefetch: true },
        { text: "studio", path: "/studio", prefetch: true },
        { text: "lookbook", path: "/lookbook", prefetch: false },
        { text: "archive", path: "/archive" },
        { text: "contact", path: "/contact", prefetch: false },
      ],
    };
  },
  computed: {
    mobileMenuLinks() {
      return this.links.filter((link) => link.text !== "archive");
    },
  },
};
</script>

<style>
@import url("~/styles/components/header/SiteHeader.pcss");

:deep(.site-link) {
  color: white !important;
}
</style>