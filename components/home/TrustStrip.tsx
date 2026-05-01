import { Container } from "@/components/ui/container"
import { ShieldCheck, CheckCircle2, Truck, Headphones } from "lucide-react"

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Stručna podrška", sub: "Provjera prije kupnje" },
  { icon: CheckCircle2, label: "Sigurna kupnja", sub: "U skladu sa zakonima" },
  { icon: Truck, label: "Brza dostava", sub: "Unutar 2-4 radna dana" },
  { icon: Headphones, label: "Provjera dostupnosti", sub: "Prije svake isporuke" },
]

export function TrustStrip() {
  return (
    <div className="bg-muted/30 border-b">
      <Container>
        <div className="grid grid-cols-2 gap-4 py-6 md:grid-cols-4 md:gap-8">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="border-primary/0 md:border-primary/10 flex items-center gap-3 md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0"
            >
              <item.icon className="text-primary size-5 shrink-0" aria-hidden="true" />
              <div className="space-y-0.5">
                <p className="text-foreground text-xs leading-tight font-bold">{item.label}</p>
                <p className="text-muted-foreground text-[10px] font-medium">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
