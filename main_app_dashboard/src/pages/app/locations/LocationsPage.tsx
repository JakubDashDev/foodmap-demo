import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { HiOutlinePlus } from 'react-icons/hi2'

import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Typography } from '@/components/common/Typography'
import { LocationsSearch } from '@/components/app/locations/LocationsSearch'
import { LocationsSort } from '@/components/app/locations/LocationsSort'
import { LocationsTable } from '@/components/app/locations/LocationsTable'
import type { Location, LocationSortOption } from '@/features/locations/types'
import { useLocationsQuery } from '@/features/locations/api'
import { useQueryParam } from '@/hooks/useQueryParam'

export function LocationsPage() {
  const [search, setSearch] = useQueryParam<string>('search', '')
  const [sort, setSort] = useQueryParam<LocationSortOption>('sort', 'name-asc')
  const [page, setPage] = useState(1)
  const [locations, setLocations] = useState<Location[]>([])

  const { data, isLoading, isFetching, isError } = useLocationsQuery({
    query: search || undefined,
    sort_by: sort,
    page,
  })

  useEffect(() => {
    setPage(1)
  }, [search, sort])

  useEffect(() => {
    if (!data) {
      return
    }

    const mapped = data.data.map((location) => ({
      id: location.id,
      name: location.name,
      address: location.address,
      cuisineType: location.cuisine_type,
      reviewCount: location.review_count,
    }))

    setLocations((previous) => (page === 1 ? mapped : [...previous, ...mapped]))
  }, [data, page])

  return (
    <Container>
      <Typography variant="h1">Locations</Typography>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[18rem_14rem]">
          <LocationsSearch value={search} onChange={setSearch} />
          <LocationsSort value={sort} onChange={setSort} />
        </div>

        <Button
          render={<Link to="/locations/new" />}
          leftIcon={<HiOutlinePlus className="size-4" />}
        >
          New Location
        </Button>
      </div>

      <section className="mt-6">
        <LocationsTable
          locations={locations}
          isLoading={isLoading}
          isError={isError}
          hasNextPage={Boolean(data?.meta.next_page)}
          isFetchingMore={isFetching}
          onLoadMore={() => {
            if (data?.meta.next_page) {
              setPage(data.meta.next_page)
            }
          }}
        />
      </section>
    </Container>
  )
}
