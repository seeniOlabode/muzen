<template>
  <main class="contact-page container">
    <section class="contact-page__content">
      <h1 class="content__heading heading-1">
        <span class="content__animation-span">
          <span class="animation-span__inner">G</span>
          <span class="animation-span__inner">E</span>
          <span class="animation-span__inner">T</span>
          <span>&nbsp;</span>
          <span class="animation-span__inner">I</span>
          <span class="animation-span__inner">N</span>
          <span>&nbsp;</span>
          <span class="animation-span__inner">T</span>
          <span class="animation-span__inner">O</span>
          <span class="animation-span__inner">U</span>
          <span class="animation-span__inner">C</span>
          <span class="animation-span__inner">H</span>
        </span>
      </h1>
      <p class="content__copy body">
        <span class="content__animation-span">
          Thanks for your interest in our project! Please note this is not a
          real fashion studio. We own none of the images used here. You can
          visit the credits page to know the respective owners. We're just young
          and bored creatives trying to showcase our skills in creative web
          design, art direction, motion design and web development.
        </span>
      </p>
      <div class="content__graphic">
        <site-image
          src="/images/Contact/2218e288ff48b77ca0df131b7290e4c6.jpg"
          :aRatio="false"
          customClass="content__img-container"
        />
      </div>
      <p class="content__cta">
        <span class="content__animation-span">
          IF YOU HAVE A POTENTIAL PROJECT OR COLLABORATION THAT YOU'D LIKE TO
          DISCUSS
        </span>
      </p>
      <div class="content__creators">
        <p class="creators__credit">
          <span class="content__animation-span"> Design by Tosin </span>
        </p>
        <p class="creators__credit">
          <span class="content__animation-span"> Development by Bode </span>
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "Contact Page",
  setup() {
    useHead({
      title: "Muzen Contact",
    });
  },
  mounted() {
    const tl = gsap.timeline({
      // paused: true,
    });

    tl.addLabel("start");

    // // Content Creators Animation
    // tl.from(".content__creators .content__animation-span", {
    //   yPercent: 100,
    //   duration: 2,
    // });
    // // End Content Creators Animation

    // // Content Copy Animation
    // tl.from(
    //   ".content__copy .content__animation-span",
    //   {
    //     yPercent: 100,
    //     duration: 3,
    //     ease: "power2.out",
    //   },
    //   ">-=1"
    // );
    // // End Content Copy Animation

    // // Content CTA Animation
    // tl.from(
    //   ".content__cta",
    //   {
    //     autoAlpha: 0,
    //     duration: 2,
    //     ease: "linear",
    //   },
    //   "<+=1"
    // );
    // // End Content CTA Animation

    // Content Heading Animation
    tl.from(
      ".content__heading .content__animation-span .animation-span__inner",
      {
        yPercent: 100,
        duration: 0.5,
        stagger: {
          each: 0.25,
        },
        // ease: "power2.out",
      },
      ">"
    );
    // End Content Heading Animation

    // // Content Graphic Animation
    // tl.from(
    //   ".content__graphic",
    //   {
    //     yPercent: -100,
    //     duration: 3,
    //     ease: "power2.out",
    //   },
    //   ">-=0.4"
    // );

    // tl.from(
    //   ".content__graphic .site-image__image-wrapper",
    //   {
    //     yPercent: 100,
    //     duration: 3,
    //     ease: "power2.out",
    //   },
    //   "<"
    // );

    // tl.from(
    //   ".content__graphic .site-image__image",
    //   {
    //     scale: 2,
    //     duration: 3,
    //   },
    //   "<"
    // );
    // // End Content Graphic Animation
  },
};
</script>

<style scoped>
.contact-page {
  padding-top: 144px;
  padding-bottom: 96px;
}

.contact-page__content {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas: "heading heading heading heading heading heading" "... copy copy copy copy copy" "graphic graphic graphic graphic graphic graphic" "cta cta cta cta cta cta";
}

.content__animation-span {
  display: block;

  .animation-span__inner {
    display: inline-block;
  }
}

.content__heading {
  grid-area: heading;
  overflow: hidden;
}

.content__copy {
  grid-area: copy;
  margin-top: 40px;
  line-height: 26px;
  overflow: hidden;
  align-self: center;
}

.content__graphic {
  grid-area: graphic;
  margin-top: 24px;
  overflow: hidden;

  :deep(.content__img-container) {
    aspect-ratio: 329/388;
    object-position: top;
  }
}

.content__cta {
  grid-area: cta;
  margin-top: 40px;
  font-family: var(--muzen-nohemi);
  font-weight: 500;
  font-size: clamp(0px, 32px, 8vw);
}

.content__creators {
  display: none;
}

@media screen and (width >= 724px) {
  .contact-page {
    padding-top: 172px;
    padding-bottom: 24px;
  }

  .contact-page__content {
    grid-template-columns: repeat(8, 1fr);
    grid-template-areas: "heading heading heading heading heading heading heading heading" "copy copy copy copy copy ... graphic graphic" "cta cta cta cta cta cta ... ..." "creators creators creators creators creators creators creators creators";
  }

  .content__heading {
    font-size: clamp(0px, 180px, 13.5vw);
    /* font-size: 180px; */
  }

  .content__copy {
    display: flex;
    align-items: center;
    max-width: 560px;
    margin: 0;
    margin-left: auto;
    /* position: relative; */
    /* left: 20px; */
  }

  .content__cta {
    font-size: clamp(0px, 48px, 8vw);
  }

  .content__creators {
    display: block;
    grid-area: creators;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 500;
    font-family: var(--muzen-dm);
    margin-top: 20px;
    overflow: hidden;
  }
}

/* @media screen and (width >= 500px) {
  .content__heading {
    font-size: clamp(0px, 180px, 10vw);
  }
} */
</style>