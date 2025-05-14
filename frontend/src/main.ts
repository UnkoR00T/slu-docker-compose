import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import messages from './lang'
import { createI18n } from 'vue-i18n'

const app = createApp(App)
const i18n = createI18n({
  locale: 'en', // default language
  fallbackLocale: 'en', // fallback language
  messages,
})

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')
