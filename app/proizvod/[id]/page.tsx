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
import { ChevronRight, MessageSquare, ShieldAlert, ShoppingBag } from "lucide-react"
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
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart()
  const routeParams = useParams<{ id: string }>()
  const productId = routeParams.id ?? params.id
  const product = MOCK_PRODUCTS.find((item) => item.id === productId) || MOCK_PRODUCTS[0]
  const relatedProducts = MOCK_PRODUCTS.filter((item) => item.id !== product.id).slice(0, 4)
  const categorySlug = categorySlugMap[product.category] ?? "sve"

  const isSale = product.status === "sale" && product.salePrice
  const savings = isSale ? Math.round(((product.price - product.salePrice!) / product.price) * 100) : 0

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="bg-secondary/10 pb-6 pt-16 md:pt-24">
        <Container>
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground" aria-label="Putanja">
            <Link href="/" className="transition-colors hover:text-primary">Naslovnica</Link>
            <ChevronRight className="size-3" aria-hidden="true" />
            <Link href="/kategorija/sve" className="transition-colors hover:text-primary">Katalog</Link>
            <ChevronRight className="size-3" aria-hidden="true" />
            <Link href={`/kategorija/${categorySlug}`} className="transition-colors hover:text-primary">{product.category}</Link>
            <ChevronRight className="size-3" aria-hidden="true" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 xl:gap-20">
            <div className="lg:col-span-7 xl:col-span-8">
              <ProductGallery images={[product.image, product.image, product.image]} productName={product.name} />

              <div className="mt-12 hidden space-y-8 lg:block">
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-lg font-bold tracking-tight">Opis proizvoda</h2>
                  <p className="font-medium leading-relaxed text-muted-foreground">
                    {product.name} dolazi iz provjerene selekcije artikala za odgovornu kupnju. Prije obrade narudžbe trgovina potvrđuje dostupnost, jamstvene uvjete i potrebnu dokumentaciju za kategoriju proizvoda.
                  </p>
                </div>
                <ProductSpecs specs={product.metadata || []} />
              </div>
            </div>

            <div className="space-y-8 lg:col-span-5 xl:col-span-4">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary">
                    {product.brand}
                  </Badge>
                  {product.status === "new" && <Badge className="bg-primary text-[10px] font-bold uppercase tracking-widest">Novo</Badge>}
                  {product.status === "sale" && <Badge className="bg-destructive text-[10px] font-bold uppercase tracking-widest">Akcija</Badge>}
                </div>

                <h1 className="text-3xl font-bold tracking-tighter leading-tight md:text-4xl">
                  {product.name}
                </h1>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Šifra artikla: {product.sku}
                </p>
              </div>

              <div className="space-y-2 rounded-sm border bg-secondary/20 p-6">
                <div className="flex items-center gap-4">
                  {isSale ? (
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground line-through">
                        {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-black tracking-tighter text-destructive">
                          {product.salePrice!.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                        </span>
                        <Badge variant="destructive" className="font-bold">-{savings}%</Badge>
                      </div>
                    </div>
                  ) : (
                    <span className="text-4xl font-black tracking-tighter">
                      {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-medium text-muted-foreground">
                  PDV uključen u cijenu. Dostava ili preuzimanje potvrđuju se pri završetku narudžbe.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-sm border p-4">
                <div
                  className={cn(
                    "size-2 rounded-full",
                    product.status === "on_order" ? "bg-orange-500" : "bg-green-600"
                  )}
                  aria-hidden="true"
                />
                <span className="text-sm font-bold">
                  {product.status === "on_order" ? "Dostupno po narudžbi (7-14 dana)" : "Dostupnost se potvrđuje prije isporuke"}
                </span>
              </div>

              {product.isRegulated && (
                <div className="space-y-3 rounded-sm border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <ShieldAlert className="size-5" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-widest">Regulirani artikl</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed">
                    Kupac mora ispunjavati zakonske uvjete i predočiti propisanu dokumentaciju prije kupnje ili preuzimanja. Za ovaj artikl prvo pošaljite upit trgovini.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {product.isRegulated ? (
                  <Button size="lg" className="h-14 text-base font-bold uppercase tracking-widest group" asChild>
                    <Link href={`/kontakt?product=${product.id}`}>
                      Pošalji upit <MessageSquare className="ml-2 size-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="h-14 text-base font-bold uppercase tracking-widest group"
                    onClick={() => addItem(product)}
                  >
                    Dodaj u košaricu <ShoppingBag className="ml-2 size-5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Button>
                )}
                <Button variant="outline" size="lg" className="h-14 text-base font-bold uppercase tracking-widest" asChild>
                  <Link href="/kontakt">Provjeri u trgovini</Link>
                </Button>
              </div>

              <ProductTrust />
            </div>

            <div className="col-span-full space-y-12 lg:hidden">
              <div className="prose prose-sm max-w-none">
                <h2 className="text-lg font-bold tracking-tight">Opis proizvoda</h2>
                <p className="font-medium leading-relaxed text-muted-foreground">
                  Prije obrade narudžbe trgovina potvrđuje dostupnost, jamstvene uvjete i potrebnu dokumentaciju za kategoriju proizvoda.
                </p>
              </div>
              <ProductSpecs specs={product.metadata || []} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y bg-secondary/10">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Možda će vas zanimati</h2>
              <p className="text-sm font-medium text-muted-foreground">Preporučeni artikli iz aktualnog kataloga.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl space-y-8">
            <h2 className="text-center text-2xl font-bold tracking-tight">Često postavljana pitanja</h2>
            <div className="space-y-4">
              {[
                ["Kako provjeriti dostupnost artikla?", "Dostupnost potvrđujemo prije obrade narudžbe ili odgovora na upit."],
                ["Koji su zakonski uvjeti za regulirane artikle?", "Kupac mora imati važeću propisanu dokumentaciju i ispunjavati zakonske uvjete."],
                ["Nudite li plaćanje na rate?", "Dostupne načine plaćanja potvrđuje trgovina prije izdavanja ponude."],
              ].map(([question, answer]) => (
                <details key={question} className="border-b pb-4">
                  <summary className="cursor-pointer py-2 font-bold transition-colors hover:text-primary">{question}</summary>
                  <p className="text-sm font-medium leading-relaxed text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
