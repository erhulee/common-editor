<template>
    <div class=" flex items-center" :id="id">
        <slot name="prefix"></slot>
        <div ref="ref" v-bind="api.rootProps" class="flex-1 slider ">
            <div v-bind="api.controlProps" class="h-6 ">
                <div v-bind="api.trackProps" class="track">
                    <div v-bind="api.rangeProps" class="range" />
                </div>
                <div v-bind="api.thumbProps" class="thumb focus-visible:outline-none">
                    <input v-bind="api.hiddenInputProps" />
                </div>
            </div>
        </div>
        <slot name="output" v-if="$slots.output"></slot>
        <div class="output" v-else>
            <output v-bind="api.outputProps">{{outputFormatter(api.value) }}</output>
        </div>
    </div>
</template>

<script lang="ts">
import * as slider from "@zag-js/slider"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { defineComponent, computed, onUpdated } from "vue"
import { useId } from "./hooks/useId"
export default defineComponent({
    name: "c-slider",
    emits:["change"],
    props: {
        outputFormatter:{
            type: Function,
            default:(value: number) => value
        },
        value:{
            type: Number,
            default: 0
        },
        min:{
            type: Number,
            default: 0
        },
        max:{
            type: Number,
            default: 100
        },
        step:{
            type: Number,
            default: 1
        }
    },

    setup(props, ctx) {
        const id = useId();
        const [state, send] = useMachine(
            slider.machine({
                id,
                value: props.value,
                min: props.min,
                max: props.max,
                step: props.step,
                onChange: ({value})=>{
                    ctx.emit("change", value)
                }
            }))
        const api = computed(() =>
            slider.connect(state.value, send, normalizeProps)
        )
        onUpdated(() => {
            console.log("sad")
        })

        return {
            id,
            api,
            outputFormatter: props.outputFormatter
        }
    }
})
</script>

<style scoped>
.slider {
    margin: 0px 20px 0px 8px;
    min-width: 100px;
}

.thumb {
    width: 12px;
    height: 12px;
    top: calc(50% - 6px);
    background-color: white;
    border-radius: 100px;
    border: #5c5c5c 2px solid
}

.range {
    height: 4px;
    background: black;
}

.track {
    background: #F1F5F9;
    height: 4px;

    top: calc( 50% - 2px);

}

.output {
    color: #5f5d5d;
    font-size: 14px;
    min-width: 3rem;

    text-align: right;
}
</style>