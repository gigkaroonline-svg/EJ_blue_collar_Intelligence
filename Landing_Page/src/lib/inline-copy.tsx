import type { ReactNode } from "react";

const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** Renders plain copy with optional markdown-style internal links: [label](/path). */
export function InlineCopy({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(LINK_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <a
        key={`${match[2]}-${match.index}`}
        href={match[2]}
        className="font-medium text-brand underline underline-offset-4 hover:text-navy"
      >
        {match[1]}
      </a>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length === 1 ? nodes[0] : <>{nodes}</>;
}
