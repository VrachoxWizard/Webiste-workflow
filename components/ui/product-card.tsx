"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShieldAlert, ShoppingBag, ArrowRight, CheckCircle2, Clock3 } from "lucide-react"
import { Product } from "@/types/product"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/CartContext"
import { cva, type VariantProps } from "class-variance-authority"

const productCardVariants = cva(
  "group relative flex min-w-0 overflow-hidden rounded-sm border border-border/60 bg-background transition-all duration-500 hover:border-accent/30 hover:shadow-premium-hover focus-within:ring-1 focus-within:ring-accent focus-within:ring-offset-1",
  {
    variants: {
      variant: {
        default: "flex-col",
        compact: "flex-col text-sm",
        featured: "flex-col lg:flex-row lg:items-stretch shadow-premium",
        list: "min-h-40 flex-row items-stretch md:min-h-44",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ProductCardProps extends VariantProps<typeof productCardVariants> {
  product: Product
  className?: string
}

const getAvailability = (product: Product) => {
  if (product.isRegulated) {
    return {
      label: product.availabilityLabel ?? "Dokumentacija obavezna",
      color: "bg-accent",
      Icon: ShieldAlert,
    }
  }

  if (product.status === "on_order") {
    return {
      label: product.availabilityLabel ?? "Dostupno po narudžbi",
      color: "bg-amber-400",
      Icon: Clock3,
    }
  }

  return {
    label: product.availabilityLabel ?? "Trenutno na zalihi",
    color: "bg-emerald-500",
    Icon: CheckCircle2,
  }
}

export function ProductCard({ product, variant = "default", className }: ProductCardProps) {
  const { addItem } = useCart()
  const [imageFailed, setImageFailed] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const isSale = product.status === "sale" && product.salePrice
  const savings = isSale
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0
  const availability = getAvailability(product)

  const isList = variant === "list"
  const isFeatured = variant === "featured"
  const isCompact = variant === "compact"
  const isPriorityImage = Number(product.id) <= 4

  const hasSecondaryImage = product.galleryImages && product.galleryImages.length > 1
  const secondaryImage = hasSecondaryImage ? product.galleryImages![1] : null

  return (
    <div
      className={cn(productCardVariants({ variant, className }))}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="product-card"
    >
      {/* Image Area */}
      <div
        className={cn(
          "from-secondary/50 via-background to-muted/30 relative shrink-0 overflow-hidden bg-gradient-to-br",
          isList ? "border-border/50 w-36 border-r md:w-48" : "border-border/50 w-full border-b",
          isFeatured ? "lg:w-[52%] lg:border-r lg:border-b-0" : "",
          isCompact ? "aspect-square" : isList ? "h-full" : "aspect-[4/3]"
        )}
      >
        {imageFailed ? (
          <div className="bg-secondary/20 absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center">
            <span className="text-label opacity-40">
              {product.category}
            </span>
            <p className="text-muted-foreground text-xs font-medium italic">Katalog u pripremi</p>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes={
                isFeatured
                  ? "(min-width: 1024px) 36vw, 100vw"
                  : isList
                    ? "200px"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              }
              className={cn(
                "object-cover transition-transform duration-1000 group-hover:scale-105",
                hasSecondaryImage && isHovered ? "opacity-0" : "opacity-100"
              )}
              priority={isPriorityImage}
              loading={isPriorityImage ? undefined : "eager"}
              onError={() => setImageFailed(true)}
            />
            {hasSecondaryImage && secondaryImage && (
              <Image
                src={secondaryImage}
                alt={product.name}
                fill
                sizes={
                  isFeatured
                    ? "(min-width: 1024px) 36vw, 100vw"
                    : isList
                      ? "200px"
                      : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                }
                className={cn(
                  "object-cover transition-all duration-1000",
                  isHovered ? "scale-105 opacity-100" : "opacity-0"
                )}
                loading="eager"
              />
            )}
          </div>
        )}

        {/* Editorial Wash */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent group-hover:from-accent/5" />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 md:top-4 md:left-4">
          {product.status === "new" && (
            <Badge className="bg-primary hover:bg-primary border-none px-2 py-0.5 text-[9px] font-black tracking-widest text-white uppercase">
              Novo
            </Badge>
          )}
          {product.status === "sale" && (
            <Badge className="bg-accent hover:bg-accent border-none px-2 py-0.5 text-[9px] font-black tracking-widest text-foreground uppercase">
              -{savings}%
            </Badge>
          )}
        </div>

        {/* Regulated Indicator Overlay */}
        {product.isRegulated && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4">
            <div className="surface-glass text-foreground flex items-center gap-2 rounded-sm border px-2 py-1 text-[9px] font-black tracking-widest uppercase shadow-sm md:text-[10px]">
              <ShieldAlert className="text-accent size-3" />
              <span className={cn(isCompact || isList ? "sr-only md:not-sr-only" : "")}>
                Regulirano
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col justify-between",
          isList ? "p-3 md:p-5" : isCompact ? "p-3" : "p-4 md:p-6",
          isFeatured ? "lg:p-8 xl:p-10" : ""
        )}
      >
        <div className="space-y-1 md:space-y-2">
          {/* Brand & Category */}
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-label text-[9px] md:text-[10px]">{product.brand}</span>
            <span className="text-muted-foreground/30 text-[9px]">|</span>
            <span className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase opacity-60 md:text-[10px]">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <Link
            href={`/proizvod/${product.id}`}
            className="hover:text-accent block min-w-0 transition-colors focus:outline-none"
          >
            <h3
              className={cn(
                "text-foreground line-clamp-2 font-bold tracking-tight",
                isCompact ? "text-sm" : "text-[16px] md:text-xl",
                isFeatured ? "md:text-2xl lg:text-3xl xl:text-4xl" : ""
              )}
            >
              {product.name}
            </h3>
          </Link>

          {/* Availability Dot */}
          <div className="flex items-center gap-2 pt-2">
            <div className={cn("size-1.5 rounded-full ring-2 ring-offset-2", availability.color, "ring-"+availability.color.split('-')[1]+"-400/20")} />
            <span className="text-muted-foreground line-clamp-1 text-[10px] font-black tracking-widest uppercase md:text-[11px]">
              {availability.label}
            </span>
          </div>

          {/* Specs (Only in default or featured) */}
          {product.metadata && !isCompact && !isList && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
              {product.metadata.slice(0, isFeatured ? 4 : 2).map((meta) => (
                <div
                  key={meta.label}
                  className="flex items-center gap-1.5 text-[10px] md:text-[11px]"
                >
                  <span className="text-muted-foreground/60 font-bold tracking-tighter uppercase">
                    {meta.label}
                  </span>
                  <span className="text-foreground/80 font-bold">{meta.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price & Actions */}
        <div
          className={cn(
            "border-border/40 mt-6 flex border-t pt-4",
            isFeatured
              ? "flex-col items-start gap-4 lg:mt-8 lg:pt-5"
              : "flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
            isList ? "mt-4 gap-3 pt-3" : ""
          )}
        >
          {/* Price Block */}
          <div className="flex min-w-0 flex-col">
            {isSale ? (
              <>
                <span className="text-muted-foreground text-[10px] font-medium line-through md:text-[11px]">
                  {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                </span>
                <span
                  className={cn(
                    "text-accent font-black tracking-tighter whitespace-nowrap",
                    isCompact ? "text-xl" : "text-2xl",
                    isFeatured ? "lg:text-4xl" : ""
                  )}
                >
                  {product.salePrice!.toLocaleString("hr-HR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </>
            ) : (
              <span
                className={cn(
                  "text-foreground font-black tracking-tighter whitespace-nowrap",
                  isCompact ? "text-xl" : "text-2xl",
                  isFeatured ? "lg:text-4xl" : ""
                )}
              >
                {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
              </span>
            )}
          </div>

          {/* Action CTA */}
          <div className="relative z-10 shrink-0">
            {product.isRegulated ? (
              <Button
                size={isCompact || isList ? "sm" : "default"}
                variant="outline"
                className={cn(
                  "tactile-border border-accent/20 hover:bg-accent text-accent hover:text-foreground font-black tracking-[0.2em] uppercase transition-all",
                  isCompact || isList
                    ? "h-10 px-4 text-[9px]"
                    : "h-12 px-6 text-[10px] md:text-[11px]"
                )}
                asChild
              >
                <Link href={`/kontakt?product=${product.id}`}>
                  Upit <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : (
              <Button
                size={isCompact || isList ? "sm" : "default"}
                className={cn(
                  "font-black tracking-[0.2em] uppercase shadow-premium transition-all hover:bg-accent hover:text-foreground",
                  isCompact || isList
                    ? "h-10 px-4 text-[9px]"
                    : "h-12 px-6 text-[10px] md:text-[11px]"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  addItem(product)
                }}
                aria-label={`Dodaj ${product.name} u košaricu`}
              >
                Kupi <ShoppingBag className="ml-2 size-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
