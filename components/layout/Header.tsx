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
    <header className="relative w-full z-50">
      {/* Utility Bar - subtle trust/contact line */}
      <div className="bg-foreground text-background py-2 text-[11px] font-medium tracking-wider uppercase border-b border-background/10">
        <Container className="flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5">
              <Phone className="size-3 text-accent" />
              +385 1 234 5678
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <MapPin className="size-3 text-accent" />
              Poslovnica: Zagreb
            </span>
          </div>
          <div className="flex gap-6 items-center">
            <span className="hidden md:inline text-accent/80 font-semibold italic">
              Dostupnost i dokumentacija provjeravaju se prije isporuke
            </span>
            <Link href="/legal" className="hover:text-accent transition-colors flex items-center gap-1">
              Pravila kupnje <ChevronRight className="size-2.5" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <div 
        className={cn(
          "w-full transition-all duration-300 border-b",
          isScrolled 
            ? "sticky top-0 bg-background/95 backdrop-blur-md shadow-premium py-2" 
            : "relative bg-background py-4"
        )}
      >
        <Navbar />
      </div>
    </header>
  )
}
