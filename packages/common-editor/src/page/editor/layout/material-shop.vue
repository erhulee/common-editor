<template>
    <c-input size="small">
        <Search fill="#aaa" />
    </c-input>
    <div>
        <img v-for="item in image_list" :src="item.src" />
    </div>
</template>

<script setup lang="ts">
import CInput from '@/components/c-input.vue';
import { Search } from "@icon-park/vue-next"

const image_list = [
    {
        src: "https://gdesign-dam.dancf.com/24202181766957093/873841664859487fbf2c6bab7105c209.jpg?auth_key=1685217600-55a13236bd1e444ab49dd5a3938f6760-0-c4aec3cbb92521aadda0f1b5f8a38ad4&x-oss-process=image/resize,w_300/interlace,1,image/format,webp"
    },
    {
        src: "https://gdesign-dam.dancf.com/24202181766957093/873841664859487fbf2c6bab7105c209.jpg?auth_key=1685217600-55a13236bd1e444ab49dd5a3938f6760-0-c4aec3cbb92521aadda0f1b5f8a38ad4&x-oss-process=image/resize,w_300/interlace,1,image/format,webp"
    },
    {
        src: "https://gdesign-dam.dancf.com/24202181766957093/873841664859487fbf2c6bab7105c209.jpg?auth_key=1685217600-55a13236bd1e444ab49dd5a3938f6760-0-c4aec3cbb92521aadda0f1b5f8a38ad4&x-oss-process=image/resize,w_300/interlace,1,image/format,webp"
    }
]
</script>