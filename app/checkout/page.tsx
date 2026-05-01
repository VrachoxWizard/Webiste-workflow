"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowLeft,
  Landmark,
  AlertTriangle,
  ShoppingBag,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const paymentMethods = [
  {
    id: "cod",
    label: "Pouzećem",
    icon: Truck,
    description: "Plaćanje pri preuzimanju robe.",
  },
  {
    id: "card",
    label: "Kreditna kartica",
    icon: CreditCard,
    description: "Sigurno online plaćanje.",
  },
  {
    id: "bank",
    label: "Virman",
    icon: Landmark,
    description: "Plaćanje po ponudi trgovine.",
  },
]

export default function CheckoutPage() {
  const { items, total, isRegulatedInCart } = useCart()
  const [paymentMethod, setPaymentMethod] = React.useState("cod")
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [legalAccepted, setLegalAccepted] = React.useState(false)
  const [orderNumber, setOrderNumber] = React.useState<string | null>(null)
  const submitted = orderNumber !== null

  const canSubmit = termsAccepted && (!isRegulatedInCart || legalAccepted) && items.length > 0

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (canSubmit) {
      const nextOrderNumber = `TL-${Math.floor(1000 + Math.random() * 9000)}`
      setOrderNumber(nextOrderNumber)
      toast.success("Narudžba je zaprimljena", {
        description: "Tim trgovine provjerit će dostupnost, dostavu i potrebnu dokumentaciju.",
      })
    } else {
      toast.error("Molimo prihvatite uvjete kupnje")
    }
  }

  if (submitted) {
    return (
      <main className="bg-background flex min-h-screen flex-col">
        <section className="flex flex-1 items-center justify-center py-20">
          <Container>
            <div className="surface-glass border-accent/10 mx-auto flex max-w-2xl flex-col items-center gap-10 rounded-sm border p-12 text-center shadow-elevated md:p-20">
              <div className="bg-accent/10 text-accent flex size-20 items-center justify-center rounded-full">
                <ShieldCheck className="size-10" />
              </div>
              <div className="space-y-4">
                <h1 className="text-EDITORIAL-headline text-4xl sm:text-5xl">Hvala na povjerenju</h1>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  Vaša narudžba je zaprimljena pod brojem{" "}
                  <span className="text-foreground font-black tracking-tight">#{orderNumber}</span>. Uskoro ćete
                  primiti email s potvrdom i daljnjim uputama našeg tima.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="shadow-premium h-14 px-10 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-accent hover:text-foreground" asChild>
                  <Link href="/">Povratak na naslovnicu</Link>
                </Button>
                <Button
                  variant="outline"
                  className="tactile-border h-14 px-10 text-[10px] font-black tracking-widest uppercase transition-all"
                  asChild
                >
                  <Link href="/kategorija/sve">Nastavite istraživati</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-background flex min-h-screen flex-col">
      <div className="bg-secondary/10 border-b pt-24 pb-12 md:pt-40 md:pb-20">
        <Container>
          <div className="flex flex-col gap-10">
            <Link
              href="/kategorija/sve"
              className="group flex items-center text-label hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-3 size-3.5 transition-transform group-hover:-translate-x-1" />
              Povratak u katalog
            </Link>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-accent size-2 rounded-full" />
                <span className="text-label text-accent uppercase tracking-[0.3em]">Osiguran proces</span>
              </div>
              <h1 className="text-EDITORIAL-headline text-5xl sm:text-7xl md:text-8xl">Dovršetak Kupnje</h1>
            </div>
          </div>
        </Container>
      </div>

      <section className="py-16 md:py-24 lg:py-32">
        <Container>
          {items.length === 0 ? (
            <div className="bg-secondary/5 border-black/5 mx-auto flex max-w-2xl flex-col items-center gap-10 rounded-sm border border-dashed px-6 py-24 text-center">
              <div className="bg-accent/10 flex size-20 items-center justify-center rounded-full">
                <ShoppingBag className="text-accent/40 size-8" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">Vaša košarica je prazna</h2>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  Trenutno nemate artikala pripremljenih za kupnju. Posjetite naš katalog i
                  odaberite vrhunsku opremu za vašu sljedeću avanturu.
                </p>
              </div>
              <Button className="tactile-border h-14 px-12 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-foreground hover:text-background" asChild>
                <Link href="/kategorija/sve">Otvori Katalog</Link>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 items-start gap-24 lg:grid-cols-12 xl:gap-32"
            >
              <div className="space-y-32 lg:col-span-7">
                {/* Step 1: Identity */}
                <section className="space-y-12" aria-labelledby="identity-heading">
                  <div className="flex items-center gap-6">
                    <span className="bg-foreground text-background flex size-12 items-center justify-center rounded-full text-xs font-black">
                      01
                    </span>
                    <h2
                      id="identity-heading"
                      className="text-label text-foreground"
                    >
                      Identitet Kupca
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label
                        htmlFor="first-name"
                        className="text-label text-muted-foreground/60"
                      >
                        Vaše Ime
                      </Label>
                      <Input
                        id="first-name"
                        name="firstName"
                        required
                        placeholder="Petar"
                        className="tactile-border focus-visible:ring-accent/20 h-14 rounded-sm text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="last-name"
                        className="text-label text-muted-foreground/60"
                      >
                        Prezime
                      </Label>
                      <Input
                        id="last-name"
                        name="lastName"
                        required
                        placeholder="Horvat"
                        className="tactile-border focus-visible:ring-accent/20 h-14 rounded-sm text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label
                        htmlFor="email"
                        className="text-label text-muted-foreground/60"
                      >
                        Email Adresa
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="petar.horvat@email.hr"
                        className="tactile-border focus-visible:ring-accent/20 h-14 rounded-sm text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label
                        htmlFor="phone"
                        className="text-label text-muted-foreground/60"
                      >
                        Kontakt Telefon
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+385 91 123 4567"
                        className="tactile-border focus-visible:ring-accent/20 h-14 rounded-sm text-sm font-bold"
                      />
                    </div>
                  </div>
                </section>

                {/* Step 2: Delivery */}
                <section className="space-y-12" aria-labelledby="delivery-heading">
                  <div className="flex items-center gap-6">
                    <span className="bg-foreground text-background flex size-12 items-center justify-center rounded-full text-xs font-black">
                      02
                    </span>
                    <h2
                      id="delivery-heading"
                      className="text-label text-foreground"
                    >
                      Dostava i Lokacija
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-3">
                      <Label
                        htmlFor="address"
                        className="text-label text-muted-foreground/60"
                      >
                        Ulica i Kućni Broj
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        placeholder="Ilica 100"
                        className="tactile-border focus-visible:ring-accent/20 h-14 rounded-sm text-sm font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div className="space-y-3">
                        <Label
                          htmlFor="city"
                          className="text-label text-muted-foreground/60"
                        >
                          Grad
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          required
                          placeholder="Zagreb"
                          className="tactile-border focus-visible:ring-accent/20 h-14 rounded-sm text-sm font-bold"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="zip"
                          className="text-label text-muted-foreground/60"
                        >
                          Poštanski Broj
                        </Label>
                        <Input
                          id="zip"
                          name="zip"
                          inputMode="numeric"
                          required
                          placeholder="10000"
                          className="tactile-border focus-visible:ring-accent/20 h-14 rounded-sm text-sm font-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary/5 border-black/5 flex items-start gap-6 rounded-sm border p-8 shadow-sm">
                    <div className="bg-background tactile-border flex size-14 shrink-0 items-center justify-center rounded-full shadow-inner">
                      <Truck className="text-accent size-6" aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-black tracking-tight">
                        Logistička obrada narudžbe
                      </p>
                      <p className="text-muted-foreground/70 text-[11px] leading-relaxed font-medium">
                        Naš tim stručnjaka provjerava dostupnost i organizira optimalnu rutu. Dostava za standardnu opremu realizira se unutar 3-5 radnih dana od potvrde.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Step 3: Payment */}
                <section className="space-y-12" aria-labelledby="payment-heading">
                  <div className="flex items-center gap-6">
                    <span className="bg-foreground text-background flex size-12 items-center justify-center rounded-full text-xs font-black">
                      03
                    </span>
                    <h2
                      id="payment-heading"
                      className="text-label text-foreground"
                    >
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
                          "tactile-border group flex flex-col items-start gap-5 rounded-sm p-8 text-left transition-all duration-300",
                          paymentMethod === method.id
                            ? "border-accent bg-accent/5 ring-2 ring-accent/10 shadow-lg"
                            : "border-black/5 grayscale hover:grayscale-0 hover:border-black/10 hover:bg-secondary/5"
                        )}
                      >
                        <method.icon
                          className={cn(
                            "size-6 transition-colors",
                            paymentMethod === method.id
                              ? "text-accent"
                              : "text-muted-foreground/30 group-hover:text-accent/60"
                          )}
                          aria-hidden="true"
                        />
                        <div className="space-y-2">
                          <p className="text-[10px] font-black tracking-widest uppercase">
                            {method.label}
                          </p>
                          <p className="text-muted-foreground text-[10px] leading-tight font-medium">
                            {method.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Step 4: Legal */}
                <section className="space-y-12 border-t border-black/5 pt-20" aria-labelledby="legal-heading">
                  <div className="flex items-center gap-6">
                    <span className="bg-foreground text-background flex size-12 items-center justify-center rounded-full text-xs font-black">
                      04
                    </span>
                    <h2 id="legal-heading" className="text-label text-foreground">Uvjeti i Potvrda</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="flex gap-5">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                        className="mt-1 size-6 border-black/10 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                        required
                      />
                      <Label
                        htmlFor="terms"
                        className="text-muted-foreground/80 cursor-pointer text-xs leading-relaxed font-medium"
                      >
                        Pročitao sam i u potpunosti prihvaćam{" "}
                        <Link
                          href="/opci-uvjeti"
                          className="text-foreground font-black underline underline-offset-4 transition-all hover:text-accent"
                        >
                          Opće uvjete poslovanja
                        </Link>
                        ,{" "}
                        <Link
                          href="/privatnost"
                          className="text-foreground font-black underline underline-offset-4 transition-all hover:text-accent"
                        >
                          Pravila o privatnosti
                        </Link>{" "}
                        te uvjete reklamacije i povrata robe.
                      </Label>
                    </div>

                    {isRegulatedInCart && (
                      <div className="bg-accent/5 border-accent/20 space-y-8 rounded-sm border p-8 shadow-sm">
                        <div className="flex items-start gap-5">
                          <AlertTriangle
                            className="text-accent mt-0.5 size-6 shrink-0"
                            aria-hidden="true"
                          />
                          <div className="space-y-2">
                            <p className="text-accent text-[10px] font-black tracking-widest uppercase">
                              Upozorenje o Reguliranoj Opremi
                            </p>
                            <p className="text-muted-foreground text-[11px] leading-relaxed font-medium">
                              Vaša košarica sadrži artikle koji podliježu Zakonu o oružju Republike Hrvatske. Finalizacija narudžbe i preuzimanje robe moguće je isključivo uz predočenje valjane zakonske dokumentacije u našoj poslovnici.
                            </p>
                          </div>
                        </div>
                        <div className="border-accent/10 flex items-start gap-5 border-t pt-8">
                          <Checkbox
                            id="legal-confirm"
                            checked={legalAccepted}
                            onCheckedChange={(checked) => setLegalAccepted(checked === true)}
                            className="mt-1 size-6 border-accent/20 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                            required
                          />
                          <Label
                            htmlFor="legal-confirm"
                            className="text-foreground cursor-pointer text-xs leading-relaxed font-black"
                          >
                            Potvrđujem da posjedujem potrebnu dokumentaciju i upoznat sam s procedurom preuzimanja reguliranih artikala.
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Sidebar Summary */}
              <aside className="lg:sticky lg:top-32 lg:col-span-5" aria-label="Pregled narudžbe">
                <div className="surface-glass border-black/5 shadow-elevated rounded-sm border p-10">
                  <h2 className="text-label mb-12 text-foreground">Sažetak Košarice</h2>

                  <div className="space-y-8">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-6 border-b border-black/5 pb-8 last:border-0 last:pb-0"
                      >
                        <div className="flex-1 space-y-2">
                          <p className="text-accent text-[9px] font-black tracking-widest uppercase">
                            {item.brand}
                          </p>
                          <p className="text-foreground line-clamp-2 text-xs font-black leading-snug tracking-tight">{item.name}</p>
                          <p className="text-muted-foreground/50 text-[10px] font-bold uppercase tracking-widest">
                            QTY: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-black tracking-tighter">
                          {((item.salePrice || item.price) * item.quantity).toLocaleString(
                            "hr-HR",
                            { style: "currency", currency: "EUR" }
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 space-y-6 border-t border-black/5 pt-12">
                    <div className="flex justify-between text-[11px] font-black tracking-widest uppercase">
                      <span className="text-muted-foreground/50">Međuzbroj</span>
                      <span className="text-foreground">
                        {total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] font-black tracking-widest uppercase">
                      <span className="text-muted-foreground/50">Logistika</span>
                      <span className="text-accent">
                        Po dogovoru
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between pt-8">
                      <span className="text-label text-foreground">Sveukupno</span>
                      <div className="flex flex-col items-end">
                        <span className="text-foreground text-5xl font-black tracking-tighter">
                          {total.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                        </span>
                        <p className="text-muted-foreground/30 text-[9px] font-black tracking-widest uppercase">
                          PDV Uključen
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    type="submit"
                    className="shadow-premium mt-12 h-16 w-full text-[11px] font-black tracking-[0.25em] uppercase transition-all hover:bg-accent hover:text-foreground active:scale-[0.98]"
                    disabled={!canSubmit}
                  >
                    Dovrši Narudžbu
                  </Button>

                  <div className="mt-10 flex flex-col items-center justify-center gap-8">
                    <div className="text-muted-foreground/30 flex items-center gap-3 text-[9px] font-black tracking-widest uppercase">
                      <Lock className="size-3.5" aria-hidden="true" />
                      Kriptirana Sigurnost
                    </div>
                    <div className="flex items-center gap-6 border-t border-black/5 pt-8">
                      <div className="flex items-center gap-3 opacity-40">
                        <ShieldCheck className="text-accent size-4" />
                        <span className="text-[9px] font-black tracking-widest uppercase">
                          Provjera
                        </span>
                      </div>
                      <div className="flex items-center gap-3 opacity-40">
                        <Truck className="text-accent size-4" />
                        <span className="text-[9px] font-black tracking-widest uppercase">
                          Dostava
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </form>
          )}
        </Container>
      </section>
    </main>
  )
}
