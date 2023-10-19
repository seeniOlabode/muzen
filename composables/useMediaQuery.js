export default function useMediaQuery(breakpoint = 724, callback) {
  const mobile = ref(null);
  if (process.client) {
    mobile.value = window.innerWidth < breakpoint;
    onMounted(() => {
      window.addEventListener("resize", (e) => {
        let oldValue = mobile.value;
        mobile.value = e.target.innerWidth < breakpoint;
        if (oldValue !== mobile.value) {
          callback(mobile.value);
        }
      });
    });
  }

  return mobile;
}
