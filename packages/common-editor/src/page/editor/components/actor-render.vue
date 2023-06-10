<template >
    <div @contextmenu.stop="handleContext">
        <InteractiveWrapper :left="position.left" :top="position.top" :width="position.width" :height="position.height"
            :is-active="isActive" :is-locked="isLocked" :rotate="position.rotate" :current-id="props.id" >
            <component :is="props.tag" v-bind="props" :style="contentStyle" @change="handleMaterialChange"></component>
        </InteractiveWrapper>
    </div>
</template>

<script setup lang="ts">
import { useActorsStore } from '@/store/actors';
import { pick } from 'lodash-es';
import { computed, inject } from 'vue';

import InteractiveWrapper from './interactive-wrapper/interactive-wrapper.vue';
const props = defineProps<{
    tag: string,
    options: Record<string, any>
    content: string
    id: string
}>();

console.log(props.tag)


const actorStore = useActorsStore();
const isActive = computed(() => props.id == actorStore.currentActorId);
const isLocked = computed(() => Boolean(actorStore.currentActor?.options.base.isLocked))
const position = computed(() => pick(props.options.base, ["left", "top", "width", "height", "rotate"]));
console.log(position)

const contentStyle = computed(() => ({
    opacity: props.options.base.opacity
}))
function handleMaterialChange(payload: { path: string[], value: string | number }) {
    actorStore.updateOption(payload.path, payload.value)
}

const displayContext = inject("display_context") as  (event: Event, payload: {
    componentId: string
     type: "actor"
})=>void;
function handleContext(event: Event){
    displayContext(event, {
        type: "actor",
        componentId: props.id
    })
}


// const wrapperRef = ref<HTMLElement | null>(null);
// const clickPosition = {
//     x: 0,
//     y: 0
// }
// let currentRotate = 0;

// function startRotate(event: MouseEvent) {
//     clickPosition.x = event.clientX;
//     clickPosition.y = event.clientY;
//     document.addEventListener("mousemove", rotate);
//     document.addEventListener("mouseup", endRotate);
// }

// function rotate(event: MouseEvent) {
//     const elementRect = wrapperRef.value!.getBoundingClientRect();
//     const center = {
//         x: elementRect.left + elementRect.width / 2,
//         y: elementRect.top + elementRect.height / 2
//     }
//     const vector_a = [center.x - clickPosition.x, center.y - clickPosition.y];
//     const vector_b = [center.x - event.x, center.y - event.y];

//     const len_a = Math.sqrt(Math.pow(vector_a[0], 2) + Math.pow(vector_a[1], 2));
//     const len_b = Math.sqrt(Math.pow(vector_b[0], 2) + Math.pow(vector_b[1], 2));
//     const dot_ab = (vector_a[0] * vector_b[0] + vector_a[1] * vector_b[1])
//     const cos = dot_ab / (len_a * len_b);
//     const radians = Math.acos(cos);
//     let degrees = radians * (180 / Math.PI);


//     // 判断旋转方向，使用叉积（外积）判断向量叉积的方向
//     const cross_ab = vector_a[0] * vector_b[1] - vector_a[1] * vector_b[0];
//     if (cross_ab < 0) {
//         degrees = -degrees;
//     }
//     wrapperRef.value!.style.transform = `rotate(${degrees}deg`
//     currentRotate = degrees
// }

// function endRotate() {
//     actorStore.updateOption(["base", "rotate"], currentRotate);
//     document.removeEventListener("mousemove", rotate);
//     document.removeEventListener("mouseup", endRotate);
// }

</script>

