import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export default function TermsPage() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      <div className="bg-secondary/10 border-b pt-24 pb-16 md:pt-32 md:pb-24">
        <Container>
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">
              Opći uvjeti poslovanja
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              Sažetak uvjeta kupnje, obrade narudžbi, dostave, povrata i posebnih pravila za
              regulirane artikle.
            </p>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          <div className="text-muted-foreground mx-auto max-w-3xl space-y-6 leading-relaxed font-medium">
            <p>
              Narudžba postaje obvezujuća tek nakon potvrde dostupnosti, cijene, načina isporuke i
              eventualne dokumentacije koju zahtijeva kategorija proizvoda.
            </p>
            <p>
              Regulirani artikli ne isporučuju se bez provjere zakonskih uvjeta. Kupac je odgovoran
              za točnost dostavljenih podataka.
            </p>
            <p>
              Povrati, reklamacije i jamstva obrađuju se prema važećim propisima i uvjetima
              proizvođača.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
