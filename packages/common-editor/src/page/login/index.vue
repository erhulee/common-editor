<template>
    <div class=" bg-slate-50 w-screen h-screen">
        <div class="form shadow-lg bg-white p-10">
            <div class=" m-auto flex flex-col justify-center items-center">
                <div class=" text-lg font-semibold mb-4">账号密码登录</div>
                <c-input label="账号" class="w-72" />
                <c-input label="密码" class="w-72 my-2" />
                <c-button type="primary" class=" mt-8 w-72">
                    登录
                </c-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form {
    position: fixed;
    top: 20%;
    left: calc(50% - 250px);
    width: 500px;
}
</style>