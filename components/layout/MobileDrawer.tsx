"use client"

import * as React from "react"
import Link from "next/link"
import {
  X,
  Search,
  ChevronDown,
  Phone,
  Mail,
  FileText,
  ShoppingBag,
  MessageSquare,
} from "lucide-react"
import { NAVIGATION_DATA } from "@/config/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/CartContext"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [expanded, setExpanded] = React.useState<string | null>(null)
  const { itemCount } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="left"
        showCloseButton={false}
        aria-label="TerraLov"
        className="bg-background w-full max-w-sm gap-0 border-r p-0 shadow-2xl"
      >
        <SheetHeader className="flex-row items-center justify-between border-b p-4">
          <SheetTitle className="text-xl font-bold tracking-tighter uppercase">
            Terra<span className="text-primary italic">Lov</span>
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Zatvori izbornik">
              <X className="size-6" aria-hidden="true" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="p-4">
          <form action="/kategorija/sve" role="search" className="group relative">
            <Search
              className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 size-4 -translate-y-1/2 transition-colors"
              aria-hidden="true"
            />
            <Input
              type="search"
              name="q"
              aria-label="Traži proizvode"
              placeholder="Traži proizvode..."
              className="bg-muted/50 focus:border-primary focus:bg-background h-11 rounded-sm border-transparent pr-4 pl-10 text-sm font-medium"
            />
          </form>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <div className="text-muted-foreground px-4 py-2 text-[10px] font-bold tracking-widest uppercase">
            Kategorije
          </div>
          {NAVIGATION_DATA.map((item) => (
            <div key={item.title} className="border-muted/50 border-b last:border-0">
              <button
                type="button"
                onClick={() => setExpanded(expanded === item.title ? null : item.title)}
                aria-expanded={expanded === item.title}
                className="flex w-full items-center justify-between px-4 py-4 text-[15px] font-semibold"
              >
                {item.title}
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform duration-300",
                    expanded === item.title && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              {expanded === item.title && (
                <div className="bg-muted/20 border-primary/30 ml-4 overflow-hidden border-l-2">
                  <div className="px-5 py-3 pb-6">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-primary mb-4 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase hover:underline"
                    >
                      Sve iz kategorije
                    </Link>
                    <div className="flex flex-col gap-5">
                      {item.columns.map((col) => (
                        <div key={col.title} className="space-y-2">
                          <h3 className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                            {col.title}
                          </h3>
                          <ul className="space-y-2.5">
                            {col.items.map((sub) => (
                              <li key={sub.title}>
                                <Link
                                  href={sub.href}
                                  onClick={onClose}
                                  className="text-foreground/80 hover:text-primary text-[13px] font-medium transition-colors"
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="p-4 pt-6">
            <Link
              href="/kategorija/akcija"
              onClick={onClose}
              className="text-destructive flex items-center gap-3 text-[15px] font-bold"
            >
              <span className="bg-destructive size-2 rounded-full" aria-hidden="true" />
              Akcija i popusti
            </Link>
          </div>
        </div>

        <div className="space-y-5 border-t p-5">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-10 justify-start gap-2 rounded-sm text-xs font-bold tracking-widest uppercase"
              asChild
            >
              <Link href="/kontakt" onClick={onClose}>
                <MessageSquare className="size-3.5" aria-hidden="true" /> Podrška
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-10 justify-start gap-2 rounded-sm text-xs font-bold tracking-widest uppercase"
              asChild
            >
              <Link href="/checkout" onClick={onClose}>
                <ShoppingBag className="size-3.5" aria-hidden="true" /> Košarica ({itemCount})
              </Link>
            </Button>
          </div>

          <div className="space-y-2.5 pt-1">
            <a
              href="tel:+38512345678"
              className="text-muted-foreground hover:text-foreground flex items-center gap-3 text-xs font-medium transition-colors"
            >
              <Phone className="size-3.5 shrink-0" aria-hidden="true" /> +385 1 234 5678
            </a>
            <a
              href="mailto:info@terralov.hr"
              className="text-muted-foreground hover:text-foreground flex items-center gap-3 text-xs font-medium transition-colors"
            >
              <Mail className="size-3.5 shrink-0" aria-hidden="true" /> info@terralov.hr
            </a>
            <Link
              href="/legal"
              onClick={onClose}
              className="text-primary flex items-center gap-3 text-xs font-bold hover:underline"
            >
              <FileText className="size-3.5 shrink-0" aria-hidden="true" /> Zakonske napomene
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
