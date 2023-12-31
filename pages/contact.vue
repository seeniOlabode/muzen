<template>
  <main class="contact-page container" ref="contactPage">
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
        Thanks for your interest in our project! Please note this is not a real
        fashion studio. We own none of the images used here. You can visit the
        <action-button
          text="credits"
          size="sm"
          color="#1c1816"
          :highlight="true"
          @click="creditsOpen = true"
        />
        page to know the respective owners. We're just young and bored creatives
        trying to showcase our skills in creative web design, art direction,
        motion design and web development.
      </p>
      <div class="content__graphic">
        <reveal-site-image
          src="/images/Contact/2218e288ff48b77ca0df131b7290e4c6.webp"
          :aRatio="false"
          customClass="content__img-container"
        />
      </div>
      <p class="content__cta">
        <a
          href="mailto:elufidipebenjamin@gmail.com?cc=seeniolabode8734@gmail.com"
          target="_blank"
        >
          IF YOU HAVE A POTENTIAL PROJECT OR COLLABORATION THAT YOU'D LIKE TO
          DISCUSS
        </a>
      </p>
      <div class="content__creators">
        <p class="creators__credit">
          Design by
          <site-link
            to="https://x.com/tolzyhub"
            text=" Tosin"
            size="sm"
            class="creator__twitter"
            color="#1c1816"
            :newTab="true"
          />
        </p>
        <p class="creators__credit">
          Development by
          <site-link
            to="https://x.com/bodeslomo"
            text=" Bode"
            size="sm"
            class="creator__twitter"
            color="#1c1816"
            :newTab="true"
          />
        </p>
      </div>
    </section>
    <transition @enter="creditsEnter" @leave="creditsLeave">
      <site-credits
        v-show="creditsOpen"
        @close-creds="creditsOpen = false"
        :credits-open="creditsOpen"
      />
    </transition>
  </main>
</template>

<script>
import { animations as contactAnimationClass } from "~/animations/contact/contact";
import { animations as creditsAnimationsClass } from "~/animations/footer/SiteCredits";

import { emitter as $eventBus } from "../plugins/event-bus.js";

const ContactPageAnimations = new contactAnimationClass();
const creditsAnimations = new creditsAnimationsClass();

export default {
  name: "Contact Page",
  setup() {
    useHead({
      title: "Muzen Contact",
    });

    const contactPage = ref(null);

    function callback1() {
      ContactPageAnimations.init(contactPage.value, false);
    }

    function callback2() {
      $eventBus.on("contact-enter-animations", () => {
        ContactPageAnimations.init(contactPage.value);
        $eventBus.off("contact-enter-animations");
      });
    }

    useMuzenEnter(callback1, callback2);

    return { contactPage };
  },
  data() {
    return {
      creditsOpen: false,
    };
  },
  methods: {
    creditsEnter(el, done) {
      creditsAnimations.enter(el, done);
    },
    creditsLeave(el, done) {
      creditsAnimations.leave(el, done);
    },
  },
  mounted() {
    creditsAnimations.init();
  },
};
</script>

<style scoped>
.contact-page {
  padding-top: 144px;
  padding-bottom: 20px;
  background-color: var(--muzen-light-brown);
  min-height: 100vh;
}

.contact-page__content {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas: "heading heading heading heading heading heading" "... copy copy copy copy copy" "graphic graphic graphic graphic graphic graphic" "cta cta cta cta cta cta" "creators creators creators creators creators creators";
}

.content__animation-span {
  display: block;

  .animation-span__inner {
    display: inline-block;
    will-change: transfomr;
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

:deep(.content__copy__lines) {
  overflow: hidden;
}

:deep(.content__copy__words),
:deep(.content__cta__words) {
  will-change: transform;
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

.content__cta a {
  color: var(--muzen-dark-brown);
  text-decoration: none;
  display: inline-block;
}

.content__cta:hover a {
  text-decoration: underline;
}

:deep(.content__cta__lines) {
  overflow: hidden;
}

.content__creators {
  /* display: none; */
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

.creator__twitter.site-link {
  font-size: 18px !important;
  line-height: 1 !important;
  font-weight: 500 !important;
}

.creators__credit {
  display: flex;
  gap: 4px;
  align-items: center;
  will-change: transform;
}

.creator__twitter.site-link {
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
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
    max-width: 560px;
    margin: 0;
    margin-left: auto;
    /* position: relative; */
    /* left: 20px; */
  }

  .content__cta {
    font-size: clamp(0px, 48px, 8vw);
  }
}

/* @media screen and (width >= 500px) {
  .content__heading {
    font-size: clamp(0px, 180px, 10vw);
  }
} */
</style>