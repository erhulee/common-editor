<template>
    <div class=" bg-gray-100 h-full flex items-center justify-center" @click="selectGlobal">
        <div class=" bg-white page-a4 page relative" id="editor-canvas" :style="canvasStyle">
            <div v-for="item in actors">
                <actorRender v-bind="item"></actorRender>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useActorsStore } from '../../../store/actors';
import { useGlobalStore } from '../../../store/global';
import actorRender from '../components/actor-render.vue';

const actorsStore = useActorsStore();
const globalStore = useGlobalStore();
const actors = computed(() => actorsStore.actors);
const canvasStyle = computed(()=> globalStore.canvas_style)
const selectGlobal = ()=>{
    console.log("he")
    // actorsStore.select("");
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
</style>


