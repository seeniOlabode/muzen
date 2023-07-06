import { useScrollLock } from "@vueuse/core";

export default function (lock) {
  onMounted(() => {
    const body = selectFrom("body", document.documentElement);
    const isLocked = useScrollLock(body);
    watch(
      lock,
      (value) => {
        isLocked.value = !!value;
      },
      { immediate: true }
    );
  });
}
