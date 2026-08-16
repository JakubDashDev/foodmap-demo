import { Input } from '@/components/common/Input'

export interface ContentCreatorsSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ContentCreatorsSearch({ value, onChange }: ContentCreatorsSearchProps) {
  return (
    <Input
      label="Search"
      placeholder="Search by name or channel…"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
