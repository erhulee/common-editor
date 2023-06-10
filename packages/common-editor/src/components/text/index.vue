<template>
    <div 
        v-if="!isEdit"
        @dblclick="handleClick" 
        :style="style" 
        class=" select-none cursor-text h-full" 
        draggable="false" 
    >
        {{ props.options.material.content }}
    </div>
    <input v-else
        ref="inputRef"
        :value="props.options.material.content"
        :style="style" 
        @blur="handleBlur"
        @input="handleChange"
        class=" w-full p-0 bg-transparent focus-visible:outline-none"
        />
</template>

<script setup lang="ts">
import { FontSetting } from '@/type/font-setting';
import { mapKeys } from 'lodash-es';
import { computed, nextTick, ref } from 'vue';

const isEdit = ref(false)
const inputRef = ref<HTMLElement | null>(null)
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

const emit = defineEmits(["change"]);
function handleClick(){
    isEdit.value = true
    nextTick(()=>{
    inputRef.value?.focus()

    })
}
function handleBlur(){
    isEdit.value = false
}
function handleChange(e:any){
    emit("change", {
        path: ["material", "content"],
        value: e.target.value
    })
}


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