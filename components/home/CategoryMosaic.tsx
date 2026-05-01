"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

const CATEGORIES = [
  {
    title: "Vatreno oružje",
    description: "Provjerena selekcija lovačkih karabina i sačmarica uz zakonsku usklađenost.",
    href: "/kategorija/oruzje",
    image: "/images/categories/weapons.png",
    size: "large" as const,
    subcategories: ["Karabini", "Sačmarice", "Dugo oružje"],
  },
  {
    title: "Optički sustavi",
    description: "Vrhunska dnevna i noćna optika renomiranih svjetskih proizvođača.",
    href: "/kategorija/optike",
    image: "/images/categories/optics.png",
    size: "wide" as const,
    subcategories: ["Dnevne optike", "Crvene točke"],
  },
  {
    title: "Streljivo",
    description: "Osigurana kvaliteta i pravilno skladištenje za maksimalnu pouzdanost.",
    href: "/kategorija/streljivo",
    image: "/images/categories/ammunition.png",
    size: "medium" as const,
    subcategories: ["Karabinsko", "Sačmeno"],
  },
  {
    title: "Termovizija",
    description: "Tehnologija detekcije topline za najzahtjevnije uvjete vidljivosti.",
    href: "/kategorija/termalni-uredaji",
    image: "/images/categories/thermal.png",
    size: "small" as const,
    subcategories: ["Pulsar", "Infiray"],
  },
  {
    title: "Outdoor oprema",
    description: "Specijalizirana odjeća i obuća za boravak u ekstremnim uvjetima.",
    href: "/kategorija/odjeca-i-obuca",
    image: "/images/categories/apparel.png",
    size: "wide" as const,
    subcategories: ["Jakne", "Čizme", "Ruksaci"],
  },
]

export function CategoryMosaic() {
  return (
    <section className="section-padding bg-background" data-testid="category-mosaic">
      <Container>
        <div className="mb-16 flex flex-col gap-6 md:mb-24">
          <div className="flex items-center gap-3">
            <div className="bg-accent h-px w-8" />
            <span className="text-label">Istražite katalog</span>
          </div>
          <h2 className="text-editorial-headline max-w-3xl">
            Odabrani asortiman <br />
            <span className="text-muted-foreground/40">po namjeni</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-6 lg:auto-rows-[240px] lg:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.article
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group bg-muted/10 relative min-h-[260px] overflow-hidden rounded-sm border transition-all hover:shadow-premium-hover",
                cat.size === "large" && "md:col-span-3 md:row-span-3",
                cat.size === "wide" && "md:col-span-3 md:row-span-1",
                cat.size === "medium" && "md:col-span-2 md:row-span-1",
                cat.size === "small" && "md:col-span-1 md:row-span-1"
              )}
            >
              <Link href={cat.href} className="relative block h-full">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={cat.image}
                    alt=""
                    fill
                    sizes={
                      cat.size === "large" || cat.size === "wide"
                        ? "(min-width: 1024px) 50vw, 100vw"
                        : "(min-width: 1024px) 33vw, 100vw"
                    }
                    className="object-cover opacity-90 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="from-foreground/90 via-foreground/30 to-transparent absolute inset-0 bg-gradient-to-t opacity-60 transition-opacity group-hover:opacity-80" />
                </div>
                
                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-primary-foreground text-xl font-bold tracking-tight md:text-2xl">
                        {cat.title}
                      </h3>
                      <div className="border-primary-foreground/20 bg-white/10 flex size-10 items-center justify-center rounded-full backdrop-blur-sm transition-all group-hover:bg-accent group-hover:text-foreground">
                        <ArrowUpRight className="size-5" />
                      </div>
                    </div>
                    
                    <p className="text-primary-foreground/60 line-clamp-2 max-w-[280px] text-xs leading-relaxed font-medium transition-colors group-hover:text-primary-foreground/80 md:text-sm">
                      {cat.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2">
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="text-primary-foreground/30 text-[9px] font-black tracking-[0.2em] uppercase transition-colors group-hover:text-accent"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
