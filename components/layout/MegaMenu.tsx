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
    <div className="absolute top-full left-1/2 z-50 hidden w-[min(820px,calc(100vw-2rem))] -translate-x-1/2 pt-2 group-hover:block group-focus-within:block">
      <div className="w-full overflow-hidden rounded-sm border bg-background p-8 shadow-premium">
        <div className="grid grid-cols-3 gap-10">
          {data.map((col) => (
            <div key={col.title} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-4 w-0.5 bg-primary/50 rounded-full shrink-0" aria-hidden="true" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {col.title}
                </h3>
              </div>
              <ul className="space-y-1">
                {col.items.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href}
                      className="group/link text-[13px] font-medium text-foreground/70 hover:text-primary transition-colors flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-muted/40"
                    >
                      {item.title}
                      <ChevronRight className="size-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all ml-auto" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Support Footer Bar */}
          <div className="col-span-full mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-7 rounded-sm bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                <ChevronRight className="size-3.5 text-primary" aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Stručna podrška</p>
                <p className="text-xs font-medium text-foreground/60">Za kompatibilnost, dokumentaciju i dostupnost kontaktirajte nas.</p>
              </div>
            </div>
            <Link 
              href="/kontakt"
              className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-primary border border-primary/20 hover:bg-primary/5 px-4 py-2 rounded-sm transition-colors"
            >
              Zatraži savjet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
