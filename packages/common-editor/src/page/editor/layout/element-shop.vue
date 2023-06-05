<template>
    <div>
        <div class=" font-semibold text-sm mb-3">
            文字
        </div>
        <div class=" grid grid-cols-3 gap-2">
            <Block v-for="item in text_template" @click="() => addTextActor(item.default_options)" :title="item.name">
                <template #icon>
                    <component :stroke-width="2" :is="item.icon" :size="25"></component>
                </template>
            </Block>
        </div>

        <div class=" font-semibold text-sm my-3">
            形状
        </div>
        <div class=" grid grid-cols-3 gap-2">
            <Block v-for="item in shape_template" @click="() => addTextActor(item.default_options)" :title="item.name">
                <template #icon>
                    <component :stroke-width="2" :is="item.icon" :size="20"></component>
                </template>
            </Block>
        </div>

    </div>
</template>

<script setup lang="ts">
import Block from '@/components/block.vue';
import { useActorsStore } from "@/store/actors"
import { Round, H1, H2, Text } from "@icon-park/vue-next"
const actorsStore = useActorsStore();
const text_template = [
    {
        name: "标题",
        icon: H1,
        default_options: {
            content: "双击编辑标题",
            font: {
                color: "rgb(0,0,0)",
                fontWeight: 600,
                fontSize: 90,
                textAlignLast: "center"
            },
            base: {
                top: 100,
                left: 100,
                width: 500,
                height: 80,
                rotate: 0,
                isLocked: false
            }
        }
    },
    {
        name: "副标题",
        icon: H2,
        default_options: {
            content: "双击编辑副标题",
            font: {
                color: "rgb(0,0,0)",
                fontWeight: 400,
                fontSize: 70,
                textAlignLast: "center"
            },
            base: {
                top: 100,
                left: 100,
                width: 200,
                height: 200,
                rotate: 0,
                isLocked: false
            }
        }
    },
    {
        name: "正文",
        icon: Text,
        default_options: {
            content: "双击编辑正文",
            font: {
                color: "rgb(0,0,0)",
                fontWeight: 400,
                fontSize: 40,
                textAlignLast: "center"
            },
            base: {
                top: 100,
                left: 100,
                width: 400,
                height: 80,
                rotate: 0,
                isLocked: false
            }
        }
    }
]

const shape_template = [
    {
        name: "圆形",
        icon: Round,
        default_options: {
            content: "双击编辑标题",
            font: {
                color: "rgb(0,0,0)",
                fontWeight: 600,
                fontSize: 90,
                textAlignLast: "center"
            },
            base: {
                top: 100,
                left: 100,
                rotate: 0,
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