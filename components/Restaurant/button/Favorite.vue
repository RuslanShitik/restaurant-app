<template>
  <template v-if="loggedIn">
    <UButton
      v-if="isAddedToFavorite"
      variant="outline"
      @click="handleClickDelete"
      icon="i-heroicons-heart-solid"
    >
      Saved
    </UButton>
    <UButton
      v-else
      @click="handleClickSave"
      icon="i-heroicons-heart"
    >
      Save
    </UButton>
  </template>
  <UButton v-else variant="outline" to="/auth/log-in" icon="i-heroicons-heart">
    Save
  </UButton>
</template>

<script lang="ts" setup>
interface Props {
  isFavorite: boolean;
  id: number;
}

const props = defineProps<Props>();

const { loggedIn } = useUserSession();

const isAddedToFavorite = ref<boolean>(props.isFavorite);

const handleClickSave = async () => {
  await $fetch("/api/restaurant/favorite", {
    method: "POST",
    body: { restaurantId: props.id },
  });
  isAddedToFavorite.value = true;
};
const handleClickDelete = async () => {
  await $fetch("/api/restaurant/favorite", {
    method: "DELETE",
    body: { restaurantId: props.id },
  });
  isAddedToFavorite.value = false;
};
</script>

<style></style>
