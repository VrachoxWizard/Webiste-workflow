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
  "group relative flex min-w-0 overflow-hidden rounded-sm border border-border/80 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-premium-hover focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      variant: {
        default: "flex-col",
        compact: "flex-col text-sm",
        featured: "flex-col lg:flex-row lg:items-stretch",
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
      label: product.availabilityLabel ?? "Provjera dokumentacije",
      color: "bg-primary",
      Icon: ShieldAlert,
    }
  }

  if (product.status === "on_order") {
    return {
      label: product.availabilityLabel ?? "Po narudžbi",
      color: "bg-amber-500",
      Icon: Clock3,
    }
  }

  return {
    label: product.availabilityLabel ?? "Na zalihi",
    color: "bg-emerald-600",
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
          <div className="from-secondary/70 to-muted/30 absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br p-4 text-center">
            <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
              {product.category}
            </span>
            <p className="text-muted-foreground text-xs font-semibold">Slika artikla u pripremi</p>
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

        {/* Subtle wash */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {/* Status Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 md:top-3 md:left-3">
          {product.status === "new" && (
            <Badge className="bg-primary text-primary-foreground h-4 border-none text-[9px] font-bold tracking-wider uppercase md:h-5 md:text-[10px]">
              Novo
            </Badge>
          )}
          {product.status === "sale" && (
            <Badge className="bg-destructive text-destructive-foreground h-4 border-none text-[9px] font-bold tracking-wider uppercase md:h-5 md:text-[10px]">
              -{savings}%
            </Badge>
          )}
        </div>

        {/* Regulated Indicator Overlay */}
        {product.isRegulated && (
          <div className="absolute top-2 right-2 md:top-3 md:right-3">
            <div className="bg-background/90 text-primary flex items-center gap-1.5 rounded-sm px-1.5 py-1 text-[9px] font-bold tracking-widest uppercase shadow-sm backdrop-blur-sm md:text-[10px]">
              <ShieldAlert className="size-3" />
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
            <p className="text-primary text-[9px] font-bold tracking-[0.14em] uppercase md:text-[10px]">
              {product.brand}
            </p>
            <span className="text-muted-foreground/30 text-[9px] font-light">|</span>
            <p className="text-muted-foreground text-[9px] font-bold tracking-[0.12em] uppercase md:text-[10px]">
              {product.category}
            </p>
          </div>

          {/* Title */}
          <Link
            href={`/proizvod/${product.id}`}
            className="hover:text-primary block min-w-0 transition-colors focus:outline-none"
          >
            <h3
              className={cn(
                "text-foreground line-clamp-2 font-bold tracking-tight",
                isCompact ? "text-sm" : "text-[15px] md:text-lg",
                isFeatured ? "md:text-xl lg:text-2xl xl:text-3xl" : ""
              )}
            >
              {product.name}
            </h3>
          </Link>

          {/* Availability Dot */}
          <div className="flex items-center gap-2 pt-1">
            <div
              className={cn("size-1.5 animate-pulse rounded-full shadow-sm", availability.color)}
            />
            <span className="text-muted-foreground line-clamp-1 text-[10px] font-bold tracking-[0.12em] uppercase md:text-[11px]">
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
                <span className="text-muted-foreground text-[10px] font-medium line-through md:text-xs">
                  {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                </span>
                <span
                  className={cn(
                    "text-destructive font-black tracking-tight whitespace-nowrap",
                    isCompact ? "text-lg" : "text-xl",
                    isFeatured ? "lg:text-3xl" : ""
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
                  "text-foreground font-black tracking-tight whitespace-nowrap",
                  isCompact ? "text-lg" : "text-xl",
                  isFeatured ? "lg:text-3xl" : ""
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
                  "border-primary/20 hover:bg-primary/5 hover:text-primary font-bold tracking-widest uppercase transition-all",
                  isCompact || isList
                    ? "h-9 px-3 text-[9px]"
                    : "h-11 px-5 text-[10px] md:text-[11px]"
                )}
                asChild
              >
                <Link href={`/kontakt?product=${product.id}`}>
                  Upit <ArrowRight className="ml-2 size-3.5" aria-hidden="true" />
                </Link>
              </Button>
            ) : (
              <Button
                size={isCompact || isList ? "sm" : "default"}
                className={cn(
                  "font-bold tracking-widest uppercase shadow-sm transition-all hover:shadow-md",
                  isCompact || isList
                    ? "h-9 px-3 text-[9px]"
                    : "h-11 px-5 text-[10px] md:text-[11px]"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  addItem(product)
                }}
                aria-label={`Dodaj ${product.name} u košaricu`}
              >
                Dodaj <ShoppingBag className="ml-2 size-3.5" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
