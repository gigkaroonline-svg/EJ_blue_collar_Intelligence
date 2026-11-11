import { Container } from "@/components/ui/Container";
import { legal } from "@/content/site";

export function Legal() {
  return (
    <section className="border-t border-rm-border bg-white py-14">
      <Container className="grid gap-8 md:grid-cols-2">
        <article id="privacy">
          <h2 className="text-xl font-semibold text-rm-navy">{legal.privacy.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-rm-muted">{legal.privacy.body}</p>
        </article>
        <article id="terms">
          <h2 className="text-xl font-semibold text-rm-navy">{legal.terms.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-rm-muted">{legal.terms.body}</p>
        </article>
      </Container>
    </section>
  );
}
