import { Message } from '~/types'
import { conversation } from '~/api/mockapi'

export default defineEventHandler(async (e): Promise<Message[]> => {
  return JSON.parse(conversation)
})
