import { Modal } from '@/components/common/Modal'
import { Spinner } from '@/components/common/Spinner'
import { useLocationQuery } from '@/features/locations/api'
import { mapLocation } from '@/features/locations/mapLocation'
import { LocationModalContent } from '@/components/app/locationModal/LocationModalContent'

export interface LocationModalProps {
  locationId: number | null
  onClose: () => void
}

export function LocationModal({ locationId, onClose }: LocationModalProps) {
  const { data, isLoading, isError } = useLocationQuery(locationId ?? 0, {
    skip: locationId === null,
  })
  const location = data ? mapLocation(data) : null

  return (
    <Modal
      open={locationId !== null}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
      title={location?.name ?? 'Recenzje lokalu'}
      size="xl"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner className="size-6 text-gray-500" />
        </div>
      ) : isError || !location ? (
        <p className="py-16 text-center text-sm text-gray-400">
          Nie udało się załadować informacji o lokalu 💔
        </p>
      ) : (
        <LocationModalContent key={location.id} location={location} />
      )}
    </Modal>
  )
}
