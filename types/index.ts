
// users
export interface User {
  id: number
  firstName: string
  lastName: string
  thumbnail: string
}

export interface Status {
  id: number
  firstName: string
  lastName: string
  thumbnail: string
}

// Message
export interface Message {
  id: number
  from: User
  message: string
  date: string
  status?: number
}
