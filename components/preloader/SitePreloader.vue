<template>
  <div class="site-preloader bg-muzen-light-brown p-4">
    <preloader-images :displayed-image-index="displayedImageIndex" />
    <div class="site-preloader__counter">
      <div class="counter__wrapper relative overflow-hidden -translate-x-[1px]">
        <span class="invisible">000</span>
        <Transition name="loader-counter">
          <div
            class="percent-check-point absolute top-0 right-0"
            :key="currentPercentCheckpoint + loadedCount"
          >
            <span
              class="hundreds inline-block"
              :class="{ invisible: currentPercentCheckpoint != '100' }"
            >
              {{ getPlaceValue(currentPercentCheckpoint, 3) }}
            </span>

            <span
              class="tens inline-block"
              :class="{
                invisible: parseInt(currentPercentCheckpoint, 10) < 10,
              }"
            >
              {{ getPlaceValue(currentPercentCheckpoint, 2) }}
            </span>
            <span class="units inline-block">
              {{ getPlaceValue(currentPercentCheckpoint, 1) }}
            </span>
          </div>
        </Transition>
      </div>
      <!-- <div class="counter-column">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import { getPlaceValue } from "../../utils/utils";

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
    currentPercentCheckpoint() {
      return this.loadedCount > 0
        ? this.percentages[this.loadedCount - 1]
        : "000";
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

      for (let i = 0; i < assets.length; i++) {
        await this.preloadImage(assets[i]);
        await new Promise((r) => {
          if (this.changeImage) {
            this.displayedImageIndex++;
            this.changeImage = false;
          }
          this.loadedCount++;
          r();
        });
      }
    },
    async preloadImage(img) {
      return new Promise((r) => {
        setTimeout(r, 2000);
      });
    },
    getPlaceValue,
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

  &::after {
    content: "%";
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

.loader-counter-enter-active {
  transition: transform 0.7s;

  .hundreds,
  .tens,
  .units {
    transition: transform 0.5s;
  }

  /* Delays for Each */

  .hundreds {
    transition-delay: 0.2s;
  }

  .tens {
    transition-delay: 0.1s;
  }

  .units {
    transition-delay: 0;
  }
}

.loader-counter-enter-from {
  transform: translateY(0%);

  .hundreds,
  .tens,
  .units {
    transform: translateY(100%);
  }
}

.loader-counter-enter-to {
  transform: translateY(0);

  .hundreds,
  .tens,
  .units {
    transform: translateY(0%);
  }
}

.loader-counter-leave-active {
  transition: transform 0.5s;

  .hundreds,
  .tens,
  .units {
    transition: transform 0.5s;
  }

  /* Delays for Each */

  .hundreds {
    transition-delay: 0.2s;
  }

  .tens {
    transition-delay: 0.1s;
  }

  .units {
    transition-delay: 0;
  }
}

.loader-counter-leave-from {
  transform: translateY(0%);

  .hundreds,
  .tens,
  .units {
    transform: translateY(0%);
  }
}

.loader-counter-leave-to {
  transform: translateY(0%);

  .hundreds,
  .tens,
  .units {
    transform: translateY(-100%);
  }
}
</style>