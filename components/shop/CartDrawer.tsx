"use client"

import * as React from "react"
import Image from "next/image"
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldAlert, ArrowRight, Truck } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function CartThumbnail({ src, name, category }: { src: string; name: string; category: string }) {
  const [imageFailed, setImageFailed] = React.useState(false)

  return (
    <div className="relative size-24 shrink-0 overflow-hidden rounded-sm border border-border/50 bg-muted/20">
      {imageFailed ? (
        <div className="flex h-full flex-col items-center justify-center bg-secondary/40 px-2 text-center">
          <span className="text-[9px] font-bold uppercase tracking-widest text-primary">
            {category}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={name}
          fill
          sizes="96px"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  )
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, total, isRegulatedInCart } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        showCloseButton={false}
        aria-label="Vaša košarica"
        className="flex w-full max-w-md flex-col gap-0 p-0"
        data-testid="cart-drawer"
      >
        <SheetHeader className="flex h-[72px] shrink-0 flex-row items-center justify-between border-b px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag className="size-5 text-primary" aria-hidden="true" />
              {items.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-black text-primary-foreground">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </div>
            <SheetTitle className="text-lg font-bold tracking-tight">Košarica</SheetTitle>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="size-10 rounded-full hover:bg-muted" aria-label="Zatvori košaricu">
              <X className="size-5" aria-hidden="true" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8">
              <div className="flex w-full flex-col items-center justify-center gap-6 rounded-sm border border-dashed border-border/60 bg-muted/10 px-6 py-24 text-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-muted/50 shadow-inner">
                  <ShoppingBag className="size-8 text-muted-foreground/30" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold tracking-tight">Prazna košarica</p>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pregledajte naš katalog i odaberite vrhunsku opremu za teren.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="h-12 rounded-sm px-8 text-xs font-bold uppercase tracking-widest"
                  asChild
                >
                  <Link href="/kategorija/sve" onClick={onClose}>
                    Otvori Katalog
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {items.map((item) => (
                <div key={item.id} className="flex gap-5 p-6 transition-colors hover:bg-muted/5">
                  <CartThumbnail src={item.image} name={item.name} category={item.category} />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                            {item.brand}
                          </p>
                          <h3 className="line-clamp-2 text-[13px] font-bold leading-snug">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground/40 transition-colors hover:text-destructive"
                          aria-label={`Ukloni ${item.name} iz košarice`}
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                      {item.isRegulated && (
                        <div className="flex items-center gap-1.5 pt-1 text-[10px] font-bold uppercase tracking-tighter text-primary/80">
                          <ShieldAlert className="size-3" aria-hidden="true" /> Regulirano
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div
                        className="flex items-center overflow-hidden rounded-sm border border-border/50 bg-background shadow-sm"
                        aria-label={`Količina za ${item.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          aria-label={`Smanji količinu`}
                        >
                          <Minus className="size-3" aria-hidden="true" />
                        </button>
                        <span className="flex w-10 justify-center text-xs font-black">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          aria-label={`Povećaj količinu`}
                        >
                          <Plus className="size-3" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-sm font-black tracking-tighter">
                        {((item.salePrice || item.price) * item.quantity).toLocaleString("hr-HR", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="shrink-0 border-t bg-muted/30 p-6 shadow-premium-top">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-dashed border-border/60 pb-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">
                    Sveukupno
                  </span>
                  <span className="text-3xl font-black tracking-tighter">
                    {total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                  </span>
                </div>

                {isRegulatedInCart ? (
                  <div className="flex items-start gap-4 rounded-sm border border-primary/20 bg-primary/5 p-5 shadow-sm">
                    <ShieldAlert className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                        Potrebna dokumentacija
                      </p>
                      <p className="text-[11px] font-medium leading-relaxed text-muted-foreground/80">
                        Vaša košarica sadrži artikle čija je kupnja regulirana zakonom. Za ove artikle kupnju ćete dovršiti uz provjeru isprava u trgovini.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-1 text-[11px] font-medium text-muted-foreground/60">
                    <Truck className="size-4" />
                    <span>Dostava se obračunava u sljedećem koraku</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button size="lg" className="group h-14 w-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20" asChild>
                  <Link href="/checkout" onClick={onClose}>
                    Kreni na plaćanje
                    <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="h-10 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-all hover:text-foreground"
                  >
                    Nastavi s kupnjom
                  </Button>
                </SheetClose>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
