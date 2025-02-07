<template>
  <LayoutPage v-if="restaurant">
    <div class="grid grid-cols-1 gap-6">
      <UCard :ui="{ header: { base: 'flex justify-between' } }">
        <template #header>
          <div>
            <h1 class="text-2xl">{{ restaurant.name }}</h1>
            <RestaurantRating :rating="restaurant.averageRating" />
            <p class="text-gray-400">{{ restaurant.address }}</p>
          </div>
          <div class="flex items-start">
            <RestaurantButtonFavorite
              :id="+id"
              :is-favorite="restaurant.isFavorite"
            />
          </div>
        </template>
        <template #default>
          <div>
            <h3 class="text-lg mb-1">Description</h3>
            <p>{{ restaurant.description }}</p>
          </div>
        </template>
      </UCard>
      <UCard>
        <template #header>
          <p class="text-xl">Contribute</p>
        </template>
        <UModal v-model="isOpenWriteReview">
          <UCard :ui="{ ring: '' }">
            <template #header>
              <p class="text-lg">Write a review</p>
            </template>
            <ReviewFormCreate v-if="loggedIn" :restaurant-id="restaurant.id" />
            <UButton v-else to="/auth/log-in"> Log in to review</UButton>
          </UCard>
        </UModal>
        <UButton @click="toggleWriteReview" size="xl" variant="outline">
          Write a review
        </UButton>
      </UCard>
      <UCard>
        <template #header>
          <p class="text-xl">Reviews</p>
        </template>
        <template #default>
          <USkeleton class="h-24" v-if="reviewsStatus === 'pending'" />
          <ReviewList v-else :reviews="reviews" />
        </template>
      </UCard>
    </div>
  </LayoutPage>
</template>

<script lang="ts" setup>

const { id } = useRoute().params;

const { loggedIn } = useUserSession();
const { toggle: toggleWriteReview, value: isOpenWriteReview } = useToggle();

const { data: restaurant } = await useFetch(`/api/restaurants/${id}`);

const { data: reviewsData, status: reviewsStatus } = useFetch(`/api/restaurants/${id}/reviews`, {
  lazy: true,
});

const reviews = computed(() => reviewsData.value?.result ?? []);
</script>

<style></style>
