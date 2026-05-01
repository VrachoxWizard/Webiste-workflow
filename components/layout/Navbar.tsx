"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Search, User, ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NAVIGATION_DATA } from "@/config/navigation"
import { MegaMenu } from "./MegaMenu"
import { MobileDrawer } from "./MobileDrawer"

import { useCart } from "@/context/CartContext"
import { CartDrawer } from "@/components/shop/CartDrawer"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  const { itemCount } = useCart()

  return (
    <Container className="flex items-center justify-between">
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden -ml-2 p-2 hover:bg-muted rounded-md transition-colors"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Otvori izbornik"
      >
        <Menu className="size-6" />
      </button>

      {/* Logo Area */}
      <Link href="/" className="flex flex-col group">
        <span className="text-2xl font-bold tracking-tighter uppercase leading-none">
          Terra<span className="text-primary italic">Lov</span>
        </span>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary/60 -mt-0.5 transition-colors group-hover:text-primary">
          Odgovorna oprema
        </span>
      </Link>

      <form
        action="/kategorija/sve"
        className="hidden xl:flex w-full max-w-sm items-center gap-2 rounded-sm border bg-background px-3 py-1.5"
        role="search"
      >
        <Search className="size-4 text-muted-foreground" aria-hidden="true" />
        <Input
          name="q"
          type="search"
          aria-label="Pretraži proizvode"
          placeholder="Pretraži proizvode, brend ili šifru"
          className="h-8 border-0 px-0 shadow-none focus-visible:ring-0"
        />
      </form>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        {NAVIGATION_DATA.map((item) => (
          <div key={item.title} className="group relative">
            <Link 
              href={item.href}
              className="px-4 py-2 text-sm font-semibold tracking-tight hover:text-primary transition-colors flex items-center gap-1"
            >
              {item.title}
              <span className="size-1 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform origin-center" />
            </Link>
            <MegaMenu data={item.columns} />
          </div>
        ))}
        <Link 
          href="/kategorija/akcija"
          className="px-4 py-2 text-sm font-bold tracking-tight text-destructive hover:bg-destructive/5 rounded-md transition-colors"
        >
          Akcija
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" className="hidden sm:flex xl:hidden" aria-label="Pretraži proizvode" asChild>
          <Link href="/kategorija/sve">
            <Search className="size-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Korisnički račun" asChild>
          <Link href="/kontakt">
            <User className="size-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="relative group" aria-label={`Košarica (${itemCount})`} onClick={() => setIsCartOpen(true)}>
          <ShoppingBag className="size-5" />
          {itemCount > 0 && (
            <span className="absolute top-1.5 right-1.5 size-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-sm shadow-premium group-hover:scale-110 transition-transform">
              {itemCount}
            </span>
          )}
        </Button>
      </div>

      <MobileDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </Container>
  )
}
