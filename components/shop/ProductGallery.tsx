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
  const [failedImages, setFailedImages] = React.useState<Set<number>>(() => new Set())
  const activeImage = images[activeIdx] ?? images[0]
  const markFailed = (idx: number) => {
    setFailedImages((current) => new Set(current).add(idx))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border bg-muted/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {activeImage && !failedImages.has(activeIdx) ? (
              <Image
                src={activeImage}
                alt={`${productName} - slika ${activeIdx + 1}`}
                fill
                priority={activeIdx === 0}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
                onError={() => markFailed(activeIdx)}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 bg-secondary/30 p-8 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Galerija</p>
                <p className="max-w-xs text-sm font-semibold text-muted-foreground">Slika proizvoda trenutno nije dostupna.</p>
              </div>
            )}
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
            {failedImages.has(idx) ? (
              <div className="flex h-full items-center justify-center bg-secondary/30 text-[10px] font-bold uppercase tracking-widest text-primary">
                Nema slike
              </div>
            ) : (
              <Image src={img} alt="" fill sizes="120px" className="object-cover" onError={() => markFailed(idx)} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
