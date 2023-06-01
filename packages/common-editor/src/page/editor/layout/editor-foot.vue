<template>

    <div class=" bg-gray-100 pb-4 px-4 flex justify-end relative ">
        <Transition>
           <div class="bg-white absolute top-0 p-3 shadow-sm rounded-md panel" v-if="hotKeysVisible">
                <div class=" font-semibold text-zinc-700">
                    快捷键
                </div>
                <div>
                    <div v-for="{ label, value } in hootKeys" class=" w-60 flex justify-between items-center mt-2">
                        <div class=" text-sm">{{ label }}</div>
                        <div class=" bg-gray-200 text-neutral-500 p-2 rounded-md text-xs">{{ value }}</div>
                    </div>
                </div>
            </div>
        </Transition>
 
        <div @click="handleHotKeysClick" >
            <Help size="22" fill="#666" class="cursor-pointer">
            </Help>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Help } from "@icon-park/vue-next"
import { ref } from "vue";
const hotKeysVisible = ref(false);
const hootKeys = [
    {
        label: "移动",
        value: " ← ↑ → ↓ "
    },
    {
        label: "复制",
        value: "Ctrl + C"
    },
    {
        label: "粘贴",
        value: "Ctrl + V"
    },
    {
        label: "删除",
        value: "Delete/Backspace"
    },
    {
        label: "取消选中",
        value: "ESC"
    },
    {
        label: "撤回",
        value: "Ctrl + Z"
    }
]

function handleHotKeysClick(){
    hotKeysVisible.value = !hotKeysVisible.value
}
</script>

<style> 
.panel {
     transform: translateY(-105%)
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>