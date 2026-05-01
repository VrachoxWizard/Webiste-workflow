"use client"

import * as React from "react"
import Image from "next/image"
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldAlert, ArrowRight, Truck } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { MagneticButton } from "@/components/ui/magnetic-button"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function CartThumbnail({ src, name, category }: { src: string; name: string; category: string }) {
  const [imageFailed, setImageFailed] = React.useState(false)

  return (
    <div className="bg-secondary/5 tactile-border relative size-24 shrink-0 overflow-hidden rounded-sm">
      {imageFailed ? (
        <div className="flex h-full flex-col items-center justify-center px-2 text-center">
          <span className="text-muted-foreground/30 text-[8px] font-black tracking-widest uppercase">
            {category}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={name}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-500 hover:scale-110"
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
        className="flex w-full max-w-md flex-col gap-0 p-0 shadow-2xl"
        data-testid="cart-drawer"
      >
        <SheetHeader className="bg-background/80 flex h-20 shrink-0 flex-row items-center justify-between border-b border-black/5 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingBag className="text-accent size-5" aria-hidden="true" />
              {items.length > 0 && (
                <span className="bg-accent text-foreground absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full text-[9px] font-black">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </div>
            <SheetTitle className="text-sm font-black tracking-widest uppercase">Košarica</SheetTitle>
          </div>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-full hover:bg-black/5"
              aria-label="Zatvori"
            >
              <X className="size-5" aria-hidden="true" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-10">
              <div className="bg-secondary/5 mx-auto flex w-full flex-col items-center justify-center gap-8 rounded-sm border border-dashed border-black/10 px-6 py-20 text-center">
                <div className="bg-accent/10 flex size-20 items-center justify-center rounded-full shadow-inner">
                  <ShoppingBag className="text-accent/40 size-8" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-black tracking-widest uppercase">Prazna košarica</p>
                  <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                    Pregledajte naš katalog i odaberite vrhunsku opremu za teren.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="tactile-border h-12 rounded-sm px-8 text-[10px] font-black tracking-widest uppercase"
                  asChild
                >
                  <Link href="/kategorija/sve" onClick={onClose}>
                    Otvori Katalog
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="divide-black/5 divide-y">
              {items.map((item) => (
                <div key={item.id} className="group flex gap-6 p-8 transition-colors hover:bg-secondary/5">
                  <CartThumbnail src={item.image} name={item.name} category={item.category} />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-accent text-[9px] font-black tracking-widest uppercase">
                            {item.brand}
                          </p>
                          <h3 className="text-foreground line-clamp-2 text-xs font-black leading-snug tracking-tight">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground/30 hover:text-accent transition-colors"
                          aria-label={`Ukloni`}
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                      {item.isRegulated && (
                        <div className="text-accent flex items-center gap-1.5 pt-2 text-[9px] font-black tracking-widest uppercase">
                          <ShieldAlert className="size-3" aria-hidden="true" /> Sigurnosni Protokol
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <div
                        className="tactile-border bg-background flex items-center overflow-hidden rounded-sm"
                        aria-label={`Količina`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-muted-foreground/50 hover:bg-secondary/10 hover:text-foreground flex size-8 items-center justify-center transition-colors"
                        >
                          <Minus className="size-3" aria-hidden="true" />
                        </button>
                        <span className="flex w-10 justify-center text-[10px] font-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-muted-foreground/50 hover:bg-secondary/10 hover:text-foreground flex size-8 items-center justify-center transition-colors"
                        >
                          <Plus className="size-3" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-xs font-black tracking-tight">
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
          <div className="surface-glass border-t border-black/5 p-8 shadow-elevated">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-black/5 pb-6">
                  <span className="text-label text-muted-foreground">Sveukupno</span>
                  <span className="text-4xl font-black tracking-tighter">
                    {total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                  </span>
                </div>

                {isRegulatedInCart ? (
                  <div className="bg-accent/5 border-accent/20 flex items-start gap-4 rounded-sm border p-6">
                    <ShieldAlert
                      className="text-accent mt-0.5 size-5 shrink-0"
                      aria-hidden="true"
                    />
                    <div className="space-y-2">
                      <p className="text-accent text-[9px] font-black tracking-widest uppercase">
                        Potrebna dokumentacija
                      </p>
                      <p className="text-muted-foreground/80 text-[11px] leading-relaxed font-medium">
                        Vaša košarica sadrži artikle čija je kupnja regulirana zakonom. Za ove
                        artikle kupnju ćete dovršiti uz provjeru isprava u trgovini.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground/50 flex items-center gap-3 px-1 text-[10px] font-black tracking-widest uppercase">
                    <Truck className="size-4" />
                    <span>Dostava se obračunava u sljedećem koraku</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <MagneticButton className="w-full">
                  <Button
                    size="lg"
                    className="group shadow-premium h-16 w-full text-[11px] font-black tracking-[0.2em] uppercase transition-all hover:bg-accent hover:text-foreground"
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
                </MagneticButton>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground/50 hover:text-foreground h-10 text-[9px] font-black tracking-widest uppercase transition-all underline underline-offset-4"
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
