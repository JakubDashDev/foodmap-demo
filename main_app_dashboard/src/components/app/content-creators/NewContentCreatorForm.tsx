import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Button } from '@/components/common/Button'
import { Typography } from '@/components/common/Typography'
import { ContentCreatorFormFields } from '@/components/app/content-creators/ContentCreatorFormFields'
import {
  contentCreatorFormSchema,
  type ContentCreatorFormValues,
} from '@/components/app/content-creators/contentCreatorFormSchema'
import { useCreateContentCreatorMutation } from '@/features/content-creators/api'
import type { IContentCreatorDto } from '@/features/content-creators/types'

export interface NewContentCreatorFormProps {
  initialName?: string
  onSuccess?: (contentCreator: IContentCreatorDto) => void
  onCancel?: () => void
}

export function NewContentCreatorForm({
  initialName,
  onSuccess,
  onCancel,
}: NewContentCreatorFormProps) {
  const navigate = useNavigate()
  const [createContentCreator, { isLoading: isSaving, error }] = useCreateContentCreatorMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContentCreatorFormValues>({
    defaultValues: {
      name: initialName ?? '',
      channel_url: '',
      avatar_url: '',
      description: '',
    },
  })

  async function onSubmit(values: ContentCreatorFormValues) {
    const result = contentCreatorFormSchema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContentCreatorFormValues
        setError(field, { message: issue.message })
      }
      return
    }

    try {
      const contentCreator = await createContentCreator(result.data).unwrap()

      if (onSuccess) {
        onSuccess(contentCreator)
      } else {
        navigate('/content-creators')
      }
    } catch (submitError) {
      const apiErrors = (submitError as { errors?: Record<string, string[]> }).errors

      if (apiErrors) {
        for (const [field, messages] of Object.entries(apiErrors)) {
          if (field in contentCreatorFormSchema.shape) {
            setError(field as keyof ContentCreatorFormValues, { message: messages[0] })
          }
        }
      }
    }
  }

  return (
    <form className="mt-6 max-w-xl space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <ContentCreatorFormFields register={register} errors={errors} />

      {error && !('errors' in error) ? (
        <Typography as="p" variant="body2" role="alert" className="text-red-600">
          Failed to create content creator.
        </Typography>
      ) : null}

      <div className="flex gap-3">
        <Button type="submit" isLoading={isSaving}>
          Create
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel ?? (() => navigate('/content-creators'))}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
