import { forwardRef, type InputHTMLAttributes } from 'react'
import classNames from 'classnames'

import { FieldError, FieldLabel } from '@/components/common/FieldError'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className, ...props },
  ref,
) {
  return (
    <div className="space-y-1.5">
      {label ? <FieldLabel htmlFor={id}>{label}</FieldLabel> : null}

      <input
        ref={ref}
        id={id}
        className={classNames(
          'block h-11 w-full rounded-md border border-gray-700 bg-gray-800 px-3 text-sm text-gray-100 placeholder-gray-500 transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none',
          { 'border-red-500 focus:border-red-500 focus:ring-red-500': Boolean(error) },
          className,
        )}
        {...props}
      />

      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  )
})
