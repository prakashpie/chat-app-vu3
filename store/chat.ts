import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Message, User } from '~/types'

export const useChatStore = defineStore('chat', () => {
  const currentUser = ref('')
  const userToChat = ref('')
  const users = ref<User[]>([])
  const conversation = ref<Message[]>([])
  const status = {
    pending: 1,
    failed: 2,
    success: 3,
  }

  const groupConversation = computed(() => {
    const result = []
    let userId = ''
    for (let i = 0; i < conversation.value.length; i++) {
      const fromUserInfo = conversation.value[i].from
      if (userId !== fromUserInfo.id) {
        userId = fromUserInfo.id
        result.push([conversation.value[i]])
      } else {
        result[result.length - 1].push(conversation.value[i])
      }
    }
    return result
  })

  async function fetchConversation() {
    try {
      conversation.value = await fetch('/api/conversation/').then((res) => res.json())
    } catch (e) {
      conversation.value = []
      console.log(e)
    }
  }

  async function fetchUsers() {
    try {
      users.value = await fetch('/api/users/').then((res) => res.json())
    } catch (e) {
      users.value = []
      console.log(e)
    }
  }

  function setCurrentUser(id: any) {
    currentUser.value = users.value.find((user) => {
      return user.id === id
    })
  }

  function setUserToChat(id: any) {
    userToChat.value = users.value.find((user) => {
      return user.id === id
    })
  }

  function getCurrentDateTime() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  function updateChatMessage(id, key, value) {
    const getIndex = conversation.value.findIndex((message) => {
      return message.id === id
    })
    if (getIndex !== -1) {
      conversation.value[getIndex][key] = value
    }
  }

  function delay(time: number) {
    return new Promise((resolve, reject) => {
      const isSuccess = Math.random() > 0.1
      if (isSuccess) {
        setTimeout(() => {
          resolve()
        }, time)
      } else {
        setTimeout(() => {
          reject()
        }, time)
      }
    })
  }

  async function sendMsg(message: any) {
    const id = Date.now()
    const msgObj: Message = {
      id: id,
      from: currentUser.value,
      message: message,
      date: getCurrentDateTime(),
      status: status.pending,
    }
    conversation.value.push(msgObj)
    delay(500)
      .then(() => {
        updateChatMessage(id, 'status', status.success)
      })
      .catch(() => {
        console.log('failed')
        updateChatMessage(id, 'status', status.failed)
      })
  }

  return { users, currentUser, userToChat, conversation, groupConversation, setCurrentUser, setUserToChat, sendMsg, fetchUsers, fetchConversation }
})
