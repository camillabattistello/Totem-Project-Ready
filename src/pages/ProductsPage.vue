

<template>
  <div>
  <hero-banner></hero-banner>
  <div class="py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 class="text-3xl font-semibold text-center text-gray-900">
            I preferiti del momento: scopri i nostri bestseller
  </h2>
  <div class="mt-10 text-center">
  <input
              type="text"
              v-model="searchQuery"
              @input="filterProducts"
              placeholder="Search for products..."
              class="p-2 border border-gray-300 rounded"
            />
  </div>
  <ul v-if="autocompleteResults.length" class="autocomplete-list">
  <li v-for="result in autocompleteResults" :key="result.sku" @click="selectProduct(result)">
              {{ result.name }}
  </li>
  </ul>
  <div v-if="loading" class="text-center mt-10">Loading...</div>
  <div v-else-if="error" class="text-center text-red-500 mt-10">
            Error: {{ error.message }}
  </div>
  <div
            v-else
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
  <div
              v-for="product in products"
              :key="product.sku"
              class="group relative overflow-hidden transition-shadow duration-300 ease-in-out"
  >
  <div class="p-4 text-left">
  <router-link :to="`/product/${product.sku}`">
  <div class="w-full">
  <img
                      :src="product.image.url"
                      alt="Product image"
                      class="w-full h-full object-center object-cover rounded-md"
                    />
  </div>
  <h3 class="text-lg font-medium text-gray-900 mt-4">
                    {{ product.name }}
  </h3>
  <p class="mt-2 text-lg font-semibold text-gray-900">
                    €{{ product.price_range.minimum_price.final_price.value }}
  </p>
  </router-link>
  </div>
  </div>
  </div>
  </div>
  <news-banner></news-banner>
  </div>
  </div>
  </template>

<script>
import HeroBanner from "@/components/HeroBanner.vue";
import NewsBanner from "@/components/NewsBanner.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const PRODUCTS_QUERY = gql`
  query getProducts {
    products(
      filter: { tipo_prodotto: { eq: "20" }
      name: { match: "memento" }
       }
      pageSize: 8
      currentPage: 1
      sort: {}
    ) {
      total_count
      items {
        name
        description {
          html
        }
        image {
          url
        }
        sku
        url_key
        price_range {
          minimum_price {
            final_price {
              value
            }
          }
        }
      }
    }
  }
`;
export default {
  components: {
    HeroBanner,
    NewsBanner,
  },
  setup() {
    const { result, loading, error } = useQuery(PRODUCTS_QUERY);
    const products = computed(() => {
      return result?.value?.products.items ?? [];
    });
    const searchQuery = ref("");
    const autocompleteResults = ref([]);
    const router = useRouter();
    const filterProducts = () => {
      if (!searchQuery.value) {
        autocompleteResults.value = [];
        return;
      }
      autocompleteResults.value = products.value.filter(product =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    };
    const selectProduct = (product) => {
      router.push(`/product/${product.sku}`);
    };
    return {
      loading,
      error,
      products,
      searchQuery,
      autocompleteResults,
      filterProducts,
      selectProduct,
    };
  },
};
</script>

<style scoped>
.autocomplete-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  background-color: white;
  position: absolute;
  width: 100%;
  max-width: 300px;
  z-index: 1000;
}
.autocomplete-list li {
  padding: 8px;
  cursor: pointer;
}
.autocomplete-list li:hover {
  background-color: #f0f0f0;
}


</style>