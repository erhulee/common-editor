<template>
    <div class=" bg-gray-100 rounded-lg hover:bg-gray-200 flex flex-col items-center justify-center "
        :class="isPureBlock ? 'p-2' : 'px-4 py-3'"
        @click="emit('click')"
        >
        <img :src="props.icon" v-if="props.icon">
        <div class=" mb-1"  v-if="$slots.icon" >
            <slot name="icon"></slot>
        </div>
        <div class=" text-xs text-gray-700" v-if="props.title">
            {{ props.title }}
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    icon?: string,
    title?: string
}>();

const slot = defineSlots();
console.log(slot)
const isPureBlock = computed(() => !Boolean(props.title && ( props.icon || slot.icon)))
const emit = defineEmits(["click"])

</script>