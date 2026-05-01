"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { FilterSidebar } from "@/components/shop/FilterSidebar"
import { MobileFilters } from "@/components/shop/MobileFilters"
import {
  AlertCircle,
  ChevronRight,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  SearchX,
} from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import { ProductFilters } from "@/types/filters"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 12

const DEFAULT_FILTERS: ProductFilters = {
  query: "",
  minPrice: "",
  maxPrice: "",
  brands: [],
  statuses: [],
  regulatedOnly: false,
}

const CATEGORY_CONTENT: Record<
  string,
  {
    title: string
    description: string
    categories?: string[]
    regulatedNotice?: string
    saleOnly?: boolean
  }
> = {
  sve: {
    title: "Katalog Proizvoda",
    description:
      "Pregled odabranih artikala za lov, sport i boravak na otvorenom. Svaki artikl u našoj ponudi selektiran je prema kriterijima trajnosti i pouzdanosti na terenu.",
  },
  akcija: {
    title: "Posebna Ponuda",
    description:
      "Izdvojeni artikli s aktualnim popustom. Iskoristite priliku za nabavu vrhunske opreme po povoljnijim uvjetima. Količine su ograničene.",
    saleOnly: true,
  },
  oruzje: {
    title: "Vatreno Oružje",
    description:
      "Odabir reguliranih artikala za kupce koji ispunjavaju zakonske uvjete i mogu predočiti propisanu dokumentaciju. Sigurnost i stručnost na prvom mjestu.",
    categories: ["Karabini", "Sačmarice"],
    regulatedNotice:
      "Kupnja oružja moguća je isključivo uz provjeru važećih dozvola i osobnih podataka prije preuzimanja u poslovnici.",
  },
  "dugo-oruzje": {
    title: "Dugo Oružje",
    description:
      "Selekcija lovačkih karabina i sačmarica renomiranih proizvođača. Provjerena ergonomija i vrhunska preciznost.",
    categories: ["Karabini", "Sačmarice"],
    regulatedNotice:
      "Kupnja dugog vatrenog oružja moguća je isključivo uz predočenje važeće nabavne dozvole nadležne PU.",
  },
  karabini: {
    title: "Lovački Karabini",
    description:
      "Pregled karabina s osnovnim tehničkim podacima i statusom dostupnosti. Odaberite pouzdanost za svaki lov.",
    categories: ["Karabini"],
    regulatedNotice:
      "Za kupnju reguliranih artikala potrebna je važeća dokumentacija prije preuzimanja.",
  },
  sacmarice: {
    title: "Sačmarice",
    description:
      "Odabrani modeli sačmarica za registrirane kupce. Klasična izrada i moderna rješenja za lov i sport.",
    categories: ["Sačmarice"],
    regulatedNotice:
      "Za kupnju reguliranih artikala potrebna je važeća dokumentacija prije preuzimanja.",
  },
  streljivo: {
    title: "Streljivo",
    description:
      "Kvalitetno streljivo za lov i sportsko streljaštvo. Prodaja se vrši isključivo prema važećim zakonskim propisima.",
    categories: ["Streljivo"],
    regulatedNotice:
      "Kupnja streljiva podliježe zakonskim regulativama i provjeri dokumenata prije isporuke.",
  },
  optike: {
    title: "Optički Sustavi",
    description:
      "Specijalizirani optički uređaji koji osiguravaju kristalno jasnu sliku i preciznost u svim svjetlosnim uvjetima.",
    categories: ["Optike", "Termalni uređaji"],
  },
  "termalni-uredaji": {
    title: "Termalni Uređaji",
    description:
      "Napredna tehnologija za promatranje i terensku orijentaciju. Otkrijte ono što je oko nevidljivo.",
    categories: ["Termalni uređaji"],
  },
  "odjeca-i-obuca": {
    title: "Terenska Oprema",
    description:
      "Vrhunska oprema prilagođena zahtjevnim vanjskim uvjetima. Kvalitetni materijali za maksimalnu udobnost i zaštitu.",
    categories: ["Jakne", "Čizme"],
  },
  oprema: {
    title: "Dodatna Oprema",
    description:
      "Sve što vam je potrebno za uspješan boravak na otvorenom — od svjetiljki do ruksaka i torbi.",
    categories: ["Svjetiljke", "Ruksaci i torbe"],
  },
}

const getCategoryContent = (slug: string) =>
  CATEGORY_CONTENT[slug] ?? {
    title: "Katalog",
    description:
      "Pregledajte našu cjelokupnu ponudu vrhunske opreme. Ukoliko trebate pomoć pri odabiru, slobodno nas kontaktirajte.",
    categories: [],
  }

const getProductPrice = (product: Product) => product.salePrice ?? product.price

const getStatusLabel = (status: Product["status"]) => {
  if (status === "sale") return "Akcija"
  if (status === "new") return "Novo"
  if (status === "on_order") return "Po narudžbi"
  return "Na zalihi"
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const routeParams = useParams<{ slug: string }>()
  const searchParams = useSearchParams()
  const slug = routeParams.slug ?? params.slug
  const queryParam = searchParams.get("q") ?? ""

  return <CategoryBrowser key={`${slug}:${queryParam}`} slug={slug} queryParam={queryParam} />
}

function CategoryBrowser({ slug, queryParam }: { slug: string; queryParam: string }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false)
  const [sort, setSort] = React.useState("newest")
  const [view, setView] = React.useState<"grid" | "list">("grid")
  const [filters, setFilters] = React.useState<ProductFilters>(() => ({
    ...DEFAULT_FILTERS,
    query: queryParam,
  }))
  const [page, setPage] = React.useState(1)
  const category = getCategoryContent(slug)

  const availableProducts = React.useMemo(() => {
    const byCategory = category.categories
      ? MOCK_PRODUCTS.filter((product) => category.categories?.includes(product.category))
      : MOCK_PRODUCTS

    return category.saleOnly
      ? byCategory.filter((product) => product.status === "sale")
      : byCategory
  }, [category])

  const brandOptions = React.useMemo(() => {
    return Array.from(new Set(availableProducts.map((product) => product.brand))).toSorted((a, b) =>
      a.localeCompare(b, "hr")
    )
  }, [availableProducts])

  const brandCounts = React.useMemo(() => {
    return availableProducts.reduce<Record<string, number>>((counts, product) => {
      counts[product.brand] = (counts[product.brand] ?? 0) + 1
      return counts
    }, {})
  }, [availableProducts])

  const regulatedCount = React.useMemo(
    () => availableProducts.filter((product) => product.isRegulated).length,
    [availableProducts]
  )

  const products = React.useMemo(() => {
    const filtered = availableProducts.filter((product) => {
      const price = getProductPrice(product)
      const query = filters.query.trim().toLowerCase()
      const minPrice = filters.minPrice ? Number(filters.minPrice) : 0
      const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Number.POSITIVE_INFINITY
      const matchesQuery =
        !query ||
        [
          product.name,
          product.brand,
          product.sku,
          product.category,
          product.isRegulated ? "regulirano dokumentacija dozvola" : "slobodna prodaja",
        ].some((value) => value.toLowerCase().includes(query))
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(product.status)
      const matchesRegulated = !filters.regulatedOnly || product.isRegulated

      return (
        matchesQuery &&
        matchesBrand &&
        matchesStatus &&
        matchesRegulated &&
        price >= minPrice &&
        price <= maxPrice
      )
    })

    return filtered.toSorted((a, b) => {
      if (sort === "price-asc") return getProductPrice(a) - getProductPrice(b)
      if (sort === "price-desc") return getProductPrice(b) - getProductPrice(a)
      if (sort === "name-asc") return a.name.localeCompare(b.name, "hr")
      return MOCK_PRODUCTS.indexOf(a) - MOCK_PRODUCTS.indexOf(b)
    })
  }, [availableProducts, filters, sort])

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginatedProducts = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return products.slice(start, start + PAGE_SIZE)
  }, [currentPage, products])
  const resultStart = products.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const resultEnd = Math.min(currentPage * PAGE_SIZE, products.length)

  const updateFilters = (nextFilters: Partial<ProductFilters>) => {
    setFilters((current) => ({ ...current, ...nextFilters }))
    setPage(1)
  }

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS)
    setPage(1)
  }

  return (
    <main className="bg-background flex min-h-screen flex-col">
      {/* Header Section */}
      <div className="bg-secondary/10 border-b pt-24 pb-20 md:pt-40">
        <Container>
          <div className="flex flex-col gap-12">
            <nav
              className="flex items-center gap-3"
              aria-label="Putanja"
            >
              <Link href="/" className="text-label hover:text-foreground transition-colors">
                Naslovnica
              </Link>
              <ChevronRight className="text-muted-foreground/30 size-3" aria-hidden="true" />
              <Link href="/kategorija/sve" className="text-label hover:text-foreground transition-colors">
                Katalog
              </Link>
              <ChevronRight className="text-muted-foreground/30 size-3" aria-hidden="true" />
              <span className="text-label text-foreground">{category.title}</span>
            </nav>

            <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
              <div className="max-w-4xl space-y-8">
                <h1 className="text-editorial-headline">
                  {category.title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="text-muted-foreground/40">{category.title.split(' ').slice(-1)}</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed font-medium">
                  {category.description}
                </p>
              </div>

              {category.regulatedNotice && (
                <div className="surface-glass border-accent/20 flex max-w-sm gap-6 p-8 md:shrink-0">
                  <div className="bg-accent/10 flex size-12 shrink-0 items-center justify-center rounded-full">
                    <AlertCircle className="text-accent size-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground text-[10px] font-black tracking-widest uppercase">
                      Sigurnosni Protokol
                    </p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed font-medium">
                      {category.regulatedNotice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Sticky Toolbar */}
      <div className="surface-glass sticky top-[72px] z-30 border-y py-4 md:py-6">
        <Container>
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-3 text-xs font-black tracking-widest uppercase lg:hidden"
              >
                <SlidersHorizontal className="size-4" aria-hidden="true" /> 
                Filteri
              </button>
              <div className="hidden items-center gap-3 lg:flex">
                <span className="text-foreground text-sm font-black tracking-tighter">{products.length}</span>
                <span className="text-label">Artikala u ponudi</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 rounded-sm bg-white/50 px-4 py-2 backdrop-blur-sm border border-black/5">
                <span className="text-muted-foreground/60 text-[9px] font-black tracking-widest uppercase">
                  Sortiraj:
                </span>
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value)
                    setPage(1)
                  }}
                  className="cursor-pointer bg-transparent text-[11px] font-black tracking-tight focus:outline-none"
                >
                  <option value="newest">Najnovije</option>
                  <option value="price-asc">Cijena (Uzlazno)</option>
                  <option value="price-desc">Cijena (Silazno)</option>
                  <option value="name-asc">Abecedno</option>
                </select>
              </div>
              
              <div className="hidden items-center gap-1 sm:flex">
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-sm transition-all",
                    view === "grid" ? "bg-foreground text-background" : "text-muted-foreground/40 hover:bg-black/5"
                  )}
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setView("list")}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-sm transition-all",
                    view === "list" ? "bg-foreground text-background" : "text-muted-foreground/40 hover:bg-black/5"
                  )}
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.brands.length > 0 ||
            filters.statuses.length > 0 ||
            filters.regulatedOnly ||
            filters.minPrice ||
            filters.maxPrice ||
            filters.query) && (
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-black/5 pt-4">
              <span className="text-muted-foreground/40 mr-2 text-[9px] font-black tracking-[0.2em] uppercase">
                Aktivno:
              </span>

              {filters.query && (
                <Badge
                  variant="secondary"
                  className="tactile-border flex items-center gap-2 rounded-sm py-1.5 px-3 text-[9px] font-black tracking-widest uppercase"
                >
                  Pretraga: {filters.query}
                  <button onClick={() => updateFilters({ query: "" })} className="hover:text-accent transition-colors">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}

              {filters.brands.map((b) => (
                <Badge
                  key={b}
                  variant="secondary"
                  className="tactile-border flex items-center gap-2 rounded-sm py-1.5 px-3 text-[9px] font-black tracking-widest uppercase"
                >
                  {b}
                  <button onClick={() => updateFilters({ brands: filters.brands.filter((x) => x !== b) })} className="hover:text-accent transition-colors">
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}

              {(filters.minPrice || filters.maxPrice) && (
                <Badge
                  variant="secondary"
                  className="tactile-border flex items-center gap-2 rounded-sm py-1.5 px-3 text-[9px] font-black tracking-widest uppercase"
                >
                  {filters.minPrice || "0"} - {filters.maxPrice || "∞"} EUR
                  <button onClick={() => updateFilters({ minPrice: "", maxPrice: "" })} className="hover:text-accent transition-colors">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}

              <button
                onClick={resetFilters}
                className="text-accent hover:text-foreground ml-4 text-[9px] font-black tracking-widest uppercase transition-all underline underline-offset-4"
              >
                Očisti sve
              </button>
            </div>
          )}
        </Container>
      </div>

      <section className="section-padding flex-1 bg-background">
        <Container>
          <div className="flex gap-16 lg:gap-24">
            <FilterSidebar
              brands={brandOptions}
              brandCounts={brandCounts}
              regulatedCount={regulatedCount}
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
            />

            <div className="flex-1 space-y-16">
              {products.length > 0 ? (
                <div
                  className={cn(
                    "grid gap-x-8 gap-y-12",
                    view === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-8"
                  )}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant={view === "list" ? "list" : "default"}
                    />
                  ))}
                </div>
              ) : (
                <div className="border-accent/10 bg-secondary/5 flex flex-col items-center justify-center rounded-sm border p-20 text-center md:p-32">
                  <div className="bg-accent/10 mb-8 flex size-24 items-center justify-center rounded-full">
                    <SearchX className="text-accent size-10" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Nema rezultata</h2>
                  <p className="text-muted-foreground mt-4 max-w-sm text-lg font-medium">
                    Pokušajte prilagoditi kriterije pretrage ili očistiti sve filtere.
                  </p>
                  <Button
                    variant="outline"
                    className="tactile-border mt-12 h-14 px-10 text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:bg-foreground hover:text-background"
                    onClick={resetFilters}
                  >
                    Očisti sve filtere
                  </Button>
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col items-center justify-between gap-8 border-t border-black/5 pt-16 sm:flex-row">
                <span className="text-label">
                  {products.length > 0
                    ? `Prikazano ${resultStart} - ${resultEnd} od ${products.length} artikala`
                    : `0 artikala`}
                </span>

                {totalPages > 1 && (
                  <nav className="flex items-center gap-2" aria-label="Paginacija">
                    <Button
                      variant="outline"
                      size="sm"
                      className="tactile-border h-12 px-6 text-[10px] font-black tracking-widest uppercase transition-all"
                      disabled={currentPage === 1}
                      onClick={() => {
                        setPage((value) => Math.max(1, value - 1))
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      Prethodna
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (pageNumber) => (
                          <button
                            key={pageNumber}
                            onClick={() => {
                              setPage(pageNumber)
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                            className={cn(
                              "flex size-12 items-center justify-center text-[11px] font-black transition-all",
                              pageNumber === currentPage 
                                ? "bg-foreground text-background" 
                                : "text-muted-foreground hover:bg-black/5"
                            )}
                          >
                            {pageNumber}
                          </button>
                        )
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="tactile-border h-12 px-6 text-[10px] font-black tracking-widest uppercase transition-all"
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setPage((value) => Math.min(totalPages, value + 1))
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      Sljedeća
                    </Button>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <MobileFilters
        isOpen={isMobileFiltersOpen}
        filters={filters}
        brands={brandOptions}
        brandCounts={brandCounts}
        regulatedCount={regulatedCount}
        onChange={updateFilters}
        onReset={resetFilters}
        onClose={() => setIsMobileFiltersOpen(false)}
      />
    </main>
  )
}
