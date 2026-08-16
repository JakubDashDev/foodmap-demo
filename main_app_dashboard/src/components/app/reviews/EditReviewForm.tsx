import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Button } from '@/components/common/Button'
import { Typography } from '@/components/common/Typography'
import { DeleteReviewButton } from '@/components/app/reviews/DeleteReviewButton'
import { ReviewFormFields } from '@/components/app/reviews/ReviewFormFields'
import { reviewFormSchema, type ReviewFormValues } from '@/components/app/reviews/reviewFormSchema'
import { useUpdateReviewMutation } from '@/features/reviews/api'
import type { IReviewDetailDto } from '@/features/reviews/types'

export interface EditReviewFormProps {
  review: IReviewDetailDto
}

export function EditReviewForm({ review }: EditReviewFormProps) {
  const navigate = useNavigate()
  const [updateReview, { isLoading: isSaving, error }] = useUpdateReviewMutation()

  const {
    register,
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      source_url: review.source_url,
      source_type: review.source_type,
      rating: review.rating,
      description: review.description ?? '',
      published_at: review.published_at ? review.published_at.slice(0, 10) : '',
      location_id: String(review.location_id),
      content_creator_id: String(review.content_creator_id),
    },
  })

  async function onSubmit(values: ReviewFormValues) {
    const result = reviewFormSchema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ReviewFormValues
        setError(field, { message: issue.message })
      }
      return
    }

    try {
      await updateReview({ id: String(review.id), data: result.data }).unwrap()
      navigate('/reviews')
    } catch (submitError) {
      const apiErrors = (submitError as { errors?: Record<string, string[]> }).errors

      if (apiErrors) {
        for (const [field, messages] of Object.entries(apiErrors)) {
          if (field in reviewFormSchema.shape) {
            setError(field as keyof ReviewFormValues, { message: messages[0] })
          }
        }
      }
    }
  }

  return (
    <form className="mt-6 max-w-xl space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <ReviewFormFields register={register} control={control} setValue={setValue} errors={errors} />

      {error && !('errors' in error) ? (
        <Typography as="p" variant="body2" role="alert" className="text-red-600">
          Failed to save review.
        </Typography>
      ) : null}

      <div className="flex items-center gap-3">
        <Button type="submit" isLoading={isSaving}>
          Save
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate('/reviews')}>
          Cancel
        </Button>

        <div className="ml-auto">
          <DeleteReviewButton review={review} />
        </div>
      </div>
    </form>
  )
}
