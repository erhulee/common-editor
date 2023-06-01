<template>
    <div class="flex w-full h-full flex-col page">
        <div class="header" >
            <editorHeader></editorHeader>
        </div>
        <div class="main" >
            <div class="left  border-r">
                <TabGroup vertical class=" h-full">
                    <div class=" flex flex-row">
                        <TabList class=" flex flex-col p-2 border-r border-r-gray-200 w-20 text-gray-600">
                            <Tab v-slot="{ selected }" class="focus-visible:border-none focus-visible:outline-none" >
                                <div class="p-2 rounded-md text-2xl flex-col flex items-center justify-center"
                                    :class="selected ? ' bg-gray-100' : ''">
                                    <AddFour></AddFour>
                                    <div class=" text-xs mt-1 font-semibold">添加</div>
                                </div>
                            </Tab>
                            <Tab v-slot="{ selected }" class="focus-visible:border-none focus-visible:outline-none" >
                                <div class="p-2 rounded-md text-2xl flex-col flex items-center justify-center"
                                    :class="selected ? ' bg-gray-100' : ''">
                                    <FolderClose></FolderClose>
                                    <div class=" text-xs mt-1 font-semibold">素材</div>
                                </div>
                            </Tab>
                        </TabList>
                        <TabPanels class=" flex-1">
                            <TabPanel class=" p-3">
                                <element-shop />
                            </TabPanel>
                            <TabPanel class=" p-3 h-full">
                                <MaterialShop></MaterialShop>
                            </TabPanel>
                        </TabPanels>
                    </div>
                </TabGroup>
            </div>
            <div class="middle">
                <toolKitVue></toolKitVue>
                <editorCanvas />
                <EditorFoot></EditorFoot>
            </div>
            <div class="right  border-l">
                <actor-setting />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { FolderClose, AddFour } from "@icon-park/vue-next"
import elementShop from './layout/element-shop.vue';
import editorCanvas from './layout/editor-canvas.vue';
import ActorSetting from './layout/actor-setting.vue';
import MaterialShop from './layout/material-shop.vue';
import editorHeader from "./layout/editor-header.vue"
import toolKitVue from "./layout/tool-kit.vue"
import EditorFoot from './layout/editor-foot.vue';
</script>

<style scoped>
.page{
    height: 100vh;
}
.main{
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
}
.right {
    width: 300px;
}
</style>