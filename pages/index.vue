<template>
  <div class="chat-selector">
    <app-circular-progress v-if="showLoader" theme="primary"></app-circular-progress>
    <div v-else class="chat-box">
      <h1 class="chat-title">Whom would you like to chat?</h1>
      <div class="chat-users">
        <div v-for="item in users" :key="item.id" class="chat-users__list" style="cursor: pointer" @click="onUserSelectClicked(item)">
          <app-avatar :img-src="item.thumbnail"></app-avatar>
          <div class="chat-users__meta">
            <p style="font-size: 16px">{{ item.firstName }} {{ item.lastName }}</p>
            <span class="text-disabled" style="font-size: 12px">Frontend Developer</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.chat-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.chat-box {
  background-color: var(--md-sys-color-surface);
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  padding: 16px;
}
.chat-title {
  font-size: 18px;
  margin-bottom: 4px;
  margin-left: 8px;
}
.chat-users {
  width: 100%;
  padding: 8px;

  &__list {
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    padding: 12px;
    align-items: center;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
  }
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/store/chat'

const chatStore = useChatStore()
const { fetchUsers, setCurrentUser, setUserToChat } = useChatStore()

const router = useRouter()
const showLoader = ref(false)

const { users, currentUser, userToChat } = storeToRefs(chatStore)

function sendReply(e: any) {
  console.log(e)
}

onMounted(async () => {
  await fetchUsers()
  showLoader.value = false
})

function onUserSelectClicked(item: any) {
  const findCurrentUser = users.value.find((user) => {
    return user.id !== item.id
  })
  setUserToChat(item.id)
  setCurrentUser(findCurrentUser.id)
  localStorage.setItem('userToChat', JSON.stringify(userToChat?.value))
  localStorage.setItem('currentUser', JSON.stringify(currentUser?.value))
  router.push({
    path: `/chat/${item.id}/`
  })
}

</script>
