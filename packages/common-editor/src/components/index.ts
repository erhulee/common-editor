import CInput from "./c-input.vue";
import CNumberInput from "./c-number-input.vue"
import cButton from "./c-button.vue";
import { App } from 'vue'

const components = [
    CNumberInput,
    CInput,
    cButton
]
const install = (app: App) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export default {
    install
}