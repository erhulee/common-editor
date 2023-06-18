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
                <div class="canvas" >
                    <editorCanvas />
                </div>
                <EditorFoot></EditorFoot>
            </div>
            <div class="right  border-l">
                <actor-setting />
            </div>
        </div>

        <div
            v-show="showContextMenu" 
            class=" shadow-lg w-48  bg-white rounded  fixed p-1" 
            ref="contextMenuRef" 
            @blur="handleBlur"
            @contextmenu="($event)=>$event.preventDefault()">
            <div v-for="{label, suffix, value} in contextMenuItems" 
                @click="contextMenuResponse(value)"
                class="menu-item p-2 flex justify-between items-center hover:bg-slate-50" >
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
import { FolderClose, AddFour } from "@icon-park/vue-next"
import elementShop from './layout/element-shop.vue';
import editorCanvas from './layout/editor-canvas.vue';
import ActorSetting from './layout/actor-setting.vue';
import MaterialShop from './layout/material-shop.vue';
import toolKitVue from "./layout/tool-kit.vue"
import EditorFoot from './layout/editor-foot.vue';
import { computed,inject,provide, ref } from 'vue';
import { useActorsStore } from '@/store/actors';
import initHotKey, { copyComponent, pasteComponent } from "../../plugins/hootkeys"
import Login from './layout/modals/login.vue';
import { GlobalEvents, Runtime } from './runtime';
import MaterialUpload from './layout/modals/material-upload.vue';
initHotKey();
const showContextMenu = ref(false);
const contextMenuRef = ref<HTMLElement | null>(null);
const contextCache = new Map();
const actorStore = useActorsStore();
const contextRole = ref<"canvas"|"actor">("canvas");
const runtime = inject("runtime") as Runtime
const contextMenuItems = computed(()=> [
    { label: "复制", suffix: "Ctrl + C", value: 1 },
    { label: "粘贴", suffix: "Ctrl + V", value: 2 },
    { label: "删除", suffix: "Del", value: 3 },
].filter(({value})=> contextRole.value == "actor" || value == 2))
const contextMenuResponse = (key: number) =>{
    switch(key){
        case 1:
            copyComponent(actorStore);
            break
        case 2:
            pasteComponent(actorStore);
            break;
        case 3:
            actorStore.delete(contextCache.get("currentId"));
            break;
    }
    handleBlur()
}
function clickOuterListener(event: Event){
    const targetClassName = (event.target as any).className as string;
    const isMenuItem = targetClassName.includes("menu-item");
    if(!isMenuItem){
        handleBlur()
    }
}

provide("display_context", (event: PointerEvent, payload: {
    type: "canvas" | "actor"
    componentId: string,
}) => {
    const { type = "canvas"} = payload;
    contextRole.value = type;
    const positionX = event.clientX;
    const positionY = event.clientY;
    event.preventDefault();
    contextMenuRef.value!.style.top = positionY + "px";
    contextMenuRef.value!.style.left = positionX + "px";
    contextMenuRef.value?.focus();
    showContextMenu.value = true;
    const currentId = payload.componentId;
    contextCache.set("currentId", currentId);
    document.addEventListener("mousedown", clickOuterListener);
})

// html2canvas 
runtime.listen(GlobalEvents.SAVING_STATUS_CHANGE, (status: "editing" | "saving") => {
   runtime.globalStateChange(status)
})


const handleBlur = ()=>{
    showContextMenu.value = false;
    document.removeEventListener("mousedown", clickOuterListener);
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

.canvas{
    overflow: scroll;
    height: 100%;
    padding-top: 150px;
    background-color: #f1f1f1;
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

::-webkit-scrollbar-corner{
   background-color: #f1f1f1;
}

</style>