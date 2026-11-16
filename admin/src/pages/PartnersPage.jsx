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
import { strings, t } from '@/strings.js'

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
    if (!window.confirm(t(blocked ? 'commonConfirmBlock' : 'commonConfirmUnblock', { name: row.fullName }))) return
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
      <PageHeader description={strings.partnersDescription} />

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
        emptyTitle={strings.partnersEmptyTitle}
        emptyDescription={strings.partnersEmptyDescription}
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
                placeholder={strings.partnersSearchPlaceholder}
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              />
            </div>
            <Select
              value={filters.role || ALL}
              onValueChange={(role) => setFilters({ ...filters, role: role === ALL ? '' : role })}
            >
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder={strings.commonRole} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{strings.partnersAllRoles}</SelectItem>
                <SelectItem value="csc">{strings.roleCsc}</SelectItem>
                <SelectItem value="cmc">{strings.roleCmc}</SelectItem>
                <SelectItem value="anganwadi">{strings.roleAnganwadi}</SelectItem>
                <SelectItem value="gov_ngo">{strings.roleGovNgo}</SelectItem>
              </SelectContent>
            </Select>
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
            <Input
              className="w-full lg:w-32"
              placeholder={strings.commonState}
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            />
            <Input
              className="w-full lg:w-32"
              placeholder={strings.commonDistrict}
              value={filters.district}
              onChange={(e) => setFilters({ ...filters, district: e.target.value })}
            />
            <Button type="submit">{strings.commonApply}</Button>
          </form>
        }
        footer={<Pager page={page} limit={data.limit} total={data.total} onPage={(p) => load(p, filters)} />}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{strings.commonName}</TableHead>
              <TableHead>{strings.commonRole}</TableHead>
              <TableHead>{strings.commonPhone}</TableHead>
              <TableHead>{strings.commonLocation}</TableHead>
              <TableHead>{strings.commonStatus}</TableHead>
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
                        {String(row.fullName || strings.commonUnknownInitial)
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((p) => p[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{row.fullName}</div>
                      <div className="text-muted-foreground text-xs">{row.email || strings.commonEmDash}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="bg-muted rounded px-1.5 py-0.5 text-xs">{row.role}</code>
                </TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{[row.district, row.state].filter(Boolean).join(', ') || strings.commonEmDash}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    <StatusBadge value={row.status} />
                    {row.isBlocked ? <StatusBadge value="blocked" /> : null}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => open(row)}>
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

      <Dialog open={Boolean(editing && form)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{strings.partnersEditTitle}</DialogTitle>
            <DialogDescription>
              {t('partnersEditDescription', { phone: editing?.phoneNumber })}
            </DialogDescription>
          </DialogHeader>
          {form ? (
            <form onSubmit={save} className="grid gap-4">
              <div className="grid gap-2">
                <Label>{strings.partnersFullName}</Label>
                <Input
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>{strings.commonEmail}</Label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>{strings.commonStatus}</Label>
                  <Select
                    value={form.status}
                    onValueChange={(status) => setForm({ ...form, status })}
                  >
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
                <div className="grid gap-2">
                  <Label>{strings.commonRole}</Label>
                  <Input value={editing?.role || ''} disabled />
                </div>
              </div>
              {form.status === 'rejected' ? (
                <div className="grid gap-2">
                  <Label>{strings.partnersRejectionReason}</Label>
                  <Input
                    value={form.rejectionReason}
                    onChange={(e) => setForm({ ...form, rejectionReason: e.target.value })}
                  />
                </div>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>{strings.commonState}</Label>
                  <Input
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>{strings.commonDistrict}</Label>
                  <Input
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                  />
                </div>
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
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
