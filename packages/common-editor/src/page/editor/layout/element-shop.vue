<template>
    <div>
        <div class=" font-semibold text-sm mb-3">
            文字
        </div>
        <div class=" grid grid-cols-3 gap-2">
            <Block v-for="item in text_template" @click="() => addTextActor(item.default_options)" :title="item.name">
                <template #icon>
                    <component :stroke-width="2" :is="item.icon" :size="25"></component>
                </template>
            </Block>
        </div>

        <div class=" font-semibold text-sm my-3 mt-6">
            形状
        </div>
        <div class=" grid grid-cols-3 gap-2">
            <Block v-for="item in shape_template" @click="() => addShape(item.tag, item.default_options)" :title="item.name">
                <template #icon>
                    <component :stroke-width="2" :is="item.icon" :size="20"></component>
                </template>
            </Block>
        </div>

    </div>
</template>

<script setup lang="ts">
import Block from '@/components/block.vue';
import { useActorsStore } from "@/store/actors"
import { shape_template, text_template } from "./element-template"
import { cloneDeep } from 'lodash-es';
const actorsStore = useActorsStore();

function addShape(type:string, option:any){
    actorsStore.add(type,
        {
            ... cloneDeep(option)
        }
    )
}
function addTextActor(option: any) {
    const content = option.content;
    const font = option.font;
    const base = option.base;
    actorsStore.add("text",
        {
            material: {
                content
            },
            font,
            base
        }
    )
}


</script>