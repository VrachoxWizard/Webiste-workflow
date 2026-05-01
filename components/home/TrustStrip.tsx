import { Container } from "@/components/ui/container"
import { ShieldCheck, CheckCircle2, Truck, Headphones } from "lucide-react"

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Stručna podrška", sub: "Provjera prije kupnje" },
  { icon: CheckCircle2, label: "Sigurna kupnja", sub: "U skladu sa zakonima" },
  { icon: Truck, label: "Brza dostava", sub: "Unutar 2-4 radna dana" },
  { icon: Headphones, label: "Provjera zaliha", sub: "Prije svake isporuke" },
]

export function TrustStrip() {
  return (
    <div className="bg-background relative z-20 border-b">
      <Container>
        <div className="grid grid-cols-1 gap-0 divide-y md:grid-cols-4 md:divide-x md:divide-y-0">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-4 px-6 py-8 transition-colors hover:bg-secondary/20 md:px-10 md:py-10"
            >
              <div className="bg-accent/10 flex size-12 shrink-0 items-center justify-center rounded-full transition-all group-hover:bg-accent group-hover:text-foreground">
                <item.icon className="size-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="text-foreground text-xs font-black tracking-widest uppercase">
                  {item.label}
                </p>
                <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase opacity-60">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
