<template>
    <div v-if="show" class=" w-screen h-screen fixed bg-opacity-20 bg-black flex items-center justify-center">
        <div class=" bg-white modal rounded-md shadow p-4 px-6">
            <div class=" flex items-center justify-between">
                <span class=" text-base font-semibold text-gray-800">选择资源</span>
                <Close @click="handleClose" class=" cursor-pointer"></Close>
            </div>
            <div class=" flex my-4 items-center justify-between ">
                <div class="flex gap-1 flex-wrap items-center">
                    <CTag v-for="label in labels" :content="label"  >
                        <template #suffix>
                            <Close size="10" class=" cursor-pointer" ></Close>
                        </template>
                    </CTag>
                </div>
                <CUpload action="http://localhost:8080/material/image" :headers="uploadHeader" :on-progress="onProgress" :before-upload="beforeUpload">
                    <CButton type="primary" class=" px-4 " size="small">
                        上传资源
                    </CButton>
                </CUpload>
            </div>
                <div class=" flex flex-wrap gap-2">
                     <div class=" relative rounded-lg overflow-hidden" v-if="newFile.base64">
                                <div class=" w-32 h-32 bg-gray-100  p-3">
                                    <img class=" object-contain w-full h-full outline-none border-none rounded-lg" :src="newFile.base64" alt="">
                                </div>
                    </div>
                    <div class=" relative rounded-lg overflow-hidden" v-for="item in images">
                            <div class=" w-32 h-32 bg-gray-100  p-3">
                                <img class=" object-contain w-full h-full outline-none border-none rounded-lg" :src="item.address" alt="">
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
import CUpload from '@/components/c-upload.vue';
import { useGlobalStore } from '@/store/global';
import { getMaterial } from '@/api/material';
import CTag from '@/components/c-tag.vue';

const show = ref(false)
const runtime = inject("runtime") as Runtime;
const globalStore = useGlobalStore();

function handleClose() {
    show.value = false
}

runtime.listen(GlobalEvents.MATERIAL_MANAGER_SHOW, () => {
    show.value = true
})
const images = ref<Array<{ address: string }>>([]);
getMaterial().then(res => {
    images.value = res.data
})


const labels = ["风景", "电商", "培训", "科技"];
const handleLabelDelete = ()=>{

}
const uploadHeader = {
    "Authorization": globalStore.auth
}

const newFile = ref<{
    file?: File,
    percent?: number
    base64?: string
}>({})

const onProgress = ({ percent }: { percent: number }) => {
    newFile.value.percent = percent
}
const beforeUpload = (file: File) =>{
    newFile.value.file = file
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
        newFile.value.base64 = fileReader.result as string
    }
}




</script>

<style scoped>.modal {
    width: 750px;
    height: 600px;
}</style>