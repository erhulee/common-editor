<template>
    <input ref="inputRef" type="file" class=" w-0 h-0" >
    <div @click="handleClick">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: "c-upload",
    setup(props, ctx) {
        const inputRef = ref<HTMLElement | null>(null);
        function handleClick() {
            inputRef.value?.click()
        }

        return {
            inputRef,
            handleClick
        }
    }
})

</script>