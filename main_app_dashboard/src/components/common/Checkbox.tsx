import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { HiCheck } from 'react-icons/hi2'
import classNames from 'classnames'

export interface CheckboxProps {
  id?: string
  label?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Checkbox({
  id,
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={classNames(
        'inline-flex items-center gap-2 text-sm text-gray-700',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className,
      )}
    >
      <BaseCheckbox.Root
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="flex size-4 items-center justify-center rounded border border-gray-300 bg-white data-[checked]:border-primary-500 data-[checked]:bg-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus:outline-none"
      >
        <BaseCheckbox.Indicator className="text-white">
          <HiCheck className="size-3" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label}
    </label>
  )
}
