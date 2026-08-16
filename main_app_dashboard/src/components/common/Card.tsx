import type { HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={classNames('rounded-lg bg-white p-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div
      className={classNames('mb-3 flex items-start justify-between gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <div
      className={classNames(
        'mt-3 flex items-center justify-end gap-2 border-t border-gray-100 pt-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
