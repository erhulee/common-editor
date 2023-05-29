<template>
    <div class=" px-4 h-full pt-5" >
        <BaseInfoSetting 
            v-bind="currentBaseSetting" 
            @change="handleBaseInfoChange" />
        <div class=" font-semibold my-3 " >文字</div>
        <FontSetting 
            v-bind="currentFontSetting" 
            @change="handleFontChange"></FontSetting>
    </div>
</template>

<script setup lang="ts">
import { useActorsStore } from '@/store/actors';
import FontSetting from '../../../components/font-setting/font-setting.vue';
import { computed } from 'vue';
import BaseInfoSetting from '../components/base-info-setting.vue';
const actorStore = useActorsStore();
const currentFontSetting = computed(()=>{
   return actorStore.currentActor?.options?.font || {}
});

const currentBaseSetting = computed(()=> actorStore.currentActor?.options.base || {})

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