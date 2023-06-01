<template>
    <c-input size="small">
        <Search fill="#aaa" />
    </c-input>
    <div class="gap-3 columns-2">
        <img v-for="item in image_list" 
            :src="item.material.src" 
            class=" rounded mb-2" 
            @click="handleClick(item)" />
    </div>
</template>

<script setup lang="ts">
import CInput from '@/components/c-input.vue';
import { useActorsStore } from '@/store/actors';
import { Search } from "@icon-park/vue-next"

const actorsStore = useActorsStore();
function handleClick(option: {
    material: {
        src: string
    },
    base: {
        top: number,
        left: number,
        isLocked: boolean
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
            isLocked: false
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
            isLocked: false
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
            isLocked: false
        }
    },

]
</script>