<template>
    <div class="font-semibold mb-3 ">
        基础信息
    </div>
    <div>
        <CButton type="text" :class="props.isLocked && ' bg-gray-200'"
            @click="() => handleChange('isLocked', !props.isLocked)">
            <Lock fill="#888" size="16"></Lock>
        </CButton>
        <CButton type="text" class=" ml-2" @click="handleDelete">
            <Delete fill="#888" size="16"></Delete>
        </CButton>

    </div>
    <div class=" my-2 mx-4" >
        <c-slider :outputFormatter="outputFormatter" :min="0" :max="1" :step="0.01" :value="props.opacity"
            @change="handleChange('opacity', $event)"
        >
            <template #prefix>
                <Mosaic></Mosaic>
            </template>
        </c-slider>
    </div>
</template>

<script setup lang="ts">
import CButton from '@/components/c-button.vue';
import { useActorsStore } from '@/store/actors';
import { BaseSetting } from '@/type/font-setting';
import { Lock, Delete, Mosaic } from "@icon-park/vue-next"


function outputFormatter(value: number) {
    return (value * 100).toFixed(0) + "%"
}

const props = defineProps<Partial<BaseSetting>>();
const emit = defineEmits(["change"]);
const actorStore = useActorsStore();


function handleChange(key: string, value: any) {
    emit("change", {
        path: key,
        value
    })
}

function handleDelete() {
    actorStore.deleteCurrent()
}

</script>