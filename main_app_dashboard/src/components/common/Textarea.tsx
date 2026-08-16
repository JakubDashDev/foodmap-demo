import { forwardRef, type TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'

import { FieldError, FieldLabel } from '@/components/common/FieldChrome'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, id, className, rows = 4, ...props },
  ref,
) {
  return (
    <div className="space-y-1.5">
      {label ? <FieldLabel htmlFor={id}>{label}</FieldLabel> : null}

      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={classNames(
          'block w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none',
          { 'border-red-400 focus:border-red-500 focus:ring-red-500': Boolean(error) },
          className,
        )}
        {...props}
      />

      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  )
})
