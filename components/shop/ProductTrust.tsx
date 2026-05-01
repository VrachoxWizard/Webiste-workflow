import { Truck, ShieldCheck, CreditCard, FileCheck2 } from "lucide-react"

export function ProductTrust() {
  const items = [
    { icon: Truck, label: "Sigurna isporuka", sub: "Dostava ili preuzimanje" },
    { icon: ShieldCheck, label: "Tvorničko jamstvo", sub: "Ovlašteni servis" },
    { icon: CreditCard, label: "Sigurno plaćanje", sub: "Transakcije zaštićene" },
    { icon: FileCheck2, label: "Zakonska usklađenost", sub: "Provjerena procedura" }
  ]

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 border-y border-border/50">
      {items.map((item) => (
        <div key={item.label} className="flex gap-3 items-start">
          <div className="size-8 rounded-sm bg-muted/50 border flex items-center justify-center text-foreground shrink-0 mt-0.5">
            <item.icon className="size-4 opacity-80" aria-hidden="true" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-foreground leading-tight">{item.label}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
