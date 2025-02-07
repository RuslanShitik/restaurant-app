<template>
  <UCard :ui="{ header: { base: 'flex flex-wrap gap-2 justify-between' } }">
    <template #header>
      <div v-if="review.user">
        <p class="text-lg">{{ review.user.name }}</p>
        <p class="text-gray-400 text-xs">
          {{ $dayjs(review.createdAt).fromNow() }}
        </p>
      </div>
      <div>
        <RestaurantRating :rating="review.rating" />
      </div>
    </template>
    <template #default>
      {{ review.comment }}
    </template>
  </UCard>
  <!-- TODO: pretty card -->
</template>

<script lang="ts" setup>
import type { Review, User } from "@prisma/client";

interface Props {
  review: Review & { user?: User };
}

defineProps<Props>();
</script>
<!-- TODO: pagination for reviews and mb reviews component list -->

<style></style>
