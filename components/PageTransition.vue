<template>
  <div class="page-transition" ref="pageTransition">
    <div class="page-transition__content">
      <h2 class="content__logo">
        <span
          class="logo__char"
          v-for="(char, i) in logoTextSplit"
          :key="char + i + 'page-transition'"
        >
          {{ char }}
        </span>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    logoTextSplit() {
      return "Muzen".split("");
    },
  },
};
</script>

<style scoped>
@import url("~/styles/components/PageTransition.pcss");
</style>