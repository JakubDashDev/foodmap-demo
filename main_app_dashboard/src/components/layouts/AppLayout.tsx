import { useState } from 'react'
import { Outlet } from 'react-router'
import { HiOutlineBars3 } from 'react-icons/hi2'
import classNames from 'classnames'

import { Logo } from '@/components/common/Logo'
import { Sidebar } from '@/components/app/sidebar/Sidebar'

export function AppLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-dvh bg-gray-50">
      {isSidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={classNames(
          'fixed inset-y-0 left-0 z-40 w-full transition-transform duration-300 ease-in-out md:static md:z-auto md:w-80 md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <HiOutlineBars3 className="size-6" />
          </button>
          <Logo size="sm" />
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
