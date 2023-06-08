<template>
    <div class=" m-auto mt-16 page ">
        <div class=" text-lg font-light">账号设置</div>

        <div class=" flex flex-col items-center justify-center gap-2 p-2">
            <c-avatar class=" w-14 h-14"></c-avatar>
            <div class=" mt-4">
                <div  v-if="editing">
                    <input v-model="name" 
                        class=" focus-visible:outline-none underline border text-center "
                        @blur="finishEdit"
                        />
                </div>
                <div v-else>
                    <span class=" mr-1">{{ userInfo.name }}</span>
                    <span @click="handleEditClick">
                    <Edit fill="#888" class=" cursor-pointer"></Edit>
                    </span>
                </div>

            </div>
            <div class=" text-gray-500 text-xs ">UID:{{ userInfo.uid }}</div>
        </div>

        <div class=" flex justify-between items-center border p-4 rounded-lg mt-4">
            <div>
                <div class=" mb-4 text-sm">邮箱</div>
                <div class="text-sm text-gray-400">绑定邮箱后，可以更方便的登录、管理稿定账号</div>
            </div>
            <c-button>立即绑定</c-button>
        </div>


    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/global";
import { Edit } from "@icon-park/vue-next"
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { updateInfo} from "@/api/user"
const store = useGlobalStore();
const { userInfo } = storeToRefs(store);
const editing = ref(false);
const name = ref(userInfo.value.name);
function handleEditClick(){
    editing.value = true
}
function finishEdit(){
    editing.value = false
    updateInfo({
        name: name.value
    })
}

</script>

<style scoped>
.page {
    max-width: 900px;
}
</style>