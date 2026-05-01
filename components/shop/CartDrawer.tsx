"use client"

import * as React from "react"
import Image from "next/image"
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldAlert, ArrowRight } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function CartThumbnail({ src, name, category }: { src: string; name: string; category: string }) {
  const [imageFailed, setImageFailed] = React.useState(false)

  return (
    <div className="relative size-20 shrink-0 overflow-hidden rounded-sm border bg-muted">
      {imageFailed ? (
        <div className="flex h-full flex-col items-center justify-center bg-secondary/40 px-2 text-center">
          <span className="text-[9px] font-bold uppercase tracking-widest text-primary">{category}</span>
        </div>
      ) : (
        <Image src={src} alt={name} fill sizes="80px" className="object-cover" onError={() => setImageFailed(true)} />
      )}
    </div>
  )
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
            <div className="flex h-full flex-col items-center justify-center p-6">
              <div className="flex w-full flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-border/60 bg-muted/20 py-20 text-center px-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-muted shadow-sm">
                  <ShoppingBag className="size-6 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="space-y-1.5 max-w-[200px]">
                  <p className="text-base font-bold tracking-tight">Košarica je prazna</p>
                  <p className="text-xs font-medium text-muted-foreground">
                    Dodajte artikle iz kataloga ili pošaljite upit za regulirane proizvode.
                  </p>
                </div>
                <Button variant="outline" className="mt-4 font-bold uppercase tracking-widest text-[11px] h-10 px-6" asChild>
                  <Link href="/kategorija/sve" onClick={onClose}>Nastavi kupnju</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <CartThumbnail src={item.image} name={item.name} category={item.category} />
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
                      <div className="flex items-center rounded-sm border border-border/50 bg-background shadow-sm" aria-label={`Količina za ${item.name}`}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          aria-label={`Smanji količinu za ${item.name}`}
                        >
                          <Minus className="size-3" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
                <div className="flex gap-3 rounded-sm border border-primary/20 bg-primary/5 p-4 shadow-sm mt-4">
                  <ShieldAlert className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Zakonska regulativa</p>
                    <p className="text-[11px] font-medium leading-relaxed text-muted-foreground">
                      U košarici su regulirani artikli. Kupnja se dovršava tek nakon provjere propisane dokumentacije.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Button size="lg" className="h-14 font-bold uppercase tracking-widest group" asChild>
                <Link href="/checkout" onClick={onClose}>
                  Dovrši kupnju <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
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
