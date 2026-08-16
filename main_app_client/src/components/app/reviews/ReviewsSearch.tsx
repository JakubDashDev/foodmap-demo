import { Input } from '@/components/common/Input'

export interface ReviewsSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ReviewsSearch({ value, onChange }: ReviewsSearchProps) {
  return (
    <Input
      placeholder="Szukaj lokalu, miasta lub twórcy…"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
