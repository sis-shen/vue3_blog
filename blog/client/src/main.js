import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { router } from './common/router'
import { createPinia } from "pinia";
import axios from 'axios'

//全局地址
axios.defaults.baseURL = "http://localhost:8080"
const { message, notification, dialog } = createDiscreteApi(["message", "dialog", "notification"])

const app = createApp(App)

//用provide放入全局
app.provide("axios", axios)
app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)

app.use(naive)
app.use(createPinia());
app.use(router)
app.mount('#app')
