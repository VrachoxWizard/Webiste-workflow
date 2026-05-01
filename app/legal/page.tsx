import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert } from "lucide-react"

export default function LegalPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="border-b bg-secondary/10 pb-16 pt-24 md:pb-24 md:pt-32">
        <Container>
          <div className="max-w-3xl space-y-6">
            <Badge variant="outline" className="border-primary/20 text-primary">Zakonske napomene</Badge>
            <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">Odgovorna i zakonita kupnja</h1>
            <p className="text-lg font-medium leading-relaxed text-muted-foreground">
              Ove informacije služe kao jasan pregled postupka kupnje u trgovini TerraLov. Za regulirane artikle kupnja se ne dovršava bez provjere propisane dokumentacije.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl space-y-10">
            <section className="rounded-sm border bg-primary/5 p-6">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <ShieldAlert className="size-6" aria-hidden="true" />
                <h2 className="text-xl font-bold tracking-tight">Regulirani artikli</h2>
              </div>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                Oružje i streljivo prodaju se isključivo osobama koje ispunjavaju zakonske uvjete i mogu predočiti važeću dokumentaciju. TerraLov zadržava pravo odbiti obradu narudžbe ako dokumentacija nije potpuna ili uvjeti nisu ispunjeni.
              </p>
            </section>

            <section id="dostava" className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">Dostava i preuzimanje</h2>
              <p className="font-medium leading-relaxed text-muted-foreground">
                Dostava, osobno preuzimanje i dostupnost artikala potvrđuju se prije obrade narudžbe. Za regulirane artikle mogu vrijediti posebna pravila preuzimanja.
              </p>
            </section>

            <section id="placanje" className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">Plaćanje</h2>
              <p className="font-medium leading-relaxed text-muted-foreground">
                Dostupni načini plaćanja prikazuju se u završetku kupnje. Trgovina može zatražiti dodatnu potvrdu identiteta ili dokumentacije prije izdavanja ponude za regulirane artikle.
              </p>
            </section>

            <section id="impressum" className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">Impressum</h2>
              <p className="font-medium leading-relaxed text-muted-foreground">
                TerraLov d.o.o., Ulica Zelene Doline 42, 10000 Zagreb, Hrvatska. Email: info@terralov.hr. Telefon: +385 1 234 5678.
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </main>
  )
}
