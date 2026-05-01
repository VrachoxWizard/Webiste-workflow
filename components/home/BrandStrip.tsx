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
    <div className="bg-background relative border-y py-24 md:py-32">
      {/* Subtle Grain or Background Detail */}
      <div className="bg-secondary/5 absolute inset-0" />
      
      <Container className="relative">
        <div className="flex flex-col items-center space-y-16">
          <div className="flex flex-col items-center gap-4">
            <span className="text-label text-center">Službeni zastupnik</span>
            <h2 className="text-foreground text-center text-xl font-bold tracking-tight uppercase md:text-2xl">
              Vodeći svjetski brendovi
            </h2>
          </div>

          <div className="relative w-full overflow-hidden">
            {/* Desktop / Large Screens: Static Grid with hover effects */}
            <div className="hidden flex-wrap items-center justify-center gap-x-20 gap-y-12 opacity-40 transition-opacity hover:opacity-100 lg:flex">
              {BRANDS.map((brand, idx) => (
                <motion.span
                  key={brand}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 1 }}
                  className="text-foreground hover:text-accent cursor-default text-2xl font-black tracking-[0.1em] uppercase transition-all hover:scale-105 md:text-3xl"
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
              <div className="animate-marquee flex items-center gap-16 py-4 pr-16 whitespace-nowrap">
                {[...BRANDS, ...BRANDS].map((brand, idx) => (
                  <span
                    key={`${brand}-${idx}`}
                    className="text-foreground/40 text-xl font-black tracking-[0.1em] uppercase md:text-2xl"
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
          animation: marquee 40s linear infinite;
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
