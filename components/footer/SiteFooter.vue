<template>
  <footer class="site-footer container">
    <div class="site-footer__links">
      <ul
        class="site-footer__link-group"
        :class="links.header"
        v-for="(links, i) in footerLinks"
        :key="links.header + i"
      >
        <h5 class="link-group__header">{{ links.header }}</h5>
        <li
          class="link-group__link"
          v-for="(link, i) in links.links"
          :key="link.text + i"
        >
          <site-link
            v-if="link?.type != 'button' && link?.type != 'share'"
            color="rgba(255,255,255,0.88)"
            :text="link.text"
            size="sm"
            :to="link.path"
          />
          <share-link v-else-if="link?.type == 'share'" />
          <action-button
            v-else
            :text="link.text"
            size="sm"
            color="rgba(255,255,255,0.88)"
            @click="link.action"
          />
        </li>
      </ul>
    </div>
    <div class="site-footer__creators">
      <p class="creators__credit">Design by Tosin</p>
      <p class="creators__credit">Development by Bode</p>
    </div>
    <div class="site-footer__logo">
      <h2 class="logo__word">
        <span
          class="logo__char"
          v-for="(char, i) in 'Muzen'.split('')"
          :key="char + i"
        >
          {{ char }}
        </span>
      </h2>
      <p class="creators__credit">Design by Tosin</p>
      <p class="creators__credit">Development by Bode</p>
    </div>
    <!-- 
    <div class="site-footer__logo fake">
      <h2 class="logo__word">
        <span
          class="logo__char"
          v-for="(char, i) in 'Muzen'.split('')"
          :key="char + i"
        >
          {{ char }}
        </span>
      </h2>
      <p class="creators__credit">Design by Tosin</p>
      <p class="creators__credit">Development by Bode</p>
    </div> -->

    <!-- <div class="logo-space-filler"></div> -->

    <transition @enter="onEnter" @leave="onLeave">
      <site-credits v-show="creditsOpen" @close-creds="creditsOpen = false" />
    </transition>
  </footer>
</template>

<script>
import lockScroll from "~/composables/lockScroll";
import { gsap } from "gsap";
import { CustomEase } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";
gsap.registerPlugin(CustomEase, SplitText);

export default {
  setup() {
    const creditsOpen = ref(false);
    if (process.client) {
      lockScroll(creditsOpen);
    }
    return {
      creditsOpen,
    };
  },
  data() {
    return {
      footerLinks: [
        {
          header: "sitemap",
          links: [
            {
              text: "Home",
              path: "/",
            },
            {
              text: "Studio",
              path: "/studio",
            },
            {
              text: "Lookbook",
              path: "/lookbook",
            },
            { text: "Contact", path: "/contact" },
          ],
        },
        {
          header: "support",
          links: [
            {
              text: "Credit",
              type: "button",
              action: () => {
                this.creditsOpen = true;
              },
            },
            {
              text: "Request content removal",
              type: "button",
              action: () => {
                window.location.href =
                  "mailto:seeniolabode8734@gmail.com?subject=Request Content Removal";
              },
            },
            {
              text: "Share link",
              path: "/share-link",
              type: "share",
            },
          ],
        },
        {
          header: "bonus",
          links: [
            {
              text: "Easter egg",
              path: "/3@s73r",
            },
          ],
        },
      ],
    };
  },
  methods: {
    onEnter,
    onLeave,
  },
  mounted() {
    logoAnimation();
  },
};

function onEnter(el, done) {
  // CustomEase.create(
  //   "custom",
  //   "M0,0 C0.25,0 0.381,0.023 0.422,0.05 0.515,0.11 0.56,0.282 0.592,0.492 0.626,0.72 0.644,0.802 0.678,0.866 0.7,0.908 0.698,1 1,1 "
  // );

  CustomEase.create("custom", "M0,0 C0.65,0 0.35,1 1,1 ");

  const split = new SplitText(".site-footer__quote", {
    type: "lines,words",
    lineThreshold: 2,
    linesClass: "site-footer__quote__line",
  });

  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      done();
      tl.revert();
    },
  });

  tl.addLabel("start-slide-in")
    .from(
      ".site-credits__content",
      {
        yPercent: -100,
        ease: "custom",
        duration: 1.2,
      },
      "start-slide-in"
    )
    .from(
      ".content__inner-wrapper",
      {
        yPercent: 100,
        ease: "custom",
        duration: 1.2,
      },
      "start-slide-in"
    )
    .from(
      ".site-credits__backdrop",
      {
        autoAlpha: 0,
      },
      "start-slide-in+=0.6"
    )
    .addLabel("end-slide-in");
  function siteCredits() {
    tl.from(
      ".heading-1 .site-credits__transition",
      {
        yPercent: 100,
        rotate: 10,
        ease: "circ.out",
        duration: 0.5,
      },
      "end-slide-in-=0.85"
    );
    gsap.utils.toArray(".credits__cred-group").forEach((credGroup) => {
      tl.from(
        selectAllFrom(".site-credits__transition", credGroup),
        {
          yPercent: 100,
          rotate: 10,
          ease: "circ.out",
          stagger: 0.12,
          duration: 0.5,
        },
        "end-slide-in-=0.75"
      );
    });
    tl.from(
      split.lines,
      {
        yPercent: 120,
        opacity: 0,
        ease: "power3.out",
        stagger: 0.15,
        duration: 1,
      },
      "end-slide-in-=0.2"
    );
  }
  siteCredits();
  tl.add(() => {
    split.revert();
  });
  tl.play();
}

function onLeave(el, done) {
  const split = new SplitText(".site-footer__quote", {
    type: "lines,words",
    lineThreshold: 2,
    linesClass: "site-footer__quote__line",
  });

  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      done();
      tl.revert();
    },
  });
  tl.addLabel("start-slide-out")
    .to(
      ".site-credits__content",
      {
        yPercent: -100,
        ease: "custom",
        duration: 1.2,
      },
      "start-slide-out"
    )
    .to(
      ".content__inner-wrapper",
      {
        yPercent: 100,
        ease: "custom",
        duration: 1.2,
      },
      "start-slide-out"
    )
    .to(
      ".site-credits__backdrop",
      {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
      },
      "start-slide-out+=0.6"
    )
    .addLabel("end-slide-out");
  function siteCredits() {
    tl.to(
      split.lines,
      {
        yPercent: 120,
        opacity: 0,
        ease: "power3.in",
        stagger: {
          each: 0.25,
          from: "end",
        },
        duration: 0.5,
      },
      "end-slide-out-=1.3"
    );
    gsap.utils.toArray(".credits__cred-group").forEach((credGroup) => {
      tl.to(
        selectAllFrom(".site-credits__transition", credGroup),
        {
          yPercent: 100,
          rotate: 10,
          ease: "circ.in",
          stagger: {
            each: 0.12,
            from: "end",
          },
          duration: 0.3,
        },
        "end-slide-out-=1.2"
      );
    });
    tl.to(
      ".heading-1 .site-credits__transition",
      {
        yPercent: 100,
        rotate: 10,
        ease: "circ.in",
        duration: 0.5,
      },
      ">"
    );
  }
  siteCredits();
  tl.add(() => {
    split.revert();
  });
  tl.play();
}

function logoAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".site-footer",
      start: "clamp(bottom 101%)",
    },
  });

  tl.from(".site-footer__logo .logo__char", {
    yPercent: 150,
    duration: 0.8,
    // rotate: 5,
    ease: "power2.out",
    stagger: {
      each: 0.08,
    },
  }).from(
    ".creators__credit",
    {
      autoAlpha: 0,
      duration: 1,
    },
    ">-=0.5"
  );
}
</script>

<style scoped>
.site-footer {
  background-color: var(--muzen-dark-brown);
  color: rgba(255, 255, 255, 0.88);
  padding-top: 40px;
  position: relative;
}

.site-footer__links {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  gap: 50px;
}

.bonus {
  display: none !important;
}

.site-footer__link-group {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link-group__header {
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  margin-bottom: 4px;
  color: white;
}

.link-group__link {
  line-height: 1;
}

.site-footer__creators {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.creators__credit {
  line-height: 1;
  font-size: 14px;
}

.site-footer__logo {
  /* position: absolute; */
  left: 20px;
  right: 20px;
  bottom: 18px;
  font-family: var(--muzen-nohemi);
  padding-top: 20px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "logo";
  line-height: 1;
  overflow: hidden;
  margin-top: 186px;

  .creators__credit {
    font-size: 16px;
    display: none;
  }

  .creators__credit:nth-child(2) {
    grid-area: credit1;
    position: relative;
    left: 0.8vw;
  }

  .creators__credit:nth-child(3) {
    grid-area: credit2;
    position: relative;
    right: 0.8vw;
  }

  &.fake {
    line-height: 1;
    visibility: hidden;

    .logo-word {
      line-height: 1 !important;
    }
  }
}

.logo__word {
  display: flex;
  justify-content: space-between;
  width: 100%;
  grid-area: logo;
  font-size: 28vw;
  line-height: 0.66;
  padding-top: 50px;
}

.logo__char {
  display: inline-block;
}

.false-text {
  visibility: hidden;
}

.logo-space-filler {
  margin-top: 186px;
  height: 40px;
}

@media screen and (width >= 724px) {
  .site-footer {
    padding-top: 100px;
    min-height: clamp(684px, 100vh, 100vh);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bonus {
    display: flex !important;
  }

  .link-group__header {
    font-size: 24px;
  }

  .site-footer__links {
    grid-template-columns: auto auto auto;
  }
  .site-footer__creators {
    display: none;
  }
  .site-footer__logo {
    margin-top: 0;
    position: absolute;
    margin: 0;
    order: 1;
    justify-self: end;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "logo logo logo" "credit1 ... credit2";
    .creators__credit {
      display: block;
    }
  }
}

@media screen and (width >= 1100px) {
  .site-footer__logo {
    .creators__credit:nth-child(2) {
      left: 0.8vw;
    }

    .creators__credit:nth-child(3) {
      right: 0.65vw;
    }

    .logo__word {
      font-size: 30vw;
    }
  }
}
</style>