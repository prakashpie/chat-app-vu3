<template>
  <div class="message-entry">
    <div v-if="!isFetching" class="message-entry__wrapper">
      <message-group v-for="(item, index) in groupConversation" :key="index" :messages="item" :is-reverse="getIsReverse(item)"></message-group>
    </div>
    <div v-else style="width: 100%;height: 100%;display: flex; align-items: center;justify-content: center">
      <app-circular-progress theme="primary"></app-circular-progress>
    </div>
  </div>
</template>

<style lang="scss">
.message-entry {
  position: relative;
  flex-grow: 1;
  text-align: center;
  overflow-anchor: none;
  touch-action: auto;

  &__wrapper {
    padding: 24px 16px;
  }
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/store/chat'

const isFetching = ref(true)

const chatStore = useChatStore()
const { fetchConversation } = chatStore
const { currentUser, groupConversation } = storeToRefs(chatStore)

function getIsReverse(item) {
  return item[0].from.id !== currentUser.value.id
}

onMounted(async () => {
  await fetchConversation()
  isFetching.value = false
})

</script>
