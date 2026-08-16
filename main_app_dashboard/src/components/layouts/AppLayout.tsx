import { Outlet } from 'react-router'

import { Sidebar } from '@/components/app/sidebar/Sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-dvh bg-gray-50">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
