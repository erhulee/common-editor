<template>
    <div @click="handleClick" class="p-2 text-sm
            inline-flex justify-center items-center 
            rounded " :class="className">
        <slot name="icon"></slot>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
export default defineComponent({
    name:"c-button",
    props:{
        disable: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        type:{
            type: String  as PropType<"default" | "text" | "primary">,
        }
    },
    emits:["click"],
    setup(props, ctx){
        const className = computed(() => {
            const result: string[] = [];
            if (props.disable) result.push("--disable");
            if (props.circle) result.push("rounded-full");
            if (props.type) {
                result.push(props.type)
            } else {
                result.push("default")
            }
            return result
        });
        const handleClick = ($event:any)=>{
            ctx.emit("click", $event)
        }

        return {
            handleClick,
            className
        }
    }
})


</script>

<style scoped>
.default {
    background: #F3F4F6;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
}

.default:hover {
    background: rgb(243, 244, 246)
}

.primary {
    background: #1E4DEB;
    color: white;
}

.primary:hover {
    background: #2758fb
}

.text {}

.--disable {
    cursor: not-allowed;
}
</style>