"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, Info, ShieldAlert, ShoppingBag } from "lucide-react"
import { Product } from "@/types/product"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/CartContext"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()
  const isSale = product.status === "sale" && product.salePrice
  const savings = isSale ? Math.round(((product.price - product.salePrice!) / product.price) * 100) : 0

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm border border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-premium",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/20">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={parseInt(product.id) <= 4}
        />
        
        {/* Fallback pattern if image fails (optional but helps) */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-[0.03]" />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.status === "new" && (
            <Badge className="border-none bg-primary text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Novo
            </Badge>
          )}
          {product.status === "sale" && (
            <Badge className="border-none bg-destructive text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
              Akcija
            </Badge>
          )}
          {product.status === "on_order" && (
            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">
              Po narudžbi
            </Badge>
          )}
        </div>

        {product.isRegulated && (
          <div className="absolute right-3 top-3">
            <div className="group/legal relative">
              <div className="rounded-sm border bg-background/90 p-1.5 shadow-sm backdrop-blur-sm">
                <ShieldAlert className="size-4 text-primary" aria-hidden="true" />
                <span className="sr-only">Regulirani artikl</span>
              </div>
              <div className="pointer-events-none absolute right-0 top-full z-10 mt-2 w-48 rounded-sm bg-foreground p-2 text-[10px] font-medium leading-tight text-background opacity-0 transition-opacity group-hover/legal:opacity-100">
                Ovaj proizvod podliježe zakonskim regulativama. Potrebna je provjera dokumenata.
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="secondary"
            size="icon"
            className="size-10 translate-y-4 rounded-sm shadow-premium transition-transform duration-300 group-hover:translate-y-0"
            aria-label={`Pregledaj ${product.name}`}
            asChild
          >
            <Link href={`/proizvod/${product.id}`}>
              <Eye className="size-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="mb-3 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
            {product.brand}
          </p>
          <Link href={`/proizvod/${product.id}`} className="block">
            <h3 className="min-h-[2.5rem] text-balance text-[15px] font-bold tracking-tight transition-colors line-clamp-2 group-hover:text-primary md:text-base">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {product.category}
          </p>
        </div>

        {product.metadata && (
          <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1">
            {product.metadata.map((meta) => (
              <div key={meta.label} className="flex gap-1.5 text-[10px]">
                <span className="uppercase tracking-wider text-muted-foreground">{meta.label}:</span>
                <span className="font-bold">{meta.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between border-t pt-4">
          <div className="flex flex-col">
            {isSale ? (
              <>
                <span className="text-xs text-muted-foreground line-through decoration-destructive/50">
                  {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tighter text-destructive">
                    {product.salePrice!.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                  </span>
                  <Badge variant="destructive" className="h-4 rounded-sm px-1 text-[9px]">
                    -{savings}%
                  </Badge>
                </div>
              </>
            ) : (
              <span className="text-xl font-black tracking-tighter">
                {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
              </span>
            )}
          </div>

          {product.isRegulated ? (
            <Button
              size="sm"
              variant="outline"
              className="h-9 border-primary/20 px-3 text-[11px] font-bold uppercase tracking-widest hover:border-primary hover:bg-primary/5"
              asChild
            >
              <Link href={`/kontakt?product=${product.id}`}>
                Upit <Info className="ml-1 size-3" aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button
              size="sm"
              className="h-9 px-3 text-[11px] font-bold uppercase tracking-widest"
              onClick={() => addItem(product)}
              aria-label={`Dodaj ${product.name} u košaricu`}
            >
              U košaricu <ShoppingBag className="ml-1 size-3" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
