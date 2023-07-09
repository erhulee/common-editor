<template>
    <div class=" h-screen w-screen">
        <TabGroup vertical class=" h-full">
            <div class=" flex flex-row">
                <TabList class=" flex flex-col p-2 border-r border-r-gray-200 w-20 text-gray-600">
                    <Tab v-slot="{ selected }" class="focus-visible:border-none focus-visible:outline-none">
                        <div class="p-2 rounded-md text-2xl flex-col flex items-center justify-center"
                            :class="selected ? ' bg-gray-100' : ''">
                            <Video :stroke-width="2"></Video>
                            <div class=" text-xs mt-1 ">视频</div>
                        </div>
                    </Tab>
                    <Tab v-slot="{ selected }" class="focus-visible:border-none focus-visible:outline-none mt-2">
                        <div class="p-2 rounded-md text-2xl flex-col flex items-center justify-center"
                            :class="selected ? ' bg-gray-100' : ''">
                            <AudioFile :stroke-width="2"></AudioFile>
                            <div class=" text-xs mt-1 ">音频</div>
                        </div>
                    </Tab>
                </TabList>
                <KeepAlive>
                    <TabPanels class=" h-full w-72">
                        <TabPanel class="p-3 bg-slate-500 w-72">
                            <VideoShop></VideoShop>
                        </TabPanel>
                        <TabPanel class=" p-3 h-full">
                            <MaterialShop></MaterialShop>
                        </TabPanel>
                    </TabPanels>
                </KeepAlive>
                <div class="main bg-slate-400 flex-1 h-full flex flex-col">
                    <div class=" w-full flex flex-row flex-1">
                        <div class=" flex-1 bg-red-400">
                            <VideoPlayer></VideoPlayer>
                        </div>
                        <div class=" flex-1 bg-red-300">
                            <OptionConfiguration></OptionConfiguration>
                        </div>
                    </div>

                    <div class=" flex-1">
                        <TrackController></TrackController>
                    </div>
                </div>
            </div>
        </TabGroup>
    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { Video, AudioFile } from "@icon-park/vue-next"
import VideoShop from "./biz-component/video-shop.vue"
import VideoPlayer from "./biz-component/video-player/index.vue"
import TrackController from "./biz-component/track-controller/index.vue"
import OptionConfiguration from "./biz-component/option-configuration/index.vue"

import { provide } from 'vue';
import { FFmpegController } from "./common/utils/ffmpeg"
const ffmpegController = new FFmpegController();
provide("ffmpegController", ffmpegController)
</script>

