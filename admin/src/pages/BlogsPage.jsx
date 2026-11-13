import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { api } from '@/api.js'
import { BlogBodyEditor } from '@/components/BlogBodyEditor.jsx'
import { DataCard, PageHeader } from '@/components/page-bits.jsx'
import { StatusBadge } from '@/components/status-badge.jsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { blogHtmlTextLength, sanitizeBlogHtml } from '@/lib/blog-html.js'

const BODY_MAX = 20000

const emptyForm = {
  title: '',
  excerpt: '',
  body: '',
  coverUrl: '',
  status: 'published',
}

function formatBlogDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function CoverPreview({ file, stored, onRemove }) {
  const [localUrl, setLocalUrl] = useState('')
  useEffect(() => {
    if (!file) {
      setLocalUrl('')
      return
    }
    const url = URL.createObjectURL(file)
    setLocalUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])
  const src = localUrl || (stored ? stored : '')
  if (!src) return null
  return (
    <div className="relative inline-block">
      <img src={src} alt="" className="max-h-32 rounded-lg border object-cover" />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute -top-2 -right-2 size-7"
        onClick={onRemove}
        aria-label="Remove cover"
      >
        ×
      </Button>
    </div>
  )
}

export function BlogsPage() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [coverFile, setCoverFile] = useState(null)
  const [removeCover, setRemoveCover] = useState(false)
  const [coverInputKey, setCoverInputKey] = useState(0)
  const [formOpen, setFormOpen] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const data = await api('/blogs')
      setPosts(data.posts || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function edit(post) {
    setEditing(post.id)
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      body: post.body,
      coverUrl: post.coverUrl,
      status: post.status,
    })
    setCoverFile(null)
    setRemoveCover(false)
    setNotice('')
    setError('')
    setFormOpen(true)
  }

  function clearEditor() {
    setEditing(null)
    setForm(emptyForm)
    setCoverFile(null)
    setRemoveCover(false)
    setCoverInputKey((key) => key + 1)
  }

  function startNew() {
    clearEditor()
    setFormOpen(true)
  }

  async function save(event) {
    event.preventDefault()
    const cleanBody = sanitizeBlogHtml(form.body)
    const textLength = blogHtmlTextLength(cleanBody)
    if (textLength < 40) {
      setError('Write at least 40 characters in the story.')
      return
    }
    if (cleanBody.length > BODY_MAX) {
      setError('The story is too long. Keep it under 20,000 characters.')
      return
    }
    const hasCover = Boolean(coverFile) || (Boolean(form.coverUrl) && !removeCover)
    if (!hasCover) {
      setError('Add a cover image for this story.')
      return
    }
    setSaving(true)
    setError('')
    setNotice('')
    try {
      const body = new FormData()
      body.set('title', form.title)
      body.set('excerpt', form.excerpt)
      body.set('body', cleanBody)
      body.set('status', form.status)
      if (coverFile) body.set('cover', coverFile)
      else if (removeCover) body.set('removeCover', '1')
      if (editing) {
        await api(`/blogs/${editing}`, { method: 'PATCH', body })
        setNotice('Story updated.')
      } else {
        await api('/blogs', { method: 'POST', body })
        setNotice(form.status === 'published' ? 'Story published.' : 'Draft saved.')
      }
      clearEditor()
      await load()
    } catch (err) {
      setError(err.message || 'Could not save the story.')
    } finally {
      setSaving(false)
    }
  }

  async function setStatus(post, status) {
    setError('')
    try {
      await api(`/blogs/${post.id}`, { method: 'PATCH', body: { status } })
      await load()
    } catch (err) {
      setError(err.message || 'Could not update the story.')
    }
  }

  async function remove(post) {
    if (!window.confirm(`Delete “${post.title}”?`)) return
    setError('')
    try {
      await api(`/blogs/${post.id}`, { method: 'DELETE' })
      if (editing === post.id) clearEditor()
      await load()
    } catch (err) {
      setError(err.message || 'Could not delete the story.')
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        description="Write and publish blog stories for the public site."
        action={
          <Button onClick={startNew}>
            <Plus />
            New story
          </Button>
        }
      />

      {error ? (
        <div className="bg-destructive/10 text-destructive rounded-lg px-3 py-2 text-sm" role="alert">
          {error}
        </div>
      ) : null}
      {notice ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          {notice}
        </div>
      ) : null}

      {formOpen ? (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? 'Edit story' : 'New story'}</CardTitle>
            <CardDescription>Publish when the story is ready for the blog.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={save}>
              <div className="grid gap-2">
                <Label htmlFor="blog-title">Title</Label>
                <Input
                  id="blog-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  minLength={3}
                  maxLength={140}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="blog-excerpt">Excerpt</Label>
                <textarea
                  id="blog-excerpt"
                  className="border-input bg-background min-h-[80px] w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  required
                  minLength={20}
                  maxLength={320}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="blog-body">Story</Label>
                <BlogBodyEditor
                  id="blog-body"
                  value={form.body}
                  resetKey={editing || 'new'}
                  onChange={(body) => setForm({ ...form, body })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="blog-cover">Cover image</Label>
                <div className="flex flex-wrap items-start gap-3">
                  <Input
                    id="blog-cover"
                    key={coverInputKey}
                    type="file"
                    accept="image/*"
                    className="max-w-sm"
                    required={!coverFile && (removeCover || !form.coverUrl)}
                    onChange={(e) => {
                      setCoverFile(e.target.files?.[0] || null)
                      setRemoveCover(false)
                    }}
                  />
                  <CoverPreview
                    file={coverFile}
                    stored={removeCover ? '' : form.coverUrl}
                    onRemove={() => {
                      setCoverFile(null)
                      setRemoveCover(true)
                      setCoverInputKey((key) => key + 1)
                    }}
                  />
                </div>
              </div>
              <div className="grid max-w-xs gap-2">
                <Label htmlFor="blog-status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(status) => setForm({ ...form, status })}
                >
                  <SelectTrigger id="blog-status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving…' : editing ? 'Save changes' : 'Save story'}
                </Button>
                {editing ? (
                  <Button type="button" variant="outline" onClick={clearEditor}>
                    Cancel
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                    Hide form
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => setFormOpen(true)}>
          Show story form
        </Button>
      )}

      <DataCard
        loading={loading}
        empty={!posts.length}
        emptyTitle="No stories yet"
        emptyDescription="Create your first blog story above."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[72px]">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  {post.coverUrl ? (
                    <img
                      src={post.coverUrl}
                      alt=""
                      className="size-12 rounded-md border object-cover"
                    />
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell className="max-w-[280px] font-medium">{post.title}</TableCell>
                <TableCell>
                  <StatusBadge value={post.status === 'published' ? 'published' : 'draft'} />
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatBlogDate(post.publishedAt) || '—'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => edit(post)}>
                      Edit
                    </Button>
                    {post.status === 'published' ? (
                      <Button variant="outline" size="sm" onClick={() => setStatus(post, 'draft')}>
                        Unpublish
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => setStatus(post, 'published')}>
                        Publish
                      </Button>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => remove(post)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataCard>
    </div>
  )
}
