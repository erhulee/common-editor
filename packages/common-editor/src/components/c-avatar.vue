<template>
    <img :src="src" class=" w-8 h-8 rounded-full border-blue-800 border"  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import avatarSrc from "./avatar.png"
export default defineComponent({
    name: "c-avatar",
    props: {
        src: {
            type: String,
            default: avatarSrc
        }
    },
    setup(props) {
        return {
            src: props.src
        }
    }
})

</script>