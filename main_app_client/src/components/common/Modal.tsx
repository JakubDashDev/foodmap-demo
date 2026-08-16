import type { ReactNode } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { HiXMark } from 'react-icons/hi2'

const sizeClasses = {
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
} as const

export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  size?: keyof typeof sizeClasses
  children: ReactNode
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/60" />
        <Dialog.Popup
          className={`scrollbar-thin-flush fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-xl ${sizeClasses[size]}`}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold text-gray-100">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-1 text-sm text-gray-400">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close
              aria-label="Zamknij"
              className="cursor-pointer rounded-md p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <HiXMark className="size-5" />
            </Dialog.Close>
          </div>

          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
