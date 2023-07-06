<template>
  <header class="site-header container">
    <site-header-mobile class="mobile-header" />
    <nav class="desktop-header">
      <ul class="links">
        <li v-for="link in links" :key="link.text + link.path">
          <site-link
            :to="link.path"
            :text="link.text"
            color="#1C1816"
            size="md"
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
        { text: "home", path: "/" },
        { text: "studio", path: "/studio" },
        { text: "lookbook", path: "/lookbook" },
      ],
    };
  },
};
</script>

<style>
@import url("~/styles/components/header/SiteHeader.pcss");
</style>