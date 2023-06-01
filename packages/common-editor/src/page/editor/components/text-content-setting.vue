<template>
    <div class="font-semibold my-3" >内容</div>
    <div>
        <c-input @change="handleChange" :value="props?.value?.content"  ></c-input>
    </div>
</template>

<script setup lang="ts">
    import { useActorsStore } from '@/store/actors';
    const actorStore = useActorsStore();
    const props = defineProps<{
        value: {
            content: string
        }
    }>();

   function handleChange(value:string){
    actorStore.updateOption(["material", "content"], value)
   }
</script>