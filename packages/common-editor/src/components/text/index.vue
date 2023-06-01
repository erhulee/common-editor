<template>
    <div :style="style" class=" select-none" >{{ props.options.material.content }}</div>
</template>

<script setup lang="ts">
import { FontSetting } from '@/type/font-setting';
import { mapKeys } from 'lodash-es';
import { computed } from 'vue';

function transformKeys(value: Record<string, any>){
    return mapKeys(value, (_, key)=>key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())
}
const props = defineProps<{
    id: string,
    options: Record<string, any> & {
        material: {
            content: string
        }
        font: FontSetting
    }
}>();


const style = computed(() => {
    const entry = Object.entries(props.options.font);
    return transformKeys(entry.reduce<any>((pre, [key, value]) => {
        if (typeof value == "number") {
            pre[key] = value + "px"
        } else {
            pre[key] = value
        }
        return pre
    }, {
        whiteSpace: "nowrap"
    }))
});


</script>