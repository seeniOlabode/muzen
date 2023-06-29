<template>
  <ul class="site-preloader__images">
    <TransitionGroup name="loader-image">
      <li
        class="site-preloader__image-wrapper"
        v-for="(img, i) in images"
        :key="img + i + 'preloader-image'"
        v-show="i == displayedImageIndex"
      >
        <div class="image-wrapper__inner">
          <NuxtImg
            :src="img"
            alt="Preloader Image"
            class="image-wrapper__image"
            fit="cover"
            quality="20"
            preload
          />
        </div>
      </li>
    </TransitionGroup>
  </ul>
</template>

<script>
export default {
  props: {
    displayedImageIndex: {
      type: Number,
    },
  },
  data() {
    return {
      images: [
        "/images/Preloader/dex-ezekiel-M6KkYlhCwuA-unsplash.jpg",
        "/images/Preloader/khaled-ghareeb-rBdkjxJlRaI-unsplash.jpg",
        "/images/Preloader/drew-tilk-EhmLEzVSx1Q-unsplash.jpg",
      ],
    };
  },
  setup() {
    // useHead({
    //   link: [
    //     {
    //       rel: "preload",
    //       as: "image",
    //       href: "/images/Preloader/khaled-ghareeb-rBdkjxJlRaI-unsplash.jpg",
    //     },
    //     {
    //       rel: "preload",
    //       as: "image",
    //       href: "/images/Preloader/dex-ezekiel-M6KkYlhCwuA-unsplash.jpg",
    //     },
    //     {
    //       rel: "preload",
    //       as: "image",
    //       href: "/images/Preloader/drew-tilk-EhmLEzVSx1Q-unsplash.jpg",
    //     },
    //   ],
    // });
  },
  // async mounted() {
  //   this.images.forEach(async (img) => {
  //     const newImage = new Image();
  //     newImage.setAttribute("src", img);
  //     await new Promise((r) => {
  //       newImage.onload = r;
  //     });
  //     console.log("done");
  //   });
  // },
  methods: {
    // TODO: Remove This
    handle() {
      alert("ahh");
    },
  },
};
</script>

<style scoped>
.site-preloader__images {
  aspect-ratio: 242/285;
  background: black;
  position: relative;
  width: 50%;
  min-width: 200px;
}

.site-preloader__image-wrapper {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.image-wrapper__inner {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.image-wrapper__image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center bottom;
}

/* Enter Animations */
.loader-image-enter-active {
  transition: transform 1.5s cubic-bezier(0, 0.16, 0.5, 1);

  .image-wrapper__inner {
    transition: transform 1.5s cubic-bezier(0, 0.16, 0.5, 1);

    .image-wrapper__image {
      transition: transform 1.5s cubic-bezier(0, 0.16, 0.5, 1);
    }
  }
}

.loader-image-enter-from {
  transform: translateY(-100%);

  .image-wrapper__inner {
    transform: translateY(100%);

    .image-wrapper__image {
      transform: scale(2);
    }
  }
}

.loader-image-enter-to {
  opacity: 1;
  transform: translateY(0px);

  .image-wrapper__inner {
    transform: translateY(0);

    .image-wrapper__image {
      transform: scale(1);
    }
  }
}
/* End Enter Animations */

/* Leave Animations */
.loader-image-leave-active {
  transition: 1.5s;
}
.loader-image-leave-from {
  opacity: 1;
}

.loader-image-leave-to {
  opacity: 1;
}
/* End Leave Animations */
</style>