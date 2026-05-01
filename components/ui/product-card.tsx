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
  "group relative flex overflow-hidden rounded-sm border border-border/80 bg-card transition-colors hover:border-primary/40 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      variant: {
        default: "flex-col",
        compact: "flex-col text-sm",
        featured: "flex-col md:flex-row md:items-stretch",
        list: "flex-row h-32 md:h-40 items-stretch",
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
      className: "text-primary",
      Icon: ShieldAlert,
    }
  }

  if (product.status === "on_order") {
    return {
      label: product.availabilityLabel ?? "Po narudžbi",
      className: "text-muted-foreground",
      Icon: Clock3,
    }
  }

  return {
    label: product.availabilityLabel ?? "Na zalihi",
    className: "text-primary",
    Icon: CheckCircle2,
  }
}

export function ProductCard({ product, variant = "default", className }: ProductCardProps) {
  const { addItem } = useCart()
  const [imageFailed, setImageFailed] = React.useState(false)
  const isSale = product.status === "sale" && product.salePrice
  const savings = isSale ? Math.round(((product.price - product.salePrice!) / product.price) * 100) : 0
  const availability = getAvailability(product)
  const AvailabilityIcon = availability.Icon

  const isList = variant === "list"
  const isFeatured = variant === "featured"
  const isCompact = variant === "compact"

  return (
    <div className={cn(productCardVariants({ variant, className }))}>
      {/* Image Area */}
      <div 
        className={cn(
          "relative overflow-hidden bg-muted/10 shrink-0",
          isList ? "w-32 md:w-40 border-r border-border/50" : "w-full border-b border-border/50",
          isFeatured ? "md:w-1/2 md:border-b-0 md:border-r" : "",
          isCompact ? "aspect-square" : (isList ? "h-full" : "aspect-[4/5]")
        )}
      >
        {imageFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary/70 to-muted/30 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{product.category}</span>
            <p className="text-xs font-semibold text-muted-foreground">Slika artikla u pripremi</p>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={isList ? "160px" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={parseInt(product.id) <= 4}
            onError={() => setImageFailed(true)}
          />
        )}
        
        {/* Subtle wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

        {/* Status Badges */}
        <div className="absolute left-2 top-2 md:left-3 md:top-3 flex flex-col gap-1.5">
          {product.status === "new" && (
            <Badge className="border-none bg-primary text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-primary-foreground h-4 md:h-5">
              Novo
            </Badge>
          )}
          {product.status === "sale" && (
            <Badge className="border-none bg-destructive text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-destructive-foreground h-4 md:h-5">
              Akcija
            </Badge>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className={cn(
        "flex flex-1 flex-col justify-between",
        isList ? "p-3 md:p-4" : (isCompact ? "p-3" : "p-4 md:p-5"),
        isFeatured ? "md:p-8 md:justify-center" : ""
      )}>
        
        <div className="space-y-1 md:space-y-1.5">
          {/* Brand & Category */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground truncate">
              {product.brand}
            </p>
            {product.isRegulated && (
              <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded-sm shrink-0">
                <ShieldAlert className="size-3" aria-hidden="true" />
                <span className={cn(isCompact || isList ? "sr-only md:not-sr-only" : "")}>Regulirano</span>
              </div>
            )}
          </div>
          
          {/* Title */}
          <Link href={`/proizvod/${product.id}`} className="block group-hover:text-primary transition-colors focus:outline-none">
            {/* The link provides the focus target. We use absolute inset to make the whole card clickable for standard navigation, 
                but since we have buttons inside, we can't do full absolute inset without z-index tricks. 
                Instead, we just rely on standard linking here and visual focus-within on the card. */}
            <h3 className={cn(
              "font-bold tracking-tight text-foreground line-clamp-2",
              isCompact ? "text-sm" : "text-[15px] md:text-base",
              isFeatured ? "md:text-2xl" : ""
            )}>
              {product.name}
            </h3>
          </Link>
          
          {/* Category fallback/metadata for non-compact layouts */}
          {(!isCompact && !isList) && (
            <p className="text-[11px] font-medium text-muted-foreground">
              {product.category}
            </p>
          )}

          <div className={cn("flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest", availability.className)}>
            <AvailabilityIcon className="size-3.5" aria-hidden="true" />
            <span>{availability.label}</span>
          </div>
        </div>

        {/* Specs (Only in default or featured) */}
        {(product.metadata && !isCompact && !isList) && (
          <div className="mt-3 hidden sm:flex flex-wrap gap-x-3 gap-y-1 border-l-2 border-primary/20 pl-2">
            {product.metadata.slice(0, isFeatured ? 4 : 2).map((meta) => (
              <div key={meta.label} className="flex items-center gap-1.5 text-[10px] md:text-[11px]">
                <span className="text-muted-foreground">{meta.label}:</span>
                <span className="font-semibold">{meta.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Price & Actions */}
        <div className={cn(
          "flex items-end justify-between mt-auto pt-4",
          isList ? "pt-2" : "",
          isFeatured ? "md:mt-8" : ""
        )}>
          {/* Price Block */}
          <div className="flex flex-col">
            {isSale ? (
              <>
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground line-through decoration-destructive/50">
                  {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                </span>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-black tracking-tighter text-destructive",
                    isCompact ? "text-lg" : "text-xl",
                    isFeatured ? "md:text-3xl" : ""
                  )}>
                    {product.salePrice!.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                  </span>
                  {!isCompact && (
                    <Badge variant="destructive" className="h-4 rounded-sm px-1 text-[9px]">
                      -{savings}%
                    </Badge>
                  )}
                </div>
              </>
            ) : (
              <span className={cn(
                "font-black tracking-tighter text-foreground",
                isCompact ? "text-lg" : "text-xl",
                isFeatured ? "md:text-3xl" : ""
              )}>
                {product.price.toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
              </span>
            )}
          </div>

          {/* Action CTA */}
          <div className="shrink-0 relative z-10">
            {product.isRegulated ? (
              <Button
                size={isCompact || isList ? "sm" : "default"}
                variant="outline"
                className={cn(
                  "border-primary/20 font-bold uppercase tracking-widest hover:border-primary hover:bg-primary/5 hover:text-primary",
                  isCompact || isList ? "h-8 px-2 text-[9px]" : "text-[10px] md:text-[11px]"
                )}
                asChild
              >
                <Link href={`/kontakt?product=${product.id}`}>
                  Upit <ArrowRight className="ml-1.5 size-3" aria-hidden="true" />
                </Link>
              </Button>
            ) : (
              <Button
                size={isCompact || isList ? "sm" : "default"}
                className={cn(
                  "font-bold uppercase tracking-widest",
                  isCompact || isList ? "h-8 px-2 text-[9px]" : "text-[10px] md:text-[11px]"
                )}
                onClick={() => addItem(product)}
                aria-label={`Dodaj ${product.name} u košaricu`}
              >
                Dodaj <ShoppingBag className="ml-1.5 size-3" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}
