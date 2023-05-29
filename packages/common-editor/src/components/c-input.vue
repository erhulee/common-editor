<template>
    <div class="flex items-center px-2
                w-full rounded-md border border-input bg-transparent
                border-gray-500
                text-sm
                disabled:cursor-not-allowed disabled:opacity-50" 
                :class="props.size == 'small' ? ' h-8' : 'h-10'">
        <slot></slot>
        <input  class="ml-2 text-sm   
            file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-muted-foreground 
            outline-none" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    size: "small" | "normal"
}>();



</script>

