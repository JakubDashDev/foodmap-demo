import type { ElementType, HTMLAttributes } from 'react'
import classNames from 'classnames'

const variantClasses = {
  h1: 'text-3xl leading-tight font-bold',
  h2: 'text-2xl leading-tight font-bold',
  h3: 'text-xl leading-tight font-semibold',
  h4: 'text-lg leading-snug font-semibold',
  h5: 'text-base leading-normal font-semibold',
  h6: 'text-sm leading-normal font-semibold',
  subtitle1: 'text-base leading-normal font-medium',
  subtitle2: 'text-sm leading-normal font-medium',
  body1: 'text-base leading-normal font-normal',
  body2: 'text-sm leading-normal font-normal',
  caption: 'text-xs leading-normal font-normal text-gray-500',
  overline: 'text-xs leading-normal font-semibold tracking-wider uppercase text-gray-500',
} as const

const variantElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
} as const satisfies Record<TypographyVariant, ElementType>

export type TypographyVariant = keyof typeof variantClasses

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant?: TypographyVariant
}

export function Typography({ as, variant = 'body1', className, ...props }: TypographyProps) {
  const Element = as ?? variantElements[variant]

  return (
    <Element
      className={classNames('text-gray-900', variantClasses[variant], className)}
      {...props}
    />
  )
}
