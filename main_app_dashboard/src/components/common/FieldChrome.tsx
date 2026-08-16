import { Typography } from '@/components/common/Typography'

export function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  )
}

export function FieldError({ children }: { children: string }) {
  return (
    <Typography as="p" variant="body2" role="alert" className="text-red-600">
      {children}
    </Typography>
  )
}
