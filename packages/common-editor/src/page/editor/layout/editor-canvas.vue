<template>
    <div id="editor-canvas-wrapper">
        <div id="editor-canvas" :class="className">
            <svg xmlns="http://www.w3.org/2000/svg" @contextmenu="handleContext" @click="selectGlobal" v-bind="zoomBox">
                <path v-bind="SVGBackGround"></path>
                <SvgActorRender v-for="item in actors" v-bind="item" :is-saving="runtime.globalState.value === 'saving'" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { useActorsStore } from "../../../store/actors";
import { useGlobalStore } from "../../../store/global";
import { GlobalEvents, GlobalState, Runtime } from "../runtime";
import { PathCommand } from "@/plugins/PathCommand";
import SvgActorRender from "../components/svg-actor-render.vue";
import useZoom from "@/hooks/useZoom";

import { ActorType } from "../preLoad";
import { maxAreaRect } from "@/utils/maxAreaRect";
import useResize from "@/hooks/useResize";
const actorsStore = useActorsStore();
const globalStore = useGlobalStore();
const actors = computed(() => actorsStore.actors);
const runtime = inject("runtime") as Runtime;
const canvasWrapperRect = ref<any>(null);
const scaleRef = ref(1);
useZoom(runtime);

useResize(() => {
    const node = document.querySelector(".worker-shop-wrapper");
    if (node !== null) {
        const { width, height } = node.getBoundingClientRect();
        canvasWrapperRect.value = { width, height }
        const ratio = globalStore.canvas_style.width / globalStore.canvas_style.height;
        const maxSize = maxAreaRect(ratio, width, height, { x: 50, y: 50 });
        globalStore.canvas_style.real_height = maxSize.maxHeight;
        globalStore.canvas_style.real_width = maxSize.maxWidth;
    }
})

const className = computed(() => {
    return runtime.globalState.value == GlobalState.DRAG ? "cursor-move" : ""
})

const zoomBox = computed(() => {
    return {
        // 实现 zoom 的效果
        width: globalStore.canvas_style.real_width,
        height: globalStore.canvas_style.real_height,
        viewBox: `${globalStore.canvas_style.left} ${globalStore.canvas_style.top} ${globalStore.canvas_style.real_width * (1 / globalStore.canvas_style.scale)} ${globalStore.canvas_style.real_height * (1 / globalStore.canvas_style.scale)}`,
    };
});

const SVGBackGround = computed(() => {
    const width = globalStore.canvas_style.real_width;
    const height = globalStore.canvas_style.real_height;
    return {
        fill: globalStore.canvas_style.backgroundColor,
        d:
            PathCommand.compose(
                PathCommand.Move(0, 0),
                PathCommand.LineTo([
                    {
                        x: width,
                        y: 0,
                    },
                    {
                        x: width,
                        y: height,
                    },
                    {
                        x: 0,
                        y: height,
                    },
                ])
            ) + " Z",
    };
});

// 使用 viewBox 将元素尺寸映射到 scale 后
runtime.listen(GlobalEvents.ZOOM, (arg) => {
    console.log(arg)
    scaleRef.value = arg;
});

function handleContext(event: Event) {
    runtime.trigger(GlobalEvents.CONTEXT_MENU_SHOW, {
        event,
        info: {
            type: ActorType.Canvas,
        },
    });
}

function selectGlobal() {
    if (runtime.globalState.value === GlobalState.IDLE) {
        actorsStore.select("");
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
