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
import { debounce, pick } from 'lodash-es';
import { computed, inject, reactive, watch } from 'vue';
import InteractiveWrapper from './interactive-wrapper/interactive-wrapper.vue';
import { BaseSetting } from '@/type/setting';
import { GlobalEvents, Runtime } from '../runtime';
import { ActorType } from '../preLoad';
const props = defineProps<{
    id: string
    tag: string,
    options: Record<string, any> & {
        base: BaseSetting
    }
    content: string
    // 是否在保存状态
    isSaving: boolean
}>();

const actorStore = useActorsStore();
const runtime = inject('runtime') as Runtime

const isActive = computed(() => props.id == actorStore.currentActorId);
const isLocked = computed(() => Boolean(actorStore.currentActor?.options.base.isLocked))
const transformValue = reactive(pick(props.options.base, ["left", "top", "width", "height", "rotate"]));

watch(props, (_, curValue) => {
    const { left, top, width, height, rotate } = curValue.options.base
    transformValue.height = height;
    transformValue.left = left;
    transformValue.top = top;
    transformValue.width = width;
    transformValue.rotate = rotate;
})
const options = computed(() => {
    return {
        ... props.options,
        base: {
            ...props.options.base,
            ...transformValue
        }
    }
})


function handleMaterialChange(payload: { path: string[], value: string | number }) {
    actorStore.updateOption(payload.path, payload.value)
}

function handleContext(event: Event){
    runtime.trigger(GlobalEvents.CONTEXT_MENU_SHOW, {
       event: event,
       info: {
            type: ActorType.Actor,
            componentId: props.id
       }
    })
}

const commitChange = debounce((result: typeof transformValue) => {
    actorStore.batchUpdateOption(Object.entries(result).map(([key, value]) => ({
        paths: ['base', key],
        value: value
    })))
},100)

function handleChange(payload: Record<string, any>){
    Object.entries(payload).forEach(([key, value])=>{
        transformValue[key] = value
    })
    commitChange(transformValue)
}


</script>

