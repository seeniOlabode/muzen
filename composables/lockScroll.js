import { useScrollLock } from "@vueuse/core";
import { lenis } from "~/plugins/lenis";

class lockScroll {
  constructor() {
    this.scrollLocked = false;
    this.componentConsensus = {};
    this.strictLock = true;
  }

  lockScroll(componentName, strict) {
    if (!this.scrollLocked) {
      this.scrollLocked = true;
      this.strictLock = strict || this.strictLock;
      lenis.stop();
    }
    this.componentConsensus[componentName] = strict;
    console.log(`${componentName} locked scroll`);
  }

  unlockScroll(componentName) {
    console.log(`${componentName} is trying to unlock scroll`);
    if (this.strictLock) {
      this.componentConsensus[componentName] = false;
      const values = Object.values(this.componentConsensus);
      const strictLockPersists = values.reduce((acc, v) => {
        return (acc = acc || v);
      }, false);
      if (strictLockPersists) {
        console.log(
          `${componentName} failed to unlock scoll: strict lock persists`
        );
        return null;
      }
    }
    if (this.componentConsensus.hasOwnProperty(componentName)) {
      this.scrollLocked = false;
      this.componentConsensus = {};
      lenis.start();
      console.log(`${componentName} unlocked scroll`);
    } else {
      `${componentName} didn't unlock scroll`;
    }
  }

  unsubscribe(componentName) {
    console.log(`${componentName} is trying to unsubscribe`);
    delete this.componentConsensus[componentName];
    if (Object.keys(this.componentConsensus) === 0) {
      this.unlockScroll(componentName);
      this.strictLock = false;
    } else {
      const values = Object.values(this.componentConsensus);
      const strictLockPersists = values.reduce((acc, v) => {
        return (acc = v || acc);
      }, false);
      this.strictLock = strictLockPersists;
    }
    console.log(`${componentName} has unsubscribed from lockScroll`);
    console.log(this);
  }
}

const scrollLocker = new lockScroll();

export default function (lock, componentName, strict) {
  if (!componentName) {
    console.log("Component Name not provided");
  }
  onMounted(() => {
    const body = selectFrom("body", document.documentElement);
    watch(
      lock,
      (value) => {
        if (value) {
          scrollLocker.lockScroll(componentName, strict);
        } else {
          scrollLocker.unlockScroll(componentName, strict);
        }
      },
      { immediate: true }
    );
  });

  onBeforeUnmount(() => {
    console.log("beforeUnmount", componentName);
    scrollLocker.unsubscribe(componentName);
  });
}
