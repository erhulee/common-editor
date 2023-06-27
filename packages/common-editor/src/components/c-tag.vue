<template>
    <div @click="$emit('click')" class=" bg-slate-200 py-1 px-2 rounded text-sm text-gray-600 flex items-center gap-1 ">
        <slot></slot>
        {{ content }}
        <span @click="$emit('suffixClick')" >
            <slot name="suffix" ></slot>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: "c-tag",
    props: {
        content: {
            type: String
        }
    },
    emits:["suffixClick", "click"],
    setup(props, ctx) {
        return {
            content: props.content
        }
    }
})

</script>