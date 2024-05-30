import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '@/pages/ProductsPage.vue';
import ProductDetailPage from '@/pages/ProductDetailPage.vue';
const routes = [
 {
   path: '/',
   name: 'ProductsPage',
   component: ProductsPage,
 },
 {
   path: '/product/:url_key',
   name: 'ProductDetailPage',
   component: ProductDetailPage,
   props: true,
 },
];
const router = createRouter({
 history: createWebHistory(),
 routes,
});
export default router;
