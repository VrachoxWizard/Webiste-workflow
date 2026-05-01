"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-24 lg:pt-20 lg:pb-40">
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content Area */}
          <div 
            className="flex flex-col space-y-10"
          >
            <div className="space-y-6">
              <Badge variant="secondary" className="px-4 py-1 text-[11px] font-bold tracking-[0.2em] uppercase bg-primary/5 text-primary border-primary/20">
                Specijalizirana trgovina
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-balance">
                Oprema za <br />
                <span className="text-primary italic font-medium">najzahtjevnije</span> uvjete.
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Pronađite selektirani asortiman oružja, streljiva i vrhunske outdoor opreme. 
                Sigurna kupnja, stručna podrška i provjerena kvaliteta za lovce i sportaše.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 text-base font-bold tracking-tight rounded-sm" asChild>
                <Link href="/kategorija/sve">
                  Istraži ponudu <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base font-bold tracking-tight rounded-sm" asChild>
                <Link href="/kontakt">
                  Kontaktiraj trgovinu
                </Link>
              </Button>
            </div>

            {/* Category Quick Links */}
            <div className="space-y-4 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Popularne kategorije
              </p>
              <div className="flex flex-wrap gap-2">
                {["Lovački karabini", "Optički ciljnici", "Sačmeno streljivo", "Outdoor odjeća"].map((cat) => (
                  <Link 
                    key={cat} 
                    href={`/kategorija/sve?q=${encodeURIComponent(cat)}`} 
                    className="text-xs font-semibold px-3 py-2 bg-muted hover:bg-primary/10 hover:text-primary border transition-all rounded-sm"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-muted">
              <div className="flex items-start gap-3">
                <ShieldCheck className="size-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-bold leading-tight">Provjerena kvaliteta</p>
                  <p className="text-xs text-muted-foreground mt-1">Svi proizvodi prolaze stručnu provjeru.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-bold leading-tight">Dostupnost potvrđena</p>
                  <p className="text-xs text-muted-foreground mt-1">Status zaliha potvrđujemo prije isporuke.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Composition */}
          <div 
            className="relative lg:h-[700px] flex items-center justify-center"
          >
            <div className="relative w-full aspect-[4/5] max-w-[500px] bg-muted/30 border-2 border-muted overflow-hidden rounded-sm shadow-premium group">
              <Image
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=85&w=1100"
                alt="Terenska oprema pripremljena za boravak u prirodi"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              
              {/* Floating Product Tag (Realistic UI) */}
              <div className="absolute bottom-8 right-8 bg-background border p-4 shadow-premium rounded-sm animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-muted rounded-sm" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Provjera dostupnosti</p>
                    <p className="text-xs font-bold">Optika i terenska oprema</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional floating accent */}
            <div className="absolute -top-12 right-0 hidden lg:block">
              <div className="bg-foreground text-background p-6 space-y-2 rounded-sm shadow-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Novo u ponudi</p>
                <p className="text-lg font-bold leading-tight">Vrhunska selekcija <br />za sezonu 2026.</p>
                <Link href="/kategorija/sve" className="text-xs font-bold border-b border-accent text-accent inline-block mt-2 hover:border-transparent transition-all">
                  Pregledaj katalog
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
