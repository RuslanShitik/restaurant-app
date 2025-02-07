<template>
  <FetchStatus :status="status">
    <UForm
      :schema="createReviewValidator"
      :state="state"
      class="space-y-4"
      @submit="handleSubmit"
    >
      <UFormGroup :label="`Rating: ${state.rating}`" name="rating">
        <URange :min="1" :max="10" v-model="state.rating" />
      </UFormGroup>
      <UFormGroup label="Comment" name="comment">
        <UTextarea v-model="state.comment" />
      </UFormGroup>
      <UFormGroup class="hidden" label="restaurantId" name="restaurantId">
        <UInput v-model="state.restaurantId" />
      </UFormGroup>
      <UButton type="submit">Submit review</UButton>
    </UForm>
  </FetchStatus>
</template>

<script lang="ts" setup>
interface Props {
  restaurantId: number;
}

const props = defineProps<Props>();

const state = reactive<Partial<CreateReviewValidator>>({
  restaurantId: props.restaurantId,
  rating: 10,
});

const { status, execute } = await useFetch("/api/review", {
  body: state,
  method: "POST",
  immediate: false,
  watch: false,
});

const handleSubmit = async () => execute();

</script>

<style></style>
