import { Container } from "@/components/ui/container"
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
    <section className="section-padding bg-foreground text-background">
      <Container>
        <div className="grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item, idx) => (
            <div key={item.title} className="group relative space-y-8">
              <div className="flex items-center justify-between">
                <div className="bg-primary/20 text-primary group-hover:bg-accent group-hover:text-foreground flex size-16 items-center justify-center rounded-full transition-all duration-500">
                  <item.icon className="size-8" />
                </div>
                <span className="text-background/5 text-5xl font-black tracking-tighter italic">
                  0{idx + 1}
                </span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight uppercase">{item.title}</h3>
                <div className="bg-accent h-0.5 w-8 transition-all group-hover:w-12" />
                <p className="text-background/50 text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
