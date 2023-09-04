<template>
  <div v-if="!currentUser" style="width: 100%;height: 100%;display: flex; align-items: center;justify-content: center">
    <app-circular-progress theme="primary"></app-circular-progress>
  </div>
  <div v-else class="message">
    <message-header></message-header>
    <div class="message__body">
      <message-entry></message-entry>
    </div>
    <message-compose :rows="textareaRow" placeholder="Type your message..." v-model="message" @submit="sendReply"></message-compose>
  </div>
</template>

<style lang="scss">
.message {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  height: 100%;
  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    height: 100%;
    overflow: auto;
  }
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/store/chat'

const router = useRouter()
const chatStore = useChatStore()
const { fetchUsers, setCurrentUser, setUserToChat, sendMsg } = useChatStore()
const showLoader = ref(false)
const { currentUser, userToChat } = storeToRefs(chatStore)
const message = ref('')
const textareaRow = ref(1)

onMounted(async () => {
  let getCurrentUser = currentUser.value
  let getUserToChat = userToChat.value
  if(!getCurrentUser || !getUserToChat) {
    getCurrentUser = localStorage.getItem('currentUser')
    getUserToChat = localStorage.getItem('userToChat')
    if(getCurrentUser && getUserToChat) {
      await fetchUsers()
      getUserToChat = JSON.parse(getUserToChat)
      getCurrentUser = JSON.parse(getCurrentUser)
      setUserToChat(getUserToChat.id)
      setCurrentUser(getCurrentUser.id)
    }
  }
  if(!currentUser || !userToChat) {
    router.push({
      path: '/'
    })
  }
})

function scrollToLastMessage() {
  const nodes = document.querySelectorAll('.message-entry__wrapper .message-group')
  nodes[nodes.length- 1].scrollIntoView({ behavior: 'smooth' });
}

function sendReply(e: any) {
  if(!message.value) {
    return
  }
  sendMsg(message.value)
  nextTick(() => {
    scrollToLastMessage()
  })
  message.value = ''
}
</script>
