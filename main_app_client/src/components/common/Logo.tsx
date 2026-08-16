import classNames from 'classnames'

type LogoSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<LogoSize, string> = {
  sm: 'h-8',
  md: 'h-14',
  lg: 'h-32',
}

export interface LogoProps {
  size?: LogoSize
  className?: string
}

export function Logo({ size = 'sm', className }: LogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="foodmap"
      className={classNames(sizeClasses[size], 'w-auto', className)}
    />
  )
}
