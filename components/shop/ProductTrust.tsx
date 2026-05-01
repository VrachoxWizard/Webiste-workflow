import { Truck, ShieldCheck, CreditCard, RotateCcw } from "lucide-react"

export function ProductTrust() {
  const items = [
    { icon: Truck, label: "Dostava 2-4 dana", sub: "Cijela Hrvatska" },
    { icon: ShieldCheck, label: "2 Godine Jamstva", sub: "Tvornička garancija" },
    { icon: CreditCard, label: "Sigurno Plaćanje", sub: "Kriptirano i provjereno" },
    { icon: RotateCcw, label: "Jednostavan Povrat", sub: "Unutar 14 dana" }
  ]

  return (
    <div className="grid grid-cols-2 gap-4 py-8 border-y">
      {items.map((item) => (
        <div key={item.label} className="flex gap-3">
          <div className="size-10 rounded-sm bg-primary/5 flex items-center justify-center text-primary shrink-0">
            <item.icon className="size-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold uppercase tracking-tight">{item.label}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
