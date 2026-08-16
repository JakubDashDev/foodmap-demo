import { useState } from 'react'
import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { HiCheck, HiChevronUpDown, HiOutlinePlus } from 'react-icons/hi2'
import classNames from 'classnames'

import { FieldError, FieldLabel } from '@/components/common/FieldChrome'

export interface ComboboxOption {
  label: string
  value: string
}

export interface ComboboxProps {
  id?: string
  label?: string
  error?: string
  placeholder?: string
  emptyText?: string
  options: ComboboxOption[]
  value?: string | null
  onValueChange?: (value: string) => void
  disabled?: boolean
  onCreateNew?: (query: string) => void
}

export function Combobox({
  id,
  label,
  error,
  placeholder = 'Search…',
  emptyText = 'No results found.',
  options,
  value,
  onValueChange,
  disabled,
  onCreateNew,
}: ComboboxProps) {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value) ?? null
  const trimmedQuery = inputValue.trim()

  function handleCreateNew(query: string) {
    setOpen(false)
    onCreateNew?.(query)
  }

  return (
    <div className="space-y-1.5">
      {label ? <FieldLabel htmlFor={id}>{label}</FieldLabel> : null}

      <BaseCombobox.Root
        items={options}
        value={selectedOption}
        onValueChange={(next) => onValueChange?.(next?.value ?? '')}
        onInputValueChange={setInputValue}
        isItemEqualToValue={(item, next) => item.value === next.value}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
      >
        <BaseCombobox.InputGroup
          className={classNames(
            'flex h-11 w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-3 transition-colors focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500',
            {
              'border-red-400 focus-within:border-red-500 focus-within:ring-red-500':
                Boolean(error),
            },
            { 'cursor-not-allowed opacity-60': disabled },
          )}
        >
          <BaseCombobox.Input
            id={id}
            placeholder={placeholder}
            className="h-full w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
          />
          <BaseCombobox.Icon>
            <HiChevronUpDown className="size-4 text-gray-400" />
          </BaseCombobox.Icon>
        </BaseCombobox.InputGroup>

        <BaseCombobox.Portal>
          <BaseCombobox.Positioner className="z-50" sideOffset={4}>
            <BaseCombobox.Popup className="max-h-64 w-(--anchor-width) overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              <BaseCombobox.Empty className="text-sm text-gray-500">
                <div className="px-3 py-2">{emptyText}</div>
                {onCreateNew ? (
                  <button
                    type="button"
                    onClick={() => handleCreateNew(trimmedQuery)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-primary-600 hover:bg-primary-50"
                  >
                    <HiOutlinePlus className="size-4" />
                    Create &quot;{trimmedQuery}&quot;
                  </button>
                ) : null}
              </BaseCombobox.Empty>
              <BaseCombobox.List>
                {(option: ComboboxOption) => (
                  <BaseCombobox.Item
                    key={option.value}
                    value={option}
                    className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-gray-700 data-highlighted:bg-primary-50 data-highlighted:text-primary-700"
                  >
                    <span>{option.label}</span>
                    <BaseCombobox.ItemIndicator>
                      <HiCheck className="size-4 text-primary-600" />
                    </BaseCombobox.ItemIndicator>
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>

      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  )
}
