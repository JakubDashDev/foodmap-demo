import { Container } from '@/components/common/Container'
import { Typography } from '@/components/common/Typography'
import { NewLocationForm } from '@/components/app/locations/NewLocationForm'

export function NewLocationPage() {
  return (
    <Container>
      <Typography variant="h1">New Location</Typography>
      <NewLocationForm />
    </Container>
  )
}
