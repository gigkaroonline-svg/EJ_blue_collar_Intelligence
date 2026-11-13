import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function PageHeader({ description, action }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      {description ? <p className="text-muted-foreground max-w-2xl text-sm">{description}</p> : <div />}
      {action || null}
    </div>
  )
}

export function StatCards({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={item.onClick}
          disabled={!item.onClick}
          className={cn(
            'rounded-xl border bg-card p-4 text-left shadow-xs transition-colors',
            item.active ? 'border-primary ring-primary/20 ring-2' : 'hover:bg-muted/40',
            !item.onClick && 'cursor-default',
          )}
        >
          <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {item.label}
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">{item.value}</div>
          {item.hint ? <div className="text-muted-foreground mt-1 text-xs">{item.hint}</div> : null}
        </button>
      ))}
    </div>
  )
}

export function Pager({ page, limit, total, onPage }) {
  const pages = Math.max(1, Math.ceil((total || 0) / (limit || 20)))
  return (
    <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground text-sm">
        {total || 0} total · page {page} / {pages}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled={page >= pages} onClick={() => onPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
}

export function DataCard({ toolbar, loading, empty, emptyTitle, emptyDescription, children, footer }) {
  return (
    <Card className="gap-0 py-0">
      {toolbar ? <div className="border-b p-3">{toolbar}</div> : null}
      {loading && empty ? (
        <CardContent className="space-y-3 py-10">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-2/3" />
        </CardContent>
      ) : empty ? (
        <CardHeader className="items-center py-12 text-center">
          <CardTitle>{emptyTitle}</CardTitle>
          {emptyDescription ? <CardDescription>{emptyDescription}</CardDescription> : null}
        </CardHeader>
      ) : (
        <div className={cn(loading && 'opacity-60')}>{children}</div>
      )}
      {!empty ? footer : null}
    </Card>
  )
}
