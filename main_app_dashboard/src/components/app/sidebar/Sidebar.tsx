import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBolt,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineHome,
  HiOutlineMapPin,
  HiOutlineUserGroup,
  HiXMark,
} from 'react-icons/hi2'

import { Logo } from '@/components/common/Logo'
import { SidebarNavLink } from '@/components/app/sidebar/SidebarNavLink'
import { useLogoutMutation } from '@/features/auth/api'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: HiOutlineHome, end: true },
  { to: '/locations', label: 'Locations', icon: HiOutlineMapPin },
  { to: '/reviews', label: 'Reviews', icon: HiOutlineChatBubbleLeftRight },
  { to: '/content-creators', label: 'Content Creators', icon: HiOutlineUserGroup },
  { to: '/statistics', label: 'Statistics', icon: HiOutlineChartBar, disabled: true },
  { to: '/automations', label: 'Automations', icon: HiOutlineBolt, disabled: true },
]

export interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const [logout] = useLogoutMutation()

  return (
    <aside className="flex h-dvh w-full shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="relative flex items-center justify-center px-6 py-8">
        <Logo size="md" />

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 md:hidden"
          >
            <HiXMark className="size-5" />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-3 px-4">
        {NAV_ITEMS.map((item) => (
          <SidebarNavLink key={item.to} {...item} />
        ))}
      </nav>

      <div className="border-t border-gray-200 px-4 py-4">
        <button
          type="button"
          onClick={() => logout()}
          className="flex w-full items-center gap-4 rounded-md px-4 py-4 text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <HiOutlineArrowRightOnRectangle className="size-6 shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  )
}
