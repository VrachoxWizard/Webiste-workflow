"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { Phone, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Navbar } from "./Navbar"

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="relative z-50 w-full">
      {/* Utility Bar - subtle trust/contact line */}
      <div className="bg-foreground text-background border-background/10 border-b py-2 text-[11px] font-medium tracking-wider uppercase">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="text-accent size-3" />
              +385 1 234 5678
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <MapPin className="text-accent size-3" />
              Poslovnica: Zagreb
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-accent/80 hidden font-semibold italic md:inline">
              Dostupnost i dokumentacija provjeravaju se prije isporuke
            </span>
            <Link
              href="/legal"
              className="hover:text-accent flex items-center gap-1 transition-colors"
            >
              Pravila kupnje <ChevronRight className="size-2.5" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <div
        className={cn(
          "w-full border-b transition-all duration-300",
          isScrolled
            ? "bg-background/95 shadow-premium sticky top-0 py-2 backdrop-blur-md"
            : "bg-background relative py-4"
        )}
      >
        <Navbar />
      </div>
    </header>
  )
}
