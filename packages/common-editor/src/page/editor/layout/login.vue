<template>
    <div  v-if="show" class=" w-screen h-screen fixed bg-opacity-20 bg-black flex items-center justify-center">
        <div class="form shadow-lg bg-white p-10 w-96 rounded-md relative  ">
            <div @click="handleCancel" class=" inline-block w-auto  absolute top-2 right-2 cursor-pointer  hover:text-slate-700 ">
                <Close></Close>
            </div>
            <div class=" m-auto flex flex-col justify-center items-center">
                <div class=" text-lg font-semibold mb-4">账号密码登录</div>
                <c-input label="账号" class="w-72" />
                <c-input label="密码" class="w-72 my-2" />
                <c-button type="primary" class=" mt-8 mb-2 w-72">
                    登录
                </c-button>
                <c-button type="text" class="w-72">
                    去注册
                </c-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Close } from "@icon-park/vue-next"
import { inject, ref } from "vue";
const listener = inject("listener") as any;
const show = ref(false);
listener("login", ()=>{
    show.value = true;
})

const handleCancel = () =>  show.value = false;
</script>