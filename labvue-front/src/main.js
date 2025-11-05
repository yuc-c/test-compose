import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import i18n from '@/i18n/i18n.js'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
    .use(router)
    .use(pinia)
    .use(i18n)
    .mount('#app')
