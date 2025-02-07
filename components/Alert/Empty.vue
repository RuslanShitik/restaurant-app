<template>
  <UAlert icon="i-heroicons-no-symbol" variant="soft" :title="title" />
</template>

<script lang="ts" setup>
interface Props {
  title?: string;
}
withDefaults(defineProps<Props>(), {
  title: 'No data',
});
</script>

<style></style>
