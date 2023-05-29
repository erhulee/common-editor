<template>
    <div class=" flex flex-1 bg-gray-100 justify-around rounded-lg items-stretch overflow-hidden" >
        <div v-for="item,index in renderItems" 
            class=" hover:bg-gray-200 flex-1 flex justify-center items-center" 
            :class="props.value[index] ? ' bg-gray-200' : ''"
            @click="handleChange(index)"
        >
            <component :is="item.icon"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
    import{ TextUnderline, Strikethrough, TextItalic, TextBold } from "@icon-park/vue-next"
    const props = defineProps<{value: boolean[]}>()
    const emit  = defineEmits(["change"]); 
    const renderItems = [
        {icon: TextBold, tooltip: "加粗"},
        {icon: TextItalic, tooltip: "斜体"},
        {icon: TextUnderline, tooltip: "下划线"},
        {icon: Strikethrough, tooltip: "删除线"}
    ];

    function handleChange(index: number){
        const type = renderItems[index].tooltip;
        switch(type){
            case "加粗":
                emit("change", {
                    path: "fontWeight",
                    value: props.value[index] ? 400 : 600
                });
                break;
            case "斜体":
                emit("change", {
                    path: "fontStyle",
                    value: props.value[index] ? "none" : "italic" 
                });
                break;
            case "下划线":
                emit("change", {
                    path: "textDecoration",
                    value: props.value[index] ?  "none" : "underline"
                });
                break;
            case "删除线":
                emit("change", {
                    path: "textDecoration",
                    value: props.value[index] ? "none" : "line-through"
                })
        }
    }
</script>

