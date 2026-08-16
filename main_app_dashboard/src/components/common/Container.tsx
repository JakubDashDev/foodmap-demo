import type { HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={classNames('mx-auto w-full px-6 py-8', className)} {...props}>
      {children}
    </div>
  )
}
