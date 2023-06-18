<template>
   <rect v-bind="attribute"></rect>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import { BaseSetting, FillSetting, ShapeSetting, StrokeSetting } from '@/type/setting';
export default defineComponent({
    name: "rectangle",
    props: {
        id: {
            type: String
        },
        options: {
            type: Object as PropType<{
                base: BaseSetting,
                fill: FillSetting,
                shape: ShapeSetting,
                stroke: StrokeSetting
            }>,
            default: {}
        }
    },


    setup(props) {
        const attribute = computed(() => ({
            x: props.options.base.left,
            y: props.options.base.top,
            width: props.options.base.width,
            height: props.options.base.height,
            fill: props.options.fill.color,
            stroke: props.options.stroke.color,
            ['stroke-width']: props.options.stroke.width,
            opacity: props.options.base.opacity
        }))

        return {
            attribute
        }
    }
})
</script>