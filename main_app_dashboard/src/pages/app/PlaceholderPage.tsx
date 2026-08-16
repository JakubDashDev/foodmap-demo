import { Container } from '@/components/common/Container'
import { Typography } from '@/components/common/Typography'

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <Container>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="body2" className="mt-2 text-gray-500">
        Coming soon.
      </Typography>
    </Container>
  )
}
