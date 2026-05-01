"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { motion } from "motion/react"

const BRANDS = [
  "Tikka",
  "Beretta",
  "Vortex",
  "Sako",
  "Harkila",
  "Pulsar",
  "Geco",
  "RWS",
  "Leica",
  "Swarovski",
  "Blaser",
  "Browning",
]

export function BrandStrip() {
  return (
    <div className="bg-secondary/5 relative border-y py-16 md:py-24">
      {/* Decorative accent lines */}
      <div className="via-primary/20 absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
      <div className="via-primary/20 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent" />

      <Container>
        <div className="flex flex-col items-center space-y-12">
          <p className="text-muted-foreground/40 text-center text-[10px] font-black tracking-[0.5em] uppercase">
            Zastupamo Vodeće Svjetske Brendove
          </p>

          <div className="relative w-full overflow-hidden">
            {/* Desktop / Large Screens: Static Grid with hover effects */}
            <div className="hidden flex-wrap items-center justify-center gap-x-20 gap-y-12 opacity-30 transition-opacity hover:opacity-100 lg:flex">
              {BRANDS.map((brand, idx) => (
                <motion.span
                  key={brand}
                  initial={{ y: 8 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="text-foreground hover:text-primary cursor-default text-3xl font-black tracking-tighter uppercase italic transition-all hover:scale-110 md:text-4xl"
                >
                  {brand}
                </motion.span>
              ))}
            </div>

            {/* Mobile / Tablet: Infinite CSS Marquee */}
            <div
              className="group flex overflow-hidden lg:hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              }}
            >
              <div className="animate-marquee flex items-center gap-12 py-4 pr-12 whitespace-nowrap">
                {[...BRANDS, ...BRANDS].map((brand, idx) => (
                  <span
                    key={`${brand}-${idx}`}
                    className="text-foreground/40 text-2xl font-black tracking-tighter uppercase italic md:text-3xl"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
