"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  {
    title: "Oružje",
    description: "Regulirani artikli uz provjeru propisane dokumentacije.",
    href: "/kategorija/oruzje",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=1000", // Rugged outdoor landscape (forest/mountain)
    size: "large",
  },
  {
    title: "Optike",
    description: "Optički uređaji, montaže i dodatna oprema.",
    href: "/kategorija/optike",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=900", // Distant horizon / vista
    size: "medium",
  },
  {
    title: "Streljivo",
    description: "Prodaja uz zakonsku provjeru kupca.",
    href: "/kategorija/streljivo",
    image: "https://images.unsplash.com/photo-1552257127-151dd9bcc678?auto=format&fit=crop&q=80&w=900",
    size: "medium",
  },
  {
    title: "Termalni uređaji",
    description: "Uređaji za promatranje i orijentaciju na terenu.",
    href: "/kategorija/termalni-uredaji",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=900", // Night sky / cool abstract nature
    size: "small",
  },
  {
    title: "Outdoor odjeća",
    description: "Slojevita oprema za boravak na otvorenom.",
    href: "/kategorija/odjeca-i-obuca",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1000", // Trekking / snowy environment
    size: "wide",
  },
]

export function CategoryMosaic() {
  return (
    <Section>
      <Container>
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Istražite ponudu</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Kategorije po namjeni</h2>
        </div>

        <div className="grid h-[1200px] grid-cols-1 gap-4 md:h-[700px] md:grid-cols-4 md:grid-rows-2">
          {CATEGORIES.map((cat) => (
            <article
              key={cat.title}
              className={cn(
                "relative overflow-hidden rounded-sm border bg-muted/20",
                cat.size === "large" && "md:col-span-2 md:row-span-2",
                cat.size === "medium" && "md:col-span-1 md:row-span-1",
                cat.size === "small" && "md:col-span-1 md:row-span-1",
                cat.size === "wide" && "md:col-span-2 md:row-span-1"
              )}
            >
              <Link href={cat.href} className="group relative block h-full">
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white">
                  <h3 className="mb-1 flex items-center justify-between text-xl font-bold">
                    {cat.title}
                    <ArrowUpRight className="size-5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </h3>
                  <p className="text-sm font-medium text-white/70 line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
