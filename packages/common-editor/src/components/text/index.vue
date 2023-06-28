<template>
    <foreignObject v-if="isEdit" v-bind="inputAttribute">
        <input ref="inputRef" :value="props.options.material.content" :style="style" @blur="handleBlur"
            @input="handleChange" class=" w-full p-0 bg-transparent focus-visible:outline-none" />
    </foreignObject>
    <text v-else ref="textRef" class="select-none" draggable="false" @click.capture="handleDBClick" v-bind="svgAttribute">
        {{ props.options.material.content }}
    </text>
</template>

<script setup lang="ts">
import { BaseSetting, FontSetting } from '@/type/setting';
import { mapKeys, pick } from 'lodash-es';
import { computed, nextTick, ref } from 'vue';
function transformKeys(value: Record<string, any>) {
    return mapKeys(value, (_, key) => key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())
}

const emit = defineEmits(["change"]);
const props = defineProps<{
    id: string,
    options: Record<string, any> & {
        material: {
            content: string
        }
        base: BaseSetting
        font: FontSetting
    }
}>();
const isEdit = ref(false)
const inputRef = ref<HTMLElement | null>(null)
const textRef = ref(null)


const style = computed(() => {
    const entry = Object.entries(props.options.font);
    return transformKeys(entry.reduce<any>((pre, [key, value]) => {
        console.log(key, value)
        if (typeof value == "number") {
            pre[key] = value
        } else {
            pre[key] = value
        }
        return pre
    }, {
        whiteSpace: "nowrap",
        opacity: props.options.base.opacity
    }))
});
console.log(style)

const svgAttribute = computed(() => {
    // y 坐标需要兼容 字体的特殊性
    return {
        opacity: props.options.base.opacity,
        x: props.options.base.left,
        y: props.options.base.top + props.options.font.fontSize,
        fill: style.value.color,
        ...pick(style.value, 'font-size', 'font-weight', 'font-style')
    }
})
console.log(svgAttribute)

const inputAttribute = computed(() => {
    // y 坐标需要兼容 字体的特殊性
    return {
        x: props.options.base.left,
        y: props.options.base.top,
        width: props.options.base.width,
        height: props.options.base.height
    }
})



function handleDBClick() {
    console.log("hello")
    isEdit.value = true
    nextTick(() => inputRef.value?.focus())
}
function handleBlur() {
    isEdit.value = false
}
function handleChange(e: any) {
    emit("change", {
        path: ["material", "content"],
        value: e.target.value
    })
}

defineExpose({
    handleDBClick
})



</script>