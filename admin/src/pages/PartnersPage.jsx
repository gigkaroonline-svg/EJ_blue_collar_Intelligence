import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { api } from '@/api.js'
import { useList } from '@/hooks/useList.js'
import { StatusBadge } from '@/components/status-badge.jsx'
import { DataCard, PageHeader, Pager, StatCards } from '@/components/page-bits.jsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

const ALL = '__all__'

export function PartnersPage() {
  const [filters, setFilters] = useState({
    q: '',
    role: '',
    status: '',
    isBlocked: '',
    state: '',
    district: '',
  })
  const { page, data, error, setError, loading, load } = useList('/partners', filters)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(null)
  const [busy, setBusy] = useState(false)

  const pageStats = useMemo(() => {
    const items = data.items || []
    return {
      pending: items.filter((r) => r.status === 'pending').length,
      accepted: items.filter((r) => r.status === 'accepted').length,
      blocked: items.filter((r) => r.isBlocked).length,
    }
  }, [data.items])

  function open(row) {
    setEditing(row)
    setForm({
      fullName: row.fullName || '',
      email: row.email || '',
      status: row.status || 'pending',
      rejectionReason: row.rejectionReason || '',
      state: row.state || '',
      district: row.district || '',
    })
  }

  async function save(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await api(`/partners/${editing._id || editing.id}`, {
        method: 'PATCH',
        body: {
          fullName: form.fullName,
          email: form.email,
          status: form.status,
          rejectionReason: form.rejectionReason,
          permanentAddress: {
            ...(editing.permanentAddress || {}),
            state: form.state,
            district: form.district,
          },
        },
      })
      setEditing(null)
      load(page, filters)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function toggleBlock(row) {
    const blocked = !row.isBlocked
    if (!window.confirm(`${blocked ? 'Block' : 'Unblock'} ${row.fullName}?`)) return
    try {
      await api(`/partners/${row._id || row.id}/block`, {
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
      <PageHeader description="Review pending signups, update profiles, and block accounts." />

      <StatCards
        items={[
          {
            id: 'total',
            label: 'Total',
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
            label: 'Pending',
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
            label: 'Accepted',
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
            label: 'Blocked',
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
        emptyTitle="No partners found"
        emptyDescription="Try adjusting filters or wait for new partner signups."
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
                placeholder="Search name, phone, or email"
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              />
            </div>
            <Select
              value={filters.role || ALL}
              onValueChange={(role) => setFilters({ ...filters, role: role === ALL ? '' : role })}
            >
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All roles</SelectItem>
                <SelectItem value="csc">csc</SelectItem>
                <SelectItem value="cmc">cmc</SelectItem>
                <SelectItem value="anganwadi">anganwadi</SelectItem>
                <SelectItem value="gov_ngo">gov_ngo</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.status || ALL}
              onValueChange={(status) => setFilters({ ...filters, status: status === ALL ? '' : status })}
            >
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All statuses</SelectItem>
                <SelectItem value="pending">pending</SelectItem>
                <SelectItem value="accepted">accepted</SelectItem>
                <SelectItem value="rejected">rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.isBlocked || ALL}
              onValueChange={(isBlocked) =>
                setFilters({ ...filters, isBlocked: isBlocked === ALL ? '' : isBlocked })
              }
            >
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Blocked" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Blocked: any</SelectItem>
                <SelectItem value="false">Active</SelectItem>
                <SelectItem value="true">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="w-full lg:w-32"
              placeholder="State"
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            />
            <Input
              className="w-full lg:w-32"
              placeholder="District"
              value={filters.district}
              onChange={(e) => setFilters({ ...filters, district: e.target.value })}
            />
            <Button type="submit">Apply</Button>
          </form>
        }
        footer={<Pager page={page} limit={data.limit} total={data.total} onPage={(p) => load(p, filters)} />}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((row) => (
              <TableRow key={row._id || row.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>
                        {String(row.fullName || '?')
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((p) => p[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{row.fullName}</div>
                      <div className="text-muted-foreground text-xs">{row.email || '—'}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="bg-muted rounded px-1.5 py-0.5 text-xs">{row.role}</code>
                </TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{[row.district, row.state].filter(Boolean).join(', ') || '—'}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    <StatusBadge value={row.status} />
                    {row.isBlocked ? <StatusBadge value="blocked" /> : null}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => open(row)}>
                      Edit
                    </Button>
                    <Button
                      variant={row.isBlocked ? 'outline' : 'destructive'}
                      size="sm"
                      onClick={() => toggleBlock(row)}
                    >
                      {row.isBlocked ? 'Unblock' : 'Block'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataCard>

      <Dialog open={Boolean(editing && form)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit partner</DialogTitle>
            <DialogDescription>
              Phone stays {editing?.phoneNumber}. Partner create from admin is not available yet.
            </DialogDescription>
          </DialogHeader>
          {form ? (
            <form onSubmit={save} className="grid gap-4">
              <div className="grid gap-2">
                <Label>Full name</Label>
                <Input
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(status) => setForm({ ...form, status })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">pending</SelectItem>
                      <SelectItem value="accepted">accepted</SelectItem>
                      <SelectItem value="rejected">rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Input value={editing?.role || ''} disabled />
                </div>
              </div>
              {form.status === 'rejected' ? (
                <div className="grid gap-2">
                  <Label>Rejection reason</Label>
                  <Input
                    value={form.rejectionReason}
                    onChange={(e) => setForm({ ...form, rejectionReason: e.target.value })}
                  />
                </div>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>State</Label>
                  <Input
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>District</Label>
                  <Input
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy}>
                  {busy ? 'Saving…' : 'Save changes'}
                </Button>
              </DialogFooter>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
