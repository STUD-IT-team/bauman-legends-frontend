import { createApp } from 'vue'

import App from './App.vue'
import Storage from './Storage.js'
import createVueRouter from './Router.js'

// глобальное подключение css файла с базовыми стилями
import './styles/fontsLoader.styl';
import './styles/global.styl';
import Store from "./Storage.js";
// Вообще обычно делать import не JS-ных файлов в js нельзя, но Vite это распознает так, как нужно.

// import WS from "./utils/ws";  // Пока что без вебсокетов

const Router = createVueRouter(Storage);
const app = createApp(App)
  // .use(WS, `wss://${location.host}/ws`)  // Пока что без вебсокетов
  .use(Router)
  .use(Storage)
  .mount('#app');
Storage.$app = app;
