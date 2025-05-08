import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import masksPlugin from './plugins/mask'
import './../public/global.css'

const app = createApp(App)
app.use(router)
app.use(masksPlugin)
app.mount('#app')
