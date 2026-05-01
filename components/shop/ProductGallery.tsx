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
    setFailedImages((current) => {
      const next = new Set(current)
      next.add(idx)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-secondary/10 relative aspect-[4/5] overflow-hidden rounded-sm border border-black/5 shadow-inner">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {activeImage && !failedImages.has(activeIdx) ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-10" />
                <Image
                  src={activeImage}
                  alt={`${productName} - slika ${activeIdx + 1}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                  onError={() => markFailed(activeIdx)}
                />
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 p-12 text-center">
                <p className="text-label text-accent">Dokumentacija</p>
                <p className="text-muted-foreground/60 max-w-xs text-sm font-medium">
                  Vizualni prikaz artikla trenutno nije dostupan u bazi podataka.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-3">
        {images.map((img, idx) => (
          <button
            key={`${img}-${idx}`}
            type="button"
            onClick={() => setActiveIdx(idx)}
            aria-label={`Prikaži sliku ${idx + 1} za ${productName}`}
            aria-pressed={activeIdx === idx}
            className={cn(
              "tactile-border group relative size-20 overflow-hidden rounded-sm transition-all active:scale-95 md:size-24 lg:size-28",
              activeIdx === idx
                ? "border-accent ring-2 ring-accent/10"
                : "border-black/5 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
            )}
          >
            {failedImages.has(idx) ? (
              <div className="bg-secondary/20 text-muted-foreground/40 flex h-full items-center justify-center text-[8px] font-black tracking-widest uppercase">
                X
              </div>
            ) : (
              <Image
                src={img}
                alt=""
                fill
                sizes="120px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => markFailed(idx)}
              />
            )}
            {activeIdx === idx && (
              <motion.div 
                layoutId="gallery-ring"
                className="absolute inset-0 ring-2 ring-accent ring-inset pointer-events-none"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
