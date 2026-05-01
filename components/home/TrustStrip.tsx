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
    <div className="border-b bg-muted/30">
      <Container>
        <div className="grid grid-cols-2 gap-4 py-6 md:grid-cols-4 md:gap-8">
          {TRUST_ITEMS.map((item, idx) => (
            <div
              key={item.label}
              className="flex items-center gap-3 border-primary/0 md:border-l md:border-primary/10 md:pl-6 md:first:border-l-0 md:first:pl-0"
            >
              <item.icon
                className="size-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="space-y-0.5">
                <p className="text-xs font-bold leading-tight text-foreground">{item.label}</p>
                <p className="text-[10px] font-medium text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
