<template>
  <BaseList :list="reviews" #default="{item}">
    <ReviewCard :review="item" />
  </BaseList>
</template>

<script lang="ts" setup>

import type { Review } from '@prisma/client';

interface Props {
  reviews: Review[];
}

const props = defineProps<Props>();
</script>

<style></style>
