import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="border-b bg-secondary/10 pb-16 pt-24 md:pb-24 md:pt-32">
        <Container>
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">Opći uvjeti poslovanja</h1>
            <p className="text-lg font-medium leading-relaxed text-muted-foreground">
              Sažetak uvjeta kupnje, obrade narudžbi, dostave, povrata i posebnih pravila za regulirane artikle.
            </p>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 font-medium leading-relaxed text-muted-foreground">
            <p>Narudžba postaje obvezujuća tek nakon potvrde dostupnosti, cijene, načina isporuke i eventualne dokumentacije koju zahtijeva kategorija proizvoda.</p>
            <p>Regulirani artikli ne isporučuju se bez provjere zakonskih uvjeta. Kupac je odgovoran za točnost dostavljenih podataka.</p>
            <p>Povrati, reklamacije i jamstva obrađuju se prema važećim propisima i uvjetima proizvođača.</p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
