export default function useMediaQuery(breakpoint = 724, callback) {
  const mobile = ref(null);
  if (process.client) {
    mobile.value = window.innerWidth < breakpoint;
    function onResize(e) {
      let oldValue = mobile.value;
      mobile.value = e.target.innerWidth < breakpoint;
      if (oldValue !== mobile.value) {
        callback && callback(mobile.value);
      }
    }
    onMounted(() => {
      callback && window.addEventListener("resize", onResize);
    });
    onBeforeUnmount(() => {
      callback && window.removeEventListener("resize", onResize);
    });
  }

  return mobile;
}
