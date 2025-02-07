<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <UContainer class="h-16 flex justify-between items-center">
        <div>
          <ULink to="/">Home</ULink>
        </div>
        <div>Search, info</div>
        <div class="flex gap-3">
          <template v-if="loggedIn">
            <UButton to="/profile">Profile</UButton>
            <UButton variant="outline" @click="clear">Logout</UButton>
          </template>
          <template v-else>
            <UButton to="/auth/log-in">Log in</UButton>
            <UButton variant="outline">Sign up</UButton>
          </template>
        </div>
      </UContainer>
    </header>
    <main class="flex-1">
      <UContainer>
        <slot />
      </UContainer>
    </main>
    <footer class="border-t">
      <UContainer class="h-16">Footer</UContainer>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { UButton } from "#components";

const { loggedIn, user, clear } = useUserSession();
</script>

<style></style>
