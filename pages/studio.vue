<template>
  <main class="studio-page container">
    <studio-hero />
    <section class="studio-page__about-us" ref="studioAboutUs">
      <div class="about-us__intro">
        <h2 class="section__header">About us</h2>
        <p class="section__copy body">
          At our studio, we understand that fashion is an art form, and every
          garment tells a story. We believe in the power of aesthetics to evoke
          emotions, inspire curiosity, and ignite the imagination. Through
          meticulous attention to detail, thoughtful composition, and a keen
          sense of style, we craft images that embody the very essence of beauty
          and elegance.
        </p>
        <parallax-site-image
          class="section__image"
          src="/images/Studio/5636d885fe1161dcd97994c12abd538b.webp"
        />
      </div>
      <div class="about-us__beliefs">
        <h2 class="section__header multi-line">Where do our beliefs lie?</h2>
        <p class="section__copy body">
          Our studio is founded on the belief that successful collaborations
          yield the most exceptional results. We place immense value on building
          strong relationships with our clients, designers, stylists, and
          models. By truly understanding your brand's identity, values, and
          aspirations, we can tailor our approach to ensure that the final
          images authentically represent your unique style and message.
        </p>
        <parallax-site-image
          class="section__image"
          src="/images/Studio/555216c6494565a1345316404f43f0b0.webp"
        />
        <parallax-site-image
          class="section__image"
          src="/images/Studio/9192fda08a9092ebd418fdf0f6317ed0.webp"
        />
        <parallax-site-image
          class="section__image"
          src="/images/Studio/d712f8231b6a0f0cdcb549923cfc437b.webp"
        />
      </div>

      <div class="about-us__commitment">
        <h2 class="section__header">Commitment</h2>
        <p class="section__copy body">
          With a commitment to professionalism and unwavering attention to
          detail, we offer a comprehensive range of photography services. From
          editorial shoots that grace the pages of fashion magazines to
          captivating lookbooks, compelling brand campaigns, and eye-catching
          social media imagery, we have the expertise and versatility to bring
          your creative vision to life.
        </p>
        <p class="section__copy body">
          We take great pride in our ability to consistently exceed expectations
          and deliver exceptional results. Our team's passion for fashion,
          technical expertise, and dedication to the craft ensure that every
          project, regardless of scale or complexity, receives the utmost care
          and attention it deserves.
        </p>
        <parallax-site-image
          class="section__image"
          src="/images/Studio/1db92f315ae2c2d267ca44c083cb14c2.webp"
        />
        <parallax-site-image
          class="section__image"
          src="/images/Studio/b6f53ebe9da00b27334ecd7e7e9b3d89.webp"
        />
        <parallax-site-image
          class="section__image"
          src="/images/Studio/e0ee7218742c25fa5da77b4ce888891c.webp"
        />
        <parallax-site-image
          class="section__image"
          src="/images/Studio/dbff007d3ed23e1870170e92ea820f47.webp"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { StudioAnimations } from "~/animations/studio/Studio";
import { emitter as $eventBus } from "~/plugins/event-bus";

export default {
  inject: ["getTransitioned"],
  computed: {
    transitioned() {
      return this.getTransitioned();
    },
  },
  setup() {
    const studioAboutUs = ref(null);

    useHead({
      title: "Muzen Studio",
    });
    function callback1() {
      StudioAnimations.init(studioAboutUs.value, !mobile.value);
    }

    function callback2() {
      $eventBus.on("studio-enter-animations", () => {
        StudioAnimations.init(studioAboutUs.value, !mobile.value);
        $eventBus.off("studio-enter-animations");
      });
    }

    useMuzenEnter(callback1, callback2);

    const mobile = useMediaQuery(undefined, undefined);

    return {
      studioAboutUs,
    };
  },
  mounted() {},
};
</script>

<style scoped>
.studio-page {
  /* height: calc((var(--vh, 1vh) * 100)); */
  padding-bottom: 96px;
  background-color: var(--muzen-light-brown);
  overflow: hidden;
}

.inner-container {
}

.studio-page__about-us {
  margin-top: 40px;
  max-width: clamp(600px, 1300px, 90%);
  margin: 40px auto;
}

.section__header {
  font-family: var(--muzen-nohemi);
  font-weight: 400;
  line-height: 0.55;
  font-size: 32px;
  padding-top: 2%;

  &.multi-line {
    line-height: 1;

    + .section__copy {
      margin-top: 8px;
    }
  }
}

.section__copy {
  margin-top: 16px;
  font-size: 20px;
  line-height: 26px;

  &:nth-of-type(2) {
    margin: 0;
  }
}

.section__image {
  margin-top: 24px;
  aspect-ratio: 396/432;
  background-size: cover;
  background-position: 0 40%;
  width: 100%;
  &.mobile__hidden {
    display: none;
  }
}

.about-us__beliefs {
  margin-top: 20px;
}

.about-us__commitment {
  margin-top: 40px;
}

@media screen and (width >= 724px) {
  .studio-page {
    padding-bottom: 400px;
  }
  .studio-page__about-us {
    margin-top: 120px;
  }

  .section__header {
    font-size: 48px;
  }

  .section__image {
    margin-top: 40px;
    filter: grayscale(1);
    transition: filter 1s;

    &:hover {
      filter: grayscale(0);
    }

    &.mobile__hidden {
      display: unset;
    }
  }

  .about-us__intro {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    grid-template-areas: "header copy" "image image";

    .section__copy {
      max-width: 562px;
      margin-left: auto;
    }

    .section__image {
      grid-area: image;
      width: 55%;
      max-width: 678px;
      margin-left: auto;
    }
  }

  .about-us__beliefs {
    margin-top: 120px;
    display: grid;
    grid-template-columns: 1.2fr 0.2fr 0.7fr 0.2fr 1.5fr;
    grid-template-areas: "header header header header header" "... ... ... copy copy" "image1 ... image2 ... image3";

    .section__header {
      grid-area: header;
    }

    .section__copy {
      grid-area: copy;
      max-width: 582px;
      margin-left: auto;
      text-align: justify;
    }

    .section__image {
      &:nth-of-type(1) {
        position: relative;
        right: 20px;
        bottom: 150px;
        grid-area: image1;
      }

      &:nth-of-type(2) {
        position: relative;
        top: 250px;
        grid-area: image2;
      }

      &:nth-of-type(3) {
        grid-area: image3;
      }
    }
  }

  .about-us__commitment {
    margin-top: 120px;
    display: grid;
    grid-template-columns: 1fr 0.4fr 1.8fr;
    grid-template-areas: "header header header" "... ... copy1" "... ... copy2" "... image1 image1" "image2 image3 image4";

    .section__header {
      grid-area: header;
    }

    .section__copy {
      max-width: 700px;
      margin-left: auto;
    }

    .section__copy:nth-of-type(1) {
      grid-area: copy1;
    }
    .section__copy:nth-of-type(2) {
      grid-area: copy2;
    }

    .section__image {
      &:nth-of-type(1) {
        grid-area: image1;
        margin-left: auto;
      }

      &:nth-of-type(2) {
        grid-area: image2;
        position: relative;
        right: 50px;
        max-width: 233px;
      }

      &:nth-of-type(3) {
        grid-area: image3;
        position: relative;
        top: 200px;
        left: 50px;
        aspect-ratio: 233/291;
        max-width: 233px;
        width: 150%;
      }

      &:nth-of-type(4) {
        grid-area: image4;
        position: relative;
        top: 100px;
        aspect-ratio: 315/396;
        left: 150px;
        top: 300px;
        max-width: 315px;
      }
    }
  }
}
</style>