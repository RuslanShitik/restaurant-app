<template>
  <LayoutPage>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="md:col-span-3">
        <h1 class="text-2xl">All restaurants</h1>
      </div>
      <div class="">
        <UCard
          :ui="{
            base: 'md:sticky md:top-3',
            body: {
              base: 'gap-4 grid grid-cols-1',
            },
          }"
        >
          <template #header>
            <p class="text-lg">Filters</p>
          </template>
          <UFormGroup>
            <UInput v-model="name" placeholder="Name..." />
          </UFormGroup>
          <UFormGroup :label="`Minimum rating: ${minRating}`">
            <URange v-model="minRating" :min="0" :max="10" />
          </UFormGroup>
        </UCard>
      </div>
      <div class="md:col-span-2">
        <RestaurantList :restaurants="restaurants" />
        <div v-if="total" class="flex mt-4 justify-center">
          <UPagination v-model="page" :page-count="pageSize" :total="total" />
        </div>
      </div>
    </div>
  </LayoutPage>
</template>

<script lang="ts" setup>
const page = ref(1);
const name = ref('');
const minRating = ref(0);
const { data } = await useFetch('/api/restaurants', {
  query: { page, name, minRating },
});


const restaurants = computed(() => data.value?.result ?? []);

const total = computed(() => data.value?.pagination.total ?? 0);

const pageSize = computed(() => data.value?.pagination.pageSize);


</script>

<style></style>
<!-- TODO: debounce -->
