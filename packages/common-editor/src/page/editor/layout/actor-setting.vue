<template>
    <div class=" px-4 h-full pt-5">
        <template v-if="Boolean(actorStore.currentActorId)">
            <BaseInfoSetting v-bind="currentBaseSetting" @change="handleBaseInfoChange" />
            <c-divider class=" mt-6"></c-divider>
            <template v-if="runtime.setting == 'text'">
                <TextContentSetting :value="currentValueSetting" />
                <FontSetting v-bind="currentFontSetting" @change="handleFontChange" />
            </template>
            <template v-if="runtime.setting == 'image'">
                <ImageSetting></ImageSetting>
            </template>
            <template v-if="runtime.setting == 'shape'">
                <ShapeSetting v-bind="currentShapeSetting" @change="handleShapeChange"></ShapeSetting>
            </template>
        </template>

        <template v-else>
             <template v-if="runtime.setting == SettingRouter.SIZE">
                <SizeSetting></SizeSetting>
            </template>
            <GlobalSetting :backgroundColor="canvasSetting.backgroundColor" v-else @change="handleGlobalChange"></GlobalSetting>
        </template>
       

    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useActorsStore } from '@/store/actors';
import { useGlobalStore } from '@/store/global';

import BaseInfoSetting from '../components/setting-viewer/base-info-setting.vue';
import FontSetting from "../components/setting-viewer/font-setting/index.vue"
import TextContentSetting from "../components/setting-viewer/font-setting/text-content-setting.vue"
import GlobalSetting from '../components/setting-viewer/global-setting.vue';
import ImageSetting from '../components/setting-viewer/image-setting.vue';
import { Runtime, SettingRouter } from '../runtime';
import SizeSetting from '../components/setting-viewer/size-setting.vue';
import ShapeSetting from '../components/setting-viewer/shape-setting.vue';

const runtime = inject("runtime") as Runtime;

const actorStore = useActorsStore();
const globalStore = useGlobalStore();
const currentFontSetting = computed(() => actorStore.currentActor?.options?.font || {});
const currentBaseSetting = computed(() => ({
    ... actorStore.currentActor?.options.base,
    id: actorStore.currentActor?.id
}) || {})
const currentValueSetting = computed(() => (actorStore.currentActor?.options.material));
const currentShapeSetting = computed(() => ({
    fill: {
        color: actorStore.currentActor?.options.fill?.color
    },
    stroke: {
        color: actorStore.currentActor?.options.stroke?.color,
        width: actorStore.currentActor?.options.stroke?.width
    },
    shape: {
        radius: actorStore.currentActor?.options.shape?.radius
    }
}))
const canvasSetting = computed(() => globalStore.canvas_style);

function handleBaseInfoChange(payload: {
    path: string,
    value: any
}) {
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

function handleShapeChange(payload: {
    path: string[],
    value: any
}) {
    actorStore.updateOption(payload.path, payload.value)
}

function handleGlobalChange(payload: {
    path: string,
    value: any
}) {
    globalStore.updateCanvasOptions(payload.path, payload.value)
}



</script>

<style></style>