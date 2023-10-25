<template>
  <action-button
    text="Share link"
    size="sm"
    color="rgba(255,255,255,0.88)"
    @mouseenter="showInfo = true"
    @mouseleave="showInfo = false"
    @click="copyLink"
  />
  <div
    v-show="showInfo"
    class="info-box"
    :class="{ copied: text === 'Copied!' }"
  >
    {{ text }}

    <img src="/icons/link.svg" alt="" />
  </div>
</template>

<script>
import { useClipboard } from "@vueuse/core";

export default {
  setup() {
    const source = ref("muzen.netlify.app");
    const { text, copy, copied, isSupported } = useClipboard({
      source,
      legacy: true,
    });

    return {
      copy,
      source,
    };
  },
  data() {
    return {
      text: "Copy link address",
      showInfo: false,
      timeout: null,
    };
  },
  methods: {
    copyLink() {
      this.source += this.$route.fullPath;
      this.copy(this.source);
      this.text = "Copied!";

      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.text = "Copy link address";
        this.source = "muzen.netlify.com";
      }, 2000);
    },
  },
};
</script>

<style scoped>
.info-box {
  margin-top: 24px;
  position: absolute;
  background: #282828;
  padding: 8px 20px;
  border-radius: 24px;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  gap: 15px;
  font-size: 14px;
  line-height: 14px;
  transition: 0.25s;
  overflow: hidden;
  white-space: nowrap;
}

img {
  width: 18px;
}
</style>