import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'editor', 'viewer']),
  active: z.boolean(),
  createdAt: z.string().optional(),
})

export type UserFormValues = z.infer<typeof userSchema>
