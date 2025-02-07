<template>
  <UCard :ui="{ base: 'max-w-md w-full', body: {base: 'space-y-6'} }">
    <h1 class="text-center text-2xl">Sign in to your account</h1>
    <div class="space-y-3">
      <UButton
        @click="handleOAuthClick(type.authApi)"
        v-for="(type, i) in authTypes"
        :icon="type.icon"
        :key="i"
        color="white"
        variant="outline"
        block
        size="xl"
      >
        {{ type.label }}
      </UButton>
    </div>
    <!-- <UDivider label="OR" />
    <UForm class="space-y-6">
      <UFormGroup label="Email" name="email">
        <UInput size="xl" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput size="xl" type="password" />
      </UFormGroup>

      <UButton block size="xl" type="submit">Sign in</UButton>
    </UForm> -->
  </UCard>
</template>

<script lang="ts" setup>
import { UCard } from "#components";

definePageMeta({
  layout: "auth",
});

const authTypes: Array<{ label: string; icon: string; authApi: string }> = [
  // { label: "Github", icon: "i-mdi-github" },
  { label: "Google", icon: "i-devicon-google", authApi: "/api/auth/google" },
  { label: "Github", icon: "i-devicon-github", authApi: "/api/auth/github" },
];

const handleOAuthClick = (authApi: string) => {
  window.location.href = authApi;
};
</script>

<style></style>
