<template>
  <UCard :ui="{ header: { base: 'flex justify-between' } }">
    <template #header>
      <p class="text-xl">{{ restaurant.name }}</p>
      <RestaurantRating :rating="restaurant.averageRating" />
    </template>
    <p>{{ restaurant.description }}</p>
    <template #footer>
      <div class="flex flex-wrap gap-2">
        <UButton icon="i-heroicons-eye" :to="`/restaurant/${restaurant.id}`"
          >Watch</UButton
        >
        <UButton
          v-if="isEditable"
          icon="i-heroicons-pencil-square"
          color="blue"
        >
          Edit
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import { UCard } from "#components";
import type { Restaurant } from "@prisma/client";

interface Props {
  restaurant: Restaurant;
  isEditable?: boolean;
}

defineProps<Props>();

// TODO: edit btn
</script>

<style></style>
