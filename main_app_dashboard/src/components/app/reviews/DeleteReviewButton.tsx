import { useState } from 'react'
import { useNavigate } from 'react-router'
import { HiOutlineTrash } from 'react-icons/hi2'

import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { useDeleteReviewMutation } from '@/features/reviews/api'
import type { IReviewDetailDto } from '@/features/reviews/types'

export interface DeleteReviewButtonProps {
  review: IReviewDetailDto
}

export function DeleteReviewButton({ review }: DeleteReviewButtonProps) {
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation()

  async function handleConfirm() {
    try {
      await deleteReview(String(review.id)).unwrap()
      navigate('/reviews')
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
        title="Delete review"
        description="Are you sure you want to delete this review? This cannot be undone."
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
