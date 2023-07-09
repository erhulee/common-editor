<template>
    <CButton type="primary" size="small">
        <template #icon>
            <AddOne></AddOne>
        </template>
        上传素材
    </CButton>
</template>

<script setup lang="ts">
import CButton from "@/components/c-button.vue"
import { AddOne } from "@icon-park/vue-next"
</script>