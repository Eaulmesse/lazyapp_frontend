// Types pour les modèles Prisma
export type WaitlistWithRelations = any

export type WaitlistCreateInput = any
export type WaitlistUpdateInput = any
export type WaitlistWhereInput = any
export type WaitlistWhereUniqueInput = any

// Types pour les réponses API
export interface WaitlistResponse {
  success: boolean
  message?: string
  error?: string
  totalSubscribers?: number
  preferences?: string[]
}

export interface WaitlistStatsResponse {
  totalSubscribers: number
  preferenceStats: Array<{
    preference: string
    count: number
  }>
  dailyStats: Array<{
    date: string
    count: number
  }>
  recentSubscribers: Array<{
    email: string
    preferences: string[]
    createdAt: Date
  }>
}

// Types pour les erreurs Prisma
export interface PrismaError {
  code: string
  message: string
  meta?: any
}

// Types pour les opérations de base de données
export interface DatabaseOperationResult<T = any> {
  success: boolean
  data?: T
  error?: string
  prismaError?: PrismaError
}
