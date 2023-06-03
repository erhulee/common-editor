import { App } from 'vue'
import CInput from "./c-input.vue";
import CNumberInput from "./c-number-input.vue"
import cButton from "./c-button.vue";
import cDivider from "./c-divider.vue";
import cUpload from "./c-upload.vue"
import cSlider from "./c-slider.vue"
const components = [
    CNumberInput,
    CInput,
    cButton,
    cDivider,
    cUpload,
    cSlider
]
const install = (app: App) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export default {
    install
}