"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/shop/ProductGallery"
import { ProductSpecs } from "@/components/shop/ProductSpecs"
import { ProductTrust } from "@/components/shop/ProductTrust"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { ChevronRight, MessageSquare, ShieldAlert, ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/CartContext"

const categorySlugMap: Record<string, string> = {
  Karabini: "karabini",
  Sačmarice: "sacmarice",
  Streljivo: "streljivo",
  Optike: "optike",
  "Termalni uređaji": "termalni-uredaji",
  Jakne: "jakne",
  Čizme: "cizme",
  Svjetiljke: "svjetiljke",
  "Ruksaci i torbe": "ruksaci-i-torbe",
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart()
  const routeParams = useParams<{ id: string }>()
  const productId = routeParams.id ?? params.id
  const product = MOCK_PRODUCTS.find((item) => item.id === productId)

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col bg-background">
        <Section>
          <Container>
            <div className="mx-auto flex max-w-xl flex-col items-center gap-8 rounded-sm border border-dashed border-border/60 bg-muted/10 px-6 py-24 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                <ShieldAlert className="size-8 text-muted-foreground/40" />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Artikl nije pronađen</h1>
                <p className="font-medium leading-relaxed text-muted-foreground">
                  Proizvod koji tražite trenutno nije dostupan ili je uklonjen iz kataloga.
                </p>
              </div>
              <Button asChild size="lg" className="h-12 px-8 uppercase tracking-widest font-bold">
                <Link href="/kategorija/sve">Povratak u katalog</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  const relatedProducts = [
    ...MOCK_PRODUCTS.filter((item) => item.id !== product.id && item.category === product.category),
    ...MOCK_PRODUCTS.filter((item) => item.id !== product.id && item.category !== product.category),
  ].slice(0, 4)

  const categorySlug = categorySlugMap[product.category] ?? "sve"
  const galleryImages = product.galleryImages?.length ? product.galleryImages : [product.image]
  
  const isSale = product.status === "sale" && product.salePrice
  const savings = isSale ? Math.round(((product.price - product.salePrice!) / product.price) * 100) : 0

  return (
    <main className="flex min-h-screen flex-col bg-background pb-24 lg:pb-0">
      {/* Editorial Breadcrumbs Area */}
      <div className="border-b bg-muted/20 pb-8 pt-20 md:pt-32">
        <Container>
          <div className="flex flex-col gap-6">
            <Link 
              href={`/kategorija/${categorySlug}`}
              className="group inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="mr-2 size-3 transition-transform group-hover:-translate-x-1" />
              Povratak u {product.category}
            </Link>
            <nav
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40"
              aria-label="Putanja"
            >
              <Link href="/" className="transition-colors hover:text-primary">Naslovnica</Link>
              <ChevronRight className="size-3" aria-hidden="true" />
              <Link href="/kategorija/sve" className="transition-colors hover:text-primary">Katalog</Link>
              <ChevronRight className="size-3" aria-hidden="true" />
              <Link href={`/kategorija/${categorySlug}`} className="transition-colors hover:text-primary">{product.category}</Link>
              <ChevronRight className="size-3" aria-hidden="true" />
              <span className="text-foreground/60">{product.name}</span>
            </nav>
          </div>
        </Container>
      </div>

      <Section className="py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 xl:gap-24">
            {/* Left: Gallery & Specs */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="space-y-16">
                <ProductGallery images={galleryImages} productName={product.name} />
                
                <div className="hidden space-y-16 lg:block">
                  <div className="max-w-3xl space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="h-0.5 w-10 bg-primary" />
                      <h2 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">
                        Opis i specifikacije
                      </h2>
                    </div>
                    <p className="text-lg font-medium leading-relaxed text-muted-foreground/90">
                      {product.shortDescription ??
                        `${product.name} predstavlja vrhunac inženjerskog pristupa u svojoj kategoriji. Dizajniran za maksimalnu pouzdanost i preciznost, ovaj artikl zadovoljava najviše standarde profesionalnih korisnika i entuzijasta.`}
                    </p>
                    <div className="prose prose-sm prose-stone max-w-none text-muted-foreground">
                      <p>
                        Svaki detalj je pažljivo osmišljen kako bi pružio vrhunsko korisničko iskustvo na terenu. 
                        Naš tim stručnjaka stoji vam na raspolaganju za sve tehničke upite i savjete o kompatibilnosti s vašom postojećom opremom.
                      </p>
                    </div>
                  </div>
                  <ProductSpecs specs={product.metadata || []} />
                </div>
              </div>
            </div>

            {/* Right: Purchase Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 space-y-10">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="h-6 border-primary/30 px-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {product.brand}
                    </Badge>
                    {product.status === "new" && (
                      <Badge className="h-6 bg-primary px-3 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-sm">
                        Novo
                      </Badge>
                    )}
                    {product.status === "sale" && (
                      <Badge className="h-6 bg-destructive px-3 text-[10px] font-bold uppercase tracking-widest text-destructive-foreground shadow-sm">
                        Akcija -{savings}%
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tighter md:text-5xl lg:text-6xl">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">
                        SKU: {product.sku}
                      </p>
                      <span className="text-muted-foreground/20 text-xs">|</span>
                      <div className="flex items-center gap-2">
                        <div className={cn("size-2 rounded-full shadow-sm animate-pulse", product.status === "on_order" ? "bg-amber-500" : "bg-emerald-600")} />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                          {product.availabilityLabel ?? (product.status === "on_order" ? "Po narudžbi" : "Na zalihi")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 rounded-sm border border-border/60 bg-muted/5 p-8 shadow-sm md:p-10">
                  <div className="space-y-2">
                    {isSale ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-muted-foreground line-through decoration-destructive/30">
                          {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                        </span>
                        <div className="flex items-baseline gap-3">
                          <span className="text-5xl font-black tracking-tighter text-destructive">
                            {product.salePrice!.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-5xl font-black tracking-tighter text-foreground">
                        {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                      </span>
                    )}
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      PDV uključen • Dostava se obračunava na blagajni
                    </p>
                  </div>

                  {product.isRegulated && (
                    <div className="flex items-start gap-4 rounded-sm border border-primary/20 bg-primary/5 p-6">
                      <ShieldAlert className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden="true" />
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                          Regulirani Artikl
                        </p>
                        <p className="text-xs font-medium leading-relaxed text-muted-foreground/80">
                          Kupovina zahtijeva provjeru zakonske dokumentacije. Prodaja isključivo osobama s dozvolom.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    {product.isRegulated ? (
                      <Button
                        size="lg"
                        className="group h-16 w-full text-base font-bold uppercase tracking-[0.15em] shadow-premium shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
                        asChild
                      >
                        <Link href={`/kontakt?product=${product.id}`}>
                          Pošalji Upit
                          <MessageSquare className="ml-3 size-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className="group h-16 w-full text-base font-bold uppercase tracking-[0.15em] shadow-premium shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
                        onClick={() => addItem(product)}
                      >
                        Dodaj u košaricu
                        <ShoppingBag className="ml-3 size-5 transition-transform group-hover:-translate-y-1" aria-hidden="true" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-16 w-full border-border/60 text-base font-bold uppercase tracking-[0.15em] transition-all hover:bg-muted"
                      asChild
                    >
                      <Link href="/kontakt">Kontaktirajte stručnjaka</Link>
                    </Button>
                  </div>

                  <ProductTrust />
                </div>
              </div>
            </div>

            {/* Mobile-only Specs */}
            <div className="col-span-full space-y-16 lg:hidden">
              <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-8 bg-primary" />
                  <h2 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">
                    Opis proizvoda
                  </h2>
                </div>
                <p className="font-medium leading-relaxed text-muted-foreground">
                  {product.shortDescription ??
                    "Prije obrade narudžbe trgovina potvrđuje dostupnost, jamstvene uvjete i potrebnu dokumentaciju za kategoriju proizvoda."}
                </p>
              </div>
              <ProductSpecs specs={product.metadata || []} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Products Section */}
      <Section className="border-t bg-secondary/5 py-24">
        <Container>
          <div className="flex flex-col gap-16">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Slično u ponudi</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Možda će vas zanimati</h2>
              </div>
              <Link 
                href={`/kategorija/${categorySlug}`}
                className="group hidden items-center text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary/80 sm:flex"
              >
                Vidi sve <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Mobile Sticky Bar (Optimized) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/90 p-4 shadow-2xl backdrop-blur-md lg:hidden"
        role="region"
        aria-label="Kupnja"
      >
        <div className="mx-auto flex max-w-lg items-center gap-4">
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-[10px] font-bold uppercase tracking-widest text-primary">
              {product.brand}
            </p>
            <p className="text-xl font-black tracking-tighter text-foreground">
              {isSale
                ? product.salePrice!.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })
                : product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
            </p>
          </div>
          <div className="flex-1">
            {product.isRegulated ? (
              <Button
                size="lg"
                className="h-14 w-full text-sm font-bold uppercase tracking-widest shadow-premium"
                asChild
              >
                <Link href={`/kontakt?product=${product.id}`}>
                  Upit
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="h-14 w-full text-sm font-bold uppercase tracking-widest shadow-premium"
                onClick={() => addItem(product)}
              >
                U košaricu
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
