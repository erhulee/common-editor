<template>
    <div class=" flex items-center justify-between p-2 relative">
        <div>
            <CButton class=" mr-2" @click="actorStore.undo()">
                <InvertLeft></InvertLeft>
            </CButton>
            <CButton>
                <InvertRight></InvertRight>
            </CButton>
        </div>

        <div class=" flex items-center relative">
            <CMenu>
                <template #trigger>
                    <c-avatar class=" mr-4" v-auth></c-avatar>
                </template>
                <template #content>
                    <div class=" bg-white shadow p-1 mt-1 flex flex-col rounded relative right-28 top-2 w-40">
                        <div class=" text-sm text-slate-800 hover:bg-slate-50 py-2 rounded px-2" @click="handleSetting">账号设置
                        </div>
                        <div class=" text-sm text-slate-800 hover:bg-slate-50 py-2 rounded px-2" @click="handleLogOut">退出登录
                        </div>
                        <div class=" text-sm text-slate-800 hover:bg-slate-50 py-2 rounded px-2" @click="handleGoSpace">我的空间
                        </div>
                    </div>
                </template>
            </CMenu>
            <c-button class=" px-4 mx-2" v-auth>
                分享
            </c-button>

            <c-button type="primary" class=" px-4" v-auth @click="handleSave">
                保存
            </c-button>
            <CMenu>
                <template #trigger>
                    <c-button type="primary" class="" v-auth @click="handleSave">
                        <Down></Down>
                    </c-button>
                </template>
                <template #content>
                    <div class=" bg-white shadow p-1 mt-1 flex flex-col rounded absolute right-0 w-40">
                        <div class=" text-sm text-slate-800 hover:bg-slate-50 py-2 rounded px-2" @click="handleExportImage">
                            导出为图片
                        </div>
                    </div>
                </template>
            </CMenu>


        </div>
    </div>
</template>

<script setup lang="ts">
import CButton from "@/components/c-button.vue";
import CMenu from "@/components/c-menu.vue";

import { InvertLeft, InvertRight, Down } from "@icon-park/vue-next"
import { useActorsStore } from "@/store/actors"
import { useGlobalStore } from "@/store/global";
import { save } from "@/api/project";
import { useRouter } from "vue-router";

import { inject } from "vue";
import { GlobalEvents, Runtime } from "../runtime";

import { Canvg, presets } from 'canvg';
const preset = presets.offscreen()
const router = useRouter();
const actorStore = useActorsStore();
const globalStore = useGlobalStore();

const runtime = inject("runtime") as Runtime
function handleSave() {
    save({
        projectId: "",
        elementJSON: JSON.stringify(actorStore.actors)
    })
}
function handleSetting() {
    router.push("/profile")
}

function handleLogOut() {
    globalStore.auth = ""
}

function handleGoSpace() {
    router.push("/space")
}

async function toPng(data: {
    width: number,
    height: number,
    svg: string
}) {
    const {
        width,
        height,
        svg
    } = data
    const canvas = new OffscreenCanvas(width, height)
    const ctx = canvas.getContext('2d')
    const v = await Canvg.from(ctx!, svg, preset)
    await v.render()
    const blob = await canvas.convertToBlob()
    const pngUrl = URL.createObjectURL(blob)
    return pngUrl
}

function handleExportImage() {
    runtime.trigger(GlobalEvents.SAVING_STATUS_CHANGE, "saving")
    const svg = document.getElementById("editor-canvas") as HTMLElement;
    let img = document.createElement('a');
    setTimeout(async () => {
        const url = await toPng({
            width: 600,
            height: 1000,
            svg: svg.innerHTML
        })
        img.href = url.replace("image/jpeg", "image/octet-stream");
        img.download = 'pic_name.jpg';
        img.click();
        runtime.trigger(GlobalEvents.SAVING_STATUS_CHANGE, "editing")

    }, 0)

}
</script>

<style scoped>
.panel {
    background: #202752;
    border-left: 1px solid #eee;
    height: calc(100vh - 50px);
}
</style>