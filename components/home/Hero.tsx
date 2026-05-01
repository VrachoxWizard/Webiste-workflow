"use client"

import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b bg-foreground"
      data-testid="hero-section"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.png"
          alt="Vrhunska outdoor oprema — lovačka i terenska oprema"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
      </div>

      <Container className="relative">
        <div className="grid min-h-[520px] grid-cols-1 items-center gap-12 py-16 lg:min-h-[620px] lg:grid-cols-12 lg:gap-16 lg:py-24">
          {/* Content Area */}
          <div className="flex flex-col space-y-8 lg:col-span-7 xl:col-span-6">
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Badge
                variant="secondary"
                className="border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground backdrop-blur-sm"
              >
                Lovačka i outdoor oprema
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-primary-foreground text-balance md:text-5xl lg:text-6xl xl:text-7xl">
                Oprema za teren.
                <br />
                <span className="font-medium text-primary-foreground/60">
                  Odgovorno i provjereno.
                </span>
              </h1>
              <p className="max-w-xl text-base font-medium leading-relaxed text-primary-foreground/70 md:text-lg">
                Specijalizirana trgovina za lovce, sportaše i outdoor entuzijaste. Pronađite
                selektirani asortiman uz stručnu podršku i sigurnu kupnju.
              </p>
            </motion.div>

            {/* CTA Group */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <Button
                size="lg"
                className="group h-14 px-8 text-sm font-bold uppercase tracking-widest shadow-lg"
                asChild
              >
                <Link href="/kategorija/sve">
                  Istražite katalog
                  <ArrowRight
                    className="ml-2 size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group h-14 border-primary-foreground/30 bg-transparent px-8 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:border-primary-foreground hover:bg-primary-foreground hover:text-foreground"
                asChild
              >
                <Link href="/kontakt">Kontaktirajte nas</Link>
              </Button>
            </motion.div>

            {/* Category Quick Links */}
            <motion.div
              className="flex flex-wrap items-center gap-x-1 gap-y-1 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/40">
                Brzi linkovi:
              </span>
              {["Karabini", "Termalni uređaji", "Streljivo", "Čizme"].map((cat) => (
                <Link
                  key={cat}
                  href={`/kategorija/sve?q=${encodeURIComponent(cat)}`}
                  className="min-h-[44px] inline-flex items-center rounded-sm border border-primary-foreground/10 px-3 py-2 text-xs font-semibold text-primary-foreground/60 transition-all hover:border-primary-foreground/30 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                >
                  {cat}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right Side — Floating Discovery Card */}
          <motion.div
            className="hidden lg:col-span-5 lg:flex lg:items-end lg:justify-end xl:col-span-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            <div className="max-w-[320px] rounded-sm border border-primary-foreground/10 bg-background/95 p-6 shadow-2xl backdrop-blur-md">
              <div className="mb-1 h-0.5 w-12 bg-accent" />
              <p className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Istražite
              </p>
              <p className="mb-4 text-sm font-bold leading-tight text-foreground">
                Nova kolekcija terenske odjeće i obuće za sezonu.
              </p>
              <Link
                href="/kategorija/odjeca-i-obuca"
                className="group inline-flex items-center text-xs font-bold text-primary"
              >
                Saznaj više
                <ArrowRight
                  className="ml-1 size-3 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Search Bar — Floating at bottom */}
      <div className="relative border-t border-primary-foreground/10 bg-foreground/80 backdrop-blur-md">
        <Container>
          <div className="flex items-center gap-4 py-4">
            <Search
              className="size-4 shrink-0 text-primary-foreground/40"
              aria-hidden="true"
            />
            <button
              type="button"
              className="flex-1 text-left text-sm font-medium text-primary-foreground/40 transition-colors hover:text-primary-foreground/60"
              onClick={() => {
                document.dispatchEvent(new CustomEvent("toggle-command-menu"))
              }}
            >
              Pretražite oružje, optike, streljivo...
            </button>
            <kbd className="hidden rounded-sm border border-primary-foreground/20 px-2 py-0.5 text-[10px] font-bold text-primary-foreground/30 sm:inline-block">
              ⌘K
            </kbd>
          </div>
        </Container>
      </div>
    </section>
  )
}
