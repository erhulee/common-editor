<template>
    <Popover class="relative" v-slot="{ open }">
        <PopoverButton >
            <div @mouseenter="()=>console.log(open)">
                <slot></slot>

            </div>
        </PopoverButton>

        <PopoverPanel class="absolute z-10">
            <div>{{ props.content }}</div>
        </PopoverPanel>
    </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
const props = defineProps<{
    content: string
}>();

</script>