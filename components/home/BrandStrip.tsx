"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { motion } from "motion/react"

const BRANDS = [
  "Tikka", "Beretta", "Vortex", "Sako", "Harkila", "Pulsar", "Geco", "RWS"
]

export function BrandStrip() {
  return (
    <div className="bg-secondary/20 border-y py-12">
      <Container>
        <div className="flex flex-col space-y-8 items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
            Zastupamo vodeće svjetske brendove
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60">
            {BRANDS.map((brand, idx) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="text-xl md:text-2xl font-black tracking-tighter uppercase italic hover:opacity-100 transition-opacity cursor-default"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
