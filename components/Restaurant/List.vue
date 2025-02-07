<template>
  <BaseList :list="restaurants" #default="{ item }">
    <RestaurantCard :restaurant="item" />
  </BaseList>
</template>

<script lang="ts" setup>
import type { Restaurant } from "@prisma/client";

interface Props {
  restaurants: Restaurant[];
}
defineProps<Props>();
</script>
