<template>
    <div class="font-semibold mb-3">画布</div>
    <div class=" flex justify-between text-sm mb-2">
        <span class="text-gray-600">尺寸</span>
        <span class=" text-gray-400">624 x 567mm</span>
    </div>
    <c-button class=" w-full" @click="changeSize">调整尺寸</c-button>

    <c-divider class=" my-3" ></c-divider>
 
    <div class="font-semibold flex justify-between mt-6">
        <span class=" py-1" > 背景色 </span>
        <color-picker v-model:pureColor="props.backgroundColor" @update:pureColor="handleChange"  />
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { ColorPicker } from "vue3-colorpicker";

import "vue3-colorpicker/style.css";
import { Runtime, SettingRouter } from "../../runtime";
const emit = defineEmits(["change"])
const runtime = inject("runtime") as Runtime;
const props = defineProps<{
    backgroundColor: string
}>()
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