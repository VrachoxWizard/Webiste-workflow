"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
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
    title: "Oružje",
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
    description: "Pregled karabina s osnovnim tehničkim podacima i statusom dostupnosti. Odaberite pouzdanost za svaki lov.",
    categories: ["Karabini"],
    regulatedNotice:
      "Za kupnju reguliranih artikala potrebna je važeća dokumentacija prije preuzimanja.",
  },
  sacmarice: {
    title: "Sačmarice",
    description: "Odabrani modeli sačmarica za registrirane kupce. Klasična izrada i moderna rješenja za lov i sport.",
    categories: ["Sačmarice"],
    regulatedNotice:
      "Za kupnju reguliranih artikala potrebna je važeća dokumentacija prije preuzimanja.",
  },
  streljivo: {
    title: "Streljivo",
    description: "Kvalitetno streljivo za lov i sportsko streljaštvo. Prodaja se vrši isključivo prema važećim zakonskim propisima.",
    categories: ["Streljivo"],
    regulatedNotice:
      "Kupnja streljiva podliježe zakonskim regulativama i provjeri dokumenata prije isporuke.",
  },
  optike: {
    title: "Dnevna i Noćna Optika",
    description:
      "Specijalizirani optički uređaji koji osiguravaju kristalno jasnu sliku i preciznost u svim svjetlosnim uvjetima.",
    categories: ["Optike", "Termalni uređaji"],
  },
  "termalni-uredaji": {
    title: "Termalni Uređaji",
    description:
      "Napredna tehnologija za promatranje i terensku orijentaciju. Otkrijte ono što je oku nevidljivo.",
    categories: ["Termalni uređaji"],
  },
  "odjeca-i-obuca": {
    title: "Terenska Odjeća i Obuća",
    description:
      "Vrhunska oprema prilagođena zahtjevnim vanjskim uvjetima. Kvalitetni materijali za maksimalnu udobnost i zaštitu.",
    categories: ["Jakne", "Čizme"],
  },
  oprema: {
    title: "Dodatna Oprema",
    description: "Sve što vam je potrebno za uspješan boravak na otvorenom — od svjetiljki do ruksaka i torbi.",
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

  const products = React.useMemo(() => {
    const filtered = availableProducts.filter((product) => {
      const price = getProductPrice(product)
      const query = filters.query.trim().toLowerCase()
      const minPrice = filters.minPrice ? Number(filters.minPrice) : 0
      const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Number.POSITIVE_INFINITY
      const matchesQuery =
        !query ||
        [product.name, product.brand, product.sku, product.category].some((value) =>
          value.toLowerCase().includes(query)
        )
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(product.status)

      return matchesQuery && matchesBrand && matchesStatus && price >= minPrice && price <= maxPrice
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
    <main className="flex min-h-screen flex-col bg-background">
      <div className="border-b bg-muted/20 pb-16 pt-20 md:pt-32">
        <Container>
          <div className="flex flex-col gap-10">
            <nav
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
              aria-label="Putanja"
            >
              <Link href="/" className="transition-colors hover:text-primary">
                Naslovnica
              </Link>
              <ChevronRight className="size-3 text-muted-foreground/30" aria-hidden="true" />
              <Link href="/kategorija/sve" className="transition-colors hover:text-primary">
                Katalog
              </Link>
              <ChevronRight className="size-3 text-muted-foreground/30" aria-hidden="true" />
              <span className="text-foreground">{category.title}</span>
            </nav>

            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
              <div className="max-w-3xl space-y-6">
                <h1 className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
                  {category.title}
                </h1>
                <p className="max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
                  {category.description}
                </p>
              </div>

              {category.regulatedNotice && (
                <div className="flex max-w-sm gap-5 rounded-sm border border-primary/20 bg-primary/5 p-6 shadow-sm md:shrink-0">
                  <AlertCircle className="size-6 shrink-0 text-primary" aria-hidden="true" />
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Važna napomena
                    </p>
                    <p className="text-xs font-medium leading-relaxed text-muted-foreground/80">
                      {category.regulatedNotice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      <div className="sticky top-[72px] z-30 border-b bg-background/95 py-5 backdrop-blur-md">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest lg:hidden"
              >
                <SlidersHorizontal className="size-4" aria-hidden="true" /> Filteri
              </button>
              <div className="hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground lg:flex">
                <span className="text-foreground">{products.length}</span> Pronađena artikla
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-sm border bg-background px-4 py-2 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Poredak:
                </span>
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value)
                    setPage(1)
                  }}
                  className="cursor-pointer bg-transparent text-[11px] font-bold focus:outline-none"
                >
                  <option value="newest">Najnovije prvo</option>
                  <option value="price-asc">Cijena: Manja - Veća</option>
                  <option value="price-desc">Cijena: Veća - Manja</option>
                  <option value="name-asc">Abecedno: A-Z</option>
                </select>
              </div>
              <div className="hidden items-center overflow-hidden rounded-sm border bg-background shadow-sm sm:flex">
                <button
                  type="button"
                  aria-label="Mrežni prikaz"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className={cn(
                    "p-2.5 transition-all hover:bg-muted",
                    view === "grid" ? "bg-muted text-primary" : "text-muted-foreground/60"
                  )}
                >
                  <LayoutGrid className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Listni prikaz"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className={cn(
                    "p-2.5 transition-all hover:bg-muted border-l",
                    view === "list" ? "bg-muted text-primary" : "text-muted-foreground/60"
                  )}
                >
                  <List className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.brands.length > 0 || filters.statuses.length > 0 || filters.query) && (
            <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t pt-5">
              <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                Aktivno:
              </span>

              {filters.query && (
                <Badge
                  variant="secondary"
                  className="gap-2 rounded-sm bg-muted/80 py-1.5 pl-3 pr-2 text-[10px] font-bold uppercase tracking-widest hover:bg-muted"
                >
                  Pretraga: {filters.query}
                  <button
                    onClick={() => updateFilters({ query: "" })}
                    className="rounded-sm p-0.5 transition-colors hover:bg-background"
                    aria-label="Ukloni pretragu"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}

              {filters.brands.map((b) => (
                <Badge
                  key={b}
                  variant="secondary"
                  className="gap-2 rounded-sm bg-muted/80 py-1.5 pl-3 pr-2 text-[10px] font-bold uppercase tracking-widest hover:bg-muted"
                >
                  {b}
                  <button
                    onClick={() => updateFilters({ brands: filters.brands.filter((x) => x !== b) })}
                    className="rounded-sm p-0.5 transition-colors hover:bg-background"
                    aria-label={`Ukloni filter ${b}`}
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}

              {filters.statuses.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="gap-2 rounded-sm bg-muted/80 py-1.5 pl-3 pr-2 text-[10px] font-bold uppercase tracking-widest hover:bg-muted"
                >
                  {getStatusLabel(s as Product["status"])}
                  <button
                    onClick={() =>
                      updateFilters({ statuses: filters.statuses.filter((x) => x !== s) })
                    }
                    className="rounded-sm p-0.5 transition-colors hover:bg-background"
                    aria-label="Ukloni status filter"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}

              <button
                onClick={resetFilters}
                className="ml-4 text-[10px] font-bold uppercase tracking-widest text-primary/60 transition-all hover:text-primary hover:underline hover:underline-offset-4"
              >
                Očisti sve
              </button>
            </div>
          )}
        </Container>
      </div>

      <Section className="flex-1 py-16">
        <Container>
          <div className="flex gap-16 lg:gap-24">
            <FilterSidebar
              brands={brandOptions}
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
            />

            <div className="flex-1 space-y-12">
              {products.length > 0 ? (
                <div
                  className={cn(
                    "grid gap-8",
                    view === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-6"
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
                <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border/60 bg-muted/10 px-6 py-32 text-center">
                  <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted/50">
                    <SearchX className="size-8 text-muted-foreground/30" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">Nema rezultata</h2>
                  <p className="mt-3 max-w-md text-base font-medium text-muted-foreground">
                    Ne možemo pronaći proizvode koji odgovaraju vašim kriterijima. Pokušajte
                    promijeniti filtere ili očistiti pretragu za bolji prikaz.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-10 h-12 rounded-sm px-8 text-xs font-bold uppercase tracking-widest shadow-sm"
                    onClick={resetFilters}
                  >
                    Očisti sve filtere
                  </Button>
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col items-center justify-between gap-6 border-t pt-12 sm:flex-row">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  {products.length > 0
                    ? `Prikazano ${resultStart}-${resultEnd} od ${products.length}`
                    : `Ukupno 0 artikala`}
                </p>

                {totalPages > 1 && (
                  <nav className="flex items-center gap-1.5" aria-label="Paginacija">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-10 rounded-sm px-4"
                      disabled={currentPage === 1}
                      onClick={() => {
                        setPage((value) => Math.max(1, value - 1))
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      Prethodna
                    </Button>
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (pageNumber) => (
                          <Button
                            key={pageNumber}
                            type="button"
                            variant={pageNumber === currentPage ? "default" : "ghost"}
                            size="sm"
                            className={cn(
                              "size-10 rounded-sm p-0 text-xs font-bold",
                              pageNumber === currentPage && "shadow-md"
                            )}
                            aria-current={pageNumber === currentPage ? "page" : undefined}
                            onClick={() => {
                              setPage(pageNumber)
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                          >
                            {pageNumber}
                          </Button>
                        )
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-10 rounded-sm px-4"
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
      </Section>

      <MobileFilters
        isOpen={isMobileFiltersOpen}
        filters={filters}
        brands={brandOptions}
        onChange={updateFilters}
        onReset={resetFilters}
        onClose={() => setIsMobileFiltersOpen(false)}
      />
    </main>
  )
}
