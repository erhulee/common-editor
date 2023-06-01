<script  lang="ts">
import * as numberInput from "@zag-js/number-input";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { computed, defineComponent  } from "vue";
import { Up, Down} from "@icon-park/vue-next"
export default defineComponent({
    name: "c-number-input",
    props:{
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number
        },
        min: {
            type: Number
        }
    },
    components:{
        Up,
        Down
    },
    emits:["change"],
    setup(props, ctx){
        const [state, send] = useMachine(numberInput.machine({ 
            id: "1" ,
            allowMouseWheel: true,
            value: props.value,
            max: props.max,
            min: props.min
        }));
        const api = computed(() =>
            numberInput.connect(state.value, send, normalizeProps)
        );
        function handleChange(event: Event){
            const value = event.target.value;
            ctx.emit("change", Number(value))
        }
        return {
            api,
            props,
            handleChange
        }
    }
})
</script>

<template>
    <div ref="ref" 
        v-bind="api.rootProps" 
        class=" h-10 bg-gray-100 flex rounded-md overflow-hidden box-border">
            <input 
                v-bind="api.inputProps" 
                @input="handleChange"
                class="bg-gray-100 h-full box-border w-24 flex-1 pl-2
                border-none outline-none focus-visible:outline-none" />
            <div class=" flex flex-col justify-around 
                h-full pr-2 py-1  " >
                <Up size="12" v-bind="api.incrementTriggerProps " class="hover:text-gray-400" ></Up>
                <Down size="12" v-bind="api.decrementTriggerProps" class="hover:text-gray-400" ></Down>
            </div>
    </div>
</template>

<style scoped>

</style>

