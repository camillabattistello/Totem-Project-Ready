<template>
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
    </template>
  
  <script>
  import gql from "graphql-tag";
  import { useQuery } from "@vue/apollo-composable";
  import { computed, ref } from "vue";
  import { useRouter } from "vue-router";
  const SEARCH_QUERY = gql`
    query getProducts {
      products(
        filter: { tipo_prodotto: { eq: "20" }
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
  
    },
    setup() {
      const { result, loading, error } = useQuery(SEARCH_QUERY);
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