<template>
    <div class=" px-4 h-full pt-5" >
        <BaseInfoSetting 
            v-bind="currentBaseSetting" 
            @change="handleBaseInfoChange" />

        <TextContentSetting :value="currentValueSetting"></TextContentSetting>
        <div class=" font-semibold my-3 " >文字</div>
        <FontSetting 
            v-bind="currentFontSetting" 
            @change="handleFontChange">
        </FontSetting>

        
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useActorsStore } from '@/store/actors';
import FontSetting from '../../../components/font-setting/font-setting.vue';
import BaseInfoSetting from '../components/base-info-setting.vue';
import TextContentSetting from '../components/text-content-setting.vue';


const actorStore = useActorsStore();
const currentFontSetting = computed(()=> actorStore.currentActor?.options?.font || {});
const currentBaseSetting = computed(()=> actorStore.currentActor?.options.base || {})
const currentValueSetting = computed(()=> (actorStore.currentActor?.options.material));



function handleFontChange(payload:{
    path: string, 
    value: any
}){
    const {path, value} = payload;
    actorStore.updateOption(["font", path], value)
}

function handleBaseInfoChange(payload: {
    path: string,
    value: any
}) {
    const { path, value } = payload;
    actorStore.updateOption(["base", path], value)
    console.log(path, value)
}

</script>

<style>
   
</style>