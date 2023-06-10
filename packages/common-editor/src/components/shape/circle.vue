<template>
    <svg>
        <circle cx="100" cy="100" r="50"/>
    </svg>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
export default defineComponent({
    name: "circle",
    props: {
        center: {
           type: Object as PropType<{
                x:  number,
                y:  number,
           }>,
           default: {
            x: 0,
            y: 0
           }
        }
    }
})
</script>