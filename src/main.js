import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

// Import di default di Bootstrap
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";

// Import custom per modificare i colori
import "./styles/custom.scss";

import "bootstrap-icons/font/bootstrap-icons.css";

import "bootstrap";

const vueApp = createApp(App);
vueApp.use(router);
vueApp.use(store);

store.dispatch('booksLoadFromJson').then(() => {
  vueApp.mount('#app');
}); 