import { Select as BaseSelect } from '@base-ui/react/select'
import { HiCheck, HiChevronUpDown } from 'react-icons/hi2'
import classNames from 'classnames'

import { FieldError, FieldLabel } from '@/components/common/FieldError'

export interface SelectOption {
  label: string
  value: string
  color?: string
}

export interface SelectProps {
  id?: string
  label?: string
  error?: string
  placeholder?: string
  options: SelectOption[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string) => void
  disabled?: boolean
}

export function Select({
  id,
  label,
  error,
  placeholder = 'Wybierz…',
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label ? <FieldLabel htmlFor={id}>{label}</FieldLabel> : null}

      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => onValueChange?.(next as string)}
        disabled={disabled}
        items={options}
      >
        <BaseSelect.Trigger
          id={id}
          className={classNames(
            'flex h-11 w-full items-center justify-between rounded-md border border-gray-700 bg-gray-800 px-3 text-sm text-gray-100 transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
            { 'border-red-500 focus:border-red-500 focus:ring-red-500': Boolean(error) },
          )}
        >
          <BaseSelect.Value placeholder={placeholder}>
            {(selectedValue: string | null) => {
              const selectedOption = options.find((option) => option.value === selectedValue)

              if (!selectedOption) {
                return placeholder
              }

              return (
                <span className="flex items-center gap-2">
                  {selectedOption.color ? (
                    <span
                      className={classNames('size-2 shrink-0 rounded-full', selectedOption.color)}
                    />
                  ) : null}
                  {selectedOption.label}
                </span>
              )
            }}
          </BaseSelect.Value>
          <BaseSelect.Icon>
            <HiChevronUpDown className="size-4 text-gray-400" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner className="z-50" sideOffset={4}>
            <BaseSelect.Popup className="max-h-64 overflow-auto rounded-md border border-gray-700 bg-gray-800 py-1 shadow-xl">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-gray-300 data-highlighted:bg-primary-500/10 data-highlighted:text-primary-400"
                >
                  <BaseSelect.ItemText className="flex items-center gap-2">
                    {option.color ? (
                      <span className={classNames('size-2 shrink-0 rounded-full', option.color)} />
                    ) : null}
                    {option.label}
                  </BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator>
                    <HiCheck className="size-4 text-primary-500" />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>

      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  )
}
