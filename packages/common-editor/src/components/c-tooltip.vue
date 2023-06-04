<template>
    <span v-bind="api.triggerProps">
        <slot></slot>
    </span>
     <div v-if="true" v-bind="api.positionerProps" class="z-10" >
          <div v-bind="api.contentProps" class="z-10 bg-slate-600 text-white text-sm px-2 py-1 rounded" >{{ content }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as tooltip from "@zag-js/tooltip";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { computed } from "vue";
export default defineComponent({
    name:"c-tooltip",
    props:{
        content: {
            type: String
        }
    },
    setup(props, ctx){
        const [state, send] = useMachine(tooltip.machine({ 
            id: props.content,
            openDelay: 100,
            closeDelay: 200
        }));
        const api = computed(() => tooltip.connect(state.value, send, normalizeProps));
        return {
            api,
            content: props.content
        }
    }
})

</script>