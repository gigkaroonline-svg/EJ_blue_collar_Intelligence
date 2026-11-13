const TOKEN_KEY = 'rojmitra_admin_token'

/** Backend origin. Empty in local Vite → relative `/api` (proxied). */
function apiOrigin() {
  const fromEnv = String(import.meta.env.VITE_API_URL || '')
    .trim()
    .replace(/\/$/, '')
  if (fromEnv) return fromEnv
  // Production build default when host doesn't inject VITE_API_URL
  if (import.meta.env.PROD) return 'https://backendapi.rojmitra.in'
  return ''
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export async function api(path, { method = 'GET', body, auth = true } = {}) {
  const headers = {}
  let payload
  if (body != null) {
    if (body instanceof FormData) {
      payload = body
    } else {
      headers['Content-Type'] = 'application/json'
      payload = JSON.stringify(body)
    }
  }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }
  const res = await fetch(`${apiOrigin()}/api/admin${path}`, {
    method,
    headers,
    body: payload,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || res.statusText || 'Request failed')
    err.code = data.code
    err.status = res.status
    throw err
  }
  return data
}

export function qs(params) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params || {})) {
    if (v == null || v === '') continue
    sp.set(k, String(v))
  }
  const s = sp.toString()
  return s ? `?${s}` : ''
}
