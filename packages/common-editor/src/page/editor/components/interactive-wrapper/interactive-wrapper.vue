<template>
    <div 
        draggable="false"
        class="absolute" 
        ref="wrapperRef" 
        @mousedown="onMove" 
        :style="position" 
        :id="props.currentId">
        <div class=" relative z-40 h-full" >
        <slot></slot>

        </div>

        <div v-if="props.isActive && !props.isLocked" 
            class="active cursor-move decoration absolute top-0 left-0 right-0 bottom-0 border-blue-500 border-2 text-blue-500">
            <span class="absolute bg-white border-blue-500 border w-2 h-2 cursor-grab " 
                v-for="item in resizeDot" 
                :key="item"
                :id="item" 
                :class="item" 
                @mousedown="onResize">
            </span>
            <Refresh class="rotate cursor-pointer" ></Refresh>
        </div>

        <div v-if="isActive && isLocked" 
            class="decoration absolute top-0 left-0 right-0 bottom-0 border-red-500 border-2 text-red-500  cursor-none">
            <div class="cursor-none  absolute -top-2 -left-2 w-5 h-5 bg-red-600 rounded-md flex items-center justify-center ">
                <Lock size="12" fill="#fff"></Lock>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useActorsStore } from "@/store/actors";
import { useMove } from "./useMove"
import { useResize } from "./useResize"
import { computed, ref } from 'vue';
import { Lock, Refresh } from "@icon-park/vue-next"
const props = defineProps<{
    currentId: string
    isLocked: boolean
    isActive: boolean
    left: number
    top: number
    width: number
    height: number
    rotate: number
}>();

const actorStore = useActorsStore();
const wrapperRef = ref<HTMLElement | null>(null);
const position = computed(() => ({
    top: props.top + "px",
    left: props.left + "px",
    width: props.width + "px",
    height: props.height + "px",
    transform: `rotate(${props.rotate || 0}deg)`
}))
const resizeDot = ['left-top', 'left-bottom', 'left', 'top', 'bottom', 'right', 'right-top', 'right-bottom'];

const { startMove, endMove, status: moveStatus } = useMove(wrapperRef as any, {
    endMove: (x, y) => {
        actorStore.batchUpdateOption([
            { paths: ["base", "top"], value: y },
            { paths: ["base", "left"], value: x }
        ])
    }
})


const onMove = (event: MouseEvent) => {
    //  console.log('鼠标右键按下');
    if (event.button === 2)  return
    if (resizeStatus.value == "resizing") return;
    actorStore.select(props.currentId);
    if (props.isLocked) return;
    startMove(event)
}

const { startResize, status: resizeStatus } = useResize(wrapperRef as any, {
    endResize: (x, y, width, height) => {
        actorStore.batchUpdateOption([
            { paths: ["base", "top"], value: y },
            { paths: ["base", "left"], value: x },
            { paths: ["base", "width"], value: width },
            { paths: ["base", "height"], value: height }
        ])
    }
})

const onResize = (event: MouseEvent) => {
    if (props.isLocked) return;
    endMove();
    startResize(event)
}



</script>

<style scoped>
.rotate {
    position: absolute;
    bottom: 0;
    transform: translateY(40px);
    margin: auto;
    left: calc(50% - 7px);
    display: flex;
    justify-content: center;

}

.active {
}

.lock {
    border: solid 1px red;
}

.left-top {
    top: -6px;
    left: -6px;
    cursor: nwse-resize;
}

.left {
    top: calc(50% - 6px);
    left: -6px;
    cursor: ew-resize;
}

.left-bottom {
    bottom: -6px;
    left: -6px;
    cursor: nwse-resize;
}

.top {
    top: -6px;
    left: calc(50% - 6px);
    cursor: ns-resize;
}

.right-top {
    top: -6px;
    right: -6px;
    cursor: nesw-resize;
}

.right {
    top: calc(50% - 6px);
    right: -6px;
    cursor: ew-resize;
}

.right-bottom {
    bottom: -6px;
    right: -6px;
    cursor: nwse-resize;
}

.bottom {
    bottom: -6px;
    left: calc(50% - 6px);
    cursor: ns-resize;
}
</style>