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
import { strings, t } from '@/strings.js'

const BODY_MAX = 20000
const COVER_MAX_BYTES = 500 * 1024

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

function CoverPreview({ file, stored, onRemove, alt }) {
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
  const coverAlt =
    (typeof alt === 'string' && alt.trim()) || strings.blogsCoverPreviewAlt
  return (
    <div className="relative inline-block">
      <img src={src} alt={coverAlt} className="max-h-32 rounded-lg border object-cover" />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute -top-2 -right-2 size-7"
        onClick={onRemove}
        aria-label={strings.blogsCoverRemoveAria}
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
      setError(strings.blogsBodyTooShort)
      return
    }
    if (cleanBody.length > BODY_MAX) {
      setError(strings.blogsBodyTooLong)
      return
    }
    const hasCover = Boolean(coverFile) || (Boolean(form.coverUrl) && !removeCover)
    if (!hasCover) {
      setError(strings.blogsCoverRequired)
      return
    }
    if (coverFile && coverFile.size > COVER_MAX_BYTES) {
      setError(strings.blogsCoverTooLarge)
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
        setNotice(strings.blogsStoryUpdated)
      } else {
        await api('/blogs', { method: 'POST', body })
        setNotice(form.status === 'published' ? strings.blogsStoryPublished : strings.blogsDraftSaved)
      }
      clearEditor()
      await load()
    } catch (err) {
      setError(err.message || strings.blogsSaveFailed)
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
      setError(err.message || strings.blogsUpdateFailed)
    }
  }

  async function remove(post) {
    if (!window.confirm(t('blogsDeleteConfirm', { title: post.title }))) return
    setError('')
    try {
      await api(`/blogs/${post.id}`, { method: 'DELETE' })
      if (editing === post.id) clearEditor()
      await load()
    } catch (err) {
      setError(err.message || strings.blogsDeleteFailed)
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        description={strings.blogsDescription}
        action={
          <Button onClick={startNew}>
            <Plus />
            {strings.blogsNewStory}
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
            <CardTitle>{editing ? strings.blogsEditStory : strings.blogsNewStory}</CardTitle>
            <CardDescription>{strings.blogsFormDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={save}>
              <div className="grid gap-2">
                <Label htmlFor="blog-title">{strings.commonTitle}</Label>
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
                <Label htmlFor="blog-excerpt">{strings.blogsExcerpt}</Label>
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
                <Label htmlFor="blog-body">{strings.blogsStory}</Label>
                <BlogBodyEditor
                  id="blog-body"
                  value={form.body}
                  resetKey={editing || 'new'}
                  onChange={(body) => setForm({ ...form, body })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="blog-cover">{strings.blogsCoverImage}</Label>
                <div className="flex flex-wrap items-start gap-3">
                  <Input
                    id="blog-cover"
                    key={coverInputKey}
                    type="file"
                    accept="image/*"
                    className="max-w-sm"
                    required={!coverFile && (removeCover || !form.coverUrl)}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      if (file && file.size > COVER_MAX_BYTES) {
                        setError(strings.blogsCoverTooLarge)
                        setCoverFile(null)
                        setCoverInputKey((key) => key + 1)
                        return
                      }
                      setError('')
                      setCoverFile(file)
                      setRemoveCover(false)
                    }}
                  />
                  <CoverPreview
                    file={coverFile}
                    stored={removeCover ? '' : form.coverUrl}
                    alt={form.coverAlt || form.title}
                    onRemove={() => {
                      setCoverFile(null)
                      setRemoveCover(true)
                      setCoverInputKey((key) => key + 1)
                    }}
                  />
                </div>
                <p className="text-muted-foreground text-xs">{strings.blogsCoverMaxSize}</p>
              </div>
              <div className="grid max-w-xs gap-2">
                <Label htmlFor="blog-status">{strings.commonStatus}</Label>
                <Select
                  value={form.status}
                  onValueChange={(status) => setForm({ ...form, status })}
                >
                  <SelectTrigger id="blog-status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">{strings.blogsStatusDraft}</SelectItem>
                    <SelectItem value="published">{strings.blogsStatusPublished}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={saving}>
                  {saving
                    ? strings.commonSaving
                    : editing
                      ? strings.commonSaveChanges
                      : strings.blogsSaveStory}
                </Button>
                {editing ? (
                  <Button type="button" variant="outline" onClick={clearEditor}>
                    {strings.commonCancel}
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                    {strings.blogsHideForm}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => setFormOpen(true)}>
          {strings.blogsShowForm}
        </Button>
      )}

      <DataCard
        loading={loading}
        empty={!posts.length}
        emptyTitle={strings.blogsEmptyTitle}
        emptyDescription={strings.blogsEmptyDescription}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[72px]">{strings.blogsColCover}</TableHead>
              <TableHead>{strings.commonTitle}</TableHead>
              <TableHead>{strings.commonStatus}</TableHead>
              <TableHead>{strings.blogsColPublished}</TableHead>
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
                      alt={
                        post.coverAlt?.trim() ||
                        t('blogsCoverListAlt', {
                          title: post.title || strings.blogsCoverFallbackTitle,
                        })
                      }
                      className="size-12 rounded-md border object-cover"
                    />
                  ) : (
                    strings.commonEmDash
                  )}
                </TableCell>
                <TableCell className="max-w-[280px] font-medium">{post.title}</TableCell>
                <TableCell>
                  <StatusBadge value={post.status === 'published' ? 'published' : 'draft'} />
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatBlogDate(post.publishedAt) || strings.commonEmDash}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => edit(post)}>
                      {strings.commonEdit}
                    </Button>
                    {post.status === 'published' ? (
                      <Button variant="outline" size="sm" onClick={() => setStatus(post, 'draft')}>
                        {strings.blogsUnpublish}
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => setStatus(post, 'published')}>
                        {strings.blogsPublish}
                      </Button>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => remove(post)}>
                      {strings.commonDelete}
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
