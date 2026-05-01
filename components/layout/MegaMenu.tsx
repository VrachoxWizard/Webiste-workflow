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
    <div className="absolute top-full left-1/2 z-50 hidden w-[min(800px,calc(100vw-2rem))] -translate-x-1/2 pt-2 group-hover:block group-focus-within:block">
      <div className="w-full overflow-hidden rounded-sm border bg-background p-8 shadow-premium">
        <div className="grid grid-cols-3 gap-12">
          {data.map((col) => (
            <div key={col.title} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href}
                      className="group/link text-[13px] font-medium text-foreground/70 hover:text-primary transition-colors flex items-center justify-between"
                    >
                      {item.title}
                      <ChevronRight className="size-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Featured Area */}
          <div className="col-span-full mt-8 pt-8 border-t flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Stručna podrška
              </p>
              <p className="text-xs font-medium">
                Za kompatibilnost, dostupnost i dokumentaciju kontaktirajte trgovinu prije kupnje.
              </p>
            </div>
            <Link 
              href="/kontakt"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
            >
              Zatraži savjet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
