<template>
    <canvas v-bind="canvasProps" id="common-canvas">

    </canvas>
</template>

<script setup lang="ts">
import { computed } from "vue"
import useFabric from "@/fabric-sdk/useFabric"
const props = defineProps<{
    width: number,
    height: number
}>();

const fabricController = useFabric("common-canvas");
const canvasProps = computed(() => {
    const { width, height } = props
    return {
        width: 600,
        height: 1000
    }
})
</script>