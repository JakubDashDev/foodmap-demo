import { useParams } from 'react-router'

import { Container } from '@/components/common/Container'
import { Spinner } from '@/components/common/Spinner'
import { Typography } from '@/components/common/Typography'
import { EditReviewForm } from '@/components/app/reviews/EditReviewForm'
import { useReviewQuery } from '@/features/reviews/api'

export function EditReviewPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useReviewQuery(id ?? '', { skip: !id })

  return (
    <Container>
      <Typography variant="h1">Edit Review</Typography>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner className="size-6 text-gray-400" />
        </div>
      ) : isError || !data ? (
        <Typography variant="body2" className="mt-2 text-gray-500">
          Failed to load review.
        </Typography>
      ) : (
        <EditReviewForm review={data} />
      )}
    </Container>
  )
}
