import { createApp } from 'vue'
import './style.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import GoogleSignInPlugin from "vue3-google-signin"
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';



const app = createApp(App)
app.use(router)
app.use(GoogleSignInPlugin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

app.use(Vue3Toastify,{
    autoClose: 3000,
})

app.mount('#app')
