<template>
  <LayoutPage>
    <div v-if="profile" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <UCard :ui="{ base: 'block md:sticky md:top-4' }">
          <template #header>
            <h1 class="text-xl">Personal information</h1>
          </template>
          <div class="space-y-4">
            <UserRoleBadge :role="role" />
            <p>Name: {{ profile.name }}</p>
            <p>Email: {{ profile.email }}</p>

            <template v-if="role === $Enums.Role.user">
              <AlertSuccess v-if="status === 'success'" />
              <AlertError v-else-if="status === 'error'" />
              <UButton
                @click="execute()"
                v-else
                :loading="status === 'pending'"
                block
              >
                Update account to business
              </UButton>
            </template>
          </div>
        </UCard>
      </div>
      <div class="md:col-span-2">
        <UCard>
          <template #header>
            <h2 class="text-2xl">Favorites</h2>
          </template>
          <template #default>
            <RestaurantList :restaurants="favorites" />
          </template>
        </UCard>
      </div>

      <template v-if="role === $Enums.Role.business">
        <div>
          <UCard :ui="{ base: 'block md:sticky md:top-4' }">
            <template #header>
              <p class="text-xl">Create my restaurant</p>
            </template>
            <RestaurantFormCreate />
          </UCard>
        </div>
        <div class="md:col-span-2">
          <UCard>
            <template #header>
              <h2 class="text-2xl">My restaurants</h2>
            </template>
            <template #default>
              <RestaurantList :restaurants="myRestaurants" />
            </template>
          </UCard>
        </div>
      </template>
    </div>
    <UAlert v-else>Profile not found</UAlert>
  </LayoutPage>
</template>

<script setup lang="ts">
import { AlertError, AlertSuccess } from "#components";
import { $Enums, type Restaurant } from "@prisma/client";
definePageMeta({
  middleware: ["authenticated"],
});

useSeoMeta({
  title: "Profile",
  description: "Your profile page",
});

const { data: profile } = await useFetch("/api/profile");
const { data: favorite } = await useFetch("/api/restaurant/favorite");

const { status, execute } = useFetch("/api/profile/to-business", {
  method: "POST",
  immediate: false,
  watch: false,
});

const role = computed(() => profile.value?.role);

const favorites = computed<Restaurant[]>(() => favorite.value ?? []);
const myRestaurants = computed<Restaurant[]>(() => []);
</script>

<style></style>
