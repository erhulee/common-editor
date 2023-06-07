<template>
    <div class=" flex items-center justify-between p-2 relative">
        <div>
            <CButton class=" mr-2" @click="actorStore.undo()">
                <InvertLeft></InvertLeft>
            </CButton>
            <CButton>
                <InvertRight></InvertRight>
            </CButton>
        </div>

        <div class=" flex items-center">
            <!-- <Popover>
                <PopoverButton class=" outline-none">
                    <CategoryManagement></CategoryManagement>
                </PopoverButton>
                <PopoverPanel class="absolute z-10 bg-slate-400 w-64  h-full translate-y-full">
                    <div class="panel">
                        {{ actorStore.actors }}
                    </div>
                </PopoverPanel>
            </Popover> -->
            <!-- <div>   {{ actorStore.actors.map(i => i.id) }}</div> -->
            <c-button type="primary" class=" px-4" v-auth @click="handleSave" >
                保存
            </c-button>
       
            <c-button class=" px-4 mx-2" v-auth >
                分享
            </c-button>

            <CMenu>
                <template #trigger>
                    <c-avatar class=" mr-4" v-auth></c-avatar>
                </template>
                <template #content>
                    <div class=" bg-white shadow p-1 mt-1 flex flex-col rounded relative right-14 top-1">
                        <div class=" text-sm text-slate-800 hover:bg-slate-50 py-2 rounded px-2">退出登录</div>
                        <div class=" text-sm text-slate-800 hover:bg-slate-50 py-2 rounded px-2">返回团队空间</div>
                    </div>
                </template>
            </CMenu>
        </div>
    </div>
</template>

<script setup lang="ts">
import CButton from "@/components/c-button.vue";
import { InvertLeft, InvertRight } from "@icon-park/vue-next"
import { useActorsStore } from "@/store/actors"
import CMenu from "@/components/c-menu.vue";
import { save } from "@/api/project";
const actorStore = useActorsStore();

function handleSave(){
    save({
        projectId:"",
        elementJSON:""
    })
}
</script>

<style scoped>
.panel {
    background: #202752;
    border-left: 1px solid #eee;
    height: calc(100vh - 50px);
}
</style>