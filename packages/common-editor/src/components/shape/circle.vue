<template>
        <ellipse v-bind="positionAttribute" />
</template>

<script lang="ts">
import { BaseSetting, FillSetting, ShapeSetting, StrokeSetting } from '@/type/setting';
import { PropType, computed, defineComponent } from 'vue';
export default defineComponent({
    name: "circle",
    props: {
        id: {
            type: String
        },
        options:{
            type: Object as PropType<{
                base: BaseSetting,
                fill: FillSetting,
                shape: ShapeSetting,
                stroke: StrokeSetting
            }>,
            default: {}
        }
    },
    setup(props){
        const positionAttribute = computed(()=>({
            cx: props.options.base.left + props.options.base.width / 2,
            cy: props.options.base.top + props.options.base.height / 2,
            rx: props.options.base.width / 2,
            ry: props.options.base.height / 2,

            fill: props.options.fill.color,
            stroke: props.options.stroke.color,
            ['stroke-width']: props.options.stroke.width,

            opacity: props.options.base.opacity
        }))

        return{
            positionAttribute
        }
    }
})
</script>