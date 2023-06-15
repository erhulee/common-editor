<template>
    <div class=" h-full flex flex-col pb-4" >
        <div class=" border-b border-gray-200 pb-4" >
            <Left @click="goBack" class=" cursor-pointer"  ></Left>
            <span class="text-base ml-4 font-semibold text-gray-700" >{{ props.title }}</span>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

import { Left } from "@icon-park/vue-next"
import { inject } from "vue";
import { Runtime } from "../../runtime";
const props = defineProps<{
    title: string
}>()

const runtime = inject("runtime") as Runtime;
function goBack(){
    runtime.settingRouterBack()
}
</script>