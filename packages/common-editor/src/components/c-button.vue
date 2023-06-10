<template>
    <div @click="handleClick" class="p-2 text-sm cursor-pointer
                inline-flex justify-center items-center 
                rounded " :class="className">
        <div class=" mr-2" v-if="$slots.icon">
            <slot name="icon"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
export default defineComponent({
    name: "c-button",
    props: {
        disable: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        type: {
            type: String as PropType<"default" | "text" | "primary">,
        },
        size:{
            type: String as PropType<"small" | "normal" | "big">,
            default: "normal"
        }
    },
    emits: ["click"],
    setup(props, ctx) {
        const className = computed(() => {
            const result: string[] = [];
            if (props.disable) result.push("--disable");
            if (props.circle) result.push("rounded-full");
            if (props.type) {
                result.push(props.type)
            } else {
                result.push("default")
            }
            if(ctx.slots.default && ctx.slots.icon) result.push("mr-2")

            result.push(props.size || "normal")
            return result
        });
        const handleClick = ($event: any) => {
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
    background: #eceef1
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

.small{
    height: 28px;
    font-size: 12px;
}
.normal{
    height: 36px;
    font-size: 14px;
}
.big{
    height: 42px;
}
</style>