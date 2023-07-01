<template>
    <div class="m-2 rounded">
        <div v-for="item in layerList" class="layer-item flex items-center p-2 bg-gray-100 hover:bg-gray-200">
            <div class=" bg-white w-5 h-5 flex justify-center items-center rounded-md border-gray-100 shadow-sm " >
                <component :is="IconRenderMap[item.type]" size="12" fill="#aaa"></component>
            </div>
            <div class=" w-24 overflow-hidden text-ellipsis whitespace-nowrap mx-4 text-xs">{{ item.detail.name }}</div>
            <Eyes size="13" :stroke-width="2" class="eye-icon" ></Eyes>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useActorsStore } from '@/store/actors';
import { computed } from 'vue';
import { Round, Rectangle, Triangle, DiamondThree, Text, Eyes } from "@icon-park/vue-next"
const IconRenderMap = {
    "circle": Round,
    "rectangle": Rectangle,
    "triangle": Triangle,
    "diamond": DiamondThree,
    "text": Text
}
const actorStore = useActorsStore();
const layerList = computed(() => actorStore.actors.map(actor => ({
    id: actor.id,
    type: actor.tag as keyof typeof IconRenderMap,
    detail: actor.options.base
})))
</script>

<style>
    .layer-item:hover .eye-icon {
        display: initial;
        cursor: pointer;
        opacity: 1;
    }
    .eye-icon{
        opacity: 0;
        cursor: none;
    }
</style>