<template>
    <div class="flex items-center px-2
                w-full rounded-md border border-input
                border-gray-200
                bg-gray-100
                text-sm
                disabled:cursor-not-allowed disabled:opacity-50" 
                :class="props.size == 'small' ? ' h-8' : 'h-10'">
        <slot></slot>
        <input :value="props.value" @change="handleChange" @input="handleChange"  class="ml-2 text-sm  
        bg-gray-100 
            file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-muted-foreground 
            outline-none" />
    </div>
</template>

<script  lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent(
    {
        name: "c-input",
        emits:["change"],
        props: {
            size: {
                type: String as PropType<'small' | 'large'>,
                default: 'small',
            },
            value: {
                type: String,
                default: ""
            }
        },
        setup(props, ctx) {
            function handleChange(event: Event){
                const value = (event.target as any) .value;
                ctx.emit("change", value)
            }
            return {
                handleChange,
                props,
            }
        }
    }
)
</script>

