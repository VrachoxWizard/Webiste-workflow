import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Info } from "lucide-react"

export function AmmunitionShowcase() {
  const ammoProducts = MOCK_PRODUCTS.filter(p => p.category === "Streljivo").slice(0, 4)

  return (
    <Section>
      <Container>
        <div className="flex flex-col space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-2 bg-primary rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Novo streljivo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Provjeren izbor za registrirane kupce</h2>
              <p className="max-w-xl text-muted-foreground font-medium">
                Širok izbor streljiva za lov i sportsko streljaštvo. 
                Geco, RWS i ostali vodeći brendovi na jednom mjestu.
              </p>
            </div>
            
            {/* Legal Notice Inline */}
            <div className="flex items-start gap-4 p-4 bg-muted/50 border rounded-sm max-w-md">
              <Info className="size-5 text-primary shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium leading-relaxed text-muted-foreground">
                Kupnja streljiva podliježe zakonskim regulativama. Dostupnost i uvjete prodaje 
                potrebno je potvrditi prije finalizacije narudžbe.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ammoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Footer CTA */}
          <div className="flex justify-center pt-8">
            <Button variant="outline" size="lg" className="h-14 px-12 group" asChild>
              <Link href="/kategorija/streljivo">
                Vidi cijelu ponudu streljiva <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
