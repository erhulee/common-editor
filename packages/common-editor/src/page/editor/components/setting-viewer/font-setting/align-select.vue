<template>
    <div class=" relative">
        <Menu>
            <MenuButton class=" ml-2">
                <block>
                    <div class="flex flex-row items-center justify-center">
                        <div class="mr-2">
                            <component :is="activeIcon"></component>
                        </div>
                        <down theme="outline" size="16" fill="#555" />
                    </div>
                </block>
            </MenuButton>
            <MenuItems
                class=" z-10  bg-white shadow-sm  right-0 absolute  w-60 flex flex-col  rounded-lg mx-2 mt-1 border border-gray-200 border-solid p-1">
                <MenuItem v-for="item in options" class="menu-item"
                    :class="props.value == item.value ? 'menu-item--active' : ''">
                <div class=" flex items-center" @click="emit('change', item.value)">
                    <div class="prefix">
                        <component :is="item.icon"></component>
                    </div>
                    <div class="content">
                        {{ item.label }}
                    </div>
                    <div class="suffix">
                        <check-small theme="outline" size="20" fill="#333" v-if="props.value == item.value" />
                    </div>
                </div>
                </MenuItem>
            </MenuItems>
        </Menu>
    </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { CheckSmall, Down, AlignTextCenter, AlignTextLeft, AlignTextRight, AlignTextBoth } from "@icon-park/vue-next"
import block from "@/components/block.vue"
import { computed } from 'vue';
const options = [
    {
        icon: AlignTextLeft,
        label: "左对齐",
        value: "left"
    },

    {
        icon: AlignTextRight,
        label: "右对齐",
        value: "right"
    },
    {
        icon: AlignTextCenter,
        label: "居中对齐",
        value: "center"
    },
    {
        icon: AlignTextBoth,
        label: "两端对齐",
        value: "justify"
    }

]

const props = defineProps<{
    value: string
}>();

const activeIcon = computed(() => {
    console.log
    const target = options.find(item => item.value == props.value)
    if (target == null) return options[0].icon;
    else return target.icon
})



const emit = defineEmits(["change"]);

</script>

<style scoped>
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
