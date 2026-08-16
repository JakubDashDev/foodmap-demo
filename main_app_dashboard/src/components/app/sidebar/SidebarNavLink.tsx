import type { ComponentType, SVGProps } from 'react'
import { NavLink } from 'react-router'
import classNames from 'classnames'

export interface SidebarNavLinkProps {
  to: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  end?: boolean
  disabled?: boolean
}

export function SidebarNavLink({ to, label, icon: Icon, end, disabled }: SidebarNavLinkProps) {
  if (disabled) {
    return (
      <div
        aria-disabled="true"
        className="flex cursor-not-allowed items-center gap-4 rounded-md px-4 py-4 text-base font-medium text-gray-300"
      >
        <Icon className="size-6 shrink-0" />
        {label}
      </div>
    )
  }

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        classNames(
          'flex items-center gap-4 rounded-md px-4 py-4 text-base font-medium transition-colors',
          isActive
            ? 'bg-primary-50 text-primary-700'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        )
      }
    >
      <Icon className="size-6 shrink-0" />
      {label}
    </NavLink>
  )
}
