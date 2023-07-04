<template>
  <div class="mobile-header">
    <div class="mobile-header__controls">
      <TransitionGroup name="menu-controls">
        <action-button
          v-show="!menuOpen"
          color="dark"
          text="Menu"
          key="open-menu"
          @click="menuOpen = true"
        />
        <action-button
          v-show="menuOpen"
          color="light"
          text="Close"
          key="close-menu"
          @click="menuOpen = false"
        />
      </TransitionGroup>
    </div>

    <Transition name="menu-container" @enter="menuEnter" @leave="menuLeave">
      <nav class="menu-container" v-show="menuOpen" ref="menuContainer">
        <div class="menu-container__bg"></div>
        <ul class="menu-options">
          <li
            class="menu-option"
            v-for="link in menuLinks"
            :key="link.text + link.path"
            @click="menuOpen = false"
          >
            <site-link
              class="site-link"
              :text="link.text"
              :to="link.path"
              color="#FAF7F0"
            />
          </li>
        </ul>
        <div class="menu__logo">
          <span
            class="logo__char"
            v-for="(char, i) in logoSplitText"
            :key="char + i"
          >
            {{ char }}
          </span>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { selectFrom } from "~/utils/utils";

export default {
  data() {
    return {
      menuOpen: false,
      menuLinks: [
        { text: "home", path: "/" },
        { text: "studio", path: "/studio" },
        { text: "lookbook", path: "/lookbook" },
      ],
    };
  },
  computed: {
    logoSplitText() {
      return "Muzen".split("");
    },
  },
  methods: {
    menuEnter,
    menuLeave,
  },
};

function menuEnter(el, done) {
  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      done();
    },
  });

  const menuContainer = this.$refs.menuContainer;
  const menuContainerBg = selectFrom(".menu-container__bg", menuContainer);
  const menuLogoChars = selectAllFrom(".logo__char", menuContainer);
  const menuSiteLinks = selectAllFrom(".site-link", menuContainer);

  // animate bg in
  tl.from(menuContainerBg, {
    autoAlpha: 0,
  });

  tl.from(
    menuLogoChars,
    {
      yPercent: 150,
      duration: 0.3,
      stagger: 0.15,
      ease: "power2.out",
    },
    "<+0.1"
  );

  tl.from(
    menuSiteLinks,
    {
      yPercent: 150,
      duration: 0.3,
      ease: "power2.out",
      rotate: 10,
      stagger: {
        each: 0.15,
        from: "end",
      },
    },
    "<"
  );

  tl.play();
}

function menuLeave(el, done) {
  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      done();
      tl.revert();
    },
  });

  const menuContainer = this.$refs.menuContainer;
  const menuLogoChars = selectAllFrom(".logo__char", menuContainer);
  const menuSiteLinks = selectAllFrom(".site-link", menuContainer);

  tl.to(menuSiteLinks, {
    rotate: -10,
    yPercent: -150,
    duration: 0.5,
    ease: "linear",
  });

  tl.to(
    menuLogoChars,
    {
      autoAlpha: 0,
      duration: 0.25,
      ease: "linear",
    },
    "<"
  );

  tl.to(
    menuContainer,
    {
      autoAlpha: 0,
    },
    "<"
  );

  tl.play();
}
</script>

<style scoped>
@import url("~/styles/components/header/SiteHeaderMobile.pcss");
</style>