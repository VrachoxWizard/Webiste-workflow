"use client"

import * as React from "react"
import Image from "next/image"
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldAlert, ArrowRight, Truck } from "lucide-react"
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
    <div className="border-border/50 bg-muted/20 relative size-24 shrink-0 overflow-hidden rounded-sm border">
      {imageFailed ? (
        <div className="bg-secondary/40 flex h-full flex-col items-center justify-center px-2 text-center">
          <span className="text-primary text-[9px] font-bold tracking-widest uppercase">
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
              <ShoppingBag className="text-primary size-5" aria-hidden="true" />
              {items.length > 0 && (
                <span className="bg-primary text-primary-foreground absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full text-[9px] font-black">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </div>
            <SheetTitle className="text-lg font-bold tracking-tight">Košarica</SheetTitle>
          </div>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted size-10 rounded-full"
              aria-label="Zatvori košaricu"
            >
              <X className="size-5" aria-hidden="true" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8">
              <div className="border-border/60 bg-muted/10 flex w-full flex-col items-center justify-center gap-6 rounded-sm border border-dashed px-6 py-24 text-center">
                <div className="bg-muted/50 flex size-20 items-center justify-center rounded-full shadow-inner">
                  <ShoppingBag className="text-muted-foreground/30 size-8" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold tracking-tight">Prazna košarica</p>
                  <p className="text-muted-foreground text-sm font-medium">
                    Pregledajte naš katalog i odaberite vrhunsku opremu za teren.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="h-12 rounded-sm px-8 text-xs font-bold tracking-widest uppercase"
                  asChild
                >
                  <Link href="/kategorija/sve" onClick={onClose}>
                    Otvori Katalog
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="divide-border/40 divide-y">
              {items.map((item) => (
                <div key={item.id} className="hover:bg-muted/5 flex gap-5 p-6 transition-colors">
                  <CartThumbnail src={item.image} name={item.name} category={item.category} />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-0.5">
                          <p className="text-primary text-[10px] font-bold tracking-widest uppercase">
                            {item.brand}
                          </p>
                          <h3 className="line-clamp-2 text-[13px] leading-snug font-bold">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground/40 hover:text-destructive transition-colors"
                          aria-label={`Ukloni ${item.name} iz košarice`}
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                      {item.isRegulated && (
                        <div className="text-primary/80 flex items-center gap-1.5 pt-1 text-[10px] font-bold tracking-tighter uppercase">
                          <ShieldAlert className="size-3" aria-hidden="true" /> Regulirano
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div
                        className="border-border/50 bg-background flex items-center overflow-hidden rounded-sm border shadow-sm"
                        aria-label={`Količina za ${item.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center transition-colors"
                          aria-label={`Smanji količinu`}
                        >
                          <Minus className="size-3" aria-hidden="true" />
                        </button>
                        <span className="flex w-10 justify-center text-xs font-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center transition-colors"
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
          <div className="bg-muted/30 shadow-premium-top shrink-0 border-t p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="border-border/60 flex items-baseline justify-between border-b border-dashed pb-4">
                  <span className="text-muted-foreground/60 text-sm font-bold tracking-widest uppercase">
                    Sveukupno
                  </span>
                  <span className="text-3xl font-black tracking-tighter">
                    {total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                  </span>
                </div>

                {isRegulatedInCart ? (
                  <div className="border-primary/20 bg-primary/5 flex items-start gap-4 rounded-sm border p-5 shadow-sm">
                    <ShieldAlert
                      className="text-primary mt-0.5 size-5 shrink-0"
                      aria-hidden="true"
                    />
                    <div className="space-y-1.5">
                      <p className="text-primary text-[10px] font-black tracking-widest uppercase">
                        Potrebna dokumentacija
                      </p>
                      <p className="text-muted-foreground/80 text-[11px] leading-relaxed font-medium">
                        Vaša košarica sadrži artikle čija je kupnja regulirana zakonom. Za ove
                        artikle kupnju ćete dovršiti uz provjeru isprava u trgovini.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground/60 flex items-center gap-3 px-1 text-[11px] font-medium">
                    <Truck className="size-4" />
                    <span>Dostava se obračunava u sljedećem koraku</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="group shadow-primary/20 h-14 w-full text-sm font-bold tracking-widest uppercase shadow-lg"
                  asChild
                >
                  <Link href="/checkout" onClick={onClose}>
                    Kreni na plaćanje
                    <ArrowRight
                      className="ml-3 size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground h-10 text-[10px] font-bold tracking-widest uppercase transition-all"
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
