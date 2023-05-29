<template>

    <div class=" bg-gray-100 h-full flex items-center justify-center">
        <div class=" bg-white page-a4 page relative" id="editor-canvas">
            <div v-for="item in actors">
                <actorRender v-bind="item"></actorRender>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useActorsStore } from '../../../store/actors';
import actorRender from '../components/actor-render.vue';

const actorsRef = useActorsStore();
const actors = computed(() => actorsRef.actors);

</script>

<style scoped>
.page {
    box-shadow: 10px 10px 20px rgb(227, 227, 227);
}

.page-a4 {
    width: 600px;
    height: 1000px;
}
</style>


