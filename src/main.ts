import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import App from './App.vue';
import './styles/globals.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(MotionPlugin);

app.mount('#app');
