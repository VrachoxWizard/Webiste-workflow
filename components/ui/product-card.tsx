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
import { motion, AnimatePresence } from "motion/react"

const productCardVariants = cva(
  "group relative flex overflow-hidden rounded-sm border border-border/80 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-premium-hover focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      variant: {
        default: "flex-col",
        compact: "flex-col text-sm",
        featured: "flex-col md:flex-row md:items-stretch",
        list: "flex-row h-36 md:h-44 items-stretch",
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
  const savings = isSale ? Math.round(((product.price - product.salePrice!) / product.price) * 100) : 0
  const availability = getAvailability(product)

  const isList = variant === "list"
  const isFeatured = variant === "featured"
  const isCompact = variant === "compact"

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
          "relative shrink-0 overflow-hidden bg-muted/20",
          isList ? "w-36 border-r border-border/50 md:w-48" : "w-full border-b border-border/50",
          isFeatured ? "md:w-3/5 md:border-b-0 md:border-r" : "",
          isCompact ? "aspect-square" : isList ? "h-full" : "aspect-[4/3]"
        )}
      >
        {imageFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary/70 to-muted/30 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {product.category}
            </span>
            <p className="text-xs font-semibold text-muted-foreground">Slika artikla u pripremi</p>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes={isList ? "200px" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
              className={cn(
                "object-cover transition-transform duration-1000 group-hover:scale-105",
                hasSecondaryImage && isHovered ? "opacity-0" : "opacity-100"
              )}
              priority={parseInt(product.id) <= 4}
              onError={() => setImageFailed(true)}
            />
            {hasSecondaryImage && secondaryImage && (
              <Image
                src={secondaryImage}
                alt={product.name}
                fill
                sizes={isList ? "200px" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                className={cn(
                  "object-cover transition-all duration-1000",
                  isHovered ? "scale-105 opacity-100" : "opacity-0"
                )}
              />
            )}
          </div>
        )}

        {/* Subtle wash */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Status Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 md:top-3 md:left-3">
          {product.status === "new" && (
            <Badge className="h-4 border-none bg-primary text-[9px] font-bold uppercase tracking-wider text-primary-foreground md:h-5 md:text-[10px]">
              Novo
            </Badge>
          )}
          {product.status === "sale" && (
            <Badge className="h-4 border-none bg-destructive text-[9px] font-bold uppercase tracking-wider text-destructive-foreground md:h-5 md:text-[10px]">
              -{savings}%
            </Badge>
          )}
        </div>

        {/* Regulated Indicator Overlay */}
        {product.isRegulated && (
          <div className="absolute top-2 right-2 md:top-3 md:right-3">
            <div className="flex items-center gap-1.5 rounded-sm bg-background/90 px-1.5 py-1 text-[9px] font-bold tracking-widest uppercase text-primary shadow-sm backdrop-blur-sm md:text-[10px]">
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
          "flex flex-1 flex-col justify-between",
          isList ? "p-3 md:p-5" : isCompact ? "p-3" : "p-4 md:p-6",
          isFeatured ? "md:justify-center md:p-12" : ""
        )}
      >
        <div className="space-y-1 md:space-y-2">
          {/* Brand & Category */}
          <div className="flex items-center gap-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary md:text-[10px]">
              {product.brand}
            </p>
            <span className="text-muted-foreground/30 text-[9px] font-light">|</span>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground md:text-[10px]">
              {product.category}
            </p>
          </div>

          {/* Title */}
          <Link
            href={`/proizvod/${product.id}`}
            className="block transition-colors hover:text-primary focus:outline-none"
          >
            <h3
              className={cn(
                "line-clamp-2 font-bold tracking-tight text-foreground",
                isCompact ? "text-sm" : "text-[15px] md:text-lg",
                isFeatured ? "md:text-3xl lg:text-4xl" : ""
              )}
            >
              {product.name}
            </h3>
          </Link>

          {/* Availability Dot */}
          <div className="flex items-center gap-2 pt-1">
            <div className={cn("size-1.5 animate-pulse rounded-full shadow-sm", availability.color)} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground md:text-[11px]">
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
                  <span className="font-bold uppercase tracking-tighter text-muted-foreground/60">
                    {meta.label}
                  </span>
                  <span className="font-bold text-foreground/80">{meta.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price & Actions */}
        <div
          className={cn(
            "mt-6 flex items-end justify-between pt-4 border-t border-border/40",
            isList ? "mt-4 pt-3" : "",
            isFeatured ? "md:mt-10 md:pt-6" : ""
          )}
        >
          {/* Price Block */}
          <div className="flex flex-col">
            {isSale ? (
              <>
                <span className="text-[10px] font-medium text-muted-foreground line-through md:text-xs">
                  {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                </span>
                <span
                  className={cn(
                    "font-black tracking-tighter text-destructive",
                    isCompact ? "text-lg" : "text-xl",
                    isFeatured ? "md:text-4xl" : ""
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
                  "font-black tracking-tighter text-foreground",
                  isCompact ? "text-lg" : "text-xl",
                  isFeatured ? "md:text-4xl" : ""
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
                  "border-primary/20 font-bold uppercase tracking-widest hover:bg-primary/5 hover:text-primary transition-all",
                  isCompact || isList ? "h-9 px-3 text-[9px]" : "h-11 px-6 text-[10px] md:text-[11px]"
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
                  "font-bold uppercase tracking-widest shadow-sm transition-all hover:shadow-md",
                  isCompact || isList ? "h-9 px-3 text-[9px]" : "h-11 px-6 text-[10px] md:text-[11px]"
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
