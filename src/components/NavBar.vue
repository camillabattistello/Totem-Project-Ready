<template>
  <nav
      class="flex items-center justify-between top-0 bg-white z-10 px-3 sm:px-6 lg:px-8"
      role="navigation"
      aria-label="main navigation"
      style="background-color: white"
  >
  <a href="/" class="navbar-item mb-5 mt-5">
  <img
          src="https://giuffrefrancislefebvre.it/images/GFL_logo.svg"
          width="280px"
        />
  </a>
  <button
        v-if="isProductDetailPage"
        class="inline justify-center rounded-md border border-transparent bg-gflblue px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-#0d2451 focus:ring-offset-2"
  >
        Home
  </button>
  </nav>
  </template>
  <script>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  export default {
    name: "NavBar",
    setup() {
      const route = useRoute();
      const isProductDetailPage = computed(() => {
        return route.name === "ProductDetailPage";
      });
      return {
        isProductDetailPage,
      };
    },
  };
  </script>
  <style scoped>
  /* Add any styles you need for your navbar */
  .navbar-item img {
    vertical-align: middle;
  }
  </style>