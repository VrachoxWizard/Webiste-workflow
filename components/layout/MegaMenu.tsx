import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface MegaMenuProps {
  data: {
    title: string
    items: { title: string; href: string }[]
  }[]
}

export function MegaMenu({ data }: MegaMenuProps) {
  return (
    <div className="absolute top-full left-1/2 z-50 hidden w-[min(820px,calc(100vw-2rem))] -translate-x-1/2 pt-2 group-focus-within:block group-hover:block">
      <div className="bg-background shadow-premium w-full overflow-hidden rounded-sm border p-8">
        <div className="grid grid-cols-3 gap-10">
          {data.map((col) => (
            <div key={col.title} className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className="bg-primary/50 h-4 w-0.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <h3 className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  {col.title}
                </h3>
              </div>
              <ul className="space-y-1">
                {col.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="group/link text-foreground/70 hover:text-primary hover:bg-muted/40 flex items-center gap-2 rounded-sm px-2 py-1 text-[13px] font-medium transition-colors"
                    >
                      {item.title}
                      <ChevronRight className="ml-auto size-3 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Support Footer Bar */}
          <div className="border-border/50 col-span-full mt-6 flex items-center justify-between border-t pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/8 border-primary/15 flex size-7 shrink-0 items-center justify-center rounded-sm border">
                <ChevronRight className="text-primary size-3.5" aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Stručna podrška
                </p>
                <p className="text-foreground/60 text-xs font-medium">
                  Za kompatibilnost, dokumentaciju i dostupnost kontaktirajte nas.
                </p>
              </div>
            </div>
            <Link
              href="/kontakt"
              className="text-primary border-primary/20 hover:bg-primary/5 shrink-0 rounded-sm border px-4 py-2 text-[11px] font-bold tracking-widest uppercase transition-colors"
            >
              Zatraži savjet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
