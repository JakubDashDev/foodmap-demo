import { useParams } from 'react-router'

import { Container } from '@/components/common/Container'
import { Spinner } from '@/components/common/Spinner'
import { Typography } from '@/components/common/Typography'
import { EditLocationForm } from '@/components/app/locations/EditLocationForm'
import { useLocationQuery } from '@/features/locations/api'

export function EditLocationPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useLocationQuery(id ?? '', { skip: !id })

  return (
    <Container>
      <Typography variant="h1">Edit Location</Typography>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner className="size-6 text-gray-400" />
        </div>
      ) : isError || !data ? (
        <Typography variant="body2" className="mt-2 text-gray-500">
          Failed to load location.
        </Typography>
      ) : (
        <EditLocationForm location={data} />
      )}
    </Container>
  )
}
