import { Modal } from '@/components/common/Modal'
import { NewLocationForm } from '@/components/app/locations/NewLocationForm'
import type { ILocationDetailDto } from '@/features/locations/types'

export interface CreateLocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialName?: string
  onCreated: (location: ILocationDetailDto) => void
}

export function CreateLocationModal({
  open,
  onOpenChange,
  initialName,
  onCreated,
}: CreateLocationModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="New Location">
      <NewLocationForm
        initialName={initialName}
        onCancel={() => onOpenChange(false)}
        onSuccess={(location) => {
          onOpenChange(false)
          onCreated(location)
        }}
      />
    </Modal>
  )
}
