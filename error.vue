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
          @click="redirect(page.path)"
        >
          <img :src="page.photo" alt="" v-if="page.text !== 'Contact'" />
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
          photo: "/images/Error/d187b7ccef14ee808b3c89bcc232f925.webp",
          path: "/",
        },
        {
          text: "Studio",
          photo: "/images/Error/12df30bd9f1f1319e95e98f28a866f0b.webp",
          path: "/studio",
        },
        {
          text: "Lookbook",
          photo: "/images/Error/27517fff4251b722e24daacc88563bd3.webp",
          path: "/lookbook",
        },
        {
          text: "Contact",
          photo: "/",
          path: "/contact",
        },
      ],
    };
  },
  setup() {
    const router = useRouter();

    useHead({
      title: "Muzen",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: true,
        },
        {
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap",
          rel: "stylesheet",
        },
        {
          href: "/muzen-favicon.png",
          type: "image/png",
          rel: "icon",
        },
      ],
      script: [],
    });

    function redirect(path) {
      window.open(`https://muzen.netlify.app${path}`, "_self");
    }
    return {
      router,
      redirect,
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
  padding-bottom: 200px;
}
.error-page__copy {
  color: var(--muzen-dark-brown);
  font-size: 14px;
  line-height: 21px;
  max-width: 500px;
  width: 75vw;
}

.error-page__logo {
  position: absolute;
  bottom: 24px;
  line-height: 0.6;
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
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    p {
      margin-left: 8px;
    }

    &:last-child {
      position: fixed;
      top: 32px;
      right: 10px;
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

@media screen and (width >= 1024px) {
  .error-page {
    align-items: center;
    position: relative;
    z-index: 1;
  }
  .error-page__logo {
    display: none;
  }

  .error-page__copy {
    width: 40vw;
    max-width: 300px;
    z-index: 1;
    mix-blend-mode: difference;
  }

  .error-page__container-1 {
  }
  .error-page__pages-list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    max-width: 1024px;
    margin: 0 auto;
    z-index: 0;

    .error-page__page-item {
      position: absolute;
      flex-direction: row;
      justify-content: center;

      img {
        order: 1;
        flex-basis: 100%;
        margin-top: 12px;
        filter: grayscale(100%);
        transition: filter 500ms;
      }

      &:first-child {
        left: 50px;
        top: 50px;
      }

      &:nth-child(2) {
        right: 50px;
        top: 50px;
      }

      &:nth-child(3) {
        left: 40%;
        bottom: 50px;
      }

      &:last-child {
        bottom: 32px;
        top: unset;
      }

      &:hover {
        img {
          filter: grayscale(0);
        }
      }
    }
  }
}
</style>