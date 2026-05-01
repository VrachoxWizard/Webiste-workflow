import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Hero } from "@/components/home/Hero"
import { TrustStrip } from "@/components/home/TrustStrip"
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
  const newArrivals = MOCK_PRODUCTS.filter(
    (p) => p.status === "new" || p.status === "in_stock"
  ).slice(0, 4)

  return (
    <main className="flex-1">
      <Hero />
      <TrustStrip />

      <CategoryMosaic />

      <Section id="new-arrivals" className="bg-secondary/10 border-y">
        <Container>
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary size-2 rounded-full" />
                <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                  Novo u ponudi
                </span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Najnovije iz našeg kataloga
              </h2>
              <p className="text-muted-foreground max-w-xl font-medium">
                Istražite najnovije pristigle modele renomiranih svjetskih proizvođača lovačke i
                outdoor opreme. Selektirano prema kvaliteti i pouzdanosti.
              </p>
            </div>
            <Link
              href="/kategorija/sve"
              className="group text-primary hover:text-primary/80 flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors"
            >
              Vidi sve proizvode{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={idx === 0 ? "featured" : "default"}
                className={idx === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
              />
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
