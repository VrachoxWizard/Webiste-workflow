import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"

export function FeaturedCategory() {
  const opticsProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === "Optike" || p.category === "Termalni uređaji"
  ).slice(0, 2)

  return (
    <Section className="bg-secondary/10">
      <Container>
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-3 xl:gap-24">
          <div className="space-y-10 lg:sticky lg:top-32 lg:col-span-1">
            <div className="space-y-6">
              <div className="border-accent w-12 border-t-2 pt-4" />
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    Tehnologija i preciznost
                  </span>
                </div>
                <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Optike i termalni <br />
                  uređaji
                </h2>
                <p className="font-medium leading-relaxed text-muted-foreground">
                  Vrhunska dnevna i noćna optika za kristalno jasnu sliku u svim uvjetima. Istražite
                  najnovije termalne uređaje Pulsar i Vortex serije.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <Button size="lg" className="group h-14 justify-between px-8" asChild>
                <Link href="/kategorija/optike">
                  Pregledaj svu optiku{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <div className="flex items-start gap-4 border-l-2 border-primary pl-4">
                <Zap className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Svi uređaji dolaze sa certifikatom o tvorničkoj provjeri i jamstvom.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">
            {opticsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Visual Callout Card */}
            <div className="relative flex flex-col justify-center space-y-6 rounded-sm border border-accent/20 bg-background p-8 shadow-premium-hover transition-all hover:border-accent/40 sm:p-10">
              <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden">
                <div className="absolute top-0 right-0 h-0.5 w-12 translate-x-4 translate-y-2 rotate-45 bg-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold italic tracking-tight text-accent">
                  Termalna vizija Gen-2
                </h3>
                <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                  Pulsar Krypton serija postavlja nove standarde u detekciji topline na udaljenostima
                  do 2300m. Dostupno isključivo uz stručnu prezentaciju.
                </p>
              </div>
              <Link
                href="/kategorija/termalni-uredaji"
                className="group inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary/80"
              >
                Saznaj više o tehnologiji{" "}
                <ArrowRight className="ml-2 size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
