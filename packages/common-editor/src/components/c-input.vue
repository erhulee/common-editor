<template>
    <div class=" ">
        <div v-if="props.label" class=" text-sm font-medium mb-2" >{{ props.label }}</div>
        <div tabindex="0" class="
                        flex items-center
                        w-full rounded-md 
                        border border-solid 
                        text-sm px-2
                        ring-offset-background 
                        focus-within:outline-none 
                        focus-within:ring-2 
                        focus-within:ring-gray-400
                        focus-within:ring-ring 
                        focus-within:ring-offset-2 
                        disabled:cursor-not-allowed 
                        disabled:opacity-50" 
            >
            <slot></slot>
            <input 
                :value="props.modelValue || props['onUpdate:modelValue']" 
                @change="handleChange" 
                @input="handleChange" 
                class=" text-sm 
                    flex-1 h-10 py-2 pl-2
                    file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    placeholder:text-muted-foreground 
                    outline-none rounded-md
                    placeholder:text-muted-foreground 
                    disabled:cursor-not-allowed 
                    disabled:opacity-50"
                :class="props.size == 'small' ? 'h-8' : 'h-10'"/>
        </div>
    </div>
</template>

<script  lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent(
    {
        name: "c-input",
        emits: ["change", "update:modelValue"],
        props: {
            size: {
                type: String as PropType<'small' | 'large'>,
                default: 'small',
            },
            value: {
                type: String,
                default: ""
            },
            modelValue:{
                type: String,
                default: ""
            },
            label: {
                type: String,
            }
        },
        setup(props, ctx) {
            function handleChange(event: Event) {
                const value = (event.target as any).value;
                ctx.emit("change", value)
                console.log("@!3213")
                ctx.emit("update:modelValue", value)
            }
        
            return {
                handleChange,
                props,
            }
        }
    }
)
</script>

