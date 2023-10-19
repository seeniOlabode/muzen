import { lenis } from "~/plugins/lenis";

class lockScroll {
  constructor(dev) {
    this.scrollLocked = false;
    this.componentConsensus = {};
    this.strictLock = true;
    this.dev = dev || false;
  }

  lockScroll(componentName, strict) {
    if (!this.scrollLocked) {
      this.scrollLocked = true;
      this.strictLock = strict || this.strictLock;
      lenis.stop();
    }
    this.componentConsensus[componentName] = strict;
    this.dev && console.log(`${componentName} locked scroll`);
  }

  unlockScroll(componentName) {
    this.dev && console.log(`${componentName} is trying to unlock scroll`);
    if (this.strictLock) {
      this.componentConsensus[componentName] = false;
      const values = Object.values(this.componentConsensus);
      const strictLockPersists = values.reduce((acc, v) => {
        return (acc = acc || v);
      }, false);
      if (strictLockPersists) {
        this.dev &&
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
      this.dev && console.log(`${componentName} unlocked scroll`);
    } else {
      this.dev && console.log(`${componentName} didn't unlock scroll`);
    }
  }

  unsubscribe(componentName) {
    this.dev && console.log(`${componentName} is trying to unsubscribe`);
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
    this.dev &&
      console.log(`${componentName} has unsubscribed from lockScroll`);
    this.dev && console.log(this);
  }
}

const scrollLocker = new lockScroll();

export default function (lock, componentName, strict) {
  const unwatchLock = ref(null);
  if (!componentName) {
    console.log("Component Name not provided");
  }
  onMounted(() => {
    const body = selectFrom("body", document.documentElement);
    unwatchLock.value = watch(
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
    unwatchLock.value && unwatchLock.value();
    scrollLocker.unsubscribe(componentName);
  });
}
