<template>
  <main class="lookbook-page container" ref="lookbookPage">
    <section class="lookbook-page__intro">
      <h1 class="intro__heading heading-1">Lookbook</h1>
      <p class="intro__copy body">
        collection of our photographs that showcase our unique style, some
        fashion trend, or product line. Step into our lookbook, where aesthetics
        and minimalism helps us promote your fashion story in the most
        captivating and visually arresting way imaginable. We also use it to
        give customers an idea of how their products can be styled and combined.
      </p>
      <div class="intro__graphic">
        <img
          src="/images/Lookbook/f925b54c66129218d392aad65af94b92.jpg"
          alt=""
        />
      </div>
    </section>
    <section class="lookbook-page__gallery">
      <ul class="gallery__images">
        <li class="gallery__images-block">
          <img
            class="gallery__image"
            src="/images/Lookbook/d8066a7aa3e02a19590370f71271a2cb.jpg"
            alt=""
          />
          <img
            src="/images/Lookbook/86edab85d82bd80a81045d1c15e17d0f.jpg"
            alt=""
            class="gallery__image mobile-hidden"
          />
          <img
            class="gallery__image"
            src="/images/Lookbook/dbff007d3ed23e1870170e92ea820f47.jpg"
            alt=""
          />
          <img
            class="gallery__image"
            src="/images/Lookbook/608211fde9d4cd23630731385fce5e46.jpg"
            alt=""
          />
          <img
            src="/images/Lookbook/919256a084243a038a4cd79e8558311b.jpg"
            alt=""
            class="gallery__image"
          />
          <img
            src="/images/Lookbook/7ee76d1e1815bfd2091ca9772b8094e0.jpg"
            alt=""
            class="gallery__image mobile-hidden"
          />
        </li>
        <li class="gallery__images-block">
          <img
            src="/images/Lookbook/6cdfc36505430dbebe65e065645ee42f.jpg"
            alt=""
            class="gallery__image"
          />
          <img
            src="/images/Lookbook/3a50c5c1a56ed6cce63f44a94e15d619.jpg"
            alt=""
            class="gallery__image mobile-hidden"
          />
          <img
            src="/images/Lookbook/d80979946fdded3c4ffc1099be314b62.jpg"
            alt=""
            class="gallery__image"
          />
          <img
            src="/images/Lookbook/80f60a3b0f35d43ffa1501ad57716513.jpg"
            alt=""
            class="gallery__image mobile-hidden"
          />
          <img
            src="/images/Lookbook/a80ca52bb7eda09fef31d78458224070.jpg"
            alt=""
            class="gallery__image mobile-hidden"
          />
          <img
            src="/images/Lookbook/2879c57f0fd2a4913a7f62dbe1973396.jpg"
            alt=""
            class="gallery__image"
          />
          <img
            src="/images/Lookbook/b111a4b60c2f93679af24e648479af07.jpg"
            alt=""
            class="gallery__image"
          />
          <img
            src="/images/Lookbook/9192fda08a9092ebd418fdf0f6317ed0.jpg"
            alt=""
            class="gallery__image mobile-hidden"
          />
          <img
            src="/images/Lookbook/8ef59b0c1a22f7f8695b7ec887b84f23.jpg"
            alt=""
            class="gallery__image mobile-hidden"
          />
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { LookbookAnimations } from "~/animations/lookbook/lookbook";
import { useWindowSize } from "@vueuse/core";

export default {
  inject: ["getTransitioned"],
  setup() {
    useHead({
      title: "Muzen Lookbook",
    });
    const { width: windowWidth } = useWindowSize();
    let desktop = computed(() => windowWidth.value >= 724);
    return {
      desktop,
    };
  },
  data() {
    return {};
  },
  watch: {
    desktop(value) {
      if (!value) {
        LookbookAnimations.stopDraggable();
      } else {
        LookbookAnimations.setDraggable();
      }
    },
  },
  computed: {
    transitioned() {
      return this.getTransitioned();
    },
  },
  mounted() {
    if (this.transitioned) {
      this.$eventBus.on("lookbook-enter-animations", () => {
        console.log("we insideee");
        LookbookAnimations.init(this.$refs.lookbookPage, {
          desktop: this.desktop,
        });
        this.$eventBus.off("lookbook-enter-animations");
      });
    } else {
      LookbookAnimations.init(this.$refs.lookbookPage, {
        desktop: this.desktop,
      });
    }
  },
};
</script>

<style scoped>
.lookbook-page {
  /* height: 100vh; */
  padding-top: 144px;
}

.lookbook-page__intro {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas: "heading heading heading heading heading heading" "... copy copy copy copy copy" "graphic graphic graphic graphic graphic graphic";
}

.intro__heading {
  color: var(--muzen-dark-brown);
  grid-area: heading;
  margin: 0;
}

:global(.intro__heading__lines) {
  overflow: hidden;
  display: none;
}

.intro__copy {
  grid-area: copy;
  margin-top: 40px;
}

.intro__graphic {
  grid-area: graphic;
  margin-top: 40px;
}

.lookbook-page__gallery {
  max-width: clamp(600px, 1300px, 90%);
  margin: 121px auto 0 auto;
}

.gallery__images {
  margin-top: 40px;
  padding: 0;
  list-style: none;
}

.gallery__images-block {
  &:nth-of-type(1) {
    display: grid;
    gap: 24px;
  }
  &:nth-of-type(2) {
    display: grid;
    gap: 24px;
    margin-top: 24px;
  }
}

.gallery__image {
  &.mobile-hidden {
    display: none;
  }
}

@media screen and (width <= 724px) {
  .gallery__image {
    transform: none !important;
  }
}

@media screen and (width >= 724px) {
  .lookbook-page {
    padding-top: 172px;
    padding-bottom: 184px;
  }

  .lookbook-page__intro {
    grid-template-areas: "heading heading heading heading heading heading" "... copy copy copy copy copy" "... graphic graphic graphic graphic ...";
  }

  .intro__heading {
    font-size: clamp(0vw, 160px, 16vw);
    font-weight: 500;
  }

  .intro__copy {
    margin-top: 0px;
    max-width: 600px;
    margin-left: auto;
  }

  .intro__graphic {
    margin: 238px auto 0 auto;
    margin-top: clamp(0vw, 238px, 15vw);
  }
  .gallery__image {
    &.mobile-hidden {
      display: block;
    }
  }

  .gallery__images-block {
    &:nth-of-type(1) {
      grid-template-columns: 1fr 0.6fr 1.5fr 1fr;
      grid-template-areas: "img1 ... img3 ..." "... img2 ... ..." "... ... img5 img5" "img4 ... ... ..." " ... ... img6 img6";

      .gallery__image {
        width: 100%;
        @for $i from 1 to 6 {
          &:nth-child($i) {
            grid-area: img$(i);
          }
        }

        &:nth-child(1) {
          position: relative;
          right: 50px;
          max-width: 328px;
        }

        &:nth-child(2) {
          position: relative;
          bottom: 20px;
          max-width: 233px;
        }

        &:nth-child(3) {
          position: relative;
          top: 50px;
          max-width: 444px;
        }

        &:nth-child(4) {
        }

        &:nth-child(5) {
          max-width: 640px;
          margin-right: auto;
          position: relative;
          left: clamp(0vw, 300px, 5vw);
        }

        &:nth-child(6) {
          max-width: 455px;
          margin-right: auto;
        }
      }
    }

    &:nth-of-type(2) {
      margin-top: 100px;
      grid-template-columns: 1fr 1fr 0.7fr 1.3fr 1fr;
      grid-template-areas:
        "img1 ... img2 img2 ..."
        "... ... ... img3 img3"
        "img4 img5 ... ... ..."
        "img6 ... ... ... ..."
        "... ... ... ... img7"
        "img8 img8 ... img9 img9";

      .gallery__image:nth-child(n + 10) {
        display: none;
      }

      .gallery__image {
        width: 100%;
        object-fit: cover;

        @for $i from 1 to 9 {
          &:nth-child($i) {
            grid-area: img$(i);
          }
        }

        &:nth-child(1) {
          max-width: 274px;
        }

        &:nth-child(2) {
          max-width: 455px;
          aspect-ratio: 445/225;
          object-position: 0% 40%;
          position: relative;
          top: 100px;
        }

        &:nth-child(3) {
          max-width: 562px;
          aspect-ratio: 562/546;
          object-position: 0% 80%;
          position: relative;
          top: 100px;
        }

        &:nth-child(4) {
          position: relative;
          right: 50px;
        }

        &:nth-child(5) {
          position: relative;
          top: 100px;
          left: 150px;
          max-width: 329px;
          aspect-ratio: 329/418;
          object-position: 100% 0%;
        }

        &:nth-child(6) {
          position: relative;
          top: 50px;
          left: 100px;
          aspect-ratio: 329/288;
          object-position: 0% 10%;
        }

        &:nth-child(7) {
          max-width: 349px;
          aspect-ratio: 349/288;
          object-position: 0% 45%;
        }

        &:nth-child(8) {
          position: relative;
          right: 70px;
          max-width: 445px;
          aspect-ratio: 445/448;
          object-position: 0% 0%;
        }

        &:nth-child(9) {
          position: relative;
          top: 100px;
          max-width: 445px;
          aspect-ratio: 445/448;
          right: clamp(10px, 5vw, 50px);
        }
      }
    }
  }
}
</style>