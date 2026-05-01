"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { FilterSidebar } from "@/components/shop/FilterSidebar"
import { MobileFilters } from "@/components/shop/MobileFilters"
import { AlertCircle, ChevronRight, LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { ProductFilters } from "@/types/filters"

const DEFAULT_FILTERS: ProductFilters = {
  query: "",
  minPrice: "",
  maxPrice: "",
  brands: [],
  statuses: [],
}

const CATEGORY_CONTENT: Record<string, {
  title: string
  description: string
  categories?: string[]
  regulatedNotice?: string
  saleOnly?: boolean
}> = {
  sve: {
    title: "Katalog",
    description: "Pregled odabranih artikala za lov, sport i boravak na otvorenom. Dostupnost se potvrđuje prije isporuke.",
  },
  akcija: {
    title: "Akcija",
    description: "Izdvojeni artikli s aktualnim popustom. Količine i dostupnost potvrđuju se prije obrade narudžbe.",
    saleOnly: true,
  },
  oruzje: {
    title: "Oružje",
    description: "Odabir reguliranih artikala za kupce koji ispunjavaju zakonske uvjete i mogu predočiti propisanu dokumentaciju.",
    categories: ["Karabini", "Sačmarice"],
    regulatedNotice: "Kupnja oružja moguća je isključivo uz provjeru važećih dozvola i osobnih podataka prije preuzimanja.",
  },
  "dugo-oruzje": {
    title: "Dugo oružje",
    description: "Selekcija lovačkih karabina i sačmarica s jasno istaknutom dostupnošću, cijenom i uvjetima kupnje.",
    categories: ["Karabini", "Sačmarice"],
    regulatedNotice: "Kupnja dugog vatrenog oružja moguća je isključivo uz predočenje važeće nabavne dozvole nadležne PU.",
  },
  karabini: {
    title: "Karabini",
    description: "Pregled karabina s osnovnim tehničkim podacima i statusom dostupnosti.",
    categories: ["Karabini"],
    regulatedNotice: "Za kupnju reguliranih artikala potrebna je važeća dokumentacija prije preuzimanja.",
  },
  sacmarice: {
    title: "Sačmarice",
    description: "Odabrani modeli sačmarica za registrirane kupce i provjerenu kupnju.",
    categories: ["Sačmarice"],
    regulatedNotice: "Za kupnju reguliranih artikala potrebna je važeća dokumentacija prije preuzimanja.",
  },
  streljivo: {
    title: "Streljivo",
    description: "Streljivo se prodaje samo kupcima koji ispunjavaju važeće zakonske uvjete.",
    categories: ["Streljivo"],
    regulatedNotice: "Kupnja streljiva podliježe zakonskim regulativama i provjeri dokumenata prije isporuke.",
  },
  optike: {
    title: "Optike",
    description: "Optički i termalni uređaji s naglaskom na kompatibilnost, servisnu podršku i provjerenu dostupnost.",
    categories: ["Optike", "Termalni uređaji"],
  },
  "termalni-uredaji": {
    title: "Termalni uređaji",
    description: "Uređaji za promatranje i terensku orijentaciju s jasnim informacijama o jamstvu i dostupnosti.",
    categories: ["Termalni uređaji"],
  },
  oprema: {
    title: "Oprema",
    description: "Dodatna outdoor i terenska oprema za odgovornu kupnju i dugotrajnu upotrebu.",
    categories: ["Optike", "Termalni uređaji"],
  },
}

const getCategoryContent = (slug: string) => CATEGORY_CONTENT[slug] ?? CATEGORY_CONTENT.sve

const getProductPrice = (product: Product) => product.salePrice ?? product.price

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const routeParams = useParams<{ slug: string }>()
  const slug = routeParams.slug ?? params.slug
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false)
  const [sort, setSort] = React.useState("newest")
  const [view, setView] = React.useState<"grid" | "list">("grid")
  const [filters, setFilters] = React.useState<ProductFilters>(DEFAULT_FILTERS)
  const category = getCategoryContent(slug)

  const availableProducts = React.useMemo(() => {
    const byCategory = category.categories
      ? MOCK_PRODUCTS.filter((product) => category.categories?.includes(product.category))
      : MOCK_PRODUCTS

    return category.saleOnly ? byCategory.filter((product) => product.status === "sale") : byCategory
  }, [category])

  const products = React.useMemo(() => {
    const filtered = availableProducts.filter((product) => {
      const price = getProductPrice(product)
      const query = filters.query.trim().toLowerCase()
      const minPrice = filters.minPrice ? Number(filters.minPrice) : 0
      const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Number.POSITIVE_INFINITY
      const matchesQuery = !query || [product.name, product.brand, product.sku, product.category].some((value) => value.toLowerCase().includes(query))
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(product.status)

      return matchesQuery && matchesBrand && matchesStatus && price >= minPrice && price <= maxPrice
    })

    return filtered.toSorted((a, b) => {
      if (sort === "price-asc") return getProductPrice(a) - getProductPrice(b)
      if (sort === "price-desc") return getProductPrice(b) - getProductPrice(a)
      if (sort === "name-asc") return a.name.localeCompare(b.name, "hr")
      return MOCK_PRODUCTS.indexOf(a) - MOCK_PRODUCTS.indexOf(b)
    })
  }, [availableProducts, filters, sort])

  const updateFilters = (nextFilters: Partial<ProductFilters>) => {
    setFilters((current) => ({ ...current, ...nextFilters }))
  }

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="border-b bg-secondary/10 pb-8 pt-16 md:pt-24">
        <Container>
          <div className="flex flex-col gap-6">
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground" aria-label="Putanja">
              <Link href="/" className="hover:text-primary">Naslovnica</Link>
              <ChevronRight className="size-3" aria-hidden="true" />
              <Link href="/kategorija/sve" className="hover:text-primary">Katalog</Link>
              <ChevronRight className="size-3" aria-hidden="true" />
              <span className="text-foreground">{category.title}</span>
            </nav>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{category.title}</h1>
                <p className="font-medium leading-relaxed text-muted-foreground">{category.description}</p>
              </div>

              {category.regulatedNotice && (
                <div className="flex max-w-md gap-4 rounded-sm bg-primary p-4 text-primary-foreground shadow-premium">
                  <AlertCircle className="size-6 shrink-0" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-widest">Zakonska napomena</p>
                    <p className="text-[11px] font-medium leading-normal opacity-85">{category.regulatedNotice}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      <div className="sticky top-[72px] z-30 border-b bg-background/95 py-4 backdrop-blur-md">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest lg:hidden"
              >
                <SlidersHorizontal className="size-4" aria-hidden="true" /> Filteri
              </button>
              <div className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground lg:flex">
                <span className="text-foreground">{products.length}</span> rezultata
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 rounded-sm border px-3 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sortiraj:</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="cursor-pointer bg-transparent text-[11px] font-bold focus:outline-none"
                >
                  <option value="newest">Najnovije</option>
                  <option value="price-asc">Cijena: manja prema većoj</option>
                  <option value="price-desc">Cijena: veća prema manjoj</option>
                  <option value="name-asc">Naziv: A-Z</option>
                </select>
              </label>
              <div className="hidden items-center overflow-hidden rounded-sm border sm:flex">
                <button
                  type="button"
                  aria-label="Prikaži mrežu proizvoda"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className="border-r bg-muted p-2 data-[active=false]:bg-background"
                  data-active={view === "grid"}
                >
                  <LayoutGrid className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Prikaži kompaktniji popis proizvoda"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className="p-2 hover:bg-muted data-[active=true]:bg-muted"
                  data-active={view === "list"}
                >
                  <List className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Section className="flex-1">
        <Container>
          <div className="flex gap-12">
            <FilterSidebar filters={filters} onChange={updateFilters} onReset={resetFilters} />

            <div className="flex-1 space-y-12">
              {products.length > 0 ? (
                <div className={view === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "grid grid-cols-1 gap-4 lg:grid-cols-2"}>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-sm border bg-secondary/10 p-10 text-center">
                  <h2 className="text-xl font-bold tracking-tight">Nema rezultata za odabrane filtere</h2>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">Promijenite kriterije ili kontaktirajte trgovinu za provjeru dostupnosti.</p>
                  <Button variant="outline" className="mt-6" onClick={resetFilters}>Očisti filtere</Button>
                </div>
              )}

              <div className="flex items-center justify-center border-t pt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Prikazano {products.length} od {availableProducts.length} artikala
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <MobileFilters
        isOpen={isMobileFiltersOpen}
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
        onClose={() => setIsMobileFiltersOpen(false)}
      />
    </main>
  )
}
