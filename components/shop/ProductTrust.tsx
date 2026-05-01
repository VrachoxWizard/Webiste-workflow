import { Truck, ShieldCheck, CreditCard, FileCheck2 } from "lucide-react"

export function ProductTrust() {
  const items = [
    { icon: Truck, label: "Sigurna isporuka", sub: "Dostava ili preuzimanje" },
    { icon: ShieldCheck, label: "Tvorničko jamstvo", sub: "Ovlašteni servis" },
    { icon: CreditCard, label: "Sigurno plaćanje", sub: "Transakcije zaštićene" },
    { icon: FileCheck2, label: "Zakonska usklađenost", sub: "Provjerena procedura" },
  ]

  return (
    <div className="border-border/50 grid grid-cols-2 gap-x-4 gap-y-6 border-y py-8">
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-3">
          <div className="bg-muted/50 text-foreground mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border">
            <item.icon className="size-4 opacity-80" aria-hidden="true" />
          </div>
          <div className="space-y-0.5">
            <p className="text-foreground text-[11px] leading-tight font-bold tracking-widest uppercase">
              {item.label}
            </p>
            <p className="text-muted-foreground text-[10px] font-medium">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
