<template>
    <!-- <div class="h-full page-a4 page relative canvas"  > -->

    <svg xmlns="http://www.w3.org/2000/svg" 
        id="editor-canvas" 
        @contextmenu="handleContext" 
        @click="selectGlobal"
        v-bind="zoomBox">
        <template v-for="item in actors">
            <actorRender v-bind="item" :is-saving="isSaving"></actorRender>
        </template>
    </svg>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { useActorsStore } from '../../../store/actors';
import { useGlobalStore } from '../../../store/global';
import actorRender from '../components/actor-render.vue';
import { EditorProvide } from '@/type/provide';

const actorsStore = useActorsStore();
const globalStore = useGlobalStore();
const actors = computed(() => actorsStore.actors);
const zoomListener = inject(EditorProvide.LISTENER) as (eventName: string, ...args: any[]) => void;
const isSaving = inject(EditorProvide.IS_SAVING) as boolean

const pointPosition = reactive({
    x: 0,
    y: 0
})

onMounted(() => {
    document.addEventListener("click", (event) => {
        pointPosition.x = event.clientX
        pointPosition.y = event.clientY
    })

})

const scaleRef = ref(1)

const zoomBox = computed(() => ({
    width: globalStore.canvas_style.width * scaleRef.value,
    height: globalStore.canvas_style.height * scaleRef.value,
    viewBox: "0 0 600 1000"
}))

// 使用 viewBox 将元素尺寸映射到 scale 后
zoomListener("zoom", (arg) => {
    const canvas = document.getElementById("editor-canvas");
    if (canvas == null) return;
    scaleRef.value = arg
    // const width = 600;
    // const height = 1000;
    // canvas.style.transform = `scale(${arg})`
    // canvas.style.width = `${width * arg}px`;
    // canvas.style.height = `${height * arg}px`;
})
const selectGlobal = () => {
}

const displayContext = inject("display_context") as (event: Event, payload: {
    type: "canvas"
}) => void;

function handleContext(event: Event) {
    displayContext(event, {
        type: "canvas",
    })
}




</script>

<style scoped>
.page {
    /* box-shadow: 10px 10px 20px rgb(227, 227, 227); */
}

.page-a4 {
    overflow: hidden;
}

#editor-canvas{
    background-color: white;
    margin: auto;
}
</style>


