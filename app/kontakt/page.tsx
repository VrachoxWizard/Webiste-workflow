import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageSquare, Info } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      <div className="bg-secondary/10 border-b pt-24 pb-16 md:pt-32 md:pb-24">
        <Container>
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary/20">
                Kontakt
              </Badge>
              <h1 className="text-5xl leading-[1.1] font-bold tracking-tighter md:text-6xl">
                Tu smo za Vaša <br />
                <span className="text-primary font-medium italic">pitanja i savjete.</span>
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                Posjetite nas u našoj poslovnici u Zagrebu ili nam se obratite putem obrasca za
                stručne konzultacije.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Left: Info Cards */}
            <div className="space-y-8 lg:col-span-5">
              <div className="bg-foreground text-background shadow-premium space-y-8 rounded-sm p-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="text-primary size-6 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold tracking-widest uppercase opacity-60">
                        Adresa poslovnice
                      </p>
                      <p className="text-lg font-bold">
                        Ulica Lovačke Sreće 42, <br />
                        10000 Zagreb, Hrvatska
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="text-primary size-6 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold tracking-widest uppercase opacity-60">
                        Telefon
                      </p>
                      <p className="text-lg font-bold">+385 1 234 5678</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="text-primary size-6 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold tracking-widest uppercase opacity-60">
                        Email
                      </p>
                      <p className="text-lg font-bold">info@terralov.hr</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="text-primary size-6 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold tracking-widest uppercase opacity-60">
                        Radno vrijeme
                      </p>
                      <div className="space-y-0.5 text-base font-bold">
                        <p>Pon - Pet: 09:00 - 20:00</p>
                        <p>Subota: 09:00 - 15:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted group relative aspect-square overflow-hidden rounded-sm border shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200"
                  alt="Zagreb lokacija"
                  fill
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="bg-primary/20 absolute inset-0 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/95 shadow-premium mx-8 space-y-3 rounded-sm border p-6 text-center backdrop-blur-md">
                    <p className="text-primary text-[10px] font-bold tracking-widest uppercase">
                      Naša lokacija
                    </p>
                    <p className="text-base leading-tight font-bold">
                      Ulica Lovačke Sreće 42, <br />
                      10000 Zagreb
                    </p>
                    <Button
                      variant="link"
                      className="text-primary h-auto p-0 text-xs font-bold"
                      asChild
                    >
                      <Link
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Otvori u Google Mapama
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="space-y-12 lg:col-span-7">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">Pošaljite nam poruku</h2>
                  <p className="text-muted-foreground font-medium">
                    Naš tim stručnjaka odgovorit će na Vaš upit u najkraćem mogućem roku. Za hitne
                    upite o dostupnosti oružja preporučujemo telefonski poziv.
                  </p>
                </div>

                <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Ime i prezime</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Vaše ime"
                      className="h-12 rounded-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email adresa</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="email@primjer.hr"
                      className="h-12 rounded-sm"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="contact-subject">Predmet upita</Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      required
                      placeholder="Npr. Upit o dostupnosti artikla"
                      className="h-12 rounded-sm"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="contact-message">Vaša poruka</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      required
                      placeholder="Kako Vam možemo pomoći?"
                      className="min-h-[160px] rounded-sm"
                    />
                  </div>
                  <div className="pt-4 md:col-span-2">
                    <Button
                      size="lg"
                      className="group h-14 px-12 font-bold tracking-widest uppercase"
                    >
                      Pošalji upit{" "}
                      <MessageSquare className="ml-2 size-4 transition-transform group-hover:scale-110" />
                    </Button>
                  </div>
                </form>
              </div>

              <div className="bg-secondary/20 flex items-start gap-4 rounded-sm border p-6">
                <Info className="text-primary mt-0.5 size-6 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-bold">Stručne konzultacije</p>
                  <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                    Za kupnju oružja i specijalizirane optike preporučujemo dogovaranje termina za
                    osobnu prezentaciju u našoj trgovini kako bismo Vam osigurali maksimalnu
                    posvećenost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
