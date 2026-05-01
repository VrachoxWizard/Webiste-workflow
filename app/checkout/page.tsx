"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ShieldCheck, Truck, CreditCard, Lock, ArrowLeft, Landmark, AlertTriangle, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const paymentMethods = [
  { id: "cod", label: "Pouzećem / U poslovnici", icon: Truck, description: "Plaćanje pri preuzimanju robe." },
  { id: "card", label: "Kreditna kartica", icon: CreditCard, description: "Sigurno online plaćanje." },
  { id: "bank", label: "Virman / Internet bankarstvo", icon: Landmark, description: "Plaćanje po ponudi trgovine." },
]

export default function CheckoutPage() {
  const { items, total, isRegulatedInCart } = useCart()
  const [paymentMethod, setPaymentMethod] = React.useState("cod")
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [legalAccepted, setLegalAccepted] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  
  const canSubmit = termsAccepted && (!isRegulatedInCart || legalAccepted) && items.length > 0

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (canSubmit) {
      setSubmitted(true)
      toast.success("Narudžba uspješno zaprimljena", {
        description: "Naš tim će vas kontaktirati radi potvrde dostupnosti i dostave.",
      })
    } else {
      toast.error("Molimo prihvatite uvjete kupnje")
    }
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen flex-col bg-background">
        <Section className="flex flex-1 items-center justify-center">
          <Container>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 rounded-sm border border-border/60 bg-muted/10 p-12 text-center shadow-premium">
              <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="size-10" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Hvala na povjerenju</h1>
                <p className="text-lg font-medium leading-relaxed text-muted-foreground">
                  Vaša narudžba je zaprimljena pod brojem <span className="text-foreground font-bold">#TL-{(Math.random() * 10000).toFixed(0)}</span>. 
                  Uskoro ćete primiti email s potvrdom i daljnjim uputama.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 px-8 uppercase tracking-widest font-bold" asChild>
                  <Link href="/">Povratak na naslovnicu</Link>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 uppercase tracking-widest font-bold" asChild>
                  <Link href="/kategorija/sve">Nastavite istraživati</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="border-b bg-muted/20 pb-12 pt-20 md:pt-32">
        <Container>
          <div className="flex flex-col gap-6">
            <Link
              href="/kategorija/sve"
              className="group inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="mr-2 size-3 transition-transform group-hover:-translate-x-1" />
              Povratak u katalog
            </Link>
            <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">Dovršetak Kupnje</h1>
          </div>
        </Container>
      </div>

      <Section className="py-16 md:py-24">
        <Container>
          {items.length === 0 ? (
            <div className="mx-auto flex max-w-xl flex-col items-center gap-8 rounded-sm border border-dashed border-border/60 bg-muted/10 p-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="size-8 text-muted-foreground/30" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Vaša košarica je prazna</h2>
                <p className="font-medium leading-relaxed text-muted-foreground">
                  Trenutno nemate artikala pripremljenih za kupnju. Posjetite naš katalog i odaberite vrhunsku opremu.
                </p>
              </div>
              <Button size="lg" className="h-14 px-10 uppercase tracking-widest font-bold" asChild>
                <Link href="/kategorija/sve">Otvori Katalog</Link>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 xl:gap-24"
            >
              <div className="space-y-20 lg:col-span-7">
                {/* Step 1: Identity */}
                <section className="space-y-10" aria-labelledby="identity-heading">
                  <div className="flex items-center gap-5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-black text-background">
                      01
                    </span>
                    <h2 id="identity-heading" className="text-2xl font-bold tracking-tight uppercase">
                      Identitet Kupca
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2.5">
                      <Label htmlFor="first-name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Ime</Label>
                      <Input
                        id="first-name"
                        name="firstName"
                        required
                        placeholder="Petar"
                        className="h-14 rounded-sm border-border/60 focus-visible:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="last-name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Prezime</Label>
                      <Input
                        id="last-name"
                        name="lastName"
                        required
                        placeholder="Horvat"
                        className="h-14 rounded-sm border-border/60 focus-visible:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2.5 md:col-span-2">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Email adresa</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="petar.horvat@email.hr"
                        className="h-14 rounded-sm border-border/60 focus-visible:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2.5 md:col-span-2">
                      <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Kontakt telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+385 91 123 4567"
                        className="h-14 rounded-sm border-border/60 focus-visible:ring-primary/20"
                      />
                    </div>
                  </div>
                </section>

                {/* Step 2: Delivery */}
                <section className="space-y-10" aria-labelledby="delivery-heading">
                  <div className="flex items-center gap-5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-black text-background">
                      02
                    </span>
                    <h2 id="delivery-heading" className="text-2xl font-bold tracking-tight uppercase">
                      Dostava i Lokacija
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2.5">
                      <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Adresa i broj</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        placeholder="Ilica 100"
                        className="h-14 rounded-sm border-border/60 focus-visible:ring-primary/20"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2.5">
                        <Label htmlFor="city" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Grad</Label>
                        <Input
                          id="city"
                          name="city"
                          required
                          placeholder="Zagreb"
                          className="h-14 rounded-sm border-border/60 focus-visible:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="zip" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Poštanski broj</Label>
                        <Input
                          id="zip"
                          name="zip"
                          inputMode="numeric"
                          required
                          placeholder="10000"
                          className="h-14 rounded-sm border-border/60 focus-visible:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 rounded-sm border border-border/60 bg-muted/5 p-6 shadow-sm">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-background border border-border/40 shadow-inner">
                      <Truck className="size-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[13px] font-bold leading-tight">
                        Logistička obrada narudžbe
                      </p>
                      <p className="text-[11px] font-medium leading-relaxed text-muted-foreground/70">
                        Nakon zaprimanja narudžbe, naš tim provjerava dostupnost i organizira najbrži put do vas. 
                        Dostava za laku opremu je unutar 3-5 radnih dana.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Step 3: Payment */}
                <section className="space-y-10" aria-labelledby="payment-heading">
                  <div className="flex items-center gap-5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-black text-background">
                      03
                    </span>
                    <h2 id="payment-heading" className="text-2xl font-bold tracking-tight uppercase">
                      Način Plaćanja
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        aria-pressed={paymentMethod === method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={cn(
                          "group flex flex-col items-start gap-4 rounded-sm border p-6 text-left transition-all duration-200",
                          paymentMethod === method.id 
                            ? "border-primary bg-primary/5 ring-1 ring-primary shadow-md" 
                            : "border-border/60 hover:border-primary/40 hover:bg-muted/10"
                        )}
                      >
                        <method.icon
                          className={cn(
                            "size-6 transition-colors",
                            paymentMethod === method.id ? "text-primary" : "text-muted-foreground/40 group-hover:text-primary/60"
                          )}
                          aria-hidden="true"
                        />
                        <div className="space-y-1">
                          <p className="text-xs font-black uppercase tracking-widest">{method.label}</p>
                          <p className="text-[10px] font-medium text-muted-foreground leading-tight">{method.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Step 4: Legal */}
                <section className="space-y-10 border-t pt-20" aria-labelledby="legal-heading">
                  <div className="flex items-center gap-5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-black text-background">
                      04
                    </span>
                    <h2 id="legal-heading" className="text-2xl font-bold tracking-tight uppercase">
                      Uvjeti i Potvrda
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                        className="mt-1"
                        required
                      />
                      <Label
                        htmlFor="terms"
                        className="cursor-pointer text-xs font-medium leading-relaxed text-muted-foreground"
                      >
                        Pročitao sam i prihvaćam <Link href="#" className="font-bold text-foreground underline-offset-4 hover:underline transition-all">Opće uvjete poslovanja</Link>, <Link href="#" className="font-bold text-foreground underline-offset-4 hover:underline transition-all">Pravila o privatnosti</Link> i uvjete povrata robe.
                      </Label>
                    </div>

                    {isRegulatedInCart && (
                      <div className="space-y-6 rounded-sm border border-primary/20 bg-primary/5 p-8 shadow-sm">
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden="true" />
                          <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                              Važna Obavijest o Reguliranim Artiklina
                            </p>
                            <p className="text-xs font-medium leading-relaxed text-muted-foreground/80">
                              Vaša košarica sadrži artikle koji podliježu Zakonu o oružju. Kupnju je moguće finalizirati tek nakon osobne provjere dokumentacije (nabavna dozvola, oružni list) u našoj poslovnici ili putem ovlaštenog postupka.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 border-t border-primary/10 pt-6">
                          <Checkbox
                            id="legal-confirm"
                            checked={legalAccepted}
                            onCheckedChange={(checked) => setLegalAccepted(checked === true)}
                            className="mt-1"
                            required
                          />
                          <Label
                            htmlFor="legal-confirm"
                            className="cursor-pointer text-xs font-bold leading-relaxed text-foreground"
                          >
                            Potvrđujem da posjedujem valjanu zakonsku dokumentaciju potrebnu za nabavu reguliranih artikala u košarici te sam upoznat s postupkom preuzimanja istih.
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Sidebar Summary */}
              <aside className="lg:sticky lg:top-28 lg:col-span-5" aria-label="Pregled narudžbe">
                <div className="rounded-sm border border-border/60 bg-muted/5 p-10 shadow-premium">
                  <h2 className="mb-10 text-xl font-bold tracking-tight uppercase tracking-[0.1em]">Pregled Narudžbe</h2>

                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-6 pb-6 border-b border-border/40 last:border-0 last:pb-0">
                        <div className="flex-1 space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{item.brand}</p>
                          <p className="line-clamp-2 text-sm font-bold leading-snug">{item.name}</p>
                          <p className="text-xs font-medium text-muted-foreground">Količina: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-black tracking-tighter">
                          {((item.salePrice || item.price) * item.quantity).toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 space-y-5 border-t border-foreground/10 pt-10">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Međuzbroj</span>
                      <span className="font-bold">
                        {total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Dostava i pakiranje</span>
                      <span className="text-[11px] font-black uppercase tracking-widest text-primary">Po dogovoru</span>
                    </div>
                    <div className="flex items-baseline justify-between pt-6">
                      <span className="text-lg font-black uppercase tracking-widest">Sveukupno</span>
                      <div className="flex flex-col items-end">
                        <span className="text-4xl font-black tracking-tighter text-foreground">
                          {total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                        </span>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground/40">PDV uključen</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    type="submit"
                    className="mt-10 h-16 w-full text-base font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    disabled={!canSubmit}
                  >
                    Dovrši Narudžbu
                  </Button>

                  <div className="mt-8 flex flex-col items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                      <Lock className="size-3" aria-hidden="true" />
                      Sigurna i kriptirana obrada
                    </div>
                    <div className="flex items-center gap-4 border-t border-border/40 pt-6">
                      <div className="flex items-center gap-2 opacity-50">
                        <ShieldCheck className="size-4 text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Safe Checkout</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-50">
                        <Truck className="size-4 text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Global Shipping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </form>
          )}
        </Container>
      </Section>
    </main>
  )
}
