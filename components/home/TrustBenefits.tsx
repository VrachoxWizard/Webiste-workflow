import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ShieldCheck, Truck, Headphones, ClipboardCheck } from "lucide-react"

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Sigurna kupnja",
    description: "Svi proizvodi dolaze s punim tvorničkim jamstvom i certifikatom kvalitete."
  },
  {
    icon: Truck,
    title: "Brza dostava",
    description: "Dostava unutar cijele Hrvatske. Proizvodi na zalihi isporučuju se unutar 2-4 radna dana."
  },
  {
    icon: Headphones,
    title: "Stručna podrška",
    description: "Naši stručnjaci stoje vam na raspolaganju za pitanja o kompatibilnosti, dostupnosti i dokumentaciji."
  },
  {
    icon: ClipboardCheck,
    title: "Provjera dostupnosti",
    description: "Prije svake isporuke oružja i streljiva potvrđujemo zakonske uvjete i stanje zaliha."
  }
]

export function TrustBenefits() {
  return (
    <Section className="bg-foreground text-background">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {BENEFITS.map((item) => (
            <div key={item.title} className="space-y-4">
              <div className="size-12 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                <item.icon className="size-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="text-sm text-background/60 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
