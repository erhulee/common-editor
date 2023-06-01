<template>
    <div class="absolute" ref="wrapperRef" @mousedown="startMove" @click.stop="" :style="position" :id="props.id">
        <div v-if="isActive && !isLocked" class="decoration 
                        absolute top-0 left-0 right-0 bottom-0
                        border-blue-500 border-2 text-blue-500">
                        <span class="absolute bg-white border-blue-500 border w-2 h-2 " 
                            v-for="item in resizeDot"
                            :key="item"
                            :class="item"
                            @mousedown="startResize($event, item)"
                            >
                        </span>
                        <Refresh  class="rotate"  @mousedown="startRotate($event)"></Refresh>

        </div>

        <div v-if="isActive && isLocked" class="decoration 
                            absolute top-0 left-0 right-0 bottom-0
                            border-red-500 border-2 text-red-500">
            <div class=" 
                 absolute -top-2 -left-2 w-5 h-5 
                 bg-red-600 rounded-md 
                 flex items-center justify-center ">
                <Lock size="12" fill="#fff"></Lock>
            </div>
        </div>

          <component :is="props.tag" v-bind="props"></component>
    </div>
</template>

<script setup lang="ts">
import { useActorsStore } from '@/store/actors';
import { mapValues, pick } from 'lodash-es';
import { computed, onMounted, ref } from 'vue';
import {  Lock, Refresh } from "@icon-park/vue-next"
type TupleToUnion<T extends any[]> =  T extends Array<infer U> ? U : never
const props = defineProps<{
    tag: string,
    options: Record<string, any>
    content: string
    id: string
}>();

const actorStore = useActorsStore();
const isActive = computed(() => props.id == actorStore.currentActorId);
const isLocked = computed(() => actorStore.currentActor?.options.base.isLocked)
const position = computed(() => {
    return {
        ...mapValues(pick(props.options.base, ["left", "top", "width", "height"]), (value: number) => value + "px"),
        transform: `rotate(${props.options.base.rotate || 0}deg)`
    }
})
const isBusy = ref(false);
let   isMoved = false;
const wrapperRef = ref<HTMLElement | null>(null);
const clickPosition = {
    x: 0,
    y: 0
}
const diff = {
    top: 0,
    left: 0
}
let canvasRect: DOMRect | null = null;
let currentPosition: { top: number, left: number } | null = null;
let currentSize: { width: number, height: number} = {
    width: 0,
    height: 0
}
let currentRotate = 0;
onMounted(() => {
    const canvas = document.getElementById("editor-canvas");
    canvasRect = canvas!.getBoundingClientRect();
    const elementRect = wrapperRef.value!.getBoundingClientRect();
    currentSize = {
        width: elementRect.width,
        height: elementRect.height
    }
})

function startMove(event: MouseEvent) {
    if(isBusy.value) return;
    actorStore.select(props.id);
    if (isLocked.value) return;
    // 点击位置
    const point = {
        x: event.x,
        y: event.y
    };
    const elementRect = wrapperRef.value!.getBoundingClientRect();
    diff.left = point.x - elementRect.left;
    diff.top = point.y - elementRect.top;
    currentPosition = {
        left: elementRect.left - canvasRect!.left,
        top: elementRect.top - canvasRect!.top
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", endMove);
}

function move(event: MouseEvent) {
    isMoved = true;
    const currentLeft = event.clientX;
    const currentTop = event.clientY;
    const elementRect = wrapperRef.value!.getBoundingClientRect();
    const moveX = currentLeft - diff.left - elementRect.left;
    const moveY = currentTop - diff.top - elementRect.top;
    currentPosition = {
        left: currentPosition!.left + moveX,
        top: currentPosition!.top + moveY
    }
    wrapperRef.value!.style.top = currentPosition!.top + "px";
    wrapperRef.value!.style.left = currentPosition!.left  + "px";
}

function endMove() {
    if(isMoved){
        console.log("down")
        actorStore.batchUpdateOption([
            {
                paths: ["base", "top"],
                value: currentPosition?.top
            },
               {
                paths: ["base", "left"],
                value: currentPosition?.left
            }
        ])
    }
    isMoved = false
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", endMove);
}

const resizeDot = ['left-top', 'left-bottom', 'left', 'top', 'bottom', 'right', 'right-top', 'right-bottom'] as const;
function startResize(event: MouseEvent, direction:TupleToUnion<['left-top', 'left-bottom', 'left', 'top', 'bottom', 'right', 'right-top', 'right-bottom']> ){
    endMove();
    isBusy.value = true;
    // 点击位置
    const point = {
        x: event.x,
        y: event.y
    };
    const elementRect = wrapperRef.value!.getBoundingClientRect();
    diff.left = point.x - elementRect.left;
    diff.top = point.y - elementRect.top;

    const resizeCallback = (event:MouseEvent) => resize(event, {
        width: elementRect.width,
        height: elementRect.height,
        top: elementRect.top,
        left: elementRect.left,
    }, direction);

    const resizeEndCallback = () => {
        document.removeEventListener("mousemove", resizeCallback);
        document.removeEventListener("mouseup", resizeEndCallback);
        endResize();
    }
    document.addEventListener("mousemove", resizeCallback);
    document.addEventListener("mouseup", resizeEndCallback);
}

function resize(event: MouseEvent, originRect: Pick<DOMRect, "width"|"height"|"top"|"left">, direction: TupleToUnion<['left-top', 'left-bottom', 'left', 'top', 'bottom', 'right', 'right-top', 'right-bottom']>){
    // 1. 先拿到位移的距离，规定向左/向下是正方向
    const currentLeft = event.clientX;
    const currentTop = event.clientY;

    const moveX = currentLeft - diff.left - originRect.left;
    const moveY = currentTop - diff.top - originRect.top;

    currentSize.height = originRect.height;
    currentSize.width = originRect.width;

    currentPosition = {
        left: originRect.left - canvasRect!.left,
        top: originRect.top - canvasRect!.top
    }
    switch(direction){
        case "right-bottom": 
            currentSize.width += moveX
            currentSize.height += moveY
            break;
        case "right":
            currentSize.width += moveX
            break;
        case "right-top":
            currentSize.width += moveX
            currentSize.height -= moveY
            currentPosition!.top += moveY
            break;
        case "bottom":
            currentSize.height += moveY
            break;
        case "left":
            currentSize.width -= moveX;
            currentPosition!.left += moveX
            break;
        case "top":
            currentSize.height -= moveY
            currentPosition!.top += moveY
            break;
        case "left-bottom":
            currentPosition!.left += moveX
            currentSize.width -= moveX
            currentSize.height += moveY
            break;
        case "left-top":
            currentSize.width -= moveX
            currentSize.height -= moveY
            currentPosition!.top += moveY
            currentPosition!.left += moveX
            break;
    }

    requestAnimationFrame(()=>{
        wrapperRef.value!.style.width = currentSize.width + "px";
        wrapperRef.value!.style.height = currentSize.height + "px";
        wrapperRef.value!.style.top = currentPosition!.top + "px"
        wrapperRef.value!.style.left = currentPosition!.left + "px"
    })
}

function endResize(){
    isBusy.value = false
    actorStore.updateOption(["base", "top"], currentPosition?.top);
    actorStore.updateOption(["base", "left"], currentPosition?.left)
    actorStore.updateOption(["base", "width"], currentSize.width);
    actorStore.updateOption(["base", "height"], currentSize.height)
}

function startRotate(event: MouseEvent ){
    isBusy.value = true;
    clickPosition.x = event.clientX;
    clickPosition.y = event.clientY;
    document.addEventListener("mousemove", rotate);
    document.addEventListener("mouseup", endRotate);
}




function rotate(event: MouseEvent){
    const elementRect = wrapperRef.value!.getBoundingClientRect();
    const center = {
        x: elementRect.left + elementRect.width / 2,
        y: elementRect.top + elementRect.height / 2
    }

    const vector_a = [center.x - clickPosition.x, center.y - clickPosition.y];
    const vector_b = [center.x - event.x, center.y - event.y];

    const len_a = Math.sqrt(Math.pow(vector_a[0], 2) + Math.pow(vector_a[1], 2));
    const len_b = Math.sqrt(Math.pow(vector_b[0], 2) + Math.pow(vector_b[1], 2));
    const dot_ab  =  (vector_a[0] * vector_b[0] + vector_a[1] * vector_b[1])
    const cos = dot_ab / (len_a * len_b);
    const radians = Math.acos(cos);
    let degrees = radians * (180 / Math.PI);


    // 判断旋转方向，使用叉积（外积）判断向量叉积的方向
    const cross_ab = vector_a[0] * vector_b[1] - vector_a[1] * vector_b[0];
    if (cross_ab < 0) {
        degrees = -degrees;
    }
    wrapperRef.value!.style.transform = `rotate(${degrees}deg`
    currentRotate = degrees
}

function endRotate(){
    isBusy.value = false
    actorStore.updateOption(["base", "rotate"], currentRotate);
    document.removeEventListener("mousemove", rotate);
    document.removeEventListener("mouseup", endRotate);
}

</script>

<style>
.rotate{
    position: absolute;
    bottom: 0;
    transform: translateY(40px);
    margin: auto;
    left: calc( 50% - 7px);
    display: flex;
    justify-content: center;    

}
.active {
    border: solid 1px #101a6c;
}

.lock {
    border: solid 1px red;
}

.left-top {
    top: -6px;
    left: -6px;
}

.left {
    top: calc(50% - 6px);
    left: -6px;
}

.left-bottom {
    bottom: -6px;
    left: -6px;
}

.top {
    top: -6px;
    left: calc(50% - 6px);
}

.right-top {
    top: -6px;
    right: -6px;
}

.right {
    top: calc(50% - 6px);
    right: -6px;
}

.right-bottom {
    bottom: -6px;
    right: -6px;
}

.bottom {
    bottom: -6px;
    left: calc(50% - 6px);
}
</style>