<template>
  <aside class="site-credits">
    <div class="site-credits__content">
      <div class="content__inner-wrapper container">
        <h1 class="heading-1 site-credits__transition-wrapper">
          <span class="site-credits__transition"> Credits </span>
        </h1>
        <div class="site-credits__credits">
          <ul
            v-for="(group, i) in credits"
            :key="group.header + i"
            class="credits__cred-group"
          >
            <h5 class="cred-group__header site-credits__transition-wrapper">
              <span class="site-credits__transition">
                {{ group.header }}
              </span>
            </h5>
            <li
              class="cred-group__cred site-credits__transition-wrapper"
              v-for="(cred, i) in group.creds"
              :key="cred + i"
            >
              <span class="site-credits__transition">
                {{ cred }}
              </span>
            </li>
          </ul>
        </div>
        <q class="site-footer__quote">
          Let the rhythm of our inspiration guide your spirit, and may your
          experience through the realms be filled with endless wonder and
          enchantment.
        </q>
        <button class="close-credits" @click="$emit('close-creds', true)">
          <span class="default">[Close]</span>
          <span class="hover">(Close)</span>
        </button>
      </div>
    </div>

    <div class="site-credits__backdrop"></div>
  </aside>
</template>

<script>
import lockScroll from "~/composables/lockScroll";

export default {
  emits: ["close-creds"],
  props: {
    creditsOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const creditsOpen = ref(false);
    const creditsOpenProp = computed(() => props.creditsOpen);

    if (process.client) {
      lockScroll(creditsOpen, "credits");
      const unwatch = watch(creditsOpenProp, (value) => {
        creditsOpen.value = value;
      });
    }
    return {
      creditsOpen,
    };
  },
  data() {
    return {
      credits: [
        {
          header: "acknowledgements",
          creds: ["Content - OpenAi", "Codrops", "Lemkus", "Props", "Zajno"],
        },
        {
          header: "imagery",
          creds: ["Pinterest", "Unsplash", "Freepik"],
        },
        {
          header: "typeface",
          creds: ["Nohemi", "DM Sans"],
        },
        {
          header: "video",
          creds: ["Pexels"],
        },
      ],
    };
  },
};
</script>

<style scoped>
.site-credits {
  position: fixed;
  left: 0;
  right: 0;
  height: calc((var(--vh, 1vh) * 100));
  top: 0;
  z-index: 50;
  color: var(--muzen-dark-brown);
}

.site-credits__backdrop {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(28, 24, 22, 0.9);
  z-index: -1;
  will-change: transfomr;
}

.site-credits__content {
  min-height: calc((var(--vh, 1vh) * 50));
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--muzen-light-brown);
  overflow: hidden;
  will-change: transform;
}

.content__inner-wrapper {
  position: relative;
  flex-grow: 1;
  height: fit-content;
  width: 100%;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "header" "credits" "quote" "close";
  align-content: space-between;
  overflow: hidden;
  will-change: transform;
}

.content__background {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}

.site-credits__transition-wrapper {
  overflow: hidden;
}

.site-credits__transition {
  display: inline-block;
  will-change: transform;
}

.site-credits .heading-1 {
  grid-area: header;
  height: fit-content;
}

.site-credits__credits {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  grid-area: credits;
  margin-top: 40px;
}

.credits__cred-group {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cred-group__header {
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.288px;
}

.cred-group__cred {
  font-size: 16px;
  font-weight: 400;
  color: rgba(28, 24, 22, 0.9);
  letter-spacing: -0.24px;
}

.site-credits__bottom {
  display: flex;
}

.site-footer__quote {
  font-style: italic;
  grid-area: quote;
  margin-top: 40px;
  max-width: 650px;
  &::before {
    content: none;
  }

  &::after {
    content: none;
  }
}

:deep(.site-footer__quote__line) {
  will-change: transform;
  white-space: nowrap;
}
.close-credits {
  grid-area: close;
  display: block;
  background: none;
  outline: none;
  border: none;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.9);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.24px;
  margin-left: auto;
  margin-top: auto;
  cursor: pointer;

  .hover {
    display: none;
  }

  &:hover {
    .default {
      display: none;
    }

    .hover {
      display: inline;
    }
  }
}

.animation-wrapper {
  position: relative;
  overflow: hidden;
}

@media screen and (width >= 724px) {
  .content__inner-wrapper {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: "header header header header" "credits credits credits credits" "quote quote quote close";
  }

  .site-credits__credits {
    flex-wrap: nowrap;
    margin-top: 0;
  }

  .site-footer__quote {
    margin-top: 0;
  }

  .cred-group__header {
    font-size: 24px;
  }

  .cred-group__cred {
    font-size: 20px;
  }
}

@media screen and (width >= 1024px) {
  .content__inner-wrapper {
    grid-template-columns: auto repeat(3, 1fr);
    grid-template-areas: "header header credits credits" "header header credits credits" "quote quote quote close";
  }

  .site-credits__credits {
    margin-left: auto;
  }
}
</style>