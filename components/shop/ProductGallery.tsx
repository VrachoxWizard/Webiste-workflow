"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = React.useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border bg-muted/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIdx]}
              alt={`${productName} - slika ${activeIdx + 1}`}
              fill
              priority={activeIdx === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {images.map((img, idx) => (
          <button
            key={`${img}-${idx}`}
            type="button"
            onClick={() => setActiveIdx(idx)}
            aria-label={`Prikaži sliku ${idx + 1} za ${productName}`}
            aria-pressed={activeIdx === idx}
            className={cn(
              "relative aspect-square overflow-hidden rounded-sm border-2 transition-all",
              activeIdx === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image src={img} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
