import { useParams } from 'react-router'

import { Container } from '@/components/common/Container'
import { Spinner } from '@/components/common/Spinner'
import { Typography } from '@/components/common/Typography'
import { EditContentCreatorForm } from '@/components/app/content-creators/EditContentCreatorForm'
import { useContentCreatorQuery } from '@/features/content-creators/api'

export function EditContentCreatorPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useContentCreatorQuery(id ?? '', { skip: !id })

  return (
    <Container>
      <Typography variant="h1">Edit Content Creator</Typography>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner className="size-6 text-gray-400" />
        </div>
      ) : isError || !data ? (
        <Typography variant="body2" className="mt-2 text-gray-500">
          Failed to load content creator.
        </Typography>
      ) : (
        <EditContentCreatorForm contentCreator={data} />
      )}
    </Container>
  )
}
