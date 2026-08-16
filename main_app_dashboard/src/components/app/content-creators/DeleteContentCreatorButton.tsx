import { useState } from 'react'
import { useNavigate } from 'react-router'
import { HiOutlineTrash } from 'react-icons/hi2'

import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { useDeleteContentCreatorMutation } from '@/features/content-creators/api'
import type { IContentCreatorDto } from '@/features/content-creators/types'

export interface DeleteContentCreatorButtonProps {
  contentCreator: IContentCreatorDto
}

export function DeleteContentCreatorButton({ contentCreator }: DeleteContentCreatorButtonProps) {
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteContentCreator, { isLoading: isDeleting }] = useDeleteContentCreatorMutation()

  async function handleConfirm() {
    try {
      await deleteContentCreator(String(contentCreator.id)).unwrap()
      navigate('/content-creators')
    } catch {
      setIsConfirmOpen(false)
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="danger"
        leftIcon={<HiOutlineTrash className="size-4" />}
        onClick={() => setIsConfirmOpen(true)}
      >
        Delete
      </Button>

      <Modal
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Delete content creator"
        description={`Are you sure you want to delete "${contentCreator.name}"? This cannot be undone.`}
      >
        <div className="mt-4 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => setIsConfirmOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant="danger" isLoading={isDeleting} onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  )
}
