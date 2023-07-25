<template>
  <section class="studio-hero">
    <h1 class="studio-hero__logo">
      <span v-for="(char, i) in 'Muzen'.split('')" :key="char + i">{{
        char
      }}</span>
    </h1>
    <div class="studio-hero__hero-content">
      <p class="hero-content__copy body">
        We are passionate about capturing the essence of fashion through the
        lens, and our dedicated team of talented photographers is here to bring
        your vision to life.
      </p>
    </div>

    <div class="studio-hero__heading">
      <span>Studio</span>
      <span class="heading__year">2023</span>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.studio-hero__logo {
  margin-top: 144px;
  font-family: var(--muzen-nohemi);
  font-size: 28vw;
  display: flex;
  justify-content: space-between;
  line-height: 0.5;
  /* TODO: Pay attention here !!!!!! */
  letter-spacing: 2.5px;
  position: relative;
  right: 4px;
  color: var(--muzen-dark-brown);
}

.studio-hero__hero-content {
  aspect-ratio: 396/348;
  width: 100%;
  background-image: url(/images/Preloader/khaled-ghareeb-rBdkjxJlRaI-unsplash.jpg);
  background-size: cover;
  background-position: 0% 40%;
  display: flex;
  justify-content: end;
  align-items: end;
  padding: 16px;
  margin-top: 24px;
}

.hero-content__copy {
  font-size: 14px;
  color: white;
  margin-bottom: 10%;
  max-width: 95%;
}

.studio-hero__heading {
  font-family: var(--muzen-nohemi);
  font-weight: 400;
  font-size: 12vw;
  display: flex;
  justify-content: space-between;
  line-height: 0.55;
  padding-top: 2%;
  margin-top: 40px;
}

.heading-copyright {
  font-size: 30%;
}

.heading__year::after {
  content: "(c)";
  font-size: 30%;
  position: relative;
  bottom: 10%;
  font-weight: 400;
  font-family: var(--muzen-nohemi);
}

@media screen and (width >= 724px) {
  .studio-hero__logo {
    margin-top: 172px;
  }

  .studio-hero__hero-content {
    margin-top: 40px;
    aspect-ratio: 1376/720;
    background-position: 0 20%;
  }

  .hero-content__copy {
    font-size: 20px;
    max-width: 500px;
  }

  .studio-hero__heading {
    margin-top: 120px;
  }
}
</style>