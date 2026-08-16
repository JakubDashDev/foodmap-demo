import { z } from 'zod'

export const contentCreatorFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  channel_url: z.string().optional(),
  avatar_url: z.string().optional(),
  description: z.string().optional(),
})

export type ContentCreatorFormValues = z.infer<typeof contentCreatorFormSchema>
