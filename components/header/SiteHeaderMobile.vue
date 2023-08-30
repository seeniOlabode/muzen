<template>
  <div class="mobile-header">
    <div class="mobile-header__controls">
      <Transition name="menu-controls" mode="default">
        <action-button
          v-show="!menuOpen"
          color="#1c1816"
          text="Menu"
          key="open-menu"
          class="open-menu"
          @click="menuOpen = true"
        />
      </Transition>

      <Transition name="menu-controls" mode="default">
        <action-button
          v-show="menuOpen"
          color="#faf7f0"
          text="Close"
          key="close-menu"
          class="close-menu"
          @click="menuOpen = false"
        />
      </Transition>
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
import { menuAnimations } from "~/animations/header/SiteHeaderMobile";

export default {
  setup() {
    const menuOpen = ref(false);
    if (process.client) {
      lockScroll(menuOpen);
    }
    return {
      menuOpen,
    };
  },
  data() {
    return {
      menuLinks: [
        { text: "home", path: "/" },
        { text: "studio", path: "/studio" },
        { text: "lookbook", path: "/lookbook" },
        { text: "contact", path: "/contact" },
      ],
    };
  },
  computed: {
    logoSplitText() {
      return "Muzen".split("");
    },
  },
  mounted() {
    menuAnimations.init(this.$refs.menuContainer);
  },
  methods: {
    menuEnter(el, done) {
      menuAnimations.enter(el, done);
    },
    menuLeave(el, done) {
      menuAnimations.leave(el, done);
    },
  },
};
</script>

<style scoped>
@import url("~/styles/components/header/SiteHeaderMobile.pcss");
:global(.site-header) {
  position: fixed !important;
}
</style>