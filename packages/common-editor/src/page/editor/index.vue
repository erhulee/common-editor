<template>
    <div class="flex w-full h-full flex-col page">

        <div class="main">
            <div class="left  border-r">
                <TabGroup vertical class=" h-full">
                    <div class=" flex flex-row">
                        <TabList class=" flex flex-col p-2 border-r border-r-gray-200 w-20 text-gray-600">
                            <Tab v-slot="{ selected }" class="focus-visible:border-none focus-visible:outline-none">
                                <div class="p-2 rounded-md text-2xl flex-col flex items-center justify-center"
                                    :class="selected ? ' bg-gray-100' : ''">
                                    <AddFour :stroke-width="2"></AddFour>
                                    <div class=" text-xs mt-1 ">添加</div>
                                </div>
                            </Tab>
                            <Tab v-slot="{ selected }" class="focus-visible:border-none focus-visible:outline-none mt-2">
                                <div class="p-2 rounded-md text-2xl flex-col flex items-center justify-center"
                                    :class="selected ? ' bg-gray-100' : ''">
                                    <FolderClose :stroke-width="2"></FolderClose>
                                    <div class=" text-xs mt-1 ">素材</div>
                                </div>
                            </Tab>
                        </TabList>
                        <KeepAlive>
                            <TabPanels class=" flex-1">
                                <TabPanel class=" p-3">
                                    <element-shop />
                                </TabPanel>
                                <TabPanel class=" p-3 h-full">
                                    <MaterialShop></MaterialShop>
                                </TabPanel>
                            </TabPanels>
                        </KeepAlive>
                    </div>
                </TabGroup>
            </div>
            <div class="middle">
                <toolKitVue></toolKitVue>
                <div class="worker-shop-wrapper">
                    <editorCanvas />
                    <div class="actor-tree-wrapper" v-if="actorTreeDisplay">
                        <ActorTree></ActorTree>
                    </div>
                </div>
                <EditorFoot></EditorFoot>
            </div>
            <div class="right  border-l">
                <actor-setting />
            </div>
        </div>

        <div v-show="contextMenu.display" class=" shadow-lg w-48  bg-white rounded  fixed p-1" ref="contextMenuRef"
            @contextmenu="($event) => $event.preventDefault()">
            <div v-for="{ label, suffix, value } in contextMenuItems" @click="contextMenuResponse(value)"
                class="menu-item p-2 flex justify-between items-center hover:bg-slate-50">
                <span class=" text-sm">{{ label }}</span>
                <span class=" text-xs text-gray-500  inline-flex items-center px-2 rounded">{{ suffix }}</span>
            </div>
        </div>

        <Login></Login>
        <MaterialUpload></MaterialUpload>

    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { computed, inject, ref } from 'vue';

import { FolderClose, AddFour } from "@icon-park/vue-next"
import elementShop from './layout/element-shop.vue';
import editorCanvas from './layout/editor-canvas.vue';
import ActorSetting from './layout/actor-setting.vue';
import MaterialShop from './layout/material-shop.vue';
import toolKitVue from "./layout/tool-kit.vue"
import EditorFoot from './layout/editor-foot.vue';
import Login from './layout/modals/login.vue';

import { useActorsStore } from '@/store/actors';
import { GlobalEvents, Runtime } from './runtime';
import MaterialUpload from './layout/modals/material-upload.vue';
import { ActorType, preLoad } from './preLoad';
import ActorTree from './layout/actor-tree.vue';
import { useGlobalStore } from '@/store/global';

const runtime = inject("runtime") as Runtime
const contextMenuRef = ref<HTMLElement | null>(null);
const actorTreeDisplay = ref<boolean>(false);
const actorStore = useActorsStore();
const globalStore = useGlobalStore();
const { contextMenu, hotkeyCallback } = preLoad(runtime, contextMenuRef)
const contextMenuItems = computed(() => [
    { label: "复制", suffix: "Ctrl + C", value: 1, role: [ActorType.Actor] },
    { label: "粘贴", suffix: "Ctrl + V", value: 2, role: [ActorType.Canvas, ActorType.Actor] },
    { label: "向上一层", suffix: "Ctrl + ↑", value: 4, role: [ActorType.Actor] },
    { label: "向下一层", suffix: "Ctrl + ↓", value: 5, role: [ActorType.Actor] },
    { label: "删除", suffix: "Del", value: 3, role: [ActorType.Actor] },
    { label: "画布还原", suffix: "", value: 6, role: [ActorType.Actor, ActorType.Canvas] }
].filter(item => item.role.includes(contextMenu.actorType)))

runtime.listen(GlobalEvents.LAYER_TREE_TOGGLE, () => actorTreeDisplay.value = !actorTreeDisplay.value)

const contextMenuResponse = (key: number) => {
    switch (key) {
        case 1:
            hotkeyCallback.copyComponent(actorStore);
            break
        case 2:
            hotkeyCallback.pasteComponent(actorStore);
            break;
        case 3:
            actorStore.delete(contextMenu.currentId);
            break;
        case 4:
            actorStore.layerUp(contextMenu.currentId)
            break;
        case 5:
            actorStore.layerDown(contextMenu.currentId)
            break;
        case 6:
            globalStore.canvas_style.top = 0;
            globalStore.canvas_style.left = 0;
            break;
    }
    runtime.trigger(GlobalEvents.CONTEXT_MENU_HIDE, {})
}






</script>

<style scoped>
.page {
    height: 100vh;
}

.main {
    flex: 1;
    display: flex;
}

.left {
    width: 380px;
}

.middle {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    position: relative;
    height: 100vh;
}

.worker-shop-wrapper {
    /* overflow: scroll;
    padding-top: 150px;*/
    position: relative;
    height: 100%;
    background-color: #f1f1f1;
    display: flex;
}

.actor-tree-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f9f9f9;
    border-left: 1px solid #dedddd;
    z-index: 0;
}

.right {
    width: 300px;
}

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: #c2c2c2;
    border-radius: 10px;
}

::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}

::-webkit-scrollbar-corner {
    background-color: #f1f1f1;
}
</style>