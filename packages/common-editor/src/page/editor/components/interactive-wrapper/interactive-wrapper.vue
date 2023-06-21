<template>
    <!-- 考虑线性变化要不要直接在这里做更好 -->
    <g v-bind="groupAttributeValue" @click.stop="() => console.log('click')" @mousedown.stop="startMove">
        <slot></slot>
        <SelectorBox v-if="actorStore.currentActorId == props.currentId && !props.isSaving"
            @resize="({ direction }) => startResize(direction)" @rotate="onRotate" :is-lock="props.isLocked"
            :size="{ width: props.width, height: props.height }" :origin="{ x: props.left, y: props.top }">
        </SelectorBox>
        <div v-if="isActive && isLocked && !props.isSaving"
            class="decoration absolute top-0 left-0 right-0 bottom-0 border-red-500 border-2 text-red-500  cursor-none">
            <div
                class="cursor-none  absolute -top-2 -left-2 w-5 h-5 bg-red-600 rounded-md flex items-center justify-center ">
                <Lock size="12" fill="#fff"></Lock>
            </div>
        </div>
    </g>
</template>

<script setup lang="ts">
import { useActorsStore } from "@/store/actors";
import { computed, inject, onMounted, ref, watch } from 'vue';
import { Lock } from "@icon-park/vue-next"
import SelectorBox from "./selector-box.vue";
import { Runtime } from "../../runtime";
import { calculateRotatedPointCoordinate } from "./math";

enum ReactiveStatus {
    IDLE = "idle",
    MOVE = "move",
    RESIZE = "resize",
    ROTATE = "rotate"
}
const props = defineProps<{
    currentId: string
    isLocked: boolean
    isActive: boolean
    left: number
    top: number
    width: number
    height: number
    rotate: number

    isSaving: boolean
}>();
const emit = defineEmits(["change"]);
const runtime = inject("runtime") as Runtime;
const actorStore = useActorsStore();
const resizeDirection = ref("");
const reactiveStatus = ref<ReactiveStatus>(ReactiveStatus.IDLE)
let svgCanvasRect: any = {};

onMounted(() => {
    const rect = document.getElementById("editor-canvas")?.getBoundingClientRect()
    svgCanvasRect = rect
})

watch(reactiveStatus, (_, curValue) => {
    if (curValue == ReactiveStatus.IDLE) {
        runtime.globalStateChange("idle")
    } else {
        runtime.globalStateChange("editing")
    }
})

// svg 画布坐标下
const rotateOriginPoint = {
    x: 0,
    y: 0
}

// group Transform Value
const groupAttributeValue = computed(() => {
    const centerX = props.left + props.width / 2;
    const centerY = props.top + props.height / 2;
    return {
        transform: `rotate(${props.rotate},${centerX},${centerY})`,
        id: props.currentId
    }
})

function clearListener() {
    reactiveStatus.value = ReactiveStatus.IDLE;
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mousemove", rotate);
    document.removeEventListener("mouseup", clearListener);
}

/*---- 移动 ----*/
function startMove() {
    if (reactiveStatus.value !== ReactiveStatus.IDLE) return;
    actorStore.select(props.currentId)
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", clearListener);
}

function move(event: MouseEvent) {
    console.log(event.clientX)
    reactiveStatus.value = ReactiveStatus.MOVE;
    emit("change", {
        left: props.left + event.movementX,
        top: props.top + event.movementY
    })
}


/*---- 拉伸大小 ----*/
function startResize(direction: string) {
    if (reactiveStatus.value === ReactiveStatus.IDLE || reactiveStatus.value === ReactiveStatus.MOVE) {
        reactiveStatus.value = ReactiveStatus.RESIZE;
        resizeDirection.value = direction;
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", clearListener);
    }
}

function resize(event: MouseEvent) {
    reactiveStatus.value = ReactiveStatus.RESIZE;
    // 1. 先拿到位移的距离，规定向左/向下是正方向
    /*
    https://github.com/woai3c/Front-end-articles/issues/20 恩师！！
    */
    const clickPoint = {
        x: event.clientX - svgCanvasRect.left,
        y: event.clientY - svgCanvasRect.top
    }

    let originPoint = { x: 0, y: 0 };
    let newCenterPoint = { x: 0, y: 0 };
    let newBottomRightPoint = { x: 0, y: 0 };
    let newTopLeftPoint = { x: 0, y: 0 };
    let newBottomLeftPoint = { x: 0, y: 0 };
    let newTopRightPoint = { x: 0, y: 0 };
    switch (resizeDirection.value) {
        case "right-bottom":
            originPoint = calculateRotatedPointCoordinate({
                x: props.left,
                y: props.top
            }, {
                x: props.left + props.width / 2,
                y: props.top + props.height / 2
            }, props.rotate)

            newCenterPoint = {
                x: (originPoint.x + clickPoint.x) / 2,
                y: (originPoint.y + clickPoint.y) / 2
            }
            newBottomRightPoint = calculateRotatedPointCoordinate(clickPoint, newCenterPoint, -props.rotate)
            newTopLeftPoint = calculateRotatedPointCoordinate(originPoint, newCenterPoint, -props.rotate)

            emit("change", {
                width: newBottomRightPoint.x - newTopLeftPoint.x,
                height: newBottomRightPoint.y - newTopLeftPoint.y,
                top: newTopLeftPoint.y,
                left: newTopLeftPoint.x
            })
            break;
        case "right-top":
            originPoint = calculateRotatedPointCoordinate({
                x: props.left,
                y: props.top + props.height
            }, {
                x: props.left + props.width / 2,
                y: props.top + props.height / 2
            }, props.rotate)

            newCenterPoint = {
                x: (originPoint.x + clickPoint.x) / 2,
                y: (originPoint.y + clickPoint.y) / 2
            }

            newBottomLeftPoint = calculateRotatedPointCoordinate(originPoint, newCenterPoint, -props.rotate)
            newTopRightPoint = calculateRotatedPointCoordinate(clickPoint, newCenterPoint, -props.rotate)
            emit("change", {
                width: newTopRightPoint.x - newBottomLeftPoint.x,
                height: newBottomLeftPoint.y - newTopRightPoint.y,
                top: newTopRightPoint.y,
                left: newBottomLeftPoint.x
            })
            break;
        case "left-bottom":
            originPoint = calculateRotatedPointCoordinate({
                x: props.left + props.width,
                y: props.top,
            }, {
                x: props.left + props.width / 2,
                y: props.top + props.height / 2
            }, props.rotate)
            newCenterPoint = {
                x: (originPoint.x + clickPoint.x) / 2,
                y: (originPoint.y + clickPoint.y) / 2
            }
            newBottomLeftPoint = calculateRotatedPointCoordinate(clickPoint, newCenterPoint, -props.rotate)
            newTopRightPoint = calculateRotatedPointCoordinate(originPoint, newCenterPoint, -props.rotate)
            emit("change", {
                width: newTopRightPoint.x - newBottomLeftPoint.x,
                height: newBottomLeftPoint.y - newTopRightPoint.y,
                top: newTopRightPoint.y,
                left: newBottomLeftPoint.x
            })
            break;
        case "left-top":
            originPoint = calculateRotatedPointCoordinate({
                x: props.left + props.width,
                y: props.top + props.height
            }, {
                x: props.left + props.width / 2,
                y: props.top + props.height / 2
            }, props.rotate)

            newCenterPoint = {
                x: (originPoint.x + clickPoint.x) / 2,
                y: (originPoint.y + clickPoint.y) / 2
            }
            newBottomRightPoint = calculateRotatedPointCoordinate(originPoint, newCenterPoint, -props.rotate)
            newTopLeftPoint = calculateRotatedPointCoordinate(clickPoint, newCenterPoint, -props.rotate)

            emit("change", {
                width: newBottomRightPoint.x - newTopLeftPoint.x,
                height: newBottomRightPoint.y - newTopLeftPoint.y,
                top: newTopLeftPoint.y,
                left: newTopLeftPoint.x
            })
            break;
    }
}



/*---- 旋转 ----*/
function onRotate(event: MouseEvent) {
    if (reactiveStatus.value === ReactiveStatus.IDLE || reactiveStatus.value === ReactiveStatus.MOVE) {
        rotateOriginPoint.x = event.clientX;
        rotateOriginPoint.y = event.clientY;
        console.log("旋转起始点：", rotateOriginPoint)
        rotateOriginPoint.x = props.left + props.width / 2 + 10;
        rotateOriginPoint.y = props.top + props.height + 30;
        console.log("旋转起始点：", rotateOriginPoint)
        document.addEventListener("mousemove", rotate);
        document.addEventListener("mouseup", clearListener);
    }
}

function rotate(event: MouseEvent) {

    reactiveStatus.value = ReactiveStatus.ROTATE;
    // svg 坐标系
    const centerX = props.left + props.width / 2;
    const centerY = props.top + props.height / 2;

    // clientX 和 clientY 是windows坐标系
    const endPointX = event.clientX - svgCanvasRect.left;
    const endPontY = event.clientY - svgCanvasRect.top;

    const vector_a = [centerX - rotateOriginPoint.x, centerY - rotateOriginPoint.y];
    const vector_b = [centerX - endPointX, centerY - endPontY];

    const len_a = Math.sqrt(Math.pow(vector_a[0], 2) + Math.pow(vector_a[1], 2));
    const len_b = Math.sqrt(Math.pow(vector_b[0], 2) + Math.pow(vector_b[1], 2));
    const dot_ab = (vector_a[0] * vector_b[0] + vector_a[1] * vector_b[1])
    const cos = dot_ab / (len_a * len_b);
    const radians = Math.acos(cos);
    let degrees = radians * (180 / Math.PI);
    console.log(degrees)

    // // 判断旋转方向，使用叉积（外积）判断向量叉积的方向
    const cross_ab = vector_a[0] * vector_b[1] - vector_a[1] * vector_b[0];
    if (cross_ab < 0) {
        degrees = -degrees;
    }
    emit("change", { rotate: degrees })
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

.active {}

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