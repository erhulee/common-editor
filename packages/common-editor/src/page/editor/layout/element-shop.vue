<template>
    <div>
        <div class=" font-semibold text-sm mb-3">
            文字
        </div>

        <div class=" grid grid-cols-3 gap-2">
            <Block v-for="item in text_template" @click="() => addTextActor(item.default_options)" :icon="item.icon"
                :title="item.name"></Block>
        </div>

    </div>
</template>

<script setup lang="ts">
import Block from '@/components/block.vue';
import { useActorsStore } from "@/store/actors"
const actorsStore = useActorsStore();
const text_template = [
    {
        name: "标题",
        icon: "https://cdn.dancf.com/fe-assets/20230206/dcdc7e8889b7374c8710db81169a56ae.svg",
        default_options: {
            content: "双击编辑标题",
            font: {
                fontWeight: 600,
                fontSize: 90,
            },
            base: {
                top: 100,
                left: 100,
                isLocked: false
            }
        }
    },
    {
        name: "副标题",
        icon: "https://cdn.dancf.com/fe-assets/20230206/ca7b9eae10099691c79baae5d4f20b84.svg",
        default_options: {
            content: "双击编辑副标题",
          font: {
                fontWeight: 400,
                fontSize: 70,
            },
            base: {
                top: 100,
                left: 100,
                isLocked: false
            }
        }
    },
    {
        name: "正文",
        icon: "https://cdn.dancf.com/fe-assets/20230206/ec78fe9ae7da4c8e94b9fa63166e566c.svg",
        default_options: {
            content: "双击编辑正文",
            font: {
                fontWeight: 400,
                fontSize: 40,
            },
            base: {
                top: 100,
                left: 100,
                isLocked: false
            }
        }
    }
]

function addTextActor(option: any) {
    const content = option.content;
    const font = option.font;
    const base = option.base;
    actorsStore.add("text", 
        {
            material: {
                content
            },
            font,
            base
        }
    )
}


</script>