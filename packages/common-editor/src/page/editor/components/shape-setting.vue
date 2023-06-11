<template>
    <div class=" font-semibold mb-3 mt-8">图形</div>
    <div class=" flex justify-between text-sm mb-2">
        <span class="text-gray-600 w-16">圆角</span>
        <c-slider class=" flex-1" :value="props.shape.radius"  @change="handleChange(['shape', 'radius'], $event)"  ></c-slider>
    </div>

    <c-divider class=" my-8 w-11/12 m-auto"></c-divider>
    <div class=" font-semibold mb-3">填充</div>
    <div class=" flex justify-between text-sm mb-2 h-8 items-center">
        <span class="text-gray-600">颜色</span>
        <color-picker v-model:pureColor="props.fill.color" @pureColorChange="handleChange(['fill', 'color'], $event)"/>
    </div>
    <c-divider class=" my-8  w-11/12 m-auto"></c-divider>
    <div class=" font-semibold mb-3">描边</div>
    <div class=" flex justify-between text-sm mb-4 h-8 items-center">
        <span class="text-gray-600 w-16">颜色</span>
        <color-picker  v-model:pureColor="props.stroke.color" @pureColorChange="handleChange(['stroke', 'color'], $event)"  />
    </div>
    <div class=" flex justify-between text-sm mb-2">
        <span class="text-gray-600 w-16">粗细</span>
        <c-slider class="flex-1" :value="props.stroke.width"  @change="handleChange(['stroke', 'width'], $event)" ></c-slider>
    </div>
</template>

<script setup lang="ts">
import { FillSetting, ShapeSetting, StrokeSetting } from '@/type/setting';
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

type Props = {
    fill: FillSetting,
    stroke: StrokeSetting,
    shape: ShapeSetting
}
const props = defineProps<Props>();
const emit = defineEmits(["change"]);

function handleChange(key: [keyof Props, string], value: number | string) {
    emit("change", {
        path: key,
        value
    })
}


</script>

<style scoped>

:deep(.vc-color-wrap){
    margin: 3px;
    border-radius: 5px;
}
</style>