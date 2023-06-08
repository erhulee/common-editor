<template>
    <div  v-if="show" class=" w-screen h-screen fixed bg-opacity-20 bg-black flex items-center justify-center">
        <div class="form shadow-lg bg-white p-10 w-96 rounded-md relative  ">
            <div @click="handleCancel" class=" inline-block w-auto  absolute top-2 right-2 cursor-pointer  hover:text-slate-700 ">
                <Close></Close>
            </div>
            <div class=" m-auto flex flex-col justify-center items-center" v-if="stage == Stage.LOGIN" >
                <div class=" text-lg font-semibold mb-4">账号密码登录</div>
                <c-input label="账号" class="w-72" v-model="account" />
                <c-input label="密码" class="w-72 my-2" v-model="password"/>
                <c-button type="primary" class=" mt-8 mb-2 w-72" @click="submit">
                    登录
                </c-button>
                <c-button type="text" class="w-72" @click="changeStage(Stage.REGISTER)">
                    去注册
                </c-button>
            </div>

            <div class=" m-auto flex flex-col justify-center items-center" v-if="stage == Stage.REGISTER">
                    <div class=" text-lg font-semibold mb-4">用户注册</div>
                    <c-input label="账号" class="w-72" v-model="account" />
                    <c-input label="密码" class="w-72 my-2" v-model="password" />
                    <c-input label="确认密码" class="w-72 my-2" v-model="password_confirm" />
                    <c-button type="primary" class=" mt-8 mb-2 w-72" @click="submit" >
                        注册
                    </c-button>
                    <c-button type="text" class="w-72" @click="changeStage(Stage.LOGIN)">
                        返回
                    </c-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Close } from "@icon-park/vue-next"
import { inject, ref } from "vue";
import { register, login } from "@/api/user"
import { useGlobalStore } from "@/store/global";
const listener = inject("listener") as any;
const global = useGlobalStore();
enum Stage {
    LOGIN,
    REGISTER
}
listener("login", () => {
    show.value = true;
})
const show = ref(false);
const stage = ref<Stage>( Stage.LOGIN);
const account = ref("");
const password = ref("");
const password_confirm = ref("")


const handleCancel = () =>  show.value = false;
const changeStage = (val: Stage) => {
    account.value = "";
    password.value = "";
    password_confirm.value = "";
    stage.value = val
};

const submit = async ()=>{
    try {
        if (stage.value == Stage.REGISTER) {
            const data: any = await register(account.value, password.value, password_confirm.value);
            const token = data.token;
            global.login(token)
        } else {
            const data: any = await login(account.value, password.value)
            const token = data.token;
            global.login(token)
        }
        show.value = false
    } catch (error) {
        
    }

}

</script>