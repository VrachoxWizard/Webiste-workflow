import { Container } from "@/components/ui/container"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap, Target } from "lucide-react"

export function FeaturedCategory() {
  const opticsProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === "Optike" || p.category === "Termalni uređaji"
  ).slice(0, 2)

  return (
    <section className="section-padding bg-secondary/5 relative overflow-hidden">
      {/* Decorative grain/background shift */}
      <div className="bg-background/40 absolute inset-0 -skew-y-3 translate-y-32" />
      
      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 xl:gap-24">
          {/* Left Side: Editorial Content */}
          <div className="lg:sticky lg:top-32 lg:col-span-5">
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <Target className="text-accent size-5" />
                  <span className="text-label">Tehnologija i preciznost</span>
                </div>
                
                <h2 className="text-editorial-headline">
                  Optička <br />
                  <span className="text-muted-foreground/40">izvrsnost.</span>
                </h2>
                
                <p className="text-muted-foreground max-w-md text-lg leading-relaxed font-medium">
                  Vrhunska dnevna i noćna optika za kristalno jasnu sliku u svim uvjetima. 
                  Istražite najnovije termalne uređaje Pulsar i Vortex serije.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <Button 
                  size="lg" 
                  className="group shadow-premium h-14 w-full justify-between px-8 sm:w-auto" 
                  asChild
                >
                  <Link href="/kategorija/optike">
                    Pregledaj cijeli asortiman
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <div className="flex items-start gap-5">
                  <div className="bg-accent/20 flex size-10 shrink-0 items-center justify-center rounded-full">
                    <Zap className="text-accent size-5" />
                  </div>
                  <div>
                    <p className="text-foreground text-xs font-bold tracking-widest uppercase">
                      Certificirana kvaliteta
                    </p>
                    <p className="text-muted-foreground mt-1 text-[11px] leading-relaxed font-medium uppercase tracking-wider">
                      Svi uređaji prolaze rigoroznu tvorničku provjeru prije isporuke kupcu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Product Showcase */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-7">
            {opticsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Visual Callout Card — "The Discovery Moment" */}
            <div className="surface-glass border-accent/20 group relative flex flex-col justify-between overflow-hidden p-8 transition-all hover:shadow-elevated sm:p-10">
              <div className="space-y-8">
                <div className="bg-accent h-1 w-12 transition-all group-hover:w-20" />
                <div className="space-y-4">
                  <h3 className="text-accent text-2xl font-bold tracking-tight italic">
                    Termalna vizija <br /> nove generacije
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                    Pulsar Krypton serija postavlja nove standarde u detekciji topline na
                    udaljenostima do 2300m. Dostupno isključivo uz stručnu prezentaciju.
                  </p>
                </div>
              </div>
              
              <Link
                href="/kategorija/termalni-uredaji"
                className="group/link text-primary mt-12 inline-flex items-center text-xs font-black tracking-widest uppercase transition-colors"
              >
                Tehničke specifikacije
                <ArrowRight className="ml-3 size-4 transition-transform group-hover/link:translate-x-2" />
              </Link>
              
              {/* Subtle background graphic */}
              <div className="text-accent/5 absolute -right-4 -bottom-4 font-black text-9xl tracking-tighter italic">
                P
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
