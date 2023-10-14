<template>
  <main class="home-page">
    <home-hero />
    <home-content />
  </main>
</template>

<script>
export default {
  props: {
    transitoned: Boolean,
  },
  inject: ["getTransitioned"],
  setup() {},
  computed: {
    transitioned() {
      return this.getTransitioned();
    },
  },
  beforeMount() {
    if (!this.transitoned) {
    }
  },
  mounted() {},
};
</script>

<style scoped>
.home-page {
  background-color: var(--muzen-light-brown);
}
</style>