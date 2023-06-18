<template>
    <div class="font-semibold mb-3">画布</div>
    <div class=" flex justify-between text-sm mb-2">
        <span class="text-gray-600">尺寸</span>
        <span class=" text-gray-400 center">{{ size }}</span>
    </div>
    <c-button class=" w-full" @click="changeSize">调整尺寸</c-button>

    <c-divider class=" my-3" ></c-divider>
 
    <div class="font-semibold flex justify-between mt-6">
        <span class=" py-1" > 背景色 </span>
        <color-picker v-model:pureColor="props.backgroundColor" @update:pureColor="handleChange"  />
    </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { ColorPicker } from "vue3-colorpicker";
import { Runtime, SettingRouter } from "../../runtime";
import { useGlobalStore } from "@/store/global";

import "vue3-colorpicker/style.css";

const emit = defineEmits(["change"])
const globalStore = useGlobalStore();
const runtime = inject("runtime") as Runtime;
const props = defineProps<{
    backgroundColor: string
}>()
const size = computed(()=>{
    return `${globalStore.canvas_style.width} x ${globalStore.canvas_style.height}`
})
function handleChange(value:any) {
    emit("change", {
        path: "backgroundColor",
        value,
    })
}
function changeSize(){
    runtime.settingRouterPush(SettingRouter.SIZE)
}
</script>

<style scoped>
:deep(.vc-color-wrap){
    height: initial !important;
    margin: 3px;
    border-radius: 5px;
    border: #ddd 1px solid;
}
</style>