import { Modal } from '@/components/common/Modal'
import { NewContentCreatorForm } from '@/components/app/content-creators/NewContentCreatorForm'
import type { IContentCreatorDto } from '@/features/content-creators/types'

export interface CreateContentCreatorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialName?: string
  onCreated: (contentCreator: IContentCreatorDto) => void
}

export function CreateContentCreatorModal({
  open,
  onOpenChange,
  initialName,
  onCreated,
}: CreateContentCreatorModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="New Content Creator">
      <NewContentCreatorForm
        initialName={initialName}
        onCancel={() => onOpenChange(false)}
        onSuccess={(contentCreator) => {
          onOpenChange(false)
          onCreated(contentCreator)
        }}
      />
    </Modal>
  )
}
