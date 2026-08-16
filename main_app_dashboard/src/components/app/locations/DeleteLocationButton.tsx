import { useState } from 'react'
import { useNavigate } from 'react-router'
import { HiOutlineTrash } from 'react-icons/hi2'

import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { useDeleteLocationMutation } from '@/features/locations/api'
import type { ILocationDetailDto } from '@/features/locations/types'

export interface DeleteLocationButtonProps {
  location: ILocationDetailDto
}

export function DeleteLocationButton({ location }: DeleteLocationButtonProps) {
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteLocation, { isLoading: isDeleting }] = useDeleteLocationMutation()

  async function handleConfirm() {
    try {
      await deleteLocation(String(location.id)).unwrap()
      navigate('/locations')
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
        title="Delete location"
        description={`Are you sure you want to delete "${location.name}"? This cannot be undone.`}
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
