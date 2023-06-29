<template>
  <div class="site-preloader bg-muzen-light-brown p-4">
    <preloader-images :displayed-image-index="displayedImageIndex" />
    <div class="site-preloader__counter">
      <div class="counter-column">
        <span class="invisible">0</span>

        <span class="counter-column__numbers-wrapper">
          <span
            class="num"
            :class="{ invisible: num == 0 }"
            v-for="(num, i) in percentagesHundreds"
            :key="i + 'hundreds'"
            >{{ num }}</span
          >
        </span>
      </div>
      <div class="counter-column">
        <span class="invisible">0</span>

        <span class="counter-column__numbers-wrapper">
          <span
            class="num"
            v-for="(num, i) in percentagesTens"
            :key="i + 'tens'"
            >{{ num }}</span
          >
        </span>
      </div>
      <div class="counter-column">
        <span class="">0</span>

        <span class="counter-column__numbers-wrapper">
          <span
            class="num"
            v-for="(num, i) in percentagesUnits"
            :key="i + 'units'"
            >{{ num }}</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayedImageIndex: 0,
      assetsToLoad: [1, 2, 3, 4, 5, 6],
      percentages: [],
      loadedCount: 0,
      changeImage: false,
    };
  },
  watch: {
    loadedCount(value) {
      let division = this.assetsToLoad.length / 3;
      if (value % division === 0 && this.displayedImageIndex != 2) {
        this.changeImage = true;
      }
    },
  },
  computed: {
    percentagesUnits() {
      return this.percentages.map((percentage) => percentage.slice(-1));
    },
    percentagesTens() {
      return this.percentages.map((percentage) => percentage.slice(-2, -1));
    },
    percentagesHundreds() {
      return this.percentages.map((percentage) => percentage.slice(-3, -2));
    },
  },
  methods: {
    async load() {
      const percentPerAsset = (1 / this.assetsToLoad.length) * 100;
      const toThreeDigits = (num) => {
        if (num < 10) return "00" + num;
        if (num < 99) return "0" + num;
        return "" + num;
      };
      this.assetsToLoad.forEach((image, i) => {
        this.percentages.push(
          toThreeDigits(Math.ceil(percentPerAsset * (i + 1)))
        );
      });
      this.loadAssets();
    },
    async loadAssets() {
      const assets = this.assetsToLoad;

      const counterColumns = gsap.utils.toArray(".counter-column");

      for (let i = 0; i < assets.length; i++) {
        await this.preloadImage(assets[i]);
        await new Promise((r) => {
          if (this.changeImage) {
            this.displayedImageIndex++;
            this.changeImage = false;
          }
          const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
              this.loadedCount++;
              r();
            },
          });
          tl.to(counterColumns, {
            yPercent: -(100 * (i + 1)),
            stagger: {
              amount: 0.1,
            },
          });
          tl.play();
        });
      }
    },
    async preloadImage(img) {
      return new Promise((r) => {
        setTimeout(r, 2000);
      });
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style scoped>
.site-preloader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.site-preloader__counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: flex-end;
  text-align: right;
  font-size: 64px;
  font-weight: 700;
  letter-spacing: -3px;
  overflow: hidden;

  &::after {
    content: "%";
    margin-left: 5px;
  }
}

.counter-column {
  position: relative;
  transform: translate(0);
}

.counter-column__numbers-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
}
</style>