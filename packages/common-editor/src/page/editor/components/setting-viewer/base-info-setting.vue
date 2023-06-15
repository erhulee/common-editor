<template>
    <div class="font-semibold mb-3 ">
        基础信息
    </div>
    <div class=" flex flex-row justify-start gap-3">
        <CTooltip content="锁定" class=" inline-block">
            <CButton type="text" :class="props.isLocked && ' bg-gray-200'"
                @click="() => handleChange('isLocked', !props.isLocked)">
                <Lock fill="#888" size="16"></Lock>
            </CButton>
        </CTooltip>
        <CTooltip content="删除" class=" inline-block">
            <CButton type="text" class="" @click="handleDelete">
                <DeleteOne fill="#888" size="16"></DeleteOne>
            </CButton>
        </CTooltip>
        <CTooltip content="翻转" class=" inline-block">
            <CButton type="text" class=" " @click="handleDelete">
                <FlipHorizontally fill="#888" size="16"></FlipHorizontally>
            </CButton>
        </CTooltip>
        <CTooltip content="复制" class=" inline-block">
            <CButton type="text" class=" " @click="handleDelete">
                <Copy fill="#888" size="16"></Copy>
            </CButton>
        </CTooltip>
    </div>
    <div class=" my-2 mx-2">
        <c-slider :outputFormatter="outputFormatter" :min="0" :max="1" :step="0.01" :value="props.opacity"
            @change="handleChange('opacity', $event)">
            <template #prefix>
                <Mosaic></Mosaic>
            </template>
        </c-slider>
    </div>
</template>

<script setup lang="ts">
import CButton from '@/components/c-button.vue';
import CTooltip from '@/components/c-tooltip.vue';
import { useActorsStore } from '@/store/actors';
import { BaseSetting } from '@/type/setting';
import { Lock, DeleteOne, Mosaic, FlipHorizontally, Copy } from "@icon-park/vue-next"


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