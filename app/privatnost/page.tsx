import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="border-b bg-secondary/10 pb-16 pt-24 md:pb-24 md:pt-32">
        <Container>
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">Pravila privatnosti</h1>
            <p className="text-lg font-medium leading-relaxed text-muted-foreground">
              Osobni podaci koriste se za obradu upita, narudžbi, provjeru uvjeta kupnje i korisničku podršku.
            </p>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 font-medium leading-relaxed text-muted-foreground">
            <p>Prikupljamo samo podatke potrebne za odgovor na upit, obradu narudžbe i ispunjenje zakonskih obveza.</p>
            <p>Podaci povezani s reguliranim artiklima obrađuju se isključivo radi provjere zakonskih uvjeta i sigurnog poslovanja.</p>
            <p>Za pitanja o privatnosti kontaktirajte nas na info@terralov.hr.</p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
