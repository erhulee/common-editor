<template >
    <g @contextmenu.stop="handleContext">
        <InteractiveWrapper
            :is-saving="props.isSaving" 
            @change="handleChange"
            :left="transformValue.left" 
            :top="transformValue.top" 
            :width="transformValue.width" 
            :height="transformValue.height"
            :rotate = "transformValue.rotate"
            :is-active="isActive" :is-locked="isLocked" 
            :current-id="props.id" >
            <!-- 透传 options -->
            <component 
                :is="props.tag" 
                :options="options"
                @change="handleMaterialChange">
            </component>
        </InteractiveWrapper>
    </g>
</template>

<script setup lang="ts">
import { useActorsStore } from '@/store/actors';
import { pick } from 'lodash-es';
import { computed, inject, reactive } from 'vue';
import InteractiveWrapper from './interactive-wrapper/interactive-wrapper.vue';
import { BaseSetting } from '@/type/setting';
const props = defineProps<{
    tag: string,
    options: Record<string, any> & {
        base: BaseSetting
    }
    content: string
    id: string
    // 是否在保存状态
    isSaving: boolean
}>();

const actorStore = useActorsStore();
const isActive = computed(() => props.id == actorStore.currentActorId);
const isLocked = computed(() => Boolean(actorStore.currentActor?.options.base.isLocked))
const transformValue = reactive(pick(props.options.base, ["left", "top", "width", "height", "rotate"]));
const options = computed(() => {
    return {
        ... props.options,
        base: {
            ...props.options,
            ...transformValue
        }
    }
})
function handleMaterialChange(payload: { path: string[], value: string | number }) {
    actorStore.updateOption(payload.path, payload.value)
}

const displayContext = inject("display_context") as  (event: Event, payload: {
    componentId: string
     type: "actor"
})=>void;

function handleContext(event: Event){
    displayContext(event, {
        type: "actor",
        componentId: props.id
    })
}

function handleChange(payload: Record<string, any>){
    Object.entries(payload).forEach(([key, value])=>{
        transformValue[key as any] = value
    })
}


</script>

