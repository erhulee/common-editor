import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import Text from "./components/text/index.vue"
import CommonDesign from "./components/index"

import './style.css'
import "@icon-park/vue-next/styles/index.css"


const app = createApp(App);
app.use(createPinia())
app.component("text", Text);
app.use(CommonDesign)
app.mount('#app')
