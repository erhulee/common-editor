<template>
    <SubSettingLayout title="调整尺寸">
        <div class=" flex justify-between items-center border-b border-gray-300 pb-4">
            <CNumberInput size="small"></CNumberInput>
            <Dot fill="#999" size="12" ></Dot>
            <CNumberInput size="small"></CNumberInput>
        </div>

        <div class=" mt-2">
            <ul class=" gap-1 flex flex-col">
                <li v-for="item, index in presetLists"
                    class=" py-2 px-4 flex items-center justify-between rounded-md hover:bg-slate-100 "
                    :class="index == activeIndex ? ' bg-slate-200' : ''">
                    <span>
                        <DoneAll fill="#14349E"></DoneAll>
                        <span class=" ml-4">{{ item.label }}</span>
                    </span>

                    <span class=" text-gray-400 font-light text-xs">{{ formatPresetValue(item.value) }}</span>
                </li>
            </ul>
        </div>
    </SubSettingLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SubSettingLayout from './sub-setting-layout.vue';
import { Dot, DoneAll } from "@icon-park/vue-next"
import CNumberInput from '@/components/c-number-input.vue';

const presetLists = [
    {
        label: "原尺寸",
        value: {
            width: 600,
            height: 700
        }
    },
    {
        label: "原尺寸",
        value: {
            width: 600,
            height: 700
        }
    },
    {
        label: "原尺寸",
        value: {
            width: 600,
            height: 700
        }
    },
    {
        label: "原尺寸",
        value: {
            width: 600,
            height: 700
        }
    },
    {
        label: "原尺寸",
        value: {
            width: 600,
            height: 700
        }
    },
    {
        label: "原尺寸",
        value: {
            width: 600,
            height: 700
        }
    },
]

function formatPresetValue(size: { width: number, height: number }) {
    return `${size.width} x ${size.height}`
}

const activeIndex = computed(() => 2)

</script>

<style>
.a {
    background: #000;
}
</style>