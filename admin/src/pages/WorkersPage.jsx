import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { api } from '@/api.js'
import { useList } from '@/hooks/useList.js'
import { StatusBadge } from '@/components/status-badge.jsx'
import { DataCard, PageHeader, Pager, StatCards } from '@/components/page-bits.jsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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

const ALL = '__all__'
const NONE = '__none__'

export function WorkersPage() {
  const [filters, setFilters] = useState({
    q: '',
    state: '',
    district: '',
    isReadyToWork: '',
    hasDisability: '',
  })
  const { page, data, error, setError, loading, load } = useList('/workers', filters)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(null)
  const [busy, setBusy] = useState(false)

  const pageStats = useMemo(() => {
    const items = data.items || []
    return {
      ready: items.filter((r) => r.isReadyToWork).length,
      notReady: items.filter((r) => !r.isReadyToWork).length,
      disability: items.filter((r) => r.hasDisability).length,
    }
  }, [data.items])

  function open(row) {
    setEditing(row)
    setForm({
      fullName: row.fullName || '',
      phoneNumber: row.phoneNumber || '',
      gender: row.gender || '',
      dailyWageExpected: row.dailyWageExpected ?? '',
      isReadyToWork: Boolean(row.isReadyToWork),
      hasDisability: Boolean(row.hasDisability),
      disabilityDetails: row.disabilityDetails || '',
      state: row.permanentAddress?.state || '',
      district: row.permanentAddress?.district || '',
    })
  }

  async function save(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await api(`/workers/${editing._id || editing.id}`, {
        method: 'PATCH',
        body: {
          fullName: form.fullName,
          phoneNumber: form.phoneNumber,
          gender: form.gender || undefined,
          dailyWageExpected:
            form.dailyWageExpected === '' ? undefined : Number(form.dailyWageExpected),
          isReadyToWork: form.isReadyToWork,
          hasDisability: form.hasDisability,
          disabilityDetails: form.disabilityDetails,
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

  return (
    <div className="space-y-5">
      <PageHeader description="Browse workers registered by partners and update availability details." />

      <StatCards
        items={[
          {
            id: 'total',
            label: 'Total',
            value: data.total ?? 0,
            active: !filters.isReadyToWork && !filters.hasDisability,
            onClick: () => {
              const next = { ...filters, isReadyToWork: '', hasDisability: '' }
              setFilters(next)
              load(1, next)
            },
          },
          {
            id: 'ready',
            label: 'Ready',
            value: filters.isReadyToWork === 'true' ? data.total ?? 0 : pageStats.ready,
            active: filters.isReadyToWork === 'true',
            onClick: () => {
              const next = { ...filters, isReadyToWork: 'true' }
              setFilters(next)
              load(1, next)
            },
          },
          {
            id: 'not-ready',
            label: 'Not ready',
            value: filters.isReadyToWork === 'false' ? data.total ?? 0 : pageStats.notReady,
            active: filters.isReadyToWork === 'false',
            onClick: () => {
              const next = { ...filters, isReadyToWork: 'false' }
              setFilters(next)
              load(1, next)
            },
          },
          {
            id: 'disability',
            label: 'Disability',
            value: filters.hasDisability === 'true' ? data.total ?? 0 : pageStats.disability,
            active: filters.hasDisability === 'true',
            onClick: () => {
              const next = { ...filters, hasDisability: 'true' }
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
        emptyTitle="No labours found"
        emptyDescription="Try another search or check partner registrations."
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
                placeholder="Search by name"
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              />
            </div>
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
            <Select
              value={filters.isReadyToWork || ALL}
              onValueChange={(isReadyToWork) =>
                setFilters({ ...filters, isReadyToWork: isReadyToWork === ALL ? '' : isReadyToWork })
              }
            >
              <SelectTrigger className="w-full lg:w-44">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Availability: any</SelectItem>
                <SelectItem value="true">Ready</SelectItem>
                <SelectItem value="false">Not ready</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.hasDisability || ALL}
              onValueChange={(hasDisability) =>
                setFilters({ ...filters, hasDisability: hasDisability === ALL ? '' : hasDisability })
              }
            >
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Disability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Disability: any</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Apply</Button>
          </form>
        }
        footer={<Pager page={page} limit={data.limit} total={data.total} onPage={(p) => load(p, filters)} />}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Trade</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Partner</TableHead>
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
                      <div className="text-muted-foreground text-xs">{row.maskedIdentity || ''}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{row.phoneNumber || '—'}</TableCell>
                <TableCell>{row.jobId?.name || '—'}</TableCell>
                <TableCell>
                  {[row.permanentAddress?.district, row.permanentAddress?.state]
                    .filter(Boolean)
                    .join(', ') || '—'}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{row.registeredBy?.fullName || '—'}</div>
                  <div className="text-muted-foreground text-xs">{row.registeredBy?.role || ''}</div>
                </TableCell>
                <TableCell>
                  <StatusBadge
                    value={row.isReadyToWork ? 'ready' : 'not ready'}
                    kind={row.isReadyToWork ? 'ok' : 'pending'}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => open(row)}>
                      Edit
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
            <DialogTitle>Edit labour</DialogTitle>
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input
                    value={form.phoneNumber}
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Gender</Label>
                  <Select
                    value={form.gender || NONE}
                    onValueChange={(gender) =>
                      setForm({ ...form, gender: gender === NONE ? '' : gender })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE}>—</SelectItem>
                      <SelectItem value="male">male</SelectItem>
                      <SelectItem value="female">female</SelectItem>
                      <SelectItem value="other">other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Daily wage</Label>
                <Input
                  type="number"
                  min="0"
                  value={form.dailyWageExpected}
                  onChange={(e) => setForm({ ...form, dailyWageExpected: e.target.value })}
                />
              </div>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={form.isReadyToWork}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, isReadyToWork: Boolean(checked) })
                    }
                  />
                  Ready to work
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={form.hasDisability}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, hasDisability: Boolean(checked) })
                    }
                  />
                  Has disability
                </label>
              </div>
              {form.hasDisability ? (
                <div className="grid gap-2">
                  <Label>Disability details</Label>
                  <Input
                    value={form.disabilityDetails}
                    onChange={(e) => setForm({ ...form, disabilityDetails: e.target.value })}
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
