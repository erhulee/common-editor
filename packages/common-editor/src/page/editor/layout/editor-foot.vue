<template>
    <div class="  py-2 px-4 flex justify-end items-center     absolute left-0 right-0 bottom-0 shadow">
        <div class="bg-white px-4 py-1 shadow rounded mr-3">
            <CSlider :outputFormatter="outputFormatter" :max="3" :min="0" :step="0.01"
                :value="globalStore.canvas_style.scale" @change="handleSliderChange">
            </CSlider>

        </div>
        <Transition>
            <div class="bg-white absolute top-0 p-3 shadow-md rounded-md panel" v-if="hotKeysVisible">
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
        <div @mouseenter="handleHotKeysClick" @mouseleave="handleHotKeysClick"
            class=" bg-white rounded-md shadow-md flex items-center justify-center p-1">
            <Help size="22" fill="#666" class=" cursor-help">
            </Help>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Help } from "@icon-park/vue-next"
import { onMounted, ref } from "vue";
import { useGlobalStore } from "@/store/global";
import CSlider from "@/components/c-slider.vue";

const globalStore = useGlobalStore();
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

onMounted(() => {
    document.addEventListener('wheel', function (event: WheelEvent) {
        event.preventDefault();
        const ctrlDown = event.ctrlKey;
        const wheelDeltaY = event.deltaY / 1000;
        if (ctrlDown) {
            if (globalStore.canvas_style.scale + wheelDeltaY >= 0.1) {
                globalStore.canvas_style.scale += wheelDeltaY;
            }
        }
    }, { capture: false, passive: false });
})
function handleHotKeysClick() {
    hotKeysVisible.value = !hotKeysVisible.value
}

function outputFormatter(value: number) {
    return (value * 100).toFixed(0) + "%"
}
function handleSliderChange(value: number) {
    globalStore.canvas_style.scale = value
}
</script>

<style> .panel {
     transform: translateY(-100%)
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