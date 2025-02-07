<template>
  <div>
    <AlertSuccess v-if="status === 'success'" />
    <AlertError v-else-if="status === 'error'" />
    <slot v-else />
  </div>
</template>

<script lang="ts" setup>
import type { AsyncDataRequestStatus } from "#app";
defineProps<{
  status: AsyncDataRequestStatus;
}>();
</script>

<style></style>
