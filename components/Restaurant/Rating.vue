<template>
  <div class="flex">
    <UIcon
      v-for="i in filledStars"
      :key="'filled-' + i"
      name="i-heroicons-star-solid"
      class="h-5 w-5 text-primary"
    />
    <UIcon
      v-for="i in emptyStars"
      :key="'empty-' + i"
      name="i-heroicons-star"
      class="h-5 w-5 text-primary"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{ rating: number }>();

const filledStars = computed(() => Math.round(props.rating / 2));
const emptyStars = computed(() => 5 - filledStars.value);
</script>
