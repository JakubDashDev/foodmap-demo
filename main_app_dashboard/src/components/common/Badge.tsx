import type { ReactNode } from 'react'
import classNames from 'classnames'

type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

export interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-50 text-primary-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
}

export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
