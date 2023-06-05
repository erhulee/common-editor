<template>
    <div class=" h-full flex items-center justify-center" 
        @contextmenu="handleContext"
        @click="selectGlobal">
  
        <div class=" bg-white page-a4 page relative canvas" 
            id="editor-canvas" :style="canvasStyle">
            <div v-for="item in actors">
                <actorRender v-bind="item"></actorRender>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, reactive } from 'vue';
import { useActorsStore } from '../../../store/actors';
import { useGlobalStore } from '../../../store/global';
import actorRender from '../components/actor-render.vue';

const actorsStore = useActorsStore();
const globalStore = useGlobalStore();
const actors = computed(() => actorsStore.actors);
const canvasStyle = computed(()=> globalStore.canvas_style)
const zoomListener = inject("listener") as (eventName: string, ...args:any[]) => void;

const pointPosition = reactive({
    x: 0,
    y: 0
})

onMounted(()=>{
    document.addEventListener("click", (event) => {
        pointPosition.x = event.clientX
        pointPosition.y = event.clientY
    })

})



zoomListener("zoom", (arg)=>{
    const canvas = document.getElementById("editor-canvas");
    if(canvas == null) return;
    canvas.style.transform = `scale(${arg})`
})
const selectGlobal = ()=>{
    // actorsStore.select("");
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
    box-shadow: 10px 10px 20px rgb(227, 227, 227);
}

.page-a4 {
    overflow: hidden;
    width: 600px;
    height: 1000px;
}

.canvas{
    transform: scale(0.7);
}
</style>


