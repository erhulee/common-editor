<template>
    <img 
        :src="props.options.material.src" 
        draggable="false"
        class="x-image select-none" />
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string,
    options: {
        material:{
            src: string
        }
    }
}>()

</script>

<style scoped>
.x-image{
    width: 100%;
    height: 100%;
}
</style>