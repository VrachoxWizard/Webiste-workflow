import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ShieldAlert } from "lucide-react"

const AMMO_CATEGORIES = [
  { title: "Sačmeno", href: "/kategorija/streljivo?q=sacmeno" },
  { title: "Karabinsko", href: "/kategorija/streljivo?q=karabinsko" },
  { title: "Malokalibarsko", href: "/kategorija/streljivo?q=malokalibarsko" },
  { title: "Pištoljsko", href: "/kategorija/streljivo?q=pistoljsko" },
]

export function AmmunitionShowcase() {
  const ammoProducts = MOCK_PRODUCTS.filter((p) => p.category === "Streljivo").slice(0, 4)

  return (
    <Section>
      <Container>
        <div className="flex flex-col space-y-12">
          {/* Header */}
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary size-2 rounded-full" />
                  <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                    Stručni asortiman
                  </span>
                </div>
                <h2 className="text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
                  Provjeren izbor za <br className="hidden md:block" /> registrirane kupce
                </h2>
                <p className="text-muted-foreground max-w-xl leading-relaxed font-medium">
                  Širok izbor streljiva za lov i sportsko streljaštvo. Vodeći svjetski brendovi uz
                  garanciju svježine i ispravnog skladištenja.
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {AMMO_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.title}
                    href={cat.href}
                    className="border-border bg-background text-muted-foreground hover:border-primary hover:text-primary inline-flex h-9 items-center rounded-sm border px-4 text-[10px] font-bold tracking-widest uppercase transition-all"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal Notice Inline */}
            <div className="border-primary/20 bg-primary/5 flex max-w-md items-start gap-4 rounded-sm border p-6 shadow-sm">
              <ShieldAlert className="text-primary mt-0.5 size-6 shrink-0" />
              <div className="space-y-1.5">
                <p className="text-primary text-[10px] font-black tracking-widest uppercase">
                  Zakonska napomena
                </p>
                <p className="text-muted-foreground text-[11px] leading-relaxed font-medium">
                  Kupnja streljiva podliježe strogim zakonskim regulativama. Dostupnost i uvjete
                  prodaje potrebno je potvrditi prije finalizacije narudžbe. Prodaja isključivo uz
                  osobno preuzimanje i dokumentaciju.
                </p>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ammoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Footer CTA */}
          <div className="flex justify-center pt-8">
            <Button
              variant="outline"
              size="lg"
              className="group h-16 w-full px-12 sm:w-auto"
              asChild
            >
              <Link href="/kategorija/streljivo">
                Vidi cijelu ponudu streljiva{" "}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
