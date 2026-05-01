import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert } from "lucide-react"

export default function LegalPage() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      <div className="bg-secondary/10 border-b pt-24 pb-16 md:pt-32 md:pb-24">
        <Container>
          <div className="max-w-3xl space-y-6">
            <Badge variant="outline" className="border-primary/20 text-primary">
              Zakonske napomene
            </Badge>
            <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">
              Odgovorna i zakonita kupnja
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              Ove informacije služe kao jasan pregled postupka kupnje u trgovini TerraLov. Za
              regulirane artikle kupnja se ne dovršava bez provjere propisane dokumentacije.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl space-y-10">
            <section className="bg-primary/5 rounded-sm border p-6">
              <div className="text-primary mb-4 flex items-center gap-3">
                <ShieldAlert className="size-6" aria-hidden="true" />
                <h2 className="text-xl font-bold tracking-tight">Regulirani artikli</h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Oružje i streljivo prodaju se isključivo osobama koje ispunjavaju zakonske uvjete i
                mogu predočiti važeću dokumentaciju. TerraLov zadržava pravo odbiti obradu narudžbe
                ako dokumentacija nije potpuna ili uvjeti nisu ispunjeni.
              </p>
            </section>

            <section id="dostava" className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">Dostava i preuzimanje</h2>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Dostava, osobno preuzimanje i dostupnost artikala potvrđuju se prije obrade
                narudžbe. Za regulirane artikle mogu vrijediti posebna pravila preuzimanja.
              </p>
            </section>

            <section id="placanje" className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">Plaćanje</h2>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Dostupni načini plaćanja prikazuju se u završetku kupnje. Trgovina može zatražiti
                dodatnu potvrdu identiteta ili dokumentacije prije izdavanja ponude za regulirane
                artikle.
              </p>
            </section>

            <section id="impressum" className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">Impressum</h2>
              <p className="text-muted-foreground leading-relaxed font-medium">
                TerraLov d.o.o., Ulica Zelene Doline 42, 10000 Zagreb, Hrvatska. Email:
                info@terralov.hr. Telefon: +385 1 234 5678.
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </main>
  )
}
