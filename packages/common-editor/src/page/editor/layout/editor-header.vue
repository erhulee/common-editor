<template>
    <div class="w-full bg-white h-12 border-b border-solid border-gray-300 flex items-center justify-end ">
        <CMenu>
            <template #trigger>
                <c-avatar class=" mr-4"></c-avatar>
            </template>

            <template #content>
                  <div>content</div>
                </template>
        </CMenu>
    </div>
</template>

<script setup lang="ts">
import CMenu from '@/components/c-menu.vue';
</script>

