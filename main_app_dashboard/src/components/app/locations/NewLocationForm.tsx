import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Button } from '@/components/common/Button'
import { Typography } from '@/components/common/Typography'
import { LocationFormFields } from '@/components/app/locations/LocationFormFields'
import {
  locationFormSchema,
  type LocationFormValues,
} from '@/components/app/locations/locationFormSchema'
import { useCreateLocationMutation } from '@/features/locations/api'
import type { ILocationDetailDto } from '@/features/locations/types'

export interface NewLocationFormProps {
  initialName?: string
  onSuccess?: (location: ILocationDetailDto) => void
  onCancel?: () => void
}

export function NewLocationForm({ initialName, onSuccess, onCancel }: NewLocationFormProps) {
  const navigate = useNavigate()
  const [createLocation, { isLoading: isSaving, error }] = useCreateLocationMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LocationFormValues>({
    defaultValues: {
      name: initialName ?? '',
      address: '',
      cuisine_type: '',
      description: '',
      latitude: '',
      longitude: '',
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
      const location = await createLocation(result.data).unwrap()

      if (onSuccess) {
        onSuccess(location)
      } else {
        navigate('/locations')
      }
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
          Failed to create location.
        </Typography>
      ) : null}

      <div className="flex gap-3">
        <Button type="submit" isLoading={isSaving}>
          Create
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel ?? (() => navigate('/locations'))}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
