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
    <main className="flex flex-col min-h-screen bg-background">
      <div className="bg-secondary/10 pt-24 pb-16 md:pt-32 md:pb-24 border-b">
        <Container>
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary/20">Kontakt</Badge>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
                Tu smo za Vaša <br />
                <span className="text-primary italic font-medium">pitanja i savjete.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                Posjetite nas u našoj poslovnici u Zagrebu ili nam se obratite putem 
                obrasca za stručne konzultacije.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Info Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 bg-foreground text-background rounded-sm shadow-premium space-y-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="size-6 text-primary shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60">Adresa poslovnice</p>
                      <p className="text-lg font-bold">Ulica Lovačke Sreće 42, <br />10000 Zagreb, Hrvatska</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="size-6 text-primary shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60">Telefon</p>
                      <p className="text-lg font-bold">+385 1 234 5678</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="size-6 text-primary shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60">Email</p>
                      <p className="text-lg font-bold">info@pointershop.hr</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="size-6 text-primary shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60">Radno vrijeme</p>
                      <div className="text-base font-bold space-y-0.5">
                        <p>Pon - Pet: 09:00 - 20:00</p>
                        <p>Subota: 09:00 - 15:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aspect-square bg-muted rounded-sm border shadow-sm overflow-hidden relative group">
                <Image 
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200" 
                  alt="Zagreb lokacija" 
                  fill 
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/95 backdrop-blur-md p-6 border shadow-premium rounded-sm text-center space-y-3 mx-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Naša lokacija</p>
                    <p className="text-base font-bold leading-tight">Ulica Lovačke Sreće 42, <br />10000 Zagreb</p>
                    <Button variant="link" className="text-primary h-auto p-0 text-xs font-bold" asChild>
                      <Link href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Otvori u Google Mapama</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">Pošaljite nam poruku</h2>
                  <p className="text-muted-foreground font-medium">
                    Naš tim stručnjaka odgovoriti će na Vaš upit u najkraćem mogućem roku. 
                    Za hitne upite o dostupnosti oružja preporučamo telefonski poziv.
                  </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Ime i prezime</Label>
                    <Input id="contact-name" name="name" required placeholder="Vaše ime" className="h-12 rounded-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email adresa</Label>
                    <Input id="contact-email" name="email" type="email" required placeholder="email@primjer.hr" className="h-12 rounded-sm" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="contact-subject">Predmet upita</Label>
                    <Input id="contact-subject" name="subject" required placeholder="Npr. Upit o dostupnosti artikla" className="h-12 rounded-sm" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="contact-message">Vaša poruka</Label>
                    <Textarea id="contact-message" name="message" required placeholder="Kako Vam možemo pomoći?" className="min-h-[160px] rounded-sm" />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <Button size="lg" className="h-14 px-12 font-bold uppercase tracking-widest group">
                      Pošalji upit <MessageSquare className="ml-2 size-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </form>
              </div>

              <div className="p-6 bg-secondary/20 rounded-sm border flex gap-4 items-start">
                <Info className="size-6 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-bold">Stručne konzultacije</p>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Za kupnju oružja i specijalizirane optike preporučamo dogovaranje termina za osobnu prezentaciju u našoj trgovini kako bismo Vam osigurali maksimalnu posvećenost.
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
