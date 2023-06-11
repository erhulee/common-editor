<template>
    <path v-bind="attribute"></path>
</template>

<script  lang="ts">
import { PathCommand } from '@/plugins/PathCommand';
import { BaseSetting, FillSetting, ShapeSetting, StrokeSetting } from '@/type/setting';
import { PropType, computed, defineComponent } from 'vue';
export default defineComponent({
    name: "diamond",
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
            const { left, top, width, height } = props.options.base;
            const pointA = [left, top + height / 2];
            const pointB = [left + width / 2, top + height];
            const pointC = [left + width, top + height / 2];
            const pointD = [left + width / 2, top];
            const move = PathCommand.Move(...pointA);
            const line = PathCommand.LineTo([
                { x: pointB[0], y: pointB[1] }, 
                { x: pointC[0], y: pointC[1] },
                { x: pointD[0], y: pointD[1] }
            ]);

            return {
                d: PathCommand.compose(move, line) + " z",
                fill: props.options.fill.color,
                stroke: props.options.stroke.color,
                ['stroke-width']: props.options.stroke.width
            }
            // rx: props.options.base.width / 2,
            // ry: props.options.base.height / 2,
        })


        console.log(attribute)

        return {
            attribute
        }
    }
})
</script>