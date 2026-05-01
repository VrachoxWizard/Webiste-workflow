"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

const CATEGORIES = [
  {
    title: "Oružje",
    description: "Regulirani artikli uz provjeru propisane dokumentacije.",
    href: "/kategorija/oruzje",
    image: "/images/categories/weapons.png",
    size: "large" as const,
    subcategories: [
      { title: "Karabini", href: "/kategorija/karabini" },
      { title: "Sačmarice", href: "/kategorija/sacmarice" },
      { title: "Dugo oružje", href: "/kategorija/dugo-oruzje" },
    ],
  },
  {
    title: "Optike",
    description: "Optički uređaji, montaže i dodatna oprema.",
    href: "/kategorija/optike",
    image: "/images/categories/optics.png",
    size: "wide" as const,
    subcategories: [
      { title: "Dnevne", href: "/kategorija/optike" },
      { title: "Crvene točke", href: "/kategorija/crvene-tocke" },
    ],
  },
  {
    title: "Streljivo",
    description: "Prodaja uz zakonsku provjeru kupca.",
    href: "/kategorija/streljivo",
    image: "/images/categories/ammunition.png",
    size: "medium" as const,
    subcategories: [
      { title: "Karabinsko", href: "/kategorija/karabinsko-streljivo" },
      { title: "Sačmeno", href: "/kategorija/sacmeno-streljivo" },
    ],
  },
  {
    title: "Termalni uređaji",
    description: "Uređaji za promatranje i orijentaciju na terenu.",
    href: "/kategorija/termalni-uredaji",
    image: "/images/categories/thermal.png",
    size: "small" as const,
    subcategories: [{ title: "Svi uređaji", href: "/kategorija/termalni-uredaji" }],
  },
  {
    title: "Outdoor odjeća",
    description: "Slojevita oprema za boravak na otvorenom.",
    href: "/kategorija/odjeca-i-obuca",
    image: "/images/categories/apparel.png",
    size: "wide" as const,
    subcategories: [
      { title: "Jakne", href: "/kategorija/jakne" },
      { title: "Čizme", href: "/kategorija/cizme" },
      { title: "Ruksaci", href: "/kategorija/ruksaci-i-torbe" },
    ],
  },
]

export function CategoryMosaic() {
  return (
    <Section data-testid="category-mosaic">
      <Container>
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary size-2 rounded-full" />
            <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
              Istražite ponudu
            </span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Kategorije po namjeni
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:auto-rows-[210px] md:grid-cols-6 lg:auto-rows-[230px]">
          {CATEGORIES.map((cat, idx) => (
            <motion.article
              key={cat.title}
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
              className={cn(
                "group bg-muted/20 relative min-h-[220px] overflow-hidden rounded-sm border",
                cat.size === "large" && "md:col-span-3 md:row-span-3",
                cat.size === "wide" && "md:col-span-3 md:row-span-1",
                cat.size === "medium" && "md:col-span-2 md:row-span-1",
                cat.size === "small" && "md:col-span-1 md:row-span-1"
              )}
            >
              <Link href={cat.href} className="relative block h-full">
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes={
                    cat.size === "large" || cat.size === "wide"
                      ? "(min-width: 768px) 50vw, 100vw"
                      : cat.size === "medium"
                        ? "(min-width: 768px) 33vw, 100vw"
                        : "(min-width: 768px) 16vw, 100vw"
                  }
                  className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white md:p-6">
                  <h3 className="mb-1 flex items-center justify-between text-lg font-bold md:text-xl">
                    {cat.title}
                    <ArrowUpRight
                      className="size-5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="line-clamp-2 text-xs font-medium text-white/60 md:text-sm">
                    {cat.description}
                  </p>
                  {/* Subcategory Quick Links */}
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {cat.subcategories.map((sub) => (
                      <span
                        key={sub.title}
                        className="text-[10px] font-bold tracking-widest text-white/40 uppercase transition-colors group-hover:text-white/70"
                      >
                        {sub.title}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
