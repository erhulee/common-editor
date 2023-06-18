<template>
    <path v-bind="attribute"></path>
</template>

<script  lang="ts">
import { PathCommand } from '@/plugins/PathCommand';
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
        const attribute = computed(() => {
            const {left, top, width, height} = props.options.base;
            const pointA = [left, top + height];
            const pointB = [left + width, top + height];
            const pointC = [left + width / 2, top];

            const move = PathCommand.Move(... pointA);
            const line = PathCommand.LineTo([{x: pointB[0], y: pointB[1]}, {x: pointC[0], y: pointC[1]}]);


            return {
                d: PathCommand.compose(move, line) + " z",
                fill: props.options.fill.color,
                stroke: props.options.stroke.color,
                ['stroke-width']: props.options.stroke.width,
                opacity: props.options.base.opacity
            }
        })

    
        console.log(attribute)

        return {
            attribute
        }
    }
})
</script>