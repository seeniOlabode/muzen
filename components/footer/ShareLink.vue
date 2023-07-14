<template>
  <action-button
    text="Share link"
    size="sm"
    color="rgba(255,255,255,0.88)"
    @mouseenter="showInfo = true"
    @mouseleave="showInfo = false"
  />
  <div v-show="showInfo" class="info-box">
    {{ text }} <img src="/icons/link.svg" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "Copy link address",
      showInfo: false,
    };
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
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 14px;
  line-height: 14px;
}

img {
  width: 18px;
}
</style>