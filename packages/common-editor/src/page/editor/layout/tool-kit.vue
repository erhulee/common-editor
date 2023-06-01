<template>
    <div class=" flex items-center justify-between p-2 relative">
        <div>
            <CButton class=" mr-2" 
            @click="actorStore.undo()">
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
            <c-button type="primary" class=" px-4 ml-4">
                保存
            </c-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import CButton from "@/components/c-button.vue";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { CategoryManagement, InvertLeft, InvertRight } from "@icon-park/vue-next"
import { useActorsStore } from "@/store/actors"
const actorStore = useActorsStore();

</script>

<style scoped>
.panel {
    background: #202752;
    border-left: 1px solid #eee;
    height: calc(100vh - 50px);
}
</style>