import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router'

import { AppLayout } from '@/components/layouts/AppLayout'
import { useSessionQuery } from '@/features/auth/api'
import { LoginPage } from '@/pages/auth/Login'
import { Dashboard } from '@/pages/app/Dashboard'
import { LocationsPage } from '@/pages/app/locations/LocationsPage'
import { NewLocationPage } from '@/pages/app/locations/NewLocationPage'
import { EditLocationPage } from '@/pages/app/locations/EditLocationPage'
import { ContentCreatorsPage } from '@/pages/app/content-creators/ContentCreatorsPage'
import { NewContentCreatorPage } from '@/pages/app/content-creators/NewContentCreatorPage'
import { EditContentCreatorPage } from '@/pages/app/content-creators/EditContentCreatorPage'
import { ReviewsPage } from '@/pages/app/reviews/ReviewsPage'
import { NewReviewPage } from '@/pages/app/reviews/NewReviewPage'
import { EditReviewPage } from '@/pages/app/reviews/EditReviewPage'

function ProtectedRoute() {
  const { data, isError, isLoading } = useSessionQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  if (isLoading) {
    return null
  }

  if (isError || !data?.admin_user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

function GuestRoute() {
  const { data, isError, isLoading } = useSessionQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  if (isLoading) {
    return null
  }

  if (!isError && data?.admin_user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/new" element={<NewLocationPage />} />
            <Route path="/locations/:id/edit" element={<EditLocationPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/reviews/new" element={<NewReviewPage />} />
            <Route path="/reviews/:id/edit" element={<EditReviewPage />} />
            <Route path="/content-creators" element={<ContentCreatorsPage />} />
            <Route path="/content-creators/new" element={<NewContentCreatorPage />} />
            <Route path="/content-creators/:id/edit" element={<EditContentCreatorPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
