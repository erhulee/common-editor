<template>
    <g>
        <path fill="none" stroke="#4F80FF" :d="outline + 'Z'"></path>
        <rect v-for="{ item, x, y } in resizeDot" :key="item" @mousedown.stop="onResize(item)" :x="x" :y="y" width="10"
            height="10" fill="#4F80FF" stroke="rgba(0,0,0,0)" :class="item">
        </rect>
        <svg v-bind="rotateIconSVGAttribute" class="rotate-icon">
            <g @mousedown.stop="onRotate" >
                <circle cx="25" cy="25" r="20" fill="transparent"></circle>
                <path d="M42 8V24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M6 24L6 40" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path
                    d="M42 24C42 14.0589 33.9411 6 24 6C18.9145 6 14.3216 8.10896 11.0481 11.5M6 24C6 33.9411 14.0589 42 24 42C28.8556 42 33.2622 40.0774 36.5 36.9519"
                    stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
        </svg>
    </g>
</template>

<script setup lang="ts">
import { PathCommand } from '@/plugins/PathCommand';
import { computed } from 'vue';
const props = defineProps<{
    origin: {
        x: number,
        y: number
    },
    size: {
        width: number
        height: number
    }
}>()
const emit = defineEmits(["resize", "rotate"])

const outline = computed(() => {
    const moveCommand = PathCommand.Move(props.origin.x, props.origin.y)
    const rightTopPoint = { x: props.origin.x + props.size.width, y: props.origin.y }
    const rightBottomPoint = { x: props.origin.x + props.size.width, y: props.origin.y + props.size.height }
    const leftBottomPoint = { x: props.origin.x, y: props.origin.y + props.size.height }
    const lineCommand = PathCommand.LineTo([rightTopPoint, rightBottomPoint, leftBottomPoint]);
    return PathCommand.compose(moveCommand, lineCommand)
})

const resizeDot = computed(() => ['left-top', 'left-bottom', 'right-top', 'right-bottom'].map(item => ({
    item,
    x: props.origin.x - 4 + (item.includes("right") ? props.size.width : 0),
    y: props.origin.y - 4 + (item.includes("bottom") ? props.size.height : 0)
})));

const rotateIconSVGAttribute = computed(() => ({
    fill: "none",
    x: props.origin.x + props.size.width / 2 - 10,
    y: props.origin.y + props.size.height + 20,
    width: 50,
    height: 50,
    viewBox: "0 0 100 100"
}))
const onResize = (direction: string) => emit("resize", { direction })
const onRotate = (e: MouseEvent) => emit("rotate", e)
</script>


<style scoped>
.rotate-icon {
    color: #4F80FF;
}

.left-top {
    cursor: nwse-resize;
}

.left-bottom {
    cursor: nwse-resize;
}

.right-top {
    cursor: nesw-resize;
}

.right-bottom {
    cursor: nwse-resize;
}
</style>