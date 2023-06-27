<template>
    <div class="flex flex-col h-full" >
        <c-input size="small" class=" mb-2">
            <Search fill="#aaa" />
        </c-input>
        <div class="gap-3 columns-2 mt-2 flex-1">
            <img v-for="item in image_template" :src="item.material.src" class="rounded mb-2" @click="handleClick(item)" />
        </div>

        <c-button class="w-full flex items-center justify-center" type="primary" @click="runtime.trigger(GlobalEvents.MATERIAL_MANAGER_SHOW)">
            <template #icon>
                <Upload />
            </template>
            上传素材
        </c-button>
    </div>
</template>

<script setup lang="ts">
import CInput from '@/components/c-input.vue';
import { useActorsStore } from '@/store/actors';
import { Search, Upload } from "@icon-park/vue-next"
import { computed, inject, onMounted, ref } from 'vue';
import { Runtime, GlobalEvents } from '../runtime';
import { getMaterial } from '@/api/material';
const actorsStore = useActorsStore();
const runtime = inject("runtime") as Runtime;

function handleClick(option: {
    material: {
        src: string
    },
    base: {
        top: number,
        left: number,
        isLocked: boolean,
        width: number,
        height: number
    }
}) {
    actorsStore.add("image", option)
}

onMounted( async ()=>{
 const { data} = await getMaterial()
    image_list.value = data
})

const image_list = ref<Array<{
    id: number;
    address: string;
}>>([])
const image_template = computed(()=>{
    return image_list.value.map(item => ({
        material:{
            src: item.address
        },
        base: {
                top: 100,
                left: 100,
                width: 200,
                height: 100,
                isLocked: false,
                opacity: 0.5
        }
    }))
})
</script>