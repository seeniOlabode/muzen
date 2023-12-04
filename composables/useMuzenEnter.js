export default function (callback1, callback2) {
  const getAssetsLoaded = inject("getAssetsLoaded");
  const getTransitioned = inject("getTransitioned");

  const assetsLoaded = computed(getAssetsLoaded);
  const transitioned = computed(getTransitioned);

  const unwatch = ref(null);

  onMounted(() => {
    if (!transitioned.value) {
      unwatch.value = watch(assetsLoaded, (value) => {
        if (value) {
          callback1?.();
          unwatch.value();
        }
      });
    } else {
      callback2?.();
    }
  });

  onBeforeUnmount(() => {
    unwatch.value && unwatch.value();
  });
}
