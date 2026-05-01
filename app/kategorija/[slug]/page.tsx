"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { FilterSidebar } from "@/components/shop/FilterSidebar"
import { MobileFilters } from "@/components/shop/MobileFilters"
import { AlertCircle, ChevronRight, LayoutGrid, List, SlidersHorizontal, X, SearchX } from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import { ProductFilters } from "@/types/filters"

const PAGE_SIZE = 6

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
  "kratko-oruzje": {
    title: "Kratko oružje",
    description: "Informativni pregled kategorije. Dostupnost reguliranih artikala potvrđuje trgovina prije svake kupnje.",
    categories: [],
    regulatedNotice: "Za regulirane artikle potrebna je važeća dokumentacija prije preuzimanja.",
  },
  pistolji: {
    title: "Pištolji",
    description: "Regulirana kategorija dostupna isključivo uz prethodnu provjeru uvjeta kupnje.",
    categories: [],
    regulatedNotice: "Kupnja je moguća samo uz propisanu dokumentaciju i provjeru trgovine.",
  },
  revolveri: {
    title: "Revolveri",
    description: "Regulirana kategorija s kupnjom isključivo uz propisane zakonske uvjete.",
    categories: [],
    regulatedNotice: "Kupnja je moguća samo uz propisanu dokumentaciju i provjeru trgovine.",
  },
  "plinsko-oruzje": {
    title: "Plinsko oružje",
    description: "Artikli čija kupnja može podlijegati dobi, dokumentaciji i pravilima preuzimanja.",
    categories: [],
    regulatedNotice: "Uvjeti kupnje potvrđuju se prije obrade narudžbe.",
  },
  "zracno-oruzje": {
    title: "Zračno oružje",
    description: "Pregled artikala uz odgovornu kupnju i provjeru dostupnosti.",
    categories: [],
    regulatedNotice: "Za pojedine artikle mogu vrijediti dobna ili zakonska ograničenja.",
  },
  odrzavanje: {
    title: "Čišćenje i održavanje",
    description: "Pribor za održavanje opreme, uz stručnu podršku pri odabiru kompatibilnih artikala.",
    categories: [],
  },
  futrole: {
    title: "Futrole i navlake",
    description: "Zaštitne futrole, torbe i navlake za sigurno spremanje i transport opreme.",
    categories: ["Ruksaci i torbe"],
  },
  streljivo: {
    title: "Streljivo",
    description: "Streljivo se prodaje samo kupcima koji ispunjavaju važeće zakonske uvjete.",
    categories: ["Streljivo"],
    regulatedNotice: "Kupnja streljiva podliježe zakonskim regulativama i provjeri dokumenata prije isporuke.",
  },
  "sacmeno-streljivo": {
    title: "Sačmeno streljivo",
    description: "Kategorija streljiva dostupna registriranim kupcima uz provjeru dokumentacije.",
    categories: ["Streljivo"],
    regulatedNotice: "Kupnja streljiva podliježe zakonskim regulativama i provjeri dokumenata prije isporuke.",
  },
  malokalibarsko: {
    title: "Malokalibarsko streljivo",
    description: "Odabrano streljivo za kupce koji mogu predočiti propisanu dokumentaciju.",
    categories: ["Streljivo"],
    regulatedNotice: "Kupnja streljiva podliježe zakonskim regulativama i provjeri dokumenata prije isporuke.",
  },
  "karabinsko-streljivo": {
    title: "Karabinsko streljivo",
    description: "Streljivo za karabine uz jasne informacije o cijeni, dostupnosti i uvjetima kupnje.",
    categories: ["Streljivo"],
    regulatedNotice: "Kupnja streljiva podliježe zakonskim regulativama i provjeri dokumenata prije isporuke.",
  },
  diabole: {
    title: "Diabole",
    description: "Potrošni artikli i pribor za zračnu opremu, uz provjeru dostupnosti prije isporuke.",
    categories: [],
  },
  "pribor-za-punjenje": {
    title: "Reloading i pribor za punjenje",
    description: "Specijalizirani pribor za kupce koji poznaju zakonske uvjete i sigurnu obradu materijala.",
    categories: [],
    regulatedNotice: "Za pojedine artikle mogu vrijediti dodatna zakonska ograničenja.",
  },
  optike: {
    title: "Optike",
    description: "Optički i termalni uređaji s naglaskom na kompatibilnost, servisnu podršku i provjerenu dostupnost.",
    categories: ["Optike", "Termalni uređaji"],
  },
  "dnevne-optike": {
    title: "Dnevne optike",
    description: "Dnevna optika i pribor uz podršku pri odabiru montaže i kompatibilnosti.",
    categories: ["Optike"],
  },
  "crvene-tocke": {
    title: "Crvene točke",
    description: "Optički uređaji i ciljnički dodaci uz provjeru dostupnosti i kompatibilnosti.",
    categories: ["Optike"],
  },
  "termalni-uredaji": {
    title: "Termalni uređaji",
    description: "Uređaji za promatranje i terensku orijentaciju s jasnim informacijama o jamstvu i dostupnosti.",
    categories: ["Termalni uređaji"],
  },
  "sine-i-prstenje": {
    title: "Šine i prstenje",
    description: "Montažni pribor za optike, uz preporuku provjere kompatibilnosti prije kupnje.",
    categories: ["Optike"],
  },
  "odjeca-i-obuca": {
    title: "Odjeća i obuća",
    description: "Terenska odjeća i obuća za lov, rad i boravak na otvorenom, odabrana prema trajnosti i udobnosti.",
    categories: ["Jakne", "Čizme"],
  },
  jakne: {
    title: "Jakne",
    description: "Robusne terenske jakne za promjenjive uvjete i višeslojno nošenje.",
    categories: ["Jakne"],
  },
  hlace: {
    title: "Hlače",
    description: "Terenske hlače i donji slojevi. Dostupnost se potvrđuje prije isporuke.",
    categories: [],
  },
  kape: {
    title: "Kape",
    description: "Kape i pokrivala za boravak na otvorenom. Dostupnost se potvrđuje prije isporuke.",
    categories: [],
  },
  majice: {
    title: "Majice",
    description: "Osnovni i tehnički slojevi za outdoor upotrebu. Dostupnost se potvrđuje prije isporuke.",
    categories: [],
  },
  cizme: {
    title: "Čizme",
    description: "Visoka i niska terenska obuća za zahtjevan teren, kišu i hladnije uvjete.",
    categories: ["Čizme"],
  },
  oprema: {
    title: "Oprema",
    description: "Dodatna outdoor i terenska oprema za odgovornu kupnju i dugotrajnu upotrebu.",
    categories: ["Optike", "Termalni uređaji", "Svjetiljke", "Ruksaci i torbe"],
  },
  svjetiljke: {
    title: "Svjetiljke",
    description: "Ručne i naglavne svjetiljke za kamp, rad i kretanje na otvorenom.",
    categories: ["Svjetiljke"],
  },
  nozevi: {
    title: "Noževi",
    description: "Noževi i rezni pribor za outdoor upotrebu. Dostupnost se potvrđuje prije isporuke.",
    categories: [],
  },
  "ruksaci-i-torbe": {
    title: "Ruksaci i torbe",
    description: "Ruksaci, torbe i organizacijska oprema za dulje boravke na terenu.",
    categories: ["Ruksaci i torbe"],
  },
  "oprema-za-lov": {
    title: "Oprema za lov",
    description: "Terenska oprema, optika i pribor uz odgovornu kupnju i provjeru dostupnosti.",
    categories: ["Optike", "Termalni uređaji", "Svjetiljke", "Ruksaci i torbe"],
  },
}

const getCategoryContent = (slug: string) => CATEGORY_CONTENT[slug] ?? {
  title: "Kategorija nije pronađena",
  description: "Tražena kategorija trenutno nema zaseban prikaz. Pregledajte katalog ili promijenite filtere.",
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
  const [filters, setFilters] = React.useState<ProductFilters>(() => ({ ...DEFAULT_FILTERS, query: queryParam }))
  const [page, setPage] = React.useState(1)
  const category = getCategoryContent(slug)

  const availableProducts = React.useMemo(() => {
    const byCategory = category.categories
      ? MOCK_PRODUCTS.filter((product) => category.categories?.includes(product.category))
      : MOCK_PRODUCTS

    return category.saleOnly ? byCategory.filter((product) => product.status === "sale") : byCategory
  }, [category])

  const brandOptions = React.useMemo(() => {
    return Array.from(new Set(availableProducts.map((product) => product.brand))).toSorted((a, b) => a.localeCompare(b, "hr"))
  }, [availableProducts])

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
      <div className="border-b bg-muted/20 pb-12 pt-16 md:pt-24">
        <Container>
          <div className="flex flex-col gap-8">
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground" aria-label="Putanja">
              <Link href="/" className="hover:text-primary transition-colors">Naslovnica</Link>
              <ChevronRight className="size-3" aria-hidden="true" />
              <Link href="/kategorija/sve" className="hover:text-primary transition-colors">Katalog</Link>
              <ChevronRight className="size-3" aria-hidden="true" />
              <span className="text-foreground">{category.title}</span>
            </nav>

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{category.title}</h1>
                <p className="font-medium leading-relaxed text-muted-foreground text-lg">{category.description}</p>
              </div>

              {category.regulatedNotice && (
                <div className="flex max-w-sm gap-4 rounded-sm bg-primary/5 border border-primary/20 p-4 shadow-sm md:shrink-0">
                  <AlertCircle className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Zakonska napomena</p>
                    <p className="text-xs font-medium leading-normal text-muted-foreground">{category.regulatedNotice}</p>
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
              <label className="flex items-center gap-2 rounded-sm border px-3 py-1.5 bg-background shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sortiraj:</span>
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value)
                    setPage(1)
                  }}
                  className="cursor-pointer bg-transparent text-[11px] font-bold focus:outline-none focus-visible:ring-0"
                >
                  <option value="newest">Najnovije</option>
                  <option value="price-asc">Cijena: manja prema većoj</option>
                  <option value="price-desc">Cijena: veća prema manjoj</option>
                  <option value="name-asc">Naziv: A-Z</option>
                </select>
              </label>
              <div className="hidden items-center overflow-hidden rounded-sm border shadow-sm sm:flex">
                <button
                  type="button"
                  aria-label="Prikaži mrežu proizvoda"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className="border-r bg-muted p-2 hover:bg-background data-[active=true]:bg-background data-[active=true]:text-primary transition-colors"
                  data-active={view === "grid"}
                >
                  <LayoutGrid className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Prikaži listu proizvoda"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className="p-2 hover:bg-muted data-[active=true]:bg-background data-[active=true]:text-primary transition-colors bg-muted"
                  data-active={view === "list"}
                >
                  <List className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(filters.brands.length > 0 || filters.statuses.length > 0 || filters.query) && (
            <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2">Aktivni filteri:</span>
              
              {filters.query && (
                <Badge variant="secondary" className="gap-1 rounded-sm text-[10px] font-bold tracking-widest pl-2 pr-1 bg-muted hover:bg-muted">
                  Pretraga: {filters.query}
                  <button onClick={() => updateFilters({ query: "" })} className="ml-1 rounded-sm hover:bg-background p-0.5 transition-colors" aria-label="Ukloni pretragu">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              
              {filters.brands.map(b => (
                <Badge key={b} variant="secondary" className="gap-1 rounded-sm text-[10px] uppercase font-bold tracking-widest pl-2 pr-1 bg-muted hover:bg-muted">
                  {b}
                  <button onClick={() => updateFilters({ brands: filters.brands.filter(x => x !== b) })} className="ml-1 rounded-sm hover:bg-background p-0.5 transition-colors" aria-label={`Ukloni filter ${b}`}>
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}

              {filters.statuses.map(s => (
                <Badge key={s} variant="secondary" className="gap-1 rounded-sm text-[10px] uppercase font-bold tracking-widest pl-2 pr-1 bg-muted hover:bg-muted">
                  {getStatusLabel(s as Product["status"])}
                  <button onClick={() => updateFilters({ statuses: filters.statuses.filter(x => x !== s) })} className="ml-1 rounded-sm hover:bg-background p-0.5 transition-colors" aria-label="Ukloni status filter">
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}

              <button 
                onClick={resetFilters} 
                className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground ml-2 transition-colors underline underline-offset-4 decoration-transparent hover:decoration-muted-foreground"
              >
                Očisti sve
              </button>
            </div>
          )}
        </Container>
      </div>

      <Section className="flex-1">
        <Container>
          <div className="flex gap-12">
            <FilterSidebar brands={brandOptions} filters={filters} onChange={updateFilters} onReset={resetFilters} />

            <div className="flex-1 space-y-8">
              {products.length > 0 ? (
                <div className={view === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} variant={view === "list" ? "list" : "default"} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-sm border border-dashed bg-muted/20 py-20 text-center px-4">
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <SearchX className="size-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Nema rezultata za odabrane filtere</h2>
                  <p className="mt-2 text-sm font-medium text-muted-foreground max-w-md">Ne možemo pronaći proizvode koji odgovaraju vašim kriterijima. Pokušajte promijeniti filtere ili očistiti pretragu.</p>
                  <Button variant="outline" className="mt-6 font-bold uppercase tracking-widest text-[11px] h-10 px-6 rounded-sm" onClick={resetFilters}>
                    Očisti sve filtere
                  </Button>
                </div>
              )}

              <div className="flex flex-col items-center justify-center gap-4 border-t pt-8 sm:flex-row sm:justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {products.length > 0
                    ? `Prikazano ${resultStart}-${resultEnd} od ${products.length} artikala`
                    : `Prikazano 0 od ${availableProducts.length} artikala`}
                </p>

                {totalPages > 1 ? (
                  <nav className="flex items-center gap-2" aria-label="Paginacija proizvoda">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-sm"
                      disabled={currentPage === 1}
                      onClick={() => setPage((value) => Math.max(1, value - 1))}
                    >
                      Prethodna
                    </Button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                      <Button
                        key={pageNumber}
                        type="button"
                        variant={pageNumber === currentPage ? "default" : "outline"}
                        size="sm"
                        className="size-8 rounded-sm p-0"
                        aria-current={pageNumber === currentPage ? "page" : undefined}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                    >
                      Sljedeća
                    </Button>
                  </nav>
                ) : (
                  <p className="text-xs font-medium text-muted-foreground">Svi artikli stanu na jednu stranicu.</p>
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
