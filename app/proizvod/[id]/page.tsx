"use client"

import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/shop/ProductGallery"
import { ProductSpecs } from "@/components/shop/ProductSpecs"
import { ProductTrust } from "@/components/shop/ProductTrust"
import { ProductCard } from "@/components/ui/product-card"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { ChevronRight, MessageSquare, ShieldAlert, ShoppingBag, ArrowLeft, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/CartContext"
import { MagneticButton } from "@/components/ui/magnetic-button"

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
      <main className="bg-background flex min-h-screen flex-col">
        <section className="section-padding">
          <Container>
            <div className="border-accent/10 bg-secondary/5 mx-auto flex max-w-2xl flex-col items-center gap-10 rounded-sm border p-20 text-center">
              <div className="bg-accent/10 flex size-20 items-center justify-center rounded-full">
                <ShieldAlert className="text-accent size-10" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Artikl nije pronađen</h1>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  Proizvod koji tražite trenutno nije dostupan ili je uklonjen iz kataloga.
                </p>
              </div>
              <Button asChild className="tactile-border h-14 px-10 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-foreground hover:text-background">
                <Link href="/kategorija/sve">Povratak u katalog</Link>
              </Button>
            </div>
          </Container>
        </section>
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
  const savings = isSale
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  return (
    <main className="bg-background flex min-h-screen flex-col pb-24 lg:pb-0">
      {/* Editorial Breadcrumbs */}
      <div className="bg-secondary/10 border-b pt-24 pb-10 md:pt-40">
        <Container>
          <div className="flex flex-col gap-8">
            <Link
              href={`/kategorija/${categorySlug}`}
              className="group flex items-center text-label hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-3 size-3.5 transition-transform group-hover:-translate-x-1" />
              Katalog / {product.category}
            </Link>
            <nav
              className="flex items-center gap-3"
              aria-label="Putanja"
            >
              <Link href="/" className="text-label hover:text-foreground transition-colors">Naslovnica</Link>
              <ChevronRight className="text-muted-foreground/30 size-3" />
              <Link href="/kategorija/sve" className="text-label hover:text-foreground transition-colors">Katalog</Link>
              <ChevronRight className="text-muted-foreground/30 size-3" />
              <span className="text-label text-foreground">{product.name}</span>
            </nav>
          </div>
        </Container>
      </div>

      <section className="py-16 md:py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 xl:gap-32">
            {/* Left: Gallery & Content */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="space-y-24">
                <ProductGallery images={galleryImages} productName={product.name} />

                <div className="hidden space-y-24 lg:block">
                  <div className="max-w-4xl space-y-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-accent h-[2px] w-12" />
                      <h2 className="text-label text-foreground">Inženjerska Specifikacija</h2>
                    </div>
                    <div className="space-y-8">
                      <h3 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
                        Razvijeno za <span className="text-accent">maksimalne</span> performanse na terenu.
                      </h3>
                      <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                        {product.shortDescription ??
                          `${product.name} predstavlja vrhunac inženjerskog pristupa u svojoj kategoriji. Dizajniran za maksimalnu pouzdanost i preciznost, ovaj artikl zadovoljava najviše standarde profesionalnih korisnika i entuzijasta.`}
                      </p>
                    </div>
                    <div className="prose prose-stone max-w-none text-muted-foreground/80 leading-loose">
                      <p className="text-lg">
                        Svaki detalj je pažljivo osmišljen kako bi pružio vrhunsko korisničko
                        iskustvo na terenu. Naš tim stručnjaka stoji vam na raspolaganju za sve
                        tehničke upite i savjete o kompatibilnosti s vašom postojećom opremom.
                      </p>
                    </div>
                  </div>
                  <ProductSpecs specs={product.metadata || []} />
                </div>
              </div>
            </div>

            {/* Right: Purchase Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-32 space-y-12">
                <div className="space-y-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-label text-accent">{product.brand}</span>
                    <span className="text-muted-foreground/20">/</span>
                    <span className="text-label">{product.category}</span>
                  </div>

                  <div className="space-y-6">
                    <h1 className="text-4xl leading-[0.95] font-black tracking-tighter text-balance md:text-5xl lg:text-7xl">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-6">
                      <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                        REF: {product.sku}
                      </p>
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "size-1.5 rounded-full ring-4 ring-offset-2",
                            product.status === "on_order" ? "bg-amber-400 ring-amber-400/10" : "bg-emerald-500 ring-emerald-500/10"
                          )}
                        />
                        <span className="text-foreground text-[10px] font-black tracking-widest uppercase">
                          {product.availabilityLabel ??
                            (product.status === "on_order" ? "Po narudžbi" : "Trenutno na zalihi")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="surface-glass border-black/5 space-y-10 rounded-sm border p-10 shadow-elevated">
                  <div className="space-y-4">
                    {isSale ? (
                      <div className="flex flex-col gap-2">
                        <span className="text-muted-foreground/40 text-sm font-black tracking-widest line-through">
                          {product.price.toLocaleString("hr-HR", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </span>
                        <div className="flex items-baseline gap-4">
                          <span className="text-accent text-6xl font-black tracking-tighter">
                            {product.salePrice!.toLocaleString("hr-HR", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </span>
                          <Badge className="bg-accent text-foreground border-none text-[10px] font-black tracking-widest uppercase">
                            AKCIJA
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <span className="text-foreground text-6xl font-black tracking-tighter">
                        {product.price.toLocaleString("hr-HR", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                    )}
                    <p className="text-muted-foreground/40 text-[10px] font-black tracking-widest uppercase">
                      Cijena s PDV-om • Isporuka: 2-5 radnih dana
                    </p>
                  </div>

                  {product.isRegulated && (
                    <div className="bg-accent/5 border-accent/20 flex items-start gap-5 rounded-sm border p-6">
                      <div className="bg-accent/10 flex size-10 shrink-0 items-center justify-center rounded-full">
                        <ShieldAlert className="text-accent size-5" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-accent text-[10px] font-black tracking-widest uppercase">
                          Sigurnosni Protokol
                        </p>
                        <p className="text-muted-foreground text-[11px] leading-relaxed font-medium">
                          Ovaj artikl je reguliran zakonom. Kupnja je moguća isključivo uz predočenje važeće dokumentacije.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    {product.isRegulated ? (
                      <MagneticButton>
                        <Button
                          size="lg"
                          className="group shadow-premium h-16 w-full text-[11px] font-black tracking-[0.25em] uppercase transition-all hover:bg-accent hover:text-foreground"
                          asChild
                        >
                          <Link href={`/kontakt?product=${product.id}`}>
                            Pošalji Upit
                            <MessageSquare className="ml-3 size-4" />
                          </Link>
                        </Button>
                      </MagneticButton>
                    ) : (
                      <MagneticButton>
                        <Button
                          size="lg"
                          className="group shadow-premium h-16 w-full text-[11px] font-black tracking-[0.25em] uppercase transition-all hover:bg-accent hover:text-foreground"
                          onClick={() => addItem(product)}
                        >
                          Dodaj u košaricu
                          <ShoppingBag className="ml-3 size-4" />
                        </Button>
                      </MagneticButton>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="tactile-border h-14 w-full text-[9px] font-black tracking-widest uppercase transition-all"
                        asChild
                      >
                        <Link href="/kontakt">Savjet stručnjaka</Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" className="tactile-border size-14 shrink-0 rounded-sm" aria-label="Wishlist">
                          <Heart className="size-4" />
                        </Button>
                        <Button variant="outline" className="tactile-border size-14 shrink-0 rounded-sm" aria-label="Podijeli">
                          <Share2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <ProductTrust />
                </div>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="col-span-full space-y-20 lg:hidden">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="bg-accent h-[2px] w-8" />
                  <h2 className="text-label text-foreground">Detaljan Opis</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  {product.shortDescription ??
                    "Prije obrade narudžbe trgovina potvrđuje dostupnost, jamstvene uvjete i potrebnu dokumentaciju za kategoriju proizvoda."}
                </p>
              </div>
              <ProductSpecs specs={product.metadata || []} />
            </div>
          </div>
        </Container>
      </section>

      {/* Related Products Section */}
      <section className="section-padding bg-secondary/5 border-t">
        <Container>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-accent size-2 rounded-full" />
                  <span className="text-label text-accent">Povezano</span>
                </div>
                <h2 className="text-editorial-headline text-4xl sm:text-5xl md:text-6xl">
                  Kompletirajte <br />
                  <span className="text-muted-foreground/40">svoju opremu</span>
                </h2>
              </div>
              <Link
                href={`/kategorija/${categorySlug}`}
                className="group text-label flex items-center hover:text-foreground transition-colors"
              >
                Istraži cijelu kategoriju
                <ChevronRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile Sticky Bar */}
      <div
        className="bg-background/90 fixed right-0 bottom-0 left-0 z-40 border-t p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] backdrop-blur-md lg:hidden"
        role="region"
        aria-label="Kupnja"
      >
        <div className="mx-auto flex max-w-lg items-center gap-6">
          <div className="flex min-w-0 flex-col">
            <span className="text-label text-[9px]">{product.brand}</span>
            <p className="text-foreground text-2xl font-black tracking-tighter">
              {isSale
                ? product.salePrice!.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })
                : product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
            </p>
          </div>
          <div className="flex-1">
            {product.isRegulated ? (
              <Button
                size="lg"
                className="shadow-premium h-14 w-full text-[10px] font-black tracking-widest uppercase"
                asChild
              >
                <Link href={`/kontakt?product=${product.id}`}>Upit</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="shadow-premium h-14 w-full text-[10px] font-black tracking-widest uppercase"
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
