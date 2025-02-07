<template>
  <AlertSuccess v-if="status === 'success'" />
  <AlertError v-else-if="status === 'error'" />
  <UForm
    v-else
    class="space-y-4"
    :state="state"
    :schema="updateRestaurantValidator"
    @submit="handleSubmit"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup label="Address" name="address">
      <UInput v-model="state.address" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" />
    </UFormGroup>
    <UButton :loading="status === 'pending'" type="submit">Create</UButton>
  </UForm>
</template>

<script lang="ts" setup>
import { UForm } from "#components";
import { updateRestaurantValidator } from "~/utils/validation";

const props = defineProps<UpdateRestaurantValidator>();

const state = reactive<Partial<UpdateRestaurantValidator>>(props || {});

const { execute, status } = useFetch("/api/restaurant", {
  immediate: false,
  method: "PATCH",
  body: state,
  watch: false,
});

const handleSubmit = async () => {
  await execute();
};
</script>
