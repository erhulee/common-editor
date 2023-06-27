<template>
    <div id="editor-canvas-wrapper">
        <div id="editor-canvas">
           <svg xmlns="http://www.w3.org/2000/svg" @contextmenu="handleContext" @click="selectGlobal" v-bind="zoomBox">
                <!-- background-color -->
                <path v-bind="SVGBackGround"></path>
                <SvgActorRender v-for="item in actors" 
                    v-bind="item" 
                    :is-saving="runtime.globalState.value === 'saving'" />
            </svg>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useActorsStore } from '../../../store/actors';
import { useGlobalStore } from '../../../store/global';
import { GlobalEvents, Runtime } from '../runtime';
import { PathCommand } from '@/plugins/PathCommand';
import SvgActorRender from '../components/svg-actor-render.vue';
import { ActorType } from '../preLoad';

const actorsStore = useActorsStore();
const globalStore = useGlobalStore();
const actors = computed(() => actorsStore.actors);
const runtime = inject("runtime") as Runtime
const scaleRef = ref(1)

const zoomBox = computed(() => ({
    width: globalStore.canvas_style.width * scaleRef.value,
    height: globalStore.canvas_style.height * scaleRef.value,
    viewBox: `0 0 ${globalStore.canvas_style.width} ${globalStore.canvas_style.height}`,
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

function handleContext(event: Event) {
    runtime.trigger(GlobalEvents.CONTEXT_MENU_SHOW, {
        event,
        info: {
            type: ActorType.Canvas
        }
    })
}

function selectGlobal() {
    if(runtime.globalState.value === "idle"){
        actorsStore.select("")
    }
}



</script>

<style scoped>

#editor-canvas-wrapper {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

#editor-canvas {
    box-shadow: 10px 10px 10px #e6e6e6;
}
</style>


