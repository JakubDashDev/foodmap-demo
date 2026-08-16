import { Container } from '@/components/common/Container'
import { Typography } from '@/components/common/Typography'
import { NewContentCreatorForm } from '@/components/app/content-creators/NewContentCreatorForm'

export function NewContentCreatorPage() {
  return (
    <Container>
      <Typography variant="h1">New Content Creator</Typography>
      <NewContentCreatorForm />
    </Container>
  )
}
