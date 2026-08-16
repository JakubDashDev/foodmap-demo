import { Container } from '@/components/common/Container'
import { Typography } from '@/components/common/Typography'
import { NewReviewForm } from '@/components/app/reviews/NewReviewForm'

export function NewReviewPage() {
  return (
    <Container>
      <Typography variant="h1">New Review</Typography>
      <NewReviewForm />
    </Container>
  )
}
