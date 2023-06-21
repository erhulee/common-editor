<template>
    <image 
        v-bind="imageSVGAttribute"
        draggable="false"
        class="x-image select-none" />
</template>

<script lang="ts">
import { BaseSetting } from '@/type/setting'
import { PropType, computed, defineComponent } from 'vue'


export default defineComponent({
    name: "image",
    props: {
            id: {
            type: String
        },
        options: {
            type: Object as PropType<{
                base: BaseSetting,
                material: {
                    src: string
                }
           
            }>,
            default: {}
        }
    },
    setup(props){
        const imageSVGAttribute = computed(()=>({
            width: props.options.base.width,
            height: props.options.base.height,
            x: props.options.base.left,
            y: props.options.base.top,
            href: props.options.material.src,
            ['xlink:href']: props.options.material.src,
        }))
        return {
            imageSVGAttribute
        }
    }
})



</script>

<style scoped>

</style>