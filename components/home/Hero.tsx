"use client"

import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-16 lg:pt-20 lg:pb-32 border-b">
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Area */}
          <div className="flex flex-col space-y-10 lg:col-span-7 xl:col-span-6">
            <div className="space-y-6">
              <Badge variant="secondary" className="px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase bg-primary/5 text-primary border-primary/20">
                Lovačka i outdoor oprema
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-balance">
                Oprema za teren.<br />
                <span className="text-muted-foreground font-medium">Odgovorno i provjereno.</span>
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Specijalizirana trgovina za lovce, sportaše i outdoor entuzijaste.
                Pronađite selektirani asortiman uz stručnu podršku i sigurnu kupnju.
              </p>
            </div>

            {/* Ecommerce Search Bar */}
            <div className="max-w-md space-y-4">
              <form 
                action="/kategorija/sve"
                role="search"
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
                  <Input 
                    type="search" 
                    name="q"
                    aria-label="Pretraži katalog"
                    placeholder="Pretražite oružje, optike, streljivo..." 
                    className="pl-9 h-12 bg-background border-border text-base rounded-sm shadow-sm"
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-6 rounded-sm text-sm tracking-widest uppercase font-bold">
                  Traži
                </Button>
              </form>
              
              {/* Category Quick Links */}
              <div className="flex flex-wrap items-center gap-x-1 gap-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-1">
                  Brzi linkovi:
                </span>
                {["Karabini", "Termalni uređaji", "Streljivo", "Čizme"].map((cat) => (
                  <Link 
                    key={cat} 
                    href={`/kategorija/sve?q=${encodeURIComponent(cat)}`} 
                    className="inline-flex items-center px-2 py-2 font-medium text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-transparent hover:decoration-primary/30 min-h-[44px]"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary shrink-0" aria-hidden="true" />
                <div className="space-y-0.5">
                  <p className="text-sm font-bold leading-tight text-foreground">Stručna podrška</p>
                  <p className="text-xs text-muted-foreground">Provjera prije kupnje.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0" aria-hidden="true" />
                <div className="space-y-0.5">
                  <p className="text-sm font-bold leading-tight text-foreground">Sigurna kupnja</p>
                  <p className="text-xs text-muted-foreground">U skladu sa zakonima.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Composition */}
          <div className="relative lg:col-span-5 xl:col-span-6 lg:h-[650px] w-full flex items-center justify-end">
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-full lg:w-[110%] xl:w-[120%] bg-muted/20 overflow-hidden rounded-sm lg:rounded-l-sm lg:rounded-r-none lg:-mr-8 border lg:border-r-0 shadow-premium">
              <Image
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=85&w=1200"
                alt="Detalj vrhunske outdoor opreme"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle Overlay Action (Commerce Focus) */}
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto">
                <div className="bg-background/95 backdrop-blur-md border p-4 shadow-lg rounded-sm max-w-[280px]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Istražite</p>
                  <p className="text-sm font-bold leading-tight text-foreground mb-3">Nova kolekcija terenske odjeće i obuće.</p>
                  <Link href="/kategorija/odjeca-i-obuca" className="inline-flex items-center text-xs font-bold text-primary group">
                    Saznaj više <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
