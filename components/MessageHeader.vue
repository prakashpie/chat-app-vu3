<template>
  <div class="message-header">
    <div class="message-header__avatar">
      <app-avatar :img-src="userToChat.thumbnail"></app-avatar>
      <div class="message-header__avatar-text">
        <p class="message-header__avatar-primary-text"> {{ userToChat.firstName }} {{ userToChat.lastName }}</p>
        <p class="message-header__avatar-secondary-text text-disabled">Frontend Developer</p>
      </div>
    </div>
    <div class="flex-grow-1"></div>
  </div>
</template>

<style lang="scss">
.message-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-color: var(--md-sys-color-surface);
  padding: 8px 16px;
  height: 64px;
  flex-shrink: 0;
  &__avatar {
    display: flex;
  }
  &__avatar-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin-left: 16px;
  }
  &__avatar-primary-text {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
  }
  &__avatar-secondary-text {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.2;
  }
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/store/chat'

const chatStore = useChatStore()
const { userToChat } = storeToRefs(chatStore)
</script>
