<template>
    <div class="font-semibold mb-3 flex items-center gap-2 ">
        <span class=" flex-1 flex-shrink-0 whitespace-nowrap" >基础信息</span>
        <input v-if="editing" 
            class="text-gray-700 font-light text-sm outline-none border-gray-200 border-solid border p-1" 
            style="min-width: 24px; text-align: right;"
            v-model="componentName" 
            ref="inputRef" />
        <span class=" text-gray-700 font-light text-sm pr-1 text-ellipsis overflow-hidden whitespace-nowrap" style="line-height: 30px;"  v-else @dblclick="handleDbClick" >{{ name }}</span>
         <CTooltip content="图层唤出">
            <span @click="runtime.trigger(GlobalEvents.LAYER_TREE_TOGGLE)">
                <MenuFold fill="#888" class="cursor-pointer"></MenuFold>
            </span>
        </CTooltip>
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
            <CButton type="text" @click="handleCopy">
                <Copy fill="#888" size="16"></Copy>
            </CButton>
        </CTooltip>
    </div>
    <div class=" my-2 mx-2">
        <CSlider
            :key="props.id"
            :outputFormatter="outputFormatter" 
            :min="0" :max="1" :step="0.01" 
            :value="props.opacity"
            @change="handleChange('opacity', $event)">
            <template #prefix>
                <Mosaic></Mosaic>
            </template>
        </CSlider>
    </div>
</template>

<script setup lang="ts">
import CButton from '@/components/c-button.vue';
import CSlider from '@/components/c-slider.vue';
import CTooltip from '@/components/c-tooltip.vue';
import { useActorsStore } from '@/store/actors';
import { BaseSetting } from '@/type/setting';
import { Lock, DeleteOne, Mosaic, FlipHorizontally, Copy, MenuFold } from "@icon-park/vue-next"
import { inject, ref, watch } from 'vue';
import { GlobalEvents, Runtime } from '../../runtime';
import { useClickOutside } from '@/hooks/useClickOutside';

const props = defineProps<Partial<BaseSetting & {
    id: string
}>>();

const emit = defineEmits(["change"]);
const runtime = inject('runtime') as Runtime;
const actorStore = useActorsStore();
const editing = ref(false);

const handleChange = (key: string, value: any) => emit("change", {path: key, value})
const componentName = ref(props.name);

watch(props, (value)=>{
    const name = value.name;
    componentName.value = name
})
const inputRef = ref<HTMLInputElement|null>(null);

useClickOutside(inputRef, ()=>{
    emit("change", {
        path: 'name',
        value: componentName.value
    })
    editing.value = false;

})
const outputFormatter = (value: number) => (value * 100).toFixed(0) + "%"
const handleDelete = actorStore.deleteCurrent
const handleCopy = () => actorStore.copy(actorStore.currentActor, 1)
const handleDbClick = () => editing.value = true;



</script>