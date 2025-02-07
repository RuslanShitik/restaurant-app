<template>
  <ul v-if="list.length" class="space-y-3">
    <li v-for="(item, i) in list" :key="item.id ?? i">
      <slot :item="item" />
    </li>
  </ul>
  <AlertEmpty v-else />
</template>

<script lang="ts" setup>
interface Props<T> {
  list: T[];
}
defineProps<Props<any>>();
</script>
