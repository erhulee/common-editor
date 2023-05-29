<template>
    <div @click="$event => emit('click', $event)" 
        class="p-2 text-sm
        inline-flex justify-center items-center 
        rounded " 
        :class="className"
        >
        <slot name="icon"></slot>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
    const props = defineProps<{
        disable?: boolean
        circle?: boolean 
        type?: "default" | "text" | "primary"
    }>();
    const emit = defineEmits(["click"]);
    const className = computed(()=>{
        const result: string[] = [];
        if(props.disable) result.push("--disable");
        if(props.circle) result.push("rounded-full");
        if(props.type){
            result.push(props.type)
        }else{
            result.push("default")
        }
        return result
    })
</script>

<style scoped>
    .default{
        border: 1px solid #e8e8e8;
    }
    .default:hover{
        background: rgb(243, 244, 246)
    }
    .primary{
        background: #1E4DEB;
        color: white;
    }
    .primary:hover{
        background:#2758fb
    }
    .text{

    }
    .--disable{
        cursor: not-allowed;
    }
</style>