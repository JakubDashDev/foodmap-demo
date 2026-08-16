import { BrowserRouter, Route, Routes } from 'react-router'

import { Home } from '@/pages/Home'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations/:id" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
