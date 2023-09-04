<template>
  <section class="error-layout">
    <div class="container container--mini error-wrapper">
      <h1>Got Error</h1>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
defineProps({
  error: Object,
})
</script>

<style lang="scss">
</style>
