<script  lang="ts">
import * as numberInput from "@zag-js/number-input";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { PropType, computed, defineComponent  } from "vue";
import { useId } from "./hooks/useId"
import { Up, Down} from "@icon-park/vue-next"
export default defineComponent({
    name: "c-number-input",
    props:{
        size: {
            type: String as PropType<"small" | "normal" | "big">,
            default: "normal"
        },
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
        const id = useId();
        const [state, send] = useMachine(numberInput.machine({ 
            id,
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

        const dynamicClassName = computed(()=>{
            const classNames:string[] = [];
            if(props.size == "normal") classNames.push("h-10");
            if(props.size == "big") classNames.push("h-12");
            if(props.size == "small") classNames.push("h-8");
            return classNames.join(" ")

        })
        return {
            id,
            api,
            props,
            dynamicClassName,
            handleChange
        }
    }
})
</script>

<template>
    <div ref="ref" 
        :id="id"
        v-bind="api.rootProps" 
        class=" bg-gray-100 flex rounded-md overflow-hidden box-border"
        :class="dynamicClassName"
        >
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

