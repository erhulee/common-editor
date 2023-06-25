<template>
    <div v-if="show" class=" w-screen h-screen fixed bg-opacity-20 bg-black flex items-center justify-center">
        <div class=" bg-white modal rounded-md shadow p-4 px-6">
            <div class=" flex items-center justify-between">
                <span class=" text-base font-semibold text-gray-800">选择资源</span>
                <Close @click="handleClose" class=" cursor-pointer"></Close>
            </div>

            <!-- <div class=" flex my-4 items-center ">
                <CInput class=" flex-1 mr-2"></CInput>
                <CButton type="primary" class=" px-4" size="normal">
                    上传资源
                </CButton>
            </div> -->

            <div class=" flex my-4 items-center justify-between ">
                <div class="flex gap-1 flex-wrap items-center">
                    <span v-for="label in labels" class=" bg-slate-200 py-1 px-2 rounded text-sm text-gray-600 ">
                        {{ label }}
                    </span>
                </div>
                <CUpload action="http://localhost:8080/material/image" :headers="uploadHeader" :on-progress="onProgress" >
                    <CButton type="primary" class=" px-4 " size="small">
                        上传资源
                    </CButton>
                </CUpload>
            </div>

            <div class="">
                <div class=" flex flex-wrap gap-2" >
                    <div class=" relative rounded-lg overflow-hidden">
                        <div class=" w-32 h-32 bg-gray-100  p-3">
                            <img class=" w-full h-full outline-none border-none rounded-lg" :src="defaultImage" alt="">
                        </div>
                    </div>
                        <div class=" relative rounded-lg overflow-hidden">
                            <div class=" w-32 h-32 bg-gray-100  p-3">
                                <img class=" w-full h-full outline-none border-none rounded-lg" :src="defaultImage" alt="">
                            </div>
                        </div>
                            <div class=" relative rounded-lg overflow-hidden">
                            <div class=" w-32 h-32 bg-gray-100  p-3">
                                <img class=" w-full h-full outline-none border-none rounded-lg" :src="defaultImage" alt="">
                            </div>
                        </div>    <div class=" relative rounded-lg overflow-hidden">
                            <div class=" w-32 h-32 bg-gray-100  p-3">
                                <img class=" w-full h-full outline-none border-none rounded-lg" :src="defaultImage" alt="">
                            </div>
                        </div>    <div class=" relative rounded-lg overflow-hidden">
                            <div class=" w-32 h-32 bg-gray-100  p-3">
                                <img class=" w-full h-full outline-none border-none rounded-lg" :src="defaultImage" alt="">
                            </div>
                        </div>    <div class=" relative rounded-lg overflow-hidden">
                            <div class=" w-32 h-32 bg-gray-100  p-3">
                                <img class=" w-full h-full outline-none border-none rounded-lg" :src="defaultImage" alt="">
                            </div>
                        </div>    <div class=" relative rounded-lg overflow-hidden">
                            <div class=" w-32 h-32 bg-gray-100  p-3">
                                <img class=" w-full h-full outline-none border-none rounded-lg" :src="defaultImage" alt="">
                            </div>
                        </div>    <div class=" relative rounded-lg overflow-hidden">
                            <div class=" w-32 h-32 bg-gray-100  p-3">
                                <img class=" w-full h-full outline-none border-none rounded-lg" :src="defaultImage" alt="">
                            </div>
                        </div>
                 
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { GlobalEvents, Runtime } from '../../runtime';
import { Close } from "@icon-park/vue-next"
import CButton from '@/components/c-button.vue';
import defaultImage from "./default-image.webp"
import CUpload from '@/components/c-upload.vue';
import { useGlobalStore } from '@/store/global';
const show = ref(false)
const runtime = inject("runtime") as Runtime;
const globalStore = useGlobalStore();

runtime.listen(GlobalEvents.MATERIAL_MANAGER_SHOW, () => {
    show.value = true
})
const labels = ["风景", "电商", "培训", "科技"];
function handleClose(){
    show.value = false
}
const uploadHeader = {
    "Authorization": globalStore.auth
}
const onProgress = ({percent} : {percent: number}) => { 
    console.log(percent)
}
</script>

<style scoped>.modal {
    width: 750px;
    height: 600px;
}</style>