import CInput from "./c-input.vue";
import CNumberInput from "./c-number-input.vue"
import cButton from "./c-button.vue";
import { App } from 'vue'
import cDivider from "./c-divider.vue";

const components = [
    CNumberInput,
    CInput,
    cButton,
    cDivider
]
const install = (app: App) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export default {
    install
}