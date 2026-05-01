import { Container } from "@/components/ui/container"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ShieldAlert, BadgeCheck } from "lucide-react"

const AMMO_CATEGORIES = [
  { title: "Sačmeno", href: "/kategorija/streljivo?q=sacmeno" },
  { title: "Karabinsko", href: "/kategorija/streljivo?q=karabinsko" },
  { title: "Malokalibarsko", href: "/kategorija/streljivo?q=malokalibarsko" },
  { title: "Pištoljsko", href: "/kategorija/streljivo?q=pistoljsko" },
]

export function AmmunitionShowcase() {
  const ammoProducts = MOCK_PRODUCTS.filter((p) => p.category === "Streljivo").slice(0, 4)

  return (
    <section className="section-padding bg-background">
      <Container>
        <div className="flex flex-col space-y-16">
          {/* Header Area */}
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="text-accent size-5" />
                  <span className="text-label">Stručni asortiman</span>
                </div>
                
                <h2 className="text-editorial-headline">
                  Provjeren izbor za <br />
                  <span className="text-muted-foreground/40">registrirane kupce.</span>
                </h2>
                
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  Širok izbor streljiva za lov i sportsko streljaštvo. Vodeći svjetski brendovi uz
                  garanciju svježine i ispravnog skladištenja u kontroliranim uvjetima.
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-3">
                {AMMO_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.title}
                    href={cat.href}
                    className="tactile-border hover:border-accent hover:text-accent flex h-10 items-center bg-white px-5 text-[10px] font-black tracking-widest uppercase transition-all"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal Notice — "The Trust Anchor" */}
            <div className="border-accent/10 bg-accent/5 flex max-w-sm flex-col gap-6 p-8">
              <div className="flex items-center gap-4">
                <div className="bg-accent/20 flex size-12 items-center justify-center rounded-full">
                  <ShieldAlert className="text-accent size-6" />
                </div>
                <span className="text-foreground text-xs font-black tracking-widest uppercase">
                  Zakonska sigurnost
                </span>
              </div>
              
              <p className="text-muted-foreground text-[11px] leading-relaxed font-medium uppercase tracking-wider">
                Kupnja streljiva podliježe strogim zakonskim regulativama. Dostupnost i uvjete
                prodaje potvrđujemo prije finalizacije narudžbe. Prodaja isključivo uz
                osobno preuzimanje i propisanu dokumentaciju.
              </p>
            </div>
          </div>

          {/* Product Grid */}
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
              className="group border-foreground/10 h-16 w-full px-12 transition-all hover:bg-foreground hover:text-background sm:w-auto"
              asChild
            >
              <Link href="/kategorija/streljivo">
                Vidi cijelu ponudu streljiva
                <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
