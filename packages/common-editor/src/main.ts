import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Text from "./components/text/index.vue"
import Image from "./components/image/image.vue"
import Circle from "./components/shape/circle.vue"
import Rectangle from "./components/shape/rectangle.vue"
import Triangle from "./components/shape/triangle.vue"
import Diamond from "./components/shape/diamond.vue"
import CommonDesign from "./components/index"
import EventBus from './plugins/eventBus'
import App from "@/App.vue"
import './style.css'
import "@icon-park/vue-next/styles/index.css"
import initAxios from './api/http'
import { GlobalEvents, Runtime } from './page/editor/runtime'

initAxios()
const routes: Array<RouteRecordRaw> = [
    {
        name: 'editor',
        path: '/',
        component: () => import('@/page/editor/index.vue'),
    },
    {
        name: "login",
        path: "/login",
        component: () => import('@/page/login/index.vue')
    },
    {
        name: "profile",
        path: "/profile",
        component: () => import("@/page/profile/index.vue")
    },
    {
        name: "space",
        path: "/space",
        component: () => import("@/page/space/index.vue")
    }
]


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

const app = createApp(App);
const eventBus = new EventBus();
const pinia = createPinia()

app.use(router)
app.use(createPinia())
app.use(eventBus)
app.use(pinia);
app.use(CommonDesign)

const runtime = new Runtime();


// 权限指令
function authHandler(e: Event) {
    if (pinia.state.value.global.auth) return;
    runtime.trigger(GlobalEvents.LOGIN_MODAL_SHOW)
    e.stopImmediatePropagation();
}
app.directive("auth", {
    mounted(el: HTMLElement) {
        el.addEventListener("click", authHandler, true)
    },
    unmounted(el: HTMLElement) {
        el.removeEventListener("click", authHandler)
    }
})

app.component("text", Text);
app.component('image', Image);
app.component("circle", Circle);
app.component("rectangle", Rectangle);
app.component("triangle", Triangle);
app.component("diamond", Diamond);
app.provide("runtime", runtime)
app.mount('#app')


