<script  lang="ts">
import * as numberInput from "@zag-js/number-input";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { computed, defineComponent  } from "vue";
import { Up, Down} from "@icon-park/vue-next"
export default defineComponent({
    name: "c-number-input",
    components:{
        Up,
        Down
    },
    emits:["change"],
    setup(props, ctx){
        // const props = defineProps<{
        //     max: number
        //     min: number
        //     value: number
        // }>();

        const [state, send] = useMachine(numberInput.machine({ 
            id: "1" ,
            allowMouseWheel: true
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
        class=" h-10  bg-gray-100 flex rounded-md overflow-hidden">
            <input 
                v-bind="api.inputProps" 
                @input="handleChange"
                class="bg-gray-100 h-full flex-1 px-2
                border-none outline-none focus-visible:outline-none" />
            <div class=" flex flex-col justify-around right-0 
                h-full  pr-2 pl-1 py-1  " >
                <Up size="12" v-bind="api.incrementTriggerProps " class="hover:text-gray-400" ></Up>
                <Down size="12" v-bind="api.decrementTriggerProps" class="hover:text-gray-400" ></Down>
            </div>
    </div>
</template>

<style scoped>

</style>

