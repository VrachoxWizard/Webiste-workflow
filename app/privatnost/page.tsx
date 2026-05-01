import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export default function PrivacyPage() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      <div className="bg-secondary/10 border-b pt-24 pb-16 md:pt-32 md:pb-24">
        <Container>
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">Pravila privatnosti</h1>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              Osobni podaci koriste se za obradu upita, narudžbi, provjeru uvjeta kupnje i
              korisničku podršku.
            </p>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          <div className="text-muted-foreground mx-auto max-w-3xl space-y-6 leading-relaxed font-medium">
            <p>
              Prikupljamo samo podatke potrebne za odgovor na upit, obradu narudžbe i ispunjenje
              zakonskih obveza.
            </p>
            <p>
              Podaci povezani s reguliranim artiklima obrađuju se isključivo radi provjere zakonskih
              uvjeta i sigurnog poslovanja.
            </p>
            <p>Za pitanja o privatnosti kontaktirajte nas na info@terralov.hr.</p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
