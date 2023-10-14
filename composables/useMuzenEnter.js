export default function (callback1, callback2) {
  const getAssetsLoaded = inject("getAssetsLoaded");
  const getTransitioned = inject("getTransitioned");

  const assetsLoaded = computed(getAssetsLoaded);
  const transitioned = computed(getTransitioned);

  onMounted(() => {
    if (!transitioned.value) {
      const unwatch = watch(assetsLoaded, (value) => {
        if (value) {
          callback1();
          unwatch();
        }
      });
    } else {
      callback2();
    }
  });
}
