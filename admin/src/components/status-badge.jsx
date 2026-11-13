import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const styles = {
  accepted: 'border-transparent bg-emerald-100 text-emerald-800',
  ok: 'border-transparent bg-emerald-100 text-emerald-800',
  ready: 'border-transparent bg-emerald-100 text-emerald-800',
  pending: 'border-transparent bg-amber-100 text-amber-800',
  'not ready': 'border-transparent bg-amber-100 text-amber-800',
  rejected: 'border-transparent bg-red-100 text-red-800',
  blocked: 'border-transparent bg-red-100 text-red-800',
  published: 'border-transparent bg-emerald-100 text-emerald-800',
  draft: 'border-transparent bg-slate-100 text-slate-700',
}

export function StatusBadge({ value, kind }) {
  const key = String(kind || value || '').toLowerCase()
  return (
    <Badge variant="outline" className={cn('lowercase', styles[key])}>
      {value}
    </Badge>
  )
}
