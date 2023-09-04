<template>
  <div class="avatar">
    <slot v-if="$slots.default"></slot>
    <div v-else-if="imgSrc" class="avatar__img">
      <img class="img-responsive" :src="imgSrc" style="" />
    </div>
  </div>
</template>

<style lang="scss">
.avatar {
  width: 48px;
  height: 48px;
  &__img {
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>

<script setup lang="ts">
const {imgSrc} = defineProps({
  imgSrc: {
    type: String,
    default: '',
  },
})
</script>
