<template>
    <div class="flex flex-col h-full" >
        <c-input size="small" class=" mb-2">
            <Search fill="#aaa" />
        </c-input>
        <div class="gap-3 columns-2 mt-2 flex-1">
            <img v-for="item in image_list" :src="item.material.src" class=" rounded mb-2" @click="handleClick(item)" />
        </div>

        <c-upload>
            <c-button class="w-full flex items-center justify-center" type="primary">
                <template #icon>
                    <Upload />
                </template>
                上传素材
            </c-button>
        </c-upload>
    </div>
</template>

<script setup lang="ts">
import CInput from '@/components/c-input.vue';
import { useActorsStore } from '@/store/actors';
import { Search, Upload } from "@icon-park/vue-next"
const actorsStore = useActorsStore();
function handleClick(option: {
    material: {
        src: string
    },
    base: {
        top: number,
        left: number,
        isLocked: boolean,
        width: number,
        height: number
    }
}) {
    actorsStore.add("image", option)
}

const image_list = [
    {
        material: {
            src: "https://t7.baidu.com/it/u=2291349828,4144427007&fm=193&f=GIF"
        },
        base: {
            top: 100,
            left: 100,
            width: 200,
            height: 100,
            isLocked: false,
            opacity: 0.5
        }
    },
    {
        material: {
            src: "https://t7.baidu.com/it/u=963301259,1982396977&fm=193&f=GIF"
        },
        base: {
            top: 100,
            left: 100,
            width: 200,
            height: 100,
            isLocked: false,
            opacity: 0.5
        }
    },
    {
        material: {
            src: "https://t7.baidu.com/it/u=852388090,130270862&fm=193&f=GIF"
        },
        base: {
            top: 100,
            left: 100,
            width: 200,
            height: 100,
            isLocked: false,
            opacity: 0.5
        }
    },

]
</script>