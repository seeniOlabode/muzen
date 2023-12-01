<template>
  <main class="error-page container">
    <p class="error-page__copy body">
      Oops! Looks like you took a wrong turn. This page is on vacation. Try
      navigating back to shore with your mouse or trackpad!
    </p>
    <div class="error-page__logo">
      <h2 class="logo__word">
        <span v-for="(text, i) in array404" :key="i">
          {{ text }}
        </span>
      </h2>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    array404() {
      const text = "404";
      const array = [];
      for (var i = 0; i < 10; i++) {
        array.push(text);
      }
      return array;
    },
  },
};
</script>

<style scoped>
.error-page {
  height: calc((var(--vh, 1vh) * 100));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.error-page__copy {
  color: var(--muzen-dark-brown);
  font-size: 14px;
  line-height: 21px;
}

.error-page__logo {
}

.logo__word {
  display: flex;
  gap: 20vw;
  font-size: 43vw;
  line-height: 43vw;
  font-family: var(--muzen-nohemi);
  animation: marquee 2s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>