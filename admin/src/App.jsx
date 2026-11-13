import { useEffect, useState } from 'react'
import { api, getToken, setToken } from '@/api.js'
import { Login } from '@/pages/Login.jsx'
import { Shell } from '@/layout/Shell.jsx'
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
      {!admin ? (
        <Login onLogin={setAdmin} />
      ) : (
        <Shell
          admin={admin}
          onLogout={() => {
            setToken(null)
            setAdmin(null)
          }}
        />
      )}
    </TooltipProvider>
  )
}
