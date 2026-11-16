import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { api, getToken, setToken } from '@/api.js'
import { Login } from '@/pages/Login.jsx'
import { Shell } from '@/layout/Shell.jsx'
import { PartnersPage } from '@/pages/PartnersPage.jsx'
import { CompaniesPage } from '@/pages/CompaniesPage.jsx'
import { JobsPage } from '@/pages/JobsPage.jsx'
import { WorkersPage } from '@/pages/WorkersPage.jsx'
import { BlogsPage } from '@/pages/BlogsPage.jsx'
import { Skeleton } from '@/components/ui/skeleton'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function App() {
  const [admin, setAdmin] = useState(null)
  const [booting, setBooting] = useState(Boolean(getToken()))

  useEffect(() => {
    let cancelled = false
    async function boot() {
      if (!getToken()) {
        setBooting(false)
        return
      }
      try {
        const data = await api('/auth/me')
        if (!cancelled) setAdmin(data.admin)
      } catch {
        setToken(null)
      } finally {
        if (!cancelled) setBooting(false)
      }
    }
    boot()
    return () => {
      cancelled = true
    }
  }, [])

  if (booting) {
    return (
      <div className="flex min-h-svh items-center justify-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-28" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <Routes>
        <Route
          path="/login"
          element={
            admin ? (
              <Navigate to="/partners" replace />
            ) : (
              <Login onLogin={setAdmin} />
            )
          }
        />
        <Route
          path="/"
          element={
            admin ? (
              <Shell
                admin={admin}
                onLogout={() => {
                  setToken(null)
                  setAdmin(null)
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="/partners" replace />} />
          <Route path="partners" element={<PartnersPage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="workers" element={<WorkersPage />} />
          <Route path="blogs" element={<BlogsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={admin ? '/partners' : '/login'} replace />} />
      </Routes>
    </TooltipProvider>
  )
}
