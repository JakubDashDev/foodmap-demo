import { z } from 'zod'

export const locationFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  cuisine_type: z.string().optional(),
  description: z.string().optional(),
  latitude: z
    .string()
    .min(1, 'Latitude is required')
    .refine((value) => !Number.isNaN(Number(value)), 'Must be a number'),
  longitude: z
    .string()
    .min(1, 'Longitude is required')
    .refine((value) => !Number.isNaN(Number(value)), 'Must be a number'),
})

export type LocationFormValues = z.infer<typeof locationFormSchema>
