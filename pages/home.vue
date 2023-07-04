<template>
  <div class="home-page">
    <section class="home-hero">
      <div class="home-hero__video-wrapper">
        <video
          class="video-wrapper__video"
          src="/images/Home/Home Video Trimmed.mp4"
          autoplay
          loop
        ></video>
      </div>
      <div class="home-hero__copy">
        <p class="copy__body body">
          Muzen is a fashion photography studio based in Asgard, Nethers.
        </p>
        <p class="copy__body body">
          We are dedicated to capturing the essence of style and beauty through
          our lens.
        </p>
        <p class="copy__body body">
          Our passion lies in creating captivating visual stories that elevate
          fashion to an art form.
        </p>
      </div>
      <div class="home-hero__logo">
        <span
          class="logo__char"
          v-for="(char, i) in logoSplitText"
          :key="char + i + 'home-hero'"
          >{{ char }}</span
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    logoSplitText() {
      return "Muzen".split("");
    },
  },
};
</script>

<style scoped>
.home-page {
  position: absolute;
  top: 0;
  z-index: -1;
}

.home-hero {
  position: relative;
  height: 100vh;
  width: 100vw;
}

.home-hero__video-wrapper {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
}

.video-wrapper__video {
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: relative;
}

.home-hero__copy {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 16px;
}

.copy__body {
  max-width: 70%;
}

.home-hero__logo {
  position: absolute;
  left: 16px;
  bottom: 0;
  z-index: 10;
  font-family: var(--muzen-nohemi);
  font-size: 29vw;
  line-height: 1;
  color: #1c1816;
}
</style>