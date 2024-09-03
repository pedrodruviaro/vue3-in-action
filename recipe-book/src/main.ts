import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import localStoragePlugin from '@/plugins/pinia/localStoragePlugin';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

function ourPlugin() {
  return {
    secret: 'Dummy'
  };
}

pinia.use(localStoragePlugin);
pinia.use(ourPlugin);

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
