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
    <Section className="bg-foreground text-background py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item, idx) => (
            <div key={item.title} className="group relative space-y-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-14 items-center justify-center rounded-sm transition-colors">
                  <item.icon className="size-7" />
                </div>
                <span className="text-background/5 text-4xl font-black tracking-tighter italic">
                  0{idx + 1}
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="text-background/60 text-sm leading-relaxed font-medium">
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
