"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ShieldCheck, Truck, CreditCard, Lock, ChevronLeft, Landmark } from "lucide-react"
import Link from "next/link"

const paymentMethods = [
  { id: "cod", label: "Pouzećem", icon: Truck },
  { id: "card", label: "Kartica", icon: CreditCard },
  { id: "bank", label: "Transakcijski", icon: Landmark },
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
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="border-b bg-secondary/10 pb-8 pt-16 md:pt-24">
        <Container>
          <div className="flex flex-col gap-4">
            <Link href="/kategorija/sve" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
              <ChevronLeft className="size-4" aria-hidden="true" /> Povratak na trgovinu
            </Link>
            <h1 className="text-4xl font-bold tracking-tighter">Dovršetak narudžbe</h1>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {items.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-sm border bg-secondary/10 p-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight">Košarica je prazna</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground">
                Dodajte artikle iz kataloga ili pošaljite upit za regulirane proizvode prije završetka kupnje.
              </p>
              <Button className="mt-8" asChild>
                <Link href="/kategorija/sve">Pregledaj katalog</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
              <div className="space-y-12 lg:col-span-7">
                {submitted && (
                  <div className="rounded-sm border border-primary/20 bg-primary/5 p-4 text-sm font-medium text-primary">
                    Upit za narudžbu je pripremljen. U stvarnoj integraciji ovdje bi se otvorila potvrda ili plaćanje.
                  </div>
                )}

                <section className="space-y-6" aria-labelledby="customer-heading">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">1</div>
                    <h2 id="customer-heading" className="text-xl font-bold tracking-tight">Podaci o kupcu</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Ime</Label>
                      <Input id="first-name" name="firstName" required placeholder="Vaše ime" className="h-12 rounded-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Prezime</Label>
                      <Input id="last-name" name="lastName" required placeholder="Vaše prezime" className="h-12 rounded-sm" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email adresa</Label>
                      <Input id="email" name="email" type="email" required placeholder="email@primjer.hr" className="h-12 rounded-sm" />
                    </div>
                  </div>
                </section>

                <section className="space-y-6" aria-labelledby="delivery-heading">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">2</div>
                    <h2 id="delivery-heading" className="text-xl font-bold tracking-tight">Dostava i adresa</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresa i kućni broj</Label>
                      <Input id="address" name="address" required placeholder="Ulica i broj" className="h-12 rounded-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Grad</Label>
                        <Input id="city" name="city" required placeholder="Zagreb" className="h-12 rounded-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">Poštanski broj</Label>
                        <Input id="zip" name="zip" inputMode="numeric" required placeholder="10000" className="h-12 rounded-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-sm border bg-muted/50 p-4">
                    <div className="flex items-center gap-3">
                      <Truck className="size-5 text-primary" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-bold">Standardna dostava ili dogovoreno preuzimanje</p>
                        <p className="text-xs text-muted-foreground">Regulirani artikli podliježu posebnoj provjeri prije isporuke.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-6" aria-labelledby="payment-heading">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">3</div>
                    <h2 id="payment-heading" className="text-xl font-bold tracking-tight">Način plaćanja</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        aria-pressed={paymentMethod === method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className="group flex flex-col items-center gap-3 rounded-sm border p-4 transition-all hover:border-primary/50 data-[active=true]:border-primary data-[active=true]:bg-primary/5 data-[active=true]:ring-1 data-[active=true]:ring-primary"
                        data-active={paymentMethod === method.id}
                      >
                        <method.icon className="size-6 text-muted-foreground transition-colors group-hover:text-primary group-data-[active=true]:text-primary" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-widest">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4 border-t pt-8" aria-labelledby="legal-heading">
                  <h2 id="legal-heading" className="sr-only">Potvrde i uvjeti</h2>
                  <div className="flex gap-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onChange={(event) => setTermsAccepted(event.currentTarget.checked)}
                      className="mt-1"
                      required
                    />
                    <Label htmlFor="terms" className="text-xs font-semibold leading-relaxed cursor-pointer">
                      Pročitao sam i prihvaćam <Link href="/opci-uvjeti" className="font-bold text-primary hover:underline">Opće uvjete poslovanja</Link> i <Link href="/privatnost" className="font-bold text-primary hover:underline">pravila privatnosti</Link>.
                    </Label>
                  </div>
                  {isRegulatedInCart && (
                    <div className="flex gap-4 rounded-sm border border-primary/20 bg-primary/5 p-5 shadow-sm">
                      <ShieldCheck className="size-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Zakonska obveza</p>
                          <p className="text-xs font-medium leading-relaxed text-muted-foreground">
                            Ova narudžba sadrži regulirane artikle. Procesuiranje je moguće tek nakon provjere propisane dokumentacije.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="legal-confirm"
                            checked={legalAccepted}
                            onChange={(event) => setLegalAccepted(event.currentTarget.checked)}
                            className="mt-0.5 border-primary"
                            required
                          />
                          <Label htmlFor="legal-confirm" className="text-xs font-bold leading-relaxed text-foreground cursor-pointer">
                            Potvrđujem da sam upoznat sa zakonskim uvjetima za kupnju reguliranih artikala i da ću prije preuzimanja predočiti propisanu dokumentaciju.
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>

              <aside className="space-y-8 lg:sticky lg:top-28 lg:col-span-5" aria-label="Pregled narudžbe">
                <div className="space-y-6 rounded-sm border bg-secondary/10 p-8">
                  <h2 className="text-lg font-bold tracking-tight">Pregled narudžbe</h2>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="line-clamp-1 text-sm font-bold leading-tight">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Količina: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold">
                          {((item.salePrice || item.price) * item.quantity).toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                        </p>
                      </div>
                    ))}
                  </div>

                  {isRegulatedInCart && (
                    <div className="flex gap-3 rounded-sm border border-primary/20 bg-primary/5 p-4 shadow-sm">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <p className="text-[11px] font-medium leading-relaxed text-muted-foreground">
                        Regulirani artikli zahtijevaju provjeru dokumentacije prije obrade ili preuzimanja.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 border-t pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Međuzbroj</span>
                      <span className="font-bold">{total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Dostava</span>
                      <span className="font-bold text-primary">Potvrđuje trgovina</span>
                    </div>
                    <div className="flex justify-between pt-4">
                      <span className="text-lg font-bold">Ukupno</span>
                      <span className="text-2xl font-black tracking-tighter">
                        {total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                      </span>
                    </div>
                  </div>

                  <Button size="lg" className="h-16 w-full text-base font-bold uppercase tracking-widest shadow-premium" disabled={!canSubmit}>
                    Potvrdi narudžbu
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <Lock className="size-3" aria-hidden="true" /> Kriptirana obrada podataka
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 rounded-sm border p-3">
                    <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Sigurna kupnja</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-sm border p-3">
                    <Truck className="size-4 text-primary" aria-hidden="true" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Provjerena dostava</span>
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
