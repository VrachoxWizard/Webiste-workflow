import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FeaturedCategory() {
  const opticsProducts = MOCK_PRODUCTS.filter(p => p.category === "Optike" || p.category === "Termalni uređaji").slice(0, 2)

  return (
    <Section className="bg-secondary/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-32">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-2 bg-primary rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Tehnologija i preciznost</span>
              </div>
              <h2 className="text-4xl font-semibold tracking-tight">
                Optike i termalni <br />uređaji
              </h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Vrhunska dnevna i noćna optika za kristalno jasnu sliku u svim uvjetima. 
                Istražite najnovije termalne uređaje Pulsar i Vortex serije.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <Button size="lg" className="justify-between group" asChild>
                <Link href="/kategorija/optike">
                  Pregledaj svu optiku <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pl-4 border-l-2 border-primary">
                Svi uređaji dolaze sa certifikatom o provjeri.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {opticsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {/* Visual Callout Card */}
            <div className="hidden sm:flex flex-col justify-center p-8 bg-foreground text-background rounded-sm space-y-4 shadow-premium">
              <h3 className="text-xl font-bold tracking-tight italic text-accent">Termalna vizija Gen-2</h3>
              <p className="text-sm text-background/60 font-medium">
                Pulsar Krypton serija postavlja nove standarde u detekciji topline na udaljenostima do 2300m.
              </p>
              <Link href="/kategorija/termalni-uredaji" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">
                Saznaj više o tehnologiji
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
