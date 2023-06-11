<template>
    <!-- 考虑线性变化要不要直接在这里做更好 -->
    <g
        v-bind="groupAttributeValue" 
        @mousedown="startMove" >
          <slot></slot>
          <SelectorBox 
            v-if="actorStore.currentActorId == props.currentId && !props.isSaving"
            @resize="({direction})=>startResize(direction)"
            @rotate="onRotate"
            :size="{ width: props.width, height: props.height }" 
            :origin="{ x: props.left, y: props.top }"
        ></SelectorBox>
        <!-- <div v-if="props.isActive && !props.isLocked" 
            class="active cursor-move decoration absolute top-0 left-0 right-0 bottom-0 border-blue-500 border-2 text-blue-500">
            <span class="absolute bg-white border-blue-500 border w-2 h-2 cursor-grab " 
                v-for="item in resizeDot" 
                :key="item"
                :id="item" 
                :class="item" 
                @mousedown="onResize">
            </span>
            <Refresh class="rotate cursor-pointer" @mousedown.stop="onRotate" ></Refresh>
        </div> -->

        <div v-if="isActive && isLocked && !props.isSaving" 
            class="decoration absolute top-0 left-0 right-0 bottom-0 border-red-500 border-2 text-red-500  cursor-none">
            <div class="cursor-none  absolute -top-2 -left-2 w-5 h-5 bg-red-600 rounded-md flex items-center justify-center ">
                <Lock size="12" fill="#fff"></Lock>
            </div>
        </div>
    </g>
</template>

<script setup lang="ts">
import { useActorsStore } from "@/store/actors";
import { computed, ref } from 'vue';
import { Lock } from "@icon-park/vue-next"
import SelectorBox from "../selector-box.vue";
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

const actorStore = useActorsStore();
const resizeDirection = ref("");
const rotateOriginPoint = {
    x: 0,
    y: 0
}
const emit = defineEmits(["change"]);


// group Transform Value
const groupAttributeValue = computed(()=>{
    const centerX = props.left + props.width / 2;
    const centerY = props.top + props.height / 2; 
    return {
        transform: `rotate(${props.rotate},${centerX},${centerY})`,
        id: props.currentId
    }
})


function startMove() {
    actorStore.select(props.currentId)
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", endMove);
}

function move(event: MouseEvent) {
    emit("change", {
        left: props.left + event.movementX,
        top: props.top + event.movementY
    })
}

function endMove() {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", endMove);
}


function startResize(direction:string){
    resizeDirection.value = direction;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", endResize);
}

function resize(event: MouseEvent) {
    // 1. 先拿到位移的距离，规定向左/向下是正方向
    const { movementX, movementY } = event
    switch (resizeDirection.value) {
        case "right-bottom":
            emit("change", {
                width: props.width + movementX,
                height: props.height + movementY
            })
            break;

        case "right-top":
            emit("change", {
                width: props.width + movementX,
                height: props.height + movementY,
                top: props.top + movementY
            })
            break;
        case "left-bottom":
            emit("change", {
                width: props.width + movementX,
                height: props.height + movementY,
                left: props.left + movementX
            })
            break;
        case "left-top":
              emit("change", {
                width: props.width + movementX,
                height: props.height + movementY,
                left: props.left + movementX,
                top: props.top + movementY
            })
            break;
    }
}

function endResize() {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", endResize);
}

function onRotate(event: MouseEvent){
    rotateOriginPoint.x = event.clientX;
    rotateOriginPoint.y = event.clientY;
    document.addEventListener("mousemove", rotate);
    document.addEventListener("mouseup", endRotate);
}

function rotate(event: MouseEvent) {
    const centerX = props.left + props.width / 2;
    const centerY = props.top + props.height / 2;

    const endPointX = event.clientX;
    const endPontY = event.clientY;

    const vector_a = [centerX - rotateOriginPoint.x, centerY - rotateOriginPoint.y];
    const vector_b = [centerX - endPointX, centerY - endPontY];

    // // console.log(vector_a, vector_b)
    const len_a = Math.sqrt(Math.pow(vector_a[0], 2) + Math.pow(vector_a[1], 2));
    const len_b = Math.sqrt(Math.pow(vector_b[0], 2) + Math.pow(vector_b[1], 2));
    const dot_ab = (vector_a[0] * vector_b[0] + vector_a[1] * vector_b[1])
    const cos = dot_ab / (len_a * len_b);
    const radians = Math.acos(cos);
    let degrees = radians * (180 / Math.PI);

    // // 判断旋转方向，使用叉积（外积）判断向量叉积的方向
    const cross_ab = vector_a[0] * vector_b[1] - vector_a[1] * vector_b[0];
    if (cross_ab < 0) {
        degrees = -degrees;
    }
    console.log(degrees)
    emit("change", {rotate: degrees})
    // result = deg + degrees;
    // contentRef.value!.style.transform = `rotate(${deg + degrees}deg`
}

function endRotate() {
    document.removeEventListener("mousemove", rotate);
    document.removeEventListener("mouseup", endRotate);
}
// const { startMove, endMove, status: moveStatus } = useSVGMove(transformValue, {
//     endMove: (x, y) => {
//         actorStore.batchUpdateOption([
//             { paths: ["base", "top"], value: y },
//             { paths: ["base", "left"], value: x }
//         ])
//     }
// })


// const onMove = (event: MouseEvent) => {
//     if (event.button === 2)  return
//     if (resizeStatus.value == "resizing") return;
//     actorStore.select(props.currentId);
//     if (props.isLocked) return;
//     // endResize();
//     // endRotate();
//     startMove();
// }

// const { startResize, status: resizeStatus, endResize } = useResize(wrapperRef as any, {
//     endResize: (x, y, width, height) => {
//         actorStore.batchUpdateOption([
//             { paths: ["base", "top"], value: y },
//             { paths: ["base", "left"], value: x },
//             { paths: ["base", "width"], value: width },
//             { paths: ["base", "height"], value: height }
//         ])
//     }
// })

// const onResize = () => {
//     if (props.isLocked) return;
//     endMove();
//     endRotate();
//     startResize()
// }

// const { startRotate, status: rotateStatus, endRotate } = useRotate(wrapperRef as any, {
//     endRotate: (deg) => {
//         actorStore.updateOption(["base", "rotate"], deg)
//     }
// })

// const onRotate = (event: MouseEvent) => {
//     event.preventDefault();
//     if( props.isLocked ) return;
//     endMove();
//     endResize();
//     startRotate(event)
// }



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