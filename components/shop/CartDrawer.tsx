"use client"

import Image from "next/image"
import { X, ShoppingBag, Trash2, Plus, Minus, AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, total, isRegulatedInCart } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent showCloseButton={false} aria-label="Vaša košarica" className="w-full max-w-md gap-0 p-0">
        <SheetHeader className="flex-row items-center justify-between border-b p-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5" aria-hidden="true" />
            <SheetTitle className="text-lg font-bold tracking-tight">Vaša košarica</SheetTitle>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Zatvori košaricu">
              <X className="size-6" aria-hidden="true" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="size-8 text-muted-foreground" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold">Košarica je prazna</p>
                <p className="text-sm text-muted-foreground">Dodajte artikle iz kataloga ili pošaljite upit za regulirane proizvode.</p>
              </div>
              <SheetClose asChild>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/kategorija/sve">Nastavi kupnju</Link>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-sm border bg-muted">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.brand}</p>
                        <h3 className="line-clamp-1 text-sm font-bold leading-tight">{item.name}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label={`Ukloni ${item.name} iz košarice`}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-sm border" aria-label={`Količina za ${item.name}`}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-muted"
                          aria-label={`Smanji količinu za ${item.name}`}
                        >
                          <Minus className="size-3" aria-hidden="true" />
                        </button>
                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-muted"
                          aria-label={`Povećaj količinu za ${item.name}`}
                        >
                          <Plus className="size-3" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-sm font-bold">
                        {((item.salePrice || item.price) * item.quantity).toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                      </p>
                    </div>
                    {item.isRegulated && (
                      <div className="flex items-center gap-1.5 pt-1 text-[10px] font-bold text-primary">
                        <ShieldAlert className="size-3" aria-hidden="true" /> Regulirani artikl
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-6 border-t bg-secondary/10 p-6">
            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <span className="text-sm font-medium text-muted-foreground">Ukupno (bez dostave)</span>
                <span className="text-2xl font-black tracking-tighter">
                  {total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                </span>
              </div>

              {isRegulatedInCart && (
                <div className="flex gap-3 rounded-sm border border-primary/20 bg-primary/10 p-3">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-[11px] font-medium leading-relaxed">
                    U košarici su regulirani artikli. Kupnja se dovršava tek nakon provjere propisane dokumentacije.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Button size="lg" className="h-14 font-bold uppercase tracking-widest group" asChild>
                  <Link href="/checkout">
                    Dovrši kupnju <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Nastavi kupnju
                </Button>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
