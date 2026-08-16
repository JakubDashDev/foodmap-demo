import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Button } from '@/components/common/Button'
import { Typography } from '@/components/common/Typography'
import { DeleteLocationButton } from '@/components/app/locations/DeleteLocationButton'
import { LocationFormFields } from '@/components/app/locations/LocationFormFields'
import {
  locationFormSchema,
  type LocationFormValues,
} from '@/components/app/locations/locationFormSchema'
import { useUpdateLocationMutation } from '@/features/locations/api'
import type { ILocationDetailDto } from '@/features/locations/types'

export interface EditLocationFormProps {
  location: ILocationDetailDto
}

export function EditLocationForm({ location }: EditLocationFormProps) {
  const navigate = useNavigate()
  const [updateLocation, { isLoading: isSaving, error }] = useUpdateLocationMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LocationFormValues>({
    defaultValues: {
      name: location.name,
      address: location.address,
      cuisine_type: location.cuisine_type ?? '',
      description: location.description ?? '',
      latitude: location.latitude,
      longitude: location.longitude,
    },
  })

  async function onSubmit(values: LocationFormValues) {
    const result = locationFormSchema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LocationFormValues
        setError(field, { message: issue.message })
      }
      return
    }

    try {
      await updateLocation({ id: String(location.id), data: result.data }).unwrap()
      navigate('/locations')
    } catch (submitError) {
      const apiErrors = (submitError as { errors?: Record<string, string[]> }).errors

      if (apiErrors) {
        for (const [field, messages] of Object.entries(apiErrors)) {
          if (field in locationFormSchema.shape) {
            setError(field as keyof LocationFormValues, { message: messages[0] })
          }
        }
      }
    }
  }

  return (
    <form className="mt-6 max-w-xl space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <LocationFormFields register={register} errors={errors} />

      {error && !('errors' in error) ? (
        <Typography as="p" variant="body2" role="alert" className="text-red-600">
          Failed to save location.
        </Typography>
      ) : null}

      <div className="flex items-center gap-3">
        <Button type="submit" isLoading={isSaving}>
          Save
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate('/locations')}>
          Cancel
        </Button>

        <div className="ml-auto">
          <DeleteLocationButton location={location} />
        </div>
      </div>
    </form>
  )
}
