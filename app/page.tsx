import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Hero } from "@/components/home/Hero"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { CategoryMosaic } from "@/components/home/CategoryMosaic"
import { BrandStrip } from "@/components/home/BrandStrip"
import { TrustBenefits } from "@/components/home/TrustBenefits"
import { FeaturedCategory } from "@/components/home/FeaturedCategory"
import { AmmunitionShowcase } from "@/components/home/AmmunitionShowcase"
import { ExpertHelpCTA } from "@/components/home/ExpertHelpCTA"

export default function Home() {
  const newArrivals = MOCK_PRODUCTS.filter(p => p.status === "new" || p.status === "in_stock").slice(0, 4)

  return (
    <main className="flex-1">
      <Hero />
      
      <CategoryMosaic />
      
      <Section id="new-arrivals" className="bg-secondary/10 border-y">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-2 bg-primary rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Novo u ponudi</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Najnovije iz našeg kataloga
              </h2>
              <p className="max-w-xl text-muted-foreground font-medium">
                Istražite najnovije pristigle modele renomiranih svjetskih proizvođača 
                lovačke i outdoor opreme.
              </p>
            </div>
            <Link 
              href="/kategorija/sve" 
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
            >
              Vidi sve proizvode <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>

      <FeaturedCategory />
      
      <AmmunitionShowcase />
      
      <BrandStrip />
      
      <TrustBenefits />
      
      <ExpertHelpCTA />
    </main>
  )
}
