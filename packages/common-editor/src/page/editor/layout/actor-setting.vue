<template>
    <div class=" px-4 h-full pt-5">
        <template v-if="Boolean(actorStore.currentActorId)">
            <BaseInfoSetting v-bind="currentBaseSetting" @change="handleBaseInfoChange" />
            <template v-if="actorStore.currentActor?.tag == 'text'">
                <TextContentSetting :value="currentValueSetting" />
                <FontSetting v-bind="currentFontSetting" @change="handleFontChange" />
            </template>
            <template v-if="actorStore.currentActor?.tag == 'image'">
                <ImageSetting ></ImageSetting>
            </template>
        </template>
        <GlobalSetting :backgroundColor="canvasSetting.backgroundColor" v-else @change="handleGlobalChange"></GlobalSetting>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useActorsStore } from '@/store/actors';
import BaseInfoSetting from '../components/base-info-setting.vue';
import FontSetting from "../components/font-setting/index.vue"
import TextContentSetting from '../components/text-content-setting.vue';
import GlobalSetting from '../components/global-setting.vue';
import { useGlobalStore } from '@/store/global';
import ImageSetting from '../components/image-setting.vue';

const actorStore = useActorsStore();
const globalStore = useGlobalStore();
const currentFontSetting = computed(() => actorStore.currentActor?.options?.font || {});
const currentBaseSetting = computed(() => actorStore.currentActor?.options.base || {})
const currentValueSetting = computed(() => (actorStore.currentActor?.options.material));
const canvasSetting = computed(()=> globalStore.canvas_style);

function handleBaseInfoChange(payload: {
    path: string,
    value: any
}) {
    console.log(payload)
    const { path, value } = payload;
    actorStore.updateOption(["base", path], value)
}

function handleFontChange(payload: {
    path: string,
    value: any
}) {
    const { path, value } = payload;
    actorStore.updateOption(["font", path], value)
}


function handleGlobalChange(payload:{
    path: string,
    value: any
}){
    // console.log(payload)
    globalStore.updateCanvasOptions(payload.path, payload.value)
}



</script>

<style>

</style>