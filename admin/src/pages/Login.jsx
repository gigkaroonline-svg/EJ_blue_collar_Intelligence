import { useState } from 'react'
import { api, setToken } from '@/api.js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { strings } from '@/strings.js'

export function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        auth: false,
        body: { email, password },
      })
      setToken(data.token)
      onLogin(data.admin)
    } catch (err) {
      setError(err.message || strings.loginFailed)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bg-muted/40 flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg text-sm font-bold">
            {strings.brandMark}
          </div>
          <div>
            <div className="font-semibold">{strings.brandName}</div>
            <div className="text-muted-foreground text-sm">{strings.brandConsole}</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{strings.loginTitle}</CardTitle>
            <CardDescription>{strings.loginDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="grid gap-4">
              {error ? (
                <div className="bg-destructive/10 text-destructive rounded-lg px-3 py-2 text-sm">
                  {error}
                </div>
              ) : null}
              <div className="grid gap-2">
                <Label htmlFor="admin-email">{strings.loginEmail}</Label>
                <Input
                  id="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  placeholder={strings.loginEmailPlaceholder}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="admin-password">{strings.loginPassword}</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full">
                {busy ? strings.loginSubmitting : strings.loginSubmit}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
