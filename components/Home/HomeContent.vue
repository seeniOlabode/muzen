<template>
  <section class="home-content container" ref="homeContent">
    <div class="inner-wrapper">
      <div class="row">
        <p class="body">
          At our studio, we believe that less is more. We embrace the power of
          simplicity and elegance, infusing it into every frame we capture. Our
          team of talented photographers has an innate ability to find beauty in
          the subtlest details, highlighting the essence of our subjects and the
          garments they wear.
        </p>
        <reveal-site-image
          src="/images/Home/bd61410803fcb567cbae8ae3404ff547.jpg"
        />
      </div>
      <div class="row parallax">
        <p class="body">
          Creativity is at the core of everything we do. We constantly push the
          boundaries of conventional fashion photography, seeking innovative
          ways to showcase designs and concepts. Through meticulous planning and
          a keen eye for unique angles, we transform our clients' visions into
          mesmerizing visual appealing narratives.
        </p>
        <reveal-site-image
          class="parallax"
          src="/images/Home/9c4185c457cfc98a6b1c74c7107e8394.jpg"
        />
      </div>
      <div class="row">
        <div class="copy">
          <h2 class="heading-2">
            <span class="animation-wrapper">The Light & Muse</span>
          </h2>
          <p class="body">
            Light is our muse, shaping the mood and ambiance of our photographs.
            We understand the importance of perfect lighting in accentuating the
            textures, colors, and silhouettes of fashion. Whether it's natural
            sunlight or carefully crafted studio lighting, we harness its magic
            to create enchanting images that evoke emotions and inspire awe.
          </p>
        </div>
        <reveal-site-image
          src="/images/Home/17537fd3f45377fd12276f9653e95dd3.jpg"
        />
      </div>

      <div class="row image-only">
        <reveal-site-image
          src="/images/Home/6b51bd3356a853ae5be74b3742214f83.jpg"
        />
        <reveal-site-image
          src="/images/Home/6d1aee11ee587f8da862c34fd3b582a7.jpg"
        />
        <reveal-site-image
          src="/images/Home/3a6643cb8f839f7835c98c13a4e24f70.jpg"
        />
      </div>

      <div class="row">
        <p class="body">
          Collaboration is key to our process. We work closely with our in-house
          designers, stylists, models, and makeup artists to ensure a seamless
          and cohesive creative experience. Our team strives to understand
          clients vision and translate it into stunning visual compositions that
          reflect your brand's identity and message.
        </p>
        <reveal-site-image
          src="/images/Home/2319c541d59e20ec4d3458ea26c88ad9.jpg"
          :aRatio="false"
        />
      </div>

      <div class="row double-text">
        <div class="copy">
          <p class="body">
            With a meticulous attention to detail and a deep understanding of
            fashion aesthetics, we create imagery that tells a story. Each
            photograph we produce is a testament to our dedication to
            craftsmanship, passion, and the pursuit of beauty. Our work has been
            featured in prestigious fashion publications and exhibitions,
            solidifying our reputation as a leading force in the world of
            fashion photography.
          </p>
          <p class="body">
            We invite you to step into our studio and embark on a visual journey
            that celebrates the intersection of fashion and art. Together, let's
            explore the depths of creativity, guided by the simplicity of
            aesthetics and the ethereal touch of light.
          </p>
        </div>

        <reveal-site-image
          src="/images/Home/f925b54c66129218d392aad65af94b92.jpg"
        />
      </div>

      <div class="row image-only">
        <reveal-site-image
          class="no-mobile"
          src="/images/Home/4cb3dbe4029b1f82262036eaa727c27f.jpg"
        />

        <reveal-site-image
          src="/images/Home/846c726339639779cbf4e3a9cf3ca3ed.jpg"
        />
        <reveal-site-image
          src="/images/Home/43df5d316e46360d6fb01f4bb8624e3f.jpg"
        />

        <reveal-site-image
          class="no-mobile"
          src="/images/Home/c33c22f04c0db03d12ece71c9500f8b1.jpg"
        />
        <reveal-site-image
          class="no-mobile"
          src="/images/Home/7ae766844aea609f111dba45eed73905.jpg"
        />
      </div>
    </div>
  </section>
</template>


<script>
import { HomeContentAnimations } from "~/animations/Home/HomeContent";

export default {
  inject: ["getTransitioned"],
  computed: {
    transitioned() {
      return this.getTransitioned();
    },
  },
  mounted() {
    if (this.transitioned) {
      this.$eventBus.on("transition-almost-out", () => {
        HomeContentAnimations.init(this.$refs.homeContent);
        this.$eventBus.off("transition-almost-out");
      });
    } else {
      HomeContentAnimations.init(this.$refs.homeContent);
    }
  },
  unmounted() {
    HomeContentAnimations.destroy();
    this.$eventBus.off("transition-almost-out");
  },
};
</script>

<style lang="pcss" scoped>
/* asfhklsjadfk */
:global(.child__lines),
[class*="heading"] {
  overflow: hidden;
}

.animation-wrapper {
  display: block;
}

/* TODO: Make sure to vary the aspect ratios of images */

.home-content {
  padding-top: 40px;
  padding-bottom: 96px;
}

.inner-wrapper {
  max-width: clamp(600px, 1300px, 90%);
  margin: 0 auto 0 auto;
}

.body {
  line-height: 26px;
  font-size: 20px;
  letter-spacing: -0.24px;
  text-align: left;
  &:not(:first-child) {
    margin-top: 24px;
  }
}

.row {
  display: grid;
  gap: 24px;
  margin-top: 40px;

  &.image-only {
    margin-top: 24px;
  }

  &.double-text {
    .body:nth-child(2) {
      margin-top: 0;
    }
  }
}

.no-mobile {
  display: none;
}

@media screen and (width >= 550px) {
  .no-mobile {
    display: unset;
  }
  .home-content {
    padding-bottom: 184px;
  }

  .body {
    line-height: 31.2px;
    font-size: 24px;
    letter-spacing: -0.24px;
  }
  .row {
    margin-top: 120px;
    &.image-only {
      margin-top: 128px;
    }
  }

  .row:nth-child(1) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "text image";
    .body {
      grid-area: text;
    }

    .reveal-site-image {
      max-width: 445px;
      grid-area: image;
      aspect-ratio: 445/485;
    }
  }

  .row:nth-child(2) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas: "... text text text text ..." "... ... image image ... ...";
    .body {
      grid-area: text;
    }

    .reveal-site-image {
      grid-area: image;
      aspect-ratio: 330/380;
      position: relative;
      bottom: 50px;
      max-width: 330px;
      margin: 0 auto;
    }
  }

  .row:nth-child(3) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: "text text image image";

    .copy {
      grid-area: text;
    }
    .reveal-site-image {
      grid-area: image;
      aspect-ratio: 445/517;
      position: relative;
      left: 50px;
      top: 40px;
      max-width: 445px;
    }
  }

  .row:nth-child(4) {
    grid-template-columns: 1fr 1fr 1fr;

    .reveal-site-image {
      position: relative;

      &:nth-child(1) {
        right: 50px;
        bottom: 80px;
        aspect-ratio: 330/388;
      }

      &:nth-child(2) {
        top: 30px;
        aspect-ratio: 400/533;
      }

      &:nth-child(3) {
        bottom: 60px;
      }
    }
  }

  .row:nth-child(5) {
    grid-template-columns: 0.2fr repeat(5, 1fr) 0.2fr;
    grid-template-areas: "... text text text text text ..." "... ... image image image ... ...";

    .body {
      grid-area: text;
      text-align: center !important;
    }

    .reveal-site-image {
      grid-area: image;
      position: relative;
      top: 40px;
    }
  }

  .row:nth-child(6) {
    grid-template-columns: 2fr 0.2fr 1fr;
    grid-template-areas: "copy ... image" "copy ... image";

    .copy {
      grid-area: copy;

      .body:nth-child(2) {
        margin-top: 24px;
      }
    }

    .reveal-site-image {
      grid-area: image;
      position: relative;
      top: 100px;
      aspect-ratio: 445/524;
    }
  }

  .row:nth-child(7) {
    grid-template-columns: repeat(6, 1fr) 1.5fr;
    grid-template-areas: "image1 image1 image1 image2 image2 image3 image3" "... image4 image4 ... ... image5 image5";
    row-gap: 50px;

    .reveal-site-image:nth-child(1) {
      grid-area: image1;
      position: relative;
      bottom: 50px;
      right: 30px;
    }

    .reveal-site-image:nth-child(2) {
      grid-area: image2;
      position: relative;
      top: 100px;
      left: 50px;
      aspect-ratio: 300/388;
    }

    .reveal-site-image:nth-child(3) {
      grid-area: image3;
      position: relative;
      left: 40px;
      bottom: 0px;
    }

    .reveal-site-image:nth-child(4) {
      grid-area: image4;
      aspect-ratio: 445/244;
    }
    .reveal-site-image:nth-child(5) {
      grid-area: image5;
      position: relative;
      top: 50px;
    }
  }
}

@media screen and (width >= 1024px) {
  .body {
    text-align: left;
  }
  .row:nth-child(1) {
    grid-template-columns: 1fr 1fr 0.7fr 1fr 1fr 0.7fr;
    grid-template-areas: "text text ... image image ...";

    .body {
      max-width: 445px;
      position: relative;
      top: 30px;
      left: 10px;
    }
  }

  .row:nth-child(2) {
    grid-template-columns: 0.5fr repeat(4, 1fr) 0.5fr;

    .body {
      max-width: 800px;
      margin: 0 auto;
    }

    .reveal-site-image {
      bottom: 70px;
    }
  }

  .row:nth-child(3) {
    grid-template-columns: repeat(2, 1fr) 0.3fr repeat(2, 1fr);
    grid-template-areas: "text text ... image image";

    .body {
      max-width: 500px;
    }
  }

  .row:nth-child(5) {
    .body {
      max-width: 800px;
      margin: 0 auto;
    }
  }
  .row:nth-child(6) {
    margin-top: 150px;
    .copy {
      max-width: 600px;
    }
  }

  .row:nth-child(7) {
    margin-top: 200px;

    .reveal-site-image {
      &:nth-child(2) {
        top: 200px;
      }
    }
  }
}
</style>