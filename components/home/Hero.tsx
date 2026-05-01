"use client"

import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticButton } from "@/components/ui/magnetic-button"

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section
      className="bg-foreground relative min-h-[85vh] overflow-hidden border-b lg:min-h-[90vh]"
      data-testid="hero-section"
    >
      {/* Background with cinematic treatment */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-main.png"
          alt="Vrhunska lovačka i outdoor oprema"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 scale-105"
        />
        {/* Editorial Gradients */}
        <div className="from-foreground via-foreground/60 to-transparent absolute inset-0 bg-gradient-to-r" />
        <div className="from-foreground/40 to-foreground absolute inset-0 bg-gradient-to-t via-transparent" />
      </div>

      <Container className="relative z-10 flex h-full flex-col">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid flex-1 grid-cols-1 items-center gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32"
        >
          {/* Main Content */}
          <div className="flex flex-col space-y-10 lg:col-span-7 xl:col-span-6">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-accent h-px w-8" />
                <span className="text-accent text-[11px] font-black tracking-[0.3em] uppercase">
                  Pouzdanost u svakom koraku
                </span>
              </div>
              
              <h1 className="text-primary-foreground text-editorial-headline">
                Oprema za <br />
                <span className="text-primary-foreground/40">beskompromisan</span> <br />
                teren.
              </h1>
              
              <p className="text-primary-foreground/60 max-w-lg text-lg leading-relaxed font-medium md:text-xl">
                Specijalizirana trgovina za lovce i outdoor entuzijaste. Selektirani asortiman 
                renomiranih brendova uz stručnu podršku i zakonsku sigurnost.
              </p>
            </motion.div>

            {/* CTA Group */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton>
                <Button
                  size="lg"
                  className="group shadow-premium h-14 px-10 text-xs font-black tracking-[0.2em] uppercase transition-all hover:-translate-y-1"
                  asChild
                >
                  <Link href="/kategorija/sve">
                    Istražite katalog
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-foreground h-14 bg-transparent px-10 text-xs font-black tracking-[0.2em] uppercase transition-all hover:-translate-y-1"
                  asChild
                >
                  <Link href="/kontakt">Savjet stručnjaka</Link>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Trust Markers */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-accent size-5" />
                <span className="text-primary-foreground/40 text-[10px] font-bold tracking-widest uppercase">
                  100% Sigurna kupnja
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="bg-accent size-1.5 rounded-full" />
                <span className="text-primary-foreground/40 text-[10px] font-bold tracking-widest uppercase">
                  Ovlašteni zastupnik
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Side — Discovery Feature */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end xl:col-span-6"
          >
            <div className="surface-glass group relative max-w-[340px] overflow-hidden p-8 transition-all hover:shadow-elevated">
              <div className="bg-accent mb-6 h-1 w-12 transition-all group-hover:w-20" />
              <span className="text-accent mb-2 block text-[10px] font-black tracking-[0.3em] uppercase">
                Istaknuto
              </span>
              <h3 className="text-primary-foreground mb-4 text-2xl font-bold leading-tight tracking-tight">
                Nova kolekcija terenske opreme za sezonu 2024.
              </h3>
              <p className="text-primary-foreground/50 mb-8 text-sm leading-relaxed font-medium">
                Otkrijte tehnološki najnaprednije modele obuće i odjeće dizajnirane za ekstremne uvjete.
              </p>
              <Link
                href="/kategorija/odjeca-i-obuca"
                className="text-primary-foreground group/link inline-flex items-center text-xs font-black tracking-widest uppercase"
              >
                Pregledaj kolekciju
                <ArrowRight className="ml-3 size-4 transition-transform group-hover/link:translate-x-2" />
              </Link>
              
              {/* Decorative background element */}
              <div className="bg-accent/5 absolute -right-12 -bottom-12 size-48 rounded-full blur-3xl transition-all group-hover:bg-accent/10" />
            </div>
          </motion.div>
        </motion.div>

        {/* Global Search Interface Integration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="border-primary-foreground/5 bg-foreground/40 mx-auto w-full max-w-4xl border-x border-t backdrop-blur-md lg:rounded-t-lg"
        >
          <div className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:px-10">
            <div className="flex flex-1 items-center gap-4">
              <Search className="text-accent size-5 shrink-0" aria-hidden="true" />
              <button
                type="button"
                className="text-primary-foreground/40 hover:text-primary-foreground/70 flex-1 text-left text-sm font-bold tracking-wide transition-colors"
                onClick={() => {
                  document.dispatchEvent(new CustomEvent("toggle-command-menu"))
                }}
              >
                Pretražite oružje, optike, streljivo...
              </button>
            </div>
            
            <div className="flex items-center gap-4 border-t border-white/5 pt-4 md:border-l md:border-t-0 md:pt-0 md:pl-8">
              <span className="text-primary-foreground/30 text-[10px] font-black tracking-widest uppercase">
                Brzi filteri:
              </span>
              <div className="flex gap-2">
                {["Optike", "Termovizija"].map((cat) => (
                  <Link
                    key={cat}
                    href={`/kategorija/sve?q=${encodeURIComponent(cat)}`}
                    className="text-primary-foreground/50 hover:text-accent hover:bg-white/5 rounded-sm px-2 py-1 text-[10px] font-bold transition-all"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            
            <kbd className="border-primary-foreground/10 bg-white/5 text-primary-foreground/20 hidden rounded-sm border px-2.5 py-1 text-[10px] font-bold md:block">
              ⌘K
            </kbd>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
