<template>
  <div class="layout-app">
    <slot name="app-before"></slot>
    <div class="layout-wrapper">
      <slot name="header">
        <app-header v-if="false"></app-header>
      </slot>
      <div id="main" class="layout-main">
        <slot></slot>
      </div>
      <slot name="footer">
      </slot>
    </div>
    <slot name="app-after"></slot>
  </div>
</template>
<script setup>
</script>
