<template>
    <div class=" p-2 flex justify-between ">
        <div class=" font-semibold border-b-2 pb-1 border-gray-600">我的空间</div>
        <c-button type="primary" size="small" class=" p-3" @click="handleAdd">
            <template #icon>
                <AddOne></AddOne>
            </template>
            添加
        </c-button>
    </div>

    <div class=" m-2">
        <span class=" text-sm mx-2 font-light text-gray-500 active">全部</span>
        <span class=" text-sm mx-2 font-light text-gray-500 ">作品</span>
        <span class=" text-sm mx-2 font-light text-gray-500 ">素材</span>
    </div>

    <div class=" m-10 flex flex-wrap gap-6">
        <ArtWork></ArtWork>
        <ArtWork></ArtWork>
        <ArtWork></ArtWork>
        <ArtWork></ArtWork>
        <ArtWork></ArtWork>
        <ArtWork></ArtWork>
        <ArtWork></ArtWork>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import ArtWork from './components/art-work.vue';
import { AddOne } from "@icon-park/vue-next"
const router = useRouter();
function handleAdd(){
    console.log("Ad")
    router.push("/")
}
</script>

<style scoped>
.active {
    font-weight: 500;
    color: black;
}
</style>