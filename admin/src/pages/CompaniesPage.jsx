import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { api } from '@/api.js'
import { useList } from '@/hooks/useList.js'
import { StatusBadge } from '@/components/status-badge.jsx'
import { DataCard, PageHeader, Pager, StatCards } from '@/components/page-bits.jsx'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { strings, t } from '@/strings.js'

const ALL = '__all__'

export function CompaniesPage() {
  const [filters, setFilters] = useState({ q: '', status: '', isBlocked: '' })
  const { page, data, error, setError, loading, load } = useList('/companies', filters)
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', status: 'accepted' })
  const [busy, setBusy] = useState(false)

  const pageStats = useMemo(() => {
    const items = data.items || []
    return {
      pending: items.filter((r) => r.status === 'pending').length,
      accepted: items.filter((r) => r.status === 'accepted').length,
      blocked: items.filter((r) => r.isBlocked).length,
    }
  }, [data.items])

  async function saveEdit(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await api(`/companies/${editing._id || editing.id}`, {
        method: 'PATCH',
        body: { name: form.name, status: form.status },
      })
      setEditing(null)
      load(page, filters)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function create(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await api('/companies', { method: 'POST', body: form })
      setAdding(false)
      setForm({ name: '', status: 'accepted' })
      load(1, filters)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function toggleBlock(row) {
    const blocked = !row.isBlocked
    if (!window.confirm(t(blocked ? 'commonConfirmBlock' : 'commonConfirmUnblock', { name: row.name }))) return
    try {
      await api(`/companies/${row._id || row.id}/block`, {
        method: 'PATCH',
        body: { blocked },
      })
      load(page, filters)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        description={strings.companiesDescription}
        action={
          <Button
            onClick={() => {
              setForm({ name: '', status: 'accepted' })
              setAdding(true)
            }}
          >
            <Plus />
            {strings.companiesAdd}
          </Button>
        }
      />

      <StatCards
        items={[
          {
            id: 'total',
            label: strings.commonTotal,
            value: data.total ?? 0,
            active: !filters.status && !filters.isBlocked,
            onClick: () => {
              const next = { ...filters, status: '', isBlocked: '' }
              setFilters(next)
              load(1, next)
            },
          },
          {
            id: 'pending',
            label: strings.commonPending,
            value: filters.status === 'pending' ? data.total ?? 0 : pageStats.pending,
            active: filters.status === 'pending',
            onClick: () => {
              const next = { ...filters, status: 'pending' }
              setFilters(next)
              load(1, next)
            },
          },
          {
            id: 'accepted',
            label: strings.commonAccepted,
            value: filters.status === 'accepted' ? data.total ?? 0 : pageStats.accepted,
            active: filters.status === 'accepted',
            onClick: () => {
              const next = { ...filters, status: 'accepted' }
              setFilters(next)
              load(1, next)
            },
          },
          {
            id: 'blocked',
            label: strings.commonBlocked,
            value: filters.isBlocked === 'true' ? data.total ?? 0 : pageStats.blocked,
            active: filters.isBlocked === 'true',
            onClick: () => {
              const next = { ...filters, isBlocked: 'true', status: '' }
              setFilters(next)
              load(1, next)
            },
          },
        ]}
      />

      {error ? (
        <div className="bg-destructive/10 text-destructive rounded-lg px-3 py-2 text-sm">{error}</div>
      ) : null}

      <DataCard
        loading={loading}
        empty={!data.items.length}
        emptyTitle={strings.companiesEmptyTitle}
        emptyDescription={strings.companiesEmptyDescription}
        toolbar={
          <form
            className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center"
            onSubmit={(e) => {
              e.preventDefault()
              load(1, filters)
            }}
          >
            <div className="relative min-w-[220px] flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
              <Input
                className="pl-8"
                type="search"
                placeholder={strings.companiesSearchPlaceholder}
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              />
            </div>
            <Select
              value={filters.status || ALL}
              onValueChange={(status) => setFilters({ ...filters, status: status === ALL ? '' : status })}
            >
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder={strings.commonStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{strings.commonAllStatuses}</SelectItem>
                <SelectItem value="pending">{strings.statusPending}</SelectItem>
                <SelectItem value="accepted">{strings.statusAccepted}</SelectItem>
                <SelectItem value="rejected">{strings.statusRejected}</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.isBlocked || ALL}
              onValueChange={(isBlocked) =>
                setFilters({ ...filters, isBlocked: isBlocked === ALL ? '' : isBlocked })
              }
            >
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder={strings.commonBlocked} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{strings.commonBlockedAny}</SelectItem>
                <SelectItem value="false">{strings.commonActive}</SelectItem>
                <SelectItem value="true">{strings.commonBlocked}</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">{strings.commonApply}</Button>
          </form>
        }
        footer={<Pager page={page} limit={data.limit} total={data.total} onPage={(p) => load(p, filters)} />}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{strings.commonName}</TableHead>
              <TableHead>{strings.commonStatus}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((row) => (
              <TableRow key={row._id || row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    <StatusBadge value={row.status} />
                    {row.isBlocked ? <StatusBadge value="blocked" /> : null}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditing(row)
                        setForm({ name: row.name, status: row.status })
                      }}
                    >
                      {strings.commonEdit}
                    </Button>
                    <Button
                      variant={row.isBlocked ? 'outline' : 'destructive'}
                      size="sm"
                      onClick={() => toggleBlock(row)}
                    >
                      {row.isBlocked ? strings.commonUnblock : strings.commonBlock}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataCard>

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{strings.companiesEditTitle}</DialogTitle>
          </DialogHeader>
          <form onSubmit={saveEdit} className="grid gap-4">
            <div className="grid gap-2">
              <Label>{strings.commonName}</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>{strings.commonStatus}</Label>
              <Select value={form.status} onValueChange={(status) => setForm({ ...form, status })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">{strings.statusPending}</SelectItem>
                  <SelectItem value="accepted">{strings.statusAccepted}</SelectItem>
                  <SelectItem value="rejected">{strings.statusRejected}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                {strings.commonCancel}
              </Button>
              <Button type="submit" disabled={busy}>
                {busy ? strings.commonSaving : strings.commonSaveChanges}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={adding} onOpenChange={(open) => !open && setAdding(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{strings.companiesAddTitle}</DialogTitle>
          </DialogHeader>
          <form onSubmit={create} className="grid gap-4">
            <div className="grid gap-2">
              <Label>{strings.commonName}</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>{strings.commonStatus}</Label>
              <Select value={form.status} onValueChange={(status) => setForm({ ...form, status })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accepted">{strings.statusAccepted}</SelectItem>
                  <SelectItem value="pending">{strings.statusPending}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAdding(false)}>
                {strings.commonCancel}
              </Button>
              <Button type="submit" disabled={busy}>
                {busy ? strings.commonCreating : strings.commonCreate}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
