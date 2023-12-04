<template>
  <main class="error-page container">
    <p class="error-page__copy body">
      Oops! Looks like you took a wrong turn. This page is on vacation. Try
      navigating back to shore with your mouse or trackpad!
    </p>

    <div class="error-page__container-1">
      <p class="error-page__not-found">Page not found</p>
      <ul class="error-page__pages-list">
        <li
          class="error-page__page-item"
          v-for="page in pages"
          :key="page.text"
          @click="router.push(page.path)"
        >
          <img :src="page.photo" alt="" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#1C1816" />
          </svg>
          <p>{{ page.text }}</p>
        </li>
      </ul>
    </div>

    <div class="error-page__logo">
      <h2 class="logo__word">
        <span
          class="logo__char"
          v-for="(char, i) in 'Muzen'.split('')"
          :key="char + i"
        >
          {{ char }}
        </span>
      </h2>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        {
          text: "Home",
          photo: "/images/Error/d187b7ccef14ee808b3c89bcc232f925.jpeg",
          path: "/",
        },
        {
          text: "Studio",
          photo: "/images/Error/12df30bd9f1f1319e95e98f28a866f0b.jpeg",
          path: "/studio",
        },
        {
          text: "Lookbook",
          photo: "/images/Error/27517fff4251b722e24daacc88563bd3.jpeg",
          path: "/lookbook",
        },
        // {
        //   text: "Contact",
        //   photo: "/",
        //   photo: "/",
        // },
      ],
    };
  },
  setup() {
    const router = useRouter();
    return {
      router,
      // reloadBrowserToURL,
    };
  },
};
</script>

<style scoped>
.error-page {
  height: calc((var(--vh, 1vh) * 100));
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.error-page__copy {
  color: var(--muzen-dark-brown);
  font-size: 14px;
  line-height: 21px;
}

.error-page__logo {
}

.error-page__container-1 {
  margin-top: 40px;
}

.error-page__not-found {
  font-size: clamp(0px, 12.7vw, 56px);
  font-family: var(--muzen-dm);
  font-weight: 700;
  color: #d3cec9;
  line-height: clamp(0px, 12.7vw, 56px);
  letter-spacing: -0.65px;
}

.error-page__pages-list {
  display: grid;
  grid-template-columns: repeat(3, 190px);
  overflow: scroll;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin-top: 24px;
  .error-page__page-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    p {
      margin-left: 8px;
    }
  }
  img {
    height: 220px;
    width: 190px;
    object-fit: cover;
    object-position: 50% 50%;
  }
}

.error-page__logo {
  .logo__word {
    font-size: 28vw;
    font-family: var(--muzen-nohemi);
    letter-spacing: -1px;
  }
}
</style>