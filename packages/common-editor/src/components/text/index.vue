<template>
    <div :style="style">{{ props.content }}</div>
</template>

<script setup lang="ts">
import { FontSetting } from '@/type/font-setting';
import { computed } from 'vue';

const props = defineProps<{
    content: string,
    id: string,
    options: Record<string, any> & {
        font: FontSetting
    }
}>();


const style = computed(() => {
    const entry = Object.entries(props.options.font);
    return entry.reduce<any>((pre, [key, value]) => {
        if (typeof value == "number") {
            pre[key] = value + "px"
        } else {
            pre[key] = value
        }
        return pre
    }, {
        whiteSpace: "nowrap"
    })
    
});
</script>