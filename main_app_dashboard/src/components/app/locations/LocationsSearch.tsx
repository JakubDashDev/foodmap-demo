import { Input } from '@/components/common/Input'

export interface LocationsSearchProps {
  value: string
  onChange: (value: string) => void
}

export function LocationsSearch({ value, onChange }: LocationsSearchProps) {
  return (
    <Input
      label="Search"
      placeholder="Search by name or address…"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
