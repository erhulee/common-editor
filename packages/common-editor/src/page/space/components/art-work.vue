<template>
    <div>
        <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" class=" relative rounded-lg overflow-hidden">
            <div class=" w-48 h-48 bg-gray-100  p-5">
                <img class=" w-full h-full outline-none border-none rounded-lg" :src="defaultImage" alt="">
            </div>
            <div class="mask" v-if="showHover">
                <c-button class=" px-4 absolute bottom-2 left-2 right-2 ">
                    <span class=" text-xs" >
                        编辑
                    </span>
                </c-button>
            </div>
        </div>

        <div class=" text-center text-gray-600 text-sm mt-2 w-48 text-ellipsis overflow-hidden whitespace-nowrap">
            4270561974175799/url?repository_id=14296012
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import defaultImage from "./default-image.webp"
const showHover = ref(false)
function handleMouseEnter() {
    showHover.value = true
}
function handleMouseLeave(){
      showHover.value = false
}
</script>

<style scoped>
.mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(0, 0, 0, 0.236);
}
</style>