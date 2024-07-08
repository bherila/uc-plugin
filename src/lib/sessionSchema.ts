import { z } from 'zod'

export const sessionSchema = z.object({
  uid: z.number().nonnegative().default(0),
  email: z.string().optional(),
  ax_uc: z.boolean().optional().default(false),
})

export interface sessionType {
  uid: number
  email?: string
  ax_uc?: boolean
}
