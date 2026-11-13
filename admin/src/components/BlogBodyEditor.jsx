import { useEffect, useRef } from 'react'
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Underline,
} from 'lucide-react'
import { blogHtmlTextLength, sanitizeBlogHtml, toEditorHtml } from '@/lib/blog-html.js'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const BODY_MAX = 20000

function run(command, value) {
  document.execCommand(command, false, value)
}

export function BlogBodyEditor({ id = 'blog-body', value, onChange, resetKey, className }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = toEditorHtml(value)
  }, [resetKey])

  function emit() {
    onChange(sanitizeBlogHtml(ref.current?.innerHTML || ''))
  }

  function format(command, arg) {
    ref.current?.focus()
    run(command, arg)
    emit()
  }

  function addLink() {
    const url = window.prompt('Link URL', 'https://')
    if (!url) return
    if (!/^https?:\/\//i.test(url) && !url.startsWith('/')) {
      window.alert('Use an http, https, or site path link.')
      return
    }
    format('createLink', url)
  }

  const textLength = blogHtmlTextLength(value)

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className="flex flex-wrap items-center gap-1 rounded-t-lg border border-b-0 bg-muted/40 p-1.5"
        role="toolbar"
        aria-label="Story formatting"
      >
        <Button type="button" variant="outline" size="icon" className="size-8" onClick={() => format('bold')} aria-label="Bold">
          <Bold className="size-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" className="size-8" onClick={() => format('italic')} aria-label="Italic">
          <Italic className="size-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" className="size-8" onClick={() => format('underline')} aria-label="Underline">
          <Underline className="size-4" />
        </Button>
        <span className="bg-border mx-1 h-6 w-px" />
        <Button type="button" variant="outline" size="icon" className="size-8" onClick={() => format('formatBlock', 'h2')} aria-label="Heading">
          <Heading2 className="size-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" className="size-8" onClick={() => format('formatBlock', 'h3')} aria-label="Subheading">
          <Heading3 className="size-4" />
        </Button>
        <span className="bg-border mx-1 h-6 w-px" />
        <Button type="button" variant="outline" size="icon" className="size-8" onClick={() => format('insertUnorderedList')} aria-label="Bullet list">
          <List className="size-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" className="size-8" onClick={() => format('insertOrderedList')} aria-label="Numbered list">
          <ListOrdered className="size-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" className="size-8" onClick={addLink} aria-label="Link">
          <Link2 className="size-4" />
        </Button>
      </div>
      <div
        id={id}
        ref={ref}
        className="blog-rich-surface min-h-[200px] rounded-b-lg border bg-background px-3 py-2 text-sm leading-relaxed focus-visible:ring-2 focus-visible:ring-ring"
        contentEditable
        role="textbox"
        aria-multiline="true"
        aria-label="Story"
        data-placeholder="Write the story. Use the toolbar for headings, lists and links."
        onInput={emit}
        onBlur={emit}
        suppressContentEditableWarning
      />
      <p className="text-muted-foreground text-xs">
        {textLength} characters · max {BODY_MAX.toLocaleString('en-IN')}
      </p>
    </div>
  )
}
