import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ShieldCheck, Truck, Headphones, ClipboardCheck } from "lucide-react"

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Sigurna kupnja",
    description: "Svi proizvodi dolaze s punim tvorničkim jamstvom i certifikatom kvalitete.",
  },
  {
    icon: Truck,
    title: "Brza dostava",
    description:
      "Dostava unutar cijele Hrvatske. Proizvodi na zalihi isporučuju se unutar 2-4 radna dana.",
  },
  {
    icon: Headphones,
    title: "Stručna podrška",
    description:
      "Naši stručnjaci stoje vam na raspolaganju za pitanja o kompatibilnosti i dokumentaciji.",
  },
  {
    icon: ClipboardCheck,
    title: "Provjera dostupnosti",
    description:
      "Prije svake isporuke oružja i streljiva potvrđujemo zakonske uvjete i stanje zaliha.",
  },
]

export function TrustBenefits() {
  return (
    <Section className="bg-foreground py-24 text-background md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item, idx) => (
            <div key={item.title} className="group relative space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex size-14 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="size-7" />
                </div>
                <span className="text-4xl font-black italic tracking-tighter text-background/5">
                  0{idx + 1}
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-background/60">
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
