import { useEffect, useState } from 'react'
import { api, qs } from '../api.js'

export function useList(path, filters) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState({ items: [], total: 0, limit: 20 })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function load(p = page, f = filters) {
    setLoading(true)
    setError('')
    try {
      const res = await api(`${path}${qs({ ...f, page: p, limit: 20 })}`)
      setData(res)
      setPage(p)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(1, filters)
    // initial load only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { page, data, error, setError, loading, load }
}
