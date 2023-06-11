<template>
    <div class=" font-semibold my-3"  >字体</div>
    <div class="flex ">
        <TextDecorationEditor :value="text_decoration_value" @change="payload => handleChange(payload.path, payload.value)">
        </TextDecorationEditor>
        <AlignSelect :value="props.textAlignLast" @change="value => handleChange('textAlignLast', value)"></AlignSelect>
    </div>

    <div class=" flex mt-2 items-stretch ">
        <c-number-input  @change="handleChange('fontSize', $event)" :min="12" :value="props.fontSize" class=" mr-3 flex-1"  />
        <color-picker v-model:pureColor="props.color" @pureColorChange="handleChange('color', $event )"   />
    </div>
    
    <div class=" flex mt-2 items-stretch " >
         <FontFamilySelect :value="props.fontFamily" class=" flex-1" @change="handleChange('fontFamily', $event)"></FontFamilySelect>
    </div>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FontSetting } from '@/type/setting';
import AlignSelect from './align-select.vue';
import TextDecorationEditor from './text-decoration-editor.vue';
import { ColorPicker } from "vue3-colorpicker";
import FontFamilySelect from './font-family-select.vue';

import "vue3-colorpicker/style.css";
type Props = FontSetting;
const props = defineProps<Props>();
const emit = defineEmits(["change"]);
function handleChange(key: keyof Props, value: number | string) {
    emit("change", {
        path: key,
        value
    })
}


const text_decoration_value = computed(() => ([
    props.fontWeight == 600,
    props.fontStyle == "italic",
    props.textDecoration == "underline",
    props.textDecoration == "line-through"
]))


</script>

<style scoped>

:deep(.vc-color-wrap){
    height: initial !important;
    margin: 3px;
    border-radius: 5px;
}
.menu-item {
    padding: 10px 12px;
    border-radius: 10px;
    margin-bottom: 2px;
}

.menu-item:hover {
    background-color: rgb(244, 244, 244);
}

.menu-item--active {
    background-color: #F1F2F4 !important;
}

.prefix {
    margin-right: 5px;
}

.content {
    flex: 1;
}

.suffix {
    margin-left: 5px;
}
</style>

