<template>
  <UBadge variant='outline' color='violet'>{{ role }}</UBadge>
</template>

<script lang="ts" setup>
import { $Enums } from "@prisma/client";
const props = defineProps<{ role: $Enums.Role }>();
</script>

<style></style>
