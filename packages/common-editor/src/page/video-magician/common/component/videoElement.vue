<template>
    <video></video>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { VideoModel } from "../model/video"
const videoModel = ref<VideoModel>({
    src: "",
    cover: "",
    width: 200,
    height: 5000
})
</script>

<style></style>