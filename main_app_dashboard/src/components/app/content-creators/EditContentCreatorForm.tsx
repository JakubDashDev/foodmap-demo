import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Button } from '@/components/common/Button'
import { Typography } from '@/components/common/Typography'
import { DeleteContentCreatorButton } from '@/components/app/content-creators/DeleteContentCreatorButton'
import { ContentCreatorFormFields } from '@/components/app/content-creators/ContentCreatorFormFields'
import {
  contentCreatorFormSchema,
  type ContentCreatorFormValues,
} from '@/components/app/content-creators/contentCreatorFormSchema'
import { useUpdateContentCreatorMutation } from '@/features/content-creators/api'
import type { IContentCreatorDto } from '@/features/content-creators/types'

export interface EditContentCreatorFormProps {
  contentCreator: IContentCreatorDto
}

export function EditContentCreatorForm({ contentCreator }: EditContentCreatorFormProps) {
  const navigate = useNavigate()
  const [updateContentCreator, { isLoading: isSaving, error }] = useUpdateContentCreatorMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContentCreatorFormValues>({
    defaultValues: {
      name: contentCreator.name,
      channel_url: contentCreator.channel_url ?? '',
      avatar_url: contentCreator.avatar_url ?? '',
      description: contentCreator.description ?? '',
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
      await updateContentCreator({ id: String(contentCreator.id), data: result.data }).unwrap()
      navigate('/content-creators')
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
          Failed to save content creator.
        </Typography>
      ) : null}

      <div className="flex items-center gap-3">
        <Button type="submit" isLoading={isSaving}>
          Save
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate('/content-creators')}>
          Cancel
        </Button>

        <div className="ml-auto">
          <DeleteContentCreatorButton contentCreator={contentCreator} />
        </div>
      </div>
    </form>
  )
}
