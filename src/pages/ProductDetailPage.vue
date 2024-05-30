<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8"
    >
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else>
        <div class="lg:grid lg:grid-cols-2 lg:gap-x-0 lg:items-start px-16">
          <div class="lg:max-w-lg lg:self-top">
            <img
              :src="product.image?.url"
              alt="Product image"
              class="rounded-xl"
            />
          </div>
          <div class="mt-10 lg:mt-0 lg:self-center text-left uppercase">
            <h1
              class="text-4xl font-extrabold tracking-tight text-bluegfl sm:text-4xl"
            >
              {{ product.name }}
            </h1>
            <p class="text-3xl tracking-tight text-gray-900 mt-4 mb-8">
              €{{ product.price_range.minimum_price.final_price.value }}
            </p>
            <transition name="fade">
              <div
                :class="{ 'line-clamp-3': !expanded }"
                v-html="product.description?.html"
                class="normal-case"
              ></div>
            </transition>
            <div v-if="product.description?.html">
              <button
                v-if="!expanded"
                @click="expanded = true"
                class="mt-2 font-medium"
                style="color: #0d2451"
              >
                Leggi di più
              </button>
              <button
                v-else
                @click="expanded = false"
                class="mt-2 font-medium"
                style="color: #0d2451"
              >
                Leggi meno
              </button>
            </div>
            <p>Anno di edizione: {{ product.anno_edizione }}</p>
            <p>Codice ISBN: {{ product.isbn13 }}</p>
            <p>Area d'interesse: {{ product.area_interesse }}</p>
            <p>Professione: {{ product.professione }}</p>



            <div
              v-if="product.stock_status === 'IN_STOCK'"
              class="mt-4 p-4 border border-green-500 text-green-700 bg-green-100 rounded-md"
            >
              Il libro è in stock, rivolgiti ai librai per acquistarlo.
            </div>
            <div
              v-else
              class="mt-4 p-4 border border-red-500 text-red-700 bg-red-100 rounded-md"
            >
              Il libro è esaurito ma puoi prenotarlo qui, rivolgiti ai librai.
            </div>
          </div>
        </div>
      </div>
      <div class="mt-20">
        <router-link
          to="/"
          class="inline mt-10 justify-center rounded-md border border-transparent bg-gflblue px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-#0d2451 focus:ring-offset-2"
        >
          Torna indietro
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
const DETAILS_QUERY = gql`
  query getProduct($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
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
        anno_edizione
        isbn13
        stock_status
        professione
        area_interesse
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
  setup() {
    const route = useRoute();
    const sku = computed(() => route.params.url_key.split("-").pop());
    const { result, loading, error, refetch } = useQuery(DETAILS_QUERY, {
      sku: sku.value,
    });
    watch(
      () => route.params.url_key,
      () => {
        refetch({ sku: sku.value });
      }
    );
    const product = computed(() => {
      const items = result.value?.products?.items ?? [];
      return items.length > 0 ? items[0] : {};
    });
    const expanded = ref(false);
    return {
      loading,
      error,
      product,
      expanded,
    };
  },
};


</script>
<style scoped>
/* Add any styles you need for your product detail page */
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
}
.bg-green-100 {
  background-color: #d4edda;
}
.text-green-700 {
  color: #155724;
}
.border-green-500 {
  border-color: #c3e6cb;
}
.bg-red-100 {
  background-color: #f8d7da;
}
.text-red-700 {
  color: #721c24;
}
.border-red-500 {
  border-color: #f5c6cb;
}
/* Add transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
</style>










