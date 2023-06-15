<template>
    <!-- <div class="h-full page-a4 page relative canvas"  > -->

    <div id="editor-canvas">
        <svg xmlns="http://www.w3.org/2000/svg" @contextmenu="handleContext" @click="selectGlobal" v-bind="zoomBox">
            <path v-bind="SVGBackGround"></path>
            <actorRender v-for="item in actors" v-bind="item" :is-saving="runtime.globalState.value == 'saving'">
            </actorRender>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { useActorsStore } from '../../../store/actors';
import { useGlobalStore } from '../../../store/global';
import actorRender from '../components/actor-render.vue';
import { GlobalEvents, Runtime } from '../runtime';
import { PathCommand } from '@/plugins/PathCommand';

const actorsStore = useActorsStore();
const globalStore = useGlobalStore();
const actors = computed(() => actorsStore.actors);
const runtime = inject("runtime") as Runtime

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

const SVGBackGround = computed(() => {
    const width = globalStore.canvas_style.width;
    const height = globalStore.canvas_style.height;
    return {
        fill: globalStore.canvas_style.backgroundColor,
        d: PathCommand.compose(PathCommand.Move(0, 0), PathCommand.LineTo([{
            x: width,
            y: 0
        }, {
            x: width,
            y: height
        }, {
            x: 0,
            y: height
        }])) + " Z"
    }
})

// 使用 viewBox 将元素尺寸映射到 scale 后
runtime.listen(GlobalEvents.ZOOM, (arg) => {
    const canvas = document.getElementById("editor-canvas");
    if (canvas == null) return;
    scaleRef.value = arg
})


const displayContext = inject("display_context") as (event: Event, payload: {
    type: "canvas"
}) => void;

function handleContext(event: Event) {
    displayContext(event, {
        type: "canvas",
    })
}


function selectGlobal(e) {
    console.log("canvas click", e)
    actorsStore.select("")
}



</script>

<style scoped>
.page {
    /* box-shadow: 10px 10px 20px rgb(227, 227, 227); */
}

.page-a4 {
    overflow: hidden;
}

#editor-canvas {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
</style>


