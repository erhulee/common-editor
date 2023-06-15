<template>
    <SubSettingLayout title="调整尺寸">
        <div class=" flex flex-col h-full" >
            <div class=" mx-2 flex justify-between items-center border-b border-gray-200 py-5">
                <CNumberInput size="small"></CNumberInput>
                <span class=" text-gray-400 mx-2" >x</span>
                <CNumberInput size="small"></CNumberInput>
            </div>

            <div class=" mt-4 flex-1">
                <ul class=" gap-1 flex flex-col">
                    <li v-for="item, index in presetLists"
                        class=" py-2 px-4 flex items-center justify-between rounded-md hover:bg-slate-100 "
                        :class="index == activeIndex ? ' bg-gray-100' : ''">
                        <span>

                            <DoneAll fill="#14349E" v-if="index == activeIndex"></DoneAll>
                            <span v-else class=" inline-block w-4 "></span>

                            <span class=" ml-4 text-sm">{{ item.label }}</span>
                        </span>
                        <span class=" text-gray-400 font-light text-xs">{{ formatPresetValue(item.value) }}</span>
                    </li>
                </ul>
            </div>

            <CButton type="primary" class=" w-full mt-8"> 新建尺寸预设</CButton>
        </div>

    </SubSettingLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SubSettingLayout from './sub-setting-layout.vue';
import { Dot, DoneAll } from "@icon-park/vue-next"
import CNumberInput from '@/components/c-number-input.vue';
import CButton from '@/components/c-button.vue';

const presetLists = [
    {
        label: "手机海报",
        value: {
            width: 1242,
            height: 2208
        }
    },
    {
        label: "公众号首图",
        value: {
            width: 900,
            height: 383
        }
    },
    {
        label: "公众号次图",
        value: {
            width: 500,
            height: 500
        }
    },
    {
        label: "商品主图",
        value: {
            width: 800,
            height: 800
        }
    },
    {
        label: "小程序封面",
        value: {
            width: 520,
            height: 416
        }
    },
    {
        label: "A4纸张",
        value: {
            width: 210,
            height: 297
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