import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import App from './App.vue';
import router from './router';
import './index.css';


// Set up the Apollo Client
const httpLink = createHttpLink({
 uri: 'https://svil-totem.giuffre.it/graphql',
 headers: {
   'Content-Type': 'application/json',
 },
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
 link: httpLink,
 cache,
});
// Create and mount the Vue application
const app = createApp({
 setup() {
   provide(DefaultApolloClient, apolloClient);
 },
 render: () => h(App),
});
app.use(router);
app.mount('#app');
