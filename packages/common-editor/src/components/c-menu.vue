<template>
    <div class="trigger" v-bind="api.triggerProps">
        <slot name="trigger"></slot>
    </div>
    <div v-bind="api.positionerProps" class=" z-10">
        <div class="content focus:outline-none focus-visible:outline-none" v-bind="api.contentProps">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { computed } from "vue";


export default defineComponent({
    name: "c-menu",
    setup(props) {
        const [state, send] = useMachine(menu.machine({ id: Math.random() }));
        const api = computed(() => menu.connect(state.value, send, normalizeProps));
        return {
            api
        }
    }
})

</script>

<style scoped ></style>