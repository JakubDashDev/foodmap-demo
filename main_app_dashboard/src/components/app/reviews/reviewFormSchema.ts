import { z } from 'zod'

export const reviewFormSchema = z.object({
  source_url: z.string().min(1, 'Source URL is required'),
  source_type: z.enum(['youtube', 'tiktok'], { message: 'Source type is required' }),
  rating: z.enum(['avoid', 'worth_if_nearby', 'worth_a_detour', 'worth_a_special_trip'], {
    message: 'Rating is required',
  }),
  description: z.string().optional(),
  published_at: z.string().optional(),
  location_id: z.string().min(1, 'Location is required'),
  content_creator_id: z.string().min(1, 'Content creator is required'),
})

export type ReviewFormValues = z.infer<typeof reviewFormSchema>
